# Fondations SEO — novembre 2026

Branche : `seo/fondations-nov-2026` (indépendante de `staging`).
Base de décision : export Search Console des 3 derniers mois (août → novembre 2026,
recherche Web) et crawl de la production du 5 novembre 2026.

## 1. Ce que dit Search Console

- 36 clics, ~3 900 impressions, position moyenne ~30 sur 3 mois.
- Le site est visible mais presque toujours en page 3-5 sur les requêtes
  commerciales :
  - `agence web bruxelles` : 107 impressions, position 31 ;
  - `agence web developpement bruxelles` : 104 impressions, position 43 ;
  - `agence développement mvp` : 99 impressions, position 43 ;
  - `agence création e-commerce` (et variantes) : plusieurs centaines
    d'impressions cumulées, positions 30-70 ;
  - `seo audit belgie / belgië / belgium` : ~230 impressions, positions 43-58 ;
  - `audit seo bruxelles` : 53 impressions, position 26.
- Requêtes déjà proches de la page 1 (position ≤ 20) : `web agency brussels`
  (11,8), `horde agence` (11,4), `website vs social media` (13,4),
  `mvp delivery services belgium` (17,5), `brussels shopify agency` (17,2),
  `build mvp for investors belgium` (7,0), `hire mvp developers benelux` (5,2).
- La marque seule (`horde`) fait 206 impressions en position 8 : l'agence suisse
  horde.ch occupe le reste de la page de résultats.
- Les États-Unis génèrent 450 impressions sans clic : trafic anglophone hors
  cible, à ne pas poursuivre.
- La France représente 363 impressions : le contenu FR ne doit pas se limiter
  au signal `fr-BE`.

## 2. Modifications de cette branche

| Sujet | Avant | Après | Raison |
| --- | --- | --- | --- |
| hreflang | `fr-BE` / `en-US` | `fr` / `en` | Une seule version par langue ; ne pas exclure la France ni les anglophones européens |
| `<html lang>` / `inLanguage` EN | `en-US` | `en` | Cohérence avec le ciblage européen |
| Organization | `alternateName` unique | `Horde Bruxelles`, `Horde Agence Bruxelles`, `Horde Brussels` + fondateurs + Sortlist | Distinguer l'entité de horde.ch et relier les profils externes |
| Pages services | WebPage + FAQPage | + `Service` + `BreadcrumbList` | Décrire l'offre, le prestataire et la zone servie |
| Page `/services/` | WebPage | + `ItemList` + `BreadcrumbList` | Relier explicitement le hub aux pages services |
| Pages projets | WebPage | + `CreativeWork` + `BreadcrumbList` | Rattacher chaque réalisation à l'organisation |
| Slugs EN | `creation-ecommerce`, `creation-landing-page`, `optimisation-site-web` | `ecommerce-website-brussels`, `landing-page-design-brussels`, `website-optimization-brussels` | Slugs anglais pour les requêtes anglophones ; 301 depuis les anciens |
| Title audit | `Audit de site web offert à Bruxelles` | `Audit SEO technique offert à Bruxelles` | Aligné sur l'URL, le H1 et les requêtes `audit seo bruxelles` |
| Title audit EN | `Free website audit in Brussels` | `Free technical SEO audit in Brussels` | Requêtes `seo audit belgium` |
| `llms.txt` / `llms-full.txt` | Anciennes URLs, `Julien Designer`, `/en/projects` | URLs canoniques FR + EN, Alexandre Potakowski, `/en/projets/` | Les crawlers IA lisaient des informations fausses |
| `check-seo-build.mjs` | Attend `fr-BE` / `en-US` | Attend `fr` / `en` | Suivre la nouvelle configuration |

FAQPage est conservé : il n'apporte plus de résultat enrichi Google depuis mai 2026,
mais sa suppression n'apporterait rien.

### Local (NAP)

Coordonnées centralisées dans `src/lib/business-info.ts` (source unique) :

- téléphone `+32 487 47 97 98` : schéma Organization, ProfessionalService et
  ContactPoint, footer FR/EN, page contact, mentions légales ;
- adresse `Cantersteen 12, 1000 Bruxelles` : schéma, mentions légales, llms ;
- géocodage OpenStreetMap de l'adresse (50.84557, 4.35749) au lieu du centre
  de Bruxelles ;
- horaires du lundi au vendredi, 09:00-18:00 (`openingHoursSpecification`) ;
- zone desservie : Bruxelles et Belgique ;
- `hasMap` et `sameAs` vers la fiche Google
  (`https://www.google.com/maps?cid=12899482697467726429`), Sortlist, The Org ;
  profils Malt sur les fondateurs.

Constat sur la fiche Google (5 novembre 2026) : catégorie « Web design »,
adresse masquée (zone desservie), aucun avis. Le site affiche l'adresse ; la
fiche ne le fait pas. Si des clients peuvent être reçus à Cantersteen 12,
afficher l'adresse sur la fiche renforce le classement local à Bruxelles.

## 3. Vérifications effectuées

- `astro check` : 0 erreur, 0 avertissement.
- `SITE_ENV=production astro build` : OK, 54 URLs dans le sitemap.
- `npm run check:seo` : 82 pages HTML valides.
- `SITE_ENV=production npm run check:blog` : 24 routes visibles, 0 absente.
- JSON-LD parsé sans erreur sur accueil, hub services, services, projets et articles.
- Redirections 301 testées sur le serveur Node de production local.

## 4. Après la fusion

1. Search Console → Sitemaps : soumettre de nouveau `sitemap-index.xml`.
2. Inspecter puis demander l'indexation des trois nouvelles URLs EN.
3. Rich Results Test sur une page service et une page projet.
4. Suivre à J+28 : impressions EN des anciennes et nouvelles URLs services,
   position de `audit seo bruxelles`, impressions France.

Échec à surveiller : si les nouvelles URLs EN ne sont pas indexées à J+21 ou si
les anciennes restent en index, vérifier les 301 en production et les liens
internes restants.

## 5. Hors de cette branche (prochaines étapes)

- Fiche Google : vérifier jours d'ouverture, afficher l'adresse si possible, obtenir les premiers avis clients.
- Étude de cas Merly (272 mots, aucun H2) et Café Belga à développer.
- Contenu éditorial du hub `/services/` (aujourd'hui une simple liste de liens).
- Reprise du calendrier éditorial : aucun article depuis le 29 septembre.
- Ne pas versionner `docs/gsc/` (données Search Console brutes).
