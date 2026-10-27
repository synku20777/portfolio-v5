import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';
import { BUDGET, budgetStatus, inspectBuild } from './check-html-budget.mjs';

test('both encodings include the 14,000-byte boundary', () => {
  const row = { route: '/', gzip: BUDGET, brotli: BUDGET };
  assert.equal(budgetStatus(row), 'PASS');
  assert.equal(budgetStatus({ ...row, gzip: BUDGET + 1 }), 'FAIL');
  assert.equal(budgetStatus({ ...row, brotli: BUDGET + 1 }), 'FAIL');
});

test('exceptions permit their ceilings but reject growth in either encoding', () => {
  const exceptions = { '/study/': { gzip: 15_000, brotli: 16_000 } };
  const row = { route: '/study/', ...exceptions['/study/'] };
  assert.equal(budgetStatus(row, exceptions), 'EXCEPTION');
  assert.equal(budgetStatus({ ...row, gzip: 15_001 }, exceptions), 'FAIL');
  assert.equal(budgetStatus({ ...row, brotli: 16_001 }, exceptions), 'FAIL');
  assert.equal(budgetStatus({ ...row, gzip: BUDGET, brotli: BUDGET }, exceptions), 'PASS');
  assert.equal(budgetStatus({ ...row, route: '/new-study/' }, exceptions), 'FAIL');
});

test('every HTML file is measured, including redirects and flat routes', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'html-budget-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(join(directory, 'redirect'));
  const html = '<!doctype html><title>Fixture</title>'.repeat(100);
  await Promise.all(['index.html', 'redirect/index.html', '404.html'].map(file =>
    writeFile(join(directory, file), html)));
  await writeFile(join(directory, 'ignored.txt'), 'not HTML');
  const rows = await inspectBuild(directory, {});
  assert.deepEqual(rows.map(row => row.route).sort(), ['/', '/404.html', '/redirect/']);
  for (const row of rows) {
    assert.equal(row.raw, Buffer.byteLength(html));
    assert.equal(row.gzip, gzipSync(html, { level: 5 }).length);
    assert.equal(row.brotli, brotliCompressSync(html, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 3 },
    }).length);
    assert.equal(row.status, 'PASS');
  }
});

test('missing or empty build output fails', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'html-budget-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await assert.rejects(inspectBuild(join(directory, 'missing')), { code: 'ENOENT' });
  await assert.rejects(inspectBuild(directory), /No generated HTML/);
});
