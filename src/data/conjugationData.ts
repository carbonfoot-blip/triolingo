export type TenseKey =
  | 'indicatif_present'
  | 'passe_compose'
  | 'imparfait'
  | 'plus_que_parfait'
  | 'passe_simple'
  | 'futur_simple'
  | 'futur_anterieur'
  | 'conditionnel_present'
  | 'conditionnel_passe'
  | 'subjonctif_present'
  | 'imperatif_present'
  | 'infinitif_present'
  | 'infinitif_passe'
  | 'participe_present'
  | 'participe_passe';

export interface TenseInfo {
  key: TenseKey;
  label: string;
  category: 'Indicatif' | 'Conditionnel' | 'Subjonctif' | 'Impératif' | 'Infinitif' | 'Participe';
  isCompound: boolean;
  explanation: string;
}

export const TENSES: Record<TenseKey, TenseInfo> = {
  indicatif_present: {
    key: 'indicatif_present',
    label: 'Indicatif Présent',
    category: 'Indicatif',
    isCompound: false,
    explanation: "Action qui a lieu au moment où l'on parle.",
  },
  passe_compose: {
    key: 'passe_compose',
    label: 'Passé Composé',
    category: 'Indicatif',
    isCompound: true,
    explanation: "Action terminée dans le passé (auxiliaire au présent + participe passé).",
  },
  imparfait: {
    key: 'imparfait',
    label: 'Imparfait',
    category: 'Indicatif',
    isCompound: false,
    explanation: "Action passée d'arrière-plan, description ou habitude.",
  },
  plus_que_parfait: {
    key: 'plus_que_parfait',
    label: 'Plus-que-parfait',
    category: 'Indicatif',
    isCompound: true,
    explanation: "Action passée qui s'est déroulée avant une autre action passée (auxiliaire à l'imparfait + participe passé).",
  },
  passe_simple: {
    key: 'passe_simple',
    label: 'Passé Simple',
    category: 'Indicatif',
    isCompound: false,
    explanation: "Action ponctuelle et achevée dans le passé, souvent dans un récit écrit.",
  },
  futur_simple: {
    key: 'futur_simple',
    label: 'Futur Simple',
    category: 'Indicatif',
    isCompound: false,
    explanation: "Action qui aura lieu plus tard.",
  },
  futur_anterieur: {
    key: 'futur_anterieur',
    label: 'Futur Antérieur',
    category: 'Indicatif',
    isCompound: true,
    explanation: "Action future qui sera terminée avant une autre action future (auxiliaire au futur + participe passé).",
  },
  conditionnel_present: {
    key: 'conditionnel_present',
    label: 'Conditionnel Présent',
    category: 'Conditionnel',
    isCompound: false,
    explanation: "Action incertaine, souhait, conseil ou dépendant d'une condition.",
  },
  conditionnel_passe: {
    key: 'conditionnel_passe',
    label: 'Conditionnel Passé',
    category: 'Conditionnel',
    isCompound: true,
    explanation: "Regret ou action passée qui aurait pu avoir lieu (auxiliaire au conditionnel présent + participe passé).",
  },
  subjonctif_present: {
    key: 'subjonctif_present',
    label: 'Subjonctif Présent',
    category: 'Subjonctif',
    isCompound: false,
    explanation: "Exprime le doute, l'obligation, l'émotion ou le souhait, introduit par 'que'.",
  },
  imperatif_present: {
    key: 'imperatif_present',
    label: 'Impératif Présent',
    category: 'Impératif',
    isCompound: false,
    explanation: "Ordre, consigne ou conseil sans pronom sujet exprimé.",
  },
  infinitif_present: {
    key: 'infinitif_present',
    label: 'Infinitif Présent',
    category: 'Infinitif',
    isCompound: false,
    explanation: "Forme non conjuguée de base du verbe.",
  },
  infinitif_passe: {
    key: 'infinitif_passe',
    label: 'Infinitif Passé',
    category: 'Infinitif',
    isCompound: true,
    explanation: "Auxiliaire à l'infinitif + participe passé.",
  },
  participe_present: {
    key: 'participe_present',
    label: 'Participe Présent',
    category: 'Participe',
    isCompound: false,
    explanation: "Forme verbale en -ant exprimant une action en cours.",
  },
  participe_passe: {
    key: 'participe_passe',
    label: 'Participe Passé',
    category: 'Participe',
    isCompound: false,
    explanation: "Forme employée avec les auxiliaires pour former les temps composés.",
  },
};

export type PersonKey =
  | '1s'
  | '2s'
  | '3s'
  | '1p'
  | '2p'
  | '3p'
  | 'imp_2s'
  | 'imp_1p'
  | 'imp_2p'
  | 'none';

export interface PersonInfo {
  key: PersonKey;
  label: string; // e.g. "2e personne du pluriel"
  pronoun: string; // e.g. "vous"
  subjonctifPrefix?: string; // "que vous"
}

export const PERSONS: Record<PersonKey, PersonInfo> = {
  '1s': { key: '1s', label: '1re personne du singulier', pronoun: "j'" },
  '2s': { key: '2s', label: '2e personne du singulier', pronoun: 'tu' },
  '3s': { key: '3s', label: '3e personne du singulier', pronoun: 'il / elle / on' },
  '1p': { key: '1p', label: '1re personne du pluriel', pronoun: 'nous' },
  '2p': { key: '2p', label: '2e personne du pluriel', pronoun: 'vous' },
  '3p': { key: '3p', label: '3e personne du pluriel', pronoun: 'ils / elles' },
  'imp_2s': { key: 'imp_2s', label: '2e personne du singulier', pronoun: '(tu)' },
  'imp_1p': { key: 'imp_1p', label: '1re personne du pluriel', pronoun: '(nous)' },
  'imp_2p': { key: 'imp_2p', label: '2e personne du pluriel', pronoun: '(vous)' },
  'none': { key: 'none', label: 'Forme impersonnelle', pronoun: '' },
};

export interface ConjugationItem {
  tense: TenseKey;
  person: PersonKey;
  verbForm: string; // The conjugated word(s), e.g. "auriez" or "auriez eu"
  fullDisplay: string; // e.g. "vous auriez" or "que j'aie" or "aie"
  acceptedAnswers: string[]; // List of normalized variations accepted
  distractors: string[]; // False choices for multiple choice mode
}

export interface VerbData {
  id: string;
  name: string; // e.g. "avoir"
  group: string; // e.g. "Auxiliaire / 3e groupe"
  isPOC: boolean;
  conjugations: ConjugationItem[];
}

// Complete data for the verb "AVOIR" across all 15 Secondary 1 tenses
export const VERB_AVOIR: VerbData = {
  id: 'avoir',
  name: 'avoir',
  group: 'Auxiliaire',
  isPOC: true,
  conjugations: [
    // 1. Indicatif Présent
    {
      tense: 'indicatif_present',
      person: '1s',
      verbForm: 'ai',
      fullDisplay: "j'ai",
      acceptedAnswers: ['ai', "j'ai", 'j ai'],
      distractors: ['as', 'a', 'avais', 'aie'],
    },
    {
      tense: 'indicatif_present',
      person: '2s',
      verbForm: 'as',
      fullDisplay: 'tu as',
      acceptedAnswers: ['as', 'tu as'],
      distractors: ['ai', 'a', 'avais', 'aies'],
    },
    {
      tense: 'indicatif_present',
      person: '3s',
      verbForm: 'a',
      fullDisplay: 'il/elle a',
      acceptedAnswers: ['a', 'il a', 'elle a', 'on a'],
      distractors: ['as', 'ai', 'ait', 'aura'],
    },
    {
      tense: 'indicatif_present',
      person: '1p',
      verbForm: 'avons',
      fullDisplay: 'nous avons',
      acceptedAnswers: ['avons', 'nous avons'],
      distractors: ['avions', 'aurons', 'ayons', 'avez'],
    },
    {
      tense: 'indicatif_present',
      person: '2p',
      verbForm: 'avez',
      fullDisplay: 'vous avez',
      acceptedAnswers: ['avez', 'vous avez'],
      distractors: ['aviez', 'aurez', 'ayez', 'avons'],
    },
    {
      tense: 'indicatif_present',
      person: '3p',
      verbForm: 'ont',
      fullDisplay: 'ils/elles ont',
      acceptedAnswers: ['ont', 'ils ont', 'elles ont'],
      distractors: ['avaient', 'auront', 'aient', 'eurent'],
    },

    // 2. Passé Composé
    {
      tense: 'passe_compose',
      person: '1s',
      verbForm: 'ai eu',
      fullDisplay: "j'ai eu",
      acceptedAnswers: ['ai eu', "j'ai eu", 'j ai eu'],
      distractors: ['avais eu', 'aurai eu', 'eus', 'a eu'],
    },
    {
      tense: 'passe_compose',
      person: '2s',
      verbForm: 'as eu',
      fullDisplay: 'tu as eu',
      acceptedAnswers: ['as eu', 'tu as eu'],
      distractors: ['avais eu', 'auras eu', 'aies eu', 'as'],
    },
    {
      tense: 'passe_compose',
      person: '3s',
      verbForm: 'a eu',
      fullDisplay: 'il/elle a eu',
      acceptedAnswers: ['a eu', 'il a eu', 'elle a eu', 'on a eu'],
      distractors: ['avait eu', 'aura eu', 'eut', 'a'],
    },
    {
      tense: 'passe_compose',
      person: '1p',
      verbForm: 'avons eu',
      fullDisplay: 'nous avons eu',
      acceptedAnswers: ['avons eu', 'nous avons eu'],
      distractors: ['avions eu', 'aurons eu', 'eûmes', 'avons'],
    },
    {
      tense: 'passe_compose',
      person: '2p',
      verbForm: 'avez eu',
      fullDisplay: 'vous avez eu',
      acceptedAnswers: ['avez eu', 'vous avez eu'],
      distractors: ['aviez eu', 'aurez eu', 'eûtes', 'avez'],
    },
    {
      tense: 'passe_compose',
      person: '3p',
      verbForm: 'ont eu',
      fullDisplay: 'ils/elles ont eu',
      acceptedAnswers: ['ont eu', 'ils ont eu', 'elles ont eu'],
      distractors: ['avaient eu', 'auront eu', 'eurent', 'ont'],
    },

    // 3. Imparfait
    {
      tense: 'imparfait',
      person: '1s',
      verbForm: 'avais',
      fullDisplay: "j'avais",
      acceptedAnswers: ['avais', "j'avais", 'j avais'],
      distractors: ['ai', 'aurais', 'avait', 'avions'],
    },
    {
      tense: 'imparfait',
      person: '2s',
      verbForm: 'avais',
      fullDisplay: 'tu avais',
      acceptedAnswers: ['avais', 'tu avais'],
      distractors: ['as', 'aurais', 'avait', 'avez'],
    },
    {
      tense: 'imparfait',
      person: '3s',
      verbForm: 'avait',
      fullDisplay: 'il/elle avait',
      acceptedAnswers: ['avait', 'il avait', 'elle avait', 'on avait'],
      distractors: ['a', 'aurait', 'avais', 'aura'],
    },
    {
      tense: 'imparfait',
      person: '1p',
      verbForm: 'avions',
      fullDisplay: 'nous avions',
      acceptedAnswers: ['avions', 'nous avions'],
      distractors: ['avons', 'aurions', 'ayons', 'aviez'],
    },
    {
      tense: 'imparfait',
      person: '2p',
      verbForm: 'aviez',
      fullDisplay: 'vous aviez',
      acceptedAnswers: ['aviez', 'vous aviez'],
      distractors: ['avez', 'auriez', 'ayez', 'avions'],
    },
    {
      tense: 'imparfait',
      person: '3p',
      verbForm: 'avaient',
      fullDisplay: 'ils/elles avaient',
      acceptedAnswers: ['avaient', 'ils avaient', 'elles avaient'],
      distractors: ['ont', 'auraient', 'avaient eu', 'auront'],
    },

    // 4. Plus-que-parfait
    {
      tense: 'plus_que_parfait',
      person: '1s',
      verbForm: 'avais eu',
      fullDisplay: "j'avais eu",
      acceptedAnswers: ['avais eu', "j'avais eu", 'j avais eu'],
      distractors: ['ai eu', 'aurais eu', 'avais', 'avait eu'],
    },
    {
      tense: 'plus_que_parfait',
      person: '2s',
      verbForm: 'avais eu',
      fullDisplay: 'tu avais eu',
      acceptedAnswers: ['avais eu', 'tu avais eu'],
      distractors: ['as eu', 'aurais eu', 'avais', 'avait eu'],
    },
    {
      tense: 'plus_que_parfait',
      person: '3s',
      verbForm: 'avait eu',
      fullDisplay: 'il/elle avait eu',
      acceptedAnswers: ['avait eu', 'il avait eu', 'elle avait eu', 'on avait eu'],
      distractors: ['a eu', 'aurait eu', 'eut eu', 'avait'],
    },
    {
      tense: 'plus_que_parfait',
      person: '1p',
      verbForm: 'avions eu',
      fullDisplay: 'nous avions eu',
      acceptedAnswers: ['avions eu', 'nous avions eu'],
      distractors: ['avons eu', 'aurions eu', 'avions', 'eûmes eu'],
    },
    {
      tense: 'plus_que_parfait',
      person: '2p',
      verbForm: 'aviez eu',
      fullDisplay: 'vous aviez eu',
      acceptedAnswers: ['aviez eu', 'vous aviez eu'],
      distractors: ['avez eu', 'auriez eu', 'aviez', 'eûtes eu'],
    },
    {
      tense: 'plus_que_parfait',
      person: '3p',
      verbForm: 'avaient eu',
      fullDisplay: 'ils/elles avaient eu',
      acceptedAnswers: ['avaient eu', 'ils avaient eu', 'elles avaient eu'],
      distractors: ['ont eu', 'auraient eu', 'avaient', 'eurent eu'],
    },

    // 5. Passé Simple
    {
      tense: 'passe_simple',
      person: '1s',
      verbForm: 'eus',
      fullDisplay: "j'eus",
      acceptedAnswers: ['eus', "j'eus", 'j eus'],
      distractors: ['eut', 'eûmes', 'ai', 'avais'],
    },
    {
      tense: 'passe_simple',
      person: '2s',
      verbForm: 'eus',
      fullDisplay: 'tu eus',
      acceptedAnswers: ['eus', 'tu eus'],
      distractors: ['eut', 'eûtes', 'as', 'avais'],
    },
    {
      tense: 'passe_simple',
      person: '3s',
      verbForm: 'eut',
      fullDisplay: 'il/elle eut',
      acceptedAnswers: ['eut', 'il eut', 'elle eut', 'on eut'],
      distractors: ['eus', 'eurent', 'eût', 'a'],
    },
    {
      tense: 'passe_simple',
      person: '1p',
      verbForm: 'eûmes',
      fullDisplay: 'nous eûmes',
      acceptedAnswers: ['eumes', 'eûmes', 'nous eûmes', 'nous eumes'],
      distractors: ['eûtes', 'eurent', 'avions', 'avons'],
    },
    {
      tense: 'passe_simple',
      person: '2p',
      verbForm: 'eûtes',
      fullDisplay: 'vous eûtes',
      acceptedAnswers: ['eutes', 'eûtes', 'vous eûtes', 'vous eutes'],
      distractors: ['eûmes', 'eurent', 'aviez', 'avez'],
    },
    {
      tense: 'passe_simple',
      person: '3p',
      verbForm: 'eurent',
      fullDisplay: 'ils/elles eurent',
      acceptedAnswers: ['eurent', 'ils eurent', 'elles eurent'],
      distractors: ['avaient', 'ont', 'auront', 'eut'],
    },

    // 6. Futur Simple
    {
      tense: 'futur_simple',
      person: '1s',
      verbForm: 'aurai',
      fullDisplay: "j'aurai",
      acceptedAnswers: ['aurai', "j'aurai", 'j aurai'],
      distractors: ['aurais', 'auras', 'ai', 'aura'],
    },
    {
      tense: 'futur_simple',
      person: '2s',
      verbForm: 'auras',
      fullDisplay: 'tu auras',
      acceptedAnswers: ['auras', 'tu auras'],
      distractors: ['aurai', 'aurait', 'as', 'aurais'],
    },
    {
      tense: 'futur_simple',
      person: '3s',
      verbForm: 'aura',
      fullDisplay: 'il/elle aura',
      acceptedAnswers: ['aura', 'il aura', 'elle aura', 'on aura'],
      distractors: ['aurait', 'auras', 'a', 'aurai'],
    },
    {
      tense: 'futur_simple',
      person: '1p',
      verbForm: 'aurons',
      fullDisplay: 'nous aurons',
      acceptedAnswers: ['aurons', 'nous aurons'],
      distractors: ['aurions', 'avons', 'avions', 'aurez'],
    },
    {
      tense: 'futur_simple',
      person: '2p',
      verbForm: 'aurez',
      fullDisplay: 'vous aurez',
      acceptedAnswers: ['aurez', 'vous aurez'],
      distractors: ['auriez', 'avez', 'aviez', 'aurons'],
    },
    {
      tense: 'futur_simple',
      person: '3p',
      verbForm: 'auront',
      fullDisplay: 'ils/elles auront',
      acceptedAnswers: ['auront', 'ils auront', 'elles auront'],
      distractors: ['auraient', 'ont', 'avaient', 'aurons'],
    },

    // 7. Futur Antérieur
    {
      tense: 'futur_anterieur',
      person: '1s',
      verbForm: 'aurai eu',
      fullDisplay: "j'aurai eu",
      acceptedAnswers: ['aurai eu', "j'aurai eu", 'j aurai eu'],
      distractors: ['aurais eu', 'auras eu', 'ai eu', 'aura eu'],
    },
    {
      tense: 'futur_anterieur',
      person: '2s',
      verbForm: 'auras eu',
      fullDisplay: 'tu auras eu',
      acceptedAnswers: ['auras eu', 'tu auras eu'],
      distractors: ['aurai eu', 'aurais eu', 'as eu', 'aura eu'],
    },
    {
      tense: 'futur_anterieur',
      person: '3s',
      verbForm: 'aura eu',
      fullDisplay: 'il/elle aura eu',
      acceptedAnswers: ['aura eu', 'il aura eu', 'elle aura eu', 'on aura eu'],
      distractors: ['aurait eu', 'auras eu', 'a eu', 'aurai eu'],
    },
    {
      tense: 'futur_anterieur',
      person: '1p',
      verbForm: 'aurons eu',
      fullDisplay: 'nous aurons eu',
      acceptedAnswers: ['aurons eu', 'nous aurons eu'],
      distractors: ['aurions eu', 'avons eu', 'aurez eu', 'avions eu'],
    },
    {
      tense: 'futur_anterieur',
      person: '2p',
      verbForm: 'aurez eu',
      fullDisplay: 'vous aurez eu',
      acceptedAnswers: ['aurez eu', 'vous aurez eu'],
      distractors: ['auriez eu', 'avez eu', 'aurons eu', 'aviez eu'],
    },
    {
      tense: 'futur_anterieur',
      person: '3p',
      verbForm: 'auront eu',
      fullDisplay: 'ils/elles auront eu',
      acceptedAnswers: ['auront eu', 'ils auront eu', 'elles auront eu'],
      distractors: ['auraient eu', 'ont eu', 'avaient eu', 'auront'],
    },

    // 8. Conditionnel Présent
    {
      tense: 'conditionnel_present',
      person: '1s',
      verbForm: 'aurais',
      fullDisplay: "j'aurais",
      acceptedAnswers: ['aurais', "j'aurais", 'j aurais'],
      distractors: ['aurai', 'aurait', 'avais', 'aurions'],
    },
    {
      tense: 'conditionnel_present',
      person: '2s',
      verbForm: 'aurais',
      fullDisplay: 'tu aurais',
      acceptedAnswers: ['aurais', 'tu aurais'],
      distractors: ['auras', 'aurait', 'avais', 'auriez'],
    },
    {
      tense: 'conditionnel_present',
      person: '3s',
      verbForm: 'aurait',
      fullDisplay: 'il/elle aurait',
      acceptedAnswers: ['aurait', 'il aurait', 'elle aurait', 'on aurait'],
      distractors: ['aura', 'aurais', 'avait', 'a'],
    },
    {
      tense: 'conditionnel_present',
      person: '1p',
      verbForm: 'aurions',
      fullDisplay: 'nous aurions',
      acceptedAnswers: ['aurions', 'nous aurions'],
      distractors: ['aurons', 'avions', 'auriez', 'avons'],
    },
    {
      tense: 'conditionnel_present',
      person: '2p',
      verbForm: 'auriez',
      fullDisplay: 'vous auriez',
      acceptedAnswers: ['auriez', 'vous auriez'],
      distractors: ['aurez', 'aviez', 'aurions', 'avez'],
    },
    {
      tense: 'conditionnel_present',
      person: '3p',
      verbForm: 'auraient',
      fullDisplay: 'ils/elles auraient',
      acceptedAnswers: ['auraient', 'ils auraient', 'elles auraient'],
      distractors: ['auront', 'avaient', 'ont', 'auraient eu'],
    },

    // 9. Conditionnel Passé
    {
      tense: 'conditionnel_passe',
      person: '1s',
      verbForm: 'aurais eu',
      fullDisplay: "j'aurais eu",
      acceptedAnswers: ['aurais eu', "j'aurais eu", 'j aurais eu'],
      distractors: ['aurai eu', 'aurait eu', 'avais eu', 'ai eu'],
    },
    {
      tense: 'conditionnel_passe',
      person: '2s',
      verbForm: 'aurais eu',
      fullDisplay: 'tu aurais eu',
      acceptedAnswers: ['aurais eu', 'tu aurais eu'],
      distractors: ['auras eu', 'aurait eu', 'avais eu', 'as eu'],
    },
    {
      tense: 'conditionnel_passe',
      person: '3s',
      verbForm: 'aurait eu',
      fullDisplay: 'il/elle aurait eu',
      acceptedAnswers: ['aurait eu', 'il aurait eu', 'elle aurait eu', 'on aurait eu'],
      distractors: ['aura eu', 'aurais eu', 'avait eu', 'a eu'],
    },
    {
      tense: 'conditionnel_passe',
      person: '1p',
      verbForm: 'aurions eu',
      fullDisplay: 'nous aurions eu',
      acceptedAnswers: ['aurions eu', 'nous aurions eu'],
      distractors: ['aurons eu', 'avions eu', 'auriez eu', 'avons eu'],
    },
    {
      tense: 'conditionnel_passe',
      person: '2p',
      verbForm: 'auriez eu',
      fullDisplay: 'vous auriez eu',
      acceptedAnswers: ['auriez eu', 'vous auriez eu'],
      distractors: ['aurez eu', 'aviez eu', 'aurions eu', 'avez eu'],
    },
    {
      tense: 'conditionnel_passe',
      person: '3p',
      verbForm: 'auraient eu',
      fullDisplay: 'ils/elles auraient eu',
      acceptedAnswers: ['auraient eu', 'ils auraient eu', 'elles auraient eu'],
      distractors: ['auront eu', 'avaient eu', 'ont eu', 'auraient'],
    },

    // 10. Subjonctif Présent
    {
      tense: 'subjonctif_present',
      person: '1s',
      verbForm: 'aie',
      fullDisplay: "que j'aie",
      acceptedAnswers: ['aie', "que j'aie", "j'aie", 'que j aie'],
      distractors: ['aies', 'ait', 'ai', 'avais'],
    },
    {
      tense: 'subjonctif_present',
      person: '2s',
      verbForm: 'aies',
      fullDisplay: 'que tu aies',
      acceptedAnswers: ['aies', 'que tu aies', 'tu aies'],
      distractors: ['aie', 'ait', 'as', 'avais'],
    },
    {
      tense: 'subjonctif_present',
      person: '3s',
      verbForm: 'ait',
      fullDisplay: "qu'il/elle ait",
      acceptedAnswers: ['ait', "qu'il ait", "qu'elle ait", "qu'on ait", 'il ait', 'elle ait', 'ait'],
      distractors: ['aie', 'aies', 'a', 'avait'],
    },
    {
      tense: 'subjonctif_present',
      person: '1p',
      verbForm: 'ayons',
      fullDisplay: 'que nous ayons',
      acceptedAnswers: ['ayons', 'que nous ayons', 'nous ayons'],
      distractors: ['avons', 'avions', 'aurions', 'ayez'],
    },
    {
      tense: 'subjonctif_present',
      person: '2p',
      verbForm: 'ayez',
      fullDisplay: 'que vous ayez',
      acceptedAnswers: ['ayez', 'que vous ayez', 'vous ayez'],
      distractors: ['avez', 'aviez', 'auriez', 'ayons'],
    },
    {
      tense: 'subjonctif_present',
      person: '3p',
      verbForm: 'aient',
      fullDisplay: "qu'ils/elles aient",
      acceptedAnswers: ['aient', "qu'ils aient", "qu'elles aient", 'ils aient', 'elles aient'],
      distractors: ['ont', 'avaient', 'auraient', 'eurent'],
    },

    // 11. Impératif Présent (3 personnes seulement)
    {
      tense: 'imperatif_present',
      person: 'imp_2s',
      verbForm: 'aie',
      fullDisplay: 'aie (2e pers. singulier)',
      acceptedAnswers: ['aie'],
      distractors: ['as', 'aies', 'ait', 'ayons'],
    },
    {
      tense: 'imperatif_present',
      person: 'imp_1p',
      verbForm: 'ayons',
      fullDisplay: 'ayons (1re pers. pluriel)',
      acceptedAnswers: ['ayons'],
      distractors: ['avons', 'avions', 'aurons', 'ayez'],
    },
    {
      tense: 'imperatif_present',
      person: 'imp_2p',
      verbForm: 'ayez',
      fullDisplay: 'ayez (2e pers. pluriel)',
      acceptedAnswers: ['ayez'],
      distractors: ['avez', 'aviez', 'aurez', 'ayons'],
    },

    // 12. Infinitif Présent
    {
      tense: 'infinitif_present',
      person: 'none',
      verbForm: 'avoir',
      fullDisplay: 'avoir',
      acceptedAnswers: ['avoir'],
      distractors: ['ayant', 'eu', 'avoir eu', 'être'],
    },

    // 13. Infinitif Passé
    {
      tense: 'infinitif_passe',
      person: 'none',
      verbForm: 'avoir eu',
      fullDisplay: 'avoir eu',
      acceptedAnswers: ['avoir eu'],
      distractors: ['ayant eu', 'eu', 'avoir', 'ayant'],
    },

    // 14. Participe Présent
    {
      tense: 'participe_present',
      person: 'none',
      verbForm: 'ayant',
      fullDisplay: 'ayant',
      acceptedAnswers: ['ayant'],
      distractors: ['avoir', 'eu', 'étant', 'ayons'],
    },

    // 15. Participe Passé
    {
      tense: 'participe_passe',
      person: 'none',
      verbForm: 'eu',
      fullDisplay: 'eu (eue, eus, eues)',
      acceptedAnswers: ['eu', 'eue', 'eus', 'eues'],
      distractors: ['ayant', 'eut', 'eus', 'avoir'],
    },
  ],
};

// Additional verbs to showcase modularity & expandability
export const AVAILABLE_VERBS: VerbData[] = [
  VERB_AVOIR,
];

export interface GeneratedQuestion {
  id: string;
  verbId: string;
  verbName: string;
  tense: TenseKey;
  tenseLabel: string;
  category: string;
  person: PersonKey;
  personLabel: string;
  prompt: string; // The natural question text
  targetAnswer: string; // Display answer (e.g. "vous auriez" or "auriez")
  shortAnswer: string; // Just the conjugated form (e.g. "auriez")
  fullDisplay: string;
  acceptedAnswers: string[];
  options: string[]; // 4 multiple choice options
  hint: string;
  explanation: string;
}

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Builds the exact French question prompt requested:
 * e.g. "Quel est le conditionnel présent du verbe avoir à la deuxième personne du pluriel ?"
 */
export function formatQuestionPrompt(verbName: string, tenseKey: TenseKey, personKey: PersonKey): string {
  const tenseInfo = TENSES[tenseKey];
  const tenseName = tenseInfo.label.toLowerCase();

  if (tenseKey === 'infinitif_present') {
    return `Quel est l'infinitif présent du verbe ${verbName} ?`;
  }
  if (tenseKey === 'infinitif_passe') {
    return `Quel est l'infinitif passé du verbe ${verbName} ?`;
  }
  if (tenseKey === 'participe_present') {
    return `Quel est le participe présent du verbe ${verbName} ?`;
  }
  if (tenseKey === 'participe_passe') {
    return `Quel est le participe passé (forme de base) du verbe ${verbName} ?`;
  }
  if (tenseKey === 'imperatif_present') {
    const pInfo = PERSONS[personKey];
    return `Quel est l'impératif présent du verbe ${verbName} à la ${pInfo.label.toLowerCase()} ?`;
  }

  const pInfo = PERSONS[personKey];
  return `Quel est le ${tenseName} du verbe ${verbName} à la ${pInfo.label.toLowerCase()} ?`;
}

/**
 * Generates 30 balanced questions mixing all 15 tenses for the chosen verb.
 */
export function generate30Questions(verb: VerbData = VERB_AVOIR): GeneratedQuestion[] {
  const pool = [...verb.conjugations];
  const shuffledPool = shuffle(pool);

  // We want exactly 30 questions.
  // There are 67 total possible questions in VERB_AVOIR pool.
  // To ensure excellent diversity across all 15 tenses, we take at least 1-2 questions from each tense,
  // then fill the rest up to 30 items.
  const tenseBuckets: Record<TenseKey, ConjugationItem[]> = {} as Record<TenseKey, ConjugationItem[]>;
  Object.keys(TENSES).forEach((k) => {
    tenseBuckets[k as TenseKey] = [];
  });

  shuffledPool.forEach((item) => {
    tenseBuckets[item.tense].push(item);
  });

  const selectedItems: ConjugationItem[] = [];

  // Guarantee representation of every single requested tense (15 tenses)
  Object.keys(tenseBuckets).forEach((tKey) => {
    const items = tenseBuckets[tKey as TenseKey];
    if (items.length > 0) {
      selectedItems.push(items.pop()!);
    }
  });

  // Now we have 15 items, need 15 more to reach 30.
  // Pick from the remaining items in shuffledPool
  const remaining = shuffledPool.filter((item) => !selectedItems.includes(item));
  const additional = shuffle(remaining).slice(0, 30 - selectedItems.length);
  const final30 = shuffle([...selectedItems, ...additional]);

  // Transform into full question objects
  return final30.map((item, index) => {
    const tenseInfo = TENSES[item.tense];
    const personInfo = PERSONS[item.person];
    const prompt = formatQuestionPrompt(verb.name, item.tense, item.person);

    // Options for multiple choice: correct answer + 3 distractors
    const allDistractors = shuffle(item.distractors.filter((d) => d !== item.verbForm));
    const distractorSlice = allDistractors.slice(0, 3);
    // If not enough distractors, generate fallback from other conjugations
    while (distractorSlice.length < 3) {
      const fallback = verb.conjugations[Math.floor(Math.random() * verb.conjugations.length)].verbForm;
      if (fallback !== item.verbForm && !distractorSlice.includes(fallback)) {
        distractorSlice.push(fallback);
      }
    }
    const options = shuffle([item.verbForm, ...distractorSlice]);

    // Construct helpful hint
    let hint = `${tenseInfo.category} • ${tenseInfo.label}`;
    if (personInfo.pronoun) {
      hint += ` (Pronom : ${personInfo.pronoun})`;
    }

    return {
      id: `q-${index + 1}-${item.tense}-${item.person}`,
      verbId: verb.id,
      verbName: verb.name,
      tense: item.tense,
      tenseLabel: tenseInfo.label,
      category: tenseInfo.category,
      person: item.person,
      personLabel: personInfo.label,
      prompt,
      targetAnswer: item.verbForm,
      shortAnswer: item.verbForm,
      fullDisplay: item.fullDisplay,
      acceptedAnswers: item.acceptedAnswers,
      options,
      hint,
      explanation: tenseInfo.explanation,
    };
  });
}

/**
 * Intelligent normalization to evaluate student's typed answer
 */
export function isAnswerCorrect(studentInput: string, question: GeneratedQuestion): boolean {
  if (!studentInput) return false;

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/['’]/g, "'") // uniformize curly apostrophes
      .replace(/\s+/g, ' ');

  const inputNorm = normalize(studentInput);

  // Direct match in accepted list
  for (const acc of question.acceptedAnswers) {
    if (normalize(acc) === inputNorm) return true;
  }

  // Also check if input matches just the conjugated form alone or fullDisplay
  if (normalize(question.targetAnswer) === inputNorm) return true;
  if (normalize(question.fullDisplay) === inputNorm) return true;

  // If user typed "vous auriez" while target was "auriez", or vice-versa
  const withoutPronouns = inputNorm
    .replace(/^(j'|je\s+|tu\s+|il\s+|elle\s+|on\s+|nous\s+|vous\s+|ils\s+|elles\s+|que\s+j'|qu'il\s+|qu'elle\s+|qu'on\s+|qu'ils\s+|qu'elles\s+|que\s+tu\s+|que\s+nous\s+|que\s+vous\s+)/, '')
    .trim();

  if (withoutPronouns === normalize(question.targetAnswer)) return true;

  return false;
}
