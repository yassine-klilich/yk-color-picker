// vite.config.js
import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";
import { cleandir } from "rollup-plugin-cleandir";
import fs from "fs";

// Read the version from package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
);
const version = packageJson.version;

export default defineConfig({
  build: {
    esbuild: {
      drop: ["console", "debugger"],
    },
    lib: {
      entry: "./src/index.ts",
    },
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      plugins: [cleandir("./dist")],
      output: [
        {
          format: "es",
          dir: `dist/esm2020-${version}`,
          entryFileNames: "yk-color-picker.js",
          preserveModules: false,
        },
        {
          format: "umd",
          dir: `dist/umd2020-${version}`,
          entryFileNames: "yk-color-picker.js",
          name: "YK",
          strict: true,
        },
      ],
    },
  },
  resolve: {
    alias: {
      "yk-color-picker": path.resolve(__dirname, "./src/yk-color-picker"),
    },
  },
  server: {
    open: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "dist",
      rollupTypes: true,
    }),
  ],
});
