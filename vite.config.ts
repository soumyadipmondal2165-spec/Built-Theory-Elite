import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/', // Ensures assets load from the root
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: [
          'built-theory-elite.onrender.com',
          'built-theory.com'
        ]
      },
      preview: {
        port: 4173,
        host: '0.0.0.0',
        allowedHosts: true // Allows all hosts for the preview server
      },
      plugins: [react()],
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: { '@': path.resolve(__dirname, '.') }
      }
    };
});
