import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    node: 'src/node.ts',
  },
  format: ['esm', 'cjs', 'iife'],
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  globalName: 'BaziCalculator',
  outDir: 'dist',
  splitting: false,
  treeshake: true,
  target: ['es2020', 'node16'],
  external: ['fs', 'path'],
  noExternal: ['alvamind-tools'],
  esbuildOptions(options) {
    options.banner = {
      js: '/* Bazi Calculator - https://github.com/alvamind/bazi-calculator-by-alvamind */',
    };
  },
});
