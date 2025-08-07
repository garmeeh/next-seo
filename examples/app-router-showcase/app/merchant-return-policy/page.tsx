import { MerchantReturnPolicyJsonLd } from "next-seo";

export default function MerchantReturnPolicyPage() {
  return (
    <div className="container mx-auto p-8">
      <MerchantReturnPolicyJsonLd
        applicableCountry={["US", "CA"]}
        returnPolicyCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={30}
        returnMethod="https://schema.org/ReturnByMail"
        returnFees="https://schema.org/FreeReturn"
        refundType="https://schema.org/FullRefund"
        returnLabelSource="https://schema.org/ReturnLabelDownloadAndPrint"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Return Policy</h1>

        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">30-Day Return Policy</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ 30-day return window from delivery date</li>
            <li>✓ Free returns by mail</li>
            <li>✓ Full refund guaranteed</li>
            <li>✓ Download and print return label</li>
            <li>✓ Applicable in US and Canada</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Return</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Log into your account and select the order</li>
            <li>Choose items to return and reason</li>
            <li>Download and print the return label</li>
            <li>Pack items securely with all original packaging</li>
            <li>Drop off at any authorized shipping location</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refund Processing</h2>
          <p className="text-gray-700">
            Once we receive your return, we'll inspect the items and process
            your refund within 3-5 business days. The refund will be credited to
            your original payment method.
          </p>
        </section>

        <section className="text-sm text-gray-600">
          <p>
            This example demonstrates a basic merchant return policy with a
            30-day return window, free returns, and full refunds.
          </p>
        </section>
      </div>
    </div>
  );
}
