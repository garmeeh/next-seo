import { VideoJsonLd } from "next-seo";

export default function VideoLivePage() {
  return (
    <div className="container mx-auto p-8">
      <VideoJsonLd
        name="Live Cooking Show: New Year's Eve Special"
        description="Join us for a live cooking demonstration preparing a complete New Year's Eve feast"
        thumbnailUrl="https://example.com/live-show-nye-thumbnail.jpg"
        uploadDate="2024-12-20T10:00:00+00:00"
        embedUrl="https://example.com/live/nye-special"
        interactionStatistic={{
          interactionType: "WatchAction",
          userInteractionCount: 15000,
        }}
        publication={[
          {
            name: "First Broadcast",
            isLiveBroadcast: true,
            startDate: "2024-12-31T20:00:00+00:00",
            endDate: "2024-12-31T22:00:00+00:00",
          },
          {
            name: "Encore Presentation",
            isLiveBroadcast: true,
            startDate: "2025-01-01T14:00:00+00:00",
            endDate: "2025-01-01T16:00:00+00:00",
          },
        ]}
        author="Chef Maria Rodriguez"
        publisher={{
          name: "Live Cooking Network",
          logo: "https://example.com/live-cooking-network-logo.png",
        }}
      />

      <main className="prose lg:prose-xl mx-auto">
        <h1>Live Cooking Show: New Year's Eve Special</h1>

        <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-xl font-bold text-red-600">
              LIVE BROADCAST
            </span>
          </div>
          <p className="text-lg mb-4">
            Join us for a special New Year's Eve cooking demonstration!
          </p>
          <div className="space-y-2">
            <p>
              <strong>First Broadcast:</strong> December 31, 2024 at 8:00 PM UTC
            </p>
            <p>
              <strong>Encore:</strong> January 1, 2025 at 2:00 PM UTC
            </p>
          </div>
        </div>

        <div className="aspect-w-16 aspect-h-9 mb-8">
          <div className="bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-xl text-gray-600">
              Live stream player will appear here
            </p>
          </div>
        </div>

        <section>
          <h2>About This Live Show</h2>
          <p>
            Join Chef Maria Rodriguez for an exciting live cooking demonstration
            where she'll prepare a complete New Year's Eve feast. From
            appetizers to desserts, learn how to create the perfect celebration
            menu.
          </p>
        </section>

        <section>
          <h2>What We'll Be Making</h2>
          <ul>
            <li>Champagne-poached shrimp appetizers</li>
            <li>Herb-crusted prime rib with au jus</li>
            <li>Truffle mashed potatoes</li>
            <li>Roasted winter vegetables</li>
            <li>Chocolate lava cake with gold leaf</li>
          </ul>
        </section>

        <section>
          <h2>Live Interaction</h2>
          <p>
            During the live broadcast, Chef Maria will answer your questions in
            real-time. Submit your questions through the chat and she'll address
            them throughout the show.
          </p>
        </section>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Current Viewers</h3>
          <p className="text-3xl font-bold">15,000+</p>
          <p className="text-gray-600">People watching</p>
        </div>
      </main>
    </div>
  );
}
