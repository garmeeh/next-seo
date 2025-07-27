import { CourseJsonLd } from "next-seo";

interface CourseProvider {
  name: string;
  sameAs: string;
}

interface Course {
  name: string;
  description: string;
  url?: string;
  provider: CourseProvider;
}

export default function CourseListPage() {
  const courses: Course[] = [
    {
      name: "Introduction to Computer Science and Programming",
      description: "This is an introductory CS course laying out the basics.",
      url: "https://example.com/courses#intro-to-cs",
      provider: {
        name: "University of Technology - Example",
        sameAs: "https://www.example.com",
      },
    },
    {
      name: "Intermediate Computer Science and Programming",
      description: "This CS course builds on the basics from the intro course.",
      url: "https://example.com/courses#intermediate-cs",
      provider: {
        name: "University of Technology - Example",
        sameAs: "https://www.example.com",
      },
    },
    {
      name: "Advanced Computer Science and Programming",
      description: "This CS course covers advanced programming principles.",
      url: "https://example.com/courses#advanced-cs",
      provider: {
        name: "University of Technology - Eureka",
        sameAs: "https://www.example.com",
      },
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <CourseJsonLd type="list" courses={courses} />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Computer Science Courses</h1>

        <p className="text-lg text-gray-600 mb-8">
          Explore our comprehensive computer science curriculum, from
          introductory concepts to advanced programming techniques.
        </p>

        <div className="grid gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              id={course.url?.split("#")[1]}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">
                <a
                  href={course.url}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {course.name}
                </a>
              </h2>

              <p className="text-gray-600 mb-3">{course.description}</p>

              <div className="text-sm text-gray-500">
                Offered by{" "}
                <a
                  href={course.provider.sameAs}
                  className="text-blue-600 hover:underline"
                >
                  {course.provider.name}
                </a>
              </div>

              <div className="mt-4 flex gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                  Save for Later
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">
            Why Study Computer Science?
          </h2>
          <p className="text-gray-700">
            Computer Science is at the heart of modern innovation. Our courses
            provide a solid foundation in computational thinking,
            problem-solving, and software development that will prepare you for
            a rewarding career in technology.
          </p>
        </div>
      </div>
    </div>
  );
}
