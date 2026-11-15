# AGENT.md

## Projet

HordeWebsiteV2 est un site Astro 7 pour Horde Agence.
- Site marketing multilingue `fr` / `en`
- Pages majoritairement statiques, avec `output: 'server'` en prod pour les endpoints runtime
- Stack principale: Astro, Tailwind v4 et React pour le formulaire interactif

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
- `src/lib/site-data.ts`: lecture des réglages YAML localisés
- `src/lib/content/*.ts`: helpers pour blog, projets, services
- `src/i18n/`: locales supportées et traductions UI
- `src/pages/api/contact.ts`: endpoint contact via Resend

## Règles du repo

- Toute nouvelle locale ou variation d'URL doit rester cohérente avec `src/i18n/*`, `src/pages/[lang]/*` et `src/components/SEO.astro`.
- Les posts et projets ont des champs localisés; les services sont des pages pilotées par YAML.
- Les services sont actuellement générés uniquement en `fr`.
- Le SEO est centralisé dans `src/components/SEO.astro`; ne duplique pas canonicals, hreflang ou JSON-LD ailleurs sans raison.
- Le formulaire de contact dépend de `RESEND_API_KEY`.
- npm 10.9.8 est le gestionnaire de paquets de référence, comme dans l'image Docker Node 22; garder uniquement `package-lock.json`.

## Conventions pratiques

- Favoriser Astro server-first; n'hydrater React que pour les besoins réellement interactifs.
- Garder les assets importés dans `src/assets/` quand ils doivent passer par le pipeline Astro, et `public/` pour les fichiers servis tels quels.
- Les contenus éditoriaux vivent dans `src/content/`; les docs de travail SEO / services vivent dans `docs/`.
- `README.md` est un starter Astro obsolète, ne pas l'utiliser comme source de vérité.

## Header global

- Un seul header pour tout le site : `src/components/SiteHeader.astro`, rendu par `src/layouts/Layout.astro` (y compris les pages `bare` comme la home et le contact). Ne pas remettre de header dans les pages.
- Il est **fixe**. La carte « Horde Agence » garde toujours son fond plein sombre ; la **nav desktop n'a pas de fond** et change de couleur selon ce qui passe dessous.
- Le thème se pilote par annotation : `data-header-theme="dark"` (fond sombre → nav blanche) ou `data-header-theme="light"` (fond clair → nav noire).
  - Le `<body>` porte le thème par défaut de la page, déduit de `variant` du Layout (`dark` → `dark`, sinon `light`).
  - Chaque section dont le fond diffère du fond de page **doit** être annotée sur son élément racine pleine largeur (hero noir sur page claire, bandeau clair sur page sombre, footers…).
  - Au scroll, le script du header prend la section annotée qui coupe la ligne de la nav ; la plus profonde / la dernière dans le document gagne.
  - `headerVariant` du Layout = fond du **haut** de la page ; il sert de thème initial (rendu serveur, avant le JS) pour éviter un flash.
- Déjà annotés : sections de la home (`src/components/home/*`), `HeroStructure` (selon `background`), `ServiceHero`, hero des articles de blog, bandeau du contact (`.cc__band`), `Footer` (clair) et `HomeFooter` (sombre).
- Nouvelle section ou nouvelle page : vérifier la couleur de la nav en scrollant dessus, et annoter si besoin.
- Changement de langue : passer `alternateUrl` au Layout quand le slug diffère entre `fr` et `en`, sinon le lien Fr/Eng pointe vers une page inexistante.
