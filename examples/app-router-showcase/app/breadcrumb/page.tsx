import { BreadcrumbJsonLd } from "next-seo";

export default function BreadcrumbPage() {
  return (
    <div className="container mx-auto p-8">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: "https://example.com",
          },
          {
            name: "Products",
            item: "https://example.com/products",
          },
          {
            name: "Electronics",
            item: "https://example.com/products/electronics",
          },
          {
            name: "Smartphones",
            item: "https://example.com/products/electronics/smartphones",
          },
          {
            name: "iPhone 15 Pro",
          },
        ]}
      />

      <div className="prose lg:prose-xl">
        <h1>Breadcrumb JSON-LD Example</h1>

        <nav aria-label="Breadcrumb" className="my-4">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <a href="/products" className="text-blue-600 hover:underline">
                Products
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <a
                href="/products/electronics"
                className="text-blue-600 hover:underline"
              >
                Electronics
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <a
                href="/products/electronics/smartphones"
                className="text-blue-600 hover:underline"
              >
                Smartphones
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700">iPhone 15 Pro</li>
          </ol>
        </nav>

        <p>
          This page demonstrates the basic usage of the BreadcrumbJsonLd
          component. The breadcrumb trail shows the hierarchical path to reach
          this product page.
        </p>

        <h2>Features Demonstrated</h2>
        <ul>
          <li>Simple breadcrumb trail with multiple levels</li>
          <li>Last item without URL (current page)</li>
          <li>Automatic position numbering</li>
        </ul>

        <h2>View Source</h2>
        <p>
          Inspect the page source to see the generated JSON-LD structured data
          in the head section.
        </p>
      </div>
    </div>
  );
}
