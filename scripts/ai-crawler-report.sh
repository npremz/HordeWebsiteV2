#!/usr/bin/env bash
set -euo pipefail

LOG_GLOB="${1:-/var/log/nginx/access.log*}"

BOTS_REGEX='GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|anthropic-ai|PerplexityBot|Bingbot'

echo "[ai-crawler-report] source: ${LOG_GLOB}"
echo

echo "=== Total hits by bot ==="
zgrep -hE "${BOTS_REGEX}" ${LOG_GLOB} 2>/dev/null \
  | awk -F'"' '
      {
        ua=$6;
        bot="(unknown)";
        if (ua ~ /OAI-SearchBot/) bot="OAI-SearchBot";
        else if (ua ~ /GPTBot/) bot="GPTBot";
        else if (ua ~ /ChatGPT-User/) bot="ChatGPT-User";
        else if (ua ~ /ClaudeBot/) bot="ClaudeBot";
        else if (ua ~ /anthropic-ai/) bot="anthropic-ai";
        else if (ua ~ /PerplexityBot/) bot="PerplexityBot";
        else if (ua ~ /Bingbot/) bot="Bingbot";
        count[bot]++;
      }
      END {
        for (b in count) {
          printf "%8d  %s\n", count[b], b;
        }
      }
    ' \
  | sort -nr || true

echo

echo "=== Top crawled paths by AI/search bots ==="
zgrep -hE "${BOTS_REGEX}" ${LOG_GLOB} 2>/dev/null \
  | awk '{print $7}' \
  | sed 's/\?.*$//' \
  | sort \
  | uniq -c \
  | sort -nr \
  | head -n 30 || true
