import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Add your domain name here
  site: "https://spinner-five.vercel.app/",
  integrations: [react()],
});