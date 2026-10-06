import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:8080",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [sitemap()],
});
