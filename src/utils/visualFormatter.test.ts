import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveMermaidDirection,
  applyMermaidOrientation,
  tokenizeCodeLine,
} from './visualFormatter.ts';

describe('visualFormatter pure logic', () => {
  it('resolves Mermaid direction to TD on mobile and LR on desktop when mode is auto', () => {
    assert.equal(resolveMermaidDirection('auto', true), 'TD');
    assert.equal(resolveMermaidDirection('auto', false), 'LR');
    assert.equal(resolveMermaidDirection('TD', false), 'TD');
    assert.equal(resolveMermaidDirection('LR', true), 'LR');
  });

  it('rewrites flowchart root direction cleanly while preserving comments and body', () => {
    const src = `%% Commentaire d'architecture
flowchart LR
  UI[Présentation] --> BIZ[Logique Métier]
  BIZ --> DB[(Base SQL)]`;

    const vertical = applyMermaidOrientation(src, 'TD');
    assert.match(vertical, /^%% Commentaire d'architecture\nflowchart TD\n/);
    assert.ok(vertical.includes('UI[Présentation] --> BIZ[Logique Métier]'));

    const horizontal = applyMermaidOrientation(vertical, 'LR');
    assert.match(horizontal, /^%% Commentaire d'architecture\nflowchart LR\n/);
  });

  it('leaves non-flowchart Mermaid definitions intact', () => {
    const seq = `sequenceDiagram
  Client->>Serveur: POST /api/orders`;
    assert.equal(applyMermaidOrientation(seq, 'TD'), seq);
  });

  it('tokenizes TypeScript lines with keywords, functions, strings, and comments', () => {
    const tokens = tokenizeCodeLine(
      `export function calculerRemise(total: number) { return "OK"; // règle`,
      'ts'
    );
    assert.ok(tokens.some((t) => t.type === 'keyword' && t.text === 'export'));
    assert.ok(tokens.some((t) => t.type === 'keyword' && t.text === 'function'));
    assert.ok(tokens.some((t) => t.type === 'function' && t.text === 'calculerRemise'));
    assert.ok(tokens.some((t) => t.type === 'string' && t.text === '"OK"'));
    assert.ok(tokens.some((t) => t.type === 'comment' && t.text === '// règle'));
  });

  it('tokenizes SQL and file trees into semantic 4-palette tokens', () => {
    const sqlTokens = tokenizeCodeLine(
      `SELECT id, total FROM orders WHERE status = 'PAID';`,
      'sql'
    );
    assert.ok(sqlTokens.some((t) => t.type === 'keyword' && t.text === 'SELECT'));
    assert.ok(sqlTokens.some((t) => t.type === 'string' && t.text === `'PAID'`));

    const treeTokens = tokenizeCodeLine(`  ├── domain/  # Règles pures`, 'tree');
    assert.ok(treeTokens.some((t) => t.type === 'tree'));
    assert.ok(treeTokens.some((t) => t.type === 'keyword' && t.text.includes('domain/')));
    assert.ok(treeTokens.some((t) => t.type === 'comment' && t.text.includes('# Règles pures')));
  });
});
