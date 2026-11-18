import React, { useState } from 'react';
import {
  AI_STUDIO_SCENARIOS,
  GLOSSARY_TERMS,
  type GlossaryTerm,
} from '../data/curriculumData';
import { filterGlossaryTerms } from '../utils/mentorEngine';
import {
  Terminal,
  CheckCircle2,
  XCircle,
  Search,
  BookOpen,
  FolderTree,
  ExternalLink,
} from 'lucide-react';

interface AiStudioScenarioLabProps {
  onScenarioStepSolved?: (stepKey: string) => void;
  solvedSteps?: string[];
}

export const AiStudioScenarioLab: React.FC<AiStudioScenarioLabProps> = ({
  onScenarioStepSolved,
  solvedSteps = [],
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(AI_STUDIO_SCENARIOS[0].id);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});

  const activeScenario =
    AI_STUDIO_SCENARIOS.find((s) => s.id === selectedScenarioId) ?? AI_STUDIO_SCENARIOS[0];

  const handleSelectOption = (stepNumber: number, optionId: string, isOptimal: boolean) => {
    const key = `${activeScenario.id}-step-${stepNumber}`;
    setSelectedChoices((prev) => ({ ...prev, [key]: optionId }));
    if (isOptimal && onScenarioStepSolved) {
      onScenarioStepSolved(key);
    }
  };

  return (
    <div className="my-8 space-y-6">
      {/* Sélecteur de Scénario Réel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {AI_STUDIO_SCENARIOS.map((scen) => {
          const isSelected = scen.id === selectedScenarioId;
          return (
            <button
              key={scen.id}
              type="button"
              onClick={() => setSelectedScenarioId(scen.id)}
              className={`p-4 text-left cursor-pointer flat-surface-tertiary transition-colors ${
                isSelected ? 'state-active-border state-active-bg' : 'hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="text-xs font-mono-tech uppercase state-text-active font-semibold mb-1">
                Mise en Situation Ingénieur Google AI Studio
              </div>
              <div className="text-base font-serif-editorial font-semibold text-palette-main">
                {scen.title}
              </div>
              <div className="text-xs text-palette-muted mt-1">{scen.inspiredBy}</div>
            </button>
          );
        })}
      </div>

      {/* Dossier de Contexte & Contrainte Nouvelle */}
      <div className="flat-surface-tertiary p-6 space-y-5">
        <div className="border-b border-[#D5D0C3] pb-4">
          <h3 className="text-xl font-serif-editorial font-semibold text-palette-main">
            {activeScenario.title}
          </h3>
          <p className="text-sm text-palette-body mt-2">{activeScenario.context}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
            <div className="text-xs font-mono-tech font-semibold text-palette-main uppercase mb-1">
              Contrainte Initiale :
            </div>
            <p className="text-sm text-palette-body">{activeScenario.initialConstraint}</p>
          </div>

          <div className="p-4 bg-[#FDF3EB] border border-[#B85D19]">
            <div className="text-xs font-mono-tech font-semibold state-text-warning uppercase mb-1">
              ▲ Imprévu / Nouvelle Contrainte en Cours de Projet :
            </div>
            <p className="text-sm text-palette-main">{activeScenario.suddenNewConstraint}</p>
          </div>
        </div>

        {/* Étapes de Décision Interactives */}
        <div className="space-y-6 pt-2">
          {activeScenario.steps.map((step) => {
            const stepKey = `${activeScenario.id}-step-${step.stepNumber}`;
            const chosenOptionId = selectedChoices[stepKey];
            const chosenOption = step.options.find((o) => o.id === chosenOptionId);
            const isStepSolved = solvedSteps.includes(stepKey);

            return (
              <div
                key={step.stepNumber}
                className="p-5 bg-[#FAF8F5] border border-[#D5D0C3] space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono-tech font-semibold state-text-active uppercase">
                    Décision d’Architecte #{step.stepNumber}
                  </span>
                  {isStepSolved && (
                    <span className="text-xs font-mono-tech font-semibold state-text-success">
                      ● DÉCISION VALIDÉE
                    </span>
                  )}
                </div>

                <p className="text-sm text-palette-body">{step.situation}</p>
                <div className="text-sm font-semibold text-palette-main">{step.question}</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {step.options.map((opt) => {
                    const isChosen = chosenOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          handleSelectOption(step.stepNumber, opt.id, opt.isOptimal)
                        }
                        className={`p-4 text-left cursor-pointer flat-surface-tertiary transition-colors ${
                          isChosen
                            ? opt.isOptimal
                              ? 'border-[#1B6B4A] bg-[#EAF5F0]'
                              : 'border-[#A62626] bg-[#FDF2F2]'
                            : 'hover:bg-white'
                        }`}
                      >
                        <div className="text-xs font-mono-tech text-palette-muted mb-1">
                          Option {opt.id.endsWith('good') ? 'Structurée' : 'Directe'}
                        </div>
                        <div className="text-sm font-medium text-palette-main">{opt.label}</div>
                      </button>
                    );
                  })}
                </div>

                {chosenOption && (
                  <div
                    className={`p-4 border ${
                      chosenOption.isOptimal
                        ? 'bg-[#EAF5F0] border-[#1B6B4A]'
                        : 'bg-[#FDF2F2] border-[#A62626]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold uppercase mb-1">
                      {chosenOption.isOptimal ? (
                        <span className="state-text-success flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Excellent Choix d’Architecte
                        </span>
                      ) : (
                        <span className="state-text-danger flex items-center gap-1">
                          <XCircle className="w-4 h-4" />
                          Piège d’Architecture Détecté
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-palette-main mb-2">{chosenOption.mentorFeedback}</p>
                    <div className="text-xs font-mono-tech text-palette-body">
                      Impact sur l’arborescence : <code>{chosenOption.resultingFileImpact}</code>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Synthèse : Prompt Modèle & Arborescence Cible du Scénario */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-4 border-t border-[#D5D0C3]">
          <div className="lg:col-span-7 p-4 bg-[#EBF1FA] border border-[#1E56A0]">
            <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold state-text-active uppercase mb-2">
              <Terminal className="w-4 h-4" />
              Le Prompt Idéal d’Ingénieur Senior pour ce Cas :
            </div>
            <p className="text-xs font-mono-tech text-palette-main leading-relaxed">
              {activeScenario.idealPromptTemplate}
            </p>
          </div>

          <div className="lg:col-span-5 p-4 bg-white border border-[#D5D0C3]">
            <div className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold text-palette-main uppercase mb-2">
              <FolderTree className="w-4 h-4 state-text-active" />
              Répartition Propre des Fichiers :
            </div>
            <ul className="space-y-1 text-xs font-mono-tech text-palette-body">
              {activeScenario.idealFolderStructure.map((item, idx) => (
                <li key={idx} className="truncate">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GlossaryDecoderSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryTerm['category'] | 'all'>('all');
  const [showPdfEmbed, setShowPdfEmbed] = useState<boolean>(false);

  const filteredTerms = filterGlossaryTerms(searchQuery, selectedCategory);

  return (
    <section id="lexique-decodeur" className="py-16 border-t border-[#D5D0C3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-mono-tech uppercase tracking-wider state-text-active font-semibold mb-2">
            Référentiel Technique & Jargon de l’IA
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-editorial font-semibold text-palette-main mb-3">
            Décodeur du Vocabulaire d’Ingénieur Logiciel
          </h2>
          <p className="text-base text-palette-body">
            Ne sois plus jamais dans le flou quand une IA te parle de « CRUD », de « règle métier », d’« idempotence », de « refactoring » ou de « middleware ». Recherche un terme pour comprendre sa signification simple et la décision que tu dois prendre en tant qu’architecte.
          </p>
        </div>

        {/* Barre de recherche et filtres (Palette Tertiaire) */}
        <div className="flat-surface-tertiary p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-palette-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un terme (ex: CRUD, règle métier, incrément, agile, API, dette...)"
              aria-label="Rechercher un terme technique dans le lexique"
              className="w-full pl-10 pr-4 py-2 text-sm flat-input-tertiary"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all' as const, label: 'Tous (${12})'.replace('${12}', String(GLOSSARY_TERMS.length)) },
              { id: 'architecture' as const, label: 'Architecture' },
              { id: 'donnees' as const, label: 'Données' },
              { id: 'processus' as const, label: 'Processus & Agile' },
              { id: 'code-ia' as const, label: 'Dialogue IA' },
              { id: 'securite-qualite' as const, label: 'Sécurité & Fiabilité' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono-tech cursor-pointer flat-surface-tertiary ${
                  selectedCategory === cat.id
                    ? 'state-active-border state-active-bg state-text-active font-semibold'
                    : 'text-palette-body hover:bg-[#FAF8F5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des termes décodés */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTerms.map((item) => (
            <div key={item.id} className="flat-surface-tertiary p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-[#E5E0D5]">
                  <h3 className="text-base font-serif-editorial font-semibold text-palette-main">
                    {item.term}
                  </h3>
                  <span className="text-[11px] font-mono-tech uppercase text-palette-muted">
                    {item.category}
                  </span>
                </div>

                <p className="text-sm text-palette-main mb-3">{item.simpleDefinition}</p>

                <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D5] mb-3 text-xs text-palette-body">
                  <strong className="font-mono-tech text-palette-main">Image mentale : </strong>
                  {item.metaphor}
                </div>

                <div className="mb-3">
                  <div className="text-[11px] font-mono-tech uppercase text-palette-muted mb-1">
                    Quand l’IA te dit :
                  </div>
                  <p className="text-xs font-mono-tech text-[#1E56A0] bg-[#EBF1FA] p-2.5 border border-[#1E56A0]/30">
                    {item.whenAiSaysIt}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E0D5]">
                <div className="text-[11px] font-mono-tech font-semibold state-text-success uppercase mb-1">
                  Ce que TU dois décider en tant qu’Architecte :
                </div>
                <p className="text-xs text-palette-body mb-2">{item.whatYouMustDecide}</p>
                <div className="text-[11px] font-mono-tech text-palette-muted">
                  Lié à : {item.relatedTerms.join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation directe de l'ouvrage PDF source d'Ian Sommerville */}
        <div className="mt-12 flat-surface-tertiary p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tech uppercase text-palette-muted">
                Source Académique Intégrale Attachée
              </div>
              <h3 className="text-lg font-serif-editorial font-semibold text-palette-main">
                Ouvrage de Référence : Software Engineering (10th Edition) — Ian Sommerville
              </h3>
              <p className="text-sm text-palette-body mt-1">
                Tous les concepts, schémas et études de cas (Mentcare, iLearn, Station Météo) de cette formation sont extraits et adaptés de votre document PDF source.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPdfEmbed((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-tech font-semibold bg-[#1E56A0] text-white cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                {showPdfEmbed ? 'Masquer la liseuse PDF' : 'Consulter le PDF original ici'}
              </button>
              <a
                href="/assets/aistudio/Software_Engineering_-_Ian_Sommerville_cabeeeae.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono-tech flat-surface-tertiary-alt text-palette-main"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Fichier PDF
              </a>
            </div>
          </div>

          {showPdfEmbed && (
            <div className="mt-5 border border-[#D5D0C3] bg-[#FAF8F5] p-2">
              <iframe
                src="/assets/aistudio/Software_Engineering_-_Ian_Sommerville_cabeeeae.pdf"
                title="Software Engineering - Ian Sommerville PDF"
                className="w-full h-[600px] border-0"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
