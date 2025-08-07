import { CarouselJsonLd } from "next-seo";

export default function CarouselCoursePage() {
  return (
    <div className="container mx-auto p-8">
      <CarouselJsonLd
        contentType="Course"
        items={[
          {
            name: "Introduction to Web Development",
            description:
              "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites",
            url: "https://example.com/courses/web-development-intro",
            provider: "Tech Academy Online",
          },
          {
            name: "React.js Masterclass",
            description:
              "Master React.js from basics to advanced concepts including hooks, context, and performance optimization",
            url: "https://example.com/courses/react-masterclass",
            provider: {
              name: "Code School Pro",
              url: "https://example.com/school",
            },
          },
          {
            name: "Advanced TypeScript",
            description:
              "Deep dive into TypeScript's type system, generics, and advanced patterns",
            provider: {
              name: "Developer Institute",
              sameAs: ["https://twitter.com/devinstitute"],
            },
          },
          {
            name: "Full-Stack Development with Next.js",
            description:
              "Build production-ready full-stack applications with Next.js, TypeScript, and Tailwind CSS",
            url: "https://example.com/courses/nextjs-fullstack",
            provider: "Modern Web Academy",
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">Course Carousel Example</h1>

      <div className="prose lg:prose-xl">
        <p>
          Explore our top-rated web development courses designed to take your
          skills to the next level.
        </p>

        <h2>Featured Courses</h2>

        <div className="grid gap-6 mt-6">
          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold">
              Introduction to Web Development
            </h3>
            <p className="text-gray-600 mt-2">
              Learn the fundamentals of HTML, CSS, and JavaScript to build
              modern websites
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Provider: Tech Academy Online
            </p>
            <a
              href="https://example.com/courses/web-development-intro"
              className="text-blue-600 mt-4 inline-block"
            >
              Enroll Now →
            </a>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold">React.js Masterclass</h3>
            <p className="text-gray-600 mt-2">
              Master React.js from basics to advanced concepts including hooks,
              context, and performance optimization
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Provider: Code School Pro
            </p>
            <a
              href="https://example.com/courses/react-masterclass"
              className="text-blue-600 mt-4 inline-block"
            >
              Enroll Now →
            </a>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold">Advanced TypeScript</h3>
            <p className="text-gray-600 mt-2">
              Deep dive into TypeScript's type system, generics, and advanced
              patterns
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Provider: Developer Institute
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
              Coming Soon
            </button>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold">
              Full-Stack Development with Next.js
            </h3>
            <p className="text-gray-600 mt-2">
              Build production-ready full-stack applications with Next.js,
              TypeScript, and Tailwind CSS
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Provider: Modern Web Academy
            </p>
            <a
              href="https://example.com/courses/nextjs-fullstack"
              className="text-blue-600 mt-4 inline-block"
            >
              Enroll Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
