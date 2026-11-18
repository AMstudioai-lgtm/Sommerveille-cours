import React, { useState } from 'react';
import { TRAINING_MODULES, AI_STUDIO_SCENARIOS, type TrainingModule } from './data/curriculumData';
import { calculateMasteryProgress } from './utils/mentorEngine';
import { InteractiveArchitectureDiagram } from './components/InteractiveArchitectureDiagram';
import {
  LifecycleProcessVisualizer,
  SwissCheeseSecuritySimulator,
} from './components/LifecycleAndSwissCheese';
import { FileTreeExplorer } from './components/FileTreeExplorer';
import { DecisionSimulator } from './components/DecisionSimulator';
import { AiStudioScenarioLab, GlossaryDecoderSection } from './components/AiStudioScenarioLab';
import {
  ChevronDown,
  CheckSquare,
  Square,
  ArrowUpRight,
} from 'lucide-react';

export default function App() {
  const [activeModuleFilter, setActiveModuleFilter] = useState<string | 'all'>('all');
  const [navDrawerOpen, setNavDrawerOpen] = useState<boolean>(false);
  const [completedModules, setCompletedModules] = useState<string[]>(['mod-1-fondations']);
  const [solvedScenarioSteps, setSolvedScenarioSteps] = useState<string[]>([]);

  const totalScenarioStepsCount = AI_STUDIO_SCENARIOS.reduce(
    (acc, scen) => acc + scen.steps.length,
    0
  );

  const mastery = calculateMasteryProgress(
    completedModules,
    TRAINING_MODULES.length,
    solvedScenarioSteps.length,
    totalScenarioStepsCount
  );

  const toggleModuleCompleted = (moduleId: string) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const handleScenarioStepSolved = (stepKey: string) => {
    setSolvedScenarioSteps((prev) => (prev.includes(stepKey) ? prev : [...prev, stepKey]));
  };

  const displayedModules =
    activeModuleFilter === 'all'
      ? TRAINING_MODULES
      : TRAINING_MODULES.filter((m) => m.id === activeModuleFilter);

  const getSectionBgClass = (tone: TrainingModule['bgTone']) => {
    if (tone === 'primary-alt') return 'bg-palette-primary-alt';
    if (tone === 'primary-deep') return 'bg-palette-primary-deep';
    return 'bg-palette-primary';
  };

  const renderInteractiveTool = (toolId: TrainingModule['interactiveToolId']) => {
    switch (toolId) {
      case 'lifecycle-flow':
        return <LifecycleProcessVisualizer />;
      case 'architecture-schema':
        return (
          <div className="my-8">
            <InteractiveArchitectureDiagram />
          </div>
        );
      case 'file-tree':
        return <FileTreeExplorer />;
      case 'data-hosting-sim':
        return <DecisionSimulator />;
      case 'dependability-swiss':
        return <SwissCheeseSecuritySimulator />;
      case 'ai-studio-scenarios':
        return (
          <AiStudioScenarioLab
            onScenarioStepSolved={handleScenarioStepSolved}
            solvedSteps={solvedScenarioSteps}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-palette-primary text-palette-main">
      {/* BARRE DE NAVIGATION ANIMÉE (Reveal fluide + Barre d'état Quaternaire) */}
      <header className="sticky top-0 z-40 bg-[#F6F5F0]/95 backdrop-blur-sm border-b border-[#D5D0C3] animate-reveal-down">
        {/* Fine barre de progression Quaternaire */}
        <div className="w-full h-1 bg-[#E5E0D5]">
          <div
            className="h-full bg-[#1E56A0] transition-all duration-500 ease-out"
            style={{ width: `${mastery.percentage}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Identité Mentor */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setActiveModuleFilter('all')}
              className="text-left cursor-pointer group flex items-center gap-2"
            >
              <span className="w-7 h-7 shrink-0 flex items-center justify-center bg-[#16181D] text-white font-mono-tech text-xs font-semibold">
                SE
              </span>
              <div className="whitespace-nowrap">
                <div className="text-sm font-serif-editorial font-semibold text-palette-main group-hover:text-[#1E56A0] transition-colors leading-tight">
                  L’Architecte Logiciel
                </div>
                <div className="text-[10px] font-mono-tech text-palette-muted hidden xl:block leading-tight">
                  Formation Modulaire · Sommerville
                </div>
              </div>
            </button>
          </div>

          {/* Liens de navigation directe avec soulignement animé (1 seule ligne propre) */}
          <nav className="hidden lg:flex items-center gap-0.5 shrink-0" aria-label="Modules de formation">
            <button
              type="button"
              onClick={() => setActiveModuleFilter('all')}
              className={`relative px-2 py-1.5 text-[11px] font-mono-tech whitespace-nowrap cursor-pointer transition-colors ${
                activeModuleFilter === 'all'
                  ? 'state-text-active font-semibold'
                  : 'text-palette-body hover:text-palette-main'
              }`}
            >
              Tous
              <span
                className={`absolute left-1.5 right-1.5 bottom-0 h-0.5 bg-[#1E56A0] transition-transform duration-300 origin-left ${
                  activeModuleFilter === 'all' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>

            {[
              { id: 'mod-1-fondations', label: '01. Ingénieur' },
              { id: 'mod-2-architecture', label: '02. Architecture' },
              { id: 'mod-3-arborescence', label: '03. Arborescence' },
              { id: 'mod-4-donnees-hebergement', label: '04. Données & Cloud' },
              { id: 'mod-5-fiabilite-maintenance', label: '05. Sûreté & Tests' },
              { id: 'mod-6-scenarios-ia', label: '06. Cas IA Studio' },
            ].map((item) => {
              const isCurrent = activeModuleFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveModuleFilter(item.id)}
                  className={`relative px-2 py-1.5 text-[11px] font-mono-tech whitespace-nowrap cursor-pointer transition-colors ${
                    isCurrent
                      ? 'state-text-active font-semibold'
                      : 'text-palette-body hover:text-palette-main'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-1.5 right-1.5 bottom-0 h-0.5 bg-[#1E56A0] transition-transform duration-300 origin-left ${
                      isCurrent ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}

            <a
              href="#lexique-decodeur"
              onClick={() => setActiveModuleFilter('all')}
              className="px-2 py-1.5 text-[11px] font-mono-tech whitespace-nowrap text-palette-body hover:text-[#1E56A0] transition-colors"
            >
              Lexique
            </a>
          </nav>

          {/* État de progression & Bouton Sommaire Reveal */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 flat-surface-tertiary text-[11px] font-mono-tech whitespace-nowrap">
              <span
                className={`w-2 h-2 shrink-0 ${
                  mastery.statusTone === 'success'
                    ? 'bg-[#1B6B4A]'
                    : mastery.statusTone === 'active'
                    ? 'bg-[#1E56A0]'
                    : 'bg-[#B85D19]'
                }`}
              />
              <span className="text-palette-main font-medium">{mastery.rankLabel}</span>
              <span className="text-palette-muted">({mastery.percentage}%)</span>
            </div>

            <button
              type="button"
              onClick={() => setNavDrawerOpen((prev) => !prev)}
              aria-expanded={navDrawerOpen}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-mono-tech font-medium whitespace-nowrap flat-surface-tertiary cursor-pointer hover:border-[#1E56A0] transition-colors"
            >
              <span>Sommaire</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  navDrawerOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Tiroir de navigation Reveal animé */}
        {navDrawerOpen && (
          <div className="border-t border-[#D5D0C3] bg-[#FAF8F5] animate-reveal-down">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono-tech uppercase text-palette-muted">
                  Plan Modulaire — Sélectionnez un module ou affichez tout le cours :
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModuleFilter('all');
                    setNavDrawerOpen(false);
                  }}
                  className="text-xs font-mono-tech state-text-active underline cursor-pointer"
                >
                  Afficher les 6 modules en continu
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TRAINING_MODULES.map((mod) => {
                  const isDone = completedModules.includes(mod.id);
                  const isFocused = activeModuleFilter === mod.id;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => {
                        setActiveModuleFilter(mod.id);
                        setNavDrawerOpen(false);
                      }}
                      className={`p-3.5 text-left cursor-pointer flat-surface-tertiary transition-colors ${
                        isFocused ? 'state-active-border state-active-bg' : 'hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                        <span className="state-text-active font-semibold">
                          MODULE {mod.number}
                        </span>
                        <span className={isDone ? 'state-text-success' : 'text-palette-muted'}>
                          {isDone ? '✓ Validé' : 'À étudier'}
                        </span>
                      </div>
                      <div className="text-sm font-serif-editorial font-semibold text-palette-main">
                        {mod.shortTitle}
                      </div>
                      <div className="text-xs text-palette-muted mt-0.5 line-clamp-1">
                        {mod.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO ÉPURÉ (Peu de texte, zéro KPI card, focus visuel immédiat) */}
      <section className="py-12 sm:py-16 border-b border-[#D5D0C3] bg-palette-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5 animate-reveal-up">
              <div className="text-xs font-mono-tech uppercase tracking-wider state-text-active font-semibold">
                Formation Modulaire · Mentorat Ingénieur Senior
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif-editorial font-semibold text-palette-main leading-tight">
                De la Conception à la Maintenance d’un Logiciel.
              </h1>

              <p className="text-base text-palette-body leading-relaxed">
                Apprends à penser en architecte logiciel sans écrire de code, à lire une arborescence en un coup d’œil et à piloter l’IA proprement.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#module-mod-1-fondations"
                  onClick={() => setActiveModuleFilter('all')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono-tech font-semibold bg-[#16181D] text-white hover:bg-[#1E56A0] transition-colors"
                >
                  Démarrer le Parcours
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModuleFilter('mod-3-arborescence')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono-tech font-medium flat-surface-tertiary text-palette-main cursor-pointer hover:border-[#1E56A0]"
                >
                  Explorer une Arborescence
                </button>
              </div>
            </div>

            {/* Repère visuel interactif immédiat des 6 Modules */}
            <div className="lg:col-span-7 flat-surface-tertiary p-5 animate-reveal-up-delayed">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D5D0C3]">
                <span className="text-xs font-mono-tech font-semibold text-palette-main uppercase">
                  Carte Mentale : Les 6 Compétences Clés de l’Architecte Non-Codeur
                </span>
                <span className="text-[11px] font-mono-tech state-text-active">
                  Cliquez sur un module pour cibler
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TRAINING_MODULES.map((m) => {
                  const isActive = activeModuleFilter === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveModuleFilter(m.id)}
                      className={`p-3 text-left cursor-pointer flat-surface-tertiary-alt transition-colors flex items-start gap-3 ${
                        isActive ? 'state-active-border state-active-bg' : 'hover:bg-white'
                      }`}
                    >
                      <span className="font-mono-tech text-xs font-bold state-text-active mt-0.5">
                        {m.number}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-palette-main">
                          {m.shortTitle}
                        </div>
                        <div className="text-[11px] text-palette-muted line-clamp-1 mt-0.5">
                          {m.interactiveToolId === 'architecture-schema'
                            ? 'Schéma SVG MVC, Couches, Client-Serveur'
                            : m.interactiveToolId === 'file-tree'
                            ? 'Radiographie des fichiers & dossiers'
                            : m.interactiveToolId === 'data-hosting-sim'
                            ? 'SQL vs NoSQL & Choix d’hébergeur'
                            : m.interactiveToolId === 'dependability-swiss'
                            ? 'Fromage Suisse, Tests & Refactoring'
                            : m.interactiveToolId === 'ai-studio-scenarios'
                            ? 'Cas réels Google AI Studio'
                            : 'Cycle incrémental & Règles métier'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU MODULAIRE : RESPIRATION ÉDITORIALE + SCHÉMAS INTERACTIFS */}
      <main className="flex-1">
        {activeModuleFilter !== 'all' && (
          <div className="bg-[#EBF1FA] border-b border-[#1E56A0] py-2.5 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono-tech">
              <span className="state-text-active font-semibold">
                ● Mode Focus Modulaire actif : affichage d’un seul module
              </span>
              <button
                type="button"
                onClick={() => setActiveModuleFilter('all')}
                className="underline text-palette-main font-semibold cursor-pointer"
              >
                Réafficher tous les modules en continu
              </button>
            </div>
          </div>
        )}

        {displayedModules.map((module) => {
          const isCompleted = completedModules.includes(module.id);

          return (
            <section
              key={module.id}
              id={`module-${module.id}`}
              className={`scroll-mt-16 py-16 sm:py-20 border-b border-[#D5D0C3] ${getSectionBgClass(
                module.bgTone
              )}`}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête du Module écrit directement sur le fond respirant (sans carte superflue) */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
                  <div className="max-w-3xl">
                    <div className="text-xs font-mono-tech uppercase tracking-wider state-text-active font-semibold mb-2">
                      MODULE {module.number} · {module.sommervilleChapters}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif-editorial font-semibold text-palette-main mb-3">
                      {module.fullTitle}
                    </h2>
                    <p className="text-base text-palette-body">{module.subtitle}</p>
                  </div>

                  {/* Bouton d'état Quaternaire pour valider le module */}
                  <button
                    type="button"
                    onClick={() => toggleModuleCompleted(module.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono-tech cursor-pointer flat-surface-tertiary ${
                      isCompleted
                        ? 'border-[#1B6B4A] bg-[#EAF5F0] state-text-success font-semibold'
                        : 'text-palette-body hover:border-[#1E56A0]'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckSquare className="w-4 h-4" />
                        Module maîtrisé
                      </>
                    ) : (
                      <>
                        <Square className="w-4 h-4" />
                        Marquer comme acquis
                      </>
                    )}
                  </button>
                </div>

                {/* Parole directe du Mentor Senior — Éditorial pur sur le canevas */}
                <div className="max-w-4xl mb-12 border-l-2 border-[#16181D] pl-6 py-1">
                  <div className="text-xs font-mono-tech uppercase text-palette-muted mb-2">
                    La vision de l’Ingénieur Mentor :
                  </div>
                  <p className="text-base sm:text-lg text-palette-main leading-relaxed font-serif-editorial italic">
                    « {module.mentorIntro} »
                  </p>
                </div>

                {/* Cours éditorial aéré (Texte direct sur le fond primaire, sans boîtes inutiles) */}
                {module.sections.map((sec) => (
                  <div key={sec.id} className="mb-12 space-y-8">
                    <div className="max-w-3xl">
                      <div className="text-xs font-mono-tech text-palette-muted mb-1">
                        {sec.sommervilleRef}
                      </div>
                      <h3 className="text-xl font-serif-editorial font-semibold text-palette-main mb-3">
                        {sec.title}
                      </h3>
                      <p className="text-base text-palette-body leading-relaxed">
                        {sec.mentorVoice}
                      </p>
                    </div>

                    {/* Grands Principes écrits avec respiration typographique */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
                      {sec.corePrinciples.map((principle, idx) => (
                        <div key={idx} className="space-y-3">
                          <div className="text-xs font-mono-tech font-semibold state-text-active">
                            0{idx + 1} / PRINCIPE FONDAMENTAL
                          </div>
                          <h4 className="text-base font-serif-editorial font-semibold text-palette-main">
                            {principle.heading}
                          </h4>
                          <p className="text-sm text-palette-body leading-relaxed">
                            {principle.explanation}
                          </p>
                          <p className="text-xs text-palette-muted leading-relaxed">
                            <strong className="text-palette-main">Exemple réel :</strong>{' '}
                            {principle.concreteExample}
                          </p>
                          <div className="pt-2 border-t border-[#D5D0C3] text-xs font-mono-tech text-[#1E56A0]">
                            Règle pour guider l’IA : {principle.aiArchitectRule}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Adaptation aux Contraintes Nouvelles (si présente dans ce module) */}
                    {sec.constraintAdaptation && sec.constraintAdaptation.length > 0 && (
                      <div className="pt-4">
                        <h4 className="text-sm font-mono-tech uppercase tracking-wider text-palette-main font-semibold mb-4">
                          Comment s’adapter quand une nouvelle contrainte tombe en plein projet :
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {sec.constraintAdaptation.map((item, idx) => (
                            <div key={idx} className="flat-surface-tertiary p-5 space-y-2.5">
                              <div className="text-xs font-mono-tech font-semibold state-text-warning uppercase">
                                ▲ Nouvelle contrainte : {item.triggerConstraint}
                              </div>
                              <p className="text-xs text-palette-muted">
                                <strong className="state-text-danger">Mauvais réflexe :</strong>{' '}
                                {item.badReaction}
                              </p>
                              <p className="text-sm text-palette-main">
                                <strong className="state-text-success font-mono-tech">
                                  Décision d’Architecte :
                                </strong>{' '}
                                {item.architectDecision}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* SCHÉMA OU LABORATOIRE INTERACTIF DU MODULE (Palette Tertiaire) */}
                {renderInteractiveTool(module.interactiveToolId)}

                {/* Règle d'Or à retenir en fin de module */}
                <div className="mt-8 p-5 flat-surface-tertiary border-l-4 border-l-[#1B6B4A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono-tech font-semibold state-text-success uppercase mb-1">
                      Règle d’Or du Module {module.number} à Retenir :
                    </div>
                    <p className="text-sm text-palette-main font-medium">{module.keyTakeaway}</p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* LEXIQUE & DÉCODEUR DU JARGON IA + LISEUSE PDF */}
        <GlossaryDecoderSection />
      </main>

      {/* PIED DE PAGE ÉDITORIAL */}
      <footer className="py-10 bg-palette-primary-deep border-t border-[#D5D0C3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tech text-palette-body">
          <div>
            <strong>L’Architecte Logiciel</strong> — Formation modulaire basée sur{' '}
            <em>Software Engineering (10th Ed.)</em> d’Ian Sommerville.
          </div>
          <div className="flex items-center gap-4">
            <span>Fichiers directeurs : /context.md · /plan.md · /agents.md</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
