import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EmployerAggregateRatingJsonLd from "./EmployerAggregateRatingJsonLd";

describe("EmployerAggregateRatingJsonLd", () => {
  it("renders basic EmployerAggregateRating with minimal props and ratingCount", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed="World's Best Coffee Shop"
        ratingValue={91}
        ratingCount={10561}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "EmployerAggregateRating",
      itemReviewed: {
        "@type": "Organization",
        name: "World's Best Coffee Shop",
      },
      ratingValue: 91,
      ratingCount: 10561,
    });
  });

  it("renders with reviewCount instead of ratingCount", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed="Tech Corp"
        ratingValue={4.5}
        reviewCount={250}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.reviewCount).toBe(250);
    expect(jsonData.ratingCount).toBeUndefined();
  });

  it("renders with both ratingCount and reviewCount", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed="Big Company"
        ratingValue={4.2}
        ratingCount={500}
        reviewCount={450}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.ratingCount).toBe(500);
    expect(jsonData.reviewCount).toBe(450);
  });

  it("handles string ratingValue", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed="Coffee Shop"
        ratingValue="60%"
        ratingCount={100}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.ratingValue).toBe("60%");
  });

  it("throws error when neither ratingCount nor reviewCount is provided", () => {
    expect(() =>
      render(
        <EmployerAggregateRatingJsonLd
          itemReviewed="Company"
          ratingValue={4}
        />,
      ),
    ).toThrow(
      "EmployerAggregateRating requires at least one of ratingCount or reviewCount",
    );
  });

  it("handles complex Organization object for itemReviewed", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed={{
          name: "World's Best Coffee Shop",
          sameAs: "https://example.com",
          url: "https://example.com",
          logo: "https://example.com/logo.png",
          address: {
            streetAddress: "123 Main St",
            addressLocality: "Seattle",
            addressRegion: "WA",
            postalCode: "98101",
            addressCountry: "US",
          },
        }}
        ratingValue={91}
        ratingCount={10561}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.itemReviewed).toEqual({
      "@type": "Organization",
      name: "World's Best Coffee Shop",
      sameAs: "https://example.com",
      url: "https://example.com",
      logo: "https://example.com/logo.png",
      address: {
        streetAddress: "123 Main St",
        addressLocality: "Seattle",
        addressRegion: "WA",
        postalCode: "98101",
        addressCountry: "US",
      },
    });
  });

  it("handles Organization object with @type already set", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed={{
          "@type": "Organization",
          name: "Tech Company",
          url: "https://techcompany.com",
        }}
        ratingValue={4.8}
        ratingCount={1200}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.itemReviewed["@type"]).toBe("Organization");
    expect(jsonData.itemReviewed.name).toBe("Tech Company");
  });

  it("includes bestRating and worstRating when provided", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed="Custom Scale Company"
        ratingValue={85}
        ratingCount={500}
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

  it("handles bestRating and worstRating edge cases", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed="Edge Case Company"
        ratingValue={1}
        ratingCount={10}
        bestRating={1}
        worstRating={1}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.bestRating).toBe(1);
    expect(jsonData.worstRating).toBe(1);
  });

  it("uses custom scriptId when provided", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        scriptId="custom-employer-rating-id"
        itemReviewed="Company"
        ratingValue={4}
        ratingCount={100}
      />,
    );

    const script = container.querySelector("#custom-employer-rating-id");
    expect(script).toBeTruthy();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
    expect(script?.getAttribute("data-testid")).toBe(
      "custom-employer-rating-id",
    );
  });

  it("uses custom scriptKey when provided", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        scriptKey="custom-key"
        itemReviewed="Company"
        ratingValue={4}
        ratingCount={100}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
    // scriptKey is used for React key, not data-testid
    // data-testid is only set when scriptId is provided
    expect(script?.getAttribute("data-testid")).toBeNull();
    expect(script?.getAttribute("id")).toBe("custom-key");
  });

  it("uses default id when scriptId not provided", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed="Company"
        ratingValue={4}
        ratingCount={100}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script?.getAttribute("id")).toBe("employer-aggregate-rating-jsonld");
    // data-testid is null when scriptId is not provided
    expect(script?.getAttribute("data-testid")).toBeNull();
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <EmployerAggregateRatingJsonLd
        itemReviewed={{
          name: "Full Featured Company",
          sameAs: [
            "https://facebook.com/company",
            "https://twitter.com/company",
          ],
          url: "https://company.com",
          logo: {
            url: "https://company.com/logo.png",
            width: 600,
            height: 300,
          },
          description: "A great place to work",
          telephone: "+1-555-123-4567",
          email: "hr@company.com",
          address: [
            {
              streetAddress: "123 Main St",
              addressLocality: "San Francisco",
              addressRegion: "CA",
              postalCode: "94105",
              addressCountry: "US",
            },
            {
              streetAddress: "456 Oak Ave",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10001",
              addressCountry: "US",
            },
          ],
        }}
        ratingValue={4.7}
        ratingCount={1500}
        reviewCount={1450}
        bestRating={5}
        worstRating={1}
        scriptId="full-example"
        scriptKey="full-example-key"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("EmployerAggregateRating");
    expect(jsonData.ratingValue).toBe(4.7);
    expect(jsonData.ratingCount).toBe(1500);
    expect(jsonData.reviewCount).toBe(1450);
    expect(jsonData.bestRating).toBe(5);
    expect(jsonData.worstRating).toBe(1);
    expect(jsonData.itemReviewed.name).toBe("Full Featured Company");
    expect(jsonData.itemReviewed.sameAs).toEqual([
      "https://facebook.com/company",
      "https://twitter.com/company",
    ]);
  });
});
