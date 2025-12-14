import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/icon-192.png", "icons/icon-512.png"],
      manifest: {
        name: "処世術禄（Shoseijutsu OS）",
        short_name: "処世術禄",
        description: "5つのOS・195の項目に集約した処世術の体系書",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#070A12",
        theme_color: "#070A12",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,webmanifest,json}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/data/"),
            handler: "CacheFirst",
            options: {
              cacheName: "shoseijutsu-data",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    host: true
  }
});
