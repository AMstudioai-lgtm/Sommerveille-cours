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
