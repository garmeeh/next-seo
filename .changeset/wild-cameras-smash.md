---
"next-seo": minor
---

Add optional `nonce` prop to all JSON-LD components for Content Security Policy (CSP) compliance

Sites that send a strict CSP header such as `script-src 'nonce-{RANDOM}'` block inline scripts without a matching nonce. Every JSON-LD component now accepts an optional `nonce` prop, which is forwarded to the rendered `<script type="application/ld+json">` tag. Omit the prop and no `nonce` attribute is rendered, so existing usage is unchanged.

```tsx
import { headers } from "next/headers";
import { ArticleJsonLd } from "next-seo";

const nonce = (await headers()).get("x-nonce") ?? undefined;

<ArticleJsonLd headline="My Article" nonce={nonce} />;
```
