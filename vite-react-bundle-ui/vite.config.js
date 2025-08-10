import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '', // Important for Shopify relative path
  plugins: [react()],
  build: {
    outDir: '../extensions/bundle-builder/assets', // Build file directly goes here
    emptyOutDir: true,
    rollupOptions: {
      input: './src/main.jsx',
      output: {
        entryFileNames: 'bundle-ui.js'
      }
    }
  }
});
