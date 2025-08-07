import { MerchantReturnPolicyJsonLd } from "next-seo";

export default function MerchantReturnPolicyLinkPage() {
  return (
    <div className="container mx-auto p-8">
      <MerchantReturnPolicyJsonLd merchantReturnLink="https://www.example.com/returns" />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Return Policy (Link Only)</h1>

        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Return Policy</h2>
          <p className="text-gray-700 mb-4">
            We maintain a comprehensive return policy to ensure customer
            satisfaction. For complete details about our return process,
            conditions, and procedures, please visit our dedicated returns page.
          </p>
          <a
            href="https://www.example.com/returns"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Full Return Policy →
          </a>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Overview</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Hassle-free returns</li>
            <li>✓ Multiple return options</li>
            <li>✓ Clear refund process</li>
            <li>✓ Customer support available</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-700">
            If you have questions about returns or need assistance with a
            return, our customer service team is here to help. Contact us at{" "}
            <a
              href="mailto:returns@example.com"
              className="text-blue-600 hover:underline"
            >
              returns@example.com
            </a>{" "}
            or call 1-800-RETURNS.
          </p>
        </section>

        <section className="text-sm text-gray-600">
          <p>
            This example demonstrates the simple "Option B" approach where you
            only provide a link to your return policy page instead of detailed
            structured data. This is useful when your return policy is complex
            or frequently updated.
          </p>
        </section>
      </div>
    </div>
  );
}
