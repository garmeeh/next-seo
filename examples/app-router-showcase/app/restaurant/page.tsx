import { LocalBusinessJsonLd } from "next-seo";

export default function RestaurantPage() {
  return (
    <div className="container mx-auto p-8">
      <LocalBusinessJsonLd
        type="Restaurant"
        name="The Golden Fork"
        address={{
          "@type": "PostalAddress",
          streetAddress: "456 Culinary Avenue",
          addressLocality: "New York",
          addressRegion: "NY",
          postalCode: "10001",
          addressCountry: "US",
        }}
        geo={{
          "@type": "GeoCoordinates",
          latitude: 40.7489,
          longitude: -73.968,
        }}
        url="https://example.com/restaurants/golden-fork"
        telephone="+12125555678"
        email="info@goldenfork.com"
        image={[
          "https://example.com/images/restaurant-1x1.jpg",
          "https://example.com/images/restaurant-4x3.jpg",
          "https://example.com/images/restaurant-16x9.jpg",
        ]}
        servesCuisine={["Italian", "Mediterranean", "Vegetarian"]}
        priceRange="$$$"
        menu="https://example.com/restaurants/golden-fork/menu"
        openingHoursSpecification={[
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "11:30",
            closes: "22:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Friday", "Saturday"],
            opens: "11:30",
            closes: "23:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "12:00",
            closes: "21:00",
          },
        ]}
        aggregateRating={{
          "@type": "AggregateRating",
          ratingValue: 4.6,
          ratingCount: 892,
          reviewCount: 846,
          bestRating: 5,
          worstRating: 1,
        }}
        review={[
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: 5,
              bestRating: 5,
            },
            author: "Sarah Johnson",
            reviewBody:
              "Amazing Italian cuisine! The pasta is made fresh daily and the atmosphere is wonderful.",
            datePublished: "2024-01-15",
          },
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: 4,
              bestRating: 5,
            },
            author: {
              "@type": "Person",
              name: "Mike Chen",
            },
            reviewBody:
              "Great food and service. The vegetarian options are excellent.",
            datePublished: "2024-01-20",
          },
        ]}
        sameAs={[
          "https://www.facebook.com/goldenforknyc",
          "https://www.instagram.com/goldenforknyc",
          "https://www.yelp.com/biz/golden-fork-new-york",
        ]}
        slogan="Where tradition meets innovation"
        description="The Golden Fork offers authentic Italian and Mediterranean cuisine in the heart of New York City. Our menu features fresh, locally-sourced ingredients and traditional recipes passed down through generations."
        paymentAccepted="Cash, Credit Card, Debit Card"
        currenciesAccepted="USD"
        publicAccess={true}
        smokingAllowed={false}
        isAccessibleForFree={true}
      />

      <article className="prose lg:prose-xl">
        <h1>The Golden Fork</h1>
        <p className="text-xl italic">Where tradition meets innovation</p>

        <p>
          Welcome to The Golden Fork, New York's premier destination for
          authentic Italian and Mediterranean cuisine. Located in the heart of
          Manhattan, we offer a dining experience that combines traditional
          recipes with modern culinary techniques.
        </p>

        <h2>Our Cuisine</h2>
        <p>
          We specialize in Italian, Mediterranean, and Vegetarian dishes,
          prepared with fresh, locally-sourced ingredients. Our menu changes
          seasonally to ensure the best flavors throughout the year.
        </p>

        <h2>Hours of Operation</h2>
        <ul>
          <li>Monday - Thursday: 11:30 AM - 10:00 PM</li>
          <li>Friday - Saturday: 11:30 AM - 11:30 PM</li>
          <li>Sunday: 12:00 PM - 9:00 PM</li>
        </ul>

        <h2>Location</h2>
        <address>
          456 Culinary Avenue
          <br />
          New York, NY 10001
          <br />
          Phone: (212) 555-5678
          <br />
          Email: info@goldenfork.com
        </address>

        <h2>Customer Reviews</h2>
        <p>
          With an average rating of 4.6 out of 5 stars from over 890 reviews,
          The Golden Fork is one of New York's most beloved restaurants.
        </p>

        <h2>Reservations</h2>
        <p>
          Call us at (212) 555-5678 or book online through our website. We
          recommend making reservations for Friday and Saturday evenings.
        </p>
      </article>
    </div>
  );
}
