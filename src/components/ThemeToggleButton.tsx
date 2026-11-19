import React from 'react';
import { Moon, Sun } from 'lucide-react';
import type { ThemeMode } from '../persistence/themeStorage';

interface ThemeToggleButtonProps {
  theme: ThemeMode;
  onToggle: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-mono-tech font-medium flat-surface-tertiary text-palette-main cursor-pointer hover:border-[var(--state-quaternary-active)] transition-colors whitespace-nowrap shrink-0"
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 shrink-0 state-text-warning" />
          <span className="hidden lg:inline">Clair</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 shrink-0 state-text-active" />
          <span className="hidden lg:inline">Sombre</span>
        </>
      )}
    </button>
  );
};
