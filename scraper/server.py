from flask import Flask, jsonify, send_file
from raw_scraper import raw_scraper
from content_scraper import content_scraper
import os
from urllib.parse import unquote
from dotenv import load_dotenv
from utils import save_request, get_requests
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://51.195.151.110:49102"}})

port = int(os.getenv("PORT", 5000))
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

def start_server():
    app.run(host='0.0.0.0', port=port, debug=debug)

# http://192.168.1.24:5000/api/raw_scraper/https://bnumis.com/as-de-nimes-monnaie-romaine-ou-gauloise/
# http://192.168.1.24:5000/api/content_scraper/https://bnumis.com/cest-quoi-une-monnaie-romaine-provinciale/