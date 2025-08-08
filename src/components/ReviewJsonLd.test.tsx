import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ReviewJsonLd from "./ReviewJsonLd";

describe("ReviewJsonLd", () => {
  it("renders minimal review with string itemReviewed", () => {
    const { container } = render(
      <ReviewJsonLd
        author="Bob Smith"
        reviewRating={{ ratingValue: 4 }}
        itemReviewed="Legal Seafood"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Review",
      author: { "@type": "Person", name: "Bob Smith" },
      reviewRating: { "@type": "Rating", ratingValue: 4 },
      itemReviewed: { "@type": "Thing", name: "Legal Seafood" },
    });
  });

  it("supports object itemReviewed with explicit type", () => {
    const { container } = render(
      <ReviewJsonLd
        author={{ name: "Washington Times" }}
        reviewRating={{ ratingValue: 4 }}
        itemReviewed={{ name: "Legal Seafood", "@type": "LocalBusiness" }}
        reviewBody="Great seafood!"
        datePublished="2024-01-01"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.itemReviewed).toEqual({
      "@type": "LocalBusiness",
      name: "Legal Seafood",
    });
    expect(jsonData.reviewBody).toBe("Great seafood!");
    expect(jsonData.datePublished).toBe("2024-01-01");
  });

  it("includes publisher and url and mainEntityOfPage", () => {
    const { container } = render(
      <ReviewJsonLd
        author="Jane Doe"
        reviewRating={{ ratingValue: 5, bestRating: 5, worstRating: 1 }}
        itemReviewed={{ name: "The Catcher in the Rye", "@type": "Product" }}
        publisher={{ name: "ACME Reviews" }}
        url="https://example.com/review/1"
        mainEntityOfPage={{ "@id": "https://example.com/review/1" }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.publisher).toEqual({
      "@type": "Organization",
      name: "ACME Reviews",
    });
    expect(jsonData.url).toBe("https://example.com/review/1");
    expect(jsonData.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": "https://example.com/review/1",
    });
  });

  it("throws when missing required fields", () => {
    // Missing author (compile-time invalid). Intentional for runtime test.
    // @ts-expect-error testing runtime validation for missing author
    expect(() =>
      render(
        <ReviewJsonLd reviewRating={{ ratingValue: 4 }} itemReviewed="Item" />,
      ),
    ).toThrow("Review requires an author");

    // Provide structurally invalid reviewRating via double-cast to bypass TS, trigger runtime check
    const invalidReviewRating = {} as unknown as {
      "@type": "Rating";
      ratingValue: number;
    };
    expect(() =>
      render(
        <ReviewJsonLd
          author="A"
          itemReviewed="Item"
          reviewRating={invalidReviewRating}
        />,
      ),
    ).toThrow("Review requires reviewRating.ratingValue");

    // Provide undefined itemReviewed via double-cast to bypass TS
    const missingItemReviewed = undefined as unknown as string;
    expect(() =>
      render(
        <ReviewJsonLd
          author="A"
          reviewRating={{ ratingValue: 1 }}
          itemReviewed={missingItemReviewed}
        />,
      ),
    ).toThrow("Review requires itemReviewed when used standalone");
  });
});
