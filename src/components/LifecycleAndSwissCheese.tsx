import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Check, X, RefreshCw } from 'lucide-react';

export const LifecycleProcessVisualizer: React.FC = () => {
  const [selectedApproach, setSelectedApproach] = useState<'incremental' | 'waterfall'>('incremental');
  const [activeIncrement, setActiveIncrement] = useState<number>(1);

  const increments = [
    {
      num: 1,
      title: 'Incrément 1 : Le Noyau Métier & Squelette (MVP)',
      spec: 'Définir le problème principal et les règles de calcul critiques.',
      design: 'Créer `types.ts` et le moteur pur dans `src/utils/` + 1 écran simple.',
      validation: 'Tester immédiatement si le calcul est juste avec de vraies valeurs.',
      evolution: 'Base saine prête à accueillir la sauvegarde de données.',
      mentorNote:
        "En livrant l'Incrément 1 en 15 minutes sur AI Studio, tu vérifies tout de suite que la direction est bonne avant d'investir dans les détails."
    },
    {
      num: 2,
      title: 'Incrément 2 : Persistance des Données & Rôles',
      spec: 'Définir quelles données doivent survivre au rechargement de la page.',
      design: 'Brancher SQL (`schema.ts`) ou Firestore (`firestore.rules`) via `src/services/`.',
      validation: 'Vérifier les opérations CRUD (Créer, Lire, Modifier, Supprimer).',
      evolution: 'Le logiciel devient multi-sessions et sécurisé.',
      mentorNote:
        "L'interface de l'Incrément 1 n'a pas besoin d'être jetée : on la connecte simplement à la couche de service."
    },
    {
      num: 3,
      title: 'Incrément 3 : Expérience Avancée, Cas Limites & Refactoring',
      spec: 'Gérer les erreurs réseau, le mode hors-ligne et les exports.',
      design: 'Découper les composants devenus grands et mettre à jour `context.md`.',
      validation: 'Tests unitaires complets + test visuel dans le navigateur.',
      evolution: 'Système prêt pour la production et facile à maintenir en v2.',
      mentorNote:
        "C'est ici que l'architecte fait son ménage (Refactoring) pour garder une dette technique proche de zéro."
    }
  ];

  const currentInc = increments.find((i) => i.num === activeIncrement) ?? increments[0];

  return (
    <div className="flat-surface-tertiary p-6 my-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#D5D0C3]">
        <div>
          <div className="text-xs font-mono-tech uppercase text-palette-muted">
            Schéma Interactif — Sommerville Chapitres 2 & 3
          </div>
          <h3 className="text-xl font-serif-editorial font-semibold text-palette-main">
            Simulateur de Processus : Approche Incrémentale (Agile) vs Monolithe en Cascade
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSelectedApproach('incremental')}
            className={`px-3.5 py-2 text-xs font-mono-tech font-medium cursor-pointer flat-surface-tertiary ${
              selectedApproach === 'incremental'
                ? 'state-active-border state-active-bg state-text-active'
                : 'text-palette-body'
            }`}
          >
            Approche Incrémentale (Recommandée)
          </button>
          <button
            type="button"
            onClick={() => setSelectedApproach('waterfall')}
            className={`px-3.5 py-2 text-xs font-mono-tech font-medium cursor-pointer flat-surface-tertiary ${
              selectedApproach === 'waterfall'
                ? 'border-[#A62626] bg-[#FDF2F2] state-text-danger'
                : 'text-palette-body'
            }`}
          >
            Prompt Monolithique (« Fais tout d’un coup »)
          </button>
        </div>
      </div>

      {selectedApproach === 'incremental' ? (
        <div className="space-y-6">
          {/* Sélecteur d'incréments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {increments.map((inc) => {
              const active = inc.num === activeIncrement;
              return (
                <button
                  key={inc.num}
                  type="button"
                  onClick={() => setActiveIncrement(inc.num)}
                  className={`p-4 text-left cursor-pointer flat-surface-tertiary transition-colors ${
                    active ? 'state-active-border state-active-bg' : 'hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="text-xs font-mono-tech font-semibold state-text-active mb-1">
                    ÉTAPE 0{inc.num} / 03
                  </div>
                  <div className="text-sm font-semibold text-palette-main">{inc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Les 4 activités de Sommerville pour l'incrément sélectionné */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
              <div className="text-xs font-mono-tech font-semibold text-[#1E56A0] mb-1">
                1. SPÉCIFICATION
              </div>
              <p className="text-sm text-palette-body">{currentInc.spec}</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
              <div className="text-xs font-mono-tech font-semibold text-[#1B6B4A] mb-1">
                2. ARCHITECTURE & CODE
              </div>
              <p className="text-sm text-palette-body">{currentInc.design}</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
              <div className="text-xs font-mono-tech font-semibold text-[#B85D19] mb-1">
                3. VALIDATION & TESTS
              </div>
              <p className="text-sm text-palette-body">{currentInc.validation}</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] border border-[#D5D0C3]">
              <div className="text-xs font-mono-tech font-semibold text-palette-main mb-1">
                4. ÉVOLUTION PROPRE
              </div>
              <p className="text-sm text-palette-body">{currentInc.evolution}</p>
            </div>
          </div>

          <div className="p-4 bg-[#EAF5F0] border border-[#1B6B4A] text-sm text-palette-main">
            <span className="font-mono-tech font-semibold state-text-success uppercase mr-2">
              ● Diagnostic Mentor :
            </span>
            {currentInc.mentorNote}
          </div>
        </div>
      ) : (
        <div className="p-5 bg-[#FDF2F2] border border-[#A62626] space-y-4">
          <div className="text-xs font-mono-tech font-semibold state-text-danger uppercase">
            ▲ Risque Élevé — Ce qui se passe quand on demande 15 fonctionnalités en un seul bloc sans découpage :
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3.5 bg-white border border-[#D5D0C3]">
              <div className="font-semibold text-palette-main mb-1">1. Couplage Spaghetti</div>
              <p className="text-palette-body">
                L’IA écrit tout dans un seul fichier géant. Le calcul du prix est mélangé avec la couleur des boutons.
              </p>
            </div>
            <div className="p-3.5 bg-white border border-[#D5D0C3]">
              <div className="font-semibold text-palette-main mb-1">2. Bugs en Domino</div>
              <p className="text-palette-body">
                Quand tu demandes une petite modification à l’étape suivante, l’IA réécrit tout le fichier et casse deux fonctions qui marchaient.
              </p>
            </div>
            <div className="p-3.5 bg-white border border-[#D5D0C3]">
              <div className="font-semibold text-palette-main mb-1">3. Diagnostic Impossible</div>
              <p className="text-palette-body">
                Sans séparation entre Données, Logique Métier et Affichage, tu ne sais plus où chercher l’origine d’une erreur.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SwissCheeseSecuritySimulator: React.FC = () => {
  const [layers, setLayers] = useState({
    uiValidation: true,
    apiMiddleware: true,
    businessRuleCheck: true,
    databaseRules: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeBarriersCount = Object.values(layers).filter(Boolean).length;
  const isSystemCompromised = !layers.apiMiddleware && !layers.databaseRules;

  return (
    <div className="flat-surface-tertiary p-6 my-8">
      <div className="pb-4 mb-6 border-b border-[#D5D0C3] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono-tech uppercase text-palette-muted">
            Simulateur de Sûreté — Modèle du Fromage Suisse de James Reason (Sommerville Chap. 10 & 13)
          </div>
          <h3 className="text-xl font-serif-editorial font-semibold text-palette-main">
            Défense en Profondeur : Activez ou Désactivez les Barrières de Sécurité
          </h3>
        </div>
        <button
          type="button"
          onClick={() =>
            setLayers({
              uiValidation: true,
              apiMiddleware: true,
              businessRuleCheck: true,
              databaseRules: true,
            })
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech flat-surface-tertiary-alt cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Réactiver les 4 barrières
        </button>
      </div>

      <p className="text-sm text-palette-body mb-6">
        Imagine qu’un utilisateur malveillant (ou un bug) tente d’envoyer une commande avec un montant négatif (<code>-500 €</code>) ou d’accéder au dossier d’un autre client. Cliquez sur les barrières ci-dessous pour observer comment une architecture résiliente stoppe la menace.
      </p>

      {/* Contrôles des 4 barrières */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          {
            key: 'uiValidation' as const,
            title: 'Barrière 1 : Formulaire UI',
            sub: 'Vérifie la saisie dans le navigateur (facile à contourner par un pirate)',
            file: 'src/components/Form.tsx',
          },
          {
            key: 'apiMiddleware' as const,
            title: 'Barrière 2 : Middleware Serveur',
            sub: 'Vérifie l’identité et bloque les requêtes falsifiées à l’entrée de l’API',
            file: 'server.ts',
          },
          {
            key: 'businessRuleCheck' as const,
            title: 'Barrière 3 : Règle Métier Pure',
            sub: 'Refuse mathématiquement tout montant négatif ou incohérent',
            file: 'src/utils/orderEngine.ts',
          },
          {
            key: 'databaseRules' as const,
            title: 'Barrière 4 : Règles Base de Données',
            sub: 'Dernier rempart strict avant écriture sur le disque',
            file: 'firestore.rules / schema.ts',
          },
        ].map((item) => {
          const enabled = layers[item.key];
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => toggleLayer(item.key)}
              className={`p-4 text-left cursor-pointer flat-surface-tertiary transition-colors ${
                enabled ? 'border-[#1B6B4A] bg-[#EAF5F0]/50' : 'border-[#A62626] bg-[#FDF2F2]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono-tech font-semibold text-palette-main">
                  {item.title}
                </span>
                {enabled ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono-tech state-text-success font-semibold">
                    <Check className="w-3.5 h-3.5" /> ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono-tech state-text-danger font-semibold">
                    <X className="w-3.5 h-3.5" /> DÉSACTIVÉE
                  </span>
                )}
              </div>
              <p className="text-xs text-palette-body mb-2">{item.sub}</p>
              <code className="text-[11px] font-mono-tech text-palette-muted">{item.file}</code>
            </button>
          );
        })}
      </div>

      {/* Schéma SVG de la trajectoire de la menace à travers les tranches */}
      <div className="bg-[#FAF8F5] border border-[#D5D0C3] p-4">
        <svg viewBox="0 0 680 155" className="w-full h-auto" role="img" aria-label="Schéma du modèle du fromage suisse">
          {/* Source de la requête */}
          <rect x="12" y="52" width="95" height="50" fill="#FFFFFF" stroke="#16181D" strokeWidth="1.5" />
          <text x="60" y="74" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#16181D">
            REQUÊTE
          </text>
          <text x="60" y="90" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="#A62626">
            montant: -500€
          </text>

          {/* Les 4 Tranches de Défense */}
          {[
            { key: 'uiValidation' as const, x: 165, label: '1. UI Client' },
            { key: 'apiMiddleware' as const, x: 275, label: '2. Serveur API' },
            { key: 'businessRuleCheck' as const, x: 385, label: '3. Règle Métier' },
            { key: 'databaseRules' as const, x: 495, label: '4. Base SQL/Rules' },
          ].map((slice) => {
            const active = layers[slice.key];
            return (
              <g key={slice.key}>
                <rect
                  x={slice.x}
                  y="20"
                  width="54"
                  height="112"
                  fill={active ? '#EAF5F0' : '#FDF2F2'}
                  stroke={active ? '#1B6B4A' : '#A62626'}
                  strokeWidth="1.8"
                  strokeDasharray={active ? 'none' : '4 3'}
                />
                {/* Trous du fromage suisse */}
                <circle cx={slice.x + 27} cy="45" r="7" fill="#FAF8F5" stroke="#D5D0C3" />
                {!active && (
                  <circle cx={slice.x + 27} cy="77" r="11" fill="#FDF2F2" stroke="#A62626" strokeDasharray="2 2" />
                )}
                <circle cx={slice.x + 27} cy="108" r="6" fill="#FAF8F5" stroke="#D5D0C3" />
                <text
                  x={slice.x + 27}
                  y="146"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontFamily="IBM Plex Mono, monospace"
                  fill="#16181D"
                  fontWeight="600"
                >
                  {slice.label}
                </text>
              </g>
            );
          })}

          {/* Cible Base de Données */}
          <rect
            x="580"
            y="45"
            width="88"
            height="64"
            fill={isSystemCompromised ? '#FDF2F2' : '#EAF5F0'}
            stroke={isSystemCompromised ? '#A62626' : '#1B6B4A'}
            strokeWidth="2"
          />
          <text
            x="624"
            y="73"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fontFamily="IBM Plex Mono, monospace"
            fill={isSystemCompromised ? '#A62626' : '#1B6B4A'}
          >
            DONNÉES
          </text>
          <text
            x="624"
            y="91"
            textAnchor="middle"
            fontSize="9"
            fontFamily="IBM Plex Mono, monospace"
            fill="#16181D"
          >
            {isSystemCompromised ? 'CORROMPUES !' : 'PROTÉGÉES'}
          </text>

          {/* Flèche de trajectoire */}
          <line
            x1="107"
            y1="77"
            x2={
              layers.uiValidation
                ? 165
                : layers.apiMiddleware
                ? 275
                : layers.businessRuleCheck
                ? 385
                : layers.databaseRules
                ? 495
                : 580
            }
            y2="77"
            stroke="#A62626"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Verdict d'état Quaternaire */}
      <div
        className={`mt-4 p-4 border transition-colors duration-300 ${
          isSystemCompromised
            ? 'bg-[#FDF2F2] border-[#A62626]'
            : activeBarriersCount === 4
            ? 'bg-[#EAF5F0] border-[#1B6B4A]'
            : 'bg-[#FDF3EB] border-[#B85D19]'
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-mono-tech font-semibold uppercase mb-1">
          {isSystemCompromised ? (
            <span className="state-text-danger flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              ▲ Système Compromis ({activeBarriersCount}/4 barrières actives)
            </span>
          ) : (
            <span className="state-text-success flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              ● Système Résilient ({activeBarriersCount}/4 barrières actives)
            </span>
          )}
        </div>
        <p className="text-sm text-palette-main">
          {isSystemCompromised
            ? "Attention ! Sans validation côté serveur ni règles de base de données, n'importe qui contournant l'écran React peut corrompre vos données."
            : activeBarriersCount === 4
            ? "Défense en profondeur optimale : même si l'interface contient un bug d'affichage, le serveur, le moteur métier et la base de données bloquent l'anomalie."
            : "Le système tient encore grâce aux couches arrière, mais une barrière est ouverte. Un bon architecte maintient la cohérence sur toute la chaîne."}
        </p>
      </div>
    </div>
  );
};
