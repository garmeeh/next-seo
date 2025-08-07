import { MerchantReturnPolicyJsonLd } from "next-seo";

export default function MerchantReturnPolicyAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <MerchantReturnPolicyJsonLd
        applicableCountry={["DE", "AT", "CH"]}
        returnPolicyCountry="IE"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={60}
        itemCondition={[
          "https://schema.org/NewCondition",
          "https://schema.org/DamagedCondition",
        ]}
        returnMethod={[
          "https://schema.org/ReturnByMail",
          "https://schema.org/ReturnInStore",
        ]}
        returnFees="https://schema.org/ReturnShippingFees"
        returnShippingFeesAmount={{
          value: 2.99,
          currency: "EUR",
        }}
        refundType={[
          "https://schema.org/FullRefund",
          "https://schema.org/ExchangeRefund",
        ]}
        restockingFee={{
          value: 10,
          currency: "EUR",
        }}
        returnLabelSource="https://schema.org/ReturnLabelInBox"
        customerRemorseReturnFees="https://schema.org/ReturnShippingFees"
        customerRemorseReturnShippingFeesAmount={{
          value: 5.99,
          currency: "EUR",
        }}
        customerRemorseReturnLabelSource="https://schema.org/ReturnLabelDownloadAndPrint"
        itemDefectReturnFees="https://schema.org/FreeReturn"
        itemDefectReturnLabelSource="https://schema.org/ReturnLabelInBox"
        returnPolicySeasonalOverride={{
          startDate: "2025-12-01",
          endDate: "2025-01-05",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Advanced Return Policy</h1>

        <section className="mb-8 bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Standard Policy (60 Days)
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ 60-day return window for most items</li>
            <li>✓ Return by mail or in-store</li>
            <li>✓ €2.99 standard return shipping fee</li>
            <li>✓ €10 restocking fee may apply</li>
            <li>✓ Available in Germany, Austria, and Switzerland</li>
            <li>✓ Returns processed in Ireland</li>
          </ul>
        </section>

        <section className="mb-8 bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Holiday Season Override
          </h2>
          <p className="font-medium mb-2">December 1 - January 5</p>
          <ul className="space-y-2 text-gray-700">
            <li>⚠️ Reduced to 30-day return window</li>
            <li>⚠️ All other conditions remain the same</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Conditions</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Customer Remorse Returns
            </h3>
            <ul className="pl-6 space-y-1 text-gray-700">
              <li>• Return shipping fee: €5.99</li>
              <li>• Download and print return label</li>
              <li>• Restocking fee applies</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Defective Item Returns
            </h3>
            <ul className="pl-6 space-y-1 text-gray-700">
              <li>• Free return shipping</li>
              <li>• Return label included in box</li>
              <li>• No restocking fee</li>
              <li>• Priority processing</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Acceptable Item Conditions
          </h2>
          <ul className="pl-6 space-y-1 text-gray-700">
            <li>• New, unopened items</li>
            <li>• Damaged or defective items</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refund Options</h2>
          <ul className="pl-6 space-y-1 text-gray-700">
            <li>• Full refund to original payment method</li>
            <li>• Exchange for same or different product</li>
          </ul>
        </section>

        <section className="text-sm text-gray-600">
          <p>
            This example demonstrates an advanced merchant return policy with
            seasonal overrides, different fees for customer remorse vs defects,
            and multiple return methods.
          </p>
        </section>
      </div>
    </div>
  );
}
