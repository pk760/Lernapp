// Persistenz: komplett lokal (localStorage), kein Server, keine Kosten.
const KEY = 'lernhelden.v1';

export const uid = () => Math.random().toString(36).slice(2, 9);

export function ymd(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
export const today = () => ymd();
export const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return ymd(d); };
export function weekKey(d = new Date()) {
  const x = new Date(d); const day = (x.getDay() + 6) % 7; x.setDate(x.getDate() - day); return ymd(x);
}
export function daysUntil(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const target = new Date(y, m - 1, d), now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target - now) / 86400000);
}

export const defaults = () => ({ v: 1, active: null, spotify: '', profiles: [] });

export function newProfile(name, grade, hero) {
  return { id: uid(), name, grade, hero, sidekick: null, fp: 0, weekFp: 0, weekKey: weekKey(), streak: 0, lastDay: '', progress: {}, cards: {}, projects: [] };
}

export function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.v === 1) return s;
  } catch (e) { /* leer oder nicht verfügbar */ }
  return defaults();
}

export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignorieren */ }
}

// Erlaubte Spotify-Links (Web-Link oder Kurzlink aus „Teilen“)
export const isSpotifyUrl = (u) => /^https:\/\/(open\.spotify\.com|spotify\.link)\//.test(String(u || ''));

// ---- Backup: Export/Import als Datei (kein Server) ----
export const BACKUP_APP = 'lernhelden-backup';

export function exportJson(state) {
  return JSON.stringify({ app: BACKUP_APP, exported: new Date().toISOString(), state }, null, 1);
}

// Prüft eine Backup-Datei streng; gibt den bereinigten Zustand zurück oder wirft Error mit verständlicher Meldung.
export function parseBackup(text) {
  let o;
  try { o = JSON.parse(text); } catch (e) { throw new Error('Das ist keine Backup-Datei.'); }
  const s = o && o.app === BACKUP_APP ? o.state : null;
  if (!s || s.v !== 1 || !Array.isArray(s.profiles)) throw new Error('Das ist keine Lernhelden-Backup-Datei.');
  const ok = s.profiles.every((p) => p && typeof p.id === 'string' && typeof p.name === 'string' && Number.isInteger(p.grade) && p.grade >= 1 && p.grade <= 4
    && p.cards && typeof p.cards === 'object' && p.progress && typeof p.progress === 'object' && Array.isArray(p.projects));
  if (!ok) throw new Error('Die Datei ist beschädigt.');
  const spotify = isSpotifyUrl(s.spotify) ? s.spotify : '';
  const active = s.profiles.some((p) => p.id === s.active) ? s.active : null;
  return { ...s, spotify, active };
}
