import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArticleJsonLd from "./ArticleJsonLd";

describe("ArticleJsonLd", () => {
  it("renders basic Article with minimal props", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
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

  it("preserves URL query parameters", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        url="https://example.com/article?utm_source=google&page=1"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.url).toBe(
      "https://example.com/article?utm_source=google&page=1",
    );
  });

  it("renders NewsArticle type when specified", () => {
    const { container } = render(
      <ArticleJsonLd
        type="NewsArticle"
        headline="Breaking News"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("NewsArticle");
  });

  it("renders BlogPosting type when specified", () => {
    const { container } = render(
      <ArticleJsonLd
        type="BlogPosting"
        headline="My Blog Post"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("BlogPosting");
  });

  it("renders Blog type when specified", () => {
    const { container } = render(
      <ArticleJsonLd
        type="Blog"
        headline="My Blog"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("Blog");
  });

  it("handles string author", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        author="John Doe"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "John Doe",
    });
  });

  it("handles Person author object", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        author={{
          "@type": "Person",
          name: "John Doe",
          url: "https://example.com/john",
        }}
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "John Doe",
      url: "https://example.com/john",
    });
  });

  it("handles Organization author", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        author={{
          "@type": "Organization",
          name: "Example Corp",
          url: "https://example.com",
        }}
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Organization",
      name: "Example Corp",
      url: "https://example.com",
    });
  });

  it("handles multiple authors", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        author={[
          "John Doe",
          {
            "@type": "Person",
            name: "Jane Smith",
            url: "https://example.com/jane",
          },
        ]}
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual([
      {
        "@type": "Person",
        name: "John Doe",
      },
      {
        "@type": "Person",
        name: "Jane Smith",
        url: "https://example.com/jane",
      },
    ]);
  });

  it("handles string image", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        image="https://example.com/image.jpg"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toBe("https://example.com/image.jpg");
  });

  it("handles ImageObject", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        image={{
          "@type": "ImageObject",
          url: "https://example.com/image.jpg",
          width: 1200,
          height: 630,
        }}
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/image.jpg",
      width: 1200,
      height: 630,
    });
  });

  it("handles multiple images", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        image={[
          "https://example.com/image1.jpg",
          {
            "@type": "ImageObject",
            url: "https://example.com/image2.jpg",
            width: 800,
            height: 600,
          },
        ]}
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toEqual([
      "https://example.com/image1.jpg",
      {
        "@type": "ImageObject",
        url: "https://example.com/image2.jpg",
        width: 800,
        height: 600,
      },
    ]);
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Full Article"
        url="https://example.com/article"
        author="John Doe"
        datePublished="2024-01-01T00:00:00.000Z"
        dateModified="2024-01-02T00:00:00.000Z"
        image="https://example.com/image.jpg"
        description="This is a full article with all properties"
        publisher={{
          "@type": "Organization",
          name: "Example Publisher",
          logo: "https://example.com/logo.jpg",
        }}
        isAccessibleForFree={true}
        mainEntityOfPage="https://example.com/article"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Full Article",
      url: "https://example.com/article",
      author: {
        "@type": "Person",
        name: "John Doe",
      },
      datePublished: "2024-01-01T00:00:00.000Z",
      dateModified: "2024-01-02T00:00:00.000Z",
      image: "https://example.com/image.jpg",
      description: "This is a full article with all properties",
      publisher: {
        "@type": "Organization",
        name: "Example Publisher",
        logo: "https://example.com/logo.jpg",
      },
      isAccessibleForFree: true,
      mainEntityOfPage: "https://example.com/article",
    });
  });

  it("uses datePublished as dateModified when dateModified is not provided", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.dateModified).toBe("2024-01-01T00:00:00.000Z");
  });

  it("handles isAccessibleForFree as false", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Premium Article"
        datePublished="2024-01-01T00:00:00.000Z"
        isAccessibleForFree={false}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.isAccessibleForFree).toBe(false);
  });

  it("uses custom scriptId when provided", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        datePublished="2024-01-01T00:00:00.000Z"
        scriptId="custom-article-id"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script!.getAttribute("id")).toBe("custom-article-id");
    expect(script!.getAttribute("data-testid")).toBe("custom-article-id");
  });

  it("uses custom scriptKey when provided", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        datePublished="2024-01-01T00:00:00.000Z"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    // React doesn't expose the key prop as an attribute, so we can't test it directly
    // The key is used internally by React for reconciliation
    expect(script).toBeTruthy();
  });

  it("handles string publisher", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        datePublished="2024-01-01T00:00:00.000Z"
        publisher="Example Publisher"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.publisher).toEqual({
      "@type": "Organization",
      name: "Example Publisher",
    });
  });

  it("handles publisher object without @type", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        datePublished="2024-01-01T00:00:00.000Z"
        publisher={{
          name: "Example Publisher",
          url: "https://example.com",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.publisher).toEqual({
      "@type": "Organization",
      name: "Example Publisher",
      url: "https://example.com",
    });
  });

  it("handles Person publisher with @type", () => {
    const { container } = render(
      <ArticleJsonLd
        headline="Test Article"
        datePublished="2024-01-01T00:00:00.000Z"
        publisher={{
          "@type": "Person",
          name: "John Doe",
          url: "https://johndoe.com",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.publisher).toEqual({
      "@type": "Person",
      name: "John Doe",
      url: "https://johndoe.com",
    });
  });
});
