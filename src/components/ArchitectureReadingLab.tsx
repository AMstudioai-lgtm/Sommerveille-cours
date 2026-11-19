import React, { useState } from 'react';
import {
  AI_DIRECTIVES,
  AUDIT_QUIZ_CASES,
  CONVERSION_CRITERIA,
  EXTRACTION_CRITERIA,
  FIVE_ARCHITECTURES,
  FUNCTION_XRAY_PARTS,
  MODULE_VS_SERVICE_COMPARISON,
  RADAR_TABLE_ROWS,
  SCALE_LEVELS,
  type DirectiveKey,
  type FiveArchKey,
  type ScaleKey,
  type XrayPartKey,
} from '../data/architectureReadingData';
import {
  FIVE_ARCH_VISUALS,
  MODULE5_COMMUNICATION_CODE,
  MODULE5_COMMUNICATION_MERMAID,
  MODULE5_DIRECTIVE_MERMAID,
  MODULE5_EXTRACTION_CODE,
  MODULE5_EXTRACTION_MERMAID,
  MODULE5_SCALE_MERMAID,
  MODULE5_THREE_FORMS_CODE,
  MODULE5_XRAY_CODE_EXAMPLES,
} from '../data/module5VisualsData';
import {
  evaluateFunctionExtraction,
  evaluateModuleToServiceConversion,
  type ConversionCriteriaState,
  type ExtractionCriteriaState,
} from '../utils/mentorEngine';
import { CodeSnippetBlock } from './CodeSnippetBlock';
import { MermaidDiagramBlock } from './MermaidDiagramBlock';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Info,
  RotateCcw,
  XCircle,
} from 'lucide-react';

interface ArchitectureReadingLabProps {
  onAuditCaseSolved: (stepKey: string) => void;
  solvedSteps: string[];
}

function CopyPromptButton({ text, label = 'Copier' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const finish = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(finish)
        .catch(() => {
          fallbackCopy(text);
          finish();
        });
    } else {
      fallbackCopy(text);
      finish();
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium flat-surface-tertiary text-palette-main hover:border-[#1E56A0] hover:text-[#1E56A0] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#1B6B4A]" />
          <span className="text-[#1B6B4A]">Copié</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

function fallbackCopy(text: string) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(ta);
  }
}

export function ArchitectureReadingLab({
  onAuditCaseSolved,
  solvedSteps,
}: ArchitectureReadingLabProps) {
  // 5.1 Échelle & X-Ray
  const [activeScaleKey, setActiveScaleKey] = useState<ScaleKey>('fonction');
  const [activeXrayKey, setActiveXrayKey] = useState<XrayPartKey>('decl');

  // 5.2 Simulateur d'extraction de fonction
  const [extractState, setExtractState] = useState<ExtractionCriteriaState>({
    reused: false,
    multi: false,
    critical: false,
    long: false,
    trivial: false,
  });

  // 5.3 Module vs Service + Calculateur de conversion
  const [msViewMode, setMsViewMode] = useState<'module' | 'service'>('module');
  const [conversionState, setConversionState] = useState<ConversionCriteriaState>({
    scale: false,
    fault: false,
    team: false,
    stack: false,
    security: false,
  });

  // 5.4 Explorateur des 5 architectures
  const [activeArchKey, setActiveArchKey] = useState<FiveArchKey>('layered');
  const [selectedNodeByArch, setSelectedNodeByArch] = useState<Record<FiveArchKey, string>>({
    layered: FIVE_ARCHITECTURES[0].defaultNode,
    mvc: FIVE_ARCHITECTURES[1].defaultNode,
    modular: FIVE_ARCHITECTURES[2].defaultNode,
    hexagonal: FIVE_ARCHITECTURES[3].defaultNode,
    microservices: FIVE_ARCHITECTURES[4].defaultNode,
  });

  // 5.5 Directives IA
  const [activeDirectiveKey, setActiveDirectiveKey] = useState<DirectiveKey>('feature');

  // 5.6 Atelier d'Audit (Quiz)
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSessionScore, setQuizSessionScore] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const activeScale =
    SCALE_LEVELS.find((item) => item.key === activeScaleKey) ?? SCALE_LEVELS[0];
  const activeXray = FUNCTION_XRAY_PARTS[activeXrayKey];
  const extractVerdict = evaluateFunctionExtraction(extractState);
  const conversionVerdict = evaluateModuleToServiceConversion(conversionState);

  const activeArch =
    FIVE_ARCHITECTURES.find((a) => a.key === activeArchKey) ?? FIVE_ARCHITECTURES[0];
  const currentNodeKey = selectedNodeByArch[activeArchKey] ?? activeArch.defaultNode;
  const activeNodeDetail = activeArch.details[currentNodeKey];

  const activeDirective =
    AI_DIRECTIVES.find((d) => d.key === activeDirectiveKey) ?? AI_DIRECTIVES[0];

  const solvedAuditCount = AUDIT_QUIZ_CASES.filter((c) => solvedSteps.includes(c.id)).length;
  const isQuizFinished = quizIndex >= AUDIT_QUIZ_CASES.length;
  const currentQuizCase = !isQuizFinished ? AUDIT_QUIZ_CASES[quizIndex] : null;

  const handleSelectQuizOption = (optionIdx: number) => {
    if (selectedOptionIndex !== null || !currentQuizCase) return;
    setSelectedOptionIndex(optionIdx);
    if (optionIdx === currentQuizCase.correctIndex) {
      setQuizSessionScore((prev) => prev + 1);
      onAuditCaseSolved(currentQuizCase.id);
    }
  };

  const handleNextQuizCase = () => {
    setSelectedOptionIndex(null);
    setQuizIndex((prev) => prev + 1);
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizSessionScore(0);
    setSelectedOptionIndex(null);
  };

  const getVerdictContainerClass = (tone: 'neutral' | 'active' | 'success' | 'warning' | 'danger') => {
    if (tone === 'danger') return 'border-[#A62626] bg-[#FDF2F2]';
    if (tone === 'warning') return 'border-[#B85D19] bg-[#FDF6EE]';
    if (tone === 'success') return 'border-[#1B6B4A] bg-[#EAF5F0]';
    if (tone === 'active') return 'border-[#1E56A0] bg-[#EDF3FC]';
    return 'border-[#DCD7CA] bg-[#FAF9F5]';
  };

  const getVerdictLabelClass = (tone: 'neutral' | 'active' | 'success' | 'warning' | 'danger') => {
    if (tone === 'danger') return 'state-text-danger';
    if (tone === 'warning') return 'state-text-warning';
    if (tone === 'success') return 'state-text-success';
    if (tone === 'active') return 'state-text-active';
    return 'text-palette-muted';
  };

  return (
    <div className="space-y-24">
      {/* =====================================================================
          SOUS-MODULE 5.1 : ÉCHELLE DU LOGICIEL & ANATOMIE D'UNE FONCTION
         ===================================================================== */}
      <article id="atelier-5-1-echelle" className="scroll-mt-24 pt-12 border-t border-[#DCD7CA] space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
            Sous-module 5.1 · Fondamentaux de lecture
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-palette-main leading-tight">
            L’échelle du logiciel : de la Fonction au Service
          </h3>
          <p className="text-lg sm:text-xl text-palette-body leading-relaxed">
            La plupart des maladresses quand on pilote une IA viennent d’une confusion d’échelle :
            demander « un service » pour une simple fonction, ou mélanger deux modules en un seul bloc.
          </p>
        </div>

        {/* Schéma Mermaid de l'échelle logicielle */}
        <MermaidDiagramBlock
          title={MODULE5_SCALE_MERMAID.title}
          caption={MODULE5_SCALE_MERMAID.caption}
          definition={MODULE5_SCALE_MERMAID.definition}
        />

        {/* Sélecteur 4 niveaux */}
        <div className="flat-surface-tertiary p-5 sm:p-8 space-y-6 min-w-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" role="tablist" aria-label="Échelle logicielle">
            {SCALE_LEVELS.map((lvl) => {
              const isSelected = lvl.key === activeScaleKey;
              return (
                <button
                  key={lvl.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveScaleKey(lvl.key)}
                  className={`p-4 text-left border transition-colors cursor-pointer min-w-0 ${
                    isSelected
                      ? 'border-[#1E56A0] bg-[#EDF3FC]'
                      : 'border-[#DCD7CA] bg-[#FAF9F5] hover:border-[#3B4049]'
                  }`}
                >
                  <span
                    className={`block font-mono-tech text-xs mb-1 ${
                      isSelected ? 'state-text-active font-semibold' : 'text-palette-muted'
                    }`}
                  >
                    {lvl.levelLabel}
                  </span>
                  <span className="block text-sm sm:text-base font-bold text-palette-main break-words">
                    {lvl.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
            <div className="lg:col-span-6 space-y-4 min-w-0">
              <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
                {activeScale.title}
              </div>
              <p className="text-base text-palette-main leading-relaxed break-words">
                <strong>Image mentale :</strong> {activeScale.metaphor}
              </p>
              <p className="text-base text-palette-body leading-relaxed break-words">
                <strong className="text-palette-main">Règle clé :</strong> {activeScale.rule}
              </p>
              <div className="flat-surface-tertiary-alt p-4 space-y-2 min-w-0">
                <div className="text-xs font-mono-tech uppercase text-palette-muted">
                  Comment en parler à l’IA
                </div>
                <p className="text-sm font-mono-tech text-palette-main leading-relaxed break-words">
                  {activeScale.sayToAI}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 min-w-0">
              <CodeSnippetBlock
                language="tree"
                title="Ce que voit ton œil dans le projet"
                code={activeScale.tree}
                compact
              />
            </div>
          </div>
        </div>

        {/* Anatomie X-Ray d'une fonction */}
        <div className="space-y-4">
          <div className="max-w-3xl space-y-2">
            <h4 className="text-xl sm:text-2xl font-bold text-palette-main">
              Savoir dire : « Ceci est une fonction » (sans savoir coder)
            </h4>
            <p className="text-base text-palette-body leading-relaxed">
              Une fonction est une <strong>boîte d’action nommée</strong> : on lui donne des
              ingrédients en entrée, elle exécute une recette et rend un résultat. Clique sur chaque
              segment souligné pour inspecter son rôle.
            </p>
          </div>

          <div className="flat-surface-tertiary p-5 sm:p-8 space-y-6 min-w-0">
            {/* Boutons rapides de sélection des 5 parties + code X-Ray cliquable */}
            <div className="p-5 bg-[#FAF9F5] border border-[#DCD7CA] font-mono-tech text-sm sm:text-base leading-loose overflow-x-auto max-w-full">
              <div className="whitespace-pre">
                <button
                  type="button"
                  onClick={() => setActiveXrayKey('decl')}
                  className={`inline px-1.5 py-0.5 border-b-2 transition-colors cursor-pointer ${
                    activeXrayKey === 'decl'
                      ? 'bg-[#EDF3FC] border-[#1E56A0] text-[#1E56A0] font-semibold'
                      : 'border-[#DCD7CA] hover:bg-[#F3F1EA] text-palette-main'
                  }`}
                >
                  function
                </button>{' '}
                <button
                  type="button"
                  onClick={() => setActiveXrayKey('name')}
                  className={`inline px-1.5 py-0.5 border-b-2 transition-colors cursor-pointer ${
                    activeXrayKey === 'name'
                      ? 'bg-[#EDF3FC] border-[#1E56A0] text-[#1E56A0] font-semibold'
                      : 'border-[#DCD7CA] hover:bg-[#F3F1EA] text-palette-main'
                  }`}
                >
                  calculerTotalCommande
                </button>
                <button
                  type="button"
                  onClick={() => setActiveXrayKey('params')}
                  className={`inline px-1.5 py-0.5 border-b-2 transition-colors cursor-pointer ${
                    activeXrayKey === 'params'
                      ? 'bg-[#EDF3FC] border-[#1E56A0] text-[#1E56A0] font-semibold'
                      : 'border-[#DCD7CA] hover:bg-[#F3F1EA] text-palette-main'
                  }`}
                >
                  (articles, tauxReduction)
                </button>{' '}
                {'{'}
                {'\n  '}
                <button
                  type="button"
                  onClick={() => setActiveXrayKey('body')}
                  className={`inline text-left px-1.5 py-0.5 border-b-2 transition-colors cursor-pointer ${
                    activeXrayKey === 'body'
                      ? 'bg-[#EDF3FC] border-[#1E56A0] text-[#1E56A0] font-semibold'
                      : 'border-[#DCD7CA] hover:bg-[#F3F1EA] text-palette-main'
                  }`}
                >
                  {`const sousTotal = additionnerPrix(articles);\n  const remise = sousTotal * tauxReduction;`}
                </button>
                {'\n  '}
                <button
                  type="button"
                  onClick={() => setActiveXrayKey('return')}
                  className={`inline px-1.5 py-0.5 border-b-2 transition-colors cursor-pointer ${
                    activeXrayKey === 'return'
                      ? 'bg-[#EDF3FC] border-[#1E56A0] text-[#1E56A0] font-semibold'
                      : 'border-[#DCD7CA] hover:bg-[#F3F1EA] text-palette-main'
                  }`}
                >
                  return sousTotal - remise;
                </button>
                {'\n}'}
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCD7CA] space-y-4 min-w-0">
              <div className="text-base font-bold text-palette-main">{activeXray.title}</div>
              <p className="text-base text-palette-body leading-relaxed break-words">
                {activeXray.text}
              </p>
              <p className="text-sm font-medium text-palette-main leading-relaxed break-words">
                {activeXray.check}
              </p>
              <CodeSnippetBlock
                language={MODULE5_XRAY_CODE_EXAMPLES[activeXrayKey].language}
                title={MODULE5_XRAY_CODE_EXAMPLES[activeXrayKey].title}
                filename={MODULE5_XRAY_CODE_EXAMPLES[activeXrayKey].filename}
                caption={MODULE5_XRAY_CODE_EXAMPLES[activeXrayKey].caption}
                code={MODULE5_XRAY_CODE_EXAMPLES[activeXrayKey].code}
                compact
              />
            </div>
          </div>

          <div className="space-y-4 max-w-4xl min-w-0">
            <div className="flat-surface-tertiary-alt p-5 space-y-2 min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono-tech uppercase state-text-active font-semibold">
                <Info className="w-4 h-4 shrink-0" />
                <span>Les 3 écritures équivalentes que tu croiseras chez l’IA</span>
              </div>
              <p className="text-sm sm:text-base text-palette-body leading-relaxed break-words">
                En TypeScript ou JavaScript, l’IA écrit une même fonction sous trois formes
                strictement équivalentes : déclaration classique, fonction fléchée ou méthode dans
                une classe. Repère toujours le <strong className="text-palette-main">verbe d’action</strong> suivi
                de ses parenthèses d’entrées dans le bloc ci-dessous.
              </p>
            </div>
            <CodeSnippetBlock
              language={MODULE5_THREE_FORMS_CODE.language}
              title={MODULE5_THREE_FORMS_CODE.title}
              filename={MODULE5_THREE_FORMS_CODE.filename}
              caption={MODULE5_THREE_FORMS_CODE.caption}
              code={MODULE5_THREE_FORMS_CODE.code}
            />
          </div>
        </div>
      </article>

      {/* =====================================================================
          SOUS-MODULE 5.2 : QUAND METTRE UNE FONCTION À PART ?
         ===================================================================== */}
      <article id="atelier-5-2-extraction" className="scroll-mt-24 pt-12 border-t border-[#DCD7CA] space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
            Sous-module 5.2 · Granularité & découpage
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-palette-main leading-tight">
            Quand une fonction doit-elle être mise à part ?
          </h3>
          <p className="text-lg sm:text-xl text-palette-body leading-relaxed">
            Ni blocs géants de 120 lignes qui font tout à la fois, ni sur-découpage de 2 lignes
            inutiles : arbitre sur la base de 4 critères objectifs.
          </p>
        </div>

        <MermaidDiagramBlock
          title={MODULE5_EXTRACTION_MERMAID.title}
          caption={MODULE5_EXTRACTION_MERMAID.caption}
          definition={MODULE5_EXTRACTION_MERMAID.definition}
        />

        <CodeSnippetBlock
          language={MODULE5_EXTRACTION_CODE.language}
          title={MODULE5_EXTRACTION_CODE.title}
          filename={MODULE5_EXTRACTION_CODE.filename}
          caption={MODULE5_EXTRACTION_CODE.caption}
          code={MODULE5_EXTRACTION_CODE.code}
        />

        <div className="flat-surface-tertiary p-5 sm:p-8 space-y-6 min-w-0">
          <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
            Simulateur de décision — Coche ce qui s’applique à ce que tu observes
          </div>

          <div className="grid grid-cols-1 gap-3">
            {EXTRACTION_CRITERIA.map((criterion) => {
              const checked = extractState[criterion.key];
              const isCounter = Boolean(criterion.isCounterCriterion);
              return (
                <label
                  key={criterion.key}
                  className={`flex items-start gap-3.5 p-4 border transition-colors cursor-pointer min-w-0 ${
                    checked
                      ? isCounter
                        ? 'border-[#B85D19] bg-[#FDF6EE]'
                        : 'border-[#1E56A0] bg-[#EDF3FC]'
                      : 'border-[#DCD7CA] bg-[#FAF9F5] hover:border-[#3B4049]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setExtractState((prev) => ({
                        ...prev,
                        [criterion.key]: e.target.checked,
                      }))
                    }
                    className="mt-1 w-4 h-4 accent-[#1E56A0] shrink-0 cursor-pointer"
                  />
                  <div className="min-w-0 space-y-1">
                    <span className="block text-sm sm:text-base font-bold text-palette-main break-words">
                      {criterion.title}
                    </span>
                    <span className="block text-sm text-palette-body leading-relaxed break-words">
                      {criterion.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          <div
            className={`p-5 border space-y-4 min-w-0 ${getVerdictContainerClass(
              extractVerdict.tone
            )}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`text-xs font-mono-tech uppercase font-semibold ${getVerdictLabelClass(
                  extractVerdict.tone
                )}`}
              >
                {extractVerdict.statusLabel}
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold text-palette-main break-words">
              {extractVerdict.title}
            </div>
            <p className="text-sm sm:text-base text-palette-body leading-relaxed break-words">
              {extractVerdict.body}
            </p>

            {extractVerdict.prompt && (
              <div className="flat-surface-tertiary p-4 space-y-3 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono-tech uppercase text-palette-muted">
                    Modèle de consigne pour l’IA
                  </span>
                  <CopyPromptButton text={extractVerdict.prompt} />
                </div>
                <p className="font-mono-tech text-xs sm:text-sm text-palette-main leading-relaxed break-words">
                  {extractVerdict.prompt}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flat-surface-tertiary-alt p-5 max-w-4xl border border-[#B85D19]/40 space-y-2 min-w-0">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase state-text-warning font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Règle anti-casse quand tu demandes d’extraire une fonction</span>
          </div>
          <p className="text-sm sm:text-base text-palette-body leading-relaxed break-words">
            Ne dis jamais simplement « mets cette fonction à part » : l’IA risque de créer un
            dossier fourre-tout. Précise toujours <strong className="text-palette-main">dans quelle couche ou quel module</strong> elle
            doit atterrir, et demande à l’IA de <em>conserver exactement les mêmes entrées et sorties</em> pour ne pas
            casser les fichiers appelants.
          </p>
        </div>
      </article>

      {/* =====================================================================
          SOUS-MODULE 5.3 : MODULE VS SERVICE (+ QUAND CONVERTIR)
         ===================================================================== */}
      <article id="atelier-5-3-module-service" className="scroll-mt-24 pt-12 border-t border-[#DCD7CA] space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
            Sous-module 5.3 · La frontière définitive
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-palette-main leading-tight">
            Module vs Service : dissiper le flou une bonne fois pour toutes
          </h3>
          <p className="text-lg sm:text-xl text-palette-body leading-relaxed">
            Si cette distinction paraît floue, c’est parce que le mot « service » désigne deux
            réalités totalement différentes dans l’industrie.
          </p>
        </div>

        {/* Mise en garde piège vocabulaire */}
        <div className="flat-surface-tertiary p-5 sm:p-6 border border-[#A62626]/40 bg-[#FDF2F2]/60 max-w-4xl space-y-3 min-w-0">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase state-text-danger font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Le piège de vocabulaire à connaître absolument</span>
          </div>
          <div className="space-y-2 text-sm sm:text-base text-palette-main leading-relaxed break-words">
            <p>
              <strong>1. Un fichier <code className="font-mono-tech">*Service</code> (sens interne)</strong> : Ex.{' '}
              <code className="font-mono-tech">orderService.ts</code> dans une architecture en couches. Ce n’est qu’un{' '}
              <em>fichier</em> contenant des fonctions métier dans ton application.
            </p>
            <p>
              <strong>2. Un Service architectural (Microservice / Service autonome)</strong> : Un{' '}
              <em>programme complet séparé</em>, qui tourne sur son propre serveur, possède sa propre base de données et
              communique par le réseau.
            </p>
          </div>
        </div>

        {/* Comparaison 2 colonnes plates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flat-surface-tertiary p-6 border-t-2 border-t-[#1E56A0] space-y-4 min-w-0">
            <h4 className="text-lg font-bold text-palette-main">
              Le Module (Frontière logique)
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-palette-body">
              {MODULE_VS_SERVICE_COMPARISON.modulePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 min-w-0">
                  <span className="font-mono-tech state-text-active shrink-0">—</span>
                  <span className="break-words">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flat-surface-tertiary p-6 border-t-2 border-t-[#141619] space-y-4 min-w-0">
            <h4 className="text-lg font-bold text-palette-main">
              Le Service autonome (Frontière physique)
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-palette-body">
              {MODULE_VS_SERVICE_COMPARISON.servicePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 min-w-0">
                  <span className="font-mono-tech text-palette-main shrink-0">—</span>
                  <span className="break-words">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Diagramme comparatif interactif */}
        <div className="flat-surface-tertiary p-5 sm:p-8 space-y-6 min-w-0">
          <div
            className="flex flex-wrap gap-2 border-b border-[#DCD7CA] pb-3"
            role="tablist"
            aria-label="Mode de communication"
          >
            <button
              type="button"
              role="tab"
              aria-selected={msViewMode === 'module'}
              onClick={() => setMsViewMode('module')}
              className={`px-4 py-2 text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                msViewMode === 'module'
                  ? 'border-[#1E56A0] bg-[#EDF3FC] state-text-active font-semibold'
                  : 'border-transparent text-palette-body hover:bg-[#FAF9F5]'
              }`}
            >
              Comment parlent deux Modules
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={msViewMode === 'service'}
              onClick={() => setMsViewMode('service')}
              className={`px-4 py-2 text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                msViewMode === 'service'
                  ? 'border-[#1E56A0] bg-[#EDF3FC] state-text-active font-semibold'
                  : 'border-transparent text-palette-body hover:bg-[#FAF9F5]'
              }`}
            >
              Comment parlent deux Services
            </button>
          </div>

          <div className="space-y-5 min-w-0">
            <MermaidDiagramBlock
              title={MODULE5_COMMUNICATION_MERMAID[msViewMode].title}
              caption={MODULE5_COMMUNICATION_MERMAID[msViewMode].caption}
              definition={MODULE5_COMMUNICATION_MERMAID[msViewMode].definition}
            />
            <CodeSnippetBlock
              language={MODULE5_COMMUNICATION_CODE[msViewMode].language}
              title={MODULE5_COMMUNICATION_CODE[msViewMode].title}
              filename={MODULE5_COMMUNICATION_CODE[msViewMode].filename}
              caption={MODULE5_COMMUNICATION_CODE[msViewMode].caption}
              code={MODULE5_COMMUNICATION_CODE[msViewMode].code}
            />
          </div>
        </div>

        {/* Calculateur d'arbitrage Module -> Service */}
        <div className="space-y-4">
          <div className="max-w-3xl space-y-2">
            <h4 className="text-xl sm:text-2xl font-bold text-palette-main">
              Quand un Module mérite-t-il d’être converti en Service ?
            </h4>
            <p className="text-base text-palette-body leading-relaxed">
              Règle d’or : <strong>un bloc commence toujours sa vie en Module</strong>. Coche les
              contraintes réelles de ton projet pour obtenir un arbitrage objectif.
            </p>
          </div>

          <div className="flat-surface-tertiary p-5 sm:p-8 space-y-6 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono-tech uppercase state-text-active font-semibold">
                Calculateur d’arbitrage — Faut-il transformer ce module en service ?
              </span>
              <span className="text-xs font-mono-tech tabular-nums text-palette-muted">
                Critères actifs : {conversionVerdict.score} / 5
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {CONVERSION_CRITERIA.map((item) => {
                const checked = conversionState[item.key];
                return (
                  <label
                    key={item.key}
                    className={`flex items-start gap-3.5 p-4 border transition-colors cursor-pointer min-w-0 ${
                      checked
                        ? 'border-[#1E56A0] bg-[#EDF3FC]'
                        : 'border-[#DCD7CA] bg-[#FAF9F5] hover:border-[#3B4049]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        setConversionState((prev) => ({
                          ...prev,
                          [item.key]: e.target.checked,
                        }))
                      }
                      className="mt-1 w-4 h-4 accent-[#1E56A0] shrink-0 cursor-pointer"
                    />
                    <div className="min-w-0 space-y-1">
                      <span className="block text-sm sm:text-base font-bold text-palette-main break-words">
                        {item.title}
                      </span>
                      <span className="block text-sm text-palette-body leading-relaxed break-words">
                        {item.description}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            <div
              className={`p-5 border space-y-4 min-w-0 ${getVerdictContainerClass(
                conversionVerdict.tone
              )}`}
            >
              <span
                className={`block text-xs font-mono-tech uppercase font-semibold ${getVerdictLabelClass(
                  conversionVerdict.tone
                )}`}
              >
                {conversionVerdict.statusLabel}
              </span>
              <div className="text-base sm:text-lg font-bold text-palette-main break-words">
                {conversionVerdict.title}
              </div>
              <p className="text-sm sm:text-base text-palette-body leading-relaxed break-words">
                {conversionVerdict.body}
              </p>

              <div className="flat-surface-tertiary p-4 space-y-3 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono-tech uppercase text-palette-muted">
                    Directive d’arbitrage pour l’IA
                  </span>
                  <CopyPromptButton text={conversionVerdict.prompt} />
                </div>
                <p className="font-mono-tech text-xs sm:text-sm text-palette-main leading-relaxed break-words">
                  {conversionVerdict.prompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* =====================================================================
          SOUS-MODULE 5.4 : EXPLORATEUR DES 5 GRANDES ARCHITECTURES
         ===================================================================== */}
      <article id="atelier-5-4-architectures" className="scroll-mt-24 pt-12 border-t border-[#DCD7CA] space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
            Sous-module 5.4 · Entraînement visuel comparatif
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-palette-main leading-tight">
            Explorateur interactif des 5 grandes architectures
          </h3>
          <p className="text-lg sm:text-xl text-palette-body leading-relaxed">
            Voici toujours la même application — <code className="font-mono-tech text-palette-main">boutique-app</code> — organisée selon
            les 5 architectures majeures. Sélectionne une architecture puis clique sur un dossier ou
            fichier interactif dans l’arbre pour inspecter son rôle exact.
          </p>
        </div>

        <div className="flat-surface-tertiary p-5 sm:p-8 space-y-6 min-w-0">
          {/* Onglets des 5 architectures */}
          <div
            className="flex flex-wrap gap-2 border-b border-[#DCD7CA] pb-3"
            role="tablist"
            aria-label="Choix de l'architecture"
          >
            {FIVE_ARCHITECTURES.map((arch) => {
              const isSelected = arch.key === activeArchKey;
              return (
                <button
                  key={arch.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveArchKey(arch.key)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'border-[#1E56A0] bg-[#EDF3FC] state-text-active font-semibold'
                      : 'border-[#DCD7CA] bg-[#FAF9F5] text-palette-body hover:border-[#3B4049] hover:text-palette-main'
                  }`}
                >
                  {arch.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Résumé de l'architecture sélectionnée */}
          <div className="space-y-1.5 pb-4 border-b border-[#DCD7CA] min-w-0">
            <div className="text-base sm:text-lg font-bold text-palette-main break-words">
              {activeArch.name}
            </div>
            <p className="text-sm text-palette-body break-words">{activeArch.tagline}</p>
            <div className="font-mono-tech text-xs state-text-active font-semibold pt-1 break-words">
              {activeArch.flow}
            </div>
          </div>

          {/* Schéma Mermaid dynamique propre à l'architecture sélectionnée */}
          <MermaidDiagramBlock
            title={FIVE_ARCH_VISUALS[activeArchKey].mermaid.title}
            caption={FIVE_ARCH_VISUALS[activeArchKey].mermaid.caption}
            definition={FIVE_ARCH_VISUALS[activeArchKey].mermaid.definition}
          />

          {/* Grille deux zones : Arborescence + Inspecteur */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 p-4 bg-[#FAF9F5] border border-[#DCD7CA] min-w-0 overflow-x-auto">
              <div className="text-xs text-palette-muted mb-3">
                Clique sur un élément surligné pour l’inspecter :
              </div>
              <div className="font-mono-tech text-[11.5px] sm:text-xs leading-7 min-w-max">
                {activeArch.nodes.map((node, idx) => {
                  if (!node.id) {
                    return (
                      <div
                        key={`line-${idx}`}
                        className="px-2 py-0.5 text-palette-muted whitespace-pre"
                      >
                        {node.text}
                      </div>
                    );
                  }
                  const isSelected = node.id === currentNodeKey;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() =>
                        setSelectedNodeByArch((prev) => ({
                          ...prev,
                          [activeArchKey]: node.id as string,
                        }))
                      }
                      className={`block w-full text-left px-2 py-0.5 whitespace-pre border-l-2 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#EDF3FC] border-[#1E56A0] text-[#1E56A0] font-semibold'
                          : 'border-transparent text-palette-main font-medium hover:bg-[#F3F1EA] hover:border-[#3B4049]'
                      }`}
                    >
                      {node.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeNodeDetail && (
              <div
                className="lg:col-span-5 p-5 bg-[#FAF9F5] border border-[#DCD7CA] space-y-4 min-w-0"
                aria-live="polite"
              >
                <div className="pb-3 border-b border-[#DCD7CA] min-w-0">
                  <div className="font-mono-tech text-sm font-semibold state-text-active break-all">
                    {currentNodeKey}
                  </div>
                  <div className="text-xs sm:text-sm text-palette-muted mt-1 break-words">
                    {activeNodeDetail.nature}
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="text-xs font-mono-tech uppercase text-palette-main font-semibold">
                    Rôle exact
                  </div>
                  <p className="text-sm text-palette-body leading-relaxed break-words">
                    {activeNodeDetail.role}
                  </p>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="text-xs font-mono-tech uppercase text-palette-main font-semibold">
                    Règle de dépendance (qui parle à qui)
                  </div>
                  <p className="text-sm text-palette-body leading-relaxed break-words">
                    {activeNodeDetail.deps}
                  </p>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="text-xs font-mono-tech uppercase state-text-success font-semibold">
                    Bonne directive à donner à l’IA
                  </div>
                  <p className="text-sm font-mono-tech text-palette-main bg-white border border-[#DCD7CA] p-3 leading-relaxed break-words">
                    {activeNodeDetail.aiGood}
                  </p>
                </div>

                <div className="p-3 bg-[#FDF2F2] border border-[#A62626]/30 space-y-1 min-w-0">
                  <div className="text-xs font-mono-tech uppercase state-text-danger font-semibold">
                    Maladresse qui casse cette architecture
                  </div>
                  <p className="text-sm text-palette-main leading-relaxed break-words">
                    {activeNodeDetail.aiMistake}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Extrait de code signature de l'architecture sélectionnée */}
          <CodeSnippetBlock
            language={FIVE_ARCH_VISUALS[activeArchKey].code.language}
            title={FIVE_ARCH_VISUALS[activeArchKey].code.title}
            filename={FIVE_ARCH_VISUALS[activeArchKey].code.filename}
            code={FIVE_ARCH_VISUALS[activeArchKey].code.code}
            compact
          />
        </div>

        {/* Tableau radar 3 secondes */}
        <div className="space-y-4">
          <h4 className="text-xl sm:text-2xl font-bold text-palette-main">
            Tableau radar : reconnaître l’architecture en 3 secondes
          </h4>
          <div className="flat-surface-tertiary overflow-x-auto max-w-full">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#141619] bg-[#F7F5EF]">
                  <th className="py-3.5 px-4 font-mono-tech text-xs uppercase text-palette-muted">
                    Architecture
                  </th>
                  <th className="py-3.5 px-4 font-mono-tech text-xs uppercase text-palette-muted">
                    Sens du découpage
                  </th>
                  <th className="py-3.5 px-4 font-mono-tech text-xs uppercase text-palette-muted">
                    Indices dans l’arbre
                  </th>
                  <th className="py-3.5 px-4 font-mono-tech text-xs uppercase text-palette-muted">
                    Où sont les fonctions métier ?
                  </th>
                </tr>
              </thead>
              <tbody>
                {RADAR_TABLE_ROWS.map((row) => (
                  <tr
                    key={row.architecture}
                    className="border-b border-[#DCD7CA] last:border-b-0 align-top"
                  >
                    <td className="py-3.5 px-4 font-bold text-palette-main whitespace-nowrap">
                      {row.architecture}
                    </td>
                    <td className="py-3.5 px-4 text-palette-body">{row.direction}</td>
                    <td className="py-3.5 px-4 font-mono-tech text-xs text-palette-main">
                      {row.clues}
                    </td>
                    <td className="py-3.5 px-4 text-palette-body">{row.businessLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>

      {/* =====================================================================
          SOUS-MODULE 5.5 : PARLER À L'IA SANS CASSER SON TRAVAIL
         ===================================================================== */}
      <article id="atelier-5-5-directives" className="scroll-mt-24 pt-12 border-t border-[#DCD7CA] space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
            Sous-module 5.5 · Délégation méthodique
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-palette-main leading-tight">
            Que dire à l’IA pour agir sans casser l’architecture
          </h3>
          <p className="text-lg sm:text-xl text-palette-body leading-relaxed">
            On ne casse presque jamais un projet à cause de la syntaxe, mais par une consigne qui
            viole une frontière. Compare les formulations sur 5 situations réelles.
          </p>
        </div>

        <MermaidDiagramBlock
          title={MODULE5_DIRECTIVE_MERMAID.title}
          caption={MODULE5_DIRECTIVE_MERMAID.caption}
          definition={MODULE5_DIRECTIVE_MERMAID.definition}
        />

        <div className="flat-surface-tertiary p-5 sm:p-8 space-y-6 min-w-0">
          <div
            className="flex flex-wrap gap-2 border-b border-[#DCD7CA] pb-3"
            role="tablist"
            aria-label="Situations de pilotage IA"
          >
            {AI_DIRECTIVES.map((dir) => {
              const isSelected = dir.key === activeDirectiveKey;
              return (
                <button
                  key={dir.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveDirectiveKey(dir.key)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'border-[#1E56A0] bg-[#EDF3FC] state-text-active font-semibold'
                      : 'border-[#DCD7CA] bg-[#FAF9F5] text-palette-body hover:border-[#3B4049] hover:text-palette-main'
                  }`}
                >
                  {dir.tabLabel}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Consigne maladroite */}
            <div className="p-5 bg-[#FAF9F5] border border-[#DCD7CA] border-t-2 border-t-[#A62626] space-y-4 min-w-0 flex flex-col justify-between">
              <div className="space-y-3 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase state-text-danger font-semibold">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Consigne maladroite (risque de casse)</span>
                </div>
                <p className="font-mono-tech text-xs sm:text-sm text-palette-main leading-relaxed break-words">
                  {activeDirective.badQuote}
                </p>
              </div>
              <p className="text-sm text-palette-body pt-3 border-t border-[#DCD7CA] leading-relaxed break-words">
                <strong className="text-palette-main">Pourquoi c’est risqué :</strong>{' '}
                {activeDirective.badWhy}
              </p>
            </div>

            {/* Directive d'ingénieur */}
            <div className="p-5 bg-[#FAF9F5] border border-[#DCD7CA] border-t-2 border-t-[#1B6B4A] space-y-4 min-w-0 flex flex-col justify-between">
              <div className="space-y-3 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono-tech uppercase state-text-success font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Directive d’ingénieur (précise et sûre)</span>
                  </div>
                  <CopyPromptButton text={activeDirective.goodQuote} label="Copier la directive" />
                </div>
                <p className="font-mono-tech text-xs sm:text-sm text-palette-main leading-relaxed break-words">
                  {activeDirective.goodQuote}
                </p>
              </div>
              <p className="text-sm text-palette-body pt-3 border-t border-[#DCD7CA] leading-relaxed break-words">
                <strong className="text-palette-main">Pourquoi ça protège le projet :</strong>{' '}
                {activeDirective.goodWhy}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* =====================================================================
          SOUS-MODULE 5.6 : ATELIER D'AUDIT (QUIZ D'INGÉNIEUR CONNECTÉ À LA JAUGE)
         ===================================================================== */}
      <article id="atelier-5-6-audit" className="scroll-mt-24 pt-12 border-t border-[#DCD7CA] space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
            Sous-module 5.6 · Atelier d’audit pratique
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-palette-main leading-tight">
            Teste ton œil sur 5 situations d’ingénieur
          </h3>
          <p className="text-lg sm:text-xl text-palette-body leading-relaxed">
            Aucun code à écrire : tu relis ce que l’IA te propose et tu arbitres. Chaque arbitrage
            juste met directement à jour ta jauge de maîtrise globale en haut de la page.
          </p>
        </div>

        <div className="flat-surface-tertiary p-5 sm:p-8 space-y-6 min-w-0">
          {isQuizFinished ? (
            <div className="space-y-5 min-w-0">
              <div className="text-xs font-mono-tech uppercase state-text-success font-semibold">
                Bilan de l’atelier d’audit
              </div>
              <h4 className="text-2xl font-bold text-palette-main tabular-nums">
                Score de session : {quizSessionScore} / {AUDIT_QUIZ_CASES.length} arbitrages justes
              </h4>
              <p className="text-base text-palette-body leading-relaxed max-w-2xl">
                {quizSessionScore === AUDIT_QUIZ_CASES.length
                  ? 'Excellent réflexe architectural : tu distingues clairement les couches, les fonctions, les modules et les services autonomes.'
                  : 'Bon entraînement ! N’hésite pas à revoir les cas manqués dans l’explorateur des 5 architectures ci-dessus puis à relancer l’atelier.'}
              </p>
              <div className="text-xs font-mono-tech text-palette-muted tabular-nums">
                Cas enregistrés dans la maîtrise globale : {solvedAuditCount} / {AUDIT_QUIZ_CASES.length}
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#141619] text-white hover:bg-[#1E56A0] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Recommencer l’atelier</span>
                </button>
              </div>
            </div>
          ) : (
            currentQuizCase && (
              <div className="space-y-5 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs text-palette-muted tabular-nums">
                  <span>
                    CAS D’AUDIT {quizIndex + 1} / {AUDIT_QUIZ_CASES.length}
                  </span>
                  <span>
                    Validés globalement : {solvedAuditCount} / {AUDIT_QUIZ_CASES.length}
                  </span>
                </div>

                <CodeSnippetBlock
                  language={
                    currentQuizCase.id === 'audit-case-3'
                      ? 'ts'
                      : currentQuizCase.id === 'audit-case-4'
                      ? 'text'
                      : 'tree'
                  }
                  title={`Extrait d’audit — Cas ${quizIndex + 1}`}
                  code={currentQuizCase.context}
                  compact
                />

                <p className="text-base sm:text-lg font-bold text-palette-main leading-snug break-words">
                  {currentQuizCase.question}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {currentQuizCase.options.map((option, optIdx) => {
                    const isAnswered = selectedOptionIndex !== null;
                    const isChosen = selectedOptionIndex === optIdx;
                    const isCorrect = optIdx === currentQuizCase.correctIndex;

                    let optionStyle =
                      'border-[#DCD7CA] bg-[#FAF9F5] text-palette-main hover:border-[#141619]';
                    if (isAnswered) {
                      if (isCorrect) {
                        optionStyle = 'border-[#1B6B4A] bg-[#EAF5F0] text-palette-main font-medium';
                      } else if (isChosen && !isCorrect) {
                        optionStyle = 'border-[#A62626] bg-[#FDF2F2] text-palette-main';
                      } else {
                        optionStyle = 'border-[#DCD7CA] bg-[#FAF9F5] text-palette-muted opacity-75';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectQuizOption(optIdx)}
                        className={`p-4 text-left border text-sm sm:text-base transition-colors min-w-0 break-words ${
                          isAnswered ? 'cursor-default' : 'cursor-pointer'
                        } ${optionStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {selectedOptionIndex !== null && (
                  <div
                    className={`p-5 border space-y-2 min-w-0 ${
                      selectedOptionIndex === currentQuizCase.correctIndex
                        ? 'border-[#1B6B4A] bg-[#EAF5F0]'
                        : 'border-[#A62626] bg-[#FDF2F2]'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 text-sm font-bold ${
                        selectedOptionIndex === currentQuizCase.correctIndex
                          ? 'state-text-success'
                          : 'state-text-danger'
                      }`}
                    >
                      {selectedOptionIndex === currentQuizCase.correctIndex ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Arbitrage exact — enregistré dans ta progression.</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>Attention au piège architectural.</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-palette-main leading-relaxed break-words">
                      {currentQuizCase.explanation}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-xs sm:text-sm text-palette-muted">
                    {selectedOptionIndex === null
                      ? 'Choisis l’arbitrage le plus rigoureux.'
                      : 'Relis l’explication architecturale avant de passer au cas suivant.'}
                  </span>

                  {selectedOptionIndex !== null && (
                    <button
                      type="button"
                      onClick={handleNextQuizCase}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#141619] text-white hover:bg-[#1E56A0] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>
                        {quizIndex === AUDIT_QUIZ_CASES.length - 1
                          ? 'Voir le bilan'
                          : 'Cas suivant'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </article>
    </div>
  );
}
