import { CarouselJsonLd } from "next-seo";

export default function CarouselSummaryPage() {
  return (
    <div className="container mx-auto p-8">
      <CarouselJsonLd
        urls={[
          "https://example.com/recipe/chocolate-cookies",
          "https://example.com/recipe/banana-bread",
          { url: "https://example.com/recipe/apple-pie", position: 3 },
          "https://example.com/recipe/pancakes",
          { url: "https://example.com/recipe/brownies", position: 5 },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">Carousel Summary Page Example</h1>

      <div className="prose lg:prose-xl">
        <p>
          This page demonstrates the summary page pattern for carousels, where
          we only provide URLs to detail pages.
        </p>

        <h2>Best Recipes Collection</h2>

        <div className="grid gap-4 mt-6">
          <div className="border p-4 rounded">
            <h3>Chocolate Chip Cookies</h3>
            <p>Classic chocolate chip cookies that everyone loves.</p>
            <a
              href="https://example.com/recipe/chocolate-cookies"
              className="text-blue-600"
            >
              View Recipe →
            </a>
          </div>

          <div className="border p-4 rounded">
            <h3>Banana Bread</h3>
            <p>Moist and delicious banana bread recipe.</p>
            <a
              href="https://example.com/recipe/banana-bread"
              className="text-blue-600"
            >
              View Recipe →
            </a>
          </div>

          <div className="border p-4 rounded">
            <h3>Apple Pie</h3>
            <p>Traditional American apple pie with a flaky crust.</p>
            <a
              href="https://example.com/recipe/apple-pie"
              className="text-blue-600"
            >
              View Recipe →
            </a>
          </div>

          <div className="border p-4 rounded">
            <h3>Fluffy Pancakes</h3>
            <p>Perfect pancakes for a weekend breakfast.</p>
            <a
              href="https://example.com/recipe/pancakes"
              className="text-blue-600"
            >
              View Recipe →
            </a>
          </div>

          <div className="border p-4 rounded">
            <h3>Fudge Brownies</h3>
            <p>Rich and chocolatey brownies with a perfect texture.</p>
            <a
              href="https://example.com/recipe/brownies"
              className="text-blue-600"
            >
              View Recipe →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
