import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: "https://cdoaas.com",
  base: "/",
  output: "static",
  // Specifiniai nustatymai admin panelei
  build: {
    format: 'directory',
    assets: 'assets'
  },
  vite: {
    build: {
      assetsInlineLimit: 0
    },
    assetsInclude: ['**/*.yml', '**/*.yaml'],
    server: {
      fs: {
        // Leisti vite pasiekti failus už projekto šakninio katalogo
        allow: ['..']
      }
    }
  }
});
