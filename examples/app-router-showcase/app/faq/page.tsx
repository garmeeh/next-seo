import { FAQJsonLd } from "next-seo";

export default function FAQPage() {
  return (
    <div className="container mx-auto p-8">
      <FAQJsonLd
        questions={[
          {
            question: "How to find an apprenticeship?",
            answer:
              "We provide an official service to search through available apprenticeships. To get started, create an account here, specify the desired region, and your preferences. You will be able to search through all officially registered open apprenticeships.",
          },
          {
            question: "Whom to contact?",
            answer:
              "You can contact the apprenticeship office through our official phone hotline above, or with the web-form below. We generally respond to written requests within 7-10 days.",
          },
          {
            question: "What are the requirements?",
            answer:
              "You must be at least 18 years old and have a high school diploma or equivalent. Additional requirements may vary depending on the specific apprenticeship program.",
          },
          {
            question: "How long does the program last?",
            answer:
              "Most apprenticeship programs last between 2-4 years, depending on the trade and level of certification sought. The exact duration will be specified for each program.",
          },
        ]}
      />

      <div className="prose lg:prose-xl">
        <h1>Frequently Asked Questions</h1>

        <div className="mt-8 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">
              How to find an apprenticeship?
            </h2>
            <p className="text-gray-700">
              We provide an official service to search through available
              apprenticeships. To get started, create an account here, specify
              the desired region, and your preferences. You will be able to
              search through all officially registered open apprenticeships.
            </p>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">Whom to contact?</h2>
            <p className="text-gray-700">
              You can contact the apprenticeship office through our official
              phone hotline above, or with the web-form below. We generally
              respond to written requests within 7-10 days.
            </p>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">
              What are the requirements?
            </h2>
            <p className="text-gray-700">
              You must be at least 18 years old and have a high school diploma
              or equivalent. Additional requirements may vary depending on the
              specific apprenticeship program.
            </p>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">
              How long does the program last?
            </h2>
            <p className="text-gray-700">
              Most apprenticeship programs last between 2-4 years, depending on
              the trade and level of certification sought. The exact duration
              will be specified for each program.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
