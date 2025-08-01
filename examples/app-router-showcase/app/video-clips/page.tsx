import { VideoJsonLd } from "next-seo";

export default function VideoClipsPage() {
  return (
    <div className="container mx-auto p-8">
      <VideoJsonLd
        name="Complete Guide to French Pastries"
        description="A comprehensive tutorial covering classic French pastries from croissants to éclairs"
        thumbnailUrl="https://example.com/french-pastries-thumbnail.jpg"
        uploadDate="2024-02-15T09:00:00+00:00"
        contentUrl="https://example.com/videos/french-pastries-guide.mp4"
        embedUrl="https://example.com/embed/french-pastries-guide"
        duration="PT45M"
        interactionStatistic={{
          interactionType: "WatchAction",
          userInteractionCount: 75000,
        }}
        hasPart={[
          {
            name: "Introduction to French Pastries",
            startOffset: 0,
            endOffset: 180,
            url: "https://example.com/videos/french-pastries-guide?t=0",
          },
          {
            name: "Making Croissants",
            startOffset: 180,
            endOffset: 720,
            url: "https://example.com/videos/french-pastries-guide?t=180",
          },
          {
            name: "Perfect Pain au Chocolat",
            startOffset: 720,
            endOffset: 1200,
            url: "https://example.com/videos/french-pastries-guide?t=720",
          },
          {
            name: "Classic Éclairs",
            startOffset: 1200,
            endOffset: 1800,
            url: "https://example.com/videos/french-pastries-guide?t=1200",
          },
          {
            name: "Fruit Tarts and Final Tips",
            startOffset: 1800,
            endOffset: 2700,
            url: "https://example.com/videos/french-pastries-guide?t=1800",
          },
        ]}
        author="Chef Pierre Dubois"
        publisher={{
          name: "French Culinary Academy",
          logo: "https://example.com/french-culinary-academy-logo.png",
        }}
      />

      <main className="prose lg:prose-xl mx-auto">
        <h1>Complete Guide to French Pastries</h1>

        <div className="aspect-w-16 aspect-h-9 mb-8">
          <iframe
            src="https://example.com/embed/french-pastries-guide"
            title="Complete Guide to French Pastries"
            className="w-full rounded-lg shadow-lg"
            allowFullScreen
          />
        </div>

        <section className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Video Chapters</h2>
          <nav className="space-y-3">
            <a
              href="#t=0"
              className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Introduction to French Pastries
                  </p>
                  <p className="text-sm text-gray-600">0:00 - 3:00</p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </a>
            <a
              href="#t=180"
              className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Making Croissants</p>
                  <p className="text-sm text-gray-600">3:00 - 12:00</p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </a>
            <a
              href="#t=720"
              className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Perfect Pain au Chocolat</p>
                  <p className="text-sm text-gray-600">12:00 - 20:00</p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </a>
            <a
              href="#t=1200"
              className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Classic Éclairs</p>
                  <p className="text-sm text-gray-600">20:00 - 30:00</p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </a>
            <a
              href="#t=1800"
              className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Fruit Tarts and Final Tips</p>
                  <p className="text-sm text-gray-600">30:00 - 45:00</p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </a>
          </nav>
        </section>

        <section>
          <h2>About This Tutorial</h2>
          <p>
            Master the art of French pastry making with Chef Pierre Dubois in
            this comprehensive 45-minute tutorial. Each chapter focuses on a
            different classic French pastry, with detailed step-by-step
            instructions.
          </p>
        </section>

        <section>
          <h2>What You'll Learn</h2>
          <ul>
            <li>The fundamentals of French pastry dough</li>
            <li>Proper lamination techniques for croissants</li>
            <li>How to achieve the perfect choux pastry</li>
            <li>Professional decorating techniques</li>
            <li>Tips for consistent results every time</li>
          </ul>
        </section>

        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-lg">
            <strong>Pro Tip:</strong> Use the chapter navigation above to jump
            directly to the pastry you want to learn about. Each section is
            self-contained with all the information you need.
          </p>
        </div>
      </main>
    </div>
  );
}
