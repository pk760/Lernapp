# ChatGPT-Anleitung für die Helden-Bilder

> **Vor der Veröffentlichung neu erzeugen (Ähnlichkeit zu bekannten Figuren): `nullpunkt`, `lingolord`, `tintenfalke`.** Ihre Zeilen unten sind bereits neu geschrieben (anderer Anzug, andere Kopfform, andere Farben). Danach Datei ersetzen und sw.js VERSION erhöhen.

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

nullpunkt: Superhero "Nullpunkt" – a calm, precise mathematician-hero. Brushed WHITE-SILVER armor with glowing teal energy lines (NOT black, NOT dark), a large glowing teal ring-shaped emblem on the chest (a stylised zero), smooth rounded helmet dome in white with one wide curved teal visor, absolutely no ears, horns, cowl or hood, no cape. Asymmetric armor: one large rounded shoulder plate, the other shoulder bare with a teal wristband. Tan skin, lower face visible, clean-shaven, friendly confident half-smile. Advanced armored suit with energy glow details.

grammatiktitan: Superhero "Grammatik-Titan" – violet with gold accents suit, flowing dark cape, a hexagon emblem on the chest, a full helmet with narrow glowing white visor slits, fair skin. advanced armored suit with energy glow details.

maerchenmeister: Superhero "Märchenmeister" – gold with dark steel accents suit, flowing dark cape, a flame emblem on the chest, a smooth, fully ROUND helmet dome with a wide glowing visor band across the eyes (absolutely NO pointed ears, horns or bat-like shapes, no cowl or hood), lower face visible, strong jaw, brown skin. advanced armored suit with energy glow details.

lingolord: Superhero "Lingo-Lord" – a noble, worldly language-master. Deep ROYAL NAVY-BLUE and gold ornate armor like a modern knight-diplomat, high stand-up collar, gold epaulettes with small globe motifs, a hexagon emblem of interlocking gold letters on the chest, NO mask and NO helmet: bare head with short styled light-brown hair and a thin golden circlet, short neat beard, warm intelligent eyes with a faint golden glow, short navy cape with gold trim. Fair skin. Epic armor, soft golden light, dark background.

globeglider: Superhero "Globe-Glider" – teal with dark steel accents suit, flowing dark cape, a glowing ring emblem on the chest, a helmet with a glowing visor band, lower face visible, tan skin. advanced armored suit with energy glow details.
```

### Selten (6)
```
rechenfalke: Superhero "Rechenfalke" – crimson red with gold accents suit, flowing dark cape, a shield emblem on the chest, a full helmet with narrow glowing white visor slits, tan skin. upgraded suit with extra armor plates.

multimax: Superhero "Multi-Max" – burnt orange with navy accents suit, flowing dark cape, a hexagon emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, dark brown skin. upgraded suit with extra armor plates.

reimreiter: Superhero "Reimreiter" – burnt orange with navy accents suit, flowing dark cape, a flame emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, tan skin. upgraded suit with extra armor plates.

tintenfalke: Superhero "Tintenfalke" – a fast, stylish writer-hero with a falcon theme. INDIGO and INK-BLACK suit with silver ink-splash patterns and bronze trim (NO red, NO white stripes, NO star, NO round shield), a golden quill-feather emblem on the chest, feather-shaped layered shoulder pauldrons, a sleek helmet with a swept-back feather crest and a curved falcon-beak-style nose guard, glowing amber eyes, wings-like short cape. Dark brown skin, lower face visible. Upgraded suit with extra armor plates.

grammarguard: Superhero "Grammar-Guard" – violet with gold accents suit, flowing dark cape, a shield emblem on the chest, a full helmet with narrow glowing white visor slits, fair skin. upgraded suit with extra armor plates.

speakspark: Superhero "Speak-Spark" – burnt orange with navy accents suit, flowing dark cape, a lightning bolt emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, brown skin. upgraded suit with extra armor plates.
```

### Gewöhnlich (9)
```
zahlenblitz: Superhero "Zahlenblitz" – electric blue with red accents suit, flowing dark cape, a lightning bolt emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, fair skin. practical tactical suit.

minusninja: Superhero "Minus-Ninja" – matte black with cyan glowing accents suit, no cape, a star emblem on the chest, a smooth, fully ROUND helmet dome with a wide glowing visor band across the eyes (absolutely NO pointed ears, horns or bat-like shapes, no cowl or hood), lower face visible, strong jaw, brown skin. practical tactical suit.

plusphantom: Superhero "Plus-Phantom" – violet with gold accents suit, flowing dark cape, a glowing ring emblem on the chest, a helmet with a glowing visor band, lower face visible, light skin. practical tactical suit.

silbensturm: Superhero "Silben-Sturm" – teal with dark steel accents suit, flowing dark cape, a lightning bolt emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, light skin. practical tactical suit.

wortwaechter: Superhero "Wortwächter" – emerald green with black accents suit, flowing dark cape, a shield emblem on the chest, a smooth, fully ROUND helmet dome with a wide glowing visor band across the eyes (absolutely NO pointed ears, horns or bat-like shapes, no cowl or hood), lower face visible, strong jaw, brown skin. practical tactical suit.

satzschatten: Superhero "Satz-Schatten" – matte black with cyan glowing accents suit, no cape, a glowing ring emblem on the chest, a helmet with a glowing visor band, lower face visible, fair skin. practical tactical suit.

hellohawk: Superhero "Hello-Hawk" – electric blue with red accents suit, flowing dark cape, a lightning bolt emblem on the chest, an angular eye mask and short dark hair, lower face visible, strong jaw, light skin. practical tactical suit.

wordwarrior: Superhero "Word-Warrior" – crimson red with gold accents suit, no cape, a flame emblem on the chest, a smooth, fully ROUND helmet dome with a wide glowing visor band across the eyes (absolutely NO pointed ears, horns or bat-like shapes, no cowl or hood), lower face visible, strong jaw, tan skin. practical tactical suit.

captainvocab: Superhero "Captain Vocab" – emerald green with black accents suit, flowing dark cape, a star emblem on the chest, a helmet with a glowing visor band, lower face visible, dark brown skin. practical tactical suit.
```

## Schritt 3 – Bossgegner (optional, 3 Bilder, Querformat 4:3 oder Hochformat egal)
```
boss-mathe: Villain "Professor Chaos-Null" – a menacing but kid-friendly robotic mad-scientist villain with a glowing zero-shaped screen for a face, dark chrome body, floating numbers around him. Same style as the heroes, dramatic lighting, kid-friendly.

boss-deutsch: Villain "Der Fehlerteufel" – a mischievous, kid-friendly red imp villain made of scribbled red-pen marks, small horns, smug grin, torn spelling-test pages swirling around him. Same style as the heroes, dramatic lighting, kid-friendly.

boss-englisch: Villain "Baron Babel" – an elegant villain in a long dark coat and a tall hat made of stacked glowing letters, mysterious smile, floating speech bubbles in many languages. Same style as the heroes, dramatic lighting, kid-friendly.
```
