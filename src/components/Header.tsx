import { useState } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export type SubjectId = 'francais' | 'mathematiques' | 'geographie';

interface HeaderProps {
  currentSubject: SubjectId;
  onSelectSubject: (subject: SubjectId) => void;
  onOpenReference: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSubject,
  onSelectSubject,
  onOpenReference,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);

  const toggleSound = () => {
    soundManager.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand */}
        <div className="brand-zone">
          <div className="brand-logo-wrap">
            <div className="brand-logo-icon">
              <GraduationCap size={28} className="text-white" />
            </div>
            <div className="sparkle-orbit">
              <Sparkles size={14} className="text-amber" />
            </div>
          </div>
          <div className="brand-text-col">
            <div className="brand-title-row">
              <h1 className="brand-name">TrioLingo</h1>
              <span className="grade-badge">Secondaire 1</span>
            </div>
            <p className="brand-tagline">Apprentissage interactif & ludique</p>
          </div>
        </div>

        {/* Subjects Navigation */}
        <nav className="subjects-nav" aria-label="Matières">
          <button
            className={`subject-tab ${currentSubject === 'francais' ? 'tab-active tab-francais' : ''}`}
            onClick={() => onSelectSubject('francais')}
          >
            <span className="tab-emoji">📚</span>
            <span className="tab-name">Français</span>
            <span className="tab-micro-badge">Conjugaison</span>
          </button>

          <button
            className={`subject-tab ${currentSubject === 'mathematiques' ? 'tab-active tab-math' : ''}`}
            onClick={() => onSelectSubject('mathematiques')}
          >
            <span className="tab-emoji">📐</span>
            <span className="tab-name">Mathématiques</span>
            <span className="tab-micro-badge">Sec 1</span>
          </button>

          <button
            className={`subject-tab ${currentSubject === 'geographie' ? 'tab-active tab-geo' : ''}`}
            onClick={() => onSelectSubject('geographie')}
          >
            <span className="tab-emoji">🌍</span>
            <span className="tab-name">Géographie</span>
            <span className="tab-micro-badge">Sec 1</span>
          </button>
        </nav>

        {/* Utilities */}
        <div className="header-utilities">
          <button
            className="util-btn"
            onClick={toggleSound}
            title={soundEnabled ? 'Désactiver les sons' : 'Activer les sons'}
            aria-label="Contrôle du son"
          >
            {soundEnabled ? <Volume2 size={20} className="text-primary" /> : <VolumeX size={20} className="text-muted" />}
          </button>

          {currentSubject === 'francais' && (
            <button
              className="btn btn-outline-nav"
              onClick={onOpenReference}
              title="Ouvrir le tableau de conjugaison des 15 temps"
            >
              <BookOpen size={16} />
              <span>Aide-mémoire</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
