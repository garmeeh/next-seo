import { ServiceJsonLd } from "../../components/custom/ServiceJsonLd";

export default function CustomServicePage() {
  return (
    <div className="container">
      <ServiceJsonLd
        name="Web Development Services"
        serviceType="Professional Service"
        description="Full-stack web development and consulting services for modern businesses"
        provider={{
          name: "Tech Solutions Inc",
          url: "https://example.com",
          logo: "https://example.com/logo.png",
          address: {
            streetAddress: "123 Tech Street",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94105",
            addressCountry: "US",
          },
        }}
        areaServed={["US", "CA", "UK", "AU"]}
        url="https://example.com/services/web-development"
        offers={{
          priceRange: "$$$",
        }}
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 127,
          bestRating: 5,
          worstRating: 1,
        }}
      />

      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Web Development Services</h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Custom Component Demo - Service JSON-LD with processors
        </p>

        <section>
          <h2>Our Services</h2>
          <p>
            This page demonstrates a custom Service JSON-LD component built
            using next-seo's core utilities. Notice how the provider can be
            passed as either a string or a complex object, and it gets properly
            converted to an Organization schema type.
          </p>
          <ul>
            <li>Frontend Development (React, Next.js, Vue)</li>
            <li>Backend Development (Node.js, Python, Go)</li>
            <li>API Design and Implementation</li>
            <li>Database Architecture</li>
            <li>Cloud Infrastructure Setup</li>
          </ul>
        </section>

        <section style={{ marginTop: "2rem" }}>
          <h2>Service Areas</h2>
          <p>We proudly serve clients in:</p>
          <ul>
            <li>United States</li>
            <li>Canada</li>
            <li>United Kingdom</li>
            <li>Australia</li>
          </ul>
        </section>

        <section style={{ marginTop: "2rem" }}>
          <h2>Client Reviews</h2>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f0f8ff",
              borderRadius: "8px",
            }}
          >
            <strong>⭐ 4.8/5.0</strong> based on 127 reviews
          </div>
        </section>

        <section
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h3>Developer Note</h3>
          <p style={{ fontSize: "0.9rem" }}>
            This custom component demonstrates:
          </p>
          <ul style={{ fontSize: "0.9rem" }}>
            <li>
              processors.processOrganization() for flexible provider input
            </li>
            <li>processors.processAggregateRating() for rating data</li>
            <li>
              Array handling for areaServed (converts single string to array)
            </li>
            <li>
              Complex nested objects without requiring @type specifications
            </li>
          </ul>
          <p style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
            The provider field accepts both a simple string (e.g., "Tech
            Solutions Inc") or a complex object with address, logo, and other
            properties. The processor automatically detects and applies the
            correct @type.
          </p>
        </section>
      </main>
    </div>
  );
}
