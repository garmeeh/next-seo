import { FAQJsonLd } from "next-seo";

export default function AdvancedFAQPage() {
  return (
    <div className="container mx-auto p-8">
      <FAQJsonLd
        questions={[
          {
            question: "What documents are required for application?",
            answer: `<p>You'll need to provide the following documents:</p>
<ul>
  <li>Valid government-issued ID</li>
  <li>High school diploma or equivalent</li>
  <li>Proof of residence</li>
  <li><a href="/forms/medical">Medical clearance form</a></li>
</ul>
<p>All documents must be submitted within 30 days of application.</p>`,
          },
          {
            question: "How do I apply for the program?",
            answer: `<p>Follow these <strong>simple steps</strong> to apply:</p>
<ol>
  <li>Create an account on our <a href="/register">registration page</a></li>
  <li>Complete the online application form</li>
  <li>Upload all required documents</li>
  <li>Submit your application and pay the processing fee</li>
  <li>Wait for confirmation email (usually within 24 hours)</li>
</ol>
<p><em>Note: Applications are processed in the order they are received.</em></p>`,
          },
          {
            question: "What financial assistance is available?",
            answer: `<p>We offer several types of financial assistance:</p>
<div>
  <h3>Scholarships</h3>
  <p>Merit-based scholarships covering up to <strong>100% of tuition</strong></p>
  
  <h3>Grants</h3>
  <p>Need-based grants ranging from <strong>$500 to $5,000</strong></p>
  
  <h3>Work-Study Programs</h3>
  <p>Part-time employment opportunities to help offset costs</p>
</div>
<p>Visit our <a href="/financial-aid">financial aid page</a> for more information.</p>`,
          },
          {
            name: "Are there any special requirements for international students?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `<p>International students must meet additional requirements:</p>
<ul>
  <li><strong>English proficiency:</strong> TOEFL score of 80+ or IELTS 6.5+</li>
  <li><strong>Visa documentation:</strong> Valid student visa (F-1 or M-1)</li>
  <li><strong>Financial proof:</strong> Bank statements showing sufficient funds</li>
  <li><strong>Health insurance:</strong> Comprehensive coverage required</li>
</ul>
<p>Contact our <a href="mailto:international@example.com">international student office</a> for assistance.</p>`,
            },
          },
        ]}
        scriptId="advanced-faq-jsonld"
        scriptKey="faq-advanced"
      />

      <div className="prose lg:prose-xl max-w-none">
        <h1>Advanced FAQ Example - Application Process</h1>
        <p className="lead">
          This page demonstrates FAQ structured data with rich HTML content
          including links, lists, and formatting.
        </p>

        <div className="mt-8 space-y-8">
          <details className="border rounded-lg p-4" open>
            <summary className="cursor-pointer font-semibold text-xl">
              What documents are required for application?
            </summary>
            <div className="mt-4">
              <p>You'll need to provide the following documents:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Valid government-issued ID</li>
                <li>High school diploma or equivalent</li>
                <li>Proof of residence</li>
                <li>
                  <a href="/forms/medical" className="text-blue-600 underline">
                    Medical clearance form
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                All documents must be submitted within 30 days of application.
              </p>
            </div>
          </details>

          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-xl">
              How do I apply for the program?
            </summary>
            <div className="mt-4">
              <p>
                Follow these <strong>simple steps</strong> to apply:
              </p>
              <ol className="list-decimal ml-6 mt-2">
                <li>
                  Create an account on our{" "}
                  <a href="/register" className="text-blue-600 underline">
                    registration page
                  </a>
                </li>
                <li>Complete the online application form</li>
                <li>Upload all required documents</li>
                <li>Submit your application and pay the processing fee</li>
                <li>Wait for confirmation email (usually within 24 hours)</li>
              </ol>
              <p className="mt-4 italic">
                Note: Applications are processed in the order they are received.
              </p>
            </div>
          </details>

          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-xl">
              What financial assistance is available?
            </summary>
            <div className="mt-4">
              <p>We offer several types of financial assistance:</p>
              <div className="mt-4">
                <h3 className="font-semibold text-lg">Scholarships</h3>
                <p>
                  Merit-based scholarships covering up to{" "}
                  <strong>100% of tuition</strong>
                </p>

                <h3 className="font-semibold text-lg mt-4">Grants</h3>
                <p>
                  Need-based grants ranging from <strong>$500 to $5,000</strong>
                </p>

                <h3 className="font-semibold text-lg mt-4">
                  Work-Study Programs
                </h3>
                <p>Part-time employment opportunities to help offset costs</p>
              </div>
              <p className="mt-4">
                Visit our{" "}
                <a href="/financial-aid" className="text-blue-600 underline">
                  financial aid page
                </a>{" "}
                for more information.
              </p>
            </div>
          </details>

          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-semibold text-xl">
              Are there any special requirements for international students?
            </summary>
            <div className="mt-4">
              <p>International students must meet additional requirements:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>
                  <strong>English proficiency:</strong> TOEFL score of 80+ or
                  IELTS 6.5+
                </li>
                <li>
                  <strong>Visa documentation:</strong> Valid student visa (F-1
                  or M-1)
                </li>
                <li>
                  <strong>Financial proof:</strong> Bank statements showing
                  sufficient funds
                </li>
                <li>
                  <strong>Health insurance:</strong> Comprehensive coverage
                  required
                </li>
              </ul>
              <p className="mt-4">
                Contact our{" "}
                <a
                  href="mailto:international@example.com"
                  className="text-blue-600 underline"
                >
                  international student office
                </a>{" "}
                for assistance.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
