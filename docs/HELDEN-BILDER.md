# Echte Helden-Bilder einbauen

Die Helden in der App sind aktuell **SVG-Zeichnungen** (`js/hero.js`) – dramatisch, aber nicht fotorealistisch. Für den „echten Film-Look“ braucht es KI-/Illustrations-Bilder.

## Ablauf (pro Held ca. 2 Minuten)
1. Prompt aus `docs/HELDEN-PROMPTS.md` nehmen (Stil-Block + Helden-Zeile), z. B. in ChatGPT (Bilder) einfügen. Hochformat 4:5.
2. Bild als **WebP** (ca. 800×1000 px, < 150 KB) speichern: `assets/heroes/<id>.webp` (ID steht im Prompt-Dokument).
3. ID in `IMAGE_IDS` in `js/data.js` eintragen, in `sw.js` die Datei zu `SHELL` hinzufügen und `VERSION` erhöhen.
4. Commit & Push → GitHub Pages veröffentlicht.
Tipp: Erst die 3 legendären + 5 epischen erzeugen – die Wirkung ist dort am größten. Karten ohne Bild bleiben SVG.

## Hinweise
- Die Prompts verlangen ausdrücklich **eigene** Figuren; Ergebnisse prüfen: sieht einer zu sehr nach einer bekannten Filmfigur aus → neu erzeugen.
- Nutzungsbedingungen des Bild-Tools für die eigene Nutzung prüfen (privat/öffentlich).
- Der **eigene Held** des Kindes bleibt SVG (Farbwahl). Option für später: ein paar fertige Held-Portraits zur Auswahl.
- Prompts neu erzeugen nach Änderungen an den Karten: `node scripts/make-prompts.mjs`.

## Stand
Alle 24 Helden und 3 Bosse (`assets/bosses/boss-<fach>.webp`) sind eingebaut. Neue/ersetzte Bilder: WebP (ca. 600×750) nach `assets/heroes/` legen, bei neuen IDs `IMAGE_IDS` und `sw.js` ergänzen, `VERSION` in sw.js erhöhen.
