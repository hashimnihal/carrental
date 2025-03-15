import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures correct routing in production
  server: {
    port: 3000, // Change if needed
  },
  build: {
    outDir: 'dist', // Default output folder
  }
});


