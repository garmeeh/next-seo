import { ProductJsonLd } from "next-seo";

export default function ProductVariantsPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        type="ProductGroup"
        name="Wool Winter Coat"
        description="Premium wool coat designed for cold winter climates. Available in multiple colors and sizes."
        url="https://example.com/products/wool-winter-coat"
        productGroupID="WC2024"
        brand="Nordic Style"
        pattern="striped"
        material="wool"
        variesBy={["size", "color"]}
        aggregateRating={{
          ratingValue: 4.6,
          reviewCount: 127,
        }}
        hasVariant={[
          {
            name: "Wool Winter Coat - Small Green",
            sku: "WC2024-S-GRN",
            gtin14: "98766051104214",
            size: "small",
            color: "Green",
            image: "https://example.com/images/coat-small-green.jpg",
            offers: {
              price: 119.99,
              priceCurrency: "USD",
              availability: "InStock",
              url: "https://example.com/products/wool-winter-coat?size=small&color=green",
            },
          },
          {
            name: "Wool Winter Coat - Small Light Blue",
            sku: "WC2024-S-BLU",
            gtin14: "98766051104207",
            size: "small",
            color: "Light Blue",
            image: "https://example.com/images/coat-small-lightblue.jpg",
            offers: {
              price: 119.99,
              priceCurrency: "USD",
              availability: "InStock",
              url: "https://example.com/products/wool-winter-coat?size=small&color=lightblue",
            },
          },
          {
            name: "Wool Winter Coat - Medium Green",
            sku: "WC2024-M-GRN",
            gtin14: "98766051104221",
            size: "medium",
            color: "Green",
            image: "https://example.com/images/coat-medium-green.jpg",
            offers: {
              price: 129.99,
              priceCurrency: "USD",
              availability: "InStock",
              url: "https://example.com/products/wool-winter-coat?size=medium&color=green",
            },
          },
          {
            name: "Wool Winter Coat - Large Light Blue",
            sku: "WC2024-L-BLU",
            gtin14: "98766051104399",
            size: "large",
            color: "Light Blue",
            image: "https://example.com/images/coat-large-lightblue.jpg",
            offers: {
              price: 139.99,
              priceCurrency: "USD",
              availability: "BackOrder",
              url: "https://example.com/products/wool-winter-coat?size=large&color=lightblue",
            },
          },
        ]}
      />

      <div className="max-w-6xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Clothing</li>
            <li>/</li>
            <li>Outerwear</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">Wool Winter Coat</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
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
              <h1 className="text-3xl font-bold mb-2">Wool Winter Coat</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★★"}</div>
                <span className="text-gray-600">
                  4.6 out of 5 (127 reviews)
                </span>
              </div>
              <p className="text-gray-600">by Nordic Style</p>
            </div>

            <div>
              <p className="text-gray-700">
                Premium wool coat designed for cold winter climates. Features a
                classic striped pattern and exceptional warmth. Available in
                multiple colors and sizes to suit your style.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border-2 border-blue-500 rounded">
                    Light Blue
                  </button>
                  <button className="px-4 py-2 border rounded hover:border-gray-400">
                    Green
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border rounded hover:border-gray-400">
                    Small
                  </button>
                  <button className="px-4 py-2 border rounded hover:border-gray-400">
                    Medium
                  </button>
                  <button className="px-4 py-2 border-2 border-blue-500 rounded">
                    Large
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$139.99</span>
                <span className="text-sm text-gray-500">USD</span>
              </div>
              <p className="text-orange-600 font-medium">
                ⚠ Back Order - Ships in 2-3 weeks
              </p>
              <p className="text-sm text-gray-500">
                Product ID: WC2024 | SKU: WC2024-L-BLU
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700">
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                View All Variants
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Variants</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <div className="bg-gray-200 rounded aspect-square mb-3"></div>
              <h3 className="font-semibold">Small - Green</h3>
              <p className="text-gray-600">$119.99</p>
              <p className="text-green-600 text-sm">✓ In Stock</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="bg-gray-200 rounded aspect-square mb-3"></div>
              <h3 className="font-semibold">Small - Light Blue</h3>
              <p className="text-gray-600">$119.99</p>
              <p className="text-green-600 text-sm">✓ In Stock</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="bg-gray-200 rounded aspect-square mb-3"></div>
              <h3 className="font-semibold">Medium - Green</h3>
              <p className="text-gray-600">$129.99</p>
              <p className="text-green-600 text-sm">✓ In Stock</p>
            </div>
            <div className="border rounded-lg p-4 border-blue-500">
              <div className="bg-gray-200 rounded aspect-square mb-3"></div>
              <h3 className="font-semibold">Large - Light Blue</h3>
              <p className="text-gray-600">$139.99</p>
              <p className="text-orange-600 text-sm">⚠ Back Order</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Premium wool construction</li>
                <li>• Striped pattern design</li>
                <li>• Wind and water resistant</li>
                <li>• Interior fleece lining</li>
                <li>• Multiple pockets with zippers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Specifications</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Material:</dt>
                  <dd>100% Wool</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Pattern:</dt>
                  <dd>Striped</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Brand:</dt>
                  <dd>Nordic Style</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Product Group ID:</dt>
                  <dd>WC2024</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Available Sizes:</dt>
                  <dd>Small, Medium, Large</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Available Colors:</dt>
                  <dd>Green, Light Blue</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
