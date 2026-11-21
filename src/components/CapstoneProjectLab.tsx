import React, { useState } from 'react';
import { CAPSTONE_PROJECT_SPEC } from '../data/curriculumData';
import { AiStudioScenarioLab } from './AiStudioScenarioLab';
import { Check, Copy, CheckSquare, Square, Terminal, FileText } from 'lucide-react';

import {
  DEFAULT_CAPSTONE_BUSINESS_RULE,
  DEFAULT_CAPSTONE_PROJECT_NAME,
} from '../persistence/progressStorage';

interface CapstoneProjectLabProps {
  onScenarioStepSolved?: (stepKey: string) => void;
  solvedSteps?: string[];
  checkedMilestones?: string[];
  onToggleMilestone?: (id: string) => void;
  customProjectName?: string;
  onChangeProjectName?: (value: string) => void;
  customBusinessRule?: string;
  onChangeBusinessRule?: (value: string) => void;
}

export const CapstoneProjectLab: React.FC<CapstoneProjectLabProps> = ({
  onScenarioStepSolved,
  solvedSteps = [],
  checkedMilestones: controlledMilestones,
  onToggleMilestone,
  customProjectName: controlledProjectName,
  onChangeProjectName,
  customBusinessRule: controlledBusinessRule,
  onChangeBusinessRule,
}) => {
  const [localMilestones, setLocalMilestones] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [localProjectName, setLocalProjectName] = useState<string>(DEFAULT_CAPSTONE_PROJECT_NAME);
  const [localBusinessRule, setLocalBusinessRule] = useState<string>(DEFAULT_CAPSTONE_BUSINESS_RULE);

  const checkedMilestones = controlledMilestones ?? localMilestones;
  const customProjectName = controlledProjectName ?? localProjectName;
  const customBusinessRule = controlledBusinessRule ?? localBusinessRule;

  const setCustomProjectName = (value: string) => {
    if (onChangeProjectName) {
      onChangeProjectName(value);
    } else {
      setLocalProjectName(value);
    }
  };

  const setCustomBusinessRule = (value: string) => {
    if (onChangeBusinessRule) {
      onChangeBusinessRule(value);
    } else {
      setLocalBusinessRule(value);
    }
  };

  const toggleMilestone = (id: string) => {
    if (onToggleMilestone) {
      onToggleMilestone(id);
      return;
    }
    setLocalMilestones((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const copyText = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const generatedStarterBundle = `# context.md — ${customProjectName}
## Vision
Application web modulaire construite en couches.
Règle métier centrale : ${customBusinessRule}

# plan.md — Méthode Incrémentale
- Incrément 1 : Contrats TypeScript (/src/types.ts) & Moteur métier pur (/src/utils/) + Tests unitaires
- Incrément 2 : Couche de service et persistance (/src/services/ & /src/data/)
- Incrément 3 : Interface minimaliste en DM Sans (/src/components/ & /src/App.tsx)

# agents.md — Règles Techniques & Design
- Architecture en couches obligatoire (Présentation, Métier, Données).
- 4 palettes de couleurs, cartes plates à bordure fine 1px sans ombre, zéro pilule de texte, police DM Sans.`;

  return (
    <div className="space-y-20 mt-12">
      {/* Partie 1 : Entraînement sur les 2 Scénarios Réels Google AI Studio */}
      <div className="space-y-6">
        <div className="max-w-[65ch] space-y-3">
          <h3 className="font-editorial-serif font-medium text-[1.75rem] sm:text-[2.4rem] leading-[1.12] tracking-[-0.015em] text-palette-main">
            Étape 1 — Entraînement : Scénarios de Décision sur Google AI Studio
          </h3>
          <p className="text-[1.05rem] sm:text-[1.18rem] text-palette-body leading-[1.56]">
            Avant de construire ton projet final, teste tes réflexes d’architecte sur ces deux cas réels inspirés d’Ian Sommerville.
          </p>
        </div>
        <AiStudioScenarioLab
          onScenarioStepSolved={onScenarioStepSolved}
          solvedSteps={solvedSteps}
        />
      </div>

      {/* Partie 2 : Le Projet Final de Fin de Formation à Construire */}
      <div id="projet-final" className="pt-14 editorial-rule-fine">
        <div className="max-w-[65ch] mb-10 space-y-4">
          <div className="text-xs font-mono-tech uppercase tracking-widest state-text-active font-semibold">
            PROJET DE FIN DE FORMATION · MISE EN PRATIQUE COMPLÈTE
          </div>
          <h3 className="font-editorial-serif font-medium text-[2rem] sm:text-[2.85rem] text-palette-main leading-[1.08] tracking-[-0.02em]">
            {CAPSTONE_PROJECT_SPEC.title}
          </h3>
          <p className="text-[1.08rem] sm:text-[1.22rem] text-palette-body leading-[1.56]">
            {CAPSTONE_PROJECT_SPEC.subtitle}
          </p>
          <div className="editorial-rule-strong pt-2" />
        </div>

        {/* Brief du Projet écrit simplement et clairement */}
        <div className="max-w-4xl space-y-6 mb-14">
          <h4 className="text-xl font-bold text-palette-main">
            Le Cahier des Charges de ton Projet
          </h4>
          <p className="text-base sm:text-lg text-palette-body leading-relaxed">
            {CAPSTONE_PROJECT_SPEC.missionBrief}
          </p>

          <div className="pt-4 space-y-3">
            <div className="text-sm font-mono-tech uppercase text-palette-muted font-semibold">
              Les 4 Contraintes d’Ingénierie que tu dois faire respecter à l’IA :
            </div>
            <ul className="space-y-3 text-base text-palette-main">
              {CAPSTONE_PROJECT_SPEC.architecturalConstraints.map((constraint, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono-tech text-sm font-bold state-text-active mt-1">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed">{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Les 4 Missions (Incréments) à réaliser pas à pas */}
        <div className="space-y-10 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h4 className="text-2xl font-bold text-palette-main">
              Les 4 Missions Séquentielles à Exécuter dans Google AI Studio
            </h4>
            <span className="text-xs font-mono-tech px-3 py-1.5 flat-surface-tertiary text-palette-main">
              Progression Projet : {checkedMilestones.length} / {CAPSTONE_PROJECT_SPEC.milestones.length} missions validées
            </span>
          </div>

          <div className="space-y-8">
            {CAPSTONE_PROJECT_SPEC.milestones.map((ms) => {
              const isDone = checkedMilestones.includes(ms.id);
              return (
                <div
                  key={ms.id}
                  className={`flat-surface-tertiary p-6 sm:p-8 transition-colors ${
                    isDone ? 'border-[#1B6B4A] bg-[#EAF5F0]/30' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="text-xs font-mono-tech uppercase state-text-active font-semibold mb-1">
                        {ms.number}
                      </div>
                      <h5 className="text-2xl font-bold text-palette-main">{ms.title}</h5>
                      <p className="text-base text-palette-body mt-1">{ms.subtitle}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleMilestone(ms.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-tech cursor-pointer flat-surface-tertiary ${
                        isDone
                          ? 'border-[#1B6B4A] bg-[#EAF5F0] state-text-success font-semibold'
                          : 'text-palette-main hover:border-[#1E56A0]'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckSquare className="w-4 h-4" />
                          Mission accomplie
                        </>
                      ) : (
                        <>
                          <Square className="w-4 h-4" />
                          Valider cette mission
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-base text-palette-body leading-relaxed mb-6 max-w-3xl">
                    <strong>Objectif :</strong> {ms.objective}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-xs font-mono-tech uppercase text-palette-muted mb-2">
                        Fichiers que tu dois voir apparaître dans l’arborescence :
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ms.deliverables.map((file) => (
                          <code
                            key={file}
                            className="px-2.5 py-1 text-xs font-mono-tech bg-[#FAF9F5] border border-[#DCD7CA] text-palette-main"
                          >
                            {file}
                          </code>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono-tech uppercase text-palette-muted mb-2">
                        Points de contrôle Architecte :
                      </div>
                      <ul className="space-y-1.5 text-sm text-palette-body">
                        {ms.architectChecklist.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-mono-tech state-text-success font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Prompt à copier pour cette mission */}
                  <div className="p-4 bg-[#FAF9F5] border border-[#DCD7CA]">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-semibold state-text-active uppercase">
                        <Terminal className="w-3.5 h-3.5" />
                        Prompt à envoyer à Google AI Studio pour cette mission :
                      </span>
                      <button
                        type="button"
                        onClick={() => copyText(ms.id, ms.promptToUse)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono-tech bg-white border border-[#DCD7CA] text-palette-main cursor-pointer hover:border-[#1E56A0]"
                      >
                        {copiedId === ms.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 state-text-success" />
                            Copié
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copier le prompt
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-mono-tech text-palette-main leading-relaxed">
                      « {ms.promptToUse} »
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Générateur Personnel de Kit de Démarrage (context.md + plan.md + agents.md) */}
        <div className="flat-surface-tertiary p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase state-text-active font-semibold mb-2">
            <FileText className="w-4 h-4" />
            Atelier Pratique : Prépare ton Propre Kit d’Architecte (context.md · plan.md · agents.md)
          </div>
          <h4 className="text-2xl font-bold text-palette-main mb-2">
            Personnalise le Socle de ton Prochain Projet
          </h4>
          <p className="text-base text-palette-body mb-6 max-w-3xl">
            Modifie le nom du projet et ta règle métier principale ci-dessous pour générer la trame prête à coller dans ton prochain espace de travail Google AI Studio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="capstone-project-name"
                className="block text-xs font-mono-tech uppercase text-palette-main font-semibold mb-1.5"
              >
                Nom de ton projet à construire :
              </label>
              <input
                id="capstone-project-name"
                type="text"
                value={customProjectName}
                onChange={(e) => setCustomProjectName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm flat-input-tertiary"
              />
            </div>

            <div>
              <label
                htmlFor="capstone-business-rule"
                className="block text-xs font-mono-tech uppercase text-palette-main font-semibold mb-1.5"
              >
                Règle métier principale à isoler dans /src/utils/ :
              </label>
              <input
                id="capstone-business-rule"
                type="text"
                value={customBusinessRule}
                onChange={(e) => setCustomBusinessRule(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm flat-input-tertiary"
              />
            </div>
          </div>

          <div className="p-4 bg-[#FAF9F5] border border-[#DCD7CA]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono-tech font-semibold text-palette-main uppercase">
                Trame Générée (context.md + plan.md + agents.md) :
              </span>
              <button
                type="button"
                onClick={() => copyText('starter-bundle', generatedStarterBundle)}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono-tech bg-white border border-[#DCD7CA] text-palette-main cursor-pointer hover:border-[#1E56A0]"
              >
                {copiedId === 'starter-bundle' ? (
                  <>
                    <Check className="w-3.5 h-3.5 state-text-success" />
                    Trame copiée !
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copier la trame complète
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono-tech text-palette-main whitespace-pre-wrap leading-relaxed">
              {generatedStarterBundle}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
