# SPEC-002 : Mathématiques — Chapitre 2 (Nombres Entiers Relatifs)

> **Spécification Fonctionnelle et Pédagogique pour TrioLingo**

---

## 📌 Métadonnées
- **ID de la Spécification :** SPEC-002
- **Statut :** `Terminé`
- **Auteur :** Félix-Antoine Legault
- **Date de création :** 2026-10-20
- **Branche Git cible :** `feature/math-chapitre-2-entiers-relatifs`

---

## 1. 🎯 Contexte & Objectif
- **Pourquoi cette évolution ?** Permettre aux élèves de Secondaire 1 au Québec de réviser et de maîtriser en profondeur les nombres entiers relatifs (Z), une compétence charnière du programme du ministère (MEQ / PFEQ).
- **Structure :**
  - Maintien du **Chapitre 1 : Opérations fondamentales & Priorités (12 questions)**.
  - Création du **Chapitre 2 : Les Nombres Entiers Relatifs (52 questions exhaustives)**.
- **Bénéfice attendu :** Couverture complète des 10 thématiques incontournables : nombres positifs/négatifs, opposés, droites numériques, ordre croissant/décroissant, thermomètres, problèmes concrets (oiseau, plongée, ascenseur), méthode des jetons, additions, soustractions et repérage dans les 4 quadrants du plan cartésien.

---

## 2. 🔍 Périmètre (Scope)

### ✅ Ce qui est inclus (In-Scope)
- **Banque de 52 questions didactiques** (`src/data/mathQuestions.ts`) couvrant :
  1. Positifs, négatifs, neutralité du zéro et distance à zéro.
  2. Les opposés des nombres ("L'opposé de 6 est...", opposé de -14, opposé de l'opposé, somme des opposés).
  3. Droite numérique horizontale (abscisses, mi-chemin, distances, déplacements).
  4. Rangement en ordre croissant et décroissant avec symboles `<` et `>`.
  5. Thermomètre et écarts de température (Kuujjuaq, Montréal, variations sous zéro).
  6. Problèmes complets en contexte concret :
     - *« Oiseau à une altitude de 5 m, plonge dans l'eau jusqu'à 2 m sous la surface (-2 m) : distance totale = 7 m »*.
     - Sous-marin (-180 m remonte de 65 m), ascenseur (3e sous-sol monte de 7 étages), compte en banque (solde négatif).
  7. Méthode des jetons : modélisation avec jetons (+) et (-), concept de paire nulle (paire zéro = 0), ajout de paires nulles pour effectuer des soustractions.
  8. Additions d'entiers relatifs (même signe, signes contraires, règles de distance à zéro).
  9. Soustractions d'entiers relatifs (règle fondamentale : soustraire revient à additionner l'opposé).
  10. Le plan cartésien (abscisse x, ordonnée y, origine (0,0), les 4 quadrants I, II, III, IV, points sur les axes).
- **Sélecteur de Chapitre et Modes de session :**
  - Défi rapide (10 questions aléatoires).
  - Approfondi (25 questions aléatoires).
  - Complet (52 questions).
- **Gamification & Feedback :**
  - Suivi des séries (Streaks 🔥).
  - Sonorisation Web Audio.
  - Célébrations Confetti à 70% et plus.
  - Revue détaillée de chaque question avec explication pédagogique.

---

## 3. 🧪 Validation locale
- `powershell -ExecutionPolicy Bypass -File .\validate.ps1`
  - Oxlint : 0 erreur, 0 avertissement.
  - TypeScript : `tsc -b` réussi.
  - Bundling Vite : réussi.
