import { ArticleJsonLd } from "next-seo";

export default function NewsArticlePage() {
  return (
    <div className="container mx-auto p-8">
      <ArticleJsonLd
        type="NewsArticle"
        headline="Breaking: Next.js 14 Released with Major Performance Improvements"
        url="https://example.com/news/nextjs-14-release"
        datePublished="2024-01-15T10:00:00+00:00"
        dateModified="2024-01-15T14:30:00+00:00"
        author={[
          {
            "@type": "Person",
            name: "Alex Chen",
            url: "https://example.com/authors/alex-chen",
          },
          {
            "@type": "Person",
            name: "Maria Garcia",
            url: "https://example.com/authors/maria-garcia",
          },
        ]}
        image={[
          "https://example.com/images/nextjs-14-16x9.jpg",
          "https://example.com/images/nextjs-14-4x3.jpg",
          "https://example.com/images/nextjs-14-1x1.jpg",
        ]}
        publisher={{
          "@type": "Organization",
          name: "Tech News Daily",
          logo: {
            "@type": "ImageObject",
            url: "https://example.com/logo.png",
            width: 600,
            height: 60,
          },
        }}
        description="Next.js 14 brings significant performance improvements and new features"
        isAccessibleForFree={true}
      />

      <article className="prose lg:prose-xl">
        <div className="bg-red-600 text-white px-4 py-2 rounded-t-lg inline-block">
          BREAKING NEWS
        </div>

        <h1>Next.js 14 Released with Major Performance Improvements</h1>

        <div className="text-gray-600 mb-4">
          <p>By Alex Chen and Maria Garcia</p>
          <p>Published: January 15, 2024 at 10:00 AM</p>
          <p>Updated: January 15, 2024 at 2:30 PM</p>
        </div>

        <p className="lead text-xl">
          Vercel today announced the release of Next.js 14, bringing significant
          performance improvements and developer experience enhancements to the
          popular React framework.
        </p>

        <h2>Key Improvements</h2>
        <ul>
          <li>Turbopack is now 5,000x faster than Webpack</li>
          <li>Server Actions are now stable</li>
          <li>Partial Prerendering (Preview)</li>
        </ul>

        <p>
          The development team has focused on improving local development
          performance, with Turbopack showing remarkable speed improvements...
        </p>
      </article>
    </div>
  );
}
