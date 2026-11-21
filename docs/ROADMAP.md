# Roadmap

## Phase 0 – Prototyp ✅ (dieses Repo)
PWA-Gerüst, 3 Themes, Lernpfad je Fach/Klasse, Lektionen (Mathe generiert, Deutsch/Englisch je 6 Fragen/Klasse),
Karten-Packs, Sammlung, Ligen, Klassenarbeits-Projekte inkl. Boss, lokale Profile, Offline-Cache, Pages-Deploy.

## Phase 1 – Spielgefühl & Design (nächste Aufgabe)
- [x] Design: Hero Academy (Superhelden-Look) statt Kosmos/Squishys, siehe docs/DESIGN.md
- [x] 24 Helden, eigener Held mit Rang, Sidekick, Boss-Missionen mit Lebensleiste, Vorlesen, Spotify-Link
- [ ] **Realistische Helden-Bilder** (Prio, Wunsch des Kindes: „realistisch cool“): Prompts in docs/HELDEN-PROMPTS.md, Anleitung docs/HELDEN-BILDER.md; Pipeline (`IMAGE_IDS`) ist eingebaut, Bilder fehlen noch
- [ ] Helden ausbauen: 40+, Kostüm-Upgrades, Heldenkraft je Fach als Werte, Foil/Animation beim Öffnen der Kiste, Sound-Effekte
- [ ] KI-Sidekick (optional): Erklärungen/Tipps per Sprache. Braucht API → Kosten & Datenschutz (Kind!) vorher klären; erst Eltern-Entscheidung
- [ ] Animationen/Sounds (Web Audio, abschaltbar), Konfetti bei Boss
- [x] Zahleneingabe per Ziffernblock (Mathe, ca. 50 % der Aufgaben)
- [ ] Weitere Antwort-Typen: Lückentext, Buchstaben legen, Zuordnen, Uhrzeit stellen
- [ ] iPad-Feinschliff: Querformat-Layout, Safe Areas, Splash-Screens

## Phase 2 – Inhalte
- [ ] Fragenbank mit Themen-Tags (z. B. „Einmaleins“, „Wortarten“) statt nur Klasse
- [ ] Klassenarbeits-Modus nach Thema: Projekt wählt Themen, Training zieht gezielt daraus, Fehler-Wiederholung
- [ ] Lehrplan-Abgleich mit NRW-Lehrplan Grundschule (Kompetenzerwartungen je Klasse als Themenliste ableiten; Lehrwerke der Schule erfragen)
- [ ] Mathe: Sachaufgaben, Geometrie, Uhrzeit, Geld; Deutsch: Diktat-Wörter, Lesetexte; Englisch: Vokabeln mit Bildern
- [ ] Wissens-Review durch Eltern/Lehrkraft (Korrektheit!)

## Phase 3 – Komfort
- [ ] Export/Import des Fortschritts als Datei (Backup ohne Server)
- [ ] Elternbereich (PIN): Fortschritt je Fach, Schwächen, Klassenarbeiten verwalten
- [ ] Optionale Online-Rangliste/Freunde (nur wenn nötig; braucht Backend → Kosten/Datenschutz vorher klären)

## Offene Fragen an den Auftraggeber
1. ✅ Design: Kosmos
2. ✅ Bundesland: NRW, Grundschule Füchtorf (48336). Noch offen: Englisch ab welcher Klasse, Schrift, Lehrwerke der Schule
3. Nur ein Kind/Gerät oder mehrere Profile (aktuell mehrere lokal möglich)?
4. Wie soll das Repo heißen / soll es öffentlich oder privat sein (Pages privat braucht bezahlten Plan)?
