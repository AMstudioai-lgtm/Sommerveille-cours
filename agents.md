# Instructions Techniques pour les Agents (`agents.md`)

Ce fichier définit les règles techniques, architecturales et visuelles impératives pour tout agent travaillant sur ce projet.

## 1. Architecture du Code (Développement Modulaire en Couches)
- **Couche Données (`/src/data/curriculumData.ts`, `/src/data/architectureReadingData.ts`, `/src/data/moduleVisualsData.ts`, `/src/data/module5VisualsData.ts`)** : Réunit l'intégralité du programme pédagogique (9 modules, sous-modules détaillés, 6 ateliers interactifs du Module 05, schémas Mermaid, extraits de code typés, arborescences, options de données/hébergement, scénarios et Projet Final). Ne jamais supprimer ni raccourcir les textes pédagogiques : toujours les enrichir et séparer le code du texte via des blocs typés.
- **Couche Métier Pure (`/src/utils/mentorEngine.ts`, `/src/utils/visualFormatter.ts` & `.test.ts`)** : Contient uniquement des fonctions TypeScript pures testées unitairement via `npx --yes tsx --test src/utils/mentorEngine.test.ts src/utils/visualFormatter.test.ts src/persistence/progressStorage.test.ts`.
- **Couche Persistance & PWA (`/src/persistence/progressStorage.ts`, `/src/hooks/usePWAInstall.ts`, `/src/hooks/useOnlineStatus.ts`)** : Sauvegarde locale versionnée (`localStorage`) de la progression utilisateur et détection d'installation/connectivité hors-ligne. Les schémas visuels des modules doivent résider dans `/public/images/schemas/` afin d'être précachés automatiquement par Workbox (`vite-plugin-pwa`).
- **Couche Présentation (`/src/components/` & `/src/App.tsx`)** : Composants visuels réutilisables (`MermaidDiagramBlock`, `CodeSnippetBlock`, `SubSectionVisualStack`, `PWAInstallButton`, `OfflineIndicator`) et ateliers interactifs sans dossier fourre-tout. Toujours privilégier Mermaid en vertical (`TD`) sur mobile et horizontal (`LR`) avec défilement interne sur grand écran.

## 2. Règles Strictes de Design & UI Minimaliste
1. **Typographie Unique (100 % Locale Hors-Ligne)** :
   - Utiliser **`DM Sans`** (`@fontsource/dm-sans`) pour l'intégralité du site (grands titres, sous-titres, corps de texte, boutons).
   - Utiliser `IBM Plex Mono` (`@fontsource/ibm-plex-mono`) uniquement pour les chemins de fichiers, commandes et extraits de code/prompts. Ne pas réintroduire de requêtes CDN Google Fonts dans `index.html`.
2. **Hiérarchie « Grand Titre, Sous-titre et Reste du Contenu » & Espaces Conséquents** :
   - Chaque module et chaque sous-module s'ouvre sur un **Grand Titre**, suivi d'un **Sous-titre** explicatif et du **Reste du contenu** avec une grande respiration verticale (`py-24` à `py-32`, `space-y-20`).
   - Les textes explicatifs ne doivent jamais être supprimés ni enfermés dans des boîtes inutiles : ils sont écrits directement sur le canevas primaire.
3. **Système à 4 Palettes de Couleurs (Obligatoire)** :
   - **Palette 1 — Primaire (Backgrounds)** : `#FAF9F5`, `#F3F1EA`, `#EAE6DC`.
   - **Palette 2 — Secondaire (Texte)** : `#141619`, `#3B4049`, `#6E7582`.
   - **Palette 3 — Tertiaire (Éléments importants, schémas, formulaires, cartes plates)** : `#FFFFFF` et `#F7F5EF` avec **bordure fine 1px (`#DCD7CA`)** et **zéro effet de profondeur** (aucune ombre `box-shadow`).
   - **Palette 4 — Quaternaire (États, chargement, feedback)** : `#1E56A0` (actif), `#1B6B4A` (validé), `#B85D19` (contrainte), `#A62626` (alerte).
4. **Interdictions Visuelles & Confinement Strict** :
   - Pas de KPI cards, pas de Hero surchargé, pas de pilules pour le texte (`rounded-full` interdit sur les textes).
   - Aucun texte ne doit dépasser d'une carte (`min-w-0`, `break-words`, `overflow-x-auto` sur les blocs de code/arborescences).
   - L'en-tête desktop reste strictement sur une seule ligne non-débordante (`whitespace-nowrap shrink-0`).

## 3. Maintenance Documentaire
- Toujours mettre à jour `/context.md` et `/plan.md` à chaque évolution du projet.
