import { useState } from 'react';
import { X, BookOpen, Search, Check, Sparkles } from 'lucide-react';
import { VERB_AVOIR, TENSES } from '../data/conjugationData';

interface ConjugationTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  verbName?: string;
}

export const ConjugationTableModal: React.FC<ConjugationTableModalProps> = ({
  isOpen,
  onClose,
  verbName = 'avoir',
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  if (!isOpen) return null;

  // Group conjugations by tense
  const tensesList = Object.values(TENSES);
  const categories = ['Tous', 'Indicatif', 'Conditionnel', 'Subjonctif', 'Impératif', 'Infinitif / Participe'];

  const filteredTenses = tensesList.filter((t) => {
    const matchesCategory =
      activeCategory === 'Tous' ||
      (activeCategory === 'Infinitif / Participe' && (t.category === 'Infinitif' || t.category === 'Participe')) ||
      t.category === activeCategory;

    const matchesQuery =
      filterQuery.trim() === '' ||
      t.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(filterQuery.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-badge-icon">
              <BookOpen size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="modal-title">Tableau de conjugaison — Verbe <span className="highlight-verb">{verbName}</span></h2>
              <p className="modal-subtitle">Guide d'étude officiel • 15 temps du programme de Secondaire 1</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="modal-toolbar">
          <div className="modal-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un temps (ex: conditionnel, imparfait)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="category-chips">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip-btn ${activeCategory === cat ? 'chip-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tables Grid */}
        <div className="modal-body-scroll">
          <div className="tenses-grid">
            {filteredTenses.map((tense) => {
              const items = VERB_AVOIR.conjugations.filter((c) => c.tense === tense.key);

              return (
                <div key={tense.key} className="tense-card">
                  <div className="tense-card-header">
                    <div className="tense-pill-row">
                      <span className={`tense-badge badge-${tense.category.toLowerCase()}`}>
                        {tense.category}
                      </span>
                      {tense.isCompound && <span className="compound-badge">Temps composé</span>}
                    </div>
                    <h3 className="tense-card-title">{tense.label}</h3>
                    <p className="tense-card-desc">{tense.explanation}</p>
                  </div>

                  <div className="tense-table">
                    {items.map((item, idx) => (
                      <div key={idx} className="tense-row">
                        <span className="tense-row-person">
                          {item.person === 'none'
                            ? '—'
                            : item.person.startsWith('imp_')
                            ? item.person === 'imp_2s' ? '2e pers. sing.' : item.person === 'imp_1p' ? '1re pers. plur.' : '2e pers. plur.'
                            : item.person}
                        </span>
                        <span className="tense-row-value">
                          <strong>{item.fullDisplay}</strong>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="tip-note">
            <Sparkles size={16} className="text-amber" />
            <span>Astuce : Le verbe <em>avoir</em> est un verbe irrégulier essentiel qui sert aussi d'auxiliaire !</span>
          </div>
          <button className="btn btn-primary" onClick={onClose}>
            <Check size={18} /> Compris, retour au test
          </button>
        </div>
      </div>
    </div>
  );
};
