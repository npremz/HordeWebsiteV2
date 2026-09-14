# Publication programmée du blog

Ce document décrit le fonctionnement attendu pour préparer plusieurs articles,
les relire ensemble sur staging, puis les publier automatiquement en production.

## États d'un article

| Métadonnées | Staging | Production |
| --- | --- | --- |
| `draft: true` | Visible avec un badge Brouillon | Absent |
| `draft: false` et `publishedDate` future | Visible avec un badge Planifié | Absent |
| `draft: false` et date atteinte | Visible | Visible après le prochain build |

Le staging doit être construit avec :

```dotenv
SITE_ENV=staging
BLOG_PREVIEW_UNPUBLISHED=1
```

La production doit être construite avec :

```dotenv
SITE_ENV=production
BLOG_PREVIEW_UNPUBLISHED=0
```

Le build refuse volontairement la combinaison `SITE_ENV=production` et
`BLOG_PREVIEW_UNPUBLISHED=1`.

## Sécurité du staging

Toutes les pages d'un domaine autre que `hordeagence.com` reçoivent une directive
HTML `noindex, nofollow`. Son `robots.txt` bloque également l'exploration.

Une authentification HTTP ou une restriction d'accès dans Dokploy reste
recommandée. `robots.txt` et les balises meta sont des consignes aux robots, pas
un mécanisme de confidentialité.

## Pourquoi un rebuild est nécessaire

Les routes du blog sont prérendues. Astro décide donc au moment du build si la
date de publication est atteinte. Redémarrer le conteneur existant ne suffit pas :
il faut produire une nouvelle image contenant un nouveau build Astro.

## Tâche quotidienne Dokploy

Créer une tâche planifiée dans Dokploy :

- nom : `publish-scheduled-blog-posts` ;
- horaire : `17 5 * * *` ;
- fuseau : `Europe/Brussels` ;
- cible : le service de production lié à la branche `master` ;
- action : nouveau déploiement, jamais simple redémarrage.

Pour une Application Dokploy, la tâche peut appeler :

```bash
curl --fail-with-body --silent --show-error \
  -X POST "${DOKPLOY_URL}/api/application.deploy" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "x-api-key: ${DOKPLOY_API_KEY}" \
  --data "{\"applicationId\":\"${DOKPLOY_APPLICATION_ID}\",\"title\":\"Scheduled blog publication\"}"
```

Pour un service Docker Compose Dokploy, utiliser :

```bash
curl --fail-with-body --silent --show-error \
  -X POST "${DOKPLOY_URL}/api/compose.deploy" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "x-api-key: ${DOKPLOY_API_KEY}" \
  --data "{\"composeId\":\"${DOKPLOY_COMPOSE_ID}\"}"
```

Conserver la clé API dans le gestionnaire de secrets utilisé par Dokploy. Ne pas
l'écrire dans le dépôt ni dans une image Docker.

Documentation Dokploy :

- https://docs.dokploy.com/docs/core/schedule-jobs
- https://docs.dokploy.com/docs/core/auto-deploy
- https://docs.dokploy.com/docs/api/application
- https://docs.dokploy.com/docs/api/compose

## Point impératif : le cache du build

Le build Astro doit réellement être rejoué chaque jour. Avec un contexte Git
inchangé, Docker peut réutiliser la couche `RUN npm run build`.

- déploiement de type Application : activer l'option Dokploy de nettoyage du
  cache pour cette production planifiée ;
- déploiement de type Compose : faire exécuter le build avec `--no-cache`, ou
  vérifier dans les logs que l'étape `RUN npm run build` n'est pas marquée
  `CACHED`.

Cette vérification doit être faite avec un article test daté du lendemain avant
de confier plusieurs mois de publications au système.

## Contrôle après déploiement

La tâche doit être considérée comme réussie uniquement si :

1. le déploiement Dokploy est terminé sans erreur ;
2. `/fr/blog/rss.xml` et `/en/blog/rss.xml` répondent en HTTP 200 ;
3. `/sitemap-index.xml` répond en HTTP 200 ;
4. les deux URLs d'un article devenu publiable répondent en HTTP 200 ;
5. un article dont la date est encore future reste absent de production.

Le script IndexNow ignore les brouillons et les dates futures. Il ne doit être
appelé qu'après le succès du déploiement, jamais depuis staging.

## Cas des mises à jour d'articles déjà publiés

`publishedDate` permet de programmer un nouvel article, mais pas une nouvelle
version d'un article déjà en ligne. Si cette version est fusionnée dans `master`,
elle devient publique au prochain déploiement, même avec un `modifiedDate` futur.

Pour préparer les mises à jour en batch sans les publier immédiatement :

1. créer une PR dédiée par mise à jour à partir de `master` ;
2. l'intégrer temporairement à `staging` pour la relecture globale ;
3. l'approuver et ajouter `Publish-Date: YYYY-MM-DD` dans son corps ;
4. ajouter le label `scheduled-blog-update` ;
5. laisser l'action GitHub quotidienne fusionner les PR arrivées à échéance,
   uniquement lorsqu'elles sont approuvées et fusionnables ;
6. laisser le webhook GitHub vers Dokploy déclencher le déploiement normal.

Le workflow `.github/workflows/publish-scheduled-blog-updates.yml` s'exécute
chaque jour à `02:30 UTC`, donc avant le rebuild Dokploy en heure d'hiver comme
en heure d'été. Il ne traite que les PR vers `master` qui portent le label, et il
refuse :

- les PR en brouillon ou sans approbation ;
- une date absente, invalide ou future ;
- un état de fusion autre que `CLEAN`, notamment des contrôles requis en attente ;
- des changements hors de `src/content/posts/` et
  `src/assets/images/blog/`.

Le label `scheduled-blog-update` doit être créé une fois dans le dépôt GitHub.
La protection de `master` doit exiger les contrôles de validation souhaités et
au moins une approbation pour que le garde-fou soit effectif.

## Test d'acceptation avant le premier batch

1. Ajouter un article minimal valide avec une date au lendemain.
2. Vérifier qu'il apparaît sur staging avec le badge Planifié.
3. Vérifier qu'il est absent de production et de ses RSS/sitemap.
4. Exécuter manuellement la tâche Dokploy après le changement de date.
5. Vérifier que l'article apparaît dans les deux langues.
6. Restaurer ou supprimer l'article de test avant de démarrer le calendrier.
