// Eigene Superhelden als SVG (prozedural; keine fremden Figuren, keine Bilddateien).
// heroSvg({ suit, emblem, mask, cape, skin, rarity }) -> SVG-String (viewBox 0 0 100 100, Büste)

export const SUITS = {
  rot:     ['#e23b3b', '#ffc531'],
  blau:    ['#2f6bff', '#ff4d5e'],
  gold:    ['#e8a600', '#2a2f45'],
  gruen:   ['#1fae6e', '#101828'],
  lila:    ['#8a4fff', '#ffc531'],
  schwarz: ['#2a2f45', '#18c6d6'],
  orange:  ['#ff7a1a', '#1b2a52'],
  tuerkis: ['#18c6d6', '#2a2f45'],
};
export const EMBLEMS = { bolt: '⚡', star: '⭐', shield: '🛡️', flame: '🔥', hex: '⬡', ring: '◎' };
export const SKINS = ['#f7d9c0', '#f1c9a5', '#d9a273', '#a8704b', '#7a4a30'];

const star4 = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z" fill="#ffe27a"/>`;

const EMBLEM = {
  bolt:   (a) => `<path d="M54 75 L43 88 L50 88 L46 99 L58 85 L51 85Z" fill="${a}" stroke="#0006" stroke-width="1" stroke-linejoin="round"/>`,
  star:   (a) => `<path transform="translate(50 87) scale(1.5)" d="M0 -7 L2 -2.2 L7 -2 L3 1.4 L4.4 6.4 L0 3.4 L-4.4 6.4 L-3 1.4 L-7 -2 L-2 -2.2Z" fill="${a}" stroke="#0006" stroke-width=".7" stroke-linejoin="round"/>`,
  shield: (a) => `<path d="M41 76 H59 V88 Q59 96 50 100 Q41 96 41 88Z" fill="${a}" stroke="#0006" stroke-width="1"/>`,
  flame:  (a) => `<path d="M50 75 Q60 86 55 95 Q50 101 45 95 Q40 86 50 75Z" fill="${a}" stroke="#0006" stroke-width="1"/>`,
  hex:    (a) => `<polygon points="50,76 59,81 59,92 50,98 41,92 41,81" fill="${a}" stroke="#0006" stroke-width="1"/>`,
  ring:   (a) => `<circle cx="50" cy="87" r="9" fill="none" stroke="${a}" stroke-width="3.5"/><circle cx="50" cy="87" r="2.6" fill="${a}"/>`,
};

function head(mask, suit, acc, skin) {
  const face = `<ellipse cx="50" cy="40" rx="15" ry="18" fill="${skin}"/>`;
  const mouth = '<path d="M45 50 Q50 53.5 55 50" fill="none" stroke="#0000005a" stroke-width="2" stroke-linecap="round"/>';
  const slit = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2} L${x2} ${y2 + 3} L${x1} ${y1 + 2.4}Z" fill="#fff"/>`;
  switch (mask) {
    case 'full':
      return `<ellipse cx="50" cy="40" rx="16.5" ry="19.5" fill="${suit}"/><path d="M35 37 L65 37 L61 47 Q50 50 39 47Z" fill="${acc}"/>
        <path d="M38 39.5 L47 41 L47 44 L40 44Z M62 39.5 L53 41 L53 44 L60 44Z" fill="#fff" opacity=".85"/>`;
    case 'cowl':
      return `${face}<path d="M34 44 Q33 17 50 17 Q67 17 66 44 Q58 36 50 36 Q42 36 34 44Z" fill="${suit}"/>
        <path d="M36 24 L34 10 L45 19Z M64 24 L66 10 L55 19Z" fill="${suit}"/>${slit(38, 36, 47, 38.5)}${slit(62, 36, 53, 38.5)}${mouth}`;
    case 'visor':
      return `${face}<path d="M34.5 38 Q33 17 50 17 Q67 17 65.5 38 Q50 27 34.5 38Z" fill="${suit}"/>
        <rect x="34" y="35" width="32" height="8" rx="4" fill="${acc}"/><rect x="36" y="37.5" width="28" height="3" rx="1.5" fill="#fff" opacity=".7"/>${mouth}`;
    default: // domino
      return `${face}<path d="M34.5 38 Q33 17 50 17 Q67 17 65.5 38 Q50 28 34.5 38Z" fill="${suit}"/>
        <path d="M34 36 Q50 31 66 36 L66 44 Q58 41 50 45 Q42 41 34 44Z" fill="${suit}"/>
        <ellipse cx="43" cy="40" rx="3.4" ry="2" fill="#fff"/><ellipse cx="57" cy="40" rx="3.4" ry="2" fill="#fff"/>${mouth}`;
  }
}

export function heroSvg(h) {
  const { suit: key = 'rot', emblem = 'bolt', mask = 'domino', cape = true, skin = '#f1c9a5', rarity = 'common' } = h;
  const [suit, acc] = SUITS[key] || SUITS.rot;
  const legendary = rarity === 'legendary', epic = rarity === 'epic';
  const aura = legendary ? `<circle cx="50" cy="55" r="48" fill="#ffc531" opacity=".25"/>` : epic ? `<circle cx="50" cy="55" r="46" fill="${acc}" opacity=".16"/>` : '';
  const sparkles = (legendary || epic) ? star4(12, 24, 1.3) + star4(88, 32, 1) + star4(82, 10, 1.1) : rarity === 'rare' ? star4(86, 22, 1) : '';
  return `<svg class="hero" viewBox="0 0 100 100" role="img" aria-label="Held" xmlns="http://www.w3.org/2000/svg">${aura}
    ${cape ? `<path d="M20 100 Q8 70 28 56 L50 66 L72 56 Q92 70 80 100Z" fill="${acc}"/><path d="M20 100 Q8 70 28 56 L36 60 Q22 76 30 100Z" fill="#0003"/>` : ''}
    <path d="M14 100 Q16 71 50 67 Q84 71 86 100Z" fill="${suit}"/>
    <path d="M33 71 L50 86 L67 71" fill="none" stroke="${acc}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M14 100 Q15 82 22 76 M86 100 Q85 82 78 76" fill="none" stroke="#0003" stroke-width="2"/>
    <rect x="44" y="54" width="12" height="15" rx="4" fill="${skin}"/><rect x="44" y="54" width="12" height="6" fill="#0002"/>
    ${head(mask, suit, acc, skin)}
    ${(EMBLEM[emblem] || EMBLEM.bolt)(acc)}${sparkles}</svg>`;
}
