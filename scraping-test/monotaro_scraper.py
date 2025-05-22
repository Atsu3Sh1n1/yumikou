import requests
from bs4 import BeautifulSoup

url = "https://www.monotaro.com/g/00022342/"
headers = {"User-Agent": "Mozilla/5.0"}

res = requests.get(url, headers=headers)
print(res.status_code)  # ← ステータスコードを確認（200が正常）

# HTMLをファイルに保存して手で確認
with open("monotaro_page.html", "w", encoding="utf-8") as f:
    f.write(res.text)
