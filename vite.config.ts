import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // RECTIFIED: Change base to './' to ensure assets load correctly on Cloudflare/HF
  base: './', 
  
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'built-theory.com', 
      'soumyadipmondal2165-built-theory-pro.hf.space',
      'localhost',
      '.hf.space' // All Hugging Face spaces
    ]
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },

  preview: {
    port: 4173,
    host: '0.0.0.0',
    allowedHosts: true
  },
  
  resolve: {
    alias: { 
      '@': path.resolve(__dirname, './src') 
    }
  }
});
