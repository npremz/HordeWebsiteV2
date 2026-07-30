# Audit SEO des titles et meta descriptions — juillet 2026

## Périmètre

Audit réalisé sur le build Astro complet, puis vérifié sur plusieurs pages en production.

- 94 routes localisées FR/EN générées
- 38 pages en `index, follow`
- 56 pages en `noindex`
- Les redirections non localisées (`/about`, `/blog`, etc.) ne sont pas à optimiser
- La home FR est conservée telle quelle, conformément à la demande

Les titles proposés ci-dessous correspondent au **title source**. Le composant SEO ajoute ensuite automatiquement ` | Horde Agence`, sauf sur les homes où la marque est placée en préfixe.

## Diagnostic prioritaire

### P0 — Corriger le gabarit de title

Trois services FR et trois services EN contiennent déjà `| Horde` dans leur title source. Le composant ajoute ensuite `| Horde Agence`, ce qui produit des titres comme :

`Audit de site web offert à Bruxelles | Horde | Horde Agence`

Il faut retirer `| Horde` des YAML. Une seule signature de marque suffit.

### P0 — Réécrire les pages projets

Les deux études de cas indexées utilisent des titles longs, répétitifs et peu naturels :

- `Merly - Site vitrine UX par Horde, agence web à Bruxelles | Horde Agence`
- `Café Belga - Site vitrine UX par Horde, agence web à Bruxelles | Horde Agence`

Le mot-clé local est forcé, `site vitrine UX` est peu naturel et la marque apparaît deux fois. Les descriptions sont génériques et ne disent presque rien du travail réalisé. Google remplace déjà la description de Merly par le corps de page, signe que la meta actuelle répond mal à la page.

### P0 — Corriger le H1 de la page projets

Les pages `/fr/projets/` et `/en/projets/` affichent actuellement un H1 de blog :

- FR : `Divers articles sur la technologie, le design et notre expérience`
- EN : `Various articles about technology, design, and our experience`

Ce n’est pas un problème de meta, mais c’est une incohérence SEO majeure entre le title, le H1 et le contenu.

### P1 — Réécrire la page services

Le title actuel est acceptable mais générique. La description actuelle parle d’« approche consultative » et d’« expériences digitales » sans nommer clairement ce qui est vendu. Elle doit citer les services et le bénéfice.

### P1 — Découpler les titles SEO des H1 d’articles

Les articles utilisent aujourd’hui le même champ pour le H1 et le `<title>`. Deux articles dépassent nettement la zone d’affichage habituelle :

- `Ce que votre site vous coûte vraiment (sans que vous le sachiez) | Horde Agence` — 79 caractères
- `Pourquoi avoir un site web quand les réseaux sociaux marchent déjà ? | Horde Agence` — 83 caractères

Ajouter `seoTitle_fr` et `seoTitle_en` au schéma des articles permettrait de garder les H1 éditoriaux tout en utilisant des titles plus courts et orientés recherche.

### P1 — Revoir l’indexation des catégories

`/fr/blog/category/strategie/` et `/en/blog/category/strategy/` sont indexées dès qu’elles contiennent trois articles. Les autres catégories sont en `noindex`. Une archive de trois liens et une courte introduction apporte peu de valeur autonome.

Recommandation : laisser toutes les catégories en `noindex, follow` jusqu’à au moins cinq articles, ou enrichir chaque catégorie avec un vrai texte d’introduction, des sous-thèmes et des liens éditoriaux.

### P2 — Nettoyer la qualité éditoriale

- La description FR de l’article réseaux sociaux perd ses accents : `deja`, `Controle`, `credibilite`.
- Le title de l’article performance devrait utiliser une espace avant `?` en français.
- `showcase website` est une traduction peu naturelle en anglais.
- `perf` dans un title est moins explicite que `performance`.
- La description MVP FR atteint 159 caractères avant éventuelle réécriture par Google.
- La page Merly répète deux fois les mêmes paragraphes dans le HTML de production.

## Recommandations — pages FR indexables

### Pages institutionnelles et listings

| URL | Verdict actuel | Title source recommandé | Meta description recommandée |
|---|---|---|---|
| `/fr/` | Bon, conserver | `Création de site web sur mesure à Bruxelles` | `Horde Agence, agence web à Bruxelles, crée votre site web sur mesure : design pro, site rapide, SEO solide et accompagnement complet. Audit site web offert.` |
| `/fr/about/` | Correct mais répétitif avec la signature de marque | `L’équipe derrière Horde, agence web à Bruxelles` | `Découvrez les deux experts derrière Horde : un designer et un développeur qui créent à Bruxelles des sites sur mesure, rapides et simples à faire évoluer.` |
| `/fr/contact/` | Bon mot-clé, proposition trop générique | `Contactez notre agence web à Bruxelles` | `Parlez-nous de votre site, refonte, e-commerce ou MVP. Horde vous répond avec des priorités claires et vous propose un premier audit sans engagement.` |
| `/fr/services/` | Description trop abstraite | `Création, refonte et optimisation web à Bruxelles` | `Audit, refonte, e-commerce, landing page, MVP ou optimisation : découvrez les services de Horde pour créer un site rapide, clair et conçu pour convertir.` |
| `/fr/projets/` | Title correct, formulation améliorable | `Portfolio web : nos projets sur mesure à Bruxelles` | `Découvrez les sites et interfaces conçus par Horde à Bruxelles : stratégie, identité, UX, développement sur mesure et performance web.` |
| `/fr/blog/` | Correct mais angle trop étroit | `Guides SEO, UX et performance web` | `Guides concrets sur la création et la refonte de sites, l’UX, le SEO technique et la performance web, par l’équipe de Horde à Bruxelles.` |
| `/fr/blog/category/strategie/` | Archive trop mince | **Passer en `noindex, follow`** | Conserver la description actuelle tant que la catégorie reste en `noindex`. |

### Services

| URL | Problème principal | Title source recommandé | Meta description recommandée |
|---|---|---|---|
| `/fr/services/audit-offert/` | Double marque | `Audit de site web offert à Bruxelles` | `Recevez un diagnostic gratuit de votre site : vitesse, SEO technique, UX et conversions, avec des priorités concrètes sous 48 h et sans engagement.` |
| `/fr/services/refonte-site-web/` | `perf` trop vague | `Refonte web à Bruxelles : UX, SEO et performance` | `Horde refond votre site pour améliorer sa clarté, sa vitesse, son SEO et ses conversions, avec une architecture solide et un devis sous 48 h.` |
| `/fr/services/creation-ecommerce/` | Double marque | `Création de site e-commerce à Bruxelles` | `Créez une boutique Shopify ou sur mesure, rapide et pensée pour vendre : parcours d’achat fluide, SEO e-commerce, performance et autonomie.` |
| `/fr/services/creation-landing-page/` | Double marque | `Création de landing page à Bruxelles` | `Transformez vos clics en leads ou en ventes avec une landing page sur mesure, rapide et optimisée pour Google Ads, le SEO et les campagnes sociales.` |
| `/fr/services/creation-mvp-saas/` | Description longue et maladroite | `Développement de MVP SaaS à Bruxelles` | `Validez votre idée avec un MVP SaaS fiable : cadrage, UX, développement web et mise en production rapide, sans construire de fonctions inutiles.` |
| `/fr/services/optimisation-site-web/` | Bon ensemble, peut être plus orienté résultat | `Optimisation de site web à Bruxelles` | `Améliorez la vitesse, les Core Web Vitals et le SEO technique de votre site grâce à un plan d’action priorisé, sans lancer une refonte complète.` |

### Projets

| URL | Problème principal | Title source recommandé | Meta description recommandée |
|---|---|---|---|
| `/fr/projets/merly/` | Trop long, générique, snippet réécrit | `Site web Merly Patrimoine : UX et simulateur` | `Identité, UX, développement et simulateur fiscal : découvrez le site conçu par Horde pour moderniser l’expérience digitale de Merly Patrimoine.` |
| `/fr/projets/cafe-belga/` | Trop long et mot-clé forcé | `Site web du Café Belga : UX et web design` | `Découvrez la refonte digitale du Café Belga par Horde : direction artistique, expérience mobile et site rapide au service de cette adresse bruxelloise.` |

### Articles

Les titles ci-dessous supposent l’ajout de champs SEO séparés afin de ne pas modifier nécessairement les H1.

| URL | Problème principal | Title source SEO recommandé | Meta description recommandée |
|---|---|---|---|
| `/fr/blog/combien-coute-refonte-site-web/` | Bon fond, peut mieux coller à la requête prix | `Prix d’une refonte de site web en 2026` | `Découvrez les prix d’une refonte de site web en 2026, les facteurs qui font varier le devis et les coûts souvent oubliés avant de fixer votre budget.` |
| `/fr/blog/c-est-quoi-un-site-vraiment-rapide/` | Formulation orale et ponctuation | `Site web rapide : Core Web Vitals en 2026` | `LCP, INP, CLS, mobile et poids des pages : découvrez comment mesurer et améliorer la vitesse d’un site pour renforcer SEO, UX et conversions.` |
| `/fr/blog/ce-que-votre-site-vous-coute-vraiment/` | Title beaucoup trop long | `Combien vous coûte un site web peu performant ?` | `Conversions perdues, SEO qui stagne et crédibilité affaiblie : estimez le coût réel d’un site peu performant et identifiez les corrections prioritaires.` |
| `/fr/blog/pourquoi-avoir-un-site-web-reseaux-sociaux/` | Title trop long, description sans accents | `Site web ou réseaux sociaux : que choisir en 2026 ?` | `Site web ou réseaux sociaux ? Comparez contrôle, visibilité SEO, crédibilité et acquisition pour construire une présence digitale durable et indépendante.` |

## Recommandations — pages EN indexables

### Institutional and listing pages

| URL | Current verdict | Recommended source title | Recommended meta description |
|---|---|---|---|
| `/en/` | Good; minor optimization only | `Web agency in Brussels for fast custom websites` | `Horde Agence builds fast custom websites in Brussels, combining strategic UX, clean development and technical SEO to help ambitious companies grow.` |
| `/en/about/` | Correct but generic | `Meet Horde, a web agency in Brussels` | `Meet the designer and developer behind Horde, building fast custom websites in Brussels with clear UX, reliable code and direct collaboration.` |
| `/en/contact/` | Good keyword, generic copy | `Contact our web agency in Brussels` | `Tell Horde about your website, redesign, e-commerce or MVP project. Get a clear first assessment, practical next steps and direct expert support.` |
| `/en/services/` | Description too abstract | `Web design, redesign and optimization in Brussels` | `Explore Horde’s website audit, redesign, e-commerce, landing page, SaaS MVP and optimization services for faster, clearer digital experiences.` |
| `/en/projets/` | “Fast website projects” is unnatural | `Web design portfolio: custom projects in Brussels` | `Explore websites and digital products designed by Horde in Brussels, combining strategy, brand identity, UX, custom development and performance.` |
| `/en/blog/` | Decent but narrow positioning | `Website strategy, SEO and performance guides` | `Practical guides on website strategy, redesign, UX, technical SEO and web performance from Horde’s design and development team in Brussels.` |
| `/en/blog/category/strategy/` | Thin archive | **Switch to `noindex, follow`** | Keep the current description while the category remains `noindex`. |

### Services

| URL | Main issue | Recommended source title | Recommended meta description |
|---|---|---|---|
| `/en/services/audit-offert/` | Duplicate brand | `Free website audit in Brussels` | `Get a free review of your website’s speed, technical SEO, UX and conversion journey, with clear priorities delivered within 48 hours.` |
| `/en/services/refonte-site-web/` | Too long after the automatic suffix | `Website redesign in Brussels: UX, SEO and speed` | `Horde redesigns websites to improve clarity, speed, technical SEO and conversion, with a solid information architecture and measurable priorities.` |
| `/en/services/creation-ecommerce/` | Duplicate brand and long title | `E-commerce website development in Brussels` | `Launch a fast Shopify or custom online store built to sell, with frictionless buying journeys, e-commerce SEO and easy content management.` |
| `/en/services/creation-landing-page/` | Duplicate brand | `Landing page development in Brussels` | `Turn campaign clicks into leads or sales with a fast custom landing page optimized for Google Ads, organic search and social campaigns.` |
| `/en/services/creation-mvp-saas/` | Good title, weak differentiation | `SaaS MVP development in Brussels` | `Validate your product idea with a reliable SaaS MVP, from scope and UX to web development and launch, without building unnecessary features.` |
| `/en/services/optimisation-site-web/` | Good but could be more outcome-led | `Website performance optimization in Brussels` | `Improve website speed, Core Web Vitals and technical SEO with a prioritized action plan that fixes bottlenecks without a complete redesign.` |

### Projects

| URL | Main issue | Recommended source title | Recommended meta description |
|---|---|---|---|
| `/en/projets/merly/` | Long and unnatural “showcase website” wording | `Merly Patrimoine website: UX and tax simulator` | `Explore the brand identity, UX, development and interactive tax simulator Horde created for independent wealth firm Merly Patrimoine.` |
| `/en/projets/cafe-belga/` | Long and keyword-stuffed | `Café Belga website: UX and web design` | `Explore Café Belga’s digital redesign by Horde, combining art direction, mobile UX and fast development for a landmark Brussels venue.` |

### Articles

| URL | Main issue | Recommended SEO source title | Recommended meta description |
|---|---|---|---|
| `/en/blog/how-much-does-a-website-redesign-cost/` | Good intent, title slightly long | `Website redesign costs in 2026` | `Compare website redesign prices in 2026, understand what changes a quote and uncover the costs agencies often leave out before setting your budget.` |
| `/en/blog/what-is-a-really-fast-website/` | Awkward capitalization and phrasing | `Fast websites and Core Web Vitals in 2026` | `Learn how LCP, INP, CLS, mobile performance and page weight affect website speed, technical SEO, user experience and conversion.` |
| `/en/blog/what-your-website-really-costs/` | Title much too long | `What is an underperforming website costing you?` | `Lost conversions, stagnant SEO and weaker credibility add up. Estimate the real cost of an underperforming website and prioritize the right fixes.` |
| `/en/blog/why-have-a-website-when-social-media-works/` | Title too long | `Website vs social media: what should you own?` | `Compare websites and social media for control, search visibility, credibility and acquisition, and build a digital presence your business truly owns.` |

## Pages en noindex : traitement recommandé

### À conserver en `noindex`

- 32 pages de tags : elles ne contiennent chacune qu’un article
- 4 catégories Performance Web / UX Design FR et EN : contenu trop mince
- 12 filtres projets par service : zéro à deux projets, sans valeur autonome
- 6 pages légales localisées
- 2 pages 404 localisées

Il n’est pas rentable d’optimiser individuellement les titles et descriptions de ces 56 URLs tant qu’elles restent en `noindex`.

### À surveiller

Les filtres `/[lang]/projets/[service]/` réutilisent exactement les titles et descriptions des pages `/[lang]/services/[service]/`. Le `noindex` évite aujourd’hui la cannibalisation, mais si ces filtres deviennent indexables il faudra :

1. leur donner un contenu réellement distinct ;
2. utiliser des titles orientés portfolio, par exemple `Projets de refonte web réalisés par Horde` ;
3. ne les indexer qu’à partir de trois à cinq études de cas solides.

## Ordre d’exécution recommandé

1. Retirer les six occurrences de `| Horde` dans les YAML services.
2. Réécrire les deux projets FR/EN et supprimer le contenu Merly dupliqué.
3. Corriger le H1 des index projets FR/EN.
4. Réécrire l’index services et les pages contact/about/projets.
5. Ajouter `seoTitle_fr` et `seoTitle_en` aux articles, puis appliquer les huit titles courts.
6. Passer la catégorie Stratégie FR/EN en `noindex` tant qu’elle reste mince.
7. Déployer, demander une nouvelle exploration des pages prioritaires dans Search Console et comparer le CTR après 28 jours.

## Mesure

Ne pas juger les changements uniquement avec `site:hordeagence.com`, qui n’est ni exhaustif ni classé par priorité SEO. Utiliser Search Console :

- requête + page ;
- impressions ;
- position moyenne ;
- CTR avant/après sur 28 jours comparables ;
- taux de réécriture des snippets observé manuellement sur les pages prioritaires.

Google peut réécrire un title ou une meta description selon la requête. L’objectif est donc de rendre chaque proposition plus fidèle à la page, plus distinctive et plus utile au clic, pas seulement de respecter une longueur fixe.
