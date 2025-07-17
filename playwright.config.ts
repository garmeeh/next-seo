import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3001", // << MAKE SURE THIS MATCHES YOUR EXAMPLE APP'S PORT
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Command to start your example app
    command: "pnpm --filter ./examples/app-router-showcase dev --port 3001", // << ADJUST PORT IF NEEDED
    url: "http://localhost:3001", // << MAKE SURE THIS MATCHES
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
    timeout: 120 * 1000, // Increase timeout for webServer to start
  },
});
