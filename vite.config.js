import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/ReactApp/',  // 👈 This is your repo name
  plugins: [react()],
});
