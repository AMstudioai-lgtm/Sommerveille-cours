import test from 'node:test';
import assert from 'node:assert/strict';
import type { StorageLike } from './progressStorage';
import {
  THEME_META_COLORS,
  THEME_STORAGE_KEY,
  parseStoredTheme,
  resolveInitialTheme,
  saveTheme,
  toggleThemeMode,
} from './themeStorage';

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

test('parseStoredTheme accepts only light or dark values', () => {
  assert.equal(parseStoredTheme('light'), 'light');
  assert.equal(parseStoredTheme('dark'), 'dark');
  assert.equal(parseStoredTheme('sepia'), null);
  assert.equal(parseStoredTheme(null), null);
});

test('resolveInitialTheme prioritizes saved preference over OS preference', () => {
  const storage = createMemoryStorage();
  saveTheme('light', storage);
  assert.equal(resolveInitialTheme(storage, true), 'light');

  saveTheme('dark', storage);
  assert.equal(resolveInitialTheme(storage, false), 'dark');
});

test('resolveInitialTheme falls back to prefersDark when storage is empty or invalid', () => {
  const storage = createMemoryStorage();
  assert.equal(resolveInitialTheme(storage, true), 'dark');
  assert.equal(resolveInitialTheme(storage, false), 'light');

  storage.setItem(THEME_STORAGE_KEY, 'corrupted-theme');
  assert.equal(resolveInitialTheme(storage, true), 'dark');
});

test('saveTheme and resolveInitialTheme handle throwing storage safely', () => {
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

  assert.equal(saveTheme('dark', brokenStorage), false);
  assert.equal(resolveInitialTheme(brokenStorage, false), 'light');
  assert.equal(resolveInitialTheme(brokenStorage, true), 'dark');
});

test('toggleThemeMode flips cleanly and THEME_META_COLORS defines both palette backgrounds', () => {
  assert.equal(toggleThemeMode('light'), 'dark');
  assert.equal(toggleThemeMode('dark'), 'light');
  assert.equal(THEME_META_COLORS.light, '#FAF9F5');
  assert.equal(THEME_META_COLORS.dark, '#111317');
});
