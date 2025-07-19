import { ArticleJsonLd } from "next-seo";

export default function TestUrlParamsPage() {
  return (
    <div className="container mx-auto p-8">
      <ArticleJsonLd
        headline="Test Article"
        url="https://example.com/article?title=yes&page=1&utm_source=google&filter=new"
        mainEntityOfPage="https://example.com/main?category=tech&sort=date"
        datePublished="2024-01-01T00:00:00.000Z"
        author={{
          "@type": "Person",
          name: "John Doe",
          url: "https://example.com/authors/john?bio=full&lang=en",
        }}
        publisher={{
          name: "Example Corp",
          url: "https://example.com?ref=article&campaign=2024",
        }}
      />

      <div className="prose lg:prose-xl">
        <h1>Test Article with URL Parameters</h1>
        <p>
          This page tests that URL query parameters are preserved correctly in
          JSON-LD.
        </p>

        <h2>URLs with Parameters</h2>
        <ul>
          <li>
            <strong>Article URL:</strong>{" "}
            <code>
              https://example.com/article?title=yes&page=1&utm_source=google&filter=new
            </code>
          </li>
          <li>
            <strong>Main Entity:</strong>{" "}
            <code>https://example.com/main?category=tech&sort=date</code>
          </li>
          <li>
            <strong>Author URL:</strong>{" "}
            <code>https://example.com/authors/john?bio=full&lang=en</code>
          </li>
          <li>
            <strong>Publisher URL:</strong>{" "}
            <code>https://example.com?ref=article&campaign=2024</code>
          </li>
        </ul>

        <p>All query parameters should be preserved exactly as specified.</p>
      </div>
    </div>
  );
}
