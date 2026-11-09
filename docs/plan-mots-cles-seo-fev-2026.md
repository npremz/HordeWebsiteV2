# Plan éditorial SEO — septembre 2026 à mars 2027

> Le nom historique du fichier est conservé pour compatibilité avec le workflow
> Horde. Le plan de février 2026 est intégralement remplacé.

Dernière révision : 14 septembre 2026.

> **Novembre 2026 :** le calendrier daté est remplacé par une liste ordonnée
> sans dates (section 5), établie à partir de `docs/editorial/donnees-2026-11.md`.
> Rythme : une proposition par semaine, publication dès validation. Le
> fonctionnement est décrit dans `docs/strategie-editoriale-blog.md`, section
> « Production semi-automatique ». Les sections 1, 7 et 11 ci-dessous décrivent
> l'ancien mode en lots et ne s'appliquent plus.

## 1. Résultat attendu

Produire et valider en batch sept mois de contenu, puis laisser le système publier
les créations au bon jour :

- 4 nouveaux articles bilingues par mois, normalement le mardi ;
- 2 mises à jour substantielles par mois, normalement le jeudi des semaines 1 et 3 ;
- 28 créations, 14 mises à jour et 42 actions éditoriales ;
- 14 créations sur l'expérience et les interfaces, 8 sur la technologie qui les
  rend possibles et 6 sur un numérique durable et maîtrisé ;
- une grande validation sur staging avant programmation ;
- un rebuild quotidien de la production pour révéler automatiquement les
  articles dont la date est atteinte.

Septembre est un mois de lancement compressé : le cycle commence le 15 septembre
et ajoute exceptionnellement une création le vendredi 18. Aucune publication
n'est antidatée.

La ligne directrice n'est plus « répondre à toutes les questions d'une agence
web ». Elle devient : **montrer ce qui rend une expérience numérique vraiment
bonne et comment Horde la fabrique**.

Le référencement met cette expertise en face d'une demande existante. Il ne
justifie jamais à lui seul un sujet sans point de vue, sans preuve ou sans lien
avec l'offre.

## 2. Comment un sujet entre dans le calendrier

Le choix suit cet ordre :

1. **Alignement de marque :** le sujet aide-t-il Horde à devenir identifiable
   pour la qualité de ses expériences et interfaces ?
2. **Demande :** une question ou une intention est-elle observable dans Search
   Console, les résultats de recherche ou les conversations commerciales ?
3. **Point de vue :** Horde peut-elle défendre une réponse qui ne soit pas
   interchangeable avec celle de n'importe quelle agence ?
4. **Preuve :** peut-on montrer un projet, une interface annotée, un prototype,
   une mesure, un arbitrage ou une méthode originale ?
5. **Proximité d'offre :** quelle décision utile le lecteur peut-il prendre
   ensuite ?

Le barème détaillé se trouve dans `BRAND.md`. Seuls les sujets à 7/10 ou plus
sont conservés, sans zéro en alignement ou en preuve.

### Double titre obligatoire

Le mot-clé n'a pas à dicter la personnalité du H1 :

- `seoTitle_fr` formule clairement la question recherchée ;
- `title_fr` porte la thèse éditoriale ;
- le chapô répond immédiatement et relie les deux.

Exemple :

- **SEO :** UI et UX : quelle différence pour un site web ?
- **H1 :** Une interface se regarde. Une expérience se traverse.

Les formulations SEO de ce plan sont des hypothèses d'entrée. Elles doivent être
confirmées dans Search Console et dans les résultats de recherche au moment du
brief. Aucun volume de recherche n'est inventé dans ce document.

## 3. Architecture en trois territoires

### E — Expériences et interfaces de qualité — 14 créations

Question : qu'est-ce qui rend une interface claire, singulière et agréable à
utiliser ?

Sujets : UX/UI, direction artistique, hiérarchie, navigation, typographie,
formulaires, e-commerce, accessibilité, micro-interactions et tests.

Page pilier : le nouvel article « Comment reconnaître une bonne interface web ? ».

### T — Technologie au service de l'expérience — 8 créations

Question : comment le code, la performance et l'IA permettent-ils de tenir la
promesse de l'interface dans des conditions réelles ?

Sujets : mouvement, performance perçue, prototypage assisté, qualité du code,
mesure respectueuse et expériences interactives.

Page pilier : l'article existant « C'est quoi, un site vraiment rapide ? ».

### M — Numérique durable et maîtrisé — 6 créations

Question : comment préserver la qualité, l'autonomie et la valeur de
l'expérience dans le temps ?

Sujets : sur-mesure justifié, propriété, CMS, projets associatifs et maintenance.

Page pilier : le nouvel article « Template ou design sur mesure ».

Aucun quatrième territoire ne sera ouvert avant le bilan de mars 2027.

## 4. Rôle des huit articles existants

| Article | Rôle dans la nouvelle architecture | Première évolution prévue |
| --- | --- | --- |
| `ia-interfaces-experiences-utilisateur` | Conviction : une interface générée n'est pas encore une expérience | Revue humaine en six dimensions et exemples annotés |
| `comment-creer-site-web-qui-se-demarque-2026` | Différenciation et identité numérique | Diagnostic visuel fondé sur des choix observables |
| `c-est-quoi-un-site-vraiment-rapide` | Pilier performance | Vitesse perçue, états d'attente et ordre de diagnostic |
| `webapp-evenementielle-ia` | Cas de fabrication assistée | Captures, arbitrages, limites et résultats réellement disponibles |
| `pourquoi-avoir-un-site-web-reseaux-sociaux` | Propriété de la présence numérique | Portabilité des contenus, contacts et accès |
| `ia-associations-projets-interet-general` | Valeurs et partage des gains technologiques | Cadre de décision responsable pour les petites structures |
| `ce-que-votre-site-vous-coute-vraiment` | Coût de la non-qualité | Dette d'interface, maintenance et temps interne |
| `combien-coute-refonte-site-web` | Décision commerciale sur la refonte | Niveaux d'ambition de l'expérience et périmètres correspondants |

Une mise à jour ne consiste jamais à changer une date. Elle doit apporter un
nouveau module, une preuve, une correction factuelle ou une méthode qui modifie
réellement l'utilité de la page.

## 5. Liste des sujets (ordre de production)

Remplace le calendrier daté de septembre 2026, conservé dans l'historique Git
(`git show d25f001:docs/plan-mots-cles-seo-fev-2026.md`). Révisé le 7 novembre
2026 à partir de `docs/editorial/donnees-2026-11.md`.

**Règles d'usage.** Le cron prend le premier sujet non publié de la liste. Il
peut en sauter un pour respecter l'alternance des territoires, si la preuve
attend une contribution de l'équipe, ou si Search Console justifie mieux un
autre sujet. L'ordre suit la demande mesurée, la proximité d'offre et la
faisabilité de la preuve ; les sujets de conviction sont en fin de liste, sans
attente de trafic. Légende : E = expérience/interface, T = technologie/expérience,
M = durable/maîtrisé. Demande = volume mensuel France / Belgique de la meilleure
requête (« — » = non mesurable). Preuve : **seul** = l'agent peut la produire ;
**équipe** = il faut des notes, captures ou résultats de Horde.

### Déjà publiés depuis le lancement du plan

`direction-artistique-interface-web` (E, 15/09), `design-developpement-web-ensemble`
(T, 18/09), `analyser-interface-web-sans-copier` (E, 22/09),
`brief-design-web-cadrer-experience` (M, 29/09), `bonne-interface-web` (E, pilier,
07/11, preuve : landing Café Loma), `audit-ux-ui-site-web` (E, 09/11,
preuve : auto-audit de hordeagence.com, 7 frictions ordonnées).

### Nouveaux articles

| # | Terr. | Entrée SEO, H1 et slugs | Demande FR / BE | Preuve principale et suite utile |
| --- | --- | --- | --- | --- |
| ~~1~~ | E | **Publié le 09/11.** **SEO :** Audit UX/UI d'un site web : méthode et grille de priorité<br>**H1 :** Auditer une interface, c'est regarder ce qu'elle fait faire, pas seulement ce qu'elle montre.<br>**Slugs :** `audit-ux-ui-site-web` / `website-ui-ux-audit` | audit ux 320 / 20 · audit site web 260 / 20 · KD 0 | Grille pondérée par tâche et sévérité, appliquée de bout en bout à un site public ou à hordeagence.com ; s'appuie sur la grille de `bonne-interface-web` sans la répéter. **Seul.** Lien vers Audit offert. |
| 2 | T | **SEO :** Animation web : bonnes pratiques UX et performance<br>**H1 :** Le mouvement doit expliquer, pas décorer.<br>**Slugs :** `animation-web-ux-performance` / `web-animation-ux-performance` | animation site web 1 600 / — · animation web 320 / 70 | Trois versions manipulables du même composant, mesure, et démonstration `prefers-reduced-motion`. **Absorbe** les anciens sujets micro-interactions et animation accessible (sections dédiées). **Seul.** Lien vers Optimisation. |
| 3 | E | **SEO :** Accessibilité et design web : concevoir au-delà de la checklist<br>**H1 :** L'accessibilité n'est pas une couche ajoutée avant la mise en ligne.<br>**Slugs :** `accessibilite-design-web` / `accessibility-in-web-design` | wcag 1 900 / 590 · accessibilité web 260 / 10 · design accessible 210 / — | Composants avant/après parcourus au clavier et avec différents réglages ; contexte European Accessibility Act et EN 301 549 avec sources primaires. **Seul.** Lien vers Refonte. |
| 4 | M | **SEO :** Maintenance évolutive d'un site web : préserver la qualité de l'interface<br>**H1 :** Une interface de qualité continue après la livraison.<br>**Slugs :** `maintenance-evolutive-qualite-interface` / `evolving-website-interface-maintenance` | maintenance site web 390 / 20 · maintenance site wordpress 260 / 10 | Exemple de dérive de composants, journal de changement et rythme de revue. **Seul** pour la méthode ; **équipe** pour un cas réel. Lien vers Optimisation. |
| 5 | E | **SEO :** Design system pour un site web : à quoi sert-il ?<br>**H1 :** La cohérence ne devrait pas rendre une interface prévisible.<br>**Slugs :** `design-system-site-web` / `website-design-system` | design system 2 400 / 210 | Mini-système Horde avec composants, variations et exemple de dérive évitée. **Seul.** Lien vers Refonte et MVP. |
| 6 | T | **SEO :** Comment mesurer l'expérience utilisateur en respectant la vie privée ?<br>**H1 :** Mesurer une expérience ne donne pas le droit de tout collecter.<br>**Slugs :** `mesurer-ux-respect-vie-privee` / `privacy-friendly-ux-measurement` | plausible analytics 480 / 110 · alternative google analytics 170 / — | Notre propre Plausible auto-hébergé : plan de marquage minimal, objectifs, données exclues. **Seul** (créer d'abord l'objectif Contact). Lien vers Audit. |
| 7 | E | **SEO :** UI et UX : quelle différence pour un site web ?<br>**H1 :** Une interface se regarde. Une expérience se traverse.<br>**Slugs :** `difference-ui-ux-site-web` / `ui-vs-ux-for-websites` | ui vs ux 390 / 70 · ui et ux 110 / 10 · différence ui ux 70 / — | Un même parcours cartographié côté écran, interaction et contexte. **Seul.** Lien vers Refonte. |
| 8 | M | **SEO :** Comment choisir un CMS pour rester autonome ?<br>**H1 :** Le bon CMS est celui que l'équipe peut réellement utiliser.<br>**Slugs :** `choisir-cms-autonomie` / `choose-cms-for-editorial-autonomy` | cms headless 880 / 170 · meilleur cms 90 / 10 | Scénarios d'édition concrets, matrice droits/export/maintenance, réversibilité. **Seul.** Lien vers Refonte. |
| 9 | E | **SEO :** Comment tester un site avec des utilisateurs avant une refonte ?<br>**H1 :** Une interface se juge là où quelqu'un hésite.<br>**Slugs :** `test-utilisateur-site-avant-refonte` / `user-test-before-website-redesign` | user testing 1 300 / 210 (en partie la marque UserTesting) · test utilisateur 260 / — | Protocole léger, scénario, grille d'observation. **Équipe** : un test réellement mené, même petit. Lien vers Audit. |
| 10 | T | **SEO :** Site WebGL ou 3D : impact sur l'UX et la performance<br>**H1 :** Une expérience spectaculaire doit encore mériter son poids.<br>**Slugs :** `site-webgl-3d-ux-performance` / `webgl-3d-website-ux-performance` | 3d website 320 / 140 · site web 3d 90 / 10 | Comparaison interactive de trois niveaux d'ambition, budgets de ressources, alternative accessible. **Seul.** Lien vers Optimisation. |
| 11 | M | **SEO :** Template ou design sur mesure : comment choisir ?<br>**H1 :** Le problème n'est pas le template. C'est ce qu'il décide à votre place.<br>**Slugs :** `template-ou-design-sur-mesure` / `template-vs-custom-web-design` | site web sur mesure 110 / 10 · site internet sur mesure 90 / 10 | Pilier M prévu : matrice de décision et deux réponses au même brief. À avancer si le maillage M l'exige. **Seul.** Lien vers Refonte. |
| 12 | E | **SEO :** UX d'un formulaire : bonnes pratiques et erreurs à éviter<br>**H1 :** Un formulaire ne devrait pas demander plus de confiance qu'il n'en mérite.<br>**Slugs :** `ux-formulaire-bonnes-pratiques` / `form-ux-best-practices` | design formulaire 90 / — · formulaire de contact site web 40 / — | Prototype complet avec aide, validation, erreur et confirmation sur mobile. **Seul.** Lien vers Landing page. |
| 13 | M | **SEO :** Site web pour une association : comment prioriser un petit budget ?<br>**H1 :** Un petit budget ne devrait pas condamner une association à une mauvaise expérience.<br>**Slugs :** `site-web-association-prioriser-budget` / `nonprofit-website-budget-priorities` | site internet association 170 / 10 · site web association 70 / 10 | Trois périmètres réalistes sans prix inventé, matrice utile/reportable. **Seul.** Lien vers Landing page ou Refonte. |
| 14 | T | **SEO :** Code généré par IA : qualité, accessibilité et maintenance<br>**H1 :** Le code arrive plus vite. La responsabilité, non.<br>**Slugs :** `code-genere-ia-qualite-maintenance` / `ai-generated-code-quality-maintenance` | ia développement web 50 / — · conviction | Même composant avant et après revue humaine, audité. **Seul.** Lien vers MVP. |
| 15 | E | **SEO :** Navigation mobile : les bonnes pratiques UX<br>**H1 :** Si l'utilisateur doit explorer le menu, la navigation a déjà perdu.<br>**Slugs :** `navigation-mobile-bonnes-pratiques-ux` / `mobile-navigation-ux-best-practices` | — · conviction | Trois prototypes pour une même architecture, testés au clavier et au tactile. **Seul.** Lien vers Audit. |
| 16 | T | **SEO :** Prototypage UX avec l'IA : méthode et limites<br>**H1 :** L'IA raccourcit le chemin vers le test. Elle ne remplace pas le test.<br>**Slugs :** `prototypage-ux-avec-ia` / `ai-assisted-ux-prototyping` | prototypage ux 50 / — · conviction | Journal réel de l'hypothèse aux variantes, puis à la sélection humaine. **Équipe.** Lien vers MVP. |
| 17 | E | **SEO :** Typographie web : lisibilité, identité et performance<br>**H1 :** Une typographie n'est pas une décoration. C'est une interface.<br>**Slugs :** `typographie-web-lisibilite-performance` / `web-typography-readability-performance` | typographie web 30 / 10 · conviction | Une même page composée de trois façons. **Seul.** Lien vers Refonte. |
| 18 | M | **SEO :** À qui appartiennent le nom de domaine, le code et les données d'un site ?<br>**H1 :** Un site livré sans ses clés reste un site loué.<br>**Slugs :** `propriete-site-domaine-code-donnees` / `website-ownership-domain-code-data` | — · conviction (« propriétaire nom de domaine » = recherches WHOIS) | Checklist de passation et matrice propriétaire/accès/export ; sources juridiques belges. **Seul.** Lien vers Refonte et MVP. |
| 19 | E | **SEO :** Page produit e-commerce : checklist UX<br>**H1 :** Avant d'acheter du trafic, retirons les raisons de partir.<br>**Slugs :** `page-produit-ecommerce-checklist-ux` / `ecommerce-product-page-ux-checklist` | fiche produit e-commerce 30 / — | Avant/après d'une fiche produit prototype. **Seul.** Lien vers E-commerce. |
| 20 | E | **SEO :** Comment mesurer l'expérience utilisateur après une refonte ?<br>**H1 :** Une refonte réussie ne se mesure pas au jour du lancement.<br>**Slugs :** `mesurer-experience-apres-refonte` / `measure-ux-after-redesign` | kpi site web 90 / — | Plan avant/après sans causalité inventée. **Équipe** : données d'une refonte réelle. Lien vers Audit. |

Sujets retirés comme créations autonomes : micro-interactions et animation
accessible (intégrés au n° 2), performance perçue (devient une mise à jour de
`c-est-quoi-un-site-vraiment-rapide`).

### Mises à jour en réserve

Une mise à jour est proposée environ un lundi sur trois, quand Search Console
montre une page proche du top 5 ou une demande non couverte. Ordre indicatif :

| # | Article | Changement prévu | Signal / preuve |
| --- | --- | --- | --- |
| A | `brief-design-web-cadrer-experience` | Répondre à la question sur la génération d'une première version d'interface à partir d'un brief | Requête en position 5,7 (+4 → 18 impressions, oct.–nov.). **Seul.** |
| B | `c-est-quoi-un-site-vraiment-rapide` | Ajouter la performance perçue : séquence de chargement annotée, états d'attente, terrain/laboratoire | vitesse site web 170 / — ; absorbe l'ancien sujet T. **Seul.** |
| C | `pourquoi-avoir-un-site-web-reseaux-sociaux` | Exercice de portabilité : contenus, audience, formulaires, données, accès | La version EN cumule 343 impressions en position 27 : retravailler aussi le titre EN. **Seul.** |
| D | `combien-coute-refonte-site-web` | Niveaux d'ambition d'interface et limites des fourchettes ; vérifier que les montants restent justes | Première source citée par ChatGPT : garder la page exacte et à jour. **Équipe** pour valider les montants. |
| E | `ce-que-votre-site-vous-coute-vraiment` | Dette d'interface, contournements, support, temps interne | **Seul.** |
| F | `ia-associations-projets-interet-general` | Canevas utilité, risque, données, supervision, réversibilité | **Seul** ; exemple réel seulement s'il existe. |
| G | `webapp-evenementielle-ia` | Écrans, décisions, limites et résultats vérifiables du projet | **Équipe.** |
| H | `direction-artistique-interface-web` | Application complète à un projet Horde documenté | **Équipe.** |
| I | `design-developpement-web-ensemble` | Composant final en production, écarts avec la maquette, journal des arbitrages | **Équipe.** |
| J | `bonne-interface-web` | Auto-audit interactif et questions observées depuis la publication | Pas avant février 2027. |

## 6. Règles anti-cannibalisation

- `bonne-interface-web` définit les critères généraux ;
  `audit-ux-ui-site-web` explique une méthode de diagnostic pondérée.
- `direction-artistique-interface-web` traite de l'expression de la marque ;
  `bonne-interface-web` évalue plus largement la qualité d'usage.
- `analyser-interface-web-sans-copier` apprend à lire des références externes ;
  `audit-ux-ui-site-web` diagnostique son propre parcours avec une grille.
- `brief-design-web-cadrer-experience` définit le problème avant les écrans ;
  `template-ou-design-sur-mesure` choisit ensuite un mode de production.
- `design-developpement-web-ensemble` suit la continuité d'une décision ;
  `design-system-site-web` traite le système qui la maintient à l'échelle.
- `difference-ui-ux-site-web` explique les disciplines ;
  `ia-interfaces-experiences-utilisateur` traite de la limite de la génération.
- `c-est-quoi-un-site-vraiment-rapide` reste le pilier Core Web Vitals et
  accueille la performance perçue (états, séquence, sensation d'attente) en
  mise à jour plutôt qu'en article séparé.
- `animation-web-ux-performance` décide quand et comment animer, y compris les
  micro-interactions et le contrôle utilisateur (`prefers-reduced-motion`).
- `comment-creer-site-web-qui-se-demarque-2026` traite de différenciation ;
  `template-ou-design-sur-mesure` traite d'un choix de production.
- `combien-coute-refonte-site-web` reste la page de référence sur les budgets ;
  les autres articles ne publient pas de fourchettes non sourcées.
- Les intentions locales transactionnelles restent sur les pages services. Le
  blog ne multiplie pas les variantes « agence UX/UI Bruxelles ».

Avant chaque brief, comparer titre, requête principale, H2 et résultat attendu
avec tous les contenus publiés ou programmés.

## 7. Production en batch et validation

### Créations futures

1. Valider les 28 briefs, leur thèse, leur actif de preuve et leurs sources.
2. Produire par territoire pour construire le maillage en même temps que les
   articles.
3. Rédiger la version française, puis adapter l'anglais comme une version
   autonome.
4. Générer les couvertures sans texte et préparer les démonstrations visuelles.
5. Contrôler faits, voix, SEO, accessibilité, liens et rendu mobile/desktop.
6. Intégrer les articles avec `draft: false` et une `publishedDate` future sur la
   branche de batch visible en staging.
7. Après approbation globale, fusionner les créations vers `master`.

Le staging affiche les dates futures avec un badge et reste en `noindex`. La
production les exclut jusqu'au jour prévu. Le rebuild quotidien les publie sans
nouveau commit.

### Mises à jour d'articles déjà publics

Une `modifiedDate` future ne masque pas un nouveau texte sur un article déjà
public. Chaque mise à jour doit donc rester dans une PR dédiée jusqu'à sa date :

1. prévisualiser les 14 versions dans la branche d'intégration du batch ;
2. après validation, reporter chaque changement dans une PR autonome ;
3. programmer la fusion de la PR au jour prévu ;
4. laisser le déploiement puis le rebuild quotidien prendre le relais ;
5. conserver dans la PR une note précise de ce qui a changé.

Cette séparation permet une validation globale sans publier les mises à jour en
avance. Le guide technique est dans `docs/publication-programmee-blog.md`.

## 8. Contrat de qualité

Chaque paire FR/EN et chaque mise à jour doit :

- suivre `BRAND.md`, `VOICE.md` et la stratégie éditoriale ;
- annoncer la réponse ou la thèse dans les 120 premiers mots ;
- inclure un actif de preuve prévu dans ce calendrier ;
- utiliser des sources primaires près des affirmations importantes ;
- ne fabriquer aucune statistique, expérience client, citation ou fourchette ;
- expliquer les limites et les contextes où le conseil change ;
- contenir de 3 à 10 liens internes utiles selon la longueur ;
- recevoir au moins un lien depuis un article pertinent dans chaque langue ;
- proposer une seule CTA contextuelle ;
- avoir une couverture sans texte, recadrable au centre ;
- viser 90/100 au contrôle éditorial et n'avoir aucun défaut bloquant ;
- passer la validation du contenu, `npm run check`, le build production et
  `npm run check:seo`.

`modifiedDate` ne change qu'après une modification substantielle effectivement
publiée.

## 9. Distribution sans seconde usine à contenu

Chaque création fournit :

- un post LinkedIn le jour de publication : une thèse, une preuve visuelle et le
  lien ;
- un carrousel ou une courte vidéo uniquement lorsque l'actif de preuve se lit
  mieux en mouvement ;
- une entrée dans un récapitulatif email bimensuel ;
- un extrait réutilisable par l'auteur sur son profil personnel ;
- une relance à J+30 seulement si une question, une donnée ou un exemple nouveau
  apporte une vraie raison de revenir.

Les séries « Anatomie d'une interface », « Le détail qui change tout » et « Ce
qu'on a choisi d'enlever » fournissent un repère visuel récurrent sans imposer le
même format à chaque article.

## 10. Mesure et arbitrage

### Chaque mois

- Search Console : requêtes, pages, impressions, clics, position et CTR ;
- Plausible : entrées organiques et actions utiles ;
- liens internes et éventuelles pages orphelines ;
- partages, enregistrements et discussions sur les preuves visuelles ;
- questions et demandes commerciales qui reprennent une idée du blog.

### Règles de décision

- Impressions en hausse, CTR faible : tester le titre SEO et la description.
- Position moyenne et intention juste : renforcer preuve, réponse et maillage.
- Deux pages sur la même intention : consolider avant d'en créer une troisième.
- Aucun signal mais sujet central à la marque : garder comme contenu de
  conviction, puis améliorer la distribution plutôt que le dénaturer.
- Sujet performant mais éloigné de l'offre : ne pas en faire automatiquement un
  nouveau cluster.

Le bilan de mars décide du cycle suivant à partir des requêtes réelles. Sans
export Search Console, les mots-clés de ce plan restent des hypothèses
structurées, pas des prévisions de trafic.

## 11. Publication automatique

Configuration cible déjà documentée :

- staging : brouillons et dates futures visibles, site entier en `noindex` ;
- production : brouillons et dates futures absents des pages, catégories, RSS
  et sitemap ;
- Dokploy : déploiement automatique quotidien à `05:17`, fuseau
  `Europe/Brussels`, depuis `master` ;
- cache de l'étape Astro désactivé ou invalidé ;
- après déploiement : contrôle des deux RSS, du sitemap et des URLs attendues ;
- en cas d'échec : version précédente conservée et notification envoyée.

Le modèle programme un jour, pas une heure précise. Une date est considérée
publique au premier build de production exécuté après le début de cette journée
dans le fuseau éditorial.
