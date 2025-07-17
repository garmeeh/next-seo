// tests/e2e/jsonLdScript.e2e.spec.ts
import { test, expect } from "@playwright/test";

const PAGE_URL = "/jsonld-test-page"; // The path to your test page in the example app
const SCRIPT_SELECTOR = 'script[type="application/ld+json"]#e2e-jsonld-script'; // More specific selector

test.describe("JsonLdScript E2E Test", () => {
  test("should render the JSON-LD script tag with correct content", async ({
    page,
  }) => {
    // 1. Navigate to the page
    await page.goto(PAGE_URL);

    // 2. Locate the script tag
    const scriptHandle = await page.waitForSelector(SCRIPT_SELECTOR, {
      state: "attached",
    });
    expect(scriptHandle).toBeTruthy();

    // 3. Extract its content
    const scriptContent = await scriptHandle.innerHTML();
    expect(scriptContent).toBeTruthy();

    // 4. Perform assertions
    let jsonData;
    try {
      jsonData = JSON.parse(scriptContent);
    } catch (e) {
      // Fail the test if JSON is invalid
      expect(e, "Script content should be valid JSON").toBeNull();
    }

    // Basic content checks
    expect(jsonData, "JSON data should not be null or undefined").toBeTruthy();
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("WebPage"); // Matches the testData in the example page
    expect(jsonData.name).toBe("E2E Test Page for JSON-LD");
    expect(jsonData.description).toBe(
      "This page tests the JsonLdScript component.",
    );
    expect(jsonData.url).toBe("http://localhost:3001/jsonld-test-page");

    // You can add more specific checks based on the testData
    // For example, checking for the absence of unexpected properties
  });

  test("should not find the script if it has a different ID", async ({
    page,
  }) => {
    await page.goto(PAGE_URL);
    // Try to find a script with an ID that doesn't exist
    const nonExistentScript = page.locator(
      'script[type="application/ld+json"]#non-existent-id',
    );
    await expect(nonExistentScript).toHaveCount(0); // Expect no such element
  });

  // Later, you will use Ajv here for schema validation
  test.skip("TODO: should validate JSON-LD against a schema using Ajv", async ({
    page,
  }) => {
    await page.goto(PAGE_URL);
    const scriptHandle = await page.waitForSelector(SCRIPT_SELECTOR);
    const scriptContent = await scriptHandle.innerHTML();
    const jsonData = JSON.parse(scriptContent);

    // Placeholder for Ajv validation
    // const ajv = new Ajv();
    // const webPageSchema = require('../../schemas/webpage.schema.json'); // You'll create this
    // const validate = ajv.compile(webPageSchema);
    // const valid = validate(jsonData);
    // if (!valid) console.error(validate.errors);
    // expect(valid, `JSON-LD should be valid according to WebPage schema. Errors: ${JSON.stringify(validate.errors)}`).toBe(true);
    expect(jsonData).toBeTruthy(); // Keep a basic assertion for now
  });
});
