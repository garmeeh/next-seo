import { CourseJsonLd } from "next-seo";

export default function CoursePage() {
  return (
    <div className="container mx-auto p-8">
      <CourseJsonLd
        name="Introduction to Computer Science and Programming"
        description="This is an introductory CS course laying out the basics."
        url="https://example.com/courses/intro-cs"
        provider={{
          name: "University of Technology - Eureka",
          sameAs: "https://www.example.com",
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Introduction to Computer Science and Programming
        </h1>

        <div className="mb-6">
          <p className="text-gray-600">
            Offered by{" "}
            <a
              href="https://www.example.com"
              className="text-blue-600 hover:underline"
            >
              University of Technology - Eureka
            </a>
          </p>
        </div>

        <div className="prose lg:prose-xl">
          <h2>Course Description</h2>
          <p>
            This is an introductory CS course laying out the basics. You'll
            learn fundamental programming concepts, algorithms, and
            problem-solving techniques that form the foundation of computer
            science.
          </p>

          <h2>What You'll Learn</h2>
          <ul>
            <li>Basic programming concepts and syntax</li>
            <li>Data structures and algorithms</li>
            <li>Problem-solving techniques</li>
            <li>Software design principles</li>
            <li>Debugging and testing methodologies</li>
          </ul>

          <h2>Prerequisites</h2>
          <p>
            No prior programming experience required. Basic mathematics
            knowledge (algebra) is helpful but not mandatory.
          </p>

          <h2>Course Format</h2>
          <p>
            This course consists of video lectures, hands-on programming
            assignments, quizzes, and a final project. Expected time commitment
            is 8-10 hours per week over 12 weeks.
          </p>
        </div>

        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
