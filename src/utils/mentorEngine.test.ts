import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMasteryProgress,
  evaluateArchitectDecision,
  filterGlossaryTerms,
  flattenFileTree,
} from './mentorEngine.ts';

describe('mentorEngine pure logic', () => {
  it('recommends Client-Server + SQL + Cloud Run when AI secret API and financial relations are selected', () => {
    const decision = evaluateArchitectDecision({
      projectType: 'ai-secret-api',
      dataRelationship: 'strict-financial-relations',
      trafficPattern: 'spiky-serverless',
      offlineRequired: false,
    });

    assert.equal(decision.recommendedArchitecture.id, 'client-server');
    assert.equal(decision.recommendedDataModel.id, 'sql-relational');
    assert.equal(decision.recommendedHosting.id, 'cloud-run-containers');
    assert.equal(decision.supplementaryOfflineStrategy, null);
    assert.ok(decision.suggestedFolderBlueprint.some((item) => item.includes('server.ts')));
    assert.ok(decision.suggestedFolderBlueprint.some((item) => item.includes('schema.ts')));
  });

  it('recommends Repository + NoSQL Document + offline sync strategy for shared medical records with offline constraint', () => {
    const decision = evaluateArchitectDecision({
      projectType: 'shared-medical-records',
      dataRelationship: 'flexible-realtime-docs',
      trafficPattern: 'realtime-auth-baas',
      offlineRequired: true,
    });

    assert.equal(decision.recommendedArchitecture.id, 'repository');
    assert.equal(decision.recommendedDataModel.id, 'nosql-document');
    assert.equal(decision.recommendedHosting.id, 'baas-serverless');
    assert.ok(decision.supplementaryOfflineStrategy !== null);
    assert.ok(decision.supplementaryOfflineStrategy.includes('Local-First'));
  });

  it('flattens the hierarchical project file tree including nested src children', () => {
    const flatNodes = flattenFileTree();
    assert.ok(flatNodes.length >= 10);
    assert.ok(flatNodes.some((n) => n.id === 'node-package-json'));
    assert.ok(flatNodes.some((n) => n.id === 'node-src-utils'));
  });

  it('filters glossary terms accurately by search query and category', () => {
    const crudAllResults = filterGlossaryTerms('CRUD', 'all');
    assert.equal(crudAllResults.length, 3);
    assert.equal(crudAllResults[0].id, 'term-crud');

    const crudDataOnly = filterGlossaryTerms('CRUD', 'donnees');
    assert.equal(crudDataOnly.length, 1);
    assert.equal(crudDataOnly[0].id, 'term-crud');

    const securityResults = filterGlossaryTerms('', 'securite-qualite');
    assert.ok(securityResults.length >= 3);
    assert.ok(securityResults.every((t) => t.category === 'securite-qualite'));
  });

  it('computes mastery progress percentage and rank labels accurately', () => {
    const start = calculateMasteryProgress([], 6, 0, 6);
    assert.equal(start.percentage, 0);
    assert.equal(start.rankLabel, 'Apprenti Concepteur');

    const mid = calculateMasteryProgress(['m1', 'm2', 'm3'], 6, 3, 6);
    assert.equal(mid.percentage, 50);
    assert.equal(mid.rankLabel, 'Ingénieur Structure & Flux');

    const full = calculateMasteryProgress(['m1', 'm2', 'm3', 'm4', 'm5', 'm6'], 6, 6, 6);
    assert.equal(full.percentage, 100);
    assert.equal(full.rankLabel, 'Architecte Logiciel Accompli');
  });
});
