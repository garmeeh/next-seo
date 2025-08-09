# Example App Guidelines

## Purpose

This Next.js app provides real example pages for E2E testing. Each page demonstrates a specific next-seo component with various configurations.

## Commands

```bash
pnpm example:dev    # Run on localhost:3001
pnpm example:build  # Build example app
pnpm example:start  # Start production build
```

## Critical Rules

- **Every example page must be real and functional** - E2E tests depend on these
- **Import components from "next-seo"** not from local paths
- **Each component variation needs its own page** for E2E testing

## Page Structure

```
app/
├── [component]/              # Basic usage
├── [component]-advanced/     # All features
├── [component]-[variation]/  # Type variations
└── [component]-special-chars/ # Special characters
```

## Naming Conventions

- Basic: `/article`
- Advanced: `/article-advanced`
- Type variations: `/news-article`, `/blog-posting`
- Special tests: `/article-special-chars`

## Example Pattern

```tsx
// app/[component]/page.tsx
import { [Component]JsonLd } from "next-seo";

export default function [Component]Page() {
  return (
    <div className="container mx-auto p-8">
      <[Component]JsonLd
        // Minimal required props for basic example
        headline="Example Title"
        datePublished="2024-01-01T08:00:00+00:00"
      />

      <article className="prose lg:prose-xl">
        <h1>Example Content</h1>
        {/* Visual content for verification */}
      </article>
    </div>
  );
}
```

## Custom Components

Custom JSON-LD components go in `components/custom/`:

- Follow the same patterns as library components
- Include example pages for testing
- See `PodcastSeriesJsonLd.tsx` and `ServiceJsonLd.tsx` as references

## Key Requirements

1. **Real content only** - No mocked data
2. **Consistent data** - Use predictable values for E2E assertions
3. **Cover all props** - Advanced examples should demonstrate all features
4. **Valid HTML** - Include semantic markup for accessibility

## Notes

- App runs on port 3001 to avoid conflicts
- Used exclusively for E2E testing
- Keep examples focused and minimal
- Data should be predictable for test assertions
