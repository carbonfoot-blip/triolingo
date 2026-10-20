import React, { useState, useEffect } from 'react';
import { Globe, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  {
    id: 4,
    topic: 'Territoire urbain',
    prompt: 'Quelle est la métropole la plus populeuse et le principal pôle économique du Québec ?',
    options: ['Québec', 'Montréal', 'Laval', 'Sherbrooke'],
    correct: 'Montréal',
    explanation: 'Montréal regroupe près de la moitié de la population métropolitaine du Québec et constitue sa métropole économique.',
  },
  {
    id: 5,
    topic: 'Territoire urbain',
    prompt: 'Quel terme désigne le phénomène où la ville s’étend sur les terres agricoles et les espaces naturels périphériques ?',
    options: ['L’étalement urbain', 'L’exode rural', 'La déforestation', 'L’îlot de fraîcheur'],
    correct: 'L’étalement urbain',
    explanation: 'L’étalement urbain se caractérise par la multiplication des banlieues et la dépendance à l’automobile.',
  },
  {
    id: 6,
    topic: 'Hydrographie & Voie maritime',
    prompt: 'Quels sont les trois tronçons majeurs du fleuve Saint-Laurent, de l’amont vers l’aval ?',
    options: [
      'Le fleuve fluvial, l’estuaire et le golfe',
      'Le delta, le fjord et le bassin',
      'Le lac Saint-Pierre, les rapides et la baie',
      'L’affluent, le canal et l’océan',
    ],
    correct: 'Le fleuve fluvial, l’estuaire et le golfe',
    explanation: 'Le Saint-Laurent se divise chronologiquement en fleuve (eau douce), estuaire (mélange eau douce/salée) et golfe (marin).',
  },
  {
    id: 7,
    topic: 'Ressources naturelles',
    prompt: 'Quel grand ensemble géologique recouvre près de 90 % du territoire québécois et regorge de gisements miniers ?',
    options: ['Le Bouclier canadien', 'Les Appalaches', 'Les Basses-terres du Saint-Laurent', 'La plaine côtière'],
    correct: 'Le Bouclier canadien',
    explanation: 'Le Bouclier canadien est l’une des plus vieilles formations rocheuses de la planète, riche en fer, or, cuivre et cours d’eau.',
  },
  {
    id: 8,
    topic: 'Ressources & Énergie',
    prompt: 'Dans quelle région du nord québécois se trouve le gigantesque complexe hydroélectrique La Grande (Baie-James) ?',
    options: ['Le Nord-du-Québec', 'La Gaspésie', 'L’Estrie', 'La Mauricie'],
    correct: 'Le Nord-du-Québec',
    explanation: 'Le complexe hydroélectrique de la Baie-James dans le Nord-du-Québec produit une grande partie de l’électricité québécoise.',
  },
  {
    id: 9,
    topic: 'Territoires autochtones',
    prompt: 'Quel peuple autochtone habite traditionnellement les communautés côtières du Nunavik au nord du Québec ?',
    options: ['Les Inuits', 'Les Mohawks', 'Les Hurons-Wendat', 'Les Micmacs'],
    correct: 'Les Inuits',
    explanation: 'Les Inuits vivent dans 14 villages nordiques du Nunavik, au nord du 55e parallèle.',
  },
  {
    id: 10,
    topic: 'Risques naturels',
    prompt: 'Quel risque naturel saisonnier touche fréquemment les rives du Québec au printemps à la fonte des neiges ?',
    options: ['Les inondations (crues)', 'Les tsunamis', 'Les éruptions volcaniques', 'Les ouragans tropicaux'],
    correct: 'Les inondations (crues)',
    explanation: 'Les crues printanières et les embâcles de glace provoquent régulièrement des inondations sur les rives fluviales.',
  },
  {
    id: 11,
    topic: 'Territoire urbain',
    prompt: 'Comment nomme-t-on l’augmentation localisée des températures en ville causée par les surfaces asphaltées et le manque de végétation ?',
    options: ['Un îlot de chaleur', 'Un effet de serre', 'Une canicule côtière', 'Une inversion thermique'],
    correct: 'Un îlot de chaleur',
    explanation: 'Les matériaux sombres et le manque d’arbres créent des îlots de chaleur urbains.',
  },
  {
    id: 12,
    topic: 'Territoires forestiers',
    prompt: 'Quelle est la principale essence résineuse exploitée pour la pâte à papier et le bois d’œuvre dans la forêt boréale québécoise ?',
    options: ['L’épinette noire', 'L’érable à sucre', 'Le bouleau blanc', 'Le chêne rouge'],
    correct: 'L’épinette noire',
    explanation: 'L’épinette noire est l’arbre emblématique de la taïga québécoise en raison de sa résistance au froid.',
  },
];

interface GeoAnswerRecord {
  question: GeoQuestion;
  selected: string;
  isCorrect: boolean;
}

export const GeoModule: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<GeoAnswerRecord[]>([]);

  const q = GEO_QUESTIONS[currentIdx];

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
    setAnswers([]);
    setIsFinished(false);
  };

  useEffect(() => {
    if (isFinished) {
      soundManager.playVictory();
      const pct = (score / GEO_QUESTIONS.length) * 100;
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

  const progressPct = Math.round(((currentIdx + (hasSubmitted ? 1 : 0)) / GEO_QUESTIONS.length) * 100);

  return (
    <div className="module-container">
      <div className="subject-preview-header geo-theme">
        <div className="preview-badge">
          <Globe size={20} />
          <span>Matière : Géographie • Secondaire 1 (Québec)</span>
        </div>
        <h2>Entraînement Géographie — Défi des Territoires</h2>
        <p>12 questions interactives sur les territoires québécois : métropoles, étalement urbain, Saint-Laurent, biomes et ressources naturelles.</p>
      </div>

      {!isFinished ? (
        <div className="question-card">
          <div className="question-card-header">
            <span className="tense-badge badge-geo">{q.topic}</span>
            <span className="person-badge">Question {currentIdx + 1} / {GEO_QUESTIONS.length}</span>
          </div>

          {/* Mini progress bar */}
          <div className="session-progress-track">
            <div
              className="session-progress-fill"
              style={{ width: `${progressPct}%`, backgroundColor: 'var(--emerald)' }}
            />
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
                  {currentIdx + 1 < GEO_QUESTIONS.length ? 'Question suivante' : 'Voir mon bilan'}
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
            <h3>Défi Géographie Secondaire 1 Terminé !</h3>
            <p className="metric-number">{score} / {GEO_QUESTIONS.length}</p>
            <p className="results-subtext">
              Taux de réussite : <strong>{Math.round((score / GEO_QUESTIONS.length) * 100)}%</strong> — {score >= 10 ? 'Superbe connaissance des territoires du Québec !' : score >= 7 ? 'Bon résultat, revois les concepts manqués ci-dessous.' : 'Continue d’explorer les notions de géographie pour t’améliorer !'}
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
