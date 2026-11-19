import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Code2, ArrowDownUp, ArrowLeftRight, MoveHorizontal } from 'lucide-react';
import {
  applyMermaidOrientation,
  resolveMermaidDirection,
  type MermaidOrientationMode,
} from '../utils/visualFormatter';
import { CodeSnippetBlock } from './CodeSnippetBlock';

export interface MermaidDiagramBlockProps {
  definition: string;
  title: string;
  caption?: string;
  defaultMode?: MermaidOrientationMode;
  className?: string;
}

let mermaidInitialized = false;
let renderCounter = 0;
let renderQueue: Promise<unknown> = Promise.resolve();

async function renderMermaidSafe(code: string, prefix: string): Promise<string> {
  const job = renderQueue.then(async () => {
    const mermaidModule = await import('mermaid');
    const mermaid = mermaidModule.default;

    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        flowchart: {
          htmlLabels: true,
          curve: 'basis',
          nodeSpacing: 34,
          rankSpacing: 46,
          padding: 14,
          useMaxWidth: false,
        },
        themeVariables: {
          background: '#FAF9F5',
          primaryColor: '#EDF3FC',
          primaryBorderColor: '#1E56A0',
          primaryTextColor: '#141619',
          secondaryColor: '#F7F5EF',
          secondaryBorderColor: '#DCD7CA',
          secondaryTextColor: '#141619',
          tertiaryColor: '#FFFFFF',
          tertiaryBorderColor: '#DCD7CA',
          tertiaryTextColor: '#141619',
          lineColor: '#3B4049',
          textColor: '#141619',
          edgeLabelBackground: '#FAF9F5',
          clusterBkg: '#FFFFFF',
          clusterBorder: '#DCD7CA',
          fontSize: '14px',
        },
      });
      mermaidInitialized = true;
    }

    renderCounter += 1;
    const renderId = `mmd_${prefix}_${renderCounter}`;
    const { svg } = await mermaid.render(renderId, code);
    return svg;
  });

  // Keep queue advancing even if a single render fails
  renderQueue = job.catch(() => undefined);
  return job;
}

export const MermaidDiagramBlock: React.FC<MermaidDiagramBlockProps> = ({
  definition,
  title,
  caption,
  defaultMode = 'auto',
  className = '',
}) => {
  const rawReactId = useId();
  const safePrefix = useMemo(
    () => rawReactId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10) || 'diag',
    [rawReactId]
  );

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });
  const [orientationMode, setOrientationMode] = useState<MermaidOrientationMode>(defaultMode);
  const [showSource, setShowSource] = useState<boolean>(false);
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isScrollableX, setIsScrollableX] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    setIsMobile(mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const effectiveDirection = resolveMermaidDirection(orientationMode, isMobile);

  const orientedDefinition = useMemo(
    () => applyMermaidOrientation(definition, effectiveDirection),
    [definition, effectiveDirection]
  );

  useEffect(() => {
    let cancelled = false;
    setRenderError(null);

    renderMermaidSafe(orientedDefinition, safePrefix)
      .then((svg) => {
        if (!cancelled) {
          setSvgMarkup(svg);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Erreur de rendu du schéma Mermaid.';
          setRenderError(message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [orientedDefinition, safePrefix]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const measureOverflow = () => {
      setIsScrollableX(el.scrollWidth > el.clientWidth + 6);
    };

    measureOverflow();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measureOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [svgMarkup, effectiveDirection]);

  return (
    <div
      data-mermaid-direction={effectiveDirection}
      className={`flat-surface-tertiary min-w-0 max-w-full overflow-hidden ${className}`}
    >
      {/* En-tête plat avec orientation auto-responsive, bascule V/H et affichage source */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 bg-[#F7F5EF] border-b border-[#DCD7CA]">
        <div className="flex items-center gap-2 min-w-0 text-xs font-mono-tech">
          <span className="state-text-active font-semibold uppercase whitespace-nowrap shrink-0">
            Schéma Mermaid
          </span>
          <span className="text-palette-muted shrink-0" aria-hidden="true">
            ·
          </span>
          <span className="text-palette-main font-medium truncate">{title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Sélecteur d'orientation : Auto / Vertical / Horizontal */}
          <div
            className="inline-flex border border-[#DCD7CA] bg-white"
            role="group"
            aria-label="Orientation du schéma Mermaid"
          >
            <button
              type="button"
              onClick={() => setOrientationMode('auto')}
              aria-pressed={orientationMode === 'auto'}
              title="Automatique : vertical sur mobile, horizontal sur grand écran"
              className={`px-2 py-1 text-[11px] font-mono-tech transition-colors cursor-pointer whitespace-nowrap ${
                orientationMode === 'auto'
                  ? 'bg-[#EDF3FC] state-text-active font-semibold'
                  : 'text-palette-body hover:bg-[#FAF9F5]'
              }`}
            >
              Auto ({effectiveDirection === 'TD' ? 'V' : 'H'})
            </button>
            <button
              type="button"
              onClick={() => setOrientationMode('TD')}
              aria-pressed={orientationMode === 'TD'}
              title="Affichage vertical (haut vers bas)"
              className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono-tech border-l border-[#DCD7CA] transition-colors cursor-pointer whitespace-nowrap ${
                orientationMode === 'TD'
                  ? 'bg-[#EDF3FC] state-text-active font-semibold'
                  : 'text-palette-body hover:bg-[#FAF9F5]'
              }`}
            >
              <ArrowDownUp className="w-3 h-3 shrink-0" />
              <span className="hidden sm:inline">Vertical</span>
            </button>
            <button
              type="button"
              onClick={() => setOrientationMode('LR')}
              aria-pressed={orientationMode === 'LR'}
              title="Affichage horizontal (gauche vers droite)"
              className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono-tech border-l border-[#DCD7CA] transition-colors cursor-pointer whitespace-nowrap ${
                orientationMode === 'LR'
                  ? 'bg-[#EDF3FC] state-text-active font-semibold'
                  : 'text-palette-body hover:bg-[#FAF9F5]'
              }`}
            >
              <ArrowLeftRight className="w-3 h-3 shrink-0" />
              <span className="hidden sm:inline">Horizontal</span>
            </button>
          </div>

          {/* Bouton source Mermaid */}
          <button
            type="button"
            onClick={() => setShowSource((prev) => !prev)}
            aria-expanded={showSource}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-tech border transition-colors cursor-pointer whitespace-nowrap ${
              showSource
                ? 'border-[#1E56A0] bg-[#EDF3FC] state-text-active font-semibold'
                : 'border-[#DCD7CA] bg-white text-palette-body hover:border-[#1E56A0] hover:text-[#1E56A0]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>{showSource ? 'Masquer Mermaid' : 'Code Mermaid'}</span>
          </button>
        </div>
      </div>

      {/* Zone de rendu SVG avec défilement horizontal intérieur fluide */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto overscroll-x-contain touch-pan-x bg-[#FAF9F5] p-4 sm:p-6"
      >
        {renderError ? (
          <div className="p-4 border border-[#A62626] bg-[#FDF2F2] text-xs font-mono-tech state-text-danger break-words">
            Impossible de rendre le schéma : {renderError}
          </div>
        ) : svgMarkup ? (
          <div
            className={`mermaid-svg-host flex ${
              effectiveDirection === 'TD' ? 'justify-center' : 'justify-start'
            } min-w-fit`}
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        ) : (
          <div className="py-8 text-center text-xs font-mono-tech text-palette-muted">
            Rendu du schéma d’architecture…
          </div>
        )}
      </div>

      {/* Indicateur discret de défilement interne quand le graphe horizontal dépasse */}
      {isScrollableX && (
        <div className="px-4 py-1.5 bg-[#F7F5EF] border-t border-[#DCD7CA] flex items-center justify-end gap-1.5 text-[11px] font-mono-tech text-palette-muted">
          <MoveHorizontal className="w-3.5 h-3.5 shrink-0 state-text-active" />
          <span>Défilez horizontalement dans le schéma pour voir la suite</span>
        </div>
      )}

      {/* Légende pédagogique */}
      {caption && (
        <div className="px-4 py-2.5 bg-white border-t border-[#DCD7CA] text-xs text-palette-muted leading-relaxed break-words">
          {caption}
        </div>
      )}

      {/* Code Mermaid source dépliable */}
      {showSource && (
        <div className="border-t border-[#DCD7CA]">
          <CodeSnippetBlock
            code={orientedDefinition}
            language="mermaid"
            title="Source Mermaid active"
            compact
            className="border-0"
          />
        </div>
      )}
    </div>
  );
};
