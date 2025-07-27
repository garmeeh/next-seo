import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VacationRentalJsonLd from "./VacationRentalJsonLd";

describe("VacationRentalJsonLd", () => {
  it("renders basic VacationRental with minimal required props", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 5,
          },
        }}
        identifier="abc123"
        image="https://example.com/image1.jpg"
        latitude={42.12345}
        longitude={101.12345}
        name="My Beautiful Vacation Rental"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "VacationRental",
      containsPlace: {
        "@type": "Accommodation",
        occupancy: {
          "@type": "QuantitativeValue",
          value: 5,
        },
      },
      identifier: "abc123",
      image: ["https://example.com/image1.jpg"],
      latitude: 42.12345,
      longitude: 101.12345,
      name: "My Beautiful Vacation Rental",
    });
  });

  it("handles array of images", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 2,
          },
        }}
        identifier="xyz789"
        image={[
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg",
          "https://example.com/image3.jpg",
          "https://example.com/image4.jpg",
          "https://example.com/image5.jpg",
          "https://example.com/image6.jpg",
          "https://example.com/image7.jpg",
          "https://example.com/image8.jpg",
        ]}
        latitude="42.12345"
        longitude="101.12345"
        name="Beach House Rental"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.image).toHaveLength(8);
    expect(jsonData.image[0]).toBe("https://example.com/image1.jpg");
    expect(jsonData.image[7]).toBe("https://example.com/image8.jpg");
  });

  it("handles ImageObject for images", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 4,
          },
        }}
        identifier="test123"
        image={{
          url: "https://example.com/hero.jpg",
          width: 1920,
          height: 1080,
          caption: "Beautiful vacation rental exterior",
        }}
        latitude={42.12345}
        longitude={101.12345}
        name="Mountain Cabin"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.image).toEqual([
      {
        "@type": "ImageObject",
        url: "https://example.com/hero.jpg",
        width: 1920,
        height: 1080,
        caption: "Beautiful vacation rental exterior",
      },
    ]);
  });

  it("handles comprehensive accommodation details", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          additionalType: "EntirePlace",
          bed: [
            {
              numberOfBeds: 1,
              typeOfBed: "Queen",
            },
            {
              numberOfBeds: 2,
              typeOfBed: "Single",
            },
          ],
          occupancy: {
            value: 5,
          },
          amenityFeature: [
            {
              name: "ac",
              value: true,
            },
            {
              name: "wifi",
              value: true,
            },
            {
              name: "poolType",
              value: "Outdoor",
            },
          ],
          floorSize: {
            value: 75,
            unitCode: "MTK",
          },
          numberOfBathroomsTotal: 2.5,
          numberOfBedrooms: 3,
          numberOfRooms: 5,
          petsAllowed: true,
          smokingAllowed: false,
        }}
        identifier="lux123"
        image="https://example.com/luxury.jpg"
        latitude={42.12345}
        longitude={101.12345}
        name="Luxury Villa"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.containsPlace).toEqual({
      "@type": "Accommodation",
      additionalType: "EntirePlace",
      bed: [
        {
          "@type": "BedDetails",
          numberOfBeds: 1,
          typeOfBed: "Queen",
        },
        {
          "@type": "BedDetails",
          numberOfBeds: 2,
          typeOfBed: "Single",
        },
      ],
      occupancy: {
        "@type": "QuantitativeValue",
        value: 5,
      },
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "ac",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "wifi",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "poolType",
          value: "Outdoor",
        },
      ],
      floorSize: {
        "@type": "QuantitativeValue",
        value: 75,
        unitCode: "MTK",
      },
      numberOfBathroomsTotal: 2.5,
      numberOfBedrooms: 3,
      numberOfRooms: 5,
      petsAllowed: true,
      smokingAllowed: false,
    });
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 6,
          },
        }}
        identifier="full123"
        image="https://example.com/rental.jpg"
        latitude={42.12345}
        longitude={101.12345}
        name="Complete Vacation Rental"
        additionalType="Villa"
        address={{
          addressCountry: "US",
          addressLocality: "Mountain View",
          addressRegion: "California",
          postalCode: "94043",
          streetAddress: "1600 Amphitheatre Pkwy, Unit 6E",
        }}
        aggregateRating={{
          ratingValue: 4.5,
          ratingCount: 10,
          reviewCount: 3,
          bestRating: 5,
        }}
        brand={{
          name: "Luxury Rentals Inc",
        }}
        checkinTime="18:00:00+08:00"
        checkoutTime="11:00:00+08:00"
        description="A great Vacation Rental in the perfect neighborhood."
        knowsLanguage={["en-US", "fr-FR", "es-ES"]}
        review={[
          {
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            author: "John Doe",
            datePublished: "2024-01-01",
          },
          {
            reviewRating: {
              ratingValue: 4,
              bestRating: 5,
            },
            author: {
              name: "Jane Smith",
            },
            datePublished: "2024-01-15",
            reviewBody: "Great place to stay!",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.additionalType).toBe("Villa");
    expect(jsonData.address).toEqual({
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "Mountain View",
      addressRegion: "California",
      postalCode: "94043",
      streetAddress: "1600 Amphitheatre Pkwy, Unit 6E",
    });
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.5,
      ratingCount: 10,
      reviewCount: 3,
      bestRating: 5,
    });
    expect(jsonData.brand).toEqual({
      "@type": "Brand",
      name: "Luxury Rentals Inc",
    });
    expect(jsonData.checkinTime).toBe("18:00:00+08:00");
    expect(jsonData.checkoutTime).toBe("11:00:00+08:00");
    expect(jsonData.description).toBe(
      "A great Vacation Rental in the perfect neighborhood.",
    );
    expect(jsonData.knowsLanguage).toEqual(["en-US", "fr-FR", "es-ES"]);
    expect(jsonData.review).toHaveLength(2);
  });

  it("handles string latitude and longitude", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 3,
          },
        }}
        identifier="str123"
        image="https://example.com/rental.jpg"
        latitude="42.12345"
        longitude="101.12345"
        name="String Coordinates Rental"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.latitude).toBe("42.12345");
    expect(jsonData.longitude).toBe("101.12345");
  });

  it("prefers geo coordinates over latitude/longitude", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 3,
          },
        }}
        identifier="geo123"
        image="https://example.com/rental.jpg"
        latitude={42.12345}
        longitude={101.12345}
        geo={{
          latitude: 43.54321,
          longitude: 102.54321,
        }}
        name="Geo Coordinates Rental"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.latitude).toBe(43.54321);
    expect(jsonData.longitude).toBe(102.54321);
  });

  it("handles single language string", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 4,
          },
        }}
        identifier="lang123"
        image="https://example.com/rental.jpg"
        latitude={42.12345}
        longitude={101.12345}
        name="Single Language Rental"
        knowsLanguage="en-US"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.knowsLanguage).toEqual(["en-US"]);
  });

  it("handles custom scriptId and scriptKey", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 2,
          },
        }}
        identifier="custom123"
        image="https://example.com/rental.jpg"
        latitude={42.12345}
        longitude={101.12345}
        name="Custom Script Rental"
        scriptId="custom-vacation-rental"
        scriptKey="vacation-rental-key"
      />,
    );

    const script = container.querySelector("#custom-vacation-rental");
    expect(script).toBeTruthy();
    expect(script?.getAttribute("data-testid")).toBe("custom-vacation-rental");
  });

  it("handles amenityFeature without @type", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 4,
          },
          amenityFeature: {
            name: "beachAccess",
            value: true,
          },
        }}
        identifier="amenity123"
        image="https://example.com/rental.jpg"
        latitude={42.12345}
        longitude={101.12345}
        name="Beach Access Rental"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.containsPlace.amenityFeature).toEqual({
      "@type": "LocationFeatureSpecification",
      name: "beachAccess",
      value: true,
    });
  });

  it("handles bed without @type", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 2,
          },
          bed: {
            numberOfBeds: 1,
            typeOfBed: "King",
          },
        }}
        identifier="bed123"
        image="https://example.com/rental.jpg"
        latitude={42.12345}
        longitude={101.12345}
        name="King Bed Rental"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.containsPlace.bed).toEqual({
      "@type": "BedDetails",
      numberOfBeds: 1,
      typeOfBed: "King",
    });
  });

  it("handles review with string author", () => {
    const { container } = render(
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 4,
          },
        }}
        identifier="review123"
        image="https://example.com/rental.jpg"
        latitude={42.12345}
        longitude={101.12345}
        name="Reviewed Rental"
        review={{
          reviewRating: {
            ratingValue: 5,
          },
          author: "Happy Customer",
          datePublished: "2024-01-01",
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
        ratingValue: 5,
      },
      author: {
        "@type": "Person",
        name: "Happy Customer",
      },
      datePublished: "2024-01-01",
    });
  });
});
