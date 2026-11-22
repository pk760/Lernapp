import test from 'node:test';
import assert from 'node:assert/strict';
import { NOUNS, SYLLABLES, SPELL, SPELL_EASY, OPPOSITES, GROUPS, STRONG, COMPARE, COMPOUNDS, RHYMES, VERBS, ADJS, genDeutsch, DE_GENERATORS } from '../js/content-de.js';
import { VOCAB, genEnglisch } from '../js/content-en.js';
import { buildQuestions, GRADES } from '../js/data.js';

const ok = (q, where) => {
  assert.ok(q && q.q && q.c, where);
  assert.equal(q.w.length, 3, `${where}: ${q.q} braucht 3 falsche Antworten (${q.w})`);
  assert.equal(new Set([q.c, ...q.w]).size, 4, `${where}: Duplikate in ${q.q}: ${[q.c, ...q.w]}`);
  assert.ok(![q.c, ...q.w].some((x) => !String(x).trim()), `${where}: leere Option`);
};

test('Deutsch-Wortlisten sind konsistent', () => {
  const sg = NOUNS.map((n) => n.sg);
  assert.equal(new Set(sg).size, sg.length, 'doppeltes Nomen');
  for (const n of NOUNS) { assert.ok(['der', 'die', 'das'].includes(n.art), n.sg); assert.notEqual(n.sg, n.pl, n.sg); assert.match(n.sg, /^[A-ZÄÖÜ]/); }
  assert.equal(new Set(SYLLABLES).size, SYLLABLES.length);
  for (const s of [...SPELL, ...SPELL_EASY]) {
    assert.ok(s.w.length >= 3, `zu wenig Fehlschreibungen: ${s.c}`);
    assert.ok(!s.w.includes(s.c), s.c);
    assert.equal(new Set(s.w).size, s.w.length, s.c);
  }
  const spells = [...SPELL, ...SPELL_EASY].map((s) => s.c);
  assert.equal(new Set(spells).size, spells.length, 'doppeltes Rechtschreibwort');
  const opp = OPPOSITES.flat();
  assert.equal(new Set(opp).size, opp.length, 'Wort in mehreren Gegenteil-Paaren');
  const all = Object.values(GROUPS).flat();
  assert.equal(new Set(all).size, all.length, 'Wort in mehreren Oberbegriffen');
  for (const v of STRONG) { assert.ok(v.inf && v.pres && v.pret && v.part && ['hat', 'ist'].includes(v.aux), v.inf); assert.notEqual(v.pret, v.part); }
  for (const c of COMPARE) assert.ok(c.comp && c.sup.startsWith('am ') && c.bad.length === 2, c.pos);
  for (const c of COMPOUNDS) assert.equal(c.c.toLowerCase().replace(/[äöü]/g, (x) => ({ ä: 'a', ö: 'o', ü: 'u' })[x]).slice(-c.b.length), c.b.toLowerCase().replace(/[äöü]/g, (x) => ({ ä: 'a', ö: 'o', ü: 'u' })[x]), c.c);
  for (const r of RHYMES) assert.ok(r.bad.length >= 3 && !r.bad.includes(r.c), r.w);
  assert.equal(VERBS.filter((v) => !v.endsWith('n')).length, 0);
  assert.equal(ADJS.filter((a) => /^[A-Z]/.test(a)).length, 0);
});

test('Englisch-Wortlisten: keine doppelten Wörter', () => {
  const en = Object.values(VOCAB).flat().map((w) => w.en);
  assert.equal(new Set(en).size, en.length, 'doppeltes englisches Wort');
});

test('Deutsch-Generatoren: gültige Aufgaben in allen Klassen', () => {
  for (const g of GRADES) for (let i = 0; i < 600; i++) ok(genDeutsch(g), `Deutsch Kl.${g}`);
});
test('Englisch-Generatoren: gültige Aufgaben in allen Klassen', () => {
  for (const g of GRADES) for (let i = 0; i < 600; i++) ok(genEnglisch(g), `Englisch Kl.${g}`);
});

test('Vielfalt: jede Klasse hat sehr viele verschiedene Fragen', () => {
  for (const subj of ['deutsch', 'englisch']) for (const g of GRADES) {
    const seen = new Set();
    for (let i = 0; i < 1500; i++) for (const q of buildQuestions(subj, g)) seen.add(q.q);
    assert.ok(seen.size >= (subj === 'englisch' && g <= 2 ? 60 : 150), `${subj} Klasse ${g}: nur ${seen.size} verschiedene Fragen`);
  }
});

test('Wiederholungsschutz: bereits gesehene Fragen kommen nicht sofort wieder', () => {
  for (const subj of ['mathe', 'deutsch', 'englisch']) {
    const avoid = new Set();
    for (let lesson = 0; lesson < 12; lesson++) {
      const qs = buildQuestions(subj, 3, { avoid });
      assert.equal(qs.length, 5);
      assert.equal(new Set(qs.map((q) => q.q)).size, 5, 'doppelte Frage in einer Lektion');
      for (const q of qs) { assert.ok(!avoid.has(q.q), `${subj}: Wiederholung „${q.q}“ in Lektion ${lesson}`); avoid.add(q.q); }
    }
  }
});

test('Akte-II-Stufe (tier 2) und Boss liefern volle Lektionen', () => {
  for (const subj of ['mathe', 'deutsch', 'englisch']) for (const g of GRADES) {
    assert.equal(buildQuestions(subj, g, { tier: 2 }).length, 5);
    assert.equal(buildQuestions(subj, g, { boss: true }).length, 10);
  }
});

test('Zwei Fragen-Stichproben zum Ansehen', () => {
  if (!process.env.SHOW) return;
  for (const g of [3, 4]) for (let i = 0; i < 25; i++) { const q = genDeutsch(g); console.log(g, q.q, '=>', q.c, '|', q.w.join(' / ')); }
});
