import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const SITE_URL = (process.env.SITE_URL || "https://hordeagence.com").replace(/\/$/, "");
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const INDEXNOW_KEY_LOCATION =
  process.env.INDEXNOW_KEY_LOCATION || `${SITE_URL}/${INDEXNOW_KEY || "missing-key"}.txt`;
const DRY_RUN = process.env.DRY_RUN === "1";

async function readPostFiles() {
  const postsDir = path.join(process.cwd(), "src/content/posts");
  const files = await fs.readdir(postsDir);
  return files.filter((file) => file.endsWith(".yaml")).map((file) => path.join(postsDir, file));
}

async function buildPostUrls() {
  const files = await readPostFiles();
  const urls = new Set();

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const data = yaml.load(raw);
    if (!data || data.draft) continue;

    if (typeof data.slug === "string" && data.slug.length > 0) {
      urls.add(`${SITE_URL}/en/blog/${data.slug}`);
    }

    if (typeof data.slug_fr === "string" && data.slug_fr.length > 0) {
      urls.add(`${SITE_URL}/fr/blog/${data.slug_fr}`);
    }
  }

  return Array.from(urls);
}

async function submitIndexNow(urlList) {
  const host = new URL(SITE_URL).host;
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  };

  if (DRY_RUN) {
    console.log("[dry-run] IndexNow payload:");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`IndexNow submission failed: HTTP ${response.status} ${body}`.trim());
  }

  console.log(`IndexNow submitted successfully (${urlList.length} URLs).`);
}

async function main() {
  if (!INDEXNOW_KEY) {
    throw new Error("Missing INDEXNOW_KEY environment variable.");
  }

  const urls = await buildPostUrls();
  if (urls.length === 0) {
    console.log("No post URLs found to submit.");
    return;
  }

  await submitIndexNow(urls);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
