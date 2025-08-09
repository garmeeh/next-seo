import { EmployerAggregateRatingJsonLd } from "next-seo";

export default function EmployerAggregateRatingAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <EmployerAggregateRatingJsonLd
        itemReviewed={{
          name: "TechCorp International",
          sameAs: "https://www.techcorp-international.example.com",
          url: "https://www.techcorp-international.example.com",
          logo: {
            url: "https://example.com/techcorp-logo.png",
            width: 600,
            height: 300,
          },
          description:
            "Leading technology company specializing in cloud solutions and AI",
          telephone: "+1-555-123-4567",
          email: "careers@techcorp.example.com",
          address: [
            {
              streetAddress: "123 Innovation Way",
              addressLocality: "San Francisco",
              addressRegion: "CA",
              postalCode: "94105",
              addressCountry: "US",
            },
            {
              streetAddress: "456 Tech Park",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10001",
              addressCountry: "US",
            },
          ],
          numberOfEmployees: {
            value: 5000,
          },
        }}
        ratingValue={4.7}
        ratingCount={1842}
        reviewCount={1755}
        bestRating={5}
        worstRating={1}
      />

      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold">TechCorp International</h1>
              <p className="text-xl text-gray-600">
                Leading technology company specializing in cloud solutions and
                AI
              </p>
            </div>
          </div>
        </header>

        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-semibold mb-4">Employee Ratings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600">4.7</div>
                <div className="text-gray-600">out of 5.0</div>
                <div className="text-sm text-gray-500 mt-2">Overall Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">1,842</div>
                <div className="text-sm text-gray-500 mt-2">Total Ratings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">1,755</div>
                <div className="text-sm text-gray-500 mt-2">
                  Written Reviews
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
          <p className="text-gray-700 mb-4">
            TechCorp International is a global leader in cloud computing and
            artificial intelligence solutions. With over 5,000 employees across
            multiple offices, we're committed to creating an inclusive,
            innovative workplace where everyone can thrive.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">San Francisco HQ</h3>
              <p className="text-gray-600">
                123 Innovation Way
                <br />
                San Francisco, CA 94105
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">New York Office</h3>
              <p className="text-gray-600">
                456 Tech Park
                <br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Why Employees Love Working Here
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Competitive Benefits</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive health coverage, 401k matching, and more
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Remote-First Culture</h3>
                <p className="text-gray-600 text-sm">
                  Flexible work arrangements and global collaboration
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Career Growth</h3>
                <p className="text-gray-600 text-sm">
                  Learning opportunities and clear advancement paths
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Innovation Focus</h3>
                <p className="text-gray-600 text-sm">
                  Work on cutting-edge projects with latest technologies
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Careers Team</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:careers@techcorp.example.com"
                className="text-blue-600 hover:underline"
              >
                careers@techcorp.example.com
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> +1-555-123-4567
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong>{" "}
              <a
                href="https://www.techcorp-international.example.com"
                className="text-blue-600 hover:underline"
              >
                www.techcorp-international.example.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
