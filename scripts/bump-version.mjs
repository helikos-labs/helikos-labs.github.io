// Bumps the deploy version tracker. Run before each deploy:
//   node scripts/bump-version.mjs
// It increments the build number in version.json and writes the same build
// into index.html's <meta name="app-build">, so a returning visitor's page
// can notice a newer build is live and refresh. Node built-ins only — the
// site stays build-less (this is a manual pre-deploy step, not a toolchain).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const vfile = path.join(root, 'version.json');
const index = path.join(root, 'index.html');

let cur = { version: '1.0.0', build: 0 };
try { cur = JSON.parse(fs.readFileSync(vfile, 'utf8')); } catch { /* first run */ }

const build = (parseInt(cur.build, 10) || 0) + 1;
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
  // Insert right after the robots meta on first run.
  html = html.replace(/(<meta name="robots"[^>]*>\n)/, `$1${tag}\n`);
}
fs.writeFileSync(index, html);

console.log(`bumped to build ${build}${commit ? ' (prev ' + commit + ')' : ''} — ${released}`);
