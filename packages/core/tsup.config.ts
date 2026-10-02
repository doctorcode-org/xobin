import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['cjs', 'esm'],
  outDir: 'dist',
  target: 'es2022',
  tsconfig: 'tsconfig.build.json',
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
});
