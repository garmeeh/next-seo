import { ProductJsonLd } from "next-seo";

export default function ProductMemberPricingPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="Premium Coffee Beans - 1kg"
        description="Single-origin Arabica coffee beans, medium roast, ethically sourced from Colombia"
        url="https://example.com/products/premium-coffee-beans"
        image={[
          "https://example.com/coffee-1x1.jpg",
          "https://example.com/coffee-4x3.jpg",
          "https://example.com/coffee-16x9.jpg",
        ]}
        sku="COFFEE-COL-1KG"
        mpn="PCB1000"
        brand="Artisan Roasters"
        offers={{
          url: "https://example.com/buy/coffee-beans",
          price: 24.99,
          priceCurrency: "USD",
          availability: "InStock",
          priceValidUntil: "2024-12-31",
          // Multiple price specifications for member pricing
          priceSpecification: [
            {
              price: 24.99,
              priceCurrency: "USD",
            },
            {
              price: 22.49,
              priceCurrency: "USD",
              validForMemberTier: {
                "@id": "https://example.com/membership#silver",
                name: "Silver",
                hasTierBenefit: "TierBenefitLoyaltyPrice",
              },
            },
            {
              price: 19.99,
              priceCurrency: "USD",
              validForMemberTier: [
                {
                  "@id": "https://example.com/membership#gold",
                  name: "Gold",
                  hasTierBenefit: "TierBenefitLoyaltyPrice",
                },
                {
                  "@id": "https://example.com/membership#platinum",
                  name: "Platinum",
                  hasTierBenefit: "TierBenefitLoyaltyPrice",
                },
              ],
            },
            {
              membershipPointsEarned: 50,
              validForMemberTier: {
                "@id": "https://example.com/membership#any",
                name: "All Members",
                hasTierBenefit: "TierBenefitLoyaltyPoints",
              },
            },
          ],
        }}
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 156,
        }}
      />

      <div className="max-w-4xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Coffee</li>
            <li>/</li>
            <li>Whole Beans</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">
              Premium Coffee Beans - 1kg
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-amber-100 rounded-lg aspect-square flex items-center justify-center">
              <span className="text-amber-700">Coffee Bag Image</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-amber-50 rounded aspect-square"></div>
              <div className="bg-amber-50 rounded aspect-square"></div>
              <div className="bg-amber-50 rounded aspect-square"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Premium Coffee Beans - 1kg
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★★"}</div>
                <span className="text-gray-600">
                  4.8 out of 5 (156 reviews)
                </span>
              </div>
              <p className="text-gray-600">by Artisan Roasters</p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-amber-50">
                <h3 className="font-semibold mb-3 text-amber-900">
                  Member Pricing Tiers
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-amber-200">
                    <span className="text-gray-700">Regular Price</span>
                    <span className="font-bold text-lg">$24.99</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-amber-200">
                    <span className="flex items-center gap-2">
                      <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded">
                        SILVER
                      </span>
                      <span className="text-gray-700">Member Price</span>
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      $22.49
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="flex items-center gap-2">
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                        GOLD+
                      </span>
                      <span className="text-gray-700">Premium Member</span>
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      $19.99
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Earn Loyalty Points
                    </span>
                    <span className="font-semibold text-amber-700">
                      +50 points
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-green-600 font-medium">✓ In Stock</p>
              <p className="text-sm text-gray-500">
                Member prices valid until Dec 31, 2024
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>SKU:</strong> COFFEE-COL-1KG
              </p>
              <p className="text-sm">
                <strong>MPN:</strong> PCB1000
              </p>
              <p className="text-sm">
                <strong>Roast Date:</strong> November 15, 2024
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Experience the rich, smooth flavor of our single-origin
                Colombian Arabica beans. Carefully selected from high-altitude
                farms and roasted to perfection, these beans offer notes of
                chocolate, caramel, and subtle citrus.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-700">
                Add to Cart
              </button>
              <button className="w-full border border-amber-600 text-amber-600 py-3 px-6 rounded-lg font-medium hover:bg-amber-50">
                Join Membership for Better Prices
              </button>
              <p className="text-xs text-center text-gray-500">
                Not a member? Join today and save up to 20% on every purchase
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Coffee Profile</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Origin:</dt>
                  <dd>Colombia, Huila Region</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Altitude:</dt>
                  <dd>1,700-2,000m</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Process:</dt>
                  <dd>Washed</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Roast Level:</dt>
                  <dd>Medium</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Tasting Notes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Rich chocolate undertones</li>
                <li>• Smooth caramel sweetness</li>
                <li>• Bright citrus acidity</li>
                <li>• Clean, balanced finish</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
