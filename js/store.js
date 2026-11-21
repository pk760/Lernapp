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
