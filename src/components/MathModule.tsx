import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';

interface MathQuestion {
  id: number;
  prompt: string;
  topic: string;
  options: string[];
  correct: string;
  explanation: string;
}

const MATH_QUESTIONS: MathQuestion[] = [
  {
    id: 1,
    topic: 'Priorité des opérations (PEMDAS)',
    prompt: 'Calcule : 5 + 3 × 4',
    options: ['32', '17', '20', '12'],
    correct: '17',
    explanation: 'La multiplication est prioritaire sur l’addition : 3 × 4 = 12, puis 5 + 12 = 17.',
  },
  {
    id: 2,
    topic: 'Nombres entiers relatifs',
    prompt: 'Calcule : (-7) + (+12)',
    options: ['-5', '5', '-19', '19'],
    correct: '5',
    explanation: 'On soustrait les valeurs absolues et on garde le signe du plus grand : 12 - 7 = +5.',
  },
  {
    id: 3,
    topic: 'Fractions',
    prompt: 'Simplifie la fraction 18 / 24 à sa plus simple expression :',
    options: ['9 / 12', '3 / 4', '6 / 8', '2 / 3'],
    correct: '3 / 4',
    explanation: 'En divisant le numérateur et le dénominateur par leur PGCD (6), on obtient 3 / 4.',
  },
  {
    id: 4,
    topic: 'Priorité des opérations (PEMDAS)',
    prompt: 'Calcule : (12 - 4) × (2 + 3)',
    options: ['40', '22', '35', '45'],
    correct: '40',
    explanation: 'On calcule d’abord les parenthèses : (12 - 4) = 8 et (2 + 3) = 5. Ensuite 8 × 5 = 40.',
  },
  {
    id: 5,
    topic: 'Nombres entiers relatifs',
    prompt: 'Calcule : (-4) × (-6)',
    options: ['-24', '+24', '-10', '+10'],
    correct: '+24',
    explanation: 'Le produit de deux nombres de même signe (deux négatifs) donne un résultat positif : (-4) × (-6) = +24.',
  },
  {
    id: 6,
    topic: 'Fractions',
    prompt: 'Calcule : 2/5 + 1/10',
    options: ['3/15', '1/2', '3/10', '4/10'],
    correct: '1/2',
    explanation: 'On met au même dénominateur : 2/5 = 4/10. Donc 4/10 + 1/10 = 5/10, qui se simplifie en 1/2.',
  },
  {
    id: 7,
    topic: 'Pourcentages',
    prompt: 'Quel est 25% de 80 ?',
    options: ['15', '20', '25', '30'],
    correct: '20',
    explanation: '25% correspond au quart (1/4) d’une quantité : 80 ÷ 4 = 20.',
  },
  {
    id: 8,
    topic: 'Géométrie & Mesure',
    prompt: 'Quel est le périmètre d’un rectangle de longueur 8 cm et de largeur 5 cm ?',
    options: ['40 cm', '26 cm', '13 cm', '21 cm'],
    correct: '26 cm',
    explanation: 'Périmètre = 2 × (Longueur + Largeur) = 2 × (8 + 5) = 2 × 13 = 26 cm.',
  },
  {
    id: 9,
    topic: 'Géométrie & Mesure',
    prompt: 'Quelle est l’aire d’un triangle de base 10 cm et de hauteur 6 cm ?',
    options: ['60 cm²', '30 cm²', '16 cm²', '32 cm²'],
    correct: '30 cm²',
    explanation: 'Aire du triangle = (Base × Hauteur) ÷ 2 = (10 × 6) ÷ 2 = 60 ÷ 2 = 30 cm².',
  },
  {
    id: 10,
    topic: 'Nombres entiers relatifs',
    prompt: 'Calcule : (-15) - (-8)',
    options: ['-23', '-7', '+7', '+23'],
    correct: '-7',
    explanation: 'Soustraire un nombre négatif revient à ajouter son opposé : (-15) + 8 = -7.',
  },
  {
    id: 11,
    topic: 'Algèbre de base',
    prompt: 'Si x = 4, quelle est la valeur de l’expression 3x + 5 ?',
    options: ['12', '17', '27', '9'],
    correct: '17',
    explanation: 'On remplace x par 4 : (3 × 4) + 5 = 12 + 5 = 17.',
  },
  {
    id: 12,
    topic: 'Priorité des opérations (PEMDAS)',
    prompt: 'Calcule : 40 ÷ 5 × 2 + 3',
    options: ['7', '19', '11', '35'],
    correct: '19',
    explanation: 'La division et la multiplication ont la même priorité et s’exécutent de gauche à droite : 40 ÷ 5 = 8, puis 8 × 2 = 16, enfin 16 + 3 = 19.',
  },
];

interface MathAnswerRecord {
  question: MathQuestion;
  selected: string;
  isCorrect: boolean;
}

export const MathModule: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<MathAnswerRecord[]>([]);

  const q = MATH_QUESTIONS[currentIdx];

  const handleValidate = () => {
    if (!selectedOption || hasSubmitted) return;
    const isCorrect = selectedOption === q.correct;
    setHasSubmitted(true);
    setAnswers((prev) => [...prev, { question: q, selected: selectedOption, isCorrect }]);

    if (isCorrect) {
      soundManager.playCorrect();
      setScore((s) => s + 1);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < MATH_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setAnswers([]);
    setIsFinished(false);
  };

  useEffect(() => {
    if (isFinished) {
      soundManager.playVictory();
      const pct = (score / MATH_QUESTIONS.length) * 100;
      if (pct >= 70) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }
  }, [isFinished, score]);

  const progressPct = Math.round(((currentIdx + (hasSubmitted ? 1 : 0)) / MATH_QUESTIONS.length) * 100);

  return (
    <div className="module-container">
      <div className="subject-preview-header math-theme">
        <div className="preview-badge">
          <Calculator size={20} />
          <span>Matière : Mathématiques • Secondaire 1 (Québec)</span>
        </div>
        <h2>Entraînement Mathématiques — Défi des Fondamentaux</h2>
        <p>12 questions interactives couvrant les priorités d’opérations (PEMDAS), les entiers relatifs, les fractions, la géométrie et l’algèbre.</p>
      </div>

      {!isFinished ? (
        <div className="question-card">
          <div className="question-card-header">
            <span className="tense-badge badge-math">{q.topic}</span>
            <span className="person-badge">Question {currentIdx + 1} / {MATH_QUESTIONS.length}</span>
          </div>

          {/* Mini progress bar */}
          <div className="session-progress-track">
            <div
              className="session-progress-fill"
              style={{ width: `${progressPct}%`, backgroundColor: 'var(--blue)' }}
            />
          </div>

          <div className="question-prompt-box">
            <div className="prompt-icon-bubble">
              <Sparkles size={22} className="text-blue" />
            </div>
            <h2 className="question-prompt-text">{q.prompt}</h2>
          </div>

          <div className="choice-options-grid">
            {q.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              let cls = 'choice-tile';
              if (isSelected) cls += ' choice-selected';
              if (hasSubmitted) {
                if (opt === q.correct) cls += ' choice-correct';
                else if (isSelected) cls += ' choice-incorrect';
              }
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => !hasSubmitted && setSelectedOption(opt)}
                  disabled={hasSubmitted}
                >
                  <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="choice-text">{opt}</span>
                </button>
              );
            })}
          </div>

          {hasSubmitted && (
            <div className={`feedback-alert ${selectedOption === q.correct ? 'feedback-success' : 'feedback-error'}`}>
              <div className="feedback-icon-col">
                {selectedOption === q.correct ? (
                  <CheckCircle2 size={32} className="text-emerald" />
                ) : (
                  <XCircle size={32} className="text-rose" />
                )}
              </div>
              <div className="feedback-body-col">
                <h4 className="feedback-heading">
                  {selectedOption === q.correct ? 'Exactement ! Bravo !' : `Incorrect. La réponse était : ${q.correct}`}
                </h4>
                <p className="feedback-rule-desc">{q.explanation}</p>
              </div>
            </div>
          )}

          <div className="question-footer">
            <div className="footer-left">
              <span className="info-subtle">Score actuel : {score} point{score > 1 ? 's' : ''}</span>
            </div>
            <div className="footer-right">
              {!hasSubmitted ? (
                <button
                  className="btn btn-primary btn-large"
                  disabled={!selectedOption}
                  onClick={handleValidate}
                >
                  Valider
                </button>
              ) : (
                <button className="btn btn-primary btn-large" onClick={handleNext}>
                  {currentIdx + 1 < MATH_QUESTIONS.length ? 'Question suivante' : 'Voir mon bilan'}
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="results-wrapper">
          <div className="results-hero-card">
            <div className="results-trophy-icon">
              <Trophy size={48} className="text-amber" />
            </div>
            <h3>Défi Mathématiques Secondaire 1 Terminé !</h3>
            <p className="metric-number">{score} / {MATH_QUESTIONS.length}</p>
            <p className="results-subtext">
              Taux de réussite : <strong>{Math.round((score / MATH_QUESTIONS.length) * 100)}%</strong> — {score >= 10 ? 'Excellente maîtrise des notions clés !' : score >= 7 ? 'Bonne base, révise les quelques erreurs ci-dessous.' : 'Continue de t’entraîner pour consolider tes réflexes !'}
            </p>
            <button className="btn btn-primary btn-large" onClick={handleRestart}>
              <RotateCcw size={18} /> Recommencer le test
            </button>
          </div>

          {/* Question Review List */}
          <div className="answers-review-section">
            <h4 className="review-title">
              <BookOpen size={18} />
              Revue détaillée des questions ({answers.length})
            </h4>
            <div className="review-list">
              {answers.map((item, idx) => (
                <div
                  key={idx}
                  className={`review-item ${item.isCorrect ? 'review-item-correct' : 'review-item-wrong'}`}
                >
                  <div className="review-status-col">
                    {item.isCorrect ? (
                      <CheckCircle2 size={20} className="text-emerald" />
                    ) : (
                      <XCircle size={20} className="text-rose" />
                    )}
                  </div>
                  <div className="review-content-col">
                    <div className="review-top-row">
                      <span className="review-q-num">Q{idx + 1}. {item.question.topic}</span>
                      <span className="review-q-prompt">« {item.question.prompt} »</span>
                    </div>
                    <div className="review-ans-row">
                      <span className="review-label">Ta réponse :</span>
                      <span className={item.isCorrect ? 'text-emerald font-semibold' : 'text-rose font-semibold'}>
                        {item.selected}
                      </span>
                      {!item.isCorrect && (
                        <span className="review-correct-inline">
                          (Bonne réponse : <strong>{item.question.correct}</strong>)
                        </span>
                      )}
                    </div>
                    <p className="review-expl">{item.question.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
