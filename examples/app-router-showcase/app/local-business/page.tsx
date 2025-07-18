import { LocalBusinessJsonLd } from "next-seo";

export default function LocalBusinessPage() {
  return (
    <div className="container mx-auto p-8">
      <LocalBusinessJsonLd
        type="LocalBusiness"
        name="Gary's Tech Repair Shop"
        address={{
          "@type": "PostalAddress",
          streetAddress: "123 Tech Street",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94102",
          addressCountry: "US",
        }}
        telephone="+14155551234"
        url="https://example.com/locations/sf"
        description="Professional computer and phone repair services in San Francisco"
        openingHoursSpecification={[
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "16:00",
          },
        ]}
      />

      <article className="prose lg:prose-xl">
        <h1>Gary's Tech Repair Shop</h1>
        <p>
          Welcome to Gary's Tech Repair Shop, your trusted partner for all
          computer and phone repair needs in San Francisco.
        </p>

        <h2>Our Services</h2>
        <ul>
          <li>Computer repair and upgrades</li>
          <li>Phone screen replacement</li>
          <li>Data recovery</li>
          <li>Virus removal</li>
        </ul>

        <h2>Location & Hours</h2>
        <address>
          123 Tech Street
          <br />
          San Francisco, CA 94102
          <br />
          Phone: (415) 555-1234
        </address>

        <p>
          <strong>Hours:</strong>
          <br />
          Monday-Friday: 9:00 AM - 6:00 PM
          <br />
          Saturday: 10:00 AM - 4:00 PM
          <br />
          Sunday: Closed
        </p>
      </article>
    </div>
  );
}
