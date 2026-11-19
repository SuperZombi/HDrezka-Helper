#!/usr/bin/env node
/**
 * Builds the HDrezka Helper extension for Chrome and/or Firefox.
 *
 * Every browser target consists of the shared sources in `src/` plus the
 * browser-specific `manifest.json` from `chrome/` or `firefox/`.
 *
 * Usage:
 *   node scripts/build.mjs            # build all targets
 *   node scripts/build.mjs chrome     # build a single target
 *   node scripts/build.mjs --clean    # remove the dist folder
 *
 * Output (dist/):
 *   <browser>/                       unpacked extension, ready to load in the browser
 *   hdrezka-helper-<browser>-v<ver>.zip
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ZipArchive } from 'archiver';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'src');
const DIST_DIR = path.join(ROOT, 'dist');

const TARGETS = {
  chrome: path.join(ROOT, 'chrome', 'manifest.json'),
  firefox: path.join(ROOT, 'firefox', 'manifest.json'),
};

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--clean')) {
    await clean();
    console.log(`Removed ${path.relative(ROOT, DIST_DIR)}/`);
    return;
  }

  const requested = args.filter((arg) => !arg.startsWith('--'));
  const targets = requested.length > 0 ? requested : Object.keys(TARGETS);

  const unknown = targets.filter((target) => !TARGETS[target]);
  if (unknown.length > 0) {
    fail(`Unknown target(s): ${unknown.join(', ')}. Available: ${Object.keys(TARGETS).join(', ')}`);
  }

  await clean();

  const versions = new Map();
  for (const target of targets) {
    const version = await buildTarget(target);
    versions.set(target, version);
  }

  const uniqueVersions = new Set(versions.values());
  if (uniqueVersions.size > 1) {
    console.warn(
      `Warning: manifests use different versions (${[...versions].map(([t, v]) => `${t}: ${v}`).join(', ')}).`,
    );
  }
}

async function buildTarget(target) {
  const manifestPath = TARGETS[target];
  const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));

  if (!manifest.version) {
    fail(`${path.relative(ROOT, manifestPath)} has no "version" field`);
  }

  const outputDir = path.join(DIST_DIR, target);
  const archiveName = `hdrezka-helper-${target}-v${manifest.version}.zip`;
  const archivePath = path.join(DIST_DIR, archiveName);

  await fs.promises.mkdir(outputDir, { recursive: true });
  await fs.promises.cp(SRC_DIR, outputDir, { recursive: true });
  await fs.promises.copyFile(manifestPath, path.join(outputDir, 'manifest.json'));

  await zipDirectory(outputDir, archivePath);

  const size = (await fs.promises.stat(archivePath)).size;
  console.log(
    `[${target}] ${path.relative(ROOT, outputDir)} + ${path.relative(ROOT, archivePath)} (${formatSize(size)})`,
  );

  return manifest.version;
}

function zipDirectory(sourceDir, destination) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(destination);
    const archive = new ZipArchive({ zlib: { level: 9 } });

    output.on('close', resolve);
    output.on('error', reject);
    archive.on('warning', (error) => {
      if (error.code === 'ENOENT') {
        console.warn(error.message);
      } else {
        reject(error);
      }
    });
    archive.on('error', reject);

    archive.pipe(output);
    // Add the folder contents, not the folder itself, so manifest.json is at the zip root.
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

async function clean() {
  await fs.promises.rm(DIST_DIR, { recursive: true, force: true });
}

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
