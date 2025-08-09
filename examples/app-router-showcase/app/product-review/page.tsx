import { ProductJsonLd } from "next-seo";

export default function ProductReviewPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="Cheese Grater Pro"
        description="Professional-grade cheese grater for culinary enthusiasts"
        url="https://example.com/products/cheese-grater-pro"
        image="https://example.com/photos/cheese-grater.jpg"
        sku="CG-PRO-2024"
        brand="Kitchen Masters"
        review={{
          name: "Cheese Grater Pro Review",
          author: "Pascal Van Cleeff",
          reviewRating: {
            ratingValue: 4,
            bestRating: 5,
          },
          reviewBody:
            "After extensive testing in my professional kitchen, I can say this is a solid cheese grater with some great features and a few drawbacks.",
          datePublished: "2024-01-15",
          positiveNotes: {
            itemListElement: [
              { name: "Consistent results" },
              { name: "Still sharp after many uses" },
              { name: "Easy to clean" },
              { name: "Comfortable grip" },
              { name: "Multiple grating sizes" },
            ],
          },
          negativeNotes: {
            itemListElement: [
              { name: "No child protection" },
              { name: "Lacking advanced features" },
              { name: "Takes up drawer space" },
            ],
          },
        }}
        aggregateRating={{
          ratingValue: 4.2,
          reviewCount: 234,
        }}
        offers={{
          price: 29.99,
          priceCurrency: "USD",
          availability: "InStock",
        }}
      />

      <div className="max-w-4xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Kitchen</li>
            <li>/</li>
            <li>Reviews</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">
              Cheese Grater Pro Review
            </li>
          </ol>
        </nav>

        <article className="prose lg:prose-xl max-w-none">
          <h1 className="text-4xl font-bold mb-4">Cheese Grater Pro Review</h1>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-6">
              <div className="bg-gray-200 rounded-lg w-32 h-32 flex-shrink-0"></div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">
                  Cheese Grater Pro
                </h2>
                <p className="text-gray-600 mb-3">by Kitchen Masters</p>
                <div className="flex items-center gap-4">
                  <div className="flex text-yellow-400">{"★★★★☆"}</div>
                  <span className="font-semibold">4.0 out of 5</span>
                </div>
                <p className="text-green-600 font-medium mt-2">
                  $29.99 - In Stock
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <p className="font-semibold">Pascal Van Cleeff</p>
                <p className="text-sm text-gray-600">
                  Professional Chef • Published Jan 15, 2024
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-8">
            After extensive testing in my professional kitchen, I can say this
            is a solid cheese grater with some great features and a few
            drawbacks. I've used it daily for three months, grating everything
            from hard parmesan to soft mozzarella, and it has held up remarkably
            well.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">✓</span> Pros
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <div>
                    <strong>Consistent results</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Every grate produces uniform shreds, perfect for
                      professional presentation
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <div>
                    <strong>Still sharp after many uses</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Three months of daily use and still cutting like new
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <div>
                    <strong>Easy to clean</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Dishwasher safe and cheese doesn't stick
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <div>
                    <strong>Comfortable grip</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Ergonomic handle reduces hand fatigue
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <div>
                    <strong>Multiple grating sizes</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Four different surfaces for various needs
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">✗</span> Cons
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <div>
                    <strong>No child protection</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Very sharp edges with no safety cover included
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <div>
                    <strong>Lacking advanced features</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      No container attachment or measurement markings
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <div>
                    <strong>Takes up drawer space</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      Bulky design doesn't fold or compress for storage
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Detailed Analysis</h3>

            <h4 className="font-semibold mb-2">Build Quality</h4>
            <p className="mb-4">
              The Cheese Grater Pro is constructed from high-grade stainless
              steel that shows no signs of rust or wear after months of use. The
              handle is made from a comfortable rubber compound that provides
              excellent grip even when wet.
            </p>

            <h4 className="font-semibold mb-2">Performance</h4>
            <p className="mb-4">
              In terms of performance, this grater excels. Hard cheeses like
              parmesan are effortlessly reduced to fine powder, while softer
              cheeses maintain their integrity without becoming mushy. The
              multiple grating surfaces allow for versatility in the kitchen.
            </p>

            <h4 className="font-semibold mb-2">Value for Money</h4>
            <p className="mb-4">
              At $29.99, the Cheese Grater Pro sits in the mid-range price
              bracket. Given its durability and performance, it represents good
              value for both home cooks and professionals.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Final Verdict</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex text-yellow-400 text-2xl">{"★★★★☆"}</div>
              <span className="text-2xl font-bold">4.0 out of 5</span>
            </div>
            <p className="text-lg">
              <strong>Recommended for:</strong> Home cooks and professionals who
              need a reliable, durable cheese grater for daily use. The
              consistent results and longevity make it a worthwhile investment
              despite some minor drawbacks.
            </p>
            <p className="mt-4 text-gray-600">
              <strong>Not recommended for:</strong> Families with young children
              (due to safety concerns) or those with limited storage space.
            </p>
          </div>
        </article>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Other Reviews</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Sarah M.</span>
                <span className="flex text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-700">
                Best grater I've ever owned! Worth every penny.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Mike D.</span>
                <span className="flex text-yellow-400">★★★★☆</span>
              </div>
              <p className="text-gray-700">
                Great product but wish it had a protective cover.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Lisa K.</span>
                <span className="flex text-yellow-400">★★★★☆</span>
              </div>
              <p className="text-gray-700">
                Excellent quality, just a bit large for my kitchen drawer.
              </p>
            </div>
          </div>
          <p className="text-center mt-4 text-gray-600">
            Overall rating: 4.2 out of 5 (234 reviews)
          </p>
        </div>
      </div>
    </div>
  );
}
