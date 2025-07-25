# Adding New Components to Next SEO

This guide walks through the process of adding new JSON-LD structured data components to next-seo. We'll use the ArticleJsonLd component as a reference implementation.

## Table of Contents

1. [Research Phase](#1-research-phase)
2. [Type Definitions](#2-type-definitions)
3. [Component Implementation](#3-component-implementation)
4. [Export Configuration](#4-export-configuration)
5. [Unit Tests](#5-unit-tests)
6. [Documentation](#6-documentation)
7. [Example Pages](#7-example-pages)
8. [E2E Tests](#8-e2e-tests)
9. [Final Verification](#9-final-verification)

## 1. Research Phase

Before implementing, thoroughly research the structured data specification:

1. **Visit Google's Documentation**

   - Go to [Google's Structured Data Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
   - Find the specific type you're implementing (e.g., Article, Product, Recipe)
   - Note all required and recommended properties

2. **Analyze Schema Types**

   - Identify all subtypes (e.g., Article has NewsArticle, BlogPosting, Blog)
   - Note property variations between types
   - Check for special formatting requirements (dates, images, etc.)

3. **Review Existing Implementation**
   - If updating from an older version, fetch the previous implementation
   - Identify any missing features or properties
   - Ensure backward compatibility where possible

## 2. Type Definitions

Create comprehensive TypeScript types in `src/types/[component].types.ts`:

```typescript
// src/types/article.types.ts
import type { ImageObject, Person, Organization, Author } from "./common.types";

// Note: Common types like ImageObject, Person, Organization, and Author
// are now defined in common.types.ts to avoid duplication

// Base interface with common properties
export interface ArticleBase {
  headline: string;
  url?: string;
  author?: Author | Author[];
  datePublished?: string;
  dateModified?: string;
  image?: string | ImageObject | (string | ImageObject)[];
  publisher?: Organization;
  description?: string;
  isAccessibleForFree?: boolean;
  mainEntityOfPage?:
    | string
    | {
        "@type": "WebPage";
        "@id": string;
      };
}

// Specific schema type interfaces
export interface Article extends ArticleBase {
  "@type": "Article";
}

export interface NewsArticle extends ArticleBase {
  "@type": "NewsArticle";
}

export interface BlogPosting extends ArticleBase {
  "@type": "BlogPosting";
}

// Component props type
export type ArticleJsonLdProps = (
  | Omit<Article, "@type">
  | Omit<NewsArticle, "@type">
  | Omit<BlogPosting, "@type">
) & {
  type?: "Article" | "NewsArticle" | "BlogPosting";
  scriptId?: string;
  scriptKey?: string;
};
```

### Key Patterns:

- Use union types for flexible inputs (e.g., `string | Person | Organization`)
- Support both single items and arrays where appropriate
- Extend common interfaces to reduce duplication
- Make all properties optional except truly required ones
- Include component-specific props like `scriptId` and `scriptKey`
- **Important**: Reuse types from `common.types.ts` for shared definitions like `ImageObject`, `Person`, `Organization`, and `Author`

### The @type Optional Pattern

A core design principle of next-seo is that developers should not need to specify `@type` properties manually. This provides better developer experience while maintaining full Schema.org compliance.

#### How It Works:

1. **Type Definitions**: Use `Omit<Type, "@type">` to create props that don't require `@type`:

   ```typescript
   export type ArticleJsonLdProps = (
     | Omit<Article, "@type">
     | Omit<NewsArticle, "@type">
     | Omit<BlogPosting, "@type">
   ) & {
     type?: "Article" | "NewsArticle" | "BlogPosting";
     // ... other props
   };
   ```

2. **Process Functions**: Automatically add the correct `@type` based on input:

   ```typescript
   // Developers can pass a simple string
   author="John Doe"

   // Process function converts it to a proper Person object
   processAuthor("John Doe") // → { "@type": "Person", name: "John Doe" }

   // Or pass an object without @type
   author={{ name: "John Doe", url: "https://example.com" }}

   // Process function adds @type intelligently
   processAuthor({...}) // → { "@type": "Person", name: "John Doe", url: "..." }
   ```

3. **Intelligent Type Detection**: Process functions use property analysis to determine types:
   - Objects with `logo`, `address`, or `contactPoint` → Organization
   - Objects with `familyName` or `givenName` → Person
   - Default fallbacks ensure valid Schema.org output

#### Benefits:

- **Less Boilerplate**: Developers don't need to remember Schema.org type names
- **Flexible Input**: Accept strings, objects with/without `@type`
- **Type Safety**: Full TypeScript support throughout
- **Forward Compatible**: Can still accept objects with `@type` if provided

## 3. Component Implementation

Create the component in `src/components/[Component]JsonLd.tsx`:

```typescript
// src/components/ArticleJsonLd.tsx
import { JsonLdScript } from "~/core/JsonLdScript";
import type { ArticleJsonLdProps } from "~/types/article.types";
import { processAuthor, processImage } from "~/utils/processors";

// Note: Common processing functions like processAuthor and processImage
// are now available in ~/utils/processors.ts to avoid duplication

export default function ArticleJsonLd({
  type = "Article",
  scriptId,
  scriptKey,
  headline,
  url,
  author,
  datePublished,
  dateModified,
  image,
  publisher,
  description,
  isAccessibleForFree,
  mainEntityOfPage,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    ...(url && { url }),
    ...(author && {
      author: Array.isArray(author)
        ? author.map(processAuthor)
        : processAuthor(author),
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    // Apply defaults where appropriate
    ...(!dateModified && datePublished && { dateModified: datePublished }),
    ...(image && {
      image: Array.isArray(image) ? image.map(processImage) : processImage(image),
    }),
    ...(publisher && { publisher }),
    ...(description && { description }),
    ...(isAccessibleForFree !== undefined && { isAccessibleForFree }),
    ...(mainEntityOfPage && { mainEntityOfPage }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || `article-jsonld-${type}`}
    />
  );
}

export type { ArticleJsonLdProps };
```

### Implementation Guidelines:

- Use the existing `JsonLdScript` component for rendering (now with TypeScript generics support)
- Process flexible inputs to proper schema format using shared utilities from `~/utils/processors`
- Use object spread with conditional inclusion for optional properties
- Handle arrays appropriately with `.map()`
- Apply sensible defaults (e.g., dateModified defaults to datePublished)
- Ensure boolean values are explicitly checked with `!== undefined`
- **Always use process functions** for properties that accept flexible types (strings, objects with/without `@type`)
- **Never require developers to specify `@type`** - the component should set the main `@type` from the `type` prop, and process functions should handle nested objects

## 4. Export Configuration

Update `src/index.ts` to export your component:

```typescript
export { JsonLdScript } from "./core/JsonLdScript";
export {
  default as ArticleJsonLd,
  type ArticleJsonLdProps,
} from "./components/ArticleJsonLd";
// Add your new component here
export const version = "7.0.0-alpha.0";
```

## 5. Unit Tests

Create comprehensive tests in `src/components/[Component]JsonLd.test.tsx`:

```typescript
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArticleJsonLd from "./ArticleJsonLd";

describe("ArticleJsonLd", () => {
  it("renders basic Article with minimal props", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        datePublished="2024-01-01T00:00:00.000Z"
      />
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Test Article",
      datePublished: "2024-01-01T00:00:00.000Z",
      dateModified: "2024-01-01T00:00:00.000Z", // defaults to datePublished
    });
  });

  // Test each schema type
  it("renders NewsArticle type when specified", () => {
    // ... test implementation
  });

  // Test flexible inputs
  it("handles string author", () => {
    // ... converts string to Person object
  });

  it("handles multiple authors", () => {
    // ... test array handling
  });

  // Test all properties
  it("handles all optional properties", () => {
    // ... comprehensive test with all props
  });

  // Test edge cases
  it("handles isAccessibleForFree as false", () => {
    // ... ensure boolean false is included
  });
});
```

### Testing Checklist:

- ✅ Basic rendering with minimal props
- ✅ All schema type variations
- ✅ String to object conversions
- ✅ Array handling for authors and images
- ✅ All optional properties
- ✅ Default value application
- ✅ Boolean value handling
- ✅ Custom scriptId and scriptKey

## 6. Documentation

Add comprehensive documentation to `README.md`:

````markdown
### ArticleJsonLd

The `ArticleJsonLd` component helps you add structured data for articles, blog posts, and news articles to improve their appearance in search results.

#### Basic Usage

```tsx
import { ArticleJsonLd } from "next-seo";

<ArticleJsonLd
  headline="My Amazing Article"
  datePublished="2024-01-01T08:00:00+08:00"
  author="John Doe"
  image="https://example.com/article-image.jpg"
  description="This article explains amazing things"
/>;
```
````

#### Props

| Property   | Type                                          | Description                                |
| ---------- | --------------------------------------------- | ------------------------------------------ |
| `type`     | `"Article" \| "NewsArticle" \| "BlogPosting"` | The type of article. Defaults to "Article" |
| `headline` | `string`                                      | **Required.** The headline of the article  |
| ...        | ...                                           | ...                                        |

#### Best Practices

1. **Always include images**: Google recommends multiple aspect ratios
2. **Use ISO 8601 dates**: Include timezone information
3. **Multiple authors**: List all authors when applicable

````

## 7. Example Pages

Create example pages in `examples/app-router-showcase/app/[component]/page.tsx`:

```tsx
import { ArticleJsonLd } from "next-seo";

export default function ArticlePage() {
  return (
    <div className="container mx-auto p-8">
      <ArticleJsonLd
        headline="Understanding Next.js App Router"
        url="https://example.com/articles/nextjs-app-router"
        datePublished="2024-01-01T08:00:00+00:00"
        author="Sarah Johnson"
        image="https://example.com/images/nextjs-article.jpg"
        description="A comprehensive guide to Next.js App Router"
      />

      <article className="prose lg:prose-xl">
        <h1>Understanding Next.js App Router</h1>
        {/* Article content */}
      </article>
    </div>
  );
}
````

Create examples for:

- Basic usage (minimal props)
- Advanced usage (all features)
- Each schema type variation

## 8. E2E Tests

Create Playwright tests in `tests/e2e/[component]JsonLd.e2e.spec.ts`:

### Important E2E Testing Guidelines

**ALL E2E tests must use real example pages!** E2E tests should test the actual component behavior through real pages in the example app. Never mock or inject content in E2E tests.

❌ **DO NOT** use `page.route()` to inject mock HTML:

```typescript
// BAD - This is not a real E2E test!
await page.route("/test-page", async (route) => {
  await route.fulfill({
    body: `<html>...</html>`,
  });
});
```

✅ **DO** create real example pages and test them:

```typescript
// GOOD - Test real pages with actual components
await page.goto("/article");
```

### Creating E2E Tests

For every E2E test scenario, you must:

1. Create a real example page in `examples/app-router-showcase/app/`
2. Write the E2E test to navigate to that page
3. Test the actual rendered output

```typescript
import { test, expect } from "@playwright/test";

test.describe("ArticleJsonLd", () => {
  test("renders basic Article structured data", async ({ page }) => {
    // Navigate to the real example page
    await page.goto("/article");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify all properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Article");
    expect(jsonData.headline).toBe("Understanding Next.js App Router");
    // ... test all properties
  });

  test("properly escapes HTML entities in content", async ({ page }) => {
    // Navigate to a real example page with special characters
    await page.goto("/article-special-chars");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    // Verify JSON is valid and content is properly escaped
    const jsonData = JSON.parse(jsonLdScript!);
    expect(jsonData.headline).toContain("Special & Characters");

    // Check that dangerous content is escaped in the raw JSON
    expect(jsonLdScript).toContain("\\u003C/script>");
  });
});
```

### When to Create Additional Example Pages

Create new example pages for:

- Basic usage with minimal props
- Advanced usage with all features
- Each schema type variation (e.g., Article, NewsArticle, BlogPosting)
- Special characters and HTML entities
- Edge cases with unusual data
- Different data combinations

Example structure:

```
examples/app-router-showcase/app/
├── article/                    # Basic article example
├── article-advanced/           # All features
├── news-article/              # NewsArticle type
├── blog-posting/              # BlogPosting type
└── article-special-chars/     # Special characters test
```

You should also add a valid JSON test in `tests/e2e/jsonValidation.e2e.spec.ts`

### Security and Escaping Tests

**DO NOT add escape/security tests to individual component E2E tests!**

Security testing for escaping dangerous sequences (like `</script>`, HTML comments, etc.) is handled centrally in `tests/e2e/security.e2e.spec.ts`. This test file comprehensively covers:

- Script tag injection prevention
- HTML comment escaping
- Edge cases with mixed dangerous patterns
- Safe rendering in Next.js-like environments

Individual component E2E tests should focus on:

- Component-specific functionality
- Correct data structure output
- Schema type variations
- Required and optional properties

The escaping functionality is a core library feature handled by the `stringify` utility, not something each component needs to test individually.

## 9. Final Verification

Before completing, run all quality checks:

```bash
# 1. Run unit tests
pnpm test:unit

# 2. Type checking
pnpm typecheck

# 3. Linting
pnpm lint

# 4. Build the package
pnpm build
```

Developer will run e2e manually as they can take a long time.

## Common Patterns and Best Practices

### Shared Utilities

The library now provides shared utilities to avoid code duplication:

1. **Common Types** (`~/types/common.types.ts`):

   - `ImageObject`, `Person`, `Organization`, `Author`
   - Base interfaces like `Thing`

2. **Processing Functions** (`~/utils/processors.ts`):

   - `processAuthor(author: Author): Person | Organization`
   - `processImage(image: string | ImageObject): string | ImageObject`

### Flexible Input Processing

Use the shared processing functions from `~/utils/processors`:

```typescript
import { processAuthor, processImage } from "~/utils/processors";

// These functions handle string-to-object conversions automatically
// and add the appropriate @type without developers needing to specify it
```

**Important**: Always create or use existing process functions for properties that can accept multiple formats. This maintains the pattern of not requiring developers to specify `@type` and ensures consistent behavior across all components.

### Conditional Property Inclusion

Use object spread with conditional checks:

```typescript
const data = {
  "@context": "https://schema.org",
  "@type": type,
  headline,
  ...(url && { url }), // Only include if truthy
  ...(isAccessibleForFree !== undefined && { isAccessibleForFree }), // Include false values
};
```

### Default Values

Apply sensible defaults where appropriate:

```typescript
// If dateModified is not provided but datePublished is, use datePublished
...(!dateModified && datePublished && { dateModified: datePublished }),
```

### Array Handling

Support both single items and arrays:

```typescript
...(author && {
  author: Array.isArray(author)
    ? author.map(processAuthor)
    : processAuthor(author),
}),
```

## Troubleshooting

### Common Issues

1. **ESLint errors about unused React import**

   - Remove `import React from 'react'` - it's not needed with modern JSX transform

2. **Test failures with dateModified**

   - Remember that dateModified defaults to datePublished when not provided

3. **Boolean properties not appearing**

   - Use `!== undefined` check instead of truthy check for booleans

4. **Type errors with union types**
   - Ensure proper type guards in processing functions

## Checklist for New Components

- [ ] Research Google's structured data documentation
- [ ] Create comprehensive type definitions (reuse common types from `common.types.ts`)
- [ ] Implement component using shared utilities from `~/utils/processors`
- [ ] Update exports in src/index.ts
- [ ] Write unit tests covering all scenarios
- [ ] Add documentation to README.md
- [ ] Create example pages for each variation
- [ ] Write E2E tests (Double check guidelines!)
- [ ] Run all quality checks (full sweep can be done via `pnpm test:sweep`)
- [ ] Ensure backward compatibility if updating existing component
- [ ] Check if any new processing functions should be added to shared utilities
