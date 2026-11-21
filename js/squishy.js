// Eigene Squishy-Figuren als SVG (rein prozedural, keine fremden Figuren, keine Bilddateien).
// squishy({ shape, color, face, acc, rarity }) -> SVG-String (viewBox 0 0 100 100)

const TOP = { dumpling: 30, butter: 34, mochi: 28, bao: 24, pudding: 40, onigiri: 26, broetchen: 32, knet: 28 }; // y-Oberkante, für Accessoires

export const COLORS = {
  cream: '#f6e7cf', butter: '#ffd966', pink: '#ffc9de', lilac: '#d9c8ff', mint: '#b8f0d8', sky: '#bfe3ff', peach: '#ffd0b0', caramel: '#ffb866',
};

const BODY = {
  dumpling: (c) => `<path d="M10 64 Q10 30 50 30 Q90 30 90 64 Q90 84 50 84 Q10 84 10 64Z" fill="${c}"/>
    <path d="M30 36 Q33 44 38 38 M45 32 Q50 42 55 32 M62 38 Q67 44 70 36" fill="none" stroke="#00000022" stroke-width="2.5" stroke-linecap="round"/>`,
  butter: (c) => `<rect x="14" y="34" width="72" height="48" rx="16" fill="${c}"/>
    <path d="M14 50 Q14 34 30 34 L70 34 Q86 34 86 50 Q80 44 72 48 Q64 52 58 46 Q50 42 42 48 Q34 52 28 46 Q20 44 14 50Z" fill="#fff3b0"/>`,
  mochi: (c) => `<ellipse cx="50" cy="58" rx="38" ry="30" fill="${c}"/>`,
  bao: (c) => `<circle cx="50" cy="56" r="33" fill="${c}"/>
    <path d="M50 24 Q60 26 58 34 Q56 40 48 38 Q42 36 44 30" fill="none" stroke="#00000022" stroke-width="2.5" stroke-linecap="round"/>`,
  onigiri: (c) => `<path d="M50 24 Q58 24 66 42 L85 78 Q88 85 79 85 L21 85 Q12 85 15 78 L34 42 Q42 24 50 24Z" fill="${c}"/>
    <path d="M23 76 L77 76 L82 80 Q84 85 78 85 L22 85 Q16 85 18 80Z" fill="#2b3a35"/>`,
  broetchen: (c) => `<ellipse cx="50" cy="58" rx="39" ry="28" fill="${c}"/>
    <path d="M30 38 Q34 46 42 40 M44 34 Q50 44 56 34 M58 40 Q66 46 70 38" fill="none" stroke="#00000024" stroke-width="2.8" stroke-linecap="round"/>`,
  knet: (c) => `<circle cx="11" cy="66" r="8" fill="${c}"/><circle cx="89" cy="66" r="8" fill="${c}"/><circle cx="35" cy="86" r="8" fill="${c}"/><circle cx="65" cy="86" r="8" fill="${c}"/>
    <ellipse cx="50" cy="58" rx="36" ry="29" fill="${c}"/>`,
  pudding: (c) => `<path d="M24 44 L76 44 L86 82 L14 82Z" fill="${c}" stroke="${c}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M18 42 Q50 28 82 42 Q82 52 74 50 Q70 60 62 50 Q50 54 40 50 Q30 60 26 50 Q18 52 18 42Z" fill="#8a4b24"/>`,
};

const EYES = '#2a2140';
const FACE = {
  happy: () => `<circle cx="38" cy="62" r="4" fill="${EYES}"/><circle cx="62" cy="62" r="4" fill="${EYES}"/><circle cx="39.2" cy="60.6" r="1.4" fill="#fff"/><circle cx="63.2" cy="60.6" r="1.4" fill="#fff"/><path d="M45 69 Q50 74 55 69" fill="none" stroke="${EYES}" stroke-width="2.4" stroke-linecap="round"/>`,
  cat: () => `<circle cx="38" cy="62" r="4" fill="${EYES}"/><circle cx="62" cy="62" r="4" fill="${EYES}"/><circle cx="39.2" cy="60.6" r="1.4" fill="#fff"/><circle cx="63.2" cy="60.6" r="1.4" fill="#fff"/><path d="M44 68 Q47 73 50 68 Q53 73 56 68" fill="none" stroke="${EYES}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  wow: () => `<circle cx="38" cy="61" r="5" fill="${EYES}"/><circle cx="62" cy="61" r="5" fill="${EYES}"/><circle cx="39.6" cy="59.2" r="1.8" fill="#fff"/><circle cx="63.6" cy="59.2" r="1.8" fill="#fff"/><ellipse cx="50" cy="71" rx="3" ry="3.6" fill="${EYES}"/>`,
  sleepy: () => `<path d="M33 62 Q38 57 43 62 M57 62 Q62 57 67 62" fill="none" stroke="${EYES}" stroke-width="2.6" stroke-linecap="round"/><path d="M45 69 Q50 74 55 69" fill="none" stroke="${EYES}" stroke-width="2.4" stroke-linecap="round"/>`,
};
const BLUSH = '<ellipse cx="29" cy="69" rx="5" ry="3" fill="#ff8fa3" opacity=".55"/><ellipse cx="71" cy="69" rx="5" ry="3" fill="#ff8fa3" opacity=".55"/>';

const star = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z" fill="#ffe27a"/>`;
const ACC = {
  none: () => '',
  sprout: () => '<path d="M50 4 Q48 -8 40 -10 Q42 0 50 4Z M50 4 Q54 -8 62 -8 Q60 2 50 4Z" fill="#59c98a"/>',
  bow: () => '<path d="M62 2 L74 -6 L74 10Z M62 2 L50 -6 L50 10Z" fill="#ff6fa0"/><circle cx="62" cy="2" r="3.4" fill="#ff3d82"/>',
  halo: () => '<ellipse cx="50" cy="-8" rx="15" ry="4.5" fill="none" stroke="#ffd45a" stroke-width="3"/>',
  crown: () => '<path d="M33 4 L35 -12 L43 -4 L50 -16 L57 -4 L65 -12 L67 4Z" fill="#ffc531" stroke="#e0a000" stroke-width="1.5" stroke-linejoin="round"/><circle cx="50" cy="-9" r="2" fill="#ff6fa0"/>',
};

export function squishy(card) {
  const { shape = 'mochi', color = 'cream', face = 'happy', acc = 'none', rarity = 'common' } = card;
  const fill = COLORS[color] || color;
  const top = TOP[shape] ?? 30;
  const legendary = rarity === 'legendary', epic = rarity === 'epic';
  const accessory = acc !== 'none' ? acc : legendary ? 'crown' : 'none';
  const glow = legendary ? '<circle cx="50" cy="55" r="46" fill="#ffc531" opacity=".22"/>' : '';
  const sparkles = (legendary || epic) ? star(12, 22, 1.3) + star(88, 30, 1) + star(80, 10, 1.1) : rarity === 'rare' ? star(86, 24, 1) : '';
  return `<svg class="squishy" viewBox="0 0 100 100" role="img" aria-label="Squishy" xmlns="http://www.w3.org/2000/svg">${glow}
    <ellipse cx="50" cy="88" rx="30" ry="5" fill="#00000030"/>
    <g class="sq-body">${BODY[shape](fill)}<ellipse cx="34" cy="46" rx="9" ry="4.5" fill="#fff" opacity=".35" transform="rotate(-20 34 46)"/>
    ${(FACE[face] || FACE.happy)()}${BLUSH}
    <g transform="translate(0 ${top - 30})">${(ACC[accessory] || ACC.none)()}</g></g>${sparkles}</svg>`;
}
