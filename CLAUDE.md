# Lernhelden – Projektkontext für Claude Code

## Ziel
Installierbare Web-App (PWA, iPad zuerst) mit Lernhilfen für Grundschüler **Klasse 1–4**: **Mathe, Deutsch, Englisch**.
Duolingo-artiger Lernpfad, Belohnung über **Sammelkarten** (statt Sterne/Punkte), Ranking über **Ligen**, und ein
**Klassenarbeits-Modus** (Arbeit mit Datum anlegen → gezielt üben → „Prüfungs-Boss“ → legendäre Karte).
Zielgruppe: ca. 8 Jahre. Look: kindlich, motivierend, **nicht zu bunt, nicht albern**.

## Kontext
Bundesland **NRW**, Grundschule in Füchtorf (PLZ 48336). Inhalte sollen sich am NRW-Lehrplan Grundschule orientieren.
Offen/zu prüfen (nicht raten, recherchieren oder Auftraggeber fragen): ab welcher Klasse Englisch an der Schule unterrichtet wird,
verwendete Schrift (Grundschrift/Schulausgangsschrift) und Lehrwerke der Schule.

## Harte Randbedingungen (Entscheidungen des Auftraggebers)
- **Komplett kostenlos**: kein Server, keine Datenbank, keine Accounts. Hosting = GitHub Pages. Daten = `localStorage` auf dem Gerät.
- **Kein Build-Schritt**: Vanilla JS (ES-Module), CSS, keine Frameworks, keine externen CDNs/Fonts (muss offline laufen).
- **Deutsche UI-Texte** (Kind-gerecht, du-Form, kurze Sätze).
- **Datenschutz**: Kinder-App → keine Tracker, keine Analytics, keine externen Requests, keine Klarnamen-Pflicht (Vorname/Spitzname reicht).
- **Keine geschützten Figuren** (kein Pokémon o. Ä.). Alle Wesen/Karten sind eigene Erfindungen; aktuell Emoji-Platzhalter.
- Repo-Name/Pages-Pfad: relative URLs verwenden (`./`), da Pages unter `/<repo>/` läuft.

## Architektur
```
index.html            App-Shell, Meta für iPad-Installation (Zum Home-Bildschirm)
manifest.webmanifest  PWA-Manifest
sw.js                 Service Worker (cache-first App-Shell). Bei Dateiänderung VERSION erhöhen!
css/app.css           3 Themes über CSS-Variablen: cosmos | wald | arena (html[data-theme])
js/data.js            Reine Logik/Inhalte: Fächer, Karten, Ligen, Fragen (statisch + Mathe-Generator), rollCard()
js/store.js           localStorage, Profile, Datums-Helfer
js/app.js             UI: Rendering per Template-Strings, Event-Delegation (data-a / data-f), Lektionen-Ablauf
tests/*.test.mjs      Node-Tests für data.js (npm test)
.github/workflows     Tests + Deploy nach GitHub Pages bei Push auf main
docs/                 ROADMAP.md, DESIGN.md (3 Designvorschläge), CONTENT.md (Fragen schreiben)
```
Spielregeln (aktuell in `js/app.js` → `finishLesson`): Lektion = 5 Fragen; falsche Fragen kommen am Ende nochmal;
≥60 % sofort richtig ⇒ Lernpfad-Knoten + Karten-Pack; perfekt ⇒ mind. „selten“. Klassenarbeits-Einheit: +10 FP; Boss
(ab 3 Einheiten, 10 Fragen, ≥80 %) ⇒ +40 FP und legendäre Fach-Karte.

## Befehle
- Lokal starten: `npm start` → http://localhost:8080 (Service Worker braucht http(s), nicht file://)
- Tests: `npm test`
- Theme testen: `?theme=wald` an die URL hängen
- iPad: Safari → Teilen → „Zum Home-Bildschirm“

## Konventionen
- Neue Fragen nur im Format `Q(frage, richtigeAntwort, [3 falsche], tipp?)` in `js/data.js`; Test `npm test` muss grün bleiben.
- Nutzer-/Kindereingaben immer mit `esc()` ausgeben (kein ungeprüftes innerHTML).
- Touch-Ziele ≥ 56 px, Animationen respektieren `prefers-reduced-motion`.
- Kleine, thematische Commits; Datenmodell-Änderungen in `store.js` mit Migration (`v` hochzählen).

## Nächste Schritte
Siehe `docs/ROADMAP.md`. Als Erstes: **Design wählen** (`docs/DESIGN.md`, Themes live per Zahnrad-Menü), dann Phase 1.
