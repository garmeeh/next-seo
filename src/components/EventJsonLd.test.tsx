import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EventJsonLd from "./EventJsonLd";

describe("EventJsonLd", () => {
  it("renders basic Event with minimal props", () => {
    const { container } = render(
      <EventJsonLd
        name="The Adventures of Kira and Morrison"
        startDate="2025-07-21T19:00-05:00"
        location="Snickerpark Stadium"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "The Adventures of Kira and Morrison",
      startDate: "2025-07-21T19:00-05:00",
      location: {
        "@type": "Place",
        name: "Snickerpark Stadium",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Snickerpark Stadium",
        },
      },
    });
  });

  it("renders Event with full location object", () => {
    const { container } = render(
      <EventJsonLd
        name="Tech Conference 2025"
        startDate="2025-08-15T09:00:00-08:00"
        location={{
          "@type": "Place",
          name: "Convention Center",
          address: {
            "@type": "PostalAddress",
            streetAddress: "100 Main Street",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94105",
            addressCountry: "US",
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.location).toEqual({
      "@type": "Place",
      name: "Convention Center",
      address: {
        "@type": "PostalAddress",
        streetAddress: "100 Main Street",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94105",
        addressCountry: "US",
      },
    });
  });

  it("handles string performer", () => {
    const { container } = render(
      <EventJsonLd
        name="Comedy Night"
        startDate="2025-07-21T20:00:00"
        location="Comedy Club"
        performer="John Doe"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.performer).toEqual({
      "@type": "PerformingGroup",
      name: "John Doe",
    });
  });

  it("handles multiple performers", () => {
    const { container } = render(
      <EventJsonLd
        name="Music Festival"
        startDate="2025-07-21T14:00:00"
        location="Festival Grounds"
        performer={[
          "Band One",
          {
            "@type": "Person",
            name: "Solo Artist",
          },
          {
            "@type": "PerformingGroup",
            name: "Band Two",
          },
        ]}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.performer).toEqual([
      {
        "@type": "PerformingGroup",
        name: "Band One",
      },
      {
        "@type": "Person",
        name: "Solo Artist",
      },
      {
        "@type": "PerformingGroup",
        name: "Band Two",
      },
    ]);
  });

  it("handles string organizer", () => {
    const { container } = render(
      <EventJsonLd
        name="Charity Run"
        startDate="2025-09-01T07:00:00"
        location="City Park"
        organizer="Local Charity Foundation"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.organizer).toEqual({
      "@type": "Organization",
      name: "Local Charity Foundation",
    });
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <EventJsonLd
        name="Complete Event Example"
        startDate="2025-07-21T19:00-05:00"
        endDate="2025-07-21T23:00-05:00"
        location={{
          "@type": "Place",
          name: "Snickerpark Stadium",
          address: {
            "@type": "PostalAddress",
            streetAddress: "100 West Snickerpark Dr",
            addressLocality: "Snickertown",
            postalCode: "19019",
            addressRegion: "PA",
            addressCountry: "US",
          },
        }}
        description="The Adventures of Kira and Morrison is coming to Snickertown in a can't miss performance."
        eventStatus="https://schema.org/EventScheduled"
        image={[
          "https://example.com/photos/1x1/photo.jpg",
          "https://example.com/photos/4x3/photo.jpg",
          "https://example.com/photos/16x9/photo.jpg",
        ]}
        offers={{
          "@type": "Offer",
          url: "https://www.example.com/event_offer/12345_202403180430",
          price: 30,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          validFrom: "2024-05-21T12:00",
        }}
        performer={{
          "@type": "PerformingGroup",
          name: "Kira and Morrison",
        }}
        organizer={{
          "@type": "Organization",
          name: "Kira and Morrison Music",
          url: "https://kiraandmorrisonmusic.com",
        }}
        url="https://example.com/events/kira-morrison"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Complete Event Example",
      startDate: "2025-07-21T19:00-05:00",
      endDate: "2025-07-21T23:00-05:00",
      description:
        "The Adventures of Kira and Morrison is coming to Snickertown in a can't miss performance.",
      eventStatus: "https://schema.org/EventScheduled",
      url: "https://example.com/events/kira-morrison",
    });

    expect(jsonData.image).toEqual([
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg",
    ]);
  });

  it("handles cancelled event status", () => {
    const { container } = render(
      <EventJsonLd
        name="Cancelled Concert"
        startDate="2025-07-21T19:00-05:00"
        location="Concert Hall"
        eventStatus="https://schema.org/EventCancelled"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.eventStatus).toBe("https://schema.org/EventCancelled");
  });

  it("handles rescheduled event with previousStartDate", () => {
    const { container } = render(
      <EventJsonLd
        name="Rescheduled Conference"
        startDate="2025-09-15T09:00:00"
        location="Convention Center"
        eventStatus="https://schema.org/EventRescheduled"
        previousStartDate="2025-07-15T09:00:00"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.eventStatus).toBe("https://schema.org/EventRescheduled");
    expect(jsonData.previousStartDate).toBe("2025-07-15T09:00:00");
  });

  it("handles multiple previous start dates", () => {
    const { container } = render(
      <EventJsonLd
        name="Much Rescheduled Event"
        startDate="2025-12-01T19:00:00"
        location="Event Space"
        eventStatus="https://schema.org/EventRescheduled"
        previousStartDate={[
          "2025-03-01T19:00:00",
          "2025-06-01T19:00:00",
          "2025-09-01T19:00:00",
        ]}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.previousStartDate).toEqual([
      "2025-03-01T19:00:00",
      "2025-06-01T19:00:00",
      "2025-09-01T19:00:00",
    ]);
  });

  it("handles multiple offers", () => {
    const { container } = render(
      <EventJsonLd
        name="Tiered Pricing Event"
        startDate="2025-08-01T19:00:00"
        location="Theater"
        offers={[
          {
            "@type": "Offer",
            price: 25,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            price: 50,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ]}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.offers).toHaveLength(2);
    expect(jsonData.offers[0].price).toBe(25);
    expect(jsonData.offers[1].price).toBe(50);
  });

  it("handles ImageObject in images", () => {
    const { container } = render(
      <EventJsonLd
        name="Event with Rich Images"
        startDate="2025-07-21T19:00:00"
        location="Photo Gallery"
        image={[
          "https://example.com/simple.jpg",
          {
            "@type": "ImageObject",
            url: "https://example.com/detailed.jpg",
            width: 1200,
            height: 800,
            caption: "Event poster",
          },
        ]}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.image).toEqual([
      "https://example.com/simple.jpg",
      {
        "@type": "ImageObject",
        url: "https://example.com/detailed.jpg",
        width: 1200,
        height: 800,
        caption: "Event poster",
      },
    ]);
  });

  it("handles custom scriptId and scriptKey", () => {
    const { container } = render(
      <EventJsonLd
        name="Custom ID Event"
        startDate="2025-07-21T19:00:00"
        location="Venue"
        scriptId="my-event-json-ld"
        scriptKey="event-custom-key"
      />,
    );

    const script = container.querySelector("#my-event-json-ld");
    expect(script).toBeTruthy();
  });

  it("handles day-long event with date only", () => {
    const { container } = render(
      <EventJsonLd
        name="All Day Festival"
        startDate="2025-07-04"
        endDate="2025-07-04"
        location="City Square"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.startDate).toBe("2025-07-04");
    expect(jsonData.endDate).toBe("2025-07-04");
  });

  it("handles free event with price 0", () => {
    const { container } = render(
      <EventJsonLd
        name="Free Community Event"
        startDate="2025-08-01T14:00:00"
        location="Community Center"
        offers={{
          "@type": "Offer",
          price: 0,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.offers.price).toBe(0);
  });

  it("handles single image as string", () => {
    const { container } = render(
      <EventJsonLd
        name="Event with Single Image"
        startDate="2025-07-21T19:00:00"
        location="Photo Gallery"
        image="https://example.com/event-poster.jpg"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.image).toBe("https://example.com/event-poster.jpg");
  });

  it("handles single image as ImageObject", () => {
    const { container } = render(
      <EventJsonLd
        name="Event with Single Rich Image"
        startDate="2025-07-21T19:00:00"
        location="Photo Gallery"
        image={{
          url: "https://example.com/event-poster.jpg",
          width: 1920,
          height: 1080,
          caption: "Main event poster",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonData.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/event-poster.jpg",
      width: 1920,
      height: 1080,
      caption: "Main event poster",
    });
  });
});
