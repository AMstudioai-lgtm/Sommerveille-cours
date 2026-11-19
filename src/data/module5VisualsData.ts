import type { CodeLanguage } from '../utils/visualFormatter';
import type { FiveArchKey, XrayPartKey } from './architectureReadingData';

export interface TypedCodeExample {
  language: CodeLanguage;
  title: string;
  filename?: string;
  caption?: string;
  code: string;
}

export interface MermaidVisualSpec {
  title: string;
  caption: string;
  definition: string;
}

export const MODULE5_SCALE_MERMAID: MermaidVisualSpec = {
  title: 'L’échelle d’emboîtement du logiciel (du plus fin au plus autonome)',
  caption:
    'Une fonction vit dans un fichier, un fichier vit dans un module interne, et seul un besoin fort justifie de sortir un service autonome sur le réseau.',
  definition: `flowchart LR
  FN["Niveau 1 : Fonction<br/>1 action précise<br/>calculerTotalCommande()"] --> FILE["Niveau 2 : Fichier<br/>Fonctions de même rôle<br/>orderRules.ts"]
  FILE --> MOD["Niveau 3 : Module<br/>Domaine complet + index.ts<br/>modules/orders/"]
  MOD -->|"Uniquement si charge,<br/>équipe ou isolation"| SVC["Niveau 4 : Service autonome<br/>Serveur + DB + Dockerfile<br/>services/payment-service/"]`,
};

export const MODULE5_XRAY_CODE_EXAMPLES: Record<XrayPartKey, TypedCodeExample> = {
  decl: {
    language: 'js',
    title: 'Deux façons équivalentes de déclarer une fonction',
    filename: 'orderRules.ts',
    caption:
      'L’IA utilise aussi souvent la syntaxe fléchée (=>) que le mot-clé function : pour ton œil d’architecte, c’est exactement la même brique.',
    code: `// Forme 1 : déclaration classique
function calculerTotalCommande(articles, tauxReduction) {
  return additionnerPrix(articles) * (1 - tauxReduction);
}

// Forme 2 : fonction fléchée (strictement équivalente)
const calculerTotalCommande = (articles, tauxReduction) => {
  return additionnerPrix(articles) * (1 - tauxReduction);
};`,
  },
  name: {
    language: 'ts',
    title: 'Nommer par une intention unique vs nom fourre-tout',
    filename: 'orderRules.ts',
    caption:
      'Dès qu’un nom contient « Et » ou un verbe vague comme « traiter », demande à l’IA de découper.',
    code: `// ❌ ALERTE : nom flou ou cumul de 3 métiers différents
function traiterData(x: any) { /* ... */ }
function calculerEtSauvegarderEtNotifier(order: Order) { /* ... */ }

// ✅ PROPRE : verbe d'action précis, 1 seule responsabilité
function calculerTotalCommande(articles: Article[], remise: number): number {
  return additionnerPrix(articles) * (1 - remise);
}`,
  },
  params: {
    language: 'ts',
    title: 'Regrouper les paramètres dans un objet clair au-delà de 4 entrées',
    filename: 'orderRules.ts',
    caption:
      'Un objet nommé évite les inversions d’arguments et rend le contrat lisible sans ouvrir le corps de la fonction.',
    code: `// ❌ FRAGILE : 6 paramètres positionnels faciles à inverser
function calculerLivraison(poids, pays, express, vip, coupon, total) { /* ... */ }

// ✅ ROBUSTE : 1 seul objet d'entrée clairement typé
interface DemandeLivraison {
  poidsKg: number;
  pays: string;
  express: boolean;
  totalCommande: number;
}

function calculerLivraison(demande: DemandeLivraison): number { /* ... */ }`,
  },
  body: {
    language: 'ts',
    title: 'Corps propre (délégation métier) vs mélange de couches interdit',
    filename: 'orderRules.ts',
    caption:
      'Une fonction métier peut appeler d’autres petites fonctions métier, mais jamais mélanger calcul, base de données et affichage.',
    code: `// ✅ CORPS PROPRE : étapes courtes + sous-fonction dédiée
export function calculerTotalCommande(articles: Article[], tauxReduction: number): number {
  const sousTotal = additionnerPrix(articles);
  const remise = sousTotal * tauxReduction;
  return sousTotal - remise;
}

// ❌ MÉLANGE INTERDIT : calcul + SQL + UI au même endroit
async function mauvaisCalcul(articles: Article[]) {
  const total = articles.reduce((s, a) => s + a.prix, 0);
  await db.query("INSERT INTO orders VALUES ($1)", [total]); // Couche Data !
  alert("Commande validée");                                 // Couche UI !
}`,
  },
  return: {
    language: 'ts',
    title: 'Verrouiller la signature (entrées et sortie) lors d’un refactoring',
    filename: 'orderRules.ts',
    caption:
      'Tant que la signature reste identique, l’IA peut optimiser l’intérieur sans casser les fichiers qui appellent la fonction.',
    code: `// Contrat stable (Signature : entrées -> type de sortie)
export function calculerTotalCommande(
  articles: Article[],
  tauxReduction: number
): number {
  const sousTotal = additionnerPrix(articles);
  const remise = sousTotal * tauxReduction;
  return Number((sousTotal - remise).toFixed(2)); // Sortie prévisible
}`,
  },
};

export const MODULE5_THREE_FORMS_CODE: TypedCodeExample = {
  language: 'ts',
  title: 'Les 3 écritures équivalentes d’une fonction en TypeScript / JavaScript',
  filename: 'exemples-syntaxes.ts',
  caption:
    'Repère toujours le verbe d’action suivi de parenthèses (...) : quelle que soit la forme choisie par l’IA, le rôle architectural est identique.',
  code: `// 1. Déclaration classique
function calculerPrix(montant: number, tva: number): number {
  return montant * (1 + tva);
}

// 2. Fonction fléchée (très fréquente en React / TypeScript moderne)
const calculerPrix = (montant: number, tva: number): number => {
  return montant * (1 + tva);
};

// 3. Méthode à l'intérieur d'une classe
class OrderService {
  calculerPrix(montant: number, tva: number): number {
    return montant * (1 + tva);
  }
}`,
};

export const MODULE5_EXTRACTION_MERMAID: MermaidVisualSpec = {
  title: 'Arbre de décision : quand extraire une fonction dans son propre bloc ?',
  caption:
    'Un seul critère fort suffit pour extraire ; une micro-logique de 3 lignes utilisée une seule fois reste en place.',
  definition: `flowchart LR
  OBS["Bloc de code observé"] --> Q1{"Réutilisé 2+ fois<br/>ou règle métier critique ?"}
  Q1 -->|"Oui"| EXT["Extraire en fonction dédiée<br/>dans la couche Métier"]
  Q1 -->|"Non"| Q2{"Mélange 2 métiers<br/>ou > 35 lignes ?"}
  Q2 -->|"Oui"| EXT
  Q2 -->|"Non"| KEEP["Laisser en place<br/>(éviter le sur-découpage)"]
  EXT --> LOCK["Verrouiller la signature<br/>(entrées / sortie stables)"]`,
};

export const MODULE5_EXTRACTION_CODE: TypedCodeExample = {
  language: 'ts',
  title: 'Avant / Après : extraire une règle métier hors d’un écran UI',
  filename: 'CheckoutPage.tsx → domain/orderRules.ts',
  caption:
    'L’interface redevient courte et lisible ; la formule de remise devient réutilisable sur la facture et testable unitairement.',
  code: `// ❌ AVANT : règle de remise enfouie dans le composant visuel
function CheckoutPage({ articles, codePromo }: Props) {
  let total = 0;
  for (const a of articles) total += a.prix;
  if (codePromo === "VIP10" && total > 100) total = total * 0.9;
  return <div>Total : {total} €</div>;
}

// ✅ APRÈS : fonction extraite dans modules/orders/domain/orderRules.ts
export function calculerTotalAvecPromo(articles: Article[], codePromo?: string): number {
  const brut = articles.reduce((sum, a) => sum + a.prix, 0);
  const remise = codePromo === "VIP10" && brut > 100 ? brut * 0.1 : 0;
  return Number((brut - remise).toFixed(2));
}`,
};

export const MODULE5_COMMUNICATION_MERMAID: Record<'module' | 'service', MermaidVisualSpec> = {
  module: {
    title: 'Communication entre deux Modules (même application, 0 ms réseau)',
    caption:
      'Le Module Commandes appelle la façade publique modules/catalog/index.ts directement en mémoire, dans le même déploiement.',
    definition: `flowchart LR
  subgraph APP["UNE SEULE APPLICATION (Monolithe Modulaire)"]
    ORD["Module Commandes<br/>modules/orders/"] -->|"Appel fonction direct<br/>(import index.ts)"| PORT["Façade Publique<br/>catalog/index.ts"]
    PORT --> CAT["Module Catalogue<br/>modules/catalog/"]
  end
  ORD --> DB[("Base de données<br/>tables séparées par module")]
  CAT --> DB`,
  },
  service: {
    title: 'Communication entre deux Services autonomes (réseau obligatoire)',
    caption:
      'Deux serveurs séparés avec chacun sa base privée : chaque appel traverse le réseau et doit gérer latence, pannes et reprises.',
    definition: `flowchart LR
  subgraph SA["Serveur A : order-service"]
    OS["order-service<br/>Dockerfile A"] --> DBA[("DB Commandes<br/>(Privée)")]
  end
  subgraph SB["Serveur B : payment-service"]
    PS["payment-service<br/>Dockerfile B"] --> DBB[("DB Paiements<br/>(Privée)")]
  end
  OS -->|"POST /api/payments<br/>ou Événement réseau"| PS`,
  },
};

export const MODULE5_COMMUNICATION_CODE: Record<'module' | 'service', TypedCodeExample> = {
  module: {
    language: 'ts',
    title: 'Appel direct entre deux Modules (via index.ts)',
    filename: 'src/modules/orders/domain/createOrder.ts',
    caption:
      'Un simple import TypeScript sur le contrat public du module voisin : typé, instantané et sans panne réseau.',
    code: `// Appel en mémoire via la porte publique du Module Catalogue
import { verifierStockDisponible } from "../../catalog";

export function creerCommande(articles: Article[]) {
  const stockOk = verifierStockDisponible(articles); // 0 ms, même processus
  if (!stockOk) throw new Error("Stock insuffisant");
  return { statut: "CONFIRMEE", articles };
}`,
  },
  service: {
    language: 'ts',
    title: 'Appel réseau entre deux Services autonomes (HTTP + gestion d’échec)',
    filename: 'services/order-service/src/clients/paymentClient.ts',
    caption:
      'Dès que la frontière devient physique, il faut un contrat HTTP/JSON, un timeout et une gestion explicite de panne réseau.',
    code: `// Appel réseau obligatoire vers un serveur distinct
export async function demanderPaiement(commandeId: string, montant: number) {
  const response = await fetch("https://payment-service.internal/api/charge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ commandeId, montant }),
    signal: AbortSignal.timeout(4000), // Timeout réseau indispensable
  });

  if (!response.ok) {
    throw new Error("payment-service indisponible : reprise nécessaire");
  }
  return response.json();
}`,
  },
};

export const FIVE_ARCH_VISUALS: Record<
  FiveArchKey,
  { mermaid: MermaidVisualSpec; code: TypedCodeExample }
> = {
  layered: {
    mermaid: {
      title: 'Flux de l’Architecture en Couches (Layered)',
      caption:
        'Découpage horizontal strict : présentation → business → data, jamais de raccourci direct de l’UI vers la base.',
      definition: `flowchart LR
  UI["presentation/<br/>CheckoutPage.tsx"] --> BIZ["business/<br/>orderService.ts"]
  BIZ --> DATA["data/<br/>orderRepository.ts"]
  DATA --> DB[("Base de données<br/>& Stripe API")]`,
    },
    code: {
      language: 'ts',
      title: 'Signature code : orchestration descendante dans business/',
      filename: 'src/business/orderService.ts',
      code: `import { saveOrder } from "../data/orderRepository";
import type { Order } from "../entities/Order";

export async function confirmerCommande(order: Order) {
  if (order.items.length === 0) throw new Error("Panier vide");
  return saveOrder(order); // Descend proprement vers data/
}`,
    },
  },
  mvc: {
    mermaid: {
      title: 'Flux de l’Architecture MVC (Model · View · Controller)',
      caption:
        'Le Contrôleur reçoit l’action, fait travailler le Modèle (données/règles), puis renvoie le résultat à la Vue.',
      definition: `flowchart LR
  USER["Action Utilisateur<br/>POST /orders"] --> CTRL["controllers/<br/>orderController.ts"]
  CTRL --> MODEL["models/<br/>Order.ts"]
  MODEL -->|"Données validées"| CTRL
  CTRL --> VIEW["views/<br/>orderSummary.tsx"]`,
  },
    code: {
      language: 'ts',
      title: 'Signature code : chef d’orchestre dans controllers/',
      filename: 'src/controllers/orderController.ts',
      code: `import { OrderModel } from "../models/Order";

export async function handleCreateOrder(req: Request, res: Response) {
  const order = await OrderModel.createWithTotals(req.body);
  return res.render("orderSummary", { order }); // Passe le résultat à la Vue
}`,
    },
  },
  modular: {
    mermaid: {
      title: 'Flux du Monolithe Modulaire (Domaines isolés + index.ts)',
      caption:
        'Chaque domaine métier regroupe son UI, ses règles et ses données, et n’expose qu’une façade publique index.ts.',
      definition: `flowchart LR
  APP["src/app.ts<br/>Point d'entrée"] --> ORD["modules/orders/<br/>index.ts"]
  APP --> CAT["modules/catalog/<br/>index.ts"]
  APP --> BILL["modules/billing/<br/>index.ts"]
  ORD -.->|"Contrat public"| CAT
  ORD -.->|"Contrat public"| BILL`,
    },
    code: {
      language: 'ts',
      title: 'Signature code : porte publique d’un module métier',
      filename: 'src/modules/orders/index.ts',
      code: `// Seules ces fonctions sont visibles par les autres modules
export { creerCommande, annulerCommande } from "./domain/orderService";
export type { OrderSummary } from "./domain/orderTypes";
// orderRepo.ts reste strictement privé à l'intérieur de modules/orders/`,
    },
  },
  hexagonal: {
    mermaid: {
      title: 'Flux de l’Architecture Hexagonale / Clean (Ports & Adapters)',
      caption:
        'Le domaine métier est isolé au centre : il définit un Port (interface), et Stripe ou PostgreSQL se branchent dehors via des Adapters.',
      definition: `flowchart LR
  UI["Adapter Primaire<br/>Web / REST Controller"] --> UC["application/use-cases/<br/>PlaceOrder.ts"]
  UC --> DOM["domain/<br/>Order.ts (Cœur pur)"]
  UC --> PORT["ports/<br/>PaymentPort (Interface)"]
  ADAPT["Adapter Secondaire<br/>StripePaymentAdapter.ts"] -.->|"Implémente"| PORT`,
    },
    code: {
      language: 'ts',
      title: 'Signature code : Port métier indépendant + Adapter Stripe interchangeable',
      filename: 'ports/PaymentPort.ts + adapters/StripePaymentAdapter.ts',
      code: `// 1. Contrat pur défini par le domaine (zéro mention de Stripe !)
export interface PaymentPort {
  debiter(montant: number, devise: string): Promise<{ reference: string }>;
}

// 2. Adapter technique remplaçable sans toucher au métier
export class StripePaymentAdapter implements PaymentPort {
  async debiter(montant: number, devise: string) {
    return stripeSdk.charges.create({ amount: montant, currency: devise });
  }
}`,
    },
  },
  microservices: {
    mermaid: {
      title: 'Flux d’une Architecture Microservices (Distribuée sur le réseau)',
      caption:
        'Une API Gateway aiguille les requêtes vers des services indépendants possédant chacun leur serveur, Dockerfile et base privée.',
      definition: `flowchart LR
  CLI["Client Web / Mobile"] --> GW["api-gateway/<br/>Routage & Auth"]
  GW -->|"HTTP"| S1["services/orders/<br/>+ DB Orders"]
  GW -->|"HTTP"| S2["services/catalog/<br/>+ DB Catalog"]
  S1 -->|"Événement réseau"| S3["services/payments/<br/>+ DB Payments"]`,
    },
    code: {
      language: 'json',
      title: 'Signature code : contrat d’événement asynchrone entre services',
      filename: 'events/order-created.v1.json',
      code: `{
  "event": "order.created.v1",
  "producer": "order-service",
  "payload": {
    "orderId": "ord_2026_8841",
    "amountCents": 14900,
    "currency": "EUR"
  }
}`,
    },
  },
};

export const MODULE5_DIRECTIVE_MERMAID: MermaidVisualSpec = {
  title: 'Méthode de pilotage IA sans casser les frontières architecturales',
  caption:
    'Toute directive d’ingénieur suit 4 jalons : diagnostic de couche → contrat explicite → exécution isolée → vérification.',
  definition: `flowchart LR
  DIAG["1. Diagnostiquer<br/>Identifier la couche<br/>responsable"] --> BOUND["2. Fixer les frontières<br/>Nommer dossiers &<br/>entrées/sorties stables"]
  BOUND --> EXEC["3. Exécuter par l'IA<br/>Changement chirurgical<br/>sans fourre-tout"]
  EXEC --> CHECK["4. Vérifier<br/>Tests + Build +<br/>Mise à jour plan.md"]`,
};
