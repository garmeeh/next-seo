# next-seo

## 7.3.0

### Minor Changes

- 7784fd2: Add optional `nonce` prop to all JSON-LD components for Content Security Policy (CSP) compliance

  Sites that send a strict CSP header such as `script-src 'nonce-{RANDOM}'` block inline scripts without a matching nonce. Every JSON-LD component now accepts an optional `nonce` prop, which is forwarded to the rendered `<script type="application/ld+json">` tag. Omit the prop and no `nonce` attribute is rendered, so existing usage is unchanged.

  ```tsx
  import { headers } from "next/headers";
  import { ArticleJsonLd } from "next-seo";

  const nonce = (await headers()).get("x-nonce") ?? undefined;

  <ArticleJsonLd headline="My Article" nonce={nonce} />;
  ```

## 7.2.0

### Minor Changes

- 28c684e: Add `review` and `aggregateRating` props to OrganizationJsonLd component, matching the existing support in LocalBusinessJsonLd. Both are direct Schema.org Organization properties processed using shared utilities.

## 7.1.0

### Minor Changes

- d412e2b: Add HowToJsonLd component for structured data support
  - New `HowToJsonLd` component following Schema.org HowTo specification
  - Support for HowToStep, HowToSection, HowToDirection, and HowToTip types
  - HowToSupply and HowToTool for materials and equipment
  - Duration properties (prepTime, performTime, totalTime) in ISO 8601 format
  - estimatedCost as string or MonetaryAmount object
  - yield as string or QuantitativeValue
  - Video support via VideoObject

## 7.0.1

### Patch Changes

- 1db3648: Add JSDoc comment to internal type guard function
