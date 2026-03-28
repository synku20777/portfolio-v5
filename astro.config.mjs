import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from 'url';

export default defineConfig({
  output: 'static',
  site: 'https://nestux.site',
  integrations: [
    react(),
    mdx(),
    sitemap(),
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