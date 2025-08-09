import { VideoJsonLd } from "next-seo";

export default function VideoSeekToPage() {
  return (
    <div className="container mx-auto p-8">
      <VideoJsonLd
        name="50 Quick Kitchen Tips & Tricks"
        description="A rapid-fire collection of 50 essential kitchen tips and tricks that will transform your cooking"
        thumbnailUrl={[
          "https://example.com/kitchen-tips-1x1.jpg",
          "https://example.com/kitchen-tips-16x9.jpg",
        ]}
        uploadDate="2024-04-01T12:00:00+00:00"
        embedUrl="https://example.com/embed/kitchen-tips"
        duration="PT25M"
        interactionStatistic={{
          interactionType: "WatchAction",
          userInteractionCount: 250000,
        }}
        potentialAction={{
          target:
            "https://example.com/videos/kitchen-tips?t={seek_to_second_number}",
          "startOffset-input": "required name=seek_to_second_number",
        }}
        author="Chef Sarah Thompson"
        publisher={{
          name: "Quick Cooking Tips",
          logo: "https://example.com/quick-cooking-tips-logo.png",
        }}
      />

      <main className="prose lg:prose-xl mx-auto">
        <h1>50 Quick Kitchen Tips & Tricks</h1>

        <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-2">
            🎯 Smart Navigation Enabled
          </h3>
          <p>
            This video features automatic key moment detection. Search engines
            can automatically identify and link to specific tips throughout the
            video based on the content.
          </p>
        </div>

        <section>
          <h2>About This Video</h2>
          <p>
            Join Chef Sarah Thompson for a rapid-fire session of 50 essential
            kitchen tips that will save you time, reduce waste, and improve your
            cooking. Each tip is explained in just 30 seconds, making this the
            ultimate quick reference guide.
          </p>
        </section>

        <section>
          <h2>How SeekToAction Works</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="mb-4">
              This video uses <strong>SeekToAction</strong> structured data,
              which allows search engines to:
            </p>
            <ul>
              <li>Automatically detect key moments in the video</li>
              <li>Create direct links to specific tips</li>
              <li>Display relevant segments in search results</li>
              <li>Enable users to jump directly to the content they need</li>
            </ul>
            <p className="mt-4 text-sm">
              <strong>URL Pattern:</strong>{" "}
              <code>
                ?t={"{"}seek_to_second_number{"}"}
              </code>
            </p>
          </div>
        </section>

        <section>
          <h2>Sample Tips Covered</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">🥑 Avocado Tips</h3>
              <p>How to perfectly ripen avocados and keep them fresh longer</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">🔪 Knife Skills</h3>
              <p>Professional techniques for faster, safer chopping</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">🧄 Garlic Hacks</h3>
              <p>Quick peeling methods and flavor maximization</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">🍳 Pan Maintenance</h3>
              <p>Keep your cookware in perfect condition</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Why This Format?</h2>
          <p>
            By presenting 50 tips in rapid succession, viewers can quickly find
            exactly what they need. The SeekToAction implementation means search
            engines can understand the content structure and help users jump
            directly to relevant tips.
          </p>
        </section>

        <div className="bg-green-50 p-6 rounded-lg">
          <p className="text-lg">
            <strong>Viewer Tip:</strong> Try searching for specific cooking
            problems in your search engine. If this video contains a relevant
            tip, you might see a direct link to that exact moment in the video!
          </p>
        </div>
      </main>
    </div>
  );
}
