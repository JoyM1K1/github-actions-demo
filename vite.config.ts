/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.cjs',
    },
    target: 'node20',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "node",
    includeSource: ["**/*.{js,ts}"],
  },
});
