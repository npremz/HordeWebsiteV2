# Illustrations de novembre

## what-makes-a-good-web-interface

Fichier : src/assets/images/blog/what-makes-a-good-web-interface/featuredImage.png

Composition SVG faite à la main, sans génération d’image, rendue en PNG 1536 × 1024 avec Chromium. La palette est celle du site : ivoire, cobalt, lavande, vert acide et noir. Il n’y a aucun texte et le sujet est centré.
Un panneau d’interface ivoire avec son ombre lavande. Un seul chemin vert acide va d’un point noir jusqu’au bouton principal. Un livret noir refermé est posé à côté : c’est le mode d’emploi dont on n’a pas besoin. Une arche cobalt cadre l’ensemble à droite.

Les captures annotées de Loma (FR et EN) proviennent de la version de développement, capturée le 7 novembre 2026 en 1440 × 900 et en 390 × 844. Le badge de développement Next.js a été masqué. Les repères sont ajoutés par une page HTML de surimpression.

## website-ui-ux-audit

Fichier : src/assets/images/blog/website-ui-ux-audit/featuredImage.png

Composition SVG faite à la main (source : docs/editorial/2026-11/website-ui-ux-audit-cover.svg), sans génération d’image, rendue en PNG 1536 × 1024 avec Chromium. Palette du site : ivoire, cobalt, lavande, vert acide et noir, grain papier léger. Aucun texte, sujet centré.
Une nuée de points dispersés (les remarques à plat) passe par une loupe cobalt et en ressort en trois pastilles alignées, de la plus longue à la plus courte : vert acide, cobalt, ivoire. C’est la liste ordonnée que produit l’audit.

Captures annotées (FR et EN) : hordeagence.com en production, le 9 novembre 2026, Chromium 151, 1440 × 900 (DPR 1,5) et 390 × 844 (DPR 2). Les requêtes autres que GET étaient bloquées : aucun formulaire n’a été envoyé. Pour la comparaison du focus, le curseur clignotant est masqué (précisé dans la légende). La page de surimpression et les scripts de capture sont dans docs/editorial/2026-11/scripts/. Le menu mobile montré dans l’article anglais est celui de la version française, parce que c’est là que se trouve le défaut.

## best-ai-for-coding

Fichier : src/assets/images/blog/best-ai-for-coding/featuredImage.png

Composition SVG faite à la main (source : docs/editorial/2026-11/best-ai-for-coding-cover.svg), sans génération d’image, rendue en PNG 1536 × 1024 avec Chromium. Palette du site : ivoire, cobalt, lavande, vert acide et noir, grain papier léger. Aucun texte, sujet dans le carré central.
Quatre tuiles ivoire portent les logos de Claude, OpenAI, Gemini et DeepSeek, en noir (demande de Nicolas : utiliser les logos des IA). Seule la tuile Claude a une ombre vert acide et une piste pleine ; les trois autres pistes sont en pointillés gris. Toutes entrent dans un anneau cobalt (la revue humaine) qui ne laisse sortir qu’une pastille vert acide.
Logos : Claude, Google Gemini et DeepSeek depuis Simple Icons 16.38 (npm `simple-icons`) ; OpenAI depuis Wikimedia Commons, « OpenAI logo 2025 (symbol).svg ». Ce sont des marques de leurs propriétaires, utilisées ici à titre éditorial pour identifier les outils comparés.

## website-cost

Fichier : src/assets/images/blog/website-cost/featuredImage.png

Composition SVG faite à la main (source : docs/editorial/2026-11/website-cost-cover.svg), rendue en PNG 1536 × 1024 avec Chromium. Palette du site, grain papier léger, aucun texte, sujet centré.
Une étiquette de prix cobalt est reliée par un fil en pointillés à trois blocs d’interface ivoire de plus en plus grands (présenter, vendre, tester un produit) ; le plus grand porte un anneau vert acide. Le prix suit ce que le site doit faire.

Prix des outils relevés le 18 novembre 2026 depuis une connexion belge, locale fr-BE, avec les scripts de docs/editorial/2026-11/scripts/ (prices*.cjs, wix.cjs) : Wix fr.wix.com/pricing (Light 14 €, Essentiel 25 €, Business 34 € par mois en annuel, remise de 50 % sur la première période affichée ce jour-là), Framer (Basic 10 €/Pro 30 € en annuel, 15 €/45 € en mensuel), Lovable (Pro 21 €/Business 42 € en annuel, 25 €/50 € en mensuel), Webflow (Basic 15 $/Premium 25 $ en annuel, en USD).

## website-ai-builder-or-agency

Fichier : src/assets/images/blog/website-ai-builder-or-agency/featuredImage.png

Composition SVG faite à la main (source : docs/editorial/2026-11/website-ai-builder-or-agency-cover.svg), rendue en PNG 1536 × 1024 avec Chromium. Palette du site, grain papier, aucun texte, sujet centré.
Une feuille de brief (pastille vert acide) envoie trois chemins cobalt vers trois cadres d’interface : un désordonné, un presque vide, un presque complet marqué d’un anneau vert acide. Le même brief, trois résultats.

Preuve : les trois versions générées par Nicolas (Lovable, Framer AI, Wix AI, offres gratuites) à partir du même prompt, et la version de développement Horde (loma.dev.nicolas-premont.be), parcourues le 20 novembre 2026 dans Chromium 158 à 1440 × 900 et 390 × 844, axe-core 4.14.1, interactions testées (curseur, parallaxe, accordéon). Requêtes autres que GET bloquées. Figures sans texte de langue (noms d’outils seulement) : les légendes portent le FR et l’EN. Scripts : docs/editorial/2026-11/scripts/a3*.cjs.

## lovable-review

Fichier : src/assets/images/blog/lovable-review/featuredImage.png

Composition SVG faite à la main (source : docs/editorial/2026-11/lovable-review-cover.svg), rendue en PNG 1536 × 1024 avec Chromium. Palette du site, grain papier, aucun texte, sujet dans le carré central.
Un cadre d’application complet marqué d’une coche vert acide (le code fonctionne), relié par un trait cobalt à des cadres en pointillés vides (ce qui reste à construire : stratégie, contenus, suivi).

Preuve : l’app Loma générée par Nicolas avec Lovable (projet A3 transformé en app, Lovable Cloud), publiée le 24/11/2026. Audit du dépôt GitHub privé (migrations SQL, RLS), tests de la base de l’extérieur avec la seule clé publique (scripts/a4-rls.py ; aucune donnée créée), parcours Chromium 158 desktop et mobile + axe-core 4.14 (scripts/a4.cjs, a4f.cjs), figures annotées injectées dans la page publiée (scripts/a4g.cjs). Requêtes autres que GET bloquées.
