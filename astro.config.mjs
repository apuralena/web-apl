import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";
import vercel from "@astrojs/vercel";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  integrations: [
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
