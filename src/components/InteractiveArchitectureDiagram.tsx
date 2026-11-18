import React, { useState } from 'react';
import { ARCHITECTURE_PATTERNS, type ArchitecturePattern } from '../data/curriculumData';
import { Play, RotateCcw, ArrowRight, FileCode, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';

interface InteractiveArchitectureDiagramProps {
  compactMode?: boolean;
}

export const InteractiveArchitectureDiagram: React.FC<InteractiveArchitectureDiagramProps> = ({
  compactMode = false,
}) => {
  const [selectedPatternId, setSelectedPatternId] = useState<ArchitecturePattern['id']>('layered');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('layer-business');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const currentPattern =
    ARCHITECTURE_PATTERNS.find((p) => p.id === selectedPatternId) ?? ARCHITECTURE_PATTERNS[0];

  const activeSimStep =
    currentPattern.requestSimulationSteps[activeStepIndex] ??
    currentPattern.requestSimulationSteps[0];

  const effectiveSelectedNodeId = isSimulating
    ? activeSimStep.activeNodeId
    : currentPattern.nodes.some((n) => n.id === selectedNodeId)
    ? selectedNodeId
    : currentPattern.nodes[0].id;

  const activeNode =
    currentPattern.nodes.find((n) => n.id === effectiveSelectedNodeId) ?? currentPattern.nodes[0];

  const handleSelectPattern = (id: ArchitecturePattern['id']) => {
    setSelectedPatternId(id);
    setIsSimulating(false);
    setActiveStepIndex(0);
    const pat = ARCHITECTURE_PATTERNS.find((p) => p.id === id);
    if (pat && pat.nodes.length > 0) {
      setSelectedNodeId(pat.nodes[0].id);
    }
  };

  const handleNextStep = () => {
    setIsSimulating(true);
    setActiveStepIndex((prev) => (prev + 1) % currentPattern.requestSimulationSteps.length);
  };

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setActiveStepIndex(0);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setActiveStepIndex(0);
  };

  const getLayerBadgeColor = (layerType: 'presentation' | 'logic' | 'data' | 'external') => {
    switch (layerType) {
      case 'presentation':
        return { stroke: '#1E56A0', fill: '#EBF1FA', text: '#1E56A0', tag: 'PRÉSENTATION / VUE' };
      case 'logic':
        return { stroke: '#1B6B4A', fill: '#EAF5F0', text: '#1B6B4A', tag: 'LOGIQUE MÉTIER / CONTRÔLE' };
      case 'data':
        return { stroke: '#B85D19', fill: '#FDF3EB', text: '#B85D19', tag: 'ACCÈS DONNÉES / DÉPÔT' };
      case 'external':
        return { stroke: '#475569', fill: '#F1F5F9', text: '#334155', tag: 'PERSISTANCE / CLOUD' };
    }
  };

  return (
    <div className="w-full">
      {/* Sélecteur de Patron d'Architecture (Palette Tertiaire + Quaternaire, zéro pilule) */}
      <div className="mb-6">
        <div className="text-xs font-mono-tech uppercase tracking-wider text-palette-muted mb-2">
          Sélectionner un patron d’architecture (Cliquez pour manipuler le schéma)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {ARCHITECTURE_PATTERNS.map((pattern) => {
            const isSelected = pattern.id === selectedPatternId;
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => handleSelectPattern(pattern.id)}
                className={`text-left px-3.5 py-3 transition-colors duration-200 cursor-pointer flat-surface-tertiary ${
                  isSelected
                    ? 'state-active-border state-active-bg'
                    : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-mono-tech text-xs font-semibold ${
                      isSelected ? 'state-text-active' : 'text-palette-main'
                    }`}
                  >
                    {pattern.name.split(' (')[0]}
                  </span>
                  <span
                    className={`w-2 h-2 ${
                      isSelected ? 'bg-[#1E56A0]' : 'bg-[#D5D0C3]'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-palette-muted mt-1 line-clamp-1">
                  {pattern.frenchSubtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zone Sandbox en 2 colonnes : Schéma SVG Interactif (Gauche) + Contrôle & Anatomie (Droite) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Colonne Gauche (7 col) : Canevas Schéma Interactif SVG */}
        <div className="lg:col-span-7 flat-surface-tertiary p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#D5D0C3]">
            <div>
              <div className="text-xs font-mono-tech text-palette-muted">
                {currentPattern.sommervilleRef}
              </div>
              <h3 className="text-lg font-serif-editorial font-semibold text-palette-main">
                {currentPattern.name}
              </h3>
            </div>

            {/* Contrôles de simulation de flux (Palette Quaternaire d'état) */}
            <div className="flex items-center gap-2">
              {!isSimulating ? (
                <button
                  type="button"
                  onClick={handleStartSimulation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#1E56A0] text-white cursor-pointer transition-opacity hover:opacity-90"
                >
                  <Play className="w-3.5 h-3.5" />
                  Simuler un flux réel
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#1B6B4A] text-white cursor-pointer transition-opacity hover:opacity-90"
                  >
                    Étape {activeStepIndex + 1}/{currentPattern.requestSimulationSteps.length}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetSimulation}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono-tech text-palette-body flat-surface-tertiary-alt cursor-pointer hover:border-[#16181D]"
                    title="Réinitialiser la simulation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Arrêter
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Schéma Vectoriel SVG Interactif */}
          <div className="w-full bg-[#FAF8F5] border border-[#E5E0D5] p-2">
            <svg
              viewBox="0 0 600 370"
              className="w-full h-auto select-none"
              role="img"
              aria-label={`Schéma interactif de ${currentPattern.name}`}
            >
              <defs>
                <marker
                  id="arrow-default"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#687082" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#1E56A0" />
                </marker>
                <pattern id="arch-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#ECE8DF"
                    strokeWidth="0.75"
                  />
                </pattern>
              </defs>

              <rect width="600" height="370" fill="url(#arch-grid)" />

              {/* Connexions entre les blocs */}
              {currentPattern.connections.map((conn, idx) => {
                const fromNode = currentPattern.nodes.find((n) => n.id === conn.from);
                const toNode = currentPattern.nodes.find((n) => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                const x1 = fromNode.x + fromNode.width / 2;
                const y1 =
                  fromNode.y + fromNode.height < toNode.y
                    ? fromNode.y + fromNode.height
                    : fromNode.y > toNode.y + toNode.height
                    ? fromNode.y
                    : fromNode.y + fromNode.height / 2;

                const x2 = toNode.x + toNode.width / 2;
                const y2 =
                  toNode.y > fromNode.y + fromNode.height
                    ? toNode.y
                    : toNode.y + toNode.height < fromNode.y
                    ? toNode.y + toNode.height
                    : toNode.y + toNode.height / 2;

                const isFlowHighlighted =
                  isSimulating && activeStepIndex + 1 >= conn.flowStep;

                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;

                return (
                  <g key={`${conn.from}-${conn.to}-${idx}`}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isFlowHighlighted ? '#1E56A0' : '#9DA5B4'}
                      strokeWidth={isFlowHighlighted ? 2.5 : 1.5}
                      strokeDasharray={isFlowHighlighted ? 'none' : '4 3'}
                      markerEnd={isFlowHighlighted ? 'url(#arrow-active)' : 'url(#arrow-default)'}
                    />
                    <rect
                      x={midX - 78}
                      y={midY - 10}
                      width="156"
                      height="19"
                      fill="#FFFFFF"
                      stroke={isFlowHighlighted ? '#1E56A0' : '#D5D0C3'}
                      strokeWidth="1"
                    />
                    <text
                      x={midX}
                      y={midY + 3}
                      textAnchor="middle"
                      fontSize="9.5"
                      fontFamily="IBM Plex Mono, monospace"
                      fill={isFlowHighlighted ? '#1E56A0' : '#3A3F4B'}
                      fontWeight={isFlowHighlighted ? '600' : '400'}
                    >
                      {conn.label}
                    </text>
                  </g>
                );
              })}

              {/* Blocs / Noeuds Architecturaux Cliquables */}
              {currentPattern.nodes.map((node) => {
                const isSelected = node.id === effectiveSelectedNodeId;
                const style = getLayerBadgeColor(node.layerType);

                return (
                  <g
                    key={node.id}
                    onClick={() => {
                      setIsSimulating(false);
                      setSelectedNodeId(node.id);
                    }}
                    className="cursor-pointer"
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width={node.width}
                      height={node.height}
                      fill={isSelected ? style.fill : '#FFFFFF'}
                      stroke={isSelected ? style.stroke : '#9DA5B4'}
                      strokeWidth={isSelected ? '2.2' : '1'}
                    />
                    {/* Barre d'accentuation latérale gauche */}
                    <rect
                      x={node.x}
                      y={node.y}
                      width="6"
                      height={node.height}
                      fill={isSelected ? style.stroke : '#D5D0C3'}
                    />
                    <text
                      x={node.x + 16}
                      y={node.y + 22}
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fill="#16181D"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x + 16}
                      y={node.y + 41}
                      fontSize="10.5"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fill="#3A3F4B"
                    >
                      {node.role.length > 62 ? node.role.slice(0, 62) + '…' : node.role}
                    </text>
                    {node.height >= 75 && (
                      <text
                        x={node.x + 16}
                        y={node.y + 60}
                        fontSize="9.5"
                        fontFamily="IBM Plex Mono, monospace"
                        fill={style.text}
                      >
                        [{style.tag}] · Fichiers: {node.filesInProject[0]}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Barre d'état de simulation (Palette Quaternaire) */}
          {isSimulating ? (
            <div
              key={`sim-${activeStepIndex}`}
              className="mt-4 p-4 bg-[#EBF1FA] border border-[#1E56A0] animate-reveal-up"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono-tech font-semibold text-[#1E56A0] uppercase">
                  ● État de simulation actif — Étape {activeSimStep.step} : {activeSimStep.title}
                </span>
                <span className="text-xs font-mono-tech text-palette-muted">
                  Noeud actif : {activeNode.label}
                </span>
              </div>
              <p className="text-sm text-palette-main mb-2">{activeSimStep.description}</p>
              <div className="px-3 py-1.5 bg-white border border-[#D5D0C3] font-mono-tech text-xs text-[#16181D] overflow-x-auto">
                {activeSimStep.technicalPayload}
              </div>
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-palette-muted font-mono-tech">
              <span>Astuce : Cliquez sur n’importe quel bloc du schéma ou lancez la simulation.</span>
              <span>Signature : {currentPattern.treeSignature}</span>
            </div>
          )}
        </div>

        {/* Colonne Droite (5 col) : Inspection du Bloc Sélectionné & Règles de Décision */}
        <div className="lg:col-span-5 space-y-5">
          {/* Détail de la couche sélectionnée */}
          <div className="flat-surface-tertiary p-5">
            <div className="text-xs font-mono-tech uppercase tracking-wider state-text-active mb-1">
              Inspection du Bloc Sélectionné
            </div>
            <h4 className="text-base font-serif-editorial font-semibold text-palette-main mb-2">
              {activeNode.label}
            </h4>
            <p className="text-sm text-palette-body mb-4">{activeNode.details}</p>

            <div className="border-t border-[#D5D0C3] pt-3">
              <div className="text-xs font-mono-tech text-palette-muted mb-2 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 state-text-active" />
                Fichiers correspondants dans une arborescence réelle :
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNode.filesInProject.map((file) => (
                  <code
                    key={file}
                    className="px-2.5 py-1 text-xs font-mono-tech bg-[#FAF8F5] border border-[#D5D0C3] text-palette-main"
                  >
                    {file}
                  </code>
                ))}
              </div>
            </div>
          </div>

          {!compactMode && (
            <>
              {/* Quand choisir / Quand éviter ce patron */}
              <div className="flat-surface-tertiary p-5 space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold state-text-success uppercase mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Quand choisir {currentPattern.name.split(' (')[0]} :
                  </div>
                  <ul className="space-y-1.5 text-sm text-palette-body">
                    {currentPattern.whenToUse.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono-tech state-text-success font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#D5D0C3] pt-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold state-text-warning uppercase mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Limites & Cas à éviter :
                  </div>
                  <ul className="space-y-1.5 text-sm text-palette-body">
                    {currentPattern.whenToAvoid.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono-tech state-text-warning font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Directive Prompt pour guider l'IA */}
              <div className="flat-surface-tertiary-alt p-4 border-l-4 border-l-[#1E56A0]">
                <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold state-text-active uppercase mb-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Comment le demander à l’IA (Prompt Architecte) :
                </div>
                <p className="text-xs font-mono-tech text-palette-main leading-relaxed">
                  {currentPattern.aiPromptDirective}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
