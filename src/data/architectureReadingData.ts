export type ScaleKey = 'fonction' | 'fichier' | 'module' | 'service';

export interface ScaleLevelItem {
  key: ScaleKey;
  levelLabel: string;
  shortTitle: string;
  title: string;
  metaphor: string;
  rule: string;
  sayToAI: string;
  tree: string;
}

export type XrayPartKey = 'decl' | 'name' | 'params' | 'body' | 'return';

export interface XrayPartInfo {
  key: XrayPartKey;
  codeText: string;
  title: string;
  text: string;
  check: string;
}

export type ExtractionCriterionKey = 'reused' | 'multi' | 'critical' | 'long' | 'trivial';

export interface CriterionOption<K extends string> {
  key: K;
  title: string;
  description: string;
  isCounterCriterion?: boolean;
}

export type ConversionCriterionKey = 'scale' | 'fault' | 'team' | 'stack' | 'security';

export type FiveArchKey = 'layered' | 'mvc' | 'modular' | 'hexagonal' | 'microservices';

export interface ArchTreeNodeLine {
  id: string | null;
  text: string;
}

export interface ArchNodeInspectorDetail {
  nature: string;
  role: string;
  deps: string;
  aiGood: string;
  aiMistake: string;
}

export interface FiveArchitectureItem {
  key: FiveArchKey;
  tabLabel: string;
  name: string;
  tagline: string;
  flow: string;
  defaultNode: string;
  nodes: ArchTreeNodeLine[];
  details: Record<string, ArchNodeInspectorDetail>;
}

export interface RadarTableRow {
  architecture: string;
  direction: string;
  clues: string;
  businessLocation: string;
}

export type DirectiveKey = 'feature' | 'extract' | 'bug' | 'refuse' | 'migrate';

export interface AiDirectiveComparison {
  key: DirectiveKey;
  tabLabel: string;
  badQuote: string;
  badWhy: string;
  goodQuote: string;
  goodWhy: string;
}

export interface AuditQuizCase {
  id: string;
  context: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SCALE_LEVELS: ScaleLevelItem[] = [
  {
    key: 'fonction',
    levelLabel: 'Niveau 1',
    shortTitle: 'Fonction',
    title: "La Fonction — L'unité d'action élémentaire",
    metaphor:
      'Dans un restaurant : un geste précis de recette, comme « calculer la TVA d’un plat » ou « vérifier si un ingrédient est en stock ».',
    rule: 'Une bonne fonction fait UNE seule chose claire, prend des entrées précises et retourne un résultat prévisible.',
    sayToAI:
      '« Extrais le calcul de remise dans une fonction dédiée calculerRemise(montant, code) dans la couche métier. »',
    tree: `orderRules.ts
  ├── calculerTotalCommande(...)  ← FONCTION
  └── verifierStockDisponible(...) ← FONCTION`,
  },
  {
    key: 'fichier',
    levelLabel: 'Niveau 2',
    shortTitle: 'Fichier',
    title: 'Le Fichier — Un regroupement cohérent de fonctions liées',
    metaphor:
      'Dans un restaurant : une fiche de poste qui rassemble les 4 ou 5 gestes qui vont ensemble (ex. toutes les vérifications liées aux commandes).',
    rule: 'Un fichier regroupe des fonctions qui partagent la même responsabilité et le même niveau technique (jamais UI + DB dans le même fichier).',
    sayToAI:
      '« Regroupe toutes les fonctions de validation de commande dans le fichier domain/orderRules.ts. »',
    tree: `modules/orders/domain/
  ├── orderRules.ts       ← FICHIER (calculs)
  └── orderValidation.ts  ← FICHIER (contrôles)`,
  },
  {
    key: 'module',
    levelLabel: 'Niveau 3',
    shortTitle: 'Module',
    title: 'Le Module — Un compartiment métier complet dans la même app',
    metaphor:
      'Dans un restaurant : toute la cuisine (chefs, recettes, frigo du poste). Elle est séparée de la salle, mais dans le même bâtiment et la même équipe.',
    rule: "Un module contient tout ce qui concerne un domaine métier (UI, règles, accès données) et communique avec les autres modules via une porte d'entrée unique (index.ts) sans réseau.",
    sayToAI:
      '« Crée un module autonome modules/invoices/ et expose uniquement la fonction creerFacture dans son index.ts. »',
    tree: `src/modules/orders/     ← MODULE (même app)
  ├── ui/CheckoutPage.tsx
  ├── domain/orderRules.ts
  ├── data/orderRepo.ts
  └── index.ts            ← Porte publique`,
  },
  {
    key: 'service',
    levelLabel: 'Niveau 4',
    shortTitle: 'Service autonome',
    title: 'Le Service autonome — Une application indépendante sur le réseau',
    metaphor:
      'Un prestataire externe (ex. un boulanger indépendant ou un livreur externe) : il a son propre bâtiment, son propre stock, et tu lui passes commande par téléphone.',
    rule: 'Un service possède son propre serveur, sa propre base de données et son propre déploiement. Les autres services lui parlent uniquement via le réseau (API ou événements).',
    sayToAI:
      "« Ce module reste un module pour l'instant : ne crée pas de microservice ni de serveur séparé. »",
    tree: `services/payment-service/ ← SERVICE (réseau)
  ├── src/           (code interne dédié)
  ├── db/            (SA propre base DB)
  ├── package.json   (ses dépendances)
  └── Dockerfile     (déploiement isolé)`,
  },
];

export const FUNCTION_XRAY_PARTS: Record<XrayPartKey, XrayPartInfo> = {
  decl: {
    key: 'decl',
    codeText: 'function',
    title: '1. La déclaration',
    text: "Ce mot-clé signale à ton œil qu'une brique d'action commence ici. En TypeScript ou JavaScript moderne, l'IA utilise indifféremment la forme classique ou la syntaxe fléchée présentées dans le bloc ci-dessous : le sens architectural est strictement identique.",
    check:
      'Réflexe de lecture : repère les accolades ouvrante et fermante qui délimitent le début et la fin de la boîte.',
  },
  name: {
    key: 'name',
    codeText: 'calculerTotalCommande',
    title: '2. Le nom d’action',
    text: "Le nom d'une fonction doit toujours être un verbe d'action qui décrit son unique intention. C'est ton meilleur indicateur de qualité sans lire une seule ligne du code interne.",
    check:
      "Signal d'alerte : si le nom est trop vague ou enchaîne plusieurs verbes reliés par « Et », la fonction cumule plusieurs responsabilités et doit être découpée.",
  },
  params: {
    key: 'params',
    codeText: '(articles, tauxReduction)',
    title: '3. Les entrées (paramètres)',
    text: "Ce sont les ingrédients remis à la fonction pour qu'elle travaille. Ici, elle reçoit uniquement la liste d'articles et le taux de réduction, rien d'autre.",
    check:
      "Signal d'alerte : au-delà de 4 paramètres séparés, la fonction devient fragile. Demande à l'IA de les regrouper dans un seul objet typé clair.",
  },
  body: {
    key: 'body',
    codeText: `const sousTotal = additionnerPrix(articles);\n  const remise = sousTotal * tauxReduction;`,
    title: '4. Le corps (la recette interne)',
    text: "Ce sont les étapes de calcul. Remarque la bonne pratique illustrée ci-dessous : la fonction délègue l'addition des prix à une autre petite fonction spécialisée au lieu de tout empiler dans un bloc géant.",
    check:
      "Signal d'alerte : si tu aperçois dans le même corps du calcul métier, une requête base de données et un appel d'affichage visuel, les couches sont mélangées.",
  },
  return: {
    key: 'return',
    codeText: 'return sousTotal - remise;',
    title: '5. La sortie (résultat renvoyé)',
    text: "C'est le résultat propre que la fonction renvoie à l'appelant. Une fonction métier idéale calcule et retourne une valeur prévisible sans modifier secrètement l'écran ni la base de données.",
    check:
      "Réflexe anti-casse : quand tu demandes à l'IA d'améliorer une fonction, précise toujours de conserver exactement la même signature (mêmes entrées et même type de sortie).",
  },
};

export const EXTRACTION_CRITERIA: CriterionOption<ExtractionCriterionKey>[] = [
  {
    key: 'reused',
    title: 'Elle sert à plusieurs endroits (2 ou plus)',
    description:
      'Ex. : le calcul de TVA apparaît sur le panier, la facture et le récapitulatif email.',
  },
  {
    key: 'multi',
    title: 'Elle mélange deux métiers différents',
    description:
      'Ex. : dans le même bloc, elle calcule un prix, enregistre en base de données et affiche une alerte.',
  },
  {
    key: 'critical',
    title: 'Elle porte une règle métier critique ou évolutive',
    description:
      "Ex. : règles de remise, contrôle de droits d'accès ou validation de stock qui risquent de changer.",
  },
  {
    key: 'long',
    title: 'Le bloc est devenu long ou dur à résumer en une phrase',
    description:
      "Au-delà d'environ 30 à 40 lignes, ou si tu dois utiliser le mot « et » trois fois pour l'expliquer.",
  },
  {
    key: 'trivial',
    title: 'Contre-critère : petite logique de 2 à 5 lignes utilisée à un seul endroit',
    description: 'Ex. : formater une date pour un seul titre de page ou ouvrir un menu local.',
    isCounterCriterion: true,
  },
];

export const MODULE_VS_SERVICE_COMPARISON = {
  modulePoints: [
    'Vit dans le même programme et la même mémoire que les autres modules.',
    'Regroupe tout un domaine métier dans un dossier isolé (ex. modules/orders/).',
    'Appelle un autre module directement via son contrat public index.ts (instantané, sans réseau).',
    'Partage généralement le même déploiement que le reste du projet.',
    'Simple à déboguer, simple à faire évoluer avec une IA.',
  ],
  servicePoints: [
    'Est un logiciel indépendant avec son propre serveur et son propre Dockerfile.',
    'Possède sa propre base de données privée (jamais partagée directement).',
    'Communique uniquement par le réseau (API HTTP, gRPC ou messages/événements).',
    'Se déploie et monte en charge indépendamment du reste de la plateforme.',
    'Introduit de la latence, des pannes réseau et une complexité opérationnelle lourde.',
  ],
};

export const CONVERSION_CRITERIA: CriterionOption<ConversionCriterionKey>[] = [
  {
    key: 'scale',
    title: 'Charge très asymétrique (Scalabilité ciblée)',
    description:
      'Ce module encaisse 20x à 100x plus de trafic ou de calcul que le reste (ex. : recherche catalogue, traitement vidéo ou génération IA lourde).',
  },
  {
    key: 'fault',
    title: 'Isolation critique des pannes',
    description:
      "Si ce bloc sature ou plante, le reste de l'application doit impérativement continuer de tourner sans ralentir.",
  },
  {
    key: 'team',
    title: 'Équipes et déploiements indépendants',
    description:
      'Plusieurs équipes distinctes travaillent en parallèle et doivent déployer ce bloc sans attendre ni bloquer les autres.',
  },
  {
    key: 'stack',
    title: "Besoin d'une technologie ou d'un matériel incompatible",
    description:
      "Ex. : l'app principale est en Node.js/TypeScript, mais ce bloc exige Python + GPU dédié.",
  },
  {
    key: 'security',
    title: 'Isolation réglementaire ou sécurité physique stricte',
    description:
      'Ex. : données de paiement ou données médicales devant être isolées dans un réseau et une base dédiés.',
  },
];

export const FIVE_ARCHITECTURES: FiveArchitectureItem[] = [
  {
    key: 'layered',
    tabLabel: '1. En Couches',
    name: 'Architecture en Couches (Layered / N-Tier)',
    tagline:
      'Découpage horizontal par rôle technique. Simple, lisible, idéale pour démarrer proprement.',
    flow: 'Dépendances : presentation → business → data',
    defaultNode: 'business/orderService.ts',
    nodes: [
      { id: null, text: 'boutique-app/' },
      { id: null, text: '├── src/' },
      { id: 'presentation/', text: '│   ├── presentation/  # Couche 1 : UI' },
      { id: 'presentation/CheckoutPage.tsx', text: '│   │   ├── pages/CheckoutPage.tsx' },
      { id: null, text: '│   │   └── components/OrderSummary.tsx' },
      { id: 'business/', text: '│   ├── business/  # Couche 2 : Métier' },
      { id: 'business/orderService.ts', text: '│   │   ├── orderService.ts' },
      { id: null, text: '│   │   └── productService.ts' },
      { id: 'data/', text: '│   ├── data/  # Couche 3 : Données' },
      { id: 'data/orderRepository.ts', text: '│   │   ├── orderRepository.ts' },
      { id: null, text: '│   │   └── stripeClient.ts' },
      { id: 'entities/Order.ts', text: '│   └── entities/Order.ts  # Modèles' },
      { id: null, text: '├── context.md' },
      { id: null, text: '├── plan.md' },
      { id: null, text: '└── agents.md' },
    ],
    details: {
      'presentation/': {
        nature: 'Couche Présentation (Interface Utilisateur)',
        role: "Affiche les écrans, capture les clics et les formulaires. Ne contient aucune règle de calcul complexe et n'accède jamais directement à la base de données.",
        deps: "Peut appeler business/. Interdiction absolue d'importer data/ directement.",
        aiGood:
          '« Ajoute le champ code promo dans presentation/pages/CheckoutPage.tsx et transmets sa valeur à business/orderService.ts. »',
        aiMistake:
          "Demander à l'IA de calculer la remise et d'enregistrer en DB directement dans le bouton de la page.",
      },
      'presentation/CheckoutPage.tsx': {
        nature: 'Fichier de Vue / Page UI',
        role: "Affiche le récapitulatif et déclenche l'action de validation lorsque l'utilisateur clique sur « Payer ».",
        deps: "Appelle une fonction exposée par business/orderService.ts et affiche l'état (chargement, succès, erreur).",
        aiGood:
          "« Garde CheckoutPage.tsx focalisé sur l'affichage et l'état UI ; délègue toute validation de panier à la couche business. »",
        aiMistake:
          'Laisser la page grossir au-delà de 300 lignes en y empilant des règles métier.',
      },
      'business/': {
        nature: "Couche Métier (Cerveau de l'application)",
        role: "Regroupe toutes les règles de fonctionnement de ton entreprise : remises, vérification de stock, droits d'accès, calculs.",
        deps: 'Appelée par presentation/. Appelle data/ pour lire ou sauvegarder. Ne connaît rien au CSS ni aux boutons.',
        aiGood:
          "« Toute nouvelle règle de calcul de frais de livraison doit vivre dans business/, pas dans l'UI. »",
        aiMistake:
          'Confondre cette couche avec un microservice : ici tout reste dans la même application.',
      },
      'business/orderService.ts': {
        nature: 'Fichier de fonctions métier (*Service interne — PAS un microservice !)',
        role: "Contient les fonctions métier liées aux commandes (ex. creerCommande, calculerTotal). C'est le piège de vocabulaire n°1 : le mot « Service » signifie ici « fournisseur de logique métier ».",
        deps: 'Appelle data/orderRepository.ts et data/stripeClient.ts. Appelé par presentation/.',
        aiGood:
          '« Ajoute une fonction appliquerCodePromo dans business/orderService.ts sans modifier la couche data. »',
        aiMistake:
          "Croire qu'il faut un serveur séparé parce que le fichier s'appelle orderService.ts.",
      },
      'data/': {
        nature: 'Couche Données / Accès externe',
        role: "S'occupe uniquement de parler à la base de données (SQL, Firestore) et aux API externes (Stripe, envoi d'emails).",
        deps: 'Appelée par business/. Ne doit jamais importer presentation/ ni prendre de décisions métier.',
        aiGood:
          '« Isole les requêtes Firestore dans data/ pour pouvoir changer de base plus tard sans toucher au métier. »',
        aiMistake:
          'Mettre des règles de calcul de prix dans les requêtes de base de données.',
      },
      'data/orderRepository.ts': {
        nature: 'Fichier Repository (Persistance pure)',
        role: 'Contient des fonctions simples de lecture/écriture : sauvegarderCommande, trouverCommandeParId. Aucune règle métier dedans.',
        deps: 'Utilise entities/Order.ts. Appelé uniquement par business/orderService.ts.',
        aiGood:
          '« Ajoute une fonction listerCommandesUtilisateur(userId) dans data/orderRepository.ts. »',
        aiMistake:
          'Appeler orderRepository.ts directement depuis une page UI pour « aller plus vite ».',
      },
      'entities/Order.ts': {
        nature: 'Définition de structure de données',
        role: "Décrit la « forme » officielle d'une Commande (id, articles, total, statut) afin que toutes les couches parlent exactement le même langage.",
        deps: "Utilisé par toutes les couches. Ne dépend d'aucune couche.",
        aiGood:
          "« Mets d'abord à jour le modèle dans entities/Order.ts, puis adapte business/ et data/ en conséquence. »",
        aiMistake:
          'Ajouter un champ dans la base de données sans mettre à jour le modèle partagé.',
      },
    },
  },
  {
    key: 'mvc',
    tabLabel: '2. MVC / MVVM',
    name: 'Architecture MVC / MVVM (Modèle – Vue – Contrôleur)',
    tagline:
      'Découpage tripartite centré sur le cycle Requête utilisateur → Contrôleur → Modèle → Affichage.',
    flow: 'Flux : Route → Controller → Model → Controller → View',
    defaultNode: 'controllers/OrderController.ts',
    nodes: [
      { id: null, text: 'boutique-app/' },
      { id: null, text: '├── src/' },
      { id: 'routes/webRoutes.ts', text: '│   ├── routes/webRoutes.ts  # Aiguillage' },
      { id: 'controllers/OrderController.ts', text: '│   ├── controllers/OrderController.ts' },
      { id: null, text: '│   │   └── CatalogController.ts' },
      { id: 'models/OrderModel.ts', text: '│   ├── models/OrderModel.ts  # Données' },
      { id: null, text: '│   │   └── ProductModel.ts' },
      { id: 'views/orders/checkout.html', text: '│   └── views/orders/checkout.html  # Vue' },
      { id: null, text: '├── context.md' },
      { id: null, text: '└── agents.md' },
    ],
    details: {
      'routes/webRoutes.ts': {
        nature: "Table d'aiguillage",
        role: 'Relie chaque adresse (ex. POST /commandes) à la bonne fonction du Contrôleur. Ne contient aucune logique.',
        deps: 'Pointe vers controllers/. Ne touche jamais directement aux models/.',
        aiGood:
          '« Ajoute la route POST /commandes/annuler et relie-la à OrderController.annuler. »',
        aiMistake: 'Écrire toute la logique de traitement directement dans le fichier de routes.',
      },
      'controllers/OrderController.ts': {
        nature: "Contrôleur (Chef d'orchestre — ou ViewModel en MVVM)",
        role: 'Reçoit la requête utilisateur, vérifie son format, demande au Model de lire/écrire, puis choisit quelle Vue renvoyer. Doit rester mince et léger.',
        deps: 'Appelle models/ et renvoie views/.',
        aiGood:
          '« Garde OrderController léger : il orchestre uniquement, la logique de calcul reste dans le modèle ou un fichier métier dédié. »',
        aiMistake:
          'Le syndrome du « Fat Controller » : entasser 300 lignes de logique métier dans le contrôleur.',
      },
      'models/OrderModel.ts': {
        nature: 'Modèle (Données + accès persistance)',
        role: "Représente les commandes, gère la lecture/écriture en base de données et valide l'intégrité des données.",
        deps: 'Ne connaît rien aux views/ ni aux routes HTTP.',
        aiGood: '« Ajoute la validation du statut de commande dans models/OrderModel.ts. »',
        aiMistake:
          "Formater du HTML ou des messages d'interface directement dans le Modèle.",
      },
      'views/orders/checkout.html': {
        nature: 'Vue (Affichage pur)',
        role: "Reçoit des données déjà prêtes de la part du Contrôleur et les affiche proprement à l'écran.",
        deps: 'Ne fait aucun calcul critique et ne parle jamais à la base de données.',
        aiGood:
          '« Modifie uniquement la mise en page dans views/orders/checkout.html sans toucher au contrôleur. »',
        aiMistake: 'Demander à la Vue de recalculer les totaux ou d’interroger la base de données.',
      },
    },
  },
  {
    key: 'modular',
    tabLabel: '3. Monolithe Modulaire',
    name: 'Monolithe Modulaire (Feature-Based / Vertical Slice)',
    tagline:
      'Découpage vertical par domaine métier. Une seule application, mais chaque fonctionnalité est une brique isolée.',
    flow: 'Règle : modules/A → modules/B/index.ts uniquement (zéro accès interne)',
    defaultNode: 'modules/orders/index.ts',
    nodes: [
      { id: null, text: 'boutique-app/' },
      { id: null, text: '├── src/' },
      { id: null, text: '│   ├── modules/  # Découpage MÉTIER' },
      { id: 'modules/catalog/', text: '│   │   ├── catalog/  # Module Catalogue' },
      { id: null, text: '│   │   │   ├── ui/CatalogPage.tsx' },
      { id: null, text: '│   │   │   ├── domain/productRules.ts' },
      { id: null, text: '│   │   │   └── index.ts' },
      { id: 'modules/orders/', text: '│   │   └── orders/  # Module Commandes' },
      { id: null, text: '│   │       ├── ui/CheckoutPage.tsx' },
      { id: 'modules/orders/domain/orderRules.ts', text: '│   │       ├── domain/orderRules.ts' },
      { id: null, text: '│   │       ├── data/orderRepo.ts' },
      { id: 'modules/orders/index.ts', text: '│   │       └── index.ts  # Contrat public' },
      { id: 'shared/database/', text: '│   └── shared/database/  # Socle commun' },
      { id: null, text: '├── context.md' },
      { id: null, text: '└── agents.md' },
    ],
    details: {
      'modules/catalog/': {
        nature: 'Module Métier Autonome (dans le même programme)',
        role: 'Contient tout le nécessaire pour gérer le catalogue produits (UI, règles, accès DB). Si tu supprimes ce dossier, tu supprimes toute la feature proprement.',
        deps: 'Indépendant. Les autres modules ne connaissent que son fichier index.ts.',
        aiGood:
          '« Travaille uniquement dans modules/catalog/ pour ajouter les filtres de catégorie. »',
        aiMistake:
          'Importer un composant interne de orders/ depuis catalog/ en contournant index.ts.',
      },
      'modules/orders/': {
        nature: 'Module Métier Commandes',
        role: "Regroupe en un seul endroit l'écran de commande, les calculs métier et l'accès aux données des commandes. Idéal pour déléguer à une IA car tout le contexte est regroupé.",
        deps: "Si orders a besoin d'un prix produit, il appelle catalog/index.ts, jamais catalog/data/.",
        aiGood:
          "« Garde toute la nouvelle fonctionnalité de coupons à l'intérieur du module orders/. »",
        aiMistake: 'Éparpiller des fichiers liés aux commandes dans shared/.',
      },
      'modules/orders/domain/orderRules.ts': {
        nature: "Fichier de Fonctions Métier Pures (à l'intérieur d'un module)",
        role: "Contient les fonctions métier critiques du module Commandes (calcul de total, vérification d'éligibilité). Facile à auditer et isoler.",
        deps: 'Aucune dépendance vers ui/ ou la base de données.',
        aiGood:
          '« Extrais la logique de remise dans une fonction dédiée dans modules/orders/domain/orderRules.ts. »',
        aiMistake: 'Placer un appel API Stripe dans orderRules.ts au lieu de data/.',
      },
      'modules/orders/index.ts': {
        nature: 'Interface Publique / Contrat du Module (La frontière sacrée)',
        role: "Liste explicitement les seules fonctions que les autres modules ont le droit d'appeler. C'est ce fichier qui permet, plus tard, de convertir éventuellement le module en service sans tout casser.",
        deps: "Point d'entrée unique depuis l'extérieur du module.",
        aiGood:
          '« Expose uniquement la fonction creerCommande dans modules/orders/index.ts ; garde le reste privé au module. »',
        aiMistake:
          "Laisser l'IA importer directement modules/orders/data/orderRepo.ts depuis un autre module.",
      },
      'shared/database/': {
        nature: 'Socle technique partagé (strictement minimal)',
        role: 'Contient uniquement la connexion technique commune (ex. client DB, composants UI de base du design system). Ne contient aucune règle métier.',
        deps: "Peut être utilisé par les modules. Ne dépend jamais d'aucun module.",
        aiGood:
          "« N'ajoute rien dans shared/ qui soit spécifique aux commandes ou au catalogue. »",
        aiMistake: 'Transformer shared/ en dossier fourre-tout géant.',
      },
    },
  },
  {
    key: 'hexagonal',
    tabLabel: '4. Hexagonale / Clean',
    name: 'Architecture Hexagonale / Clean (Ports & Adapters)',
    tagline:
      'Découpage concentrique. Le métier pur est au centre absolu ; la technique se branche autour comme des adaptateurs.',
    flow: "Inversion : infrastructure → application → domain (le centre n'importe RIEN)",
    defaultNode: 'application/ports/PaymentGatewayPort.ts',
    nodes: [
      { id: null, text: 'boutique-app/' },
      { id: null, text: '├── src/' },
      { id: 'domain/entities/Order.ts', text: '│   ├── domain/entities/Order.ts  # Cœur pur' },
      { id: null, text: '│   ├── application/' },
      { id: 'application/use-cases/PlaceOrder.ts', text: '│   │   ├── use-cases/PlaceOrder.ts' },
      { id: 'application/ports/PaymentGatewayPort.ts', text: '│   │   └── ports/PaymentGatewayPort.ts' },
      { id: null, text: '│   └── infrastructure/' },
      {
        id: 'infrastructure/adapters/primary/OrderHttpController.ts',
        text: '│       ├── adapters/primary/OrderHttpController.ts',
      },
      {
        id: 'infrastructure/adapters/secondary/StripePaymentAdapter.ts',
        text: '│       ├── adapters/secondary/StripePaymentAdapter.ts',
      },
      { id: 'infrastructure/config/container.ts', text: '│       └── config/container.ts  # Câblage' },
      { id: null, text: '└── agents.md' },
    ],
    details: {
      'domain/entities/Order.ts': {
        nature: 'Cœur Métier (Sanctuaire zéro dépendance)',
        role: 'Contient les règles fondamentales de ton métier. Ce dossier ne connaît ni SQL, ni Firestore, ni React, ni Stripe. Il reste identique même si tu changes toute la technique.',
        deps: "ZÉRO import extérieur. C'est le seul dossier qui ne dépend de rien.",
        aiGood:
          "« Vérifie que domain/ n'importe aucune bibliothèque externe ni aucun outil d'infrastructure. »",
        aiMistake:
          "Importer Firebase ou Axios dans domain/ : cela détruit l'intérêt même de l'architecture hexagonale.",
      },
      'application/use-cases/PlaceOrder.ts': {
        nature: "Cas d'Usage (Scénario métier complet)",
        role: "Décrit étape par étape l'action « Passer une commande » en utilisant le domain et des interfaces abstraites (Ports), sans savoir quelle DB ou quel prestataire de paiement est derrière.",
        deps: 'Dépend de domain/ et de application/ports/. Ignore infrastructure/.',
        aiGood:
          "« Crée un nouveau cas d'usage CancelOrder.ts dans application/use-cases/ qui s'appuie uniquement sur les ports existants. »",
        aiMistake: "Instancier directement Stripe à l'intérieur du cas d'usage.",
      },
      'application/ports/PaymentGatewayPort.ts': {
        nature: 'Port (Prise électrique / Contrat abstrait)',
        role: "Définit ce que le métier attend d'un système de paiement (ex. une fonction débiter(montant)), sans dire comment c'est fait. N'importe quel prestataire pourra se brancher sur cette prise.",
        deps: 'Défini côté application, implémenté côté infrastructure.',
        aiGood:
          "« Définis d'abord l'interface dans application/ports/ avant d'écrire l'intégration technique. »",
        aiMistake: 'Modifier le Port pour y faire apparaître des noms spécifiques à Stripe.',
      },
      'infrastructure/adapters/primary/OrderHttpController.ts': {
        nature: "Adapter Primaire (Porte d'entrée)",
        role: "Traduit un appel extérieur (une requête HTTP, un clic UI, une commande CLI) en appel vers un cas d'usage (PlaceOrder).",
        deps: 'Appelle application/use-cases/.',
        aiGood:
          "« Garde l'adapter HTTP purement traducteur : il lit la requête, appelle PlaceOrder et renvoie le code HTTP. »",
        aiMistake: "Mettre des règles métier dans l'adapter HTTP.",
      },
      'infrastructure/adapters/secondary/StripePaymentAdapter.ts': {
        nature: 'Adapter Secondaire (Branchement technique interchangeable)',
        role: "Implémente concrètement le Port PaymentGatewayPort en parlant à l'API Stripe. Demain, tu peux écrire PayPalPaymentAdapter.ts sans toucher une seule ligne du métier.",
        deps: 'Implémente un Port de application/ports/.',
        aiGood:
          '« Remplace Stripe par PayPal en créant un nouvel adapter qui respecte PaymentGatewayPort, sans toucher à domain/ ni application/. »',
        aiMistake:
          "Réécrire tout le projet juste parce qu'on change de base de données ou de prestataire.",
      },
      'infrastructure/config/container.ts': {
        nature: 'Câblage (Injection de dépendances)',
        role: "Le seul fichier qui branche concrètement les prises : il dit à PlaceOrder d'utiliser StripePaymentAdapter et PostgresOrderRepository.",
        deps: 'Connaît les use-cases et les adapters pour les assembler au démarrage.',
        aiGood:
          '« Branche le nouvel adapter PayPal uniquement dans infrastructure/config/container.ts. »',
        aiMistake: 'Faire le branchement dans plusieurs fichiers éparpillés.',
      },
    },
  },
  {
    key: 'microservices',
    tabLabel: '5. Microservices',
    name: 'Architecture Microservices (Systèmes distribués)',
    tagline:
      'Découpage physique en plusieurs applications autonomes qui communiquent par le réseau.',
    flow: 'Réseau : Client → api-gateway → services indépendants + événements',
    defaultNode: 'services/order-service/',
    nodes: [
      { id: null, text: 'boutique-platform/' },
      { id: 'api-gateway/', text: '├── api-gateway/  # Guichet unique' },
      { id: null, text: '├── services/' },
      { id: 'services/order-service/', text: '│   ├── order-service/  # Service 1' },
      { id: null, text: '│   │   ├── src/' },
      { id: 'services/order-service/db/', text: '│   │   ├── db/  # Sa propre DB privée' },
      { id: null, text: '│   │   ├── package.json' },
      { id: null, text: '│   │   └── Dockerfile' },
      { id: 'services/payment-service/', text: '│   └── payment-service/  # Service 2' },
      { id: null, text: '│       ├── src/' },
      { id: null, text: '│       ├── db/' },
      { id: null, text: '│       └── Dockerfile' },
      {
        id: 'contracts/events/OrderCreated.schema.json',
        text: '├── contracts/events/OrderCreated.schema.json',
      },
      { id: 'infra/docker-compose.yml', text: '└── infra/docker-compose.yml  # Orchestration' },
    ],
    details: {
      'api-gateway/': {
        nature: 'Passerelle API (Guichet unique)',
        role: "Reçoit toutes les requêtes des utilisateurs, vérifie l'authentification, limite les abus et redirige vers le bon service interne.",
        deps: 'Communique par le réseau avec les services. Ne contient pas la logique métier des services.',
        aiGood:
          '« Configure uniquement le routage et la vérification de session dans api-gateway/. »',
        aiMistake: 'Mettre des calculs de commande dans la passerelle.',
      },
      'services/order-service/': {
        nature: 'Service Autonome complet (Mini-application déployable seule)',
        role: "Gère tout le cycle de vie des commandes. Possède son propre serveur, son propre package.json et son propre Dockerfile. À l'intérieur de son src/, il peut utiliser une architecture en Couches ou Hexagonale.",
        deps: 'Ne partage aucun code mémoire avec payment-service. Communique uniquement par API ou événements.',
        aiGood:
          '« Assure-toi que order-service peut démarrer et fonctionner même si payment-service est momentanément lent. »',
        aiMistake:
          'Créer des microservices sur un projet solo au démarrage : 10x plus complexe sans bénéfice.',
      },
      'services/order-service/db/': {
        nature: 'Base de données privée du service',
        role: "Règle absolue des microservices : chaque service est seul propriétaire de sa base. Aucun autre service n'a le droit d'y lire ou d'y écrire directement.",
        deps: 'Accessible uniquement par order-service.',
        aiGood:
          "« payment-service ne doit jamais requêter la base de order-service ; il reçoit les infos via l'événement OrderCreated. »",
        aiMistake:
          'Partager une seule table SQL modifiable par 4 services (le « monolithe distribué », pire des deux mondes).',
      },
      'services/payment-service/': {
        nature: 'Second Service Autonome',
        role: "Gère isolément les paiements (sécurité renforcée, déploiement indépendant). Écoute l'événement OrderCreated pour déclencher le règlement.",
        deps: "Totalement découplé du code de order-service. Dépend uniquement du contrat d'événement.",
        aiGood:
          "« Gère les tentatives de réessai (retry) en cas d'échec réseau dans payment-service. »",
        aiMistake:
          "Oublier qu'un appel réseau entre deux services peut échouer ou répondre en retard.",
      },
      'contracts/events/OrderCreated.schema.json': {
        nature: 'Contrat de communication inter-services',
        role: "Décrit officiellement la structure du message envoyé sur le réseau quand une commande est créée, pour que order-service et payment-service restent compatibles.",
        deps: 'Versionné et partagé en lecture seule entre services.',
        aiGood:
          "« N'enlève jamais un champ existant dans OrderCreated.schema.json sans prévoir une compatibilité descendante. »",
        aiMistake:
          "Renommer un champ dans un service sans prévenir les autres services qui l'écoutent.",
      },
      'infra/docker-compose.yml': {
        nature: 'Orchestration réseau & déploiement',
        role: 'Décrit comment lancer simultanément tous les services, leurs bases de données séparées et leur réseau privé.',
        deps: 'Pilote les Dockerfile de chaque service.',
        aiGood:
          "« Mets à jour infra/docker-compose.yml pour déclarer les variables d'environnement sans secrets en dur. »",
        aiMistake:
          'Lancer des microservices sans avoir pensé au monitoring et au débogage distribué.',
      },
    },
  },
];

export const RADAR_TABLE_ROWS: RadarTableRow[] = [
  {
    architecture: '1. En Couches',
    direction: 'Horizontal (technique)',
    clues: 'presentation/, business/, data/',
    businessLocation: 'Dans business/ (fichiers *Service)',
  },
  {
    architecture: '2. MVC / MVVM',
    direction: 'Tripartite (interaction)',
    clues: 'models/, views/, controllers/',
    businessLocation: 'Dans les models/ (ou services appelés par le contrôleur)',
  },
  {
    architecture: '3. Monolithe Modulaire',
    direction: 'Vertical (métier)',
    clues: 'modules/orders/, index.ts',
    businessLocation: 'Dans le dossier domain/ de chaque module',
  },
  {
    architecture: '4. Hexagonale / Clean',
    direction: 'Concentrique (isolation)',
    clues: 'domain/, ports/, adapters/',
    businessLocation: 'Strictement dans domain/ et use-cases/',
  },
  {
    architecture: '5. Microservices',
    direction: 'Distribué (réseau)',
    clues: 'services/*, Dockerfile, api-gateway/',
    businessLocation: 'Dans le src/ interne de chaque service autonome',
  },
];

export const AI_DIRECTIVES: AiDirectiveComparison[] = [
  {
    key: 'feature',
    tabLabel: 'Ajouter une règle métier',
    badQuote:
      "« Ajoute la possibilité de mettre un code promo sur la page de paiement et vérifie qu'il est valide dans la base de données. »",
    badWhy:
      "Trop vague sur les couches : l'IA risque d'écrire la requête base de données et le calcul de remise directement dans le composant visuel de la page paiement.",
    goodQuote:
      "« Ajoute la gestion des codes promo en respectant nos couches : 1) la lecture du code dans data/, 2) la validation et le calcul de remise dans une fonction dédiée de business/, 3) uniquement le champ de saisie et l'affichage du résultat dans presentation/. Mets à jour plan.md avant de coder. »",
    goodWhy:
      'Tu guides les frontières sans écrire une ligne de code : chaque couche reste propre, testable et facile à modifier.',
  },
  {
    key: 'extract',
    tabLabel: 'Sortir une fonction',
    badQuote:
      '« Ce fichier est trop long, coupe-le et mets des fonctions à part dans un dossier utils. »',
    badWhy:
      "Tu viens de créer un dossier fourre-tout sans sens métier et tu n'as pas verrouillé les entrées/sorties : risque élevé de casser les appels existants.",
    goodQuote:
      "« La fonction validerCommande fait trop de choses (calcul + stock + email). Découpe-la en 3 petites fonctions cohérentes dans la couche business/ (pas de dossier utils/ fourre-tout), en conservant exactement les mêmes entrées/sorties pour les fichiers qui l'appellent. »",
    goodWhy:
      'Découpage chirurgical, zéro dossier poubelle et compatibilité garantie avec le reste du projet.',
  },
  {
    key: 'bug',
    tabLabel: 'Corriger un bug ciblé',
    badQuote: '« Le total de la commande est faux, corrige ça vite. »',
    badWhy:
      "Parfois l'IA « bricole » un pansement rapide dans l'affichage UI pour masquer un mauvais calcul dans la couche métier — ce qui crée des incohérences graves ailleurs.",
    goodQuote:
      "« Le total affiché est faux. Identifie d'abord si l'erreur vient de la fonction de calcul dans business/ ou de l'affichage dans presentation/. Explique-moi la cause en 3 lignes avant de corriger uniquement la couche responsable. »",
    goodWhy:
      "Tu imposes la démarche d'ingénieur (diagnostic avant réparation) et tu empêches les rustines dans la mauvaise couche.",
  },
  {
    key: 'refuse',
    tabLabel: 'Refuser un fourre-tout',
    badQuote: '« Supprime le dossier utils et mets tout dans le fichier principal. »',
    badWhy:
      'Tu vas créer un fichier monstre illisible et casser tous les imports pointant vers utils/.',
    goodQuote:
      "« Je vois que tu as créé un dossier utils/ fourre-tout. Redispatche chaque fonction dans la couche ou le module métier qui lui correspond, mets à jour tous les imports associés, puis supprime utils/. Vérifie qu'aucune référence cassée ne reste. »",
    goodWhy: 'Reclassement propre, aucune référence orpheline, arborescence maintenue intacte.',
  },
  {
    key: 'migrate',
    tabLabel: 'Isoler avant un service',
    badQuote:
      '« Transforme mon module de facturation en microservice maintenant pour que ce soit pro. »',
    badWhy:
      'Sur-ingénierie prématurée : tu ajoutes un serveur, du réseau et une deuxième base de données à gérer sans besoin réel.',
    goodQuote:
      "« Garde la facturation comme un module interne (modules/billing/), mais verrouille strictement sa frontière : aucun autre module ne doit toucher à sa base ni à ses fichiers internes ; tout passe par son contrat public modules/billing/index.ts. Ainsi, il sera prêt à devenir un service le jour où la charge l'exigera. »",
    goodWhy:
      "Tu obtiens 90 % des bénéfices de l'isolation avec 0 % de la complexité réseau.",
  },
];

export const AUDIT_QUIZ_CASES: AuditQuizCase[] = [
  {
    id: 'audit-case-1',
    context: `src/
├── domain/
│   └── entities/Booking.ts
├── application/
│   ├── use-cases/CreateBooking.ts
│   └── ports/CalendarPort.ts
└── infrastructure/
    └── adapters/secondary/GoogleCalendarAdapter.ts`,
    question:
      "1. Quelle architecture reconnais-tu immédiatement ici, et où dois-tu demander à l'IA d'ajouter une nouvelle règle interdisant de réserver le dimanche ?",
    options: [
      'Architecture en Couches — à placer dans infrastructure/',
      'Architecture Hexagonale / Clean — à placer dans domain/ (ou use-cases/), jamais dans GoogleCalendarAdapter',
      'Architecture Microservices — il faut créer un nouveau Dockerfile pour le dimanche',
      'Architecture MVC — à placer dans le contrôleur',
    ],
    correctIndex: 1,
    explanation:
      "Les dossiers domain/, use-cases/, ports/ et adapters/ sont la signature absolue de l'Architecture Hexagonale (Clean). Une règle métier (« pas de réservation le dimanche ») appartient strictement au cœur métier (domain/ ou use-cases/), totalement indépendante de Google Calendar.",
  },
  {
    id: 'audit-case-2',
    context: `src/
├── presentation/pages/ProfilePage.tsx   (importe directement firebaseDb !)
├── business/userService.ts
└── data/userRepository.ts`,
    question:
      '2. Dans cette architecture en couches, tu repères que ProfilePage.tsx parle directement à la base de données. Quel est le problème exact ?',
    options: [
      "Aucun problème, c'est plus rapide",
      'Il manque un dossier utils/ pour faire le lien',
      'Violation de couche : presentation/ saute par-dessus business/ et data/, créant un couplage interdit',
      'Il faut immédiatement transformer userService.ts en microservice',
    ],
    correctIndex: 2,
    explanation:
      "En architecture en couches, les dépendances descendent proprement : presentation → business → data. Si une page UI parle directement à la base, changer de base ou ajouter une règle de sécurité plus tard obligera à fouiller toute l'interface.",
  },
  {
    id: 'audit-case-3',
    context: `function finaliserInscription(user) {
  // 1. Vérifie le format de l'email (15 lignes)
  // 2. Calcule le plan tarifaire (25 lignes)
  // 3. Sauvegarde l'utilisateur en base de données (20 lignes)
  // 4. Envoie l'email de bienvenue (30 lignes)
}`,
    question: "3. L'IA a généré cette fonction de 90 lignes. Quelle décision d'ingénieur prends-tu ?",
    options: [
      "La laisser telle quelle puisqu'elle fonctionne",
      'La découper en fonctions distinctes réparties dans leurs bonnes responsabilités (validation/métier, persistance, notification), en gardant une fonction courte qui les orchestre',
      'Déplacer ses 90 lignes intactes dans un dossier helpers/',
      "Transformer l'envoi d'email en un serveur Kubernetes séparé",
    ],
    correctIndex: 1,
    explanation:
      "Cette fonction cumule 4 responsabilités différentes et dépasse 90 lignes. La découper proprement permet de modifier le tarif ou le fournisseur d'email sans risquer de casser l'enregistrement en base.",
  },
  {
    id: 'audit-case-4',
    context: `Projet : Application interne utilisée par 150 personnes.
Module concerné : modules/reports/ (génère 10 PDF par jour).
Question du fondateur : « Faut-il transformer reports en microservice séparé ? »`,
    question: "4. En te basant sur les critères d'ingénierie, quel est ton arbitrage ?",
    options: [
      'Oui, les microservices sont toujours la meilleure architecture',
      "Oui, dès qu'il y a plus de 2 modules il faut passer en microservices",
      "Non : aucune charge asymétrique, aucune équipe séparée ni panne critique. Il doit rester un Module propre avec son contrat index.ts",
      'Non, il faut plutôt tout fusionner dans un seul fichier sans modules',
    ],
    correctIndex: 2,
    explanation:
      "10 PDF par jour pour 150 utilisateurs ne justifie aucunement le coût réseau, le déploiement multiple et la complexité d'un microservice. Un Module bien isolé dans un Monolithe Modulaire est le choix rigoureux.",
  },
  {
    id: 'audit-case-5',
    context: `boutique-app/
├── package.json         (un seul pour tout le projet)
└── src/
    ├── presentation/
    ├── business/
    │   └── paymentService.ts
    └── data/`,
    question:
      '5. Tu vois le fichier paymentService.ts dans cette arborescence. Que peux-tu affirmer avec certitude ?',
    options: [
      "C'est un microservice déployé sur un serveur séparé",
      "C'est un simple fichier de couche métier interne dans une seule application (le mot « Service » au sens interne)",
      "C'est un fichier d'interface visuelle",
      "C'est une base de données autonome",
    ],
    correctIndex: 1,
    explanation:
      "Un seul package.json, aucun Dockerfile multiple, pas de dossier services/ ni d'api-gateway/ : paymentService.ts est simplement un fichier contenant des fonctions métier au sein d'une architecture en couches.",
  },
];
