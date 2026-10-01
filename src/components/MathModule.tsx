import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
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
];

export const MathModule: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = MATH_QUESTIONS[currentIdx];

  const handleValidate = () => {
    if (!selectedOption || hasSubmitted) return;
    const isCorrect = selectedOption === q.correct;
    setHasSubmitted(true);
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
    setIsFinished(false);
  };

  return (
    <div className="module-container">
      <div className="subject-preview-header math-theme">
        <div className="preview-badge">
          <Calculator size={20} />
          <span>Matière : Mathématiques • Secondaire 1</span>
        </div>
        <h2>Entraînement Mathématiques — Défi Rapide</h2>
        <p>Découvre les concepts clés de secondaire 1 : priorité d'opérations, entiers et fractions.</p>
      </div>

      {!isFinished ? (
        <div className="question-card">
          <div className="question-card-header">
            <span className="tense-badge badge-math">{q.topic}</span>
            <span className="person-badge">Question {currentIdx + 1} / {MATH_QUESTIONS.length}</span>
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
            <div className="footer-left"></div>
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
                  {currentIdx + 1 < MATH_QUESTIONS.length ? 'Question suivante' : 'Terminer le défi'}
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="results-hero-card">
          <h3>Défi Mathématiques complété !</h3>
          <p className="metric-number">{score} / {MATH_QUESTIONS.length}</p>
          <p>Le module complet de mathématiques arrive très bientôt dans TrioLingo !</p>
          <button className="btn btn-primary" onClick={handleRestart}>
            <RotateCcw size={18} /> Recommencer le mini-test
          </button>
        </div>
      )}
    </div>
  );
};
