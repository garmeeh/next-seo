import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductJsonLd from "./ProductJsonLd";

describe("ProductJsonLd", () => {
  it("renders basic Product with minimal props (with offers)", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        offers={{
          price: 119.99,
          priceCurrency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Executive Anvil",
      offers: {
        "@type": "Offer",
        price: 119.99,
        priceCurrency: "USD",
      },
    });
  });

  it("renders Product with review", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        review={{
          reviewRating: {
            ratingValue: 4,
            bestRating: 5,
          },
          author: "Fred Benson",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.review).toEqual({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 4,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: "Fred Benson",
      },
    });
  });

  it("renders Product with aggregateRating", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        aggregateRating={{
          ratingValue: 4.4,
          reviewCount: 89,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.4,
      reviewCount: 89,
    });
  });

  it("handles AggregateOffer correctly", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        offers={{
          lowPrice: 119.99,
          highPrice: 199.99,
          priceCurrency: "USD",
          offerCount: 5,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.offers).toEqual({
      "@type": "AggregateOffer",
      lowPrice: 119.99,
      highPrice: 199.99,
      priceCurrency: "USD",
      offerCount: 5,
    });
  });

  it("handles review with pros and cons", () => {
    const { container } = render(
      <ProductJsonLd
        name="Cheese Grater Pro"
        review={{
          author: "Pascal Van Cleeff",
          positiveNotes: {
            itemListElement: [
              { name: "Consistent results" },
              { name: "Still sharp after many uses" },
            ],
          },
          negativeNotes: {
            itemListElement: [
              { name: "No child protection" },
              { name: "Lacking advanced features" },
            ],
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.review.positiveNotes).toEqual({
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Consistent results",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Still sharp after many uses",
        },
      ],
    });

    expect(jsonData.review.negativeNotes).toEqual({
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "No child protection",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Lacking advanced features",
        },
      ],
    });
  });

  it("handles multiple images", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        image={[
          "https://example.com/photos/1x1/photo.jpg",
          "https://example.com/photos/4x3/photo.jpg",
          {
            url: "https://example.com/photos/16x9/photo.jpg",
            width: 1920,
            height: 1080,
          },
        ]}
        offers={{
          price: 119.99,
          priceCurrency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.image).toEqual([
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      {
        "@type": "ImageObject",
        url: "https://example.com/photos/16x9/photo.jpg",
        width: 1920,
        height: 1080,
      },
    ]);
  });

  it("handles brand as string", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        brand="ACME"
        offers={{
          price: 119.99,
          priceCurrency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.brand).toEqual({
      "@type": "Brand",
      name: "ACME",
    });
  });

  it("handles brand as object", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        brand={{
          name: "ACME Corporation",
        }}
        offers={{
          price: 119.99,
          priceCurrency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.brand).toEqual({
      "@type": "Brand",
      name: "ACME Corporation",
    });
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        description="Sleeker than ACME's Classic Anvil"
        url="https://example.com/products/anvil"
        sku="0446310786"
        mpn="925872"
        gtin13="0614141999996"
        brand="ACME"
        category="Hardware"
        color="Silver"
        material="Steel"
        model="EA-2024"
        productID="anvil-001"
        weight={{
          value: 10,
          unitCode: "KGM",
        }}
        width="30cm"
        height="20cm"
        depth="15cm"
        manufacturer="ACME Manufacturing"
        releaseDate="2024-01-01"
        award="Best Anvil 2024"
        review={{
          reviewRating: {
            ratingValue: 4.5,
            bestRating: 5,
          },
          author: "John Doe",
          reviewBody: "Great anvil!",
        }}
        aggregateRating={{
          ratingValue: 4.4,
          reviewCount: 89,
        }}
        offers={{
          price: 119.99,
          priceCurrency: "USD",
          availability: "InStock",
          url: "https://example.com/buy/anvil",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.name).toBe("Executive Anvil");
    expect(jsonData.description).toBe("Sleeker than ACME's Classic Anvil");
    expect(jsonData.url).toBe("https://example.com/products/anvil");
    expect(jsonData.sku).toBe("0446310786");
    expect(jsonData.mpn).toBe("925872");
    expect(jsonData.gtin13).toBe("0614141999996");
    expect(jsonData.category).toBe("Hardware");
    expect(jsonData.color).toBe("Silver");
    expect(jsonData.material).toBe("Steel");
    expect(jsonData.model).toBe("EA-2024");
    expect(jsonData.productID).toBe("anvil-001");
    expect(jsonData.weight).toEqual({
      "@type": "QuantitativeValue",
      value: 10,
      unitCode: "KGM",
    });
    expect(jsonData.width).toBe("30cm");
    expect(jsonData.height).toBe("20cm");
    expect(jsonData.depth).toBe("15cm");
    expect(jsonData.manufacturer).toEqual({
      "@type": "Person",
      name: "ACME Manufacturing",
    });
    expect(jsonData.releaseDate).toBe("2024-01-01");
    expect(jsonData.award).toBe("Best Anvil 2024");
  });

  it("handles multiple reviews", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        review={[
          {
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            author: "Alice",
            reviewBody: "Excellent!",
          },
          {
            reviewRating: {
              ratingValue: 4,
              bestRating: 5,
            },
            author: "Bob",
            reviewBody: "Good product",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(Array.isArray(jsonData.review)).toBe(true);
    expect(jsonData.review).toHaveLength(2);
    expect(jsonData.review[0].author.name).toBe("Alice");
    expect(jsonData.review[1].author.name).toBe("Bob");
  });

  it("handles array of offers", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        offers={[
          {
            price: 119.99,
            priceCurrency: "USD",
            seller: "Store A",
          },
          {
            price: 129.99,
            priceCurrency: "USD",
            seller: "Store B",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(Array.isArray(jsonData.offers)).toBe(true);
    expect(jsonData.offers).toHaveLength(2);
    expect(jsonData.offers[0].price).toBe(119.99);
    expect(jsonData.offers[1].price).toBe(129.99);
  });

  it("handles Car type when isCar is true", () => {
    const { container } = render(
      <ProductJsonLd
        name="Tesla Model 3"
        isCar={true}
        offers={{
          price: 39990,
          priceCurrency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toEqual(["Product", "Car"]);
  });

  it("handles custom scriptId and scriptKey", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        scriptId="custom-product-id"
        scriptKey="custom-product-key"
        offers={{
          price: 119.99,
          priceCurrency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
    expect(script!.id).toBe("custom-product-id");
  });

  it("handles offer with priceSpecification", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        offers={{
          priceSpecification: {
            price: 119.99,
            priceCurrency: "USD",
            minPrice: 99.99,
            maxPrice: 149.99,
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.offers.priceSpecification).toEqual({
      "@type": "PriceSpecification",
      price: 119.99,
      priceCurrency: "USD",
      minPrice: 99.99,
      maxPrice: 149.99,
    });
  });

  it("handles additionalProperty", () => {
    const { container } = render(
      <ProductJsonLd
        name="Executive Anvil"
        additionalProperty={[
          {
            "@type": "PropertyValue",
            name: "Warranty",
            value: "2 years",
          },
          {
            "@type": "PropertyValue",
            name: "Assembly Required",
            value: "No",
          },
        ]}
        offers={{
          price: 119.99,
          priceCurrency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.additionalProperty).toHaveLength(2);
    expect(jsonData.additionalProperty[0].name).toBe("Warranty");
    expect(jsonData.additionalProperty[1].value).toBe("No");
  });

  it("handles offer with merchant return policy", () => {
    const { container } = render(
      <ProductJsonLd
        name="Product with Return Policy"
        offers={{
          price: 99.99,
          priceCurrency: "USD",
          hasMerchantReturnPolicy: {
            applicableCountry: "US",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            returnFees: "https://schema.org/FreeReturn",
            refundType: "https://schema.org/FullRefund",
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.offers.hasMerchantReturnPolicy).toEqual({
      "@type": "MerchantReturnPolicy",
      applicableCountry: ["US"],
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnFees: "https://schema.org/FreeReturn",
      refundType: ["https://schema.org/FullRefund"],
    });
  });

  it("handles offer with enhanced merchant return policy", () => {
    const { container } = render(
      <ProductJsonLd
        name="Product with Enhanced Return Policy"
        offers={{
          price: 199.99,
          priceCurrency: "EUR",
          hasMerchantReturnPolicy: {
            applicableCountry: ["DE", "AT"],
            returnPolicyCountry: "DE",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 60,
            returnShippingFeesAmount: {
              value: 4.99,
              currency: "EUR",
            },
            restockingFee: 15,
            returnPolicySeasonalOverride: {
              startDate: "2025-12-01",
              endDate: "2025-01-05",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 30,
            },
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    const policy = jsonData.offers.hasMerchantReturnPolicy;
    expect(policy["@type"]).toBe("MerchantReturnPolicy");
    expect(policy.returnShippingFeesAmount).toEqual({
      "@type": "MonetaryAmount",
      value: 4.99,
      currency: "EUR",
    });
    expect(policy.restockingFee).toBe(15);
    expect(policy.returnPolicySeasonalOverride).toEqual({
      "@type": "MerchantReturnPolicySeasonalOverride",
      startDate: "2025-12-01",
      endDate: "2025-01-05",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
    });
  });

  it("handles multiple offers with different return policies", () => {
    const { container } = render(
      <ProductJsonLd
        name="Multi-seller Product"
        offers={[
          {
            price: 89.99,
            priceCurrency: "USD",
            seller: "Store A",
            hasMerchantReturnPolicy: {
              applicableCountry: "US",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 30,
            },
          },
          {
            price: 94.99,
            priceCurrency: "USD",
            seller: "Store B",
            hasMerchantReturnPolicy: {
              applicableCountry: "US",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnNotPermitted",
            },
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.offers).toHaveLength(2);
    expect(jsonData.offers[0].hasMerchantReturnPolicy.merchantReturnDays).toBe(
      30,
    );
    expect(
      jsonData.offers[1].hasMerchantReturnPolicy.returnPolicyCategory,
    ).toBe("https://schema.org/MerchantReturnNotPermitted");
  });
});
