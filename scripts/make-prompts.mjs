// Erzeugt docs/HELDEN-PROMPTS.md aus js/data.js:  node scripts/make-prompts.mjs
import { CARDS } from '../js/data.js';
import { writeFileSync } from 'node:fs';

const SUIT = { rot: 'crimson red with gold accents', blau: 'electric blue with red accents', gold: 'gold with dark steel accents', gruen: 'emerald green with black accents', lila: 'violet with gold accents', schwarz: 'matte black with cyan glowing accents', orange: 'burnt orange with navy accents', tuerkis: 'teal with dark steel accents' };
const EMB = { bolt: 'a lightning bolt', star: 'a star', shield: 'a shield', flame: 'a flame', hex: 'a hexagon', ring: 'a glowing ring' };
const MASK = { full: 'a full helmet with narrow glowing white visor slits', cowl: 'a sleek hooded helmet with a swept-back crest and narrow glowing eyes (NO pointed bat-like ears), lower face visible, strong jaw', domino: 'an angular eye mask and short dark hair, lower face visible, strong jaw', visor: 'a helmet with a glowing visor band, lower face visible' };
const SKIN = { '#f7d9c0': 'light skin', '#f1c9a5': 'fair skin', '#d9a273': 'tan skin', '#a8704b': 'brown skin', '#7a4a30': 'dark brown skin' };
const RAR = { common: 'practical tactical suit', rare: 'upgraded suit with extra armor plates', epic: 'advanced armored suit with energy glow details', legendary: 'ornate legendary armor, golden aura, epic scale' };

const STYLE = 'Cinematic semi-realistic superhero portrait, upper body, centered, 4:5 portrait format. Painted concept-art look, dramatic rim lighting, dark moody background with a subtle gradient, detailed armored suit with realistic fabric and metal textures, confident heroic pose. No text, no logos, no watermark. Completely original character design – do not resemble any existing Marvel, DC or other franchise character.';

let md = `# Prompts für die Helden-Bilder\n\nWerkzeug: ChatGPT (Bilder), Midjourney, Adobe Firefly o. Ä. Für jeden Helden: **Stil-Block + Helden-Beschreibung** zusammen einfügen, Hochformat 4:5.\nSpeichern als \`assets/heroes/<id>.webp\` (ca. 800×1000 px, < 150 KB), dann ID in \`IMAGE_IDS\` (js/data.js) eintragen. Details: docs/HELDEN-BILDER.md\n\n## Stil-Block (immer mitgeben)\n\n> ${STYLE}\n\n## Helden\n`;
for (const c of CARDS) {
  md += `\n### ${c.name}  (\`${c.id}\`, ${c.subject}, ${c.rarity})\n> Superhero "${c.name}" – concept: ${c.text} Wearing a suit in ${SUIT[c.suit]}${c.cape ? ' with a flowing dark cape' : ', no cape'}, with ${EMB[c.emblem]} emblem on the chest, ${MASK[c.mask]}, ${SKIN[c.skin]}. ${RAR[c.rarity]}.\n`;
}
writeFileSync(new URL('../docs/HELDEN-PROMPTS.md', import.meta.url), md);
console.log('ok', CARDS.length);

// ---- Kompakte ChatGPT-Anleitung: docs/CHATGPT-PROMPTS.md ----
const MASTER = `Du bist mein Illustrator für eine Lern-App mit Superhelden-Sammelkarten (Zielgruppe: Jungen 8–10 Jahre). Der Look soll wie ein Kinofilm-Poster wirken: cool, filmisch, halbrealistisch – aber altersgerecht (keine Gewalt, kein Blut, keine Waffen, keine Totenköpfe).

Ich schicke dir gleich nacheinander Heldenbeschreibungen. Erzeuge für jede GENAU EIN Bild im immer gleichen Stil:
- Hochformat 4:5 (1024×1280)
- ${STYLE}
- Immer gleicher Bildausschnitt: Oberkörper, mittig, Kopf im oberen Drittel, etwas Rand rundherum
- Alle Helden müssen aus derselben Welt und im selben Malstil wirken (gleiche Beleuchtung, gleiche Detailtiefe)
- Es sind komplett eigene Figuren – sie dürfen keiner bekannten Film-/Comicfigur ähneln
Antworte jetzt nur mit „Bereit“.`;

const line = (c) => `${c.id}: Superhero "${c.name}" – ${SUIT[c.suit]} suit${c.cape ? ', flowing dark cape' : ', no cape'}, ${EMB[c.emblem]} emblem on the chest, ${MASK[c.mask]}, ${SKIN[c.skin]}. ${RAR[c.rarity]}.`;
const BOSSES = [
  ['boss-mathe', 'Professor Chaos-Null', 'a menacing but kid-friendly robotic mad-scientist villain with a glowing zero-shaped screen for a face, dark chrome body, floating numbers around him'],
  ['boss-deutsch', 'Der Fehlerteufel', 'a mischievous, kid-friendly red imp villain made of scribbled red-pen marks, small horns, smug grin, torn spelling-test pages swirling around him'],
  ['boss-englisch', 'Baron Babel', 'an elegant villain in a long dark coat and a tall hat made of stacked glowing letters, mysterious smile, floating speech bubbles in many languages'],
];

let c2 = `# ChatGPT-Anleitung für die Helden-Bilder

**Wichtig:** Alles in EINEM Chat machen, damit der Stil gleich bleibt. Reihenfolge: erst Schritt 1, dann die Helden einzeln (je ein Bild), dann die Bosse.
Wenn der Stil abdriftet: „Gleicher Stil und Bildausschnitt wie das erste Bild.“ Wenn ein Held einer Filmfigur ähnelt: „Mach ihn eigenständiger, weniger wie [Figur].“

Bilder speichern und **umbenennen in die ID** (Wort vor dem Doppelpunkt), z. B. \`zahlenblitz.png\`. Dann alle an Claude schicken – ich wandle sie in WebP um und baue sie ein.

## Schritt 1 – Master-Prompt (einmal am Anfang einfügen)

\`\`\`
${MASTER}
\`\`\`

## Schritt 2 – Helden (pro Nachricht eine Zeile einfügen; Reihenfolge = Wichtigkeit)

Zuerst die legendären und epischen (größte Wirkung), dann der Rest.

`;
for (const r of ['legendary', 'epic', 'rare', 'common']) {
  c2 += `### ${RARITY_LABEL(r)}\n\`\`\`\n${CARDS.filter((c) => c.rarity === r).map(line).join('\n\n')}\n\`\`\`\n\n`;
}
c2 += `## Schritt 3 – Bossgegner (optional, 3 Bilder, Querformat 4:3 oder Hochformat egal)\n\`\`\`\n${BOSSES.map(([id, n, d]) => `${id}: Villain "${n}" – ${d}. Same style as the heroes, dramatic lighting, kid-friendly.`).join('\n\n')}\n\`\`\`\n`;
writeFileSync(new URL('../docs/CHATGPT-PROMPTS.md', import.meta.url), c2);
function RARITY_LABEL(r) { return { legendary: 'Legendär (3)', epic: 'Episch (6)', rare: 'Selten (6)', common: 'Gewöhnlich (9)' }[r]; }
