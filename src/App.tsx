import { useState } from 'react';
import { Header, type SubjectId } from './components/Header';
import { ConjugationModule } from './components/ConjugationModule';
import { MathModule } from './components/MathModule';
import { GeoModule } from './components/GeoModule';
import { ConjugationTableModal } from './components/ConjugationTableModal';
import { type VerbData } from './data/conjugationData';
import { BookCheck, Sparkles, Heart, SpellCheck, BookmarkCheck, ArrowLeft, Check } from 'lucide-react';

export function App() {
  const [currentSubject, setCurrentSubject] = useState<SubjectId>('francais');
  const [isReferenceOpen, setIsReferenceOpen] = useState<boolean>(false);
  const [referenceVerb, setReferenceVerb] = useState<VerbData | undefined>(undefined);
  const [activeFrenchTab, setActiveFrenchTab] = useState<'conjugaison' | 'orthographe' | 'grammaire'>('conjugaison');

  const handleOpenReference = (verb?: VerbData) => {
    setReferenceVerb(verb);
    setIsReferenceOpen(true);
  };

  return (
    <div className="app-layout">
      {/* Navigation Header */}
      <Header
        currentSubject={currentSubject}
        onSelectSubject={(subj) => setCurrentSubject(subj)}
        onOpenReference={() => handleOpenReference(undefined)}
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
                  className={`submodule-tab ${activeFrenchTab === 'orthographe' ? 'active' : ''}`}
                  onClick={() => setActiveFrenchTab('orthographe')}
                >
                  <SpellCheck size={16} />
                  <span>Orthographe d'usage</span>
                  <span className="badge-soon">Programme Sec 1</span>
                </button>

                <button
                  className={`submodule-tab ${activeFrenchTab === 'grammaire' ? 'active' : ''}`}
                  onClick={() => setActiveFrenchTab('grammaire')}
                >
                  <BookmarkCheck size={16} />
                  <span>Grammaire & Accords</span>
                  <span className="badge-soon">Programme Sec 1</span>
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
                onOpenReference={handleOpenReference}
              />
            )}

            {/* Orthographe Preview Card */}
            {activeFrenchTab === 'orthographe' && (
              <div className="module-container">
                <div className="results-hero-card" style={{ textAlign: 'left', maxWidth: '780px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                    <div className="brand-logo-icon" style={{ background: 'var(--amber)' }}>
                      <SpellCheck size={26} className="text-white" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0 }}>Module Orthographe d'usage — Secondaire 1</h3>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Notions prioritaires du MEQ</p>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Ce module interactif est conçu pour consolider les réflexes d'écriture des élèves à l'entrée au secondaire :
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={18} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span><strong>Homophones grammaticaux clés :</strong> distinction entre <em>a / à</em>, <em>ou / où</em>, <em>son / sont</em>, <em>ce / se</em>, <em>c'est / s'est / ses / ces</em>.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={18} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span><strong>Terminaisons verbales fréquentes :</strong> distinction entre le participe passé en <em>-é</em> et l'infinitif en <em>-er</em> (astuce du verbe mordre).</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={18} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span><strong>Mots fréquents et régularités :</strong> consonnes doubles, cédille devant <em>a, o, u</em> et pluriel des noms composés simples.</span>
                    </li>
                  </ul>
                  <button className="btn btn-primary" onClick={() => setActiveFrenchTab('conjugaison')}>
                    <ArrowLeft size={16} /> Retour au test de conjugaison
                  </button>
                </div>
              </div>
            )}

            {/* Grammaire Preview Card */}
            {activeFrenchTab === 'grammaire' && (
              <div className="module-container">
                <div className="results-hero-card" style={{ textAlign: 'left', maxWidth: '780px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                    <div className="brand-logo-icon" style={{ background: 'var(--violet)' }}>
                      <BookmarkCheck size={26} className="text-white" />
                    </div>
                    <div>
                      <h3 style={{ margin: 0 }}>Module Grammaire & Accords — Secondaire 1</h3>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Syntaxe et accords du PFEQ</p>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Ce volet accompagne les élèves dans l'analyse de la phrase et les règles d'accord syntaxiques fondamentales :
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={18} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span><strong>Classes de mots & Groupes syntaxiques :</strong> identification du Groupe Nominal (GN), du Groupe Verbal (GV) et des donneurs/receveurs d'accord.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={18} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span><strong>Accords du participe passé :</strong> règle avec l'auxiliaire <em>être</em> (accord avec le sujet) et avec <em>avoir</em> (accord avec le CD placé avant).</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={18} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span><strong>Sujets inversés et complexes :</strong> accord du verbe avec un sujet éloigné ou coordonné par <em>et</em>.</span>
                    </li>
                  </ul>
                  <button className="btn btn-primary" onClick={() => setActiveFrenchTab('conjugaison')}>
                    <ArrowLeft size={16} /> Retour au test de conjugaison
                  </button>
                </div>
              </div>
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
        verb={referenceVerb}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            <strong>TrioLingo</strong> — Conçu avec <Heart size={14} className="inline-icon text-rose" /> pour la réussite des élèves de Secondaire 1.
          </p>
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => handleOpenReference(undefined)}>
              Aide-mémoire conjugaison (15 temps)
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
