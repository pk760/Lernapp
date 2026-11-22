// Englisch: Vokabeln + Aufgaben-Generatoren (Klasse 1–4). Englisch beginnt in NRW laut Lehrplan ab Klasse 3;
// Klasse 1–2 bekommen daher nur sehr einfache Wörter (Farben, Zahlen, Tiere) als Vorgeschmack.
// Format: { q, c, w: [3 falsche], hint? }

const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[rnd(0, arr.length - 1)];
const shuf = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (arr, n, not = []) => shuf(arr.filter((x) => !not.includes(x))).slice(0, n);
const mk = (q, c, w, hint) => ({ q, c, w, hint });

// Thema -> [Englisch, Deutsch, Stufe]   Stufe 1 = sehr leicht (ab Klasse 1), 2 = ab Klasse 3, 3 = ab Klasse 4
const V = (s) => s.trim().split('\n').map((l) => { const [en, de, lvl] = l.split('|'); return { en, de, lvl: Number(lvl || 2) }; });
export const VOCAB = {
  Farben: V(`red|rot|1
blue|blau|1
green|grün|1
yellow|gelb|1
black|schwarz|1
white|weiß|1
orange|orange|1
pink|rosa|1
brown|braun|1
grey|grau|2
purple|lila|2`),
  Zahlen: V(`one|eins|1
two|zwei|1
three|drei|1
four|vier|1
five|fünf|1
six|sechs|1
seven|sieben|1
eight|acht|1
nine|neun|1
ten|zehn|1
eleven|elf|2
twelve|zwölf|2
twenty|zwanzig|2
hundred|hundert|3`),
  Tiere: V(`dog|Hund|1
cat|Katze|1
mouse|Maus|1
bird|Vogel|1
fish|Fisch|1
horse|Pferd|1
cow|Kuh|1
pig|Schwein|1
sheep|Schaf|2
duck|Ente|2
rabbit|Hase|2
frog|Frosch|2
lion|Löwe|2
monkey|Affe|2
elephant|Elefant|2
bear|Bär|2
spider|Spinne|2
snake|Schlange|2
chicken|Huhn|2
turtle|Schildkröte|3
giraffe|Giraffe|3
tiger|Tiger|2`),
  Familie: V(`mother|Mutter|2
father|Vater|2
sister|Schwester|2
brother|Bruder|2
grandma|Oma|2
grandpa|Opa|2
baby|Baby|2
friend|Freund|2
aunt|Tante|3
uncle|Onkel|3
family|Familie|2`),
  Schule: V(`book|Buch|2
pen|Stift|2
pencil|Bleistift|2
bag|Tasche|2
desk|Schreibtisch|2
chair|Stuhl|2
table|Tisch|2
teacher|Lehrer|2
school|Schule|2
ruler|Lineal|3
rubber|Radiergummi|3
paper|Papier|3
window|Fenster|2
door|Tür|2
board|Tafel|3`),
  Essen: V(`apple|Apfel|2
banana|Banane|2
bread|Brot|2
milk|Milch|2
water|Wasser|2
cheese|Käse|2
egg|Ei|2
cake|Kuchen|2
juice|Saft|2
pizza|Pizza|2
chocolate|Schokolade|2
ice cream|Eis|2
sandwich|belegtes Brot|3
tomato|Tomate|3
potato|Kartoffel|3
orange juice|Orangensaft|3`),
  Körper: V(`head|Kopf|2
hand|Hand|2
foot|Fuß|2
arm|Arm|2
leg|Bein|2
nose|Nase|2
mouth|Mund|2
eye|Auge|2
ear|Ohr|2
hair|Haar|2
tooth|Zahn|3
finger|Finger|2`),
  Kleidung: V(`shirt|Hemd|2
trousers|Hose|2
shoes|Schuhe|2
hat|Hut|2
jacket|Jacke|2
dress|Kleid|2
socks|Socken|2
cap|Mütze|3
skirt|Rock|3
scarf|Schal|3`),
  Zuhause: V(`house|Haus|2
room|Zimmer|2
bed|Bett|2
kitchen|Küche|2
garden|Garten|2
bathroom|Badezimmer|3
television|Fernseher|3
lamp|Lampe|3
car|Auto|2
bike|Fahrrad|2`),
  Wetter: V(`sun|Sonne|2
rain|Regen|2
snow|Schnee|2
wind|Wind|2
cloud|Wolke|2
hot|heiß|2
cold|kalt|2
sunny|sonnig|3
rainy|regnerisch|3
windy|windig|3`),
  Verben: V(`run|rennen|2
jump|springen|2
swim|schwimmen|2
read|lesen|2
write|schreiben|2
sing|singen|2
dance|tanzen|2
eat|essen|2
drink|trinken|2
sleep|schlafen|2
play|spielen|2
walk|gehen|2
draw|zeichnen|3
climb|klettern|3
laugh|lachen|3`),
  Gegenteile: V(`big|groß|2
small|klein|2
happy|glücklich|2
sad|traurig|2
fast|schnell|2
slow|langsam|3
old|alt|2
young|jung|3
new|neu|2
long|lang|3`),
  Wochentage: V(`Monday|Montag|2
Tuesday|Dienstag|2
Wednesday|Mittwoch|2
Thursday|Donnerstag|2
Friday|Freitag|2
Saturday|Samstag|2
Sunday|Sonntag|2`),
};
const ALL = Object.entries(VOCAB).flatMap(([topic, list]) => list.map((w) => ({ ...w, topic })));
const lvlFor = (grade) => (grade <= 2 ? 1 : grade === 3 ? 2 : 3);
const poolFor = (grade) => ALL.filter((w) => w.lvl <= lvlFor(grade));
// Bei deutschen Übersetzungen mit Mehrfachbedeutung keine zweite richtige Antwort anbieten
const sameDe = (a, b) => a.de === b.de;

function genEnDe(grade) {
  const pool = poolFor(grade), w = pick(pool);
  const same = pool.filter((x) => x.topic === w.topic && !sameDe(x, w));
  const others = [...sample(same, 3), ...sample(pool.filter((x) => !sameDe(x, w)), 3)];
  const wrong = [...new Set(others.map((x) => x.de))].filter((d) => d !== w.de).slice(0, 3);
  return mk(`Was heißt „${w.en}“ auf Deutsch?`, w.de, wrong);
}
function genDeEn(grade) {
  const pool = poolFor(grade), w = pick(pool);
  const others = [...sample(pool.filter((x) => x.topic === w.topic && x.en !== w.en), 3), ...sample(pool.filter((x) => x.en !== w.en), 3)];
  const wrong = [...new Set(others.map((x) => x.en))].filter((e) => e !== w.en).slice(0, 3);
  return mk(`Wie sagt man „${w.de}“ auf Englisch?`, w.en, wrong);
}
function genTopic(grade) {
  const pool = poolFor(grade);
  const topics = [...new Set(pool.map((w) => w.topic))].filter((t) => pool.filter((w) => w.topic === t).length >= 4);
  const t = pick(topics), list = pool.filter((w) => w.topic === t);
  const odd = pick(pool.filter((w) => w.topic !== t));
  const three = sample(list, 3);
  return mk('Welches Wort passt nicht zu den anderen?', odd.en, three.map((x) => x.en), `Die anderen drei gehören zu: ${t}`);
}
function genZahl() {
  const nums = VOCAB.Zahlen.filter((n) => n.lvl <= 2).map((n) => ({ en: n.en, v: ({ one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, twenty: 20 })[n.en] }));
  const a = pick(nums.filter((n) => n.v <= 9)), b = pick(nums.filter((n) => n.v <= 9 && n.v + a.v <= 12));
  const sum = nums.find((n) => n.v === a.v + b.v);
  if (!sum) return genEnDe(1);
  return mk(`${a.en} + ${b.en} = ?`, sum.en, sample(nums.map((n) => n.en), 3, [sum.en]), 'Rechne und schreibe die Zahl auf Englisch.');
}
function genWochentag() {
  const d = VOCAB.Wochentage.map((x) => x.en), i = rnd(0, 6);
  const next = d[(i + 1) % 7];
  return mk(`Welcher Tag kommt nach ${d[i]}?`, next, sample(d, 3, [next, d[i]]));
}
const PRON = [['I', 'am'], ['you', 'are'], ['he', 'is'], ['she', 'is'], ['it', 'is'], ['we', 'are'], ['they', 'are']];
function genBe() {
  const [p, c] = pick(PRON);
  const adj = pick(['happy', 'tired', 'big', 'small', 'hungry', 'cold']);
  return mk(`${p === 'I' ? 'I' : p[0].toUpperCase() + p.slice(1)} ___ ${adj}.`, c, ['am', 'is', 'are'].filter((x) => x !== c).concat(['be']).slice(0, 3), 'I am · you are · he/she/it is · we/they are');
}
const PLURALS = [['cat', 'cats'], ['dog', 'dogs'], ['book', 'books'], ['apple', 'apples'], ['bird', 'birds'], ['mouse', 'mice'], ['child', 'children'], ['man', 'men'], ['woman', 'women'], ['foot', 'feet'], ['tooth', 'teeth'], ['box', 'boxes'], ['bus', 'buses'], ['sheep', 'sheep'], ['fish', 'fish']];
function genPlural(grade) {
  const [s, p] = pick(grade <= 3 ? PLURALS.slice(0, 11) : PLURALS);
  const bad = new Set([s + 's', s + 'es', s + 'en', s + 'ies', s].filter((x) => x !== p));
  return mk(`One ${s}, two ___.`, p, [...bad].slice(0, 3), 'Manche Wörter sind unregelmäßig!');
}
const QW = [['___ is your name?', 'What', ['Where', 'Who', 'When']], ['___ are you? – I am fine.', 'How', ['What', 'Where', 'Who']], ['___ old are you?', 'How', ['What', 'Where', 'Who']], ['___ do you live? – In Germany.', 'Where', ['What', 'Who', 'How']], ['___ is that man? – He is my father.', 'Who', ['Where', 'What', 'When']], ['___ is your birthday? – In May.', 'When', ['Where', 'Who', 'How']]];
function genFrage() { const [q, c, w] = pick(QW); return mk(q, c, w, 'what = was · where = wo · who = wer · when = wann · how = wie'); }
const DIALOG = [
  ['How are you?', 'I am fine, thank you.', ['My name is Tom.', 'It is red.', 'I am ten.']],
  ['What is your name?', 'My name is Anna.', ['I am fine.', 'I am nine.', 'It is a dog.']],
  ['How old are you?', 'I am nine.', ['I am fine.', 'My name is Tom.', 'It is Monday.']],
  ['Do you like pizza?', 'Yes, I do.', ['It is red.', 'I am nine.', 'My name is Tom.']],
  ['Where do you live?', 'I live in Germany.', ['I am fine.', 'Yes, I do.', 'It is a cat.']],
  ['What colour is the sun?', 'It is yellow.', ['It is Monday.', 'I am nine.', 'Yes, I do.']],
  ['Can you swim?', 'Yes, I can.', ['It is blue.', 'My name is Tom.', 'I am fine.']],
  ['Thank you!', 'You are welcome.', ['Good morning.', 'I am nine.', 'It is a book.']],
  ['Good morning!', 'Good morning!', ['Good night.', 'Goodbye.', 'You are welcome.']],
  ['See you tomorrow!', 'Bye!', ['Good morning!', 'Yes, I do.', 'It is red.']],
];
function genDialog() { const [q, c, w] = pick(DIALOG); return mk(`Welche Antwort passt? „${q}“`, c, w); }
const ART = [['___ apple', 'an', ['a', 'two', 'some']], ['___ dog', 'a', ['an', 'two', 'some']], ['___ egg', 'an', ['a', 'two', 'many']], ['___ book', 'a', ['an', 'two', 'many']], ['___ orange', 'an', ['a', 'two', 'many']], ['___ cat', 'a', ['an', 'two', 'many']]];
function genArtikel() { const [q, c, w] = pick(ART); return mk(`Welches Wort passt? ${q}`, c, w, 'Vor Selbstlauten (a, e, i, o, u) steht „an“.'); }
const HAS = [['I', 'have'], ['you', 'have'], ['he', 'has'], ['she', 'has'], ['we', 'have'], ['they', 'have']];
function genHave() { const [p, c] = pick(HAS); return mk(`${p[0].toUpperCase() + p.slice(1)} ___ a bike.`, c, ['have', 'has', 'am', 'are'].filter((x) => x !== c).slice(0, 3), 'I/you/we/they have · he/she/it has'); }
const THIRD = [['like', 'likes'], ['play', 'plays'], ['run', 'runs'], ['eat', 'eats'], ['read', 'reads'], ['sing', 'sings'], ['swim', 'swims'], ['draw', 'draws'], ['dance', 'dances'], ['jump', 'jumps']];
function genThird() {
  const [v, c] = pick(THIRD), who = pick(['He', 'She', 'Tom', 'My sister']);
  return mk(`${who} ___ every day. (${v})`, c, [v, v + 'ing', v + 'ed'].filter((x) => x !== c), 'Bei he, she, it kommt ein -s an das Verb.');
}
function genGegenteil() {
  const pairs = [['big', 'small'], ['hot', 'cold'], ['happy', 'sad'], ['fast', 'slow'], ['old', 'young'], ['long', 'short'], ['day', 'night'], ['yes', 'no'], ['up', 'down'], ['open', 'closed'], ['good', 'bad']];
  const [a, b] = pick(pairs), flip = Math.random() < 0.5;
  const q = flip ? b : a, c = flip ? a : b;
  const bad = new Set(pairs.flat().filter((x) => x !== q && !pairs.some(([p, r]) => (p === q && r === x) || (r === q && p === x))));
  return mk(`Das Gegenteil von „${q}“ ist …`, c, sample([...bad], 3, [c, q]));
}

// [Generator, ab Klasse, bis Klasse, Gewicht]
const GENS = [
  [genEnDe, 1, 4, 5], [genDeEn, 1, 4, 5], [genTopic, 1, 4, 1], [genZahl, 1, 2, 1], [genWochentag, 3, 4, 1],
  [genBe, 3, 4, 2], [genPlural, 3, 4, 2], [genFrage, 3, 4, 2], [genDialog, 3, 4, 2], [genArtikel, 3, 4, 1],
  [genHave, 3, 4, 1], [genThird, 4, 4, 2], [genGegenteil, 3, 4, 1],
];
export const EN_GENERATORS = GENS.map((g) => g[0].name);

export function genEnglisch(grade) {
  const pool = [];
  for (const [fn, lo, hi, wt] of GENS) if (grade >= lo && grade <= hi) for (let i = 0; i < wt; i++) pool.push(fn);
  for (let tries = 0; tries < 10; tries++) {
    const q = pick(pool)(grade);
    if (q && q.w.length >= 3 && !q.w.includes(q.c) && new Set([q.c, ...q.w]).size === 4) return q;
  }
  return genEnDe(grade);
}
