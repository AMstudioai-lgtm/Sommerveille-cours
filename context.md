# Contexte du Projet — L'Architecte Logiciel (Formation Modulaire Interactive)

## 1. Vision & Objectif du Projet
Ce site web est une plateforme de formation modulaire, méthodique et interactive intitulée **« De la Conception à la Maintenance d'un Logiciel »**, conçue selon la posture d'un **Ingénieur Logiciel Mentor Senior**.
Elle transforme l'ouvrage de référence *Software Engineering (10th Edition)* d'Ian Sommerville en un parcours progressif en **9 Modules détaillés (avec Sous-modules explicatifs et ateliers interactifs)** destiné à un créateur qui **ne sait pas écrire de code**, mais qui souhaite **penser, décider et agir comme un Architecte Logiciel accompli** capable de piloter une IA (notamment Google AI Studio) avec rigueur jusqu'à la réalisation d'un **Projet Final concret (« MediFlow Studio »)**.

## 2. Structure Pédagogique Méthodique (9 Modules + Sous-modules + Projet Final)
- **Module 01 — Esprit Ingénieur & Exigences** :
  - Sous-module 1.1 : La différence entre un script jetable et l'ingénierie logicielle (les 4 piliers de Sommerville).
  - Sous-module 1.2 : Exigences Fonctionnelles vs Exigences Non-Fonctionnelles.
  - Sous-module 1.3 : La Règle Métier (Business Rule) isolée de l'affichage.
- **Module 02 — Processus, Incréments & Agile** :
  - Sous-module 2.1 : Cascade (Waterfall) vs Développement Incrémental.
  - Sous-module 2.2 : Principes Agiles, User Stories et boucle d'itération courte + Simulateur interactif.
- **Module 03 — Architecture en Couches & Rôles** :
  - Sous-module 3.1 : Anatomie détaillée des 4 couches fondamentales (Présentation, Logique Métier, Accès Données, Base de Données) et des rôles associés.
- **Module 04 — Monolithe Modulaire & Patrons d’Architecture** :
  - Sous-module 4.1 : Monolithe classique vs Monolithe Modulaire vs Microservices + Schéma SVG interactif (MVC, Couches, Client-Serveur, Repository, Pipe & Filter).
- **Module 05 — Fonction, Module, Service & 5 Architectures Comparées** *(Intégré)* :
  - Sous-modules 5.1 à 5.6 interactifs : Échelle (Fonction → Fichier → Module → Service) + Rayons X d'une fonction, Simulateur d'isolation de fonction, Frontière Module vs Service + Calculateur d'arbitrage, Explorateur des 5 architectures (`boutique-app` en Couches, MVC, Monolithe Modulaire, Hexagonale, Microservices) + Tableau radar, Directives IA Avant/Après, et Atelier d'Audit en 5 cas connecté à la jauge globale.
- **Module 06 — Lire une Arborescence de Fichiers** :
  - Sous-module 6.1 : Les fichiers de la racine (`package.json`, `.env.example`, `server.ts`, `context.md`, `plan.md`, `agents.md`) et l'organisation de `/src` + Explorateur interactif.
- **Module 07 — Données & Hébergeurs Cloud** :
  - Sous-module 7.1 : Quel type de données convient dans quel cas (SQL, NoSQL Firestore, Blob Storage, Cache, LocalStorage).
  - Sous-module 7.2 : Quel choix d'hébergeur faire (Cloud Run Serverless, CDN Statique, BaaS, VPS dédié) + Simulateur de décision sous contraintes.
- **Module 08 — Sécurité, Tests & Maintenance** :
  - Sous-module 8.1 : Défense en Profondeur (Modèle du Fromage Suisse de James Reason), Vérification vs Validation, Dette Technique et Refactoring.
- **Module 09 — Piloter l’IA & Projet Final à Construire (« MediFlow Studio »)** :
  - Sous-module 9.1 : La méthode des 3 fichiers directeurs (`context.md`, `plan.md`, `agents.md`) et la structure en 4 points d'un prompt d'architecte.
  - Scénarios d'entraînement Google AI Studio (*Mentcare* & *iLearn*).
  - **Projet Final de Fin de Formation (« MediFlow Studio »)** : Cahier des charges complet, 4 missions séquentielles avec checklists, prompts prêts à copier et générateur de trame `context.md / plan.md / agents.md`.

## 3. Système de Design Minimaliste & Contraintes Visuelles
- **Typographie Unique** : `DM Sans` sur l'ensemble du site (titres, sous-titres, corps de texte) + `IBM Plex Mono` pour les chemins de fichiers et extraits techniques.
- **Structure Éditoriale Minimaliste** : Chaque module et sous-module est introduit par un **Grand Titre**, un **Sous-titre** et le **Reste du contenu** enrichi, avec des espaces blancs conséquents (`py-24` à `py-32`, `space-y-20`) et sans cartes superflues autour du texte.
- **Confinement strict des cartes & en-tête PC** : En-tête sur une seule ligne non-débordante (`whitespace-nowrap shrink-0`), tiroir sommaire en grille 3×3 équilibrée, et protection anti-débordement (`min-w-0`, `break-words`, `overflow-x-auto`) sur chaque carte et bloc monospace.
- **Schémas Visuels Générés par Module** : Les modules théoriques intègrent des schémas épurés dans les 3 styles visuels de référence (blocs pastel plats à contours fins, couches colorées avec rôles, et croquis d'architecture de type Excalidraw).
- **4 Palettes de Couleurs** :
  - **Primaire (Fond)** : `#FAF9F5`, `#F3F1EA`, `#EAE6DC`.
  - **Secondaire (Texte)** : `#141619`, `#3B4049`, `#6E7582`.
  - **Tertiaire (Contrôles, schémas, cartes plates)** : `#FFFFFF` et `#F7F5EF` avec bordure fine 1px (`#DCD7CA`) et zéro effet de profondeur.
  - **Quaternaire (États, validation, alertes)** : `#1E56A0`, `#1B6B4A`, `#B85D19`, `#A62626`.

## 4. État d'Avancement (Ce qui est fait)
- [x] Restructuration méthodique en 9 Modules et Sous-modules détaillés avec textes enrichis et approfondis.
- [x] Intégration native du **Module 05** (*Lire une Architecture : De la Fonction au Service & 5 Patrons Comparés*) dans `src/data/architectureReadingData.ts`, `src/components/ArchitectureReadingLab.tsx` et règles pures dans `src/utils/mentorEngine.ts`.
- [x] Connexion des 5 cas de l'Atelier d'Audit du Module 05 à la jauge de maîtrise globale.
- [x] Consolidation de l'en-tête desktop (zéro débordement sur PC) et de la grille 3×3 du sommaire.
- [x] Génération et intégration des schémas visuels dans le style exact des 3 images de référence pour chaque module.
- [x] Passage intégral à la police `DM Sans` et allègement minimaliste avec grands espaces respirants (Grand Titre -> Sous-titre -> Contenu).
- [x] Création du Projet Final guidé « MediFlow Studio » (`src/components/CapstoneProjectLab.tsx`) en fin de formation.
- [x] Validation par tests unitaires (`src/utils/mentorEngine.test.ts`), compilation et vérification navigateur.
- [x] Résolution du conflit de dépendances `esbuild` / `vite` dans `package.json` (`esbuild@^0.28.0`) pour compatibilité `npm install` sur Vercel.

## 5. Évolutions Futures (Versions X)
- **v1.2** : Export téléchargeable en un clic d'une archive `.zip` contenant les fichiers `context.md`, `plan.md` et `agents.md` personnalisés par l'apprenant.
- **v2.0** : Grille d'auto-évaluation interactive du code généré lors de la réalisation du projet final « MediFlow Studio ».
