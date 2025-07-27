import { SoftwareApplicationJsonLd } from "next-seo";

export default function SoftwareAppPage() {
  return (
    <div className="container mx-auto p-8">
      <SoftwareApplicationJsonLd
        name="Task Master Pro"
        description="A powerful task management app to boost your productivity"
        applicationCategory="ProductivityApplication"
        operatingSystem="Windows 10+, macOS 10.15+, Ubuntu 20.04+"
        offers={{
          price: 0,
          priceCurrency: "USD",
        }}
        aggregateRating={{
          ratingValue: 4.5,
          ratingCount: 1250,
          reviewCount: 980,
        }}
        screenshot={[
          "https://example.com/screenshots/dashboard.jpg",
          "https://example.com/screenshots/task-list.jpg",
          "https://example.com/screenshots/calendar-view.jpg",
        ]}
        featureList={[
          "Intuitive task organization",
          "Calendar integration",
          "Team collaboration",
          "Progress tracking",
          "Mobile sync",
        ]}
        softwareVersion="3.2.1"
        datePublished="2022-06-15"
        dateModified="2024-11-28"
        author="Productivity Labs Inc."
        publisher={{
          name: "Productivity Labs Inc.",
          url: "https://productivitylabs.com",
        }}
      />

      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Task Master Pro</h1>
        <p className="text-xl text-gray-600 mb-6">
          A powerful task management app to boost your productivity
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Free Forever</h2>
              <p className="text-gray-600">No credit card required</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Download Now
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">★★★★☆</span>
              <span className="ml-2 text-gray-600">4.5/5 (1,250 ratings)</span>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Intuitive task organization with drag-and-drop</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Seamless calendar integration</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Real-time team collaboration</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Advanced progress tracking and analytics</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Sync across all your devices</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Supported Operating Systems:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Windows 10 or later</li>
              <li>macOS 10.15 (Catalina) or later</li>
              <li>Ubuntu 20.04 LTS or later</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Dashboard View</span>
            </div>
            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Task List</span>
            </div>
            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Calendar View</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">About the Developer</h2>
          <p className="text-gray-700">
            Productivity Labs Inc. is dedicated to creating tools that help
            individuals and teams work more efficiently. With over 10 years of
            experience in productivity software, we understand what it takes to
            build tools that people love to use every day.
          </p>
        </section>
      </div>
    </div>
  );
}
