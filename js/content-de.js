// Deutsch: Wortlisten + Aufgaben-Generatoren (Klasse 1–4, NRW-Grundschule).
// Jede Liste ist von Hand geschrieben und wird in tests/content.test.mjs auf Konsistenz geprüft.
// Aufgabenformat wie überall: { q, c, w: [3 falsche], hint? }

const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[rnd(0, arr.length - 1)];
const shuf = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (arr, n, not = []) => shuf(arr.filter((x) => !not.includes(x))).slice(0, n);
const mk = (q, c, w, hint) => ({ q, c, w, hint });
const stem = (inf) => inf.replace(/en$/, '');
const endT = (inf) => (/[td]$/.test(stem(inf)) ? 'et' : 't'); // Stamm auf t/d → -et (gehaltet)

// ---- Nomen: Artikel|Einzahl|Mehrzahl  (Index < 40 = leichte Wörter für Klasse 1–2)
export const NOUNS = `der|Hund|Hunde
die|Katze|Katzen
das|Haus|Häuser
der|Baum|Bäume
die|Blume|Blumen
das|Kind|Kinder
der|Apfel|Äpfel
die|Birne|Birnen
das|Buch|Bücher
der|Stuhl|Stühle
der|Tisch|Tische
die|Tür|Türen
der|Ball|Bälle
die|Schule|Schulen
das|Auto|Autos
der|Vogel|Vögel
die|Maus|Mäuse
das|Pferd|Pferde
die|Kuh|Kühe
der|Fisch|Fische
das|Schaf|Schafe
die|Ente|Enten
der|Hase|Hasen
das|Bett|Betten
die|Lampe|Lampen
der|Berg|Berge
der|Fluss|Flüsse
das|Boot|Boote
die|Straße|Straßen
der|Stift|Stifte
das|Heft|Hefte
die|Tasche|Taschen
der|Schuh|Schuhe
die|Hose|Hosen
der|Zug|Züge
das|Rad|Räder
die|Uhr|Uhren
der|Stern|Sterne
der|Wald|Wälder
die|Wiese|Wiesen
das|Dach|Dächer
der|Garten|Gärten
die|Wolke|Wolken
das|Schwein|Schweine
der|Löwe|Löwen
die|Schlange|Schlangen
das|Ei|Eier
der|Korb|Körbe
die|Hand|Hände
der|Fuß|Füße
das|Auge|Augen
die|Nase|Nasen
der|Arm|Arme
das|Bein|Beine
das|Ohr|Ohren
die|Zahl|Zahlen
der|Brief|Briefe
die|Stadt|Städte
das|Dorf|Dörfer
der|Hut|Hüte
die|Brille|Brillen
die|Flasche|Flaschen
das|Glas|Gläser
die|Gabel|Gabeln
die|Tasse|Tassen
der|Topf|Töpfe
das|Brot|Brote
die|Wurst|Würste
die|Nuss|Nüsse
der|Ast|Äste
das|Blatt|Blätter
die|Hexe|Hexen
der|König|Könige
die|Burg|Burgen
das|Schloss|Schlösser
der|Drache|Drachen
die|Insel|Inseln
das|Meer|Meere
der|Strand|Strände
die|Welle|Wellen
das|Schiff|Schiffe
der|Pilz|Pilze
das|Tier|Tiere
der|Hammer|Hämmer
der|Nagel|Nägel
der|Vater|Väter
die|Mutter|Mütter
der|Bruder|Brüder
die|Schwester|Schwestern
der|Junge|Jungen
die|Lehrerin|Lehrerinnen
der|Arzt|Ärzte
der|Wolf|Wölfe
der|Bär|Bären
der|Frosch|Frösche
die|Spinne|Spinnen
das|Huhn|Hühner
die|Gans|Gänse
der|Affe|Affen
die|Banane|Bananen
der|Stein|Steine
das|Licht|Lichter
das|Lied|Lieder
das|Bild|Bilder
das|Spiel|Spiele
der|Traum|Träume
der|Schrank|Schränke
der|Hafen|Häfen
der|Turm|Türme
die|Brücke|Brücken
das|Tor|Tore
der|Ring|Ringe
der|Schatz|Schätze
die|Münze|Münzen
der|Pirat|Piraten
die|Karte|Karten
das|Seil|Seile
die|Flagge|Flaggen`.split('\n').map((l) => { const [art, sg, pl] = l.split('|'); return { art, sg, pl }; });

// Gleichbleibende Mehrzahl (Klasse 4): Einzahl|Mehrzahl
export const SAME_PLURAL = [['Fenster', 'Fenster'], ['Löffel', 'Löffel'], ['Messer', 'Messer'], ['Teller', 'Teller'], ['Koffer', 'Koffer'], ['Käfer', 'Käfer'], ['Ritter', 'Ritter'], ['Lehrer', 'Lehrer'], ['Kuchen', 'Kuchen'], ['Anker', 'Anker'], ['Mädchen', 'Mädchen'], ['Feuer', 'Feuer']];

// ---- Wortarten
export const VERBS = ['laufen', 'springen', 'lesen', 'schreiben', 'malen', 'singen', 'lachen', 'spielen', 'rechnen', 'schwimmen', 'tanzen', 'essen', 'trinken', 'schlafen', 'fliegen', 'bauen', 'kochen', 'suchen', 'finden', 'rufen', 'fragen', 'denken', 'lernen', 'klettern', 'werfen', 'fangen', 'zeichnen', 'träumen', 'wandern', 'reisen'];
export const ADJS = ['schnell', 'langsam', 'groß', 'klein', 'laut', 'leise', 'hell', 'dunkel', 'warm', 'kalt', 'lustig', 'traurig', 'mutig', 'klug', 'stark', 'schwach', 'weich', 'hart', 'süß', 'sauer', 'bunt', 'rund', 'eckig', 'sauber', 'müde', 'freundlich', 'neugierig', 'gefährlich', 'schön', 'dünn'];

// ---- Silben (mit Trennstrichen; Anzahl = Teile)
export const SYLLABLES = `Hund|Ball|Haus|Tisch|Baum|Maus|Stift|Buch
Son-ne|Ka-tze|Ap-fel|Ta-sche|Ho-se|Ba-de-wan-ne|Blu-me|Scho-ko-la-de|Kro-ko-dil|E-le-fant
Sup-pen-löf-fel|Fahr-rad|Ba-na-ne|Koch-löf-fel|Re-gen-bo-gen|Schmet-ter-ling|Kar-tof-fel|Zir-kus
Fuß-ball-platz|Ge-burts-tag|Wör-ter-buch|Ta-schen-lam-pe|Ham-bur-ger|Zau-ber-stab|Dra-chen|Ki-no`.split(/[\n|]/).map((w) => w.trim()).filter(Boolean);

// ---- Rechtschreibung: richtig|falsch1,falsch2,falsch3   (Stufe 1 = leichte Wörter)
export const SPELL_EASY = `Hund|Hunt,Hundt,Hunnd
Bad|Bat,Baad,Badd
Berg|Berk,Bärg,Berrg
Tag|Tak,Tahg,Tagg
Kind|Kint,Kindt,Khind
Wald|Walt,Waldt,Wahld
Land|Lant,Landt,Lannd
Hand|Hant,Handt,Hannd
Zug|Zuk,Zugg,Zuhg
Lied|Liet,Lid,Lieed
Sand|Sant,Sandt,Sannd
Sonne|Sone,Sonnne,Sohne
Mutter|Muter,Mutterr,Mutta
Katze|Kaze,Katse,Katsze
Wasser|Waser,Wasserr,Wassa
Tier|Tir,Tihr,Tiir
Biene|Bine,Bihne,Bienne
Spiel|Spil,Spihl,Spiell
Ball|Bal,Bahl,Balll
Mann|Man,Mahn,Mannn`.split('\n').map((l) => { const [c, w] = l.split('|'); return { c, w: w.split(',').filter((x) => x !== c) }; });

export const SPELL = `Zucker|Zuker,Zukker,Zuccer
Brücke|Brüke,Brükke,Brücce
Mütze|Müze,Mütse,Mützze
Platz|Plaz,Platss,Plats
Blitz|Blits,Blizz,Bliz
Glück|Glük,Glükk,Gluck
Stück|Stük,Stükk,Stuck
Rock|Rok,Rokk,Rokc
Block|Blok,Blokk,Blocc
Fleck|Flek,Flekk,Flecc
Jacke|Jake,Jakke,Jaccke
Ecke|Eke,Ekke,Eccke
Decke|Deke,Dekke,Decce
Hecke|Heke,Hekke,Hecce
Mücke|Müke,Mükke,Mücce
Sack|Sak,Sakk,Sackk
Schnecke|Schneke,Schnekke,Schnecce
Fliege|Flige,Fliehge,Fliegge
Wiese|Wise,Wihse,Wiehse
Brief|Brif,Brieff,Briev
Liebe|Libe,Lihbe,Liebbe
Sommer|Somer,Sohmer,Sommär
Himmel|Himel,Hiemmel,Himmal
Schiff|Schif,Schiif,Schieff
Tasse|Tase,Tasze,Tassee
schwimmen|schwimen,schwimmmen,schwiemen
Zahl|Zal,Zaal,Zahhl
Uhr|Ur,Uuhr,Uhhr
Stuhl|Stul,Stuul,Stuhll
Bahn|Ban,Baan,Bahnn
Fahrrad|Farrad,Fahrad,Faarrad
Mehl|Mel,Meel,Mehhl
Sohn|Son,Soon,Sohhn
Jahr|Jar,Jaar,Jahhr
Häuser|Heuser,Häuzer,Heiser
Bäume|Beume,Baume,Bäumme
Träume|Treume,Traume,Träumme
Mäuse|Meuse,Mause,Meise
Räuber|Reuber,Rauber,Reiber
Freund|Fräund,Freunt,Fraund
Feuer|Fäuer,Feier,Fauer
Eule|Äule,Eile,Aule
Läufer|Leufer,Laufer,Läuffer
Fräulein|Freulein,Fraulein,Fräulin
Käse|Kese,Kähse,Kaese
Bär|Ber,Bähr,Beer
Mädchen|Medchen,Mädschen,Mätchen
Wärme|Werme,Wärmme,Wärne
Länder|Lender,Lända,Läner
Stärke|Sterke,Stärkke,Stäerke
Straße|Strase,Strasse,Stratze
Fuß|Fus,Fuss,Fuhs
Spaß|Spas,Spass,Spahs
heiß|heis,heiss,heihs
groß|gros,gross,grohs
Fluss|Fluß,Flus,Fluuss
Schloss|Schloß,Schlos,Schlosz
müssen|müsen,müßen,müssn
essen|eßen,esen,essn
Gras|Graß,Grass,Grahs
Vogel|Fogel,Vokel,Vogell
Vater|Fater,Vahter,Vatter
Pferd|Pfert,Pferdt,Pferrd
Hose|Hoze,Hohse,Hosse
Nase|Nahse,Nasse,Naze
Maus|Mauss,Mous,Maws
Schule|Schuhle,Shule,Schulle
Schlüssel|Schlüsel,Schlüßel,Schlüsell
Geschichte|Geschichtte,Geschigte,Geschihte
Quelle|Kwelle,Quele,Qwelle
Vogelnest|Fogelnest,Vogelnäst,Vogelnesst
Schatten|Schaten,Schattn,Schatthen
Wetter|Weter,Wetta,Wetterr
Lehrer|Lerer,Lähre,Lehrär
Ärztin|Erztin,Ärtztin,Ärztinn
Zimmer|Zimer,Zimmär,Zimmmer
Winter|Winta,Wintter,Wihnter`.split('\n').map((l) => { const [c, w] = l.split('|'); return { c, w: w.split(',').filter((x) => x !== c) }; });

// ---- Gegenteile
export const OPPOSITES = `groß|klein
heiß|kalt
schnell|langsam
hell|dunkel
laut|leise
alt|jung
dick|dünn
lang|kurz
hoch|tief
nass|trocken
leicht|schwer
weich|hart
früh|spät
stark|schwach
arm|reich
offen|geschlossen
voll|leer
süß|sauer
glücklich|traurig
mutig|ängstlich
fleißig|faul
sauber|schmutzig
gesund|krank
richtig|falsch
kaufen|verkaufen
öffnen|schließen
lachen|weinen
fragen|antworten
kommen|gehen
steigen|fallen
geben|nehmen
gewinnen|verlieren
anfangen|aufhören
freundlich|unfreundlich
Tag|Nacht
Sommer|Winter
Freund|Feind
Anfang|Ende
Frage|Antwort`.split('\n').map((l) => l.split('|'));

// ---- Oberbegriffe
export const GROUPS = {
  Tiere: ['Hund', 'Katze', 'Pferd', 'Kuh', 'Schaf', 'Fuchs', 'Igel', 'Hase', 'Bär', 'Wolf'],
  Obst: ['Apfel', 'Birne', 'Kirsche', 'Banane', 'Erdbeere', 'Pflaume', 'Orange', 'Traube'],
  Gemüse: ['Karotte', 'Gurke', 'Tomate', 'Kohl', 'Zwiebel', 'Paprika', 'Erbse', 'Radieschen'],
  Möbel: ['Tisch', 'Stuhl', 'Schrank', 'Sofa', 'Bett', 'Regal', 'Sessel', 'Kommode'],
  Kleidung: ['Hose', 'Jacke', 'Mütze', 'Socke', 'Pullover', 'Rock', 'Schal', 'Handschuh'],
  Werkzeuge: ['Hammer', 'Säge', 'Zange', 'Schraubenzieher', 'Bohrer', 'Feile'],
  Fahrzeuge: ['Auto', 'Bus', 'Zug', 'Fahrrad', 'Schiff', 'Flugzeug', 'Traktor', 'Roller'],
  Körperteile: ['Hand', 'Fuß', 'Kopf', 'Nase', 'Ohr', 'Bein', 'Arm', 'Knie'],
  Musikinstrumente: ['Geige', 'Flöte', 'Trommel', 'Klavier', 'Gitarre', 'Trompete'],
  Getränke: ['Wasser', 'Saft', 'Milch', 'Tee', 'Limonade', 'Kakao'],
  Sportarten: ['Fußball', 'Schwimmen', 'Turnen', 'Tennis', 'Handball', 'Judo'],
  Berufe: ['Bäcker', 'Arzt', 'Lehrer', 'Pilot', 'Feuerwehrmann', 'Maler', 'Friseur'],
  Gewässer: ['Fluss', 'See', 'Bach', 'Meer', 'Teich', 'Kanal'],
  Blumen: ['Rose', 'Tulpe', 'Nelke', 'Margerite', 'Sonnenblume', 'Veilchen'],
  Geschirr: ['Teller', 'Tasse', 'Löffel', 'Gabel', 'Messer', 'Schüssel'],
};

// ---- Zusammengesetzte Nomen: Teil1|Teil2|Ergebnis
export const COMPOUNDS = `Haus|Tür|Haustür
Schule|Hof|Schulhof
Apfel|Baum|Apfelbaum
Sonne|Blume|Sonnenblume
Regen|Bogen|Regenbogen
Fuß|Ball|Fußball
Hand|Schuh|Handschuh
Zahn|Bürste|Zahnbürste
Wasser|Glas|Wasserglas
Kind|Zimmer|Kinderzimmer
Eis|Becher|Eisbecher
Buch|Regal|Bücherregal
Schnee|Mann|Schneemann
Tisch|Bein|Tischbein
Kuh|Stall|Kuhstall
Pferd|Stall|Pferdestall
Strand|Korb|Strandkorb
Sand|Burg|Sandburg
Wind|Mühle|Windmühle
Feuer|Wehr|Feuerwehr
Schule|Tasche|Schultasche
Brot|Messer|Brotmesser
Kopf|Kissen|Kopfkissen
Mond|Schein|Mondschein
Laub|Baum|Laubbaum
Spiel|Platz|Spielplatz`.split('\n').map((l) => { const [a, b, c] = l.split('|'); return { a, b, c }; });

// ---- Verben: Grundform|er/sie/es (Präsens)|Präteritum|Partizip II|Hilfsverb
export const STRONG = `gehen|geht|ging|gegangen|ist
laufen|läuft|lief|gelaufen|ist
sehen|sieht|sah|gesehen|hat
essen|isst|aß|gegessen|hat
trinken|trinkt|trank|getrunken|hat
schreiben|schreibt|schrieb|geschrieben|hat
finden|findet|fand|gefunden|hat
kommen|kommt|kam|gekommen|ist
geben|gibt|gab|gegeben|hat
fahren|fährt|fuhr|gefahren|ist
nehmen|nimmt|nahm|genommen|hat
sprechen|spricht|sprach|gesprochen|hat
schlafen|schläft|schlief|geschlafen|hat
singen|singt|sang|gesungen|hat
schwimmen|schwimmt|schwamm|geschwommen|ist
sitzen|sitzt|saß|gesessen|hat
stehen|steht|stand|gestanden|hat
lesen|liest|las|gelesen|hat
helfen|hilft|half|geholfen|hat
fliegen|fliegt|flog|geflogen|ist
ziehen|zieht|zog|gezogen|hat
fangen|fängt|fing|gefangen|hat
halten|hält|hielt|gehalten|hat
rufen|ruft|rief|gerufen|hat
werfen|wirft|warf|geworfen|hat
treffen|trifft|traf|getroffen|hat
tragen|trägt|trug|getragen|hat
waschen|wäscht|wusch|gewaschen|hat
bleiben|bleibt|blieb|geblieben|ist
steigen|steigt|stieg|gestiegen|ist
schneiden|schneidet|schnitt|geschnitten|hat
binden|bindet|band|gebunden|hat`.split('\n').map((l) => { const [inf, pres, pret, part, aux] = l.split('|'); return { inf, pres, pret, part, aux }; });

// ---- Adjektive steigern: Grundform|Komparativ|Superlativ|typische Fehler
export const COMPARE = `schnell|schneller|am schnellsten|schnellter,am schnellesten
stark|stärker|am stärksten|starker,am starksten
groß|größer|am größten|großer,am großesten
klein|kleiner|am kleinsten|kleinner,am kleinesten
alt|älter|am ältesten|alter,am altesten
jung|jünger|am jüngsten|junger,am jungsten
lang|länger|am längsten|langer,am langsten
kurz|kürzer|am kürzesten|kurzer,am kurzesten
hoch|höher|am höchsten|hocher,am hochsten
gut|besser|am besten|gutter,am gutesten
nah|näher|am nächsten|naher,am nahsten
warm|wärmer|am wärmsten|warmer,am warmsten
kalt|kälter|am kältesten|kalter,am kaltesten
dick|dicker|am dicksten|dickker,am dickesten
hell|heller|am hellsten|helller,am hellesten
laut|lauter|am lautesten|läuter,am läutesten
schwer|schwerer|am schwersten|schwärer,am schwerrsten
klug|klüger|am klügsten|kluger,am klugsten
arm|ärmer|am ärmsten|armer,am armsten
schön|schöner|am schönsten|schonner,am schönesten
weit|weiter|am weitesten|weitter,am weitsten
tief|tiefer|am tiefsten|tieffer,am tiefesten
süß|süßer|am süßesten|süsser,am süsesten
scharf|schärfer|am schärfsten|scharfer,am scharfsten
glatt|glatter|am glattesten|glater,am glatesten
leicht|leichter|am leichtesten|leichtter,am leichsten`.split('\n').map((l) => { const [pos, comp, sup, bad] = l.split('|'); return { pos, comp, sup, bad: bad.split(',') }; });

// ---- Satzzeichen: [Satz ohne Zeichen, Zeichen]
export const SENTENCES = [
  ['Ich habe einen Hund', '.'], ['Die Sonne scheint', '.'], ['Mama kocht Suppe', '.'], ['Wir gehen heute ins Kino', '.'],
  ['Der Bus kommt gleich', '.'], ['Tim spielt gern Fußball', '.'], ['Im Garten blühen viele Blumen', '.'], ['Mein Bruder liest ein Buch', '.'],
  ['Wie heißt du', '?'], ['Wo wohnst du', '?'], ['Hast du ein Haustier', '?'], ['Wann beginnt die Schule', '?'],
  ['Wer hat meinen Stift', '?'], ['Warum ist der Himmel blau', '?'], ['Kommst du mit auf den Spielplatz', '?'], ['Was gibt es zum Mittagessen', '?'],
  ['Pass auf', '!'], ['Komm sofort her', '!'], ['Hilfe', '!'], ['Halt, stehen bleiben', '!'], ['Mach bitte das Licht aus', '!'], ['Lauf schnell weg', '!'],
];

// ---- Wörtliche Rede (Klasse 3–4)
export const NAMES = ['Tim', 'Mia', 'Ben', 'Lena', 'Paul', 'Emma', 'Jonas', 'Sophie'];
export const SPEECH = [['Ich habe Hunger', '.'], ['Komm mit', '!'], ['Wo ist mein Ball', '?'], ['Das war toll', '!'], ['Ich bin müde', '.'], ['Hast du Zeit', '?'], ['Heute ist Samstag', '.'], ['Lass uns spielen', '!']];

// ---- Satzglieder (Klasse 4): Satz|Verb
export const VERB_SENTENCES = [
  ['Der Hund jagt die Katze.', 'jagt'], ['Mia liest ein spannendes Buch.', 'liest'], ['Die Kinder spielen im Garten.', 'spielen'], ['Mein Vater repariert das Fahrrad.', 'repariert'],
  ['Der Bäcker backt frische Brötchen.', 'backt'], ['Ein Vogel singt auf dem Dach.', 'singt'], ['Wir fahren morgen zur Oma.', 'fahren'], ['Die Lehrerin erklärt die Aufgabe.', 'erklärt'],
  ['Tom malt ein buntes Bild.', 'malt'], ['Der Zug hält am Bahnhof.', 'hält'], ['Lena putzt sich die Zähne.', 'putzt'], ['Der Regen tropft auf die Straße.', 'tropft'],
];

// ---- Fälle (Klasse 4): Wen/Wem
export const CASE_ITEMS = [
  ['Ich sehe ___ Hund.', 'den', ['der', 'dem', 'des'], 'Wen sehe ich? → den'],
  ['Wir besuchen ___ Lehrer.', 'den', ['der', 'dem', 'des'], 'Wen besuchen wir? → den'],
  ['Sie ruft ___ Bruder.', 'den', ['der', 'dem', 'des'], 'Wen ruft sie? → den'],
  ['Er fängt ___ Ball.', 'den', ['der', 'dem', 'des'], 'Wen oder was fängt er? → den'],
  ['Ich helfe ___ Vater.', 'dem', ['den', 'der', 'des'], 'Wem helfe ich? → dem'],
  ['Wir danken ___ Lehrer.', 'dem', ['den', 'der', 'des'], 'Wem danken wir? → dem'],
  ['Sie gibt ___ Hund Futter.', 'dem', ['den', 'der', 'des'], 'Wem gibt sie Futter? → dem'],
  ['Er schenkt ___ Bruder ein Buch.', 'dem', ['den', 'der', 'des'], 'Wem schenkt er etwas? → dem'],
  ['Das ist das Fell ___ Hundes.', 'des', ['den', 'dem', 'der'], 'Wessen Fell? → des Hundes'],
  ['Das ist der Hut ___ Lehrers.', 'des', ['den', 'dem', 'der'], 'Wessen Hut? → des Lehrers'],
];

// ---- Reime: Wort|Reimwort|Gegenbeispiele
export const RHYMES = `Haus|Maus|Baum,Hand,Tisch
Hand|Sand|Hund,Haus,Mund
Hund|Mund|Hand,Hase,Haus
Tisch|Fisch|Tasche,Stuhl,Dach
Hase|Nase|Hose,Haus,Hand
Rose|Hose|Rasen,Nase,Reise
Katze|Tatze|Tasse,Kasse,Kuchen
Wald|bald|Wind,Weg,Wolf
Schuh|Kuh|Schule,Schiff,Stuhl
Biene|Schiene|Blume,Birne,Bohne
Ball|Knall|Bein,Baum,Bild
Maus|Haus|Mund,Mann,Hand
Tor|Ohr|Tag,Turm,Tisch
Tier|Bier|Tor,Tag,Turm
Stein|Bein|Stern,Stirn,Stock
Wand|Hand|Wind,Wolke,Wurm
Lampe|Rampe|Lappen,Lupe,Limo
Kuchen|suchen|Kirche,Kissen,Kasten`.split('\n').map((l) => { const [w, c, bad] = l.split('|'); return { w, c, bad: bad.split(',') }; });

// ============ Generatoren: (grade) -> Aufgabe =============
const ART = ['der', 'die', 'das'];

function genArtikel() {
  const n = pick(NOUNS);
  return mk(`Setze ein: ___ ${n.sg} ist da.`, n.art, [...ART.filter((a) => a !== n.art), 'den'], 'Welcher Artikel gehört zu dem Wort?');
}
function genMehrzahl(grade) {
  const pool = grade <= 2 ? NOUNS.slice(0, 40) : NOUNS;
  const n = pick(pool);
  const bads = new Set();
  const pls = NOUNS.map((x) => x.pl).filter((p) => p !== n.pl && p !== n.sg);
  for (const x of [n.sg + 's', n.sg + 'e', n.sg + 'en', n.sg + 'er', n.pl + 's']) if (x !== n.pl && x !== n.sg && bads.size < 2) bads.add(x);
  for (const x of shuf(pls)) { if (bads.size >= 3) break; bads.add(x); }
  return mk(`Die Mehrzahl von „${n.sg}“ ist …`, n.pl, [...bads].slice(0, 3));
}
function genEinzahl(grade) {
  const pool = (grade <= 2 ? NOUNS.slice(0, 40) : NOUNS).filter((n) => n.pl !== n.sg);
  const n = pick(pool);
  const w = sample(NOUNS.map((x) => x.sg), 3, [n.sg, n.pl]);
  return mk(`Die Einzahl von „${n.pl}“ ist …`, n.sg, w);
}
function genNomen(grade) {
  const n = pick(NOUNS).sg;
  const others = grade <= 2 ? sample([...VERBS, ...ADJS], 3) : sample([...VERBS, ...ADJS], 3);
  return mk('Welches Wort ist ein Nomen?', n, others, 'Nomen kann man sehen oder anfassen – und schreibt sie groß.');
}
function genVerb() {
  const v = pick(VERBS);
  return mk('Welches Wort ist ein Verb (Tuwort)?', v, [...sample(NOUNS.map((x) => x.sg), 2), pick(ADJS)], 'Ein Verb sagt, was jemand tut.');
}
function genAdjektiv() {
  const a = pick(ADJS);
  return mk('Welches Wort ist ein Adjektiv (Wiewort)?', a, [...sample(NOUNS.map((x) => x.sg), 2), pick(VERBS)], 'Ein Adjektiv sagt, wie etwas ist.');
}
function genWortart() {
  const t = pick([['Nomen', NOUNS.map((n) => n.sg)], ['Verb', VERBS], ['Adjektiv', ADJS]]);
  const w = pick(t[1]);
  return mk(`Welche Wortart ist „${w}“?`, t[0], ['Nomen', 'Verb', 'Adjektiv', 'Artikel'].filter((x) => x !== t[0]));
}
function genSilben(grade) {
  const pool = grade <= 1 ? SYLLABLES.filter((s) => s.split('-').length <= 3) : SYLLABLES;
  const w = pick(pool), n = w.split('-').length;
  const wrong = [1, 2, 3, 4, 5].filter((x) => x !== n && x >= Math.max(1, n - 2)).slice(0, 3);
  while (wrong.length < 3) wrong.push(Math.max(...wrong, n) + 1);
  return mk(`Wie viele Silben hat „${w.replace(/-/g, '')}“?`, String(n), wrong.map(String), `Klatsche mit: ${w.replace(/-/g, ' – ')}`);
}
function genRecht(grade) {
  const it = pick(grade <= 1 ? SPELL_EASY : [...SPELL_EASY, ...SPELL, ...SPELL]);
  return mk('Wie schreibt man das Wort richtig?', it.c, it.w.slice(0, 3));
}
const OPP_CLASS = (w) => (/^[A-ZÄÖÜ]/.test(w) ? 'n' : /en$/.test(w) ? 'v' : 'a');
function genGegenteil() {
  const [a, b] = pick(OPPOSITES);
  const flip = Math.random() < 0.5;
  const q = flip ? b : a, c = flip ? a : b;
  const w = sample(OPPOSITES.flat().filter((x) => OPP_CLASS(x) === OPP_CLASS(c)), 3, [a, b]);
  return mk(`Das Gegenteil von „${q}“ ist …`, c, w);
}
function genAussenseiter() {
  const [g1, g2] = sample(Object.keys(GROUPS), 2);
  const three = sample(GROUPS[g1], 3), odd = pick(GROUPS[g2]);
  if (three.includes(odd)) return genAussenseiter();
  return mk('Welches Wort passt nicht zu den anderen?', odd, three, `Die anderen drei sind: ${g1}`);
}
function genOberbegriff() {
  const [g1] = sample(Object.keys(GROUPS), 1);
  const three = sample(GROUPS[g1], 3);
  return mk(`Welcher Oberbegriff passt? ${three.join(', ')}`, g1, sample(Object.keys(GROUPS), 3, [g1]));
}
function genZusammen() {
  const it = pick(COMPOUNDS);
  const wrong = new Set([it.b + it.a.toLowerCase(), `${it.a} ${it.b}`, it.a + it.b.toLowerCase().replace(/^./, (c) => c)].filter((x) => x !== it.c));
  wrong.add(it.a.toLowerCase() + it.b.toLowerCase());
  wrong.delete(it.c);
  while (wrong.size < 3) wrong.add(pick(COMPOUNDS).c);
  wrong.delete(it.c);
  return mk(`${it.a} + ${it.b} = ?`, it.c, [...wrong].slice(0, 3), 'Das letzte Wort bestimmt den Artikel.');
}
function genZusammenArtikel() {
  const it = pick(COMPOUNDS.filter((c) => NOUNS.some((n) => n.sg === c.b)));
  const last = NOUNS.find((n) => n.sg === it.b);
  const wrong = ART.filter((a) => a !== last.art);
  return mk(`Welcher Artikel gehört zu „${it.c}“?`, last.art, [...wrong, 'ein'], 'Der Artikel kommt vom LETZTEN Wortteil.');
}
function genPraeteritum() {
  const v = pick(STRONG);
  const [when, who] = pick([['Gestern', 'Tim'], ['Letzte Woche', 'Mia'], ['Früher', 'Opa'], ['Gestern', 'sie']]);
  const wrong = [stem(v.inf) + (endT(v.inf) === 'et' ? 'ete' : 'te'), v.part, v.pres].filter((x) => x !== v.pret);
  return mk(`${when} ___ ${who}. (${v.inf})`, v.pret, [...new Set(wrong)].slice(0, 3), 'Es ist schon passiert – Vergangenheit.');
}
function genPerfekt() {
  const v = pick(STRONG);
  const wrong = ['ge' + stem(v.inf) + endT(v.inf), v.pret, v.pres].filter((x) => x !== v.part);
  return mk(`Er ${v.aux} ___. (${v.inf})`, v.part, [...new Set(wrong)].slice(0, 3), 'Vergangenheit mit „hat“ oder „ist“.');
}
function genPraesens() {
  const v = pick(STRONG.filter((x) => x.pres !== x.inf.replace(/en$/, '') + 't' && x.pres !== x.inf.replace(/en$/, '') + 'et'));
  const wrong = [stem(v.inf) + endT(v.inf), v.pret, v.part].filter((x) => x !== v.pres);
  return mk(`Er ___ oft. (${v.inf})`, v.pres, [...new Set(wrong)].slice(0, 3), 'Bei „er, sie, es“ ändert sich oft der Vokal.');
}
function genSteigern() {
  const it = pick(COMPARE);
  if (Math.random() < 0.5) return mk(`Steigere „${it.pos}“: Er ist ___ als sie.`, it.comp, [it.bad[0], it.pos + 'e', it.sup].filter((x) => x !== it.comp).slice(0, 3));
  return mk(`Steigere „${it.pos}“: Sie ist ___.`, it.sup, [it.bad[1], it.comp, 'am ' + it.pos].filter((x) => x !== it.sup).slice(0, 3));
}
function genSatzzeichen() {
  const [s, z] = pick(SENTENCES);
  return mk(`Welches Satzzeichen passt? „${s}___“`, z, ['.', '?', '!', ','].filter((x) => x !== z), z === '?' ? 'Eine Frage endet mit …' : z === '!' ? 'Ein Ausruf oder eine Aufforderung endet mit …' : 'Eine Aussage endet mit …');
}
function genRede() {
  const n = pick(NAMES), [t, z] = pick(SPEECH);
  const c = `${n} sagt: „${t}${z}“`;
  const w = [`${n} sagt: ${t}${z}`, `${n} sagt „${t}“${z}`, `„${n} sagt: ${t}${z}“`];
  return mk('Welcher Satz mit wörtlicher Rede ist richtig?', c, w, 'Nach dem Doppelpunkt stehen die Redezeichen und das Satzzeichen davor.');
}
function genPraedikat() {
  const [s, v] = pick(VERB_SENTENCES);
  const toks = s.replace(/[.!?]/g, '').split(' ').filter((t) => t !== v && t.length > 2);
  return mk(`Welches Wort ist das Verb (Prädikat)? „${s}“`, v, sample(toks, 3), 'Das Verb sagt, was geschieht.');
}
function genFall() {
  const [q, c, w, hint] = pick(CASE_ITEMS);
  return mk(`Setze ein: ${q}`, c, w, hint);
}
function genReim() {
  const r = pick(RHYMES);
  return mk(`Was reimt sich auf „${r.w}“?`, r.c, r.bad.slice(0, 3));
}
const ALL_WORDS = new Set([...NOUNS.map((n) => n.sg.toLowerCase()), ...VERBS, ...ADJS]);
function genBuchstabe() {
  for (let i = 0; i < 20; i++) {
    const n = pick(NOUNS.slice(0, 40)).sg;
    const pos = rnd(1, n.length - 1), miss = n[pos];
    const cand = 'aeioudgklmnprstwb'.split('').filter((x) => x !== miss.toLowerCase());
    const w = shuf(cand).filter((x) => !ALL_WORDS.has((n.slice(0, pos) + x + n.slice(pos + 1)).toLowerCase())).slice(0, 3);
    if (w.length === 3) return mk(`Welcher Buchstabe fehlt? ${n.slice(0, pos)}_${n.slice(pos + 1)}`, miss, w);
  }
  return genAnlaut();
}
function genAnlaut() {
  const n = pick(NOUNS.slice(0, 40)).sg;
  const letter = n[0].toUpperCase();
  const others = NOUNS.slice(0, 40).map((x) => x.sg).filter((x) => x[0].toUpperCase() !== letter);
  return mk(`Welches Wort beginnt mit ${letter}?`, n, sample(others, 3));
}

// Welche Generatoren ab welcher Klasse (Gewicht = Häufigkeit)
const GENS = [
  [genAnlaut, 1, 1, 1], [genBuchstabe, 1, 1, 1], [genReim, 1, 3, 2], [genSilben, 1, 3, 2], [genRecht, 1, 4, 3],
  [genMehrzahl, 1, 4, 2], [genNomen, 1, 2, 1], [genVerb, 2, 3, 1], [genAdjektiv, 2, 3, 1], [genWortart, 2, 4, 2],
  [genArtikel, 2, 4, 2], [genEinzahl, 2, 4, 1], [genGegenteil, 2, 4, 2], [genAussenseiter, 2, 4, 1], [genOberbegriff, 2, 4, 1],
  [genSatzzeichen, 2, 4, 2], [genZusammen, 2, 4, 2], [genZusammenArtikel, 3, 4, 1],
  [genPraeteritum, 3, 4, 3], [genPerfekt, 3, 4, 2], [genPraesens, 3, 4, 1], [genSteigern, 3, 4, 2], [genRede, 3, 4, 2],
  [genPraedikat, 4, 4, 2], [genFall, 4, 4, 2],
];
export const DE_GENERATORS = GENS.map((g) => g[0].name);

export function genDeutsch(grade) {
  const pool = [];
  for (const [fn, lo, hi, wt] of GENS) if (grade >= lo && grade <= Math.max(hi, lo)) for (let i = 0; i < wt; i++) pool.push(fn);
  // Klasse 4 bekommt zusätzlich Stoff von Klasse 3 (Wiederholung)
  if (grade === 4) for (const [fn, lo, , wt] of GENS) if (lo === 3) for (let i = 0; i < wt; i++) pool.push(fn);
  for (let tries = 0; tries < 8; tries++) {
    const q = pick(pool)(grade);
    if (q && q.w.length >= 3 && !q.w.includes(q.c) && new Set([q.c, ...q.w]).size === 4) return q;
  }
  return genRecht(grade);
}
