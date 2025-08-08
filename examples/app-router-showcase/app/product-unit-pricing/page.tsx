import { ProductJsonLd } from "next-seo";

export default function ProductUnitPricingPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="Premium Olive Oil - Extra Virgin"
        description="Cold-pressed extra virgin olive oil from organic Italian olives, perfect for cooking and dressing"
        url="https://example.com/products/olive-oil"
        image={[
          "https://example.com/olive-oil-1x1.jpg",
          "https://example.com/olive-oil-4x3.jpg",
          "https://example.com/olive-oil-16x9.jpg",
        ]}
        sku="OIL-EVOO-750"
        mpn="EVOO750ML"
        brand="Mediterranean Gold"
        offers={{
          url: "https://example.com/buy/olive-oil",
          priceSpecification: {
            price: 18.0,
            priceCurrency: "EUR",
            // Unit pricing for products sold by volume
            referenceQuantity: {
              value: "750",
              unitCode: "MLT",
              valueReference: {
                value: "100",
                unitCode: "MLT",
              },
            },
          },
          availability: "InStock",
          priceValidUntil: "2024-12-31",
        }}
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 89,
        }}
      />

      <div className="max-w-4xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Groceries</li>
            <li>/</li>
            <li>Oils & Vinegars</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">
              Premium Olive Oil - Extra Virgin
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-olive-100 rounded-lg aspect-[3/4] flex items-center justify-center">
              <span className="text-olive-700">Olive Oil Bottle</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-olive-50 rounded aspect-square"></div>
              <div className="bg-olive-50 rounded aspect-square"></div>
              <div className="bg-olive-50 rounded aspect-square"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Premium Olive Oil - Extra Virgin
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★★"}</div>
                <span className="text-gray-600">4.9 out of 5 (89 reviews)</span>
              </div>
              <p className="text-gray-600">by Mediterranean Gold</p>
            </div>

            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-3xl font-bold">€18.00</span>
                  <span className="text-gray-600">750ml bottle</span>
                </div>
                <div className="text-sm text-gray-600 border-t pt-2">
                  <span className="font-medium">Unit price: </span>
                  <span>€2.40 per 100ml</span>
                </div>
              </div>
              <p className="text-green-600 font-medium">✓ In Stock</p>
              <p className="text-sm text-gray-500">
                Price valid until Dec 31, 2024
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-sm text-blue-800">
                <strong>EU Regulation:</strong> Unit pricing displayed as
                required for products sold by weight or volume
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>SKU:</strong> OIL-EVOO-750
              </p>
              <p className="text-sm">
                <strong>MPN:</strong> EVOO750ML
              </p>
              <p className="text-sm">
                <strong>Volume:</strong> 750ml (25.4 fl oz)
              </p>
              <p className="text-sm">
                <strong>Harvest Date:</strong> October 2024
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Our premium extra virgin olive oil is cold-pressed from
                hand-picked organic olives grown in the sun-drenched groves of
                Tuscany. With its rich, fruity flavor and low acidity (0.3%),
                it's perfect for drizzling over salads, dipping bread, or
                finishing your favorite dishes.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <select className="border rounded px-3 py-2">
                  <option>1 bottle</option>
                  <option>3 bottles (5% off)</option>
                  <option>6 bottles (10% off)</option>
                </select>
                <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700">
                  Add to Cart
                </button>
              </div>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                Subscribe & Save 15%
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Information</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Quality Indicators</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Acidity:</dt>
                  <dd>&lt; 0.3%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Peroxide:</dt>
                  <dd>&lt; 10 meq O2/kg</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Polyphenols:</dt>
                  <dd>&gt; 250 mg/kg</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Harvest Method:</dt>
                  <dd>Hand-picked</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-3">
                Nutritional Info (per 100ml)
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Energy:</dt>
                  <dd>884 kcal</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Total Fat:</dt>
                  <dd>100g</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Saturated:</dt>
                  <dd>14g</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Vitamin E:</dt>
                  <dd>14mg</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Storage & Usage</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Store in cool, dark place</li>
                <li>• Best before 24 months from harvest</li>
                <li>• Ideal for salads and finishing</li>
                <li>• Smoke point: 190°C (374°F)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
