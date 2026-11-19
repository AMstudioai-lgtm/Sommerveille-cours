# Plan de Développement — Site Web de Formation Modulaire

## 1. Méthode de Développement
1. **Architecture Modulaire en Couches** :
   - **Couche Données (`/src/data/curriculumData.ts`, `/src/data/architectureReadingData.ts`)** : Contient les 9 modules, leurs sous-modules détaillés (`deepDiveParagraphs`, principes clés, adaptations aux contraintes), les données structurées des 6 ateliers du Module 05, les schémas visuels associés, les matrices de décision, les scénarios et le Projet Final (« MediFlow Studio »).
   - **Couche Logique Métier (`/src/utils/mentorEngine.ts`)** : Fonctions pures de recommandation d'architecture, d'arbitrage d'extraction de fonction, de conversion Module → Service, d'analyse d'arborescence, de filtrage du lexique et de calcul de progression globale (incluant l'Atelier d'Audit), vérifiées par `/src/utils/mentorEngine.test.ts`.
   - **Couche Présentation (`/src/components/` & `/src/App.tsx`)** : Interface minimaliste en `DM Sans` structurée selon le modèle « Grand Titre -> Sous-titre -> Contenu aéré ».
2. **Validation Continue** :
   - Tests unitaires (`npx --yes tsx --test src/utils/mentorEngine.test.ts`).
   - Vérification TypeScript & Build (`compile_applet` + `lint_applet`).
   - Inspection visuelle réelle sous Chromium (`playwright-cli`).

## 2. Tâches Accomplies
- [x] **Incrément 1 : Fondations & Moteur Logique Pur**
  - Création de `src/utils/mentorEngine.ts` et validation par tests unitaires `src/utils/mentorEngine.test.ts`.
- [x] **Incrément 2 : Génération des Schémas Visuels & Enrichissement Méthodique**
  - Génération des schémas visuels dédiés à chaque module dans les 3 styles de référence (blocs pastel plats, couches avec rôles, croquis Excalidraw).
  - Découpage méthodique en 8 Modules contenant chacun des Sous-modules détaillés et des textes enrichis.
- [x] **Incrément 3 : Refonte Visuelle Minimaliste en DM Sans**
  - Application de `DM Sans` sur tout le site (`index.html`, `src/index.css`).
  - Adoption de la hiérarchie « Grand Titre -> Sous-titre -> Reste du contenu » avec des espaces blancs conséquents.
- [x] **Incrément 4 : Projet Final de Fin de Formation (« MediFlow Studio »)**
  - Création de `src/components/CapstoneProjectLab.tsx` permettant à l'utilisateur de suivre 4 missions séquentielles, de copier ses prompts d'architecte et de générer sa trame `context.md / plan.md / agents.md`.
- [x] **Incrément 5 : Compatibilité Déploiement Vercel (`npm install`)**
  - Mise à jour de `esbuild` (`^0.25.0` -> `^0.28.0`) dans `package.json` pour alignement avec la `peerOptional` de `vite@^8.3.0`.
- [x] **Incrément 6 : Intégration Native du Module 05 (Lire une Architecture : De la Fonction au Service & 5 Patrons Comparés)**
  - Création de `src/data/architectureReadingData.ts` et `src/components/ArchitectureReadingLab.tsx` (6 ateliers interactifs harmonisés en `DM Sans` et 4 palettes).
  - Extraction des règles d'arbitrage (`evaluateFunctionExtraction`, `evaluateModuleToServiceConversion`) dans `src/utils/mentorEngine.ts` + tests unitaires associés.
  - Insertion en Module 05 entre les modules 04 et 06 (renumérotation fluide 01→09 sans perte), connexion de l'Atelier d'Audit à la jauge globale, et renforcement anti-débordement de l'en-tête desktop et des cartes.
- [x] **Incrément 7 : Enrichissement Visuel Intégral (Mermaid Auto-Responsive, Code Typé 4 Palettes & Arborescences) + Scroll Mobile Header**
  - Activation du défilement interne vertical du tiroir Sommaire sur mobile (`max-h-[calc(100dvh-4.25rem)] overflow-y-auto`).
  - Création de la logique pure `src/utils/visualFormatter.ts` (+ `visualFormatter.test.ts`) : résolution d'orientation Mermaid (`TD` mobile / `LR` desktop) et tokeniseur syntaxique sobre sur 4 palettes.
  - Création des composants `MermaidDiagramBlock.tsx` (auto-responsive, défilement interne horizontal, bascule V/H, code source dépliable), `CodeSnippetBlock.tsx` (copie + coloration 4 palettes) et `SubSectionVisualStack.tsx`.
  - Enrichissement de tous les sous-modules (`src/data/moduleVisualsData.ts`) et des 6 ateliers du Module 05 (`src/data/module5VisualsData.ts`) en combinant systématiquement Texte épuré + Schéma Mermaid + Code typé + Arborescence.
- [x] **Incrément 8 : PWA 100 % Hors-Ligne (Cas 2) & Persistance Locale**
  - Embarquement local des polices `@fontsource/dm-sans` et `@fontsource/ibm-plex-mono` (suppression de toute dépendance Google Fonts).
  - Génération des icônes PWA conformes (`public/icon.svg`, `pwa-192x192.png`, `pwa-512x512.png`, `pwa-maskable-512x512.png`, `apple-touch-icon.png`) et configuration `vite-plugin-pwa` (Workbox précaching 8 Mo couvrant JS/Mermaid, polices, 7 schémas `public/images/schemas/`, 3 schémas de référence et PDF Sommerville 4 Mo).
  - Création de la couche persistance `src/persistence/progressStorage.ts` (+ tests unitaires `progressStorage.test.ts`), des hooks `src/hooks/usePWAInstall.ts` et `src/hooks/useOnlineStatus.ts`, et des composants `PWAInstallButton.tsx` (Chromium + guide iOS Safari) et `OfflineIndicator.tsx`.
  - Intégration du contrôle de réinitialisation en 2 temps dans le tiroir Sommaire.
- [x] **Incrément 9 : Mode Sombre Basculable (Variante 4 Palettes sans ombre)**
  - Définition de `:root[data-theme="dark"]` sur les variables CSS existantes dans `src/index.css` (`#111317` / `#171A20` / `#1B1F26`, textes `#F3F1EA`, bordure fine 1px `#2B313D`, états quaternaires calibrés dark, zéro ombre).
  - Création de `src/persistence/themeStorage.ts` (+ `themeStorage.test.ts`), `src/hooks/useTheme.ts` (sync `data-theme` + `<meta name="theme-color">`) et `src/components/ThemeToggleButton.tsx` intégré dans l'en-tête.
  - Adaptation dynamique de `MermaidDiagramBlock.tsx`, `InteractiveArchitectureDiagram.tsx` et `CodeSnippetBlock.tsx`, plus script anti-flash dans `index.html`.
