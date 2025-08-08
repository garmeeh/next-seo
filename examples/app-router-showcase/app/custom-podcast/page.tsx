import { PodcastSeriesJsonLd } from "../../components/custom/PodcastSeriesJsonLd";

export default function CustomPodcastPage() {
  return (
    <div className="container">
      <PodcastSeriesJsonLd
        name="Tech Talk Weekly"
        description="Weekly discussions about technology trends and innovations"
        host="Sarah Johnson"
        url="https://example.com/podcasts/tech-talk-weekly"
        image="https://example.com/podcast-cover.jpg"
        episodes={[
          {
            name: "Episode 1: AI Revolution",
            duration: "PT30M",
            datePublished: "2024-01-01",
            description:
              "Exploring the latest developments in artificial intelligence",
            url: "https://example.com/episodes/ep1-ai-revolution",
          },
          {
            name: "Episode 2: Web3 Explained",
            duration: "PT45M",
            datePublished: "2024-01-08",
            description:
              "Demystifying blockchain and decentralized technologies",
            url: "https://example.com/episodes/ep2-web3-explained",
          },
          {
            name: "Episode 3: Quantum Computing",
            duration: "PT35M",
            datePublished: "2024-01-15",
            description:
              "The future of computing and its practical applications",
            url: "https://example.com/episodes/ep3-quantum-computing",
          },
        ]}
      />

      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Tech Talk Weekly</h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Custom Component Demo - Built with next-seo processors
        </p>

        <section>
          <h2>About the Podcast</h2>
          <p>
            This page demonstrates a custom PodcastSeries JSON-LD component
            built using next-seo's core utilities. The component uses the
            library's processors to handle flexible input types - notice how the
            host can be passed as a simple string, but gets properly converted
            to a Person schema type.
          </p>
        </section>

        <section style={{ marginTop: "2rem" }}>
          <h2>Recent Episodes</h2>
          <ul>
            <li>Episode 1: AI Revolution (30 min)</li>
            <li>Episode 2: Web3 Explained (45 min)</li>
            <li>Episode 3: Quantum Computing (35 min)</li>
          </ul>
        </section>

        <section
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h3>Developer Note</h3>
          <p style={{ fontSize: "0.9rem" }}>
            This custom component was created using:
          </p>
          <ul style={{ fontSize: "0.9rem" }}>
            <li>JsonLdScript from next-seo for rendering</li>
            <li>processors.processAuthor() for flexible host input</li>
            <li>processors.processImage() for image handling</li>
            <li>
              The @type optional pattern - no manual type specification needed!
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
