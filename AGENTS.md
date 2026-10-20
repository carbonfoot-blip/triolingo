# Guide Central des Agents IA - TrioLingo

Ce document constitue le cadre de référence impératif pour tout agent IA (Antigravity) intervenant sur le dépôt **TrioLingo**. Tout agent doit respecter scrupuleusement les consignes d'architecture, de style, le protocole de branches Git, le cycle de spécifications et les validations locales obligatoires.

---

## 1. 🏗️ Présentation & Architecture du Projet

### Rôle du projet
**TrioLingo** est une application web éducative, interactive et ludique conçue pour accompagner les élèves de **Secondaire 1** au Québec dans la révision et la maîtrise des compétences clés du Programme de formation de l'école québécoise (PFEQ).
Elle cible trois matières fondamentales :
1. 📚 **Français** : Maîtrise de la conjugaison (les 15 temps du verbe *avoir*, puis *être* et verbes modèles), orthographe d'usage et grammaire/accords.
2. 📐 **Mathématiques** : Priorité des opérations (PEMDAS), nombres entiers relatifs, fractions, périmètres/aires et pré-algèbre.
3. 🌍 **Géographie** : Territoires urbains (Montréal, Québec), régionaux (forêt boréale, hydroélectricité), autochtones et réseau hydrographique du Saint-Laurent.

### Stack Technologique
- **Frontend Core :** React 19 (Hooks fonctionnels, gestion d'état locale, modal interactif).
- **Langage :** TypeScript (Mode strict avec typage exhaustif).
- **Build & Bundler :** Vite 8 avec `@vitejs/plugin-react`.
- **Linter & Qualité :** Oxlint (`.oxlintrc.json`).
- **Styles & CSS :** Vanilla CSS moderne modulaire (`index.css`, variables de design tokens, glassmorphism, responsive mobile/Chromebook/tablette).
- **Audio & Animations :** Synthétiseur Web Audio API natif (`soundEffects.ts`), confetti (`canvas-confetti`), icônes (`lucide-react`).
- **Déploiement :** GitHub Pages (`gh-pages`) via GitHub Actions.
- **Scripts de Validation :** `build.bat` et `validate.ps1`.

### Structure du Répertoire
```text
triolingo/
├── .git/                   # Répertoire Git
├── .github/                # Workflows GitHub Actions (déploiement gh-pages)
├── AGENTS.md               # Guide central pour les agents IA (ce fichier)
├── README.md               # Documentation générale et pédagogique
├── specs/                  # Spécifications fonctionnelles et techniques
│   └── template.md         # Modèle de rédaction de spécifications
├── src/                    # Code source de l'application
│   ├── components/         # Composants React (ConjugationModule, MathModule, GeoModule, Header, etc.)
│   ├── data/               # Banques de données pédagogiques (conjugaison, questions math/géo)
│   ├── utils/              # Effets sonores et utilitaires
│   ├── App.tsx             # Composant racine
│   ├── index.css           # Design tokens et feuille de styles complète
│   └── main.tsx            # Point d'entrée de l'application
├── public/                 # Assets statiques
├── .oxlintrc.json          # Configuration Oxlint
├── build.bat               # Script Windows batch de build
├── validate.ps1            # Script PowerShell de validation syntaxique et build
├── tsconfig.json           # Configuration TypeScript
├── vite.config.ts          # Configuration Vite
└── package.json            # Dépendances et scripts de build / lint
```

---

## 2. 🎯 Conventions de Nommage & Bonnes Pratiques

- **Composants React :** PascalCase (`ConjugationModule.tsx`, `MathModule.tsx`, `GeoModule.tsx`).
- **Types & Interfaces TypeScript :** PascalCase (`TenseInfo`, `QuestionItem`, `QuizSession`).
- **Typage Strict :** Ne jamais utiliser `any` sans justification exceptionnelle. Toujours typer les props et les états.
- **Règles Pédagogiques Québec :** Respect strict de la terminologie du MEQ / PFEQ (ex. *Indicatif imparfait*, *Subjonctif présent*, *Priorité des opérations*, *Régions administratives*).
- **Accessibilité & Ergonomie Clavier :** Les élèves utilisent fréquemment des Chromebooks scolaires. La saisie de caractères accentués québécois (`é`, `è`, `ê`, `à`, `ù`, `ç`) doit disposer de raccourcis visuels rapides.
- **Qualité Oxlint & Zéro Warning :** Tout code doit être exempt d'avertissements de rendus en cascade ou de variables inutilisées.

---

## 3. 🔀 Protocole Strict de Branches Git Isolées

L'agent IA doit appliquer le protocole de branches suivant sans exception :

1. **Interdiction de committer directement sur `main` :**
   Toute tâche ou modification commence par la création d'une branche dédiée.
2. **Nommage conventionnel de la branche :**
   - Nouvelle fonctionnalité / matière : `feature/<nom-court-kebab-case>`
   - Correction pédagogique ou bug : `fix/<nom-court-kebab-case>`
   - Refactorisation ou styles : `refactor/<nom-court-kebab-case>`
   - Documentation : `docs/<nom-court-kebab-case>`
3. **Cycle de commande :**
   ```bash
   git checkout main
   git pull
   git checkout -b feature/nom-de-la-tache
   ```
4. **Commits atomiques :** Utiliser la convention *Conventional Commits* (`feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`).
5. **Revue obligatoire du `git diff` :**
   - Avant toute proposition de fusion (`merge`), l'agent IA doit exécuter :
     ```bash
     git diff main...HEAD
     ```
   - L'agent doit **analyser et présenter clairement ce diff à l'utilisateur** afin de solliciter sa validation humaine explicite.
   - Ne jamais merger automatiquement sans accord préalable.

---

## 4. 📝 Cycle de Vie des Spécifications (`specs/`)

1. L'utilisateur formalise son besoin en dupliquant `specs/template.md` vers un nouveau fichier, par exemple `specs/SPEC-002-module-verbe-etre.md`.
2. L'agent IA analyse les notions du PFEQ, les interfaces TypeScript et les composants à concevoir.
3. L'agent crée la branche Git dédiée et procède au développement.
4. L'agent lance le linter et le build local avant de présenter le diff.

---

## 5. 🧪 Script & Commandes de Validation Locale (Obligatoire)

Avant de déclarer toute tâche terminée ou de solliciter une revue, l'agent IA doit **impérativement exécuter la séquence de validation suivante via `npm.cmd`** (ou `.\build.bat` / `.\validate.ps1`) depuis la racine du projet :

```powershell
# 1. Vérification de la qualité du code avec Oxlint
npm.cmd run lint

# 2. Compilation TypeScript stricte et bundling Vite
npm.cmd run build
```

*(Ou en exécutant directement : `powershell -ExecutionPolicy Bypass -File .\validate.ps1` ou `.\build.bat`)*

### Critères de réussite :
- Oxlint ne rapporte aucune erreur (`0 errors`).
- `tsc -b` valide tous les types TypeScript sans erreur.
- Vite compile les bundles dans `dist/` avec succès (code de retour 0).
