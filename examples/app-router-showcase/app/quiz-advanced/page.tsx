import { QuizJsonLd } from "next-seo";

export default function AdvancedQuizPage() {
  return (
    <div className="container mx-auto p-8">
      <QuizJsonLd
        questions={[
          // String format - simple flashcard
          "The Earth revolves around the Sun in approximately 365.25 days",
          // Question/answer format
          {
            question: "What is the chemical formula for water?",
            answer: "H2O",
          },
          // Text/acceptedAnswer with string
          {
            text: "What causes tides on Earth?",
            acceptedAnswer: "The gravitational pull of the Moon and Sun",
          },
          // Text/acceptedAnswer with Answer object
          {
            text: "Explain the greenhouse effect",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The greenhouse effect is a natural process where certain gases in Earth's atmosphere trap heat from the sun, warming the planet's surface",
            },
          },
        ]}
        about={{
          name: "Earth and Space Science",
          description:
            "Fundamental concepts about Earth, space, and environmental systems",
          url: "https://example.com/earth-science",
        }}
        educationalAlignment={[
          {
            type: "educationalSubject",
            name: "Earth Science",
          },
          {
            type: "educationalLevel",
            name: "High School",
          },
        ]}
        scriptId="advanced-quiz"
        scriptKey="earth-science-quiz"
      />

      <div className="prose lg:prose-xl max-w-4xl">
        <h1>Earth and Space Science Quiz</h1>
        <p className="text-lg text-gray-600">
          Advanced flashcard quiz demonstrating all QuizJsonLd features
        </p>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p>
            <strong>Subject:</strong> Earth Science
          </p>
          <p>
            <strong>Level:</strong> High School
          </p>
          <p>
            <strong>Topic:</strong> Fundamental concepts about Earth, space, and
            environmental systems
          </p>
        </div>

        <h2 className="mt-8">Flashcards</h2>

        <div className="space-y-6">
          <div className="border-2 border-blue-200 rounded-lg overflow-hidden">
            <div className="bg-blue-100 p-4">
              <p className="font-semibold">Fact Card</p>
            </div>
            <div className="p-4">
              <p>
                The Earth revolves around the Sun in approximately 365.25 days
              </p>
            </div>
          </div>

          <div className="border-2 border-green-200 rounded-lg overflow-hidden">
            <div className="bg-green-100 p-4">
              <p className="font-semibold">
                Q: What is the chemical formula for water?
              </p>
            </div>
            <div className="p-4 bg-green-50">
              <p className="text-green-700">A: H2O</p>
            </div>
          </div>

          <div className="border-2 border-purple-200 rounded-lg overflow-hidden">
            <div className="bg-purple-100 p-4">
              <p className="font-semibold">Q: What causes tides on Earth?</p>
            </div>
            <div className="p-4 bg-purple-50">
              <p className="text-purple-700">
                A: The gravitational pull of the Moon and Sun
              </p>
            </div>
          </div>

          <div className="border-2 border-orange-200 rounded-lg overflow-hidden">
            <div className="bg-orange-100 p-4">
              <p className="font-semibold">Q: Explain the greenhouse effect</p>
            </div>
            <div className="p-4 bg-orange-50">
              <p className="text-orange-700">
                A: The greenhouse effect is a natural process where certain
                gases in Earth's atmosphere trap heat from the sun, warming the
                planet's surface
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">
            This page demonstrates all features of the QuizJsonLd component
            including: multiple question formats, about property with full Thing
            object, educational alignment for subject and level, and custom
            script IDs.
          </p>
        </div>
      </div>
    </div>
  );
}
