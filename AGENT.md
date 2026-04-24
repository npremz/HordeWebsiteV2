# AGENT.md

## Projet

HordeWebsiteV2 est un site Astro 5 pour Horde Agence.
- Site marketing multilingue `fr` / `en`
- Pages majoritairement statiques, avec `output: 'server'` en prod pour Keystatic
- Stack principale: Astro, Tailwind v4, React pour quelques îlots interactifs, Keystatic, Markdoc

## Commandes utiles

```bash
npm run dev
npm run build
npm run check
npm run preview
npm run indexnow:posts
```

## Structure à connaître

- `src/pages/[lang]/`: routes localisées principales
- `src/pages/index.astro` + `src/middleware.ts`: redirection vers `/${DEFAULT_LOCALE}/` (`fr`)
- `src/components/`: sections UI, services, effets, formulaire React
- `src/layouts/Layout.astro`: layout global, SEO, transitions, analytics, Lenis
- `src/content/`: contenu source (`posts`, `projects`, `services`, `authors`, `categories`, `settings_*`)
- `src/lib/site-data.ts`: lecture des singletons Keystatic localisés
- `src/lib/content/*.ts`: helpers pour blog, projets, services
- `src/i18n/`: locales supportées et traductions UI
- `src/pages/api/contact.ts`: endpoint contact via Resend
- `/keystatic`: interface d’édition CMS en local / prod server

## Règles du repo

- Toute nouvelle locale ou variation d'URL doit rester cohérente avec `src/i18n/*`, `src/pages/[lang]/*` et `src/components/SEO.astro`.
- Si tu modifies un schéma Keystatic dans `keystatic.config.ts`, reflète le changement dans `src/content.config.ts`.
- Les posts et projets ont des champs localisés; les services sont des pages pilotées par YAML.
- Les services sont actuellement générés uniquement en `fr`.
- Le SEO est centralisé dans `src/components/SEO.astro`; ne duplique pas canonicals, hreflang ou JSON-LD ailleurs sans raison.
- Le formulaire de contact dépend de `RESEND_API_KEY`.
- Il y a `package-lock.json` et `pnpm-lock.yaml`; évite le churn de lockfiles si tu ne touches pas aux dépendances.

## Conventions pratiques

- Favoriser Astro server-first; n'hydrater React que pour les besoins réellement interactifs.
- Garder les assets importés dans `src/assets/` quand ils doivent passer par le pipeline Astro, et `public/` pour les fichiers servis tels quels.
- Les contenus éditoriaux vivent dans `src/content/`; les docs de travail SEO / services vivent dans `docs/`.
- `README.md` est un starter Astro obsolète, ne pas l'utiliser comme source de vérité.
