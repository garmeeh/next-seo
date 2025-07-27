import { SoftwareApplicationJsonLd } from "next-seo";

export default function VideoGamePage() {
  return (
    <div className="container mx-auto p-8">
      <SoftwareApplicationJsonLd
        type={["VideoGame", "MobileApplication"]}
        name="Dragon Quest Legends"
        description="Epic RPG adventure with stunning graphics, immersive storyline, and multiplayer battles"
        url="https://example.com/dragon-quest-legends"
        image={[
          {
            url: "https://example.com/dragon-quest-icon-1x1.jpg",
            width: 1024,
            height: 1024,
          },
          {
            url: "https://example.com/dragon-quest-banner-16x9.jpg",
            width: 1920,
            height: 1080,
          },
        ]}
        applicationCategory="GameApplication"
        applicationSubCategory="RolePlaying"
        operatingSystem="iOS 14.0+, Android 9.0+, Nintendo Switch"
        memoryRequirements="3GB RAM minimum"
        storageRequirements="4.5GB"
        offers={{
          price: 19.99,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }}
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 45000,
          reviewCount: 35000,
          bestRating: 5,
        }}
        review={[
          {
            author: "GamePro Magazine",
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            reviewBody:
              "A masterpiece of mobile gaming. Dragon Quest Legends sets a new standard for RPGs on mobile platforms.",
            datePublished: "2024-10-15",
          },
          {
            author: "Jessica Chen",
            reviewRating: { ratingValue: 4 },
            reviewBody:
              "Amazing graphics and gameplay! The story is captivating, though the game requires a constant internet connection.",
            datePublished: "2024-11-01",
          },
        ]}
        screenshot={[
          {
            url: "https://example.com/screenshots/dragon-quest-combat.jpg",
            caption: "Epic real-time combat system",
          },
          {
            url: "https://example.com/screenshots/dragon-quest-world.jpg",
            caption: "Vast open world to explore",
          },
          {
            url: "https://example.com/screenshots/dragon-quest-multiplayer.jpg",
            caption: "Multiplayer raid battles",
          },
          {
            url: "https://example.com/screenshots/dragon-quest-character.jpg",
            caption: "Deep character customization",
          },
        ]}
        featureList={[
          "50+ hours of main storyline",
          "Real-time combat system",
          "Multiplayer raids and PvP battles",
          "300+ unique monsters to collect",
          "Character customization with 1000+ items",
          "Weekly events and updates",
          "Cross-platform play",
          "Cloud save synchronization",
          "Controller support",
        ]}
        softwareVersion="2.4.1"
        releaseNotes="New winter event, balance adjustments, bug fixes"
        datePublished="2023-03-15"
        dateModified="2024-12-01"
        author={{
          name: "Legendary Games Studio",
          url: "https://legendarygames.com",
        }}
        publisher={{
          name: "Epic Entertainment Corp.",
          url: "https://epicentertainment.com",
          logo: {
            url: "https://epicentertainment.com/logo.png",
            width: 600,
            height: 60,
          },
        }}
        downloadUrl="https://apps.apple.com/app/dragon-quest-legends/id9876543210"
        installUrl="https://play.google.com/store/apps/details?id=com.epicent.dragonquest"
        permissions={[
          "Internet access (for multiplayer)",
          "Storage (for game data)",
          "Notifications (for events)",
        ]}
        countriesSupported={[
          "US",
          "CA",
          "GB",
          "AU",
          "NZ",
          "JP",
          "KR",
          "TW",
          "HK",
          "SG",
          "MY",
          "TH",
          "PH",
          "ID",
          "VN",
          "DE",
          "FR",
          "ES",
          "IT",
          "NL",
          "SE",
          "NO",
          "DK",
          "FI",
          "BR",
          "MX",
          "AR",
        ]}
      />

      <div className="max-w-4xl">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-10"></div>
          <div className="relative p-8">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl">
                <span className="text-white text-4xl font-bold">DQ</span>
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">
                  Dragon Quest Legends
                </h1>
                <p className="text-xl text-gray-600">
                  The ultimate mobile RPG experience
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                RPG
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                Multiplayer
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                Adventure
              </div>
              <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">
                4+ Age Rating
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Available Now</h2>
              <p className="text-xl opacity-90">
                Join millions of players worldwide!
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">$19.99</div>
              <div className="text-sm opacity-75">One-time purchase</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
              </svg>
              Google Play
            </a>
            <a
              href="#"
              className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              <span className="mr-2">🎮</span>
              Nintendo eShop
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
            <div className="text-3xl font-bold">4.8/5</div>
            <div className="text-gray-600">45K ratings</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-purple-600 text-3xl font-bold mb-2">10M+</div>
            <div className="text-gray-600">Downloads</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-green-600 text-3xl font-bold mb-2">#1</div>
            <div className="text-gray-600">RPG Game</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-blue-600 text-3xl font-bold mb-2">4.5GB</div>
            <div className="text-gray-600">Install size</div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Game Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">⚔️</span>
                Epic Storyline
              </h3>
              <p className="text-gray-700">
                Embark on a 50+ hour journey through a beautifully crafted
                fantasy world. Make choices that shape your destiny and uncover
                the secrets of the ancient dragons.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">🎮</span>
                Real-Time Combat
              </h3>
              <p className="text-gray-700">
                Master our innovative real-time combat system with combo
                attacks, skill chains, and strategic positioning. No turn-based
                waiting!
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">👥</span>
                Multiplayer Adventures
              </h3>
              <p className="text-gray-700">
                Team up with friends for epic raid battles, compete in PvP
                tournaments, or trade rare items in the global marketplace.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">🐉</span>
                Monster Collection
              </h3>
              <p className="text-gray-700">
                Capture and train over 300 unique monsters, each with their own
                abilities and evolution paths. Build the ultimate team!
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Screenshots</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center shadow-lg">
              <span className="text-gray-500">Combat System</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center shadow-lg">
              <span className="text-gray-500">Open World</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center shadow-lg">
              <span className="text-gray-500">Multiplayer Raid</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center shadow-lg">
              <span className="text-gray-500">Character Customization</span>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">📱</span>
                iOS
              </h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• iOS 14.0 or later</li>
                <li>• iPhone 8 or newer</li>
                <li>• 3GB RAM minimum</li>
                <li>• 4.5GB storage</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">🤖</span>
                Android
              </h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Android 9.0 or higher</li>
                <li>• 3GB RAM minimum</li>
                <li>• Snapdragon 665 or better</li>
                <li>• 4.5GB storage</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <span className="text-2xl mr-2">🎮</span>
                Nintendo Switch
              </h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• All Switch models</li>
                <li>• 5GB storage</li>
                <li>• Internet for multiplayer</li>
                <li>• Nintendo Online subscription</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-semibold text-lg">
                    GamePro Magazine
                  </span>
                  <span className="ml-2 text-yellow-400">★★★★★</span>
                </div>
                <span className="text-gray-500 text-sm">October 15, 2024</span>
              </div>
              <p className="text-gray-700">
                "A masterpiece of mobile gaming. Dragon Quest Legends sets a new
                standard for RPGs on mobile platforms."
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-semibold text-lg">Jessica Chen</span>
                  <span className="ml-2 text-yellow-400">★★★★☆</span>
                </div>
                <span className="text-gray-500 text-sm">November 1, 2024</span>
              </div>
              <p className="text-gray-700">
                "Amazing graphics and gameplay! The story is captivating, though
                the game requires a constant internet connection."
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Adventure?</h2>
            <p className="text-gray-700 mb-6">
              Join the Dragon Quest Legends community and start your epic
              journey today!
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition">
              Download Now - $19.99
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
