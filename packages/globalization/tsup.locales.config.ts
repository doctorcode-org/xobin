import { defineConfig } from 'tsup';

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
});
