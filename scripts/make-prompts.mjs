// Erzeugt docs/HELDEN-PROMPTS.md aus js/data.js:  node scripts/make-prompts.mjs
import { CARDS } from '../js/data.js';
import { writeFileSync } from 'node:fs';

const SUIT = { rot: 'crimson red with gold accents', blau: 'electric blue with red accents', gold: 'gold with dark steel accents', gruen: 'emerald green with black accents', lila: 'violet with gold accents', schwarz: 'matte black with cyan glowing accents', orange: 'burnt orange with navy accents', tuerkis: 'teal with dark steel accents' };
const EMB = { bolt: 'a lightning bolt', star: 'a star', shield: 'a shield', flame: 'a flame', hex: 'a hexagon', ring: 'a glowing ring' };
const MASK = { full: 'a full helmet with narrow glowing white visor slits', cowl: 'a cowl with pointed ears and narrow glowing eyes, lower face visible, strong jaw', domino: 'an angular eye mask and short dark hair, lower face visible, strong jaw', visor: 'a helmet with a glowing visor band, lower face visible' };
const SKIN = { '#f7d9c0': 'light skin', '#f1c9a5': 'fair skin', '#d9a273': 'tan skin', '#a8704b': 'brown skin', '#7a4a30': 'dark brown skin' };
const RAR = { common: 'practical tactical suit', rare: 'upgraded suit with extra armor plates', epic: 'advanced armored suit with energy glow details', legendary: 'ornate legendary armor, golden aura, epic scale' };

const STYLE = 'Cinematic semi-realistic superhero portrait, upper body, centered, 4:5 portrait format. Painted concept-art look, dramatic rim lighting, dark moody background with a subtle gradient, detailed armored suit with realistic fabric and metal textures, confident heroic pose. No text, no logos, no watermark. Completely original character design – do not resemble any existing Marvel, DC or other franchise character.';

let md = `# Prompts für die Helden-Bilder\n\nWerkzeug: ChatGPT (Bilder), Midjourney, Adobe Firefly o. Ä. Für jeden Helden: **Stil-Block + Helden-Beschreibung** zusammen einfügen, Hochformat 4:5.\nSpeichern als \`assets/heroes/<id>.webp\` (ca. 800×1000 px, < 150 KB), dann ID in \`IMAGE_IDS\` (js/data.js) eintragen. Details: docs/HELDEN-BILDER.md\n\n## Stil-Block (immer mitgeben)\n\n> ${STYLE}\n\n## Helden\n`;
for (const c of CARDS) {
  md += `\n### ${c.name}  (\`${c.id}\`, ${c.subject}, ${c.rarity})\n> Superhero "${c.name}" – concept: ${c.text} Wearing a suit in ${SUIT[c.suit]}${c.cape ? ' with a flowing dark cape' : ', no cape'}, with ${EMB[c.emblem]} emblem on the chest, ${MASK[c.mask]}, ${SKIN[c.skin]}. ${RAR[c.rarity]}.\n`;
}
writeFileSync(new URL('../docs/HELDEN-PROMPTS.md', import.meta.url), md);
console.log('ok', CARDS.length);
