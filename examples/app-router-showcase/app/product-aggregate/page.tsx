import { ProductJsonLd } from "next-seo";

export default function ProductAggregatePage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="Executive Anvil"
        description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
        url="https://example.com/products/anvil"
        image={[
          "https://example.com/photos/1x1/photo.jpg",
          "https://example.com/photos/4x3/photo.jpg",
          "https://example.com/photos/16x9/photo.jpg",
        ]}
        sku="0446310786"
        mpn="925872"
        brand="ACME"
        offers={{
          lowPrice: 119.99,
          highPrice: 199.99,
          priceCurrency: "USD",
          offerCount: 5,
        }}
        review={[
          {
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            author: "Fred Benson",
            reviewBody:
              "This anvil is perfect! Exactly what I needed for my roadrunner traps.",
            datePublished: "2024-01-10",
          },
          {
            reviewRating: {
              ratingValue: 4,
              bestRating: 5,
            },
            author: "Wile E. Coyote",
            reviewBody: "Great anvil, but shipping took longer than expected.",
            datePublished: "2024-01-05",
          },
        ]}
        aggregateRating={{
          ratingValue: 4.4,
          reviewCount: 89,
        }}
      />

      <div className="max-w-6xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Compare</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">Executive Anvil</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>

              <div>
                <h1 className="text-2xl font-bold mb-2">Executive Anvil</h1>
                <p className="text-gray-600 mb-2">by ACME</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">{"★★★★☆"}</div>
                  <span className="text-sm text-gray-600">
                    4.4 (89 reviews)
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>SKU:</strong> 0446310786
                  </p>
                  <p>
                    <strong>MPN:</strong> 925872
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-sm text-gray-700">
                  Sleeker than ACME's Classic Anvil, the Executive Anvil is
                  perfect for the business traveler looking for something to
                  drop from a height.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Price Comparison</h2>
              <div className="flex items-baseline gap-4">
                <div>
                  <span className="text-3xl font-bold">$119.99</span>
                  <span className="text-sm text-gray-600"> - </span>
                  <span className="text-3xl font-bold">$199.99</span>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  5 offers available
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Available from 5 sellers
              </h3>

              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">ACME Direct</h4>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-green-600">
                        $119.99
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        BEST PRICE
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>✓ Free Shipping</span>
                      <span>✓ In Stock</span>
                      <span>✓ Official Store</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Usually ships within 24 hours
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                    View Deal
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">MegaMart</h4>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold">$129.99</span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>✓ Free Shipping over $100</span>
                      <span>✓ In Stock</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Ships in 2-3 business days
                    </p>
                  </div>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700">
                    View Deal
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">QuickShop</h4>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold">$149.99</span>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                        FAST DELIVERY
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>+ $9.99 Shipping</span>
                      <span>✓ In Stock</span>
                      <span>✓ Next Day Delivery</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Order by 2pm for next day delivery
                    </p>
                  </div>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700">
                    View Deal
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">
                      Hardware Haven
                    </h4>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold">$179.99</span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>✓ Free Shipping</span>
                      <span>✓ Limited Stock (3 left)</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Ships in 3-5 business days
                    </p>
                  </div>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700">
                    View Deal
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">
                      Premium Tools
                    </h4>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold">$199.99</span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                        EXTENDED WARRANTY
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>✓ Free Shipping</span>
                      <span>✓ In Stock</span>
                      <span>✓ 3-Year Warranty</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Includes premium packaging and warranty
                    </p>
                  </div>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700">
                    View Deal
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Price History</h3>
              <div className="h-48 bg-white rounded border flex items-center justify-center">
                <span className="text-gray-400">
                  Price trend chart would go here
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-600">Lowest Price</p>
                  <p className="font-semibold">$119.99</p>
                </div>
                <div>
                  <p className="text-gray-600">Average Price</p>
                  <p className="font-semibold">$159.99</p>
                </div>
                <div>
                  <p className="text-gray-600">Highest Price</p>
                  <p className="font-semibold">$199.99</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-semibold">Fred Benson</span>
                      <span className="text-sm text-gray-600 ml-2">
                        Jan 10, 2024
                      </span>
                    </div>
                    <span className="flex text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-700">
                    This anvil is perfect! Exactly what I needed for my
                    roadrunner traps.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-semibold">Wile E. Coyote</span>
                      <span className="text-sm text-gray-600 ml-2">
                        Jan 5, 2024
                      </span>
                    </div>
                    <span className="flex text-yellow-400">★★★★☆</span>
                  </div>
                  <p className="text-gray-700">
                    Great anvil, but shipping took longer than expected.
                  </p>
                </div>
              </div>
              <button className="mt-4 text-blue-600 hover:underline">
                View all 89 reviews →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
