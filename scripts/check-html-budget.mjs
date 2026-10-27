import { readdir, readFile } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

export const BUDGET = 14_000;
// Ratchet these down after reductions; never update them from build output automatically.
export const EXCEPTIONS = {
  '/case-studies/astra/': { gzip: 16_239, brotli: 16_538 },
  '/case-studies/firefly/': { gzip: 14_441, brotli: 14_612 },
  '/case-studies/aurora-design-system/': { gzip: 13_778, brotli: 14_188 },
};

export function budgetStatus({ route, gzip, brotli }, exceptions = EXCEPTIONS) {
  const ceiling = Object.hasOwn(exceptions, route) ? exceptions[route] : undefined;
  if (ceiling && (gzip > ceiling.gzip || brotli > ceiling.brotli)) return 'FAIL';
  if (gzip <= BUDGET && brotli <= BUDGET) return 'PASS';
  return ceiling ? 'EXCEPTION' : 'FAIL';
}

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }
  return files.sort();
}

export async function inspectBuild(directory, exceptions = EXCEPTIONS) {
  const files = await htmlFiles(directory);
  if (!files.length) throw new Error(`No generated HTML found in ${directory}`);
  const rows = [];
  for (const file of files) {
    const path = relative(directory, file).split(sep).join('/');
    const route = '/' + path.replace(/(^|\/)index\.html$/, '$1');
    const html = await readFile(file);
    const row = {
      route,
      raw: html.length,
      gzip: gzipSync(html, { level: 5 }).length,
      brotli: brotliCompressSync(html, {
        params: { [constants.BROTLI_PARAM_QUALITY]: 3 },
      }).length,
    };
    rows.push({ ...row, status: budgetStatus(row, exceptions) });
  }
  return rows;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const rows = await inspectBuild(fileURLToPath(new URL('../dist/', import.meta.url)));
    console.log(`HTML body budget: ${BUDGET} bytes per encoding (gzip level 5, Brotli quality 3)`);
    console.table(rows);
    const failures = rows.filter(({ status }) => status === 'FAIL');
    if (failures.length) {
      console.error(`HTML budget failed for ${failures.length} route(s). See docs/html-performance-budget.md.`);
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(`HTML budget check failed: ${error.message}`);
    process.exitCode = 1;
  }
}
