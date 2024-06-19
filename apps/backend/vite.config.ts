import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  server: {
    port: 8000,
    host: '0.0.0.0'
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/app.ts",
      exportName: "viteNodeApp",
      tsCompiler: "esbuild",
      swcOptions: {},
    }),
  ],
});
