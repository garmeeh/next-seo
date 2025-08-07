import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CreativeWorkJsonLd from "./CreativeWorkJsonLd";

describe("CreativeWorkJsonLd", () => {
  it("renders basic CreativeWork with minimal props", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Test Creative Work"
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
      "@type": "CreativeWork",
      name: "Test Creative Work",
      datePublished: "2024-01-01T00:00:00.000Z",
    });
  });

  it("renders Article with paywalled content", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Article"
        headline="Paywalled Article"
        datePublished="2024-01-01T00:00:00.000Z"
        isAccessibleForFree={false}
        hasPart={{
          isAccessibleForFree: false,
          cssSelector: ".paywall",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Paywalled Article",
      datePublished: "2024-01-01T00:00:00.000Z",
      dateModified: "2024-01-01T00:00:00.000Z",
      isAccessibleForFree: false,
      hasPart: {
        "@type": "WebPageElement",
        isAccessibleForFree: false,
        cssSelector: ".paywall",
      },
    });
  });

  it("renders NewsArticle with multiple paywalled sections", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="NewsArticle"
        headline="Breaking News"
        datePublished="2024-01-01T00:00:00.000Z"
        isAccessibleForFree={false}
        hasPart={[
          {
            isAccessibleForFree: false,
            cssSelector: ".section1",
          },
          {
            isAccessibleForFree: false,
            cssSelector: ".section2",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasPart).toEqual([
      {
        "@type": "WebPageElement",
        isAccessibleForFree: false,
        cssSelector: ".section1",
      },
      {
        "@type": "WebPageElement",
        isAccessibleForFree: false,
        cssSelector: ".section2",
      },
    ]);
  });

  it("renders Blog type with subscription content", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Blog"
        name="My Premium Blog"
        description="A blog with premium content"
        datePublished="2024-01-01T00:00:00.000Z"
        isAccessibleForFree={false}
        hasPart={{
          isAccessibleForFree: false,
          cssSelector: ".premium-content",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("Blog");
    expect(jsonData.name).toBe("My Premium Blog");
    expect(jsonData.isAccessibleForFree).toBe(false);
  });

  it("renders BlogPosting type", () => {
    const { container } = render(
      <CreativeWorkJsonLd
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

  it("renders Comment type with text", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Comment"
        text="This is a great article!"
        author="John Doe"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("Comment");
    expect(jsonData.text).toBe("This is a great article!");
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "John Doe",
    });
  });

  it("renders Course type with provider", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Course"
        name="Introduction to Programming"
        provider="Tech University"
        description="Learn the basics of programming"
        isAccessibleForFree={false}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("Course");
    expect(jsonData.name).toBe("Introduction to Programming");
    expect(jsonData.provider).toEqual({
      "@type": "Organization",
      name: "Tech University",
    });
  });

  it("renders HowTo type", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="HowTo"
        name="How to Bake a Cake"
        description="Step by step guide to baking"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("HowTo");
    expect(jsonData.name).toBe("How to Bake a Cake");
  });

  it("renders Message type", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Message"
        name="Important Announcement"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("Message");
  });

  it("renders Review type with rating", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Review"
        name="Product Review"
        itemReviewed="Amazing Product"
        reviewRating={{
          ratingValue: 4.5,
          bestRating: 5,
        }}
        author="Jane Smith"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("Review");
    expect(jsonData.itemReviewed).toBe("Amazing Product");
    expect(jsonData.reviewRating).toEqual({
      ratingValue: 4.5,
      bestRating: 5,
    });
  });

  it("renders WebPage type", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="WebPage"
        name="About Us"
        url="https://example.com/about"
        description="Learn more about our company"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("WebPage");
    expect(jsonData.url).toBe("https://example.com/about");
  });

  it("handles string author", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Test Work"
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

  it("handles multiple authors", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Collaborative Work"
        author={[
          "John Doe",
          { name: "Jane Smith", url: "https://example.com/jane" },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.author).toEqual([
      { "@type": "Person", name: "John Doe" },
      {
        "@type": "Person",
        name: "Jane Smith",
        url: "https://example.com/jane",
      },
    ]);
  });

  it("handles organization author", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Corporate Publication"
        author={{
          name: "ACME Corp",
          logo: "https://example.com/logo.png",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.author["@type"]).toBe("Organization");
    expect(jsonData.author.name).toBe("ACME Corp");
  });

  it("handles string image", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Visual Content"
        image="https://example.com/image.jpg"
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
      <CreativeWorkJsonLd
        name="Visual Content"
        image={{
          url: "https://example.com/image.jpg",
          width: 800,
          height: 600,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
    });
  });

  it("handles multiple images", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Gallery"
        image={[
          "https://example.com/image1.jpg",
          {
            url: "https://example.com/image2.jpg",
            width: 800,
            height: 600,
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.image).toHaveLength(2);
    expect(jsonData.image[0]).toBe("https://example.com/image1.jpg");
    expect(jsonData.image[1]["@type"]).toBe("ImageObject");
  });

  it("handles publisher", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Article"
        headline="Published Article"
        publisher="Publishing House"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.publisher).toEqual({
      "@type": "Organization",
      name: "Publishing House",
    });
  });

  it("handles mainEntityOfPage as string", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Main Content"
        mainEntityOfPage="https://example.com/main"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.mainEntityOfPage).toBe("https://example.com/main");
  });

  it("handles mainEntityOfPage as WebPage", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Main Content"
        mainEntityOfPage={{
          "@id": "https://example.com/main",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": "https://example.com/main",
    });
  });

  it("handles isAccessibleForFree as false", () => {
    const { container } = render(
      <CreativeWorkJsonLd name="Premium Content" isAccessibleForFree={false} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.isAccessibleForFree).toBe(false);
  });

  it("handles custom scriptId and scriptKey", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        name="Custom Script"
        scriptId="custom-id"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector("#custom-id");
    expect(script).toBeTruthy();
    expect(script?.getAttribute("data-testid")).toBe("custom-id");
  });

  it("uses headline over name when both are provided", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Article"
        headline="Article Headline"
        name="Article Name"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.headline).toBe("Article Headline");
    expect(jsonData.name).toBeUndefined();
  });

  it("dateModified defaults to datePublished for Article types", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Article"
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

  it("dateModified does not default for non-Article types", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="HowTo"
        name="How to Guide"
        datePublished="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.dateModified).toBeUndefined();
  });

  it("handles all properties combined", () => {
    const { container } = render(
      <CreativeWorkJsonLd
        type="Article"
        headline="Complete Article"
        url="https://example.com/article"
        author={[
          "John Doe",
          { name: "Jane Smith", url: "https://example.com/jane" },
        ]}
        datePublished="2024-01-01T00:00:00.000Z"
        dateModified="2024-01-02T00:00:00.000Z"
        image={[
          "https://example.com/image1.jpg",
          { url: "https://example.com/image2.jpg", width: 800, height: 600 },
        ]}
        publisher={{
          name: "Publishing House",
          logo: "https://example.com/logo.png",
        }}
        description="A comprehensive article with all properties"
        isAccessibleForFree={false}
        hasPart={[
          { isAccessibleForFree: false, cssSelector: ".premium1" },
          { isAccessibleForFree: false, cssSelector: ".premium2" },
        ]}
        mainEntityOfPage="https://example.com/main"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("Article");
    expect(jsonData.headline).toBe("Complete Article");
    expect(jsonData.author).toHaveLength(2);
    expect(jsonData.image).toHaveLength(2);
    expect(jsonData.hasPart).toHaveLength(2);
    expect(jsonData.isAccessibleForFree).toBe(false);
  });
});
