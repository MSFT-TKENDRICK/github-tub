import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp, listen } from '../server/app.mjs';
import { createClaim, createSource } from '../tools/lib/claims.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const quote = 'GitHub Copilot Business includes code completion for Java developers.';

test('PowerPoint export requires same-origin token and returns a linked deck', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tub-export-'));
  const content = path.join(root, 'content');
  const source = createSource({
    url: 'https://github.blog/changelog/copilot-example/', kind: 'changelog', publisher: 'GitHub',
    title: 'Copilot example', published: '2026-10-12', via: 'html', text: quote,
    check: { ok: true, status: 200, at: '2026-11-05T00:00:00.000Z' },
  });
  const claim = createClaim({ sid: source.id, text: quote, quote, type: 'feature' });
  const item = {
    id: 'copilot-example', date: source.published, section: 'copilot', area: 'copilot', tag: 'Release',
    tier: 'headline', source: 'changelog', title: source.title, url: source.url,
    claims: [claim.id], summary: `${quote}[^${claim.id}]`,
  };
  await mkdir(path.join(content, 'items'), { recursive: true });
  await mkdir(path.join(content, 'sources'), { recursive: true });
  await mkdir(path.join(content, 'claims'), { recursive: true });
  await writeFile(path.join(content, 'taxonomy.json'), JSON.stringify({
    sections: [{ id: 'copilot', name: 'GitHub Copilot', order: 0 }],
    areas: [{ id: 'copilot', name: 'GitHub Copilot' }], ides: [], stages: [],
  }));
  await writeFile(path.join(content, 'items', '2026-10.json'), JSON.stringify([item]));
  await writeFile(path.join(content, 'sources', '2026-10.json'), JSON.stringify([source]));
  await writeFile(path.join(content, 'claims', '2026-10.json'), JSON.stringify([claim]));

  const app = createApp({ codeRoot: ROOT, repoRoot: root, contentDir: content });
  const { server, url } = await listen(app);
  t.after(async () => {
    app.close();
    await new Promise((resolve) => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  });

  assert.equal((await fetch(new URL('/api/export-token', url))).status, 403);
  const origin = new URL(url).origin;
  const tokenResponse = await fetch(new URL('/api/export-token', url), { headers: { Origin: origin } });
  assert.equal(tokenResponse.status, 200);
  const { token } = await tokenResponse.json();
  const response = await fetch(new URL('/api/export', url), {
    method: 'POST',
    headers: {
      Origin: origin, 'Content-Type': 'application/json', 'X-TUB-Export-Token': token,
    },
    body: JSON.stringify({ ref: 'working', view: 'month', key: '2026-10', sections: [] }),
  });
  const errorBody = response.status === 200 ? '' : await response.text();
  assert.equal(response.status, 200, errorBody);
  assert.match(response.headers.get('content-type'), /presentation/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 2).toString('ascii'), 'PK');
});
