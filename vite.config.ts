import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/smart-study-scheduler-/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    process.env.NODE_ENV === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
