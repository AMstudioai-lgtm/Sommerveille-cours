import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_CAPSTONE_BUSINESS_RULE,
  DEFAULT_CAPSTONE_PROJECT_NAME,
  PROGRESS_SCHEMA_VERSION,
  PROGRESS_STORAGE_KEY,
  createDefaultProgress,
  loadProgress,
  parseStoredProgress,
  resetProgress,
  saveProgress,
  type StorageLike,
} from './progressStorage';

function createMemoryStorage(): StorageLike & { store: Map<string, string> } {
  const store = new Map<string, string>();
  return {
    store,
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
  };
}

test('loadProgress returns defaults when storage is empty or unavailable', () => {
  const emptyStorage = createMemoryStorage();
  assert.deepEqual(loadProgress(emptyStorage), createDefaultProgress());
  assert.deepEqual(loadProgress(null), createDefaultProgress());
});

test('saveProgress persists state and loadProgress restores it with deduplication', () => {
  const storage = createMemoryStorage();

  const saved = saveProgress(
    {
      completedModules: ['mod-1-fondations', 'mod-2-processus-agile', 'mod-1-fondations'],
      solvedScenarioSteps: ['audit-1', 'scen-1-step-1', 'audit-1'],
      capstoneCheckedMilestones: ['ms-1', 'ms-2'],
      capstoneProjectName: 'Clinique Pulse',
      capstoneBusinessRule: 'Prioriser les urgences vitales avant les consultations standard.',
    },
    storage
  );

  assert.equal(saved, true);
  assert.equal(storage.store.has(PROGRESS_STORAGE_KEY), true);

  const loaded = loadProgress(storage);
  assert.equal(loaded.version, PROGRESS_SCHEMA_VERSION);
  assert.deepEqual(loaded.completedModules, ['mod-1-fondations', 'mod-2-processus-agile']);
  assert.deepEqual(loaded.solvedScenarioSteps, ['audit-1', 'scen-1-step-1']);
  assert.deepEqual(loaded.capstoneCheckedMilestones, ['ms-1', 'ms-2']);
  assert.equal(loaded.capstoneProjectName, 'Clinique Pulse');
  assert.equal(
    loaded.capstoneBusinessRule,
    'Prioriser les urgences vitales avant les consultations standard.'
  );
});

test('parseStoredProgress safely recovers from corrupted JSON or incompatible schema version', () => {
  assert.deepEqual(parseStoredProgress('{not-valid-json'), createDefaultProgress());
  assert.deepEqual(
    parseStoredProgress(JSON.stringify({ version: 999, completedModules: ['mod-x'] })),
    createDefaultProgress()
  );
});

test('parseStoredProgress sanitizes invalid field types while preserving valid fields', () => {
  const parsed = parseStoredProgress(
    JSON.stringify({
      version: PROGRESS_SCHEMA_VERSION,
      completedModules: ['mod-1-fondations', 42, '', null],
      solvedScenarioSteps: 'invalid-not-array',
      capstoneCheckedMilestones: ['ms-1'],
      capstoneProjectName: 12345,
      capstoneBusinessRule: 'Règle valide',
    })
  );

  assert.deepEqual(parsed.completedModules, ['mod-1-fondations']);
  assert.deepEqual(parsed.solvedScenarioSteps, []);
  assert.deepEqual(parsed.capstoneCheckedMilestones, ['ms-1']);
  assert.equal(parsed.capstoneProjectName, DEFAULT_CAPSTONE_PROJECT_NAME);
  assert.equal(parsed.capstoneBusinessRule, 'Règle valide');
});

test('resetProgress clears stored key and returns fresh defaults', () => {
  const storage = createMemoryStorage();
  saveProgress(
    {
      completedModules: ['mod-1-fondations', 'mod-3-architecture-couches'],
      solvedScenarioSteps: ['audit-1'],
      capstoneCheckedMilestones: ['ms-1'],
      capstoneProjectName: 'Autre Projet',
      capstoneBusinessRule: 'Autre règle',
    },
    storage
  );

  const reset = resetProgress(storage);
  assert.equal(storage.store.has(PROGRESS_STORAGE_KEY), false);
  assert.deepEqual(reset, createDefaultProgress());
  assert.equal(reset.capstoneProjectName, DEFAULT_CAPSTONE_PROJECT_NAME);
  assert.equal(reset.capstoneBusinessRule, DEFAULT_CAPSTONE_BUSINESS_RULE);
});

test('loadProgress and saveProgress handle throwing storage backends gracefully', () => {
  const brokenStorage: StorageLike = {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem() {
      throw new Error('QuotaExceededError');
    },
    removeItem() {
      throw new Error('SecurityError');
    },
  };

  assert.deepEqual(loadProgress(brokenStorage), createDefaultProgress());
  assert.equal(saveProgress(createDefaultProgress(), brokenStorage), false);
  assert.deepEqual(resetProgress(brokenStorage), createDefaultProgress());
});
