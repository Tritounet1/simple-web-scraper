import re
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

response = supabase.auth.sign_up(
    {"email": "admin@gmail.com", "password": "admin1234"}
)

def save_request(url, status_code, scraper_name):
    response = (
        supabase.table("requests")
        .insert({"url": url, "status_code": status_code, "scraper_name": scraper_name})
        .execute()
    )
    print(response)

def get_requests():
    response = supabase.table("requests").select("*").execute()
    return response

def sanitize_filename(filename):
    return re.sub(r'[\/:*?"<>|&=]', '_', filename)