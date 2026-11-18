export interface LessonSubSection {
  id: string;
  title: string;
  sommervilleRef: string;
  mentorVoice: string;
  corePrinciples: {
    heading: string;
    explanation: string;
    concreteExample: string;
    aiArchitectRule: string;
  }[];
  constraintAdaptation?: {
    triggerConstraint: string;
    badReaction: string;
    architectDecision: string;
  }[];
}

export interface TrainingModule {
  id: string;
  number: string;
  shortTitle: string;
  fullTitle: string;
  subtitle: string;
  sommervilleChapters: string;
  bgTone: 'primary' | 'primary-alt' | 'primary-deep';
  interactiveToolId: 'lifecycle-flow' | 'architecture-schema' | 'file-tree' | 'data-hosting-sim' | 'dependability-swiss' | 'ai-studio-scenarios';
  mentorIntro: string;
  keyTakeaway: string;
  sections: LessonSubSection[];
}

export interface ArchitecturePattern {
  id: 'mvc' | 'layered' | 'repository' | 'client-server' | 'pipe-filter' | 'microservices';
  name: string;
  frenchSubtitle: string;
  sommervilleRef: string;
  summary: string;
  whenToUse: string[];
  whenToAvoid: string[];
  treeSignature: string;
  aiPromptDirective: string;
  nodes: {
    id: string;
    label: string;
    role: string;
    x: number;
    y: number;
    width: number;
    height: number;
    layerType: 'presentation' | 'logic' | 'data' | 'external';
    details: string;
    filesInProject: string[];
  }[];
  connections: {
    from: string;
    to: string;
    label: string;
    flowStep: number;
  }[];
  requestSimulationSteps: {
    step: number;
    title: string;
    activeNodeId: string;
    description: string;
    technicalPayload: string;
  }[];
}

export interface FileTreeNode {
  id: string;
  name: string;
  path: string;
  type: 'folder' | 'file';
  layer: 'configuration' | 'presentation' | 'metier' | 'donnees' | 'serveur' | 'documentation';
  importance: 'critique' | 'structurant' | 'support';
  summary: string;
  whatIsInside: string;
  architectureClue: string;
  dangerIfBroken: string;
  howToGuideAi: string;
  children?: FileTreeNode[];
}

export interface DataModelOption {
  id: 'sql-relational' | 'nosql-document' | 'key-value' | 'blob-storage' | 'local-browser';
  name: string;
  examples: string;
  structureType: string;
  idealUseCases: string[];
  badUseCases: string[];
  sommervilleLink: string;
  aiArchitectAdvice: string;
  visualSchema: {
    entityName: string;
    fields: string[];
    relationNote: string;
  };
}

export interface HostingOption {
  id: 'cloud-run-containers' | 'static-edge-cdn' | 'baas-serverless' | 'vps-dedicated';
  name: string;
  examples: string;
  architectureFit: string;
  howItWorks: string;
  pros: string[];
  cons: string[];
  whenToChoose: string;
  costModel: string;
}

export interface AiStudioScenario {
  id: string;
  title: string;
  inspiredBy: string;
  context: string;
  initialConstraint: string;
  suddenNewConstraint: string;
  steps: {
    stepNumber: number;
    situation: string;
    question: string;
    options: {
      id: string;
      label: string;
      isOptimal: boolean;
      mentorFeedback: string;
      resultingFileImpact: string;
    }[];
  }[];
  idealPromptTemplate: string;
  idealFolderStructure: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'architecture' | 'donnees' | 'processus' | 'code-ia' | 'securite-qualite';
  simpleDefinition: string;
  metaphor: string;
  whenAiSaysIt: string;
  whatYouMustDecide: string;
  relatedTerms: string[];
}

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'mod-1-fondations',
    number: '01',
    shortTitle: 'Penser en Ingénieur',
    fullTitle: 'Penser et Agir comme un Ingénieur Logiciel (Sans Coder)',
    subtitle: 'Du besoin flou au système structuré : processus, règles métier, incréments et exigences selon Ian Sommerville.',
    sommervilleChapters: 'Chapitres 1, 2, 3 & 4 — Introduction, Processus Logiciels, Agile & Ingénierie des Exigences',
    bgTone: 'primary',
    interactiveToolId: 'lifecycle-flow',
    mentorIntro:
      "Bienvenue dans le métier. Beaucoup pensent qu'un ingénieur logiciel est quelqu'un qui tape des lignes de code très vite. C'est faux. Le code n'est que la brique finale. L'ingénieur logiciel est celui qui transforme un problème humain désordonné en un système fiable, découpé et maintenable. Avec l'IA générative, tu n'as plus besoin de maçonner chaque brique toi-même : l'IA est ton équipe d'ouvriers ultra-rapides. Mais si l'architecte (toi) ne fournit pas le plan, les règles métier et les limites, l'IA construira une tour instable qui s'effondrera au premier changement.",
    keyTakeaway:
      "Ne demande jamais à une IA de « créer toute l'application d'un coup ». Découpe toujours ton système en 4 activités fondamentales (Spécification, Conception, Validation, Évolution) et livre par petits incréments vérifiables.",
    sections: [
      {
        id: 'sec-1-1',
        title: 'Les 4 Activités Fondamentales & Pourquoi le Code Monolithique Échoue',
        sommervilleRef: 'Sommerville Chap. 1 & 2 — Software Processes',
        mentorVoice:
          "Ian Sommerville rappelle que peu importe la technologie, tout logiciel sérieux traverse quatre activités : Spécifier (que doit faire le système ?), Concevoir et Implémenter (comment est-il organisé ?), Valider (fait-il vraiment ce qu'on attend ?), et Évoluer (comment le modifier quand le monde change ?).",
        corePrinciples: [
          {
            heading: 'Exigences Fonctionnelles vs Non-Fonctionnelles',
            explanation:
              "Une exigence fonctionnelle décrit CE QUE fait le logiciel (ex: « L'utilisateur peut télécharger sa facture en PDF »). Une exigence non-fonctionnelle décrit COMMENT le système se comporte sous contrainte (ex: « Le PDF doit se générer en moins de 2 secondes même avec 500 utilisateurs simultanés, et les données médicales doivent être chiffrées »).",
            concreteExample:
              "Dans l'étude de cas Mentcare (suivi médical psychiatrique de Sommerville), afficher le dossier d'un patient est fonctionnel. Garantir que le dossier reste accessible en clinique même si Internet coupe est une exigence non-fonctionnelle critique qui change toute l'architecture.",
            aiArchitectRule:
              "L'IA devine facilement les exigences fonctionnelles, mais elle ignore presque toujours les exigences non-fonctionnelles si tu ne les imposes pas explicitement dans ton prompt ou ton fichier context.md."
          },
          {
            heading: 'La Règle Métier (Business Rule) : Le Cœur Sacré du Logiciel',
            explanation:
              "Une règle métier est une loi propre à ton activité qui serait vraie même si tu travaillais avec du papier et un crayon. Elle ne dépend d'aucun bouton ni d'aucune couleur.",
            concreteExample:
              "« Une commande de plus de 100€ bénéficie de la livraison gratuite sauf pour les produits surgelés » ou « Un patient ne peut pas recevoir plus de 25 unités d'insuline par période de 24h (Pompe à insuline Sommerville Chap. 1) ».",
            aiArchitectRule:
              "Exige toujours de l'IA qu'elle isole les règles métier dans des fichiers purs (ex: src/utils/ ou src/services/) séparés des composants visuels (src/components/). Si une règle métier est cachée dans le code d'un bouton, ton application deviendra impossible à maintenir."
          },
          {
            heading: 'Développement Incrémental & Agile vs Cascade (Waterfall)',
            explanation:
              "Le modèle en Cascade (Waterfall) tente de tout prévoir sur 6 mois avant de voir le moindre écran : il échoue dès que le besoin évolue. Le modèle Incrémental (Agile) construit une première version minimale mais complète (Incrément 1 : le squelette et une fonction clé), la teste, puis ajoute l'Incrément 2.",
            concreteExample:
              "Incrément 1 : Créer le moteur de calcul de devis et le tester seul. Incrément 2 : Construire l'interface formulaire. Incrément 3 : Ajouter la sauvegarde en base de données.",
            aiArchitectRule:
              "Avec Google AI Studio, travaille par incréments. Valide l'architecture des données et la logique pure avant de demander des animations ou des tableaux de bord complexes."
          }
        ],
        constraintAdaptation: [
          {
            triggerConstraint: "Tu réalises en cours de route que les utilisateurs utilisent l'app sur le terrain avec une connexion 3G instable.",
            badReaction: "Continuer à ajouter des graphiques lourds et faire des appels serveur à chaque clic.",
            architectDecision: "Passer sur une approche orientée cache local (Local-First / PWA) : stocker la saisie dans le navigateur et synchroniser par lots (batch) dès que le réseau revient."
          },
          {
            triggerConstraint: "L'IA commence à casser la page d'accueil chaque fois que tu lui demandes de modifier le calcul du panier.",
            badReaction: "Répéter « Répare le bug » 10 fois de suite dans le chat.",
            architectDecision: "Arrêter l'ajout de fonctionnalités. Demander un Refactoring d'extraction : séparer le calcul du panier dans un fichier indépendant (`cartEngine.ts`) avec des tests unitaires automatiques."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2-architecture',
    number: '02',
    shortTitle: 'Décider l’Architecture',
    fullTitle: 'Choisir la Bonne Architecture et S’adapter aux Contraintes',
    subtitle: 'Comprendre MVC, Architecture en Couches, Client-Serveur, Repository, Pipe & Filter et SOA grâce aux schémas interactifs.',
    sommervilleChapters: 'Chapitres 5, 6, 17 & 18 — Modélisation Système, Design Architectural & Systèmes Distribués',
    bgTone: 'primary-alt',
    interactiveToolId: 'architecture-schema',
    mentorIntro:
      "L'architecture logicielle, c'est le plan d'urbanisme de ton application. Comme l'explique Sommerville au Chapitre 6, tu dois choisir comment découper ton logiciel en blocs qui communiquent entre eux. Pourquoi ne pas tout mettre dans un seul fichier ? Parce que dans un fichier unique de 3 000 lignes, modifier la couleur d'un titre risque d'effacer la formule de facturation, et l'IA perdra le fil du contexte. Voici comment choisir la structure exacte adaptée à ta situation.",
    keyTakeaway:
      "Une bonne architecture respecte deux lois d'or : la Séparation des Préoccupations (chaque couche a un seul métier) et le Couplage Faible (on peut remplacer l'interface sans casser le moteur de calcul).",
    sections: [
      {
        id: 'sec-2-1',
        title: 'Les Grands Patrons d’Architecture (Architectural Patterns) de Sommerville',
        sommervilleRef: 'Sommerville Chap. 6.3 — Architectural Patterns & Vue 4+1 de Kruchten',
        mentorVoice:
          "Il n'existe pas d'architecture universelle. Un architecte choisit son patron en fonction de la nature du problème : s'agit-il d'une application interactive à plusieurs vues (MVC), d'un système d'entreprise sécurisé étape par étape (Couches), d'un outil où plusieurs modules analysent la même masse de données (Repository), ou d'une chaîne de transformation de fichiers (Pipe & Filter) ?",
        corePrinciples: [
          {
            heading: 'Séparation des Préoccupations (Separation of Concerns)',
            explanation:
              "On sépare toujours : 1) L'Affichage (UI / Présentation), 2) L'Orchestration et les Règles Métier (Logique / Contrôleur / Domaine), et 3) La Persistance et les Accès Externes (Base de données / API).",
            concreteExample:
              "Un restaurant : la salle et le menu (Présentation), le chef qui applique les recettes (Logique Métier), et la chambre froide où sont stockés les ingrédients (Données). Le serveur en salle ne va jamais cuisiner directement dans la chambre froide.",
            aiArchitectRule:
              "Si tu vois une requête SQL ou un appel `fetch('/api/...')` écrit directement au milieu d'un composant de bouton visuel, dis à l'IA : « Déplace cet accès aux données dans la couche service »."
          },
          {
            heading: 'Couplage Faible (Low Coupling) & Cohésion Forte (High Cohesion)',
            explanation:
              "La cohésion forte signifie qu'un fichier ne contient que des éléments qui vont ensemble (ex: `taxCalculator.ts` ne calcule que les taxes). Le couplage faible signifie que `taxCalculator.ts` n'a pas besoin de savoir quelle est la couleur de l'écran pour fonctionner.",
            concreteExample:
              "Un chargeur USB-C a un couplage faible avec ton téléphone : tu peux changer de marque de téléphone sans refaire l'installation électrique de ta maison.",
            aiArchitectRule:
              "Demande à l'IA de communiquer entre les fichiers via des Interfaces TypeScript claires (`types.ts`). C'est le contrat de prise électrique entre les modules."
          }
        ],
        constraintAdaptation: [
          {
            triggerConstraint: "Une clé API secrète (ex: Gemini API, Stripe) doit être utilisée sans qu'aucun visiteur puisse la voler.",
            badReaction: "Appeler l'API depuis le navigateur React avec une variable `VITE_SECRET_KEY` (visible par tout le monde dans l'inspecteur réseau).",
            architectDecision: "Basculer d'une architecture 100% Client vers une architecture Client-Serveur Full-Stack : ajouter un `server.ts` (Express) qui garde la clé secrète côté serveur et expose une route interne `/api/...`."
          },
          {
            triggerConstraint: "Plusieurs outils différents (un tableau de bord, un générateur de rapport, une alerte automatique) doivent lire et modifier les mêmes dossiers patients en temps réel.",
            badReaction: "Faire communiquer chaque outil directement avec tous les autres (effet plat de spaghettis).",
            architectDecision: "Adopter l'architecture Repository (Dépôt Central Partagé) : tous les sous-systèmes lisent et écrivent uniquement dans un store central ou une base unique gouvernée par des règles strictes."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-3-arborescence',
    number: '03',
    shortTitle: 'Lire une Arborescence',
    fullTitle: 'Lire une Arborescence de Fichiers pour Repérer une Architecture',
    subtitle: 'Comprendre chaque dossier et chaque fichier d’un projet moderne pour diriger l’IA chirurgicalement.',
    sommervilleChapters: 'Chapitres 7, 15 & 25 — Design & Implémentation, Réutilisation & Gestion de Configuration',
    bgTone: 'primary',
    interactiveToolId: 'file-tree',
    mentorIntro:
      "Quand tu ouvres un projet sans savoir coder, la colonne de gauche avec tous les fichiers peut intimider. Pourtant, l'arborescence d'un projet est exactement comme le sommaire d'un livre ou le plan d'un bâtiment. En 10 secondes, rien qu'en regardant les noms des dossiers et des fichiers à la racine, un ingénieur senior sait quel langage est utilisé, s'il y a un serveur arrière (backend), où sont rangées les règles métier et si l'architecture est propre ou chaotique.",
    keyTakeaway:
      "Les fichiers à la racine (`package.json`, `vite.config.ts`, `tsconfig.json`, `.env.example`) sont les fondations techniques de l'immeuble. Le dossier `/src` est l'intérieur habitable, qui doit être divisé par responsabilité (`components`, `services`, `utils`, `types`).",
    sections: [
      {
        id: 'sec-3-1',
        title: 'Comment Diagnostiquer un Projet en un Coup d’Œil',
        sommervilleRef: 'Sommerville Chap. 7 & 25 — Host-Target Development & Configuration Management',
        mentorVoice:
          "Regarde toujours d'abord la racine du projet, puis la structure de `/src`. Voici les indices infaillibles qui te permettent de savoir à quelle architecture tu as affaire.",
        corePrinciples: [
          {
            heading: 'Indice 1 : Application Front-End Seule (SPA) vs Full-Stack (Client + Serveur)',
            explanation:
              "Si tu vois uniquement `index.html` et `/src` sans fichier `server.ts` ni dossier `/api` ou `/db`, tout s'exécute dans le navigateur de l'utilisateur. Si tu vois `server.ts` (ou un dossier `/server`, `/db`), tu as une architecture Client-Serveur complète.",
            concreteExample:
              "Sur Google AI Studio, dès qu'une application utilise l'API Gemini côté serveur ou une base SQL, un fichier `server.ts` apparaît à la racine pour sécuriser les échanges.",
            aiArchitectRule:
              "Avant de demander une fonctionnalité de sauvegarde ou d'IA, vérifie si `server.ts` ou un fichier de configuration Firebase existe dans l'arborescence."
          },
          {
            heading: 'Indice 2 : Repérer une Architecture par Couches vs Modulaire (Feature-based)',
            explanation:
              "Si `/src` contient `/components`, `/services`, `/utils`, `/types`, c'est un découpage en Couches Techniques (idéal pour les projets de taille petite à moyenne). Si `/src` contient `/features/facturation`, `/features/patients`, `/features/auth`, c'est une architecture Modulaire par Domaine Métier (idéale pour les très gros logiciels).",
            concreteExample:
              "Un supermarché rangé par type de contenant (toutes les bouteilles ensemble, toutes les boîtes ensemble) vs rangé par univers (univers bébé, univers petit-déjeuner).",
            aiArchitectRule:
              "Si ton dossier `/src/components` dépasse 15 fichiers mélangés, demande à l'IA de les regrouper en sous-dossiers logiques (`components/layout`, `components/schemas`, `components/modals`)."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-4-donnees-hebergement',
    number: '04',
    shortTitle: 'Données & Hébergement',
    fullTitle: 'Choisir le Bon Type de Données et le Bon Hébergeur',
    subtitle: 'SQL vs NoSQL, Stockage Objet, Cache, et critères de choix d’infrastructure (Cloud Run, Edge CDN, BaaS, VPS).',
    sommervilleChapters: 'Chapitres 6, 17 & 18 — Repository Pattern, Client-Serveur Multi-Tiers & Cloud/SaaS',
    bgTone: 'primary-alt',
    interactiveToolId: 'data-hosting-sim',
    mentorIntro:
      "Deux décisions techniques déterminent si ton application coûtera 0€ ou 2 000€ par mois, et si elle sera rapide ou lente : 1) Comment tu ranges tes données, et 2) Sur quel type de machine ton logiciel tourne sur Internet (l'hébergement). Pas besoin d'être administrateur système : il suffit de connaître les 5 grandes familles de données et les 4 grandes familles d'hébergeurs.",
    keyTakeaway:
      "Choisis du SQL Relationnel quand tes données sont très liées et strictes (comptabilité, commandes, stocks). Choisis du Document NoSQL quand tes données sont flexibles et hiérarchiques (profils, notes, chats temps réel). Ne stocke jamais de gros fichiers (PDF, vidéos) directement dans la base de données : utilise un Stockage Objet (Blob/Bucket).",
    sections: [
      {
        id: 'sec-4-1',
        title: 'Les 5 Familles de Données : Quoi Utiliser et Quand ?',
        sommervilleRef: 'Sommerville Chap. 6.3.3 & 17 — Data Management & Distributed Data',
        mentorVoice:
          "Une erreur classique de débutant est de vouloir tout mettre au même endroit : les utilisateurs, les factures, les photos de profil et l'état du bouton ouvert/fermé. Un architecte sépare les données selon leur nature, leur durée de vie et leurs liens.",
        corePrinciples: [
          {
            heading: 'Relationnel (SQL : PostgreSQL, Cloud SQL) vs Document (NoSQL : Firestore)',
            explanation:
              "Une base Relationnelle (SQL) range les données dans des tables strictes reliées par des clés (comme des feuilles Excel verrouillées qui se référencent). Elle garantit qu'aucune transaction bancaire ne soit à moitié enregistrée (propriété ACID). Une base Document (NoSQL) range des fiches JSON souples et permet d'écouter les changements en direct.",
            concreteExample:
              "Un logiciel de gestion hospitalière avec rendez-vous, médecins, chambres et facturation mutuelle -> SQL Relationnel. Une application collaborative de prise de notes en direct -> NoSQL Document (Firestore).",
            aiArchitectRule:
              "Quand tu demandes une base de données à l'IA, précise toujours si tes données ont des relations croisées fortes (SQL) ou si tu privilégies la synchronisation temps réel par utilisateur (Firestore)."
          },
          {
            heading: 'Les Critères de Choix d’un Hébergeur',
            explanation:
              "Pour choisir un hébergeur, pose-toi 4 questions : 1) Mon app a-t-elle un serveur actif (`server.ts`) ou juste des fichiers statiques ? 2) Mon trafic est-il constant 24h/24 ou par pics imprévisibles (besoin du Scale-to-Zero) ? 3) Ai-je des contraintes légales sur la localisation géographique des serveurs (ex: Europe pour le RGPD) ? 4) Quel est mon budget de maintenance ?",
            concreteExample:
              "Cloud Run (utilisé par Google AI Studio) démarre un conteneur en quelques millisecondes quand un visiteur arrive et redescend à zéro (coût nul) quand personne n'utilise l'application.",
            aiArchitectRule:
              "Assure-toi que ton application est « Stateless » (sans état stocké uniquement dans la mémoire vive temporaire du serveur) pour qu'elle puisse redémarrer ou se dupliquer sur le Cloud sans perdre les sessions des utilisateurs."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-5-fiabilite-maintenance',
    number: '05',
    shortTitle: 'Qualité, Sécurité & Maintenance',
    fullTitle: 'De la Vérification à la Maintenance : Faire Durer le Logiciel',
    subtitle: 'Tests automatisés, Modèle du Fromage Suisse (Sécurité), Dette Technique, Refactoring et Git.',
    sommervilleChapters: 'Chapitres 8, 9, 10, 11, 13 & 25 — Tests, Évolution, Sûreté de Fonctionnement & Configuration',
    bgTone: 'primary',
    interactiveToolId: 'dependability-swiss',
    mentorIntro:
      "Dans l'ouvrage d'Ian Sommerville, un constat frappe fort : créer la première version d'un logiciel ne représente souvent que 20% à 30% de son coût total. Les 70% restants concernent son évolution, sa sécurisation et sa maintenance. Quand tu pilotes une IA, le plus grand piège est la « Dette Technique » : chaque fois que l'IA ajoute du code rapidement sans nettoyer ni tester, le système devient plus fragile. Voici comment garder le contrôle.",
    keyTakeaway:
      "La sécurité et la fiabilité ne reposent jamais sur une seule barrière magique, mais sur une Défense en Profondeur (Modèle du Fromage Suisse de Reason) et sur des Tests Automatisés qui vérifient que les anciennes fonctions marchent toujours après chaque modification.",
    sections: [
      {
        id: 'sec-5-1',
        title: 'Vérification vs Validation, Pyramide des Tests & Modèle du Fromage Suisse',
        sommervilleRef: 'Sommerville Chap. 8 (Software Testing), Chap. 9 (Evolution) & Chap. 10/11 (Dependability)',
        mentorVoice:
          "Barry Boehm (cité par Sommerville au Chapitre 8) résume toute la qualité logicielle en deux questions : 1) « La Vérification : construisons-nous le produit correctement ? » (pas de bugs, code propre) et 2) « La Validation : construisons-nous le BON produit ? » (celui qui aide vraiment l'utilisateur).",
        corePrinciples: [
          {
            heading: 'Les 3 Niveaux de Tests (Unitaire, Composant/Intégration, Système/Acceptation)',
            explanation:
              "Un Test Unitaire teste une seule fonction de calcul isolée en quelques millisecondes. Un Test de Composant vérifie que plusieurs pièces s'assemblent bien. Un Test Système (ou E2E avec un vrai navigateur) simule le parcours complet d'un vrai utilisateur.",
            concreteExample:
              "Tester le moteur d'une voiture sur un établi (Unitaire), tester le moteur relié à la boîte de vitesse (Composant), conduire la voiture sur route (Système).",
            aiArchitectRule:
              "Demande toujours à l'IA d'écrire des tests unitaires pour tes règles métier critiques (prix, permissions, scores). Ainsi, même si l'IA modifie 10 fichiers, le test t'alertera immédiatement si une règle métier a été brisée."
          },
          {
            heading: 'Le Modèle du Fromage Suisse (James Reason) & La Défense en Profondeur',
            explanation:
              "Chaque barrière de protection dans un logiciel (validation du formulaire, règle de sécurité serveur, sauvegarde automatique) possède des « trous » (des failles ou cas imprévus), comme des tranches d'emmental. Une catastrophe survient uniquement quand les trous de toutes les tranches s'alignent. L'architecte superpose plusieurs couches indépendantes pour qu'aucune erreur ne traverse tout le système.",
            concreteExample:
              "Tranche 1 : Le formulaire bloque un montant négatif. Tranche 2 : Le serveur revérifie que le montant est positif et que l'utilisateur est connecté. Tranche 3 : La base de données refuse d'écrire un solde inférieur à zéro.",
            aiArchitectRule:
              "Ne fais jamais confiance uniquement à l'interface visuelle pour la sécurité. Un utilisateur malveillant peut contourner un bouton grisé : exige que les règles de sécurité soient aussi vérifiées côté serveur ou dans `firestore.rules`."
          },
          {
            heading: 'Dette Technique & Refactoring Préventif',
            explanation:
              "Le Refactoring (Chap. 9.4) consiste à réorganiser et nettoyer la structure interne du code SANS changer ce que voit l'utilisateur à l'écran. C'est comme ranger sa cuisine entre deux plats pour pouvoir continuer à cuisiner proprement.",
            concreteExample:
              "Découper un fichier `App.tsx` devenu géant (1 200 lignes) en 5 composants clairs de 200 lignes chacun.",
            aiArchitectRule:
              "Tous les 3 ou 4 ajouts de fonctionnalités, fais une pause « Refactoring » avec l'IA : demande-lui de supprimer le code mort, de découper les gros fichiers et de mettre à jour `context.md`."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-6-scenarios-ia',
    number: '06',
    shortTitle: 'Scénarios IA Studio',
    fullTitle: 'Dans la Peau d’un Architecte sur Google AI Studio : Cas Réels',
    subtitle: 'Entraîne-toi sur des mises en situation concrètes et maîtrise l’art de guider l’IA pour répartir le code proprement.',
    sommervilleChapters: 'Synthèse Appliquée — Études de cas Mentcare, iLearn, Station Météo & Ingénierie Assistée par IA',
    bgTone: 'primary-alt',
    interactiveToolId: 'ai-studio-scenarios',
    mentorIntro:
      "Passons de la théorie à la pratique directe. Tu es maintenant l'Architecte Logiciel Senior d'un projet construit avec Google AI Studio. Tu ne vas pas écrire une seule ligne de JavaScript, mais c'est toi qui prends toutes les décisions d'architecture, de découpage de fichiers, de choix de base de données et de formulation du prompt. Voyons comment tu réagis face aux défis réels.",
    keyTakeaway:
      "Un excellent prompt d'architecte contient toujours 4 éléments : 1) Le Contexte Métier, 2) La Répartition Architecturale attendue (quels dossiers/fichiers créer ou modifier), 3) Les Contraintes Non-Fonctionnelles et d'Interface, et 4) Ce qu'il ne faut surtout pas toucher.",
    sections: [
      {
        id: 'sec-6-1',
        title: 'La Méthode en 4 Points pour Piloter l’IA sans Coder',
        sommervilleRef: 'Synthèse Ingénierie Logicielle Moderne & Pilotage par Contrats',
        mentorVoice:
          "Quand un non-programmeur parle à une IA, il décrit souvent uniquement le résultat visuel (« Fais-moi un site de réservation avec un bouton bleu »). L'IA prend alors des raccourcis techniques invisibles qui bloquent le projet deux jours plus tard. Quand un Architecte parle à l'IA, il guide la structure invisible autant que le visible.",
        corePrinciples: [
          {
            heading: '1. Maintenir la Mémoire du Projet (context.md, plan.md, agents.md)',
            explanation:
              "Les modèles d'IA ont une fenêtre de mémoire limitée. En maintenant à la racine du projet un fichier `context.md` (vision, état actuel, ce qui reste à faire), un `plan.md` (étapes de construction) et un `agents.md` (règles d'architecture et de design), tu donnes à l'IA un cahier des charges permanent.",
            concreteExample:
              "Même si tu reprends ton projet trois semaines plus tard ou après une longue conversation, l'IA lit `context.md` et comprend immédiatement l'architecture sans rien casser.",
            aiArchitectRule:
              "Exige systématiquement que l'IA mette à jour `context.md` et `plan.md` à chaque étape majeure."
          },
          {
            heading: '2. Imposer la Répartition Modulaire avant la Génération',
            explanation:
              "Dis explicitement à l'IA comment répartir les responsabilités : les données de référence dans `/src/data/`, les calculs et règles métier purs dans `/src/utils/`, et les écrans dans `/src/components/`.",
            concreteExample:
              "« Crée d'abord la logique de calcul d'éligibilité dans `src/utils/eligibilityEngine.ts`, puis crée le composant visuel `src/components/EligibilitySimulator.tsx` qui l'utilise. »",
            aiArchitectRule:
              "Cette simple consigne multiplie par dix la qualité et la fiabilité du code produit par l'IA."
          }
        ]
      }
    ]
  }
];

export const ARCHITECTURE_PATTERNS: ArchitecturePattern[] = [
  {
    id: 'layered',
    name: 'Architecture en Couches (Layered)',
    frenchSubtitle: 'Séparation horizontale stricte par niveau de responsabilité',
    sommervilleRef: 'Sommerville Chap. 6.3.2 — Layered Architecture (Fig. 6.6 & 6.7 iLearn)',
    summary:
      "Chaque couche ne communique qu'avec la couche située juste en dessous d'elle. Si tu changes l'apparence visuelle (Couche Présentation), la logique métier et la base de données restent 100% intactes.",
    whenToUse: [
      'Applications web structurées, SaaS, outils métier et tableaux de gestion',
      "Quand on construit par incréments et qu'on veut pouvoir remplacer l'interface ou la base de données plus tard",
      "Quand on travaille avec une IA et qu'on veut éviter qu'elle mélange le design et les calculs"
    ],
    whenToAvoid: [
      'Systèmes nécessitant une latence ultra-faible en temps réel matériel (chaque couche ajoute une micro-étape)',
      'Petits scripts jetables de 50 lignes'
    ],
    treeSignature: '/src/components (UI) -> /src/services ou /src/utils (Métier) -> /src/db ou /src/data (Données)',
    aiPromptDirective:
      "« Organise l'application selon une architecture en couches : place les composants visuels dans src/components/, isole toutes les règles métier et calculs dans src/utils/, et gère les appels de données dans src/services/. »",
    nodes: [
      {
        id: 'layer-ui',
        label: '1. Couche Présentation (UI)',
        role: 'Affiche les écrans et capte les clics/saisies de l’utilisateur',
        x: 70,
        y: 25,
        width: 460,
        height: 62,
        layerType: 'presentation',
        details: 'Ne contient aucun calcul complexe ni accès direct à la base de données. Elle se contente de présenter les données et de transmettre les actions.',
        filesInProject: ['src/App.tsx', 'src/components/BookingForm.tsx', 'src/index.css']
      },
      {
        id: 'layer-business',
        label: '2. Couche Logique Métier & Règles (Domain / Services)',
        role: 'Vérifie les droits, applique les règles métier et orchestre les opérations',
        x: 70,
        y: 115,
        width: 460,
        height: 62,
        layerType: 'logic',
        details: 'C’est le cerveau de ton application : calcul des tarifs, validation d’un dossier, règles d’éligibilité. Totalement indépendant des couleurs ou des boutons.',
        filesInProject: ['src/utils/pricingEngine.ts', 'src/services/orderService.ts', 'src/types.ts']
      },
      {
        id: 'layer-data',
        label: '3. Couche Accès aux Données (Data Access / API)',
        role: 'Traduit les demandes métier en requêtes vers la base ou les services externes',
        x: 70,
        y: 205,
        width: 460,
        height: 62,
        layerType: 'data',
        details: 'Gère la communication technique (SQL, Firestore, REST API) sans se soucier de la mise en page.',
        filesInProject: ['server.ts', 'src/db/schema.ts', 'src/services/apiClient.ts']
      },
      {
        id: 'layer-storage',
        label: '4. Couche Persistance (Base de Données / Stockage)',
        role: 'Stocke durablement les informations sur disque ou dans le Cloud',
        x: 70,
        y: 295,
        width: 460,
        height: 55,
        layerType: 'external',
        details: 'PostgreSQL, Firestore, ou fichiers structurés. Protégée par les couches supérieures.',
        filesInProject: ['firestore.rules', 'src/data/curriculumData.ts']
      }
    ],
    connections: [
      { from: 'layer-ui', to: 'layer-business', label: 'Action utilisateur', flowStep: 1 },
      { from: 'layer-business', to: 'layer-data', label: 'Requête validée', flowStep: 2 },
      { from: 'layer-data', to: 'layer-storage', label: 'Lecture / Écriture', flowStep: 3 }
    ],
    requestSimulationSteps: [
      {
        step: 1,
        title: 'Saisie dans la Couche Présentation',
        activeNodeId: 'layer-ui',
        description: "L'utilisateur clique sur « Valider le devis ». Le composant React capte l'événement mais ne calcule rien lui-même : il appelle la couche métier.",
        technicalPayload: "onClick -> handleValidateQuote({ clientType: 'PRO', amount: 1200 })"
      },
      {
        step: 2,
        title: 'Vérification par la Couche Métier',
        activeNodeId: 'layer-business',
        description: "Le moteur métier vérifie la règle : un client PRO avec un montant > 1000€ reçoit 10% de remise automatique et la TVA à 20%.",
        technicalPayload: "applyBusinessRules() -> { netAmount: 1080, vat: 216, status: 'APPROVED' }"
      },
      {
        step: 3,
        title: 'Transmission par la Couche Accès Données',
        activeNodeId: 'layer-data',
        description: "Le service de données prépare l'enregistrement sécurisé et vérifie les droits d'accès avant d'écrire.",
        technicalPayload: "POST /api/quotes -> INSERT INTO quotes (net_amount, vat) VALUES (1080, 216)"
      },
      {
        step: 4,
        title: 'Sauvegarde en Persistance & Retour Visuel',
        activeNodeId: 'layer-storage',
        description: "La base confirme l'enregistrement (ID #4092). Le résultat remonte proprement jusqu'à l'écran qui affiche la confirmation.",
        technicalPayload: "201 Created -> { id: 'Q-4092', savedAt: '2026-11-18T08:00:00Z' }"
      }
    ]
  },
  {
    id: 'mvc',
    name: 'MVC (Modèle - Vue - Contrôleur)',
    frenchSubtitle: 'Séparer les données (Modèle), l’affichage (Vue) et le chef d’orchestre (Contrôleur)',
    sommervilleRef: 'Sommerville Chap. 6.3.1 — Model-View-Controller (Fig. 6.4 & 6.5)',
    summary:
      "Idéal quand une même donnée doit être affichée de plusieurs façons simultanées (ex: les mêmes chiffres affichés sous forme de tableau ET sous forme de graphique circulaire). Quand le Modèle change, toutes les Vues se mettent à jour automatiquement.",
    whenToUse: [
      'Interfaces riches où les mêmes données sont représentées sous plusieurs angles (texte, graphique, carte)',
      'Applications web interactives classiques'
    ],
    whenToAvoid: [
      'Traitements purement automatiques en arrière-plan sans interface utilisateur'
    ],
    treeSignature: '/models (ou state/store), /views (ou components), /controllers (ou hooks/handlers)',
    aiPromptDirective:
      "« Sépare clairement l'état central des données (Modèle) des composants d'affichage (Vues) afin que la mise à jour d'une donnée synchronise instantanément le tableau et le schéma. »",
    nodes: [
      {
        id: 'mvc-controller',
        label: 'Contrôleur (Orchestrateur / Hooks)',
        role: 'Reçoit les actions de l’utilisateur et décide quelle mise à jour demander au Modèle',
        x: 190,
        y: 30,
        width: 220,
        height: 75,
        layerType: 'logic',
        details: 'Traduit un clic ou un raccourci clavier en une commande logique (« Ajouter un article », « Filtrer par date »).',
        filesInProject: ['src/hooks/useProjectController.ts', 'src/App.tsx']
      },
      {
        id: 'mvc-view',
        label: 'Vue (Composants Visuels)',
        role: 'Affiche l’état actuel du Modèle sous forme graphique ou textuelle',
        x: 35,
        y: 210,
        width: 230,
        height: 95,
        layerType: 'presentation',
        details: 'Une même donnée du Modèle peut alimenter une Vue Tableau ET une Vue Schéma SVG en même temps.',
        filesInProject: ['src/components/ChartView.tsx', 'src/components/TableView.tsx']
      },
      {
        id: 'mvc-model',
        label: 'Modèle (Données & État Métier)',
        role: 'Détient la vérité des données et les règles de cohérence',
        x: 335,
        y: 210,
        width: 230,
        height: 95,
        layerType: 'data',
        details: 'Contient la structure des données et notifie la Vue dès qu’une valeur est modifiée.',
        filesInProject: ['src/types.ts', 'src/data/store.ts']
      }
    ],
    connections: [
      { from: 'mvc-view', to: 'mvc-controller', label: '1. Événement clic/saisie', flowStep: 1 },
      { from: 'mvc-controller', to: 'mvc-model', label: '2. Modifie les données', flowStep: 2 },
      { from: 'mvc-model', to: 'mvc-view', label: '3. Notifie & rafraîchit', flowStep: 3 }
    ],
    requestSimulationSteps: [
      {
        step: 1,
        title: 'Action sur la Vue',
        activeNodeId: 'mvc-view',
        description: "L'utilisateur déplace un curseur de budget sur l'interface graphique.",
        technicalPayload: "onChange(budget = 4500)"
      },
      {
        step: 2,
        title: 'Traitement par le Contrôleur',
        activeNodeId: 'mvc-controller',
        description: "Le Contrôleur intercepte la nouvelle valeur, vérifie qu'elle est autorisée et ordonne au Modèle de se mettre à jour.",
        technicalPayload: "controller.updateBudget(4500)"
      },
      {
        step: 3,
        title: 'Mise à jour du Modèle & Notification des Vues',
        activeNodeId: 'mvc-model',
        description: "Le Modèle recalcule l'état global et toutes les Vues abonnées (le tableau récapitulatif ET la jauge visuelle) se mettent à jour instantanément.",
        technicalPayload: "state.budget = 4500 -> render(TableView, GaugeView)"
      }
    ]
  },
  {
    id: 'client-server',
    name: 'Client-Serveur (Full-Stack)',
    frenchSubtitle: 'Répartition réseau entre le navigateur (Client) et la machine sécurisée (Serveur)',
    sommervilleRef: 'Sommerville Chap. 6.3.4 & Chap. 17 — Client-Server Architecture (Fig. 6.9)',
    summary:
      "Le navigateur de l'utilisateur (Client) gère l'affichage rapide, tandis que le Serveur central protège les clés secrètes (API Gemini, paiements), applique la sécurité et interroge la base de données.",
    whenToUse: [
      'Dès que tu utilises une clé API secrète (IA, paiement, envoi d’emails)',
      'Quand plusieurs utilisateurs partagent et modifient des données communes avec des règles de sécurité'
    ],
    whenToAvoid: [
      'Calculatrices ou simulateurs 100% publics sans données secrètes ni compte utilisateur (un simple site statique suffit)'
    ],
    treeSignature: '/src (Client React) + server.ts (Serveur Express) + .env.example (Variables secrètes)',
    aiPromptDirective:
      "« Crée une route proxy sécurisée dans server.ts (/api/analyze) pour appeler l'API avec la clé secrète du serveur, et appelle cette route depuis le client React. »",
    nodes: [
      {
        id: 'cs-client',
        label: 'Client (Navigateur Web / Mobile)',
        role: 'Exécute l’interface React chez l’utilisateur (Code public visible)',
        x: 35,
        y: 60,
        width: 230,
        height: 85,
        layerType: 'presentation',
        details: 'Attention : tout ce qui est dans le Client peut être inspecté par l’utilisateur. On n’y met jamais de mot de passe ni de clé API privée.',
        filesInProject: ['src/App.tsx', 'src/components/*']
      },
      {
        id: 'cs-server',
        label: 'Serveur Applicatif (Node / Express)',
        role: 'Contrôle la sécurité, détient les clés secrètes (.env) et applique les règles',
        x: 335,
        y: 60,
        width: 230,
        height: 85,
        layerType: 'logic',
        details: 'Tourne dans le Cloud (ex: Cloud Run). Invisible pour le public, il filtre toutes les demandes entrantes.',
        filesInProject: ['server.ts', '.env.example']
      },
      {
        id: 'cs-db',
        label: 'Base de Données & APIs Tierces (Gemini / SQL)',
        role: 'Ressources protégées accessibles uniquement par le Serveur',
        x: 185,
        y: 230,
        width: 250,
        height: 85,
        layerType: 'external',
        details: 'Le serveur interroge la base SQL ou le modèle Gemini en utilisant sa clé sécurisée, puis renvoie uniquement la réponse finale au Client.',
        filesInProject: ['src/db/schema.ts']
      }
    ],
    connections: [
      { from: 'cs-client', to: 'cs-server', label: '1. Requête HTTP (/api/...)', flowStep: 1 },
      { from: 'cs-server', to: 'cs-db', label: '2. Appel authentifié (Clé API / SQL)', flowStep: 2 },
      { from: 'cs-db', to: 'cs-client', label: '3. Réponse JSON filtrée', flowStep: 3 }
    ],
    requestSimulationSteps: [
      {
        step: 1,
        title: 'Demande du Client vers le Serveur',
        activeNodeId: 'cs-client',
        description: "Le navigateur envoie les données du formulaire via une requête HTTP POST vers `/api/process` sans détenir aucune clé secrète.",
        technicalPayload: "fetch('/api/process', { method: 'POST', body: JSON.stringify(data) })"
      },
      {
        step: 2,
        title: 'Validation & Secret côté Serveur',
        activeNodeId: 'cs-server',
        description: "Le fichier `server.ts` vérifie que la requête est légitime, récupère `process.env.GEMINI_API_KEY` en toute sécurité et prépare l'opération.",
        technicalPayload: "server.ts -> validateInput() + read(process.env.GEMINI_API_KEY)"
      },
      {
        step: 3,
        title: 'Exécution Base/API et Réponse Propre',
        activeNodeId: 'cs-db',
        description: "L'opération est exécutée sur la base ou le service externe, et seul le résultat utile est renvoyé au navigateur au format JSON.",
        technicalPayload: "200 OK -> { status: 'success', result: '...' }"
      }
    ]
  },
  {
    id: 'repository',
    name: 'Architecture Repository (Dépôt Central)',
    frenchSubtitle: 'Un référentiel de données central autour duquel gravitent plusieurs outils spécialisés',
    sommervilleRef: 'Sommerville Chap. 6.3.3 — Repository Architecture (Fig. 6.8 Mentcare / IDE)',
    summary:
      "Au lieu que 5 outils s'envoient des copies de données dans tous les sens, un Dépôt Central (Repository) stocke la vérité unique. Chaque sous-système lit et dépose ses résultats dans ce dépôt commun.",
    whenToUse: [
      'Systèmes médicaux (ex: Mentcare), outils d’ingénierie (CAO/IDE), plateformes collaboratives complexes',
      'Quand plusieurs modules indépendants (analyse, export PDF, statistiques, alertes) travaillent sur le même dossier'
    ],
    whenToAvoid: [
      'Si le dépôt central devient un goulot d’étranglement unique sans sauvegarde ni réplication'
    ],
    treeSignature: '/src/store (ou /src/repository) central + /src/modules/analytics, /src/modules/export, /src/modules/editor',
    aiPromptDirective:
      "« Crée un store/dépôt central typé qui détient l'état unique du dossier, et fais en sorte que les modules d'édition, d'analyse et d'export lisent tous depuis ce dépôt unique. »",
    nodes: [
      {
        id: 'repo-center',
        label: 'Dépôt Central Partagé (Repository / Store)',
        role: 'Source unique de vérité (Single Source of Truth)',
        x: 165,
        y: 130,
        width: 270,
        height: 90,
        layerType: 'data',
        details: 'Contient l’intégralité du dossier structuré. Garantit qu’aucun module ne travaille sur une version obsolète.',
        filesInProject: ['src/store/centralRepository.ts', 'src/db/schema.ts']
      },
      {
        id: 'repo-mod1',
        label: 'Module A : Saisie & Édition',
        role: 'Alimente et met à jour le dossier',
        x: 30,
        y: 25,
        width: 210,
        height: 68,
        layerType: 'presentation',
        details: 'Écrit les nouvelles informations validées directement dans le dépôt central.',
        filesInProject: ['src/components/EditorModule.tsx']
      },
      {
        id: 'repo-mod2',
        label: 'Module B : Moteur d’Analyse & Règles',
        role: 'Inspecte le dépôt pour détecter des anomalies',
        x: 360,
        y: 25,
        width: 210,
        height: 68,
        layerType: 'logic',
        details: 'Lit le dépôt central et y inscrit ses diagnostics ou alertes.',
        filesInProject: ['src/utils/riskAnalyzer.ts']
      },
      {
        id: 'repo-mod3',
        label: 'Module C : Générateur de Rapports',
        role: 'Extrait une synthèse formatée à tout instant',
        x: 195,
        y: 265,
        width: 210,
        height: 68,
        layerType: 'external',
        details: 'Lit l’état consolidé du dépôt pour produire un export propre.',
        filesInProject: ['src/utils/reportExporter.ts']
      }
    ],
    connections: [
      { from: 'repo-mod1', to: 'repo-center', label: '1. Dépose les données', flowStep: 1 },
      { from: 'repo-center', to: 'repo-mod2', label: '2. Déclenche l’analyse', flowStep: 2 },
      { from: 'repo-center', to: 'repo-mod3', label: '3. Fournit le rapport consolidé', flowStep: 3 }
    ],
    requestSimulationSteps: [
      {
        step: 1,
        title: 'Dépôt d’une nouvelle donnée',
        activeNodeId: 'repo-mod1',
        description: "Le médecin (ou l'opérateur) enregistre une nouvelle prescription dans le Module de Saisie.",
        technicalPayload: "repository.commit({ prescription: 'Amoxicilline 500mg' })"
      },
      {
        step: 2,
        title: 'Mise à jour de la Source Unique de Vérité',
        activeNodeId: 'repo-center',
        description: "Le Dépôt Central enregistre la modification avec son horodatage et la rend immédiatement visible à tous les autres outils.",
        technicalPayload: "CentralStore Version #14 -> Synchronized"
      },
      {
        step: 3,
        title: 'Vérification par le Moteur d’Analyse',
        activeNodeId: 'repo-mod2',
        description: "Le module d'analyse lit le dépôt central, vérifie les interactions médicamenteuses et inscrit un statut « Compatible » dans le dossier.",
        technicalPayload: "riskAnalyzer.inspect(CentralStore) -> OK"
      }
    ]
  },
  {
    id: 'pipe-filter',
    name: 'Pipe & Filter (Chaîne de Transformation)',
    frenchSubtitle: 'Séquence d’étapes où la sortie d’un filtre devient l’entrée du suivant',
    sommervilleRef: 'Sommerville Chap. 6.3.5 — Pipe and Filter Architecture (Fig. 6.10)',
    summary:
      "Chaque boîte (Filtre) réalise une seule transformation précise sur les données et les passe au tuyau suivant (Pipe). Idéal pour l'import de fichiers CSV/PDF, la facturation par lots ou les pipelines de traitement de texte.",
    whenToUse: [
      'Traitement de fichiers (import CSV, nettoyage de données, extraction PDF, génération de bilans)',
      'Automatisations étape par étape et flux de validation séquentiels'
    ],
    whenToAvoid: [
      'Applications très interactives où l’utilisateur navigue librement dans tous les sens sans ordre fixe'
    ],
    treeSignature: '/src/pipelines/step1Parse.ts -> step2Validate.ts -> step3Transform.ts -> step4Export.ts',
    aiPromptDirective:
      "« Structure le traitement des données en pipeline (Pipe & Filter) : crée une fonction pure par étape (nettoyage, validation, calcul, formatage) afin que chaque étape soit testable séparément. »",
    nodes: [
      {
        id: 'pf-1',
        label: 'Filtre 1 : Lecture & Nettoyage (Parse)',
        role: 'Transforme la donnée brute en format lisible',
        x: 35,
        y: 70,
        width: 230,
        height: 80,
        layerType: 'presentation',
        details: 'Supprime les espaces inutiles, corrige les formats de dates et rejette les lignes vides.',
        filesInProject: ['src/utils/parseRawData.ts']
      },
      {
        id: 'pf-2',
        label: 'Filtre 2 : Validation & Règles Métier',
        role: 'Vérifie la conformité et enrichit les calculs',
        x: 335,
        y: 70,
        width: 230,
        height: 80,
        layerType: 'logic',
        details: 'Applique les barèmes, détecte les doublons et marque les anomalies.',
        filesInProject: ['src/utils/validateRecords.ts']
      },
      {
        id: 'pf-3',
        label: 'Filtre 3 : Formatage & Export Final',
        role: 'Produit le résultat prêt à l’emploi',
        x: 185,
        y: 225,
        width: 230,
        height: 80,
        layerType: 'data',
        details: 'Génère le résumé final, le fichier propre ou l’enregistrement en base.',
        filesInProject: ['src/utils/formatSummary.ts']
      }
    ],
    connections: [
      { from: 'pf-1', to: 'pf-2', label: 'Tuyau 1 : Données nettoyées', flowStep: 1 },
      { from: 'pf-2', to: 'pf-3', label: 'Tuyau 2 : Données validées & calculées', flowStep: 2 }
    ],
    requestSimulationSteps: [
      {
        step: 1,
        title: 'Entrée dans le Filtre 1 (Nettoyage)',
        activeNodeId: 'pf-1',
        description: "Un fichier brut contenant 150 lignes désordonnées entre dans le premier filtre qui normalise les textes et les montants.",
        technicalPayload: "rawInput -> parseAndClean() -> 148 normalized records"
      },
      {
        step: 2,
        title: 'Passage au Filtre 2 (Règles Métier)',
        activeNodeId: 'pf-2',
        description: "Les 148 enregistrements propres traversent le filtre de règles métier qui calcule les marges et isole 2 factures en anomalie.",
        technicalPayload: "validateAndCompute() -> { valid: 146, flagged: 2 }"
      },
      {
        step: 3,
        title: 'Sortie du Filtre 3 (Bilan Structuré)',
        activeNodeId: 'pf-3',
        description: "Le dernier filtre assemble le rapport final prêt à être affiché ou téléchargé.",
        technicalPayload: "formatOutput() -> Rapport Financier Consolidé"
      }
    ]
  }
];

export const PROJECT_FILE_TREE: FileTreeNode[] = [
  {
    id: 'node-root-docs',
    name: 'Documentation & Mémoire Architecte (context.md, plan.md, agents.md)',
    path: '/context.md · /plan.md · /agents.md',
    type: 'file',
    layer: 'documentation',
    importance: 'critique',
    summary: 'Le cerveau directeur du projet pour toi et pour tous les agents IA qui interviennent sur le code.',
    whatIsInside:
      "`context.md` explique ce qu'est le projet, ce qui est fait et ce qui est prévu. `plan.md` détaille la méthode et la liste des tâches. `agents.md` fixe les règles techniques et visuelles strictes.",
    architectureClue:
      "La présence de ces 3 fichiers prouve que le projet est piloté par une méthodologie d'ingénierie structurée (Documentation-Driven Development).",
    dangerIfBroken:
      "Si ces fichiers ne sont pas tenus à jour, un nouvel agent IA risque d'inventer des règles contradictoires ou de détruire ton design system.",
    howToGuideAi:
      "« Lis d'abord context.md et agents.md avant toute modification, puis mets à jour context.md et plan.md une fois ta tâche terminée. »"
  },
  {
    id: 'node-package-json',
    name: 'package.json',
    path: '/package.json',
    type: 'file',
    layer: 'configuration',
    importance: 'critique',
    summary: 'La carte d’identité du projet, la liste des briques installées (dépendances) et les commandes de démarrage.',
    whatIsInside:
      "1) `dependencies` : les bibliothèques utilisées par l'application (React, Lucide icons, Motion, Express, Gemini SDK). 2) `scripts` : les commandes comme `dev` (lancer le serveur de travail), `build` (compiler pour la production) et `lint` (vérifier les erreurs).",
    architectureClue:
      "En lisant `dependencies` dans `package.json`, tu sais immédiatement si le projet utilise Firebase (`firebase`), une base SQL (`drizzle-orm`, `pg`), un serveur (`express`) ou de la 3D (`three`).",
    dangerIfBroken:
      "Une erreur de virgule dans ce fichier empêche totalement le projet de démarrer ou de compiler.",
    howToGuideAi:
      "Ne modifie jamais ce fichier à la main sans raison : laisse l'outil d'installation de paquets de l'IA gérer l'ajout propre des bibliothèques."
  },
  {
    id: 'node-env-example',
    name: '.env.example',
    path: '/.env.example',
    type: 'file',
    layer: 'configuration',
    importance: 'structurant',
    summary: 'Le modèle des variables d’environnement et clés secrètes requises par l’application.',
    whatIsInside:
      "La liste des noms de variables (ex: `GEMINI_API_KEY=`, `APP_URL=`) SANS les vraies valeurs secrètes. Il indique quelles clés doivent être configurées dans le coffre-fort (Secrets) de la plateforme.",
    architectureClue:
      "Révèle toutes les intégrations externes du logiciel (IA, paiement, base de données distante, OAuth).",
    dangerIfBroken:
      "Si tu écris une vraie clé secrète en clair dans le code au lieu de passer par les variables d'environnement, n'importe qui lisant le code peut te la voler.",
    howToGuideAi:
      "« Déclare les nouvelles variables nécessaires dans .env.example sans jamais écrire de clé secrète en dur dans le code. »"
  },
  {
    id: 'node-index-html',
    name: 'index.html',
    path: '/index.html',
    type: 'file',
    layer: 'presentation',
    importance: 'structurant',
    summary: 'La porte d’entrée unique du navigateur web et l’enveloppe SEO du site.',
    whatIsInside:
      "Le titre de l'onglet (`<title>`), la description pour Google et les réseaux sociaux (`<meta property='og:...'>`), le chargement des polices d'écriture, et la boîte `<div id='root'></div>` dans laquelle React va dessiner toute l'application.",
    architectureClue:
      "Un seul fichier `index.html` qui charge `/src/main.tsx` indique une architecture SPA (Single Page Application) moderne pilotée par Vite et React.",
    dangerIfBroken:
      "Si la balise `<div id='root'>` ou le script `/src/main.tsx` est supprimé, l'écran reste totalement blanc.",
    howToGuideAi:
      "« Synchronise le <title> et les balises meta OpenGraph dans index.html avec le nom et la description de metadata.json. »"
  },
  {
    id: 'node-server-ts',
    name: 'server.ts (Quand l’app est Full-Stack)',
    path: '/server.ts',
    type: 'file',
    layer: 'serveur',
    importance: 'critique',
    summary: 'Le serveur arrière (Backend Node.js / Express) qui protège les opérations sensibles et les API.',
    whatIsInside:
      "Les routes d'API internes (ex: `app.post('/api/generate', ...)`), la vérification des permissions, les appels sécurisés vers Gemini ou une base SQL, et le serveur qui distribue le site sur le port 3000.",
    architectureClue:
      "Sa présence transforme ton projet d'un simple site statique en une véritable architecture Client-Serveur Full-Stack.",
    dangerIfBroken:
      "Si `server.ts` plante ou n'écoute pas sur le port 3000, plus aucune page ni aucune API ne répond.",
    howToGuideAi:
      "« Crée une route `/api/...` dans server.ts pour exécuter ce traitement sensible côté serveur plutôt que dans le navigateur. »"
  },
  {
    id: 'node-src-folder',
    name: 'src/ (Le Cœur du Logiciel)',
    path: '/src',
    type: 'folder',
    layer: 'metier',
    importance: 'critique',
    summary: 'Le dossier principal contenant tout le code source organisé par responsabilités.',
    whatIsInside:
      "C'est ici que vit l'architecture de ton application. Un bon architecte refuse que tout soit jeté en vrac dans `/src` : il exige des sous-dossiers clairs (`components`, `utils`, `data`, `services`).",
    architectureClue:
      "La façon dont `/src` est découpé te dit tout sur la propreté du projet et sur sa facilité de maintenance future.",
    dangerIfBroken:
      "Un dossier `/src` non organisé (un seul fichier `App.tsx` de 2 500 lignes) devient vite incompréhensible, même pour l'IA.",
    howToGuideAi:
      "« Garde App.tsx léger (assemblage et navigation) et répartis le code dans src/components/, src/utils/ et src/data/. »",
    children: [
      {
        id: 'node-src-main',
        name: 'main.tsx & index.css',
        path: '/src/main.tsx · /src/index.css',
        type: 'file',
        layer: 'presentation',
        importance: 'structurant',
        summary: 'Le démarreur technique React (`main.tsx`) et le système de couleurs/typographie global (`index.css`).',
        whatIsInside:
          "`main.tsx` branche l'application React dans `index.html`. `index.css` contient les variables de tes 4 palettes de couleurs et les règles visuelles globales.",
        architectureClue:
          "Centraliser les couleurs dans `index.css` via des variables CSS (`--bg-primary`, etc.) prouve l'existence d'un vrai Design System maintenable.",
        dangerIfBroken:
          "Des couleurs écrites au hasard dans 20 fichiers au lieu d'être définies dans `index.css` rendent tout changement graphique pénible.",
        howToGuideAi:
          "« Définis les 4 palettes de couleurs sous forme de variables CSS dans src/index.css pour garantir la cohérence visuelle. »"
      },
      {
        id: 'node-src-app',
        name: 'App.tsx (Le Chef d’Orchestre)',
        path: '/src/App.tsx',
        type: 'file',
        layer: 'presentation',
        importance: 'critique',
        summary: 'Le composant racine qui assemble la navigation, la mise en page générale et les modules.',
        whatIsInside:
          "L'état de navigation principal (quel module est ouvert), l'en-tête, le menu animé et l'appel aux grands composants de chaque section.",
        architectureClue:
          "Dans une bonne architecture, `App.tsx` fait entre 150 et 400 lignes : il orchestre les briques sans contenir lui-même tous les textes ni tous les calculs.",
        dangerIfBroken:
          "Si `App.tsx` contient à la fois les données, les calculs, les sous-composants et les formulaires, chaque modification créera des bugs collatéraux.",
        howToGuideAi:
          "« Utilise App.tsx uniquement comme chef d'orchestre de la mise en page et de la navigation ; importe les vues détaillées depuis src/components/. »"
      },
      {
        id: 'node-src-components',
        name: 'src/components/ (La Couche Présentation)',
        path: '/src/components/',
        type: 'folder',
        layer: 'presentation',
        importance: 'critique',
        summary: 'Les briques visuelles et schémas interactifs réutilisables de l’interface.',
        whatIsInside:
          "Un fichier par grand bloc visuel : ex. `ArchitectureExplorer.tsx`, `FileTreeInspector.tsx`, `DecisionSimulator.tsx`, `ScenarioLab.tsx`.",
        architectureClue:
          "Représente la Couche Présentation (ou la Vue dans MVC). Chaque fichier a un nom explicite qui indique immédiatement ce qu'il affiche à l'écran.",
        dangerIfBroken:
          "Si un composant visuel modifie directement la base de données sans passer par une fonction dédiée, tu crées un couplage fort dangereux.",
        howToGuideAi:
          "« Crée un composant dédié dans src/components/ pour ce nouveau schéma interactif afin de garder le code modulaire. »"
      },
      {
        id: 'node-src-utils',
        name: 'src/utils/ & src/services/ (La Couche Métier Pure)',
        path: '/src/utils/ · /src/services/',
        type: 'folder',
        layer: 'metier',
        importance: 'critique',
        summary: 'Le moteur logique, les règles métier pures et les tests unitaires automatisés.',
        whatIsInside:
          "Des fonctions TypeScript pures (`mentorEngine.ts`) qui prennent des paramètres en entrée et calculent une décision ou un résultat en sortie, accompagnées de leurs fichiers de test (`mentorEngine.test.ts`).",
        architectureClue:
          "C'est la signature d'un vrai Architecte Logiciel : séparer le cerveau (les règles métier) des muscles (l'interface React).",
        dangerIfBroken:
          "Une erreur ici fausse les décisions ou les calculs de l'application, d'où l'importance vitale des fichiers `.test.ts` dans ce dossier.",
        howToGuideAi:
          "« Découple toute la logique de calcul et de recommandation dans src/utils/ avec des fonctions pures, et écris un test unitaire correspondant. »"
      },
      {
        id: 'node-src-data',
        name: 'src/data/ & src/db/ (La Couche Données & Schémas)',
        path: '/src/data/ · /src/db/',
        type: 'folder',
        layer: 'donnees',
        importance: 'structurant',
        summary: 'Les contenus structurés, les modèles de données et les schémas de base de données.',
        whatIsInside:
          "`src/data/` contient les référentiels structurés de l'application. Si une base SQL est présente, `src/db/schema.ts` définit les tables et colonnes exactes.",
        architectureClue:
          "Isoler les données dans `/src/data` permet d'enrichir le contenu ou de le brancher plus tard sur une base de données sans réécrire les composants visuels.",
        dangerIfBroken:
          "Des données mal typées provoquent des erreurs d'affichage (`undefined`).",
        howToGuideAi:
          "« Stocke toutes les données pédagogiques et scénarios dans src/data/ avec un typage TypeScript strict avant de les afficher. »"
      }
    ]
  }
];

export const DATA_MODEL_OPTIONS: DataModelOption[] = [
  {
    id: 'sql-relational',
    name: 'Base Relationnelle SQL (PostgreSQL / Cloud SQL)',
    examples: 'Cloud SQL (PostgreSQL), Supabase, Neon, MySQL',
    structureType: 'Tables structurées en lignes et colonnes avec relations strictes (Clés primaires & étrangères)',
    idealUseCases: [
      'Facturation, comptabilité, e-commerce, gestion de stocks et réservations',
      'Données fortement liées entre elles (Clients <-> Commandes <-> Factures <-> Produits)',
      'Besoin de bilans statistiques complexes, de sommes exactes et de transactions garanties (ACID)'
    ],
    badUseCases: [
      'Stockage de fichiers lourds (vidéos, gros PDF)',
      'Données dont la forme change complètement d’un utilisateur à l’autre sans structure fixe'
    ],
    sommervilleLink: 'Sommerville Chap. 6 & 17 — Shared Repository & Relational Data Integrity',
    aiArchitectAdvice:
      "Choisis SQL dès que l'argent, les stocks ou des relations strictes multi-entités sont en jeu. Sur AI Studio, son schéma est défini proprement dans `src/db/schema.ts` (avec Drizzle ORM).",
    visualSchema: {
      entityName: 'Table: orders (Commandes)',
      fields: ['id (UUID PK)', 'user_id (FK -> users.id)', 'total_cents (INTEGER NOT NULL)', 'status (VARCHAR)'],
      relationNote: 'Reliée strictement à la table `users` et à la table `order_items` : impossible de créer une commande pour un client inexistant.'
    }
  },
  {
    id: 'nosql-document',
    name: 'Base Document NoSQLTemps Réel (Firestore)',
    examples: 'Firebase Firestore, MongoDB',
    structureType: 'Collections contenant des Documents JSON flexibles (fiches hiérarchiques)',
    idealUseCases: [
      'Applications collaboratives en temps réel (messagerie, tableaux partagés, notifications instantanées)',
      'Profils utilisateurs, préférences, carnets de notes, projets créatifs à structure souple',
      'Démarrage rapide avec authentification utilisateur et règles de sécurité intégrées (`firestore.rules`)'
    ],
    badUseCases: [
      'Opérations comptables complexes nécessitant de croiser 8 tables différentes en une seule requête'
    ],
    sommervilleLink: 'Sommerville Chap. 18 — Distributed Data & Document Services',
    aiArchitectAdvice:
      "Idéal quand chaque utilisateur possède ses propres dossiers ou documents et que tu veux que l'écran se mette à jour en direct sans recharger la page.",
    visualSchema: {
      entityName: 'Collection: /projects/{projectId}',
      fields: ['ownerUid: "usr_92"', 'title: "Refonte Architecture"', 'tags: ["mvc", "cloud"]', 'tasks: [{ id: 1, done: true }]'],
      relationNote: 'Chaque document est une fiche complète autonome, protégée par `firestore.rules`.'
    }
  },
  {
    id: 'key-value',
    name: 'Stockage Clé-Valeur & Cache Rapide',
    examples: 'Redis, Memory Cache, Variables de session rapide',
    structureType: 'Un dictionnaire ultra-rapide en mémoire vive : Clé unique -> Valeur immédiate',
    idealUseCases: [
      'Mémoriser temporairement le résultat d’un calcul lourd (Cache) pour ne pas le recalculer 100 fois',
      'Limiter le nombre de requêtes par minute d’un visiteur (Rate Limiting)',
      'Jetons de session temporaires ou compteurs instantanés'
    ],
    badUseCases: [
      'Archiver durablement des dossiers clients ou rechercher par critères multiples'
    ],
    sommervilleLink: 'Sommerville Chap. 17 — Performance & Caching Layers',
    aiArchitectAdvice:
      "Ce n'est pas ta base de données principale : c'est un accélérateur placé devant ta base principale pour soulager le serveur.",
    visualSchema: {
      entityName: 'Cache Mémoire (TTL: 300 secondes)',
      fields: ['KEY: "weather_lyon_2026_11_18"', 'VALUE: "{ temp: 14, wind: 12 }"', 'EXPIRES_IN: "240s"'],
      relationNote: 'Accès en moins de 1 milliseconde, s’efface automatiquement après expiration.'
    }
  },
  {
    id: 'blob-storage',
    name: 'Stockage Objet / Fichiers (Blob Storage)',
    examples: 'Google Cloud Storage, AWS S3, Firebase Storage',
    structureType: 'Coffre-fort de fichiers binaires organisés en compartiments (Buckets) avec une URL de lecture',
    idealUseCases: [
      'PDF, photos haute résolution, vidéos, fichiers audio, sauvegardes ZIP',
      'Documents téléversés par les utilisateurs (pièces justificatives, factures scannées)'
    ],
    badUseCases: [
      'Rechercher ou modifier une seule ligne de texte à l’intérieur d’un fichier mille fois par seconde'
    ],
    sommervilleLink: 'Sommerville Chap. 18 — Cloud Storage Services',
    aiArchitectAdvice:
      "Règle d'or d'architecte : on stocke le fichier lourd (PDF/Image) dans le Stockage Objet, et on enregistre uniquement son lien (URL) et son nom dans la base SQL ou Firestore.",
    visualSchema: {
      entityName: 'Bucket: /user-uploads/invoices/',
      fields: ['File: facture-2026-04.pdf (2.4 MB)', 'ContentType: application/pdf', 'Public/Signed URL -> stockée dans SQL/Firestore'],
      relationNote: 'Évite d’alourdir et de ralentir la base de données principale.'
    }
  },
  {
    id: 'local-browser',
    name: 'Stockage Local Navigateur (LocalStorage / IndexedDB)',
    examples: 'window.localStorage, IndexedDB, Cache API (PWA)',
    structureType: 'Données enregistrées uniquement sur l’appareil (téléphone ou ordinateur) de l’utilisateur',
    idealUseCases: [
      'Préférences personnelles d’affichage, brouillons en cours de saisie avant envoi',
      'Outils ou simulateurs personnels sans besoin de compte utilisateur',
      'Mode hors-ligne temporaire (en attendant le retour de la connexion Internet)'
    ],
    badUseCases: [
      'Données partagées entre plusieurs utilisateurs ou devant être retrouvées si l’utilisateur change d’ordinateur',
      'Informations secrètes ou médicales sensibles sur un ordinateur public'
    ],
    sommervilleLink: 'Sommerville Chap. 17 — Thin vs Thick Client Local State',
    aiArchitectAdvice:
      "Parfait pour un premier prototype ou pour sauvegarder la progression d'un visiteur sans lui imposer de créer un compte, mais souviens-toi que vider le cache du navigateur efface ces données.",
    visualSchema: {
      entityName: 'Browser LocalStorage (Appareil Client)',
      fields: ['"architect_completed_modules": ["mod-1", "mod-2"]', '"draft_scenario_notes": "..."'],
      relationNote: 'Zéro serveur requis, gratuit et instantané, mais lié à un seul navigateur.'
    }
  }
];

export const HOSTING_OPTIONS: HostingOption[] = [
  {
    id: 'cloud-run-containers',
    name: 'Conteneur Serverless (ex: Google Cloud Run)',
    examples: 'Google Cloud Run (Hébergement natif AI Studio), AWS App Runner, Fly.io',
    architectureFit: 'Application Full-Stack (React + server.ts Express) ou API Backend',
    howItWorks:
      "Ton application (front + serveur) est emballée dans un conteneur standardisé. Quand aucun visiteur n'est là, le serveur se met en veille (Scale-to-Zero). S'il y a soudainement 1 000 visiteurs, le Cloud duplique automatiquement ton conteneur en plusieurs exemplaires.",
    pros: [
      'Supporte un vrai serveur Node.js (`server.ts`) avec clés API secrètes et routes `/api/*`',
      'Adaptation automatique au trafic (Scale-to-Zero quand inactif, montée en charge automatique)',
      'Aucune maintenance matérielle de serveur à faire soi-même'
    ],
    cons: [
      'Léger temps de réveil (Cold Start de ~0,5 à 1 seconde) après une longue période sans aucun visiteur',
      'Le serveur ne doit pas stocker de fichiers définitifs sur son propre disque local (car le conteneur est éphémère) : il faut utiliser une base externe (Cloud SQL / Firestore)'
    ],
    whenToChoose: 'Le choix de référence pour 90% des applications web modernes Full-Stack et IA.',
    costModel: 'Paiement à l’usage réel (CPU/Mémoire consommés uniquement pendant le traitement des requêtes).'
  },
  {
    id: 'static-edge-cdn',
    name: 'Hébergement Statique & CDN Edge',
    examples: 'Firebase Hosting, Vercel, Netlify, Cloudflare Pages',
    architectureFit: 'Application Front-End Pure (SPA React sans server.ts permanent)',
    howItWorks:
      "Une fois compilée (`npm run build`), ton application devient un simple dossier de fichiers HTML, CSS et JS distribué sur des centaines de serveurs dans le monde entier (CDN), au plus près des visiteurs.",
    pros: [
      'Vitesse d’affichage imbattable (chargement quasi instantané partout dans le monde)',
      'Coût quasi nul, voire totalement gratuit même avec beaucoup de visiteurs',
      'Impossible de faire « planter » un serveur puisque ce sont des fichiers pré-compilés'
    ],
    cons: [
      'Ne permet pas de faire tourner un serveur Node.js continu ni de cacher une clé API secrète sans recourir à des fonctions externes'
    ],
    whenToChoose: 'Idéal pour les sites vitrines, les simulateurs côté client, la documentation interactive ou les apps branchées en direct sur Firebase.',
    costModel: 'Forfait gratuit très large puis facturation minime à la bande passante.'
  },
  {
    id: 'baas-serverless',
    name: 'BaaS (Backend-as-a-Service Intégré)',
    examples: 'Firebase (Auth + Firestore + Hosting), Supabase',
    architectureFit: 'Application Client Riche connectée directement à des services Cloud managés',
    howItWorks:
      "Au lieu de coder et maintenir ton propre serveur d'authentification et de synchronisation, tu utilises un socle prêt à l'emploi où la sécurité est gérée par des règles déclaratives (`firestore.rules` ou RLS).",
    pros: [
      'Gestion des comptes utilisateurs (Google Sign-In, Email) prête en quelques minutes',
      'Synchronisation des données en temps réel entre plusieurs appareils sans coder de WebSockets',
      'Écosystème unifié très fiable'
    ],
    cons: [
      'Dépendance forte au fournisseur choisi (Vendor Lock-in : migrer ailleurs plus tard demande du travail)',
      'La logique métier très complexe côté serveur reste parfois plus claire dans un vrai `server.ts`'
    ],
    whenToChoose: 'Quand tu as besoin de comptes utilisateurs, de rôles (Admin / Membre) et de sauvegarde temps réel rapidement.',
    costModel: 'Gratuit jusqu’à un quota généreux de lectures/écritures par jour, puis paiement par opération.'
  },
  {
    id: 'vps-dedicated',
    name: 'Serveur Virtuel Dédié (VPS / VM Classique)',
    examples: 'Google Compute Engine (VM), OVHcloud VPS, DigitalOcean Droplet, Hetzner',
    architectureFit: 'Systèmes nécessitant un serveur allumé 24h/24 avec tâches de fond permanentes ou logiciels spécifiques',
    howItWorks:
      "Tu loues un ordinateur virtuel allumé en permanence avec un prix fixe par mois. Tu es responsable de son système d'exploitation (Linux), de ses mises à jour de sécurité et de sa capacité.",
    pros: [
      'Coût mensuel fixe et prévisible (aucune surprise de facturation)',
      'Le serveur ne s’endort jamais (zéro Cold Start) et peut faire tourner des processus longs en arrière-plan'
    ],
    cons: [
      'Demande de vraies compétences d’administration système (mises à jour Linux, pare-feu, sauvegardes, certificats SSL)',
      'Si le trafic explose soudainement au-delà de la mémoire de la machine, le site ralentit ou tombe'
    ],
    whenToChoose: 'Uniquement si tu as une équipe technique pour gérer le serveur ou des besoins matériels continus très spécifiques.',
    costModel: 'Abonnement mensuel fixe selon la taille de la machine (RAM / CPU).'
  }
];

export const AI_STUDIO_SCENARIOS: AiStudioScenario[] = [
  {
    id: 'scen-mentcare',
    title: 'Scénario 1 : Le Système Médical « Mentcare » (inspiré de Sommerville Chap. 1 & 6)',
    inspiredBy: 'Étude de cas fil rouge d’Ian Sommerville : gestion de dossiers de suivi médical en cliniques locales',
    context:
      "Tu crées sur Google AI Studio une application permettant à des praticiens de suivre les consultations de leurs patients, de vérifier les alertes de dosage médicamenteux et de générer un compte-rendu structuré.",
    initialConstraint:
      "Les règles de dosage sont critiques (une erreur de calcul est inacceptable) et les dossiers patients doivent être protégés par rôle (Praticien vs Secrétariat).",
    suddenNewConstraint:
      "Changement imprévu en réunion : Certaines consultations ont lieu à domicile dans des zones rurales où la connexion Internet coupe pendant 20 minutes !",
    steps: [
      {
        stepNumber: 1,
        situation: "Tu démarres le projet dans Google AI Studio. Comment demandes-tu à l'IA d'organiser le calcul des alertes de dosage médicamenteux ?",
        question: 'Quelle décision architecturale prends-tu dès le premier prompt ?',
        options: [
          {
            id: 'opt-1-bad',
            label: 'Demander une belle page unique avec tous les calculs directement dans le composant du formulaire.',
            isOptimal: false,
            mentorFeedback:
              "Danger ! Si la règle de calcul de dosage est noyée au milieu du code visuel du formulaire (`ConsultationForm.tsx`), il est impossible de la tester isolément et l'IA risque de la modifier par erreur en changeant la mise en page.",
            resultingFileImpact: 'App.tsx (1400 lignes confuses, zéro test unitaire)'
          },
          {
            id: 'opt-1-good',
            label: 'Exiger une Architecture en Couches : isoler les règles de dosage dans `src/utils/dosageRules.ts` avec des tests unitaires `dosageRules.test.ts`.',
            isOptimal: true,
            mentorFeedback:
              "Décision d'Architecte Senior ! En isolant les règles métier critiques dans un fichier pur accompagné de tests automatisés, tu garantis mathématiquement que les seuils de sécurité médicale ne seront jamais altérés.",
            resultingFileImpact: 'src/utils/dosageRules.ts + src/utils/dosageRules.test.ts + src/components/PatientView.tsx'
          }
        ]
      },
      {
        stepNumber: 2,
        situation: "Tu dois maintenant choisir comment stocker les dossiers et gérer les rôles (Praticien qui voit le médical vs Secrétaire qui ne voit que les rendez-vous).",
        question: 'Quel mécanisme de sécurité demandes-tu à l’IA ?',
        options: [
          {
            id: 'opt-2-bad',
            label: 'Cacher simplement l’onglet « Médical » avec une condition visuelle dans React si l’utilisateur a cliqué sur « Secrétaire ».',
            isOptimal: false,
            mentorFeedback:
              "Violation du Modèle du Fromage Suisse ! Cacher un bouton à l'écran ne protège pas les données : les données restent lisibles dans le réseau du navigateur. La sécurité doit toujours être appliquée côté base de données ou serveur.",
            resultingFileImpact: 'Sécurité illusoire côté client uniquement'
          },
          {
            id: 'opt-2-good',
            label: 'Mettre en place un contrôle d’accès strict côté serveur / `firestore.rules` (RBAC) en plus de l’adaptation visuelle.',
            isOptimal: true,
            mentorFeedback:
              "Exactement. C'est la Défense en Profondeur : l'interface s'adapte au rôle pour le confort, ET la couche de données (`firestore.rules` ou `server.ts`) vérifie formellement l'identité et le rôle avant de renvoyer la moindre donnée.",
            resultingFileImpact: 'firestore.rules (vérification du rôle) + src/services/patientService.ts'
          }
        ]
      },
      {
        stepNumber: 3,
        situation: "La nouvelle contrainte tombe : les praticiens en visite à domicile perdent parfois la connexion Internet pendant 20 minutes mais ne doivent perdre aucune note saisie.",
        question: 'Comment adaptes-tu ton architecture sans tout reconstruire ?',
        options: [
          {
            id: 'opt-3-good',
            label: 'Ajouter un tampon de persistance locale (LocalStorage / IndexedDB) dans la couche de service qui garde le brouillon et synchronise dès le retour du réseau.',
            isOptimal: true,
            mentorFeedback:
              "Bravo ! Comme tu avais déjà séparé la Couche Présentation de la Couche Service (`patientService.ts`), tu n'as même pas besoin de refaire tes écrans : seul le service s'enrichit d'une file d'attente hors-ligne.",
            resultingFileImpact: 'Modification chirurgicale dans src/services/syncQueue.ts uniquement'
          },
          {
            id: 'opt-3-bad',
            label: 'Recommencer toute l’application à zéro ou dire aux médecins de noter sur un cahier papier.',
            isOptimal: false,
            mentorFeedback:
              "Une architecture bien découpée en couches est justement conçue pour absorber ce type de nouvelle contrainte en ne modifiant que la couche d'accès aux données.",
            resultingFileImpact: 'Perte de temps ou abandon utilisateur'
          }
        ]
      }
    ],
    idealPromptTemplate:
      "« Agis en ingénieur logiciel senior. Nous construisons le module de suivi Mentcare. 1) Crée d'abord dans `src/utils/dosageEngine.ts` les fonctions pures de validation des règles métier de dosage et leurs tests dans `src/utils/dosageEngine.test.ts`. 2) Crée un service `src/services/consultationSync.ts` qui sauvegarde automatiquement le brouillon en local en cas de coupure réseau avant synchronisation. 3) Crée l'interface épurée dans `src/components/ConsultationWorkspace.tsx` et mets à jour `context.md`. »",
    idealFolderStructure: [
      '/context.md  (Vision, règles de sécurité médicale & état d’avancement)',
      '/plan.md     (Incréments : 1. Moteur de règles -> 2. Sync hors-ligne -> 3. Interface)',
      '/src/types.ts (Contrats de données : Patient, Consultation, DosageAlert)',
      '/src/utils/dosageEngine.ts (Règles métier pures sans dépendance UI)',
      '/src/utils/dosageEngine.test.ts (Tests unitaires automatisés des seuils critiques)',
      '/src/services/consultationSync.ts (Gestion base de données + secours hors-ligne)',
      '/src/components/ConsultationWorkspace.tsx (Interface praticien respirante)'
    ]
  },
  {
    id: 'scen-ilearn',
    title: 'Scénario 2 : La Plateforme Modulaire « iLearn » & Intégration IA',
    inspiredBy: 'Étude de cas Sommerville Chap. 1, 6 & 19 : Environnement d’apprentissage numérique évolutif',
    context:
      "Tu conçois une plateforme de formation professionnelle où les apprenants réalisent des exercices pratiques, consultent des schémas interactifs et reçoivent un diagnostic personnalisé généré via l'API Gemini.",
    initialConstraint:
      "La clé API Gemini ne doit jamais être exposée publiquement, et le projet doit rester très rapide et lisible au fil de l'ajout de nouveaux chapitres.",
    suddenNewConstraint:
      "Nouvelle contrainte : Un client entreprise demande d'exporter les résultats d'évaluation de toute une promotion au format structuré CSV/JSON avec un calcul de score certifié.",
    steps: [
      {
        stepNumber: 1,
        situation: "Tu veux intégrer l'analyse d'exercice par l'API Gemini tout en respectant les bonnes pratiques de sécurité d'AI Studio.",
        question: 'Où doit se situer l’appel à `@google/genai` et la lecture de `GEMINI_API_KEY` ?',
        options: [
          {
            id: 'opt-ilearn-1-good',
            label: 'Côté serveur dans `server.ts` via une route `/api/evaluate`, appelée par le front-end React.',
            isOptimal: true,
            mentorFeedback:
              "Parfait. L'architecture Client-Serveur prend tout son sens ici : `server.ts` lit `process.env.GEMINI_API_KEY` à l'abri des regards, interroge le modèle et renvoie uniquement le diagnostic structuré au navigateur.",
            resultingFileImpact: 'server.ts (/api/evaluate) + src/services/evaluationApi.ts'
          },
          {
            id: 'opt-ilearn-1-bad',
            label: 'Créer un champ texte sur la page pour demander à chaque élève de coller une clé API secrète.',
            isOptimal: false,
            mentorFeedback:
              "À proscrire absolument ! Un utilisateur final ne doit jamais avoir à fournir une clé technique, et exposer la clé de l'entreprise dans le client est une faille de sécurité.",
            resultingFileImpact: 'Mauvaise expérience utilisateur et faille de sécurité'
          }
        ]
      },
      {
        stepNumber: 2,
        situation: "Tu prévois d'ajouter 12 nouveaux chapitres de cours au fil des prochains mois. Comment structures-tu le contenu pédagogique ?",
        question: 'Comment demandes-tu à l’IA de ranger les cours par rapport aux composants visuels ?',
        options: [
          {
            id: 'opt-ilearn-2-good',
            label: 'Séparer les données de cours dans `src/data/modulesData.ts` et créer un composant générique `ModuleReader.tsx` qui affiche n’importe quel chapitre.',
            isOptimal: true,
            mentorFeedback:
              "Excellente application du principe de Réutilisation (Sommerville Chap. 15) ! Au lieu de dupliquer 12 fois le code d'une page, tu as un seul lecteur visuel et un fichier de données structuré très simple à enrichir.",
            resultingFileImpact: 'src/data/modulesData.ts + src/components/ModuleReader.tsx'
          },
          {
            id: 'opt-ilearn-2-bad',
            label: 'Créer `PageChapitre1.tsx`, `PageChapitre2.tsx`... jusqu’à `PageChapitre12.tsx` en copiant-collant toute la mise en page.',
            isOptimal: false,
            mentorFeedback:
              "Si tu dupliques la mise en page dans 12 fichiers, le jour où tu voudras changer la taille d'un titre, l'IA devra modifier 12 fichiers et en oubliera la moitié. Sépare toujours le Contenu (Data) du Contenant (Component).",
            resultingFileImpact: 'Code dupliqué difficile à maintenir'
          }
        ]
      },
      {
        stepNumber: 3,
        situation: "Le client entreprise demande d'ajouter le calcul de score certifié et l'export CSV/JSON d'une promotion entière.",
        question: 'Quel patron d’architecture appliques-tu pour cette chaîne de traitement et d’export ?',
        options: [
          {
            id: 'opt-ilearn-3-good',
            label: 'Utiliser un pipeline Pipe & Filter dans `src/utils/exportPipeline.ts` : 1. Filtrer la promotion -> 2. Calculer les scores certifiés -> 3. Formater en CSV.',
            isOptimal: true,
            mentorFeedback:
              "Raisonnement d'architecte accompli ! Le patron Pipe & Filter découpe la transformation en 3 petites fonctions pures faciles à vérifier unitairement avant le téléchargement.",
            resultingFileImpact: 'src/utils/exportPipeline.ts + src/utils/exportPipeline.test.ts'
          },
          {
            id: 'opt-ilearn-3-bad',
            label: 'Tout écrire dans l’événement `onClick` du bouton « Télécharger ».',
            isOptimal: false,
            mentorFeedback:
              "Mettre un algorithme de transformation CSV et de calcul de moyenne dans un bouton visuel rend le code illisible et impossible à réutiliser ailleurs.",
            resultingFileImpact: 'Composant bouton surchargé et fragile'
          }
        ]
      }
    ],
    idealPromptTemplate:
      "« Sépare le contenu pédagogique dans `src/data/modulesData.ts` avec des interfaces strictes dans `src/types.ts`. Crée dans `src/utils/exportPipeline.ts` un pipeline en 3 étapes pures (filtrage, calcul de score, génération CSV) avec ses tests unitaires. Garde l'appel à l'API Gemini côté serveur dans `server.ts` sur la route POST `/api/evaluate`. »",
    idealFolderStructure: [
      '/server.ts (Serveur Express + route sécurisée /api/evaluate)',
      '/.env.example (Déclaration de GEMINI_API_KEY)',
      '/src/data/modulesData.ts (Contenu structuré des chapitres)',
      '/src/utils/exportPipeline.ts (Pipeline Pipe & Filter : Calcul & Export)',
      '/src/utils/exportPipeline.test.ts (Vérification mathématique des scores)',
      '/src/components/ModuleReader.tsx (Lecteur modulaire unique)'
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'term-regle-metier',
    term: 'Règle Métier (Business Rule / Domain Logic)',
    category: 'architecture',
    simpleDefinition: 'Une loi ou formule propre à ton activité réelle (tarif, éligibilité, contrainte légale), indépendante de l’informatique.',
    metaphor: 'La recette de cuisine du chef : elle reste la même que le plat soit servi dans une assiette blanche ou bleue.',
    whenAiSaysIt: "« J'ai extrait les règles métier de facturation hors du composant visuel pour les isoler dans un service dédié. »",
    whatYouMustDecide: 'C’est TOI seul qui dois définir les règles métier exactes : l’IA ne peut pas deviner ta politique commerciale ou tes seuils de sécurité.',
    relatedTerms: ['Couche Métier', 'Découplage', 'Test Unitaire']
  },
  {
    id: 'term-crud',
    term: 'CRUD (Create, Read, Update, Delete)',
    category: 'donnees',
    simpleDefinition: 'Les 4 opérations de base qu’on peut faire sur une donnée : Créer (Create), Lire/Afficher (Read), Modifier (Update) et Supprimer (Delete).',
    metaphor: 'Un carnet d’adresses : ajouter un contact, le consulter, corriger son numéro, ou arracher la page.',
    whenAiSaysIt: "« J'ai implémenté les routes CRUD complètes pour la gestion des projets. »",
    whatYouMustDecide: 'Pour chaque élément de ton app (ex: une facture), demande-toi si les 4 actions sont autorisées (ex: en comptabilité, on interdit souvent le Delete d’une facture validée !).',
    relatedTerms: ['API REST', 'Base de Données', 'RBAC']
  },
  {
    id: 'term-increment',
    term: 'Incrément (Incremental Delivery)',
    category: 'processus',
    simpleDefinition: 'Une tranche fonctionnelle et vérifiable du logiciel livrée étape par étape, au lieu d’attendre que tout soit fini d’un seul bloc.',
    metaphor: 'Construire et meubler le rez-de-chaussée habitable avant d’attaquer le premier étage.',
    whenAiSaysIt: "« Je vous propose de valider ce premier incrément (moteur de calcul + écran principal) avant d'ajouter l'export PDF. »",
    whatYouMustDecide: 'Classe toujours tes idées par priorité : quel est l’Incrément 1 indispensable (le cœur de valeur) par rapport aux options secondaires ?',
    relatedTerms: ['Agile', 'MVP', 'Refactoring']
  },
  {
    id: 'term-agile',
    term: 'Méthode Agile / Itératif',
    category: 'processus',
    simpleDefinition: 'Approche qui consiste à construire le logiciel par cycles courts (itérations), en testant et en ajustant le plan régulièrement face à la réalité.',
    metaphor: 'Naviguer à la voile en ajustant le cap toutes les heures selon le vent, plutôt que de bloquer le gouvernail au départ.',
    whenAiSaysIt: "« Adoptons une approche itérative : testons ce flux utilisateur et ajustons le schéma selon votre retour. »",
    whatYouMustDecide: 'Vérifie l’application dans l’aperçu après chaque étape importante et mets à jour `plan.md` et `context.md` avant de passer à la suite.',
    relatedTerms: ['Incrément', 'User Story', 'Dette Technique']
  },
  {
    id: 'term-couplage-cohesion',
    term: 'Couplage Faible & Cohésion Forte',
    category: 'architecture',
    simpleDefinition: 'Cohésion forte = chaque fichier a une seule mission très claire. Couplage faible = modifier un fichier ne casse pas les 10 autres fichiers autour.',
    metaphor: 'Des briques Lego : chaque brique est solide (cohésion) et peut se détacher d’une autre sans l’arracher (couplage faible).',
    whenAiSaysIt: "« Ce composant est trop fortement couplé à l'API ; je vais introduire une interface pour réduire le couplage. »",
    whatYouMustDecide: 'Si l’IA modifie 8 fichiers pour changer un détail, alerte-la : demande-lui de découpler l’architecture.',
    relatedTerms: ['Architecture en Couches', 'Refactoring', 'Interface TypeScript']
  },
  {
    id: 'term-dette-technique',
    term: 'Dette Technique & Refactoring',
    category: 'processus',
    simpleDefinition: 'La Dette Technique est le désordre accumulé dans le code quand on va trop vite. Le Refactoring est le ménage qui réorganise le code sans changer l’écran.',
    metaphor: 'Cuisiner vite sans jamais laver les casseroles (dette technique) vs nettoyer le plan de travail entre deux plats (refactoring).',
    whenAiSaysIt: "« Le fichier App.tsx dépasse 900 lignes ; je vais effectuer un refactoring pour extraire 3 sous-composants propres. »",
    whatYouMustDecide: 'Autorise et demande régulièrement un tour de refactoring avant d’ajouter une nouvelle fonctionnalité majeure.',
    relatedTerms: ['Maintenabilité', 'Couplage Faible', 'Tests Unitaires']
  },
  {
    id: 'term-api-rest-payload',
    term: 'API REST, Endpoint & Payload',
    category: 'code-ia',
    simpleDefinition: 'L’API est le guichet de communication entre le Client et le Serveur. L’Endpoint est l’adresse du guichet (`/api/orders`). Le Payload est le colis de données envoyé.',
    metaphor: 'Commander au comptoir : l’Endpoint est le numéro du guichet, et le Payload est le bon de commande rempli.',
    whenAiSaysIt: "« L'endpoint POST `/api/simulate` attend un payload JSON contenant le budget et la durée. »",
    whatYouMustDecide: 'Vérifie quelles données ont réellement besoin de transiter par le réseau et lesquelles doivent rester confidentielles.',
    relatedTerms: ['Client-Serveur', 'CRUD', 'JSON']
  },
  {
    id: 'term-state-props',
    term: 'State (État) vs Props (Propriétés)',
    category: 'code-ia',
    simpleDefinition: 'Les Props sont les réglages transmis par un composant parent à son enfant. Le State est la mémoire interne vivante qui change quand l’utilisateur interagit.',
    metaphor: 'Ton nom de naissance est une Prop (transmise par tes parents) ; ton humeur du moment ou ta faim est ton State (état interne qui évolue).',
    whenAiSaysIt: "« J'ai remonté le state (Lifting State Up) dans le composant parent pour synchroniser le schéma et le panneau de contrôle. »",
    whatYouMustDecide: 'Quand deux zones de l’écran doivent réagir ensemble au même clic, dis à l’IA qu’elles doivent partager le même état.',
    relatedTerms: ['MVC', 'Hydratation', 'Persistance']
  },
  {
    id: 'term-middleware',
    term: 'Middleware (Logiciel Intermédiaire / Vigile)',
    category: 'securite-qualite',
    simpleDefinition: 'Un filtre placé à l’entrée du serveur qui inspecte chaque requête (ex: vérifier que l’utilisateur est bien connecté) avant d’exécuter l’action.',
    metaphor: 'Le contrôle de sécurité à l’aéroport : il vérifie ton billet avant de te laisser accéder à la porte d’embarquement.',
    whenAiSaysIt: "« J'ai ajouté un middleware d'authentification sur toutes les routes d'administration. »",
    whatYouMustDecide: 'Précise toujours quelles actions sont publiques (ouvertes à tous) et lesquelles doivent être filtrées par un contrôle d’identité.',
    relatedTerms: ['Client-Serveur', 'RBAC', 'Modèle du Fromage Suisse']
  },
  {
    id: 'term-idempotence',
    term: 'Idempotence',
    category: 'securite-qualite',
    simpleDefinition: 'Propriété d’une opération qui produit le même résultat même si l’utilisateur clique 3 fois de suite par nervosité (évite de facturer 3 fois).',
    metaphor: 'Le bouton d’appel d’un ascenseur : appuyer 10 fois dessus ne fait pas venir 10 ascenseurs, il reste appelé une seule fois.',
    whenAiSaysIt: "« J'ai rendu l'opération de validation idempotente et désactivé le bouton pendant le chargement. »",
    whatYouMustDecide: 'Sur toute action critique (paiement, envoi de formulaire, génération IA), exige un état de chargement (Palette Quaternaire) qui empêche le double-clic.',
    relatedTerms: ['Fiabilité', 'Transaction ACID', 'État de chargement']
  },
  {
    id: 'term-rbac',
    term: 'RBAC (Role-Based Access Control)',
    category: 'securite-qualite',
    simpleDefinition: 'Gestion des permissions par Rôle (ex: Visiteur, Membre, Médecin, Administrateur) définissant qui a le droit de lire ou modifier quoi.',
    metaphor: 'Les badges d’accès dans un hôpital : le badge visiteur ouvre le hall, seul le badge chirurgien ouvre le bloc opératoire.',
    whenAiSaysIt: "« J'ai configuré une politique RBAC dans `firestore.rules` distinguant les rôles `admin` et `reader`. »",
    whatYouMustDecide: 'Dresse toujours la liste claire des rôles de ton application et de leurs droits CRUD respectifs.',
    relatedTerms: ['CRUD', 'Middleware', 'Firestore Rules']
  },
  {
    id: 'term-scalabilite',
    term: 'Scalabilité (Montée en Charge Horizontale vs Verticale)',
    category: 'architecture',
    simpleDefinition: 'Capacité du logiciel à absorber 10 fois ou 100 fois plus d’utilisateurs sans ralentir. Verticale = prendre une machine plus grosse. Horizontale = ajouter plusieurs machines en parallèle.',
    metaphor: 'Verticale : remplacer un caissier par un caissier deux fois plus rapide. Horizontale : ouvrir 5 caisses supplémentaires au supermarché.',
    whenAiSaysIt: "« L'architecture est stateless, ce qui permet une scalabilité horizontale automatique sur Cloud Run. »",
    whatYouMustDecide: 'Si tu prévois des pics de trafic soudains (lancement, événement), privilégie un hébergement Serverless capable de monter en charge horizontalement.',
    relatedTerms: ['Cloud Run', 'Stateless', 'Cache']
  }
];
