import { useState } from 'react';
import { Header, type SubjectId } from './components/Header';
import { ConjugationModule } from './components/ConjugationModule';
import { MathModule } from './components/MathModule';
import { GeoModule } from './components/GeoModule';
import { ConjugationTableModal } from './components/ConjugationTableModal';
import { BookCheck, Sparkles, Heart } from 'lucide-react';

export function App() {
  const [currentSubject, setCurrentSubject] = useState<SubjectId>('francais');
  const [isReferenceOpen, setIsReferenceOpen] = useState<boolean>(false);
  const [activeFrenchTab, setActiveFrenchTab] = useState<'conjugaison' | 'orthographe' | 'grammaire'>('conjugaison');

  return (
    <div className="app-layout">
      {/* Navigation Header */}
      <Header
        currentSubject={currentSubject}
        onSelectSubject={(subj) => setCurrentSubject(subj)}
        onOpenReference={() => setIsReferenceOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {currentSubject === 'francais' && (
          <div className="subject-shell">
            {/* French Submodules Tabs */}
            <div className="submodules-bar">
              <div className="submodule-tabs">
                <button
                  className={`submodule-tab ${activeFrenchTab === 'conjugaison' ? 'active' : ''}`}
                  onClick={() => setActiveFrenchTab('conjugaison')}
                >
                  <BookCheck size={16} />
                  <span>Conjugaison (30 questions)</span>
                  <span className="live-dot" />
                </button>

                <button
                  className="submodule-tab disabled"
                  title="Module en cours de préparation"
                  onClick={() => alert("Le module Orthographe sera disponible très bientôt !")}
                >
                  <span>Orthographe d'usage</span>
                  <span className="badge-soon">Bientôt</span>
                </button>

                <button
                  className="submodule-tab disabled"
                  title="Module en cours de préparation"
                  onClick={() => alert("Le module Grammaire & Accords sera disponible très bientôt !")}
                >
                  <span>Grammaire & Accords</span>
                  <span className="badge-soon">Bientôt</span>
                </button>
              </div>

              <div className="curriculum-tag">
                <Sparkles size={14} className="text-amber" />
                <span>Programme Québec • Secondaire 1</span>
              </div>
            </div>

            {/* Conjugation Runner */}
            {activeFrenchTab === 'conjugaison' && (
              <ConjugationModule
                onOpenReference={() => setIsReferenceOpen(true)}
              />
            )}
          </div>
        )}

        {currentSubject === 'mathematiques' && (
          <div className="subject-shell">
            <MathModule />
          </div>
        )}

        {currentSubject === 'geographie' && (
          <div className="subject-shell">
            <GeoModule />
          </div>
        )}
      </main>

      {/* Cheat sheet Modal */}
      <ConjugationTableModal
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
        verbName="avoir"
      />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            <strong>TrioLingo</strong> — Conçu avec <Heart size={14} className="inline-icon text-rose" /> pour la réussite des élèves de Secondaire 1.
          </p>
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => setIsReferenceOpen(true)}>
              Aide-mémoire verbe avoir
            </button>
            <span className="footer-sep">•</span>
            <span className="footer-text">Français • Mathématiques • Géographie</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
