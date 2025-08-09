import { defineConfig } from "tsup";
import path from "path";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    pages: "src/pages/index.ts",
  },
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  external: ["react", "next"],
  esbuildOptions(options) {
    options.alias = {
      "~": path.resolve(__dirname, "./src"),
    };
  },
});
