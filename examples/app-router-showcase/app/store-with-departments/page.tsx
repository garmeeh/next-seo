import { LocalBusinessJsonLd } from "next-seo";

export default function StoreWithDepartmentsPage() {
  return (
    <div className="container mx-auto p-8">
      <LocalBusinessJsonLd
        type="Store"
        name="MegaMart Superstore"
        address={{
          "@type": "PostalAddress",
          streetAddress: "789 Shopping Plaza Drive",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          postalCode: "90028",
          addressCountry: "US",
        }}
        geo={{
          "@type": "GeoCoordinates",
          latitude: 34.1022,
          longitude: -118.3281,
        }}
        url="https://example.com/stores/megamart-la"
        telephone="+13235554321"
        image="https://example.com/images/megamart-storefront.jpg"
        priceRange="$$"
        openingHoursSpecification={{
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "22:00",
        }}
        department={[
          {
            type: "Pharmacy",
            name: "MegaMart Pharmacy",
            address: "789 Shopping Plaza Drive, Los Angeles, CA 90028",
            telephone: "+13235554322",
            priceRange: "$",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "20:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "10:00",
                closes: "17:00",
              },
            ],
            description:
              "Full-service pharmacy with prescription services and health consultations",
          },
          {
            type: "AutoPartsStore",
            name: "MegaMart Auto Center",
            address: "789 Shopping Plaza Drive, Los Angeles, CA 90028",
            telephone: "+13235554323",
            priceRange: "$$",
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "08:00",
              closes: "20:00",
            },
            description: "Complete auto parts and accessories department",
          },
          {
            type: "Bakery",
            name: "MegaMart Fresh Bakery",
            address: "789 Shopping Plaza Drive, Los Angeles, CA 90028",
            telephone: "+13235554324",
            priceRange: "$",
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "06:00",
              closes: "20:00",
            },
            description: "Fresh baked goods made daily on-site",
          },
        ]}
        sameAs={[
          "https://www.facebook.com/megamartla",
          "https://twitter.com/megamartla",
        ]}
        description="MegaMart Superstore is your one-stop shop for groceries, pharmacy, auto parts, and more. Serving the Los Angeles community since 1985."
        paymentAccepted="Cash, Credit Card, Debit Card, Mobile Payment"
        currenciesAccepted="USD"
        areaServed={[
          "Los Angeles",
          "Hollywood",
          "West Hollywood",
          "Beverly Hills",
        ]}
        publicAccess={true}
      />

      <article className="prose lg:prose-xl">
        <h1>MegaMart Superstore</h1>
        <p className="text-xl">Your neighborhood one-stop shop since 1985</p>

        <p>
          MegaMart Superstore offers everything you need under one roof. From
          fresh groceries to pharmacy services, auto parts to freshly baked
          goods, we've got you covered.
        </p>

        <h2>Store Hours</h2>
        <p>Main Store: Daily 8:00 AM - 10:00 PM</p>

        <h2>Our Departments</h2>

        <h3>Pharmacy</h3>
        <p>
          Our full-service pharmacy offers prescription services, vaccinations,
          and health consultations.
        </p>
        <ul>
          <li>Mon-Fri: 9:00 AM - 8:00 PM</li>
          <li>Saturday: 9:00 AM - 6:00 PM</li>
          <li>Sunday: 10:00 AM - 5:00 PM</li>
          <li>Phone: (323) 555-4322</li>
        </ul>

        <h3>Auto Center</h3>
        <p>
          Find all your automotive needs including parts, accessories, and
          maintenance supplies.
        </p>
        <ul>
          <li>Mon-Sat: 8:00 AM - 8:00 PM</li>
          <li>Sunday: Closed</li>
          <li>Phone: (323) 555-4323</li>
        </ul>

        <h3>Fresh Bakery</h3>
        <p>
          Start your day with fresh bread, pastries, and custom cakes baked
          daily on-site.
        </p>
        <ul>
          <li>Daily: 6:00 AM - 8:00 PM</li>
          <li>Phone: (323) 555-4324</li>
        </ul>

        <h2>Location</h2>
        <address>
          789 Shopping Plaza Drive
          <br />
          Los Angeles, CA 90028
          <br />
          Main Phone: (323) 555-4321
        </address>

        <h2>Services Available</h2>
        <ul>
          <li>Free parking</li>
          <li>Wheelchair accessible</li>
          <li>Online ordering with curbside pickup</li>
          <li>Home delivery available</li>
          <li>Senior discount on Tuesdays</li>
        </ul>
      </article>
    </div>
  );
}
