# [ID_SPEC] : [Titre court et explicite de la fonctionnalité]

> **Fichier modèle de spécification pour l'Agent IA Antigravity**  
> Copiez ce fichier dans `specs/SPEC-XXX-<nom-court>.md` et complétez les sections ci-dessous avant de demander à l'Agent IA d'intervenir.

---

## 📌 Métadonnées
- **ID de la Spécification :** SPEC-001 *(incrémenter pour chaque nouvelle spec)*
- **Statut :** `Brouillon` | `Prêt pour développement` | `En cours` | `En revue` | `Terminé`
- **Auteur :** Félix-Antoine Legault
- **Date de création :** AAAA-MM-JJ
- **Branche Git cible :** `feature/<nom-court-kebab-case>` ou `fix/<nom-court-kebab-case>`

---

## 1. 🎯 Contexte & Objectif
- **Pourquoi cette évolution ?** Expliquez la notion pédagogique (Français : conjugaison, orthographe, grammaire ; Mathématiques : priorité d'opérations, entiers, géométrie ; Géographie : territoire québécois).
- **Public cible :** Élève de Secondaire 1 au Québec (12-13 ans).
- **Bénéfice attendu :** Renforcement de la compréhension, feedback pédagogique clair et gamification stimulante.

---

## 2. 🔍 Périmètre (Scope)

### ✅ Ce qui est inclus (In-Scope)
- Liste des composants React, modules de données (`src/data/`), interfaces TypeScript ou utilitaires à créer ou modifier.

### ❌ Ce qui est exclu (Out-of-Scope)
- Notions des niveaux scolaires supérieurs ou hors programme PFEQ.

---

## 3. 📋 Spécifications Fonctionnelles & Expérience Utilisateur

### 3.1 Description des composants et interactions
1. L'élève sélectionne la matière (Français, Mathématiques, Géographie)...
2. Le système présente les questions sous format interactif (saisie clavier avec barre d'accents ou choix multiple)...
3. Rétroaction sonore et visuelle immédiate avec explication de la règle.
4. Synthèse des résultats et calcul de la maîtrise.

### 3.2 Modèles de données & Typage TypeScript
- Interfaces de questions, options, règles pédagogiques et sessions d'apprentissage.

---

## 4. ✅ Critères d'Acceptation (Règles d'or pour validation)

- [ ] **Critère 1 :** Rendu fluide et interactif sans erreurs React dans la console.
- [ ] **Critère 2 :** Validation stricte TypeScript sans `any` injustifié (`tsc -b`).
- [ ] **Critère 3 :** Oxlint ne rapporte aucune erreur (`npm.cmd run lint`).
- [ ] **Critère 4 :** `npm.cmd run build` compile avec succès.

---

## 5. 🛠️ Contraintes Techniques, Design & Composants

- **Framework :** React 19 + TypeScript (Strict Mode).
- **Build tool :** Vite 8.
- **Linter :** Oxlint.
- **Design & UI :** Vanilla CSS moderne (design tokens, glassmorphism, responsive Chromebooks/tablettes/smartphones).
- **Audio :** Synthétiseur Web Audio natif non intrusif avec option muette.

---

## 6. 🧪 Protocole de Validation & Tests Locaux

Avant de considérer la tâche comme terminée, l'Agent IA doit exécuter la séquence suivante :
```powershell
npm.cmd run lint
npm.cmd run build
```

---

## 7. 🔀 Protocole Git & Livraison

1. **Création de la branche isolée :**
   ```bash
   git checkout main
   git pull
   git checkout -b feature/<nom-de-la-tache>
   ```
2. **Commits conventionnels :**
   ```bash
   git commit -m "feat(math): ajout de la banque de questions sur les fractions"
   ```
3. **Présentation obligatoire du `git diff` :**
   - `git diff main...HEAD`
   - Présentation claire des modifications à l'utilisateur pour approbation humaine.
