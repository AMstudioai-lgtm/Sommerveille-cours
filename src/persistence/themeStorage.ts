import type { StorageLike } from './progressStorage';

export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'architecte_logiciel_theme_v1';

export const THEME_META_COLORS: Record<ThemeMode, string> = {
  light: '#FAF9F5',
  dark: '#111317',
};

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

export function parseStoredTheme(raw: string | null): ThemeMode | null {
  if (raw === 'light' || raw === 'dark') {
    return raw;
  }
  return null;
}

export function resolveInitialTheme(
  storage?: StorageLike | null,
  prefersDark?: boolean
): ThemeMode {
  const target = storage === undefined ? getBrowserStorage() : storage;

  if (target) {
    try {
      const saved = parseStoredTheme(target.getItem(THEME_STORAGE_KEY));
      if (saved) {
        return saved;
      }
    } catch {
      // Ignore storage access errors and fall back to system/default preference
    }
  }

  if (typeof prefersDark === 'boolean') {
    return prefersDark ? 'dark' : 'light';
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

export function saveTheme(theme: ThemeMode, storage?: StorageLike | null): boolean {
  const target = storage === undefined ? getBrowserStorage() : storage;
  if (!target) {
    return false;
  }

  try {
    target.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

export function toggleThemeMode(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}
