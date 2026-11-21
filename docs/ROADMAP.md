# Roadmap

## Phase 0 – Prototyp ✅ (dieses Repo)
PWA-Gerüst, 3 Themes, Lernpfad je Fach/Klasse, Lektionen (Mathe generiert, Deutsch/Englisch je 6 Fragen/Klasse),
Karten-Packs, Sammlung, Ligen, Klassenarbeits-Projekte inkl. Boss, lokale Profile, Offline-Cache, Pages-Deploy.

## Phase 1 – Spielgefühl & Design (nächste Aufgabe)
- [x] Design: Hero Academy (Superhelden-Look) statt Kosmos/Squishys, siehe docs/DESIGN.md
- [x] 24 Helden, eigener Held mit Rang, Sidekick, Boss-Missionen mit Lebensleiste, Vorlesen, Spotify-Link
- [x] Realistische Helden-Bilder: alle 24 Helden + 3 Bosse als WebP eingebaut (1024×1280, aus ChatGPT-Collagen hochskaliert; für Druck/Detail einzeln neu generieren)
- [~] **Rechtlich:** Fledermaus-Ohren bei minusninja, wortwaechter, wordwarrior per Bildbearbeitung entfernt (runde Helme). Noch prüfen/ersetzen vor Veröffentlichung: nullpunkt und lingolord (Kopfform/Maske weiter sehr Batman-nah, siehe docs/HELDEN-PROMPTS.md), tintenfalke (blau/rot/Stern ≈ Captain America)
- [ ] Helden ausbauen: 40+, Kostüm-Upgrades, Heldenkraft je Fach als Werte, Foil/Animation beim Öffnen der Kiste, Sound-Effekte
- [ ] KI-Sidekick (optional): Erklärungen/Tipps per Sprache. Braucht API → Kosten & Datenschutz (Kind!) vorher klären; erst Eltern-Entscheidung
- [x] Story-Kampagne (js/story.js), Kampf-Arena, Combo/Superkraft/Blitz-Aufgabe, ECHO-Notruf, Sounds (abschaltbar), Brief-Mission, Heldenfoto lokal
- [x] Figuren animiert (Atmen, Aura, Treffer-/Crit-Reaktionen, 3D-Tilt der Karten); Konfetti beim Sieg ✅
- [x] Kisten-Show (Strahlen, Schockwelle, Seltenheits-Banner, Karten-Flip), Comic-Einblendungen (BAM!), Story-Vorlesen verfeinern, Kapitel-Illustrationen
- [x] Zahleneingabe per Ziffernblock (Mathe, ca. 50 % der Aufgaben)
- [ ] Weitere Antwort-Typen: Buchstaben legen, Zuordnen, Uhrzeit stellen (Zifferblatt-Aufgabe mit Auswahl ✅, Lückentext als Auswahl vorhanden)
- [ ] iPad-Feinschliff: Querformat-Layout, Safe Areas, Splash-Screens

## Phase 2 – Inhalte
- [ ] Fragenbank mit Themen-Tags (z. B. „Einmaleins“, „Wortarten“) statt nur Klasse
- [ ] Klassenarbeits-Modus nach Thema: Projekt wählt Themen, Training zieht gezielt daraus, Fehler-Wiederholung
- [ ] Lehrplan-Abgleich mit NRW-Lehrplan Grundschule (Kompetenzerwartungen je Klasse als Themenliste ableiten; Lehrwerke der Schule erfragen)
- [x] Mathe Kl. 3: Punkt vor Strich, Sachaufgaben, Geld, Rest-Division (Kl. 1/2/4 noch dünn)
- [ ] Mathe: Geometrie, Uhrzeit, schriftliches Rechnen (Kl. 3/4); Deutsch: Diktat-Wörter, Lesetexte; Englisch: Vokabeln mit Bildern
- [ ] Wissens-Review durch Eltern/Lehrkraft (Korrektheit!)

## Phase 3 – Komfort
- [x] Export/Import des Fortschritts als Datei (Einstellungen → Sicherung)
- [ ] Elternbereich (PIN): Fortschritt je Fach, Schwächen, Klassenarbeiten verwalten
- [ ] Optionale Online-Rangliste/Freunde (nur wenn nötig; braucht Backend → Kosten/Datenschutz vorher klären)

## Offene Fragen an den Auftraggeber
1. ✅ Design: Kosmos
2. ✅ Bundesland: NRW, Grundschule Füchtorf (48336). Noch offen: Englisch ab welcher Klasse, Schrift, Lehrwerke der Schule
3. Nur ein Kind/Gerät oder mehrere Profile (aktuell mehrere lokal möglich)?
4. Wie soll das Repo heißen / soll es öffentlich oder privat sein (Pages privat braucht bezahlten Plan)?

5. ✅ Repo: pk760/Lernapp (öffentlich). Pages: Source auf „GitHub Actions“ stellen, App-URL https://pk760.github.io/Lernapp/
6. Offen: Schulstoff Klasse 3 aktuell (Mathe/Deutsch/Englisch) mit dem Kind/der Lehrkraft abgleichen; Brief-Mission prüft nur Aufbau, nicht Rechtschreibung; Backup/Export des Fortschritts (Safari kann Website-Daten löschen!).
