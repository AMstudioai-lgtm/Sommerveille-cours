import React, { useEffect, useState } from 'react';
import { TRAINING_MODULES, AI_STUDIO_SCENARIOS, type TrainingModule } from './data/curriculumData';
import { AUDIT_QUIZ_CASES } from './data/architectureReadingData';
import { SUBSECTION_VISUALS } from './data/moduleVisualsData';
import { calculateMasteryProgress } from './utils/mentorEngine';
import {
  loadProgress,
  resetProgress,
  saveProgress,
} from './persistence/progressStorage';
import { InteractiveArchitectureDiagram } from './components/InteractiveArchitectureDiagram';
import { ArchitectureReadingLab } from './components/ArchitectureReadingLab';
import { SubSectionVisualStack } from './components/SubSectionVisualStack';
import {
  LifecycleProcessVisualizer,
  SwissCheeseSecuritySimulator,
} from './components/LifecycleAndSwissCheese';
import { FileTreeExplorer } from './components/FileTreeExplorer';
import { DecisionSimulator } from './components/DecisionSimulator';
import { AiStudioScenarioLab, GlossaryDecoderSection } from './components/AiStudioScenarioLab';
import { CapstoneProjectLab } from './components/CapstoneProjectLab';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { useTheme } from './hooks/useTheme';
import {
  ChevronDown,
  CheckSquare,
  Square,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [initialProgress] = useState(() => loadProgress());
  const [activeModuleFilter, setActiveModuleFilter] = useState<string | 'all'>('all');
  const [navDrawerOpen, setNavDrawerOpen] = useState<boolean>(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false);
  const [completedModules, setCompletedModules] = useState<string[]>(
    initialProgress.completedModules
  );
  const [solvedScenarioSteps, setSolvedScenarioSteps] = useState<string[]>(
    initialProgress.solvedScenarioSteps
  );
  const [capstoneCheckedMilestones, setCapstoneCheckedMilestones] = useState<string[]>(
    initialProgress.capstoneCheckedMilestones
  );
  const [capstoneProjectName, setCapstoneProjectName] = useState<string>(
    initialProgress.capstoneProjectName
  );
  const [capstoneBusinessRule, setCapstoneBusinessRule] = useState<string>(
    initialProgress.capstoneBusinessRule
  );

  useEffect(() => {
    saveProgress({
      completedModules,
      solvedScenarioSteps,
      capstoneCheckedMilestones,
      capstoneProjectName,
      capstoneBusinessRule,
    });
  }, [
    completedModules,
    solvedScenarioSteps,
    capstoneCheckedMilestones,
    capstoneProjectName,
    capstoneBusinessRule,
  ]);

  const totalScenarioStepsCount =
    AI_STUDIO_SCENARIOS.reduce((acc, scen) => acc + scen.steps.length, 0) +
    AUDIT_QUIZ_CASES.length;

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

  const toggleCapstoneMilestone = (milestoneId: string) => {
    setCapstoneCheckedMilestones((prev) =>
      prev.includes(milestoneId)
        ? prev.filter((id) => id !== milestoneId)
        : [...prev, milestoneId]
    );
  };

  const handleConfirmResetProgress = () => {
    const fresh = resetProgress();
    setCompletedModules(fresh.completedModules);
    setSolvedScenarioSteps(fresh.solvedScenarioSteps);
    setCapstoneCheckedMilestones(fresh.capstoneCheckedMilestones);
    setCapstoneProjectName(fresh.capstoneProjectName);
    setCapstoneBusinessRule(fresh.capstoneBusinessRule);
    setConfirmResetOpen(false);
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
      case 'none':
        return null;
      case 'lifecycle-flow':
        return (
          <div className="pt-8">
            <LifecycleProcessVisualizer />
          </div>
        );
      case 'architecture-schema':
        return (
          <div className="pt-8">
            <InteractiveArchitectureDiagram />
          </div>
        );
      case 'architecture-reading-lab':
        return (
          <ArchitectureReadingLab
            onAuditCaseSolved={handleScenarioStepSolved}
            solvedSteps={solvedScenarioSteps}
          />
        );
      case 'file-tree':
        return (
          <div className="pt-8">
            <FileTreeExplorer />
          </div>
        );
      case 'data-hosting-sim':
        return (
          <div className="pt-8">
            <DecisionSimulator />
          </div>
        );
      case 'dependability-swiss':
        return (
          <div className="pt-8">
            <SwissCheeseSecuritySimulator />
          </div>
        );
      case 'ai-studio-scenarios':
        return (
          <div className="pt-8">
            <AiStudioScenarioLab
              onScenarioStepSolved={handleScenarioStepSolved}
              solvedSteps={solvedScenarioSteps}
            />
          </div>
        );
      case 'capstone-project':
        return (
          <CapstoneProjectLab
            onScenarioStepSolved={handleScenarioStepSolved}
            solvedSteps={solvedScenarioSteps}
            checkedMilestones={capstoneCheckedMilestones}
            onToggleMilestone={toggleCapstoneMilestone}
            customProjectName={capstoneProjectName}
            onChangeProjectName={setCapstoneProjectName}
            customBusinessRule={capstoneBusinessRule}
            onChangeBusinessRule={setCapstoneBusinessRule}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-palette-primary text-palette-main">
      {/* BARRE DE NAVIGATION MINIMALISTE AVEC REVEAL FLUIDE */}
      <header className="sticky top-0 z-40 bg-[var(--bg-header-sticky)] backdrop-blur-sm border-b border-[var(--border-tertiary-fine)] animate-reveal-down">
        <div className="w-full h-1 bg-[var(--bg-primary-deep)]">
          <div
            className="h-full bg-[var(--state-quaternary-active)] transition-all duration-500 ease-out"
            style={{ width: `${mastery.percentage}%` }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setActiveModuleFilter('all')}
            className="text-left cursor-pointer group flex items-center gap-2.5 shrink-0 min-w-0"
          >
            <span className="w-7 h-7 shrink-0 flex items-center justify-center bg-[var(--btn-ink-bg)] text-[var(--btn-ink-text)] font-mono-tech text-xs font-semibold">
              SE
            </span>
            <span className="text-sm sm:text-base font-bold text-palette-main group-hover:text-[var(--state-quaternary-active)] transition-colors whitespace-nowrap">
              L’Architecte Logiciel
            </span>
          </button>

          {/* Navigation épurée sur une seule ligne */}
          <nav
            className="hidden md:flex items-center gap-6 shrink-0"
            aria-label="Navigation principale"
          >
            <button
              type="button"
              onClick={() => setActiveModuleFilter('all')}
              className={`text-sm cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                activeModuleFilter === 'all'
                  ? 'state-text-active font-semibold'
                  : 'text-palette-body hover:text-palette-main'
              }`}
            >
              Modules (01–09)
            </button>
            <a
              href="#module-mod-5-lecture-architecture"
              onClick={() => setActiveModuleFilter('all')}
              className="text-sm text-palette-body hover:text-[#1E56A0] transition-colors whitespace-nowrap shrink-0"
            >
              Atelier 5 Architectures
            </a>
            <a
              href="#projet-final"
              onClick={() => setActiveModuleFilter('all')}
              className="text-sm text-palette-body hover:text-[#1E56A0] transition-colors whitespace-nowrap shrink-0"
            >
              Projet Final
            </a>
            <a
              href="#lexique-decodeur"
              onClick={() => setActiveModuleFilter('all')}
              className="text-sm text-palette-body hover:text-[#1E56A0] transition-colors whitespace-nowrap shrink-0"
            >
              Lexique IA
            </a>
          </nav>

          {/* Progression, Thème, Installation PWA & Tiroir Sommaire Animé */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <span
              title={`${mastery.rankLabel} — ${mastery.percentage}%`}
              className="hidden sm:inline-block text-xs font-mono-tech tabular-nums text-palette-muted whitespace-nowrap shrink-0"
            >
              Maîtrise {mastery.percentage}%
            </span>

            <ThemeToggleButton theme={theme} onToggle={toggleTheme} />

            <PWAInstallButton />

            <button
              type="button"
              onClick={() => {
                setNavDrawerOpen((prev) => !prev);
                setConfirmResetOpen(false);
              }}
              aria-expanded={navDrawerOpen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium flat-surface-tertiary cursor-pointer hover:border-[var(--state-quaternary-active)] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Sommaire</span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${
                  navDrawerOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Tiroir Sommaire Complet avec Sous-modules */}
        {navDrawerOpen && (
          <div className="border-t border-[var(--border-tertiary-fine)] bg-[var(--surface-tertiary-alt)] animate-reveal-down max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain touch-pan-y">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-6 pb-10 sm:py-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <span className="text-xs font-mono-tech uppercase text-palette-muted">
                  Plan Méthodique de la Formation (9 Modules + Projet Final) · {mastery.rankLabel} · {mastery.percentage}%
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModuleFilter('all');
                      setNavDrawerOpen(false);
                    }}
                    className="text-xs font-mono-tech state-text-active underline cursor-pointer whitespace-nowrap"
                  >
                    Tout afficher en lecture continue
                  </button>

                  {!confirmResetOpen ? (
                    <button
                      type="button"
                      onClick={() => setConfirmResetOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-palette-muted hover:text-[#A62626] cursor-pointer whitespace-nowrap transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                      <span>Réinitialiser la progression</span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-xs font-mono-tech">
                      <span className="state-text-danger font-medium">Effacer la sauvegarde locale ?</span>
                      <button
                        type="button"
                        onClick={handleConfirmResetProgress}
                        className="px-2.5 py-1 bg-[#A62626] text-white cursor-pointer whitespace-nowrap"
                      >
                        Confirmer
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmResetOpen(false)}
                        className="px-2.5 py-1 flat-surface-tertiary text-palette-main cursor-pointer whitespace-nowrap"
                      >
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Accès rapides visibles sur mobile/tablette */}
              <div className="grid grid-cols-3 gap-2 mb-5 md:hidden">
                <a
                  href="#module-mod-5-lecture-architecture"
                  onClick={() => {
                    setActiveModuleFilter('all');
                    setNavDrawerOpen(false);
                  }}
                  className="px-2.5 py-2 text-center text-xs font-medium flat-surface-tertiary text-palette-main hover:border-[#1E56A0] transition-colors truncate"
                >
                  5 Architectures
                </a>
                <a
                  href="#projet-final"
                  onClick={() => {
                    setActiveModuleFilter('all');
                    setNavDrawerOpen(false);
                  }}
                  className="px-2.5 py-2 text-center text-xs font-medium flat-surface-tertiary text-palette-main hover:border-[#1E56A0] transition-colors truncate"
                >
                  Projet Final
                </a>
                <a
                  href="#lexique-decodeur"
                  onClick={() => {
                    setActiveModuleFilter('all');
                    setNavDrawerOpen(false);
                  }}
                  className="px-2.5 py-2 text-center text-xs font-medium flat-surface-tertiary text-palette-main hover:border-[#1E56A0] transition-colors truncate"
                >
                  Lexique IA
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TRAINING_MODULES.map((mod) => {
                  const isDone = completedModules.includes(mod.id);
                  const isFocused = activeModuleFilter === mod.id;
                  const subCountLabel =
                    mod.interactiveToolId === 'architecture-reading-lab'
                      ? '6 ateliers'
                      : `${mod.sections.length} sous-mod.`;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => {
                        setActiveModuleFilter(mod.id);
                        setNavDrawerOpen(false);
                      }}
                      className={`p-4 text-left cursor-pointer flat-surface-tertiary transition-colors min-w-0 overflow-hidden ${
                        isFocused ? 'state-active-border state-active-bg' : 'hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs font-mono-tech mb-1.5">
                        <span className="state-text-active font-semibold whitespace-nowrap">
                          MODULE {mod.number}
                        </span>
                        <span
                          className={`whitespace-nowrap ${
                            isDone ? 'state-text-success' : 'text-palette-muted'
                          }`}
                        >
                          {isDone ? '✓ Acquis' : subCountLabel}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-palette-main mb-1 break-words">
                        {mod.shortTitle}
                      </div>
                      <div className="text-xs text-palette-muted line-clamp-2 break-words">
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

      {/* HERO ÉDITORIAL MINIMALISTE & RESPIRANT (Grand Titre Serif, Sous-titre, Filet fort, Métrique nue) */}
      <section className="py-16 sm:py-24 border-b border-[var(--border-tertiary-fine)] bg-palette-primary">
        <div className="max-w-4xl mx-auto px-7 sm:px-12 lg:px-16">
          <div className="max-w-[65ch] space-y-7 animate-reveal-up">
            <div className="space-y-4">
              <div className="text-xs font-mono-tech uppercase tracking-widest state-text-active font-semibold">
                PARCOURS MENTORÉ · D’APRÈS IAN SOMMERVILLE
              </div>

              <h1 className="font-editorial-serif font-medium text-[2.55rem] sm:text-[3.85rem] text-palette-main leading-[1.06] tracking-[-0.02em]">
                De la Conception à la Maintenance d’un Logiciel.
              </h1>

              <p className="text-[1.1rem] sm:text-[1.32rem] text-palette-body leading-[1.58] font-normal">
                Apprends méthodiquement à penser en architecte logiciel sans écrire de code, à décider quelle architecture choisir, à lire une arborescence et à piloter l’IA jusqu’à ton projet final.
              </p>
            </div>

            <div className="editorial-rule-strong pt-7 space-y-6">
              <p className="text-[16px] sm:text-[17px] text-palette-body leading-[1.74]">
                <strong className="font-semibold text-palette-main">Le principe de formation : </strong>
                chaque module s’appuie sur un schéma lisible en 5 secondes, des explications sans jargon inutile et des exercices de décision réels inspirés d’Ian Sommerville pour garder la maîtrise de tes projets IA.
              </p>

              <div className="pt-1 space-y-1">
                <div className="font-editorial-serif editorial-numerals font-light text-5xl sm:text-6xl leading-none tracking-tight state-text-active">
                  {completedModules.length}/{TRAINING_MODULES.length}
                </div>
                <div className="text-xs sm:text-sm text-palette-muted">
                  Modules validés · {mastery.rankLabel} ({mastery.percentage}% de maîtrise globale)
                </div>
              </div>
            </div>

            <div className="editorial-rule-fine pt-7 flex flex-wrap items-center gap-4 no-print">
              <a
                href="#module-mod-1-fondations"
                onClick={() => setActiveModuleFilter('all')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium bg-[var(--btn-ink-bg)] text-[var(--btn-ink-text)] hover:bg-[var(--state-quaternary-active)] hover:text-white transition-colors"
              >
                Commencer au Module 01
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#projet-final"
                onClick={() => setActiveModuleFilter('all')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium flat-surface-tertiary text-palette-main hover:border-[var(--state-quaternary-active)] transition-colors"
              >
                Voir le Projet Final à Construire
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CORPS DE LA FORMATION : MARGES ÉDITORIALES, TITRE SERIF, FILETS & RESPIRATION */}
      <main className="flex-1">
        {activeModuleFilter !== 'all' && (
          <div className="bg-[var(--state-bg-active)] border-b border-[var(--state-quaternary-active)] py-3 px-7 sm:px-12 no-print">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tech">
              <span className="state-text-active font-semibold">
                Lecture ciblée d’un module unique
              </span>
              <button
                type="button"
                onClick={() => setActiveModuleFilter('all')}
                className="underline text-palette-main font-semibold cursor-pointer whitespace-nowrap"
              >
                Réafficher les 9 modules en continu
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
              className={`scroll-mt-16 py-20 sm:py-28 border-b border-[var(--border-tertiary-fine)] ${getSectionBgClass(
                module.bgTone
              )}`}
            >
              <div className="max-w-4xl mx-auto px-7 sm:px-12 lg:px-16 space-y-16 sm:space-y-20">
                {/* 1. INTRODUCTION DU MODULE : GRAND TITRE SERIF + SOUS-TITRE + FILET FORT + MENTOR */}
                <div className="max-w-[65ch] space-y-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs font-mono-tech uppercase tracking-widest state-text-active font-semibold">
                      MODULE {module.number} · {module.sommervilleChapters}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleModuleCompleted(module.id)}
                      className={`no-print inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-tech cursor-pointer flat-surface-tertiary ${
                        isCompleted
                          ? 'border-[#1B6B4A] bg-[#EAF5F0] state-text-success font-semibold'
                          : 'text-palette-body hover:border-[var(--state-quaternary-active)]'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckSquare className="w-4 h-4" />
                          Module validé
                        </>
                      ) : (
                        <>
                          <Square className="w-4 h-4" />
                          Marquer ce module comme acquis
                        </>
                      )}
                    </button>
                  </div>

                  {/* Grand Titre Serif & Sous-titre avec espace conséquent */}
                  <div className="space-y-4">
                    <h2 className="font-editorial-serif font-medium text-[2.2rem] sm:text-[3.25rem] text-palette-main leading-[1.08] tracking-[-0.02em]">
                      {module.fullTitle}
                    </h2>
                    <p className="text-[1.08rem] sm:text-[1.28rem] text-palette-body leading-[1.56] font-normal">
                      {module.subtitle}
                    </p>
                  </div>

                  {/* Filet horizontal éditorial fort + Parole du Mentor en attaque directe */}
                  <div className="editorial-rule-strong pt-7">
                    <p className="text-[16px] sm:text-[17px] text-palette-body leading-[1.76]">
                      <strong className="font-semibold text-palette-main">
                        Parole de l’Ingénieur Mentor :{' '}
                      </strong>
                      {module.mentorIntro}
                    </p>
                  </div>
                </div>

                {/* 2. SCHÉMA VISUEL DE RÉFÉRENCE DU MODULE (Style pastel plat & croquis d'architecture) */}
                {module.schemaImage && (
                  <div className="space-y-4">
                    <div className="text-xs font-mono-tech uppercase tracking-wider text-palette-muted">
                      Schéma Visuel du Module {module.number}
                    </div>

                    {module.schemaImage.secondarySrc ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <figure className="flat-surface-tertiary p-4 sm:p-6 min-w-0">
                          <img
                            src={module.schemaImage.src}
                            alt={module.schemaImage.alt}
                            className="w-full h-auto block"
                            loading="lazy"
                          />
                          <figcaption className="mt-4 text-sm text-palette-body leading-relaxed break-words">
                            {module.schemaImage.caption}
                          </figcaption>
                        </figure>
                        <figure className="flat-surface-tertiary p-4 sm:p-6 min-w-0">
                          <img
                            src={module.schemaImage.secondarySrc}
                            alt={module.schemaImage.alt}
                            className="w-full h-auto block"
                            loading="lazy"
                          />
                          <figcaption className="mt-4 text-sm text-palette-body leading-relaxed break-words">
                            {module.schemaImage.secondaryCaption}
                          </figcaption>
                        </figure>
                      </div>
                    ) : (
                      <figure className="flat-surface-tertiary p-4 sm:p-8 max-w-4xl min-w-0">
                        <img
                          src={module.schemaImage.src}
                          alt={module.schemaImage.alt}
                          className="w-full h-auto block"
                          loading="lazy"
                        />
                        <figcaption className="mt-4 text-sm text-palette-body leading-relaxed break-words">
                          {module.schemaImage.caption}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                )}

                {/* 3. LES SOUS-MODULES DÉTAILLÉS & ESPACÉS (Grand Titre Serif -> Sous-titre -> Contenu) */}
                {module.sections.length > 0 && (
                  <div className="space-y-20">
                  {module.sections.map((sec) => (
                    <article
                      key={sec.id}
                      className="pt-14 editorial-rule-fine space-y-9"
                    >
                      {/* En-tête du Sous-module : Grand Titre Serif + Sous-titre */}
                      <div className="max-w-[65ch] space-y-3">
                        <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
                          {sec.code} · {sec.sommervilleRef}
                        </div>
                        <h3 className="font-editorial-serif font-medium text-[1.75rem] sm:text-[2.45rem] text-palette-main leading-[1.12] tracking-[-0.015em]">
                          {sec.title}
                        </h3>
                        <p className="text-[1.05rem] sm:text-[1.18rem] text-palette-body leading-[1.56]">
                          {sec.subtitle}
                        </p>
                      </div>

                      {/* Explication méthodique et enrichie posée directement sur le fond */}
                      <div className="max-w-[65ch] space-y-5 text-[16px] sm:text-[17px] text-palette-body leading-[1.78]">
                        <p className="text-palette-body">
                          <strong className="font-semibold text-palette-main">
                            En pratique :{' '}
                          </strong>
                          {sec.mentorVoice}
                        </p>
                        {sec.deepDiveParagraphs.map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-palette-body">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Schéma Mermaid adaptatif + Blocs de code typés + Arborescence du sous-module */}
                      {SUBSECTION_VISUALS[sec.id] && (
                        <SubSectionVisualStack items={SUBSECTION_VISUALS[sec.id]} />
                      )}

                      {/* Principes clés épurés avec filets horizontaux fins */}
                      <div className="pt-4 space-y-8 max-w-[65ch]">
                        {sec.corePrinciples.map((principle, idx) => (
                          <div
                            key={idx}
                            className="pt-6 editorial-rule-fine space-y-2.5"
                          >
                            <div className="text-xs font-mono-tech uppercase state-text-active font-semibold">
                              Point Clé 0{idx + 1}
                            </div>
                            <h4 className="text-lg sm:text-xl font-semibold text-palette-main leading-snug">
                              {principle.heading}
                            </h4>
                            <p className="text-[15.5px] sm:text-[16px] text-palette-body leading-[1.72] whitespace-pre-line">
                              {principle.explanation}
                            </p>
                            <p className="text-sm text-palette-muted leading-relaxed whitespace-pre-line">
                              <strong className="font-semibold text-palette-main">Exemple concret :</strong>{' '}
                              {principle.concreteExample}
                            </p>
                            <p className="text-sm font-mono-tech state-text-active pt-1">
                              Consigne Architecte IA : {principle.aiArchitectRule}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Adaptation aux contraintes nouvelles */}
                      {sec.constraintAdaptation && sec.constraintAdaptation.length > 0 && (
                        <div className="pt-6 max-w-4xl space-y-4">
                          <h4 className="text-lg font-bold text-palette-main">
                            S’adapter à une contrainte nouvelle en cours de route :
                          </h4>
                          <div className="space-y-4">
                            {sec.constraintAdaptation.map((item, idx) => (
                              <div key={idx} className="flat-surface-tertiary p-6 space-y-2 min-w-0">
                                <div className="text-xs font-mono-tech font-semibold state-text-warning uppercase break-words">
                                  ▲ Imprévu : {item.triggerConstraint}
                                </div>
                                <p className="text-sm text-palette-muted break-words">
                                  <strong className="state-text-danger">Mauvais réflexe :</strong>{' '}
                                  {item.badReaction}
                                </p>
                                <p className="text-base text-palette-main break-words">
                                  <strong className="state-text-success">
                                    Décision d’Architecte :
                                  </strong>{' '}
                                  {item.architectDecision}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                  </div>
                )}

                {/* 4. LABORATOIRE INTERACTIF DU MODULE */}
                {renderInteractiveTool(module.interactiveToolId)}

                {/* 5. SYNTHÈSE & RÈGLE D'OR DU MODULE */}
                <div className="pt-8 editorial-rule-strong max-w-[65ch]">
                  <div className="text-xs font-mono-tech font-semibold state-text-success uppercase mb-2">
                    À Retenir du Module {module.number}
                  </div>
                  <p className="text-lg font-medium text-palette-main leading-relaxed">
                    {module.keyTakeaway}
                  </p>
                </div>
              </div>
            </section>
          );
        })}

        {/* LEXIQUE & DÉCODEUR DU JARGON IA + LISEUSE PDF */}
        <GlossaryDecoderSection />
      </main>

      {/* PIED DE PAGE MINIMALISTE */}
      <footer className="py-14 bg-palette-primary-deep border-t border-[var(--border-tertiary-fine)]">
        <div className="max-w-4xl mx-auto px-7 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tech text-palette-body">
          <div>
            <strong>L’Architecte Logiciel</strong> — Formation modulaire basée sur{' '}
            <em>Software Engineering (10th Ed.)</em> d’Ian Sommerville.
          </div>
          <div>Fichiers directeurs : /context.md · /plan.md · /agents.md</div>
        </div>
      </footer>
      {/* INDICATEUR DISCRET MODE HORS-LIGNE (PALETTE QUATERNAIRE) */}
      <OfflineIndicator />
    </div>
  );
}
