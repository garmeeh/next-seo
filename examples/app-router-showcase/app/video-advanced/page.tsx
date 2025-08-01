import { VideoJsonLd } from "next-seo";

export default function VideoAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <VideoJsonLd
        name="Complete Baking Masterclass: From Basics to Advanced"
        description="Join our comprehensive baking masterclass covering everything from basic techniques to advanced pastry skills"
        thumbnailUrl={[
          "https://example.com/thumbnails/masterclass-1x1.jpg",
          "https://example.com/thumbnails/masterclass-4x3.jpg",
          "https://example.com/thumbnails/masterclass-16x9.jpg",
        ]}
        uploadDate="2024-03-01T10:00:00+00:00"
        contentUrl="https://example.com/videos/baking-masterclass.mp4"
        embedUrl="https://example.com/embed/baking-masterclass"
        duration="PT2H30M"
        expires="2025-03-01T00:00:00+00:00"
        interactionStatistic={[
          {
            interactionType: "WatchAction",
            userInteractionCount: 500000,
          },
          {
            interactionType: "LikeAction",
            userInteractionCount: 25000,
          },
        ]}
        regionsAllowed={["US", "CA", "GB", "AU", "NZ"]}
        ineligibleRegion={["CN", "RU"]}
        author={[
          "Chef Julia Martinez",
          {
            name: "Chef Paul Anderson",
            url: "https://example.com/chefs/paul-anderson",
          },
        ]}
        publisher={{
          name: "Culinary Institute Online",
          logo: "https://example.com/culinary-institute-logo.png",
          url: "https://example.com",
        }}
      />

      <main className="prose lg:prose-xl mx-auto">
        <h1>Complete Baking Masterclass: From Basics to Advanced</h1>

        <div className="aspect-w-16 aspect-h-9 mb-8">
          <iframe
            src="https://example.com/embed/baking-masterclass"
            title="Complete Baking Masterclass"
            className="w-full rounded-lg shadow-lg"
            allowFullScreen
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-2">Video Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-bold">500K+</p>
              <p className="text-gray-600">Views</p>
            </div>
            <div>
              <p className="text-3xl font-bold">25K+</p>
              <p className="text-gray-600">Likes</p>
            </div>
          </div>
        </div>

        <section>
          <h2>About This Masterclass</h2>
          <p>
            Join world-renowned chefs Julia Martinez and Paul Anderson in this
            comprehensive 2.5-hour baking masterclass. Perfect for both
            beginners and experienced bakers looking to refine their skills.
          </p>
        </section>

        <section>
          <h2>Instructors</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3>Chef Julia Martinez</h3>
              <p>Award-winning pastry chef with 20 years of experience</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3>Chef Paul Anderson</h3>
              <p>Master baker and cookbook author</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Availability</h2>
          <p>
            This video is available in: United States, Canada, United Kingdom,
            Australia, and New Zealand. The video will be available until March
            1, 2025.
          </p>
        </section>
      </main>
    </div>
  );
}
