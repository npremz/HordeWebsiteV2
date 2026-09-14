# Relecture du lot de septembre 2026

Quatre créations bilingues et deux enrichissements bilingues, préparés le
14 septembre. La validation éditoriale finale appartient à Nicolas et Alexandre.
`draft: false` signifie ici que les contrôles techniques permettent la
programmation ; cela ne constitue pas une autorisation de publier en production.

## Les pages à relire

| Sortie proposée | Contenu | Français sur staging | English on staging |
| --- | --- | --- | --- |
| 15/09 | Direction artistique | [Lire](https://waf.hordagency.com/fr/blog/direction-artistique-interface-web/) | [Read](https://waf.hordagency.com/en/blog/art-direction-for-web-interfaces/) |
| 17/09 | Mise à jour IA et expérience | [Lire](https://waf.hordagency.com/fr/blog/ia-interfaces-experiences-utilisateur/) | [Read](https://waf.hordagency.com/en/blog/ai-can-create-interfaces-not-experiences/) |
| 18/09 | Design et développement | [Lire](https://waf.hordagency.com/fr/blog/design-developpement-web-ensemble/) | [Read](https://waf.hordagency.com/en/blog/design-and-web-development-together/) |
| 22/09 | Analyser une référence | [Lire](https://waf.hordagency.com/fr/blog/analyser-interface-web-sans-copier/) | [Read](https://waf.hordagency.com/en/blog/analyse-web-interface-without-copying/) |
| 24/09 | Mise à jour différenciation | [Lire](https://waf.hordagency.com/fr/blog/comment-creer-site-web-qui-se-demarque-2026/) | [Read](https://waf.hordagency.com/en/blog/how-to-make-your-website-stand-out-2026/) |
| 29/09 | Brief d’expérience | [Lire](https://waf.hordagency.com/fr/blog/brief-design-web-cadrer-experience/) | [Read](https://waf.hordagency.com/en/blog/web-design-brief-before-screens/) |

Les URLs de production utilisent les mêmes chemins sur `https://hordeagence.com`.
Le sélecteur de langue relie les deux versions. Les quatre créations apparaissent
sur staging avant leur date avec un badge Planifié. Tout le staging est noindex.

## Comment faire la revue en une session

1. Lire le début, les points clés et la conclusion de chaque version française.
2. Essayer l’atelier : changer la direction, éprouver le formulaire, ouvrir les
   références, remplir et télécharger un brief.
3. Vérifier le point de vue : correspond-il réellement à ce que Horde veut
   défendre et à ce que l’auteur accepte de signer ?
4. Relire l’anglais comme une version autonome, pas seulement comparer les mots.
5. Noter une décision par ligne : approuvé, retouches précises ou report.
6. Confirmer les dates. Si la validation arrive après une date proposée, la
   repousser avant fusion pour éviter un rattrapage public involontaire.

Les exemples sont pédagogiques et fictifs. Aucune inscription n’est envoyée par
les ateliers. Le brief est téléchargé localement, sans compte ni envoi des champs
au serveur. Aucun résultat client ni test utilisateur n’a été inventé.

## Livrables du pipeline

- `briefs.md` : intentions, différenciation, preuves et sources primaires.
- `images.md` : prompts exacts et chemins des quatre couvertures GPT-Image-2.
- `audit.md` : contrôle qualité, chiffres de contenu, tests et réserves.
- `distribution.md` : six publications LinkedIn FR/EN et un email FR/EN préparés.
- `browser-check.cjs` : test reproductible des douze pages en deux tailles.
- `style-check.py` et `style-results.json` : diagnostics descriptifs de rédaction.

Les contenus sont dans `src/content/posts/`, avec un YAML commun et deux corps
MDX par article. Les quatre nouvelles couvertures sont conservées dans
`src/assets/images/blog/<slug>/featuredImage.png`. Les deux mises à jour gardent
leurs images existantes. Les ateliers sont rendus par
`src/components/blog/BlogWorkshop.astro`, hors du parseur Markdown simplifié.
Le champ YAML facultatif `workshop` active le module avec la version de contenu.
Le déploiement du composant seul n’ajoute donc pas les ateliers aux anciennes
versions des deux articles à mettre à jour.

## Ce que la suite en production doit encore faire

Unités de transfert, à examiner sur une branche de préparation issue de master :

- `7601cbe` : stratégie, calendrier et premier socle de programmation, déjà préparés.
- `4ab7222` : ateliers optionnels, aperçu staging et contrôles de publication.
- `7d22c40` : quatre créations avec couvertures et dates.
- `7a3e4c4` : mise à jour IA, prévue pour le 17/09.
- `ca1e9f1` : mise à jour différenciation, prévue pour le 24/09.

Ce sont des repères de revue, pas une commande de fusion aveugle : master et
staging portent aussi leurs autres évolutions, à réconcilier selon l’état réel
du dépôt au moment du transfert.

La demande actuelle s’arrête au déploiement de relecture sur staging. Aucun
article n’a été fusionné dans `master` par ce pipeline et aucune publication
sociale, soumission IndexNow ou tâche Dokploy n’a été déclenchée.

Après approbation, transférer d’abord le socle technique et les quatre créations.
Conserver les deux commits de mise à jour comme unités séparées pour leurs PR
programmées. Ne pas fusionner tout staging dans master si l’on souhaite publier
ces nouvelles versions seulement les 17 et 24 septembre : `modifiedDate` n’est
pas une condition de visibilité.

Les mises à jour portent `modifiedDate: 2026-09-14`, date du changement matériel
effectif ; leurs dates de sortie sont proposées dans le calendrier, pas simulées
par un horodatage futur. Le futur lien vers le pilier d’octobre n’a pas été ajouté
puisque cette page n’existe pas encore.

Avant d’activer les fusions automatiques, protéger `master` avec approbation et
contrôle `Validate website and blog / validate`, puis tester le workflow sur une
PR dédiée. Le bot vérifie une liste complète des fichiers et le SHA de tête avant
fusion ; il ne supprime pas les branches. Son comportement GitHub réel n’a pas
été exercé sur master pendant ce lot.

Configurer et tester ensuite le rebuild quotidien Dokploy avec invalidation du
cache de build. Voir `../../publication-programmee-blog.md`. Les tests à horloge
simulée prouvent le filtrage Astro, pas le fonctionnement du cron de production.

Une alerte critique Astro/Sharp préexistante a été identifiée pendant les
contrôles ; elle est détaillée dans `audit.md` et doit être traitée avant la
mise en production. Aucune mise à niveau générale des dépendances n’est incluse.
