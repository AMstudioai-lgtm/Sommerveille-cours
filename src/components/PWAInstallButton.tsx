import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        aria-label="Installer l'application hors-ligne"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#1E56A0] text-white border border-[#1E56A0] cursor-pointer hover:bg-[#141619] hover:border-[#141619] transition-colors whitespace-nowrap shrink-0"
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span>Installer</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          aria-label="Installer sur iPhone ou iPad"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium flat-surface-tertiary text-palette-main cursor-pointer hover:border-[#1E56A0] transition-colors whitespace-nowrap shrink-0"
        >
          <Share className="w-3.5 h-3.5 shrink-0 text-[#1E56A0]" />
          <span>Installer</span>
        </button>

        {showIOSGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#141619]/50 p-4"
          >
            <div className="w-full max-w-sm flat-surface-tertiary p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-mono-tech uppercase state-text-active font-semibold mb-1">
                    Installation iOS Safari
                  </div>
                  <h3 id="ios-install-title" className="text-lg font-bold text-palette-main">
                    Installer sur iPhone / iPad
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Fermer le guide d'installation"
                  className="p-1 text-palette-muted hover:text-palette-main cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <ol className="space-y-2.5 text-sm text-palette-body list-decimal list-inside leading-relaxed">
                <li>
                  Appuie sur le bouton <strong className="text-palette-main">Partager</strong> dans la barre Safari.
                </li>
                <li>
                  Fais défiler et sélectionne{' '}
                  <strong className="text-palette-main">Sur l’écran d’accueil</strong>.
                </li>
              </ol>

              <p className="text-xs text-palette-muted border-t border-[#DCD7CA] pt-3">
                Une fois ajoutée, la formation s’ouvre en mode autonome avec tous les modules, schémas et le PDF disponibles sans Internet.
              </p>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 text-xs font-mono-tech font-medium bg-[#141619] text-white cursor-pointer hover:bg-[#1E56A0] transition-colors"
              >
                Compris
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
