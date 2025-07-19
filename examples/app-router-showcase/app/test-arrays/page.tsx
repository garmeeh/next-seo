import { ArticleJsonLd } from "next-seo";

export default function TestArraysPage() {
  return (
    <div className="container mx-auto p-8">
      <ArticleJsonLd
        headline="Test Article with Mixed Arrays"
        datePublished="2024-01-01T00:00:00.000Z"
        author={[
          "John Doe",
          {
            "@type": "Person",
            name: "Jane Smith",
            url: "https://example.com/jane",
          },
          {
            "@type": "Organization",
            name: "Tech Corp",
            logo: "https://example.com/logo.png",
          },
        ]}
        image={[
          "https://example.com/image1.jpg",
          {
            "@type": "ImageObject",
            url: "https://example.com/image2.jpg",
            width: 800,
            height: 600,
          },
        ]}
      />

      <div className="prose lg:prose-xl">
        <h1>Test Article with Mixed Arrays</h1>
        <p>This page tests JSON-LD arrays with mixed content types.</p>

        <h2>Authors</h2>
        <ul>
          <li>John Doe (string author)</li>
          <li>
            Jane Smith (Person object) -{" "}
            <a href="https://example.com/jane">Profile</a>
          </li>
          <li>Tech Corp (Organization object)</li>
        </ul>

        <h2>Images</h2>
        <ul>
          <li>Image 1: https://example.com/image1.jpg (string URL)</li>
          <li>
            Image 2: https://example.com/image2.jpg (ImageObject with dimensions
            800x600)
          </li>
        </ul>
      </div>
    </div>
  );
}
