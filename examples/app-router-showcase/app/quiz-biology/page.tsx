import { QuizJsonLd } from "next-seo";

export default function BiologyQuizPage() {
  return (
    <div className="container mx-auto p-8">
      <QuizJsonLd
        questions={[
          {
            question: "What is the powerhouse of the cell?",
            answer: "Mitochondria",
          },
          {
            question:
              "What process do plants use to convert sunlight into energy?",
            answer: "Photosynthesis",
          },
          {
            question: "What is DNA?",
            answer:
              "Deoxyribonucleic acid - the molecule that carries genetic information",
          },
          {
            question: "What are the building blocks of proteins?",
            answer: "Amino acids",
          },
        ]}
        about="Cell Biology"
        educationalAlignment={[
          {
            type: "educationalSubject",
            name: "Biology",
          },
          {
            type: "educationalLevel",
            name: "Grade 10",
          },
        ]}
      />

      <div className="prose lg:prose-xl">
        <h1>Biology Quiz: Cell Structure and Function</h1>
        <p className="text-lg">Subject: Biology | Level: Grade 10</p>

        <div className="space-y-6 mt-8">
          <div className="border p-4 rounded bg-green-50">
            <p className="font-semibold">
              Q: What is the powerhouse of the cell?
            </p>
            <p className="mt-2 text-green-700">A: Mitochondria</p>
          </div>

          <div className="border p-4 rounded bg-green-50">
            <p className="font-semibold">
              Q: What process do plants use to convert sunlight into energy?
            </p>
            <p className="mt-2 text-green-700">A: Photosynthesis</p>
          </div>

          <div className="border p-4 rounded bg-green-50">
            <p className="font-semibold">Q: What is DNA?</p>
            <p className="mt-2 text-green-700">
              A: Deoxyribonucleic acid - the molecule that carries genetic
              information
            </p>
          </div>

          <div className="border p-4 rounded bg-green-50">
            <p className="font-semibold">
              Q: What are the building blocks of proteins?
            </p>
            <p className="mt-2 text-green-700">A: Amino acids</p>
          </div>
        </div>
      </div>
    </div>
  );
}
