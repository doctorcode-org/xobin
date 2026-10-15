import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist/browser-fixture');
await mkdir(output, { recursive: true });
await build({ entryPoints: [path.join(root, 'tests/browser/fixture.mjs')], bundle: true,
    splitting: true, format: 'esm', platform: 'browser', target: 'es2022', outdir: output,
    chunkNames: 'chunks/[name]-[hash]', logLevel: 'silent' });
createServer(async (request, response) => {
    try {
        const url = new URL(request.url, 'http://127.0.0.1:4179');
        if (url.pathname === '/') {
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end('<!doctype html><html><head><meta charset="utf-8"></head><body><script type="module">import * as api from "/fixture.js"; window.xobin = api;</script></body></html>');
            return;
        }
        const file = path.resolve(output, '.' + decodeURIComponent(url.pathname));
        if (!file.startsWith(output + path.sep)) { response.writeHead(403); response.end(); return; }
        const body = await readFile(file);
        response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
        response.end(body);
    } catch { response.writeHead(404); response.end(); }
}).listen(4179, '127.0.0.1', () => console.log('Browser fixture ready.'));
