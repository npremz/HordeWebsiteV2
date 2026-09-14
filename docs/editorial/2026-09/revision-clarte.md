# Révision après relecture : clarté et exemples

14 septembre 2026. Remplace les décisions de qualité de la première livraison.

## À valider maintenant

[Pilote français sur staging](https://waf.hordagency.com/fr/blog/analyser-interface-web-sans-copier/) :
**Comment s'inspirer d'un site web sans le copier**.

La question du lecteur est de savoir comment expliquer ce qu'il aime dans un
autre site et ce qu'il souhaite pour le sien. Le texte part d'une préparation de
refonte et suit un seul exemple, du premier écran aux informations de visite.
Il ne demande plus au lecteur d'apprendre une méthode d'analyse de composants.

La réécriture anglaise attend la validation de ce pilote, conformément à la
séquence proposée. [L'anglais sur staging](https://waf.hordagency.com/en/blog/analyse-web-interface-without-copying/)
reste l'ancienne analyse GOV.UK/Primer, nettoyée des références au module disparu.
Ce n'est pas encore la version anglaise du nouveau texte. La paire est en
`draft: true` : pas de sortie publique, même lorsque la date du 22 septembre
est atteinte. La date doit être reconfirmée avant activation.

## Changements

- Nouveau titre, résumé, description SEO et trois points clés français.
- 947 mots FR hors captures/légendes, contre 1369 dans le texte initial selon le
  même validateur ; cinq H2, dont Sources. Trois liens internes et trois entrants.
- Deux captures commentées, dans les passages qu'elles illustrent, avec lien
  vers l'image originale pour l'agrandir. Aucun formulaire ajouté à l'article.
- Suppression des blocs « Observer · essayer · décider » dans les six articles
  et les deux langues. Retrait des boutons, formulaires et scripts associés.
- Nettoyage des invitations à manipuler un module absent dans les onze autres
  corps. Les exemples restants sont des situations décrites, pas des démos testées.
- Aucune réécriture générale du reste du lot. Les anciens modules sont récupérables
  dans l'historique Git ; ils ne sont plus chargés par le site.

## Captures et provenance

Les deux PNG sont des captures Chromium de pages publiques réellement chargées
en 1440 × 1000, après refus des cookies facultatifs. Aucun texte, bouton ou
contenu du site tiers n'a été modifié. La deuxième capture suit un défilement
vers les informations de visite. Les observations sont limitées à ces écrans.

| Fichier, sous src/assets/images/blog/analyse-web-interface-without-copying/ | Source | Dimensions |
| --- | --- | --- |
| rijksmuseum-home.png | https://www.rijksmuseum.nl/en | 1440 × 1000 |
| rijksmuseum-visit.png | https://www.rijksmuseum.nl/en/visit | 1440 × 1000 |
| featuredImage.png, couverture conservée | Génération initiale, voir images.md | 1536 × 1024 |

Les légendes et les sources portent la date du 14 septembre 2026. Les tarifs
visibles appartiennent à la capture datée ; l'article ne les présente pas comme
une offre à jour. Le Rijksmuseum n'est pas présenté comme un client Horde, ni
comme une preuve de conversion, de performance ou de conformité globale.

## Revue éditoriale ciblée

Les notes initiales de 90 à 94 ne sont plus une décision de publication. Une
grille technique ne compense pas une incompréhension du lecteur. Cette passe
utilise les critères de clarté de blog-analyze sans renouveler une note globale
sur les six articles ni prétendre à une validation de la version anglaise.

Priorité haute traitée : situation du lecteur identifiable, titre explicite,
premier cas concret avant la méthode, deux captures lisibles près de l'explication,
fin applicable à son propre projet. La préférence éditoriale reste à confirmer
par Nicolas/Alexandre. Aucun test de compréhension avec le public n'est revendiqué.

Diagnostic descriptif FR : 20 paragraphes, moyenne 15,25 mots par phrase,
écart-type 6,67, ratio lexical 0,480. Aucun paragraphe de prose au-delà de 150 mots,
aucune occurrence de la liste d'expressions et aucun tiret cadratin. Ces mesures
n'indiquent ni l'origine du texte ni sa probabilité de classement.

## Contrôles

- Validateur Horde sur les six contenus FR/EN : zéro erreur ; trois avertissements
  de dates futures attendus pour les autres créations. Le pilote reste brouillon.
- Tests du rendu d'images : prose conservée, légendes, code non interprété,
  refus des images distantes, chemins traversants et alternatives vides.
- Typecheck : zéro erreur, zéro warning, 17 hints préexistants.
- Build staging : 82 pages HTML, 24 routes blog visibles, métadonnées vérifiées.
- Un premier contrôle navigateur élargi au corps des articles a identifié les
  tableaux défilants non accessibles au clavier. Leur conteneur est maintenant
  focalisable, nommé et muni d'un focus visible. Le passage initial n'est pas
  compté comme réussi.
- Build production de contrôle : 74 pages HTML, 16 routes blog visibles et huit
  absentes ; aucun lien vers ces routes absentes. Ce build n'est pas déployé.
- Second passage navigateur sur l'artefact final : 24 cas réussis, six articles ×
  deux langues × deux largeurs (375/1440). Zéro module résiduel, erreur JavaScript
  ou débordement horizontal. Images, légendes et liens pleine taille vérifiés.
- Axe : zéro violation A/AA détectée dans les corps des articles lors de ce
  second passage. Ce contrôle ne constitue pas un audit de tout le site.
- Inspection visuelle des captures dans le corps français sur mobile et ordinateur.

Les artefacts de cette passe sont conservés dans
`/tmp/horde-editorial-clarity.SL6Lbu/`. Ils ne sont pas servis par le staging.

Le contrôle publication `--built` du skill exige un article public dans les deux
langues. Il n'est pas utilisé pour prétendre valider ce pilote en brouillon.
Les contrôles du dépôt vérifient séparément sa présence en aperçu et son absence
en production, dans les liens et les flux. Sitemap et RSS restent générés par
Astro ; aucune soumission à un moteur n'est effectuée.

## Pipeline corrigé

Le skill local horde-blog-write et VOICE.md enregistrent les critères de choix
des exemples : besoin du lecteur, utilité de l'interaction, position dans le
texte, validation du pilote avant traduction ou passage à l'échelle. Le skill
et son validateur documentent également le support limité des captures locales.
Le skill-creator a servi à cette mise à jour ciblée, sans modifier les autres skills.

Production inchangée. Cron, programmation des mises à jour et correction de
l'alerte de dépendances documentée dans audit.md restent des chantiers distincts.
