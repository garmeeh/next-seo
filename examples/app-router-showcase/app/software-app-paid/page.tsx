import { SoftwareApplicationJsonLd } from "next-seo";

export default function SoftwareAppPaidPage() {
  return (
    <div className="container mx-auto p-8">
      <SoftwareApplicationJsonLd
        type="DesignApplication"
        name="Studio Pro - Advanced Photo Editor"
        description="Professional-grade photo editing software with AI-powered tools"
        url="https://example.com/studio-pro"
        image={{
          url: "https://example.com/studio-pro-icon.png",
          width: 512,
          height: 512,
        }}
        applicationCategory="DesignApplication"
        applicationSubCategory="PhotoEditing"
        applicationSuite="Creative Studio Suite"
        operatingSystem="Windows 11, macOS 12.0+"
        memoryRequirements="8GB RAM minimum, 16GB recommended"
        processorRequirements="Intel Core i5 or AMD Ryzen 5 or better"
        storageRequirements="4GB available space"
        offers={{
          price: 79.99,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          validFrom: "2024-01-01",
        }}
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 3450,
          reviewCount: 2890,
          bestRating: 5,
          worstRating: 1,
        }}
        review={[
          {
            author: "Sarah Johnson",
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            reviewBody:
              "Best photo editing software I've ever used. The AI features save me hours of work!",
            datePublished: "2024-10-15",
          },
          {
            author: {
              name: "Mike Chen",
              url: "https://example.com/users/mikechen",
            },
            reviewRating: {
              ratingValue: 4,
            },
            reviewBody:
              "Great features, but takes some time to learn. Worth the investment for professionals.",
            datePublished: "2024-09-22",
          },
        ]}
        screenshot={[
          {
            url: "https://example.com/screenshots/studio-pro-main.jpg",
            caption: "Main editing interface",
          },
          {
            url: "https://example.com/screenshots/studio-pro-ai-tools.jpg",
            caption: "AI-powered enhancement tools",
          },
          {
            url: "https://example.com/screenshots/studio-pro-filters.jpg",
            caption: "Professional filter library",
          },
        ]}
        featureList={[
          "AI-powered background removal",
          "Advanced color grading tools",
          "Non-destructive editing",
          "RAW file processing",
          "Batch processing",
          "Cloud sync and backup",
          "Plugin ecosystem",
          "4K and 8K support",
        ]}
        softwareVersion="2024.2.3"
        releaseNotes="New AI upscaling feature, improved performance, bug fixes"
        datePublished="2021-03-15"
        dateModified="2024-11-15"
        author={{
          name: "Creative Software Labs",
          url: "https://creativesoftwarelabs.com",
        }}
        publisher={{
          name: "Creative Software Labs",
          url: "https://creativesoftwarelabs.com",
          logo: {
            url: "https://creativesoftwarelabs.com/logo.png",
            width: 600,
            height: 60,
          },
        }}
        downloadUrl="https://example.com/downloads/studio-pro-installer"
        countriesSupported={["US", "CA", "GB", "AU", "NZ", "IE"]}
      />

      <div className="max-w-4xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Studio Pro</h1>
            <p className="text-xl text-gray-600">Advanced Photo Editor</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">$79.99</div>
            <div className="text-sm text-gray-500">One-time purchase</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Professional Photo Editing Made Simple
          </h2>
          <p className="mb-6">
            Transform your photos with AI-powered tools and professional-grade
            features. Join over 100,000 creative professionals who trust Studio
            Pro.
          </p>
          <div className="flex items-center space-x-4">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Buy Now - $79.99
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition">
              Free Trial (30 days)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
            <div className="text-3xl font-bold mb-1">4.8/5</div>
            <div className="text-gray-600">3,450 ratings</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-blue-600 text-2xl mb-2">💾</div>
            <div className="text-3xl font-bold mb-1">4GB</div>
            <div className="text-gray-600">Storage required</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-green-600 text-2xl mb-2">✓</div>
            <div className="text-3xl font-bold mb-1">30-day</div>
            <div className="text-gray-600">Free trial</div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">AI-Powered Tools</h3>
              <p className="text-gray-700">
                Automatic background removal, object selection, and image
                enhancement powered by advanced machine learning.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Professional Workflows</h3>
              <p className="text-gray-700">
                Non-destructive editing, layer management, and batch processing
                for efficient professional workflows.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">RAW Processing</h3>
              <p className="text-gray-700">
                Full support for RAW files from all major camera manufacturers
                with advanced color grading tools.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Cloud Integration</h3>
              <p className="text-gray-700">
                Seamless cloud sync and backup, work on your projects from any
                device with Studio Pro installed.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Minimum Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Windows 11 or macOS 12.0+</li>
                  <li>Intel Core i5 or AMD Ryzen 5</li>
                  <li>8GB RAM</li>
                  <li>4GB available storage</li>
                  <li>OpenGL 3.3 compatible graphics</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Recommended</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Latest OS version</li>
                  <li>Intel Core i7 or AMD Ryzen 7</li>
                  <li>16GB RAM or more</li>
                  <li>SSD with 10GB+ available</li>
                  <li>Dedicated GPU with 4GB VRAM</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="ml-2 font-semibold">Sarah Johnson</span>
                <span className="ml-auto text-gray-500 text-sm">
                  October 15, 2024
                </span>
              </div>
              <p className="text-gray-700">
                Best photo editing software I've ever used. The AI features save
                me hours of work!
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★★★★☆</span>
                <span className="ml-2 font-semibold">Mike Chen</span>
                <span className="ml-auto text-gray-500 text-sm">
                  September 22, 2024
                </span>
              </div>
              <p className="text-gray-700">
                Great features, but takes some time to learn. Worth the
                investment for professionals.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
