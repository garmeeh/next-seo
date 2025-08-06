import { ImageJsonLd } from "next-seo";

export default function ImagePage() {
  return (
    <div className="container mx-auto p-8">
      <ImageJsonLd
        contentUrl="https://example.com/photos/black-labrador-puppy.jpg"
        creator="Brixton Brownstone"
        license="https://example.com/license"
        acquireLicensePage="https://example.com/how-to-use-my-images"
        creditText="Labrador PhotoLab"
        copyrightNotice="Clara Kent"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Black Labrador Puppy</h1>

        <div className="mb-8">
          <img
            src="https://example.com/photos/black-labrador-puppy.jpg"
            alt="Black labrador puppy"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Image Information</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="font-medium text-gray-700">Photographer</dt>
              <dd className="text-gray-900">Brixton Brownstone</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Copyright</dt>
              <dd className="text-gray-900">Clara Kent</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Credit</dt>
              <dd className="text-gray-900">Labrador PhotoLab</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">License</dt>
              <dd>
                <a
                  href="https://example.com/license"
                  className="text-blue-600 hover:underline"
                >
                  View License
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <a
              href="https://example.com/how-to-use-my-images"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              How to Use My Images
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
