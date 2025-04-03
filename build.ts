import Bun from 'bun';

Bun.build({
  entrypoints: ['src/index.ts'],
  outdir: 'dist',
  naming: 'index.cjs',
  format: 'cjs',
  target: 'node',
  minify: false,
  define: {
    'import.meta.vitest': 'undefined',
  },
  // external: ['@actions/core', '@actions/github'],
}).catch((error) => {
  console.error('Build failed:', error);
});
