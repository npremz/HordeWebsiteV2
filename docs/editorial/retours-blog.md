# Retours sur les articles du blog

Journal des retours de Nicolas sur les propositions et les articles. À relire avant chaque nouvelle proposition.

## 2026-11-07 — « Comment reconnaître une bonne interface web ? » (pilier Expérience)

- Sujet accepté.
- Preuve : le Café Belga ne sert plus d’exemple, parce qu’il va bientôt disparaître de la page d’accueil. Il est remplacé par la landing de Café Loma, en cours de développement (loma.dev.nicolas-premont.be). On l’analyse dans l’article même, sans créer de fiche projet pour l’instant.
- Pas d’étude DataForSEO pour ce sujet.
- Le lien vers la page projet Café Belga a été retiré des liens internes prévus.
- Relecture : ne pas citer les défauts propres à une version de développement (fonctions pas encore branchées, mélange FR/EN, données provisoires). Les autres observations sont validées.
- Validé pour publication le 7 novembre 2026.

## 2026-11-09 — « Audit UX/UI d’un site web : méthode et grille de priorité » (Expérience)

- Proposition hebdomadaire acceptée telle quelle (« ok »), y compris la preuve sur hordeagence.com avec nos propres défauts.
- Pas d’étude DataForSEO pour ce sujet.
- Validé pour publication le 9 novembre 2026, sans modification : montrer nos propres défauts est assumé (« ça montre qu’on itère »).
- Suite proposée : corriger sur le site les frictions 1, 2, 4 et 6 (focus du formulaire, nom unique de l’audit, contraste du lien de langue, « Close » en français), dans une PR séparée.

## 2026-11-16 — Changement de stratégie et de rythme

- Proposition du 16/11 (« Animation web : UX et performance ») mise de côté : elle passe en bloc C (C3).
- Retour : la stratégie actuelle ne touche que des curieux. La cible, ce sont des gens au profil proche du nôtre, qui achètent du temps. Expertise à mettre en avant : utiliser et optimiser l'IA à son plein potentiel, l'UX des apps créées par IA.
- Préparer dès maintenant les requêtes « 2027 » pour être en place quand elles arriveront (dont « combien coûte un site web en 2027 »), sans abandonner les positionnements déjà mesurés.
- Rythme : trois articles par semaine, lundi, mercredi et vendredi, même horaire (10 h 30).

## 2026-11-16 — Tarifs publics

- Prix validés et consignés dans `docs/tarifs-2026-11.md`. Toujours HTVA.
- Ton : le site reste au « vous » ; le « tu » est réservé aux réseaux sociaux.
- Les pages services affichent « à partir de » + un plafond habituel ; la refonte varie selon vitrine, e-commerce ou SaaS.
- L'article sur le prix d'une refonte est actualisé avec une date de mise à jour.
- Une page « Prix » est en discussion avec le designer : ne pas la construire avant son retour.
- Ne jamais avancer sur des choix par défaut quand une question reste sans réponse : attendre la réponse.

## 2026-11-16 — Publication des prix (pages services + article refonte)

- Plafonds formulés « selon le périmètre, peut monter jusqu'à » : ne jamais écrire « généralement jusqu'à », le bas de la fourchette est le cas le plus fréquent.
- Accroches gardées, avec les mots qui ont des impressions dans Search Console : « MVP » et « investisseurs », « landing page », « Shopify ».
- Refonte e-commerce dès 999 € (jusqu'à 3 999 €) et refonte SaaS au prix d'un MVP (3 999 € à 8 000 €) : validés.
- Mise à jour de l'article refonte poussée directement sur master à la demande de Nicolas (pas de PR programmée).

## 2026-11-16 — « Meilleure IA pour coder en 2027 » (A1, territoire IA)

- Sujet accepté, rédigé ici plutôt que via le cron (le run du 16/11 avait proposé l'ancien sujet « animation »).
- Pas de banc d'essai chronométré : la preuve est le test terrain de Nicolas (Gemini, Claude Code, DeepSeek, Codex). Ne pas inventer de chiffres de vitesse.
- Angle corrigé par Nicolas : la vitesse est un argument majeur (pas l'inverse). Ce qui compte : l'écosystème, le harnais et le rapport qualité/vitesse.
- Positions de Nicolas : Claude Code = écosystème le plus complet, clé en main, « +/- safe » en entreprise ; Codex (OpenAI) pas pratique car lent dans l'état actuel ; DeepSeek excellent pour tests et itérations rapides, mais attention RGPD (données en Chine) ; le choix d'un modèle rapide est situationnel.
- À dire clairement : le code est « good enough » avec les modèles frontier, mais l'IA n'est pas au niveau d'un pro en UX : beaucoup de bruit sans but sur les pages, ça fait illusion pour un novice.
- Miniature : utiliser les logos des IA comparées.
- Article à mettre à jour à chaque grosse sortie (veille automatique hebdomadaire, voir cron « Veille IA — article meilleure IA pour coder »).
- 16/11, retours : citation attribuée à Alexandre Potakowski (co-fondateur, designer UX), rendue comme vraie citation (le parseur maison ne gérait pas `>` ; ajout de `figure.article-quote` + légende mono). Gemini : offre trop complexe, modèles frontière liés à AI Studio, Carbon réservé à AI Ultra (99,99 €/219,99 € en BE, vérifié le 16/11) ou à l'API, Argon dès AI Pro 21,99 € ; Antigravity = harnais le moins convaincant testé ; modèles 4 accessibles ≈ niveau Sonnet. Formulé comme avis Horde, chiffres sourcés.

## 2026-11-18 — « Combien coûte un site internet en 2027 ? Les prix en Belgique » (A2, M)

- Proposition du mercredi acceptée (« ok c’est bon, go répartir ») : l’article répond à « combien et pourquoi » et renvoie à la page Prix pour la grille ; il ne cite que les prix « à partir de », jamais les plafonds.
- Pas de fourchette « marché » pour les freelances (aucune donnée sourcée) : dit explicitement dans l’article.
- Abonnements comparés sur 24 mois en facturation annuelle, prix normaux (pas la remise Wix de première période), hors taxes.
- Validé pour publication le 18 novembre 2026 sans modification (« parfait »), y compris les deux textes européens de la section 2027 et le calcul au prix Wix normal.
- À faire : ajouter le lien vers A2 dans `combien-coute-refonte-site-web` (article publié, modification séparée).

## 2026-11-20 — « Créer son site en 2027 : IA, builder ou agence ? » (A3, IA)

- Proposition du vendredi acceptée. Nicolas a fourni lui-même les trois générations (Lovable, Framer, Wix) et le prompt, et demandé la comparaison avec notre landing Loma en développement.
- Thèse de Nicolas : le prompt vient de notre travail en amont, les outils avaient toutes les clés ; Lovable correct, Framer et Wix médiocres. Mesures cohérentes, avec une nuance écrite : Framer est fidèle visuellement sur ordinateur, médiocre par le contenu (aucun prix, adresse ni horaire, carte vide, pas de H1, photo sur le titre en mobile).
- Constat ajouté : Lovable invente adresse, horaires, prix, équipe et provenance des verres.
- Notre version Loma : présentée comme en développement, sans défaut cité (règle du 7/11).
- Les blocs de code `prompt` passent à la ligne (CSS `.language-prompt`), pour citer des prompts sans défilement horizontal.
- Validé pour publication le 20 novembre 2026 (« tout est nickel »), formulation Framer « fidèle en surface, vide en dessous » gardée.
- Les trois sites générés sont cités en sources : un contrôle quotidien (cron Hermes « Veille liens — sites générés A3 ») prévient Nicolas s'ils ne répondent plus.

## 2026-11-23 — mise à jour best-ai-for-coding (GPT-6.2, Gemini 4 Neon)
- Retour Nicolas après la veille 968df6c2b49a : Neon très fort, harnais Antigravity/agy toujours faible, attente de l’ouverture des abonnements Google aux harnais libres (ex. Hermes). GPT-6.2 décevant à l’usage dans l’abonnement, non utilisé.
- Poussé directement sur master à la demande de Nicolas (« go prod »), sans PR programmée.
- Vérifié : Neon inclus dans Google AI Pro ; Artificial Analysis Index Fable 5.2 = 65, GPT-6.2 Astra = 62, Neon = 61 (23/11). Citation signée Nicolas (« lourd » rendu par « vraiment fort »).

## 2026-11-24 — « Lovable avis 2027 » (A4, IA)

- Proposition du lundi acceptée. Nicolas a repris le projet Lovable de A3 (pas de remix) et l’a transformé en app avec le prompt fourni ; l’URL citée en A3 affiche donc désormais l’app.
- Audit sécurité délégué (« j’ai pas le temps d’audit la secu ») : propre, aucune fuite ; écrit comme tel, avec le contexte CVE-2025-48757. Le H1 « 80 % » est abandonné (non mesurable).
- Verdict de Nicolas cité et signé : code qui fonctionne, aucune stratégie (UX reprise d’une DA existante, SEO sans mot-clé, aucune vraie info), bon prototype ; Lovable oui pour un premier jet ou un site pas cher, pas pour scaler ; l’IA donne la même stratégie au concurrent.
- Nouveau constat : numéro de téléphone inventé, aussi dans le JSON-LD BarOrPub ; aucune notification de réservation.
- Nicolas a demandé le logo Lovable sur la couverture, puis une couverture qui tienne en carré (vignettes).
- Validé pour publication le 24 novembre 2026 (« parfait go prod ») ; numéro inventé laissé en clair, faute de demande de masquage.

## 2026-11-25 — « Vibe coding en 2027 » (A5, IA)

- Nicolas a remplacé le petit projet prévu par une vraie app vibe-codée sans ouvrir l'éditeur : Rocket Mission (rocket.42belgium.be, 42 Belgium nommable, dépôt privé), workshop du 20/10, 2 × 20 personnes, tous les cas particuliers prévus survenus au moins une fois.
- Angle imposé : l'IA est good enough pour le code (surtout le front) ; entre les mains d'un expert, UX de pointe grâce à l'itération rapide ; un non-formé croit son interface suffisante ; le test utilisateur est essentiel ; « une UX impeccable ne se remarque pas, c'est l'inverse qui fait tache ».
- Citation signée Nicolas (dev) : il n'écrit plus de code, il relit, contrôle, maintient et déploie ; le reste c'est du chipotage.
- Son avis sur les modèles (régression de GPT-6.1, Opus 5.5 meilleur) gardé hors article : seuls les outils réellement utilisés sont cités, d'après les commits.
- En attente de relecture.
