import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

// ESM পদ্ধতিতে __dirname তৈরি করা
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  
  // ক্লাউডফ্লেয়ার এবং হাগিং ফেসের জন্য রিলেটিভ পাথ
  base: './', 
  
  resolve: {
    alias: {
      // '@' সিম্বলকে src ফোল্ডারের সাথে কানেক্ট করা
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
});
