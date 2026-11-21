import test from 'node:test';
import assert from 'node:assert/strict';
import { newProfile, defaults, exportJson, parseBackup } from '../js/store.js';

const sample = () => {
  const s = defaults();
  const p = newProfile('Test', 3, { suit: 'rot', emblem: 'bolt', skin: '#fff', mask: 'domino', cape: true });
  p.cards.x = 2; p.photo = 'data:image/jpeg;base64,AAA';
  s.profiles.push(p); s.active = p.id; s.spotify = 'https://open.spotify.com/playlist/1';
  return s;
};

test('Backup: Export → Import ergibt denselben Zustand', () => {
  const s = sample();
  assert.deepEqual(parseBackup(exportJson(s)), s);
});

test('Backup: kaputte oder fremde Dateien werden abgelehnt', () => {
  assert.throws(() => parseBackup('kein json'));
  assert.throws(() => parseBackup('{"a":1}'));
  assert.throws(() => parseBackup(JSON.stringify({ app: 'lernhelden-backup', state: { v: 1, profiles: [{ id: 1 }] } })));
});

test('Backup: unsichere Spotify-Links und unbekannte aktive ID werden bereinigt', () => {
  const s = sample(); s.spotify = 'javascript:alert(1)'; s.active = 'nope';
  const r = parseBackup(exportJson(s));
  assert.equal(r.spotify, ''); assert.equal(r.active, null);
});

import { isSpotifyUrl } from '../js/store.js';
test('Spotify-Link: nur echte Spotify-Adressen', () => {
  assert.ok(isSpotifyUrl('https://open.spotify.com/playlist/37i9dQZF1DX?si=abc'));
  assert.ok(isSpotifyUrl('https://spotify.link/xYz123'));
  assert.ok(!isSpotifyUrl('http://open.spotify.com/x'));
  assert.ok(!isSpotifyUrl('https://evil.example/open.spotify.com/'));
  assert.ok(!isSpotifyUrl('javascript:alert(1)'));
  assert.ok(!isSpotifyUrl(''));
});
