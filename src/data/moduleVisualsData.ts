import type { SubSectionVisualItem } from '../components/SubSectionVisualStack';

/**
 * Enrichissement visuel méthodique de chaque sous-module des Modules 01–04 et 06–09 :
 * chaque entrée associe schémas Mermaid adaptatifs (vertical sur mobile, horizontal
 * avec défilement interne sur PC), blocs de code typés et arborescences lisibles.
 * (Le Module 05 dispose de ses propres enrichissements intégrés dans ArchitectureReadingLab.)
 */
export const SUBSECTION_VISUALS: Record<string, SubSectionVisualItem[]> = {
  // =========================================================================
  // MODULE 01 : Esprit Ingénieur & Exigences
  // =========================================================================
  'sec-1-1': [
    {
      kind: 'mermaid',
      title: 'Les 4 activités universelles de Sommerville',
      caption:
        'Un logiciel professionnel suit une boucle disciplinée : Spécifier → Concevoir → Valider → Évoluer, jamais un seul bloc jetable.',
      definition: `flowchart LR
  SPEC["1. Spécifier<br/>Besoin & Règles<br/>(context.md)"] --> DESIGN["2. Concevoir<br/>Couches & Dossiers<br/>(plan.md / agents.md)"]
  DESIGN --> BUILD["3. Implémenter<br/>Incrément isolé<br/>(UI + Métier + Data)"]
  BUILD --> VALID["4. Valider<br/>Tests & Aperçu réel<br/>(npm test / navigateur)"]
  VALID --> EVOLVE["5. Évoluer<br/>Refactoring propre<br/>sans casser l'existant"]
  EVOLVE -.->|"Nouveau besoin"| SPEC`,
    },
    {
      kind: 'code',
      language: 'ts',
      title: 'Anti-modèle « Tout-en-Un » vs Découpage d’ingénieur',
      filename: 'comparaison-decoupage.ts',
      caption:
        'À éviter : mélanger calcul de TVA, requête réseau et affichage dans une même fonction. À exiger : séparer calcul pur et appel réseau.',
      code: `// ❌ SCRIPT JETABLE : tout est mélangé dans le même bloc
async function handleClickFacture(montantHT: number) {
  const ttc = montantHT * 1.2; // règle figée dans le bouton
  await fetch("/api/factures", { method: "POST", body: JSON.stringify({ ttc }) });
  document.title = "Facture envoyée : " + ttc + " €";
}

// ✅ LOGICIEL INGÉNIERÉ : chaque responsabilité est isolée
// 1. Couche Métier (src/utils/factureRules.ts)
export function calculerMontantTTC(montantHT: number, tauxTva = 0.2): number {
  return Number((montantHT * (1 + tauxTva)).toFixed(2));
}

// 2. Couche Accès Données (src/services/factureService.ts)
export async function enregistrerFacture(montantTTC: number): Promise<void> {
  await fetch("/api/factures", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ montantTTC }),
  });
}`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Arborescence minimale d’un projet ingénieré',
      caption:
        'Dès le jour 1, la racine porte les 3 fichiers directeurs et /src sépare UI, règles métier et accès données.',
      code: `facturation-app/
├── context.md                 # Mémoire métier & décisions
├── plan.md                    # Incréments validés étape par étape
├── agents.md                  # Règles d'architecture pour l'IA
└── src/
    ├── components/            # Couche Présentation (UI uniquement)
    │   └── FactureForm.tsx
    ├── utils/                 # Couche Métier (calculs purs)
    │   ├── factureRules.ts
    │   └── factureRules.test.ts
    └── services/              # Couche Accès Données (API / DB)
        └── factureService.ts`,
    },
  ],

  'sec-1-2': [
    {
      kind: 'mermaid',
      title: 'Impact des Exigences Non-Fonctionnelles sur l’Architecture',
      caption:
        'Les exigences fonctionnelles décrivent les écrans ; une seule exigence non-fonctionnelle dicte souvent toute la structure technique.',
      definition: `flowchart LR
  NEED["Besoin Humain<br/>Consulter un dossier patient"] --> FUNC["Exigence Fonctionnelle<br/>Rechercher par nom + afficher fiche"]
  NEED --> NONFUNC["Exigences Non-Fonctionnelles<br/>Confidentialité + Mode Hors-Ligne"]
  FUNC --> UI["Écran UI<br/>Barre de recherche & Fiche"]
  NONFUNC --> SEC["Sécurité Serveur<br/>Auth + Journal d'audit"]
  NONFUNC --> CACHE["Stockage Local<br/>Sync hors-ligne sécurisée"]`,
    },
    {
      kind: 'code',
      language: 'md',
      title: 'Spécification claire prête à donner à l’IA',
      filename: 'context.md (extrait exigences)',
      caption:
        'Toujours séparer les deux familles par écrit avant de générer la première interface.',
      code: `## Exigences Fonctionnelles (Ce que fait le logiciel)
- Praticien : rechercher un patient par nom ou identifiant.
- Praticien : créer un compte-rendu daté et l'exporter en PDF.
- Secrétariat : planifier et déplacer un créneau de rendez-vous.

## Exigences Non-Fonctionnelles (Contraintes architecturales)
- Sécurité : aucune clé secrète côté navigateur ; contrôle des rôles côté serveur.
- Résilience : saisie consultable et sauvegardée localement en cas de coupure réseau.
- Traçabilité : chaque accès à un dossier est journalisé avec horodatage.
- Maintenabilité : 100 % des règles de priorité isolées dans src/utils/.`,
    },
  ],

  'sec-1-3': [
    {
      kind: 'mermaid',
      title: 'Anatomie d’une Fonction Pure de Règle Métier',
      caption:
        'Mêmes entrées → même sortie garantie, zéro dépendance à React ou au réseau : testable en 1 milliseconde.',
      definition: `flowchart LR
  IN["Entrées typées<br/>anciennete: 4 ans<br/>panier: 250 €<br/>enPromo: false"] --> RULE["Règle Métier Pure<br/>calculerRemiseFidelite()"]
  RULE --> OUT["Décision déterministe<br/>taux: 12 %<br/>remise: 30 €<br/>netAPayer: 220 €"]
  TEST["Test Unitaire (.test.ts)<br/>Vérifie 100 % des cas limites"] -.->|"Valide sans UI"| RULE`,
    },
    {
      kind: 'code',
      language: 'ts',
      title: 'Règle métier pure + son test unitaire automatisé',
      filename: 'src/utils/remiseRules.ts',
      caption:
        'Si la politique commerciale ou la TVA change demain, on modifie uniquement ce fichier : tout le site suit sans bug visuel.',
      code: `export interface PanierClient {
  ancienneteAnnees: number;
  montantHT: number;
  dejaEnPromo: boolean;
}

export function calculerRemiseFidelite(panier: PanierClient): number {
  if (panier.dejaEnPromo) return 0;
  if (panier.ancienneteAnnees >= 3 && panier.montantHT > 200) {
    return Number((panier.montantHT * 0.12).toFixed(2));
  }
  return 0;
}

// Vérification dans src/utils/remiseRules.test.ts :
// assert.equal(calculerRemiseFidelite({ ancienneteAnnees: 4, montantHT: 250, dejaEnPromo: false }), 30);
// assert.equal(calculerRemiseFidelite({ ancienneteAnnees: 4, montantHT: 250, dejaEnPromo: true }), 0);`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Isolation des règles métier et de leurs tests',
      code: `src/
└── utils/
    ├── remiseRules.ts         # Règle pure (aucun import React/DB)
    ├── remiseRules.test.ts    # Preuve mathématique automatisée
    └── taxRules.ts            # Barèmes TVA centralisés`,
    },
  ],

  // =========================================================================
  // MODULE 02 : Processus, Incréments & Agile
  // =========================================================================
  'sec-2-1': [
    {
      kind: 'mermaid',
      title: 'Modèle en Cascade (risqué) vs Livraison par Incréments (maîtrisée)',
      caption:
        'Chaque incrément livre une tranche complète, testable et fonctionnelle avant d’ouvrir le chantier suivant.',
      definition: `flowchart LR
  subgraph INC["Approche Incrémentale (Recommandée avec l'IA)"]
    I1["Incrément 1<br/>Types + Règles pures<br/>+ Tests OK"] --> I2["Incrément 2<br/>Écran principal<br/>+ Vérification UI"]
    I2 --> I3["Incrément 3<br/>Persistance DB<br/>+ API sécurisée"]
    I3 --> I4["Incrément 4<br/>Cas limites<br/>+ Finitions"]
  end`,
    },
    {
      kind: 'code',
      language: 'md',
      title: 'Feuille de route incrémentale dans plan.md',
      filename: 'plan.md',
      caption:
        'Un plan lisible en 4 étapes empêche l’IA de mélanger tout le projet dans un seul prompt surchargé.',
      code: `# Plan Incrémental — Application de Réservation

- [x] Incrément 1 : Modèle de données (src/types.ts) + calcul de tarif pur (src/utils/pricing.ts + test)
- [x] Incrément 2 : Formulaire de choix de créneau connecté au calcul (src/components/BookingForm.tsx)
- [ ] Incrément 3 : Sauvegarde persistante via route serveur (/api/bookings) + états erreur/chargement
- [ ] Incrément 4 : Espace administration + vérification mobile et desktop`,
    },
  ],

  'sec-2-2': [
    {
      kind: 'mermaid',
      title: 'Boucle Agile courte : Build → Verify → Critique → Fix',
      caption:
        'À chaque itération, l’architecte vérifie les tests et le rendu réel avant de valider l’étape dans context.md.',
      definition: `flowchart LR
  STORY["User Story<br/>Qui + Quoi + Pourquoi"] --> BUILD["Build<br/>Génération ciblée"]
  BUILD --> VERIFY["Verify<br/>Tests + Build + Aperçu"]
  VERIFY --> CRITIQUE["Critique Architecte<br/>Ergonomie & Frontières"]
  CRITIQUE -->|"Défaut repéré"| FIX["Fix ciblé"]
  FIX --> VERIFY
  CRITIQUE -->|"Validé"| LOG["Mise à jour<br/>context.md & plan.md"]`,
    },
    {
      kind: 'code',
      language: 'text',
      title: 'Format d’une User Story actionnable pour l’IA',
      caption:
        'Cette formulation précise simultanément le rôle, l’action et la contrainte non-fonctionnelle de sécurité/résilience.',
      code: `RÔLE : En tant que praticien en visite à domicile,
ACTION : je veux saisir mes notes de consultation même sans connexion Internet,
BÉNÉFICE : afin qu'aucune observation médicale ne soit perdue en zone blanche.

CRITÈRES D'ACCEPTATION :
1) La note est enregistrée localement immédiatement (état "En attente de synchro").
2) Dès le retour du réseau, le service synchronise sans doublon vers le serveur.
3) En cas d'échec réseau, un message clair rassure l'utilisateur sans effacer sa saisie.`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Croissance progressive de l’arborescence par incrément',
      code: `Incrément 1 : src/types.ts + src/utils/pricing.ts + pricing.test.ts
Incrément 2 : + src/components/BookingForm.tsx
Incrément 3 : + server.ts + src/services/bookingApi.ts
Incrément 4 : + src/components/AdminSchedule.tsx`,
    },
  ],

  // =========================================================================
  // MODULE 03 : Architecture en Couches & Rôles
  // =========================================================================
  'sec-3-1': [
    {
      kind: 'mermaid',
      title: 'Sens strict des appels dans l’Architecture en 4 Couches',
      caption:
        'Chaque étage ne parle qu’à son voisin immédiat : la Présentation ne saute jamais directement dans la Base de Données.',
      definition: `flowchart LR
  L1["1. Présentation (UI)<br/>src/components/<br/>Affiche & capte les clics"] -->|"Envoie saisie"| L2["2. Logique Métier<br/>src/utils/ ou domain/<br/>Valide & calcule"]
  L2 -->|"Ordre validé"| L3["3. Accès Données<br/>src/services/ & server.ts<br/>Traduit & sécurise"]
  L3 -->|"Requête"| L4[("4. Base de Données<br/>SQL / Firestore<br/>Stockage durable")]
  L4 -.->|"Résultat"| L3
  L3 -.->|"Données propres"| L1`,
    },
    {
      kind: 'code',
      language: 'tsx',
      title: 'Passage de témoin concret entre les 3 couches de code',
      filename: 'src/components/CheckoutPanel.tsx → domain → services',
      caption:
        'Observe la propreté : le composant React ne contient aucune formule métier ni aucune requête SQL.',
      code: `// ÉTAGE 1 — PRÉSENTATION (src/components/CheckoutPanel.tsx)
export function CheckoutPanel({ articles }: { articles: Article[] }) {
  const total = calculerTotalCommande(articles, 0.1); // délègue à l'Étage 2

  const onConfirm = async () => {
    await sauvegarderCommande({ articles, total });   // délègue à l'Étage 3
  };

  return <button onClick={onConfirm}>Confirmer ({total} €)</button>;
}

// ÉTAGE 2 — LOGIQUE MÉTIER (src/utils/orderRules.ts)
export function calculerTotalCommande(articles: Article[], remise: number): number {
  const brut = articles.reduce((somme, a) => somme + a.prix, 0);
  return Number((brut * (1 - remise)).toFixed(2));
}

// ÉTAGE 3 — ACCÈS DONNÉES (src/services/orderApi.ts)
export async function sauvegarderCommande(payload: CommandeDTO) {
  const res = await fetch("/api/orders", { method: "POST", body: JSON.stringify(payload) });
  if (!res.ok) throw new Error("Échec de l'enregistrement serveur");
  return res.json();
}`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Correspondance directe entre les 4 couches et les dossiers',
      code: `projet-en-couches/
├── server.ts                  # Étage 3 : Passerelle API sécurisée
└── src/
    ├── components/            # Étage 1 : Présentation (UI)
    │   └── CheckoutPanel.tsx
    ├── utils/                 # Étage 2 : Logique Métier (règles pures)
    │   └── orderRules.ts
    ├── services/              # Étage 3 : Clients d'accès aux données
    │   └── orderApi.ts
    └── db/                    # Étage 4 : Schéma de persistance
        └── schema.ts`,
    },
  ],

  // =========================================================================
  // MODULE 04 : Monolithe Modulaire & Patrons
  // =========================================================================
  'sec-4-1': [
    {
      kind: 'mermaid',
      title: 'Monolithe Modulaire : un seul déploiement, des domaines étanches',
      caption:
        'Une porte d’entrée unique aiguille vers des modules autonomes qui ne communiquent entre eux que par leur façade publique index.ts.',
      definition: `flowchart LR
  ENTRY["App / Passerelle API<br/>(Un seul déploiement)"] --> M1["Module Commandes<br/>index.ts (Façade)"]
  ENTRY --> M2["Module Facturation<br/>index.ts (Façade)"]
  ENTRY --> M3["Module Clients<br/>index.ts (Façade)"]
  M1 -.->|"Appel contrat public"| M2
  M1 -.->|"Vérifie profil"| M3`,
    },
    {
      kind: 'code',
      language: 'ts',
      title: 'Contrat public d’un module (Façade index.ts)',
      filename: 'src/modules/billing/index.ts',
      caption:
        'Les autres modules importent uniquement ce qui est exporté ici : jamais les fichiers internes data/ ou domain/.',
      code: `// ✅ PORTE D'ENTRÉE PUBLIQUE DU MODULE FACTURATION
// src/modules/billing/index.ts
export { genererFacture } from "./domain/invoiceRules";
export type { FactureDTO, StatutFacture } from "./domain/invoiceTypes";

// ❌ INTERDIT depuis un autre module (ex: modules/orders/) :
// import { dbInsertInvoice } from "../billing/data/invoiceRepo";

// ✅ AUTORISÉ depuis modules/orders/ :
// import { genererFacture } from "../billing";`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Signature d’arborescence d’un Monolithe Modulaire',
      code: `src/
├── modules/
│   ├── orders/                # Domaine 1 : Commandes
│   │   ├── ui/OrderPage.tsx
│   │   ├── domain/orderRules.ts
│   │   ├── data/orderRepo.ts
│   │   └── index.ts           # Seule porte ouverte vers l'extérieur
│   └── billing/               # Domaine 2 : Facturation
│       ├── domain/invoiceRules.ts
│       ├── data/invoiceRepo.ts
│       └── index.ts           # Seule porte ouverte vers l'extérieur
└── shared/                    # Outils neutres (dates, boutons UI)`,
    },
  ],

  // =========================================================================
  // MODULE 06 (id: mod-5-arborescence) : Lire une Arborescence
  // =========================================================================
  'sec-5-1': [
    {
      kind: 'mermaid',
      title: 'Chaîne de démarrage lue depuis la racine du projet',
      caption:
        'En 10 secondes, la racine révèle l’architecture : package.json liste la stack, server.ts prouve la présence d’un backend, et /src contient l’application.',
      definition: `flowchart LR
  PKG["package.json<br/>Dépendances & Scripts"] --> CFG["vite.config.ts<br/>& tsconfig.json"]
  PKG --> ENV[".env.example<br/>Noms des clés API"]
  CFG --> SRV["server.ts<br/>Serveur Express /api/*"]
  ENV -.->|"Secrets côté serveur"| SRV
  SRV --> SRC["src/main.tsx → App.tsx<br/>Couches UI / Métier / Data"]`,
    },
    {
      kind: 'code',
      language: 'json',
      title: 'Lire la stack instantanément dans package.json',
      filename: 'package.json',
      caption:
        'Repère 2 clés : "scripts" (comment lancer et compiler) et "dependencies" (quelles briques techniques sont installées).',
      code: `{
  "name": "atelier-architecte",
  "scripts": {
    "dev": "tsx server.ts",       // Démarre serveur + aperçu
    "build": "vite build",        // Compile pour la production
    "lint": "tsc --noEmit"        // Vérifie les types TypeScript
  },
  "dependencies": {
    "react": "^19.0.1",           // Couche Présentation (UI)
    "express": "^4.21.2",         // Présence d'un Backend API
    "@google/genai": "^2.4.0"     // Intégration Gemini côté serveur
  }
}`,
    },
    {
      kind: 'code',
      language: 'ts',
      title: 'Pourquoi server.ts protège tes clés secrètes (.env.example)',
      filename: 'server.ts (extrait proxy sécurisé)',
      caption:
        'Le navigateur appelle /api/analyze : la vraie clé API ne quitte jamais le serveur.',
      code: `// .env.example (suivi dans Git, sans jamais écrire la vraie clé) :
// GEMINI_API_KEY="votre-cle-serveur-ici"

// server.ts (exécuté uniquement côté serveur sécurisé)
app.post("/api/analyze", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY; // Lue côté serveur uniquement
  if (!apiKey) return res.status(500).json({ error: "Clé serveur manquante" });

  const resultat = await appelerServiceExterne(req.body, apiKey);
  return res.json({ resultat });
});`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Les 3 signatures visuelles à reconnaître en un coup d’œil',
      code: `1) Monolithe plat (à éviter si ça grossit) :
   src/App.tsx  (tout dans 1 seul fichier)

2) Architecture en Couches (propre & lisible) :
   src/components/  +  src/utils/  +  src/services/  +  src/data/

3) Monolithe Modulaire (projets riches multi-domaines) :
   src/modules/facturation/  +  src/modules/patients/  +  src/shared/`,
    },
  ],

  // =========================================================================
  // MODULE 07 (id: mod-6-donnees-hebergement) : Données & Hébergeurs Cloud
  // =========================================================================
  'sec-6-1': [
    {
      kind: 'mermaid',
      title: 'Aiguillage des données vers le bon moteur de stockage',
      caption:
        'Un logiciel mature combine souvent une base structurée (SQL ou Firestore) pour les fiches et un Stockage Objet (Blob) pour les fichiers lourds.',
      definition: `flowchart LR
  APP["Application / API"] -->|"Argent, relations strictes"| SQL[("Base SQL<br/>PostgreSQL / Cloud SQL")]
  APP -->|"Temps réel, fiches souples"| NOSQL[("NoSQL Document<br/>Firebase Firestore")]
  APP -->|"PDF, Images, Vidéos"| BLOB[("Stockage Objet<br/>Cloud Storage / S3")]
  APP -->|"Réponse instantanée"| CACHE[("Cache Mémoire<br/>Redis / LocalStorage")]
  BLOB -.->|"Stocke uniquement l'URL"| SQL`,
    },
    {
      kind: 'code',
      language: 'sql',
      title: 'Modèle Relationnel SQL : tables strictes reliées par clés',
      filename: 'schema.sql',
      caption:
        'Idéal pour les commandes, paiements et stocks : la base interdit mathématiquement une facture orpheline ou un montant négatif.',
      code: `CREATE TABLE clients (
  id UUID PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE factures (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  montant_ttc NUMERIC(10, 2) NOT NULL CHECK (montant_ttc >= 0),
  pdf_url TEXT, -- Lien vers le fichier rangé en Stockage Objet (Blob)
  statut TEXT NOT NULL DEFAULT 'EMISE'
);`,
    },
    {
      kind: 'code',
      language: 'json',
      title: 'Modèle NoSQL Document (Firestore) : fiche JSON souple + URL Blob',
      filename: 'collections/dossiers/dos_42.json',
      caption:
        'Parfait pour le temps réel collaboratif : l’image lourde vit dans le Bucket Blob, seule son adresse URL figure dans la fiche.',
      code: `{
  "id": "dos_42",
  "ownerUid": "user_981",
  "titre": "Suivi patient — Cabinet Nord",
  "statut": "EN_COURS",
  "pieceJointeUrl": "https://storage.example/buckets/scans/dos_42.pdf",
  "updatedAt": "2026-11-19T09:15:00Z"
}`,
    },
  ],

  'sec-6-2': [
    {
      kind: 'mermaid',
      title: 'Architecture Serveur « Stateless » sur Conteneur Cloud Run',
      caption:
        'Un conteneur Serverless démarre à la demande et peut s’éteindre à tout moment : aucune donnée durable ne doit rester sur son disque local.',
      definition: `flowchart LR
  USER["Navigateur Utilisateur"] --> CDN["CDN / HTTPS"]
  CDN --> RUN["Conteneur Cloud Run<br/>(Stateless : 0 → N instances)"]
  RUN -->|"Écriture durable"| DB[("Cloud SQL / Firestore<br/>État persistant externe")]
  RUN -->|"Fichiers"| BUCKET[("Stockage Objet<br/>Persistance fichiers")]`,
    },
    {
      kind: 'code',
      language: 'ts',
      title: 'Piège de la mémoire locale vs Serveur Stateless propre',
      filename: 'server.ts (gestion de l’état)',
      caption:
        'Toujours envoyer les créations vers une base externe pour ne rien perdre lors d’un redémarrage automatique du conteneur.',
      code: `// ❌ DANGER SUR CLOUD RUN : perdu dès que le conteneur passe en veille !
const commandesEnMemoire: Commande[] = [];

app.post("/api/orders-bad", (req, res) => {
  commandesEnMemoire.push(req.body);
  res.json({ ok: true });
});

// ✅ SERVEUR STATELESS : persistance fiable en base externe
app.post("/api/orders", async (req, res) => {
  const saved = await orderRepository.insert(req.body); // Cloud SQL ou Firestore
  res.status(201).json(saved);
});`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Où se voient les choix de données et d’hébergement dans le projet',
      code: `projet-cloud/
├── Dockerfile                 # Recette d'emballage pour Cloud Run
├── server.ts                  # Serveur stateless (port 3000 / 8080)
├── firestore.rules            # Règles de sécurité si BaaS Firestore
└── src/
    └── db/
        ├── schema.ts          # Tables relationnelles si Cloud SQL
        └── client.ts          # Connexion sécurisée via variables d'env`,
    },
  ],

  // =========================================================================
  // MODULE 08 (id: mod-7-qualite-maintenance) : Sécurité, Tests & Maintenance
  // =========================================================================
  'sec-7-1': [
    {
      kind: 'mermaid',
      title: 'Défense en Profondeur : les 4 barrières du Modèle du Fromage Suisse',
      caption:
        'Si un défaut ou un attaquant contourne l’écran UI, les 3 barrières suivantes (Serveur, Métier, Base de Données) bloquent l’intrusion.',
      definition: `flowchart LR
  REQ["Action Utilisateur<br/>ou Requête directe"] --> B1["Barrière 1 : UI<br/>Validation formulaire"]
  B1 --> B2["Barrière 2 : Serveur<br/>Middleware Auth & Rôle"]
  B2 --> B3["Barrière 3 : Métier<br/>Règles pures & Tests"]
  B3 --> B4[("Barrière 4 : Base DB<br/>firestore.rules / SQL CHECK")]
  B2 -.->|"Non autorisé"| DENY["403 Accès refusé"]
  B4 -.->|"Règle violée"| DENY`,
    },
    {
      kind: 'code',
      language: 'ts',
      title: 'Barrière 2 : Middleware serveur qui bloque toute requête anonyme',
      filename: 'src/middleware/requireAuth.ts',
      caption:
        'Même si quelqu’un contourne le formulaire de ton interface, le serveur exige un jeton valide avant d’exécuter la suite.',
      code: `export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Authentification requise" });
  }
  req.user = verifySessionToken(token); // Contrôle cryptographique serveur
  return next();
}`,
    },
    {
      kind: 'code',
      language: 'rules',
      title: 'Barrière 4 : Règles de sécurité directement dans la base Firestore',
      filename: 'firestore.rules',
      caption:
        'Dernier verrou infranchissable : un utilisateur ne peut lire ou modifier que ses propres dossiers.',
      code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dossiers/{dossierId} {
      allow read, update, delete: if request.auth != null
        && resource.data.ownerUid == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.ownerUid == request.auth.uid;
    }
  }
}`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Refactoring préventif : découper un fichier devenu trop long',
      caption:
        'Sans changer le comportement visible, le refactoring rend chaque brique courte, testable et facile à relire par l’IA.',
      code: `❌ AVANT (dette technique) :
src/App.tsx                    # 950 lignes : UI + calculs + API + modals

✅ APRÈS (refactoring propre) :
src/
├── App.tsx                    # 120 lignes : assemblage uniquement
├── components/
│   ├── PatientForm.tsx        # Saisie isolée
│   └── PriorityBoard.tsx      # Affichage de la file
├── utils/
│   ├── triageEngine.ts        # Calcul pur isolé
│   └── triageEngine.test.ts   # Vérification automatisée
└── services/
    └── patientApi.ts          # Appels réseau isolés`,
    },
  ],

  // =========================================================================
  // MODULE 09 (id: mod-8-pilotage-ia-projet) : Piloter l’IA & Projet Final
  // =========================================================================
  'sec-8-1': [
    {
      kind: 'mermaid',
      title: 'Le Triangle de Commandement de l’Architecte face à l’IA',
      caption:
        'Les 3 fichiers directeurs à la racine donnent une mémoire durable et des garde-fous techniques à n’importe quel agent IA.',
      definition: `flowchart LR
  ARCH["Toi (Architecte)"] --> CTX["context.md<br/>Mémoire, Vision & Décisions"]
  ARCH --> PLAN["plan.md<br/>Incréments & Validation"]
  ARCH --> AGENTS["agents.md<br/>Couches, Design & Interdits"]
  CTX --> IA["Agent IA<br/>(Exécution chirurgicale)"]
  PLAN --> IA
  AGENTS --> IA
  IA --> CODE["Code Modulaire Testé<br/>+ Mise à jour des 3 fichiers"]`,
    },
    {
      kind: 'code',
      language: 'text',
      title: 'Anatomie d’un prompt d’architecte en 4 blocs',
      caption:
        'Ce gabarit évite 90 % des erreurs d’architecture quand tu pilotes une IA.',
      code: `1) BUT MÉTIER & RÈGLE :
   Calcule le score de priorité patient (0 à 100) selon l'âge, les symptômes critiques et la durée.

2) COUCHE & FICHIERS CIBLES :
   Isole la règle pure dans src/utils/triageEngine.ts et prouve-la dans src/utils/triageEngine.test.ts.
   Affiche le formulaire dans src/components/TriageForm.tsx sans logique de calcul dans le composant.

3) CONTRAINTES VISUELLES & ÉTATS :
   Style plat DM Sans, 4 palettes, bordures 1px sans ombre, gestion explicite des erreurs de saisie.

4) GOUVERNANCE & VÉRIFICATION :
   Exécute les tests unitaires, vérifie le build TypeScript et mets à jour context.md et plan.md.`,
    },
    {
      kind: 'code',
      language: 'tree',
      title: 'Arborescence cible complète du Projet Final « MediFlow Studio »',
      code: `mediflow-studio/
├── context.md                 # Vision, décisions, statut v1 → v2
├── plan.md                    # 4 incréments vérifiables
├── agents.md                  # Architecture en couches & 4 palettes
└── src/
    ├── types.ts               # Contrats : PatientRequest, TriageResult
    ├── data/
    │   └── initialPatients.ts # Cas cliniques réalistes de démonstration
    ├── utils/
    │   ├── triageEngine.ts    # Cerveau de priorité (fonctions pures)
    │   └── triageEngine.test.ts
    ├── services/
    │   └── patientQueueService.ts # CRUD + sauvegarde locale hors-ligne
    ├── components/
    │   ├── TriageForm.tsx     # Saisie guidée sans règle métier interne
    │   └── QueueBoard.tsx     # File priorisée lisible
    └── App.tsx                # Assemblage épuré`,
    },
  ],
};
