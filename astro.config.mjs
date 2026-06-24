// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Served from GitHub Pages at https://spewil.github.io/tuff/
// When a custom domain is added, set site to the domain and base to '/'.
export default defineConfig({
  site: 'https://spewil.github.io',
  base: '/tuff',
});
