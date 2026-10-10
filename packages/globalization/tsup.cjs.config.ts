import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    date_time_styles: 'src/lib/date_time_styles.ts',
    date_time_format_info: 'src/date_time_format_info.ts',
  },
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
