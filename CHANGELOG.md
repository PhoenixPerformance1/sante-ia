# 📋 CHANGELOG · Santé & IA

Journal chronologique des modifications et déploiements du projet Santé & IA (`sante-ia.fr`).

---

## [1.1.0] - 2026-11-17
- **Opérateur :** Chaddouk (pierr) [via Atlas]
- **Action :** 
  - Connexion native de l'API d'inscription (`/api/subscribe`) au compte Brevo officiel du Dr Elias Chaddouk via `BREVO_API_KEY` et `BREVO_LIST_ID` (Liste 4 : *Santé & IA - Inscrits Waitlist*).
  - Création des attributs personnalisés `SOURCE` et `DATE_INSCRIPTION` sur le compte Brevo.
  - Synchronisation et injection initiale rétroactive de l'ensemble des 17 contacts uniques déjà inscrits depuis le lancement de la landing page.
- **Raison / Contexte :** Automatisation de la gestion des contacts et constitution automatique de la liste de diffusion de l'ouvrage sans manipulation manuelle.
- **Impact & Validation :** Clé API Brevo et liste 4 actives. Tous les futurs inscrits sont immédiatement ajoutés à la liste de diffusion Brevo en temps réel.

---

## [1.0.0] - 2026-11-16
- **Opérateur :** Chaddouk (pierr) [via Atlas]
- **Action :** 
  - Initialisation de la landing page vitrine officielle pour l'ouvrage du Dr Elias Chaddouk (*Manuel de bonnes pratiques pour dialoguer avec les modèles de langage (LLM)*).
  - Recadrage précis de la couverture de l'ouvrage et du portrait de l'auteur, génération des versions WebP légères.
  - Génération des QR codes officiels haute résolution (SVG vectoriel et PNG 300 DPI) pointant de manière permanente sur `https://sante-ia.fr`.
  - Intégration du Design System Anti-Slop (SOP 06) en Light Mode First avec bascule Dark Mode native.
  - Création du repository GitHub `PhoenixPerformance1/sante-ia` et déploiement initial sur Vercel.
- **Raison / Contexte :** Besoin d'un lien permanent pérenne et d'un QR code pour l'impression de l'ouvrage papier, avec vitrine d'attente professionnelle et formulaire de waitlist.
- **Impact & Validation :** Site opérationnel, responsive Mobile-First (375px à 4K), 0 dépendance lourde, prêt pour rattachement du domaine OVH `sante-ia.fr`.
