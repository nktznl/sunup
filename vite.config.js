import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

const getFiles = (dir, ext) =>
  fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(ext))
    .reduce((files, file) => {
      files[path.parse(file).name] = path.resolve(dir, file);
      return files;
    }, {});

const jsFiles = getFiles(path.resolve(__dirname, "src/js"), ".js");
const scssFiles = getFiles(path.resolve(__dirname, "src/scss"), ".scss");

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ...jsFiles,
        ...scssFiles,
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].css",
        dir: path.resolve(__dirname, "assets"),
      },
    },
    outDir: "assets",
    assetsDir: "", // Prevent Vite from creting a folder inside assets
    emptyOutDir: false,
    watch: {},
  },
});
