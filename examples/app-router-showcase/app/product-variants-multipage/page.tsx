import { ProductJsonLd } from "next-seo";

export default function ProductVariantsMultipagePage() {
  return (
    <div className="container mx-auto p-8">
      {/* This demonstrates the multi-page approach where a specific variant
          is shown on its own page with reference to the parent ProductGroup */}
      <ProductJsonLd
        name="Premium Leather Wallet - Brown Classic"
        description="Handcrafted genuine leather wallet in classic brown. Features multiple card slots, bill compartment, and RFID blocking technology."
        url="https://example.com/products/leather-wallet/brown-classic"
        sku="LW2024-BRN-CLS"
        gtin14="98766051105555"
        color="Brown"
        pattern="Classic"
        size="Standard"
        material="Genuine Leather"
        brand="Craftsman Leather Co."
        image={[
          "https://example.com/images/wallet-brown-classic-1.jpg",
          "https://example.com/images/wallet-brown-classic-2.jpg",
          "https://example.com/images/wallet-brown-classic-3.jpg",
        ]}
        // Reference to the parent ProductGroup
        isVariantOf={{
          "@id": "#wallet_group",
        }}
        inProductGroupWithID="LW2024"
        offers={{
          price: 79.99,
          priceCurrency: "USD",
          availability: "InStock",
          url: "https://example.com/products/leather-wallet/brown-classic",
          seller: {
            name: "Craftsman Leather Co.",
            url: "https://example.com",
          },
        }}
        aggregateRating={{
          ratingValue: 4.7,
          reviewCount: 89,
        }}
      />

      {/* Include the ProductGroup definition on the same page for context
          In a real multi-page scenario, this would be duplicated across variant pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            "@id": "#wallet_group",
            name: "Premium Leather Wallet",
            description:
              "Handcrafted genuine leather wallets available in multiple colors and patterns.",
            brand: {
              "@type": "Brand",
              name: "Craftsman Leather Co.",
            },
            productGroupID: "LW2024",
            material: "Genuine Leather",
            variesBy: [
              "https://schema.org/color",
              "https://schema.org/pattern",
            ],
            hasVariant: [
              {
                "@type": "Product",
                name: "Premium Leather Wallet - Brown Classic",
                sku: "LW2024-BRN-CLS",
                color: "Brown",
                pattern: "Classic",
                offers: {
                  "@type": "Offer",
                  price: 79.99,
                  priceCurrency: "USD",
                  url: "https://example.com/products/leather-wallet/brown-classic",
                },
              },
              {
                url: "https://example.com/products/leather-wallet/black-modern",
              },
              {
                url: "https://example.com/products/leather-wallet/tan-vintage",
              },
            ],
          }),
        }}
      />

      <div className="max-w-6xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Accessories</li>
            <li>/</li>
            <li>Wallets</li>
            <li>/</li>
            <li>Premium Leather Wallet</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">Brown Classic</li>
          </ol>
        </nav>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-yellow-900 mb-2">
            Multi-Page Variant Example
          </h2>
          <p className="text-sm text-yellow-800">
            This page demonstrates the multi-page approach where each product
            variant has its own page. The variant references its parent
            ProductGroup using the <code>isVariantOf</code> property. In a real
            implementation, each color/pattern combination would have its own
            URL and page.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
              <span className="text-gray-500">Brown Classic Wallet Image</span>
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
              <h1 className="text-3xl font-bold mb-2">
                Premium Leather Wallet - Brown Classic
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★★"}</div>
                <span className="text-gray-600">4.7 out of 5 (89 reviews)</span>
              </div>
              <p className="text-gray-600">by Craftsman Leather Co.</p>
            </div>

            <div>
              <p className="text-gray-700">
                Handcrafted genuine leather wallet in classic brown. Features
                multiple card slots, bill compartment, and RFID blocking
                technology. Each wallet is carefully crafted by skilled artisans
                ensuring premium quality and durability.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Color & Pattern
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="#"
                    className="border-2 border-blue-500 rounded p-2 text-center"
                  >
                    <div className="w-full h-12 bg-amber-700 rounded mb-1"></div>
                    <span className="text-xs">Brown Classic</span>
                  </a>
                  <a
                    href="/products/leather-wallet/black-modern"
                    className="border rounded p-2 text-center hover:border-gray-400"
                  >
                    <div className="w-full h-12 bg-black rounded mb-1"></div>
                    <span className="text-xs">Black Modern</span>
                  </a>
                  <a
                    href="/products/leather-wallet/tan-vintage"
                    className="border rounded p-2 text-center hover:border-gray-400"
                  >
                    <div className="w-full h-12 bg-orange-300 rounded mb-1"></div>
                    <span className="text-xs">Tan Vintage</span>
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click to view other color/pattern combinations
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$79.99</span>
                <span className="text-sm text-gray-500">USD</span>
              </div>
              <p className="text-green-600 font-medium">✓ In Stock</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>SKU: LW2024-BRN-CLS</p>
                <p>GTIN: 98766051105555</p>
                <p>Product Group: LW2024</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700">
                Add to Cart - Brown Classic
              </button>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                View All Color Options
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Other Available Variants</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/products/leather-wallet/brown-classic"
              className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50"
            >
              <div className="bg-amber-700 rounded aspect-square mb-3"></div>
              <h3 className="font-semibold">Brown Classic</h3>
              <p className="text-gray-600">$79.99</p>
              <p className="text-sm text-blue-600">Currently viewing</p>
            </a>
            <a
              href="/products/leather-wallet/black-modern"
              className="border rounded-lg p-4 hover:border-gray-400"
            >
              <div className="bg-black rounded aspect-square mb-3"></div>
              <h3 className="font-semibold">Black Modern</h3>
              <p className="text-gray-600">$89.99</p>
              <p className="text-green-600 text-sm">✓ In Stock</p>
            </a>
            <a
              href="/products/leather-wallet/tan-vintage"
              className="border rounded-lg p-4 hover:border-gray-400"
            >
              <div className="bg-orange-300 rounded aspect-square mb-3"></div>
              <h3 className="font-semibold">Tan Vintage</h3>
              <p className="text-gray-600">$94.99</p>
              <p className="text-green-600 text-sm">✓ In Stock</p>
            </a>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 8 card slots</li>
                <li>• 2 bill compartments</li>
                <li>• RFID blocking technology</li>
                <li>• Genuine leather construction</li>
                <li>• Hand-stitched edges</li>
                <li>• Gift box included</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Specifications</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Dimensions:</dt>
                  <dd>4.5" x 3.5" x 0.5"</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Material:</dt>
                  <dd>Genuine Leather</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Color:</dt>
                  <dd>Brown</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Pattern:</dt>
                  <dd>Classic</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Warranty:</dt>
                  <dd>2 years</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">
            Structured Data Implementation Note
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              This page demonstrates the{" "}
              <strong>multi-page variant approach</strong> where:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Each variant has its own dedicated page/URL</li>
              <li>
                The variant Product includes <code>isVariantOf</code> to
                reference the ProductGroup
              </li>
              <li>
                The ProductGroup definition is duplicated on each variant page
              </li>
              <li>
                The ProductGroup lists all variants, with URL-only references to
                other pages
              </li>
            </ul>
            <p className="mt-3">
              This approach is ideal for e-commerce sites where each variant
              needs its own SEO-optimized page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
