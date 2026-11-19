export type CodeLanguage =
  | 'ts'
  | 'tsx'
  | 'js'
  | 'sql'
  | 'json'
  | 'rules'
  | 'md'
  | 'tree'
  | 'mermaid'
  | 'text';

export type MermaidOrientationMode = 'auto' | 'TD' | 'LR';
export type MermaidDirection = 'TD' | 'LR';

export type CodeTokenType =
  | 'keyword'
  | 'type'
  | 'string'
  | 'number'
  | 'function'
  | 'comment'
  | 'tree'
  | 'plain';

export interface CodeToken {
  type: CodeTokenType;
  text: string;
}

export const LANGUAGE_LABELS: Record<CodeLanguage, string> = {
  ts: 'TypeScript',
  tsx: 'React / TSX',
  js: 'JavaScript',
  sql: 'SQL',
  json: 'JSON',
  rules: 'Firestore Rules',
  md: 'Markdown',
  tree: 'Arborescence',
  mermaid: 'Mermaid',
  text: 'Texte structuré',
};

/**
 * Resolves the effective Mermaid flowchart direction given the user's selected mode
 * and whether the current viewport is mobile (< 768px).
 */
export function resolveMermaidDirection(
  mode: MermaidOrientationMode,
  isMobile: boolean
): MermaidDirection {
  if (mode === 'TD' || mode === 'LR') {
    return mode;
  }
  return isMobile ? 'TD' : 'LR';
}

/**
 * Rewrites the root orientation directive of a Mermaid flowchart/graph definition
 * (`flowchart LR`, `flowchart TD`, `graph TB`, etc.) cleanly to the target direction.
 * Non-flowchart Mermaid diagrams (e.g., sequenceDiagram) are returned trimmed unchanged.
 */
export function applyMermaidOrientation(
  definition: string,
  direction: MermaidDirection
): string {
  const trimmed = definition.trim();
  const lines = trimmed.split('\n');
  let replaced = false;

  const updated = lines.map((line) => {
    if (replaced) return line;
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('%%')) {
      return line;
    }
    const match = line.match(/^(\s*)(flowchart|graph)\s+(TD|TB|BT|LR|RL)(\b.*)$/i);
    if (match) {
      replaced = true;
      return `${match[1]}${match[2].toLowerCase()} ${direction}${match[4]}`;
    }
    // First substantive directive is not a flowchart/graph
    replaced = true;
    return line;
  });

  return updated.join('\n');
}

const TS_KEYWORDS = new Set([
  'export',
  'import',
  'from',
  'function',
  'const',
  'let',
  'var',
  'return',
  'if',
  'else',
  'switch',
  'case',
  'default',
  'async',
  'await',
  'try',
  'catch',
  'throw',
  'new',
  'interface',
  'type',
  'implements',
  'class',
  'extends',
  'public',
  'private',
  'readonly',
  'true',
  'false',
  'null',
  'undefined',
  'void',
]);

const SQL_KEYWORDS = new Set([
  'SELECT',
  'FROM',
  'WHERE',
  'JOIN',
  'INNER',
  'LEFT',
  'ON',
  'CREATE',
  'TABLE',
  'PRIMARY',
  'KEY',
  'FOREIGN',
  'REFERENCES',
  'NOT',
  'NULL',
  'DEFAULT',
  'CHECK',
  'INSERT',
  'INTO',
  'VALUES',
  'UPDATE',
  'SET',
  'DELETE',
  'AND',
  'OR',
  'AS',
  'UUID',
  'TEXT',
  'NUMERIC',
  'INTEGER',
  'TIMESTAMP',
  'BOOLEAN',
]);

const RULES_KEYWORDS = new Set([
  'rules_version',
  'service',
  'match',
  'allow',
  'read',
  'write',
  'create',
  'update',
  'delete',
  'if',
  'request',
  'resource',
  'auth',
  'uid',
  'data',
  'true',
  'false',
  'null',
]);

const MERMAID_KEYWORDS = new Set([
  'flowchart',
  'graph',
  'subgraph',
  'end',
  'direction',
  'TD',
  'LR',
  'TB',
  'RL',
  'classDef',
  'class',
  'style',
]);

/**
 * Tokenizes a single line of code into semantic tokens mapped to the site's 4-palette system.
 * Pure, deterministic, zero-HTML string generation (safe for React rendering).
 */
export function tokenizeCodeLine(line: string, language: CodeLanguage): CodeToken[] {
  if (!line) {
    return [{ type: 'plain', text: '' }];
  }

  if (language === 'text') {
    if (/^\s*(#|\d+\)|•|-)\s/.test(line) || /^\s*[A-ZÀ-Ÿ][A-ZÀ-Ÿ0-9\s/_-]+:/.test(line)) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0 && colonIdx < 38) {
        return [
          { type: 'keyword', text: line.slice(0, colonIdx + 1) },
          { type: 'plain', text: line.slice(colonIdx + 1) },
        ];
      }
    }
    return [{ type: 'plain', text: line }];
  }

  if (language === 'tree') {
    return tokenizeTreeLine(line);
  }

  if (language === 'md') {
    return tokenizeMarkdownLine(line);
  }

  if (language === 'json') {
    return tokenizeJsonLine(line);
  }

  return tokenizeCodeGeneric(line, language);
}

function tokenizeTreeLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  // Split inline comment (# ... or ← ... or // ...)
  const commentMatch = line.match(/(\s*(?:#|←|\/\/).*)$/);
  const mainPart = commentMatch ? line.slice(0, commentMatch.index) : line;
  const commentPart = commentMatch ? commentMatch[1] : '';

  const branchMatch = mainPart.match(/^([\s│├└─┬]+)(.*)$/);
  if (branchMatch) {
    tokens.push({ type: 'tree', text: branchMatch[1] });
    const nodeName = branchMatch[2];
    if (nodeName.trim().endsWith('/')) {
      tokens.push({ type: 'keyword', text: nodeName });
    } else if (/\.(test|spec)\.(ts|tsx|js)$/.test(nodeName.trim())) {
      tokens.push({ type: 'string', text: nodeName });
    } else if (/\.md$/.test(nodeName.trim())) {
      tokens.push({ type: 'function', text: nodeName });
    } else {
      tokens.push({ type: 'plain', text: nodeName });
    }
  } else if (mainPart.trim().endsWith('/')) {
    tokens.push({ type: 'keyword', text: mainPart });
  } else {
    tokens.push({ type: 'plain', text: mainPart });
  }

  if (commentPart) {
    tokens.push({ type: 'comment', text: commentPart });
  }

  return tokens;
}

function tokenizeMarkdownLine(line: string): CodeToken[] {
  if (/^\s*#{1,4}\s/.test(line)) {
    return [{ type: 'keyword', text: line }];
  }
  if (/^\s*-\s*\[[xX ]\]/.test(line)) {
    const idx = line.indexOf(']') + 1;
    return [
      { type: 'string', text: line.slice(0, idx) },
      { type: 'plain', text: line.slice(idx) },
    ];
  }
  const boldPrefix = line.match(/^(\s*[-*]\s+[^:]+:)(.*)$/);
  if (boldPrefix) {
    return [
      { type: 'function', text: boldPrefix[1] },
      { type: 'plain', text: boldPrefix[2] },
    ];
  }
  return [{ type: 'plain', text: line }];
}

function tokenizeJsonLine(line: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', text: line.slice(i) });
      break;
    }
    if (line[i] === '"') {
      let end = i + 1;
      while (end < line.length && (line[end] !== '"' || line[end - 1] === '\\')) {
        end++;
      }
      const str = line.slice(i, end + 1);
      const rest = line.slice(end + 1);
      const isKey = /^\s*:/.test(rest);
      tokens.push({ type: isKey ? 'keyword' : 'string', text: str });
      i = end + 1;
      continue;
    }
    const numMatch = line.slice(i).match(/^\b(\d+(?:\.\d+)?|true|false|null)\b/);
    if (numMatch) {
      tokens.push({ type: 'number', text: numMatch[1] });
      i += numMatch[1].length;
      continue;
    }
    tokens.push({ type: 'plain', text: line[i] });
    i++;
  }
  return mergeAdjacentTokens(tokens);
}

function tokenizeCodeGeneric(line: string, language: CodeLanguage): CodeToken[] {
  const tokens: CodeToken[] = [];
  const trimmed = line.trim();

  if (
    (language === 'sql' && trimmed.startsWith('--')) ||
    (language === 'mermaid' && trimmed.startsWith('%%'))
  ) {
    return [{ type: 'comment', text: line }];
  }

  let i = 0;
  while (i < line.length) {
    // Line comments
    if (
      (line[i] === '/' && line[i + 1] === '/') ||
      (language === 'sql' && line[i] === '-' && line[i + 1] === '-') ||
      (language === 'mermaid' && line[i] === '%' && line[i + 1] === '%')
    ) {
      tokens.push({ type: 'comment', text: line.slice(i) });
      break;
    }

    // String literals
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i];
      let end = i + 1;
      while (end < line.length && (line[end] !== quote || line[end - 1] === '\\')) {
        end++;
      }
      tokens.push({ type: 'string', text: line.slice(i, end + 1) });
      i = end + 1;
      continue;
    }

    // Numbers
    const numMatch = line.slice(i).match(/^\b\d+(?:\.\d+)?\b/);
    if (numMatch) {
      tokens.push({ type: 'number', text: numMatch[0] });
      i += numMatch[0].length;
      continue;
    }

    // Identifiers & keywords
    const wordMatch = line.slice(i).match(/^[A-Za-z_À-ÿ][A-Za-z0-9_À-ÿ]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      const nextChar = line[i + word.length];
      let type: CodeTokenType = 'plain';

      if (language === 'sql') {
        if (SQL_KEYWORDS.has(word.toUpperCase())) {
          type = 'keyword';
        }
      } else if (language === 'rules') {
        if (RULES_KEYWORDS.has(word)) {
          type = 'keyword';
        }
      } else if (language === 'mermaid') {
        if (MERMAID_KEYWORDS.has(word)) {
          type = 'keyword';
        }
      } else {
        if (TS_KEYWORDS.has(word)) {
          type = 'keyword';
        } else if (/^[A-Z][A-Za-z0-9_]*$/.test(word)) {
          type = 'type';
        } else if (nextChar === '(') {
          type = 'function';
        }
      }

      tokens.push({ type, text: word });
      i += word.length;
      continue;
    }

    // Mermaid arrows
    if (language === 'mermaid') {
      const arrowMatch = line.slice(i).match(/^(-->|-.->|==>|<-->|---)/);
      if (arrowMatch) {
        tokens.push({ type: 'function', text: arrowMatch[0] });
        i += arrowMatch[0].length;
        continue;
      }
    }

    tokens.push({ type: 'plain', text: line[i] });
    i++;
  }

  return mergeAdjacentTokens(tokens);
}

function mergeAdjacentTokens(tokens: CodeToken[]): CodeToken[] {
  const merged: CodeToken[] = [];
  for (const tok of tokens) {
    const prev = merged[merged.length - 1];
    if (prev && prev.type === tok.type) {
      prev.text += tok.text;
    } else {
      merged.push({ ...tok });
    }
  }
  return merged;
}
