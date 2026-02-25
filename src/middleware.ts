import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LOCALE } from './i18n';

const SHOULD_LOG_BOT_CRAWLS = process.env.LOG_BOT_CRAWL === '1';

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

export const onRequest = defineMiddleware(({ url, redirect, request, isPrerendered }, next) => {
  const shouldTrackBotLogs = SHOULD_LOG_BOT_CRAWLS && !isPrerendered;

  if (url.pathname === '/') {
    if (!shouldTrackBotLogs) return redirect(`/${DEFAULT_LOCALE}/`, 302);

    const matchedBot = getMatchedBot(request.headers.get('user-agent') || '');
    if (!matchedBot) return redirect(`/${DEFAULT_LOCALE}/`, 302);

    const ip = request.headers.get('x-forwarded-for') || '-';
    console.log(`[bot-crawl] bot=${matchedBot} method=${request.method} status=302 path=/ ip=${ip}`);
    return redirect(`/${DEFAULT_LOCALE}/`, 302);
  }

  if (!shouldTrackBotLogs) return next();

  const matchedBot = getMatchedBot(request.headers.get('user-agent') || '');
  if (!matchedBot) return next();

  return next().then((response) => {
    const ip = request.headers.get('x-forwarded-for') || '-';
    const safePath = `${url.pathname}${url.search}`.replace(/\s+/g, '');
    console.log(`[bot-crawl] bot=${matchedBot} method=${request.method} status=${response.status} path=${safePath} ip=${ip}`);
    return response;
  });
});
