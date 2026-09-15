# Pilote bilingue : Vucko

Cette page conserve la trace de la réécriture et de sa première validation
technique. Mise à jour ultérieure du 15 septembre : Nicolas a demandé la sortie
du brouillon ; `draft: false`, date du 22 septembre conservée. L'anglais a ensuite
été aligné sur Vucko. Voir le [README](README.md) pour l'état courant et le
correctif du hero.

15 septembre 2026. Choix de référence validé par Nicolas avant réécriture.
Le texte final reste à relire : l'accord sur Vucko ne vaut pas validation de
l'article, de sa traduction ou de sa publication.

## Périmètre

- [Pilote FR sur staging](https://waf.hordagency.com/fr/blog/analyser-interface-web-sans-copier/).
- Titre et slugs conservés. Résumé, description SEO et points clés FR adaptés.
- 1012 mots FR hors captures et légendes, trois liens internes et trois entrants.
- Cinq H2, dont Sources. Trois captures au fil du raisonnement, aucun atelier,
  formulaire, iframe ou nouveau JavaScript d'article.
- Couverture existante conservée, 1536 × 1024.
- Anglais réécrit nativement sur Vucko : 1017 mots, cinq H2, trois captures et
  trois liens internes anglais. `readingTime: 6` est partagé par la paire.
- `draft: false` pour la paire. Date du 22 septembre conservée.
  Pas de `modifiedDate` antérieur à une première publication encore future ;
  la date réelle de cette révision est consignée ici et dans Git.
- Aucun autre article réécrit, aucune production ni automatisation modifiée.

## Intention et distinction SEO

Le lecteur prépare son site et cherche à expliquer le niveau de qualité qu'il
attend d'une agence sans commander une copie. L'article suit Vucko, puis
transpose les observations à un bureau d'architecture intérieure explicitement
fictif. Il ne devient pas un guide général de direction artistique ni un nouveau
brief : les articles correspondants restent liés comme prolongements.

Les détails peuvent servir la personnalité et le plaisir, sans devoir leur
inventer un résultat de conversion. La qualité des contenus, le rôle du studio
et la cohérence de la navigation sont distingués du style à ne pas reproduire.

## Captures et sources

Captures Chromium réelles en 1440 × 1000, le 15 septembre 2026. Ni les textes,
ni le DOM, ni les couleurs n'ont été retouchés. Aucune reconstruction par IA.
Les vidéos jouaient normalement ; une capture conserve un instant de lecture,
pas le mouvement. Aucun consentement facultatif accepté, aucun formulaire envoyé.

| Fichier sous src/assets/images/blog/analyse-web-interface-without-copying/ | Page | État montré |
| --- | --- | --- |
| vucko-home.png | https://vucko.co/ | Accueil et projet Google Next en grand |
| vucko-project.png | https://vucko.co/work/spotify-wrapped-2025 | Projet ouvert depuis la liste latérale, séquence vidéo en situation |
| vucko-context.png | https://vucko.co/work/spotify-wrapped-2025 | Défilement de 620 px, Context et Outcome visibles |

Les fichiers source et les observations sont conservés dans
`/tmp/horde-vucko-rewrite.HsIlNT/`. La deuxième image retenue est
`vucko-project-option-2.png`, capturée à 09:26:18 UTC après un nouvel accès au
projet depuis l'accueil. Cette reprise évite un instant presque vide de la vidéo.
Les deux anciennes captures Rijksmuseum sont retirées des assets actifs et
restent récupérables dans Git, au commit `6e84f76`.

Le site Vucko crédite Locomotive. Le projet Wrapped est attribué à Vucko avec
collaboration de l'équipe interne de Spotify, selon son descriptif. Aucune de
ces réalisations n'est présentée comme un projet Horde. Aucune efficacité
commerciale, performance ou conformité globale n'est affirmée.

## Revue et contrôles

Le skill Horde impose l'intégration native YAML + MDX et le rendu Astro. Le
livrable générique MD/HTML/PDF de blog-rewrite n'est pas substitué à ce contrat.
Les vérifications portent sur le véritable article rendu, ses assets, ses
métadonnées, ses liens et la séparation staging/production. Aucun score ne
remplace la relecture humaine de ce pilote.

Validateur Horde : zéro erreur, zéro avertissement. Diagnostic de prose :
21 paragraphes, 14,72 mots par phrase en moyenne, écart-type 5,91, ratio lexical
0,470. Aucun tiret cadratin, aucune expression de la liste, aucun paragraphe
au-delà de 150 mots. Ces mesures sont descriptives, pas une détection d'auteur
ni une prédiction de classement.

Relecture indépendante du texte FR, des métadonnées, des trois captures et du
rendu Astro sur ordinateur et téléphone : 92/100, aucun point P0/P1,
`BLOCKING: false` pour la présentation du pilote sur staging seulement. Ce score
éditorial ne vaut ni validation par Nicolas, ni garantie SEO ou d'accessibilité.
Les deux recommandations de clarté ont été appliquées : formulations plus
concrètes sur les détails et le texte des projets, consigne d'agrandissement
ajoutée sous les deuxième et troisième captures.
Une seconde lecture ciblée confirme la clôture de ces recommandations et
maintient le verdict staging non bloquant, sans nouvelle notation. Rapport :
`/tmp/horde-vucko-rewrite.HsIlNT/review.md`, nonce de revue
`9233edd9be8666be0f311be5baaabe1d`.

Contrôles du build final, le 15 septembre :

- Tests d'images : 4/4 réussis.
- Astro : 95 fichiers, zéro erreur, zéro avertissement, 17 indications
  préexistantes sans rapport avec cette réécriture.
- Production simulée : vérification SEO réussie sur 76 pages HTML ;
  18 routes de blog visibles et six absentes. Le pilote FR/EN est bien absent.
- Staging : vérification SEO réussie sur 82 pages HTML ; 24 routes de blog
  visibles, y compris les brouillons, avec non-indexation.

- Navigateur : 36/36 cas réussis sur les douze pages FR/EN de septembre, aux
  largeurs 375, 768 et 1440 px. Aucun débordement horizontal, erreur JavaScript
  ou violation axe détectée dans le corps d'article pour les règles testées.
  Les trois figures du pilote sont chargées, légendées, responsives et ouvrent
  une image grand format avec réponse HTTP 200.
- Inspection visuelle : captures du véritable rendu Astro examinées sur
  téléphone, tablette et ordinateur. Les textes anglais des captures restent
  petits sur téléphone ; l'explication française et l'agrandissement sont
  disponibles. Pas de certification générale d'accessibilité.

Une première passe navigateur a été interrompue après 30 cas, puis une autre
n'a pas pu joindre le serveur de prévisualisation arrêté. Le résultat 36/36
ci-dessus provient d'une nouvelle passe complète du build final, avec serveur
Docker stable et renouvellement de Chromium entre tailles d'écran. Les
artefacts sont dans `/tmp/horde-vucko-rewrite.HsIlNT/final-artifacts/`.

Déploiement staging vérifié le 15 septembre, après le push du commit `4065e26` :

- [Validation GitHub réussie](https://github.com/npremz/HordeWebsiteV2/actions/runs/34953819828).
- Le pilote FR en ligne présente Vucko et ses trois captures, sans Rijksmuseum,
  avec `noindex, nofollow`. Six cas navigateur réussis sur la paire FR/EN, aux
  trois largeurs ; artefacts dans `/tmp/horde-vucko-rewrite.HsIlNT/live-artifacts/`.
- Le texte rendu en ligne correspond exactement au texte du build final testé.
- `master` reste au commit `d763611`, sans fusion ni déploiement de production.
  La route FR du pilote sur `https://hordeagence.com/` répond toujours HTTP 404.

Le choix de référence est intégré et présenté pour relecture, pas approuvé pour
publication. L'anglais est maintenant aligné et la paire est sortie du brouillon.

## Alignement anglais, 15 septembre

L'anglais a été adapté comme un article autonome à partir du pilote français
validé pour réécriture. Il conserve la même progression, les trois captures,
les précautions sur les résultats, l'accessibilité et la performance, ainsi que
la transposition au bureau d'architecture fictif. Les liens internes pointent
vers la direction artistique, le brief et le contact en anglais. Aucun cas
GOV.UK, Primer ou Rijksmuseum ne subsiste dans l'article ou ses métadonnées.

Une passe de traduction indépendante a vérifié la fluidité, les dates, les
légendes, les liens et l'absence de fragments français. Le validateur du skill
compte 1017 mots hors légendes, cinq H2, trois images et trois liens internes ;
zéro erreur et un avertissement attendu pour la date future. Le diagnostic de
prose relève 21 paragraphes, 15,36 mots par phrase en moyenne, aucun paragraphe
de plus de 150 mots, aucune expression interdite et aucun tiret cadratin.

Le build final conserve la séparation attendue au 15 septembre : 76 pages HTML
et 18 routes de blog visibles en production simulée, avec les six routes futures
absentes ; 82 pages HTML et 24 routes visibles en staging. Les vérifications SEO
et de programmation réussissent dans les deux modes. Les 48 cas navigateur
réussissent sur les douze pages FR/EN, aux largeurs 375, 768, 1440 et 1920 px.
L'inspection visuelle confirme les trois captures et leurs légendes sur téléphone
et grand écran, ainsi que le fond du hero jusqu'en haut. Artefacts :
`/tmp/horde-vucko-en-build.ONBYg5/artifacts/`.

## Suite après relecture

1. Relire l'anglais seul, comme un article autonome, puis confirmer la paire.
2. Confirmer l'accord de publication avant tout transfert futur vers `master`.
3. Vérifier le premier rebuild de production à partir du 22 septembre.

Les RSS et sitemaps sont générés par Astro. Pas de soumission IndexNow, de
publication sociale ou de modification de master dans cette passe.
