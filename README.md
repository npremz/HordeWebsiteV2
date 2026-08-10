# Horde Website V2

Site marketing multilingue de Horde Agence, construit avec Astro 7, Tailwind CSS 4 et quelques îlots React.

## Développement

```sh
npm install
npm run dev
```

## Commandes

| Command | Action |
| --- | --- |
| `npm run dev` | Lance le serveur local sur le port 4328 |
| `npm run check` | Vérifie Astro et TypeScript |
| `npm run check:seo` | Vérifie les invariants SEO du build |
| `npm run build` | Produit le build de production |
| `npm run preview` | Prévisualise le build |
| `npm run indexnow:posts` | Soumet les articles publiés à IndexNow |

## Structure

- `src/pages/[lang]/` : routes françaises et anglaises
- `src/content/` : contenus YAML et MDX
- `src/components/` : composants Astro et formulaire React
- `src/lib/site-data.ts` : réglages de site localisés
- `src/pages/api/contact.ts` : envoi du formulaire via Resend
