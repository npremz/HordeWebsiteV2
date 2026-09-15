# Stratégie éditoriale du blog Horde

Période de référence : septembre 2026 à mars 2027.  
Dernière révision : 14 septembre 2026.

## Décision stratégique

Le blog ne sera plus organisé d'abord autour des prestations à vendre. Il sera
organisé autour de la compétence que Horde veut rendre incontestable : créer des
expériences numériques de grande qualité, de la direction artistique à
l'interaction et du premier affichage à la maintenance.

Le SEO sert à faire rencontrer cette expertise avec des questions déjà posées.
Il ne décide pas seul de la ligne éditoriale.

## Position à construire

> Horde est le studio bruxellois qui sait expliquer, montrer et fabriquer ce qui
> rend une interface vraiment bonne — sans séparer le design, le code et les
> conditions réelles d'usage.

Cette position répond à un marché où « sur mesure », « UX/UI », « performant »
et « premium » sont déjà largement revendiqués. Horde doit gagner par la preuve
et la précision : interfaces annotées, détails d'interaction, prototypes,
arbitrages, mesures et retours de fabrication.

## Publics et décisions à accompagner

| Public | Question initiale | Décision utile suivante |
| --- | --- | --- |
| PME et marques de service | Pourquoi notre site ne reflète-t-il pas notre niveau réel ? | Auditer, optimiser ou refondre l'expérience |
| Équipes produit et porteurs de projet | Comment rendre l'idée crédible et utilisable rapidement ? | Cadrer, prototyper et tester un MVP |
| Associations et projets culturels | Comment offrir une bonne expérience avec des moyens contraints ? | Prioriser, choisir une base durable et garder les clés |

## Trois territoires actifs

### 1. Expériences et interfaces de qualité — 50 %

Sujets : UX/UI, direction artistique numérique, hiérarchie, navigation,
typographie, formulaires, e-commerce, accessibilité, micro-interactions, motion,
tests utilisateurs et audit d'interface.

Rôle : devenir la référence et la vitrine intellectuelle de l'offre première.

Formats dominants : « Anatomie d'une interface », « Le détail qui change tout »,
guides de décision et analyses visuelles.

### 2. Technologie au service de l'expérience — 30 %

Sujets : performance perçue, développement front-end, prototypage assisté par
IA, qualité du code généré, mouvement accessible, mesure respectueuse et
expériences interactives.

Rôle : montrer que l'ambition visuelle survit au navigateur, au mobile, au réseau
et à l'évolution du produit.

Formats dominants : démonstration technique, avant/après mesuré, journal de
fabrication et déconstruction d'un compromis.

### 3. Numérique durable et maîtrisé — 20 %

Sujets : sur-mesure justifié, autonomie CMS, propriété du code et des données,
maintenance, qualité avec un budget contraint et partage des gains de l'IA.

Rôle : relier la qualité de l'interface aux valeurs et au mode de collaboration
de Horde.

Formats dominants : comparaison, manifeste pratique, grille de décision et
retour d'expérience.

## Formule mensuelle

Chaque mois contient quatre créations et deux mises à jour :

- deux créations « expérience et interface » ;
- une création « technologie et expérience » ;
- une création « durable et maîtrisé » ;
- une seconde création technologique remplace exceptionnellement le quatrième
  sujet en décembre pour atteindre la répartition 14 / 8 / 6 sur sept mois ;
- deux mises à jour substantielles, activées seulement si le changement prévu est
  toujours matériel au moment de produire.

Le premier mois est compressé du 15 au 29 septembre, avec une création
exceptionnelle le vendredi 18. Les mois suivants reviennent au rythme du mardi.

## Deux titres, deux fonctions

Chaque article dispose de deux formulations :

- `seoTitle_fr` répond explicitement à la requête ;
- `title_fr` porte le point de vue éditorial et devient le H1.

Exemple :

| Fonction | Titre |
| --- | --- |
| Entrée SEO | UI et UX : quelle différence pour un site web ? |
| H1 éditorial | Une interface se regarde. Une expérience se traverse. |

Le titre éditorial ne doit jamais rendre le sujet opaque. Le chapô donne la
réponse et réconcilie immédiatement les deux formulations.

## Système de preuve

Chaque nouveau contenu doit prévoir avant rédaction un actif de preuve principal :

- capture d'interface annotée ;
- prototype ou micro-interaction manipulable ;
- comparaison avant/après avec méthode explicite ;
- mesure de performance ou test utilisateur ;
- extrait anonymisé d'un journal de décision ;
- matrice, grille ou checklist originale issue de la pratique ;
- cas public analysé avec captures autorisées et sources.

Un article sans preuve originale possible doit compenser par un point de vue
particulièrement distinctif et des sources primaires. Un sujet sans preuve et
sans point de vue sort du calendrier.

## Hiérarchie du site et maillage

Trois pages piliers éditoriales doivent émerger du cycle :

1. « Comment reconnaître une bonne interface web ? » pour les expériences et interfaces ;
2. l'article existant « C'est quoi, un site vraiment rapide ? » pour la
   technologie au service de l'expérience ;
3. « Template ou design sur mesure » pour la maîtrise et la durabilité.

Chaque nouvel article relie :

- sa page pilier ;
- un contenu existant ou un projet Horde pertinent ;
- une page service correspondant à la décision suivante, jamais à une CTA forcée.

Les pages services restent propriétaires des intentions locales transactionnelles
comme « agence UX/UI Bruxelles » ou « refonte site web Bruxelles ».

## Production semi-automatique

1. Confirmer le sujet avec le test de marque de `BRAND.md` et les requêtes réelles.
2. Produire un brief bilingue avec intention, preuve, sources, liens et CTA.
3. Rédiger FR puis adapter EN comme une version autonome.
4. Générer la couverture et préparer l'actif de preuve dans l'article.
5. Contrôler faits, voix, SEO, liens, schémas et rendu mobile/desktop.
6. Valider toutes les dates futures sur staging.
7. Fusionner les créations approuvées sur `master` ; le rebuild quotidien les
   rend publiques à la date prévue.
8. Conserver les mises à jour de pages déjà publiques dans des PR séparées à
   fusion programmée, car une date future ne peut masquer une modification d'un
   contenu déjà en production.

## Mesure

### Toutes les quatre semaines

- requêtes et pages émergentes dans Google Search Console ;
- impressions, clics, position et CTR, sans lire un indicateur isolément ;
- entrées organiques et actions utiles dans GA4 ;
- liens internes reçus et pages orphelines ;
- articles dont les exemples visuels génèrent des enregistrements, partages ou
  discussions qualifiées ;
- demandes commerciales qui mentionnent une interface, un article ou une
  conviction précise.

### Après trois mois

- renforcer les sujets qui combinent demande, engagement et proximité d'offre ;
- réécrire les titres dont les impressions progressent mais pas le CTR ;
- consolider les contenus qui se disputent la même intention ;
- ne pas juger un sujet de conviction sur le trafic seul ;
- documenter les questions reçues en rendez-vous pour le cycle suivant.

## Seuil de qualité

Une publication doit viser au moins 90/100 selon le contrôle éditorial Horde et
ne présenter aucun défaut bloquant. Le score ne compense jamais :

- une expérience ou une donnée inventée ;
- une absence de réponse à l'intention ;
- un chevauchement évident avec un article existant ;
- une interface présentée comme exemplaire sans analyse de son contexte ;
- une traduction anglaise littérale ou artificielle.

Le calendrier opérationnel se trouve dans
`docs/plan-mots-cles-seo-fev-2026.md`. Les principes de marque et de voix se
trouvent dans `BRAND.md` et `VOICE.md`.
