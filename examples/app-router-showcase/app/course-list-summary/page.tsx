import { CourseJsonLd } from "next-seo";

export default function CourseListSummaryPage() {
  const courseUrls = [
    "https://example.com/courses/intro-programming",
    "https://example.com/courses/web-development",
    "https://example.com/courses/data-science",
    "https://example.com/courses/machine-learning",
    "https://example.com/courses/mobile-development",
  ];

  return (
    <div className="container mx-auto p-8">
      <CourseJsonLd type="list" urls={courseUrls} />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Browse Our Courses</h1>

        <p className="text-lg text-gray-600 mb-8">
          Discover a wide range of technology courses designed to advance your
          career and expand your knowledge.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="https://example.com/courses/intro-programming"
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              Introduction to Programming
            </h2>
            <p className="text-gray-600 mb-4">
              Start your coding journey with fundamental programming concepts.
            </p>
            <span className="text-blue-600 hover:text-blue-800">
              Learn more →
            </span>
          </a>

          <a
            href="https://example.com/courses/web-development"
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              Web Development Bootcamp
            </h2>
            <p className="text-gray-600 mb-4">
              Build modern web applications from scratch.
            </p>
            <span className="text-blue-600 hover:text-blue-800">
              Learn more →
            </span>
          </a>

          <a
            href="https://example.com/courses/data-science"
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              Data Science Fundamentals
            </h2>
            <p className="text-gray-600 mb-4">
              Master data analysis and visualization techniques.
            </p>
            <span className="text-blue-600 hover:text-blue-800">
              Learn more →
            </span>
          </a>

          <a
            href="https://example.com/courses/machine-learning"
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              Machine Learning & AI
            </h2>
            <p className="text-gray-600 mb-4">
              Explore artificial intelligence and ML algorithms.
            </p>
            <span className="text-blue-600 hover:text-blue-800">
              Learn more →
            </span>
          </a>

          <a
            href="https://example.com/courses/mobile-development"
            className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              Mobile App Development
            </h2>
            <p className="text-gray-600 mb-4">
              Create native and cross-platform mobile applications.
            </p>
            <span className="text-blue-600 hover:text-blue-800">
              Learn more →
            </span>
          </a>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            View All Courses
          </button>
        </div>
      </div>
    </div>
  );
}
