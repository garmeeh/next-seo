import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ClaimReviewJsonLd from "./ClaimReviewJsonLd";

describe("ClaimReviewJsonLd", () => {
  it("renders basic ClaimReview with minimal props", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="The world is flat"
        reviewRating={{
          ratingValue: 1,
          bestRating: 5,
          worstRating: 1,
          alternateName: "False",
        }}
        url="https://example.com/news/science/worldisflat.html"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "ClaimReview",
      claimReviewed: "The world is flat",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 1,
        bestRating: 5,
        worstRating: 1,
        alternateName: "False",
      },
      url: "https://example.com/news/science/worldisflat.html",
    });
  });

  it("handles string author", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="Test claim"
        reviewRating={{
          ratingValue: 3,
          alternateName: "Partially true",
        }}
        url="https://example.com/fact-check"
        author="Example.com science watch"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Example.com science watch",
    });
  });

  it("handles organization author with properties", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="Test claim"
        reviewRating={{
          ratingValue: 3,
          alternateName: "Partially true",
        }}
        url="https://example.com/fact-check"
        author={{
          name: "Fact Check Organization",
          url: "https://example.com",
          logo: "https://example.com/logo.jpg",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.author).toEqual({
      "@type": "Organization",
      name: "Fact Check Organization",
      url: "https://example.com",
      logo: "https://example.com/logo.jpg",
    });
  });

  it("handles review rating with name property", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="Test claim"
        reviewRating={{
          ratingValue: 2,
          bestRating: 5,
          worstRating: 1,
          alternateName: "Mostly false",
          name: "Mostly false",
        }}
        url="https://example.com/fact-check"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 2,
      bestRating: 5,
      worstRating: 1,
      alternateName: "Mostly false",
      name: "Mostly false",
    });
  });

  it("handles claim with all properties", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="The world is flat"
        reviewRating={{
          ratingValue: 1,
          alternateName: "False",
        }}
        url="https://example.com/fact-check"
        itemReviewed={{
          author: {
            "@type": "Organization",
            name: "Square World Society",
            sameAs:
              "https://example.flatworlders.com/we-know-that-the-world-is-flat",
          },
          datePublished: "2024-06-20",
          appearance: {
            url: "https://example.com/news/a122121",
            headline: "Square Earth - Flat earthers for the Internet age",
            datePublished: "2024-06-22",
            author: "T. Tellar",
            image: "https://example.com/photos/1x1/photo.jpg",
            publisher: {
              name: "Skeptical News",
              logo: {
                url: "https://example.com/logo.jpg",
              },
            },
          },
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.itemReviewed).toEqual({
      "@type": "Claim",
      author: {
        "@type": "Organization",
        name: "Square World Society",
        sameAs:
          "https://example.flatworlders.com/we-know-that-the-world-is-flat",
      },
      datePublished: "2024-06-20",
      appearance: {
        "@type": "CreativeWork",
        url: "https://example.com/news/a122121",
        headline: "Square Earth - Flat earthers for the Internet age",
        datePublished: "2024-06-22",
        author: {
          "@type": "Person",
          name: "T. Tellar",
        },
        image: "https://example.com/photos/1x1/photo.jpg",
        publisher: {
          "@type": "Organization",
          name: "Skeptical News",
          logo: {
            "@type": "ImageObject",
            url: "https://example.com/logo.jpg",
          },
        },
      },
    });
  });

  it("handles multiple appearances", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="Test claim"
        reviewRating={{
          ratingValue: 1,
          alternateName: "False",
        }}
        url="https://example.com/fact-check"
        itemReviewed={{
          appearance: [
            "https://example.com/article1",
            {
              url: "https://example.com/article2",
              headline: "Second appearance",
            },
          ],
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.itemReviewed.appearance).toEqual([
      "https://example.com/article1",
      {
        "@type": "CreativeWork",
        url: "https://example.com/article2",
        headline: "Second appearance",
      },
    ]);
  });

  it("handles firstAppearance", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="Test claim"
        reviewRating={{
          ratingValue: 1,
          alternateName: "False",
        }}
        url="https://example.com/fact-check"
        itemReviewed={{
          firstAppearance: "https://example.com/original-article",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.itemReviewed.firstAppearance).toBe(
      "https://example.com/original-article",
    );
  });

  it("handles custom scriptId and scriptKey", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="Test claim"
        reviewRating={{
          ratingValue: 1,
          alternateName: "False",
        }}
        url="https://example.com/fact-check"
        scriptId="custom-id"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script?.id).toBe("custom-id");
    expect(script?.getAttribute("data-testid")).toBe("custom-id");
  });

  it("handles ClaimReview without itemReviewed", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="Politicians claim about economy"
        reviewRating={{
          ratingValue: 2,
          bestRating: 5,
          worstRating: 1,
          alternateName: "Mostly false",
        }}
        url="https://example.com/fact-check/economy"
        author={{
          name: "Fact Check Team",
          url: "https://example.com",
          logo: "https://example.com/logo.jpg",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "ClaimReview",
      claimReviewed: "Politicians claim about economy",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 2,
        bestRating: 5,
        worstRating: 1,
        alternateName: "Mostly false",
      },
      url: "https://example.com/fact-check/economy",
      author: {
        "@type": "Organization",
        name: "Fact Check Team",
        url: "https://example.com",
        logo: "https://example.com/logo.jpg",
      },
    });
  });

  it("handles claim with string author", () => {
    const { container } = render(
      <ClaimReviewJsonLd
        claimReviewed="Test claim"
        reviewRating={{
          ratingValue: 1,
          alternateName: "False",
        }}
        url="https://example.com/fact-check"
        itemReviewed={{
          author: "Original Claimant",
          datePublished: "2024-01-01",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.itemReviewed.author).toEqual({
      "@type": "Person",
      name: "Original Claimant",
    });
  });
});
