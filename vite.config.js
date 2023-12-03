import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/js",
    rollupOptions: {
      input: {
        script: "src/js/script.js",
        top: "src/js/top.js",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
