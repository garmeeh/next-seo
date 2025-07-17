import { ArticleJsonLd } from "next-seo";

export default function ArticlePage() {
  return (
    <div className="container mx-auto p-8">
      <ArticleJsonLd
        headline="Understanding Next.js App Router"
        url="https://example.com/articles/nextjs-app-router"
        datePublished="2024-01-01T08:00:00+00:00"
        author="Sarah Johnson"
        image="https://example.com/images/nextjs-article.jpg"
        description="A comprehensive guide to Next.js App Router and its features"
      />

      <article className="prose lg:prose-xl">
        <h1>Understanding Next.js App Router</h1>
        <p className="text-gray-600">By Sarah Johnson | January 1, 2024</p>

        <p>
          The Next.js App Router represents a significant evolution in how we
          build React applications. This article explores its key features and
          benefits.
        </p>

        <h2>Server Components</h2>
        <p>
          React Server Components allow us to render components on the server,
          reducing the JavaScript bundle size sent to the client...
        </p>

        <h2>Nested Layouts</h2>
        <p>
          The App Router introduces a powerful nested layout system that makes
          it easy to share UI between routes...
        </p>
      </article>
    </div>
  );
}
