import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  BookOpen,
  BookCheck,
  Zap,
  Target,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { MATH_CHAPTER_1, MATH_CHAPTER_2, type MathQuestion } from '../data/mathQuestions';

interface MathAnswerRecord {
  question: MathQuestion;
  selected: string;
  isCorrect: boolean;
}

type ChapterId = 1 | 2;
type SessionMode = 'quick' | 'medium' | 'all';

function shuffleList<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function getQuestionsForSession(chapter: ChapterId, mode: SessionMode): MathQuestion[] {
  const source = chapter === 1 ? MATH_CHAPTER_1 : MATH_CHAPTER_2;
  const withShuffledOptions = source.map((q) => ({
    ...q,
    options: shuffleList([...q.options]),
  }));
  const shuffled = shuffleList(withShuffledOptions);

  if (mode === 'quick') {
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }
  if (mode === 'medium') {
    return shuffled.slice(0, Math.min(25, shuffled.length));
  }
  return shuffled; // 'all'
}

export const MathModule: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<ChapterId>(2);
  const [sessionMode, setSessionMode] = useState<SessionMode>('quick');

  const [questions, setQuestions] = useState<MathQuestion[]>(() =>
    getQuestionsForSession(2, 'quick')
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<MathAnswerRecord[]>([]);

  const restartQuiz = (chap: ChapterId = selectedChapter, mode: SessionMode = sessionMode) => {
    const newQuestions = getQuestionsForSession(chap, mode);
    setQuestions(newQuestions);
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setStreak(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const handleSelectChapter = (chap: ChapterId) => {
    setSelectedChapter(chap);
    restartQuiz(chap, sessionMode);
  };

  const handleSelectMode = (mode: SessionMode) => {
    setSessionMode(mode);
    restartQuiz(selectedChapter, mode);
  };

  const q = questions[currentIdx] || questions[0];

  const handleValidate = () => {
    if (!selectedOption || hasSubmitted || !q) return;
    const isCorrect = selectedOption === q.correct;
    setHasSubmitted(true);
    setAnswers((prev) => [...prev, { question: q, selected: selectedOption, isCorrect }]);

    if (isCorrect) {
      soundManager.playCorrect();
      setScore((s) => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 5 === 0) {
        soundManager.playStreak();
      }
    } else {
      soundManager.playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    if (isFinished && questions.length > 0) {
      soundManager.playVictory();
      const pct = (score / questions.length) * 100;
      if (pct >= 70) {
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }
  }, [isFinished, score, questions.length]);

  const progressPct =
    questions.length > 0
      ? Math.round(((currentIdx + (hasSubmitted ? 1 : 0)) / questions.length) * 100)
      : 0;

  return (
    <div className="module-container">
      {/* Chapter Selection Bar */}
      <div className="submodules-bar" style={{ marginBottom: '0.25rem' }}>
        <div className="submodule-tabs">
          <button
            className={`submodule-tab ${selectedChapter === 1 ? 'active' : ''}`}
            onClick={() => handleSelectChapter(1)}
          >
            <BookCheck size={16} />
            <span>Chapitre 1 : Opérations & Fondamentaux</span>
            <span
              className="badge-soon"
              style={{
                background: selectedChapter === 1 ? '#e0f2fe' : '#e2e8f0',
                color: selectedChapter === 1 ? '#0369a1' : '#64748b',
              }}
            >
              12 Qs
            </span>
          </button>

          <button
            className={`submodule-tab ${selectedChapter === 2 ? 'active' : ''}`}
            onClick={() => handleSelectChapter(2)}
          >
            <Calculator size={16} />
            <span>Chapitre 2 : Nombres entiers relatifs</span>
            <span
              className="badge-soon"
              style={{
                background: selectedChapter === 2 ? '#ecfdf5' : '#e2e8f0',
                color: selectedChapter === 2 ? '#047857' : '#64748b',
              }}
            >
              52 Qs
            </span>
            <span className="live-dot" />
          </button>
        </div>

        <div className="curriculum-tag">
          <Sparkles size={14} className="text-amber" />
          <span>Programme Québec • Secondaire 1</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="subject-preview-header math-theme">
        <div className="preview-badge">
          <Calculator size={20} />
          <span>
            Mathématiques • Secondaire 1 •{' '}
            {selectedChapter === 1
              ? 'Chapitre 1 : Fondamentaux'
              : 'Chapitre 2 : Les Nombres Entiers Relatifs'}
          </span>
        </div>
        <h2>
          {selectedChapter === 1
            ? 'Chapitre 1 — Priorité des opérations, entiers et géométrie'
            : 'Chapitre 2 — Nombres positifs, opposés, droite numérique, thermomètres, jetons & plan cartésien'}
        </h2>
        <p>
          {selectedChapter === 1
            ? 'Test de révision sur le calcul de base, la priorité PEMDAS, les fractions et périmètres.'
            : 'Explore les entiers relatifs sous toutes leurs formes : opposés, thermomètres, problèmes de plongée, méthode des jetons, calculs et repérage dans les 4 quadrants.'}
        </p>
      </div>

      {/* Session Length Controls & HUD */}
      {!isFinished && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            background: '#ffffff',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              <Target size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Longueur de session :
            </span>
            <button
              className={`tab-btn ${sessionMode === 'quick' ? 'active' : ''}`}
              style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              onClick={() => handleSelectMode('quick')}
              title="10 questions sélectionnées au hasard"
            >
              Défi rapide (10 Qs)
            </button>
            {selectedChapter === 2 && (
              <button
                className={`tab-btn ${sessionMode === 'medium' ? 'active' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                onClick={() => handleSelectMode('medium')}
                title="25 questions variées"
              >
                Approfondi (25 Qs)
              </button>
            )}
            <button
              className={`tab-btn ${sessionMode === 'all' ? 'active' : ''}`}
              style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              onClick={() => handleSelectMode('all')}
              title="Toutes les questions du chapitre"
            >
              Complet ({selectedChapter === 1 ? '12' : '52'} Qs)
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {streak > 1 && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 800,
                  color: '#ea580c',
                  fontSize: '0.88rem',
                }}
              >
                <Flame size={16} /> {streak} de suite !
              </span>
            )}
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Score : <strong style={{ color: 'var(--primary)' }}>{score}</strong> / {questions.length}
            </span>
          </div>
        </div>
      )}

      {/* Main Question Card */}
      {!isFinished && q ? (
        <div className="question-card">
          <div className="question-card-header">
            <span className="tense-badge badge-math">{q.topic}</span>
            <span className="person-badge">
              Question {currentIdx + 1} / {questions.length}
            </span>
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
            <div
              className={`feedback-alert ${
                selectedOption === q.correct ? 'feedback-success' : 'feedback-error'
              }`}
            >
              <div className="feedback-icon-col">
                {selectedOption === q.correct ? (
                  <CheckCircle2 size={32} className="text-emerald" />
                ) : (
                  <XCircle size={32} className="text-rose" />
                )}
              </div>
              <div className="feedback-body-col">
                <h4 className="feedback-heading">
                  {selectedOption === q.correct
                    ? 'Exactement ! Bravo !'
                    : `Incorrect. La bonne réponse était : ${q.correct}`}
                </h4>
                <p className="feedback-rule-desc">{q.explanation}</p>
              </div>
            </div>
          )}

          <div className="question-footer">
            <div className="footer-left">
              <span className="info-subtle">
                {selectedChapter === 2
                  ? 'Chapitre 2 : Nombres entiers relatifs'
                  : 'Chapitre 1 : Opérations fondamentales'}
              </span>
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
                  {currentIdx + 1 < questions.length ? 'Question suivante' : 'Voir mon bilan'}
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : isFinished ? (
        <div className="results-wrapper">
          <div className="results-hero-card">
            <div className="results-trophy-icon">
              <Trophy size={48} className="text-amber" />
            </div>
            <h3>
              {selectedChapter === 2
                ? 'Chapitre 2 : Nombres Entiers Relatifs — Défi Terminé !'
                : 'Chapitre 1 : Fondamentaux — Défi Terminé !'}
            </h3>
            <p className="metric-number">
              {score} / {questions.length}
            </p>
            <p className="results-subtext">
              Taux de réussite :{' '}
              <strong>{Math.round((score / questions.length) * 100)}%</strong> —{' '}
              {score / questions.length >= 0.85
                ? 'Excellente maîtrise ! Tu as assimilé les concepts clés du chapitre avec brio.'
                : score / questions.length >= 0.65
                ? 'Bonne compréhension ! Révise les quelques questions manquées ci-dessous.'
                : 'Continue de t’entraîner pour automatiser les règles de signes et de repérage !'}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '1rem',
              }}
            >
              <button
                className="btn btn-primary btn-large"
                onClick={() => restartQuiz(selectedChapter, sessionMode)}
              >
                <RotateCcw size={18} /> Recommencer ce chapitre
              </button>
              {selectedChapter === 1 ? (
                <button
                  className="btn btn-outline"
                  onClick={() => handleSelectChapter(2)}
                  style={{
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    background: '#ffffff',
                  }}
                >
                  <Zap size={18} /> Passer au Chapitre 2 (Entiers relatifs)
                </button>
              ) : (
                <button
                  className="btn btn-outline"
                  onClick={() => handleSelectChapter(1)}
                  style={{
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    background: '#ffffff',
                  }}
                >
                  <BookCheck size={18} /> Réviser le Chapitre 1
                </button>
              )}
            </div>
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
                  className={`review-item ${
                    item.isCorrect ? 'review-item-correct' : 'review-item-wrong'
                  }`}
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
                      <span className="review-q-num">
                        Q{idx + 1}. {item.question.topic}
                      </span>
                      <span className="review-q-prompt">« {item.question.prompt} »</span>
                    </div>
                    <div className="review-ans-row">
                      <span className="review-label">Ta réponse :</span>
                      <span
                        className={
                          item.isCorrect ? 'text-emerald font-semibold' : 'text-rose font-semibold'
                        }
                      >
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
      ) : null}
    </div>
  );
};
