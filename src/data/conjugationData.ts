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
  label: string;
  pronoun: string;
  subjonctifPrefix?: string;
}

export const PERSONS: Record<PersonKey, PersonInfo> = {
  '1s': { key: '1s', label: '1re personne du singulier', pronoun: "je" },
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
  verbForm: string;
  fullDisplay: string;
  acceptedAnswers: string[];
  distractors: string[];
}

export type VerbCategory = 'auxiliaire' | '1er_groupe' | '2e_groupe' | '3e_groupe';

export interface VerbData {
  id: string;
  name: string;
  group: string;
  category: VerbCategory;
  description: string;
  auxiliary: 'avoir' | 'être';
  isPOC: boolean;
  conjugations: ConjugationItem[];
}

interface VerbRawDef {
  id: string;
  name: string;
  group: string;
  category: VerbCategory;
  description: string;
  auxiliary: 'avoir' | 'être';
  indicatifPresent: [string, string, string, string, string, string];
  imparfait: [string, string, string, string, string, string];
  passeSimple: [string, string, string, string, string, string];
  futurSimple: [string, string, string, string, string, string];
  conditionnelPresent: [string, string, string, string, string, string];
  subjonctifPresent: [string, string, string, string, string, string];
  imperatifPresent: [string, string, string]; // [imp_2s, imp_1p, imp_2p]
  participePresent: string;
  participePasse: string;
  participePasseDisplay?: string;
  extraAccepted1s?: string[];
}

// Auxiliaries data for compound tenses
const AUX_AVOIR = {
  present: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
  imparfait: ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'],
  futur: ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'],
  conditionnel: ['aurais', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient'],
  infinitif: 'avoir',
};

const AUX_ETRE = {
  present: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
  imparfait: ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'],
  futur: ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'],
  conditionnel: ['serais', 'serais', 'serait', 'serions', 'seriez', 'seraient'],
  infinitif: 'être',
};

const PERSON_KEYS: PersonKey[] = ['1s', '2s', '3s', '1p', '2p', '3p'];

function startsWithVowelOrH(word: string): boolean {
  return /^[aeiouyéèêëàâîïôûùh]/i.test(word);
}

function buildItem(
  verb: VerbRawDef,
  tense: TenseKey,
  person: PersonKey,
  verbForm: string,
  allSimpleForms: string[]
): ConjugationItem {
  let fullDisplay = verbForm;
  const acceptedAnswers: string[] = [verbForm];

  const startsVowel = startsWithVowelOrH(verbForm);

  if (tense === 'subjonctif_present') {
    if (person === '1s') {
      fullDisplay = startsVowel ? `que j'${verbForm}` : `que je ${verbForm}`;
      acceptedAnswers.push(fullDisplay, startsVowel ? `j'${verbForm}` : `je ${verbForm}`);
    } else if (person === '2s') {
      fullDisplay = `que tu ${verbForm}`;
      acceptedAnswers.push(fullDisplay, `tu ${verbForm}`);
    } else if (person === '3s') {
      fullDisplay = `qu'il/elle ${verbForm}`;
      acceptedAnswers.push(`qu'il ${verbForm}`, `qu'elle ${verbForm}`, `qu'on ${verbForm}`, `il ${verbForm}`, `elle ${verbForm}`);
    } else if (person === '1p') {
      fullDisplay = `que nous ${verbForm}`;
      acceptedAnswers.push(fullDisplay, `nous ${verbForm}`);
    } else if (person === '2p') {
      fullDisplay = `que vous ${verbForm}`;
      acceptedAnswers.push(fullDisplay, `vous ${verbForm}`);
    } else if (person === '3p') {
      fullDisplay = `qu'ils/elles ${verbForm}`;
      acceptedAnswers.push(`qu'ils ${verbForm}`, `qu'elles ${verbForm}`, `ils ${verbForm}`, `elles ${verbForm}`);
    }
  } else if (tense === 'imperatif_present') {
    if (person === 'imp_2s') fullDisplay = `${verbForm} (2e pers. singulier)`;
    else if (person === 'imp_1p') fullDisplay = `${verbForm} (1re pers. pluriel)`;
    else if (person === 'imp_2p') fullDisplay = `${verbForm} (2e pers. pluriel)`;
  } else if (tense === 'infinitif_present') {
    fullDisplay = verbForm;
  } else if (tense === 'infinitif_passe') {
    fullDisplay = verbForm;
  } else if (tense === 'participe_present') {
    fullDisplay = verbForm;
  } else if (tense === 'participe_passe') {
    fullDisplay = verb.participePasseDisplay || verbForm;
    acceptedAnswers.push(`${verb.participePasse}e`, `${verb.participePasse}s`, `${verb.participePasse}es`);
  } else {
    // Indicatif or Conditionnel
    if (person === '1s') {
      fullDisplay = startsVowel ? `j'${verbForm}` : `je ${verbForm}`;
      acceptedAnswers.push(fullDisplay);
      if (startsVowel) acceptedAnswers.push(`j ${verbForm}`);
      if (verb.extraAccepted1s) {
        verb.extraAccepted1s.forEach((ex) => acceptedAnswers.push(ex));
      }
    } else if (person === '2s') {
      fullDisplay = `tu ${verbForm}`;
      acceptedAnswers.push(fullDisplay);
    } else if (person === '3s') {
      fullDisplay = `il/elle ${verbForm}`;
      acceptedAnswers.push(`il ${verbForm}`, `elle ${verbForm}`, `on ${verbForm}`);
    } else if (person === '1p') {
      fullDisplay = `nous ${verbForm}`;
      acceptedAnswers.push(fullDisplay);
    } else if (person === '2p') {
      fullDisplay = `vous ${verbForm}`;
      acceptedAnswers.push(fullDisplay);
    } else if (person === '3p') {
      fullDisplay = `ils/elles ${verbForm}`;
      acceptedAnswers.push(`ils ${verbForm}`, `elles ${verbForm}`);
    }
  }

  // Generate intelligent distractors
  const distractorsSet = new Set<string>();

  // If compound tense, create plausible auxiliary distractors
  if (TENSES[tense].isCompound && tense !== 'infinitif_passe') {
    const isEtre = verb.auxiliary === 'être';
    const pp = verb.participePasse;
    const isPlural = person === '1p' || person === '2p' || person === '3p';
    const ppAgreement = isEtre && isPlural ? `${pp}s` : pp;

    const auxOther = isEtre
      ? ['suis', 'es', 'est', 'étais', 'était', 'serai', 'sera', 'serais']
      : ['ai', 'as', 'a', 'avais', 'avait', 'aurai', 'aura', 'aurais'];

    auxOther.forEach((aux) => {
      const candidate = `${aux} ${ppAgreement}`;
      if (candidate !== verbForm) distractorsSet.add(candidate);
    });
  }

  // Add simple forms from other persons or tenses
  for (const f of allSimpleForms) {
    if (f && f !== verbForm && !distractorsSet.has(f)) {
      distractorsSet.add(f);
      if (distractorsSet.size >= 8) break;
    }
  }

  // Ensure at least 3 distractors
  const distractors = Array.from(distractorsSet).slice(0, 4);

  return {
    tense,
    person,
    verbForm,
    fullDisplay,
    acceptedAnswers: Array.from(new Set(acceptedAnswers)),
    distractors,
  };
}

function createVerbData(raw: VerbRawDef): VerbData {
  const allSimpleForms = [
    ...raw.indicatifPresent,
    ...raw.imparfait,
    ...raw.passeSimple,
    ...raw.futurSimple,
    ...raw.conditionnelPresent,
    ...raw.subjonctifPresent,
    ...raw.imperatifPresent,
    raw.participePresent,
    raw.participePasse,
  ];

  const conjugations: ConjugationItem[] = [];

  // 1. Indicatif Présent
  raw.indicatifPresent.forEach((vf, idx) => {
    conjugations.push(buildItem(raw, 'indicatif_present', PERSON_KEYS[idx], vf, allSimpleForms));
  });

  // 2. Passé Composé
  const auxP = raw.auxiliary === 'être' ? AUX_ETRE.present : AUX_AVOIR.present;
  auxP.forEach((aux, idx) => {
    const isPlur = idx >= 3;
    const pp = raw.auxiliary === 'être' && isPlur ? `${raw.participePasse}s` : raw.participePasse;
    conjugations.push(buildItem(raw, 'passe_compose', PERSON_KEYS[idx], `${aux} ${pp}`, allSimpleForms));
  });

  // 3. Imparfait
  raw.imparfait.forEach((vf, idx) => {
    conjugations.push(buildItem(raw, 'imparfait', PERSON_KEYS[idx], vf, allSimpleForms));
  });

  // 4. Plus-que-parfait
  const auxImp = raw.auxiliary === 'être' ? AUX_ETRE.imparfait : AUX_AVOIR.imparfait;
  auxImp.forEach((aux, idx) => {
    const isPlur = idx >= 3;
    const pp = raw.auxiliary === 'être' && isPlur ? `${raw.participePasse}s` : raw.participePasse;
    conjugations.push(buildItem(raw, 'plus_que_parfait', PERSON_KEYS[idx], `${aux} ${pp}`, allSimpleForms));
  });

  // 5. Passé Simple
  raw.passeSimple.forEach((vf, idx) => {
    conjugations.push(buildItem(raw, 'passe_simple', PERSON_KEYS[idx], vf, allSimpleForms));
  });

  // 6. Futur Simple
  raw.futurSimple.forEach((vf, idx) => {
    conjugations.push(buildItem(raw, 'futur_simple', PERSON_KEYS[idx], vf, allSimpleForms));
  });

  // 7. Futur Antérieur
  const auxFut = raw.auxiliary === 'être' ? AUX_ETRE.futur : AUX_AVOIR.futur;
  auxFut.forEach((aux, idx) => {
    const isPlur = idx >= 3;
    const pp = raw.auxiliary === 'être' && isPlur ? `${raw.participePasse}s` : raw.participePasse;
    conjugations.push(buildItem(raw, 'futur_anterieur', PERSON_KEYS[idx], `${aux} ${pp}`, allSimpleForms));
  });

  // 8. Conditionnel Présent
  raw.conditionnelPresent.forEach((vf, idx) => {
    conjugations.push(buildItem(raw, 'conditionnel_present', PERSON_KEYS[idx], vf, allSimpleForms));
  });

  // 9. Conditionnel Passé
  const auxCond = raw.auxiliary === 'être' ? AUX_ETRE.conditionnel : AUX_AVOIR.conditionnel;
  auxCond.forEach((aux, idx) => {
    const isPlur = idx >= 3;
    const pp = raw.auxiliary === 'être' && isPlur ? `${raw.participePasse}s` : raw.participePasse;
    conjugations.push(buildItem(raw, 'conditionnel_passe', PERSON_KEYS[idx], `${aux} ${pp}`, allSimpleForms));
  });

  // 10. Subjonctif Présent
  raw.subjonctifPresent.forEach((vf, idx) => {
    conjugations.push(buildItem(raw, 'subjonctif_present', PERSON_KEYS[idx], vf, allSimpleForms));
  });

  // 11. Impératif Présent (3 personnes)
  const impKeys: PersonKey[] = ['imp_2s', 'imp_1p', 'imp_2p'];
  raw.imperatifPresent.forEach((vf, idx) => {
    conjugations.push(buildItem(raw, 'imperatif_present', impKeys[idx], vf, allSimpleForms));
  });

  // 12. Infinitif Présent
  conjugations.push(buildItem(raw, 'infinitif_present', 'none', raw.name, allSimpleForms));

  // 13. Infinitif Passé
  const infAux = raw.auxiliary === 'être' ? 'être' : 'avoir';
  conjugations.push(buildItem(raw, 'infinitif_passe', 'none', `${infAux} ${raw.participePasse}`, allSimpleForms));

  // 14. Participe Présent
  conjugations.push(buildItem(raw, 'participe_present', 'none', raw.participePresent, allSimpleForms));

  // 15. Participe Passé
  conjugations.push(buildItem(raw, 'participe_passe', 'none', raw.participePasse, allSimpleForms));

  return {
    id: raw.id,
    name: raw.name,
    group: raw.group,
    category: raw.category,
    description: raw.description,
    auxiliary: raw.auxiliary,
    isPOC: raw.id === 'avoir' || raw.id === 'etre',
    conjugations,
  };
}

// -------------------------------------------------------------
// VERB DEFINITIONS (30+ key verbs of Quebec Secondary 1 / PFEQ)
// -------------------------------------------------------------
const RAW_VERBS: VerbRawDef[] = [
  // 1. AVOIR
  {
    id: 'avoir',
    name: 'avoir',
    group: 'Auxiliaire',
    category: 'auxiliaire',
    description: "Auxiliaire fondamental et verbe de possession.",
    auxiliary: 'avoir',
    indicatifPresent: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
    imparfait: ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'],
    passeSimple: ['eus', 'eus', 'eut', 'eûmes', 'eûtes', 'eurent'],
    futurSimple: ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'],
    conditionnelPresent: ['aurais', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient'],
    subjonctifPresent: ['aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'],
    imperatifPresent: ['aie', 'ayons', 'ayez'],
    participePresent: 'ayant',
    participePasse: 'eu',
    participePasseDisplay: 'eu (eue, eus, eues)',
  },

  // 2. ÊTRE
  {
    id: 'etre',
    name: 'être',
    group: 'Auxiliaire',
    category: 'auxiliaire',
    description: "Auxiliaire fondamental et verbe d'état.",
    auxiliary: 'avoir',
    indicatifPresent: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
    imparfait: ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'],
    passeSimple: ['fus', 'fus', 'fut', 'fûmes', 'fûtes', 'furent'],
    futurSimple: ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'],
    conditionnelPresent: ['serais', 'serais', 'serait', 'serions', 'seriez', 'seraient'],
    subjonctifPresent: ['sois', 'sois', 'soit', 'soyons', 'soyez', 'soient'],
    imperatifPresent: ['sois', 'soyons', 'soyez'],
    participePresent: 'étant',
    participePasse: 'été',
    participePasseDisplay: 'été (invariable)',
  },

  // 3. AIMER (1er groupe régulier)
  {
    id: 'aimer',
    name: 'aimer',
    group: '1er groupe (-er)',
    category: '1er_groupe',
    description: "Modèle régulier des verbes en -er.",
    auxiliary: 'avoir',
    indicatifPresent: ['aime', 'aimes', 'aime', 'aimons', 'aimez', 'aiment'],
    imparfait: ['aimais', 'aimais', 'aimait', 'aimions', 'aimiez', 'aimaient'],
    passeSimple: ['aimai', 'aimas', 'aima', 'aimâmes', 'aimâtes', 'aimèrent'],
    futurSimple: ['aimerai', 'aimeras', 'aimera', 'aimerons', 'aimerez', 'aimeront'],
    conditionnelPresent: ['aimerais', 'aimerais', 'aimerait', 'aimerions', 'aimeriez', 'aimeraient'],
    subjonctifPresent: ['aime', 'aimes', 'aime', 'aimions', 'aimiez', 'aiment'],
    imperatifPresent: ['aime', 'aimons', 'aimez'],
    participePresent: 'aimant',
    participePasse: 'aimé',
    participePasseDisplay: 'aimé (aimée, aimés, aimées)',
  },

  // 4. COMMENCER (1er groupe, -cer cédille)
  {
    id: 'commencer',
    name: 'commencer',
    group: '1er groupe (-cer)',
    category: '1er_groupe',
    description: "Particularité -cer : cédille (ç) devant a et o.",
    auxiliary: 'avoir',
    indicatifPresent: ['commence', 'commences', 'commence', 'commençons', 'commencez', 'commencent'],
    imparfait: ['commençais', 'commençais', 'commençait', 'commencions', 'commenciez', 'commençaient'],
    passeSimple: ['commençai', 'commenças', 'commença', 'commençâmes', 'commençâtes', 'commencèrent'],
    futurSimple: ['commencerai', 'commenceras', 'commencera', 'commencerons', 'commencerez', 'commenceront'],
    conditionnelPresent: ['commencerais', 'commencerais', 'commencerait', 'commencerions', 'commenceriez', 'commenceraient'],
    subjonctifPresent: ['commence', 'commences', 'commence', 'commencions', 'commenciez', 'commencent'],
    imperatifPresent: ['commence', 'commençons', 'commencez'],
    participePresent: 'commençant',
    participePasse: 'commencé',
  },

  // 5. MANGER (1er groupe, -ger ge)
  {
    id: 'manger',
    name: 'manger',
    group: '1er groupe (-ger)',
    category: '1er_groupe',
    description: "Particularité -ger : ajout d'un 'e' muet devant a et o.",
    auxiliary: 'avoir',
    indicatifPresent: ['mange', 'manges', 'mange', 'mangeons', 'mangez', 'mangent'],
    imparfait: ['mangeais', 'mangeais', 'mangeait', 'mangions', 'mangiez', 'mangeaient'],
    passeSimple: ['mangeai', 'mangeas', 'mangea', 'mangeâmes', 'mangeâtes', 'mangèrent'],
    futurSimple: ['mangerai', 'mangeras', 'mangera', 'mangerons', 'mangerez', 'mangeront'],
    conditionnelPresent: ['mangerais', 'mangerais', 'mangerait', 'mangerions', 'mangeriez', 'mangeraient'],
    subjonctifPresent: ['mange', 'manges', 'mange', 'mangions', 'mangiez', 'mangent'],
    imperatifPresent: ['mange', 'mangeons', 'mangez'],
    participePresent: 'mangeant',
    participePasse: 'mangé',
  },

  // 6. APPELER (1er groupe, -eler doublement de l)
  {
    id: 'appeler',
    name: 'appeler',
    group: '1er groupe (-eler)',
    category: '1er_groupe',
    description: "Double consonne 'll' devant une syllabe muette.",
    auxiliary: 'avoir',
    indicatifPresent: ['appelle', 'appelles', 'appelle', 'appelons', 'appelez', 'appellent'],
    imparfait: ['appelais', 'appelais', 'appelait', 'appelions', 'appeliez', 'appelaient'],
    passeSimple: ['appelai', 'appelas', 'appela', 'appelâmes', 'appelâtes', 'appelèrent'],
    futurSimple: ['appellerai', 'appelleras', 'appellera', 'appellerons', 'appellerez', 'appelleront'],
    conditionnelPresent: ['appellerais', 'appellerais', 'appellerait', 'appellerions', 'appelleriez', 'appelleraient'],
    subjonctifPresent: ['appelle', 'appelles', 'appelle', 'appelions', 'appeliez', 'appellent'],
    imperatifPresent: ['appelle', 'appelons', 'appelez'],
    participePresent: 'appelant',
    participePasse: 'appelé',
  },

  // 7. JETER (1er groupe, -eter doublement de t)
  {
    id: 'jeter',
    name: 'jeter',
    group: '1er groupe (-eter)',
    category: '1er_groupe',
    description: "Double consonne 'tt' devant une syllabe muette.",
    auxiliary: 'avoir',
    indicatifPresent: ['jette', 'jettes', 'jette', 'jetons', 'jetez', 'jettent'],
    imparfait: ['jetais', 'jetais', 'jetait', 'jetions', 'jetiez', 'jetaient'],
    passeSimple: ['jetai', 'jetas', 'jeta', 'jetâmes', 'jetâtes', 'jetèrent'],
    futurSimple: ['jetterai', 'jetteras', 'jettera', 'jetterons', 'jetterez', 'jetteront'],
    conditionnelPresent: ['jetterais', 'jetterais', 'jetterait', 'jetterions', 'jetteriez', 'jetteraient'],
    subjonctifPresent: ['jette', 'jettes', 'jette', 'jetions', 'jetiez', 'jettent'],
    imperatifPresent: ['jette', 'jetons', 'jetez'],
    participePresent: 'jetant',
    participePasse: 'jeté',
  },

  // 8. ENVOYER (1er groupe, y -> i, futur en -verr-)
  {
    id: 'envoyer',
    name: 'envoyer',
    group: '1er groupe (-oyer)',
    category: '1er_groupe',
    description: "y change en i devant e muet; radical futur en enverr-.",
    auxiliary: 'avoir',
    indicatifPresent: ['envoie', 'envoies', 'envoie', 'envoyons', 'envoyez', 'envoient'],
    imparfait: ['envoyais', 'envoyais', 'envoyait', 'envoyions', 'envoyiez', 'envoyaient'],
    passeSimple: ['envoyai', 'envoyas', 'envoya', 'envoyâmes', 'envoyâtes', 'envoyèrent'],
    futurSimple: ['enverrai', 'enverras', 'enverra', 'enverrons', 'enverrez', 'enverront'],
    conditionnelPresent: ['enverrais', 'enverrais', 'enverrait', 'enverrions', 'enverriez', 'enverraient'],
    subjonctifPresent: ['envoie', 'envoies', 'envoie', 'envoyions', 'envoyiez', 'envoient'],
    imperatifPresent: ['envoie', 'envoyons', 'envoyez'],
    participePresent: 'envoyant',
    participePasse: 'envoyé',
  },

  // 9. PAYER (1er groupe, y -> i optionnel)
  {
    id: 'payer',
    name: 'payer',
    group: '1er groupe (-ayer)',
    category: '1er_groupe',
    description: "Verbe en -ayer : le 'y' peut se changer en 'i'.",
    auxiliary: 'avoir',
    indicatifPresent: ['paie', 'paies', 'paie', 'payons', 'payez', 'paient'],
    imparfait: ['payais', 'payais', 'payait', 'payions', 'payiez', 'payaient'],
    passeSimple: ['payai', 'payas', 'paya', 'payâmes', 'payâtes', 'payèrent'],
    futurSimple: ['paierai', 'paieras', 'paiera', 'paierons', 'paierez', 'paieront'],
    conditionnelPresent: ['paierais', 'paierais', 'paierait', 'paierions', 'paieriez', 'paieraient'],
    subjonctifPresent: ['paie', 'paies', 'paie', 'payions', 'payiez', 'paient'],
    imperatifPresent: ['paie', 'payons', 'payez'],
    participePresent: 'payant',
    participePasse: 'payé',
  },

  // 10. FINIR (2e groupe modèle)
  {
    id: 'finir',
    name: 'finir',
    group: '2e groupe (-ir en -issant)',
    category: '2e_groupe',
    description: "Modèle régulier du 2e groupe (radical en -iss-).",
    auxiliary: 'avoir',
    indicatifPresent: ['finis', 'finis', 'finit', 'finissons', 'finissez', 'finissent'],
    imparfait: ['finissais', 'finissais', 'finissait', 'finissions', 'finissiez', 'finissaient'],
    passeSimple: ['finis', 'finis', 'finit', 'finîmes', 'finîtes', 'finirent'],
    futurSimple: ['finirai', 'finiras', 'finira', 'finirons', 'finirez', 'finiront'],
    conditionnelPresent: ['finirais', 'finirais', 'finirait', 'finirions', 'finiriez', 'finiraient'],
    subjonctifPresent: ['finisse', 'finisses', 'finisse', 'finissions', 'finissiez', 'finissent'],
    imperatifPresent: ['finis', 'finissons', 'finissez'],
    participePresent: 'finissant',
    participePasse: 'fini',
    participePasseDisplay: 'fini (finie, finis, finies)',
  },

  // 11. CHOISIR (2e groupe)
  {
    id: 'choisir',
    name: 'choisir',
    group: '2e groupe (-ir en -issant)',
    category: '2e_groupe',
    description: "Verbe régulier du 2e groupe.",
    auxiliary: 'avoir',
    indicatifPresent: ['choisis', 'choisis', 'choisit', 'choisissons', 'choisissez', 'choisissent'],
    imparfait: ['choisissais', 'choisissais', 'choisissait', 'choisissions', 'choisissiez', 'choisissaient'],
    passeSimple: ['choisis', 'choisis', 'choisit', 'choisîmes', 'choisîtes', 'choisirent'],
    futurSimple: ['choisirai', 'choisiras', 'choisira', 'choisirons', 'choisirez', 'choisiront'],
    conditionnelPresent: ['choisirais', 'choisirais', 'choisirait', 'choisirions', 'choisiriez', 'choisiraient'],
    subjonctifPresent: ['choisisse', 'choisisses', 'choisisse', 'choisissions', 'choisissiez', 'choisissent'],
    imperatifPresent: ['choisis', 'choisissons', 'choisissez'],
    participePresent: 'choisissant',
    participePasse: 'choisi',
  },

  // 12. AGIR (2e groupe)
  {
    id: 'agir',
    name: 'agir',
    group: '2e groupe (-ir en -issant)',
    category: '2e_groupe',
    description: "Verbe régulier du 2e groupe.",
    auxiliary: 'avoir',
    indicatifPresent: ['agis', 'agis', 'agit', 'agissons', 'agissez', 'agissent'],
    imparfait: ['agissais', 'agissais', 'agissait', 'agissions', 'agissiez', 'agissaient'],
    passeSimple: ['agis', 'agis', 'agit', 'agîmes', 'agîtes', 'agirent'],
    futurSimple: ['agirai', 'agiras', 'agira', 'agirons', 'agirez', 'agiront'],
    conditionnelPresent: ['agirais', 'agirais', 'agirait', 'agirions', 'agiriez', 'agiraient'],
    subjonctifPresent: ['agisse', 'agisses', 'agisse', 'agissions', 'agissiez', 'agissent'],
    imperatifPresent: ['agis', 'agissons', 'agissez'],
    participePresent: 'agissant',
    participePasse: 'agi',
  },

  // 13. ALLER (3e groupe irrégulier, auxiliaire être)
  {
    id: 'aller',
    name: 'aller',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Très fréquent et irrégulier; se conjugue avec l'auxiliaire être.",
    auxiliary: 'être',
    indicatifPresent: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
    imparfait: ['allais', 'allais', 'allait', 'allions', 'alliez', 'allaient'],
    passeSimple: ['allai', 'allas', 'alla', 'allâmes', 'allâtes', 'allèrent'],
    futurSimple: ['irai', 'iras', 'ira', 'irons', 'irez', 'iront'],
    conditionnelPresent: ['irais', 'irais', 'irait', 'irions', 'iriez', 'iraient'],
    subjonctifPresent: ['aille', 'ailles', 'aille', 'allions', 'alliez', 'aillent'],
    imperatifPresent: ['va', 'allons', 'allez'],
    participePresent: 'allant',
    participePasse: 'allé',
    participePasseDisplay: 'allé (allée, allés, allées)',
  },

  // 14. FAIRE (3e groupe irrégulier)
  {
    id: 'faire',
    name: 'faire',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Verbe irrégulier fondamental : 'vous faites', 'ils font'.",
    auxiliary: 'avoir',
    indicatifPresent: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'],
    imparfait: ['faisais', 'faisais', 'faisait', 'faisions', 'faisiez', 'faisaient'],
    passeSimple: ['fis', 'fis', 'fit', 'fîmes', 'fîtes', 'firent'],
    futurSimple: ['ferai', 'feras', 'fera', 'ferons', 'ferez', 'feront'],
    conditionnelPresent: ['ferais', 'ferais', 'ferait', 'ferions', 'feriez', 'feraient'],
    subjonctifPresent: ['fasse', 'fasses', 'fasse', 'fassions', 'fassiez', 'fassent'],
    imperatifPresent: ['fais', 'faisons', 'faites'],
    participePresent: 'faisant',
    participePasse: 'fait',
  },

  // 15. DIRE (3e groupe irrégulier)
  {
    id: 'dire',
    name: 'dire',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Verbe irrégulier fréquent : 'vous dites'.",
    auxiliary: 'avoir',
    indicatifPresent: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'],
    imparfait: ['disais', 'disais', 'disait', 'disions', 'disiez', 'disaient'],
    passeSimple: ['dis', 'dis', 'dit', 'dîmes', 'dîtes', 'dirent'],
    futurSimple: ['dirai', 'diras', 'dira', 'dirons', 'direz', 'diront'],
    conditionnelPresent: ['dirais', 'dirais', 'dirait', 'dirions', 'diriez', 'diraient'],
    subjonctifPresent: ['dise', 'dises', 'dise', 'disions', 'disiez', 'disent'],
    imperatifPresent: ['dis', 'disons', 'dites'],
    participePresent: 'disant',
    participePasse: 'dit',
  },

  // 16. POUVOIR (3e groupe modal)
  {
    id: 'pouvoir',
    name: 'pouvoir',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Verbe modal irrégulier : 'peux/puis', 'puisse'.",
    auxiliary: 'avoir',
    indicatifPresent: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'],
    imparfait: ['pouvais', 'pouvais', 'pouvait', 'pouvions', 'pouviez', 'pouvaient'],
    passeSimple: ['pus', 'pus', 'put', 'pûmes', 'pûtes', 'purent'],
    futurSimple: ['pourrai', 'pourras', 'pourra', 'pourrons', 'pourrez', 'pourront'],
    conditionnelPresent: ['pourrais', 'pourrais', 'pourrait', 'pourrions', 'pourriez', 'pourraient'],
    subjonctifPresent: ['puisse', 'puisses', 'puisse', 'puissions', 'puissiez', 'puissent'],
    imperatifPresent: ['puisse', 'puissions', 'puissez'],
    participePresent: 'pouvant',
    participePasse: 'pu',
    extraAccepted1s: ['puis'],
  },

  // 17. VOULOIR (3e groupe modal)
  {
    id: 'vouloir',
    name: 'vouloir',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Verbe modal irrégulier : radical variable veuill- / voul-.",
    auxiliary: 'avoir',
    indicatifPresent: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'],
    imparfait: ['voulais', 'voulais', 'voulait', 'voulions', 'vouliez', 'voulaient'],
    passeSimple: ['voulus', 'voulus', 'voulut', 'voulûmes', 'voulûtes', 'voulurent'],
    futurSimple: ['voudrai', 'voudras', 'voudra', 'voudrons', 'voudrez', 'voudront'],
    conditionnelPresent: ['voudrais', 'voudrais', 'voudrait', 'voudrions', 'voudriez', 'voudraient'],
    subjonctifPresent: ['veuille', 'veuilles', 'veuille', 'voulions', 'vouliez', 'veuillent'],
    imperatifPresent: ['veuille', 'voulons', 'veuillez'],
    participePresent: 'voulant',
    participePasse: 'voulu',
  },

  // 18. DEVOIR (3e groupe modal)
  {
    id: 'devoir',
    name: 'devoir',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Participe passé avec accent circonflexe : 'dû'.",
    auxiliary: 'avoir',
    indicatifPresent: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'],
    imparfait: ['devais', 'devais', 'devait', 'devions', 'deviez', 'devaient'],
    passeSimple: ['dus', 'dus', 'dut', 'dûmes', 'dûtes', 'durent'],
    futurSimple: ['devrai', 'devras', 'devra', 'devrons', 'devrez', 'devront'],
    conditionnelPresent: ['devrais', 'devrais', 'devrait', 'devrions', 'devriez', 'devraient'],
    subjonctifPresent: ['doive', 'doives', 'doive', 'devions', 'deviez', 'doivent'],
    imperatifPresent: ['dois', 'devons', 'devez'],
    participePresent: 'devant',
    participePasse: 'dû',
    participePasseDisplay: 'dû (due, dus, dues)',
  },

  // 19. SAVOIR (3e groupe)
  {
    id: 'savoir',
    name: 'savoir',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Radical subjonctif et impératif en sach-.",
    auxiliary: 'avoir',
    indicatifPresent: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'],
    imparfait: ['savais', 'savais', 'savait', 'savions', 'saviez', 'savaient'],
    passeSimple: ['sus', 'sus', 'sut', 'sûmes', 'sûtes', 'surent'],
    futurSimple: ['saurai', 'sauras', 'saura', 'saurons', 'saurez', 'sauront'],
    conditionnelPresent: ['saurais', 'saurais', 'saurait', 'saurions', 'sauriez', 'sauraient'],
    subjonctifPresent: ['sache', 'saches', 'sache', 'sachions', 'sachiez', 'sachent'],
    imperatifPresent: ['sache', 'sachons', 'sachez'],
    participePresent: 'sachant',
    participePasse: 'su',
  },

  // 20. VENIR (3e groupe, auxiliaire être)
  {
    id: 'venir',
    name: 'venir',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Passé simple en 'vins'; se conjugue avec l'auxiliaire être.",
    auxiliary: 'être',
    indicatifPresent: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'],
    imparfait: ['venais', 'venais', 'venait', 'venions', 'veniez', 'venaient'],
    passeSimple: ['vins', 'vins', 'vint', 'vînmes', 'vîntes', 'vinrent'],
    futurSimple: ['viendrai', 'viendras', 'viendra', 'viendrons', 'viendrez', 'viendront'],
    conditionnelPresent: ['viendrais', 'viendrais', 'viendrait', 'viendrions', 'viendriez', 'viendraient'],
    subjonctifPresent: ['vienne', 'viennes', 'vienne', 'venions', 'veniez', 'viennent'],
    imperatifPresent: ['viens', 'venons', 'venez'],
    participePresent: 'venant',
    participePasse: 'venu',
    participePasseDisplay: 'venu (venue, venus, venues)',
  },

  // 21. VOIR (3e groupe)
  {
    id: 'voir',
    name: 'voir',
    group: '3e groupe (irrégulier)',
    category: '3e_groupe',
    description: "Futur en 'verrai'; passé simple en 'vis'.",
    auxiliary: 'avoir',
    indicatifPresent: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'],
    imparfait: ['voyais', 'voyais', 'voyait', 'voyions', 'voyiez', 'voyaient'],
    passeSimple: ['vis', 'vis', 'vit', 'vîmes', 'vîtes', 'virent'],
    futurSimple: ['verrai', 'verras', 'verra', 'verrons', 'verrez', 'verront'],
    conditionnelPresent: ['verrais', 'verrais', 'verrait', 'verrions', 'verriez', 'verraient'],
    subjonctifPresent: ['voie', 'voies', 'voie', 'voyions', 'voyiez', 'voient'],
    imperatifPresent: ['vois', 'voyons', 'voyez'],
    participePresent: 'voyant',
    participePasse: 'vu',
  },

  // 22. PRENDRE (3e groupe -dre)
  {
    id: 'prendre',
    name: 'prendre',
    group: '3e groupe (-dre)',
    category: '3e_groupe',
    description: "Radical en pren- / prenn- / pr-.",
    auxiliary: 'avoir',
    indicatifPresent: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
    imparfait: ['prenais', 'prenais', 'prenait', 'prenions', 'preniez', 'prenaient'],
    passeSimple: ['pris', 'pris', 'prit', 'prîmes', 'prîtes', 'prirent'],
    futurSimple: ['prendrai', 'prendras', 'prendra', 'prendrons', 'prendrez', 'prendront'],
    conditionnelPresent: ['prendrais', 'prendrais', 'prendrait', 'prendrions', 'prendriez', 'prendraient'],
    subjonctifPresent: ['prenne', 'prennes', 'prenne', 'prenions', 'preniez', 'prennent'],
    imperatifPresent: ['prends', 'prenons', 'prenez'],
    participePresent: 'prenant',
    participePasse: 'pris',
  },

  // 23. METTRE (3e groupe -ttre)
  {
    id: 'mettre',
    name: 'mettre',
    group: '3e groupe (-ttre)',
    category: '3e_groupe',
    description: "Alternance un 't' / deux 'tt'; participe passé 'mis'.",
    auxiliary: 'avoir',
    indicatifPresent: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'],
    imparfait: ['mettais', 'mettais', 'mettait', 'mettions', 'mettiez', 'mettaient'],
    passeSimple: ['mis', 'mis', 'mit', 'mîmes', 'mîtes', 'mirent'],
    futurSimple: ['mettrai', 'mettras', 'mettra', 'mettrons', 'mettrez', 'mettront'],
    conditionnelPresent: ['mettrais', 'mettrais', 'mettrait', 'mettrions', 'mettriez', 'mettraient'],
    subjonctifPresent: ['mette', 'mettes', 'mette', 'mettions', 'mettiez', 'mettent'],
    imperatifPresent: ['mets', 'mettons', 'mettez'],
    participePresent: 'mettant',
    participePasse: 'mis',
  },

  // 24. PARTIR (3e groupe -ir, auxiliaire être)
  {
    id: 'partir',
    name: 'partir',
    group: '3e groupe (-ir)',
    category: '3e_groupe',
    description: "Verbe en -ir sans -iss-; se conjugue avec l'auxiliaire être.",
    auxiliary: 'être',
    indicatifPresent: ['pars', 'pars', 'part', 'partons', 'partez', 'partent'],
    imparfait: ['partais', 'partais', 'partait', 'partions', 'partiez', 'partaient'],
    passeSimple: ['partis', 'partis', 'partit', 'partîmes', 'partîtes', 'partirent'],
    futurSimple: ['partirai', 'partiras', 'partira', 'partirons', 'partirez', 'partiront'],
    conditionnelPresent: ['partirais', 'partirais', 'partirait', 'partirions', 'partiriez', 'partiraient'],
    subjonctifPresent: ['parte', 'partes', 'parte', 'partions', 'partiez', 'partent'],
    imperatifPresent: ['pars', 'partons', 'partez'],
    participePresent: 'partant',
    participePasse: 'parti',
    participePasseDisplay: 'parti (partie, partis, parties)',
  },

  // 25. SORTIR (3e groupe -ir, auxiliaire être)
  {
    id: 'sortir',
    name: 'sortir',
    group: '3e groupe (-ir)',
    category: '3e_groupe',
    description: "Verbe en -ir sans -iss-; se conjugue avec l'auxiliaire être.",
    auxiliary: 'être',
    indicatifPresent: ['sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent'],
    imparfait: ['sortais', 'sortais', 'sortait', 'sortions', 'sortiez', 'sortaient'],
    passeSimple: ['sortis', 'sortis', 'sortit', 'sortîmes', 'sortîtes', 'sortirent'],
    futurSimple: ['sortirai', 'sortiras', 'sortira', 'sortirons', 'sortirez', 'sortiront'],
    conditionnelPresent: ['sortirais', 'sortirais', 'sortirait', 'sortirions', 'sortiriez', 'sortiraient'],
    subjonctifPresent: ['sorte', 'sortes', 'sorte', 'sortions', 'sortiez', 'sortent'],
    imperatifPresent: ['sors', 'sortons', 'sortez'],
    participePresent: 'sortant',
    participePasse: 'sorti',
    participePasseDisplay: 'sorti (sortie, sortis, sorties)',
  },

  // 26. DORMIR (3e groupe -ir, auxiliaire avoir)
  {
    id: 'dormir',
    name: 'dormir',
    group: '3e groupe (-ir)',
    category: '3e_groupe',
    description: "Verbe en -ir sans -iss-; se conjugue avec l'auxiliaire avoir.",
    auxiliary: 'avoir',
    indicatifPresent: ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'],
    imparfait: ['dormais', 'dormais', 'dormait', 'dormions', 'dormiez', 'dormaient'],
    passeSimple: ['dormis', 'dormis', 'dormit', 'dormîmes', 'dormîtes', 'dormirent'],
    futurSimple: ['dormirai', 'dormiras', 'dormira', 'dormirons', 'dormirez', 'dormiront'],
    conditionnelPresent: ['dormirais', 'dormirais', 'dormirait', 'dormirions', 'dormiriez', 'dormiraient'],
    subjonctifPresent: ['dorme', 'dormes', 'dorme', 'dormions', 'dormiez', 'dorment'],
    imperatifPresent: ['dors', 'dormons', 'dormez'],
    participePresent: 'dormant',
    participePasse: 'dormi',
  },

  // 27. RENDRE (3e groupe -dre)
  {
    id: 'rendre',
    name: 'rendre',
    group: '3e groupe (-dre)',
    category: '3e_groupe',
    description: "Modèle régulier des verbes en -dre.",
    auxiliary: 'avoir',
    indicatifPresent: ['rends', 'rends', 'rend', 'rendons', 'rendez', 'rendent'],
    imparfait: ['rendais', 'rendais', 'rendait', 'rendions', 'rendiez', 'rendaient'],
    passeSimple: ['rendis', 'rendis', 'rendit', 'rendîmes', 'rendîtes', 'rendirent'],
    futurSimple: ['rendrai', 'rendras', 'rendra', 'rendrons', 'rendrez', 'rendront'],
    conditionnelPresent: ['rendrais', 'rendrais', 'rendrait', 'rendrions', 'rendriez', 'rendraient'],
    subjonctifPresent: ['rende', 'rendes', 'rende', 'rendions', 'rendiez', 'rendent'],
    imperatifPresent: ['rends', 'rendons', 'rendez'],
    participePresent: 'rendant',
    participePasse: 'rendu',
  },

  // 28. ÉCRIRE (3e groupe -ire)
  {
    id: 'ecrire',
    name: 'écrire',
    group: '3e groupe (-ire)',
    category: '3e_groupe',
    description: "Radical en écriv- aux personnes plurielles.",
    auxiliary: 'avoir',
    indicatifPresent: ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'],
    imparfait: ['écrivais', 'écrivais', 'écrivait', 'écrivions', 'écriviez', 'écrivaient'],
    passeSimple: ['écrivis', 'écrivis', 'écrivit', 'écrivîmes', 'écrivîtes', 'écrivirent'],
    futurSimple: ['écrirai', 'écriras', 'écrira', 'écrirons', 'écrirez', 'écriront'],
    conditionnelPresent: ['écrirais', 'écrirais', 'écrirait', 'écririons', 'écririez', 'écriraient'],
    subjonctifPresent: ['écrive', 'écrives', 'écrive', 'écrivions', 'écriviez', 'écrivent'],
    imperatifPresent: ['écris', 'écrivons', 'écrivez'],
    participePresent: 'écrivant',
    participePasse: 'écrit',
  },

  // 29. LIRE (3e groupe -ire)
  {
    id: 'lire',
    name: 'lire',
    group: '3e groupe (-ire)',
    category: '3e_groupe',
    description: "Radical en lis- aux personnes plurielles; participe passé 'lu'.",
    auxiliary: 'avoir',
    indicatifPresent: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'],
    imparfait: ['lisais', 'lisais', 'lisait', 'lisions', 'lisiez', 'lisaient'],
    passeSimple: ['lus', 'lus', 'lut', 'lûmes', 'lûtes', 'lurent'],
    futurSimple: ['lirai', 'liras', 'lira', 'lirons', 'lirez', 'liront'],
    conditionnelPresent: ['lirais', 'lirais', 'lirait', 'lirions', 'liriez', 'liraient'],
    subjonctifPresent: ['lise', 'lises', 'lise', 'lisions', 'lisiez', 'lisent'],
    imperatifPresent: ['lis', 'lisons', 'lisez'],
    participePresent: 'lisant',
    participePasse: 'lu',
  },

  // 30. BOIRE (3e groupe -oire)
  {
    id: 'boire',
    name: 'boire',
    group: '3e groupe (-oire)',
    category: '3e_groupe',
    description: "Radical buv- à l'imparfait, boiv- au subjonctif présent.",
    auxiliary: 'avoir',
    indicatifPresent: ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'],
    imparfait: ['buvais', 'buvais', 'buvait', 'buvions', 'buviez', 'buvaient'],
    passeSimple: ['bus', 'bus', 'but', 'bûmes', 'bûtes', 'burent'],
    futurSimple: ['boirai', 'boiras', 'boira', 'boirons', 'boirez', 'boiront'],
    conditionnelPresent: ['boirais', 'boirais', 'boirait', 'boirions', 'boiriez', 'boiraient'],
    subjonctifPresent: ['boive', 'boives', 'boive', 'buvions', 'buviez', 'boivent'],
    imperatifPresent: ['bois', 'buvons', 'buvez'],
    participePresent: 'buvant',
    participePasse: 'bu',
  },

  // 31. ATTENDRE (3e groupe -dre)
  {
    id: 'attendre',
    name: 'attendre',
    group: '3e groupe (-dre)',
    category: '3e_groupe',
    description: "Verbe régulier en -dre : terminaisons -ds, -ds, -d.",
    auxiliary: 'avoir',
    indicatifPresent: ['attends', 'attends', 'attend', 'attendons', 'attendez', 'attendent'],
    imparfait: ['attendais', 'attendais', 'attendait', 'attendions', 'attendiez', 'attendaient'],
    passeSimple: ['attendis', 'attendis', 'attendit', 'attendîmes', 'attendîtes', 'attendirent'],
    futurSimple: ['attendrai', 'attendras', 'attendra', 'attendrons', 'attendrez', 'attendront'],
    conditionnelPresent: ['attendrais', 'attendrais', 'attendrait', 'attendrions', 'attendriez', 'attendraient'],
    subjonctifPresent: ['attende', 'attendes', 'attende', 'attendions', 'attendiez', 'attendent'],
    imperatifPresent: ['attends', 'attendons', 'attendez'],
    participePresent: 'attendant',
    participePasse: 'attendu',
  },

  // 32. TENIR (3e groupe -ir)
  {
    id: 'tenir',
    name: 'tenir',
    group: '3e groupe (-ir)',
    category: '3e_groupe',
    description: "Même modèle que venir : passé simple en 'tins'.",
    auxiliary: 'avoir',
    indicatifPresent: ['tiens', 'tiens', 'tient', 'tenons', 'tenez', 'tiennent'],
    imparfait: ['tenais', 'tenais', 'tenait', 'tenions', 'teniez', 'tenaient'],
    passeSimple: ['tins', 'tins', 'tint', 'tînmes', 'tîntes', 'tinrent'],
    futurSimple: ['tiendrai', 'tiendras', 'tiendra', 'tiendrons', 'tiendrez', 'tiendront'],
    conditionnelPresent: ['tiendrais', 'tiendrais', 'tiendrait', 'tiendrions', 'tiendriez', 'tiendraient'],
    subjonctifPresent: ['tienne', 'tiennes', 'tienne', 'tenions', 'teniez', 'tiennent'],
    imperatifPresent: ['tiens', 'tenons', 'tenez'],
    participePresent: 'tenant',
    participePasse: 'tenu',
  },
];

// Compile all verbs
export const AVAILABLE_VERBS: VerbData[] = RAW_VERBS.map(createVerbData);

// Direct shortcuts for backward compatibility
export const VERB_AVOIR: VerbData = AVAILABLE_VERBS.find((v) => v.id === 'avoir')!;
export const VERB_ETRE: VerbData = AVAILABLE_VERBS.find((v) => v.id === 'etre')!;

export interface GeneratedQuestion {
  id: string;
  verbId: string;
  verbName: string;
  tense: TenseKey;
  tenseLabel: string;
  category: string;
  person: PersonKey;
  personLabel: string;
  prompt: string;
  targetAnswer: string;
  shortAnswer: string;
  fullDisplay: string;
  acceptedAnswers: string[];
  options: string[];
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
 * Builds the natural French question prompt:
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

  // Group by tense to guarantee representation of all 15 tenses
  const tenseBuckets: Record<TenseKey, ConjugationItem[]> = {} as Record<TenseKey, ConjugationItem[]>;
  Object.keys(TENSES).forEach((k) => {
    tenseBuckets[k as TenseKey] = [];
  });

  shuffledPool.forEach((item) => {
    tenseBuckets[item.tense].push(item);
  });

  const selectedItems: ConjugationItem[] = [];

  // Guarantee at least 1 question for every single tense (15 tenses)
  Object.keys(tenseBuckets).forEach((tKey) => {
    const items = tenseBuckets[tKey as TenseKey];
    if (items.length > 0) {
      selectedItems.push(items.pop()!);
    }
  });

  // Pick remaining items to reach 30 questions
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

  // Also check if input matches targetAnswer or fullDisplay
  if (normalize(question.targetAnswer) === inputNorm) return true;
  if (normalize(question.fullDisplay) === inputNorm) return true;

  // Strip leading subject pronouns or subjonctif prefixes
  const withoutPronouns = inputNorm
    .replace(
      /^(j'|je\s+|tu\s+|il\s+|elle\s+|on\s+|nous\s+|vous\s+|ils\s+|elles\s+|que\s+j'|qu'il\s+|qu'elle\s+|qu'on\s+|qu'ils\s+|qu'elles\s+|que\s+tu\s+|que\s+nous\s+|que\s+vous\s+)/,
      ''
    )
    .trim();

  if (withoutPronouns === normalize(question.targetAnswer)) return true;

  // Also check if withoutPronouns matches any accepted answer without pronouns
  for (const acc of question.acceptedAnswers) {
    const accWithoutPronouns = normalize(acc)
      .replace(
        /^(j'|je\s+|tu\s+|il\s+|elle\s+|on\s+|nous\s+|vous\s+|ils\s+|elles\s+|que\s+j'|qu'il\s+|qu'elle\s+|qu'on\s+|qu'ils\s+|qu'elles\s+|que\s+tu\s+|que\s+nous\s+|que\s+vous\s+)/,
        ''
      )
      .trim();
    if (withoutPronouns === accWithoutPronouns) return true;
  }

  return false;
}
