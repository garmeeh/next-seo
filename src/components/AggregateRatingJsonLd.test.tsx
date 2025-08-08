import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AggregateRatingJsonLd from "./AggregateRatingJsonLd";

describe("AggregateRatingJsonLd", () => {
  it("renders minimal with ratingCount", () => {
    const { container } = render(
      <AggregateRatingJsonLd
        itemReviewed="Legal Seafood"
        ratingValue={88}
        ratingCount={20}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      itemReviewed: { "@type": "Thing", name: "Legal Seafood" },
      ratingValue: 88,
      ratingCount: 20,
    });
  });

  it("renders with reviewCount instead of ratingCount", () => {
    const { container } = render(
      <AggregateRatingJsonLd
        itemReviewed={{ name: "Executive Anvil", "@type": "Product" }}
        ratingValue={4.4}
        reviewCount={89}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.reviewCount).toBe(89);
    expect(jsonData.ratingCount).toBeUndefined();
    expect(jsonData.itemReviewed).toEqual({
      "@type": "Product",
      name: "Executive Anvil",
    });
  });

  it("includes custom scale when provided", () => {
    const { container } = render(
      <AggregateRatingJsonLd
        itemReviewed="Item"
        ratingValue={85}
        ratingCount={100}
        bestRating={100}
        worstRating={0}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.bestRating).toBe(100);
    expect(jsonData.worstRating).toBe(0);
  });

  it("throws when missing ratingCount and reviewCount", () => {
    expect(() =>
      render(<AggregateRatingJsonLd itemReviewed="Item" ratingValue={4} />),
    ).toThrow(
      "AggregateRating requires at least one of ratingCount or reviewCount",
    );
  });
});
