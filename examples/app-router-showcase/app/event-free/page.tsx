import { EventJsonLd } from "next-seo";

export default function EventFreePage() {
  return (
    <div className="container mx-auto p-8">
      <EventJsonLd
        name="Community Coding Workshop: Introduction to Web Development"
        startDate="2025-07-15T18:00:00-05:00"
        endDate="2025-07-15T20:00:00-05:00"
        location={{
          "@type": "Place",
          name: "Downtown Public Library",
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Main Street",
            addressLocality: "Springfield",
            addressRegion: "IL",
            postalCode: "62701",
            addressCountry: "US",
          },
        }}
        description="Free workshop for beginners interested in learning web development. No prior experience required!"
        eventStatus="https://schema.org/EventScheduled"
        image="https://example.com/coding-workshop.jpg"
        offers={{
          "@type": "Offer",
          url: "https://example.com/register/coding-workshop",
          price: 0,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }}
        performer="Sarah Johnson"
        organizer={{
          "@type": "Organization",
          name: "Code for Community",
          url: "https://codeforcommunity.org",
        }}
        url="https://codeforcommunity.org/events/intro-web-dev"
      />

      <article className="prose lg:prose-xl">
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6">
          <h1 className="text-3xl font-bold mb-2">FREE EVENT</h1>
          <p className="text-lg">
            No registration fee required! Open to all community members.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Community Coding Workshop: Introduction to Web Development
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Event Details</h3>
            <p>
              <strong>Date:</strong> July 15, 2025
            </p>
            <p>
              <strong>Time:</strong> 6:00 PM - 8:00 PM (CST)
            </p>
            <p>
              <strong>Venue:</strong> Downtown Public Library
            </p>
            <p>
              <strong>Address:</strong> 123 Main Street, Springfield, IL
            </p>
            <p className="text-green-600 font-semibold mt-2">Admission: FREE</p>
          </div>

          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Registration</h3>
            <p>
              <strong>Cost:</strong> FREE (No fees)
            </p>
            <p>
              <strong>Seats Available:</strong> Limited to 30
            </p>
            <p className="mt-2 text-sm">
              Registration required to reserve your spot.
            </p>
            <a
              href="https://example.com/register/coding-workshop"
              className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Register Now (Free)
            </a>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">About the Workshop</h3>
          <p>
            Join us for a free, beginner-friendly workshop on web development!
            This two-hour session will introduce you to the basics of HTML, CSS,
            and JavaScript. No prior programming experience is required.
          </p>
          <p className="mt-4">
            Perfect for anyone interested in learning to code, whether
            you&apos;re exploring a career change, looking to build your own
            website, or just curious about how the web works.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">What You&apos;ll Learn</h3>
          <ul className="list-disc pl-6">
            <li>Basic HTML structure and tags</li>
            <li>Introduction to CSS styling</li>
            <li>JavaScript fundamentals</li>
            <li>Creating your first web page</li>
            <li>Resources for continued learning</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">What to Bring</h3>
          <ul className="list-disc pl-6">
            <li>Laptop (if you have one - we have a few loaners available)</li>
            <li>Enthusiasm to learn!</li>
            <li>Questions about web development</li>
          </ul>
          <p className="mt-4 text-sm italic">
            Light refreshments will be provided.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Instructor</h3>
          <p>
            <strong>Sarah Johnson</strong> is a senior web developer with over
            10 years of experience and a passion for teaching. She volunteers
            regularly with Code for Community to help make tech education
            accessible to everyone.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">
            About Code for Community
          </h3>
          <p>
            Code for Community is a non-profit organization dedicated to
            providing free coding education and resources to underserved
            communities. Learn more at{" "}
            <a
              href="https://codeforcommunity.org"
              className="text-blue-600 hover:underline"
            >
              codeforcommunity.org
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
