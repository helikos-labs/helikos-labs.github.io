// Stamps the deploy version tracker. Run by CI before each Pages deploy
// (see .github/workflows/static.yml), or by hand:
//   node scripts/bump-version.mjs
// The build number is the repo's commit count (git rev-list --count HEAD) —
// monotonic and stateless, so CI and local runs agree without a persisted
// counter to drift. It writes version.json and the matching
// <meta name="app-build"> in index.html, so a returning visitor's page can
// notice a newer build is live and refresh. Node built-ins only — no toolchain.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const vfile = path.join(root, 'version.json');
const index = path.join(root, 'index.html');

let cur = { version: '1.0.0', build: 0 };
try { cur = JSON.parse(fs.readFileSync(vfile, 'utf8')); } catch { /* first run */ }

// Build = total commit count (monotonic). Falls back to an increment if git
// history isn't available (e.g. a shallow checkout without fetch-depth: 0).
let build;
try {
  build = parseInt(execSync('git rev-list --count HEAD', { cwd: root }).toString().trim(), 10);
  if (!Number.isFinite(build) || build <= 0) throw new Error('bad count');
} catch {
  build = (parseInt(cur.build, 10) || 0) + 1;
}

const released = new Date().toISOString();
let commit = '';
try { commit = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim(); } catch { /* not a repo */ }

const next = { version: cur.version || '1.0.0', build, released, commit };
fs.writeFileSync(vfile, JSON.stringify(next, null, 2) + '\n');

// Keep index.html's baked-in build in lockstep with version.json.
let html = fs.readFileSync(index, 'utf8');
const tag = `<meta name="app-build" content="${build}" />`;
if (/<meta name="app-build"[^>]*>/.test(html)) {
  html = html.replace(/<meta name="app-build"[^>]*>/, tag);
} else {
  html = html.replace(/(<meta name="robots"[^>]*>\n)/, `$1${tag}\n`);
}
fs.writeFileSync(index, html);

console.log(`stamped build ${build}${commit ? ' @ ' + commit : ''} — ${released}`);
