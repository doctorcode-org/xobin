import { defineConfig } from 'tsup';
import { copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export default defineConfig({
  entry: ['locales/**/*.ts'],
  format: ['esm'],
  outDir: 'dist/locales',
  target: 'es2022',
  tsconfig: 'tsconfig.locales.json',
  bundle: false,
  dts: false,
  clean: false,
  sourcemap: false,
  // Match the module format when declarations resolve the public CultureData type.
  onSuccess: async () => {
    const directory = path.resolve('dist/locales');
    for (const file of await readdir(directory, { recursive: true })) {
      if (file.endsWith('.d.ts')) {
        await copyFile(path.join(directory, file), path.join(directory, file.replace(/\.d\.ts$/, '.d.mts')));
      }
    }
  },
});
