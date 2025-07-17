import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/unit/setup.ts",
    include: [
      "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "tests/unit/**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "coverage",
      "examples",
      "tests/e2e",
      "playwright-report",
      "repomix-output.xml",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage/unit",
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
