import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";
import vercel from "@astrojs/vercel";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  site: "https://apuraleña.com.ar",
  favicon: "/favicon.ico",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(),
      customPages: [
        "https://apuraleña.com.ar/eventos/eventos-sociales",
        "https://apuraleña.com.ar/eventos/casamientos",
        "https://apuraleña.com.ar/eventos/eventos-corporativos",
        "https://apuraleña.com.ar/eventos/evento-masivo",
        "https://apuraleña.com.ar/eventos/team-building",
        "https://apuraleña.com.ar/eventos/jornadas-y-experiencias-unicas",
      ],
    }),
    sanity({
      projectId: "pjb8t9c1",
      dataset: "production",
      useCdn: true,
      studioBasePath: "/admin",
    }),
    react(),
  ],

  vite: {
    cacheDir: path.join(os.tmpdir(), "vite-web-apl"),
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      holdUntilCrawlEnd: false,
    },
  },
  server: { port: 4321 },
  output: "server",
  adapter: vercel(),
});
