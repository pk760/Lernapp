# Design: Hero Academy

Zielgruppe: Junge, fast 9, mag Marvel-Filme/Superhelden, nutzt ChatGPT per Sprache und hört viel Spotify. Soll „cool“ wirken, nicht kindlich.

- **Look:** dunkler Film-Look (Nachtblau, Rot/Gold), Comic-Halbton-Punkte, kantige Hex-Knoten, kursive Großbuchstaben-Überschriften.
- **Eigener Held:** Beim Start erschafft das Kind seinen Helden (Name, Anzug, Symbol, Hautton). Er steht oben auf dem Lernpfad und wächst mit dem Rang (Rekrut → Agent → Held → Elite → Legende).
- **Missionen** statt Lektionen; jede Mission hat einen Gegner mit Lebensleiste, die bei jeder richtigen Antwort sinkt.
- **Boss-Mission** = Klassenarbeits-Vorbereitung. Je Fach ein Boss (Professor Chaos-Null, Der Fehlerteufel, Baron Babel). Sieg ⇒ legendärer Held.
- **Helden-Archiv:** 24 Sammel-Helden (eigene Figuren, SVG aus `js/hero.js`), Seltenheit gewöhnlich/selten/episch/legendär (Foil-Glanz bei episch/legendär). Ein gesammelter Held kann als **Sidekick** gewählt werden.
- **Vorlesen** (🔊, Web Speech API): Frage wird vorgelesen – passt zu seiner Sprach-Gewohnheit.
- **Mission-Soundtrack:** Eltern hinterlegen in den Einstellungen einen Spotify-Link; der Knopf öffnet Spotify (kein Streaming in der App).
- Keine Marvel-/DC-Figuren, -Namen oder -Logos. Alles Eigenentwicklung.

## Ideen
Heldenkraft je Fach (Mathe-Power, Sprach-Power als Werte am eigenen Helden), Kostüm-Upgrades für FP, Wochen-Event („Boss der Woche“), Duell-Modus gegen Papa/Freund auf einem Gerät, KI-Sidekick (siehe Roadmap), Sprach-Antworten.

## Design v2 (cinematic)
Kantige Panels mit gekappten Ecken (clip-path), Hairline in Gold, Energie-Cyan als zweite Akzentfarbe (passt zu ECHO und den Heldenbildern), Überschriften in Condensed-Systemschrift (Avenir Next Condensed / DIN Condensed auf iPad), Antworten mit Hex-Buchstaben A–D, Lernpfad mit Energieleitung. Effekte: Blitz + Funken beim Treffer, Schockwelle + Beben beim Crit, Glitch bei Fehler, Glanz-Sweep auf Buttons/Karten, Konfetti bei Sieg. Alles nur CSS/SVG, `prefers-reduced-motion` schaltet Effekte ab.
