import { ProductJsonLd } from "next-seo";

export default function ProductWithReturnPolicyPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="Premium Wireless Headphones"
        description="High-quality wireless headphones with active noise cancellation and 30-hour battery life"
        image={[
          "https://example.com/headphones-1.jpg",
          "https://example.com/headphones-2.jpg",
          "https://example.com/headphones-3.jpg",
        ]}
        sku="WH-1000XM5"
        mpn="WH1000XM5B"
        brand="AudioTech"
        offers={{
          price: 349.99,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2025-12-31",
          seller: {
            name: "TechStore Online",
            url: "https://www.techstore.com",
          },
          hasMerchantReturnPolicy: {
            applicableCountry: "US",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 45,
            itemCondition: [
              "https://schema.org/NewCondition",
              "https://schema.org/DamagedCondition",
            ],
            returnMethod: [
              "https://schema.org/ReturnByMail",
              "https://schema.org/ReturnInStore",
            ],
            returnFees: "https://schema.org/FreeReturn",
            refundType: [
              "https://schema.org/FullRefund",
              "https://schema.org/ExchangeRefund",
            ],
            returnLabelSource: "https://schema.org/ReturnLabelDownloadAndPrint",
            customerRemorseReturnFees: "https://schema.org/FreeReturn",
            itemDefectReturnFees: "https://schema.org/FreeReturn",
          },
        }}
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 2847,
          reviewCount: 1562,
        }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <img
              src="https://via.placeholder.com/400x400"
              alt="Premium Wireless Headphones"
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Premium Wireless Headphones
            </h1>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-green-600">
                $349.99
              </span>
              <span className="ml-4 text-sm text-gray-600">
                SKU: WH-1000XM5
              </span>
            </div>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                4.8 (2,847 reviews)
              </span>
            </div>
            <p className="text-gray-700 mb-6">
              High-quality wireless headphones with active noise cancellation
              and 30-hour battery life. Experience premium sound quality with
              industry-leading noise cancellation technology.
            </p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>

        <section className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Extended 45-Day Return Policy
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Return Window</h3>
              <p className="text-gray-700">45 days from delivery date</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Return Methods</h3>
              <p className="text-gray-700">By mail or in-store</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Return Shipping</h3>
              <p className="text-gray-700">Free returns on all orders</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Refund Options</h3>
              <p className="text-gray-700">Full refund or exchange</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              We accept returns for new items in original packaging or defective
              products. Download and print your return label from your account.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Industry-leading noise cancellation</li>
            <li>✓ 30-hour battery life</li>
            <li>✓ Premium sound quality</li>
            <li>✓ Comfortable all-day wear</li>
            <li>✓ Multi-device connectivity</li>
            <li>✓ Quick charge capability</li>
          </ul>
        </section>

        <section className="text-sm text-gray-600">
          <p>
            This example demonstrates a product with a specific return policy
            that may differ from the store's general return policy. The 45-day
            return window and free returns make this product especially
            attractive to customers.
          </p>
        </section>
      </div>
    </div>
  );
}
