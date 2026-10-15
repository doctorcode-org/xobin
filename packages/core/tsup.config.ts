import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'internal/exception_format': 'src/lib/exception_format.ts',
    'internal/exception_resources': 'src/lib/exception_resources.ts',
  },
  format: ['cjs', 'esm'],
  outDir: 'dist',
  target: 'es2022',
  tsconfig: 'tsconfig.build.json',
  dts: true,
  clean: true,
  splitting: true,
  sourcemap: true,
});
