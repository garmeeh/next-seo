import { OrganizationJsonLd } from "next-seo";

export default function OnlineStorePage() {
  return (
    <div className="container mx-auto p-8">
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        url="https://www.example.com"
        logo={{
          "@type": "ImageObject",
          url: "https://www.example.com/assets/logo.png",
          width: 600,
          height: 400,
        }}
        description="Your trusted online retailer for premium widgets and accessories"
        sameAs={[
          "https://example.net/profile/example12",
          "https://example.org/@example34",
        ]}
        address={{
          "@type": "PostalAddress",
          streetAddress: "999 W Example St Suite 99",
          addressLocality: "New York",
          addressRegion: "NY",
          postalCode: "10019",
          addressCountry: "US",
        }}
        contactPoint={{
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+1-999-999-9900",
          email: "support@example.com",
        }}
        vatID="FR12345678901"
        iso6523Code="0199:724500PMK2A2M1SQQ228"
        numberOfEmployees={{
          minValue: 100,
          maxValue: 999,
        }}
        hasMerchantReturnPolicy={{
          "@type": "MerchantReturnPolicy",
          applicableCountry: ["US", "CA"],
          returnPolicyCountry: "US",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 60,
          itemCondition: ["https://schema.org/NewCondition"],
          returnMethod: [
            "https://schema.org/ReturnByMail",
            "https://schema.org/ReturnInStore",
          ],
          returnFees: "https://schema.org/FreeReturn",
          refundType: "https://schema.org/FullRefund",
          returnLabelSource: "https://schema.org/ReturnLabelDownloadAndPrint",
          customerRemorseReturnFees: "https://schema.org/FreeReturn",
          itemDefectReturnFees: "https://schema.org/FreeReturn",
          returnPolicySeasonalOverride: [
            {
              startDate: "2025-11-29",
              endDate: "2025-12-31",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 90,
            },
          ],
        }}
        hasMemberProgram={{
          name: "Rewards Plus",
          description:
            "Earn points and unlock exclusive benefits with our loyalty program",
          url: "https://www.example.com/rewards",
          hasTiers: [
            {
              name: "Bronze",
              hasTierBenefit: "TierBenefitLoyaltyPoints",
              membershipPointsEarned: 1,
            },
            {
              name: "Silver",
              hasTierBenefit: ["TierBenefitLoyaltyPoints"],
              hasTierRequirement: {
                value: 500,
                currency: "USD",
              },
              membershipPointsEarned: 2,
            },
            {
              name: "Gold",
              hasTierBenefit: [
                "TierBenefitLoyaltyPoints",
                "TierBenefitLoyaltyPrice",
              ],
              hasTierRequirement: {
                name: "Example Gold Credit Card",
              },
              membershipPointsEarned: 5,
              url: "https://www.example.com/rewards/gold",
            },
          ],
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Example Online Store</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            Example Online Store is your trusted online retailer for premium
            widgets and accessories. We serve customers across the United States
            and Canada with fast shipping and excellent customer service.
          </p>
        </section>

        <section className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ 60-day return window (90 days during holidays!)</li>
            <li>✓ Free returns by mail or in-store</li>
            <li>✓ Full refund guaranteed</li>
            <li>✓ Applicable in US and Canada</li>
            <li>✓ Download and print return label</li>
            <li>✓ Free returns for all reasons</li>
          </ul>
          <div className="mt-4 p-3 bg-green-100 rounded">
            <p className="text-sm font-medium text-green-800">
              🎄 Holiday Special: Extended 90-day returns from Nov 29 - Dec 31
            </p>
          </div>
        </section>

        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Rewards Plus Loyalty Program
          </h2>
          <p className="text-gray-700 mb-4">
            Earn points and unlock exclusive benefits with our loyalty program!
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-400 pl-4">
              <h3 className="font-semibold text-orange-800">🥉 Bronze Tier</h3>
              <p className="text-sm text-gray-600">
                Join free and earn 1 point per dollar spent
              </p>
            </div>
            <div className="border-l-4 border-gray-400 pl-4">
              <h3 className="font-semibold text-gray-700">🥈 Silver Tier</h3>
              <p className="text-sm text-gray-600">
                Spend $500+ to earn 2 points per dollar
              </p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-semibold text-yellow-700">🥇 Gold Tier</h3>
              <p className="text-sm text-gray-600">
                Sign up for our Gold Credit Card to earn 5 points per dollar +
                member pricing
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Customer Service</h2>
          <p className="text-gray-700">
            <strong>Phone:</strong> +1-999-999-9900
            <br />
            <strong>Email:</strong> support@example.com
            <br />
            <strong>Hours:</strong> Monday-Friday, 9AM-5PM EST
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <address className="text-gray-700 not-italic">
            999 W Example St Suite 99
            <br />
            New York, NY 10019
            <br />
            United States
          </address>
        </section>
      </div>
    </div>
  );
}
