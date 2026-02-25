import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LOCALE } from './i18n';

const TRACKED_BOTS = [
  'OAI-SearchBot',
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Bingbot',
];

function getMatchedBot(userAgent: string): string | null {
  for (const bot of TRACKED_BOTS) {
    if (userAgent.includes(bot)) return bot;
  }
  return null;
}

export const onRequest = defineMiddleware(async ({ url, redirect, request, isPrerendered }, next) => {
  const shouldTrackBotLogs = !isPrerendered;
  const matchedBot = shouldTrackBotLogs
    ? getMatchedBot(request.headers.get('user-agent') || '')
    : null;

  if (url.pathname === '/') {
    const response = redirect(`/${DEFAULT_LOCALE}/`, 302);
    if (matchedBot) {
      const ip = request.headers.get('x-forwarded-for') || '-';
      console.log(`[bot-crawl] bot=${matchedBot} method=${request.method} status=302 path=/ ip=${ip}`);
    }
    return response;
  }

  const response = await next();

  if (matchedBot) {
    const ip = request.headers.get('x-forwarded-for') || '-';
    const safePath = `${url.pathname}${url.search}`.replace(/\s+/g, '');
    console.log(`[bot-crawl] bot=${matchedBot} method=${request.method} status=${response.status} path=${safePath} ip=${ip}`);
  }

  return response;
});
