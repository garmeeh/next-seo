import { CarouselJsonLd } from "next-seo";

export default function CarouselRestaurantPage() {
  return (
    <div className="container mx-auto p-8">
      <CarouselJsonLd
        contentType="Restaurant"
        items={[
          {
            name: "Luigi's Italian Bistro",
            address: "123 Main Street, New York, NY 10001",
            telephone: "+1-212-555-0100",
            url: "https://example.com/restaurants/luigis",
            image: [
              "https://example.com/luigis-exterior.jpg",
              "https://example.com/luigis-interior.jpg",
            ],
            priceRange: "$$$",
            servesCuisine: ["Italian", "Mediterranean"],
            menu: "https://example.com/restaurants/luigis/menu",
            aggregateRating: {
              ratingValue: 4.7,
              bestRating: 5,
              ratingCount: 892,
            },
            review: {
              reviewRating: { ratingValue: 5 },
              author: "Food & Wine Magazine",
              reviewBody:
                "Authentic Italian cuisine with a modern twist. Outstanding pasta and wine selection.",
            },
            geo: {
              latitude: 40.7489,
              longitude: -73.968,
            },
            openingHoursSpecification: [
              {
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                opens: "11:30",
                closes: "22:00",
              },
              {
                dayOfWeek: ["Friday", "Saturday"],
                opens: "11:30",
                closes: "23:00",
              },
              {
                dayOfWeek: "Sunday",
                opens: "12:00",
                closes: "21:00",
              },
            ],
            sameAs: [
              "https://www.facebook.com/luigisbistro",
              "https://www.instagram.com/luigisbistro",
            ],
          },
          {
            name: "Sakura Sushi House",
            address: {
              streetAddress: "456 Oak Avenue",
              addressLocality: "San Francisco",
              addressRegion: "CA",
              postalCode: "94102",
              addressCountry: "US",
            },
            telephone: "+1-415-555-0200",
            url: "https://example.com/restaurants/sakura",
            image: "https://example.com/sakura-sushi.jpg",
            priceRange: "$$",
            servesCuisine: ["Japanese", "Sushi"],
            menu: "https://example.com/restaurants/sakura/menu",
            aggregateRating: {
              ratingValue: 4.8,
              ratingCount: 1250,
            },
            geo: {
              latitude: 37.7749,
              longitude: -122.4194,
            },
            openingHoursSpecification: {
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "11:00",
              closes: "22:30",
            },
          },
          {
            name: "The Garden Terrace",
            address: "789 Park Lane, Chicago, IL 60601",
            telephone: "+1-312-555-0300",
            image: {
              url: "https://example.com/garden-terrace.jpg",
              width: 1200,
              height: 800,
            },
            priceRange: "$$$$",
            servesCuisine: ["French", "Contemporary", "Vegetarian Options"],
            aggregateRating: {
              ratingValue: 4.9,
              ratingCount: 567,
            },
            review: [
              {
                reviewRating: { ratingValue: 5, bestRating: 5 },
                author: "Michelin Guide",
                reviewBody:
                  "Exceptional fine dining experience with innovative seasonal menus",
                datePublished: "2024-01-20",
              },
              {
                reviewRating: { ratingValue: 5 },
                author: {
                  name: "James Food Critic",
                  url: "https://example.com/critics/james",
                },
                reviewBody: "A culinary masterpiece in every dish",
              },
            ],
            geo: {
              latitude: 41.8781,
              longitude: -87.6298,
            },
            openingHoursSpecification: [
              {
                dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
                opens: "17:00",
                closes: "22:00",
              },
              {
                dayOfWeek: ["Friday", "Saturday"],
                opens: "17:00",
                closes: "23:30",
              },
            ],
          },
          {
            name: "Taco Paradise",
            address: "321 Sunset Boulevard, Los Angeles, CA 90028",
            telephone: "+1-323-555-0400",
            url: "https://example.com/restaurants/taco-paradise",
            image: [
              "https://example.com/taco-paradise-1.jpg",
              "https://example.com/taco-paradise-2.jpg",
              "https://example.com/taco-paradise-3.jpg",
            ],
            priceRange: "$",
            servesCuisine: "Mexican",
            aggregateRating: {
              ratingValue: 4.6,
              ratingCount: 2341,
            },
            openingHoursSpecification: {
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "10:00",
              closes: "23:00",
            },
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">Restaurant Carousel Example</h1>

      <div className="prose lg:prose-xl">
        <p>
          Discover top-rated restaurants in major cities across the United
          States.
        </p>

        <h2>Featured Restaurants</h2>

        <div className="grid gap-6 mt-6">
          <div className="border p-6 rounded-lg shadow">
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">
                  Luigi's Italian Bistro
                </h3>
                <p className="text-gray-600 mt-1">
                  Italian, Mediterranean • $$$ • New York, NY
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-yellow-500">★ 4.7/5</span>
                  <span className="text-gray-500 text-sm">(892 reviews)</span>
                </div>
                <p className="text-gray-600 mt-3">
                  Authentic Italian cuisine with a modern twist. Outstanding
                  pasta and wine selection.
                </p>
                <div className="mt-3 text-sm text-gray-600">
                  <p>📍 123 Main Street, New York, NY 10001</p>
                  <p>📞 +1-212-555-0100</p>
                  <p>
                    🕐 Mon-Thu: 11:30-22:00, Fri-Sat: 11:30-23:00, Sun:
                    12:00-21:00
                  </p>
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://example.com/restaurants/luigis"
                    className="text-blue-600"
                  >
                    Visit Website →
                  </a>
                  <a
                    href="https://example.com/restaurants/luigis/menu"
                    className="text-blue-600"
                  >
                    View Menu →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Sakura Sushi House</h3>
                <p className="text-gray-600 mt-1">
                  Japanese, Sushi • $$ • San Francisco, CA
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-yellow-500">★ 4.8/5</span>
                  <span className="text-gray-500 text-sm">(1,250 reviews)</span>
                </div>
                <p className="text-gray-600 mt-3">
                  Fresh, authentic sushi and Japanese cuisine in the heart of
                  San Francisco.
                </p>
                <div className="mt-3 text-sm text-gray-600">
                  <p>📍 456 Oak Avenue, San Francisco, CA 94102</p>
                  <p>📞 +1-415-555-0200</p>
                  <p>🕐 Mon-Sat: 11:00-22:30, Sun: Closed</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://example.com/restaurants/sakura"
                    className="text-blue-600"
                  >
                    Visit Website →
                  </a>
                  <a
                    href="https://example.com/restaurants/sakura/menu"
                    className="text-blue-600"
                  >
                    View Menu →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">The Garden Terrace</h3>
                <p className="text-gray-600 mt-1">
                  French, Contemporary • $$$$ • Chicago, IL
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-yellow-500">★ 4.9/5</span>
                  <span className="text-gray-500 text-sm">(567 reviews)</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Michelin Guide
                  </span>
                </div>
                <p className="text-gray-600 mt-3">
                  Exceptional fine dining experience with innovative seasonal
                  menus.
                </p>
                <div className="mt-3 text-sm text-gray-600">
                  <p>📍 789 Park Lane, Chicago, IL 60601</p>
                  <p>📞 +1-312-555-0300</p>
                  <p>🕐 Tue-Thu: 17:00-22:00, Fri-Sat: 17:00-23:30</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
                  Reserve Table
                </button>
              </div>
            </div>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Taco Paradise</h3>
                <p className="text-gray-600 mt-1">
                  Mexican • $ • Los Angeles, CA
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-yellow-500">★ 4.6/5</span>
                  <span className="text-gray-500 text-sm">(2,341 reviews)</span>
                </div>
                <p className="text-gray-600 mt-3">
                  Authentic Mexican street food with the best tacos in LA.
                </p>
                <div className="mt-3 text-sm text-gray-600">
                  <p>📍 321 Sunset Boulevard, Los Angeles, CA 90028</p>
                  <p>📞 +1-323-555-0400</p>
                  <p>🕐 Daily: 10:00-23:00</p>
                </div>
                <a
                  href="https://example.com/restaurants/taco-paradise"
                  className="text-blue-600 mt-4 inline-block"
                >
                  Order Online →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
