// Inhalte & Spielregeln. Reines Daten-/Logikmodul ohne DOM -> in Node testbar.

export const SUBJECTS = {
  mathe:    { name: 'Mathe',    emoji: '🔢' },
  deutsch:  { name: 'Deutsch',  emoji: '📖' },
  englisch: { name: 'Englisch', emoji: '🌍' },
};

import { genDeutsch } from './content-de.js';
import { genEnglisch } from './content-en.js';

export const GRADES = [1, 2, 3, 4];

// Bossgegner je Fach (Boss-Mission = Klassenarbeits-Vorbereitung)
export const VILLAINS = {
  mathe:    { name: 'Professor Chaos-Null', emoji: '🤖', img: 'assets/bosses/boss-mathe.webp' },
  deutsch:  { name: 'Der Fehlerteufel',     emoji: '👹', img: 'assets/bosses/boss-deutsch.webp' },
  englisch: { name: 'Baron Babel',          emoji: '🦹', img: 'assets/bosses/boss-englisch.webp' },
};

// ---- Helden-Sammelkarten (eigene Figuren, SVG aus js/hero.js) ----
export const RARITY = {
  common:    { name: 'Gewöhnlich', weight: 60 },
  rare:      { name: 'Selten',     weight: 28 },
  epic:      { name: 'Episch',     weight: 11 },
  legendary: { name: 'Legendär',   weight: 1 },
};

export const CARDS = [
  { id: 'zahlenblitz', name: 'Zahlenblitz', suit: 'blau', emblem: 'bolt', mask: 'domino', cape: true, skin: '#f1c9a5', subject: 'mathe', rarity: 'common', text: 'Rechnet schneller als ein Blitz.' },
  { id: 'minusninja', name: 'Minus-Ninja', suit: 'schwarz', emblem: 'star', mask: 'cowl', cape: false, skin: '#a8704b', subject: 'mathe', rarity: 'common', text: 'Zieht jede Aufgabe lautlos ab.' },
  { id: 'plusphantom', name: 'Plus-Phantom', suit: 'lila', emblem: 'ring', mask: 'visor', cape: true, skin: '#f7d9c0', subject: 'mathe', rarity: 'common', text: 'Taucht auf, wo addiert wird.' },
  { id: 'rechenfalke', name: 'Rechenfalke', suit: 'rot', emblem: 'shield', mask: 'full', cape: true, skin: '#d9a273', subject: 'mathe', rarity: 'rare', text: 'Sieht jeden Rechenfehler von oben.' },
  { id: 'multimax', name: 'Multi-Max', suit: 'orange', emblem: 'hex', mask: 'domino', cape: true, skin: '#7a4a30', subject: 'mathe', rarity: 'rare', text: 'Verdoppelt, verdreifacht, vervierfacht!' },
  { id: 'quadrattitan', name: 'Quadrat-Titan', suit: 'gold', emblem: 'hex', mask: 'full', cape: true, skin: '#f1c9a5', subject: 'mathe', rarity: 'epic', text: 'Seine Stärke: hoch zwei.' },
  { id: 'nullpunkt', name: 'Nullpunkt', suit: 'tuerkis', emblem: 'ring', mask: 'cowl', cape: true, skin: '#d9a273', subject: 'mathe', rarity: 'epic', text: 'Macht aus Nichts ein Ergebnis.' },
  { id: 'kapitaenquotient', name: 'Kapitän Quotient', suit: 'rot', emblem: 'star', mask: 'full', cape: true, skin: '#f1c9a5', subject: 'mathe', rarity: 'legendary', text: 'Hüter der Mathe-Arbeit.' },
  { id: 'silbensturm', name: 'Silben-Sturm', suit: 'tuerkis', emblem: 'bolt', mask: 'domino', cape: true, skin: '#f7d9c0', subject: 'deutsch', rarity: 'common', text: 'Zerlegt jedes Wort in Silben.' },
  { id: 'wortwaechter', name: 'Wortwächter', suit: 'gruen', emblem: 'shield', mask: 'cowl', cape: true, skin: '#a8704b', subject: 'deutsch', rarity: 'common', text: 'Bewacht die Rechtschreibung.' },
  { id: 'satzschatten', name: 'Satz-Schatten', suit: 'schwarz', emblem: 'ring', mask: 'visor', cape: false, skin: '#f1c9a5', subject: 'deutsch', rarity: 'common', text: 'Folgt jedem Satz bis zum Punkt.' },
  { id: 'reimreiter', name: 'Reimreiter', suit: 'orange', emblem: 'flame', mask: 'domino', cape: true, skin: '#d9a273', subject: 'deutsch', rarity: 'rare', text: 'Haus – Maus – Applaus!' },
  { id: 'tintenfalke', name: 'Tintenfalke', suit: 'blau', emblem: 'star', mask: 'full', cape: true, skin: '#7a4a30', subject: 'deutsch', rarity: 'rare', text: 'Schreibt mit Tempo und Stil.' },
  { id: 'grammatiktitan', name: 'Grammatik-Titan', suit: 'lila', emblem: 'hex', mask: 'full', cape: true, skin: '#f1c9a5', subject: 'deutsch', rarity: 'epic', text: 'Kennt alle vier Fälle.' },
  { id: 'maerchenmeister', name: 'Märchenmeister', suit: 'gold', emblem: 'flame', mask: 'cowl', cape: true, skin: '#a8704b', subject: 'deutsch', rarity: 'epic', text: 'Erfindet Geschichten im Flug.' },
  { id: 'meisterfederkiel', name: 'Meister Federkiel', suit: 'gold', emblem: 'shield', mask: 'full', cape: true, skin: '#d9a273', subject: 'deutsch', rarity: 'legendary', text: 'Hüter der Deutsch-Arbeit.' },
  { id: 'hellohawk', name: 'Hello-Hawk', suit: 'blau', emblem: 'bolt', mask: 'domino', cape: true, skin: '#f7d9c0', subject: 'englisch', rarity: 'common', text: 'Grüßt in jeder Sprache zuerst auf Englisch.' },
  { id: 'wordwarrior', name: 'Word-Warrior', suit: 'rot', emblem: 'flame', mask: 'cowl', cape: false, skin: '#d9a273', subject: 'englisch', rarity: 'common', text: 'Kämpft für jedes Vokabel.' },
  { id: 'captainvocab', name: 'Captain Vocab', suit: 'gruen', emblem: 'star', mask: 'visor', cape: true, skin: '#7a4a30', subject: 'englisch', rarity: 'common', text: 'Kennt 1000 Wörter. Mindestens.' },
  { id: 'grammarguard', name: 'Grammar-Guard', suit: 'lila', emblem: 'shield', mask: 'full', cape: true, skin: '#f1c9a5', subject: 'englisch', rarity: 'rare', text: 'Beschützt dich vor falschen Zeiten.' },
  { id: 'speakspark', name: 'Speak-Spark', suit: 'orange', emblem: 'bolt', mask: 'domino', cape: true, skin: '#a8704b', subject: 'englisch', rarity: 'rare', text: 'Sprüht vor Sprachfunken.' },
  { id: 'lingolord', name: 'Lingo-Lord', suit: 'schwarz', emblem: 'hex', mask: 'cowl', cape: true, skin: '#f1c9a5', subject: 'englisch', rarity: 'epic', text: 'Herrscher über alle Satzzeiten.' },
  { id: 'globeglider', name: 'Globe-Glider', suit: 'tuerkis', emblem: 'ring', mask: 'visor', cape: true, skin: '#d9a273', subject: 'englisch', rarity: 'epic', text: 'Gleitet von Land zu Land.' },
  { id: 'agentbabel', name: 'Agent Babel', suit: 'lila', emblem: 'star', mask: 'full', cape: true, skin: '#f1c9a5', subject: 'englisch', rarity: 'legendary', text: 'Hüter der Englisch-Arbeit.' },
];

// Helden, für die ein echtes Bild unter assets/heroes/<id>.webp liegt (siehe docs/HELDEN-BILDER.md).
// Alle anderen werden als SVG aus js/hero.js gezeichnet. Nach dem Ablegen eines Bildes die ID hier eintragen.
export const IMAGE_IDS = [
  'agentbabel', 'captainvocab', 'globeglider', 'grammarguard',
  'grammatiktitan', 'hellohawk', 'kapitaenquotient', 'lingolord',
  'maerchenmeister', 'meisterfederkiel', 'minusninja', 'multimax',
  'nullpunkt', 'plusphantom', 'quadrattitan', 'rechenfalke',
  'reimreiter', 'satzschatten', 'silbensturm', 'speakspark',
  'tintenfalke', 'wordwarrior', 'wortwaechter', 'zahlenblitz',
];

// ---- Ränge (lokal, nach Gesamt-Fachpunkten) ----
export const LIGEN = [
  { name: 'Rekrut',  min: 0,    emoji: '🎖️' },
  { name: 'Agent',   min: 100,  emoji: '🕶️' },
  { name: 'Held',    min: 300,  emoji: '⚡' },
  { name: 'Elite',   min: 700,  emoji: '🔥' },
  { name: 'Legende', min: 1500, emoji: '👑' },
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
      Q('Wie beginnt ein Brief an einen Freund?', 'Mit einer Anrede, z. B. „Lieber Max,“', ['Mit der Unterschrift', 'Mit „Tschüss“', 'Mit dem Namen der Schule']),
      Q('Womit endet ein Brief?', 'Mit Grußformel und Unterschrift', ['Mit der Anrede', 'Mit einem Rechenzeichen', 'Mit dem Datum allein']),
      Q('Welche Grußformel passt zu einem Brief an einen Freund?', 'Viele Grüße', ['Sehr geehrte Damen und Herren', 'Hochachtungsvoll', 'Guten Tag allerseits']),
      Q('Was steht oben in einem Brief?', 'Ort und Datum', ['Die Unterschrift', 'Die Grußformel', 'Die Hausaufgaben']),
      Q('Nach „Liebe Mia,“ schreibt man den ersten Satz …', 'klein weiter, weil der Satz nach dem Komma weitergeht', ['immer mit Großbuchstaben', 'ohne Wörter', 'mit einem Ausrufezeichen']),
      Q('Welcher Satz mit wörtlicher Rede ist richtig?', 'Mia sagt: „Komm mit!“', ['Mia sagt „Komm mit“!', 'Mia sagt: Komm mit!', 'Mia, sagt „Komm mit!“']),
      Q('Die Mehrzahl von „Buch“ ist …', 'Bücher', ['Buchs', 'Büchers', 'Buchen']),
      Q('Welches Wort schreibt man mit „ä“?', 'Bäcker', ['Schwester', 'Winter', 'Zimmer']),
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
const mq = (q, c, o = {}) => {
  const pref = (o.wrong || []).filter((x) => x >= 0 && x !== c);
  const w = [...new Set([...pref, ...distractors(c, 8)])].filter((x) => x !== c).slice(0, 3).map(String);
  return { q, c: String(c), w, num: o.num ?? Math.random() < 0.5, hint: o.hint, chk: o.chk ?? null };
};
const PVS = 'Punkt vor Strich: Erst mal und geteilt, dann plus und minus.';
const KL = 'Klammern zuerst!';

// Klasse 3 – Lehrplan NRW: Einmaleins, Division (auch mit Rest), Punkt vor Strich, Zahlenraum 1000,
// Platzhalter, Zahlenmauern, Verdoppeln/Halbieren, Runden, Geld, Sachaufgaben.
const G3 = [
  () => { const a = rnd(2, 10), b = rnd(2, 10); return mq(`${a} · ${b} = ?`, a * b, { chk: `${a}*${b}` }); },
  () => { const a = rnd(2, 10), b = rnd(2, 10); return mq(`${a * b} : ${a} = ?`, b, { chk: `${a * b}/${a}` }); },
  () => { const a = rnd(10, 60), b = rnd(2, 9), c = rnd(2, 9); return mq(`${a} + ${b} · ${c} = ?`, a + b * c, { chk: `${a}+${b}*${c}`, hint: PVS, wrong: [(a + b) * c], num: false }); },
  () => { const b = rnd(2, 9), c = rnd(2, 9), a = rnd(b * c, b * c + 40); return mq(`${a} − ${b} · ${c} = ?`, a - b * c, { chk: `${a}-${b}*${c}`, hint: PVS, wrong: [(a - b) * c], num: false }); },
  () => { const a = rnd(2, 9), b = rnd(2, 9), c = rnd(5, 40); return mq(`${a} · ${b} + ${c} = ?`, a * b + c, { chk: `${a}*${b}+${c}`, hint: PVS, wrong: [a * (b + c)], num: false }); },
  () => { const a = rnd(2, 9), b = rnd(3, 9), c = rnd(1, a * b - 1); return mq(`${a} · ${b} − ${c} = ?`, a * b - c, { chk: `${a}*${b}-${c}`, hint: PVS, wrong: [a * (b - c)], num: false }); },
  () => { const d = rnd(2, 9), q = rnd(2, 9), a = rnd(5, 50); return mq(`${a} + ${d * q} : ${d} = ?`, a + q, { chk: `${a}+${d * q}/${d}`, hint: PVS, wrong: [(a + d * q) / d].filter(Number.isInteger), num: false }); },
  () => { const a = rnd(2, 9), b = rnd(2, 9), c = rnd(2, 9); return mq(`(${a} + ${b}) · ${c} = ?`, (a + b) * c, { chk: `(${a}+${b})*${c}`, hint: KL, wrong: [a + b * c] }); },
  () => { const a = rnd(120, 650), b = rnd(40, 340); return mq(`${a} + ${b} = ?`, a + b, { chk: `${a}+${b}` }); },
  () => { const a = rnd(300, 990), b = rnd(40, a - 50); return mq(`${a} − ${b} = ?`, a - b, { chk: `${a}-${b}` }); },
  () => { const a = rnd(2, 9), s = rnd(20, 90); return mq(`□ + ${a} = ${s}`, s - a, { chk: `${s}-${a}`, hint: 'Rechne die Umkehraufgabe.' }); },
  () => { const a = rnd(10, 60), s = rnd(a + 10, 200); return mq(`${s} − □ = ${a}`, s - a, { chk: `${s}-${a}`, hint: 'Rechne die Umkehraufgabe.' }); },
  () => { const a = rnd(2, 9), x = rnd(2, 10); return mq(`${a} · □ = ${a * x}`, x, { chk: `${a * x}/${a}`, hint: 'Rechne die Umkehraufgabe.' }); },
  () => { const a = rnd(11, 49); return mq(`Das Doppelte von ${a} ist …`, a * 2, { chk: `${a}*2` }); },
  () => { const a = rnd(11, 49); return mq(`Die Hälfte von ${a * 2} ist …`, a, { chk: `${a * 2}/2` }); },
  () => { const a = rnd(2, 9) * 10 + rnd(1, 9), b = rnd(21, 79); return mq(`Zahlenmauer: Unten stehen ${a} und ${b}. Welche Zahl steht darüber?`, a + b, { chk: `${a}+${b}` }); },
  () => { const a = rnd(20, 80), s = rnd(a + 10, 180); return mq(`Zahlenmauer: Oben steht ${s}, unten links ${a}. Welche Zahl steht unten rechts?`, s - a, { chk: `${s}-${a}` }); },
  () => { const n = rnd(11, 998); if (n % 10 === 0) return mq(`Runde ${n + 3} auf volle Zehner.`, n, { chk: `Math.round(${n + 3}/10)*10` }); return mq(`Runde ${n} auf volle Zehner.`, Math.round(n / 10) * 10, { chk: `Math.round(${n}/10)*10`, hint: 'Ab 5 wird aufgerundet.' }); },
  () => { const d = rnd(3, 9), q = rnd(2, 9), r = rnd(1, d - 1), a = d * q + r, c = `${q} Rest ${r}`; const w = [...new Set([`${q + 1} Rest ${r}`, `${q - 1} Rest ${r}`, `${q} Rest ${(r % (d - 1)) + 1}`, `${r} Rest ${q}`])].filter((x) => x !== c && !x.startsWith('0 ') && !x.startsWith('-')).slice(0, 3); while (w.length < 3) w.push(`${q + 2 + w.length} Rest ${r}`); return { q: `${a} : ${d} = ? (mit Rest)`, c, w, num: false, hint: 'Wie oft passt die Zahl ganz hinein? Was bleibt übrig?', chkRest: [a, d] }; },
  () => { const a = rnd(3, 9), b = rnd(3, 9); return mq(`Zahlenblitz sammelt ${a} Energiekerne pro Mission. Wie viele sind es nach ${b} Missionen?`, a * b, { chk: `${a}*${b}` }); },
  () => { const n = rnd(3, 9), k = rnd(2, 9); return mq(`${n} Helden teilen sich ${n * k} Trainingskarten gerecht. Wie viele bekommt jeder?`, k, { chk: `${n * k}/${n}` }); },
  () => { const a = rnd(120, 400), b = rnd(10, 90), c = rnd(10, 100); return mq(`In der Akademie sind ${a} Helden. ${b} kommen neu dazu, ${c} gehen auf Mission. Wie viele sind noch da?`, a + b - c, { chk: `${a}+${b}-${c}`, hint: 'Rechne in zwei Schritten.' }); },
  () => { const a = rnd(5, 30), b = rnd(2, 6), c = rnd(3, 9); return mq(`Du hast ${a} Karten und kaufst ${b} Packungen mit je ${c} Karten. Wie viele Karten hast du jetzt?`, a + b * c, { chk: `${a}+${b}*${c}`, hint: PVS, wrong: [(a + b) * c] }); },
  () => { const e = rnd(1, 4), ct = pick([10, 20, 30, 40, 50, 60, 70, 80, 90]), pay = pick([5, 10]); return mq(`Ein Heft kostet ${e} € ${ct} ct. Du zahlst mit ${pay} €. Wie viel Rückgeld bekommst du in Cent?`, pay * 100 - (e * 100 + ct), { chk: `${pay * 100}-${e * 100 + ct}`, hint: '1 € = 100 ct' }); },
];

const MATH = {
  1: () => { const a = rnd(1, 12), b = rnd(1, 20 - a); return Math.random() < 0.5 ? mq(`${a} + ${b} = ?`, a + b, { chk: `${a}+${b}` }) : mq(`${a + b} − ${a} = ?`, b, { chk: `${a + b}-${a}` }); },
  2: () => {
    const t = rnd(0, 2);
    if (t === 0) { const a = rnd(10, 60), b = rnd(10, 99 - a); return mq(`${a} + ${b} = ?`, a + b, { chk: `${a}+${b}` }); }
    if (t === 1) { const a = rnd(30, 99), b = rnd(10, a - 1); return mq(`${a} − ${b} = ?`, a - b, { chk: `${a}-${b}` }); }
    const a = pick([2, 5, 10]), b = rnd(1, 10); return mq(`${a} · ${b} = ?`, a * b, { chk: `${a}*${b}` });
  },
  3: () => pick(G3)(),
  4: () => {
    const t = rnd(0, 5);
    if (t === 0) { const a = rnd(1000, 6000), b = rnd(500, 3999); return mq(`${a} + ${b} = ?`, a + b, { chk: `${a}+${b}` }); }
    if (t === 1) { const a = rnd(2000, 9999), b = rnd(100, 1999); return mq(`${a} − ${b} = ?`, a - b, { chk: `${a}-${b}` }); }
    if (t === 2) { const a = rnd(12, 99), b = rnd(3, 9); return mq(`${a} · ${b} = ?`, a * b, { chk: `${a}*${b}` }); }
    if (t === 3) { const a = rnd(100, 900), b = rnd(11, 40), c = rnd(3, 9); return mq(`${a} + ${b} · ${c} = ?`, a + b * c, { chk: `${a}+${b}*${c}`, hint: PVS, wrong: [(a + b) * c], num: false }); }
    if (t === 4) { const b = rnd(3, 9), c = rnd(11, 60), a = rnd(b * c, b * c + 300); return mq(`${a} − ${b} · ${c} = ?`, a - b * c, { chk: `${a}-${b}*${c}`, hint: PVS, wrong: [(a - b) * c], num: false }); }
    const a = rnd(12, 60), b = rnd(12, 60), c = rnd(2, 9); return mq(`(${a} + ${b}) · ${c} = ?`, (a + b) * c, { chk: `(${a}+${b})*${c}`, hint: KL, wrong: [a + b * c] });
  },
};
// ---- Uhrzeit: Aufgabe mit Zifferblatt (q.clock = [Stunde 1–12, Minute]); Antworten als Mehrfachauswahl
export function fmtTime(grade, h, m) {
  const hh = (x) => ((x - 1) % 12) + 1;
  if (grade <= 2) {
    if (m === 0) return `${h} Uhr`;
    if (m === 30) return `halb ${hh(h + 1)}`;
    if (m === 15) return `Viertel nach ${h}`;
    return `Viertel vor ${hh(h + 1)}`;
  }
  return `${h}:${String(m).padStart(2, '0')} Uhr`;
}
export function clockQuestion(grade) {
  const mins = grade === 1 ? [0, 30] : grade === 2 ? [0, 15, 30, 45] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const r = (a) => a[Math.floor(Math.random() * a.length)];
  const h = 1 + Math.floor(Math.random() * 12), m = r(mins);
  const c = fmtTime(grade, h, m), wrong = new Set();
  const cand = [[m / 5 || 12, h * 5 % 60], [h % 12 + 1, m], [(h + 10) % 12 + 1, m], [h, r(mins)], [r([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), r(mins)]];
  for (const [ch, cm] of cand) { const f = fmtTime(grade, ch, mins.includes(cm) ? cm : m); if (f !== c) wrong.add(f); }
  let g = 0;
  while (wrong.size < 3 && g++ < 50) { const f = fmtTime(grade, 1 + Math.floor(Math.random() * 12), r(mins)); if (f !== c) wrong.add(f); }
  return { q: 'Wie spät ist es?', c, w: [...wrong].slice(0, 3), hint: 'Der kurze Zeiger zeigt die Stunde, der lange die Minuten.', clock: [h, m] };
}

// Baut eine Lektion. boss = 10 Fragen mit Nachbar-Klassen gemischt.
// avoid: Set mit Frage-Texten, die das Kind zuletzt gesehen hat (werden nach Möglichkeit nicht wiederholt).
// tier 2 = „Akte II“: ein Teil der Fragen kommt aus der nächsthöheren Klasse (max. 4).
export function buildQuestions(subject, grade, { boss = false, avoid = new Set(), tier = 1 } = {}) {
  const n = boss ? 10 : 5;
  const gradeFor = () => {
    if (boss) return Math.min(4, Math.max(1, grade + pick([-1, 0, 0, 1])));
    return tier === 2 && Math.random() < 0.6 ? Math.min(4, grade + 1) : grade;
  };
  const gen = { mathe: (g) => (Math.random() < 0.08 ? clockQuestion(g) : MATH[g]()), deutsch: genDeutsch, englisch: genEnglisch }[subject];
  const out = [], used = new Set();
  const staticPool = subject === 'mathe' ? [] : shuffle([...STATIC[subject][grade], ...(boss ? STATIC[subject][Math.max(1, grade - 1)] : [])]);
  const take = (q, strict) => {
    if (!q || used.has(q.q) || (strict && avoid.has(q.q))) return false;
    used.add(q.q); out.push(q); return true;
  };
  for (let pass = 0; pass < 2 && out.length < n; pass++) {
    const strict = pass === 0;
    let guard = 0;
    while (out.length < n && guard++ < 150) {
      if (subject !== 'mathe' && Math.random() < 0.15 && staticPool.length) { take(staticPool.pop(), strict); continue; }
      take(gen(gradeFor()), strict);
    }
  }
  return shuffle(out).map((q) => ({ ...q, options: shuffle([q.c, ...q.w]) }));
}
