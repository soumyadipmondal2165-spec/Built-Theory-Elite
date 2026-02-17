import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0',
    allowedHosts: ['built-theory-elite.onrender.com', 'built-theory.com']
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    allowedHosts: true
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') } // Updated to point to /src
  }
});
