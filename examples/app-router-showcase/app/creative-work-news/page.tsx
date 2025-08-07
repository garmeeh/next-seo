import { CreativeWorkJsonLd } from "next-seo";

export default function CreativeWorkNewsPage() {
  return (
    <div className="container mx-auto p-8">
      <CreativeWorkJsonLd
        type="NewsArticle"
        headline="Breaking: Major Scientific Discovery Behind Paywall"
        url="https://example.com/news/scientific-discovery"
        datePublished="2024-01-15T09:00:00+00:00"
        dateModified="2024-01-15T11:30:00+00:00"
        author={{
          name: "Jane Martinez",
          url: "https://example.com/journalists/jane-martinez",
        }}
        image={{
          url: "https://example.com/images/discovery-hero.jpg",
          width: 1200,
          height: 630,
          caption: "Scientific breakthrough illustration",
        }}
        publisher={{
          name: "Global News Network",
          logo: {
            url: "https://example.com/gnn-logo.png",
            width: 600,
            height: 60,
          },
        }}
        description="Breaking news about a major scientific discovery - full details available to subscribers"
        isAccessibleForFree={false}
        hasPart={{
          isAccessibleForFree: false,
          cssSelector: ".premium-news",
        }}
        mainEntityOfPage={{
          "@id": "https://example.com/news/scientific-discovery",
        }}
      />

      <article className="prose lg:prose-xl">
        <h1>Breaking: Major Scientific Discovery Behind Paywall</h1>

        <div className="lead bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg font-semibold">
            Scientists at the International Research Center have announced a
            groundbreaking discovery that could revolutionize our understanding
            of quantum physics.
          </p>
          <p>
            The discovery, made during a series of experiments over the past six
            months, has implications for future technology development.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Published: January 15, 2024, 9:00 AM | Updated: 11:30 AM
          </p>
        </div>

        <div className="premium-news bg-red-50 p-6 rounded-lg shadow-md mt-6 border-2 border-red-300">
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-red-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-red-700 font-semibold">
              Subscriber Exclusive Content
            </span>
          </div>

          <h2>Full Discovery Details</h2>
          <p className="text-gray-600 italic">
            This premium section is marked with cssSelector ".premium-news"
          </p>

          <h3>The Breakthrough</h3>
          <p>
            Dr. Sarah Chen and her team have successfully demonstrated quantum
            entanglement at room temperature, a feat previously thought
            impossible. The implications for quantum computing are enormous.
          </p>

          <h3>Technical Details</h3>
          <p>
            The experiment utilized a novel approach combining laser cooling
            techniques with magnetic field manipulation. The team was able to
            maintain entanglement for over 100 milliseconds at 25°C.
          </p>

          <h3>Future Applications</h3>
          <p>
            This discovery opens doors for practical quantum computers that
            don't require extreme cooling, potentially making the technology
            accessible for everyday use within the next decade.
          </p>

          <h3>Industry Response</h3>
          <p>
            Major tech companies have already expressed interest in licensing
            the technology. "This changes everything," said a spokesperson from
            a leading quantum computing firm.
          </p>
        </div>

        <div className="related bg-white p-6 rounded-lg shadow-md mt-6">
          <h2>Related Articles</h2>
          <ul>
            <li>Previous quantum computing breakthroughs</li>
            <li>Interview with Dr. Sarah Chen</li>
            <li>What this means for the future of technology</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
