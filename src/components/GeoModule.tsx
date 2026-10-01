import React, { useState } from 'react';
import { Globe, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface GeoQuestion {
  id: number;
  prompt: string;
  topic: string;
  options: string[];
  correct: string;
  explanation: string;
}

const GEO_QUESTIONS: GeoQuestion[] = [
  {
    id: 1,
    topic: 'Géographie du Québec',
    prompt: 'Quelle est la capitale nationale de la province de Québec ?',
    options: ['Montréal', 'Québec', 'Gatineau', 'Trois-Rivières'],
    correct: 'Québec',
    explanation: 'La ville de Québec est la capitale administrative et politique du Québec.',
  },
  {
    id: 2,
    topic: 'Territoire urbain',
    prompt: 'Quel fleuve majeur borde les villes de Montréal, Trois-Rivières et Québec ?',
    options: ['Le fleuve Saint-Laurent', 'La rivière Saguenay', 'La rivière des Outaouais', 'Le fleuve Richelieu'],
    correct: 'Le fleuve Saint-Laurent',
    explanation: 'Le Saint-Laurent est la voie maritime principale reliant les Grands Lacs à l’océan Atlantique.',
  },
  {
    id: 3,
    topic: 'Territoires régionaux',
    prompt: 'Dans quel biome retrouve-t-on le pergélisol et peu d’arbres dans le Grand Nord québécois ?',
    options: ['La forêt boréale (taïga)', 'La toundra', 'La forêt mixte', 'La savane'],
    correct: 'La toundra',
    explanation: 'La toundra arctique est caractérisée par un sous-sol gelé en permanence (pergélisol) et une végétation basse.',
  },
];

export const GeoModule: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = GEO_QUESTIONS[currentIdx];

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
    if (currentIdx + 1 < GEO_QUESTIONS.length) {
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
      <div className="subject-preview-header geo-theme">
        <div className="preview-badge">
          <Globe size={20} />
          <span>Matière : Géographie • Secondaire 1</span>
        </div>
        <h2>Entraînement Géographie — Défi Territoires</h2>
        <p>Explore les territoires du Québec, les villes et les concepts géographiques de secondaire 1.</p>
      </div>

      {!isFinished ? (
        <div className="question-card">
          <div className="question-card-header">
            <span className="tense-badge badge-geo">{q.topic}</span>
            <span className="person-badge">Question {currentIdx + 1} / {GEO_QUESTIONS.length}</span>
          </div>

          <div className="question-prompt-box">
            <div className="prompt-icon-bubble">
              <Sparkles size={22} className="text-emerald" />
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
                  {selectedOption === q.correct ? 'Bien vu ! Bonne réponse !' : `Oups. La bonne réponse est : ${q.correct}`}
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
                  {currentIdx + 1 < GEO_QUESTIONS.length ? 'Question suivante' : 'Terminer le défi'}
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="results-hero-card">
          <h3>Défi Géographie complété !</h3>
          <p className="metric-number">{score} / {GEO_QUESTIONS.length}</p>
          <p>Le module complet de géographie arrive très bientôt dans TrioLingo !</p>
          <button className="btn btn-primary" onClick={handleRestart}>
            <RotateCcw size={18} /> Recommencer le mini-test
          </button>
        </div>
      )}
    </div>
  );
};
