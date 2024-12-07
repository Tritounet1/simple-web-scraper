from flask import Flask, jsonify, send_file, request
from raw_scraper import raw_scraper
from content_scraper import content_scraper
import os
from urllib.parse import unquote
from dotenv import load_dotenv
from utils import save_request, get_requests, verif_auth
from flask_cors import CORS
import hmac
import hashlib
import subprocess

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": os.getenv("VITE_APP_FRONTEND_URL", "http://localhost:5173")}})

port = int(os.getenv("PORT", 5000))
GITHUB_SECRET = os.getenv("GITHUB_SECRET")
debug = os.getenv("DEBUG", "False").lower() in ["true", "1", "t"]


@app.route('/')
def home():
    return "Rien à voir ici. Allez à /api/ pour l'API."


@app.errorhandler(404)
def page_not_found(e):
    return "Rien à voir ici. Allez à /api/ pour l'API."


@app.route('/api/')
def api():
    return jsonify({"routes": {
        "/raw_scraper/<url>": "Récupère le contenu brut d'une page web",
        "/content_scraper/<url>": "Récupère le contenu d'une page web et le formate en Markdown"
    }})


@app.route('/api/requests')
def requests():
    requests = get_requests()
    return jsonify(requests.data)


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email et mot de passe requis"}), 400
    if verif_auth(email, password):
        return jsonify({"message": "Connexion réussie!"}), 200
    else:
        return jsonify({"error": "Email ou mot de passe incorrect"}), 401


@app.route('/api/raw_scraper/<path:url>')
def raw_scraper_route(url):
    decoded_url = unquote(url)
    try:
        html_content, status_code = raw_scraper(decoded_url)

        save_request(decoded_url, status_code, "raw_scraper")

        return jsonify({
            "url": decoded_url,
            "status_code": status_code,
            "content": html_content
        })
    except Exception as e:
        save_request(decoded_url, str(e), "raw_scraper")
        return jsonify({"error": str(e)}), 500


@app.route('/api/content_scraper/<path:url>')
def content_scraper_route(url):
    try:
        decoded_url = unquote(url)
        name = decoded_url.split("/")[-2]
        html_page, status_code = raw_scraper(decoded_url)

        zip_buffer = content_scraper(html_page)

        save_request(decoded_url, status_code, "content_scraper")

        return send_file(
            zip_buffer,
            as_attachment=True,
            download_name=f"{name}.zip",
            mimetype="application/zip"
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def verify_signature(payload, signature):
    computed = 'sha256=' + hmac.new(GITHUB_SECRET.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, signature)

@app.route('/webhook-handler', methods=['POST'])
def webhook_handler():
    signature = request.headers.get('X-Hub-Signature-256')
    if not verify_signature(request.data, signature):
        return 'Unauthorized', 403
    payload = request.json
    if payload and payload['ref'] == 'refs/heads/main':
        subprocess.run(["git", "-C", "/home/debian/simple-web-scraper", "pull", "origin", "main"])
    return 'OK', 200

def start_server():
    app.run(host='0.0.0.0', port=port, debug=debug)