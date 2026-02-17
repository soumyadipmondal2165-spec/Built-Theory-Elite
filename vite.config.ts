import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Add this section to allow the Render host
        allowedHosts: [
          'built-theory-elite.onrender.com',
          'built-theory.com',
          '.built-theory.com'
        ]
      },
      preview: {
        port: 4173,
        host: '0.0.0.0',
        // Also add here if you are using 'yarn preview'
        allowedHosts: [
          'built-theory-elite.onrender.com',
          'built-theory.com'
        ]
      },
      plugins: [react()],
      // ... rest of your config
    };
});
