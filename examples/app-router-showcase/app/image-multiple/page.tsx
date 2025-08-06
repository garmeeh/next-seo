import { ImageJsonLd } from "next-seo";

export default function ImageMultiplePage() {
  return (
    <div className="container mx-auto p-8">
      <ImageJsonLd
        images={[
          {
            contentUrl: "https://example.com/photos/mountain-sunrise.jpg",
            creator: "Alex Mountain",
            license: "https://example.com/license/standard",
            creditText: "Nature Photography Collection",
            copyrightNotice: "© 2024 Alex Mountain",
          },
          {
            contentUrl: "https://example.com/photos/ocean-waves.jpg",
            creator: [
              "Sarah Ocean",
              {
                name: "Coastal Studios",
                url: "https://coastalstudios.com",
              },
            ],
            license: "https://creativecommons.org/licenses/by-sa/4.0/",
            acquireLicensePage:
              "https://example.com/licensing/ocean-collection",
            creditText: "Coastal Studios & Sarah Ocean",
            copyrightNotice: "© 2024 Coastal Studios",
          },
          {
            contentUrl: "https://example.com/photos/city-lights.jpg",
            creator: {
              name: "Urban Photography Inc.",
              logo: "https://example.com/urban-photo-logo.jpg",
              sameAs: ["https://instagram.com/urbanphoto"],
            },
            license: "https://example.com/license/commercial",
            acquireLicensePage: "https://example.com/licensing/urban",
            creditText: "Urban Photography Inc.",
            copyrightNotice:
              "© 2024 Urban Photography Inc. All rights reserved.",
          },
        ]}
      />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Photography Collection Gallery
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mountain Sunrise */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://example.com/photos/mountain-sunrise.jpg"
              alt="Mountain sunrise"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">Mountain Sunrise</h3>
              <dl className="text-sm space-y-1">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Photographer:</dt>
                  <dd className="font-medium">Alex Mountain</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Credit:</dt>
                  <dd className="font-medium">Nature Photography Collection</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Copyright:</dt>
                  <dd className="font-medium">© 2024 Alex Mountain</dd>
                </div>
              </dl>
              <a
                href="https://example.com/license/standard"
                className="inline-block mt-3 text-blue-600 hover:underline text-sm"
              >
                View License
              </a>
            </div>
          </div>

          {/* Ocean Waves */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://example.com/photos/ocean-waves.jpg"
              alt="Ocean waves"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">Ocean Waves</h3>
              <dl className="text-sm space-y-1">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Creators:</dt>
                  <dd className="font-medium">Sarah Ocean & Coastal Studios</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Credit:</dt>
                  <dd className="font-medium">Coastal Studios & Sarah Ocean</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">License:</dt>
                  <dd className="font-medium">CC BY-SA 4.0</dd>
                </div>
              </dl>
              <div className="mt-3 space-x-3">
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  className="text-blue-600 hover:underline text-sm"
                >
                  License
                </a>
                <a
                  href="https://example.com/licensing/ocean-collection"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Get Commercial License
                </a>
              </div>
            </div>
          </div>

          {/* City Lights */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://example.com/photos/city-lights.jpg"
              alt="City lights"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">City Lights</h3>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src="https://example.com/urban-photo-logo.jpg"
                  alt="Urban Photography Inc."
                  className="w-8 h-8 rounded"
                />
                <span className="font-medium text-sm">
                  Urban Photography Inc.
                </span>
              </div>
              <dl className="text-sm space-y-1">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Credit:</dt>
                  <dd className="font-medium">Urban Photography Inc.</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Copyright:</dt>
                  <dd className="font-medium">© 2024 All rights reserved</dd>
                </div>
              </dl>
              <div className="mt-3 space-x-3">
                <a
                  href="https://example.com/license/commercial"
                  className="text-blue-600 hover:underline text-sm"
                >
                  License
                </a>
                <a
                  href="https://example.com/licensing/urban"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Purchase
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">About This Collection</h2>
          <p className="text-gray-700 mb-4">
            This gallery showcases various photography styles from different
            creators and studios. Each image has its own licensing terms and
            creators. Some images are available under Creative Commons licenses,
            while others require commercial licensing.
          </p>
          <p className="text-sm text-gray-600">
            To use any of these images, please review the individual license
            terms and contact the respective creators or studios for permissions
            beyond the stated licenses.
          </p>
        </div>
      </div>
    </div>
  );
}
