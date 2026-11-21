---
name: pdf-en-cours
description: Transforme n'importe quel document PDF (livre technique, manuel, rapport, cours académique, guide métier) en un fichier HTML unique, autonome, minimaliste et interactif conçu pour apprendre plus vite et plus en profondeur : découpage méthodique en modules et sous-modules enrichis, posture de Mentor Senior, schémas descriptifs intégrés (SVG éditoriaux + Mermaid adaptatif), ateliers interactifs, lexique décodeur, projet final pratique et système visuel éditorial Cormorant Garamond + DM Sans à 4 palettes (clair/sombre).
---

# Skill `pdf-en-cours` — Transformer n'importe quel PDF en Cours Interactif (1 Fichier HTML Unique)

## 1. Mission & Philosophie Pédagogique

Ce skill convertit **n'importe quel document PDF** (manuel de référence, cours universitaire, livre métier, documentation complexe, rapport stratégique) en **un seul fichier `.html` autonome, interactif et portable**, ouvrable directement dans n'importe quel navigateur (en ligne ou hors-ligne).

**Objectif final :** permettre à un apprenant d'assimiler un savoir dense **plus rapidement, plus concrètement et plus durablement** qu'en lisant un PDF linéaire.

### Les 5 principes non négociables
1. **Posture de Mentor Senior** : ne jamais produire un résumé scolaire sec. Adopter la voix d'un praticien senior du domaine du PDF qui explique le *pourquoi*, le *comment décider*, les pièges de terrain et la traduction en actions concrètes.
2. **Agrandissement méthodique, jamais de compression destructive** : ne jamais tasser 6 chapitres dans un seul bloc synthétique. Découper en **Modules progressifs** puis agrandir chaque module en **Sous-modules détaillés (`X.1`, `X.2`, `X.3`...)**. Les explications doivent être **enrichies, illustrées et développées** — jamais amputées.
3. **Apprentissage multimodal (Triple Codage)** : chaque concept clé combine :
   - un **texte éditorial clair et aéré** posé directement sur la page ;
   - un **schéma descriptif intégré** (diagramme SVG éditorial sur mesure et/ou schéma Mermaid auto-responsive) ;
   - une **mise en pratique active** (exemple concret, atelier interactif, simulateur de décision, cas réel ou audit).
4. **Esthétique éditoriale minimaliste et respirante** : grands titres et métriques en serif éditorial **`Cormorant Garamond`** (`font-weight: 500`, interlignage serré), sous-titres et corps de texte en **`DM Sans`** (`IBM Plex Mono` pour les repères techniques), modèle strict **`Grand Titre Serif → Sous-titre Sans → Filet Horizontal Fort → Contenu aéré`**, larges marges latérales (`clamp(1.75rem, 6vw, 4rem)`), colonne de lecture `65ch`, 4 palettes chromatiques (mode clair papier blanc + mode sombre), surfaces plates à bordure fine `1px` et **zéro effet de profondeur (`box-shadow: none`)**.
5. **1 seul fichier `.html` propre et autonome** : tout le CSS, le contenu structuré, les schémas SVG descriptifs, l'interactivité JavaScript et la persistance locale (`localStorage`) vivent dans **un unique fichier `<nom-du-cours>.html`** sans dépendance obligatoire à un serveur ou à une étape de build.

---

## 2. Pipeline Complet de Conversion (de A à Z)

Suivre strictement les **6 étapes** dans l'ordre avant de livrer le fichier HTML final.

---

### Étape 1 — Audit du PDF & Cartographie Pédagogique

Avant d'écrire une seule ligne de HTML, analyser intégralement le PDF source (table des matières, chapitres, concepts pivots, schémas originaux, études de cas, vocabulaire spécialisé) :

1. **Identifier l'objectif opérationnel de l'apprenant** :
   - Formuler 5 à 8 capacités concrètes (*« À la fin de ce cours, je sais faire… »*).
   - Identifier les points de blocage typiques d'un débutant ou d'un non-spécialiste face à ce PDF (jargon opaque, concepts abstraits, décisions difficiles).
2. **Extraire la colonne vertébrale en Modules progressifs** :
   - Regrouper la matière en **6 à 10 Modules cohérents** allant des fondations mentales vers la pratique, l'arbitrage de terrain et la maîtrise autonome.
   - Règle d'or : **1 module = 1 grande compétence mentale ou opérationnelle**, jamais un fourre-tout de chapitres sans lien.
3. **Déplier chaque Module en Sous-modules (`X.1`, `X.2`, `X.3`)** :
   - Si un module couvre plusieurs notions structurantes, le découper en 2 à 4 sous-modules dédiés afin d'avancer de façon méthodique et espacée.
   - Associer à chaque module et sous-module la **référence exacte au PDF source** (ex. `Chap. 2 & 3` ou `Pages 42–68`) pour ancrer la crédibilité.
4. **Extraire le Jargon & les Cas Réels** :
   - Lister **12 à 25 termes techniques** du PDF qui méritent une traduction en français clair (pour le **Lexique Décodeur**).
   - Identifier **2 à 4 scénarios réels / études de cas** issus du PDF (ou inspirés de celui-ci) pour créer des ateliers de décision.
   - Concevoir **1 Projet Final (Capstone)** qui oblige l'apprenant à mobiliser l'ensemble des modules sur un cas concret.

---

### Étape 2 — Agrandissement & Enrichissement du Contenu Pédagogique

Pour **chaque Module** et **chaque Sous-module**, rédiger un contenu riche et complet selon cette anatomie exacte (sans jamais raccourcir ni vider le texte) :

#### Anatomie d'un Module
1. **Repère technique mono** : `MODULE 01 · RÉF. PDF (ex. Chap. 1–2)` + bouton plat de validation (`Marquer ce module comme acquis` / `Module validé`).
2. **Grand Titre Serif** (`h2`, en `Cormorant Garamond`, net et équilibré).
3. **Sous-titre Sans** (1 à 2 phrases en `DM Sans` expliquant la promesse concrète du module).
4. **Filet horizontal fort (`1.5px`) + Parole du Mentor** (amorce en gras suivie d'un texte direct expliquant pourquoi ce module change la manière de penser).
5. **Schéma Descriptif Principal du Module** (SVG éditorial inline illustrant la vue d'ensemble du module + légende explicative).
6. **Sous-modules détaillés (`X.1`, `X.2`, `X.3`...)** — séparés par une ligne fine et un grand espace vertical.
7. **Atelier / Laboratoire Interactif du Module** (adapté au sujet du module).
8. **Synthèse « À Retenir du Module »** (règle d'or actionnable en 2–3 phrases).

#### Anatomie d'un Sous-module (`X.1`, `X.2`...)
1. **Repère** : `SOUS-MODULE X.Y · Référence source`.
2. **Grand Titre du Sous-module** (`h3`) + **Sous-titre explicatif**.
3. **Explication approfondie (posée directement sur le fond primaire, hors carte)** :
   - 1 paragraphe d'accroche du Mentor (intuition clé / analogie concrète).
   - **2 à 4 paragraphes d'approfondissement développés** (`deepDiveParagraphs`) expliquant mécanismes, causes, effets et nuances.
4. **Visuel de sous-module (Triple Codage)** :
   - 1 **Schéma descriptif** (SVG inline ou diagramme Mermaid adaptatif) clarifiant le flux, la structure ou la comparaison.
   - Si le sujet s'y prête (code, formule, arborescence, modèle de document, clause, tableau de calcul, prompt) : **1 bloc dédié séparé du texte** avec en-tête typé et bouton `Copier`. **Ne jamais noyer d'extraits techniques ou de structures brutes au milieu d'un paragraphe narratif.**
5. **Points Clés structurés** (2 à 4 points séparés par un filet horizontal fin `1px`, pas de boîtes ni de barres latérales superflues) :
   - Titre du point clé ;
   - Explication claire ;
   - **Exemple concret** issu du terrain ;
   - **Règle d'action / Réflexe de praticien** (ce que l'apprenant doit faire concrètement).
6. **Adaptation aux imprévus / Contraintes nouvelles** (1 à 2 cas par sous-module majeur) :
   - `▲ Imprévu / Contrainte` ;
   - `Mauvais réflexe` (erreur classique) ;
   - `Décision de praticien` (bonne stratégie).

---

### Étape 3 — Conception des Schémas Descriptifs Intégrés

Les schémas ne sont **jamais décoratifs** : ils doivent permettre à l'apprenant de **comprendre le module en 5 secondes avant même de lire les détails**.

Dans un fichier HTML unique autonome, privilégier **deux technologies complémentaires** qui fonctionnent à 100 % sans liens cassés :

#### A. Schémas SVG Éditoriaux Inline (Recommandé pour chaque Module — 100 % Hors-Ligne)
Construire des `<svg viewBox="0 0 840 ...">` propres, vectoriels, nets à toute résolution et qui s'adaptent automatiquement au **Mode Clair / Mode Sombre** via variables CSS. Décliner selon **3 styles pédagogiques éprouvés** :

1. **Style 1 — Blocs Pastel Plats & Flèches Directionnelles** *(Idéal pour flux, cycles, architectures simples, dépendances)* :
   - Rectangles aux coins légèrement arrondis (`rx="6"`), contours nets `1.5px`, remplissages pastel doux calibrés (`--schema-blue`, `--schema-green`, `--schema-amber`, `--schema-coral`), flèches droites/orthogonales propres avec marqueur `<marker id="arrow">`.
   - Maximum 6 à 9 blocs par schéma ; texte lisible (`14px`–`16px` en `DM Sans`), jamais surchargé.
2. **Style 2 — Couches Empilées avec Acteurs / Rôles** *(Idéal pour responsabilités, niveaux d'abstraction, chaînes de valeur, gouvernance)* :
   - 3 à 5 strates horizontales empilées reliées verticalement par des flèches, avec à droite l'acteur/rôle ou la question clé correspondant à chaque niveau.
3. **Style 3 — Comparaison Avant / Après ou Croquis Analytique** *(Idéal pour opposer une mauvaise pratique à la bonne structure, ou décomposer un système complexe en sous-ensembles)* :
   - Deux panneaux côte à côte (ou superposés sur mobile) : *Approche naïve / Risque* vs *Approche structurée / Maîtrisée*, avec légende pédagogique sous le `<figure>`.

#### B. Diagrammes Mermaid Adaptatifs (Optionnel en complément pour flux complexes)
Si un module inclut des graphes de flux ou d'états générés par Mermaid :
- Prévoir une **orientation auto-responsive** : vertical (`flowchart TD`) sous `768px` (mobile) et horizontal (`flowchart LR`) sur grand écran, avec une barre de contrôle plate `Auto / Vertical / Horizontal` et un bouton `Code Mermaid` dépliable.
- Encapsuler le SVG dans un conteneur `overflow-x: auto` avec indicateur discret si le schéma déborde horizontalement.
- **Règle de résilience hors-ligne** : si le CDN Mermaid est injoignable (utilisateur hors-ligne), basculer proprement sur l'affichage formaté de la structure ou privilégier les **SVG inline natifs** qui ne dépendent d'aucun réseau.

#### C. Blocs de Code, Formules, Modèles & Arborescences
- Chaque extrait technique, arborescence, modèle de document ou formule réutilisable est placé dans un composant plat dédié :
  - En-tête sur une ligne : `TYPE · Titre ou nom de fichier` + bouton `Copier` (avec retour `Copié ✓`).
  - Corps en `IBM Plex Mono`, coloration syntaxique sobre calée uniquement sur les **4 palettes** (mots-clés = actif, chaînes/validations = succès, valeurs/fonctions = avertissement, commentaires/branches = atténué), avec `overflow-x: auto`.

---

### Étape 4 — Ateliers Interactifs, Lexique & Projet Final

Un cours interactif fait **agir** l'apprenant pour ancrer la mémoire 3× plus vite. Intégrer **4 à 6 mécanismes interactifs** pertinents pour le domaine du PDF (implémentés en Vanilla JS propre dans le fichier HTML unique) :

1. **Comparateur / Explorateur de Modèles (Onglets plats)** :
   - Permet de basculer entre 2 à 5 approches/méthodes/architectures du PDF (ex. *Approche A vs B vs C*), en mettant à jour dynamiquement le schéma descriptif, les critères *Quand l'utiliser / Quand l'éviter* et un pas-à-pas interactif (*Étape 1 → 2 → 3*).
2. **Explorateur d'Anatomie Cliquable** :
   - Une structure cliquable (arborescence de projet, anatomie d'un système, contrat, bilan, processus biologique ou juridique) : cliquer sur un élément affiche à droite son rôle exact, ce qu'il contient, le risque en cas d'erreur et la règle d'action.
3. **Simulateur de Décision sous Contraintes** :
   - 3 à 5 curseurs ou choix de contexte (ex. budget, urgence, taille, niveau de risque, exigence réglementaire) qui calculent instantanément la **recommandation optimale** avec justification argumentée et compromis associés.
4. **Laboratoire de Cas Réels & Diagnostic (Quiz d'Audit)** :
   - 3 à 6 mises en situation réalistes : l'apprenant choisit une décision parmi 3 options et reçoit immédiatement le **feedback du Mentor** (pourquoi c'est optimal ou risqué + impact concret). Chaque cas réussi incrémente la **jauge de maîtrise globale**.
5. **Lexique Décodeur du Jargon (Recherche & Filtres instantanés)** :
   - Champ de recherche plat en temps réel + filtres par catégorie.
   - Chaque entrée donne : **Terme technique** → **Traduction simple en 1 phrase** → **Exemple concret**.
6. **Projet Final de Fin de Formation (Capstone)** :
   - Clôture le cours avec un **vrai projet à réaliser** découpé en **3 à 4 Missions séquentielles**.
   - Chaque mission comporte : objectif précis, livrable attendu, **checklist interactive** (cochable et persistée), et modèle/trame prête à copier.
   - Inclut un **Générateur de Feuille de Route personnalisée** (2–3 champs personnalisables par l'apprenant qui génèrent en direct son cahier des charges / plan d'action copiable ou téléchargeable en `.md`).

---

### Étape 5 — Système Visuel Éditorial (`Cormorant Garamond` + `DM Sans`) & 4 Palettes (Clair + Sombre)

Respecter ces règles visuelles à la lettre pour obtenir un rendu éditorial calme, de niveau livre/revue, rapide à lire et sans fatigue visuelle :

#### 1. Typographie Éditoriale, Marges Larges & Respiration
- **Police Display (`h1`, `h2`, `h3`, grandes métriques)** : `'Cormorant Garamond', Georgia, serif` (graisses `300`, `400`, `500`, `600`, `font-variant-numeric: lining-nums tabular-nums`, `text-wrap: balance`). Toujours en graisse légère/moyenne (`400`–`500`) pour un rendu net et élégant, jamais alourdi.
- **Police Corps & Sous-titres** : `'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` pour les sous-titres, paragraphes, boutons et navigation.
- **Police technique** : `'IBM Plex Mono', ui-monospace, SFMono-Regular, Consolas, monospace` uniquement pour les étiquettes de modules, repères numériques, code et arborescences.
- **Chargement non bloquant** : `<link>` Google Fonts pour `Cormorant Garamond` (300, 400, 500, 600) + `DM Sans` (400, 500, 700) + `IBM Plex Mono` (400, 500, 600) avec repli système propre si ouvert hors-ligne.
- **Marges & Cadence Éditoriale Obligatoire** :
  - **Marges latérales généreuses** : `padding-inline: clamp(1.75rem, 6vw, 4rem)` (`>= 28px` sur mobile, `48px`–`64px` sur tablette/bureau) autour d'un conteneur `max-width: 896px` (`max-width: 65ch` pour le flux de lecture).
  - **Grand Titre Serif** (`clamp(2.25rem, 4.8vw, 3.75rem)`, `font-weight: 500`, `line-height: 1.06`, `letter-spacing: -0.02em`)
  - **Sous-titre Sans** (`clamp(1.08rem, 2vw, 1.32rem)`, couleur secondaire adoucie, `line-height: 1.56`)
  - **Filet horizontal fort** (`border-top: 1.5px solid var(--border-strong)`) juste sous l'ensemble *Grand Titre + Sous-titre* avant d'entrer dans le texte.
  - **Paragraphe d'attaque avec amorce en gras** (ex. `<strong>Le principe clé :</strong> ...`), suivi du **Reste du contenu** (`line-height: 1.76`, grands espacements `padding-block: 5rem` à `7rem` par module, séparateurs fins `1px solid var(--border-fine)` entre sous-modules, **zéro barre d'accent verticale épaisse à gauche**).
  - **Métriques éditoriales nues** (ex. `7/7` ou `3/9`) : grand chiffre fin en `Cormorant Garamond` `300` couleur active (`#1D4ED8` / `#6EA8FE`), suivi d'une courte légende et d'un filet fin dessous — sans aucune boîte ni bordure.

#### 2. Système Strict à 4 Palettes (Clair & Sombre)
Définir ces tokens dans `:root` et `:root[data-theme="dark"]` :

| Rôle | Mode Clair (`:root`) | Mode Sombre (`[data-theme="dark"]`) | Usage strict |
| :--- | :--- | :--- | :--- |
| **1. Primaire (Fonds)** | `#FFFFFF` / `#FAF9F6` / `#F3F1EB` | `#111317` / `#171A20` / `#0D0F13` | Alternance douce des sections pleine largeur |
| **2. Secondaire (Textes)** | `#141619` / `#323741` / `#666E7A` | `#F3F1EA` / `#C8CDD6` / `#8E96A5` | Hiérarchie titres serif, corps de texte, métadonnées |
| **3. Tertiaire (Surfaces)** | `#FFFFFF` / `#F8F7F3` (bord `#E4E0D5`) | `#1B1F26` / `#15181E` (bord `#2B313D`) | Schémas, ateliers, formulaires, cartes interactives **plates (`1px`, 0 ombre)** |
| **4. Quaternaire (États)** | Actif `#1D4ED8` · Succès `#1B6B4A` · Contrainte `#B85D19` · Alerte `#A62626` | Actif `#6EA8FE` · Succès `#4CC38A` · Contrainte `#E5964B` · Alerte `#F06D6D` | Progression, métriques nues, sélections actives, feedbacks, alertes |

*Couleurs pastel calibrées pour les schémas SVG :*
- Clair : bleu `#EDF3FC` (bord `#1D4ED8`), vert `#EAF5F0` (bord `#1B6B4A`), ambre `#FDF4EC` (bord `#B85D19`), corail `#FDF2F2` (bord `#A62626`).
- Sombre : bleu `#16263D` (bord `#6EA8FE`), vert `#122920` (bord `#4CC38A`), ambre `#2C1F12` (bord `#E5964B`), corail `#2E1719` (bord `#F06D6D`).

#### 3. Interdictions Visuelles & Règles de Confinement Strictes
- **Zéro KPI cards** décoratives (utiliser uniquement des métriques typographiques nues si pertinent).
- **Zéro Hero surchargé** : 1 repère mono, 1 Grand Titre Serif, 1 Sous-titre Sans, 1 filet fort, 1 métrique de progression nue, 2 actions claires maximum.
- **Zéro pilule sur le texte** (`border-radius: 9999px` interdit sur les étiquettes, tags, statuts ou boutons texte — utiliser des angles nets `0px` à `3px` ou du texte mono nu).
- **Zéro effet de profondeur** : `box-shadow: none` partout, pas de dégradés brillants ni d'élévation 3D au survol.
- **Navigation dynamique & fluide** : barre sticky sur **une seule ligne** (`white-space: nowrap; flex-shrink: 0`), barre de progression de maîtrise ultra-fine (`3px`) en haut, tiroir **Sommaire** animé en grille `3 colonnes` (scroll vertical interne sur mobile `max-height: calc(100dvh - 4.25rem); overflow-y: auto`), filtre *Lecture continue* vs *Module unique*, bascule **Clair / Sombre** avec script anti-flash dans `<head>`.
- **Confinement anti-débordement** : `min-width: 0; overflow-wrap: break-word` sur tous les conteneurs flex/grid ; `overflow-x: auto` sur les schémas larges, tableaux et blocs techniques ; **zéro scroll horizontal sur `body`** sur desktop (`1440px`) comme sur mobile (`390px`).
- **Zéro boîte de dialogue native bloquante** : interdiction d'utiliser `window.alert()`, `window.confirm()` ou `window.prompt()` (utiliser une confirmation inline en 2 temps pour la réinitialisation de la progression).
- **Feuille de style impression / PDF (`@media print`)** : marges A4 `22mm 20mm`, masquage de l'en-tête sticky et des boutons, fond blanc pur et encre noire.

---

### Étape 6 — Architecture Interne du Fichier HTML Unique & Auto-Contrôle

Organiser le fichier `<nom-du-cours>.html` avec une séparation interne stricte des responsabilités (facile à relire, maintenir et rééditer) :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Titre du Cours] — Formation Modulaire Interactive</title>
  <meta name="description" content="[Sous-titre pédagogique du cours]" />
  <!-- Script anti-flash mode sombre (exécuté avant le premier rendu) -->
  <script>
    (function () {
      try {
        var saved = localStorage.getItem('cours_theme_v1');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = (saved === 'dark' || saved === 'light') ? saved : (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  </script>
  <!-- Polices Cormorant Garamond + DM Sans + IBM Plex Mono (avec repli système propre hors-ligne) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    /* 1. Tokens 4 Palettes (Clair & Sombre) */
    :root {
      color-scheme: light;
      --bg-primary: #FFFFFF;
      --bg-primary-alt: #FAF9F6;
      --bg-primary-deep: #F3F1EB;
      --bg-header: rgba(255, 255, 255, 0.94);
      --text-main: #141619;
      --text-body: #323741;
      --text-muted: #666E7A;
      --surface: #FFFFFF;
      --surface-alt: #F8F7F3;
      --border-fine: #E4E0D5;
      --border-strong: #141619;
      --state-active: #1D4ED8;
      --state-active-bg: #EDF3FC;
      --state-success: #1B6B4A;
      --state-success-bg: #EAF5F0;
      --state-warning: #B85D19;
      --state-warning-bg: #FDF4EC;
      --state-danger: #A62626;
      --state-danger-bg: #FDF2F2;
      --ink-bg: #141619;
      --ink-text: #FFFFFF;
      --font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
      --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Consolas, monospace;
      --container: 896px;
    }

    :root[data-theme="dark"] {
      color-scheme: dark;
      --bg-primary: #111317;
      --bg-primary-alt: #171A20;
      --bg-primary-deep: #0D0F13;
      --bg-header: rgba(17, 19, 23, 0.94);
      --text-main: #F3F1EA;
      --text-body: #C8CDD6;
      --text-muted: #8E96A5;
      --surface: #1B1F26;
      --surface-alt: #15181E;
      --border-fine: #2B313D;
      --border-strong: #E6E3DA;
      --state-active: #6EA8FE;
      --state-active-bg: #16263D;
      --state-success: #4CC38A;
      --state-success-bg: #122920;
      --state-warning: #E5964B;
      --state-warning-bg: #2C1F12;
      --state-danger: #F06D6D;
      --state-danger-bg: #2E1719;
      --ink-bg: #F3F1EA;
      --ink-text: #111317;
    }

    /* 2. Base, Typographie Éditoriale, Marges Larges, Filets & Responsive */
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; background: var(--bg-primary); color: var(--text-main); font-family: var(--font-sans); }
    body { margin: 0; background: var(--bg-primary); color: var(--text-main); line-height: 1.75; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    h1, h2, h3, .editorial-metric { margin: 0; font-family: var(--font-serif); font-weight: 500; letter-spacing: -0.02em; font-variant-numeric: lining-nums tabular-nums; text-wrap: balance; color: var(--text-main); }
    h4 { margin: 0; font-family: var(--font-sans); font-weight: 600; letter-spacing: -0.015em; color: var(--text-main); }
    code, pre, .mono { font-family: var(--font-mono); }
    .surface-flat { background: var(--surface); border: 1px solid var(--border-fine); box-shadow: none; min-width: 0; }
    .container { max-width: var(--container); margin: 0 auto; padding-inline: clamp(1.75rem, 6vw, 4rem); }
    .prose-col { max-width: 65ch; }
    .editorial-rule-strong { border-top: 1.5px solid var(--border-strong); }
    .editorial-rule-fine { border-top: 1px solid var(--border-fine); }
    .module-section { padding-block: clamp(4.5rem, 8vw, 7rem); border-bottom: 1px solid var(--border-fine); }
    .reveal { opacity: 0; transform: translateY(12px); transition: opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1); }
    .reveal.is-visible { opacity: 1; transform: translateY(0); }
    @media print { @page { size: A4 portrait; margin: 22mm 20mm; } header, .no-print { display: none !important; } body { background: #fff !important; color: #141619 !important; } }
    /* ... Compléter avec les styles de navigation sticky, tiroir mobile, schémas SVG, blocs de code, ateliers et lexique ... */
  </style>
</head>
<body>
  <!-- A. Header sticky 1 ligne + barre de maîtrise 3px + bascule thème + tiroir Sommaire -->
  <!-- B. Hero minimaliste (Repère -> Grand Titre -> Sous-titre -> 2 actions) -->
  <!-- C. Main : Modules 01..N (Grand Titre -> Sous-titre -> Mentor -> Schéma SVG -> Sous-modules X.1..X.n -> Atelier interactif -> Synthèse) -->
  <!-- D. Projet Final (Capstone) en 3–4 missions + générateur personnalisé -->
  <!-- E. Lexique Décodeur filtrable -->
  <!-- F. Footer minimaliste -->

  <script>
    /* =========================================================================
       COUCHE 1 : DONNÉES DU COURS (Modules, Sous-modules, Ateliers, Lexique, Projet)
       ========================================================================= */
    const COURSE_META = { storageKey: 'cours_pdf_progress_v1', /* ... */ };

    /* =========================================================================
       COUCHE 2 : LOGIQUE MÉTIER PURE & PERSISTANCE DÉFENSIVE (localStorage)
       - Calcul de la maîtrise (%) & rang de progression
       - Moteur de recommandation / simulateur de décision
       - Filtrage du lexique
       - Chargement / sauvegarde / réinitialisation sécurisés (try/catch)
       ========================================================================= */

    /* =========================================================================
       COUCHE 3 : PRÉSENTATION & INTERACTIONS DOM
       - Rendu du sommaire & filtre Module unique / Lecture continue
       - Bascule thème Clair / Sombre
       - Ateliers interactifs, Quiz d'audit, Boutons Copier, Checklists Projet
       - IntersectionObserver pour les animations reveal fluides
       ========================================================================= */
  </script>
</body>
</html>
```

---

## 3. Checklist d'Auto-Vérification Avant Livraison

Avant de considérer le fichier HTML terminé, vérifier systématiquement ces **10 critères** :

1. **Fichier unique & autonome** : un seul `.html` fonctionnel immédiatement à l'ouverture locale (`file://`) sans build, sans images cassées et sans erreurs console.
2. **Complétude & richesse** : aucun chapitre majeur du PDF oublié ; chaque module est découpé en **sous-modules détaillés** avec paragraphes enrichis, exemples concrets, règles d'action et gestion d'imprévus.
3. **Schémas descriptifs dans chaque module** : chaque module possède au moins 1 schéma SVG descriptif clair (et des schémas/blocs supplémentaires dans les sous-modules clés), parfaitement lisible en mode clair **et** en mode sombre.
4. **Triple séparation texte / schéma / extraits** : jamais de code, formule complexe ou arborescence noyée dans un paragraphe narratif ; bouton `Copier` fonctionnel sur chaque bloc extractible.
5. **Apprentissage actif réel** : au moins 3 types d'interactions pédagogiques différentes (ex. comparateur, simulateur de décision, explorateur cliquable, cas réels avec feedback Mentor) + **Lexique Décodeur** filtrable + **Projet Final** guidé avec checklist.
6. **Hiérarchie éditoriale & respiration** : `Cormorant Garamond` pour les grands titres/métriques et `DM Sans` pour le corps de texte, structure `Grand Titre Serif → Sous-titre Sans → Filet Horizontal Fort → Contenu` respectée sur le Hero, chaque module et chaque sous-module, larges marges latérales (`clamp(1.75rem, 6vw, 4rem)`).
7. **Discipline 4 palettes & zéro défaut visuel** : zéro ombre portée (`box-shadow: none`), zéro KPI card, zéro pilule texte (`border-radius: 9999px`), mode clair et mode sombre contrastés.
8. **Navigation & persistance** : barre de maîtrise synchronisée avec les validations de modules et les cas réussis, sauvegarde `localStorage` défensive, réinitialisation en 2 temps sans `window.confirm()`.
9. **Responsive & confinement strict** : en-tête desktop sur 1 ligne sans retour à la ligne parasite, tiroir Sommaire scrollable sur mobile, zéro débordement horizontal sur `390px` et `1440px`.
10. **Clarté pour l'apprenant** : tout jargon technique employé dans le cours est expliqué à sa première apparition et indexé dans le Lexique Décodeur.
