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
