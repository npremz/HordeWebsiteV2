# Relecture du lot de septembre 2026

Quatre créations bilingues et deux enrichissements bilingues, préparés le
14 septembre. La validation éditoriale finale appartient à Nicolas et Alexandre.

Après relecture, les ateliers standardisés sont retirés des six articles, dans
les deux langues. Le nouveau pilote à valider est **« Comment s'inspirer d'un
site web sans le copier »**, réécrit en français avec deux captures réelles.
L'anglais conserve provisoirement son ancien angle, avec nettoyage des renvois
aux ateliers. Sa réécriture attend la validation du français.

Cette paire est repassée en `draft: true` pour empêcher toute sortie automatique
avant cette validation. Elle reste accessible sur staging. Voir
[revision-clarte.md](revision-clarte.md) pour le périmètre et les contrôles actuels.

## Les pages à relire

| Sortie proposée | Contenu | Français sur staging | English on staging |
| --- | --- | --- | --- |
| 15/09 | Direction artistique | [Lire](https://waf.hordagency.com/fr/blog/direction-artistique-interface-web/) | [Read](https://waf.hordagency.com/en/blog/art-direction-for-web-interfaces/) |
| 17/09 | Mise à jour IA et expérience | [Lire](https://waf.hordagency.com/fr/blog/ia-interfaces-experiences-utilisateur/) | [Read](https://waf.hordagency.com/en/blog/ai-can-create-interfaces-not-experiences/) |
| 18/09 | Design et développement | [Lire](https://waf.hordagency.com/fr/blog/design-developpement-web-ensemble/) | [Read](https://waf.hordagency.com/en/blog/design-and-web-development-together/) |
| 22/09, à confirmer | S'inspirer sans copier, pilote FR | [Lire la nouvelle version](https://waf.hordagency.com/fr/blog/analyser-interface-web-sans-copier/) | [Ancienne version, à réécrire après validation FR](https://waf.hordagency.com/en/blog/analyse-web-interface-without-copying/) |
| 24/09 | Mise à jour différenciation | [Lire](https://waf.hordagency.com/fr/blog/comment-creer-site-web-qui-se-demarque-2026/) | [Read](https://waf.hordagency.com/en/blog/how-to-make-your-website-stand-out-2026/) |
| 29/09 | Brief d’expérience | [Lire](https://waf.hordagency.com/fr/blog/brief-design-web-cadrer-experience/) | [Read](https://waf.hordagency.com/en/blog/web-design-brief-before-screens/) |

Les URLs de production utilisent les mêmes chemins sur `https://hordeagence.com`.
Le sélecteur de langue relie les deux versions. Les quatre créations apparaissent
sur staging avant leur date avec une indication d'aperçu. Tout le staging est noindex.

## Comment faire la revue en une session

1. Lire le début, les points clés et la conclusion de chaque version française.
2. Lire le pilote français : chaque capture explique-t-elle le passage qui
   l'accompagne ? Peut-on dire ce que l'article aide à faire sans vocabulaire de designer ?
3. Vérifier le point de vue : correspond-il réellement à ce que Horde veut
   défendre et à ce que l’auteur accepte de signer ?
4. Après validation du pilote FR, réécrire son anglais puis le relire comme une
   version autonome. Ne pas valider les deux langues comme déjà alignées.
5. Noter une décision par ligne : approuvé, retouches précises ou report.
6. Confirmer les dates. Si la validation arrive après une date proposée, la
   repousser avant fusion pour éviter un rattrapage public involontaire.

Les captures du pilote proviennent du site public du Rijksmuseum, observé le
14 septembre. Ce n'est pas un projet Horde. Les autres exemples décrits dans le
lot sont hypothétiques. Aucun résultat client ni test utilisateur n'a été inventé.
Il n'y a plus de formulaire de démonstration ni de téléchargement de brief.

## Livrables du pipeline

- `briefs.md` : intentions, différenciation, preuves et sources primaires.
- `images.md` : prompts exacts et chemins des quatre couvertures GPT-Image-2.
- `revision-clarte.md` : état actuel, changements, chiffres et validation restante.
- `audit.md` : historique de la première livraison, notes éditoriales retirées.
- `distribution.md` : propositions initiales mises en attente, à réviser avant tout envoi.
- `browser-check.cjs` : test reproductible des douze pages en deux tailles.
- `style-check.py` et `style-results.json` : diagnostics descriptifs de rédaction.

Les contenus sont dans `src/content/posts/`, avec un YAML commun et deux corps
MDX par article. Les quatre nouvelles couvertures sont conservées dans
`src/assets/images/blog/<slug>/featuredImage.png`. Les deux mises à jour gardent
leurs images existantes. Les captures sont des images locales insérées dans le
corps français ; `src/lib/content/blog-inline-images.ts` valide leur syntaxe.
Astro produit les versions WebP adaptées aux écrans. Le composant d'atelier et
son champ YAML ont été supprimés ; leurs versions précédentes restent dans Git.

## Ce que la suite en production doit encore faire

Préparer le transfert depuis master avec les versions finales validées. Les
anciens commits de la première livraison ne doivent pas être repris seuls : ils
réintroduiraient les ateliers retirés. Master et staging portent aussi leurs
autres évolutions, à réconcilier selon l'état réel du dépôt au moment du transfert.

La demande actuelle s’arrête au déploiement de relecture sur staging. Aucun
article n’a été fusionné dans `master` par ce pipeline et aucune publication
sociale, soumission IndexNow ou tâche Dokploy n’a été déclenchée.

Après approbation, transférer le socle technique et seulement les créations
validées dans les deux langues. Préparer les deux mises à jour dans des PR
séparées pour leurs dates. Ne pas fusionner tout staging dans master si l’on souhaite publier
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
