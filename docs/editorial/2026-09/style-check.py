"""Descriptive editorial checks; not an authorship detector or ranking score."""
import json
import re
import statistics
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SLUGS = [
    "art-direction-for-web-interfaces", "design-and-web-development-together",
    "analyse-web-interface-without-copying", "web-design-brief-before-screens",
    "ai-can-create-interfaces-not-experiences", "how-to-make-your-website-stand-out-2026",
]
PHRASES = [
    "it's important to note", "in today's digital landscape", "delve into",
    "navigating the complexities", "let's explore", "furthermore", "in conclusion",
    "it is worth mentioning", "embark on", "cutting-edge", "leverage",
    "game-changer", "revolutionize", "streamline", "harness the power",
    "dive deep", "unlock the potential", "seamlessly",
]
def words(text):
    return re.findall(r"[^\W\d_]+(?:[’'][^\W\d_]+)*", text.lower())

results = []
for slug in SLUGS:
    for lang in ["fr", "en"]:
        source = (ROOT / "src/content/posts" / slug / f"content_{lang}.mdx").read_text()
        text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", source)
        text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
        paragraphs = [p for p in text.split("\n\n") if p and not p.startswith(("#", "|", "- ", "* ", "1."))]
        sentences = [words(s) for s in re.split(r"[.!?]+(?:\s|$)", " ".join(paragraphs)) if words(s)]
        lengths = [len(s) for s in sentences]
        vocabulary = words(" ".join(paragraphs))
        results.append({
            "slug": slug, "locale": lang,
            "proseParagraphs": len(paragraphs),
            "paragraphsOver150Words": sum(len(words(p)) > 150 for p in paragraphs),
            "h2Count": len(re.findall(r"^## ", source, re.M)),
            "sentenceWordMean": round(statistics.mean(lengths), 2),
            "sentenceWordStdDev": round(statistics.pstdev(lengths), 2),
            "proseTypeTokenRatio": round(len(set(vocabulary)) / len(vocabulary), 3),
            "frequentParagraphOpeners": Counter(words(p)[0] for p in paragraphs if words(p)).most_common(3),
            "stylePhraseOccurrences": {phrase: text.lower().count(phrase) for phrase in PHRASES if phrase in text.lower()},
            "emDashes": source.count("\u2014"),
        })
print(json.dumps(results, ensure_ascii=False, indent=2))
