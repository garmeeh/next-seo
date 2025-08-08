import { ProductJsonLd } from "next-seo";

export default function ProductVariantsAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        type="ProductGroup"
        name="Athletic Performance Shoes"
        description="High-performance running shoes with advanced cushioning technology. Available in multiple sizes, colors, and widths for the perfect fit."
        url="https://example.com/products/athletic-performance-shoes"
        productGroupID="APS2024"
        brand={{
          "@type": "Organization",
          name: "SpeedRunner Pro",
          logo: "https://example.com/logos/speedrunner.png",
        }}
        material="Mesh/Synthetic"
        pattern="solid"
        category="Sports/Running/Footwear"
        variesBy={["size", "color", "suggestedGender"]}
        audience={{
          "@type": "PeopleAudience",
          suggestedGender: "unisex",
          suggestedAge: {
            "@type": "QuantitativeValue",
            minValue: 13,
            unitCode: "ANN",
          },
        }}
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 342,
          reviewCount: 289,
        }}
        review={[
          {
            name: "Best Running Shoes Ever!",
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            author: "Sarah Johnson",
            reviewBody:
              "These shoes are incredibly comfortable and provide excellent support during long runs.",
            datePublished: "2024-01-15",
          },
          {
            name: "Great for Marathon Training",
            reviewRating: {
              ratingValue: 4,
              bestRating: 5,
            },
            author: {
              name: "Mike Chen",
              url: "https://example.com/users/mikechen",
            },
            reviewBody:
              "Excellent cushioning and durability. The only downside is they run slightly narrow.",
            datePublished: "2024-01-20",
          },
        ]}
        hasVariant={[
          {
            name: "Athletic Performance Shoes - Men's 10 Black",
            sku: "APS2024-M10-BLK",
            gtin14: "98766051104444",
            size: "10",
            color: "Black",
            pattern: "solid",
            image: [
              "https://example.com/images/shoes-m10-black-1.jpg",
              "https://example.com/images/shoes-m10-black-2.jpg",
              "https://example.com/images/shoes-m10-black-3.jpg",
            ],
            weight: {
              value: 310,
              unitCode: "GRM",
            },
            offers: {
              price: 149.99,
              priceCurrency: "USD",
              availability: "InStock",
              url: "https://example.com/products/athletic-performance-shoes?size=10&color=black&gender=mens",
              priceValidUntil: "2024-12-31",
              seller: {
                name: "Official SpeedRunner Store",
                url: "https://example.com",
              },
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: 0,
                  currency: "USD",
                },
                shippingDestination: {
                  "@type": "DefinedRegion",
                  addressCountry: "US",
                },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 1,
                    unitCode: "DAY",
                  },
                  transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: 2,
                    maxValue: 5,
                    unitCode: "DAY",
                  },
                },
              },
              hasMerchantReturnPolicy: {
                applicableCountry: "US",
                returnPolicyCategory:
                  "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 60,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn",
              },
            },
          },
          {
            name: "Athletic Performance Shoes - Women's 8 White/Pink",
            sku: "APS2024-W8-WPK",
            gtin14: "98766051104451",
            size: "8",
            color: "White/Pink",
            pattern: "two-tone",
            image: "https://example.com/images/shoes-w8-white-pink.jpg",
            weight: {
              value: 280,
              unitCode: "GRM",
            },
            offers: {
              price: 149.99,
              priceCurrency: "USD",
              availability: "InStock",
              url: "https://example.com/products/athletic-performance-shoes?size=8&color=white-pink&gender=womens",
            },
          },
          {
            name: "Athletic Performance Shoes - Men's 11 Navy",
            sku: "APS2024-M11-NVY",
            gtin14: "98766051104468",
            size: "11",
            color: "Navy",
            pattern: "solid",
            offers: {
              price: 139.99,
              priceCurrency: "USD",
              availability: "PreOrder",
              availabilityStarts: "2024-02-15",
              url: "https://example.com/products/athletic-performance-shoes?size=11&color=navy&gender=mens",
            },
          },
          // URL-only variants for other sizes/colors available on separate pages
          {
            url: "https://example.com/products/athletic-performance-shoes/mens-9-gray",
          },
          {
            url: "https://example.com/products/athletic-performance-shoes/womens-7-purple",
          },
          {
            url: "https://example.com/products/athletic-performance-shoes/mens-12-red",
          },
        ]}
      />

      <div className="max-w-6xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Sports</li>
            <li>/</li>
            <li>Running</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">
              Athletic Performance Shoes
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
              <span className="text-gray-500">Product Image Gallery</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Athletic Performance Shoes
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★★"}</div>
                <span className="text-gray-600">
                  4.8 out of 5 (342 ratings, 289 reviews)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-gray-600">by SpeedRunner Pro</p>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Unisex
                </span>
              </div>
            </div>

            <div>
              <p className="text-gray-700">
                High-performance running shoes with advanced cushioning
                technology. Engineered for serious runners who demand comfort,
                support, and durability. Features our proprietary CloudFoam™
                midsole and breathable mesh upper.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border-2 border-blue-500 rounded">
                    Men's
                  </button>
                  <button className="px-4 py-2 border rounded hover:border-gray-400">
                    Women's
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <div className="grid grid-cols-5 gap-2">
                  {["7", "8", "9", "10", "11", "12", "13"].map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-2 border rounded hover:border-gray-400 ${
                        size === "10" ? "border-2 border-blue-500" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-black rounded-full border-2 border-blue-500"></button>
                  <button className="w-8 h-8 bg-gray-700 rounded-full border hover:border-gray-400"></button>
                  <button className="w-8 h-8 bg-red-600 rounded-full border hover:border-gray-400"></button>
                  <button className="w-8 h-8 bg-white rounded-full border hover:border-gray-400"></button>
                  <button className="w-8 h-8 bg-purple-600 rounded-full border hover:border-gray-400"></button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$149.99</span>
                <span className="text-sm text-gray-500 line-through">
                  $179.99
                </span>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                  SALE
                </span>
              </div>
              <p className="text-green-600 font-medium">
                ✓ In Stock - Ships today!
              </p>
              <p className="text-sm text-gray-500">
                FREE shipping on orders over $50
              </p>
              <p className="text-sm text-gray-500">
                Product ID: APS2024 | SKU: APS2024-M10-BLK | Weight: 310g
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">60-Day Return Policy</h3>
              <p className="text-sm text-gray-700">
                Not satisfied? Return for free within 60 days. No questions
                asked.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700">
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                Try Virtual Fitting
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Best Running Shoes Ever!</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-yellow-400 text-sm">
                      {"★★★★★"}
                    </div>
                    <span className="text-sm text-gray-600">5 out of 5</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Jan 15, 2024</span>
              </div>
              <p className="text-gray-700 mb-2">
                These shoes are incredibly comfortable and provide excellent
                support during long runs.
              </p>
              <p className="text-sm text-gray-600">— Sarah Johnson</p>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Great for Marathon Training</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-yellow-400 text-sm">
                      {"★★★★☆"}
                    </div>
                    <span className="text-sm text-gray-600">4 out of 5</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Jan 20, 2024</span>
              </div>
              <p className="text-gray-700 mb-2">
                Excellent cushioning and durability. The only downside is they
                run slightly narrow.
              </p>
              <p className="text-sm text-gray-600">
                —{" "}
                <a
                  href="https://example.com/users/mikechen"
                  className="text-blue-600 hover:underline"
                >
                  Mike Chen
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Construction</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Upper Material:</dt>
                  <dd>Breathable Mesh</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Midsole:</dt>
                  <dd>CloudFoam™ Technology</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Outsole:</dt>
                  <dd>Rubber with traction pattern</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Closure:</dt>
                  <dd>Lace-up</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Performance</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Drop:</dt>
                  <dd>8mm</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Weight:</dt>
                  <dd>280-310g (size dependent)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Cushioning:</dt>
                  <dd>Maximum</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Support:</dt>
                  <dd>Neutral</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Availability</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Sizes:</dt>
                  <dd>7-13 (Men's), 5-11 (Women's)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Colors:</dt>
                  <dd>6 options</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Product Group:</dt>
                  <dd>APS2024</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Ages:</dt>
                  <dd>13+</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
