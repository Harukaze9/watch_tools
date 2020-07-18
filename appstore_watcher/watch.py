import urllib.request
import argparse

parser = parser = argparse.ArgumentParser()
parser.add_argument("filename")

args = parser.parse_args()
filename = args.filename

url = "https://rss.itunes.apple.com/api/v1/jp/ios-apps/top-grossing/all/200/explicit.json"

with urllib.request.urlopen(url) as response:
   json = response.read()

import codecs
with codecs.open(filename, "w", "utf-8") as fp:
    fp.write(json.decode("utf-8"))