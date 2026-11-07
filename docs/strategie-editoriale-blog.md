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

Fonctionnement en vigueur depuis novembre 2026 (remplace les lots validés en
bloc et le rebuild quotidien Dokploy, qui ne sont pas utilisés) :

1. **Lundi 10 h 30 (Europe/Brussels)**, une tâche Hermes sur la machine de
   l'agence repull `master`, lit ce document, `BRAND.md`, `VOICE.md`,
   `docs/editorial/donnees-2026-11.md` et `docs/editorial/retours-blog.md`, puis
   propose **un** sujet sur Telegram : titres, territoire, signal de demande,
   angle, preuve, liens, et ce dont elle a besoin de l'équipe pour la preuve.
2. Les sujets viennent du calendrier de `docs/plan-mots-cles-seo-fev-2026.md`,
   traité comme une liste ordonnée **sans dates**, dans l'ordre de priorité de
   `docs/editorial/donnees-2026-11.md`. Un sujet hors calendrier est possible si
   Search Console le justifie.
3. Un lundi sur trois environ, la proposition peut être une **mise à jour**
   d'article existant lorsque Search Console montre une page proche du top 5.
4. Réponse sur Telegram : « ok » → rédaction FR puis EN autonome, couverture,
   contrôles, lien de prévisualisation sur le tailnet ; autre sujet → celui de
   l'équipe ; « non » → nouvelle proposition.
5. Après validation finale : `publishedDate` = jour de publication, commit et
   push sur `master`, mise en ligne au déploiement déclenché par le push. Une
   mise à jour d'article publié suit le même chemin, une fois validée.
6. Après déploiement : IndexNow et liens d'inspection Search Console envoyés
   pour la demande d'indexation manuelle.
7. Chaque retour de l'équipe est consigné dans `docs/editorial/retours-blog.md`.

Aucun appel DataForSEO n'est fait sans accord explicite et estimation du coût.

## Mesure

### Toutes les quatre semaines

- requêtes et pages émergentes dans Google Search Console ;
- impressions, clics, position et CTR, sans lire un indicateur isolément ;
- entrées organiques et actions utiles dans Plausible (`stats.hordeagence.com`) ;
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
