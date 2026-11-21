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

## 3. Système de Design Éditorial & Contraintes Visuelles
- **Typographie Éditoriale (100 % Locale Hors-Ligne)** : **`Cormorant Garamond`** (`300`, `400`, `500`, `600`, chiffres alignés `lining-nums tabular-nums`) pour les grands titres (`h1`, `h2`, `h3`) et les métriques nues, associée à **`DM Sans`** pour les sous-titres, le corps de texte (`max-w-[65ch]`) et les contrôles, et `IBM Plex Mono` pour les chemins de fichiers et extraits techniques.
- **Mise en Page Éditoriale & Marges Larges** : Chaque module et sous-module est structuré selon la cadence **`Grand Titre Serif → Sous-titre Sans → Filet horizontal fort (1.5px) → Contenu aéré`** avec larges marges latérales (`px-7 sm:px-12 lg:px-16`), métriques nues en bleu cobalt sans boîte, séparateurs fins entre sous-modules (`1px`) et feuille de style `@media print` pour export PDF propre.
- **Confinement strict des cartes, en-tête PC & tiroir mobile** : En-tête sur une seule ligne non-débordante (`whitespace-nowrap shrink-0`), tiroir sommaire en grille 3×3 avec défilement vertical interne sur mobile (`max-h-[calc(100dvh-4.25rem)] overflow-y-auto`), et protection anti-débordement (`min-w-0`, `break-words`, `overflow-x-auto`) sur chaque carte et bloc monospace.
- **Triple codage visuel dans les 9 modules (Texte + Schéma Mermaid + Code typé + Arborescence)** :
  - Chaque sous-module et atelier du Module 05 associe des schémas **Mermaid** auto-responsives (orientation verticale `TD` sur mobile, horizontale `LR` avec défilement interne fluide sur grand écran, bascule `Auto / Vertical / Horizontal` et code source Mermaid dépliable), des **blocs de code typés** (`ts`, `tsx`, `js`, `sql`, `json`, `rules`, `md`, `text`, `tree`) colorés sobrement sur les 4 palettes avec bouton Copier, et des **arborescences**.
  - Tous les extraits de code auparavant noyés dans les paragraphes du module Fonction (Module 05) sont désormais isolés en blocs dédiés `Texte + Bloc Code`.
- **Schémas Visuels Générés par Module** : Les modules théoriques intègrent des schémas épurés dans les 3 styles visuels de référence (blocs pastel plats à contours fins, couches colorées avec rôles, et croquis d'architecture de type Excalidraw).
- **4 Palettes de Couleurs** :
  - **Primaire (Fond)** : Clair `#FFFFFF`, `#FAF9F6`, `#F3F1EB` · Sombre `#111317`, `#171A20`, `#0D0F13`.
  - **Secondaire (Texte)** : Clair `#141619`, `#323741`, `#666E7A` · Sombre `#F3F1EA`, `#C8CDD6`, `#8E96A5`.
  - **Tertiaire (Contrôles, schémas, cartes plates)** : Clair `#FFFFFF` / `#F8F7F3` (bordure `#E4E0D5`) · Sombre `#1B1F26` / `#15181E` (bordure `#2B313D`), zéro effet de profondeur.
  - **Quaternaire (États, validation, alertes)** : Clair `#1D4ED8`, `#1B6B4A`, `#B85D19`, `#A62626` · Sombre `#6EA8FE`, `#4CC38A`, `#E5964B`, `#F06D6D`.

## 4. État d'Avancement (Ce qui est fait)
- [x] Restructuration méthodique en 9 Modules et Sous-modules détaillés avec textes enrichis et approfondis.
- [x] Intégration native du **Module 05** (*Lire une Architecture : De la Fonction au Service & 5 Patrons Comparés*) dans `src/data/architectureReadingData.ts`, `src/data/module5VisualsData.ts`, `src/components/ArchitectureReadingLab.tsx` et règles pures dans `src/utils/mentorEngine.ts`.
- [x] Connexion des 5 cas de l'Atelier d'Audit du Module 05 à la jauge de maîtrise globale.
- [x] Consolidation de l'en-tête desktop (zéro débordement sur PC), grille 3×3 du sommaire et activation du défilement vertical interne du tiroir sur mobile.
- [x] Enrichissement complet des **9 modules** en schémas **Mermaid** auto-responsives (`MermaidDiagramBlock`), blocs de code typés 4 palettes (`CodeSnippetBlock`), arborescences (`SubSectionVisualStack`, `moduleVisualsData.ts`) et extraction du code hors du texte dans le Module 05.
- [x] Génération et intégration des schémas visuels dans le style exact des 3 images de référence pour chaque module.
- [x] Création du Projet Final guidé « MediFlow Studio » (`src/components/CapstoneProjectLab.tsx`) en fin de formation.
- [x] Validation par tests unitaires (`mentorEngine.test.ts` + `visualFormatter.test.ts`), compilation et vérification navigateur (PC 1440px & Mobile 390px).
- [x] Résolution du conflit de dépendances `esbuild` / `vite` dans `package.json` (`esbuild@^0.28.0`) pour compatibilité `npm install` sur Vercel.
- [x] **PWA 100 % Hors-Ligne (Cas 2)** : Configuration `vite-plugin-pwa` (`registerType: 'autoUpdate'`), manifeste complet (`id`, `short_name: 'Architecte'`, `display: 'standalone'`), icônes PNG conformes (`192×192`, `512×512`, `maskable` 512×512 avec marge de sécurité, `apple-touch-icon.png` 180×180), polices `Cormorant Garamond`, `DM Sans` et `IBM Plex Mono` embarquées localement (`@fontsource`), précaching Workbox intégral (chunks JS/Mermaid, 7 schémas JPG dans `public/images/schemas/`, 3 schémas de référence et PDF Sommerville 4 Mo avec limite 8 Mo), bouton d'installation intégré (`PWAInstallButton` + guide iOS Safari), indicateur hors-ligne (`OfflineIndicator`) et persistance locale versionnée (`src/persistence/progressStorage.ts`) avec réinitialisation dans le Sommaire.
- [x] **Mode Sombre Basculable (4 Palettes CSS Variables)** : Variante sombre flat sans ombre définie via `:root[data-theme="dark"]` dans `src/index.css`, persistance `localStorage` + repli préférence système (`src/persistence/themeStorage.ts`, `src/hooks/useTheme.ts`), script anti-flash dans `index.html`, mise à jour dynamique de `<meta name="theme-color">`, adaptation automatique des schémas Mermaid, du diagramme SVG interactif et de la coloration syntaxique (`CodeSnippetBlock`), et bouton bascule plat `ThemeToggleButton` dans l'en-tête.
- [x] **Skill réutilisable en fichier unique (`/pdf-en-cours.md`)** : Extraction de toute la méthodologie de A à Z pour convertir n'importe quel PDF en 1 seul fichier HTML autonome, interactif, agrandi en modules/sous-modules, enrichi de schémas descriptifs (SVG inline + Mermaid adaptatif), d'ateliers pratiques, d'un lexique et d'un projet final.
- [x] **Refonte Éditoriale (Marges, Typographie Serif & Filets)** : Passage au système éditorial inspiré de la maquette de référence — titres `Cormorant Garamond` (poids 500, balance typographique), corps `DM Sans` en colonne `65ch`, marges latérales élargies (`px-7 sm:px-12 lg:px-16`), filet horizontal fort `1.5px` sous chaque bloc titre/sous-titre, métrique nue `X/9` en bleu cobalt, suppression des barres verticales latérales, styles `@media print` A4 et synchronisation complète du skill `/pdf-en-cours.md`.

## 5. Évolutions Futures (Versions X)
- **v1.2** : Export téléchargeable en un clic d'une archive `.zip` contenant les fichiers `context.md`, `plan.md` et `agents.md` personnalisés par l'apprenant.
- **v2.0** : Grille d'auto-évaluation interactive du code généré lors de la réalisation du projet final « MediFlow Studio ».
