import { ProductJsonLd } from "next-seo";

export default function ProductPage() {
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
          price: 119.99,
          priceCurrency: "USD",
          availability: "InStock",
          priceValidUntil: "2024-12-31",
          url: "https://example.com/buy/anvil",
        }}
        aggregateRating={{
          ratingValue: 4.4,
          reviewCount: 89,
        }}
      />

      <div className="max-w-4xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Products</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">Executive Anvil</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Executive Anvil</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★☆"}</div>
                <span className="text-gray-600">4.4 out of 5 (89 reviews)</span>
              </div>
              <p className="text-gray-600">by ACME</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$119.99</span>
                <span className="text-sm text-gray-500">USD</span>
              </div>
              <p className="text-green-600 font-medium">✓ In Stock</p>
              <p className="text-sm text-gray-500">
                Price valid until Dec 31, 2024
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>SKU:</strong> 0446310786
              </p>
              <p className="text-sm">
                <strong>MPN:</strong> 925872
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Sleeker than ACME's Classic Anvil, the Executive Anvil is
                perfect for the business traveler looking for something to drop
                from a height. Crafted from the finest steel and polished to a
                mirror finish, this anvil combines functionality with executive
                style.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700">
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Premium steel construction</li>
                <li>• Mirror-polished finish</li>
                <li>• Ergonomic design for dropping</li>
                <li>• Executive briefcase included</li>
                <li>• Lifetime warranty</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Specifications</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Weight:</dt>
                  <dd>10 kg</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Dimensions:</dt>
                  <dd>30cm x 20cm x 15cm</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Material:</dt>
                  <dd>Steel</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Color:</dt>
                  <dd>Silver</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Model:</dt>
                  <dd>EA-2024</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
