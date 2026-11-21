# Instructions Techniques pour les Agents (`agents.md`)

Ce fichier définit les règles techniques, architecturales et visuelles impératives pour tout agent travaillant sur ce projet.

## 1. Architecture du Code (Développement Modulaire en Couches)
- **Couche Données (`/src/data/curriculumData.ts`, `/src/data/architectureReadingData.ts`, `/src/data/moduleVisualsData.ts`, `/src/data/module5VisualsData.ts`)** : Réunit l'intégralité du programme pédagogique (9 modules, sous-modules détaillés, 6 ateliers interactifs du Module 05, schémas Mermaid, extraits de code typés, arborescences, options de données/hébergement, scénarios et Projet Final). Ne jamais supprimer ni raccourcir les textes pédagogiques : toujours les enrichir et séparer le code du texte via des blocs typés.
- **Couche Métier Pure (`/src/utils/mentorEngine.ts`, `/src/utils/visualFormatter.ts` & `.test.ts`)** : Contient uniquement des fonctions TypeScript pures testées unitairement via `npx --yes tsx --test src/utils/mentorEngine.test.ts src/utils/visualFormatter.test.ts src/persistence/progressStorage.test.ts src/persistence/themeStorage.test.ts`.
- **Couche Persistance & PWA (`/src/persistence/progressStorage.ts`, `/src/persistence/themeStorage.ts`, `/src/hooks/usePWAInstall.ts`, `/src/hooks/useOnlineStatus.ts`, `/src/hooks/useTheme.ts`)** : Sauvegarde locale versionnée (`localStorage`) de la progression utilisateur et du thème clair/sombre, et détection d'installation/connectivité hors-ligne. Les schémas visuels des modules doivent résider dans `/public/images/schemas/` afin d'être précachés automatiquement par Workbox (`vite-plugin-pwa`).
- **Couche Présentation (`/src/components/` & `/src/App.tsx`)** : Composants visuels réutilisables (`MermaidDiagramBlock`, `CodeSnippetBlock`, `SubSectionVisualStack`, `PWAInstallButton`, `OfflineIndicator`, `ThemeToggleButton`) et ateliers interactifs sans dossier fourre-tout. Toujours privilégier Mermaid en vertical (`TD`) sur mobile et horizontal (`LR`) avec défilement interne sur grand écran.

## 2. Règles Strictes de Design & UI Minimaliste
1. **Typographie Éditoriale (100 % Locale Hors-Ligne)** :
   - Utiliser **`Cormorant Garamond`** (`@fontsource/cormorant-garamond`, graisses `300`, `400`, `500`, `600`) pour les grands titres (`h1`, `h2`, `h3`, `.font-editorial-serif`) et les métriques nues.
   - Utiliser **`DM Sans`** (`@fontsource/dm-sans`) pour les sous-titres, le corps de texte (`max-w-[65ch]`) et les boutons.
   - Utiliser `IBM Plex Mono` (`@fontsource/ibm-plex-mono`) uniquement pour les chemins de fichiers, commandes et extraits de code/prompts. Ne pas réintroduire de requêtes CDN Google Fonts dans `index.html`.
2. **Hiérarchie « Grand Titre Serif → Sous-titre Sans → Filet Fort → Contenu » & Marges Larges** :
   - Chaque module et chaque sous-module s'ouvre sur un **Grand Titre Serif**, suivi d'un **Sous-titre** explicatif, d'un **filet horizontal fort (`1.5px`)** et du **Reste du contenu** dans une colonne de lecture confortable avec marges latérales généreuses (`px-7 sm:px-12 lg:px-16`).
   - Les textes explicatifs ne doivent jamais être supprimés ni enfermés dans des boîtes inutiles ou des barres verticales latérales : ils sont posés directement sur le canevas primaire avec amorces en gras et séparateurs horizontaux fins (`1px`).
3. **Système à 4 Palettes de Couleurs — Clair & Sombre (Obligatoire)** :
   - Décliné en mode clair (`:root`) et mode sombre (`:root[data-theme="dark"]`) via les mêmes variables CSS, toujours en style plat **sans aucune ombre (`box-shadow: none`)** et avec bordure fine `1px`.
   - **Palette 1 — Primaire (Backgrounds)** : Clair `#FFFFFF` / `#FAF9F6` / `#F3F1EB` · Sombre `#111317` / `#171A20` / `#0D0F13`.
   - **Palette 2 — Secondaire (Texte)** : Clair `#141619` / `#323741` / `#666E7A` · Sombre `#F3F1EA` / `#C8CDD6` / `#8E96A5`.
   - **Palette 3 — Tertiaire (Surfaces plates, schémas, formulaires)** : Clair `#FFFFFF` / `#F8F7F3` (bordure `#E4E0D5`) · Sombre `#1B1F26` / `#15181E` (bordure `#2B313D`).
   - **Palette 4 — Quaternaire (États, chargement, feedback)** : Clair `#1D4ED8` / `#1B6B4A` / `#B85D19` / `#A62626` · Sombre `#6EA8FE` / `#4CC38A` / `#E5964B` / `#F06D6D`.
4. **Interdictions Visuelles & Confinement Strict** :
   - Pas de KPI cards, pas de Hero surchargé, pas de pilules pour le texte (`rounded-full` interdit sur les textes).
   - Aucun texte ne doit dépasser d'une carte (`min-w-0`, `break-words`, `overflow-x-auto` sur les blocs de code/arborescences).
   - L'en-tête desktop reste strictement sur une seule ligne non-débordante (`whitespace-nowrap shrink-0`).

## 3. Maintenance Documentaire
- Toujours mettre à jour `/context.md` et `/plan.md` à chaque évolution du projet.
