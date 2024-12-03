import io
import zipfile
import requests
from bs4 import BeautifulSoup
from utils import sanitize_filename


def content_scraper(html_page):
    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zipf:

        soup = BeautifulSoup(html_page, "html.parser")
        tags = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "img", "a", "ul", "li"])

        md_content = io.StringIO()
        for tag in tags:
            if tag.name.startswith("h"):
                level = tag.name[1]
                md_content.write(f"{'#' * int(level)} {tag.get_text(strip=True)}\n\n")
            elif tag.name == "p":
                md_content.write(f"{tag.get_text(strip=True)}\n\n")
            elif tag.name == "img":
                img_src = tag.get('src')
                if img_src:
                    try:
                        response = requests.get(img_src, stream=True)
                        response.raise_for_status()

                        img_name = sanitize_filename(img_src.split("/")[-1])
                        img_path = f"images/{img_name}"

                        zipf.writestr(img_path, response.content)

                        md_content.write(f"![{img_name}]({img_path})\n\n")
                    except requests.RequestException:
                        md_content.write(f"![Image non téléchargée: {img_src}]\n\n")
            elif tag.name == "a":
                href = tag.get('href', '#')
                text = tag.get_text(strip=True)
                md_content.write(f"[{text}]({href})\n\n")
            elif tag.name == "ul":
                for li in tag.find_all("li"):
                    md_content.write(f"- {li.get_text(strip=True)}\n")
                md_content.write("\n")
            elif tag.name == "li":
                md_content.write(f"- {tag.get_text(strip=True)}\n")

        zipf.writestr("content.md", md_content.getvalue())

    zip_buffer.seek(0)
    return zip_buffer