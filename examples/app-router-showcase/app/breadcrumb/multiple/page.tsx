import { BreadcrumbJsonLd } from "next-seo";

export default function MultipleBreadcrumbsPage() {
  return (
    <div className="container mx-auto p-8">
      <BreadcrumbJsonLd
        multipleTrails={[
          // First trail: Category path
          [
            {
              name: "Books",
              item: "https://example.com/books",
            },
            {
              name: "Science Fiction",
              item: "https://example.com/books/sciencefiction",
            },
            {
              name: "Award Winners",
            },
          ],
          // Second trail: Award path
          [
            {
              name: "Literature",
              item: "https://example.com/literature",
            },
            {
              name: "Award Winners",
            },
          ],
        ]}
      />

      <div className="prose lg:prose-xl">
        <h1>Multiple Breadcrumb Trails Example</h1>

        <p>
          This page can be reached through multiple paths, so we provide
          multiple breadcrumb trails for search engines.
        </p>

        <h2>Path 1: By Category</h2>
        <nav aria-label="Breadcrumb by category" className="my-4">
          <ol className="flex items-center space-x-2">
            <li>Books</li>
            <li className="text-gray-500">›</li>
            <li>
              <a
                href="/books/sciencefiction"
                className="text-blue-600 hover:underline"
              >
                Science Fiction
              </a>
            </li>
            <li className="text-gray-500">›</li>
            <li className="text-gray-700">Award Winners</li>
          </ol>
        </nav>

        <h2>Path 2: By Award Type</h2>
        <nav aria-label="Breadcrumb by award" className="my-4">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/literature" className="text-blue-600 hover:underline">
                Literature
              </a>
            </li>
            <li className="text-gray-500">›</li>
            <li className="text-gray-700">Award Winners</li>
          </ol>
        </nav>

        <h2>Why Multiple Breadcrumbs?</h2>
        <p>
          Some pages can logically belong to multiple hierarchies. For example,
          this "Award Winners" page can be reached both through the Books →
          Science Fiction path and through the Literature path. By providing
          multiple breadcrumb trails, we help search engines understand all the
          ways users might navigate to this content.
        </p>

        <h2>Implementation Note</h2>
        <p>
          When using multiple trails, the component generates an array of
          BreadcrumbList objects instead of a single object. This is the correct
          way to represent multiple breadcrumb trails according to Google's
          structured data guidelines.
        </p>
      </div>
    </div>
  );
}
