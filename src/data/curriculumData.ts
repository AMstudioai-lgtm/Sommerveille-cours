export interface LessonSubSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  sommervilleRef: string;
  mentorVoice: string;
  deepDiveParagraphs: string[];
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
  schemaImage?: {
    src: string;
    alt: string;
    caption: string;
    secondarySrc?: string;
    secondaryCaption?: string;
  };
  interactiveToolId:
    | 'lifecycle-flow'
    | 'architecture-schema'
    | 'architecture-reading-lab'
    | 'file-tree'
    | 'data-hosting-sim'
    | 'dependability-swiss'
    | 'ai-studio-scenarios'
    | 'capstone-project'
    | 'none';
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

export interface CapstoneMilestone {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  objective: string;
  deliverables: string[];
  architectChecklist: string[];
  promptToUse: string;
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
    shortTitle: 'Esprit Ingénieur & Exigences',
    fullTitle: 'Penser et Agir comme un Ingénieur Logiciel (Sans Coder)',
    subtitle:
      'Comprendre ce qu’est réellement un logiciel professionnel, comment recueillir les besoins et comment transformer une idée floue en exigences et règles métier solides.',
    sommervilleChapters: 'Sommerville Chapitres 1 & 4 — Introduction à l’Ingénierie & Ingénierie des Exigences',
    bgTone: 'primary',
    schemaImage: {
      src: '/src/assets/images/schema_module1_cycle_incremental_1795020431050.jpg',
      alt: 'Schéma du besoin et des règles métier découpés en incréments',
      caption: 'Du besoin métier central vers le découpage en incréments maîtrisés : la base de la réflexion d’ingénieur.'
    },
    interactiveToolId: 'none',
    mentorIntro:
      "Bienvenue dans le métier. Beaucoup pensent qu'un ingénieur logiciel est quelqu'un qui tape des lignes de code très vite. C'est faux. Le code n'est que la brique finale. L'ingénieur logiciel est celui qui transforme un problème humain désordonné en un système fiable, découpé et maintenable. Avec l'IA générative, tu n'as plus besoin de maçonner chaque brique toi-même : l'IA est ton équipe d'ouvriers ultra-rapides. Mais si l'architecte (toi) ne fournit pas le plan, les règles métier et les limites, l'IA construira une tour instable qui s'effondrera au premier changement.",
    keyTakeaway:
      'Avant de demander la moindre ligne de code à l’IA, sépare toujours par écrit : 1) Ce que fait l’application (Exigences Fonctionnelles), 2) Ses limites et garanties de sécurité/vitesse (Exigences Non-Fonctionnelles), et 3) Ses lois de calcul pures (Règles Métier).',
    sections: [
      {
        id: 'sec-1-1',
        code: 'Sous-module 1.1',
        title: 'La Différence entre un Script Jetable et l’Ingénierie Logicielle',
        subtitle: 'Pourquoi 70 % de la vie d’un logiciel se joue après sa première création.',
        sommervilleRef: 'Ian Sommerville — Chapitre 1.1 : Professional Software Development',
        mentorVoice:
          "Quand on débute avec une IA, on est ébloui parce qu'en un seul message (« Fais-moi un site de facturation »), un écran apparaît en 30 secondes. Mais dès le lendemain, quand on veut ajouter la TVA, gérer les avoirs ou sécuriser l'accès d'un comptable, tout se casse. Pourquoi ? Parce qu'on a confondu un « prototype visuel » avec un « système ingénieré ».",
        deepDiveParagraphs: [
          "Dans le Chapitre 1 de son ouvrage, Ian Sommerville pose une distinction fondamentale : un programme personnel peut être écrit sans plan, mais un logiciel professionnel est destiné à évoluer, à résister aux erreurs humaines et à survivre aux changements de besoins. Le coût principal d'un logiciel n'est presque jamais sa fabrication initiale, mais sa modification et sa maintenance au fil des mois.",
          "En tant qu'architecte qui ne code pas, ton super-pouvoir ne réside pas dans la syntaxe des virgules ou des parenthèses : il réside dans ta capacité à anticiper le changement. Chaque fois que tu demandes une fonctionnalité à l'IA, tu dois te poser la question d'ingénieur : « Si demain je dois modifier cette règle de tarif ou changer l'apparence de cette page, est-ce que les deux sont suffisamment séparés pour que l'un ne détruise pas l'autre ? »",
          "Sommerville résume la qualité d'un bon logiciel en quatre piliers que tu dois exiger de l'IA : la Maintenabilité (pouvoir modifier une pièce sans tout casser), la Sûreté et Sécurité (protéger les données contre les erreurs et les attaques), l'Efficacité (répondre rapidement sans gaspiller les ressources), et l'Acceptabilité (être limpide et agréable pour l'utilisateur final)."
        ],
        corePrinciples: [
          {
            heading: 'Le Piège du « Tout-en-Un »',
            explanation:
              "Quand on ne donne aucune consigne d'organisation à l'IA, elle place l'affichage, les textes, les calculs financiers et les appels réseau dans un seul et même fichier. C'est rapide à la minute 1, mais fatal à l'heure 2.",
            concreteExample:
              "Une maison où les tuyaux d'eau, les câbles électriques et les murs porteurs seraient coulés en vrac au milieu du salon : impossible de réparer une fuite sans abattre le salon.",
            aiArchitectRule:
              "Dès le début d'un projet, annonce à l'IA : « Nous allons construire une application modulaire propre où chaque responsabilité est séparée dans son propre dossier. »"
          },
          {
            heading: 'Les 4 Activités Universelles de Sommerville',
            explanation:
              "Peu importe le projet, ton travail d'architecte suit toujours 4 temps : 1. Spécifier (définir les règles), 2. Concevoir (organiser les dossiers et couches), 3. Valider (tester que le résultat est exact), 4. Évoluer (adapter proprement).",
            concreteExample:
              "Sur Google AI Studio, Spécifier = écrire dans `context.md` ; Concevoir = écrire dans `plan.md` et `agents.md` ; Valider = vérifier les tests et l'aperçu ; Évoluer = itérer par petits prompts ciblés.",
            aiArchitectRule:
              "Ne saute jamais directement à l'étape de génération sans avoir clarifié la spécification et le plan."
          }
        ]
      },
      {
        id: 'sec-1-2',
        code: 'Sous-module 1.2',
        title: 'Exigences Fonctionnelles vs Exigences Non-Fonctionnelles',
        subtitle: 'Apprendre à formuler ce que le logiciel fait ET les contraintes qu’il doit respecter.',
        sommervilleRef: 'Ian Sommerville — Chapitre 4.1 : Functional and Non-Functional Requirements',
        mentorVoice:
          "C'est l'un des concepts les plus importants de toute ta formation. Selon Sommerville, la majorité des échecs logiciels ne viennent pas d'une erreur de programmation, mais d'une exigence mal comprise ou oubliée au départ.",
        deepDiveParagraphs: [
          "Les Exigences Fonctionnelles décrivent les services visibles que le système doit rendre à l'utilisateur : « Le médecin peut rechercher un patient par son nom », « Le client peut télécharger un reçu PDF », « L'administrateur peut créer un nouveau cours ». C'est ce à quoi tout le monde pense naturellement.",
          "Les Exigences Non-Fonctionnelles, elles, sont les contraintes globales qui pèsent sur l'ensemble de l'architecture : la sécurité (qui a le droit de voir quoi ?), la fiabilité (que se passe-t-il si Internet coupe pendant la saisie ?), la performance (combien de temps maximum pour afficher la page ?), la confidentialité (les clés secrètes sont-elles protégées ?). Sommerville montre qu'une seule exigence non-fonctionnelle est souvent plus déterminante pour le choix de l'architecture que dix exigences fonctionnelles.",
          "Lorsque tu parles à une IA, elle est entraînée pour satisfaire immédiatement tes exigences fonctionnelles visibles, mais elle prendra la voie la plus courte (et souvent la moins sécurisée) si tu ne lui dictes pas tes exigences non-fonctionnelles."
        ],
        corePrinciples: [
          {
            heading: 'Exigence Fonctionnelle (Le Comportement)',
            explanation:
              "Définit une action précise : Entrée -> Traitement -> Sortie attendue à l'écran.",
            concreteExample:
              "Dans le système médical Mentcare (étude de cas de Sommerville) : « Le système doit générer la liste quotidienne des rendez-vous de chaque clinique locale. »",
            aiArchitectRule:
              "Décris toujours les fonctionnalités sous forme d'actions claires par profil d'utilisateur."
          },
          {
            heading: 'Exigence Non-Fonctionnelle (La Contrainte Architecturale)',
            explanation:
              "Fixe une norme de qualité, de sécurité, de disponibilité ou d'environnement technique que le logiciel ne doit jamais violer.",
            concreteExample:
              "Toujours dans Mentcare : « Les dossiers médicaux doivent rester consultables en clinique même en cas de panne du réseau central, et toute consultation doit être journalisée pour l'audit de confidentialité. »",
            aiArchitectRule:
              "Inscris tes exigences non-fonctionnelles (design épuré, sécurité serveur, mode hors-ligne, rapidité) directement dans `agents.md` et `context.md`."
          }
        ]
      },
      {
        id: 'sec-1-3',
        code: 'Sous-module 1.3',
        title: 'La Règle Métier (Business Rule) : Le Cœur Sacré du Logiciel',
        subtitle: 'Pourquoi tes règles de calcul et de décision ne doivent jamais être mélangées aux boutons de l’écran.',
        sommervilleRef: 'Ian Sommerville — Chapitre 4 & Chapitre 7 : Domain Logic & Separation',
        mentorVoice:
          "Quand l'IA te parle de « Règle Métier » (ou Domain Logic / Business Logic), de quoi parle-t-elle exactement ? C'est très simple : une règle métier est une loi de ton activité qui existerait même si les ordinateurs n'avaient jamais été inventés.",
        deepDiveParagraphs: [
          "Imagine que tu gères un cabinet d'assurance ou une boutique en 1950 avec un registre en papier. La règle « Un client fidèle depuis plus de 3 ans bénéficie de 12 % de remise si sa commande dépasse 200 €, sauf sur les articles déjà en promotion » est une pure Règle Métier. Elle n'a aucun rapport avec React, ni avec la couleur d'un bouton, ni avec le type d'écran téléphone ou ordinateur.",
          "Dans le système de Pompe à Insuline étudié par Sommerville au Chapitre 1, la règle métier vitale est : « La dose injectée dépend de l'écart entre le taux de sucre actuel et le taux précédent, mais ne doit jamais dépasser le plafond maximal de sécurité sur 24 heures ». Si cette formule mathématique est cachée au milieu du code qui dessine l'écran LCD, le moindre changement d'affichage peut provoquer un surdosage fatal.",
          "Pour devenir un grand architecte logiciel sans savoir coder, adopte ce réflexe systématique : demande toujours à l'IA d'isoler toutes les règles métier dans un dossier séparé (`/src/utils/` ou `/src/domain/`) sous forme de fonctions pures, et de les vérifier avec des tests automatiques."
        ],
        corePrinciples: [
          {
            heading: 'Qu’est-ce qu’une Fonction Pure de Règle Métier ?',
            explanation:
              "C'est une petite boîte logique qui reçoit des chiffres ou des faits en entrée (ex: ancienneté = 4 ans, panier = 250 €) et renvoie la décision exacte en sortie (remise = 30 €), sans toucher à l'écran ni à Internet.",
            concreteExample:
              "Le fichier `src/utils/mentorEngine.ts` de ce site même : il calcule les recommandations d'architecture et ta progression sans jamais dépendre de l'affichage.",
            aiArchitectRule:
              "Dis à l'IA : « Place toutes les formules de calcul, barèmes et règles métier dans `src/utils/` en fonctions pures indépendantes de React, et écris un fichier `.test.ts` pour les vérifier. »"
          }
        ],
        constraintAdaptation: [
          {
            triggerConstraint: "En plein milieu du projet, la législation change : la TVA passe de 20 % à 21 % pour certaines catégories de clients.",
            badReaction: "Chercher dans 15 pages d'écran différentes tous les endroits où le chiffre 20 % a été écrit à la main.",
            architectDecision: "Comme la règle métier a été isolée dans un seul fichier central (`src/utils/taxRules.ts`), tu demandes à l'IA de mettre à jour uniquement cette règle : tout le site se met à jour sans aucun bug visuel."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2-processus-agile',
    number: '02',
    shortTitle: 'Processus, Incréments & Agile',
    fullTitle: 'Méthodes de Construction : Incréments, Agile et Gestion du Changement',
    subtitle:
      'Pourquoi construire un logiciel bloc par bloc (approche incrémentale) bat toujours l’approche monolithique en cascade.',
    sommervilleChapters: 'Sommerville Chapitres 2 & 3 — Processus Logiciels & Développement Agile / Scrum',
    bgTone: 'primary-alt',
    schemaImage: {
      src: '/assets/aistudio/Screenshot_20261114_212442_ChatGPT_e42cac57.jpg',
      alt: 'Architecture Monolithique vs Découpage des composants Frontend, Backend et Data Storage',
      caption: 'Comprendre la structure globale d’une application (Frontend, Backend, Data Storage) avant de la construire par incréments successifs.'
    },
    interactiveToolId: 'lifecycle-flow',
    mentorIntro:
      "Maintenant que tu sais définir tes exigences et tes règles métier, dans quel ordre dois-tu faire construire le logiciel par l'IA ? Au Chapitre 2 et au Chapitre 3, Ian Sommerville compare les méthodes historiques rigides (le modèle en Cascade / Waterfall) aux méthodes modernes (le développement Incrémental et Agile). Avec une IA, cette leçon vaut de l'or : la façon dont tu découpes tes étapes détermine à 100 % la réussite de ton projet.",
    keyTakeaway:
      'Construis toujours par Incréments : Incrément 1 = Modèle de données & Règles métier pures ; Incrément 2 = Écran principal fonctionnel ; Incrément 3 = Persistance base de données ; Incrément 4 = Finitions & Cas limites.',
    sections: [
      {
        id: 'sec-2-1',
        code: 'Sous-module 2.1',
        title: 'Cascade (Waterfall) vs Développement Incrémental',
        subtitle: 'Pourquoi demander 20 fonctionnalités en une seule phrase à l’IA est l’erreur numéro 1.',
        sommervilleRef: 'Ian Sommerville — Chapitre 2.1 : Software Process Models',
        mentorVoice:
          "Dans le modèle en Cascade (Waterfall), on essaie de tout concevoir et de tout produire d'un seul bloc avant de tester quoi que ce soit. Dans le développement Incrémental, on découpe le système en tranches fonctionnelles (Incréments). Chaque incrément est construit, testé et validé avant de passer au suivant.",
        deepDiveParagraphs: [
          "Pourquoi le modèle Incrémental est-il infiniment supérieur, surtout quand tu pilotes une IA comme Google AI Studio ? Pour trois raisons concrètes expliquées par Sommerville :",
          "1. Tu obtiens une base fonctionnelle vérifiable très vite : dès le premier incrément, tu peux manipuler le cœur de ton application et réaliser ce qui manque ou ce qui doit être ajusté.",
          "2. Les erreurs sont isolées : si l'Incrément 1 (ton moteur de règles et ton premier écran) fonctionne parfaitement, et qu'un bug apparaît lors de l'Incrément 2 (l'ajout de la sauvegarde), tu sais immédiatement que le problème vient uniquement de l'étape 2.",
          "3. La mémoire de l'IA reste concentrée : au lieu de noyer le modèle avec 50 consignes simultanées où il finira par bâcler la moitié des fichiers, tu lui fais construire des fondations d'une propreté chirurgicale étape par étape."
        ],
        corePrinciples: [
          {
            heading: 'Qu’est-ce qu’un « Incrément » au sens strict ?',
            explanation:
              "Un incrément n'est pas un bout de code inachevé qui ne marche pas. C'est une version complète et utilisable du logiciel, mais limitée aux fonctionnalités prioritaires.",
            concreteExample:
              "Pour une application de réservation : l'Incrément 1 permet de choisir un créneau et de calculer le tarif exact à l'écran. L'Incrément 2 ajoute l'enregistrement en base de données. L'Incrément 3 ajoute l'espace d'administration.",
            aiArchitectRule:
              "Note toujours la liste de tes incréments dans le fichier `plan.md` et valide chaque incrément avant d'ordonner le suivant."
          }
        ]
      },
      {
        id: 'sec-2-2',
        code: 'Sous-module 2.2',
        title: 'Les Principes Agiles, User Stories et Adaptation Continue',
        subtitle: 'Formuler ses besoins comme un Product Owner / Architecte Agile.',
        sommervilleRef: 'Ian Sommerville — Chapitre 3 : Agile Software Development & Scrum',
        mentorVoice:
          "Dans les méthodes Agiles (comme Scrum ou Extreme Programming présentées au Chapitre 3), on exprime les besoins sous forme de Scénarios Utilisateurs (User Stories) et on accepte que le plan évolue à mesure que l'on découvre le produit.",
        deepDiveParagraphs: [
          "Une User Story bien formulée suit une structure limpide en trois parties : « En tant que [Rôle précis], je veux [Action concrète], afin de [Bénéfice métier / Règle de validation] ». Par exemple : « En tant que praticien en visite à domicile, je veux enregistrer mes notes de consultation même sans réseau, afin qu'aucune observation médicale ne soit perdue. »",
          "En formulant tes demandes à l'IA sous cet angle, tu lui donnes simultanément qui utilise l'écran, quelle action technique doit être codée, et pourquoi cette action est importante (ce qui guide la gestion des erreurs et des états de chargement)."
        ],
        corePrinciples: [
          {
            heading: 'L’Itération Courte (Build -> Verify -> Critique -> Fix)',
            explanation:
              "Construire une brique, vérifier qu'elle compile et s'affiche sans erreur, critiquer le résultat avec l'œil de l'architecte, et corriger immédiatement avant d'aller plus loin.",
            concreteExample:
              "Si l'écran principal déborde sur mobile à l'Incrément 1, on le corrige tout de suite avant d'ajouter 5 autres écrans.",
            aiArchitectRule:
              "Utilise `context.md` comme fil conducteur : à la fin de chaque itération, ce qui est terminé passe dans « Ce qui est fait » et la prochaine étape devient limpide."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-3-architecture-couches',
    number: '03',
    shortTitle: 'Architecture en Couches & Rôles',
    fullTitle: 'Comprendre l’Architecture en Couches et la Séparation des Rôles',
    subtitle:
      'Découper son logiciel en étages indépendants (Présentation, Logique Métier, Accès aux Données, Base de Données) pour une clarté totale.',
    sommervilleChapters: 'Sommerville Chapitre 6.1 à 6.3.2 — Architectural Design Decisions & Layered Architecture',
    bgTone: 'primary',
    schemaImage: {
      src: '/src/assets/images/schema_module2_couches_roles_1795020435677.jpg',
      alt: 'Schéma des 4 couches logicielles avec les rôles associés',
      caption: 'Les 4 étages fondamentaux d’un logiciel moderne : Présentation (UI), Logique Métier, Accès Données (API) et Base de Données.',
      secondarySrc: '/assets/aistudio/Screenshot_20261114_212457_ChatGPT_1e112b2e.jpg',
      secondaryCaption: 'Modèle de référence : chaque couche correspond à un rôle et une responsabilité strictement isolés.'
    },
    interactiveToolId: 'none',
    mentorIntro:
      "Regarde attentivement le schéma ci-dessus. C'est l'image la plus importante à graver dans ton esprit d'architecte logiciel. Tout logiciel bien conçu sur terre — qu'il s'agisse d'une banque, d'un hôpital ou d'une application créée sur Google AI Studio — est organisé en étages superposés appelés « Couches » (Layers). Chaque couche a un métier unique et ne marche jamais sur les pieds des autres.",
    keyTakeaway:
      'La règle d’or de l’Architecture en Couches : la flèche descend toujours d’un étage à la fois (Présentation -> Logique Métier -> Accès Données -> Base de Données). La couche Présentation ne doit jamais sauter directement dans la Base de Données sans passer par la Logique Métier.',
    sections: [
      {
        id: 'sec-3-1',
        code: 'Sous-module 3.1',
        title: 'Anatomie Détaillée des 4 Couches Fondamentales',
        subtitle: 'Que fait exactement chaque étage et pourquoi cette séparation te sauve la vie ?',
        sommervilleRef: 'Ian Sommerville — Chapitre 6.3.2 : Layered Architecture',
        mentorVoice:
          "Prenons le temps de disséquer chacune des 4 boîtes colorées du schéma pour que tu saches exactement ce qu'elles représentent dans tes projets.",
        deepDiveParagraphs: [
          "1. LA COUCHE PRÉSENTATION (Presentation Layer / UI — en bleu) : C'est la vitrine en contact avec l'utilisateur humain. Son seul travail est d'afficher les informations proprement (titres, formulaires, schémas, états de chargement) et de capter les gestes de l'utilisateur (clics, saisies au clavier). Elle est « bête » volontairement : elle ne décide pas si un client a droit à un crédit et elle ne connaît pas les mots de passe de la base de données.",
          "2. LA COUCHE LOGIQUE MÉTIER (Business Logic Layer / Domain — en vert) : C'est le cerveau d'ingénierie et de gestion. Quand l'utilisateur clique sur un bouton dans la couche Présentation, la demande descend ici. Cette couche vérifie les règles métier : le panier est-il valide ? L'utilisateur a-t-il les droits ? Quel est le résultat du calcul ? C'est la couche la plus précieuse de ton entreprise.",
          "3. LA COUCHE ACCÈS AUX DONNÉES (Data Access Layer / Services & API — en orange) : Une fois que la Logique Métier a validé l'opération, il faut aller lire ou enregistrer les informations. La couche Accès aux Données joue le rôle de traducteur et de douanier : elle prépare la requête réseau (`/api/...`), gère la sécurité du transport et parle le langage technique de la base ou des services externes (comme l'API Gemini).",
          "4. LA BASE DE DONNÉES (Database / Persistance — en rouge) : C'est le coffre-fort final (SQL, Firestore, Stockage Cloud) où les informations sont gravées durablement pour ne jamais disparaître quand on éteint l'ordinateur."
        ],
        corePrinciples: [
          {
            heading: 'Pourquoi cette séparation est magique quand tu guides l’IA',
            explanation:
              "Si demain tu demandes à l'IA : « Allège complètement le design visuel et change la police pour DM Sans », l'IA ne touchera qu'à l'étage 1 (Couche Présentation). Les étages 2 (Logique Métier), 3 (Accès Données) et 4 (Base de données) ne subiront aucun risque de bug !",
            concreteExample:
              "C'est exactement ce que nous faisons sur ce site : les textes et données sont dans `src/data/`, le moteur logique est dans `src/utils/mentorEngine.ts`, et le design visuel est dans `src/components/` et `src/index.css`.",
            aiArchitectRule:
              "C'est le principe que tu as inscrit dans tes instructions : « Privilégier par défaut un développement modulaire en couches : une couche pour la présentation (UI), une autre pour les règles métier, une autre pour la base de données »."
          },
          {
            heading: 'Couplage Faible (Low Coupling) et Cohésion Forte (High Cohesion)',
            explanation:
              "Deux termes techniques que l'IA utilise souvent : la « Cohésion Forte » signifie que chaque couche ne contient que ce qui relève de sa mission. Le « Couplage Faible » signifie que deux couches sont reliées par un contrat simple (une interface propre) et peuvent être modifiées indépendamment.",
            concreteExample:
              "Tu peux repeindre la carrosserie de ta voiture (Présentation) sans démonter la boîte de vitesses (Logique Métier) parce qu'elles ont un couplage faible.",
            aiArchitectRule:
              "Si l'IA te dit qu'elle va « découpler la logique métier du composant React », félicite-la : elle est en train de nettoyer ton architecture en couches."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-4-patrons-architecture',
    number: '04',
    shortTitle: 'Monolithe Modulaire & Patrons',
    fullTitle: 'Décider quelle Architecture Convient à Quelle Situation',
    subtitle:
      'Monolithe vs Monolithe Modulaire, MVC, Client-Serveur, Repository et Pipe & Filter : savoir choisir comme un architecte senior.',
    sommervilleChapters: 'Sommerville Chapitres 6.3, 17 & 18 — Architectural Patterns & Distributed Systems',
    bgTone: 'primary-alt',
    schemaImage: {
      src: '/src/assets/images/schema_module3_monolith_modulaire_1795020438811.jpg',
      alt: 'Comparaison entre Code Monolithique enchevêtré et Architecture Modulaire Propre',
      caption: 'Haut : Le Monolithe enchevêtré où tout est mélangé. Bas : Le Monolithe Modulaire où l’API distribue proprement vers chaque module.',
      secondarySrc: '/assets/aistudio/Screenshot_20261114_212429_ChatGPT_d561167a.jpg',
      secondaryCaption: 'Croquis d’architecte : passer d’un bloc unique rigide à un Monolithe Modulaire bien compartimenté.'
    },
    interactiveToolId: 'architecture-schema',
    mentorIntro:
      "Observe le croquis ci-dessus comparant le « Monolith » et le « Modular Monolith » (Monolithe Modulaire). Quand tu crées une application sur Google AI Studio, ton projet vit dans un seul dépôt de code : c'est donc techniquement un monolithe (une seule application déployée). Mais il y a deux façons opposées de construire ce monolithe : le monolithe spaghetti (tout en vrac) ou le Monolithe Modulaire combiné aux grands patrons d'architecture de Sommerville.",
    keyTakeaway:
      'Pour 95 % des projets créés avec l’IA, la meilleure architecture de départ est un Monolithe Modulaire en Couches (un seul projet facile à déployer, mais strictement découpé à l’intérieur en modules et couches indépendantes).',
    sections: [
      {
        id: 'sec-4-1',
        code: 'Sous-module 4.1',
        title: 'Monolithe Classique vs Monolithe Modulaire vs Microservices',
        subtitle: 'Comprendre enfin la différence sans jargon inutile.',
        sommervilleRef: 'Ian Sommerville — Chapitre 6 & Chapitre 18 : Distributed & Modular Architectures',
        mentorVoice:
          "On entend souvent ces trois mots : Monolithe, Monolithe Modulaire, et Microservices. Voici comment un ingénieur senior décide entre les trois.",
        deepDiveParagraphs: [
          "1. Le Monolithe Non-Structuré : Toute l'application tourne ensemble et le code est mélangé. Facile les 10 premières minutes, mais devient un cauchemar dès que le projet grandit.",
          "2. Le Monolithe Modulaire (Modular Monolith — illustré sur le croquis) : Toute l'application est déployée en une seule fois sur un seul serveur (zéro prise de tête réseau), MAIS à l'intérieur du code, une porte d'entrée claire (API) sépare des Modules autonomes (Module 1 : Facturation, Module 2 : Clients, Module 3 : Catalogue) qui respectent chacun leurs couches. C'est l'architecture reine pour créer des logiciels sérieux avec l'IA.",
          "3. Les Microservices : Chaque module devient un programme totalement séparé qui tourne sur un serveur distinct avec sa propre base de données. Utile uniquement quand tu t'appelles Netflix ou Amazon avec 500 ingénieurs, mais beaucoup trop lourd et coûteux pour un projet individuel ou une PME."
        ],
        corePrinciples: [
          {
            heading: 'Quand choisir quel Patron d’Architecture (Guide de Décision)',
            explanation:
              "En plus du découpage modulaire, Sommerville présente 5 grands patrons que tu peux explorer dans le schéma interactif ci-dessous :",
            concreteExample:
              "• Choisis MVC quand les mêmes données sont affichées sous plusieurs formes interactives (tableau + graphique).\n• Choisis Client-Serveur dès qu'il y a une clé secrète (API Gemini, paiement) à protéger dans `server.ts`.\n• Choisis Repository quand plusieurs outils analysent un dossier central commun.\n• Choisis Pipe & Filter quand tu transformes des données étape par étape (import -> nettoyage -> calcul -> export).",
            aiArchitectRule:
              "Tu peux combiner ces patrons ! Par exemple : une application Client-Serveur dont le code interne est organisé en Couches avec un pipeline Pipe & Filter pour ses exports."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-5-lecture-architecture',
    number: '05',
    shortTitle: 'Fonction, Module, Service & 5 Architectures',
    fullTitle: 'Lire une Architecture Logicielle : De la Fonction au Service & 5 Patrons Comparés',
    subtitle:
      'Clarifier définitivement la différence entre fonction, fichier, module et service autonome, entraîner son œil sur les 5 grandes architectures et diriger l’IA sans casser les frontières du projet.',
    sommervilleChapters: 'Pont Pratique — Granularité Logicielle, 5 Architectures Comparées & Audit IA',
    bgTone: 'primary',
    interactiveToolId: 'architecture-reading-lab',
    mentorIntro:
      "Avant de plonger dans l'arborescence technique complète d'un projet réel au Module 06, faisons sauter le principal blocage de tous ceux qui pilotent une IA sans coder : la confusion d'échelle. Quand faut-il isoler une fonction ? Quelle est la vraie différence entre un fichier *Service interne et un Microservice autonome ? Comment reconnaître en 3 secondes une architecture En Couches, MVC, Monolithe Modulaire, Hexagonale ou Microservices ? Manipule les 6 ateliers interactifs ci-dessous dans l'ordre : ton œil d'architecte ne lira plus jamais un projet de la même façon.",
    keyTakeaway:
      'Un bloc commence toujours sa vie en Fonction propre dans un Module interne doté d’un contrat public (index.ts). On ne passe au Service autonome sur le réseau que lorsque des contraintes réelles (charge asymétrique, isolation de pannes, équipes ou stack dédiée) l’imposent objectivement.',
    sections: [],
  },
  {
    id: 'mod-5-arborescence',
    number: '06',
    shortTitle: 'Lire une Arborescence',
    fullTitle: 'Lire une Arborescence pour Repérer une Architecture et Savoir ce que Contient Chaque Fichier',
    subtitle:
      'Apprendre à scanner la liste des dossiers et fichiers d’un projet en 10 secondes pour savoir exactement comment il est construit.',
    sommervilleChapters: 'Sommerville Chapitres 7, 15 & 25 — Implémentation, Réutilisation & Gestion de Configuration',
    bgTone: 'primary-alt',
    schemaImage: {
      src: '/src/assets/images/schema_module4_arborescence_1795020521295.jpg',
      alt: 'Schéma de l’anatomie d’une arborescence de projet logiciel',
      caption: 'La Racine du projet pilote la configuration et la mémoire, tandis que le dossier /src répartit les couches : components/, utils/ et services/.'
    },
    interactiveToolId: 'file-tree',
    mentorIntro:
      "Voici l'une des compétences les plus concrètes que tu voulais acquérir : ouvrir n'importe quel projet logiciel, regarder l'arbre des fichiers à gauche (l'arborescence) sans ouvrir le code, et comprendre immédiatement à quelle architecture tu as affaire et à quoi sert chaque fichier.",
    keyTakeaway:
      'Une arborescence saine ne contient jamais de dossier « fourre-tout » : la racine contient les contrats du projet (`package.json`, `context.md`, `plan.md`, `agents.md`, `server.ts`), et `/src` sépare clairement `components/` (UI), `utils/` (Règles métier), `services/` (Accès données) et `data/` ou `db/` (Schémas et Données).',
    sections: [
      {
        id: 'sec-5-1',
        code: 'Sous-module 6.1',
        title: 'Les Fichiers de la Racine : Les Fondations de l’Immeuble',
        subtitle: 'Comprendre package.json, .env.example, index.html, vite.config.ts et server.ts.',
        sommervilleRef: 'Ian Sommerville — Chapitre 7.3 & Chapitre 25 : System Building & Configuration',
        mentorVoice:
          "Les fichiers situés tout en haut de ton projet (en dehors du dossier `/src`) ne contiennent pas tes écrans : ils définissent comment l'application s'installe, démarre et communique avec le monde extérieur.",
        deepDiveParagraphs: [
          "• `package.json` : C'est le passeport technique et la liste des ingrédients du projet. Si tu veux savoir quelles technologies une application utilise, ouvre uniquement ce fichier : tu y verras la liste `dependencies` (ex: `react` pour l'interface, `express` pour le serveur, `@google/genai` pour l'IA Gemini, `lucide-react` pour les icônes). Tu y verras aussi les commandes `scripts` (`dev` pour travailler, `build` pour préparer la mise en ligne).",
          "• `.env.example` : C'est la liste des clés secrètes et réglages extérieurs dont l'application a besoin pour tourner (comme `GEMINI_API_KEY`). Le mot `.example` signifie que ce fichier montre le nom des clés requises sans jamais contenir le vrai mot de passe secret en clair.",
          "• `server.ts` : C'est le marqueur décisif ! Si tu vois `server.ts` à la racine, tu sais immédiatement que tu es face à une architecture **Client-Serveur Full-Stack**. Ce fichier fait tourner un serveur Node.js/Express qui garde tes secrets à l'abri et répond aux routes `/api/...`.",
          "• `context.md`, `plan.md` et `agents.md` : C'est la mémoire vivante de l'architecte. Ils permettent à tout agent IA de comprendre instantanément ce qui a été décidé, ce qui est fait et quelles règles d'architecture respecter."
        ],
        corePrinciples: [
          {
            heading: 'Comment repérer une architecture rien qu’en lisant les noms des dossiers',
            explanation:
              "Observe l'intérieur du dossier `/src` :\n1) Si tu vois `/src/App.tsx` tout seul sans sous-dossiers -> Architecture Monolithique plate (attention, danger dès que ça grossit !).\n2) Si tu vois `/src/components`, `/src/utils`, `/src/services`, `/src/data` -> Architecture en Couches propre.\n3) Si tu vois `/src/modules/facturation`, `/src/modules/clients` -> Monolithe Modulaire par domaine métier.",
            concreteExample:
              "Utilise l'explorateur interactif ci-dessous pour cliquer sur chaque fichier et voir exactement comment guider l'IA dessus.",
            aiArchitectRule:
              "Interdis toujours à l'IA de créer un dossier vague comme `/src/misc` ou `/src/helpers_divers` : chaque dossier doit correspondre à une couche claire."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-6-donnees-hebergement',
    number: '07',
    shortTitle: 'Données & Hébergeurs Cloud',
    fullTitle: 'Savoir Quel Type de Données et Quel Hébergeur Choisir selon Chaque Cas',
    subtitle:
      'Maîtriser SQL, NoSQL, Stockage de Fichiers, Cache, et savoir choisir son infrastructure d’hébergement (Cloud Run, CDN Statique, BaaS, VPS).',
    sommervilleChapters: 'Sommerville Chapitres 6.3.3, 17 & 18 — Data Repositories, Client-Serveur & Cloud SaaS',
    bgTone: 'primary',
    schemaImage: {
      src: '/src/assets/images/schema_module5_donnees_cloud_1795020522247.jpg',
      alt: 'Schéma du flux entre Client Web, Hébergeur Cloud Run et les 3 types de stockage Cloud',
      caption: 'Le Client Web communique avec l’hébergeur serveur (Cloud Run), qui aiguille chaque donnée vers le bon moteur : SQL, NoSQL Firestore ou Blob Storage.'
    },
    interactiveToolId: 'data-hosting-sim',
    mentorIntro:
      "Deux questions reviennent dans tous les projets logiciels : « Où et sous quelle forme dois-je ranger mes données ? » et « Sur quel type d'hébergeur dois-je publier mon application ? ». Le croquis ci-dessus résume la chaîne complète : voyons méthodiquement comment trancher dans chaque situation.",
    keyTakeaway:
      'Données liées et financières = SQL Relationnel. Données flexibles et temps réel = NoSQL Document (Firestore). Fichiers lourds (PDF, images, vidéos) = Stockage Objet (Blob). Application avec serveur/IA = Conteneur Serverless (Cloud Run). Site sans serveur = CDN Statique.',
    sections: [
      {
        id: 'sec-6-1',
        code: 'Sous-module 7.1',
        title: 'Quel Type de Données Convient dans Quel Cas ?',
        subtitle: 'Les 5 grandes familles de stockage expliquées simplement.',
        sommervilleRef: 'Ian Sommerville — Chapitre 6 & Chapitre 17 : Data Management',
        mentorVoice:
          "Il n'y a pas une seule sorte de base de données, parce qu'une facture comptable, un message de chat en direct et une vidéo de 500 Mo n'ont pas du tout les mêmes besoins.",
        deepDiveParagraphs: [
          "1. Les Bases Relationnelles SQL (PostgreSQL, Cloud SQL) : Range les données dans des tables strictes avec des colonnes fixes reliées entre elles (Clients <-> Commandes <-> Factures). C'est le choix obligatoire dès que tu manipules de l'argent, de la comptabilité, des stocks ou des données très structurées qui ne tolèrent aucune incohérence.",
          "2. Les Bases Document NoSQL Temps Réel (Firebase Firestore, MongoDB) : Range les données sous forme de fiches JSON souples regroupées en collections. Son immense force est le Temps Réel et la souplesse : dès qu'une fiche est modifiée dans la base, tous les écrans connectés se mettent à jour en une fraction de seconde. Idéal pour les profils utilisateurs, les espaces collaboratifs, les tableaux de suivi ou les messageries.",
          "3. Le Stockage Objet / Fichiers (Blob Storage / Cloud Storage / S3) : On ne met JAMAIS un fichier PDF, une photo haute résolution ou un fichier audio à l'intérieur d'une case SQL ou Firestore (cela ralentirait et coûterait très cher). On range le fichier dans un espace de Stockage Objet (Bucket), et on garde uniquement son adresse URL en texte dans la base SQL ou Firestore.",
          "4. Le Cache Clé-Valeur (Redis / Mémoire) et le Stockage Local Navigateur (LocalStorage / IndexedDB) : Le Cache côté serveur sert à garder en mémoire vive un calcul fréquent pour répondre instantanément. Le Stockage Local Navigateur garde des notes ou préférences directement sur le téléphone ou l'ordinateur du visiteur (très utile pour un outil sans inscription ou pour le mode hors-ligne)."
        ],
        corePrinciples: [
          {
            heading: 'La Règle de Combinaison des Données',
            explanation:
              "Un logiciel complet combine souvent deux types de stockage : une base structurée (SQL ou Firestore) pour les informations texte/chiffres, et un Stockage Objet pour les pièces jointes.",
            concreteExample:
              "Sur une plateforme immobilière : les prix, surfaces et adresses sont en base SQL ; les 20 photos de chaque appartement sont en Stockage Objet.",
            aiArchitectRule:
              "Précise toujours à l'IA : « Utilise une base SQL (`src/db/schema.ts`) pour les tables métier reliées, ou Firestore (`firestore.rules`) pour les documents temps réel par utilisateur. »"
          }
        ]
      },
      {
        id: 'sec-6-2',
        code: 'Sous-module 7.2',
        title: 'Quel Choix d’Hébergeur Faire, et en Fonction de Quoi ?',
        subtitle: 'Les 4 critères décisifs : présence d’un serveur, allure du trafic, sécurité et budget.',
        sommervilleRef: 'Ian Sommerville — Chapitre 18 : Cloud Computing, Containers & SaaS',
        mentorVoice:
          "Héberger un logiciel, c'est louer l'endroit sur Internet où ton code va vivre et répondre aux visiteurs. Voici comment choisir sans jamais te tromper.",
        deepDiveParagraphs: [
          "Critère 1 — As-tu un serveur arrière (`server.ts`) ou des clés API secrètes ? Si oui, tu as besoin d'un hébergeur capable d'exécuter du code serveur sécurisé. Le roi moderne dans cette catégorie est le **Conteneur Serverless (comme Google Cloud Run)** : ton application complète est emballée dans un conteneur qui démarre instantanément quand un visiteur arrive, se multiplie automatiquement s'il y a 500 visiteurs d'un coup, et repasse en veille (coût 0 €) la nuit quand personne n'est là.",
          "Critère 2 — Ton application est-elle 100 % côté navigateur sans clé secrète serveur ? Alors choisis un **Hébergement Statique sur CDN (Firebase Hosting, Vercel, Netlify, Cloudflare Pages)**. Tes fichiers compilés sont copiés aux quatre coins du monde : l'affichage est fulgurant et souvent gratuit.",
          "Critère 3 — Veux-tu déléguer toute la gestion des comptes utilisateurs et de la base temps réel ? Choisis une approche **BaaS (Backend-as-a-Service comme Firebase ou Supabase)** qui réunit Authentification, Base de données et Règles de sécurité sous un même toit.",
          "Critère 4 — As-tu un programme lourd qui doit tourner 24h/24 sans jamais s'endormir une seule seconde avec un tarif mensuel fixe ? C'est le seul cas où l'on choisit un **Serveur Virtuel Dédié (VPS / Machine Virtuelle)**, mais attention : il faut savoir l'administrer et le mettre à jour soi-même."
        ],
        corePrinciples: [
          {
            heading: 'La Règle d’Or pour le Cloud : Garder le Serveur « Stateless » (Sans État Local)',
            explanation:
              "Sur un hébergeur moderne comme Cloud Run, le conteneur du serveur peut s'éteindre et se rallumer à tout moment. Si tu enregistres un fichier uniquement sur le disque temporaire du conteneur, il sera effacé au prochain redémarrage !",
            concreteExample:
              "Toutes les données durables doivent être envoyées vers la base externe (Cloud SQL ou Firestore) et jamais stockées dans une simple variable temporaire du serveur.",
            aiArchitectRule:
              "Utilise le simulateur interactif ci-dessous pour tester différentes combinaisons de contraintes et voir la recommandation complète."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-7-qualite-maintenance',
    number: '08',
    shortTitle: 'Sécurité, Tests & Maintenance',
    fullTitle: 'Garantir la Fiabilité, la Sécurité et la Maintenance Long Terme',
    subtitle:
      'Défense en profondeur (Modèle du Fromage Suisse), pyramide des tests automatisés, maîtrise de la dette technique et refactoring.',
    sommervilleChapters: 'Sommerville Chapitres 8, 9, 10, 11, 13 & 25 — Tests, Évolution, Sûreté & Configuration',
    bgTone: 'primary-alt',
    schemaImage: {
      src: '/src/assets/images/schema_module6_securite_tests_1795020529336.jpg',
      alt: 'Schéma des 4 barrières de sécurité et de validation du logiciel',
      caption: 'La Défense en Profondeur : 1. Validation Formulaire (UI) -> 2. Middleware Serveur -> 3. Tests Unitaires & Règles Métier -> 4. Règles Base de Données.'
    },
    interactiveToolId: 'dependability-swiss',
    mentorIntro:
      "Un architecte logiciel ne se contente pas d'un système qui « a l'air de marcher » quand tout va bien. Dans la deuxième partie de son livre (Chapitres 8 à 14), Ian Sommerville explique comment empêcher les pannes, bloquer les intrusions et faire évoluer un logiciel pendant des années sans qu'il devienne un champ de ruines.",
    keyTakeaway:
      'Ne fais jamais confiance uniquement à l’écran (UI) pour la sécurité : superpose toujours 4 barrières indépendantes (UI, Serveur, Règles Métier testées unitairement, et Règles de Base de Données) et planifie un Refactoring régulier.',
    sections: [
      {
        id: 'sec-7-1',
        code: 'Sous-module 8.1',
        title: 'La Défense en Profondeur & Le Modèle du Fromage Suisse',
        subtitle: 'Pourquoi chaque couche doit revérifier ce que lui envoie la couche précédente.',
        sommervilleRef: 'Ian Sommerville — Chapitres 10, 12 & 13 : Dependability, Safety & Security Engineering',
        mentorVoice:
          "James Reason (cité par Sommerville) a créé une image célèbre : le Modèle du Fromage Suisse. Chaque barrière de protection dans ton logiciel est comme une tranche d'emmental : aussi bonne soit-elle, elle comporte quelques petits trous (un cas oublié, un bug humain). Comment éviter qu'un problème traverse tout le système ? En alignant plusieurs tranches de nature différente !",
        deepDiveParagraphs: [
          "Regarde le schéma de ce module : lorsqu'un visiteur soumet une action importante, elle doit traverser 4 barrières successives :",
          "• Barrière 1 (Validation Formulaire UI) : L'interface vérifie immédiatement que les champs obligatoires sont remplis pour guider gentiment l'utilisateur. Mais attention : un pirate peut envoyer une requête directement au serveur sans utiliser ton écran !",
          "• Barrière 2 (Middleware Serveur / API) : À l'entrée du serveur (`server.ts`), un vigile logiciel appelé « Middleware » vérifie que l'utilisateur est bien authentifié et autorisé à appeler cette route.",
          "• Barrière 3 (Règles Métier & Tests Unitaires) : Le moteur métier revérifie mathématiquement que les montants, quantités et statuts respectent les lois de ton activité.",
          "• Barrière 4 (Règles de Base de Données — `firestore.rules` ou contraintes SQL) : Même si une erreur a franchi les 3 premières étapes, la base de données refuse d'écrire une donnée qui viole ses règles de propriété ou de format."
        ],
        corePrinciples: [
          {
            heading: 'Vérification vs Validation (La Distinction de Barry Boehm)',
            explanation:
              "• La Vérification : « Construisons-nous le logiciel correctement ? » (les calculs sont justes, pas d'erreurs techniques, les tests unitaires passent).\n• La Validation : « Construisons-nous le BON logiciel ? » (il répond vraiment au besoin humain réel avec une interface claire).",
            concreteExample:
              "Un test unitaire (`mentorEngine.test.ts`) assure la Vérification ; ouvrir l'application dans un vrai navigateur pour contrôler l'ergonomie assure la Validation.",
            aiArchitectRule:
              "Exige toujours ces deux contrôles à la fin de chaque étape importante."
          },
          {
            heading: 'Dette Technique & Refactoring',
            explanation:
              "Au Chapitre 9 (Software Evolution), Sommerville montre que chaque modification rapide alourdit la structure du code : c'est la Dette Technique. Le Refactoring est l'opération d'entretien qui consiste à ranger, renommer et découper les fichiers devenus trop longs SANS changer les fonctionnalités visibles.",
            concreteExample:
              "Si un fichier dépasse 500 lignes, demande à l'IA : « Fais un refactoring de ce fichier en extrayant les sous-composants dans `src/components/` sans modifier le comportement. »",
            aiArchitectRule:
              "Un bon architecte consacre 1 prompt sur 5 au nettoyage et au refactoring préventif."
          }
        ]
      }
    ]
  },
  {
    id: 'mod-8-pilotage-ia-projet',
    number: '09',
    shortTitle: 'Piloter l’IA & Projet Final',
    fullTitle: 'Guider l’IA comme un Architecte Senior & Construire ton Projet Final',
    subtitle:
      'La méthode complète des 3 fichiers directeurs (context.md, plan.md, agents.md), les scénarios réels Google AI Studio et ton projet de fin de formation à réaliser.',
    sommervilleChapters: 'Synthèse Appliquée — Ingénierie Assistée par IA & Études de Cas Complètes',
    bgTone: 'primary',
    schemaImage: {
      src: '/src/assets/images/schema_module7_pilotage_ia_1795020524992.jpg',
      alt: 'Schéma du pilotage de l’IA par l’Architecte via context.md, plan.md et agents.md',
      caption: 'Le triangle de commandement de l’Architecte : ta vision et tes règles métier pilotent l’IA à travers context.md (Mémoire), plan.md (Incréments) et agents.md (Architecture).'
    },
    interactiveToolId: 'capstone-project',
    mentorIntro:
      "Tu possèdes désormais toute la boîte à outils intellectuelle d'un Ingénieur Logiciel Senior. Dans ce dernier module, nous assemblons la méthode exacte pour diriger l'IA au quotidien sans jamais perdre le contrôle du code, tu t'entraînes sur deux scénarios réels, puis tu passes à l'action avec ton **Projet Final de Fin de Formation**.",
    keyTakeaway:
      'Tu n’as pas besoin d’écrire le code toi-même pour être un grand architecte logiciel : tant que tu gouvernes la mémoire (`context.md`), le découpage séquentiel (`plan.md`), les lois d’architecture (`agents.md`) et les règles métier pures (`src/utils/`), l’IA exécutera un logiciel d’une propreté exemplaire.',
    sections: [
      {
        id: 'sec-8-1',
        code: 'Sous-module 9.1',
        title: 'Le Système des 3 Fichiers Directeurs : context.md, plan.md et agents.md',
        subtitle: 'Comment donner une mémoire infaillible et une discipline d’ingénieur à l’IA.',
        sommervilleRef: 'Méthodologie d’Architecture Assistée par IA & Documentation Vivante',
        mentorVoice:
          "Pourquoi beaucoup d'utilisateurs voient-ils leur projet se dégrader au bout de 15 messages avec une IA ? Parce que la conversation s'allonge et que l'IA oublie les décisions prises au début. Ta méthode des 3 fichiers directeurs à la racine du projet résout définitivement ce problème.",
        deepDiveParagraphs: [
          "1. `context.md` (La Mémoire Globale et le Fil Conducteur) : Il réunit tout ce qui est dit, pensé, décidé et prévu pour le projet. Il explique la vision métier, ce qui est déjà construit, ce qu'il reste à faire maintenant, et ce qui est prévu pour les futures versions (v1.1, v2.0). N'importe quel agent IA qui ouvre ce fichier comprend tout l'historique en 2 secondes.",
          "2. `plan.md` (La Feuille de Route et la Méthode de Développement) : Il découpe le travail en incréments ordonnés et précise la méthode d'ingénierie suivie (découplage de la logique pure, tests unitaires, vérification visuelle).",
          "3. `agents.md` (La Constitution Technique et Visuelle) : Il fixe les lois non négociables pour l'IA : l'architecture en couches obligatoire, l'interdiction des dossiers fourre-tout, les 4 palettes de couleurs et le style minimaliste respirant."
        ],
        corePrinciples: [
          {
            heading: 'Anatomie d’un Prompt d’Architecte Parfait sur Google AI Studio',
            explanation:
              "Au lieu d'écrire « Ajoute un système de devis », formule toujours ta demande en 4 phrases :\n1) Le But Métier et la Règle exacte.\n2) La Couche et les Fichiers où ranger le code (`src/utils/`, `src/components/`).\n3) Les Contraintes Visuelles et d'État (chargement, erreur, sobriété).\n4) La Mise à jour documentaire (`context.md`, `plan.md`) et les Tests.",
            concreteExample:
              "« Crée le calcul de devis dans `src/utils/quoteEngine.ts` avec ses tests unitaires, affiche le simulateur dans un composant épuré `src/components/QuoteSimulator.tsx` respectant nos 4 palettes, et mets à jour `context.md` et `plan.md`. »",
            aiArchitectRule:
              "Avec cette structure en 4 points, tu parles d'égal à égal avec n'importe quel ingénieur senior."
          }
        ]
      }
    ]
  }
];

export const CAPSTONE_PROJECT_SPEC = {
  title: 'Projet Final à Construire : « MediFlow Studio » (Gestion de Cabinet & Triage Intelligent)',
  subtitle:
    'Mets en pratique toute ta formation en concevant et en pilotant de A à Z cette application réelle dans un nouveau projet Google AI Studio.',
  missionBrief:
    "Tu es nommé Architecte Logiciel Principal pour créer « MediFlow Studio », une application web permettant à une clinique locale de : 1) Enregistrer des demandes de rendez-vous patients, 2) Calculer automatiquement un score de priorité médicale selon des règles métier strictes (âge, symptômes, antécédents), 3) Visualiser la file d'attente par ordre d'urgence, et 4) Sauvegarder les brouillons même si la connexion Internet de l'accueil vacille.",
  architecturalConstraints: [
    'Architecture exigée : Monolithe Modulaire en Couches (Présentation dans /src/components, Règles métier dans /src/utils, Accès données et synchro dans /src/services, Données types dans /src/data).',
    'Règle métier pure obligatoire : Le calcul du score de priorité (de 1 à 100) doit être 100 % isolé dans `/src/utils/triageEngine.ts` et vérifié par `/src/utils/triageEngine.test.ts`.',
    'Design System : Police DM Sans, 4 palettes de couleurs (Fond primaire clair respirant, Texte secondaire contrasté, Cartes tertiaires plates à bordure fine 1px sans ombre, États quaternaires pour l’urgence et la validation), zéro carte KPI inutile et zéro pilule de texte.',
    'Documentation vivante : Créer et tenir à jour `/context.md`, `/plan.md` et `/agents.md` dès le premier incrément.'
  ],
  milestones: [
    {
      id: 'ms-1',
      number: 'Mission 01',
      title: 'Poser les Fondations & Les 3 Fichiers Directeurs',
      subtitle: 'Définir le cadre d’ingénierie avant de générer l’interface.',
      objective:
        'Demander à l’IA d’initialiser `/context.md`, `/plan.md`, `/agents.md` ainsi que les contrats de données dans `/src/types.ts` (PatientRequest, PriorityLevel, TriageResult).',
      deliverables: ['/context.md', '/plan.md', '/agents.md', '/src/types.ts'],
      architectChecklist: [
        'Les exigences fonctionnelles et non-fonctionnelles sont écrites dans context.md',
        'Les 4 palettes de couleurs et l’interdiction des pilules/ombres sont dans agents.md',
        'Le découpage en 4 incréments est listé dans plan.md'
      ],
      promptToUse:
        "Agis en Ingénieur Logiciel Senior. Nous lançons le projet « MediFlow Studio ». Pour ce premier incrément : 1) Crée `/context.md`, `/plan.md` et `/agents.md` définissant une architecture modulaire en couches, la police DM Sans, nos 4 palettes de couleurs sur cartes plates sans ombre et sans pilules. 2) Crée les interfaces TypeScript dans `/src/types.ts` pour les demandes patients et le score de triage."
    },
    {
      id: 'ms-2',
      number: 'Mission 02',
      title: 'Construire et Tester la Couche Logique Métier Pure',
      subtitle: 'Isoler le cerveau de calcul loin des boutons de l’écran.',
      objective:
        'Faire coder le moteur de règles métier dans `/src/utils/triageEngine.ts` (ex: douleur thoracique = priorité critique immédiate ; âge > 75 ans + fièvre = priorité haute) et ses tests unitaires.',
      deliverables: ['/src/utils/triageEngine.ts', '/src/utils/triageEngine.test.ts'],
      architectChecklist: [
        'Aucune dépendance à React ni à window dans triageEngine.ts',
        'Au moins 4 règles métier claires et vérifiables',
        'Tous les tests unitaires passent au vert'
      ],
      promptToUse:
        "Passons à l'Incrément 2 (Couche Métier Pure). Crée dans `/src/utils/triageEngine.ts` les fonctions pures qui calculent le score de priorité (0 à 100) et le niveau d'urgence d'un patient selon son âge, ses symptômes et la durée des signes. Crée ensuite `/src/utils/triageEngine.test.ts` et exécute les tests unitaires pour prouver que les règles métier sont exactes."
    },
    {
      id: 'ms-3',
      number: 'Mission 03',
      title: 'Créer la Couche Service & Résilience Hors-Ligne',
      subtitle: 'Gérer les données et s’adapter à la contrainte de coupure réseau.',
      objective:
        'Créer `/src/services/patientQueueService.ts` et `/src/data/initialPatients.ts` pour gérer le CRUD (Créer, Lire, Mettre à jour le statut, Archiver) avec une sauvegarde locale automatique.',
      deliverables: ['/src/data/initialPatients.ts', '/src/services/patientQueueService.ts'],
      architectChecklist: [
        'Séparation nette entre les données initiales (/src/data) et le service (/src/services)',
        'Sauvegarde dans LocalStorage pour ne rien perdre si la page est rechargée',
        'Fonctions de tri par score d’urgence décroissant'
      ],
      promptToUse:
        "Passons à l'Incrément 3 (Couche Accès aux Données). Crée un jeu de cas réalistes dans `/src/data/initialPatients.ts` et crée le service `/src/services/patientQueueService.ts` qui gère les opérations CRUD de la file d'attente avec persistance locale de secours. Mets à jour `/context.md` et `/plan.md`."
    },
    {
      id: 'ms-4',
      number: 'Mission 04',
      title: 'Assembler la Couche Présentation Minimaliste & Vérifier',
      subtitle: 'Construire une interface respirante, lisible et centrée sur l’action.',
      objective:
        'Créer `/src/components/TriageForm.tsx` et `/src/components/QueueBoard.tsx` assemblés dans `/src/App.tsx` avec un style minimaliste en DM Sans, grand titre, sous-titre et espaces généreux.',
      deliverables: ['/src/components/TriageForm.tsx', '/src/components/QueueBoard.tsx', '/src/App.tsx'],
      architectChecklist: [
        'Chaque section commence par un Grand Titre, un Sous-titre et un contenu aéré',
        'Les composants visuels appellent le service et le moteur métier sans contenir eux-mêmes les formules de calcul',
        'Validation visuelle complète sur ordinateur et mobile'
      ],
      promptToUse:
        "Terminons avec l'Incrément 4 (Couche Présentation). Crée `/src/components/TriageForm.tsx` et `/src/components/QueueBoard.tsx`, puis assemble-les dans `/src/App.tsx`. Utilise un design très minimaliste avec DM Sans, de grands espaces respirants, nos 4 palettes de couleurs (cartes plates à bordure fine 1px pour les formulaires et contrôles, états quaternaires pour les priorités médicales), et mets à jour `/context.md` et `/plan.md`."
    }
  ] as CapstoneMilestone[]
};

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
      "1) `dependencies` : les bibliothèques utilisées par l'application (React, Lucide icons, Express, Gemini SDK). 2) `scripts` : les commandes comme `dev` (lancer le serveur de travail), `build` (compiler pour la production) et `lint` (vérifier les erreurs).",
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
      "Le titre de l'onglet (`<title>`), la description pour Google et les réseaux sociaux (`<meta property='og:...'>`), le chargement des polices d'écriture (DM Sans), et la boîte `<div id='root'></div>` dans laquelle React va dessiner toute l'application.",
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
          "`main.tsx` branche l'application React dans `index.html`. `index.css` contient les variables de tes 4 palettes de couleurs et la police DM Sans globale.",
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
          "Un fichier par grand bloc visuel : ex. `InteractiveArchitectureDiagram.tsx`, `FileTreeExplorer.tsx`, `DecisionSimulator.tsx`, `CapstoneProjectLab.tsx`.",
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
    name: 'Base Document NoSQL Temps Réel (Firestore)',
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
