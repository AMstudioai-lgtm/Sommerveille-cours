import React, { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  LANGUAGE_LABELS,
  tokenizeCodeLine,
  type CodeLanguage,
  type CodeTokenType,
} from '../utils/visualFormatter';

export interface CodeSnippetBlockProps {
  code: string;
  language: CodeLanguage;
  title?: string;
  filename?: string;
  caption?: string;
  compact?: boolean;
  className?: string;
}

const TOKEN_CLASSES: Record<CodeTokenType, string> = {
  keyword: 'text-[var(--state-quaternary-active)] font-semibold',
  type: 'text-[var(--state-quaternary-active)]',
  string: 'text-[var(--state-quaternary-success)]',
  number: 'text-[var(--state-quaternary-warning)]',
  function: 'text-[var(--state-quaternary-warning)] font-medium',
  comment: 'text-[var(--text-secondary-muted)] italic',
  tree: 'text-[var(--text-secondary-muted)]',
  plain: 'text-[var(--text-secondary-main)]',
};

export const CodeSnippetBlock: React.FC<CodeSnippetBlockProps> = ({
  code,
  language,
  title,
  filename,
  caption,
  compact = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const tokenizedLines = useMemo(() => {
    const clean = code.replace(/^\n+|\n+$/g, '');
    return clean.split('\n').map((line) => tokenizeCodeLine(line, language));
  }, [code, language]);

  const handleCopy = async () => {
    const textToCopy = code.replace(/^\n+|\n+$/g, '');
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const languageLabel = LANGUAGE_LABELS[language];

  return (
    <div
      className={`flat-surface-tertiary min-w-0 max-w-full overflow-hidden ${className}`}
    >
      {/* En-tête épuré sur une ligne : Type · Titre/Fichier — Copier */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#F7F5EF] border-b border-[#DCD7CA]">
        <div className="flex items-center gap-2 min-w-0 text-xs font-mono-tech">
          <span className="state-text-active font-semibold uppercase whitespace-nowrap shrink-0">
            {languageLabel}
          </span>
          {(filename || title) && (
            <>
              <span className="text-palette-muted shrink-0" aria-hidden="true">
                ·
              </span>
              <span className="text-palette-body truncate">
                {filename ?? title}
              </span>
            </>
          )}
          {filename && title && (
            <>
              <span className="hidden sm:inline text-palette-muted shrink-0" aria-hidden="true">
                —
              </span>
              <span className="hidden sm:inline text-palette-muted truncate">
                {title}
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copier le bloc ${languageLabel}`}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-tech border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            copied
              ? 'border-[#1B6B4A] bg-[#F1F8F5] state-text-success font-semibold'
              : 'border-[#DCD7CA] bg-white text-palette-body hover:border-[#1E56A0] hover:text-[#1E56A0]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>Copié</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 shrink-0" />
              <span>Copier</span>
            </>
          )}
        </button>
      </div>

      {/* Corps du code : coloration sobre 4 palettes + défilement interne horizontal */}
      <pre
        className={`${
          compact ? 'p-3.5 text-xs' : 'p-4 sm:p-5 text-xs sm:text-[13px]'
        } bg-[#FAF9F5] font-mono-tech leading-relaxed overflow-x-auto overscroll-x-contain max-w-full m-0`}
      >
        <code>
          {tokenizedLines.map((tokens, lineIdx) => (
            <span key={lineIdx} className="block min-h-[1.45em]">
              {tokens.map((tok, tokIdx) => (
                <span key={tokIdx} className={TOKEN_CLASSES[tok.type]}>
                  {tok.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>

      {caption && (
        <div className="px-4 py-2.5 bg-white border-t border-[#DCD7CA] text-xs text-palette-muted leading-relaxed break-words">
          {caption}
        </div>
      )}
    </div>
  );
};
