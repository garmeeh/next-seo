import { EventJsonLd } from "next-seo";

export default function EventPage() {
  return (
    <div className="container mx-auto p-8">
      <EventJsonLd
        name="The Adventures of Kira and Morrison"
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
      />

      <article className="prose lg:prose-xl">
        <h1 className="text-3xl font-bold mb-6">
          The Adventures of Kira and Morrison
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Event Details</h2>
            <p>
              <strong>Date:</strong> July 21, 2025
            </p>
            <p>
              <strong>Time:</strong> 7:00 PM - 11:00 PM (EST)
            </p>
            <p>
              <strong>Venue:</strong> Snickerpark Stadium
            </p>
            <p>
              <strong>Address:</strong> 100 West Snickerpark Dr, Snickertown, PA
              19019
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Ticket Information</h2>
            <p>
              <strong>Price:</strong> $30 USD
            </p>
            <p>
              <strong>Availability:</strong> In Stock
            </p>
            <p>
              <strong>On Sale:</strong> May 21, 2024 at 12:00 PM
            </p>
            <a
              href="https://www.example.com/event_offer/12345_202403180430"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Buy Tickets
            </a>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About the Event</h2>
          <p>
            The Adventures of Kira and Morrison is coming to Snickertown in a
            can&apos;t miss performance. Join us for an unforgettable evening of
            music and entertainment at the iconic Snickerpark Stadium.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Performers</h2>
          <p>
            <strong>Kira and Morrison</strong> - The dynamic duo returns to the
            stage with their latest tour, featuring songs from their new album
            and fan favorites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Organized By</h2>
          <p>
            <strong>Kira and Morrison Music</strong>
            <br />
            Visit:{" "}
            <a
              href="https://kiraandmorrisonmusic.com"
              className="text-blue-600 hover:underline"
            >
              kiraandmorrisonmusic.com
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
