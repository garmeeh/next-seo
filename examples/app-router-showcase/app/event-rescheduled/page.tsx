import { EventJsonLd } from "next-seo";

export default function EventRescheduledPage() {
  return (
    <div className="container mx-auto p-8">
      <EventJsonLd
        name="Tech Conference 2025: Future of AI"
        startDate="2025-09-20T09:00:00-07:00"
        endDate="2025-09-22T17:00:00-07:00"
        location={{
          "@type": "Place",
          name: "San Francisco Convention Center",
          address: {
            "@type": "PostalAddress",
            streetAddress: "747 Howard Street",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94103",
            addressCountry: "US",
          },
        }}
        eventStatus="https://schema.org/EventRescheduled"
        previousStartDate={[
          "2025-03-15T09:00:00-07:00",
          "2025-06-10T09:00:00-07:00",
        ]}
        description="Join industry leaders for three days of cutting-edge AI discussions, workshops, and networking."
        image={[
          "https://example.com/tech-conf-2025-16x9.jpg",
          "https://example.com/tech-conf-2025-4x3.jpg",
          "https://example.com/tech-conf-2025-1x1.jpg",
        ]}
        offers={[
          {
            "@type": "Offer",
            url: "https://example.com/tickets/early-bird",
            price: 299,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: "2025-01-01T00:00:00",
          },
          {
            "@type": "Offer",
            url: "https://example.com/tickets/vip",
            price: 599,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: "2025-01-01T00:00:00",
          },
        ]}
        performer={[
          {
            "@type": "Person",
            name: "Dr. Sarah Chen",
            description: "AI Research Director at TechCorp",
          },
          {
            "@type": "Person",
            name: "John Martinez",
            description: "CEO of FutureAI",
          },
          "Panel of Industry Experts",
        ]}
        organizer={{
          "@type": "Organization",
          name: "TechEvents International",
          url: "https://techevents.com",
        }}
        url="https://techconf2025.com"
      />

      <article className="prose lg:prose-xl">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
          <h1 className="text-3xl font-bold mb-2">EVENT RESCHEDULED</h1>
          <p className="text-lg">
            New Date: September 20-22, 2025 (Originally scheduled for March
            15-17, then June 10-12)
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Tech Conference 2025: Future of AI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">New Event Details</h3>
            <p>
              <strong>Date:</strong> September 20-22, 2025
            </p>
            <p>
              <strong>Time:</strong> 9:00 AM - 5:00 PM (PST)
            </p>
            <p>
              <strong>Venue:</strong> San Francisco Convention Center
            </p>
            <p>
              <strong>Address:</strong> 747 Howard Street, San Francisco, CA
            </p>
            <p className="text-yellow-600 font-semibold mt-2">
              Status: RESCHEDULED
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Ticket Information</h3>
            <p>
              <strong>Early Bird:</strong> $299 USD
            </p>
            <p>
              <strong>VIP Pass:</strong> $599 USD
            </p>
            <p className="mt-2 text-sm">
              All previously purchased tickets remain valid for the new dates.
            </p>
            <a
              href="https://techconf2025.com"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Learn More
            </a>
          </div>
        </div>

        <section className="mb-8 bg-blue-50 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">Important Notice</h3>
          <p>
            Due to venue availability conflicts, Tech Conference 2025 has been
            rescheduled from its original dates. This is the second reschedule:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Original Date: March 15-17, 2025</li>
            <li>First Reschedule: June 10-12, 2025</li>
            <li>
              <strong>Final Date: September 20-22, 2025</strong>
            </li>
          </ul>
          <p className="mt-4">
            All registered attendees have been notified via email. Your tickets
            remain valid for the new dates. If you cannot attend, full refunds
            are available until August 1, 2025.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Featured Speakers</h3>
          <ul className="list-disc pl-6">
            <li>
              <strong>Dr. Sarah Chen</strong> - AI Research Director at TechCorp
            </li>
            <li>
              <strong>John Martinez</strong> - CEO of FutureAI
            </li>
            <li>Panel discussions with industry experts</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">About the Conference</h3>
          <p>
            Join industry leaders for three days of cutting-edge AI discussions,
            workshops, and networking. Explore the latest developments in
            artificial intelligence, machine learning, and their applications
            across industries.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <p>
            For questions about the reschedule or refunds:
            <br />
            Email: support@techconf2025.com
            <br />
            Phone: 1-800-TECH-CONF
            <br />
            Website:{" "}
            <a
              href="https://techconf2025.com"
              className="text-blue-600 hover:underline"
            >
              techconf2025.com
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
