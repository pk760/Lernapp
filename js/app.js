import { SUBJECTS, GRADES, CARDS, RARITY, VILLAINS, IMAGE_IDS, ligaFor, buildQuestions, rollCard } from './data.js';
import { heroSvg, SUITS, EMBLEMS, SKINS } from './hero.js';
import { load, save, newProfile, today, yesterday, weekKey, daysUntil } from './store.js';

const PATH_NODES = 8;
const SESSIONS_FOR_BOSS = 3;
const SESSIONS_GOAL = 5;

let S = load();
const ui = { route: 'learn', subject: 'mathe', lesson: null, result: null, sheet: null, confirm: null };

const $app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const P = () => S.profiles.find((p) => p.id === S.active) || null;
const commit = () => { save(S); render(); };
// Echtes Bild, falls vorhanden – sonst SVG-Held
const cardArt = (c) => (IMAGE_IDS.includes(c.id) ? `<img class="hero-img" src="assets/heroes/${esc(c.id)}.webp" alt="${esc(c.name)}" draggable="false">` : heroSvg(c));
const heroOf = (p) => p.hero || { suit: 'rot', emblem: 'bolt', mask: 'domino', cape: true, skin: SKINS[1] };
const myHero = (p) => heroSvg({ ...heroOf(p), rarity: 'common' });

function rollWeek(p) {
  const wk = weekKey();
  if (p.weekKey !== wk) { p.weekKey = wk; p.weekFp = 0; }
}

// ------------------------------------------------------------ Views
function header(p) {
  const l = ligaFor(p.fp);
  return `<header class="top">
    <button class="who" data-a="sheet" data-v="settings" aria-label="Einstellungen"><span class="avatar">${myHero(p)}</span><span>${esc(p.name)}</span></button>
    <div class="chips">
      <span class="chip" title="Serie">🔥 ${p.streak}</span>
      <span class="chip" title="Fachpunkte">⚡ ${p.fp}</span>
      <span class="chip" title="${esc(l.cur.name)}">${l.cur.emoji} ${l.cur.name}</span>
    </div></header>`;
}

function tabs() {
  const t = [['learn', '🗺️', 'Missionen'], ['projects', '📝', 'Arbeiten'], ['collection', '🃏', 'Archiv'], ['rank', '🏆', 'Rang']];
  return `<nav class="tabs">${t.map(([r, e, n]) => `<button class="${ui.route === r ? 'on' : ''}" data-a="go" data-v="${r}"><span>${e}</span>${n}</button>`).join('')}</nav>`;
}

function viewProfile() {
  const list = S.profiles.map((p) => `<button class="card row" data-a="pick" data-v="${p.id}"><span class="avatar">${myHero(p)}</span><b>${esc(p.name)}</b><span class="muted">Klasse ${p.grade}</span></button>`).join('');
  const suits = Object.entries(SUITS).map(([k, [a, b]], i) => `<label class="swatch"><input type="radio" name="suit" value="${k}" ${i === 0 ? 'checked' : ''}><span style="background:linear-gradient(135deg,${a} 55%,${b} 55%)"></span></label>`).join('');
  const emblems = Object.entries(EMBLEMS).map(([k, e], i) => `<label class="swatch"><input type="radio" name="emblem" value="${k}" ${i === 0 ? 'checked' : ''}><span class="emb">${e}</span></label>`).join('');
  const skins = SKINS.map((c, i) => `<label class="swatch"><input type="radio" name="skin" value="${c}" ${i === 1 ? 'checked' : ''}><span style="background:${c}"></span></label>`).join('');
  return `<main class="center"><h1>Hero Academy</h1><p class="muted">Wer meldet sich zum Dienst?</p>${list}
    <form class="card" data-f="newprofile"><h2>Neuer Held</h2>
      <input name="name" maxlength="16" placeholder="Heldenname" required autocomplete="off">
      <div class="seg">${GRADES.map((g, i) => `<label><input type="radio" name="grade" value="${g}" ${i === 0 ? 'checked' : ''}><span>Klasse ${g}</span></label>`).join('')}</div>
      <p class="muted">Anzug</p><div class="seg">${suits}</div>
      <p class="muted">Symbol</p><div class="seg">${emblems}</div>
      <p class="muted">Hautton</p><div class="seg">${skins}</div>
      <button class="btn" type="submit">Held erschaffen</button></form></main>`;
}

const SAYS = ['Bereit für die nächste Mission?', 'Heute zeigst du, was in dir steckt!', 'Die Welt braucht einen Helden. Los!', 'Training macht Helden stark.'];
function heroBlock(p) {
  const side = CARDS.find((x) => x.id === p.sidekick && p.cards[x.id]);
  const l = ligaFor(p.fp);
  return `<section class="hero-row"><div class="hero-me" data-a="squish">${myHero(p)}</div>
    <div class="hero-info"><b>${esc(p.name)}</b><span class="muted">${l.cur.emoji} ${l.cur.name}</span><div class="say">${SAYS[(p.fp + p.streak) % SAYS.length]}</div></div>
    ${side ? `<div class="hero-side" data-a="squish" title="Sidekick: ${esc(side.name)}">${cardArt(side)}</div>` : ''}</section>`;
}

function viewLearn(p) {
  const key = `${ui.subject}-${p.grade}`;
  const done = p.progress[key] || 0;
  const subs = Object.entries(SUBJECTS).map(([k, s]) => `<button class="${ui.subject === k ? 'on' : ''}" data-a="subject" data-v="${k}">${s.emoji} ${s.name}</button>`).join('');
  const offs = [0, 38, 64, 38, 0, -38, -64, -38];
  const nodes = Array.from({ length: PATH_NODES }, (_, i) => {
    const st = i < done ? 'done' : i === done ? 'now' : 'lock';
    return `<div class="node-wrap" style="transform:translateX(${offs[i % 8]}px)"><button class="node ${st}" ${st === 'lock' ? 'disabled' : ''} data-a="lesson" data-i="${i}" aria-label="Mission ${i + 1}">${st === 'done' ? '✓' : st === 'now' ? '▶' : '🔒'}</button>${st === 'now' ? '<span class="bubble">Mission ' + (i + 1) + '</span>' : ''}</div>`;
  }).join('');
  const music = /^https:\/\/open\.spotify\.com\//.test(S.spotify || '') ? `<a class="chip music" href="${esc(S.spotify)}" target="_blank" rel="noopener">🎧 Mission-Soundtrack</a>` : '';
  return `<main>${heroBlock(p)}${music}<div class="seg sub">${subs}</div>
    <h2 class="path-title">${SUBJECTS[ui.subject].emoji} ${SUBJECTS[ui.subject].name} · Klasse ${p.grade}</h2>
    <div class="path">${nodes}</div></main>`;
}

function viewProjects(p) {
  const cards = p.projects.map((pr) => {
    const d = daysUntil(pr.date);
    const when = d < 0 ? 'vorbei' : d === 0 ? 'heute!' : d === 1 ? 'morgen' : `in ${d} Tagen`;
    const pct = Math.min(100, Math.round((pr.sessions / SESSIONS_GOAL) * 100));
    const bossReady = pr.sessions >= SESSIONS_FOR_BOSS;
    const v = VILLAINS[pr.subject];
    const boss = pr.boss === 'won'
      ? `<span class="chip good">🏆 ${esc(v.name)} besiegt</span>`
      : `<button class="btn alt" ${bossReady ? '' : 'disabled'} data-a="boss" data-id="${pr.id}">${bossReady ? `${v.emoji} Boss-Mission` : `🔒 Boss ab ${SESSIONS_FOR_BOSS} Trainings`}</button>`;
    const del = ui.confirm === pr.id
      ? `<button class="btn ghost danger" data-a="delproj" data-id="${pr.id}">Wirklich löschen?</button>`
      : `<button class="btn ghost" data-a="confirm" data-id="${pr.id}">Löschen</button>`;
    return `<article class="card"><div><h3>${SUBJECTS[pr.subject].emoji} ${esc(pr.title)}</h3><span class="muted">${esc(pr.date.split('-').reverse().join('.'))} · ${when}</span></div>
      <div class="bar"><i style="width:${pct}%"></i></div><p class="muted">${pr.sessions} von ${SESSIONS_GOAL} Trainings · +10 Bonus-FP je Training</p>
      <div class="row wrap"><button class="btn" data-a="projlesson" data-id="${pr.id}">Trainieren</button>${boss}${del}</div></article>`;
  }).join('');
  return `<main><h1>Klassenarbeiten</h1>${cards || '<p class="muted">Keine Arbeit geplant. Lege sie an – dann trainierst du gezielt und forderst den Boss heraus.</p>'}
    <button class="btn wide" data-a="sheet" data-v="newproject">＋ Neue Klassenarbeit</button></main>`;
}

function viewCollection(p) {
  const owned = CARDS.filter((c) => p.cards[c.id]).length;
  const grid = CARDS.map((c) => {
    const n = p.cards[c.id] || 0;
    return n ? `<button class="tcg ${c.rarity}" data-a="sheet" data-v="card:${c.id}"><div class="art">${cardArt(c)}</div><b>${c.name}</b><small>${RARITY[c.rarity].name}${n > 1 ? ` · ×${n}` : ''}</small></button>`
      : `<div class="tcg locked"><div class="art">${cardArt(c)}</div><b>???</b><small>${SUBJECTS[c.subject].name}</small></div>`;
  }).join('');
  return `<main><h1>Helden-Archiv</h1><p class="muted">${owned} von ${CARDS.length} Helden rekrutiert</p><div class="grid">${grid}</div></main>`;
}

function viewRank(p) {
  rollWeek(p);
  const l = ligaFor(p.fp);
  const rows = [...S.profiles].map((x) => { rollWeek(x); return x; }).sort((a, b) => b.weekFp - a.weekFp)
    .map((x, i) => `<div class="card row"><b>${i + 1}.</b><span class="avatar">${myHero(x)}</span><b>${esc(x.name)}</b><span class="muted">${x.weekFp} FP</span></div>`).join('');
  return `<main><h1>${l.cur.emoji} ${l.cur.name}</h1>
    <div class="bar"><i style="width:${l.pct}%"></i></div>
    <p class="muted">${l.next ? `Noch ${l.next.min - p.fp} FP bis ${l.next.emoji} ${l.next.name}` : 'Höchster Rang erreicht!'}</p>
    <h2>Diese Woche (auf diesem Gerät)</h2>${rows}
    <p class="muted">Online-Rangliste mit Freunden kommt später (siehe docs/ROADMAP.md).</p></main>`;
}

function numpad(L) {
  const cls = L.answered ? (L.ok ? 'right' : 'wrong') : '';
  const dis = L.answered ? 'disabled' : '';
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="key" ${dis} data-a="key" data-v="${n}">${n}</button>`).join('');
  return `<div class="numbox ${cls}">${L.input ? esc(L.input) : '?'}</div>
    <div class="keypad">${keys}<button class="key" ${dis} data-a="key" data-v="del" aria-label="Löschen">⌫</button><button class="key" ${dis} data-a="key" data-v="0">0</button><button class="key go" ${L.input ? dis : 'disabled'} data-a="check" aria-label="Prüfen">✓</button></div>`;
}

function viewLesson() {
  const L = ui.lesson, q = L.queue[L.i];
  const v = VILLAINS[L.subject];
  const hp = Math.max(0, 100 - Math.round((L.hits / L.total) * 100));
  const opts = q.options.map((o, i) => {
    let cls = '';
    if (L.answered) cls = o === q.c ? 'right' : i === L.picked ? 'wrong' : 'dim';
    return `<button class="opt ${cls}" ${L.answered ? 'disabled' : ''} data-a="answer" data-i="${i}">${esc(o)}</button>`;
  }).join('');
  const fb = L.answered ? `<div class="feedback ${L.ok ? 'ok' : 'bad'}"><b>${L.ok ? '💥 Volltreffer!' : 'Daneben! Richtig ist:'}</b>${L.ok ? '' : ` <span>${esc(q.c)}</span>`}<button class="btn" data-a="next">Weiter</button></div>` : '';
  const tag = L.boss ? 'BOSS-MISSION' : L.project ? 'TRAINING FÜR DIE ARBEIT' : 'MISSION';
  return `<main class="lesson"><div class="row"><button class="x" data-a="quit" aria-label="Beenden">✕</button><div class="bar grow"><i style="width:${Math.round((L.i / L.queue.length) * 100)}%"></i></div></div>
    <div class="enemy ${L.boss ? 'boss-on' : ''}"><span class="foe">${v.emoji}</span><div class="grow"><small>${tag} · ${esc(v.name)}</small><div class="bar hp"><i style="width:${hp}%"></i></div></div></div>
    <div class="row between qrow"><h2 class="q">${esc(q.q)}</h2><button class="speak" data-a="speak" aria-label="Vorlesen">🔊</button></div>
    ${q.hint && !L.answered ? `<p class="muted center-t">Tipp: ${esc(q.hint)}</p>` : ''}
    ${q.num ? numpad(L) : `<div class="opts">${opts}</div>`}${fb}</main>`;
}

function viewResult() {
  const R = ui.result, c = R.card;
  const reveal = c ? (R.opened
    ? `<div class="tcg big ${c.rarity} pop"><div class="art">${cardArt(c)}</div><b>${c.name}</b><small>${RARITY[c.rarity].name} · ${SUBJECTS[c.subject].name}</small><p>${esc(c.text)}</p></div>`
    : `<button class="pack" data-a="open">📦<span>Helden-Kiste öffnen</span></button>`) : '<p class="muted">Für eine Helden-Kiste brauchst du mindestens 60 % sofort richtig. Nochmal – du schaffst das!</p>';
  const v = VILLAINS[R.subject];
  return `<main class="center"><h1>${R.boss ? (R.won ? `${v.name} besiegt!` : 'Fast besiegt!') : R.perfect ? 'Perfekte Mission!' : 'Mission erledigt!'}</h1>
    <p class="big-num">${R.correct} / ${R.total} <span class="muted">sofort richtig</span></p>
    <p class="chip">⚡ +${R.fp} Fachpunkte</p>${reveal}
    <button class="btn" data-a="done" ${c && !R.opened ? 'disabled' : ''}>Weiter</button></main>`;
}

function sheet(p) {
  if (!ui.sheet) return '';
  let body = '';
  if (ui.sheet === 'settings') {
    body = `<h2>Einstellungen</h2><h3>Klasse</h3><div class="seg">${GRADES.map((g) => `<button class="${p.grade === g ? 'on' : ''}" data-a="grade" data-v="${g}">Klasse ${g}</button>`).join('')}</div>
      <h3>Mission-Soundtrack</h3><form data-f="spotify"><label>Spotify-Link (Playlist oder Künstler)<input name="url" inputmode="url" placeholder="https://open.spotify.com/…" value="${esc(S.spotify || '')}"></label><button class="btn" type="submit">Speichern</button></form>
      <p class="muted">Der Link öffnet Spotify in der Spotify-App. Leer lassen = kein Soundtrack-Knopf.</p>
      <div class="row wrap"><button class="btn ghost" data-a="switch">Held wechseln</button><button class="btn ghost danger" data-a="reset">${ui.confirm === 'reset' ? 'Wirklich alles löschen?' : 'Alles zurücksetzen'}</button></div>`;
  } else if (ui.sheet === 'newproject') {
    body = `<h2>Neue Klassenarbeit</h2><form data-f="newproject"><label>Fach<select name="subject">${Object.entries(SUBJECTS).map(([k, s]) => `<option value="${k}" ${k === ui.subject ? 'selected' : ''}>${s.name}</option>`).join('')}</select></label>
      <label>Thema<input name="title" maxlength="40" placeholder="z. B. Einmaleins" required autocomplete="off"></label>
      <label>Datum<input type="date" name="date" min="${today()}" required></label>
      <button class="btn" type="submit">Anlegen</button></form>`;
  } else if (ui.sheet.startsWith('card:')) {
    const c = CARDS.find((x) => x.id === ui.sheet.slice(5));
    body = `<div class="tcg big ${c.rarity}"><div class="art" data-a="squish">${cardArt(c)}</div><b>${c.name}</b><small>${RARITY[c.rarity].name} · ${SUBJECTS[c.subject].name}</small><p>${esc(c.text)}</p></div>
      ${p.cards[c.id] ? `<button class="btn wide" data-a="sidekick" data-id="${c.id}" ${p.sidekick === c.id ? 'disabled' : ''}>${p.sidekick === c.id ? '🤝 Ist dein Sidekick' : '🤝 Als Sidekick wählen'}</button>` : ''}`;
  }
  return `<div class="scrim" data-a="closesheet"><section class="sheet" data-stop><button class="x close" data-a="closesheet" aria-label="Schließen">✕</button>${body}</section></div>`;
}

function render() {
  const p = P();
  let html;
  if (!p) html = viewProfile();
  else if (ui.lesson) html = viewLesson();
  else if (ui.result) html = viewResult();
  else {
    rollWeek(p);
    const v = { learn: viewLearn, projects: viewProjects, collection: viewCollection, rank: viewRank }[ui.route];
    html = header(p) + v(p) + tabs();
  }
  $app.innerHTML = html + (p ? sheet(p) : '');
}

// ------------------------------------------------------------ Lektionen
function startLesson({ subject, nodeIndex = null, project = null, boss = false }) {
  const p = P();
  const questions = buildQuestions(subject, p.grade, { boss });
  ui.lesson = { subject, nodeIndex, project, boss, queue: questions, i: 0, total: questions.length, correct: 0, hits: 0, failedOnce: new Set(), answered: false, picked: -1, ok: false, input: '' };
  render();
}

function judge(ok, picked) {
  const L = ui.lesson, q = L.queue[L.i];
  L.picked = picked; L.answered = true; L.ok = ok;
  if (ok) { L.hits++; if (!L.failedOnce.has(q.q)) L.correct++; }
  else if (!L.failedOnce.has(q.q)) { L.failedOnce.add(q.q); L.queue.push({ ...q, options: [...q.options].sort(() => Math.random() - 0.5) }); }
  render();
}
function answer(i) { const L = ui.lesson; if (!L.answered) judge(L.queue[L.i].options[i] === L.queue[L.i].c, i); }
function check() { const L = ui.lesson; if (!L.answered && L.input) judge(L.input === L.queue[L.i].c, -1); }
function typeKey(v) {
  const L = ui.lesson;
  if (!L || L.answered || !L.queue[L.i].num) return;
  if (v === 'del') L.input = L.input.slice(0, -1); else if (L.input.length < 6) L.input += v;
  render();
}

function next() {
  const L = ui.lesson;
  L.i++; L.answered = false; L.picked = -1; L.input = '';
  if (L.i >= L.queue.length) return finishLesson();
  render();
}

function speak() {
  const L = ui.lesson;
  if (!L || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(L.queue[L.i].q.replace(/[·:]/g, (c) => (c === '·' ? ' mal ' : ' geteilt durch ')).replace(/−/g, ' minus ').replace(/\+/g, ' plus ').replace(/=\s*\?/, ' gleich was?'));
    u.lang = 'de-DE'; u.rate = 0.95;
    speechSynthesis.speak(u);
  } catch (e) { /* Vorlesen nicht verfügbar */ }
}

function finishLesson() {
  const p = P(), L = ui.lesson;
  const acc = L.correct / L.total, perfect = L.correct === L.total;
  const passed = acc >= (L.boss ? 0.8 : 0.6);
  let fp = L.correct * 2 + 5 + (perfect ? 5 : 0) + (L.project ? 10 : 0);
  let won = false;
  if (L.boss && passed) { fp += 40; won = true; }
  rollWeek(p);
  p.fp += fp; p.weekFp += fp;
  if (p.lastDay !== today()) { p.streak = p.lastDay === yesterday() ? p.streak + 1 : 1; p.lastDay = today(); }
  if (L.nodeIndex !== null && passed) {
    const key = `${L.subject}-${p.grade}`;
    if ((p.progress[key] || 0) === L.nodeIndex) p.progress[key] = L.nodeIndex + 1;
  }
  if (L.project) {
    const pr = p.projects.find((x) => x.id === L.project);
    if (pr && passed) { if (L.boss) { if (won) pr.boss = 'won'; } else pr.sessions++; }
  }
  const card = passed ? rollCard({ subject: L.subject, boss: L.boss, perfect }) : null;
  if (card) p.cards[card.id] = (p.cards[card.id] || 0) + 1;
  ui.result = { subject: L.subject, correct: L.correct, total: L.total, fp, perfect, boss: L.boss, won, card, opened: false };
  ui.lesson = null;
  commit();
}

// ------------------------------------------------------------ Events
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-a]');
  if (!t) return;
  if (t.classList.contains('scrim') && e.target !== t) return;
  const a = t.dataset.a, v = t.dataset.v, id = t.dataset.id, p = P();
  switch (a) {
    case 'go': ui.route = v; break;
    case 'subject': ui.subject = v; break;
    case 'pick': S.active = v; break;
    case 'sheet': ui.sheet = v; ui.confirm = null; break;
    case 'closesheet': ui.sheet = null; ui.confirm = null; break;
    case 'grade': p.grade = Number(v); break;
    case 'switch': S.active = null; ui.sheet = null; break;
    case 'reset': if (ui.confirm === 'reset') { S = { ...S, active: null, profiles: [] }; ui.sheet = null; ui.confirm = null; } else ui.confirm = 'reset'; break;
    case 'lesson': return startLesson({ subject: ui.subject, nodeIndex: Number(t.dataset.i) });
    case 'projlesson': { const pr = p.projects.find((x) => x.id === id); return startLesson({ subject: pr.subject, project: pr.id }); }
    case 'boss': { const pr = p.projects.find((x) => x.id === id); return startLesson({ subject: pr.subject, project: pr.id, boss: true }); }
    case 'confirm': ui.confirm = id; break;
    case 'delproj': p.projects = p.projects.filter((x) => x.id !== id); ui.confirm = null; break;
    case 'answer': return answer(Number(t.dataset.i));
    case 'key': return typeKey(v);
    case 'check': return check();
    case 'speak': return speak();
    case 'sidekick': p.sidekick = id; ui.sheet = null; break;
    case 'next': return next();
    case 'quit': ui.lesson = null; break;
    case 'open': ui.result.opened = true; break;
    case 'done': ui.result = null; break;
    case 'squish': { t.classList.remove('squish'); void t.offsetWidth; t.classList.add('squish'); return; }
  }
  commit();
});

document.addEventListener('keydown', (e) => {
  const L = ui.lesson;
  if (!L || !L.queue[L.i].num || e.target.closest('input, select, textarea')) return;
  if (/^[0-9]$/.test(e.key)) typeKey(e.key);
  else if (e.key === 'Backspace') typeKey('del');
  else if (e.key === 'Enter') { if (L.answered) next(); else check(); }
});

document.addEventListener('submit', (e) => {
  const f = e.target.closest('[data-f]');
  if (!f) return;
  e.preventDefault();
  const d = new FormData(f);
  if (f.dataset.f === 'newprofile') {
    const name = String(d.get('name')).trim();
    if (!name) return;
    const hero = { suit: String(d.get('suit')), emblem: String(d.get('emblem')), skin: String(d.get('skin')), mask: 'domino', cape: true };
    if (!SUITS[hero.suit] || !EMBLEMS[hero.emblem] || !SKINS.includes(hero.skin)) return;
    const np = newProfile(name, Number(d.get('grade')), hero);
    S.profiles.push(np); S.active = np.id;
  } else if (f.dataset.f === 'newproject') {
    const p = P();
    p.projects.push({ id: Math.random().toString(36).slice(2, 9), subject: String(d.get('subject')), title: String(d.get('title')).trim(), date: String(d.get('date')), sessions: 0, boss: null });
    p.projects.sort((a, b) => a.date.localeCompare(b.date));
    ui.sheet = null; ui.route = 'projects';
  } else if (f.dataset.f === 'spotify') {
    const url = String(d.get('url')).trim();
    S.spotify = /^https:\/\/open\.spotify\.com\//.test(url) ? url : '';
    ui.sheet = null;
  }
  commit();
});

// ------------------------------------------------------------ Start
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* z. B. Vorschau-Sandbox */ });
}
