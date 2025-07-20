import { ArticleJsonLd } from "next-seo";

export default function BlogPostingPage() {
  return (
    <div className="container mx-auto p-8">
      <ArticleJsonLd
        type="BlogPosting"
        headline="10 Essential SEO Tips for Modern Web Development"
        url="https://example.com/blog/seo-tips-web-development"
        datePublished="2024-01-10T09:00:00+00:00"
        author={{
          name: "WebDev Solutions",
          url: "https://example.com",
          logo: "https://example.com/webdev-logo.png",
        }}
        image={{
          "@type": "ImageObject",
          url: "https://example.com/images/seo-tips-hero.jpg",
          width: 1920,
          height: 1080,
          caption: "SEO Tips for Web Developers",
        }}
        publisher={{
          "@type": "Organization",
          name: "WebDev Solutions Blog",
          logo: {
            "@type": "ImageObject",
            url: "https://example.com/blog-logo.png",
            width: 200,
            height: 60,
          },
        }}
        description="Learn the essential SEO strategies every web developer should know to improve search rankings"
        isAccessibleForFree={false}
        mainEntityOfPage={{
          "@type": "WebPage",
          "@id": "https://example.com/blog/seo-tips-web-development",
        }}
      />

      <article className="prose lg:prose-xl">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-4">
          PREMIUM CONTENT
        </div>

        <h1>10 Essential SEO Tips for Modern Web Development</h1>

        <div className="text-gray-600 mb-8">
          <p>By WebDev Solutions Team</p>
          <p>Published: January 10, 2024</p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="font-semibold">Premium Article</p>
          <p>This is premium content. Subscribe to access the full article.</p>
        </div>

        <p className="lead text-xl">
          Search Engine Optimization (SEO) is crucial for modern web
          development. In this comprehensive guide, we'll explore the top 10
          strategies that every developer should implement.
        </p>

        <h2>1. Optimize Page Load Speed</h2>
        <p>
          Page speed is a critical ranking factor. Use tools like Lighthouse to
          measure and improve your Core Web Vitals...
        </p>

        <h2>2. Implement Structured Data</h2>
        <p>
          Using structured data helps search engines understand your content
          better. Tools like Next SEO make this implementation
          straightforward...
        </p>

        <h2>3. Mobile-First Design</h2>
        <p>
          With mobile-first indexing, ensuring your site works perfectly on
          mobile devices is no longer optional...
        </p>

        <div className="bg-gray-100 p-6 rounded-lg mt-8">
          <h3>About the Author</h3>
          <p>
            WebDev Solutions is a leading web development agency specializing in
            modern, SEO-optimized web applications.
          </p>
        </div>
      </article>
    </div>
  );
}
