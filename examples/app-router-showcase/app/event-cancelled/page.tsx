import { EventJsonLd } from "next-seo";

export default function EventCancelledPage() {
  return (
    <div className="container mx-auto p-8">
      <EventJsonLd
        name="Summer Music Festival 2025"
        startDate="2025-08-15T12:00:00-05:00"
        endDate="2025-08-17T23:00:00-05:00"
        location={{
          "@type": "Place",
          name: "City Park Amphitheater",
          address: {
            "@type": "PostalAddress",
            streetAddress: "500 Park Avenue",
            addressLocality: "Austin",
            addressRegion: "TX",
            postalCode: "78701",
            addressCountry: "US",
          },
        }}
        eventStatus="https://schema.org/EventCancelled"
        description="The annual Summer Music Festival featuring multiple artists across three days."
        image="https://example.com/summer-festival-2025.jpg"
        offers={{
          "@type": "Offer",
          url: "https://example.com/summer-festival-tickets",
          price: 150,
          priceCurrency: "USD",
          availability: "https://schema.org/SoldOut",
        }}
        organizer="Austin Music Events"
      />

      <article className="prose lg:prose-xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <h1 className="text-3xl font-bold mb-2">EVENT CANCELLED</h1>
          <p className="text-lg">
            Summer Music Festival 2025 has been cancelled. All tickets will be
            refunded.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Summer Music Festival 2025
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-100 p-4 rounded opacity-60">
            <h3 className="text-xl font-semibold mb-2">
              Original Event Details
            </h3>
            <p>
              <strong>Date:</strong> August 15-17, 2025
            </p>
            <p>
              <strong>Venue:</strong> City Park Amphitheater
            </p>
            <p>
              <strong>Location:</strong> Austin, TX
            </p>
            <p className="text-red-600 font-semibold mt-2">Status: CANCELLED</p>
          </div>

          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Refund Information</h3>
            <p>
              All ticket holders will receive a full refund within 7-10 business
              days.
            </p>
            <p className="mt-2">
              For questions about refunds, please contact:
              <br />
              Email: refunds@austinmusicevents.com
              <br />
              Phone: 1-800-REFUNDS
            </p>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Cancellation Notice</h3>
          <p>
            We regret to inform you that the Summer Music Festival 2025 has been
            cancelled due to unforeseen circumstances. We apologize for any
            inconvenience this may cause and appreciate your understanding.
          </p>
          <p className="mt-4">
            All ticket purchases will be automatically refunded to the original
            payment method. Please allow 7-10 business days for the refund to
            appear on your statement.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p>
            Follow Austin Music Events for updates about future events and
            festivals. We look forward to bringing you amazing musical
            experiences in the future.
          </p>
        </section>
      </article>
    </div>
  );
}
