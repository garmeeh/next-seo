import { BreadcrumbJsonLd } from "next-seo";

export default function AdvancedBreadcrumbPage() {
  return (
    <div className="container mx-auto p-8">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: "https://example.com",
          },
          {
            name: "Blog",
            item: { "@id": "https://example.com/blog" },
          },
          {
            name: "Technology",
            item: { "@id": "https://example.com/blog/technology" },
          },
          {
            name: "Understanding JSON-LD and Structured Data",
          },
        ]}
        scriptId="blog-breadcrumb"
        scriptKey="blog-breadcrumb-key"
      />

      <div className="prose lg:prose-xl">
        <h1>Advanced Breadcrumb Example</h1>

        <nav aria-label="Breadcrumb" className="my-4">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li className="text-gray-500">›</li>
            <li>
              <a href="/blog" className="text-blue-600 hover:underline">
                Blog
              </a>
            </li>
            <li className="text-gray-500">›</li>
            <li>
              <a
                href="/blog/technology"
                className="text-blue-600 hover:underline"
              >
                Technology
              </a>
            </li>
            <li className="text-gray-500">›</li>
            <li className="text-gray-700">
              Understanding JSON-LD and Structured Data
            </li>
          </ol>
        </nav>

        <article>
          <h2>Understanding JSON-LD and Structured Data</h2>
          <p className="text-gray-600 mb-4">Published on November 15, 2024</p>

          <p>
            This example demonstrates advanced features of the BreadcrumbJsonLd
            component, including the use of Thing objects with @id properties
            and custom script attributes.
          </p>

          <h3>Features Demonstrated</h3>
          <ul>
            <li>Using Thing objects with @id instead of plain URL strings</li>
            <li>Custom scriptId for targeting specific scripts</li>
            <li>Custom scriptKey for testing purposes</li>
            <li>Mixed usage of URL strings and Thing objects</li>
          </ul>

          <h3>When to Use Thing Objects</h3>
          <p>
            While plain URL strings work perfectly fine for most use cases,
            using Thing objects with @id can be beneficial when:
          </p>
          <ul>
            <li>
              You need to maintain consistency with other structured data on
              your page
            </li>
            <li>You're integrating with systems that expect Thing objects</li>
            <li>
              You want to be explicit about the semantic meaning of the
              reference
            </li>
          </ul>

          <h3>Custom Script Attributes</h3>
          <p>
            The <code>scriptId</code> and <code>scriptKey</code> props allow you
            to:
          </p>
          <ul>
            <li>Target specific JSON-LD scripts with JavaScript if needed</li>
            <li>
              Differentiate between multiple structured data blocks in tests
            </li>
            <li>Maintain consistent identifiers across page renders</li>
          </ul>
        </article>
      </div>
    </div>
  );
}
