# Lernhelden – Projektkontext für Claude Code

## Ziel
Installierbare Web-App (PWA, iPad zuerst) mit Lernhilfen für Grundschüler **Klasse 1–4**: **Mathe, Deutsch, Englisch**.
Duolingo-artiger Lernpfad („Missionen“), Belohnung über **Superhelden-Sammelkarten** (statt Sterne/Punkte), eigener Held des Kindes, Boss-Missionen für Klassenarbeiten, Ranking über **Ligen**, und ein
**Klassenarbeits-Modus** (Arbeit mit Datum anlegen → gezielt üben → „Prüfungs-Boss“ → legendäre Karte).
Zielgruppe: Junge, fast 9, mag Marvel-Filme/Superhelden, Spotify, ChatGPT per Sprache. Look: **cool, filmisch, nicht kindlich** (siehe docs/DESIGN.md).

## Kontext
Bundesland **NRW**, Grundschule in Füchtorf (PLZ 48336). Inhalte sollen sich am NRW-Lehrplan Grundschule orientieren.
Offen/zu prüfen (nicht raten, recherchieren oder Auftraggeber fragen): ab welcher Klasse Englisch an der Schule unterrichtet wird,
verwendete Schrift (Grundschrift/Schulausgangsschrift) und Lehrwerke der Schule.

## Harte Randbedingungen (Entscheidungen des Auftraggebers)
- **Komplett kostenlos**: kein Server, keine Datenbank, keine Accounts. Hosting = GitHub Pages. Daten = `localStorage` auf dem Gerät.
- **Kein Build-Schritt**: Vanilla JS (ES-Module), CSS, keine Frameworks, keine externen CDNs/Fonts (muss offline laufen).
- **Deutsche UI-Texte** (Kind-gerecht, du-Form, kurze Sätze).
- **Datenschutz**: Kinder-App → keine Tracker, keine Analytics, keine externen Requests, keine Klarnamen-Pflicht (Vorname/Spitzname reicht).
- **Keine geschützten Figuren** (keine Marvel/DC/Pokémon-Namen, -Figuren oder -Logos). Alle Helden sind Eigenentwicklungen, prozedural als SVG (`js/hero.js`: Anzug × Symbol × Maske × Cape × Hautton).
- **Design: Hero Academy** (dunkel, Rot/Gold). Frühere Entwürfe (Kosmos/Squishys, Waldlichtung, Arena) nur in der Git-Historie.
- Repo-Name/Pages-Pfad: relative URLs verwenden (`./`), da Pages unter `/<repo>/` läuft.

## Architektur
```
index.html            App-Shell, Meta für iPad-Installation (Zum Home-Bildschirm)
manifest.webmanifest  PWA-Manifest
sw.js                 Service Worker (cache-first App-Shell). Bei Dateiänderung VERSION erhöhen!
css/app.css           Design „Hero Academy“ über CSS-Variablen
js/data.js            Reine Logik/Inhalte: Fächer, Karten, Ligen, Fragen (statisch + Mathe-Generator), rollCard()
js/hero.js            SVG-Generator für Helden (eigener Held + Fallback für Karten); echte Bilder: assets/heroes/<id>.webp via IMAGE_IDS in data.js
scripts/make-prompts.mjs  erzeugt docs/HELDEN-PROMPTS.md (Bild-Prompts je Held)
js/store.js           localStorage, Profile, Datums-Helfer
js/app.js             UI: Rendering per Template-Strings, Event-Delegation (data-a / data-f), Lektionen-Ablauf
tests/*.test.mjs      Node-Tests für data.js (npm test)
.github/workflows     Tests + Deploy nach GitHub Pages bei Push auf main
docs/                 ROADMAP.md, DESIGN.md (3 Designvorschläge), CONTENT.md (Fragen schreiben)
```
Aufgabenformat: Mehrfachauswahl; Mathe zusätzlich Zahleneingabe (`q.num`, Ziffernblock + Tastatur). Eigener Held: `profile.hero`; Sidekick: `profile.sidekick` (Karten-ID); Spotify-Link: `state.spotify`; Vorlesen via Web Speech API.
Spielregeln (aktuell in `js/app.js` → `finishLesson`): Lektion = 5 Fragen; falsche Fragen kommen am Ende nochmal;
≥60 % sofort richtig ⇒ Lernpfad-Knoten + Karten-Pack; perfekt ⇒ mind. „selten“. Klassenarbeits-Einheit: +10 FP; Boss
(ab 3 Einheiten, 10 Fragen, ≥80 %) ⇒ +40 FP und legendäre Fach-Karte.

## Befehle
- Lokal starten: `npm start` → http://localhost:8080 (Service Worker braucht http(s), nicht file://)
- Tests: `npm test`
- iPad: Safari → Teilen → „Zum Home-Bildschirm“

## Konventionen
- Neue Fragen nur im Format `Q(frage, richtigeAntwort, [3 falsche], tipp?)` in `js/data.js`; Test `npm test` muss grün bleiben.
- Nutzer-/Kindereingaben immer mit `esc()` ausgeben (kein ungeprüftes innerHTML).
- Touch-Ziele ≥ 56 px, Animationen respektieren `prefers-reduced-motion`.
- Kleine, thematische Commits; Datenmodell-Änderungen in `store.js` mit Migration (`v` hochzählen).

## Nächste Schritte
Siehe `docs/ROADMAP.md`, Phase 1 (Helden-Ausbau, weitere Aufgabentypen, iPad-Test).
