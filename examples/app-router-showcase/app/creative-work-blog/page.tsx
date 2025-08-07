import { CreativeWorkJsonLd } from "next-seo";

export default function CreativeWorkBlogPage() {
  return (
    <div className="container mx-auto p-8">
      <CreativeWorkJsonLd
        type="Blog"
        name="Premium Tech Insights Blog"
        url="https://example.com/blog"
        description="A premium technology blog with exclusive content for subscribers"
        author={{
          name: "Tech Insights Team",
          url: "https://example.com/team",
          logo: "https://example.com/team-logo.png",
        }}
        publisher={{
          name: "Tech Insights Publishing",
          logo: "https://example.com/blog-logo.png",
        }}
        datePublished="2024-01-01T00:00:00+00:00"
        isAccessibleForFree={false}
        hasPart={{
          isAccessibleForFree: false,
          cssSelector: ".members-only",
        }}
      />

      <div className="prose lg:prose-xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Premium Tech Insights Blog</h1>
          <p className="text-lg text-gray-600 mt-2">
            Exclusive technology insights for our subscribers
          </p>
        </header>

        <div className="blog-intro bg-white p-6 rounded-lg shadow-md mb-6">
          <h2>Welcome to Tech Insights</h2>
          <p>
            Our blog provides in-depth analysis of the latest technology trends,
            expert opinions, and exclusive interviews with industry leaders.
          </p>
          <p>
            While some content is freely available, our premium articles are
            reserved for subscribers who support our independent journalism.
          </p>
        </div>

        <div className="recent-posts">
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>

          <article className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold">
              Free Article: Introduction to AI Ethics
            </h3>
            <p className="text-gray-600">
              An overview of ethical considerations in artificial intelligence
              development.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Published: January 10, 2024
            </p>
          </article>

          <article className="members-only bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-md mb-4 border-2 border-purple-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">
                The Future of Quantum Computing
              </h3>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                Members Only
              </span>
            </div>
            <p className="text-gray-600 italic">
              This premium content is marked with cssSelector ".members-only"
            </p>
            <p className="text-gray-700 mt-2">
              An exclusive deep dive into quantum computing breakthroughs and
              their potential impact on cryptography, drug discovery, and
              artificial intelligence over the next decade.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Published: January 12, 2024
            </p>
          </article>

          <article className="members-only bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg shadow-md mb-4 border-2 border-blue-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">
                Interview: CEO of Neural Dynamics
              </h3>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Members Only
              </span>
            </div>
            <p className="text-gray-600 italic">
              This premium content is marked with cssSelector ".members-only"
            </p>
            <p className="text-gray-700 mt-2">
              Exclusive interview with Dr. Michael Chen about the latest
              developments in brain-computer interfaces and the future of
              human-machine interaction.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Published: January 14, 2024
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold">
              Free Article: Getting Started with Web3
            </h3>
            <p className="text-gray-600">
              A beginner's guide to understanding blockchain and decentralized
              applications.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Published: January 8, 2024
            </p>
          </article>
        </div>

        <div className="subscription-cta bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Become a Member</h2>
          <p className="mb-4">
            Get unlimited access to all premium articles, exclusive newsletters,
            and early access to new content.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}
