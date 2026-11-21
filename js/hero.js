// Eigene Superhelden als SVG (prozedural; keine fremden Figuren, keine Bilddateien).
// Stil: dunkel, kantig, mit Licht/Schatten – bewusst nicht „niedlich“.
// heroSvg({ suit, emblem, mask, cape, skin, rarity }) -> SVG-String (viewBox 0 0 100 120, Büste)

export const SUITS = {
  rot:     ['#d62f33', '#ffc531'],
  blau:    ['#2557e8', '#ff4d5e'],
  gold:    ['#d99a00', '#262b3f'],
  gruen:   ['#169a62', '#0e1524'],
  lila:    ['#7a43e6', '#ffc531'],
  schwarz: ['#2a2f45', '#18c6d6'],
  orange:  ['#f26a10', '#1b2a52'],
  tuerkis: ['#12b4c4', '#262b3f'],
};
export const EMBLEMS = { bolt: '⚡', star: '⭐', shield: '🛡️', flame: '🔥', hex: '⬡', ring: '◎' };
export const SKINS = ['#f7d9c0', '#f1c9a5', '#d9a273', '#a8704b', '#7a4a30'];

let uidN = 0;
const mix = (hex, to, t) => {
  const a = hex.replace('#', ''), b = to.replace('#', '');
  const c = (i) => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - t) + parseInt(b.slice(i, i + 2), 16) * t).toString(16).padStart(2, '0');
  return `#${c(0)}${c(2)}${c(4)}`;
};
const star4 = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z" fill="#ffe27a"/>`;

const EMBLEM = {
  bolt:   (a) => `<path d="M54 76 L43 89 L50 89 L46 101 L59 86 L52 86Z" fill="${a}"/>`,
  star:   (a) => `<path transform="translate(50 88) scale(1.45)" d="M0 -7 L2 -2.2 L7 -2 L3 1.4 L4.4 6.4 L0 3.4 L-4.4 6.4 L-3 1.4 L-7 -2 L-2 -2.2Z" fill="${a}"/>`,
  shield: (a) => `<path d="M41 77 H59 V89 Q59 97 50 101 Q41 97 41 89Z" fill="${a}"/>`,
  flame:  (a) => `<path d="M50 76 Q60 87 55 96 Q50 102 45 96 Q40 87 50 76Z" fill="${a}"/>`,
  hex:    (a) => `<polygon points="50,77 59,82 59,93 50,99 41,93 41,82" fill="${a}"/>`,
  ring:   (a) => `<circle cx="50" cy="88" r="9" fill="none" stroke="${a}" stroke-width="3.5"/><circle cx="50" cy="88" r="2.6" fill="${a}"/>`,
};

export function heroSvg(h) {
  const { suit: key = 'rot', emblem = 'bolt', mask = 'domino', cape = true, skin = '#f1c9a5', rarity = 'common' } = h;
  const [suit, acc] = SUITS[key] || SUITS.rot;
  const id = `h${++uidN}`;
  const legendary = rarity === 'legendary', epic = rarity === 'epic';
  const glowCol = mix(acc, '#ffffff', 0.35);
  const skinD = mix(skin, '#000000', 0.38);
  const hl = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#fff" stroke-opacity=".28" stroke-width="1.2" stroke-linecap="round"/>`;

  const defs = `<defs>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(suit, '#ffffff', .22)}"/><stop offset=".45" stop-color="${suit}"/><stop offset="1" stop-color="${mix(suit, '#000000', .62)}"/></linearGradient>
    <linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(acc, '#000000', .35)}"/><stop offset="1" stop-color="${mix(acc, '#000000', .85)}"/></linearGradient>
    <linearGradient id="${id}k" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${skin}"/><stop offset=".55" stop-color="${mix(skin, '#000000', .14)}"/><stop offset="1" stop-color="${skinD}"/></linearGradient>
    <radialGradient id="${id}b" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${acc}" stop-opacity=".5"/><stop offset="1" stop-color="${acc}" stop-opacity="0"/></radialGradient>
    <filter id="${id}g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;

  const aura = `<circle cx="50" cy="52" r="52" fill="url(#${id}b)"/>${legendary ? '<circle cx="50" cy="52" r="50" fill="#ffc531" opacity=".16"/>' : ''}`;
  const capeSvg = cape ? `<path d="M6 120 Q-4 84 20 62 L50 80 L80 62 Q104 84 94 120Z" fill="url(#${id}c)"/><path d="M20 62 Q8 84 18 120 L28 120 Q20 88 34 70Z" fill="#fff" opacity=".07"/>` : '';

  const torso = `<path d="M3 120 Q5 84 28 74 L41 70 L59 70 L72 74 Q95 84 97 120Z" fill="url(#${id}s)"/>
    <path d="M60 70 L72 74 Q95 84 97 120 L66 120 Q70 90 60 70Z" fill="#000" opacity=".28"/>
    <path d="M30 79 L49 77 L48 99 Q38 101 28 94Z M70 79 L51 77 L52 99 Q62 101 72 94Z" fill="#000" opacity=".16" stroke="#000" stroke-opacity=".35" stroke-width=".8"/>
    <path d="M7 92 Q4 72 26 67 L37 72 Q24 80 22 98Z" fill="url(#${id}s)" stroke="#000" stroke-opacity=".45" stroke-width=".9"/>
    <path d="M93 92 Q96 72 74 67 L63 72 Q76 80 78 98Z" fill="url(#${id}s)" stroke="#000" stroke-opacity=".45" stroke-width=".9"/>
    ${hl(10, 86, 14, 76)}${hl(30, 80, 46, 79)}
    <path d="M38 71 L50 82 L62 71 L59 63 L41 63Z" fill="${mix(suit, '#000000', .55)}"/>
    <path d="M3 120 Q5 84 28 74" fill="none" stroke="${glowCol}" stroke-opacity=".55" stroke-width="1"/>`;

  const neck = `<path d="M43 56 L57 56 L60 68 L40 68Z" fill="url(#${id}k)"/><path d="M43 56 L57 56 L57 61 L43 61Z" fill="#000" opacity=".3"/>`;

  const lowerFace = `<path d="M35 42 Q36 58 50 64 Q64 58 65 42 Q50 38 35 42Z" fill="url(#${id}k)"/>
    <path d="M44 55 Q50 57.5 56 55" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M38 52 Q50 66 62 52" fill="none" stroke="#000" stroke-opacity=".16" stroke-width="2"/>`;
  const eyes = (y) => `<g filter="url(#${id}g)"><path d="M37 ${y} L48 ${y + 2} L47 ${y + 4.2} L39 ${y + 3.6}Z M63 ${y} L52 ${y + 2} L53 ${y + 4.2} L61 ${y + 3.6}Z" fill="#fff"/></g>`;
  const faceShade = `<path d="M50 12 Q68 14 67 38 L66 50 Q61 62 50 64Z" fill="#000" opacity=".2"/>`;

  let headSvg;
  if (mask === 'full') {
    headSvg = `<path d="M33 38 Q31 13 50 11 Q69 13 67 38 L66 51 Q61 63 50 66 Q39 63 34 51Z" fill="url(#${id}s)" stroke="#000" stroke-opacity=".5" stroke-width=".9"/>
      <path d="M50 11 L50 30" stroke="#fff" stroke-opacity=".3" stroke-width="1.4"/>
      <path d="M36 35 L50 39 L64 35 L62 44 L50 46 L38 44Z" fill="#06080f"/>${eyes(38)}
      <path d="M39 52 L50 62 L61 52" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="1.4"/>${faceShade}`;
  } else if (mask === 'cowl') {
    headSvg = `${lowerFace}<path d="M33 42 Q30 13 50 10 Q70 13 67 42 L66 46 Q50 38 34 46Z" fill="url(#${id}s)" stroke="#000" stroke-opacity=".5" stroke-width=".9"/>
      <path d="M35 22 L30 2 L45 14Z M65 22 L70 2 L55 14Z" fill="url(#${id}s)" stroke="#000" stroke-opacity=".5" stroke-width=".9"/>${eyes(35)}${faceShade}`;
  } else if (mask === 'visor') {
    headSvg = `${lowerFace}<path d="M33 40 Q31 13 50 11 Q69 13 67 40 L65 45 L35 45Z" fill="url(#${id}s)" stroke="#000" stroke-opacity=".5" stroke-width=".9"/>
      <g filter="url(#${id}g)"><path d="M35 32 L65 32 L64 41 L36 41Z" fill="${glowCol}"/></g><path d="M37 34 L63 34" stroke="#fff" stroke-opacity=".75" stroke-width="1.6" stroke-linecap="round"/>${faceShade}`;
  } else { // domino
    headSvg = `<path d="M34 36 Q34 16 50 14 Q66 16 66 36 L65 49 Q62 61 50 65 Q38 61 35 49Z" fill="url(#${id}k)"/>
      <path d="M33 38 Q31 11 50 10 Q69 11 67 38 Q62 23 50 22 Q38 23 33 38Z" fill="#14141c"/>
      <path d="M34 35 Q50 29 66 35 L65 45 L56 42 Q50 40 44 42 L35 45Z" fill="url(#${id}s)" stroke="#000" stroke-opacity=".5" stroke-width=".8"/>${eyes(36)}
      <path d="M44 55 Q50 57.5 56 55" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/><path d="M38 52 Q50 66 62 52" fill="none" stroke="#000" stroke-opacity=".16" stroke-width="2"/>${faceShade}`;
  }

  const emb = `<g filter="url(#${id}g)" transform="translate(50 90) scale(.9) translate(-50 -88)">${(EMBLEM[emblem] || EMBLEM.bolt)(glowCol)}</g>`;
  const sparkles = (legendary || epic) ? star4(10, 26, 1.3) + star4(91, 34, 1) + star4(84, 12, 1.1) : rarity === 'rare' ? star4(88, 22, 1) : '';
  return `<svg class="hero" viewBox="0 0 100 120" role="img" aria-label="Held" xmlns="http://www.w3.org/2000/svg">${defs}${aura}${capeSvg}${torso}${neck}${headSvg}${emb}${sparkles}</svg>`;
}
