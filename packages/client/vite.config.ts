import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: { host: true, port: 8080 },
  plugins: [react()],
});