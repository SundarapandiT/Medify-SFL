import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps in production
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"', // Force production mode
  },
  esbuild: {
    sourcemap: false, // Disable source maps in development
    minify: true, // Minify code in development
  },
});
