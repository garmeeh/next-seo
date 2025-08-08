import { ProductJsonLd } from "next-seo";

export default function ProductShippingOptionsPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="Handcrafted Wooden Desk"
        description="Solid oak desk with modern design, perfect for home office setups"
        url="https://example.com/products/wooden-desk"
        image={[
          "https://example.com/desk-1x1.jpg",
          "https://example.com/desk-4x3.jpg",
          "https://example.com/desk-16x9.jpg",
        ]}
        sku="DESK-OAK-001"
        mpn="WD2024OAK"
        brand="Artisan Furniture Co."
        offers={{
          price: 799.99,
          priceCurrency: "USD",
          availability: "InStock",
          priceValidUntil: "2024-12-31",
          // Multiple shipping options
          shippingDetails: [
            {
              // Standard shipping
              shippingRate: {
                value: 49.99,
                currency: "USD",
              },
              shippingDestination: {
                addressCountry: "US",
              },
              deliveryTime: {
                handlingTime: {
                  minValue: 1,
                  maxValue: 2,
                  unitCode: "DAY",
                },
                transitTime: {
                  minValue: 5,
                  maxValue: 7,
                  unitCode: "DAY",
                },
              },
            },
            {
              // Express shipping
              shippingRate: {
                value: 99.99,
                currency: "USD",
              },
              shippingDestination: {
                addressCountry: "US",
              },
              deliveryTime: {
                handlingTime: {
                  minValue: 0,
                  maxValue: 1,
                  unitCode: "DAY",
                },
                transitTime: {
                  minValue: 2,
                  maxValue: 3,
                  unitCode: "DAY",
                },
              },
            },
            {
              // Free shipping to specific states
              shippingRate: {
                value: 0,
                currency: "USD",
              },
              shippingDestination: {
                addressCountry: "US",
                addressRegion: ["CA", "NY", "TX"],
              },
              deliveryTime: {
                handlingTime: {
                  minValue: 2,
                  maxValue: 3,
                  unitCode: "DAY",
                },
                transitTime: {
                  minValue: 7,
                  maxValue: 10,
                  unitCode: "DAY",
                },
              },
            },
            {
              // International shipping
              shippingRate: {
                value: 199.99,
                currency: "USD",
              },
              shippingDestination: [
                {
                  addressCountry: "CA",
                },
                {
                  addressCountry: "GB",
                },
                {
                  addressCountry: "DE",
                },
              ],
              deliveryTime: {
                handlingTime: {
                  minValue: 2,
                  maxValue: 3,
                  unitCode: "DAY",
                },
                transitTime: {
                  minValue: 10,
                  maxValue: 21,
                  unitCode: "DAY",
                },
              },
            },
          ],
        }}
        aggregateRating={{
          ratingValue: 4.7,
          reviewCount: 58,
        }}
      />

      <div className="max-w-4xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Furniture</li>
            <li>/</li>
            <li>Office</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">
              Handcrafted Wooden Desk
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-lg aspect-[4/3] flex items-center justify-center">
              <span className="text-amber-700">Desk Image</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-amber-50 rounded aspect-square"></div>
              <div className="bg-amber-50 rounded aspect-square"></div>
              <div className="bg-amber-50 rounded aspect-square"></div>
              <div className="bg-amber-50 rounded aspect-square"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Handcrafted Wooden Desk
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★★"}</div>
                <span className="text-gray-600">4.7 out of 5 (58 reviews)</span>
              </div>
              <p className="text-gray-600">by Artisan Furniture Co.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$799.99</span>
                <span className="text-sm text-gray-500">USD</span>
              </div>
              <p className="text-green-600 font-medium">✓ In Stock</p>
              <p className="text-sm text-gray-500">Ready to ship</p>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Shipping Options</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shipping"
                    className="mt-1"
                    defaultChecked
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Standard Delivery</div>
                        <div className="text-sm text-gray-600">
                          5-7 business days
                        </div>
                      </div>
                      <span className="font-medium">$49.99</span>
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="shipping" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Express Delivery</div>
                        <div className="text-sm text-gray-600">
                          2-3 business days
                        </div>
                      </div>
                      <span className="font-medium">$99.99</span>
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 bg-green-50">
                  <input type="radio" name="shipping" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-green-700">
                          Free Shipping
                        </div>
                        <div className="text-sm text-gray-600">
                          7-10 business days
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          Available in CA, NY, TX
                        </div>
                      </div>
                      <span className="font-medium text-green-700">FREE</span>
                    </div>
                  </div>
                </label>

                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-600">ℹ</span>
                    <span>
                      International shipping available to Canada, UK, and
                      Germany ($199.99)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-sm text-blue-800">
                <strong>White Glove Service:</strong> Professional assembly
                available for an additional $150 in select areas
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>SKU:</strong> DESK-OAK-001
              </p>
              <p className="text-sm">
                <strong>MPN:</strong> WD2024OAK
              </p>
              <p className="text-sm">
                <strong>Weight:</strong> 75 lbs
              </p>
              <p className="text-sm">
                <strong>Dimensions:</strong> 60"W x 30"D x 30"H
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700">
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                Check Delivery to Your Area
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Delivery Details</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Handling time: 1-3 business days</li>
                <li>• Ships from: Austin, TX warehouse</li>
                <li>• Signature required on delivery</li>
                <li>• Tracking provided via email</li>
                <li>• Insurance included on all shipments</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Shipping Zones</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="font-medium text-gray-700">Continental US:</dt>
                  <dd className="text-gray-600 ml-4">
                    All shipping options available
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">
                    Alaska & Hawaii:
                  </dt>
                  <dd className="text-gray-600 ml-4">
                    Standard shipping only (+$50)
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">International:</dt>
                  <dd className="text-gray-600 ml-4">
                    Select countries, 10-21 days
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Product Details</h3>
          <p className="text-gray-700 mb-4">
            This handcrafted wooden desk is made from sustainably sourced solid
            oak, featuring a modern minimalist design that complements any home
            office. Each piece is unique, showcasing the natural wood grain and
            finished with eco-friendly Danish oil for durability and beauty.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Material:</strong> Solid Oak Wood
            </div>
            <div>
              <strong>Finish:</strong> Natural Danish Oil
            </div>
            <div>
              <strong>Assembly:</strong> Required (tools included)
            </div>
            <div>
              <strong>Warranty:</strong> 5 years limited
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
