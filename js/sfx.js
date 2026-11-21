// Kleine Soundeffekte per Web Audio (keine Dateien, offline, abschaltbar).
let ctx = null;
export const sfxState = { muted: false };

function ac() {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
  } catch (e) { ctx = null; }
  return ctx;
}

function tone(freq, dur, type = 'sine', vol = 0.12, to = null, delay = 0) {
  if (sfxState.muted) return;
  const c = ac();
  if (!c) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + dur + 0.02);
}

export const sfx = {
  tap() { tone(520, 0.05, 'sine', 0.05); },
  hit() { tone(200, 0.14, 'square', 0.09, 80); tone(700, 0.18, 'triangle', 0.12, 1100, 0.04); },
  crit() { tone(160, 0.2, 'sawtooth', 0.1, 60); [660, 880, 1320].forEach((f, i) => tone(f, 0.14, 'triangle', 0.12, null, 0.05 + i * 0.06)); },
  miss() { tone(190, 0.28, 'sawtooth', 0.07, 85); },
  power() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.16, 'triangle', 0.12, null, i * 0.06)); },
  blitz() { tone(1200, 0.08, 'square', 0.05); },
  win() { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, 'triangle', 0.13, null, i * 0.11)); tone(1047, 0.5, 'sine', 0.1, null, 0.5); },
  open() { tone(300, 0.4, 'sawtooth', 0.06, 900); tone(900, 0.3, 'triangle', 0.1, 1500, 0.35); },
};
