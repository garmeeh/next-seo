import { CreativeWorkJsonLd } from "next-seo";

export default function CreativeWorkMultiplePage() {
  return (
    <div className="container mx-auto p-8">
      <CreativeWorkJsonLd
        type="Article"
        headline="In-Depth Analysis: Multiple Premium Sections"
        url="https://example.com/articles/in-depth-analysis"
        datePublished="2024-01-01T08:00:00+00:00"
        dateModified="2024-01-03T14:30:00+00:00"
        author={[
          "Dr. Emily Chen",
          {
            name: "Research Institute",
            logo: "https://example.com/institute-logo.png",
          },
        ]}
        image={[
          "https://example.com/images/analysis-16x9.jpg",
          "https://example.com/images/analysis-4x3.jpg",
          "https://example.com/images/analysis-1x1.jpg",
        ]}
        publisher={{
          name: "Academic Publishers Inc.",
          logo: "https://example.com/publisher-logo.png",
        }}
        description="A comprehensive analysis with multiple premium sections for subscribers"
        isAccessibleForFree={false}
        hasPart={[
          {
            isAccessibleForFree: false,
            cssSelector: ".section1",
          },
          {
            isAccessibleForFree: false,
            cssSelector: ".section2",
          },
        ]}
      />

      <article className="prose lg:prose-xl">
        <h1>In-Depth Analysis: Multiple Premium Sections</h1>

        <div className="introduction bg-white p-6 rounded-lg shadow-md">
          <h2>Introduction</h2>
          <p>
            This article demonstrates how to mark multiple paywalled sections
            within a single piece of content. Each premium section is identified
            by a unique CSS selector.
          </p>
          <p>
            The free introduction gives readers an overview of what's covered in
            the premium sections below.
          </p>
        </div>

        <div className="section1 bg-blue-50 p-6 rounded-lg shadow-md mt-6 border-2 border-blue-300">
          <h2>Premium Section 1: Detailed Research</h2>
          <p className="text-gray-600 italic">
            This section is marked with cssSelector ".section1"
          </p>
          <p>
            This first premium section contains detailed research findings that
            are available only to subscribers. The structured data identifies
            this section as paywalled using the CSS class "section1".
          </p>
          <p>
            Subscribers can access comprehensive data analysis, charts, and
            expert insights in this section.
          </p>
        </div>

        <div className="middle-content bg-white p-6 rounded-lg shadow-md mt-6">
          <h2>Free Interlude</h2>
          <p>
            This middle section is free content that bridges the two premium
            sections. It helps maintain reader engagement while clearly
            distinguishing between free and paid content areas.
          </p>
        </div>

        <div className="section2 bg-purple-50 p-6 rounded-lg shadow-md mt-6 border-2 border-purple-300">
          <h2>Premium Section 2: Advanced Applications</h2>
          <p className="text-gray-600 italic">
            This section is marked with cssSelector ".section2"
          </p>
          <p>
            The second premium section explores advanced applications and
            real-world case studies. This content is also behind the paywall,
            identified by the CSS class "section2".
          </p>
          <p>
            Premium subscribers gain access to exclusive case studies,
            implementation guides, and expert recommendations in this section.
          </p>
        </div>

        <div className="conclusion bg-white p-6 rounded-lg shadow-md mt-6">
          <h2>Conclusion</h2>
          <p>
            The free conclusion summarizes the key points and encourages readers
            to subscribe for full access to all premium sections.
          </p>
        </div>
      </article>
    </div>
  );
}
