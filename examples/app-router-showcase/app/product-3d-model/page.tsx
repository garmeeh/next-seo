import { ProductJsonLd } from "next-seo";

export default function Product3DModelPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="Modern Lounge Chair"
        description="Ergonomic lounge chair with premium leather upholstery and swivel base"
        url="https://example.com/products/modern-lounge-chair"
        image={[
          "https://example.com/chair-1x1.jpg",
          "https://example.com/chair-4x3.jpg",
          "https://example.com/chair-16x9.jpg",
        ]}
        sku="CHAIR-ML-001"
        mpn="MLC2024"
        gtin14="00012345678912"
        brand="Designer Furniture Studio"
        // 3D model reference
        subjectOf={{
          encoding: {
            contentUrl: "https://example.com/models/lounge-chair.gltf",
          },
        }}
        // Target audience
        audience={{
          suggestedGender: "unisex",
          suggestedMinAge: 18,
          suggestedMaxAge: 65,
        }}
        offers={{
          price: 1299.0,
          priceCurrency: "USD",
          availability: "InStock",
          priceValidUntil: "2024-12-31",
          itemCondition: "https://schema.org/NewCondition",
        }}
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 127,
        }}
        // Enhanced size specifications
        size={{
          name: "Standard",
          sizeSystem: "https://schema.org/WearableSizeSystemUS",
        }}
        color="Cognac Leather"
        material="Italian Leather, Steel Frame"
        pattern="Solid"
      />

      <div className="max-w-4xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Furniture</li>
            <li>/</li>
            <li>Seating</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">Modern Lounge Chair</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg aspect-square flex flex-col items-center justify-center p-8">
              <div className="text-center">
                <span className="text-gray-500 block mb-4">Chair 3D Model</span>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                  View in 3D
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-gray-100 rounded aspect-square"></div>
              <div className="bg-gray-100 rounded aspect-square"></div>
              <div className="bg-gray-100 rounded aspect-square"></div>
              <div className="bg-gray-100 rounded aspect-square flex items-center justify-center">
                <span className="text-xs text-gray-500">360°</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Modern Lounge Chair</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★★"}</div>
                <span className="text-gray-600">
                  4.8 out of 5 (127 reviews)
                </span>
              </div>
              <p className="text-gray-600">by Designer Furniture Studio</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$1,299.00</span>
                <span className="text-sm text-gray-500">USD</span>
              </div>
              <p className="text-green-600 font-medium">✓ In Stock</p>
              <div className="flex gap-2 text-sm">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  New Condition
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  3D View Available
                </span>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Interactive 3D Model
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                View this product in 3D! Rotate, zoom, and explore every detail
                before you buy.
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700">
                Launch 3D Viewer
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-2">Color Options</h4>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-amber-700 border-2 border-gray-300 hover:border-gray-500" />
                  <button className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-300 hover:border-gray-500" />
                  <button className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-300 hover:border-gray-500" />
                  <button className="w-10 h-10 rounded-full bg-blue-900 border-2 border-gray-300 hover:border-gray-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-semibold mb-2">Target Audience</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Suitable for: Adults (18-65 years)</p>
                <p>• Design: Unisex appeal</p>
                <p>• Style: Modern, minimalist</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>SKU:</strong> CHAIR-ML-001
              </p>
              <p className="text-sm">
                <strong>MPN:</strong> MLC2024
              </p>
              <p className="text-sm">
                <strong>GTIN:</strong> 00012345678912
              </p>
              <p className="text-sm">
                <strong>Material:</strong> Italian Leather, Steel Frame
              </p>
              <p className="text-sm">
                <strong>Color:</strong> Cognac Leather
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800">
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                Request Fabric Samples
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Specifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Dimensions</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Width:</dt>
                  <dd>30 inches</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Depth:</dt>
                  <dd>32 inches</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Height:</dt>
                  <dd>40 inches</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Seat Height:</dt>
                  <dd>17 inches</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Weight:</dt>
                  <dd>45 lbs</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Materials & Care</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Top-grain Italian leather</li>
                <li>• Powder-coated steel frame</li>
                <li>• High-density foam cushioning</li>
                <li>• 360° swivel base</li>
                <li>• Clean with leather conditioner</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Ergonomic design</li>
                <li>• Adjustable headrest</li>
                <li>• Built-in lumbar support</li>
                <li>• Smooth swivel mechanism</li>
                <li>• 5-year warranty</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-purple-600">✨</span>
            About Our 3D Models
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Our interactive 3D models are created using photogrammetry and
            professional 3D scanning to provide the most accurate representation
            of our products. View products from every angle, zoom in on details,
            and see how they'll look in your space using AR technology.
          </p>
          <p className="text-sm text-gray-600">
            3D models are available in GLTF format and compatible with most
            modern browsers and AR applications.
          </p>
        </div>
      </div>
    </div>
  );
}
