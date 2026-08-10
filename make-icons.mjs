// Generates PWA icons (rounded-square crystal gradient) without external deps.
// Usage: node make-icons.mjs  -> writes public/icon-192.png & public/icon-512.png
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), 'public');
mkdirSync(root, { recursive: true });

// Crc32 table
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
};

function hexToRgb(h) {
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}

function makePng(size, colors) {
  const rgba = Buffer.alloc(size * size * 4);
  const [[x0, y0, c0], [x1, y1, c1], [x2, y2, c2]] = colors;
  const radius = size * 0.22;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const t = (x + y) / (2 * size); // diagonal gradient
      let r, g, b;
      if (t < 0.5) {
        const u = t / 0.5;
        r = x0 + (x1 - x0) * u;
        g = y0 + (y1 - y0) * u;
        b = c0 + (c1 - c0) * u;
      } else {
        const u = (t - 0.5) / 0.5;
        r = x1 + (x2 - x1) * u;
        g = y1 + (y2 - y1) * u;
        b = c1 + (c2 - c1) * u;
      }
      // rounded rectangle alpha
      const rx = Math.min(x, size - 1 - x);
      const ry = Math.min(y, size - 1 - y);
      let alpha = 255;
      if (rx < radius && ry < radius) {
        const dx = radius - rx;
        const dy = radius - ry;
        if (dx * dx + dy * dy > radius * radius) alpha = 0;
      }
      const i = (y * size + x) * 4;
      rgba[i] = Math.round(r);
      rgba[i + 1] = Math.round(g);
      rgba[i + 2] = Math.round(b);
      rgba[i + 3] = alpha;
    }
  }

  // compress raw RGBA scanlines (filter 0 per row)
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = deflateSync(raw, { level: 9 });

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const gradient = [
  [0, 0, hexToRgb('#7c6cff')],
  [128, 108, hexToRgb('#52d6f2')],
  [255, 170, hexToRgb('#a78bfa')],
];
for (const size of [192, 512]) {
  writeFileSync(join(root, `icon-${size}.png`), makePng(size, gradient));
  console.log(`wrote public/icon-${size}.png`);
}
