import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('/sitemap-index.xml', site).href;
  const llmsURL = new URL('/llms.txt', site).href;
  const llmsFullURL = new URL('/llms-full.txt', site).href;

  const robotsTxt = `User-agent: *
Allow: /

# AI Search Engine Crawlers
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bingbot
Allow: /

# LLM content hints
# llms.txt: ${llmsURL}
# llms-full.txt: ${llmsFullURL}

Sitemap: ${sitemapURL}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
