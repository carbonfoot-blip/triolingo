import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle,
  XCircle,
  HelpCircle,
  Keyboard,
  ListFilter,
  Flame,
  Zap,
  RotateCcw,
} from 'lucide-react';
import {
  generate30Questions,
  isAnswerCorrect,
  VERB_AVOIR,
} from '../data/conjugationData';
import type { GeneratedQuestion } from '../data/conjugationData';
import { QuizResults, type AnswerRecord } from './QuizResults';
import { soundManager } from '../utils/soundEffects';

interface ConjugationModuleProps {
  onOpenReference: () => void;
  onUpdateGlobalStats?: (streak: number, xp: number) => void;
}

export const ConjugationModule: React.FC<ConjugationModuleProps> = ({
  onOpenReference,
}) => {
  // Questions State
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  // Input & Mode State
  const [userInput, setUserInput] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'text' | 'choice'>('text');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean>(false);

  // Gamification State
  const [streak, setStreak] = useState<number>(0);
  const [sessionXP, setSessionXP] = useState<number>(0);

  // Focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize 30 questions
  const initializeQuiz = () => {
    const qList = generate30Questions(VERB_AVOIR);
    setQuestions(qList);
    setCurrentIndex(0);
    setAnswers([]);
    setUserInput('');
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCurrentCorrect(false);
    setStreak(0);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  useEffect(() => {
    initializeQuiz();
  }, []);

  const currentQ = questions[currentIndex];
  const isFinished = questions.length > 0 && currentIndex >= questions.length;

  const handleValidate = () => {
    if (hasSubmitted || !currentQ) return;

    const answerToCheck = inputMode === 'text' ? userInput : selectedOption || '';
    if (!answerToCheck.trim()) return;

    const correct = isAnswerCorrect(answerToCheck, currentQ);
    setIsCurrentCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      soundManager.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setSessionXP((prev) => prev + 10);
      if (newStreak % 5 === 0) {
        soundManager.playStreak();
      }
    } else {
      soundManager.playWrong();
      setStreak(0);
    }

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        userAnswer: answerToCheck,
        isCorrect: correct,
      },
    ]);
  };

  const handleNext = () => {
    setHasSubmitted(false);
    setUserInput('');
    setSelectedOption(null);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleInsertChar = (char: string) => {
    setUserInput((prev) => prev + char);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!hasSubmitted) {
        handleValidate();
      } else {
        handleNext();
      }
    }
  };

  if (isFinished) {
    return (
      <QuizResults
        answers={answers}
        onRegenerate={initializeQuiz}
        onOpenReference={onOpenReference}
      />
    );
  }

  if (!currentQ) {
    return <div className="loading-state">Génération des 30 questions de conjugaison...</div>;
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const accentChars = ['é', 'è', 'ê', 'ë', 'à', 'â', 'î', 'ï', 'ô', 'û', 'ù', 'ç', "'"];

  return (
    <div className="module-container">
      {/* Top Banner & Verb Selector */}
      <div className="module-top-bar">
        <div className="verb-select-pill">
          <span className="pill-prefix">Verbe étudié :</span>
          <span className="pill-verb">avoir</span>
          <span className="badge-poc">POC Sec 1</span>
        </div>

        <div className="hud-stats-row">
          <div className="stat-chip streak-chip" title="Série de bonnes réponses">
            <Flame size={18} className={streak > 0 ? 'text-amber animate-pulse' : 'text-muted'} />
            <span>{streak} à la suite</span>
          </div>

          <div className="stat-chip xp-chip" title="Points d'expérience">
            <Zap size={18} className="text-yellow" />
            <span>{sessionXP} XP</span>
          </div>

          <button
            className="aide-memoire-btn"
            onClick={onOpenReference}
            title="Consulter le tableau complet des 15 temps"
          >
            <BookOpen size={16} />
            <span>Aide-mémoire</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress-bar-wrapper">
        <div className="progress-info-row">
          <span className="progress-counter">
            Question <strong>{currentIndex + 1}</strong> sur <strong>{questions.length}</strong>
          </span>
          <span className="progress-tense-tag">
            {currentQ.category} • {currentQ.tenseLabel}
          </span>
        </div>
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="question-card">
        {/* Card Header */}
        <div className="question-card-header">
          <div className="badge-row">
            <span className={`tense-badge badge-${currentQ.category.toLowerCase()}`}>
              {currentQ.tenseLabel}
            </span>
            {currentQ.personLabel !== 'Forme impersonnelle' && (
              <span className="person-badge">{currentQ.personLabel}</span>
            )}
          </div>
          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${inputMode === 'text' ? 'active' : ''}`}
              onClick={() => setInputMode('text')}
              title="Écrire la réponse au clavier"
            >
              <Keyboard size={15} />
              <span>Clavier</span>
            </button>
            <button
              className={`mode-btn ${inputMode === 'choice' ? 'active' : ''}`}
              onClick={() => setInputMode('choice')}
              title="Choisir parmi 4 options"
            >
              <ListFilter size={15} />
              <span>Choix multiples</span>
            </button>
          </div>
        </div>

        {/* Prompt Question */}
        <div className="question-prompt-box">
          <div className="prompt-icon-bubble">
            <Sparkles size={22} className="text-primary" />
          </div>
          <h2 className="question-prompt-text">{currentQ.prompt}</h2>
        </div>

        {/* Input Area */}
        <div className="interactive-input-area">
          {inputMode === 'text' ? (
            <div className="text-input-section">
              <div className="input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  className={`styled-answer-input ${
                    hasSubmitted
                      ? isCurrentCorrect
                        ? 'input-success'
                        : 'input-error'
                      : ''
                  }`}
                  placeholder="Tape la forme conjuguée ici (ex: auriez ou vous auriez)..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={hasSubmitted}
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              {/* Accent Helpers Bar */}
              <div className="accent-bar-wrapper">
                <span className="accent-bar-label">Accents rapides :</span>
                <div className="accent-keys-row">
                  {accentChars.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      className="accent-key-btn"
                      onClick={() => handleInsertChar(ch)}
                      disabled={hasSubmitted}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="choice-options-grid">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOption === opt;
                let optionClass = 'choice-tile';
                if (isSelected) optionClass += ' choice-selected';
                if (hasSubmitted) {
                  if (isAnswerCorrect(opt, currentQ)) {
                    optionClass += ' choice-correct';
                  } else if (isSelected && !isCurrentCorrect) {
                    optionClass += ' choice-incorrect';
                  }
                }

                return (
                  <button
                    key={i}
                    className={optionClass}
                    onClick={() => !hasSubmitted && setSelectedOption(opt)}
                    disabled={hasSubmitted}
                  >
                    <span className="choice-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="choice-text">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Feedback Zone after submission */}
        {hasSubmitted && (
          <div
            className={`feedback-alert ${
              isCurrentCorrect ? 'feedback-success' : 'feedback-error'
            }`}
          >
            <div className="feedback-icon-col">
              {isCurrentCorrect ? (
                <CheckCircle size={32} className="text-emerald" />
              ) : (
                <XCircle size={32} className="text-rose" />
              )}
            </div>
            <div className="feedback-body-col">
              <h4 className="feedback-heading">
                {isCurrentCorrect
                  ? 'Excellente réponse ! +10 XP 🎉'
                  : 'Pas tout à fait ! Voici la bonne forme :'}
              </h4>
              <div className="feedback-correct-answer">
                <strong>{currentQ.fullDisplay}</strong>
                {currentQ.personLabel !== 'Forme impersonnelle' && (
                  <span className="alt-mention"> (forme : <em>{currentQ.targetAnswer}</em>)</span>
                )}
              </div>
              <p className="feedback-rule-desc">
                <HelpCircle size={15} className="inline-icon" />
                <strong>Rappel {currentQ.tenseLabel} :</strong> {currentQ.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="question-footer">
          <div className="footer-left">
            <button
              className="btn btn-ghost"
              onClick={initializeQuiz}
              title="Recommencer avec 30 nouvelles questions"
            >
              <RotateCcw size={16} />
              Recommencer
            </button>
          </div>

          <div className="footer-right">
            {!hasSubmitted ? (
              <button
                className="btn btn-primary btn-large btn-glow"
                onClick={handleValidate}
                disabled={
                  (inputMode === 'text' && !userInput.trim()) ||
                  (inputMode === 'choice' && !selectedOption)
                }
              >
                Valider la réponse
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                className="btn btn-primary btn-large btn-glow"
                onClick={handleNext}
                autoFocus
              >
                {currentIndex + 1 < questions.length
                  ? 'Question suivante'
                  : 'Voir mes résultats (30/30)'}
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
