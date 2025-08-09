# Component Implementation Guidelines

## Critical Pattern: @type Optional

**NEVER require developers to specify `@type` properties!** This is core to next-seo's design.

### Implementation Rules

1. Component props use `Omit<Type, "@type">` to make `@type` optional
2. Process functions automatically add correct `@type` based on input
3. Accept flexible inputs: strings, objects with/without `@type`, arrays

### Example

```typescript
// Props definition
export type ArticleJsonLdProps = (
  | Omit<Article, "@type">
  | Omit<NewsArticle, "@type">
) & {
  type?: "Article" | "NewsArticle";
  // ...
};

// Component sets @type from type prop
const data = {
  "@context": "https://schema.org",
  "@type": type, // Set from prop, not user input
  // ...
};
```

## Component Structure

```typescript
// [Component]JsonLd.tsx
import { JsonLdScript } from "~/core/JsonLdScript";
import type { [Component]JsonLdProps } from "~/types/[component].types";
import { processAuthor, processImage } from "~/utils/processors";

export default function [Component]JsonLd({
  type = "[DefaultType]",
  scriptId,
  scriptKey,
  // ... props
}: [Component]JsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    // Use conditional spread for optional props
    ...(url && { url }),
    // Use process functions for flexible inputs
    ...(author && {
      author: Array.isArray(author)
        ? author.map(processAuthor)
        : processAuthor(author),
    }),
    // Boolean checks need explicit undefined check
    ...(isAccessibleForFree !== undefined && { isAccessibleForFree }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || `[component]-jsonld-${type}`}
    />
  );
}

export type { [Component]JsonLdProps };
```

## Process Functions

**ALWAYS use process functions** from `~/utils/processors` for flexible properties:

```typescript
// Converts strings to objects with @type
processAuthor("John Doe"); // → { "@type": "Person", name: "John Doe" }
processImage("url.jpg"); // → "url.jpg" (returns as-is if string)

// Adds @type to objects intelligently
processAuthor({ name: "ACME", logo: "..." }); // → Organization
processAuthor({ name: "John" }); // → Person
```

## Unit Testing

Tests are **co-located** with components as `[Component]JsonLd.test.tsx`

### Test Structure

```typescript
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import [Component]JsonLd from "./[Component]JsonLd";

describe("[Component]JsonLd", () => {
  it("renders basic [Component] with minimal props", () => {
    const { container } = render(
      <[Component]JsonLd
        // Minimal required props
      />
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("[Type]");
  });
});
```

### Test Coverage Checklist

- ✅ Basic rendering with minimal props
- ✅ All schema type variations
- ✅ String to object conversions
- ✅ Array handling
- ✅ All optional properties
- ✅ Default value application
- ✅ Boolean value handling (false values)
- ✅ Custom scriptId and scriptKey

## Commands

```bash
pnpm test:unit       # Run all unit tests
pnpm test:unit:watch # Watch mode
pnpm typecheck      # Type checking
pnpm lint           # ESLint
```

## Important Patterns

### Conditional Property Inclusion

```typescript
// Only include if truthy
...(url && { url }),

// Include boolean false values
...(isAccessibleForFree !== undefined && { isAccessibleForFree }),

// Apply defaults
...(!dateModified && datePublished && { dateModified: datePublished }),
```

### Shared Utilities

- Types: Import from `~/types/common.types`
- Processors: Import from `~/utils/processors`
- Never duplicate process functions or types

## Checklist for New Components

1. Research Google's structured data docs
2. Create types in `~/types/[component].types.ts`
3. Implement component using process functions
4. Export from `src/index.ts`
5. Write comprehensive unit tests
6. Create example pages
7. Add E2E tests
