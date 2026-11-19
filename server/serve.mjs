#!/usr/bin/env node
// Standalone viewer:  node server/serve.mjs [--port=47615] [--repo=<git repo>] [--content=<dir>]
//   --repo     repository holding the tub-* edition tags (default: this project)
//   --content  serve a plain content/ folder as a single working edition (for authoring previews)
import path from 'node:path';
import { createApp, listen, CODE_ROOT } from './app.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
const app = createApp({
  repoRoot: args.repo ? path.resolve(args.repo) : CODE_ROOT,
  contentDir: args.content ? path.resolve(args.content) : undefined,
});
const { server, url } = await listen(app, { port: Number(args.port || 47615) });
const info = await app.store.editions();
console.log(`GitHub Technical Update Briefing · ${info.mode} mode · ${info.editions.length} edition(s) · latest ${info.latest.asof}`);
console.log(url);
const stop = () => { app.close(); server.close(() => process.exit(0)); setTimeout(() => process.exit(0), 500).unref(); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
