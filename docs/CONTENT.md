# Fragen hinzufügen

Datei `js/data.js`, Objekt `STATIC[fach][klasse]`:
```js
Q('Wie viele Silben hat „Sonne“?', '2', ['1', '3', '4'], 'Klatsche mit: Son-ne')
//   Frage                         richtig  3 falsche      optionaler Tipp
```
Regeln: genau 3 falsche Antworten, keine doppelten Optionen, nur eine richtige Antwort, Kindersprache, Umlaute normal schreiben.
Mathe wird in `MATH[klasse]` erzeugt (Aufgabentext `a op b = ?`). Danach: `npm test`.
