// backend/vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "./src/index.ts",
    },
  },
  server: {
    port: 8000,
  },
});
