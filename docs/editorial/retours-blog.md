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
