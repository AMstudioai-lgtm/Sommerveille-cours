export const PROGRESS_STORAGE_KEY = 'architecte_logiciel_progress_v1';
export const PROGRESS_SCHEMA_VERSION = 1;

export const DEFAULT_CAPSTONE_PROJECT_NAME = 'MediFlow Studio';
export const DEFAULT_CAPSTONE_BUSINESS_RULE =
  'Calculer un score de priorité médicale (0 à 100) selon les symptômes, l’âge et les antécédents.';

export interface LearnerProgressState {
  version: number;
  completedModules: string[];
  solvedScenarioSteps: string[];
  capstoneCheckedMilestones: string[];
  capstoneProjectName: string;
  capstoneBusinessRule: string;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function createDefaultProgress(): LearnerProgressState {
  return {
    version: PROGRESS_SCHEMA_VERSION,
    completedModules: ['mod-1-fondations'],
    solvedScenarioSteps: [],
    capstoneCheckedMilestones: [],
    capstoneProjectName: DEFAULT_CAPSTONE_PROJECT_NAME,
    capstoneBusinessRule: DEFAULT_CAPSTONE_BUSINESS_RULE,
  };
}

function sanitizeStringArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) {
    return [...fallback];
  }
  const seen = new Set<string>();
  const clean: string[] = [];
  for (const entry of value) {
    if (typeof entry === 'string' && entry.trim().length > 0 && !seen.has(entry)) {
      seen.add(entry);
      clean.push(entry);
    }
  }
  return clean;
}

function getBrowserStorage(): StorageLike | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

export function parseStoredProgress(raw: string | null): LearnerProgressState {
  const defaults = createDefaultProgress();
  if (!raw) {
    return defaults;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return defaults;
    }

    const record = parsed as Record<string, unknown>;
    if (record.version !== PROGRESS_SCHEMA_VERSION) {
      return defaults;
    }

    const capstoneProjectName =
      typeof record.capstoneProjectName === 'string'
        ? record.capstoneProjectName
        : defaults.capstoneProjectName;

    const capstoneBusinessRule =
      typeof record.capstoneBusinessRule === 'string'
        ? record.capstoneBusinessRule
        : defaults.capstoneBusinessRule;

    return {
      version: PROGRESS_SCHEMA_VERSION,
      completedModules: sanitizeStringArray(record.completedModules, defaults.completedModules),
      solvedScenarioSteps: sanitizeStringArray(
        record.solvedScenarioSteps,
        defaults.solvedScenarioSteps
      ),
      capstoneCheckedMilestones: sanitizeStringArray(
        record.capstoneCheckedMilestones,
        defaults.capstoneCheckedMilestones
      ),
      capstoneProjectName,
      capstoneBusinessRule,
    };
  } catch {
    return defaults;
  }
}

export function loadProgress(storage?: StorageLike | null): LearnerProgressState {
  const target = storage === undefined ? getBrowserStorage() : storage;
  if (!target) {
    return createDefaultProgress();
  }

  try {
    return parseStoredProgress(target.getItem(PROGRESS_STORAGE_KEY));
  } catch {
    return createDefaultProgress();
  }
}

export function saveProgress(
  state: Omit<LearnerProgressState, 'version'> | LearnerProgressState,
  storage?: StorageLike | null
): boolean {
  const target = storage === undefined ? getBrowserStorage() : storage;
  if (!target) {
    return false;
  }

  const normalized: LearnerProgressState = {
    version: PROGRESS_SCHEMA_VERSION,
    completedModules: sanitizeStringArray(state.completedModules, []),
    solvedScenarioSteps: sanitizeStringArray(state.solvedScenarioSteps, []),
    capstoneCheckedMilestones: sanitizeStringArray(state.capstoneCheckedMilestones, []),
    capstoneProjectName:
      typeof state.capstoneProjectName === 'string'
        ? state.capstoneProjectName
        : DEFAULT_CAPSTONE_PROJECT_NAME,
    capstoneBusinessRule:
      typeof state.capstoneBusinessRule === 'string'
        ? state.capstoneBusinessRule
        : DEFAULT_CAPSTONE_BUSINESS_RULE,
  };

  try {
    target.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(normalized));
    return true;
  } catch {
    return false;
  }
}

export function resetProgress(storage?: StorageLike | null): LearnerProgressState {
  const target = storage === undefined ? getBrowserStorage() : storage;
  if (target) {
    try {
      target.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // Ignore storage errors and still return fresh defaults
    }
  }
  return createDefaultProgress();
}
