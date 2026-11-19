import React from 'react';
import type { CodeLanguage } from '../utils/visualFormatter';
import { CodeSnippetBlock } from './CodeSnippetBlock';
import { MermaidDiagramBlock } from './MermaidDiagramBlock';

export interface MermaidVisualItem {
  kind: 'mermaid';
  title: string;
  caption?: string;
  definition: string;
}

export interface CodeVisualItem {
  kind: 'code';
  language: CodeLanguage;
  title: string;
  filename?: string;
  caption?: string;
  code: string;
}

export type SubSectionVisualItem = MermaidVisualItem | CodeVisualItem;

export interface SubSectionVisualStackProps {
  items: SubSectionVisualItem[];
  heading?: string;
}

export const SubSectionVisualStack: React.FC<SubSectionVisualStackProps> = ({
  items,
  heading = 'Schéma, Code & Arborescence du sous-module',
}) => {
  if (!items.length) return null;

  return (
    <div className="space-y-5 pt-2 min-w-0">
      <div className="text-xs font-mono-tech uppercase text-palette-muted">
        {heading}
      </div>

      <div className="space-y-5 min-w-0">
        {items.map((item, idx) => {
          if (item.kind === 'mermaid') {
            return (
              <MermaidDiagramBlock
                key={`mermaid-${idx}-${item.title}`}
                title={item.title}
                caption={item.caption}
                definition={item.definition}
              />
            );
          }

          return (
            <CodeSnippetBlock
              key={`code-${idx}-${item.title}`}
              language={item.language}
              title={item.title}
              filename={item.filename}
              caption={item.caption}
              code={item.code}
            />
          );
        })}
      </div>
    </div>
  );
};
