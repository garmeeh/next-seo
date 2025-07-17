import { defineConfig } from "tsup";
import path from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  external: ["react"],
  esbuildOptions(options) {
    options.alias = {
      "~": path.resolve(__dirname, "./src"),
    };
  },
});
