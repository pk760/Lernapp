// Inhalte & Spielregeln. Reines Daten-/Logikmodul ohne DOM -> in Node testbar.

export const SUBJECTS = {
  mathe:    { name: 'Mathe',    emoji: '🔢' },
  deutsch:  { name: 'Deutsch',  emoji: '📖' },
  englisch: { name: 'Englisch', emoji: '🌍' },
};

export const GRADES = [1, 2, 3, 4];

// ---- Sammelkarten (Platzhalter: Emoji-Art, später echte Illustrationen) ----
export const RARITY = {
  common:    { name: 'Gewöhnlich', weight: 60 },
  rare:      { name: 'Selten',     weight: 28 },
  epic:      { name: 'Episch',     weight: 11 },
  legendary: { name: 'Legendär',   weight: 1 },
};

export const CARDS = [
  // Mathe
  { id: 'rechenknoedel',  name: 'Rechenknödel',    shape: 'dumpling', color: 'cream',   face: 'happy',  acc: 'none',   subject: 'mathe',    rarity: 'common',    text: 'Zählt jede Falte nach. Dreimal.' },
  { id: 'butterklops',    name: 'Butterklops Bruno', shape: 'butter',  color: 'butter',  face: 'sleepy', acc: 'none',   subject: 'mathe',    rarity: 'common',    text: 'Schmilzt bei schwierigen Aufgaben – und rechnet trotzdem weiter.' },
  { id: 'pluspudding',    name: 'Plus-Pudding',    shape: 'pudding',  color: 'caramel', face: 'cat',    acc: 'bow',    subject: 'mathe',    rarity: 'rare',      text: 'Wackelt vor Freude bei jedem Plus.' },
  { id: 'nullmochi',      name: 'Null-Mochi',      shape: 'mochi',    color: 'lilac',   face: 'wow',    acc: 'halo',   subject: 'mathe',    rarity: 'epic',      text: 'Aus Nichts wird bei ihm ganz viel.' },
  { id: 'kronenbao',      name: 'Kronen-Bao',      shape: 'bao',      color: 'sky',     face: 'happy',  acc: 'crown',  subject: 'mathe',    rarity: 'legendary', text: 'Hüter der Mathe-Arbeit.' },
  // Deutsch
  { id: 'silbendumpling', name: 'Silben-Dumpling', shape: 'dumpling', color: 'mint',    face: 'cat',    acc: 'sprout', subject: 'deutsch',  rarity: 'common',    text: 'Hüpft von Silbe zu Silbe.' },
  { id: 'buchstabenbutter', name: 'Buchstaben-Butter', shape: 'butter', color: 'peach', face: 'happy',  acc: 'none',   subject: 'deutsch',  rarity: 'common',    text: 'Streicht sich auf jedes Wort.' },
  { id: 'reimbao',        name: 'Reim-Bao',        shape: 'bao',      color: 'pink',    face: 'cat',    acc: 'bow',    subject: 'deutsch',  rarity: 'rare',      text: 'Haus – Maus – Klaus! Reimt sich alles zurecht.' },
  { id: 'satzmochi',      name: 'Satz-Mochi',      shape: 'mochi',    color: 'mint',    face: 'wow',    acc: 'sprout', subject: 'deutsch',  rarity: 'epic',      text: 'Dehnt jeden Satz bis er passt.' },
  { id: 'maerchenpudding', name: 'Märchen-Pudding', shape: 'pudding', color: 'lilac',   face: 'sleepy', acc: 'crown',  subject: 'deutsch',  rarity: 'legendary', text: 'Hüter der Deutsch-Arbeit.' },
  // Englisch
  { id: 'wortmochi',      name: 'Wort-Mochi',      shape: 'mochi',    color: 'sky',     face: 'happy',  acc: 'none',   subject: 'englisch', rarity: 'common',    text: 'Sagt „Hello!“ zu jedem.' },
  { id: 'helloknoedel',   name: 'Hello-Knödel',    shape: 'dumpling', color: 'peach',   face: 'wow',    acc: 'none',   subject: 'englisch', rarity: 'common',    text: 'Gut gefüllt mit Vokabeln.' },
  { id: 'loewenbutter',   name: 'Löwen-Butter',    shape: 'butter',   color: 'caramel', face: 'cat',    acc: 'bow',    subject: 'englisch', rarity: 'rare',      text: 'Brüllt leise, aber mit Akzent.' },
  { id: 'brueckenbao',    name: 'Brücken-Bao',     shape: 'bao',      color: 'mint',    face: 'sleepy', acc: 'halo',   subject: 'englisch', rarity: 'epic',      text: 'Baut Brücken zwischen den Sprachen.' },
  { id: 'weltendumpling', name: 'Welten-Dumpling', shape: 'dumpling', color: 'pink',    face: 'happy',  acc: 'crown',  subject: 'englisch', rarity: 'legendary', text: 'Hüter der Englisch-Arbeit.' },
  // Mathe (neu)
  { id: 'dreieckonigiri',  name: 'Dreieck-Onigiri', shape: 'onigiri',   color: 'cream',   face: 'happy',  acc: 'none',   subject: 'mathe',    rarity: 'common',    text: 'Hat drei Ecken und alle sind lecker.' },
  { id: 'zahlenbroetchen', name: 'Zahlenbrötchen',  shape: 'broetchen', color: 'caramel', face: 'cat',    acc: 'none',   subject: 'mathe',    rarity: 'rare',      text: 'Frisch gebacken: 1 + 1 = 2.' },
  { id: 'knetkalle',       name: 'Knet-Kalle',      shape: 'knet',      color: 'sky',     face: 'wow',    acc: 'halo',   subject: 'mathe',    rarity: 'epic',      text: 'Lässt sich zu jeder Zahl formen.' },
  // Deutsch (neu)
  { id: 'wortonigiri',     name: 'Wort-Onigiri',    shape: 'onigiri',   color: 'pink',    face: 'sleepy', acc: 'none',   subject: 'deutsch',  rarity: 'common',    text: 'Gefüllt mit den besten Wörtern.' },
  { id: 'lesebroetchen',   name: 'Lese-Brötchen',   shape: 'broetchen', color: 'butter',  face: 'happy',  acc: 'sprout', subject: 'deutsch',  rarity: 'rare',      text: 'Liest dir beim Frühstück vor.' },
  { id: 'knetknut',        name: 'Knet-Knut',       shape: 'knet',      color: 'mint',    face: 'cat',    acc: 'halo',   subject: 'deutsch',  rarity: 'epic',      text: 'Knetet aus Buchstaben ganze Geschichten.' },
  // Englisch (neu)
  { id: 'englischonigiri', name: 'Hello-Onigiri',   shape: 'onigiri',   color: 'lilac',   face: 'wow',    acc: 'none',   subject: 'englisch', rarity: 'common',    text: 'Spricht Reis-isch und Englisch.' },
  { id: 'teabroetchen',    name: 'Tea-Brötchen',    shape: 'broetchen', color: 'peach',   face: 'sleepy', acc: 'bow',    subject: 'englisch', rarity: 'rare',      text: 'Trinkt jeden Tag um fünf Tee.' },
  { id: 'knetkim',         name: 'Knet-Kim',        shape: 'knet',      color: 'pink',    face: 'happy',  acc: 'halo',   subject: 'englisch', rarity: 'epic',      text: 'Biegt sich um jede Grammatik.' },
];

// ---- Ligen (lokal, nach Gesamt-Fachpunkten) ----
export const LIGEN = [
  { name: 'Holz-Liga',    min: 0,    emoji: '🪵' },
  { name: 'Bronze-Liga',  min: 100,  emoji: '🥉' },
  { name: 'Silber-Liga',  min: 300,  emoji: '🥈' },
  { name: 'Gold-Liga',    min: 700,  emoji: '🥇' },
  { name: 'Diamant-Liga', min: 1500, emoji: '💎' },
];

export function ligaFor(fp) {
  let idx = 0;
  LIGEN.forEach((l, i) => { if (fp >= l.min) idx = i; });
  const cur = LIGEN[idx], next = LIGEN[idx + 1] || null;
  const pct = next ? Math.round(((fp - cur.min) / (next.min - cur.min)) * 100) : 100;
  return { cur, next, pct };
}

// ---- Zufall ----
export const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pick = (arr) => arr[rnd(0, arr.length - 1)];
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function rollCard({ subject, boss = false, perfect = false } = {}) {
  if (boss) return pick(CARDS.filter(c => c.rarity === 'legendary' && c.subject === subject));
  const weights = { ...Object.fromEntries(Object.entries(RARITY).map(([k, v]) => [k, v.weight])) };
  if (perfect) { weights.common = 0; weights.legendary = 2; } // perfekte Lektion: mind. selten
  const total = Object.values(weights).reduce((s, w) => s + w, 0);
  let r = Math.random() * total, rarity = 'common';
  for (const [k, w] of Object.entries(weights)) { if ((r -= w) < 0) { rarity = k; break; } }
  let pool = CARDS.filter(c => c.rarity === rarity);
  const own = pool.filter(c => c.subject === subject);
  if (own.length && Math.random() < 0.6) pool = own;
  return pick(pool);
}

// ---- Fragen: Format { q, c: richtige Antwort, w: [falsche Antworten], hint? } ----
const Q = (q, c, w, hint) => ({ q, c, w, hint });

export const STATIC = {
  deutsch: {
    1: [
      Q('Welcher Buchstabe fehlt? A_fel', 'p', ['b', 't', 'm']),
      Q('Wie viele Silben hat „Sonne“?', '2', ['1', '3', '4'], 'Klatsche mit: Son-ne'),
      Q('Welches Wort beginnt mit M?', 'Mond', ['Hund', 'Sofa', 'Tisch']),
      Q('Was reimt sich auf „Haus“?', 'Maus', ['Baum', 'Hand', 'Tisch']),
      Q('Welches Wort ist richtig geschrieben?', 'Schule', ['Schuhle', 'Shule', 'Schulle']),
      Q('Wie viele Buchstaben hat „Ball“?', '4', ['3', '5', '2']),
    ],
    2: [
      Q('Welches Wort ist ein Nomen?', 'Tisch', ['laufen', 'schnell', 'und']),
      Q('Welches Wort ist ein Verb?', 'rennen', ['Haus', 'blau', 'Baum']),
      Q('Die Mehrzahl von „Baum“ ist …', 'Bäume', ['Baums', 'Baumen', 'Bäumer']),
      Q('Wie schreibt man ein Nomen?', 'Mit großem Anfangsbuchstaben', ['Mit kleinem Anfangsbuchstaben', 'Nur in Druckschrift', 'Immer mit Punkt']),
      Q('Welches Wort ist ein Adjektiv?', 'schön', ['Auto', 'singen', 'Tisch']),
      Q('Welches Satzzeichen steht am Ende einer Frage?', '?', ['.', '!', ',']),
    ],
    3: [
      Q('Das Gegenteil von „hell“ ist …', 'dunkel', ['leise', 'kalt', 'groß']),
      Q('Die Vergangenheit von „ich gehe“ ist …', 'ich ging', ['ich gehte', 'ich gegangen', 'ich gehen']),
      Q('Welcher Satz ist richtig geschrieben?', 'Der Hund läuft schnell.', ['der Hund läuft schnell.', 'Der hund läuft schnell.', 'Der Hund Läuft schnell.']),
      Q('Welches Wort schreibt man mit „ie“?', 'Biene', ['Kind', 'Tisch', 'Winter']),
      Q('Welche Wortart ist „schnell“?', 'Adjektiv', ['Nomen', 'Verb', 'Artikel']),
      Q('Welches Wort ist ein zusammengesetztes Nomen?', 'Haustür', ['Haus', 'Tür', 'türkis']),
    ],
    4: [
      Q('Welcher Satz ist richtig?', 'Ich weiß, dass du kommst.', ['Ich weiß, das du kommst.', 'Ich weiß das, du kommst.', 'Ich weiß dass du, kommst.']),
      Q('Welcher Fall fragt „Wem?“', 'Dativ', ['Nominativ', 'Genitiv', 'Akkusativ']),
      Q('Welcher Fall fragt „Wen oder was?“', 'Akkusativ', ['Nominativ', 'Dativ', 'Genitiv']),
      Q('Welche Wortart ist „weil“?', 'Konjunktion', ['Nomen', 'Adjektiv', 'Präposition']),
      Q('Welcher Satz mit wörtlicher Rede ist richtig?', 'Anna sagt: „Ich komme mit.“', ['Anna sagt: „ich komme mit.“', 'Anna sagt: Ich komme mit.', 'Anna sagt „Ich komme mit“']),
      Q('Die Steigerung von „gut“ ist …', 'gut – besser – am besten', ['gut – guter – am gutesten', 'gut – besser – am besser', 'gut – gutter – am besten']),
    ],
  },
  englisch: {
    1: [
      Q('Wie heißt „Hund“ auf Englisch?', 'dog', ['cat', 'bird', 'fish']),
      Q('Was bedeutet „red“?', 'rot', ['blau', 'grün', 'gelb']),
      Q('Was bedeutet „apple“?', 'Apfel', ['Birne', 'Banane', 'Orange']),
      Q('Wie sagt man „Hallo“?', 'Hello', ['Goodbye', 'Thanks', 'Sorry']),
      Q('Was bedeutet „three“?', 'drei', ['zwei', 'vier', 'fünf']),
      Q('Wie sagt man „Danke“?', 'Thank you', ['Please', 'Sorry', 'Good night']),
    ],
    2: [
      Q('Was bedeutet „cat“?', 'Katze', ['Hund', 'Maus', 'Vogel']),
      Q('Wie sagt man „blau“ auf Englisch?', 'blue', ['red', 'green', 'yellow']),
      Q('My name ___ Tom.', 'is', ['am', 'are', 'be']),
      Q('Was bedeutet „Monday“?', 'Montag', ['Dienstag', 'Sonntag', 'Freitag']),
      Q('Wie sagt man „Mutter“ auf Englisch?', 'mother', ['father', 'sister', 'brother']),
      Q('Was bedeutet „school“?', 'Schule', ['Schuh', 'Stuhl', 'Tisch']),
    ],
    3: [
      Q('I ___ a boy.', 'am', ['is', 'are', 'be']),
      Q('Die Mehrzahl von „child“ ist …', 'children', ['childs', 'childrens', 'childen']),
      Q('She ___ milk every day.', 'drinks', ['drink', 'drinking', 'drinked']),
      Q('Wie sagt man „Es regnet“?', 'It is raining.', ['It is rain.', 'It rains is.', 'It are raining.']),
      Q('Wie fragt man „Wie alt bist du?“', 'How old are you?', ['How are you old?', 'What old are you?', 'Who old are you?']),
      Q('Was bedeutet „Friday“?', 'Freitag', ['Montag', 'Samstag', 'Donnerstag']),
    ],
    4: [
      Q('There ___ two apples on the table.', 'are', ['is', 'am', 'be']),
      Q('Die Vergangenheit von „go“ ist …', 'went', ['goed', 'gone', 'going']),
      Q('Es ist 3:30 Uhr. Wie sagt man das?', 'It is half past three.', ['It is half past four.', 'It is half to three.', 'It is three past half.']),
      Q('Antwort auf „Where do you live?“', 'I live in Berlin.', ['I am Berlin.', 'I have Berlin.', 'I live Berlin.']),
      Q('He ___ football on Sundays.', 'plays', ['play', 'playing', 'is play']),
      Q('Was bedeutet „because“?', 'weil', ['aber', 'oder', 'wenn']),
    ],
  },
};

// ---- Mathe: wird erzeugt ----
function distractors(c, n = 3) {
  const cand = [c + 1, c - 1, c + 2, c - 2, c + 10, c - 10, c + 5, c - 5, c + 11];
  const out = [];
  for (const x of shuffle(cand)) if (x >= 0 && x !== c && !out.includes(x)) out.push(x);
  return out.slice(0, n);
}
const mq = (q, c) => ({ q, c: String(c), w: distractors(c).map(String), num: Math.random() < 0.5 });

const MATH = {
  1: () => { const a = rnd(1, 12), b = rnd(1, 20 - a); return Math.random() < 0.5 ? mq(`${a} + ${b} = ?`, a + b) : mq(`${a + b} − ${a} = ?`, b); },
  2: () => {
    const t = rnd(0, 2);
    if (t === 0) { const a = rnd(10, 60), b = rnd(10, 99 - a); return mq(`${a} + ${b} = ?`, a + b); }
    if (t === 1) { const a = rnd(30, 99), b = rnd(10, a - 1); return mq(`${a} − ${b} = ?`, a - b); }
    const a = pick([2, 5, 10]), b = rnd(1, 10); return mq(`${a} · ${b} = ?`, a * b);
  },
  3: () => {
    if (Math.random() < 0.6) { const a = rnd(2, 10), b = rnd(2, 10); return mq(`${a} · ${b} = ?`, a * b); }
    const a = rnd(2, 10), b = rnd(2, 10); return mq(`${a * b} : ${a} = ?`, b);
  },
  4: () => {
    const t = rnd(0, 2);
    if (t === 0) { const a = rnd(1000, 6000), b = rnd(500, 3999); return mq(`${a} + ${b} = ?`, a + b); }
    if (t === 1) { const a = rnd(2000, 9999), b = rnd(100, 1999); return mq(`${a} − ${b} = ?`, a - b); }
    const a = rnd(12, 99), b = rnd(3, 9); return mq(`${a} · ${b} = ?`, a * b);
  },
};

function uniqueMath(grade, n) {
  const seen = new Set(), out = [];
  let guard = 0;
  while (out.length < n && guard++ < 200) { const q = MATH[grade](); if (!seen.has(q.q)) { seen.add(q.q); out.push(q); } }
  return out;
}

// Baut eine Lektion. boss = 10 Fragen mit Nachbar-Klassen gemischt.
export function buildQuestions(subject, grade, { boss = false } = {}) {
  const n = boss ? 10 : 5;
  let list;
  if (subject === 'mathe') {
    list = uniqueMath(grade, n);
  } else {
    let pool = [...STATIC[subject][grade]];
    if (boss) pool = pool.concat(STATIC[subject][Math.max(1, grade - 1)], STATIC[subject][Math.min(4, grade + 1)]);
    const seen = new Set();
    pool = pool.filter(q => !seen.has(q.q) && seen.add(q.q));
    list = shuffle(pool).slice(0, n);
  }
  return list.map(q => ({ ...q, options: shuffle([q.c, ...q.w]) }));
}
