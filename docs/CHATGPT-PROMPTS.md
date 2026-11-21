# ChatGPT-Anleitung für die Helden-Bilder

**Wichtig:** Alles in EINEM Chat machen, damit der Stil gleich bleibt. Reihenfolge: erst Schritt 1, dann die Helden einzeln (je ein Bild), dann die Bosse.
Wenn der Stil abdriftet: „Gleicher Stil und Bildausschnitt wie das erste Bild.“ Wenn ein Held einer Filmfigur ähnelt: „Mach ihn eigenständiger, weniger wie [Figur].“

Bilder speichern und **umbenennen in die ID** (Wort vor dem Doppelpunkt), z. B. `zahlenblitz.png`. Dann alle an Claude schicken – ich wandle sie in WebP um und baue sie ein.

## Schritt 1 – Master-Prompt (einmal am Anfang einfügen)

```
Du bist mein Illustrator für eine Lern-App mit Superhelden-Sammelkarten (Zielgruppe: Jungen 8–10 Jahre). Der Look soll wie ein Kinofilm-Poster wirken: cool, filmisch, halbrealistisch – aber altersgerecht (keine Gewalt, kein Blut, keine Waffen, keine Totenköpfe).

Ich schicke dir gleich nacheinander Heldenbeschreibungen. Erzeuge für jede GENAU EIN Bild im immer gleichen Stil:
- Hochformat 4:5 (1024×1280)
- Cinematic semi-realistic superhero portrait, upper body, centered, 4:5 portrait format. Painted concept-art look, dramatic rim lighting, dark moody background with a subtle gradient, detailed armored suit with realistic fabric and metal textures, confident heroic pose. No text, no logos, no watermark. Completely original character design – do not resemble any existing Marvel, DC or other franchise character.
- Immer gleicher Bildausschnitt: Oberkörper, mittig, Kopf im oberen Drittel, etwas Rand rundherum
- Alle Helden müssen aus derselben Welt und im selben Malstil wirken (gleiche Beleuchtung, gleiche Detailtiefe)
- Es sind komplett eigene Figuren – sie dürfen keiner bekannten Film-/Comicfigur ähneln
Antworte jetzt nur mit „Bereit“.
```

## Schritt 2 – Helden (pro Nachricht eine Zeile einfügen; Reihenfolge = Wichtigkeit)

Zuerst die legendären und epischen (größte Wirkung), dann der Rest.

### Legendär (3)
```
kapitaenquotient: Superhero "Kapitän Quotient" – crimson red with gold accents suit, flowing dark cape, a star emblem on the chest, a full helmet with narrow glowing white visor slits, fair skin. ornate legendary armor, golden aura, epic scale.

meisterfederkiel: Superhero "Meister Federkiel" – gold with dark steel accents suit, flowing dark cape, a shield emblem on the chest, a full helmet with narrow glowing white visor slits, tan skin. ornate legendary armor, golden aura, epic scale.

agentbabel: Superhero "Agent Babel" – violet with gold accents suit, flowing dark cape, a star emblem on the chest, a full helmet with narrow glowing white visor slits, fair skin. ornate legendary armor, golden aura, epic scale.
```

### Episch (6)
```
quadrattitan: Superhero "Quadrat-Titan" – gold with dark steel accents suit, flowing dark cape, a hexagon emblem on the chest, a full helmet with narrow glowing white visor slits, fair skin. advanced armored suit with energy glow details.

nullpunkt: Superhero "Nullpunkt" – teal with dark steel accents suit, flowing dark cape, a glowing ring emblem on the chest, a sleek hooded helmet with a swept-back crest and narrow glowing eyes (NO pointed bat-like ears), lower face visible, strong jaw, tan skin. advanced armored suit with energy glow details.

grammatiktitan: Superhero "Grammatik-Titan" – violet with gold accents suit, flowing dark cape, a hexagon emblem on the chest, a full helmet with narrow glowing white visor slits, fair skin. advanced armored suit with energy glow details.

maerchenmeister: Superhero "Märchenmeister" – gold with dark steel accents suit, flowing dark cape, a flame emblem on the chest, a sleek hooded helmet with a swept-back crest and narrow glowing eyes (NO pointed bat-like ears), lower face visible, strong jaw, brown skin. advanced armored suit with energy glow details.

lingolord: Superhero "Lingo-Lord" – matte black with cyan glowing accents suit, flowing dark cape, a hexagon emblem on the chest, a sleek hooded helmet with a swept-back crest and narrow glowing eyes (NO pointed bat-like ears), lower face visible, strong jaw, fair skin. advanced armored suit with energy glow details.

globeglider: Superhero "Globe-Glider" – teal with dark steel accents suit, flowing dark cape, a glowing ring emblem on the chest, a helmet with a glowing visor band, lower face visible, tan skin. advanced armored suit with energy glow details.
```

### Selten (6)
```
rechenfalke: Superhero "Rechenfalke" – crimson red with gold accents suit, flowing dark cape, a shield emblem on the chest, a full helmet with narrow glowing white visor slits, tan skin. upgraded suit with extra armor plates.

multimax: Superhero "Multi-Max" – burnt orange with navy accents suit, flowing dark cape, a hexagon emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, dark brown skin. upgraded suit with extra armor plates.

reimreiter: Superhero "Reimreiter" – burnt orange with navy accents suit, flowing dark cape, a flame emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, tan skin. upgraded suit with extra armor plates.

tintenfalke: Superhero "Tintenfalke" – electric blue with red accents suit, flowing dark cape, a star emblem on the chest, a full helmet with narrow glowing white visor slits, dark brown skin. upgraded suit with extra armor plates.

grammarguard: Superhero "Grammar-Guard" – violet with gold accents suit, flowing dark cape, a shield emblem on the chest, a full helmet with narrow glowing white visor slits, fair skin. upgraded suit with extra armor plates.

speakspark: Superhero "Speak-Spark" – burnt orange with navy accents suit, flowing dark cape, a lightning bolt emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, brown skin. upgraded suit with extra armor plates.
```

### Gewöhnlich (9)
```
zahlenblitz: Superhero "Zahlenblitz" – electric blue with red accents suit, flowing dark cape, a lightning bolt emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, fair skin. practical tactical suit.

minusninja: Superhero "Minus-Ninja" – matte black with cyan glowing accents suit, no cape, a star emblem on the chest, a sleek hooded helmet with a swept-back crest and narrow glowing eyes (NO pointed bat-like ears), lower face visible, strong jaw, brown skin. practical tactical suit.

plusphantom: Superhero "Plus-Phantom" – violet with gold accents suit, flowing dark cape, a glowing ring emblem on the chest, a helmet with a glowing visor band, lower face visible, light skin. practical tactical suit.

silbensturm: Superhero "Silben-Sturm" – teal with dark steel accents suit, flowing dark cape, a lightning bolt emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, light skin. practical tactical suit.

wortwaechter: Superhero "Wortwächter" – emerald green with black accents suit, flowing dark cape, a shield emblem on the chest, a sleek hooded helmet with a swept-back crest and narrow glowing eyes (NO pointed bat-like ears), lower face visible, strong jaw, brown skin. practical tactical suit.

satzschatten: Superhero "Satz-Schatten" – matte black with cyan glowing accents suit, no cape, a glowing ring emblem on the chest, a helmet with a glowing visor band, lower face visible, fair skin. practical tactical suit.

hellohawk: Superhero "Hello-Hawk" – electric blue with red accents suit, flowing dark cape, a lightning bolt emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, light skin. practical tactical suit.

wordwarrior: Superhero "Word-Warrior" – crimson red with gold accents suit, no cape, a flame emblem on the chest, a sleek hooded helmet with a swept-back crest and narrow glowing eyes (NO pointed bat-like ears), lower face visible, strong jaw, tan skin. practical tactical suit.

captainvocab: Superhero "Captain Vocab" – emerald green with black accents suit, flowing dark cape, a star emblem on the chest, a helmet with a glowing visor band, lower face visible, dark brown skin. practical tactical suit.
```

## Schritt 3 – Bossgegner (optional, 3 Bilder, Querformat 4:3 oder Hochformat egal)
```
boss-mathe: Villain "Professor Chaos-Null" – a menacing but kid-friendly robotic mad-scientist villain with a glowing zero-shaped screen for a face, dark chrome body, floating numbers around him. Same style as the heroes, dramatic lighting, kid-friendly.

boss-deutsch: Villain "Der Fehlerteufel" – a mischievous, kid-friendly red imp villain made of scribbled red-pen marks, small horns, smug grin, torn spelling-test pages swirling around him. Same style as the heroes, dramatic lighting, kid-friendly.

boss-englisch: Villain "Baron Babel" – an elegant villain in a long dark coat and a tall hat made of stacked glowing letters, mysterious smile, floating speech bubbles in many languages. Same style as the heroes, dramatic lighting, kid-friendly.
```
