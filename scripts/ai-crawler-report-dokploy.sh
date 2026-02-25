#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="${1:-}"
SINCE_WINDOW="${2:-24h}"

if [[ -z "${CONTAINER_NAME}" ]]; then
  echo "Usage: $0 <container_name_or_id> [since_window]"
  echo "Example: $0 hordenew 24h"
  exit 1
fi

echo "[ai-crawler-report-dokploy] container=${CONTAINER_NAME} since=${SINCE_WINDOW}"
echo

echo "=== Total hits by bot ==="
docker logs --since "${SINCE_WINDOW}" "${CONTAINER_NAME}" 2>&1 \
  | awk '
      /\[bot-crawl\]/ {
        bot="";
        for (i=1; i<=NF; i++) {
          if ($i ~ /^bot=/) {
            bot=substr($i, 5);
          }
        }
        if (bot != "") {
          count[bot]++;
        }
      }
      END {
        for (b in count) {
          printf "%8d  %s\n", count[b], b;
        }
      }
    ' \
  | sort -nr || true

echo

echo "=== Top crawled paths ==="
docker logs --since "${SINCE_WINDOW}" "${CONTAINER_NAME}" 2>&1 \
  | awk '
      /\[bot-crawl\]/ {
        path="";
        for (i=1; i<=NF; i++) {
          if ($i ~ /^path=/) {
            path=substr($i, 6);
          }
        }
        if (path != "") {
          count[path]++;
        }
      }
      END {
        for (p in count) {
          printf "%8d  %s\n", count[p], p;
        }
      }
    ' \
  | sort -nr \
  | head -n 30 || true
