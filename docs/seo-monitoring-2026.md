# SEO Technique 2026 - Deployment & Monitoring Runbook

This runbook covers the technical checks to run after each deployment to preserve crawl/index quality and monitor AI search crawlers.

## 1) Pre-deploy checks

Run from project root:

```bash
SITE_ENV=production npm run build
```

Expected:

- Build succeeds.
- `dist/client/sitemap-index.xml` exists.
- `dist/client/sitemap-0.xml` does not include redirect source URLs (`/`, `/about/`, `/blog/`, `/contact/`, `/cookies/`, `/mentions-legales/`, `/projets/`).
- `dist/client/sitemap-0.xml` does not include localized 404 URLs (`/fr/404/`, `/en/404/`).
- RSS exists for both locales (`dist/client/fr/blog/rss.xml`, `dist/client/en/blog/rss.xml`).

Quick local checks:

```bash
rg -n "<loc>https://hordeagence.com/(about|blog|contact|cookies|mentions-legales|projets)/</loc>|<loc>https://hordeagence.com/(fr|en)/404/</loc>|<loc>https://hordeagence.com/</loc>" dist/client/sitemap-0.xml

ls -l dist/client/fr/blog/rss.xml dist/client/en/blog/rss.xml
```

## 2) Post-deploy checks (production)

### Robots and sitemap availability

```bash
curl -sS https://hordeagence.com/robots.txt
curl -sS https://hordeagence.com/sitemap-index.xml
```

Robots should include:

- `GPTBot`
- `OAI-SearchBot`
- `ChatGPT-User`
- `ClaudeBot`
- `anthropic-ai`
- `PerplexityBot`
- `Bingbot`

### Response status and cache sanity

```bash
curl -I https://hordeagence.com/robots.txt
curl -I https://hordeagence.com/sitemap-index.xml
curl -I https://hordeagence.com/fr/blog/rss.xml
curl -I https://hordeagence.com/en/blog/rss.xml
```

Expected:

- HTTP `200` for all resources.
- Reasonable `cache-control` for robots/sitemap/rss.

## 3) Search engine submission (when sitemap changes)

- Google Search Console: re-submit `https://hordeagence.com/sitemap-index.xml`
- Bing Webmaster Tools: re-submit `https://hordeagence.com/sitemap-index.xml`

## 4) AI crawler log monitoring

### Option A - Reverse proxy logs (Nginx/Apache)

Use the helper script:

```bash
bash scripts/ai-crawler-report.sh '/var/log/nginx/access.log*'
```

Or run manually:

```bash
zgrep -hE 'GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|anthropic-ai|PerplexityBot|Bingbot' /var/log/nginx/access.log* \
  | awk -F'"' '{print $6}' \
  | sed 's/ .*//' \
  | sort \
  | uniq -c \
  | sort -nr
```

### Option B - Dokploy container logs (recommended for your setup)

Enable bot crawl logging first (disabled by default for performance):

```bash
LOG_BOT_CRAWL=1
```

The app emits bot crawl events in logs with the marker `[bot-crawl]` only when `LOG_BOT_CRAWL=1`.

Examples:

- `[bot-crawl] bot=OAI-SearchBot method=GET status=200 path=/fr/blog/... ip=...`
- `[bot-crawl] bot=GPTBot method=GET status=200 path=/sitemap-index.xml ip=...`

Find your container name:

```bash
docker ps --format '{{.Names}}'
```

Generate a report over last 24h:

```bash
bash scripts/ai-crawler-report-dokploy.sh hordenew 24h
```

If your container name differs, replace `hordenew`.

## 5) Traffic and crawl KPIs to track weekly

Track these metrics every week:

- Indexed pages count (GSC).
- Crawl requests by user-agent family (server logs).
- Non-brand impressions and clicks (GSC).
- CTR on top landing pages.
- Top pages cited by AI assistants (referrers + landing page logs when available).
- 404 and redirect hits from crawlers.

## 6) Alert thresholds

Raise an alert if one of these occurs for 7 days:

- `OAI-SearchBot`, `GPTBot`, `ClaudeBot` and `PerplexityBot` all drop to zero hits.
- Sitemap fetch errors (`4xx`/`5xx`).
- Sudden increase of crawler requests to 404 URLs.
- Sharp drop in valid indexed pages.

## 7) Monthly maintenance

- Revalidate sitemap hygiene (no noindex/404/redirect sources in sitemap).
- Re-test Core Web Vitals on key templates (home, service, blog, project).
- Update structured data and internal links for new service pages.
