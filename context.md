# Contexte du Projet — L'Architecte Logiciel (Formation Modulaire Interactive)

## 1. Vision & Objectif du Projet
Ce site web est une plateforme de formation modulaire et interactive intitulée **« De la Conception à la Maintenance d'un Logiciel »**, conçue selon la posture d'un **Ingénieur Logiciel Mentor Senior**. 
Elle transforme l'ouvrage de référence *Software Engineering (10th Edition)* d'Ian Sommerville en un parcours d'apprentissage pragmatique destiné à un créateur qui **ne sait pas écrire de code**, mais qui souhaite **penser, décider et agir comme un Architecte Logiciel accompli** capable de piloter une IA (notamment Google AI Studio) avec rigueur.

## 2. Objectifs Pédagogiques Couverts
1. **Penser et agir comme un ingénieur logiciel sans coder** : comprendre le cycle de vie complet (conception, exigences, règles métier, incréments, tests, maintenance).
2. **Décider quelle architecture convient à quelle situation** : MVC, Architecture en Couches (Layered), Client-Serveur, Repository (Dépôt partagé), Pipe & Filter, Microservices / SOA.
3. **S'adapter aux contraintes nouvelles** : montée en charge (scalabilité), mode hors-ligne, réglementation/sécurité (RGPD, données médicales), temps réel, budget.
4. **Lire une arborescence pour repérer une architecture** : explorateur interactif de fichiers et dossiers (`package.json`, `server.ts`, `src/components/`, `src/services/`, `src/types.ts`, `.env.example`, `db/schema.ts`, etc.) expliquant le rôle de chaque élément et comment guider l'IA dessus.
5. **Choisir le bon type de données et de base de données** : SQL Relationnel (PostgreSQL), NoSQL Document (Firestore), Clé-Valeur (Redis/Cache), Stockage Objet (Blob/S3), Stockage Local (LocalStorage/IndexedDB).
6. **Choisir le bon hébergeur selon des critères précis** : Conteneur Serverless (Cloud Run), Hébergement Statique/Edge (Vercel/Netlify), BaaS intégré (Firebase/Supabase), Serveur dédié/VPS.
7. **Maîtriser les grands termes techniques et expressions de l'IA** : règle métier, CRUD, incrément, agile, couplage faible / cohésion forte, idempotence, middleware, payload, dette technique, refactoring, etc.
8. **Pratiquer sur des scénarios réels Google AI Studio** : mises en situation interactives où l'apprenant prend les décisions d'architecture, de découpage de fichiers et de prompting face à des cas concrets (inspirés de Sommerville : *Mentcare*, *iLearn*, *Station Météo*, SaaS moderne).

## 3. Système de Design & Contraintes Visuelles Respectées
- **4 Palettes de couleurs distinctes** :
  - **Primaire (Fond)** : `#F6F5F0` (Papier éditorial chaud et respirant) et `#EFECE4` (Sections contrastées douces).
  - **Secondaire (Texte)** : `#16181D` (Encre carbone principale), `#4A4F5C` (Texte éditorial secondaire), `#787E8C` (Notes techniques).
  - **Tertiaire (Éléments de contenu importants, contrôles, champs, cartes plates)** : `#FFFFFF` et `#E8E4D9` avec **bordure fine 1px** (`#D5D0C3`) et **aucun effet de profondeur/ombre** (zéro `box-shadow`).
  - **Quaternaire (États, chargement, interactions, statuts)** : `#1E56A0` (Bleu Cobalt Ingénierie - état actif), `#1B6B4A` (Vert Validation/Succès), `#B85D19` (Ambre Avertissement/Contrainte), `#A62626` (Rouge Erreur/Dette technique).
- **Interdictions strictes respectées** :
  - Aucune carte KPI (pas de compteurs décoratifs en haut de page).
  - Hero épuré avec peu de texte et un grand schéma architectural interactif directement manipulable.
  - Navigation fluide avec animation reveal (barre latérale/tiroir animé + indicateur de progression).
  - Zéro pilule (`rounded-full`) pour le texte ou les étiquettes (utilisation d'angles droits ou micro-arrondis `2px-4px` et séparateurs typographiques `·` / `/`).
  - Respiration éditoriale : le texte explicatif du mentor est écrit directement sur le canevas sans encadrés superflus.

## 4. État d'Avancement (Ce qui est fait)
- [x] Analyse complète du livre *Software Engineering (10th Ed.)* d'Ian Sommerville (25 chapitres + études de cas Mentcare, iLearn, Pompe à insuline, Station météo).
- [x] Définition de l'architecture modulaire du site web et du moteur logique (`src/utils/mentorEngine.ts`).
- [x] Rédaction des 6 grands modules de formation + Explorateur d'arborescence interactif + Simulateur de décision (Architecture, Données, Hébergement) + Scénarios Google AI Studio + Lexique interactif + Lecteur de référence PDF intégré.
- [x] Tests unitaires de la logique métier (`src/utils/mentorEngine.test.ts`).

## 5. Ce qu'il reste à faire / Évolutions futures (Versions X)
- **v1.1** : Sauvegarde de la progression et des notes personnelles de l'apprenti architecte dans le stockage local ou via Firebase.
- **v1.2** : Générateur interactif de fichiers `context.md` et `plan.md` exportables pour les futurs projets AI Studio de l'utilisateur.
- **v2.0** : Mode « Audit d'Arborescence » où l'utilisateur colle la liste des fichiers de son propre projet pour recevoir un diagnostic architectural automatique.
