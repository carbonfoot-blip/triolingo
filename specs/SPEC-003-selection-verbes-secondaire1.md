# SPEC-003 : Sélecteur de verbes et banque étendue de verbes de Secondaire 1

> **Spécification fonctionnelle et technique pour TrioLingo**  
> Module Français / Conjugaison : Remplacement du verbe unique (avoir) par un sélecteur de verbes et une banque d'au moins 20 verbes prioritaires du Programme de formation de l'école québécoise (PFEQ / Progression des apprentissages PDA).

---

## 📌 Métadonnées
- **ID de la Spécification :** SPEC-003
- **Statut :** `Terminé`
- **Auteur :** Félix-Antoine Legault / Antigravity
- **Date de création :** 2026-10-25
- **Branche Git cible :** `feature/selection-verbes-secondaire1`

---

## 1. 🎯 Contexte & Objectif
- **Pourquoi cette évolution ?** Actuellement, le module de conjugaison de TrioLingo était restreint uniquement au verbe *avoir*. Pour que l'application devienne un véritable outil complet d'étude pour les élèves de Secondaire 1 au Québec, l'élève doit pouvoir choisir parmi les verbes modèles et verbes fréquents incontournables du programme MEQ/PFEQ : les deux auxiliaires (*avoir*, *être*), les verbes réguliers et à particularités du 1er groupe (*aimer*, *commencer*, *manger*, *appeler*, *jeter*, *envoyer*, *payer*), les verbes du 2e groupe (*finir*, *choisir*, *agir*) et les verbes fréquents/irréguliers du 3e groupe (*aller*, *faire*, *dire*, *pouvoir*, *vouloir*, *devoir*, *savoir*, *venir*, *voir*, *prendre*, *mettre*, *partir*, *sortir*, *dormir*, *rendre*, *écrire*, *lire*, *boire*).
- **Public cible :** Élèves de Secondaire 1 au Québec (12-13 ans).
- **Bénéfice attendu :** Autonomie d'apprentissage (choix du verbe à travailler), entraînement ciblé sur 30 questions par session pour le verbe choisi, adaptation immédiate de l'aide-mémoire pour le verbe sélectionné.

---

## 2. 🔍 Périmètre (Scope)

### ✅ Ce qui est inclus (In-Scope)
- **Banque de verbes étendue dans `src/data/conjugationData.ts` :**
  - Au moins 25 verbes majeurs de Secondaire 1 (Avoir, Être, Aimer, Commencer, Manger, Appeler, Jeter, Envoyer, Payer, Finir, Choisir, Agir, Aller, Faire, Dire, Pouvoir, Vouloir, Devoir, Savoir, Venir, Voir, Prendre, Mettre, Partir, Sortir, Dormir, Rendre, Écrire, Lire, Boire, Attendre, Tenir).
  - Conjugaisons complètes sur les 15 temps du PFEQ (Indicatif présent, imparfait, passé simple, futur simple, passé composé, plus-que-parfait, futur antérieur, conditionnel présent, conditionnel passé, subjonctif présent, impératif présent, infinitif présent/passé, participe présent/passé).
  - Prise en charge des auxiliaires respectifs (*avoir* ou *être*) pour les temps composés (ex: *je suis allé*, *ils sont venus*, *j'ai mangé*).
- **Interface de sélection de verbes (`VerbSelector.tsx`) :**
  - Affichage au lancement du module de conjugaison ou lors d'un clic sur "Changer de verbe".
  - Recherche instantanée par nom de verbe.
  - Filtres par groupe (Tous, Auxiliaires, 1er groupe, 2e groupe, 3e groupe).
  - Badges informatifs (groupe, auxiliaire, particularités).
- **Session de quiz contextualisée (`ConjugationModule.tsx`) :**
  - Génération de 30 questions ciblées sur le verbe choisi.
  - Possibilité de changer de verbe à tout moment via la barre supérieure.
  - Possibilité de changer de verbe après la fin d'un quiz dans l'écran de résultats (`QuizResults.tsx`).
- **Aide-mémoire dynamique (`ConjugationTableModal.tsx`) :**
  - Mise à jour pour afficher le tableau des 15 temps pour le verbe actuellement sélectionné avec commutateur interne.

### ❌ Ce qui est exclu (Out-of-Scope)
- Verbes de Secondaire 3-5 ou verbes littéraires désuets non demandés au premier cycle du secondaire.
- Voix passive ou formes pronominales complexes avec accord du participe passé réfléchi (couvertes ultérieurement dans le module grammaire).

---

## 3. 📋 Spécifications Fonctionnelles & Expérience Utilisateur

### 3.1 Déroulement utilisateur
1. L'élève arrive dans la section Français / Conjugaison.
2. Un écran de sélection convivial lui permet de choisir le verbe qu'il souhaite réviser parmi 32 verbes classés par groupe et recherchables instantanément.
3. Après sélection, le quiz de 30 questions démarre avec les conjugaisons spécifiques à ce verbe.
4. L'élève peut :
   - Consulter l'aide-mémoire à tout moment (adapté au verbe choisi).
   - Cliquer sur "Changer de verbe" pour revenir au sélecteur.
   - À l'issue des 30 questions, recommencer le même verbe ou choisir un nouveau verbe.

---

## 4. ✅ Critères d'Acceptation

- [x] **Critère 1 :** 32 verbes prioritaires (dont Avoir et Être) sont disponibles avec conjugaisons complètes (67 formes) et exactes sur les 15 temps.
- [x] **Critère 2 :** L'élève choisit son verbe au début, et les 30 questions équilibrées sont générées pour ce verbe.
- [x] **Critère 3 :** L'aide-mémoire affiche les tables de conjugaison du verbe actif et permet de basculer de verbe.
- [x] **Critère 4 :** Oxlint ne rapporte aucun avertissement ni erreur (`0 warnings, 0 errors`).
- [x] **Critère 5 :** Le build TypeScript et Vite réussit avec succès (`npm.cmd run build`).

---

## 5. 🧪 Protocole de Validation Locale
```powershell
npm.cmd run lint
npm.cmd run build
```
