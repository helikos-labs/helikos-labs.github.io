// Generates og-image.png (1200×630) for social link previews.
// Self-contained: Node built-ins only (no deps, no network). Re-run with:
//   node scripts/gen-og.mjs
// Keeps the site itself asset-light; this is a build-time generator for the
// one shared preview image referenced by the OpenGraph/Twitter meta tags.
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1200, H = 630;
const buf = Buffer.alloc(W * H * 4); // RGBA, fully transparent to start

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

function set(x, y, r, g, b, a = 255) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  const ea = buf[i + 3] / 255, sa = a / 255;
  const oa = sa + ea * (1 - sa);
  if (oa === 0) return;
  buf[i]     = Math.round((r * sa + buf[i]     * ea * (1 - sa)) / oa);
  buf[i + 1] = Math.round((g * sa + buf[i + 1] * ea * (1 - sa)) / oa);
  buf[i + 2] = Math.round((b * sa + buf[i + 2] * ea * (1 - sa)) / oa);
  buf[i + 3] = Math.round(oa * 255);
}

// ── Background: void→night gradient + a dawn glow at the mountain base ──
for (let y = 0; y < H; y++) {
  const t = y / H;
  for (let x = 0; x < W; x++) {
    let r = lerp(8, 16, t), g = lerp(11, 22, t), b = lerp(20, 40, t);
    const dx = x - 600, dy = y - H * 1.04;
    const dist = Math.hypot(dx, dy);
    let glow = clamp(1 - dist / 640, 0, 1); glow = glow * glow * 0.6;
    r = lerp(r, 182, glow); g = lerp(g, 106, glow); b = lerp(b, 50, glow);
    set(x, y, r, g, b, 255);
  }
}

// ── Starfield (deterministic) ──
let seed = 20260621;
const rand = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
for (let k = 0; k < 150; k++) {
  const x = rand() * W, y = rand() * H * 0.7;
  const bri = rand() * 0.7 + 0.3;
  set(x, y, 245, 240, 227, bri * 255);
  if (rand() > 0.85) { set(x + 1, y, 245, 240, 227, bri * 120); set(x, y + 1, 245, 240, 227, bri * 120); }
}

// ── Mount Helikon silhouette ──
const base = 470;
const mtop = (x) =>
  base - (150 * Math.exp(-(((x - 430) / 180) ** 2))
        + 112 * Math.exp(-(((x - 770) / 150) ** 2))
        +  72 * Math.exp(-(((x - 150) / 140) ** 2)));
for (let x = 0; x < W; x++) {
  const ty = mtop(x);
  for (let y = Math.floor(ty); y < H; y++) set(x, y, 9, 12, 22, 255);
  for (let e = 0; e < 3; e++) set(x, ty + e, 201, 162, 39, 200 - e * 50); // brass ridge
}

// ── The star: glow, rays, core + faint orrery rings ──
const sx = 600, sy = 158;
for (let dy = -64; dy <= 64; dy++) for (let dx = -64; dx <= 64; dx++) {
  const d = Math.hypot(dx, dy); let gl = clamp(1 - d / 64, 0, 1); gl = gl ** 2;
  if (gl > 0) set(sx + dx, sy + dy, 245, 240, 227, gl * 170);
}
for (let t = -155; t <= 155; t++) {
  let a = (1 - Math.abs(t) / 155) ** 2;
  set(sx + t, sy, 236, 208, 122, a * 230); set(sx + t, sy + 1, 236, 208, 122, a * 120);
  set(sx, sy + t, 236, 208, 122, a * 230); set(sx + 1, sy + t, 236, 208, 122, a * 120);
}
for (let R of [110, 152]) {
  for (let a = 0; a < Math.PI * 2; a += 0.004) set(sx + R * Math.cos(a), sy + R * Math.sin(a), 201, 162, 39, 60);
}
// small orbiting bodies on the rings
for (const [R, ang] of [[110, 0.6], [152, 3.7]]) {
  const ox = sx + R * Math.cos(ang), oy = sy + R * Math.sin(ang);
  for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++)
    if (Math.hypot(dx, dy) <= 3) set(ox + dx, oy + dy, 236, 208, 122, 220);
}
for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++)
  if (Math.hypot(dx, dy) <= 4) set(sx + dx, sy + dy, 255, 252, 245, 255);

// ── Minimal 5×7 caps font for the wordmark/tagline ──
const FONT = {
  H: ['10001','10001','10001','11111','10001','10001','10001'],
  E: ['11111','10000','10000','11110','10000','10000','11111'],
  L: ['10000','10000','10000','10000','10000','10000','11111'],
  I: ['11111','00100','00100','00100','00100','00100','11111'],
  K: ['10001','10010','10100','11000','10100','10010','10001'],
  O: ['01110','10001','10001','10001','10001','10001','01110'],
  S: ['01111','10000','10000','01110','00001','00001','11110'],
  A: ['01110','10001','10001','11111','10001','10001','10001'],
  B: ['11110','10001','10001','11110','10001','10001','11110'],
  V: ['10001','10001','10001','10001','10001','01010','00100'],
  W: ['10001','10001','10001','10101','10101','11011','10001'],
};
const gWidth = (c, s) => (c === ' ' ? 3 * s : 5 * s);
const textWidth = (t, s, gap) => { let w = 0; for (const c of t) w += gWidth(c, s) + gap; return w - gap; };
function drawText(t, x, y, s, gap, col, alpha) {
  let cx = x;
  for (const c of t) {
    const g = FONT[c];
    if (g) for (let r = 0; r < 7; r++) for (let k = 0; k < 5; k++)
      if (g[r][k] === '1') for (let yy = 0; yy < s; yy++) for (let xx = 0; xx < s; xx++)
        set(cx + k * s + xx, y + r * s + yy, col[0], col[1], col[2], alpha);
    cx += gWidth(c, s) + gap;
  }
}

// Wordmark (with a soft dark backing for legibility), then tagline.
const word = 'HELIKOS LABS', ws = 11, wgap = 10, wy = 402;
const wx = (W - textWidth(word, ws, wgap)) / 2;
drawText(word, wx + 3, wy + 3, ws, wgap, [4, 6, 12], 150);
drawText(word, wx, wy, ws, wgap, [236, 208, 122], 255);

const tag = 'AS ABOVE  SO BELOW', ts = 4, tgap = 6, ty = wy + 7 * ws + 30;
drawText(tag, (W - textWidth(tag, ts, tgap)) / 2, ty, ts, tgap, [154, 166, 194], 235);

// ── Encode PNG (RGBA, no deps) ──
function crc32(b) { let c = ~0; for (let i = 0; i < b.length; i++) { c ^= b[i]; for (let k = 0; k < 8; k++) c = (c & 1) ? (c >>> 1) ^ 0xEDB88320 : c >>> 1; } return ~c >>> 0; }
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const t = Buffer.from(type);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
const raw = Buffer.alloc(H * (W * 4 + 1));
for (let y = 0; y < H; y++) { raw[y * (W * 4 + 1)] = 0; buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4); }
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);
const out = path.resolve(fileURLToPath(import.meta.url), '../../og-image.png');
fs.writeFileSync(out, png);
console.log('wrote', out, (png.length / 1024).toFixed(1) + ' KB');
