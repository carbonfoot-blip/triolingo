import { useState } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  BookCheck,
  Zap,
} from 'lucide-react';
import {
  AVAILABLE_VERBS,
  type VerbData,
  type VerbCategory,
} from '../data/conjugationData';

interface VerbSelectorProps {
  onSelectVerb: (verb: VerbData) => void;
  onOpenReference: (verb: VerbData) => void;
  selectedVerbId?: string;
}

export const VerbSelector: React.FC<VerbSelectorProps> = ({
  onSelectVerb,
  onOpenReference,
  selectedVerbId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'Tous les verbes', count: AVAILABLE_VERBS.length },
    {
      id: 'auxiliaire',
      label: 'Auxiliaires',
      count: AVAILABLE_VERBS.filter((v) => v.category === 'auxiliaire').length,
    },
    {
      id: '1er_groupe',
      label: '1er groupe (-er)',
      count: AVAILABLE_VERBS.filter((v) => v.category === '1er_groupe').length,
    },
    {
      id: '2e_groupe',
      label: '2e groupe (-ir)',
      count: AVAILABLE_VERBS.filter((v) => v.category === '2e_groupe').length,
    },
    {
      id: '3e_groupe',
      label: '3e groupe (irréguliers)',
      count: AVAILABLE_VERBS.filter((v) => v.category === '3e_groupe').length,
    },
  ];

  const filteredVerbs = AVAILABLE_VERBS.filter((verb) => {
    const matchesCategory =
      activeCategory === 'all' || verb.category === (activeCategory as VerbCategory);

    const matchesSearch =
      searchQuery.trim() === '' ||
      verb.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      verb.group.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      verb.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="verb-selector-container">
      {/* Selector Hero Banner */}
      <div className="verb-selector-hero">
        <div className="hero-content-wrap">
          <div className="hero-icon-bubble">
            <BookCheck size={32} className="text-primary" />
          </div>
          <div>
            <div className="hero-badge-tag">
              <Sparkles size={14} className="text-amber" />
              <span>Programme officiel MEQ • Secondaire 1</span>
            </div>
            <h2 className="verb-selector-title">Choisis un verbe pour t'entraîner</h2>
            <p className="verb-selector-subtitle">
              Sélectionne l'un des <strong>{AVAILABLE_VERBS.length} verbes prioritaires</strong> de Secondaire 1. 
              Une session de <strong>30 questions interactives</strong> sera générée sur l'ensemble des 15 temps du programme.
            </p>
          </div>
        </div>

        {/* Quick Search & Filters */}
        <div className="verb-selector-toolbar">
          <div className="verb-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un verbe (ex: être, aimer, aller, faire, finir)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="styled-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Effacer la recherche"
              >
                ×
              </button>
            )}
          </div>

          <div className="verb-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`cat-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="cat-count-badge">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Verb Cards */}
      <div className="verbs-card-grid">
        {filteredVerbs.length === 0 ? (
          <div className="no-verbs-found">
            <p>Aucun verbe trouvé pour "<strong>{searchQuery}</strong>".</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          filteredVerbs.map((verb) => {
            const isSelected = selectedVerbId === verb.id;
            const categoryClass = `verb-card-cat-${verb.category}`;

            return (
              <div
                key={verb.id}
                className={`verb-selection-card ${categoryClass} ${isSelected ? 'is-selected' : ''}`}
              >
                <div className="verb-card-top">
                  <div className="verb-name-row">
                    <h3 className="verb-card-name">{verb.name}</h3>
                    {verb.isPOC && (
                      <span className="pill-essential" title="Verbe prioritaire / Auxiliaire">
                        Essentiel
                      </span>
                    )}
                  </div>
                  <div className="verb-tags-row">
                    <span className="verb-group-badge">{verb.group}</span>
                    <span className="verb-aux-badge">
                      Aux. {verb.auxiliary}
                    </span>
                  </div>
                </div>

                <p className="verb-card-desc">{verb.description}</p>

                <div className="verb-card-actions">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm table-btn"
                    onClick={() => onOpenReference(verb)}
                    title={`Consulter le tableau complet des 15 temps du verbe ${verb.name}`}
                  >
                    <BookOpen size={15} />
                    <span>Tableau</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm train-btn"
                    onClick={() => onSelectVerb(verb)}
                    title={`Lancer un quiz de 30 questions sur le verbe ${verb.name}`}
                  >
                    <Zap size={15} />
                    <span>S'entraîner (30 Qs)</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
