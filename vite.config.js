import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// StitchBook Enterprise v2 dev server.
// Binds to all interfaces so the sandboxed live preview can reach it.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
});
