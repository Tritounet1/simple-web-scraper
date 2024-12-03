import requests

def raw_scraper(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        html_content = response.text

        return html_content, response.status_code

    except requests.RequestException as e:
        print(f"Erreur lors de la récupération de la page : {e}")
        return None