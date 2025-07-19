import { QuizJsonLd } from "next-seo";

export default function QuizPage() {
  return (
    <div className="container mx-auto p-8">
      <QuizJsonLd
        questions={[
          {
            question: "What is the capital of France?",
            answer: "Paris",
          },
          {
            question: "What is 2 + 2?",
            answer: "4",
          },
          {
            question: "Who wrote Romeo and Juliet?",
            answer: "William Shakespeare",
          },
        ]}
      />

      <div className="prose lg:prose-xl">
        <h1>General Knowledge Quiz</h1>

        <div className="space-y-6">
          <div className="border p-4 rounded">
            <p className="font-semibold">Q: What is the capital of France?</p>
            <p className="mt-2">A: Paris</p>
          </div>

          <div className="border p-4 rounded">
            <p className="font-semibold">Q: What is 2 + 2?</p>
            <p className="mt-2">A: 4</p>
          </div>

          <div className="border p-4 rounded">
            <p className="font-semibold">Q: Who wrote Romeo and Juliet?</p>
            <p className="mt-2">A: William Shakespeare</p>
          </div>
        </div>
      </div>
    </div>
  );
}
