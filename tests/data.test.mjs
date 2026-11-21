import test from 'node:test';
import assert from 'node:assert/strict';
import { STATIC, SUBJECTS, GRADES, CARDS, buildQuestions, rollCard, ligaFor } from '../js/data.js';

test('statische Fragen: Antwort eindeutig, keine doppelten Optionen', () => {
  for (const [subj, byGrade] of Object.entries(STATIC)) {
    for (const g of GRADES) {
      assert.ok(byGrade[g]?.length >= 5, `${subj} Klasse ${g} hat zu wenige Fragen`);
      for (const q of byGrade[g]) {
        const all = [q.c, ...q.w];
        assert.equal(new Set(all).size, all.length, `doppelte Option: ${q.q}`);
        assert.ok(!q.w.includes(q.c), `richtige Antwort steht in falschen: ${q.q}`);
        assert.ok(q.w.length >= 3);
      }
    }
  }
});

test('buildQuestions liefert für alle Fächer/Klassen 5 bzw. 10 gültige Fragen', () => {
  for (const subj of Object.keys(SUBJECTS)) for (const g of GRADES) for (const boss of [false, true]) {
    for (let r = 0; r < 25; r++) {
      const qs = buildQuestions(subj, g, { boss });
      assert.equal(qs.length, boss ? 10 : 5, `${subj} ${g} boss=${boss}`);
      for (const q of qs) {
        assert.ok(q.options.includes(q.c));
        assert.equal(new Set(q.options).size, q.options.length, `Duplikate in ${q.q}`);
        assert.equal(q.options.length, 4);
      }
    }
  }
});

test('Mathe-Aufgaben sind korrekt gerechnet', () => {
  for (let r = 0; r < 300; r++) for (const g of GRADES) {
    for (const q of buildQuestions('mathe', g)) {
      const m = q.q.match(/^(\d+) ([+−·:]) (\d+) = \?$/);
      assert.ok(m, q.q);
      const [a, op, b] = [Number(m[1]), m[2], Number(m[3])];
      const exp = op === '+' ? a + b : op === '−' ? a - b : op === '·' ? a * b : a / b;
      assert.equal(Number(q.c), exp, q.q);
      assert.ok(Number(q.c) >= 0 && Number.isInteger(Number(q.c)));
    }
  }
});

test('Karten: Boss gibt legendäre Fach-Karte, perfekte Lektion mind. selten', () => {
  for (const s of Object.keys(SUBJECTS)) {
    const c = rollCard({ subject: s, boss: true });
    assert.equal(c.rarity, 'legendary'); assert.equal(c.subject, s);
  }
  for (let i = 0; i < 300; i++) assert.notEqual(rollCard({ subject: 'mathe', perfect: true }).rarity, 'common');
  assert.equal(new Set(CARDS.map((c) => c.id)).size, CARDS.length);
});

test('Liga-Berechnung', () => {
  assert.equal(ligaFor(0).cur.name, 'Holz-Liga');
  assert.equal(ligaFor(150).cur.name, 'Bronze-Liga');
  assert.equal(ligaFor(5000).next, null);
});

import { squishy } from '../js/squishy.js';
test('jede Karte rendert ein gültiges Squishy-SVG', () => {
  for (const c of CARDS) {
    const svg = squishy(c);
    assert.ok(svg.startsWith('<svg') && svg.endsWith('</svg>'), c.id);
    assert.ok(!svg.includes('undefined'), c.id);
  }
  assert.equal(CARDS.filter((c) => c.rarity === 'legendary').length, 3);
});

test('Zahleneingabe nur bei Mathe; Antworten bleiben ganzzahlig', () => {
  for (const g of GRADES) {
    assert.ok(buildQuestions('deutsch', g).every((q) => !q.num));
    for (let i = 0; i < 100; i++) for (const q of buildQuestions('mathe', g)) if (q.num) assert.match(q.c, /^\d{1,6}$/);
  }
  assert.ok(CARDS.length >= 24);
});
