import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { fileURLToPath } from 'url';
import viewTransitions from '@astrojs/view-transitions'; // Add this

export default defineConfig({
  integrations: [
    react(),
    viewTransitions(), // Add this
  ],
  vite: { 
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  },
});