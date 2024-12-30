import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Ensure `global` is polyfilled to `globalThis`
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Enable polyfill for Buffer
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          Buffer: ['buffer', 'Buffer'], // Inject Buffer polyfill
        }),
      ],
    },
  },
});
