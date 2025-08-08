import { ProductJsonLd } from "next-seo";

export default function ProductSalePricingPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="4K Smart TV - 55 inch"
        description="Ultra HD 4K Smart TV with HDR, built-in streaming apps, and voice control"
        url="https://example.com/products/smart-tv-55"
        image={[
          "https://example.com/tv-1x1.jpg",
          "https://example.com/tv-4x3.jpg",
          "https://example.com/tv-16x9.jpg",
        ]}
        sku="TV-4K-55-2024"
        mpn="STV55UHD"
        brand="TechVision"
        offers={{
          url: "https://example.com/buy/smart-tv",
          price: 599.99,
          priceCurrency: "USD",
          availability: "InStock",
          priceValidUntil: "2024-12-31",
          // Multiple price specifications for sale pricing
          priceSpecification: [
            {
              price: 599.99,
              priceCurrency: "USD",
            },
            {
              priceType: "https://schema.org/StrikethroughPrice",
              price: 899.99,
              priceCurrency: "USD",
            },
          ],
        }}
        aggregateRating={{
          ratingValue: 4.6,
          reviewCount: 342,
        }}
      />

      <div className="max-w-4xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Electronics</li>
            <li>/</li>
            <li>TVs</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">4K Smart TV - 55"</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-500">TV Image</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">4K Smart TV - 55 inch</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★☆"}</div>
                <span className="text-gray-600">
                  4.6 out of 5 (342 reviews)
                </span>
              </div>
              <p className="text-gray-600">by TechVision</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-red-600">$599.99</span>
                <span className="text-xl text-gray-500 line-through">
                  $899.99
                </span>
              </div>
              <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                SAVE $300 (33% OFF)
              </div>
              <p className="text-green-600 font-medium">✓ In Stock</p>
              <p className="text-sm text-gray-500">
                Sale price valid until Dec 31, 2024
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-4 bg-red-50 p-3 rounded">
              <p className="font-semibold text-red-800">Limited Time Offer!</p>
              <p className="text-sm text-red-700">
                Black Friday pricing - while supplies last
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>SKU:</strong> TV-4K-55-2024
              </p>
              <p className="text-sm">
                <strong>MPN:</strong> STV55UHD
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Experience stunning picture quality with our 55-inch 4K Smart
                TV. Features HDR10+ support, built-in streaming apps including
                Netflix and Prime Video, and voice control compatibility with
                Alexa and Google Assistant.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700">
                Add to Cart - Sale Price $599.99
              </button>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Display</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 55" 4K Ultra HD (3840 x 2160)</li>
                <li>• HDR10+ and Dolby Vision</li>
                <li>• 120Hz refresh rate</li>
                <li>• Wide color gamut</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Smart Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Built-in WiFi and Ethernet</li>
                <li>• Netflix, Prime Video, Disney+</li>
                <li>• Voice control ready</li>
                <li>• Screen mirroring support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
