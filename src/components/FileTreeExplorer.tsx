import React, { useState } from 'react';
import { PROJECT_FILE_TREE, type FileTreeNode } from '../data/curriculumData';
import { flattenFileTree } from '../utils/mentorEngine';
import { Folder, FileText, AlertCircle, Sparkles, Compass, ShieldAlert } from 'lucide-react';

export const FileTreeExplorer: React.FC = () => {
  const allNodes = flattenFileTree(PROJECT_FILE_TREE);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-root-docs');
  const [layerFilter, setLayerFilter] = useState<FileTreeNode['layer'] | 'all'>('all');

  const selectedNode = allNodes.find((n) => n.id === selectedNodeId) ?? allNodes[0];

  const getLayerLabel = (layer: FileTreeNode['layer']) => {
    switch (layer) {
      case 'documentation':
        return { label: 'MÉMOIRE & ARCHITECTURE', color: '#1E56A0' };
      case 'configuration':
        return { label: 'CONFIGURATION SOCLE', color: '#475569' };
      case 'presentation':
        return { label: 'COUCHE PRÉSENTATION (UI)', color: '#1E56A0' };
      case 'metier':
        return { label: 'COUCHE MÉTIER & LOGIQUE', color: '#1B6B4A' };
      case 'donnees':
        return { label: 'COUCHE DONNÉES & SCHÉMAS', color: '#B85D19' };
      case 'serveur':
        return { label: 'COUCHE SERVEUR BACKEND', color: '#A62626' };
    }
  };

  const renderTreeItem = (node: FileTreeNode, depth = 0) => {
    const matchesFilter = layerFilter === 'all' || node.layer === layerFilter;
    const isSelected = node.id === selectedNodeId;
    const badge = getLayerLabel(node.layer);

    return (
      <div key={node.id}>
        {matchesFilter && (
          <button
            type="button"
            onClick={() => setSelectedNodeId(node.id)}
            style={{ paddingLeft: `${depth * 20 + 14}px` }}
            className={`w-full text-left py-2.5 pr-3 border-b border-[#E5E0D5] transition-colors cursor-pointer flex items-center justify-between gap-2 ${
              isSelected
                ? 'bg-[#EBF1FA] border-l-4 border-l-[#1E56A0]'
                : 'bg-white hover:bg-[#FAF8F5]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {node.type === 'folder' ? (
                <Folder className="w-4 h-4 shrink-0 text-[#B85D19]" />
              ) : (
                <FileText className="w-4 h-4 shrink-0 text-[#1E56A0]" />
              )}
              <span
                className={`font-mono-tech text-xs truncate ${
                  isSelected ? 'font-semibold text-[#1E56A0]' : 'text-palette-main'
                }`}
              >
                {node.name}
              </span>
            </div>
            <span
              className="text-[10px] font-mono-tech shrink-0 px-1.5 py-0.5 border border-[#D5D0C3] bg-[#FAF8F5]"
              style={{ color: badge.color }}
            >
              {node.importance.toUpperCase()}
            </span>
          </button>
        )}
        {node.children &&
          node.children.map((child) => renderTreeItem(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="my-8">
      {/* Filtres par couche architecturale */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-mono-tech uppercase text-palette-muted">
          Filtrer l’arborescence par responsabilité architecturale :
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all' as const, label: 'Toute l’arborescence' },
            { id: 'documentation' as const, label: 'Mémoire (context/plan)' },
            { id: 'configuration' as const, label: 'Configuration' },
            { id: 'presentation' as const, label: 'Présentation (UI)' },
            { id: 'metier' as const, label: 'Métier (Utils/Services)' },
            { id: 'donnees' as const, label: 'Données (Data/DB)' },
            { id: 'serveur' as const, label: 'Serveur (Backend)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setLayerFilter(tab.id)}
              className={`px-2.5 py-1.5 text-xs font-mono-tech cursor-pointer flat-surface-tertiary ${
                layerFilter === tab.id
                  ? 'state-active-border state-active-bg state-text-active font-semibold'
                  : 'text-palette-body hover:bg-[#FAF8F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille 2 colonnes : Arborescence à gauche, Radiographie complète à droite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 flat-surface-tertiary overflow-hidden">
          <div className="px-4 py-3 bg-[#FAF8F5] border-b border-[#D5D0C3] flex items-center justify-between">
            <span className="text-xs font-mono-tech font-semibold text-palette-main">
              EXPLORATEUR DE PROJET TYPE
            </span>
            <span className="text-[11px] font-mono-tech text-palette-muted">
              Cliquez sur un fichier
            </span>
          </div>
          <div className="divide-y divide-[#E5E0D5]">
            {PROJECT_FILE_TREE.map((node) => renderTreeItem(node, 0))}
          </div>
        </div>

        {/* Panneau d'inspection du fichier sélectionné */}
        <div className="lg:col-span-7 flat-surface-tertiary p-6 space-y-5">
          <div className="border-b border-[#D5D0C3] pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <code className="text-xs font-mono-tech font-semibold state-text-active">
                Chemin : {selectedNode.path}
              </code>
              <span className="text-xs font-mono-tech text-palette-muted">
                Couche : {getLayerLabel(selectedNode.layer).label}
              </span>
            </div>
            <h3 className="text-xl font-serif-editorial font-semibold text-palette-main mt-1">
              {selectedNode.name}
            </h3>
            <p className="text-sm text-palette-body mt-2">{selectedNode.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
              <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold text-palette-main uppercase mb-2">
                <Compass className="w-4 h-4 state-text-active" />
                Ce qu’il contient exactement
              </div>
              <p className="text-sm text-palette-body leading-relaxed">
                {selectedNode.whatIsInside}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
              <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold state-text-success uppercase mb-2">
                <AlertCircle className="w-4 h-4" />
                Indice pour repérer l’architecture
              </div>
              <p className="text-sm text-palette-body leading-relaxed">
                {selectedNode.architectureClue}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FDF2F2] border border-[#A62626]/40">
            <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold state-text-danger uppercase mb-1">
              <ShieldAlert className="w-4 h-4" />
              Risque si ce fichier est mal utilisé ou absent :
            </div>
            <p className="text-sm text-palette-main">{selectedNode.dangerIfBroken}</p>
          </div>

          <div className="p-4 bg-[#EBF1FA] border border-[#1E56A0]">
            <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold state-text-active uppercase mb-1.5">
              <Sparkles className="w-4 h-4" />
              Comment guider l’IA sur cet élément :
            </div>
            <p className="text-xs font-mono-tech text-palette-main leading-relaxed">
              {selectedNode.howToGuideAi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
