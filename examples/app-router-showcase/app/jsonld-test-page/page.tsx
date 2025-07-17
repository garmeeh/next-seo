// examples/app-router-showcase/app/jsonld-test-page/page.tsx
import React from "react";
// Assuming JsonLdScript is exported from your library's entry point
// and you've linked it via pnpm workspace: add next-seo@workspace:*
import { JsonLdScript } from "next-seo"; // Or the correct path if not yet fully packaged

const testData = {
  "@context": "https://schema.org",
  "@type": "WebPage", // Example type
  name: "E2E Test Page for JSON-LD",
  description: "This page tests the JsonLdScript component.",
  url: "http://localhost:3001/jsonld-test-page",
};

export default function JsonLdTestPage() {
  return (
    <div>
      <h1>JSON-LD Test Page</h1>
      <p>This page includes a JSON-LD script for testing purposes.</p>
      <JsonLdScript
        data={testData}
        id="e2e-jsonld-script"
        scriptKey="e2e-test"
      />
    </div>
  );
}
