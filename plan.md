# Plan de Développement — Site Web de Formation Modulaire

## 1. Méthode de Développement
1. **Découplage de la Logique Pure (Architecture Propre)** :
   - Toute la logique de recommandation d'architecture, d'analyse d'arborescence, de sélection de base de données/hébergeur, de filtrage du glossaire et d'évaluation des scénarios AI Studio est isolée dans `src/utils/mentorEngine.ts` (sans dépendance React ni DOM).
   - Les contenus pédagogiques structurés (Modules, Schémas, Arborescences, Scénarios, Glossaire) sont centralisés dans `src/data/curriculumData.ts`.
2. **Validation par Tests Unitaires (`node:test`)** :
   - Vérification systématique des fonctions pures via `src/utils/mentorEngine.test.ts` exécuté avec `npx --yes tsx --test src/utils/mentorEngine.test.ts`.
3. **Design System Éditorial & Schémas Interactifs SVG** :
   - Application stricte des 4 palettes de couleurs (Primaire fond `#F6F5F0`, Secondaire texte `#16181D`, Tertiaire cartes plates à bordure fine 1px sans ombre `#FFFFFF`/`#E8E4D9`, Quaternaire états `#1E56A0`/`#1B6B4A`/`#B85D19`).
   - Absence totale de cartes KPI, de pilules de texte (`rounded-full`) et de hero surchargé.
   - Navigation animée avec effet reveal fluide (`motion/react`).
4. **Vérification Visuelle en Navigateur Réel (Playwright)** :
   - Compilation, lancement du serveur sur le port 3000, inspection DOM et captures d'écran desktop/mobile pour garantir zéro débordement et une lisibilité optimale.

## 2. Tâches Accomplir
- [x] **Étape 1 : Documentation & Configuration**
  - Création de `/context.md`, `/plan.md`, et `/agents.md`.
  - Mise à jour de `/metadata.json` et `/index.html` (typographies éditoriales & techniques, métadonnées SEO en français).
  - Configuration des variables CSS des 4 palettes dans `/src/index.css`.
- [x] **Étape 2 : Moteur Logique & Données Pédagogiques**
  - Création de `/src/data/curriculumData.ts` couvrant les 6 modules complets, l'explorateur d'arborescence, les matrices de décision (Architecture, Données, Hébergement), les scénarios Google AI Studio et le glossaire technique.
  - Création de `/src/utils/mentorEngine.ts` et `/src/utils/mentorEngine.test.ts`.
- [x] **Étape 3 : Composants Interactifs & Schémas**
  - `InteractiveArchitectureDiagram.tsx` : Schéma SVG interactif permettant de manipuler les couches, de simuler le flux d'une requête (Client -> API -> Règle Métier -> Base de données) et de comparer MVC, Layered, Client-Serveur, Repository, Pipe & Filter.
  - `FileTreeExplorer.tsx` : Explorateur d'arborescence de projet réel (Full-Stack AI Studio, MVC, Modulaire) où chaque fichier/dossier révèle son rôle, ses règles d'architecture et le prompt idéal pour guider l'IA.
  - `DecisionSimulator.tsx` : Simulateur interactif de contraintes (type de projet, sensibilité des données, trafic, mode hors-ligne) qui recommande l'architecture, le type de base de données et l'hébergeur adaptés avec justification du mentor.
  - `AiStudioScenarioLab.tsx` : Laboratoire de scénarios réels dans la peau d'un ingénieur sur Google AI Studio (études de cas Sommerville modernisées : Mentcare, iLearn, SaaS).
  - `GlossaryDecoder.tsx` : Décodeur interactif des grands termes techniques (CRUD, règle métier, incrément, agile, dette technique, etc.) et référence au PDF original d'Ian Sommerville.
- [x] **Étape 4 : Assemblage, Tests & Vérification Navigateur**
  - Intégration dans `/src/App.tsx` avec navigation reveal fluide.
  - Exécution des tests unitaires, build, lint et vérification Playwright.
