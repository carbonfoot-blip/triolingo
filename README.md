# TrioLingo 🎓 — Application d'apprentissage pour le Secondaire 1 (Québec)

**TrioLingo** est une application web interactive et ludique conçue spécialement pour accompagner les élèves de **Secondaire 1** au Québec dans leurs apprentissages fondamentaux.

L'application est structurée autour de trois grandes matières du programme québécois :
1. 📚 **Français** *(Conjugaison complète sur 15 temps avec un sélecteur de 32 verbes prioritaires de Secondaire 1 : Avoir, Être, verbes des 1er, 2e et 3e groupes + aide-mémoire dynamique)*
2. 📐 **Mathématiques** :
   - **Chapitre 1 : Opérations fondamentales & Priorités (12 questions)** (PEMDAS, fractions, périmètres et aires)
   - **Chapitre 2 : Les Nombres Entiers Relatifs (52 questions)** (Positifs/négatifs, opposés, droites numériques, ordre croissant/décroissant, thermomètres, problèmes concrets comme l'oiseau en plongeon, méthode des jetons & paires nulles, additions, soustractions et repérage dans les 4 quadrants du plan cartésien)
3. 🌍 **Géographie** *(Territoires urbains, régions du Québec, biomes et fleuve Saint-Laurent)*

---

## 🎯 Module Français — Conjugaison multiverbes (32 verbes de Secondaire 1)

Le programme de Secondaire 1 exige la maîtrise des verbes modèles fondamentaux et des verbes fréquents. L'élève choisit son verbe au début de la session parmi **32 verbes incontournables** (les deux auxiliaires *avoir* et *être*, les verbes du 1er groupe avec leurs particularités *-cer*, *-ger*, *-eler*, *-eter*, *-oyer*, *-ayer*, le modèle du 2e groupe en *-issant*, et les verbes fréquents et irréguliers du 3e groupe). Chaque verbe est couvert à travers les **15 temps de verbe** clés du MEQ/PFEQ :

| Mode | Temps de verbe inclus |
| :--- | :--- |
| **Indicatif** | Présent, Passé composé, Imparfait, Plus-que-parfait, Passé simple, Futur simple, Futur antérieur |
| **Conditionnel** | Présent, Passé |
| **Subjonctif** | Présent |
| **Impératif** | Présent |
| **Infinitif** | Présent, Passé |
| **Participe** | Présent, Passé |

### 🚀 Fonctionnalités clés :
- **30 questions aléatoires équilibrées** à chaque session, formulées naturellement (ex. : *"Quel est le conditionnel présent du verbe avoir à la deuxième personne du pluriel ?"*).
- **Deux modes de réponse :**
  - **Saisie au clavier (avec barre d'accents rapides intégrée)** : Idéal pour les Chromebooks ou claviers anglophones pour insérer facilement *é, è, ê, ë, à, â, î, ï, ô, û, ù, ç, '* .
  - **Choix multiples (QCM)** : 4 options interactives pour réviser rapidement.
- **Validation intelligente :** Accepte aussi bien la forme simple (`auriez`) que la forme avec pronom (`vous auriez`), et tolère les subtilités typographiques.
- **Rétroaction pédagogique immédiate :** Sonorisation Web Audio douce, affichage de la bonne réponse et rappel explicatif de la règle du temps.
- **Gamification :** Barre de progression, suivi des séries (*Streak 🔥*), points d'expérience (*XP ⭐*).
- **Rapport de fin de test complet :** Score sur 30, pourcentage, analyse de maîtrise par temps de verbe, revue détaillée question par question.
- **Bouton Régénérer :** Génère un tout nouveau test de 30 questions variées en un clic.
- **Aide-mémoire interactif :** Tableau de consultation complet de l'ensemble des 15 temps avec recherche et filtrage par mode.

---

## 🛠️ Stack technique
- **Framework :** React 19 + TypeScript + Vite
- **Styling :** Vanilla CSS moderne (design tokens, glassmorphism, micro-animations, responsive)
- **Audio :** Synthétiseur Web Audio API natif (sans dépendance externe)
- **Célébrations :** `canvas-confetti`
- **Icônes :** `lucide-react`

---

## 💻 Développement local

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build
```

---

## 🌐 Déploiement

Cette application est déployée sur **GitHub Pages** via GitHub Actions.
Accès public : [https://carbonfoot-blip.github.io/triolingo/](https://carbonfoot-blip.github.io/triolingo/)
