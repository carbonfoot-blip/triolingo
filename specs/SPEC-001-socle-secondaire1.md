# SPEC-001 : Socle Pédagogique et Modules d'Apprentissage Secondaire 1 (Québec)

> **Spécification Fondatrice de l'Application TrioLingo**

---

## 📌 Métadonnées
- **ID de la Spécification :** SPEC-001
- **Statut :** `Terminé`
- **Auteur :** Félix-Antoine Legault
- **Date de création :** 2026-10-20
- **Branche Git cible :** `feature/workspace-integration-and-details`

---

## 1. 🎯 Contexte & Objectif
- **Pourquoi cette évolution ?** Poser le socle complet de révision interactive pour les élèves québécois entrant au Secondaire 1 (12-13 ans). L'apprentissage combine la conjugaison fondamentale du verbe modèle *avoir*, les mathématiques prioritaires (PEMDAS, fractions, entiers relatifs, géométrie) et la géographie territoriale du Québec (métropoles, étalement urbain, Saint-Laurent, biomes nordiques).
- **Public cible :** Élèves de Secondaire 1 (Québec), parents et tuteurs.
- **Bénéfice attendu :** Rétroaction immédiate et ludique (Web Audio, streaks 🔥, XP ⭐, célébrations confetti), accessibilité Chromebook et aide-mémoire visuel.

---

## 2. 🔍 Périmètre (Scope)

### ✅ Ce qui est inclus (In-Scope)
- **Français :** Module de conjugaison interactif du verbe *avoir* sur les 15 temps du PFEQ avec génération aléatoire de 30 questions, modal d'aide-mémoire complet et aperçus des notions d'orthographe et de grammaire.
- **Mathématiques :** Banque de questions couvrant la priorité des opérations, les entiers relatifs, les fractions, le calcul d'aires/périmètres et les expressions algébriques. Barre de progression et revue complète des réponses.
- **Géographie :** Banque de questions couvrant le territoire urbain (Montréal, étalement, îlots de chaleur), l'hydrographie du Saint-Laurent, les ressources naturelles (Bouclier canadien, hydroélectricité) et les territoires autochtones (Nunavik, pergélisol, toundra).
- **Architecture de projet :** Intégration au workspace multi-projets (`projets.code-workspace`), guide des agents (`AGENTS.md`), modèle de spécifications (`specs/template.md`) et scripts de build/validation (`validate.ps1`, `build.bat`).

### ❌ Ce qui est exclu (Out-of-Scope)
- Modules du Secondaire 2 à 5.
- Authentification avec base de données (l'application fonctionne 100% côté client sans friction).

---

## 3. 📋 Spécifications Fonctionnelles & Expérience Utilisateur

### 3.1 Navigation & Matières
- En-tête supérieur permettant de basculer instantanément entre **Français 📚**, **Mathématiques 📐** et **Géographie 🌍**.
- Bouton sonore permettant de couper ou d'activer le synthétiseur Web Audio API à tout moment.
- Bouton « Aide-mémoire » ouvrant la table de conjugaison complète pour le verbe *avoir*.

### 3.2 Quiz Mathématiques & Géographie
- Déroulement fluide question par question.
- Feedback immédiat avec couleur (vert/rouge), icône, son approprié et explication pédagogique détaillée de la règle.
- Écran de fin affichant le score, le pourcentage, le déclenchement de confettis si le score atteint 70% ou plus, et la revue exhaustive de toutes les questions avec les réponses de l'élève comparées aux réponses attendues.

---

## 4. ✅ Critères d'Acceptation Validés

- [x] **Critère 1 :** L'application compile sans aucune erreur TypeScript (`tsc -b`).
- [x] **Critère 2 :** Linter Oxlint rapporte 0 erreur et 0 avertissement (`npm.cmd run lint`).
- [x] **Critère 3 :** Le projet est référencé dans `projets.code-workspace` sous l'identifiant `🦉 TrioLingo`.
- [x] **Critère 4 :** Présence de `AGENTS.md`, `specs/template.md`, `build.bat` et `validate.ps1`.
