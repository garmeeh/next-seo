import { ImageJsonLd } from "next-seo";

export default function ImageAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <ImageJsonLd
        contentUrl="https://example.com/photos/sunset-landscape.jpg"
        creator={{
          name: "PhotoLab Studios",
          logo: "https://example.com/photolab-logo.jpg",
          sameAs: [
            "https://twitter.com/photolab",
            "https://instagram.com/photolab",
            "https://facebook.com/photolab",
          ],
          address: {
            streetAddress: "123 Photography Lane",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94105",
            addressCountry: "US",
          },
        }}
        license="https://creativecommons.org/licenses/by-nc/4.0/"
        acquireLicensePage="https://example.com/licensing/premium"
        creditText="PhotoLab Studios - Professional Photography"
        copyrightNotice="© 2024 PhotoLab Studios. All rights reserved."
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Sunset Landscape - Premium Photography
        </h1>

        <div className="mb-8">
          <img
            src="https://example.com/photos/sunset-landscape.jpg"
            alt="Beautiful sunset landscape"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Studio Information</h2>
          <div className="flex items-start space-x-4 mb-4">
            <img
              src="https://example.com/photolab-logo.jpg"
              alt="PhotoLab Studios"
              className="w-16 h-16 rounded"
            />
            <div>
              <h3 className="font-semibold">PhotoLab Studios</h3>
              <p className="text-gray-600">
                Professional Photography Since 2010
              </p>
              <p className="text-sm text-gray-500">
                123 Photography Lane, San Francisco, CA 94105
              </p>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <a
              href="https://twitter.com/photolab"
              className="text-blue-400 hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/photolab"
              className="text-pink-600 hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/photolab"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Licensing Information</h2>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">License Type</h3>
            <p className="text-gray-900">Creative Commons BY-NC 4.0</p>
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              className="text-blue-600 hover:underline text-sm"
            >
              View full license terms
            </a>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Copyright</h3>
            <p className="text-gray-900">
              © 2024 PhotoLab Studios. All rights reserved.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Credit Line</h3>
            <p className="text-gray-900">
              PhotoLab Studios - Professional Photography
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href="https://example.com/licensing/premium"
              className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              License This Image for Commercial Use
            </a>
            <p className="text-sm text-gray-600 text-center">
              Need a different license? Contact us for custom licensing options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
