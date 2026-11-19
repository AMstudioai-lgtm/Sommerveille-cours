import {
  ARCHITECTURE_PATTERNS,
  DATA_MODEL_OPTIONS,
  GLOSSARY_TERMS,
  HOSTING_OPTIONS,
  PROJECT_FILE_TREE,
  type ArchitecturePattern,
  type DataModelOption,
  type FileTreeNode,
  type GlossaryTerm,
  type HostingOption,
} from '../data/curriculumData';

export interface ProjectConstraintsInput {
  projectType: 'interactive-multi-view' | 'enterprise-saas' | 'shared-medical-records' | 'file-processing-pipeline' | 'ai-secret-api';
  dataRelationship: 'strict-financial-relations' | 'flexible-realtime-docs' | 'large-media-files' | 'temporary-local-only';
  trafficPattern: 'spiky-serverless' | 'static-global' | 'realtime-auth-baas' | 'continuous-heavy-vm';
  offlineRequired: boolean;
}

export interface ArchitectRecommendation {
  recommendedArchitecture: ArchitecturePattern;
  recommendedDataModel: DataModelOption;
  recommendedHosting: HostingOption;
  supplementaryOfflineStrategy: string | null;
  mentorJustification: string[];
  suggestedFolderBlueprint: string[];
  aiStudioMasterPrompt: string;
}

/**
 * Pure decision engine recommending the optimal software architecture,
 * database family, hosting provider, folder blueprint, and AI Studio prompt
 * based on user-selected constraints.
 */
export function evaluateArchitectDecision(input: ProjectConstraintsInput): ArchitectRecommendation {
  let archId: ArchitecturePattern['id'] = 'layered';

  if (input.projectType === 'interactive-multi-view') {
    archId = 'mvc';
  } else if (input.projectType === 'shared-medical-records') {
    archId = 'repository';
  } else if (input.projectType === 'file-processing-pipeline') {
    archId = 'pipe-filter';
  } else if (input.projectType === 'ai-secret-api') {
    archId = 'client-server';
  } else {
    archId = 'layered';
  }

  const recommendedArchitecture =
    ARCHITECTURE_PATTERNS.find((p) => p.id === archId) ?? ARCHITECTURE_PATTERNS[0];

  let dataId: DataModelOption['id'] = 'sql-relational';
  if (input.dataRelationship === 'strict-financial-relations') {
    dataId = 'sql-relational';
  } else if (input.dataRelationship === 'flexible-realtime-docs') {
    dataId = 'nosql-document';
  } else if (input.dataRelationship === 'large-media-files') {
    dataId = 'blob-storage';
  } else {
    dataId = 'local-browser';
  }

  const recommendedDataModel =
    DATA_MODEL_OPTIONS.find((d) => d.id === dataId) ?? DATA_MODEL_OPTIONS[0];

  let hostId: HostingOption['id'] = 'cloud-run-containers';
  if (input.trafficPattern === 'static-global' && input.projectType !== 'ai-secret-api') {
    hostId = 'static-edge-cdn';
  } else if (input.trafficPattern === 'realtime-auth-baas') {
    hostId = 'baas-serverless';
  } else if (input.trafficPattern === 'continuous-heavy-vm') {
    hostId = 'vps-dedicated';
  } else {
    hostId = 'cloud-run-containers';
  }

  const recommendedHosting =
    HOSTING_OPTIONS.find((h) => h.id === hostId) ?? HOSTING_OPTIONS[0];

  const supplementaryOfflineStrategy = input.offlineRequired
    ? "Stratégie Local-First activée : ajouter un cache navigateur (IndexedDB / LocalStorage) dans la couche de service avec une file de synchronisation automatique dès le retour de la connexion."
    : null;

  const mentorJustification: string[] = [
    `Architecture retenue (${recommendedArchitecture.name}) : ${recommendedArchitecture.summary}`,
    `Modèle de données (${recommendedDataModel.name}) : ${recommendedDataModel.aiArchitectAdvice}`,
    `Hébergement (${recommendedHosting.name}) : ${recommendedHosting.whenToChoose}`
  ];

  if (supplementaryOfflineStrategy) {
    mentorJustification.push(supplementaryOfflineStrategy);
  }

  const suggestedFolderBlueprint: string[] = [
    '/context.md  (Vision, décisions d’architecture et état du projet)',
    '/plan.md     (Découpage en incréments vérifiables)',
    '/agents.md   (Règles techniques et système de design à 4 palettes)'
  ];

  if (archId === 'client-server' || hostId === 'cloud-run-containers') {
    suggestedFolderBlueprint.push('/server.ts   (Serveur Express sécurisant les clés API et routes /api/*)');
    suggestedFolderBlueprint.push('/.env.example (Variables d’environnement requises sans secrets en clair)');
  }

  if (dataId === 'sql-relational') {
    suggestedFolderBlueprint.push('/src/db/schema.ts (Schéma relationnel strict des tables SQL)');
  } else if (dataId === 'nosql-document') {
    suggestedFolderBlueprint.push('/firestore.rules  (Règles de sécurité et contrôle d’accès par rôle)');
  }

  suggestedFolderBlueprint.push(
    '/src/types.ts     (Contrats de données TypeScript partagés)',
    '/src/utils/       (Règles métier pures découplées + tests unitaires .test.ts)',
    '/src/services/    (Communication réseau, synchronisation et accès aux données)',
    '/src/components/  (Composants visuels modulaires sans logique métier cachée)'
  );

  const aiStudioMasterPrompt = [
    `Agis comme un Ingénieur Logiciel Senior.`,
    `Structure ce projet selon une ${recommendedArchitecture.name}.`,
    `1) Découple toutes les règles métier et calculs dans /src/utils/ sous forme de fonctions pures testées unitairement.`,
    `2) Organise les données pour un modèle ${recommendedDataModel.name}${input.offlineRequired ? ' avec un tampon de secours hors-ligne dans /src/services/' : ''}.`,
    `3) Garde les composants visuels dans /src/components/ propres et maintiens à jour /context.md et /plan.md.`
  ].join(' ');

  return {
    recommendedArchitecture,
    recommendedDataModel,
    recommendedHosting,
    supplementaryOfflineStrategy,
    mentorJustification,
    suggestedFolderBlueprint,
    aiStudioMasterPrompt
  };
}

/**
 * Flatten the hierarchical project file tree so any node can be looked up or filtered by layer/query.
 */
export function flattenFileTree(nodes: FileTreeNode[] = PROJECT_FILE_TREE): FileTreeNode[] {
  const result: FileTreeNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children && node.children.length > 0) {
      result.push(...flattenFileTree(node.children));
    }
  }
  return result;
}

/**
 * Filter glossary terms by search query and category.
 */
export function filterGlossaryTerms(
  query: string,
  category: GlossaryTerm['category'] | 'all' = 'all',
  terms: GlossaryTerm[] = GLOSSARY_TERMS
): GlossaryTerm[] {
  const normalizedQuery = query.trim().toLowerCase();
  return terms.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.term.toLowerCase().includes(normalizedQuery) ||
      item.simpleDefinition.toLowerCase().includes(normalizedQuery) ||
      item.whenAiSaysIt.toLowerCase().includes(normalizedQuery) ||
      item.relatedTerms.some((rel) => rel.toLowerCase().includes(normalizedQuery))
    );
  });
}

/**
 * Calculate overall curriculum mastery percentage based on completed module IDs and scenario steps.
 */
export function calculateMasteryProgress(
  completedModuleIds: string[],
  totalModulesCount: number,
  solvedScenarioStepsCount: number,
  totalScenarioStepsCount: number
): { percentage: number; rankLabel: string; statusTone: 'neutral' | 'active' | 'success' } {
  const safeTotalModules = Math.max(1, totalModulesCount);
  const safeTotalSteps = Math.max(1, totalScenarioStepsCount);

  const moduleRatio = Math.min(1, completedModuleIds.length / safeTotalModules);
  const scenarioRatio = Math.min(1, solvedScenarioStepsCount / safeTotalSteps);

  const weighted = Math.round((moduleRatio * 0.65 + scenarioRatio * 0.35) * 100);

  let rankLabel = 'Apprenti Concepteur';
  let statusTone: 'neutral' | 'active' | 'success' = 'neutral';

  if (weighted >= 80) {
    rankLabel = 'Architecte Logiciel Accompli';
    statusTone = 'success';
  } else if (weighted >= 35) {
    rankLabel = 'Ingénieur Structure & Flux';
    statusTone = 'active';
  }

  return {
    percentage: weighted,
    rankLabel,
    statusTone
  };
}

export interface ExtractionCriteriaState {
  reused: boolean;
  multi: boolean;
  critical: boolean;
  long: boolean;
  trivial: boolean;
}

export interface ExtractionVerdict {
  tone: 'neutral' | 'success' | 'warning' | 'danger';
  statusLabel: string;
  title: string;
  body: string;
  prompt: string | null;
}

/**
 * Pure rule engine deciding whether a code block/function should be extracted
 * into its own dedicated function based on objective engineering criteria.
 */
export function evaluateFunctionExtraction(state: ExtractionCriteriaState): ExtractionVerdict {
  const positiveCount =
    (state.reused ? 1 : 0) +
    (state.multi ? 1 : 0) +
    (state.critical ? 1 : 0) +
    (state.long ? 1 : 0);

  if (positiveCount === 0 && !state.trivial) {
    return {
      tone: 'neutral',
      statusLabel: 'En attente de critères',
      title: 'Sélectionne au moins un critère ci-dessus',
      body: "Coche ce que tu observes dans le bloc généré par l'IA pour obtenir le verdict d'ingénierie et la directive exacte à lui donner.",
      prompt: null,
    };
  }

  if (state.trivial && positiveCount === 0) {
    return {
      tone: 'warning',
      statusLabel: 'Ne pas sur-découper',
      title: 'Verdict : Laisse-la sur place (ne pas sur-découper)',
      body: "Une opération de 2 à 5 lignes qui ne sert qu'à un seul endroit est plus lisible là où elle est. La sortir maintenant ajouterait de la complexité inutile sans bénéfice.",
      prompt:
        '« Garde cette petite logique localement dans ce fichier pour le moment ; ne crée pas de fichier utilitaire séparé. »',
    };
  }

  if (state.multi) {
    return {
      tone: 'danger',
      statusLabel: 'Extraction indispensable',
      title: 'Verdict : Extraction indispensable (mélange de responsabilités)',
      body: "C'est le cas le plus urgent : une fonction qui fait deux métiers différents finit toujours par créer des bugs en cascade. Il faut séparer chaque responsabilité dans sa propre fonction et sa bonne couche.",
      prompt:
        '« Ce bloc mélange plusieurs responsabilités. Découpe-le en fonctions distinctes placées dans leurs couches respectives (calcul dans business/, persistance dans data/, affichage dans presentation/), en conservant exactement les mêmes entrées/sorties côté appelant. »',
    };
  }

  return {
    tone: 'success',
    statusLabel: 'Extraction recommandée',
    title: 'Verdict : Oui, mets cette fonction à part proprement',
    body: `Tu as coché ${positiveCount} critère${positiveCount > 1 ? 's' : ''} solide${positiveCount > 1 ? 's' : ''}. Isoler cette fonction dans le bon dossier métier rendra le code plus sûr à modifier et évitera les copier-coller.`,
    prompt:
      "« Extrais cette logique dans une fonction nommée clairement (verbe d'action) dans le dossier métier correspondant — sans créer de dossier utils/ fourre-tout — et mets à jour les appels existants sans changer le comportement. »",
  };
}

export interface ConversionCriteriaState {
  scale: boolean;
  fault: boolean;
  team: boolean;
  stack: boolean;
  security: boolean;
}

export interface ConversionVerdict {
  score: number;
  tone: 'success' | 'active' | 'warning';
  statusLabel: string;
  title: string;
  body: string;
  prompt: string;
}

/**
 * Pure rule engine arbitrating whether an internal Module should remain a module
 * or be extracted into an independent networked Service.
 */
export function evaluateModuleToServiceConversion(
  state: ConversionCriteriaState
): ConversionVerdict {
  const score =
    (state.scale ? 1 : 0) +
    (state.fault ? 1 : 0) +
    (state.team ? 1 : 0) +
    (state.stack ? 1 : 0) +
    (state.security ? 1 : 0);

  if (score === 0) {
    return {
      score,
      tone: 'success',
      statusLabel: 'Conserver en Module',
      title: 'Verdict : Garde-le impérativement en Module interne',
      body: "Aucun critère ne justifie la lourdeur d'un service autonome. Passer en microservice maintenant ralentirait chaque modification et multiplierait les pannes réseau inutiles.",
      prompt:
        '« Garde cette fonctionnalité en module interne dans modules/. Ne crée ni serveur séparé ni microservice. »',
    };
  }

  if (score === 1) {
    return {
      score,
      tone: 'active',
      statusLabel: 'Module étanche recommandé',
      title: 'Verdict : Reste en Module, mais verrouille son contrat public',
      body: "Un seul signal apparaît. Ce n'est généralement pas encore suffisant pour payer le prix d'un système distribué. La stratégie d'ingénieur : rendre le module 100 % étanche aujourd'hui (via son index.ts) pour pouvoir l'extraire facilement plus tard si besoin.",
      prompt:
        '« Isole strictement ce module : aucune importation directe de ses fichiers internes ni de ses tables depuis les autres modules. Tout passe par son fichier index.ts. »',
    };
  }

  return {
    score,
    tone: 'warning',
    statusLabel: `Candidat Service (${score}/5)`,
    title: `Verdict : Candidat légitime à la conversion en Service (${score}/5 critères)`,
    body: "Les contraintes de charge, d'isolation ou d'organisation justifient une séparation physique. Procède par étapes : 1) définir le contrat d'API/événements, 2) séparer les données, 3) extraire le serveur dédié.",
    prompt:
      "« Prépare un plan de migration dans plan.md pour extraire ce module en service autonome : commence par définir le contrat d'API/événements et l'isolation de sa base de données avant de toucher au code. »",
  };
}

