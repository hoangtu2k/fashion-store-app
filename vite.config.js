import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@contexts': path.resolve(__dirname, 'src/contexts')
    }
  }
});