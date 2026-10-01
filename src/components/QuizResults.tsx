import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
} from 'lucide-react';
import type { GeneratedQuestion, TenseKey } from '../data/conjugationData';
import { TENSES } from '../data/conjugationData';
import { soundManager } from '../utils/soundEffects';

export interface AnswerRecord {
  question: GeneratedQuestion;
  userAnswer: string;
  isCorrect: boolean;
}

interface QuizResultsProps {
  answers: AnswerRecord[];
  onRegenerate: () => void;
  onOpenReference: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  answers,
  onRegenerate,
  onOpenReference,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const totalQuestions = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    soundManager.playVictory();
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'],
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [percentage]);

  // Breakdown by tense
  const tenseStats: Record<TenseKey, { total: number; correct: number }> = {} as Record<
    TenseKey,
    { total: number; correct: number }
  >;

  answers.forEach((rec) => {
    const t = rec.question.tense;
    if (!tenseStats[t]) {
      tenseStats[t] = { total: 0, correct: 0 };
    }
    tenseStats[t].total += 1;
    if (rec.isCorrect) {
      tenseStats[t].correct += 1;
    }
  });

  const getEncouragement = () => {
    if (percentage === 100) return { title: 'Score parfait ! 🎉', desc: "Tu maîtrises le verbe avoir sur le bout des doigts !" };
    if (percentage >= 90) return { title: 'Impressionnant ! 🌟', desc: "Une performance digne d'un champion du Secondaire 1 !" };
    if (percentage >= 75) return { title: 'Très bon résultat ! 👏', desc: "Tu as de très bonnes bases. Quelques révisions et tu auras 100% !" };
    if (percentage >= 50) return { title: 'Bon effort ! 👍', desc: "Tu es sur la bonne voie. Prends le temps de revoir les temps plus difficiles !" };
    return { title: 'Continue de t’entraîner ! 💪', desc: "La conjugaison demande de la répétition. Consulte l'aide-mémoire et recommence !" };
  };

  const encouragement = getEncouragement();

  return (
    <div className="results-container">
      {/* Top Banner Card */}
      <div className="results-hero-card">
        <div className="trophy-wrapper">
          <div className="trophy-badge">
            <Trophy size={48} className="trophy-icon" />
          </div>
        </div>

        <h2 className="results-title">{encouragement.title}</h2>
        <p className="results-desc">{encouragement.desc}</p>

        <div className="score-summary-grid">
          <div className="score-metric-box main-metric">
            <span className="metric-label">Score Final</span>
            <div className="metric-value-row">
              <span className="metric-number">{correctCount}</span>
              <span className="metric-total">/ {totalQuestions}</span>
            </div>
            <span className="metric-percent">{percentage}% de réussite</span>
          </div>

          <div className="score-metric-box">
            <span className="metric-label">Points XP Gagnés</span>
            <div className="metric-value-row text-amber">
              <Zap size={24} />
              <span className="metric-number">+{correctCount * 10}</span>
            </div>
            <span className="metric-sub">10 XP par bonne réponse</span>
          </div>

          <div className="score-metric-box">
            <span className="metric-label">Évaluation Sec 1</span>
            <div className="metric-value-row text-emerald">
              <Award size={24} />
              <span className="metric-grade">
                {percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : 'Pratique requise'}
              </span>
            </div>
            <span className="metric-sub">Conjugaison Verbe Avoir</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-actions">
          <button className="btn btn-primary btn-large btn-glow" onClick={onRegenerate}>
            <RotateCcw size={20} />
            Régénérer 30 nouvelles questions
          </button>
          <button className="btn btn-secondary btn-large" onClick={onOpenReference}>
            <BookOpen size={20} />
            Consulter l'aide-mémoire complet
          </button>
        </div>
      </div>

      {/* Tense Performance Breakdown */}
      <div className="results-breakdown-card">
        <h3 className="section-card-title">Analyse par temps de verbe</h3>
        <p className="section-card-subtitle">
          Vérifie les temps que tu maîtrises et ceux à perfectionner :
        </p>

        <div className="tense-stats-grid">
          {(Object.keys(tenseStats) as TenseKey[]).map((tKey) => {
            const stat = tenseStats[tKey];
            const tenseInfo = TENSES[tKey];
            const tensePercent = Math.round((stat.correct / stat.total) * 100);
            const isGood = tensePercent >= 75;

            return (
              <div key={tKey} className={`tense-stat-tile ${isGood ? 'tile-success' : 'tile-warning'}`}>
                <div className="tense-stat-header">
                  <span className="tense-name">{tenseInfo.label}</span>
                  <span className="tense-ratio">
                    {stat.correct}/{stat.total}
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div
                    className={`progress-bar-fill ${isGood ? 'fill-emerald' : 'fill-amber'}`}
                    style={{ width: `${tensePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordion Review Answers */}
      <div className="results-review-card">
        <button
          className="review-toggle-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="toggle-label-wrap">
            <span className="review-title">Revue détaillée des 30 questions</span>
            <span className="review-count">
              ({correctCount} réussies • {totalQuestions - correctCount} erreurs)
            </span>
          </div>
          {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showDetails && (
          <div className="review-list">
            {answers.map((item, idx) => (
              <div
                key={idx}
                className={`review-item ${item.isCorrect ? 'item-correct' : 'item-wrong'}`}
              >
                <div className="review-status-col">
                  {item.isCorrect ? (
                    <CheckCircle2 size={24} className="text-emerald" />
                  ) : (
                    <XCircle size={24} className="text-rose" />
                  )}
                  <span className="question-num-tag">Q{idx + 1}</span>
                </div>

                <div className="review-content-col">
                  <p className="review-prompt">{item.question.prompt}</p>
                  <div className="review-answers-grid">
                    <div>
                      <span className="answer-badge-label">Ta réponse :</span>
                      <span className={`answer-val ${item.isCorrect ? 'val-good' : 'val-bad'}`}>
                        {item.userAnswer || '(vide)'}
                      </span>
                    </div>
                    {!item.isCorrect && (
                      <div>
                        <span className="answer-badge-label">Bonne réponse attendue :</span>
                        <span className="answer-val val-expected">
                          {item.question.fullDisplay} (ou <em>{item.question.targetAnswer}</em>)
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="review-explanation">
                    <span className="exp-label">{item.question.tenseLabel} :</span> {item.question.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
