# E2E Testing Guidelines

## Critical Rules

**ALL E2E tests must use real example pages!** Never mock or inject content in E2E tests.

❌ **NEVER** use `page.route()` to inject mock HTML
✅ **ALWAYS** test real pages from `examples/app-router-showcase/app/`

## Commands

```bash
pnpm build          # This must be run first to compile the library
pnpm test:e2e       # Run all E2E tests
pnpm test:e2e:ui    # Run with UI mode
pnpm example:dev    # Start example app on localhost:3001
```

## Test Structure

1. **Navigate to real page**: `await page.goto("/article")`
2. **Extract JSON-LD**: Use `page.locator('script[type="application/ld+json"]')`
3. **Verify properties**: Test all expected Schema.org properties

## Important Patterns

### Security Testing

- DO NOT add escape/security tests to individual component tests
- Security testing is handled centrally in `security.e2e.spec.ts`
- Focus on component-specific functionality only

### Creating New Tests

For each new component E2E test:

1. Create example pages in `examples/app-router-showcase/app/`
2. Create test file: `[component]JsonLd.e2e.spec.ts`
3. Add validation test in `jsonValidation.e2e.spec.ts`

### Example Pages Required

- Basic usage (minimal props)
- Advanced usage (all features)
- Each schema type variation
- Special characters test (if applicable)

## Test Pattern

```typescript
test("renders basic [Component] structured data", async ({ page }) => {
  // Navigate to real example page
  await page.goto("/[component]");

  const jsonLdScript = await page
    .locator('script[type="application/ld+json"]')
    .textContent();

  const jsonData = JSON.parse(jsonLdScript!);

  // Verify properties
  expect(jsonData["@context"]).toBe("https://schema.org");
  expect(jsonData["@type"]).toBe("[Type]");
  // ... test all properties
});
```

## Notes

- Tests run against example app on port 3001
- Example app auto-starts for E2E tests
- Focus on testing actual rendered output
- Verify JSON validity and structure
