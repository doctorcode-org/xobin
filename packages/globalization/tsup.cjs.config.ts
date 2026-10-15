import { defineConfig } from 'tsup';
import { entry } from './tsup.entries';

export default defineConfig({
  entry,
  format: ['cjs'],
  outDir: 'dist',
  target: 'es2022',
  tsconfig: 'tsconfig.build.json',
  dts: true,
  clean: false,
  splitting: true,
  sourcemap: true,
  external: ['@xobin/core'],
});
