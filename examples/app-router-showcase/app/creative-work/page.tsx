import { CreativeWorkJsonLd } from "next-seo";

export default function CreativeWorkPage() {
  return (
    <div className="container mx-auto p-8">
      <CreativeWorkJsonLd
        type="Article"
        headline="Premium Article: Understanding Paywalled Content"
        url="https://example.com/articles/premium-content"
        datePublished="2024-01-01T08:00:00+00:00"
        dateModified="2024-01-02T10:00:00+00:00"
        author="Sarah Johnson"
        image="https://example.com/images/premium-article.jpg"
        publisher={{
          name: "Premium Publications",
          logo: "https://example.com/logo.png",
        }}
        description="This article demonstrates how to mark paywalled content with structured data"
        isAccessibleForFree={false}
        hasPart={{
          isAccessibleForFree: false,
          cssSelector: ".paywall",
        }}
        mainEntityOfPage="https://example.com/articles"
      />

      <article className="prose lg:prose-xl">
        <h1>Premium Article: Understanding Paywalled Content</h1>

        <div className="non-paywall bg-white p-6 rounded-lg shadow-md">
          <h2>Free Preview</h2>
          <p>
            This is the free preview section that everyone can read. It provides
            a glimpse into the premium content that follows.
          </p>
          <p>
            Structured data helps search engines understand which parts of your
            content require a subscription or payment, distinguishing legitimate
            paywalled content from deceptive cloaking practices.
          </p>
        </div>

        <div className="paywall bg-yellow-50 p-6 rounded-lg shadow-md mt-6 border-2 border-yellow-300">
          <h2>Premium Content</h2>
          <p className="text-gray-600 italic">
            This section is marked as paywalled content using the cssSelector
            ".paywall"
          </p>
          <p>
            This premium content would typically require a subscription to
            access. The structured data marks this section with
            isAccessibleForFree: false and uses the CSS selector to identify the
            paywalled portion.
          </p>
          <p>
            Search engines can now properly understand that this content
            requires payment or subscription, which helps maintain trust with
            users while allowing the content to be properly indexed.
          </p>
        </div>
      </article>
    </div>
  );
}
