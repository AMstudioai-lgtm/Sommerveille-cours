import React, { useState } from 'react';
import {
  DATA_MODEL_OPTIONS,
  HOSTING_OPTIONS,
  type DataModelOption,
  type HostingOption,
} from '../data/curriculumData';
import {
  evaluateArchitectDecision,
  type ProjectConstraintsInput,
} from '../utils/mentorEngine';
import { Database, Server, Sliders, Check, Copy, CheckCircle2 } from 'lucide-react';

export const DecisionSimulator: React.FC = () => {
  const [selectedDataId, setSelectedDataId] = useState<DataModelOption['id']>('sql-relational');
  const [selectedHostId, setSelectedHostId] = useState<HostingOption['id']>('cloud-run-containers');

  const [constraints, setConstraints] = useState<ProjectConstraintsInput>({
    projectType: 'ai-secret-api',
    dataRelationship: 'strict-financial-relations',
    trafficPattern: 'spiky-serverless',
    offlineRequired: false,
  });

  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const activeData =
    DATA_MODEL_OPTIONS.find((d) => d.id === selectedDataId) ?? DATA_MODEL_OPTIONS[0];
  const activeHost =
    HOSTING_OPTIONS.find((h) => h.id === selectedHostId) ?? HOSTING_OPTIONS[0];

  const recommendation = evaluateArchitectDecision(constraints);

  const handleCopyPrompt = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(recommendation.aiStudioMasterPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2200);
    }
  };

  return (
    <div className="space-y-12 my-8">
      {/* PARTIE A : Comparateur Interactif des Types de Données */}
      <div className="flat-surface-tertiary p-6">
        <div className="border-b border-[#D5D0C3] pb-4 mb-5">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-palette-muted">
            <Database className="w-3.5 h-3.5 state-text-active" />
            Partie 1 — Quel type de données convient dans quel cas ?
          </div>
          <h3 className="text-xl font-serif-editorial font-semibold text-palette-main mt-1">
            Explorateur des 5 Familles de Stockage de Données
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-6">
          {DATA_MODEL_OPTIONS.map((model) => {
            const isSelected = model.id === selectedDataId;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedDataId(model.id)}
                className={`p-3.5 text-left cursor-pointer flat-surface-tertiary transition-colors ${
                  isSelected ? 'state-active-border state-active-bg' : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div
                  className={`text-xs font-mono-tech font-semibold ${
                    isSelected ? 'state-text-active' : 'text-palette-main'
                  }`}
                >
                  {model.name.split(' (')[0]}
                </div>
                <div className="text-[11px] text-palette-muted mt-1 line-clamp-1">
                  {model.examples}
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-mono-tech text-palette-muted">
                Exemples : {activeData.examples} · {activeData.sommervilleLink}
              </span>
              <h4 className="text-lg font-serif-editorial font-semibold text-palette-main">
                {activeData.name}
              </h4>
              <p className="text-sm text-palette-body mt-1">
                <strong>Structure :</strong> {activeData.structureType}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#EAF5F0]/60 border border-[#1B6B4A]">
                <div className="text-xs font-mono-tech font-semibold state-text-success uppercase mb-2">
                  ● Cas d’usage idéaux :
                </div>
                <ul className="space-y-1.5 text-sm text-palette-main">
                  {activeData.idealUseCases.map((u, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="font-mono-tech font-bold">·</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#FDF3EB] border border-[#B85D19]">
                <div className="text-xs font-mono-tech font-semibold state-text-warning uppercase mb-2">
                  ▲ Mauvais usages à éviter :
                </div>
                <ul className="space-y-1.5 text-sm text-palette-main">
                  {activeData.badUseCases.map((u, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="font-mono-tech font-bold">·</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
              <div className="text-xs font-mono-tech font-semibold state-text-active uppercase mb-1">
                Conseil de l’Architecte Senior :
              </div>
              <p className="text-sm text-palette-body">{activeData.aiArchitectAdvice}</p>
            </div>
          </div>

          {/* Schéma visuel de la donnée */}
          <div className="lg:col-span-5 p-5 bg-[#FAF8F5] border border-[#D5D0C3]">
            <div className="text-xs font-mono-tech uppercase text-palette-muted mb-2">
              Représentation Schématique de la Donnée
            </div>
            <div className="p-4 bg-white border border-[#16181D]">
              <div className="text-xs font-mono-tech font-semibold state-text-active pb-2 mb-3 border-b border-[#D5D0C3]">
                {activeData.visualSchema.entityName}
              </div>
              <div className="space-y-1.5 mb-3">
                {activeData.visualSchema.fields.map((field, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#E5E0D5] font-mono-tech text-xs text-palette-main"
                  >
                    {field}
                  </div>
                ))}
              </div>
              <p className="text-xs text-palette-muted leading-relaxed">
                {activeData.visualSchema.relationNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PARTIE B : Comparateur Interactif des Hébergeurs */}
      <div className="flat-surface-tertiary p-6">
        <div className="border-b border-[#D5D0C3] pb-4 mb-5">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-palette-muted">
            <Server className="w-3.5 h-3.5 state-text-active" />
            Partie 2 — Quel choix d’hébergeur faire, et en fonction de quoi ?
          </div>
          <h3 className="text-xl font-serif-editorial font-semibold text-palette-main mt-1">
            Comparateur des 4 Modèles d’Hébergement Cloud
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {HOSTING_OPTIONS.map((host) => {
            const isSelected = host.id === selectedHostId;
            return (
              <button
                key={host.id}
                type="button"
                onClick={() => setSelectedHostId(host.id)}
                className={`p-4 text-left cursor-pointer flat-surface-tertiary transition-colors ${
                  isSelected ? 'state-active-border state-active-bg' : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div
                  className={`text-xs font-mono-tech font-semibold ${
                    isSelected ? 'state-text-active' : 'text-palette-main'
                  }`}
                >
                  {host.name}
                </div>
                <div className="text-[11px] text-palette-muted mt-1">{host.examples}</div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
              <div className="text-xs font-mono-tech text-palette-muted mb-1">
                Architecture associée : {activeHost.architectureFit}
              </div>
              <h4 className="text-base font-semibold text-palette-main mb-2">
                Comment ça fonctionne concrètement ?
              </h4>
              <p className="text-sm text-palette-body">{activeHost.howItWorks}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-[#D5D0C3]">
                <div className="text-xs font-mono-tech font-semibold state-text-success uppercase mb-2">
                  Avantages clés :
                </div>
                <ul className="space-y-1.5 text-sm text-palette-body">
                  {activeHost.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="font-mono-tech state-text-success font-bold">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-white border border-[#D5D0C3]">
                <div className="text-xs font-mono-tech font-semibold state-text-warning uppercase mb-2">
                  Contraintes à connaître :
                </div>
                <ul className="space-y-1.5 text-sm text-palette-body">
                  {activeHost.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="font-mono-tech state-text-warning font-bold">-</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 bg-[#FAF8F5] border border-[#D5D0C3] flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono-tech font-semibold state-text-active uppercase mb-1">
                Critère décisif de sélection :
              </div>
              <p className="text-sm text-palette-main font-medium mb-4">
                {activeHost.whenToChoose}
              </p>
              <div className="text-xs font-mono-tech font-semibold text-palette-muted uppercase mb-1">
                Modèle de facturation :
              </div>
              <p className="text-sm text-palette-body">{activeHost.costModel}</p>
            </div>

            <div className="p-3 bg-white border border-[#D5D0C3] text-xs font-mono-tech text-palette-main">
              Exemples du marché : {activeHost.examples}
            </div>
          </div>
        </div>
      </div>

      {/* PARTIE C : Simulateur de Décision Complet selon vos Contraintes */}
      <div className="flat-surface-tertiary p-6 border-t-4 border-t-[#1E56A0]">
        <div className="border-b border-[#D5D0C3] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase state-text-active font-semibold">
            <Sliders className="w-3.5 h-3.5" />
            Outil Interactif — Simulateur de Décision Architecturale sous Contraintes
          </div>
          <h3 className="text-xl font-serif-editorial font-semibold text-palette-main mt-1">
            Configurez votre Projet : Le Moteur d’Architecte Génère votre Plan Technique
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Paramètres d'entrée (Palette Tertiaire) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label
                htmlFor="sim-project-type"
                className="block text-xs font-mono-tech font-semibold text-palette-main uppercase mb-1.5"
              >
                1. Nature principale du logiciel :
              </label>
              <select
                id="sim-project-type"
                value={constraints.projectType}
                onChange={(e) =>
                  setConstraints((prev) => ({
                    ...prev,
                    projectType: e.target.value as ProjectConstraintsInput['projectType'],
                  }))
                }
                className="w-full px-3 py-2.5 text-sm flat-input-tertiary cursor-pointer"
              >
                <option value="ai-secret-api">
                  Application utilisant une API secrète (Gemini IA, Paiement Stripe...)
                </option>
                <option value="enterprise-saas">
                  Outil métier / SaaS de gestion avec règles métier strictes
                </option>
                <option value="interactive-multi-view">
                  Tableau de bord interactif synchronisant graphiques et tableaux
                </option>
                <option value="shared-medical-records">
                  Dossier central partagé entre plusieurs modules (ex: Mentcare médical)
                </option>
                <option value="file-processing-pipeline">
                  Chaîne d’import, nettoyage, calcul et export de fichiers (CSV / PDF)
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sim-data-rel"
                className="block text-xs font-mono-tech font-semibold text-palette-main uppercase mb-1.5"
              >
                2. Nature des données à manipuler :
              </label>
              <select
                id="sim-data-rel"
                value={constraints.dataRelationship}
                onChange={(e) =>
                  setConstraints((prev) => ({
                    ...prev,
                    dataRelationship: e.target.value as ProjectConstraintsInput['dataRelationship'],
                  }))
                }
                className="w-full px-3 py-2.5 text-sm flat-input-tertiary cursor-pointer"
              >
                <option value="strict-financial-relations">
                  Données très liées (Factures, Clients, Commandes, Comptabilité)
                </option>
                <option value="flexible-realtime-docs">
                  Documents flexibles et synchronisation en direct (Notes, Chat, Profils)
                </option>
                <option value="large-media-files">
                  Fichiers lourds (PDF, Vidéos, Images haute définition)
                </option>
                <option value="temporary-local-only">
                  Simulateur personnel sans compte utilisateur (appareil local)
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sim-traffic"
                className="block text-xs font-mono-tech font-semibold text-palette-main uppercase mb-1.5"
              >
                3. Profil de trafic & d’exploitation :
              </label>
              <select
                id="sim-traffic"
                value={constraints.trafficPattern}
                onChange={(e) =>
                  setConstraints((prev) => ({
                    ...prev,
                    trafficPattern: e.target.value as ProjectConstraintsInput['trafficPattern'],
                  }))
                }
                className="w-full px-3 py-2.5 text-sm flat-input-tertiary cursor-pointer"
              >
                <option value="spiky-serverless">
                  Trafic variable avec besoin de serveur sécurisé (Scale-to-Zero)
                </option>
                <option value="realtime-auth-baas">
                  Démarrage rapide avec Authentification Google & Temps Réel managé
                </option>
                <option value="static-global">
                  Affichage mondial instantané à coût quasi nul (100% statique)
                </option>
                <option value="continuous-heavy-vm">
                  Traitements lourds continus 24h/24 sur machine dédiée
                </option>
              </select>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() =>
                  setConstraints((prev) => ({
                    ...prev,
                    offlineRequired: !prev.offlineRequired,
                  }))
                }
                className={`w-full p-3.5 text-left flex items-center justify-between cursor-pointer flat-surface-tertiary ${
                  constraints.offlineRequired
                    ? 'state-active-border state-active-bg'
                    : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div>
                  <div className="text-xs font-mono-tech font-semibold text-palette-main">
                    Contrainte Terrain : Mode Hors-Ligne (Connexion instable)
                  </div>
                  <div className="text-[11px] text-palette-muted">
                    Exige que l’application continue de fonctionner si Internet coupe
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-mono-tech font-semibold border ${
                    constraints.offlineRequired
                      ? 'bg-[#1E56A0] text-white border-[#1E56A0]'
                      : 'bg-[#FAF8F5] text-palette-muted border-[#D5D0C3]'
                  }`}
                >
                  {constraints.offlineRequired ? 'OUI' : 'NON'}
                </span>
              </button>
            </div>
          </div>

          {/* Verdict & Recommandations (Palette Quaternaire + Tertiaire) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 bg-[#EBF1FA] border border-[#1E56A0]">
                <div className="text-[11px] font-mono-tech uppercase state-text-active font-semibold">
                  1. Architecture
                </div>
                <div className="text-sm font-serif-editorial font-semibold text-palette-main mt-1">
                  {recommendation.recommendedArchitecture.name}
                </div>
              </div>
              <div className="p-4 bg-[#EAF5F0] border border-[#1B6B4A]">
                <div className="text-[11px] font-mono-tech uppercase state-text-success font-semibold">
                  2. Base de Données
                </div>
                <div className="text-sm font-serif-editorial font-semibold text-palette-main mt-1">
                  {recommendation.recommendedDataModel.name.split(' (')[0]}
                </div>
              </div>
              <div className="p-4 bg-[#FDF3EB] border border-[#B85D19]">
                <div className="text-[11px] font-mono-tech uppercase state-text-warning font-semibold">
                  3. Hébergeur Cible
                </div>
                <div className="text-sm font-serif-editorial font-semibold text-palette-main mt-1">
                  {recommendation.recommendedHosting.name.split(' (')[0]}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3] space-y-2">
              <div className="text-xs font-mono-tech font-semibold text-palette-main uppercase">
                Justification de l’Ingénieur Mentor :
              </div>
              {recommendation.mentorJustification.map((line, i) => (
                <p key={i} className="text-xs text-palette-body flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 state-text-success mt-0.5" />
                  <span>{line}</span>
                </p>
              ))}
            </div>

            <div className="p-4 bg-white border border-[#D5D0C3]">
              <div className="text-xs font-mono-tech font-semibold text-palette-main uppercase mb-2">
                Arborescence Recommandée à Imposer à l’IA :
              </div>
              <div className="space-y-1 font-mono-tech text-xs text-palette-body">
                {recommendation.suggestedFolderBlueprint.map((line, i) => (
                  <div key={i} className="py-0.5 border-b border-[#F1EFEA] last:border-none">
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt Prêt à Copier pour Google AI Studio */}
            <div className="p-4 bg-[#FAF8F5] border border-[#1E56A0]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono-tech font-semibold state-text-active uppercase">
                  Prompt Architecte Généré pour Google AI Studio :
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-tech bg-white border border-[#D5D0C3] text-palette-main cursor-pointer hover:border-[#1E56A0]"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 state-text-success" />
                      Copié !
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
                « {recommendation.aiStudioMasterPrompt} »
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
