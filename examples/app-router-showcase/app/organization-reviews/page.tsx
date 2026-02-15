import { OrganizationJsonLd } from "next-seo";

export default function OrganizationReviewsPage() {
  return (
    <div className="container mx-auto p-8">
      <OrganizationJsonLd
        name="Acme Software Inc."
        url="https://www.acmesoftware.com"
        logo="https://www.acmesoftware.com/logo.png"
        description="Acme Software delivers enterprise-grade solutions for businesses worldwide"
        sameAs={[
          "https://twitter.com/acmesoftware",
          "https://linkedin.com/company/acme-software",
        ]}
        telephone="+1-800-555-0199"
        email="info@acmesoftware.com"
        review={[
          {
            author: "Sarah Johnson",
            reviewBody:
              "Acme Software transformed our business operations. Their enterprise platform is reliable and their support team is outstanding.",
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            datePublished: "2025-06-15",
          },
          {
            author: {
              name: "Michael Chen",
              url: "https://example.com/michael-chen",
            },
            reviewBody:
              "Great software solutions with excellent customer service. Highly recommend for mid-size businesses.",
            reviewRating: {
              ratingValue: 4,
              bestRating: 5,
            },
            datePublished: "2025-08-22",
          },
        ]}
        aggregateRating={{
          ratingValue: 4.6,
          ratingCount: 312,
          reviewCount: 245,
          bestRating: 5,
          worstRating: 1,
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Acme Software Inc.</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            Acme Software delivers enterprise-grade solutions for businesses
            worldwide. With over 300 verified reviews and an average rating of
            4.6 out of 5, we are trusted by thousands of organizations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="font-semibold">Sarah Johnson</span>
                <span className="ml-2 text-yellow-500">5/5</span>
              </div>
              <p className="text-gray-700">
                Acme Software transformed our business operations. Their
                enterprise platform is reliable and their support team is
                outstanding.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="font-semibold">Michael Chen</span>
                <span className="ml-2 text-yellow-500">4/5</span>
              </div>
              <p className="text-gray-700">
                Great software solutions with excellent customer service. Highly
                recommend for mid-size businesses.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
