import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { STORY, DAILY_BRIEFING } from '../js/story.js';
import { IMAGE_IDS, VILLAINS, STATIC, SUBJECTS, GRADES, CARDS, buildQuestions, rollCard, ligaFor } from '../js/data.js';

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

test('Mathe-Aufgaben sind korrekt gerechnet (inkl. Punkt vor Strich, Klammern, Rest)', () => {
  let pvs = 0, rest = 0;
  for (let r = 0; r < 400; r++) for (const g of GRADES) {
    for (const q of buildQuestions('mathe', g)) {
      if (q.chkRest) {
        const [a, d] = q.chkRest; rest++;
        assert.equal(q.c, `${Math.floor(a / d)} Rest ${a % d}`, q.q);
        assert.equal(new Set(q.options).size, 4, q.q);
        continue;
      }
      assert.ok(q.chk, q.q);
      const exp = Function(`"use strict"; return (${q.chk});`)();
      assert.equal(Number(q.c), exp, q.q);
      assert.ok(Number.isInteger(exp) && exp >= 0, q.q);
      assert.equal(new Set(q.options).size, 4, q.q);
      if (/ [+−] \d+ [·:] | [·:] \d+ [+−] /.test(q.q)) { pvs++; assert.ok(q.hint, q.q); }
    }
  }
  assert.ok(pvs > 50 && rest > 5);
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
  assert.equal(ligaFor(0).cur.name, 'Rekrut');
  assert.equal(ligaFor(150).cur.name, 'Agent');
  assert.equal(ligaFor(5000).next, null);
});

import { heroSvg } from '../js/hero.js';
test('jede Karte rendert ein gültiges Helden-SVG', () => {
  for (const c of CARDS) {
    const svg = heroSvg(c);
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

test('Alle eingetragenen Helden- und Boss-Bilder existieren', () => {
  for (const id of IMAGE_IDS) assert.ok(existsSync(new URL(`../assets/heroes/${id}.webp`, import.meta.url)), id);
  for (const v of Object.values(VILLAINS)) assert.ok(existsSync(new URL(`../${v.img}`, import.meta.url)), v.img);
  assert.ok(IMAGE_IDS.every((id) => CARDS.some((c) => c.id === id)));
});

test('Story: 3 Akten mit je 8 Kapiteln, jedes mit Briefing und Nachbesprechung', () => {
  assert.deepEqual(Object.keys(STORY).sort(), Object.keys(SUBJECTS).sort());
  for (const [subj, akte] of Object.entries(STORY)) {
    assert.equal(akte.chapters.length, 8, subj);
    for (const ch of akte.chapters) { assert.ok(ch.t && ch.in.length >= 2 && ch.out.length >= 1, `${subj}: ${ch.t}`); }
    assert.ok(akte.chapters[7].t.startsWith('Das Duell'));
  }
  assert.ok(DAILY_BRIEFING.length >= 2);
});
