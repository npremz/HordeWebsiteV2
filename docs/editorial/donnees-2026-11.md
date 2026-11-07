# Données éditoriales — novembre 2026

Relevé du 7 novembre 2026. Sert de référence au cron de proposition hebdomadaire
jusqu'au prochain relevé (à refaire au plus tôt en février 2027, avec accord).

## Sources et coût

| Source | Périmètre | Coût |
| --- | --- | --- |
| DataForSEO (OpenSEO `get_keyword_metrics`) | 125 requêtes couvrant les 24 sujets du calendrier, Belgique/fr et France/fr | ~0,05–0,10 $ |
| OpenSEO AI visibility, check manuel | 10 questions FR × ChatGPT, Gemini, Perplexity, Google AI Overviews, depuis la Belgique (run `25a24ddf`) | 0,52 $ |
| Search Console (OpenSEO) | 3 derniers mois | gratuit |
| Plausible (`stats.hordeagence.com`, API v2, clé `PLAUSIBLE_API_KEY`) | 30 jours / 6 mois | gratuit |

Le tracker IA est enregistré dans OpenSEO mais **en pause** : aucune collecte
payante récurrente n'est active. Le réactiver coûte ~0,44 $/mois en mensuel.

## Ce que disent les chiffres

- **La Belgique seule ne mesure presque rien.** 84 requêtes sur 125 n'ont aucun
  volume en BE. Les volumes France servent à comparer la demande entre sujets,
  pas à prévoir du trafic belge.
- **Trafic réel (Plausible, 30 jours) :** 137 visiteurs, 579 pages vues.
  Sources : direct 108, Google 19, Instagram 4, chatgpt.com 2, LinkedIn 1.
  Aucun objectif (goal) configuré : les contacts ne sont pas mesurés.
- **Search Console (3 mois) :** environ 45 impressions par jour sur tout le site ;
  le blog cumule ~1 300 impressions et 12 clics.
- **IA :** sur 40 réponses, Horde n'est jamais nommée et citée une seule fois :
  ChatGPT cite en **première source** `/fr/blog/combien-coute-refonte-site-web/`
  pour « Combien coûte une refonte de site web en Belgique ? ».
  Leçon : une réponse concrète, chiffrée et belge est reprise par les assistants.
- **Questions « quelle agence » :** les réponses citent des annuaires (Sortlist,
  Clutch, goodfit.be) et des concurrents (Typi, Akis Studio, Atelier Design,
  DexVille, Eazyclick). Le blog n'y changera rien seul ; ce sont les profils
  d'annuaires et la fiche Google qui comptent.
- **Questions informationnelles :** les réponses citent NN/g, W3C, blog-ux.com,
  HubSpot, un cabinet d'avocats (propriété du code). Aucune source belge
  francophone forte : c'est l'ouverture.

## Demande par sujet du calendrier

Volume mensuel France / Belgique pour la meilleure requête du sujet
(« — » = non mesurable). KD = difficulté (0–100) côté France.

| Rang (demande) | Sujet (plan) | Requêtes porteuses FR / BE | Lecture |
| --- | --- | --- | --- |
| 1 | Audit UX/UI d'un site (E) | audit ux 320/20 · ux audit 320/20 · audit site web 260/20 · KD 0 | Demande + proche de l'Audit offert. Les IA citent NN/g, Clarity, GA : pas de méthode francophone appliquée. À avancer. |
| 2 | Accessibilité et design (E) | wcag 1 900/590 · accessibilité web 260/10 · design accessible 210/— | Plus forte demande BE après « ux ui design ». Contexte EAA (en vigueur depuis juin 2025) et EN 301 549 mis à jour en septembre 2026, cité par Perplexity. |
| 3 | Design system (E) | design system 2 400/210 · KD 0–48 | Forte demande, intention générale ; angle « site web » à tenir. |
| 4 | UI et UX : quelle différence (E) | ui vs ux 390/70 · ui et ux 110/10 · différence ui ux 70/— (« ux ui design » 5 400/2 400, intention formation) | Demande réelle ; concurrence de définitions génériques. |
| 5 | Animation web (T) | animation site web 1 600/— · animation web 320/70 | Absorbe « micro-interactions » (90/—) et `prefers-reduced-motion` (70/—) comme sections ou suites. |
| 6 | Maintenance évolutive (M) | maintenance site web 390/20 · maintenance site wordpress 260/10 · maintenance site internet 170/10 | Demande + proche de l'offre Optimisation. |
| 7 | Choisir un CMS (M) | cms headless 880/170 · meilleur cms 90/10 | Angle autonomie ; les IA citent HubSpot. |
| 8 | Mesurer l'UX sans tout collecter (T) | plausible analytics 480/110 · alternative google analytics 170/— | Preuve originale disponible : notre propre Plausible auto-hébergé. |
| 9 | Tester un site avec des utilisateurs (E) | user testing 1 300/210 (marque UserTesting probable) · test utilisateur 260/— | Demande ; preuve réelle nécessaire (test mené par Horde). |
| 10 | Template ou sur mesure (M) | site web sur mesure 110/10 · site internet sur mesure 90/10 | Faible volume mais commercial ; les IA citent des offres template à 69 €/mois. |
| 11 | Site web d'association (M) | site internet association 170/10 · site web association 70/10 | Moyen. |
| 12 | Site WebGL / 3D (T) | 3d website 320/140 · site web 3d 90/10 | 140 en BE, intention surtout inspiration. |
| — | Bonne interface web (pilier E) | ergonomie site web 70/10 ; le reste non mesurable | **Publié le 7 novembre 2026.** Sujet de conviction : ne pas en attendre de trafic. |
| — | Navigation mobile, typographie, fiche produit, prototypage IA, code généré par IA, propriété du site, mesurer après refonte | ≤ 50/— | Conviction seulement. « propriétaire nom de domaine » (260) = recherches WHOIS, hors sujet. « Performance perçue » chevauche l'article existant sur la vitesse : en faire une mise à jour. |

## Conséquences pour le cron

1. L'ordre de production qui découle de ce relevé est la section 5 de
   `docs/plan-mots-cles-seo-fev-2026.md` ; ce fichier n'en garde que les chiffres.
2. Écrire des réponses concrètes, chiffrées quand c'est vrai, ancrées en
   Belgique : c'est le format que ChatGPT reprend.
3. Signaler dans chaque proposition si la preuve peut être produite seul ou ce
   qu'il faut à l'équipe (notes, captures, résultats de projet).
4. Ne pas relancer DataForSEO pour ces 125 requêtes avant février 2027.

## Hors blog, à traiter

- Créer dans Plausible un objectif « Contact » (envoi du formulaire) pour
  mesurer ce que le blog apporte vraiment.
- Profils Sortlist, Clutch et goodfit.be : ce sont eux que les IA citent pour
  « quelle agence UX/UI en Belgique ».
