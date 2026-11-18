# Instructions Techniques pour les Agents (`agents.md`)

Ce fichier définit les règles techniques, architecturales et visuelles impératives pour tout agent travaillant sur ce projet.

## 1. Architecture du Code
- **`/src/data/curriculumData.ts`** : Contient l'ensemble des données structurées de la formation (les 6 modules pédagogiques, les modèles d'architecture, les noeuds d'arborescence, les profils de bases de données et d'hébergeurs, les scénarios Google AI Studio et le glossaire).
- **`/src/utils/mentorEngine.ts`** : Contient uniquement des **fonctions TypeScript pures** (sans import React ni `window`/`document`) pour le moteur de recommandation d'architecture/hébergement/données, la recherche dans l'arborescence, le filtrage du glossaire et le calcul de progression.
- **`/src/utils/mentorEngine.test.ts`** : Suite de tests unitaires exécutable avec `npx --yes tsx --test src/utils/mentorEngine.test.ts`. Toute modification de `mentorEngine.ts` doit être accompagnée d'une mise à jour et d'une exécution réussie de ces tests.
- **`/src/components/`** : Composants visuels et schémas interactifs modulaires.

## 2. Règles Strictes de Design & UI
1. **Système à 4 Palettes de Couleurs (Obligatoire)** :
   - **Palette 1 — Primaire (Backgrounds)** : `#F6F5F0` (fond principal respirant), `#EFECE4` (sections alternées).
   - **Palette 2 — Secondaire (Texte)** : `#16181D` (titres et prose principale), `#4A4F5C` (explications secondaires), `#787E8C` (légendes et métadonnées).
   - **Palette 3 — Tertiaire (Contenu important, contrôles, cartes plates)** : `#FFFFFF` et `#E8E4D9` avec **bordure fine de 1px (`#D5D0C3`)** et **zéro effet de profondeur** (interdiction d'utiliser `shadow-sm`, `shadow-md`, `shadow-lg`, `drop-shadow`).
   - **Palette 4 — Quaternaire (États, chargement, feedback)** : `#1E56A0` (actif/focus/sélection), `#1B6B4A` (validé/recommandé), `#B85D19` (contrainte/attention), `#A62626` (risque/erreur).
2. **Interdictions Visuelles Absolues** :
   - **Pas de KPI cards** (interdiction des grilles de chiffres/statistiques décoratives).
   - **Pas de Hero surchargé de texte** (le Hero doit être concis et mettre en avant le schéma interactif d'architecture).
   - **Pas de navigation statique** (utiliser des animations reveal douces et progressives via `motion/react`).
   - **Pas de pilules pour le texte** (interdiction absolue de `rounded-full` sur les badges, tags ou boutons contenant du texte ; utiliser des coins droits ou `rounded-[2px]` / `rounded-[4px]` et des séparateurs typographiques `·` ou `/`).
   - **Laisser le design respirer** : écrire le cours et les explications du mentor directement sur le fond primaire sans enfermer chaque paragraphe dans une carte superflue.

## 3. Maintenance Documentaire
- Toujours mettre à jour `/context.md` lors d'un ajout fonctionnel ou d'un changement d'état du projet.
- Toujours mettre à jour `/plan.md` pour refléter les tâches accomplies et la méthode suivie.
