// Offline-First App-Shell. Bei Änderungen an Dateien VERSION erhöhen.
const VERSION = 'lernhelden-v23';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'css/app.css', 'js/app.js', 'js/data.js', 'js/store.js', 'js/hero.js', 'js/story.js', 'js/sfx.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'assets/heroes/agentbabel.webp', 'assets/heroes/captainvocab.webp', 'assets/heroes/globeglider.webp',
  'assets/heroes/grammarguard.webp', 'assets/heroes/grammatiktitan.webp', 'assets/heroes/hellohawk.webp',
  'assets/heroes/kapitaenquotient.webp', 'assets/heroes/lingolord.webp', 'assets/heroes/maerchenmeister.webp',
  'assets/heroes/meisterfederkiel.webp', 'assets/heroes/minusninja.webp', 'assets/heroes/multimax.webp',
  'assets/heroes/nullpunkt.webp', 'assets/heroes/plusphantom.webp', 'assets/heroes/quadrattitan.webp',
  'assets/heroes/rechenfalke.webp', 'assets/heroes/reimreiter.webp', 'assets/heroes/satzschatten.webp',
  'assets/heroes/silbensturm.webp', 'assets/heroes/speakspark.webp', 'assets/heroes/tintenfalke.webp',
  'assets/heroes/wordwarrior.webp', 'assets/heroes/wortwaechter.webp', 'assets/heroes/zahlenblitz.webp',
  'assets/bosses/boss-mathe.webp', 'assets/bosses/boss-deutsch.webp', 'assets/bosses/boss-englisch.webp'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
    const copy = res.clone();
    caches.open(VERSION).then((c) => c.put(e.request, copy));
    return res;
  }).catch(() => caches.match('index.html'))));
});
