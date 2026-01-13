import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LOCALE } from './i18n';

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
  if (url.pathname === '/') {
    return redirect(`/${DEFAULT_LOCALE}/`, 302);
  }
  return next();
});
