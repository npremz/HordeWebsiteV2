# Audit du lot de septembre 2026

Revue du 14 septembre 2026. Périmètre : quatre nouveaux articles FR/EN, deux
versions enrichies FR/EN et les composants nécessaires à leur démonstration.
Validation finale de la voix et de la signature des auteurs : à faire sur staging.

## Qualité éditoriale

Grille `blog-analyze` appliquée manuellement au contenu, à ses métadonnées et au
rendu. C’est une heuristique interne de préparation éditoriale, pas une note de
Google, une probabilité de citation ou une garantie de classement. La lecture a
été adaptée à un public professionnel ; aucun score Flesch français n’est inventé.

Les colonnes notent le couple FR/EN en retenant la réserve de la version la plus
faible. Pour l’exploration, le score vise la version de production à sa date de
sortie ; le noindex de staging est intentionnel et n’est pas présenté comme une
page actuellement indexable.

| Article | Contenu /30 | SEO /25 | Confiance /15 | Technique /15 | Extractibilité /15 | Total /100 |
| --- | --- | --- | --- | --- | --- | --- |
| Direction artistique | 28 | 25 | 14 | 12 | 15 | 94 |
| Design et développement | 27 | 25 | 14 | 12 | 15 | 93 |
| Analyser une référence | 27 | 25 | 14 | 12 | 15 | 93 |
| Brief d’expérience | 28 | 25 | 14 | 12 | 15 | 94 |
| IA et expérience, mise à jour | 25 | 25 | 14 | 12 | 14 | 90 |
| Différenciation, mise à jour | 26 | 24 | 14 | 12 | 14 | 90 |

Justification et réserves :

- Contenu : réponse initiale, mécanisme expliqué, limites, exemple original et
  prochaine action. Les deux articles existants restent plus longs et répétitifs
  que les nouveaux. La démonstration technique est volontairement limitée au
  client ; les références publiques ne sont pas des études de leur efficacité.
- SEO : intentions distinctes, titres dédiés, slugs localisés, maillage aller et
  retour. La différenciation conserve une intention assez large. Aucun volume
  de recherche ni demande Search Console n’est présenté comme mesuré.
- Confiance : auteurs et biographies existants, contact et à-propos, sources
  primaires, exemples fictifs identifiés. Il n’existe pas de page publique dédiée
  à la politique éditoriale. Le score ne prétend pas que les auteurs ont déjà
  approuvé ces versions.
- Technique : schémas et métadonnées présents, images dérivées WebP, tableaux
  HTML, atelier responsive. Les deux points de performance terrain ne sont pas
  accordés : pas de LCP/INP/CLS réels mesurés. Un point social reste réservé,
  faute de cartes OG dédiées au ratio 1200 × 630 pour les quatre nouveaux sujets.
- Extractibilité : conclusion visible, concepts définis, comparaisons et sources
  dans le HTML initial. Les longs articles existants pourraient encore être
  resserrés. Aucun quota de statistiques ou de FAQ n’a motivé un ajout artificiel.

Le score éditorial ne neutralise pas l’alerte de sécurité détaillée plus bas.

## Contenu et maillage

Mesures du validateur Horde sur les corps MDX, hors métadonnées et ateliers.
Les liens externes comptent également leur rappel dans la section Sources.

| Slug de stockage | Mots FR / EN | Liens internes FR / EN | Liens externes FR / EN | Entrants contextuels FR / EN | Lecture affichée |
| --- | --- | --- | --- | --- | --- |
| art-direction-for-web-interfaces | 1392 / 1385 | 6 / 6 | 6 / 6 | 5 / 5 | 7 min |
| design-and-web-development-together | 1428 / 1431 | 5 / 5 | 8 / 8 | 1 / 1 | 7 min |
| analyse-web-interface-without-copying | 1369 / 1384 | 5 / 5 | 6 / 6 | 3 / 3 | 7 min |
| web-design-brief-before-screens | 1509 / 1485 | 5 / 5 | 6 / 6 | 3 / 3 | 8 min |
| ai-can-create-interfaces-not-experiences | 2578 / 2296 | 10 / 10 | 10 / 10 | 5 / 5 | 13 min |
| how-to-make-your-website-stand-out-2026 | 2625 / 2411 | 10 / 10 | 14 / 14 | 4 / 4 | 13 min |

Les nouveaux liens entrants proviennent notamment des deux articles mis à jour.
Les liens vers des cibles encore futures sont du texte simple dans le build
public, puis s’activent avec leur publication. Les cartes associées et listings
sont filtrés eux aussi. Pas de lien vers le pilier d’octobre encore inexistant.

Les fichiers de chaque ligne sont `src/content/posts/<slug>.yaml` et
`src/content/posts/<slug>/content_fr.mdx` / `content_en.mdx`. Les URLs localisées
de relecture figurent dans README.md ; seule l’origine changera en production.

## Preuves et images

Les couvertures nouvelles sont des PNG 1536 × 1024 dans
`src/assets/images/blog/<slug>/featuredImage.png`, avec textes alternatifs FR/EN.
Le build produit leurs dérivés WebP. Prompts exacts et provenance : images.md.
Les deux anciennes couvertures sont conservées, respectivement 1731 × 909 et
1200 × 630. Inspection du cadrage source et des ateliers au rendu effectuée.

- Direction artistique : même offre fictive, deux traitements, trois observations
  visibles. Aucune prétention de hausse de conversion.
- Design/développement : formulaire local, largeur réduite, libellé long,
  saisie invalide, correction et confirmation. Pas de serveur de réservation.
- Références : trois schémas originaux liés aux documentations GOV.UK/Primer,
  explicitement distincts de captures de leurs produits.
- Brief : six champs, exemple fictif, confirmation avant remplacement d’une
  saisie existante, export Markdown dans le navigateur, sans envoi des champs.
- IA : six dimensions de revue et comparaison de priorités sans test utilisateur
  ni sentiment attribué automatiquement à une personne.
- Différenciation : diagnostic observation / décision / vérification et
  comparaison visuelle du même exemple.

## Vérification factuelle

Sources consultées le 14 septembre. Les URLs détaillées des quatre créations
sont dans briefs.md et près des affirmations dans chaque version.

| Affirmation importante | Source primaire et conclusion de vérification |
| --- | --- |
| Contraste 4,5:1 courant / 3:1 grand texte selon la définition du critère | [W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), seuils et limite conservés |
| La couleur seule ne suffit pas pour une information essentielle | [W3C](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), principe correctement délimité |
| Réduction du mouvement et comportement natif des boutons | [MDN mouvement](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), [MDN button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button) |
| Reflow et validation client/serveur | [W3C reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [WAI formulaires](https://www.w3.org/WAI/tutorials/forms/validation/), la démo ne revendique pas une conformité globale |
| Travail restant, résumé d’erreurs, état vide | [Task list](https://design-system.service.gov.uk/components/task-list/), [error summary](https://design-system.service.gov.uk/components/error-summary/), [Primer](https://primer.style/product/components/blankslate/), motifs et conditions d’usage distingués |
| Cadrage du problème et hypothèses de besoins | [Découverte GOV.UK](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works), [besoins](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs) |
| Implication des utilisateurs et accessibilité | [WAI](https://www.w3.org/WAI/planning/involving-users/), complément aux contrôles techniques |
| Revue des interactions IA au-delà de l’état idéal | [Microsoft HAX](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/), [Google PAIR](https://pair.withgoogle.com/guidebook-v2/), sources conservées |
| Homogénéisation d’idées ou de récits dans des expériences définies | [Anderson et al.](https://arxiv.org/abs/2402.01536), [Doshi et Hauser](https://arxiv.org/abs/2312.00506), aucune extrapolation démontrée au Web entier |
| Pas de hausse significative des marqueurs visuels étudiés | [Web Almanac 2025](https://almanac.httparchive.org/en/2025/generative-ai), portée limitée à son analyse |
| 8 % / 15 % de clics sur des résultats traditionnels | [Pew](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/), données de mars 2025, 900 adultes américains, association non causale |
| 95,9 % / 83,9 % / 53,1 % | [WebAIM Million 2026](https://webaim.org/projects/million/), février 2026, un million de pages d’accueil, limites des vérifications automatiques explicitées |

Un ancien lien de dépôt universitaire ne répondait plus ; le texte cite la
version auteur sur arXiv. Les DOI d’identification restent dans les Sources.
Les promesses de génération « en quelques minutes » ont été distinguées des
délais réels d’un projet. Le lien supposé entre style générique et trafic payant
a été retiré en tant que causalité.

## Diagnostics de voix

`python3 docs/editorial/2026-09/style-check.py` génère style-results.json.
Aucune occurrence des expressions de la liste de contrôle, aucun tiret cadratin
dans les douze corps, aucun paragraphe de prose de plus de 150 mots.
Moyennes descriptives : 12,25 à 15,78 mots par phrase ; écarts-types 4,88 à 7,45 ;
ratios lexicaux 0,397 à 0,486. Le découpage est heuristique, pas un test linguistique
normalisé. Aucun de ces chiffres ne permet d’inférer l’origine d’un texte.

Revue de structure : les guides utilisent des impératifs parce qu’ils conduisent
une action. L’analyse des références répète observation / principe / limite pour
permettre la comparaison. Les anciens articles conservent davantage de rappels
de la thèse ; un resserrement est une retouche possible, pas un fait manquant.
Le ton évite la surenchère commerciale et distingue préférence, hypothèse et preuve.

## Contrôles exécutés

- Validateur Horde : six contenus, douze versions, zéro erreur. Seuls les quatre
  avertissements attendus de dates futures subsistent après `draft: false`.
- `npm run check` : zéro erreur, zéro warning, 17 hints préexistants dans le
  site, aucun dans le nouveau composant.
- Build staging et `check:seo` : 82 pages HTML, succès.
- Build production au 14/09 et `check:seo` : 74 pages HTML, succès ;
  `check:blog` confirme 16 routes blog visibles et 8 absentes.
- Build simulé au 18/09 à 00:00 UTC : 78 pages HTML ; 20 routes blog visibles,
  4 absentes. Les deux premiers articles seulement deviennent publics.
- Build simulé au 30/09 à 12:00 UTC : 82 pages HTML ; 24 routes blog visibles.
- Validateur Horde `--built` sur ce dernier artefact isolé : HTML FR/EN, sitemap
  et RSS présents pour les six contenus. Ce n’est pas le build publié aujourd’hui.
- Combinaison production + aperçu forcé : refus du build vérifié, comme attendu.
- Playwright Chromium : 24 cas, soit 6 articles × 2 langues × 2 largeurs
  (375 et 1440 pixels), clavier, états, champs conservés, export et absence
  d’envoi inattendu au site. Pas d’erreur JavaScript ni débordement horizontal.
- Axe : zéro violation A/AA détectée dans les ateliers dans ces 24 cas. Le
  contrôle est limité à ces composants et ne constitue pas un audit du site entier.
- Les workflows YAML et la syntaxe shell de fusion sont vérifiés localement.
  La CI GitHub ajoutée rejoue typecheck, build, SEO et visibilité des deux environnements.

Un premier passage navigateur a été interrompu après 22 cas lors d’un chevauchement
de tests sur ce petit serveur. Le passage complet suivant, isolé avec une limite
mémoire, a réussi les 24 cas. Un build de contrôle a également été interrompu
volontairement puis rejoué avec succès. Ces interruptions ne sont pas comptées
comme des validations réussies.

Les captures et artefacts détaillés de la session sont conservés dans
`/tmp/horde-september-review.olhM7j/`. Aucun de ces répertoires de test n’est publié
par le site. Ne pas charger son fichier d’horloge simulée dans un build de déploiement.

## Sécurité des dépendances : réserve avant production

Le lockfile initial, inchangé par ce lot, produit 14 alertes npm au total
(5 modérées, 8 hautes, 1 critique). Avec `--omit=dev` : 9 alertes
(1 modérée, 7 hautes, 1 critique). Aucun `npm audit fix` général n’a été appliqué.

L’[avis Astro GHSA-26w7-cxv4-gfx2](https://github.com/advisories/GHSA-26w7-cxv4-gfx2)
concerne le traitement d’une image AVIF non fiable par le service Sharp et indique
un correctif Astro 7.2.8 avec Sharp 0.35.4. Les nouveaux visuels de ce lot sont des
PNG locaux maîtrisés ; aucune voie d’import publique d’AVIF n’a été ajoutée.
Cela ne vaut pas démonstration de non-exploitabilité de l’ensemble du site.

Avant de fusionner en production, traiter cette mise à niveau dans un changement
distinct et vérifier les autres alertes (notamment js-yaml et les dépendances de
build), puis rejouer les contrôles. Le contrôle éditorial n’est pas un audit de
sécurité et ne doit pas masquer cette réserve.

## Décision de sortie

Lot prêt pour la relecture staging. Production, cron Dokploy, approbations des
auteurs et éventuelles fusions programmées restent distincts et non activés par
cette demande. Les changements matériels des mises à jour sont conservés dans
deux commits séparés pour faciliter leur revue et leur transfert ultérieur.
