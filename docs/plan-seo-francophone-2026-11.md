# Plan SEO francophone (France) — en attente

Relevé du 7 novembre 2026. **À lancer après la mise en ligne de la nouvelle
version du site** (branche `newHome`). Priorité secondaire : le canal principal
reste le contenu réseaux sociaux.

Source : OpenSEO / DataForSEO, `get_keyword_metrics` sur ~220 requêtes
commerciales (France 2250, Suisse 2756, Canada 2124, langue fr) + 10 SERP live.
Entrée du journal de recherche OpenSEO : `e9d5a36b`.

## Verdict

- **France = seul marché utile.** Suisse romande et Québec : demande locale
  (agence web lausanne/genève/montréal) tenue par des agences locales ; offres
  de niche ≤ 10/mois. À ne pas viser.
- **Les gros volumes FR sont hors de portée** : « agence web » 6 600,
  « création site internet » 6 600, « agence web [ville] » 590–1 900 =
  intention locale, pack Maps + agences de la ville. Pas de pages par ville
  française (doorway pages).
- **Volume réellement atteignable** : ~3 000–4 000 recherches/mois cumulées
  (variantes proches non additionnées). Estimation, pas une mesure : top 5 sur
  une partie en 12–18 mois → 150–300 visites/mois, 1–3 contacts/mois, surtout
  des PME françaises (pas des startups).

## Ce qu'on fait (dans l'ordre)

### 1. Guide « prix d'un site internet » pour la France
Meilleur rapport effort/résultat.

| Requête | Vol. FR | KD |
| --- | --- | --- |
| prix site internet | 880 | 0 |
| devis site internet | 480 | 0 |
| site vitrine prix | 390 | 0 |
| refonte site internet | 390 | 0 |
| création site internet prix / prix création site internet | 260 | 19 |
| tarif site internet | 210 | 20 |
| combien coûte un site internet | 110 | 13 |
| prix refonte site internet | 70 | 0 |

- SERP : petites agences FR avec guides (shareout.fr, perfekto.fr,
  moon-digital.fr, lemon-interactive.fr, blog.simplebo.fr), Wix, Sortlist.
  Concurrents de notre taille.
- Format : vraies fourchettes Horde en €, sans ancrage Bruxelles, tableau par
  type de site (vitrine, sur mesure, e-commerce, refonte). Le format chiffré
  est celui que ChatGPT reprend déjà (`/fr/blog/combien-coute-refonte-site-web/`).
- Possibilité : élargir l'article refonte existant plutôt que doublonner →
  décider au moment du brief (risque de cannibalisation).

### 2. Page « application web sur mesure » (francophonie, sans ville)
Meilleur alignement avec l'offre.

| Requête | Vol. FR | CPC |
| --- | --- | --- |
| développement application web | 140 | 58,60 $ |
| application web sur mesure | 140 | 1,85 $ |
| agence application web | 110 | 23,29 $ |
| création application web | 20 | 8,54 $ |

- SERP : petites agences FR (ouidou.fr, captiz.fr, imagile.fr,
  nocodefactory.fr) + listes (digitalunicorn.fr). Faible, gagnable.
- Y rattacher les webapps événementielles comme cas d'usage (application
  événementielle 110, plateforme événementielle 170 — cette dernière = outils
  SaaS, ne pas la viser seule).

### 3. Page agence UX/UI délocalisée
| Requête | Vol. FR |
| --- | --- |
| agence ux ui / agence ui ux | 260 / 260 |
| agence ux | 210 |
| agence ux design | 170 |
| consultant ux | 110 |

- SERP : agences parisiennes (galadrim.fr, 40-60studio.com, yumens.fr) +
  comparatifs (trustfolio.co, sortlist.fr, wolfox.studio, jujotte.fr).
- Condition : études de cas réelles avec résultats. Viser aussi l'inclusion
  dans les comparatifs (trustfolio, sortlist).

### 4. Accessibilité — décision stratégique, pas un article
| Requête | Vol. FR |
| --- | --- |
| rgaa | 8 100 |
| accessibilité numérique | 1 300 |
| audit rgaa | 390 (CPC 14,61 $) |
| european accessibility act | 260 |
| audit accessibilité | 170 (CPC 15,19 $) |
| déclaration d'accessibilité | 140 |

- SERP : sites gouv (design.numerique.gouv.fr, accessibilite.numerique.gouv.fr)
  + spécialistes certifiés (Access42, Urbilog, Tanaguru, Boscop, audit-web.com).
- Soit on en fait une vraie expertise (page EAA Belgique + France, offre
  d'audit), soit on laisse. Pas d'article isolé.

## Ce qu'on ne fait pas

- Pages « agence web [ville française] ».
- Suisse romande, Québec.
- SEO MVP / SaaS / headless / Astro (FR : agence mvp 40, développement mvp 30,
  agence astro 10, agence headless 10).
- « agence webflow » (1 000, KD 5) — uniquement si Horde se met à Webflow.

## Prérequis avant de lancer

1. Nouvelle version en ligne, sans régression SEO (voir audit pré-lancement
   OpenSEO `565a47b8` : commits 9e9e564 et d9ea9e5 à merger dans `newHome`).
2. Objectif « Contact » configuré dans Plausible, pour mesurer les leads FR.
3. Prix publics décidés (le guide prix en dépend).

## Suivi

- Ajouter les requêtes ci-dessus au rank tracker OpenSEO (marché France) au
  lancement des pages.
- Revoir à 6 mois : position, clics GSC par pays, contacts France.
