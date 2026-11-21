import { SUBJECTS, GRADES, CARDS, RARITY, VILLAINS, IMAGE_IDS, ligaFor, buildQuestions, rollCard, shuffle, pick } from './data.js';
import { heroSvg, SUITS, EMBLEMS, SKINS } from './hero.js';
import { STORY, DAILY_BRIEFING, ECHO_HIT, ECHO_CRIT, ECHO_MISS } from './story.js';
import { sfx, sfxState } from './sfx.js';
import { load, save, newProfile, today, yesterday, weekKey, daysUntil, exportJson, parseBackup } from './store.js';

const PATH_NODES = 8;
const SESSIONS_FOR_BOSS = 3;
const SESSIONS_GOAL = 5;
const BLITZ_SECONDS = 10;

let S = load();
sfxState.muted = !!S.mute;
const ui = { route: 'learn', subject: 'mathe', lesson: null, result: null, scene: null, sheet: null, confirm: null };

const $app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const P = () => S.profiles.find((p) => p.id === S.active) || null;
const commit = () => { save(S); render(); };
const heroOf = (p) => p.hero || { suit: 'rot', emblem: 'bolt', mask: 'domino', cape: true, skin: SKINS[1] };
const myHero = (p) => (p.photo ? `<img class="hero-photo" src="${p.photo}" alt="" draggable="false">` : heroSvg({ ...heroOf(p), rarity: 'common' }));
// Foto wird nur lokal im Gerät gespeichert (verkleinert, 4:5), nie hochgeladen.
function readPhoto(file) {
  return new Promise((res) => {
    if (!file || !file.size || !/^image\//.test(file.type)) return res(null);
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      const W = 320, H = 400, c = document.createElement('canvas'); c.width = W; c.height = H;
      const k = Math.max(W / im.width, H / im.height), w = im.width * k, h = im.height * k;
      c.getContext('2d').drawImage(im, (W - w) / 2, (H - h) * 0.2, w, h);
      URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', 0.85));
    };
    im.onerror = () => { URL.revokeObjectURL(url); res(null); };
    im.src = url;
  });
}
const cardArt = (c) => (IMAGE_IDS.includes(c.id) ? `<img class="hero-img" src="assets/heroes/${esc(c.id)}.webp" alt="${esc(c.name)}" draggable="false">` : heroSvg(c));
const fill = (t, p) => esc(t.replace(/\{name\}/g, p.name));
const ECHO = '<svg class="echo-svg" viewBox="0 0 60 60" aria-hidden="true"><defs><radialGradient id="eg"><stop offset="0" stop-color="#aaffff"/><stop offset="1" stop-color="#18c6d6" stop-opacity=".15"/></radialGradient></defs><circle cx="30" cy="30" r="27" fill="url(#eg)"/><circle cx="30" cy="30" r="14" fill="#06202a" stroke="#7ff" stroke-width="2"/><circle cx="30" cy="30" r="6" fill="#bff"/></svg>';
const foePic = (v, cls = 'foe-img') => (v.img ? `<img class="${cls}" src="${v.img}" alt="${esc(v.name)}" draggable="false">` : `<span class="foe">${v.emoji}</span>`);

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
      <label>Eigenes Heldenfoto (optional, bleibt auf diesem Gerät)<input type="file" name="photo" accept="image/*"></label>
      <p class="muted">Anzug</p><div class="seg">${suits}</div>
      <p class="muted">Symbol</p><div class="seg">${emblems}</div>
      <p class="muted">Hautton</p><div class="seg">${skins}</div>
      <button class="btn" type="submit">Held erschaffen</button></form></main>`;
}

const SAYS = ['Bereit für die nächste Mission?', 'Heute zeigst du, was in dir steckt!', 'Die Welt braucht einen Helden. Los!', 'Training macht Helden stark.'];
function heroBlock(p) {
  const side = CARDS.find((x) => x.id === p.sidekick && p.cards[x.id]);
  const l = ligaFor(p.fp);
  return `<section class="hero-row"><div class="hero-me" data-a="squish">${myHero(p)}<label class="photo-btn" data-stop>📷 ${p.photo ? 'Ändern' : 'Foto'}<input type="file" data-photo accept="image/*" hidden></label></div>
    <div class="hero-info"><b>${esc(p.name)}</b><span class="muted">${l.cur.emoji} ${l.cur.name}</span><div class="say">${SAYS[(p.fp + p.streak) % SAYS.length]}</div></div>
    ${side ? `<div class="hero-side" data-a="squish" title="Sidekick: ${esc(side.name)}">${cardArt(side)}</div>` : ''}</section>`;
}

function viewLearn(p) {
  const key = `${ui.subject}-${p.grade}`;
  const done = p.progress[key] || 0;
  const story = STORY[ui.subject];
  const subs = Object.entries(SUBJECTS).map(([k, s]) => `<button class="${ui.subject === k ? 'on' : ''}" data-a="subject" data-v="${k}">${s.emoji} ${s.name}</button>`).join('');
  const offs = [0, 38, 64, 38, 0, -38, -64, -38];
  const nodes = Array.from({ length: PATH_NODES }, (_, i) => {
    const st = i < done ? 'done' : i === done ? 'now' : 'lock';
    const fin = i === PATH_NODES - 1;
    const face = st === 'done' ? '✓' : st === 'now' ? (fin ? '👑' : '▶') : '🔒';
    return `<div class="node-wrap" style="transform:translateX(${offs[i % 8]}px)"><button class="node ${st} ${fin ? 'finale' : ''}" ${st === 'lock' ? 'disabled' : ''} data-a="lesson" data-i="${i}" aria-label="Kapitel ${i + 1}: ${esc(story.chapters[i].t)}">${face}</button>${st === 'now' ? `<span class="bubble">Kapitel ${i + 1}</span>` : ''}</div>`;
  }).join('');
  const music = /^https:\/\/open\.spotify\.com\//.test(S.spotify || '') ? `<a class="chip music" href="${esc(S.spotify)}" target="_blank" rel="noopener">🎧 Mission-Soundtrack</a>` : '';
  const daily = p.daily !== today()
    ? `<button class="notruf" data-a="daily"><span class="siren">🚨</span><span><b>ECHO-Notruf</b><small>Tages-Mission · doppelte Beute · garantiert ein seltener Held</small></span></button>`
    : '<p class="muted center-t">🚨 Tages-Notruf erledigt – morgen kommt der nächste!</p>';
  const letters = ui.subject === 'deutsch' && p.grade >= 2
    ? `<div class="row wrap"><button class="notruf letterbtn" data-a="letter"><span class="siren">✉️</span><span><b>Brief-Mission</b><small>Schreibe einem Helden-Freund · ${p.letterDay === today() ? 'heute schon geschrieben' : 'Beute für den ersten Brief am Tag'}</small></span></button>${(p.letters || []).length ? `<button class="btn ghost" data-a="sheet" data-v="letters">📬 Briefmappe (${p.letters.length})</button>` : ''}</div>`
    : '';
  const next = done < PATH_NODES ? `Kapitel ${done + 1}: ${esc(story.chapters[done].t)}` : 'Akte geschlossen – du hast alle Kapitel geschafft! 🏆';
  return `<main>${heroBlock(p)}${music}${daily}<div class="seg sub">${subs}</div>${letters}
    <h2 class="path-title">${esc(story.title)}</h2><p class="muted center-t">${next} · Klasse ${p.grade}</p>
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
      : `<div class="tcg locked"><div class="art">${heroSvg(c)}</div><b>???</b><small>${SUBJECTS[c.subject].name}</small></div>`;
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


// ------------------------------------------------------------ Brief-Mission (Deutsch)
const TOPICS = {
  help: { t: '🆘 Um Hilfe bitten', task: 'Der Fehlerteufel hat Chaos in der Akademie angerichtet. Bitte einen Helden-Freund in einem Brief um Hilfe.', reply: 'Ich bin schon unterwegs und bringe Verstärkung mit!' },
  invite: { t: '🎯 Zur Mission einladen', task: 'Lade einen Helden-Freund in einem Brief zu einer geheimen Mission ein. Schreibe, wann und wo ihr euch trefft.', reply: 'Ich komme! Treffpunkt notiert, Proviant packe ich ein.' },
  thanks: { t: '🏅 Danke sagen', task: 'Ein Helden-Freund hat dich gerettet. Bedanke dich in einem Brief und erzähle, was passiert ist.', reply: 'Gern geschehen! Dafür sind Helden da.' },
};
const PHRASES = ['ich brauche deine Hilfe.', 'Kannst du mir bitte helfen?', 'Wir treffen uns morgen um 15 Uhr.', 'Vielen Dank für deine Hilfe!', 'Der Fehlerteufel macht überall Fehler.'];
const letterNames = (p) => {
  const all = CARDS.filter((c) => c.subject === 'deutsch');
  return [...all.filter((c) => p.cards[c.id]), ...all.filter((c) => !p.cards[c.id])].slice(0, 4).map((c) => c.name);
};
function letterChecks(text, name) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const body = lines.slice(1).join(' ');
  const sents = body.split(/(?<=[.!?])\s+/).filter((x) => x.trim());
  const last = lines.slice(-3).join(' ');
  return [
    { ok: /^(lieber|liebe|hallo|hi|hey)\s+\S+.*,\s*$/i.test(lines[0] || ''), t: 'Anrede mit Komma („Lieber Max,“)', tip: 'Beginne mit „Lieber …,“ oder „Liebe …,“ und setze ein Komma.' },
    { ok: (body.match(/[.!?]/g) || []).length >= 4, t: 'Mindestens 4 Sätze', tip: 'Schreibe mindestens 4 Sätze mit Punkt, Fragezeichen oder Ausrufezeichen.' },
    { ok: /\?|bitte|hilf|komm|treff|danke/i.test(body), t: 'Bitte, Frage oder Dank', tip: 'Was willst du von deinem Freund? Frage ihn etwas oder bedanke dich.' },
    { ok: sents.slice(1).every((x) => /^[A-ZÄÖÜ„"]/.test(x.trim())) && sents.length > 1, t: 'Neue Sätze beginnen groß', tip: 'Nach jedem Punkt schreibst du den nächsten Satz mit großem Buchstaben.' },
    { ok: /gru(ß|ss)|grüße|tschüss|freund/i.test(lines.slice(-2).join(' ')) && lines.length > 2, t: 'Grußformel am Ende', tip: 'Schreibe zum Schluss z. B. „Viele Grüße“ in eine neue Zeile.' },
    { ok: !!lines.length && lines[lines.length - 1].toLowerCase().includes(name.toLowerCase()) && lines.length > 2, t: 'Unterschrift mit deinem Namen', tip: `Unterschreibe in der letzten Zeile mit deinem Namen: ${name}.` },
  ];
}
function bumpStreak(p) {
  if (p.lastDay !== today()) { p.streak = p.lastDay === yesterday() ? p.streak + 1 : 1; p.lastDay = today(); }
}

function viewLetter(p) {
  const Lt = ui.letter, tp = TOPICS[Lt.topic];
  const checks = letterChecks(Lt.text, p.name), n = checks.filter((c) => c.ok).length;
  const chips = (arr, a, cur) => arr.map(([v, l]) => `<button class="pill ${cur === v ? 'on' : ''}" data-a="${a}" data-v="${esc(v)}">${esc(l)}</button>`).join('');
  const list = Lt.checked ? `<ul class="checks">${checks.map((c) => `<li class="${c.ok ? 'ok' : 'no'}">${c.ok ? '✓' : '○'} ${esc(c.t)}${c.ok ? '' : `<small>${esc(c.tip)}</small>`}</li>`).join('')}</ul>` : '';
  return `<main class="letter"><div class="row"><button class="x" data-a="lquit" aria-label="Beenden">✕</button><h2 class="grow">Funkspruch-Werkstatt</h2></div>
    <p class="muted">Schreibe einen Brief an einen Helden-Freund.</p>
    <div class="pills">${chips(Object.entries(TOPICS).map(([k, v]) => [k, v.t]), 'ltopic', Lt.topic)}</div>
    <div class="task">✉️ ${esc(tp.task)}</div>
    <p class="muted">An wen?</p><div class="pills">${chips(letterNames(p).map((x) => [x, x]), 'lrcpt', Lt.to)}</div>
    <textarea data-letter rows="9" placeholder="Lieber ${esc(Lt.to)},&#10;&#10;…&#10;&#10;Viele Grüße&#10;${esc(p.name)}" autocapitalize="sentences" spellcheck="false">${esc(Lt.text)}</textarea>
    <p class="muted">Wortspeicher – tippe, um Bausteine einzufügen:</p>
    <div class="pills small"><button class="pill" data-a="lphrase" data-v="anrede">Lieber ${esc(Lt.to)},</button>${PHRASES.map((x, i) => `<button class="pill" data-a="lphrase" data-v="${i}">${esc(x)}</button>`).join('')}<button class="pill" data-a="lphrase" data-v="gruss">Viele Grüße</button><button class="pill" data-a="lphrase" data-v="name">${esc(p.name)}</button></div>
    ${list}
    <div class="row wrap"><button class="btn alt" data-a="lcheck">🔍 Brief prüfen</button><button class="btn" data-a="lsend" ${n >= 4 && Lt.checked ? '' : 'disabled'}>📨 Abschicken (${Lt.checked ? n : '?'}/6)</button></div>
    <p class="muted">Du brauchst mindestens 4 von 6 Häkchen. Der Brief bleibt auf diesem Gerät in deiner Briefmappe.</p></main>`;
}

// ---- Story-Szene (Briefing / Nachbesprechung) mit ECHO
function viewScene(p) {
  const sc = ui.scene;
  const v = VILLAINS[sc.subject];
  const lines = sc.lines.map((t, i) => `<p class="line" style="animation-delay:${i * 1.1}s">${fill(t, p)}</p>`).join('');
  const shadow = sc.kind === 'brief' && v.img ? `<div class="scene-foe ${sc.finale ? 'reveal' : 'shadow'}">${foePic(v, 'scene-foe-img')}</div>` : sc.kind === 'debrief' && v.img ? `<div class="scene-foe beaten">${foePic(v, 'scene-foe-img')}</div>` : '';
  const goText = sc.kind === 'debrief' ? 'Weiter' : sc.finale ? '⚔️ Zum Duell!' : '▶ Mission starten';
  return `<main class="scene"><div class="scene-title">${esc(sc.title)}</div>${shadow}
    <div class="echo-row"><div class="echo">${ECHO}</div><div class="bubbles">${lines}</div></div>
    <div class="row wrap scene-btns"><button class="btn" data-a="scenego">${goText}</button><button class="btn ghost" data-a="speaklines" aria-label="Vorlesen">🔊</button></div></main>`;
}

// ---- Lektion mit Kampf
function numpad(L) {
  const cls = L.answered ? (L.ok ? 'right' : 'wrong') : '';
  const dis = L.answered ? 'disabled' : '';
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="key" ${dis} data-a="key" data-v="${n}">${n}</button>`).join('');
  return `<div class="numbox ${cls}">${L.input ? esc(L.input) : '?'}</div>
    <div class="keypad">${keys}<button class="key" ${dis} data-a="key" data-v="del" aria-label="Löschen">⌫</button><button class="key" ${dis} data-a="key" data-v="0">0</button><button class="key go" ${L.input ? dis : 'disabled'} data-a="check" aria-label="Prüfen">✓</button></div>`;
}

function clockSvg([h, m]) {
  const pt = (deg, r) => `${(60 + r * Math.sin(deg * Math.PI / 180)).toFixed(1)},${(60 - r * Math.cos(deg * Math.PI / 180)).toFixed(1)}`;
  const ticks = Array.from({ length: 12 }, (_, i) => `<text x="${pt(i * 30 + 30, 43).split(',')[0]}" y="${(Number(pt(i * 30 + 30, 43).split(',')[1]) + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">${i + 1}</text>`).join('');
  return `<svg class="clock" viewBox="0 0 120 120" role="img" aria-label="Uhr"><circle cx="60" cy="60" r="56" fill="none" stroke="var(--gold, #f5c542)" stroke-width="4"/>${ticks}
    <line x1="60" y1="60" x2="${pt((h % 12) * 30 + m * 0.5, 26).split(',')[0]}" y2="${pt((h % 12) * 30 + m * 0.5, 26).split(',')[1]}" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
    <line x1="60" y1="60" x2="${pt(m * 6, 38).split(',')[0]}" y2="${pt(m * 6, 38).split(',')[1]}" stroke="var(--gold, #f5c542)" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="60" r="3.5" fill="currentColor"/></svg>`;
}

function viewLesson(p) {
  const L = ui.lesson, q = L.queue[L.i];
  const v = VILLAINS[L.villain];
  const hp = Math.max(0, 100 - Math.round((L.hits / L.total) * 100));
  const fx = L.answered ? (L.ok ? (L.crit ? 'hit crit' : 'hit') : 'miss') : '';
  const BOLT = '<svg class="bolt" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,58 52,40 78,62 126,28 152,58 204,22 232,50 300,36"/></svg>';
  const sparks = Array.from({ length: L.crit ? 14 : 8 }, (_, i) => `<i style="--a:${i * (360 / (L.crit ? 14 : 8)) + 7}deg;--d:${34 + (i * 13) % 30}px"></i>`).join('');
  const strike = L.answered && L.ok ? `<div class="strike ${L.crit ? 'big' : ''}" aria-hidden="true">${BOLT}<div class="sparks">${sparks}</div>${L.crit ? '<div class="ring"></div>' : ''}</div>` : '';
  const dmg = L.answered && L.ok ? `<span class="dmg">−${Math.ceil(100 / L.total)}${L.crit ? ' !' : ''}</span>` : '';
  const pips = [0, 1, 2].map((i) => `<i class="${L.power > i ? 'on' : ''}"></i>`).join('');
  const combo = L.combo >= 2 ? `<span class="combo">COMBO ×${L.combo}</span>` : '';
  const opts = q.options.map((o, i) => {
    const gone = L.removed.includes(i);
    let cls = gone ? 'gone' : '';
    if (L.answered) cls = o === q.c ? 'right' : i === L.picked ? 'wrong' : 'dim';
    return `<button class="opt ${cls}" ${L.answered || gone ? 'disabled' : ''} data-a="answer" data-i="${i}"><b class="ltr">${'ABCD'[i]}</b><span>${esc(o)}</span></button>`;
  }).join('');
  let blitz = '';
  if (L.blitzAt && !L.answered) {
    const el = (Date.now() - L.blitzAt) / 1000;
    blitz = el < BLITZ_SECONDS
      ? `<div class="blitz"><b>⚡ BLITZ-AUFGABE · doppelter Schaden!</b><div class="blitzbar"><i style="animation-duration:${BLITZ_SECONDS}s;animation-delay:-${el.toFixed(2)}s"></i></div></div>`
      : '<div class="blitz late">⏱️ Zeit vorbei – kein Blitz-Bonus</div>';
  }
  const power = L.power >= 3 && !L.answered && !L.usedPower ? '<button class="power-btn" data-a="power">⚡ SUPERKRAFT AKTIVIEREN</button>' : '';
  const fb = L.answered ? `<div class="feedback ${L.ok ? 'ok' : 'bad'}"><b>${esc(L.echo)}</b>${L.ok ? '' : ` <span>Richtig ist: ${esc(q.c)}</span>`}<button class="btn" data-a="next">Weiter</button></div>` : '';
  const tag = L.boss ? (L.nodeIndex === PATH_NODES - 1 ? 'FINALE' : 'BOSS-MISSION') : L.daily ? 'ECHO-NOTRUF' : L.project ? 'TRAINING' : `KAPITEL ${L.nodeIndex + 1}`;
  return `<main class="lesson"><div class="row"><button class="x" data-a="quit" aria-label="Beenden">✕</button><div class="bar grow"><i style="width:${Math.round((L.i / L.queue.length) * 100)}%"></i></div></div>
    <div class="arena ${fx}">
      <div class="fighter me" data-a="squish">${myHero(p)}</div>
      <div class="mid"><small>${tag}</small>${combo}<div class="pips" title="Superkraft-Leiste">${pips}</div></div>
      <div class="fighter foe">${foePic(v, 'foe-fig')}${dmg}<div class="hpbox"><small>${esc(v.name)}</small><div class="bar hp"><i style="width:${hp}%"></i></div></div></div>
      ${strike}</div>${blitz}
    <div class="row between qrow"><h2 class="q">${esc(q.q)}</h2><button class="speak" data-a="speak" aria-label="Vorlesen">🔊</button></div>
    ${q.clock ? `<div class="clockbox">${clockSvg(q.clock)}</div>` : ''}
    ${L.hintText ? `<p class="center-t hint">${esc(L.hintText)}</p>` : q.hint && !L.answered ? `<p class="muted center-t">Tipp: ${esc(q.hint)}</p>` : ''}${power}
    ${q.num ? numpad(L) : `<div class="opts">${opts}</div>`}${fb}${L.answered && L.crit ? '<div class="flash"></div>' : ''}</main>`;
}

function viewResult() {
  const R = ui.result, c = R.card;
  const reveal = c ? (R.opened
    ? `<div class="tcg big ${c.rarity} pop"><div class="art">${cardArt(c)}</div><b>${c.name}</b><small>${RARITY[c.rarity].name} · ${SUBJECTS[c.subject].name}</small><p>${esc(c.text)}</p></div>`
    : `<button class="pack" data-a="open">📦<span>Helden-Kiste öffnen</span></button>`) : (R.letter ? '<p class="muted">Beute gibt es nur für den ersten Brief am Tag. Die Antwort kommt gleich!</p>' : '<p class="muted">Für eine Helden-Kiste brauchst du mindestens 60 % sofort richtig. Nochmal – du schaffst das!</p>');
  const v = VILLAINS[R.villain];
  const bossPic = R.boss && v.img ? `<img class="boss-big ${R.won ? 'beaten' : ''}" src="${v.img}" alt="${esc(v.name)}" draggable="false">` : '';
  const extras = [R.maxCombo >= 3 ? `🔥 Combo ×${R.maxCombo}` : '', R.blitzWins ? `⚡ ${R.blitzWins}× Blitz-Treffer` : '', R.daily ? '🚨 Notruf-Bonus' : ''].filter(Boolean).map((x) => `<span class="chip">${x}</span>`).join('');
  const conf = (R.won || R.perfect) ? `<div class="confetti" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--dl:${(i % 9) * 0.12}s;--c:${['#ffc531', '#e23b3b', '#18c6d6', '#fff'][i % 4]}"></i>`).join('')}</div>` : '';
  return `<main class="center">${conf}${bossPic}<h1>${R.letter ? (R.perfect ? 'Meisterbrief zugestellt!' : 'Brief zugestellt!') : R.boss ? (R.won ? `${v.name} besiegt!` : 'Fast besiegt!') : R.perfect ? 'Perfekte Mission!' : 'Mission erledigt!'}</h1>
    <p class="big-num">${R.correct} / ${R.total} <span class="muted">${R.letter ? 'Brief-Check' : 'sofort richtig'}</span></p>
    <p class="chip">⚡ +${R.fp} Fachpunkte</p><div class="row wrap">${extras}</div>${reveal}
    <button class="btn" data-a="done" ${c && !R.opened ? 'disabled' : ''}>Weiter</button></main>`;
}

function sheet(p) {
  if (!ui.sheet) return '';
  let body = '';
  if (ui.sheet === 'settings') {
    body = `<h2>Einstellungen</h2><h3>Klasse</h3><div class="seg">${GRADES.map((g) => `<button class="${p.grade === g ? 'on' : ''}" data-a="grade" data-v="${g}">Klasse ${g}</button>`).join('')}</div>
      <h3>Heldenfoto</h3><label><input type="file" data-photo accept="image/*"></label>${p.photo ? '<button class="btn ghost" data-a="nophoto">Foto entfernen</button>' : ''}
      <h3>Sound</h3><div class="seg"><button class="${S.mute ? '' : 'on'}" data-a="mute">${S.mute ? '🔇 Aus' : '🔊 An'}</button></div>
      <h3>Mission-Soundtrack</h3><form data-f="spotify"><label>Spotify-Link (Playlist oder Künstler)<input name="url" inputmode="url" placeholder="https://open.spotify.com/…" value="${esc(S.spotify || '')}"></label><button class="btn" type="submit">Speichern</button></form>
      <p class="muted">Der Link öffnet Spotify in der Spotify-App. Leer lassen = kein Soundtrack-Knopf.</p>
      <h3>Sicherung</h3><p class="muted">Speichert alle Helden und Fortschritte (auch Fotos) in einer Datei. Safari kann Website-Daten löschen – sichere ab und zu!</p>
      <div class="row wrap"><button class="btn" data-a="export">💾 Sichern</button><label class="btn ghost">📂 Wiederherstellen<input type="file" data-import accept=".json,application/json" hidden></label></div>${ui.msg ? `<p class="muted" role="status">${esc(ui.msg)}</p>` : ''}
      <div class="row wrap"><button class="btn ghost" data-a="switch">Held wechseln</button><button class="btn ghost danger" data-a="reset">${ui.confirm === 'reset' ? 'Wirklich alles löschen?' : 'Alles zurücksetzen'}</button></div>`;
  } else if (ui.sheet === 'letters') {
    body = `<h2>📬 Briefmappe</h2>${(p.letters || []).slice().reverse().map((l) => `<article class="card mail"><small class="muted">${esc(l.date.split('-').reverse().join('.'))} · an ${esc(l.to)}</small><pre>${esc(l.text)}</pre><div class="reply"><b>Antwort:</b> ${esc(l.reply)}</div></article>`).join('') || '<p class="muted">Noch keine Briefe.</p>'}`;
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
  else if (ui.lesson) html = viewLesson(p);
  else if (ui.result) html = viewResult();
  else if (ui.scene) html = viewScene(p);
  else if (ui.letter) html = viewLetter(p);
  else {
    rollWeek(p);
    const v = { learn: viewLearn, projects: viewProjects, collection: viewCollection, rank: viewRank }[ui.route];
    html = header(p) + v(p) + tabs();
  }
  $app.innerHTML = html + (p ? sheet(p) : '');
}

// ------------------------------------------------------------ Lektionen
function armQuestion(L) {
  L.removed = []; L.hintText = ''; L.usedPower = false;
  L.blitzAt = L.i > 0 && L.i < L.total - 1 && Math.random() < 0.28 ? Date.now() : 0; // nie bei der ersten/letzten Frage
}

function startLesson({ subject, nodeIndex = null, project = null, boss = false, daily = false }) {
  const p = P();
  let questions;
  if (daily) {
    questions = shuffle(Object.keys(SUBJECTS).flatMap((s) => buildQuestions(s, p.grade).slice(0, 2)));
  } else {
    questions = buildQuestions(subject, p.grade, { boss });
  }
  const L = { subject, nodeIndex, project, boss, daily, villain: daily ? pick(Object.keys(VILLAINS)) : subject, queue: questions, i: 0, total: questions.length, correct: 0, hits: 0, combo: 0, maxCombo: 0, power: 0, blitzWins: 0, failedOnce: new Set(), answered: false, picked: -1, ok: false, crit: false, echo: '', input: '' };
  armQuestion(L);
  ui.lesson = L; ui.scene = null;
  render();
}

function judge(ok, picked) {
  const L = ui.lesson, q = L.queue[L.i];
  L.picked = picked; L.answered = true; L.ok = ok;
  const inTime = L.blitzAt && (Date.now() - L.blitzAt) / 1000 <= BLITZ_SECONDS;
  L.crit = false;
  if (ok) {
    L.hits++; L.combo++; L.maxCombo = Math.max(L.maxCombo, L.combo); L.power = Math.min(3, L.power + 1);
    if (!L.failedOnce.has(q.q)) L.correct++;
    if (inTime) L.blitzWins++;
    L.crit = L.combo >= 3 || !!inTime;
    L.echo = pick(L.crit ? ECHO_CRIT : ECHO_HIT);
    if (L.crit) sfx.crit(); else sfx.hit();
    if (L.power === 3 && !L.usedPower) setTimeout(() => sfx.power(), 250);
  } else {
    L.combo = 0;
    L.echo = pick(ECHO_MISS);
    sfx.miss();
    if (!L.failedOnce.has(q.q)) { L.failedOnce.add(q.q); L.queue.push({ ...q, options: shuffle(q.options) }); }
  }
  render();
}
function answer(i) { const L = ui.lesson; if (!L.answered) judge(L.queue[L.i].options[i] === L.queue[L.i].c, i); }
function check() { const L = ui.lesson; if (!L.answered && L.input) judge(L.input === L.queue[L.i].c, -1); }
function typeKey(v) {
  const L = ui.lesson;
  if (!L || L.answered || !L.queue[L.i].num) return;
  sfx.tap();
  if (v === 'del') L.input = L.input.slice(0, -1); else if (L.input.length < 6) L.input += v;
  render();
}

function usePower() {
  const L = ui.lesson, q = L.queue[L.i];
  if (L.power < 3 || L.answered || L.usedPower) return;
  L.usedPower = true; L.power = 0; sfx.power();
  if (q.num) L.hintText = `⚡ Superkraft: Die Lösung endet auf ${q.c.slice(-1)} und hat ${q.c.length} Stelle${q.c.length > 1 ? 'n' : ''}.`;
  else { L.removed = shuffle(q.options.map((o, i) => i).filter((i) => q.options[i] !== q.c)).slice(0, 2); L.hintText = '⚡ Superkraft: Zwei falsche Antworten sind weg!'; }
  render();
}

function next() {
  const L = ui.lesson;
  L.i++; L.answered = false; L.picked = -1; L.input = '';
  if (L.i >= L.queue.length) return finishLesson();
  armQuestion(L);
  render();
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE'; u.rate = 0.95;
    speechSynthesis.speak(u);
  } catch (e) { /* Vorlesen nicht verfügbar */ }
}
const mathSpeech = (t) => t.replace(/·/g, ' mal ').replace(/:/g, ' geteilt durch ').replace(/−/g, ' minus ').replace(/\+/g, ' plus ').replace(/□/g, ' was ').replace(/\(/g, ' Klammer auf ').replace(/\)/g, ' Klammer zu ').replace(/=\s*\?/, ' gleich was?');

function finishLesson() {
  const p = P(), L = ui.lesson;
  const perfect = L.correct === L.total;
  const passed = L.correct / L.total >= (L.boss ? 0.8 : 0.6);
  let fp = L.correct * 2 + 5 + (perfect ? 5 : 0) + (L.project ? 10 : 0) + (L.maxCombo >= 3 ? (L.maxCombo - 2) * 2 : 0) + L.blitzWins * 3 + (L.daily ? 15 : 0);
  let won = false;
  if (L.boss && passed) { fp += 40; won = true; }
  rollWeek(p);
  p.fp += fp; p.weekFp += fp;
  if (p.lastDay !== today()) { p.streak = p.lastDay === yesterday() ? p.streak + 1 : 1; p.lastDay = today(); }
  let story = null;
  if (L.nodeIndex !== null && passed) {
    const key = `${L.subject}-${p.grade}`;
    if ((p.progress[key] || 0) === L.nodeIndex) { p.progress[key] = L.nodeIndex + 1; story = { title: `Kapitel ${L.nodeIndex + 1} geschafft: ${STORY[L.subject].chapters[L.nodeIndex].t}`, lines: STORY[L.subject].chapters[L.nodeIndex].out }; }
  }
  if (L.daily && passed) p.daily = today();
  if (L.project) {
    const pr = p.projects.find((x) => x.id === L.project);
    if (pr && passed) { if (L.boss) { if (won) pr.boss = 'won'; } else pr.sessions++; }
  }
  const card = passed ? rollCard({ subject: L.daily ? pick(Object.keys(SUBJECTS)) : L.subject, boss: L.boss, perfect: perfect || L.daily }) : null;
  if (card) p.cards[card.id] = (p.cards[card.id] || 0) + 1;
  ui.result = { subject: L.subject, villain: L.villain, correct: L.correct, total: L.total, fp, perfect, boss: L.boss, won, card, opened: false, maxCombo: L.maxCombo, blitzWins: L.blitzWins, daily: L.daily, story };
  ui.lesson = null;
  if (passed) sfx.win();
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
    case 'closesheet': ui.sheet = null; ui.confirm = null; ui.msg = null; break;
    case 'grade': p.grade = Number(v); break;
    case 'letter': ui.letter = { to: letterNames(p)[0], topic: 'help', text: '', checked: false }; break;
    case 'lquit': ui.letter = null; break;
    case 'ltopic': ui.letter.topic = v; break;
    case 'lrcpt': ui.letter.to = v; break;
    case 'lphrase': {
      const Lt = ui.letter, tx = Lt.text.replace(/\s+$/, '');
      if (v === 'anrede') Lt.text = `Lieber ${Lt.to},\n` + Lt.text.replace(/^\s+/, '');
      else if (v === 'gruss') Lt.text = `${tx}\n\nViele Grüße`;
      else if (v === 'name') Lt.text = `${tx}\n${p.name}`;
      else Lt.text = tx + (tx && !/\n$/.test(Lt.text) ? ' ' : '') + (tx.endsWith(',') || !tx ? PHRASES[Number(v)] : PHRASES[Number(v)][0].toUpperCase() + PHRASES[Number(v)].slice(1));
      Lt.checked = false; break;
    }
    case 'lcheck': ui.letter.checked = true; sfx.tap(); break;
    case 'lsend': {
      const Lt = ui.letter, n = letterChecks(Lt.text, p.name).filter((c) => c.ok).length;
      if (n < 4) { Lt.checked = true; break; }
      const first = p.letterDay !== today(), fp = first ? n * 4 + 10 : 0;
      rollWeek(p); p.fp += fp; p.weekFp += fp; bumpStreak(p);
      p.letterDay = today();
      const tp = TOPICS[Lt.topic];
      p.letters = [...(p.letters || []), { to: Lt.to, topic: Lt.topic, text: Lt.text.trim(), reply: tp.reply, date: today() }].slice(-30);
      const card = first ? rollCard({ subject: 'deutsch', perfect: n === 6 }) : null;
      if (card) p.cards[card.id] = (p.cards[card.id] || 0) + 1;
      ui.result = { subject: 'deutsch', villain: 'deutsch', correct: n, total: 6, fp, perfect: n === 6, boss: false, won: false, card, opened: false, maxCombo: 0, blitzWins: 0, daily: false, letter: true,
        story: { title: `Antwort von ${Lt.to}`, lines: [`ECHO: Eilmeldung! Dein Brief an ${Lt.to} wurde zugestellt.`, `${Lt.to}: „{name}, danke für deinen Brief! ${tp.reply}“`, 'ECHO: Die Antwort liegt in deiner Briefmappe.'] } };
      ui.letter = null; sfx.win(); break;
    }
    case 'export': return doExport();
    case 'nophoto': delete p.photo; break;
    case 'mute': S.mute = !S.mute; sfxState.muted = S.mute; sfx.tap(); break;
    case 'switch': S.active = null; ui.sheet = null; break;
    case 'reset': if (ui.confirm === 'reset') { S = { ...S, active: null, profiles: [] }; ui.sheet = null; ui.confirm = null; } else ui.confirm = 'reset'; break;
    case 'lesson': {
      const i = Number(t.dataset.i), key = `${ui.subject}-${p.grade}`, ch = STORY[ui.subject].chapters[i], fin = i === PATH_NODES - 1;
      if ((p.progress[key] || 0) === i) { ui.scene = { kind: 'brief', subject: ui.subject, title: `Kapitel ${i + 1}: ${ch.t}`, lines: ch.in, finale: fin, after: { subject: ui.subject, nodeIndex: i, boss: fin } }; sfx.tap(); break; }
      return startLesson({ subject: ui.subject, nodeIndex: i, boss: fin });
    }
    case 'daily': ui.scene = { kind: 'brief', subject: pick(Object.keys(VILLAINS)), title: 'ECHO-Notruf', lines: DAILY_BRIEFING, finale: false, after: { subject: 'mathe', daily: true } }; sfx.tap(); break;
    case 'scenego': { const sc = ui.scene; sfx.tap(); if (sc.after) return startLesson(sc.after); ui.scene = null; break; }
    case 'speaklines': { speakText(ui.scene.lines.map((l) => l.replace(/\{name\}/g, p.name).replace(/^ECHO:\s*/, '')).join(' ')); return; }
    case 'projlesson': { const pr = p.projects.find((x) => x.id === id); return startLesson({ subject: pr.subject, project: pr.id }); }
    case 'boss': { const pr = p.projects.find((x) => x.id === id); return startLesson({ subject: pr.subject, project: pr.id, boss: true }); }
    case 'confirm': ui.confirm = id; break;
    case 'delproj': p.projects = p.projects.filter((x) => x.id !== id); ui.confirm = null; break;
    case 'answer': return answer(Number(t.dataset.i));
    case 'key': return typeKey(v);
    case 'check': return check();
    case 'power': return usePower();
    case 'speak': { const L = ui.lesson; if (L) speakText(mathSpeech(L.queue[L.i].q)); return; }
    case 'sidekick': p.sidekick = id; ui.sheet = null; break;
    case 'next': return next();
    case 'quit': ui.lesson = null; break;
    case 'open': ui.result.opened = true; sfx.open(); break;
    case 'done': {
      const s = ui.result.story, subj = ui.result.subject;
      ui.result = null;
      if (s) ui.scene = { kind: 'debrief', subject: subj, title: s.title, lines: s.lines, finale: false, after: null };
      break;
    }
    case 'squish': { t.classList.remove('squish'); void t.offsetWidth; t.classList.add('squish'); sfx.tap(); return; }
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

document.addEventListener('input', (e) => {
  if (e.target.matches('[data-letter]') && ui.letter) { ui.letter.text = e.target.value; ui.letter.checked = false; }
});

async function doExport() {
  const name = `lernhelden-${today()}.json`;
  const file = new File([exportJson(S)], name, { type: 'application/json' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: name }); ui.msg = 'Gesichert!'; return render(); }
  } catch (e) { if (e.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  ui.msg = 'Datei gesichert (Ordner „Downloads“).'; render();
}

document.addEventListener('change', async (e) => {
  if (e.target.matches('[data-import]')) {
    const f = e.target.files[0]; e.target.value = '';
    if (!f) return;
    try {
      const ns = parseBackup(await f.text());
      if (!confirm(`Backup mit ${ns.profiles.length} Held(en) laden? Der aktuelle Stand auf diesem Gerät wird ersetzt.`)) return;
      S = ns; sfxState.muted = !!S.mute; ui.msg = 'Wiederhergestellt!';
    } catch (err) { ui.msg = err.message; }
    return commit();
  }
  if (!e.target.matches('[data-photo]')) return;
  const ph = await readPhoto(e.target.files[0]);
  if (ph) { P().photo = ph; commit(); }
});

document.addEventListener('submit', async (e) => {
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
    const ph = await readPhoto(d.get('photo'));
    if (ph) np.photo = ph;
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

// Karten-Tilt: folgt dem Finger/der Maus (nur Optik, kein Zustand)
let tiltEl = null;
function tilt(e, end) {
  const c = e.target.closest && e.target.closest('.tcg:not(.locked)');
  if (end || !c) { if (tiltEl) { tiltEl.classList.remove('tilting'); tiltEl.style.removeProperty('--rx'); tiltEl.style.removeProperty('--ry'); tiltEl = null; } if (!c || end) return; }
  if (tiltEl && tiltEl !== c) { tiltEl.classList.remove('tilting'); tiltEl.style.removeProperty('--rx'); tiltEl.style.removeProperty('--ry'); }
  tiltEl = c; const r = c.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
  c.classList.add('tilting');
  c.style.setProperty('--ry', `${((x - 0.5) * 22).toFixed(1)}deg`); c.style.setProperty('--rx', `${((0.5 - y) * 22).toFixed(1)}deg`);
  c.style.setProperty('--gx', `${(x * 100).toFixed(0)}%`); c.style.setProperty('--gy', `${(y * 100).toFixed(0)}%`);
}
document.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || e.buttons || e.pointerType === 'touch') tilt(e); });
document.addEventListener('pointerup', (e) => tilt(e, true));
document.addEventListener('pointercancel', (e) => tilt(e, true));
document.addEventListener('pointerleave', (e) => tilt(e, true), true);

// ------------------------------------------------------------ Start
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* z. B. Vorschau-Sandbox */ });
}
