// Story-Kampagne: je Fach eine „Akte“ mit 8 Kapiteln (= 8 Stationen des Lernpfads).
// Texte: kurze Zeilen; {name} wird durch den Namen des Helden ersetzt. Erzähler: ECHO (Akademie-KI).
// Kapitel 8 ist immer das Finale gegen den Schurken des Fachs.

export const STORY = {
  mathe: {
    title: 'Akte Chaos-Null',
    chapters: [
      { t: 'Alarm auf dem Zahlenplatz', in: ['ECHO: Alarm, {name}! Professor Chaos-Null hat alle Zahlen vom Hauptplatz gestohlen.', 'Ohne sie gerät die ganze Stadt aus dem Takt. Du bist unsere Hoffnung!'], out: ['Die ersten Zahlen leuchten wieder auf. Chaos-Null tobt!'] },
      { t: 'Die Uhrenfabrik', in: ['ECHO: Spur entdeckt! In der Uhrenfabrik hat Chaos-Null alle Zeiger vertauscht.', 'Seine Drohnen bewachen die Maschinen. Rechne sie aus dem Weg!'], out: ['Die Uhren ticken wieder richtig. Eine Drohne lässt eine Nachricht fallen …'] },
      { t: 'Die gesperrte Brücke', in: ['Die Brücke zum Labor ist verriegelt. Das Schloss öffnet sich nur mit der richtigen Rechenkraft.', 'ECHO: Ich scanne das Schloss. Bereit? Los!'], out: ['Klick! Die Brücke senkt sich. Der Weg ins Labor ist frei.'] },
      { t: 'Im Geheimlabor', in: ['Du schleichst ins Labor. Überall blinkende Bildschirme mit Rechenaufgaben.', 'ECHO: Das Passwort steckt in den Aufgaben. Knack sie!'], out: ['Daten kopiert! Chaos-Null plant etwas mit einem Nebel-Generator …'] },
      { t: 'Der Zahlennebel', in: ['Dichter Nebel! Die Zahlen verschwimmen vor deinen Augen.', 'ECHO: Konzentration! Nur wer ruhig rechnet, sieht den Weg.'], out: ['Der Nebel lichtet sich. Am Horizont ragt ein Turm auf.'] },
      { t: 'Die Karte des Professors', in: ['Du findest eine zerrissene Karte: Chaos-Nulls Versteck liegt im Zahlenturm.', 'ECHO: Er weiß, dass du kommst. Sei auf alles gefasst.'], out: ['Karte komplett! Der Turm ist nur noch eine Mission entfernt.'] },
      { t: 'Die Schlösser des Turms', in: ['Im Turm sperren sieben Schlösser den Aufstieg. Jedes will ein Ergebnis.', 'ECHO: Schnell sein lohnt sich – Blitz-Aufgaben geben Bonus!'], out: ['Alle Schlösser offen. Oben wartet er schon …'] },
      { t: 'Das Duell: Chaos-Null', in: ['Professor Chaos-Null steht vor dir. Auf seinem Bildschirm-Gesicht leuchtet eine Null.', '„Ohne Zahlen herrscht Chaos – und ICH herrsche über das Chaos!“', 'ECHO: Zeig ihm, was echte Rechenkraft ist, {name}!'], out: ['Chaos-Null kracht zusammen. Die Null auf seinem Bildschirm wird zu einem Lächeln. Die Stadt ist gerettet – und du bist ein Held!'] },
    ],
  },
  deutsch: {
    title: 'Akte Fehlerteufel',
    chapters: [
      { t: 'Fehler in der Bibliothek', in: ['ECHO: Notfall in der Stadtbibliothek! Der Fehlerteufel hat in alle Bücher Rechtschreibfehler geschmuggelt.', 'Wenn niemand sie findet, versteht bald keiner mehr eine Geschichte.'], out: ['Die ersten Bücher sind wieder sauber. Aus dem Regal kichert es …'] },
      { t: 'Die Zeitungsdruckerei', in: ['Die Druckmaschinen spucken Schlagzeilen voller Fehler aus!', 'ECHO: Verbessere sie, bevor die Zeitung rausgeht!'], out: ['Zeitung gerettet. Schlagzeile: „Held stoppt Fehlerteufel“.'] },
      { t: 'Verhexte Straßenschilder', in: ['Alle Straßenschilder der Stadt sind falsch geschrieben. Die Leute laufen im Kreis!', 'ECHO: Jede richtige Antwort macht ein Schild wieder gültig.'], out: ['Die Schilder stimmen wieder. Die Leute finden ihren Weg.'] },
      { t: 'Die Schultafel', in: ['In der Schule hat jemand die Tafel mit Fehlern vollgekritzelt.', 'ECHO: Das ist seine Handschrift! Er muss ganz in der Nähe sein.'], out: ['Tafel sauber. Hinter dem Vorhang huscht ein roter Schatten.'] },
      { t: 'Der Wörterwald', in: ['Im Wörterwald sind die Wörter durcheinandergewachsen: Verben bei Nomen, Adjektive ganz allein.', 'ECHO: Sortiere sie – dann zeigt dir der Wald den Weg.'], out: ['Der Wald ist geordnet. Ein Pfad führt zu einer roten Höhle.'] },
      { t: 'Der Brief des Teufels', in: ['Du findest einen Brief vom Fehlerteufel – natürlich voller Fehler.', 'ECHO: Er lädt dich zum Duell ein. Absender: Höhle der Fehler.'], out: ['Du hast jeden Fehler gefunden. Der Teufel wird nervös.'] },
      { t: 'Die Höhle der Fehler', in: ['In der Höhle hängen Tausende falsche Sätze von der Decke.', 'ECHO: Nur wer sie richtigstellt, kommt weiter. Blitz-Aufgaben geben Bonus!'], out: ['Die Decke strahlt in sauberer Schrift. Vor dir steht der Fehlerteufel.'] },
      { t: 'Das Duell: Der Fehlerteufel', in: ['Der Fehlerteufel grinst: „Fehler sind überall! Du kannst nicht alle finden!“', 'ECHO: Er irrt sich, {name}. Zeig ihm, dass Sprache dir gehört!'], out: ['Der Fehlerteufel verpufft in einer Wolke aus Radiergummi-Krümeln. Alle Bücher der Stadt sind wieder fehlerfrei – dank dir!'] },
    ],
  },
  englisch: {
    title: 'Akte Baron Babel',
    chapters: [
      { t: 'Chaos am Flughafen', in: ['ECHO: Notruf vom Flughafen! Baron Babel hat alle Ansagen durcheinandergebracht.', 'Niemand weiß, welcher Flug wohin geht. Du sprichst genug Englisch, um zu helfen!'], out: ['Die Anzeigen stimmen wieder. Ein Flug nach London hebt ab – ohne Baron Babel.'] },
      { t: 'Der Hafen der Sprachen', in: ['Im Hafen tragen alle Kisten falsche Etiketten.', 'ECHO: Ordne die Wörter richtig zu, sonst landet die Ladung im falschen Land.'], out: ['Kisten sortiert. Der Kapitän salutiert: „Thank you, hero!“'] },
      { t: 'Das Radio-Rätsel', in: ['Aus jedem Radio quäkt Baron Babel in Rätseln.', 'ECHO: Versteh die Worte, dann findest du seinen Sendeturm.'], out: ['Du hast den Sender geortet. Rauschen. Dann Stille.'] },
      { t: 'Das Museum der Wörter', in: ['Im Museum sind alle Beschriftungen vertauscht: Ein „dog“ steht vor einer Katze!', 'ECHO: Bring die Ausstellung in Ordnung – Wort für Wort.'], out: ['Museum gerettet. In einer Vitrine liegt ein goldener Zylinderhut …'] },
      { t: 'Die Falle der Zeitformen', in: ['Baron Babel hat eine Falle gestellt: Wer eine falsche Zeitform sagt, wird eingefroren!', 'ECHO: Pass auf deine Sätze auf, {name}.'], out: ['Du bist heil durch. Die Falle ist geknackt.'] },
      { t: 'Die Weltkarte', in: ['Du entdeckst eine Weltkarte mit leuchtenden Sprechblasen: Hello, Bonjour, Hola …', 'ECHO: Sein Turm steht da, wo alle Blasen zusammenlaufen.'], out: ['Du hast den Weg gefunden. Der Turm liegt vor dir.'] },
      { t: 'Der Turm der Sprachen', in: ['Jede Etage des Turms spricht eine andere Sprache – aber du brauchst nur Englisch!', 'ECHO: Blitz-Aufgaben geben Bonus. Nutze deine Superkraft!'], out: ['Letzte Etage erreicht. Der Baron wartet schon.'] },
      { t: 'Das Duell: Baron Babel', in: ['Baron Babel lächelt: „Ein Wirrwarr aus Sprachen – und ich bin der Herr darüber!“', 'ECHO: Verstehen ist deine Superkraft, {name}. Los!'], out: ['Baron Babel lüftet seinen Hut und lacht: „Well played, hero!“ Die Sprachen der Welt sind wieder verbunden – dank dir!'] },
    ],
  },
};

export const DAILY_BRIEFING = ['ECHO: Notruf, {name}! Alle drei Schurken greifen gleichzeitig an.', 'Eine gemischte Mission: Mathe, Deutsch und Englisch. Dafür gibt es doppelte Beute!'];

export const ECHO_HIT = ['Treffer!', 'Stark!', 'Genau so!', 'Boom!', 'Sauber getroffen!'];
export const ECHO_CRIT = ['KRITISCHER TREFFER!', 'Wahnsinn!', 'Volle Wucht!'];
export const ECHO_MISS = ['Nicht schlimm – merk dir die Lösung!', 'Autsch! Weiter geht’s.', 'Fast! Gleich nochmal.'];
