import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LocalBusinessJsonLd from "./LocalBusinessJsonLd";

describe("LocalBusinessJsonLd", () => {
  it("renders basic LocalBusiness with minimal props", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Dave's Steak House"
        address="148 W 51st St, New York, NY 10019"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Dave's Steak House",
      address: {
        "@type": "PostalAddress",
        streetAddress: "148 W 51st St, New York, NY 10019",
      },
    });
  });

  it("renders Restaurant type when specified", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        type="Restaurant"
        name="Dave's Steak House"
        address={{
          "@type": "PostalAddress",
          streetAddress: "148 W 51st St",
          addressLocality: "New York",
          addressRegion: "NY",
          postalCode: "10019",
          addressCountry: "US",
        }}
        servesCuisine="American"
        menu="https://example.com/menu"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("Restaurant");
    expect(jsonData.servesCuisine).toEqual(["American"]);
    expect(jsonData.menu).toBe("https://example.com/menu");
  });

  it("handles multiple types as array", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        type={["Restaurant", "BarOrPub"]}
        name="Dave's Restaurant & Bar"
        address="123 Main St"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toEqual(["Restaurant", "BarOrPub"]);
  });

  it("handles multiple addresses", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Multi-location Business"
        address={[
          "123 Main St, City A",
          {
            "@type": "PostalAddress",
            streetAddress: "456 Oak Ave",
            addressLocality: "City B",
            addressRegion: "State",
            postalCode: "12345",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.address).toEqual([
      {
        "@type": "PostalAddress",
        streetAddress: "123 Main St, City A",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "456 Oak Ave",
        addressLocality: "City B",
        addressRegion: "State",
        postalCode: "12345",
      },
    ]);
  });

  it("handles complex opening hours", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Test Business"
        address="123 Main St"
        openingHoursSpecification={[
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "21:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "23:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "00:00",
            closes: "00:00",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.openingHoursSpecification).toHaveLength(3);
    expect(jsonData.openingHoursSpecification[0].dayOfWeek).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ]);
  });

  it("handles seasonal hours with validFrom and validThrough", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Seasonal Business"
        address="123 Beach Rd"
        openingHoursSpecification={{
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "18:00",
          validFrom: "2024-06-01",
          validThrough: "2024-09-30",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.openingHoursSpecification.validFrom).toBe("2024-06-01");
    expect(jsonData.openingHoursSpecification.validThrough).toBe("2024-09-30");
  });

  it("handles departments", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        type="Store"
        name="Dave's Department Store"
        address="1600 Saratoga Ave, San Jose, CA 95129"
        telephone="+14088717984"
        department={[
          {
            type: "Pharmacy",
            name: "Dave's Pharmacy",
            address: "1600 Saratoga Ave, San Jose, CA 95129",
            telephone: "+14088719385",
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: "09:00",
              closes: "19:00",
            },
          },
          {
            type: "Bakery",
            name: "Dave's Bakery",
            address: "1600 Saratoga Ave, San Jose, CA 95129",
            telephone: "+14088719386",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.department).toHaveLength(2);
    expect(jsonData.department[0]["@type"]).toBe("Pharmacy");
    expect(jsonData.department[0].name).toBe("Dave's Pharmacy");
    expect(jsonData.department[1]["@type"]).toBe("Bakery");
  });

  it("handles review and aggregateRating", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Reviewed Business"
        address="123 Main St"
        review={{
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: 4,
            bestRating: 5,
          },
          author: "John Doe",
          reviewBody: "Great service!",
          datePublished: "2024-01-15",
        }}
        aggregateRating={{
          "@type": "AggregateRating",
          ratingValue: 4.5,
          ratingCount: 100,
          reviewCount: 95,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.review.author).toEqual({
      "@type": "Person",
      name: "John Doe",
    });
    expect(jsonData.review.reviewRating.ratingValue).toBe(4);
    expect(jsonData.aggregateRating.ratingValue).toBe(4.5);
  });

  it("handles geo coordinates", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Geo Business"
        address="123 Main St"
        geo={{
          "@type": "GeoCoordinates",
          latitude: 40.761293,
          longitude: -73.982294,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: 40.761293,
      longitude: -73.982294,
    });
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        type="Restaurant"
        name="Full Featured Restaurant"
        address="123 Main St"
        url="https://example.com"
        telephone="+12125551234"
        image={[
          "https://example.com/photos/1x1/photo.jpg",
          {
            "@type": "ImageObject",
            url: "https://example.com/photos/4x3/photo.jpg",
            width: 400,
            height: 300,
          },
        ]}
        priceRange="$$$"
        servesCuisine={["Italian", "American"]}
        menu="https://example.com/menu"
        sameAs={[
          "https://facebook.com/restaurant",
          "https://twitter.com/restaurant",
        ]}
        branchOf={{
          "@type": "Organization",
          name: "Parent Company",
        }}
        currenciesAccepted="USD"
        paymentAccepted="Cash, Credit Card"
        areaServed={["New York", "New Jersey"]}
        email="info@example.com"
        faxNumber="+12125551235"
        slogan="Best food in town!"
        description="A great restaurant serving Italian and American cuisine"
        publicAccess={true}
        smokingAllowed={false}
        isAccessibleForFree={true}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.url).toBe("https://example.com");
    expect(jsonData.telephone).toBe("+12125551234");
    expect(jsonData.image).toHaveLength(2);
    expect(jsonData.priceRange).toBe("$$$");
    expect(jsonData.servesCuisine).toEqual(["Italian", "American"]);
    expect(jsonData.sameAs).toEqual([
      "https://facebook.com/restaurant",
      "https://twitter.com/restaurant",
    ]);
    expect(jsonData.publicAccess).toBe(true);
    expect(jsonData.smokingAllowed).toBe(false);
    expect(jsonData.isAccessibleForFree).toBe(true);
  });

  it("handles boolean values correctly", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Boolean Test Business"
        address="123 Main St"
        publicAccess={false}
        smokingAllowed={false}
        isAccessibleForFree={false}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.publicAccess).toBe(false);
    expect(jsonData.smokingAllowed).toBe(false);
    expect(jsonData.isAccessibleForFree).toBe(false);
  });

  it("uses custom scriptId and scriptKey", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Test Business"
        address="123 Main St"
        scriptId="custom-id"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector("#custom-id");
    expect(script).toBeTruthy();
    expect(script?.getAttribute("data-testid")).toBe("custom-id");
  });

  it("handles ImageObject without @type", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Business with Images"
        address="123 Main St"
        image={[
          "https://example.com/photo1.jpg",
          {
            url: "https://example.com/photo2.jpg",
            width: 800,
            height: 600,
          },
          {
            "@type": "ImageObject",
            url: "https://example.com/photo3.jpg",
            width: 1200,
            height: 900,
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.image).toHaveLength(3);
    expect(jsonData.image[0]).toBe("https://example.com/photo1.jpg");
    expect(jsonData.image[1]).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/photo2.jpg",
      width: 800,
      height: 600,
    });
    expect(jsonData.image[2]).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/photo3.jpg",
      width: 1200,
      height: 900,
    });
  });

  it("handles AggregateRating without @type", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Rated Business"
        address="123 Main St"
        aggregateRating={{
          ratingValue: 4.5,
          ratingCount: 50,
          bestRating: 5,
          worstRating: 1,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.5,
      ratingCount: 50,
      bestRating: 5,
      worstRating: 1,
    });
  });

  it("handles single department with all properties", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        type="Store"
        name="Main Store"
        address="123 Main St"
        department={{
          type: "AutoPartsStore",
          name: "Auto Parts Department",
          address: "123 Main St, Section A",
          telephone: "+12125551234",
          image: "https://example.com/auto-parts.jpg",
          priceRange: "$$",
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 40.75,
            longitude: -73.98,
          },
          review: {
            "@type": "Review",
            author: "Jane Smith",
            reviewRating: {
              "@type": "Rating",
              ratingValue: 5,
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: 4.8,
            reviewCount: 25,
          },
          sameAs: ["https://facebook.com/autoparts"],
          branchOf: {
            "@type": "Organization",
            name: "Auto Parts Inc",
          },
          currenciesAccepted: "USD",
          paymentAccepted: "Cash, Credit Card",
          areaServed: ["Downtown", "Midtown"],
          email: "autoparts@example.com",
          faxNumber: "+12125551235",
          slogan: "Quality parts, great prices",
          description: "Your one-stop shop for auto parts",
          publicAccess: true,
          smokingAllowed: false,
          isAccessibleForFree: true,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.department["@type"]).toBe("AutoPartsStore");
    expect(jsonData.department.name).toBe("Auto Parts Department");
    expect(jsonData.department.currenciesAccepted).toBe("USD");
    expect(jsonData.department.paymentAccepted).toBe("Cash, Credit Card");
    expect(jsonData.department.areaServed).toEqual(["Downtown", "Midtown"]);
    expect(jsonData.department.email).toBe("autoparts@example.com");
    expect(jsonData.department.faxNumber).toBe("+12125551235");
    expect(jsonData.department.slogan).toBe("Quality parts, great prices");
    expect(jsonData.department.description).toBe(
      "Your one-stop shop for auto parts",
    );
    expect(jsonData.department.publicAccess).toBe(true);
    expect(jsonData.department.smokingAllowed).toBe(false);
    expect(jsonData.department.isAccessibleForFree).toBe(true);
  });

  it("handles array of reviews", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Multi-Review Business"
        address="123 Main St"
        review={[
          {
            author: "John Doe",
            reviewRating: {
              "@type": "Rating",
              ratingValue: 5,
            },
            reviewBody: "Excellent service!",
          },
          {
            author: {
              "@type": "Person",
              name: "Jane Smith",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: 4,
            },
            reviewBody: "Good experience",
          },
          {
            author: {
              name: "Bob Johnson",
              url: "https://bobsblog.com",
            },
            reviewRating: {
              ratingValue: 4.5,
            },
            datePublished: "2024-01-01",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.review).toHaveLength(3);
    expect(jsonData.review[0].author).toEqual({
      "@type": "Person",
      name: "John Doe",
    });
    expect(jsonData.review[1].author).toEqual({
      "@type": "Person",
      name: "Jane Smith",
    });
    expect(jsonData.review[2].author).toEqual({
      "@type": "Person",
      name: "Bob Johnson",
      url: "https://bobsblog.com",
    });
    expect(jsonData.review[2].reviewRating).toEqual({
      "@type": "Rating",
      ratingValue: 4.5,
    });
  });

  it("handles currenciesAccepted and paymentAccepted at root level", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Payment Test Business"
        address="123 Main St"
        currenciesAccepted="USD, EUR, GBP"
        paymentAccepted="Cash, Credit Card, PayPal"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.currenciesAccepted).toBe("USD, EUR, GBP");
    expect(jsonData.paymentAccepted).toBe("Cash, Credit Card, PayPal");
  });

  it("handles areaServed as string", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Single Area Business"
        address="123 Main St"
        areaServed="Manhattan"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.areaServed).toEqual(["Manhattan"]);
  });

  it("handles sameAs as single string", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        name="Social Business"
        address="123 Main St"
        sameAs="https://facebook.com/business"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.sameAs).toEqual(["https://facebook.com/business"]);
  });

  it("handles servesCuisine as single string", () => {
    const { container } = render(
      <LocalBusinessJsonLd
        type="Restaurant"
        name="Italian Restaurant"
        address="123 Main St"
        servesCuisine="Italian"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.servesCuisine).toEqual(["Italian"]);
  });
});
