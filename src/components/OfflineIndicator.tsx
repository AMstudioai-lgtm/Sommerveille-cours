import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 max-w-md bg-[#FDF4EC] border border-[#B85D19] px-4 py-2.5 flex items-center gap-2.5 text-xs font-mono-tech text-[#B85D19] animate-reveal-up"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span className="leading-snug">
        Mode hors-ligne actif — Cours, schémas, PDF et progression enregistrés localement.
      </span>
    </div>
  );
};
