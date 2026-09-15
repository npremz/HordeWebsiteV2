# Lot éditorial de septembre 2026

Préparé le 14 septembre 2026 pour relecture sur staging. Quatre créations FR/EN
et deux mises à jour FR/EN. Références de voix : BRAND.md et VOICE.md.

## Décisions communes

Le lecteur principal dirige une PME, une marque, une association ou un projet
numérique. Chaque article doit l'aider à évaluer la qualité d'une interface et
à prendre une décision avec son équipe. Les requêtes sont des hypothèses issues
des résultats de recherche ; aucun volume ou classement n'est présumé.

Les démonstrations sont originales, codées dans le site et explicitement
pédagogiques. Aucun résultat client, entretien ou test utilisateur n'est inventé.
Les références publiques sont analysées à partir de leur documentation ; les
schémas explicatifs ne sont pas présentés comme des captures de leurs produits.

## 15 septembre : direction artistique

- Intention : traduire une identité de marque en décisions d'interface.
- Territoire E ; auteur Alexandre ; format `how-to-guide`.
- Titre SEO FR : Direction artistique web : identité et usage
- Titre SEO EN : Web art direction: identity and usability
- H1 FR : Une interface peut avoir du caractère sans se mettre en travers du chemin.
- H1 EN : Give an interface character and room to work.
- Slugs : `direction-artistique-interface-web` / `art-direction-for-web-interfaces`.
- Preuve : même atelier culturel fictif décliné en deux directions, avec
  comparaison des rôles de la typographie, de l'accent et de la composition.
- Plan : définir la direction ; formuler l'intention ; attribuer des rôles ;
  comparer les variantes ; vérifier les contraintes ; décider quoi livrer.
- Limite : démonstration de choix, aucun effet sur la conversion mesuré.
- Sources : W3C contraste, couleur et réduction du mouvement ; GOV.UK principes.
- Maillage : différenciation, IA/UX, performance, brief, refonte, contact.
- Score sujet : alignement 2, demande 1, point de vue 2, preuve 2, suite 2 = 9/10.

## 18 septembre : design et développement

- Intention : préserver l'intention du design pendant l'implémentation.
- Territoire T ; auteur Nicolas ; format `tutorial`.
- Titre SEO FR : Design et développement web : travailler ensemble
- Titre SEO EN : Web design and development: working together
- H1 FR : Une bonne interface ne devrait pas se dégrader entre Figma et le navigateur.
- H1 EN : Good interfaces should survive the move from Figma to the browser.
- Slugs : `design-developpement-web-ensemble` / `design-and-web-development-together`.
- Preuve : composant de réservation fictif manipulable, largeur compacte,
  contenu long, état d'erreur et confirmation locale.
- Plan : spécifier un comportement ; établir un contrat de composant ; éprouver
  largeur, contenu, clavier et erreur ; partager les décisions ; recette.
- Limite : pas de maquette Figma client disponible ; les intentions du composant
  pédagogique sont écrites dans l'article, pas attribuées à un projet réel.
- Sources : Figma handoff ; W3C reflow ; WAI validation des formulaires ; MDN button.
- Maillage : direction artistique, IA/UX, performance, optimisation, refonte, contact.
- Score sujet : 9/10 selon le même barème.

## 22 septembre : analyser une référence

- Intention : extraire un principe de conception sans reprendre un habillage.
- Territoire E ; auteur Alexandre ; format `how-to-guide`.
- Titre SEO FR : Analyser une interface web sans la copier
- Titre SEO EN : Analyse a web interface without copying it
- H1 FR : Une référence n'est utile que si l'on comprend pourquoi elle fonctionne.
- H1 EN : A reference is useful when you understand why it works.
- Slugs : `analyser-interface-web-sans-copier` / `analyse-web-interface-without-copying`.
- Preuve : lecture de trois références documentées : task list et error summary
  GOV.UK, Blankslate Primer. Schémas originaux et liens directs vers les exemples.
- Plan : partir d'une tâche ; séparer observation et interprétation ; analyser
  les trois références ; vérifier les différences de contexte ; rédiger une règle.
- Limite : une documentation de composant n'est pas une mesure de son effet
  sur les utilisateurs d'un autre service.
- Maillage : direction artistique, différenciation, IA/UX, brief, audit, contact.
- Score sujet : 9/10 selon le même barème.

## 29 septembre : brief d'expérience

- Intention : cadrer un projet avant de choisir les écrans et fonctionnalités.
- Territoire M ; auteur Alexandre ; format `how-to-guide`.
- Titre SEO FR : Brief de design web : cadrer l'expérience
- Titre SEO EN : Web design brief: start with the experience
- H1 FR : Le sur-mesure commence avant la première maquette.
- H1 EN : Custom design starts before the first mockup.
- Slugs : `brief-design-web-cadrer-experience` / `web-design-brief-before-screens`.
- Preuve : canevas remplissable et téléchargeable en Markdown, six décisions,
  avec exemple culturel fictif et critères de recette.
- Plan : distinguer brief et liste de pages ; remplir six décisions ; traiter
  contraintes et inconnues ; arbitrer ; utiliser le brief jusqu'à la livraison.
- Sources : GOV.UK découverte et besoins ; WAI implication des utilisateurs.
- Maillage : direction artistique, références, coût refonte, propriété via
  site/réseaux, audit, contact.
- Score sujet : 9/10 selon le même barème.

## Mises à jour

| Date | Article | Changement matériel | Preuve et périmètre |
| --- | --- | --- | --- |
| 17/09 | IA et expérience | Ajouter une revue en six dimensions, corriger la définition réductrice de l'interface et encadrer les affirmations sur l'IA | Comparaison pédagogique annotée de deux hiérarchies ; liens vers les nouveaux articles |
| 24/09 | Différenciation | Ajouter un diagnostic visuel actionnable, distinguer outil commun et identité, nuancer le lien entre généricité et trafic payant | Deux directions d'un même atelier ; grille observation / décision / vérification |

Pas de déclin Search Console établi. Il s'agit d'enrichissements éditoriaux
documentés, pas d'une mise à jour motivée par l'âge des pages. Conserver ces
versions sur staging jusqu'à leur validation ; leur fusion en production est
une opération distincte.

## Vérification des sources

Sources primaires consultées le 14 septembre 2026 :

- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html
- https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- https://www.w3.org/WAI/tutorials/forms/validation/
- https://www.w3.org/WAI/planning/involving-users/
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button
- https://www.figma.com/best-practices/guide-to-developer-handoff/
- https://design-system.service.gov.uk/components/task-list/
- https://design-system.service.gov.uk/components/error-summary/
- https://primer.style/product/components/blankslate/
- https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works
- https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs
- https://www.gov.uk/guidance/government-design-principles

Vérifier au rendu : une seule H1, métadonnées FR/EN, sources près des affirmations,
liens réciproques, atelier fonctionnel au clavier et sur mobile, absence de lien
actif vers un article encore masqué en production. Relire chaque langue à part.

## Distribution préparée

LinkedIn : une thèse, un exemple tiré de l'atelier et le lien au jour de sortie.
Email : récapitulatif bilingue disponible pour le lot de fin septembre. Les textes
sont préparés dans distribution.md ; aucun message externe n'est envoyé pendant
la phase de relecture staging.
# Statut après relecture

Ce document conserve les briefs de la première livraison. Le brief de l'article
sur les références et les propositions d'ateliers sont remplacés par
[revision-clarte.md](revision-clarte.md). Ne pas réintroduire ces modules ni lancer
une nouvelle production en lot avant validation du pilote français.
