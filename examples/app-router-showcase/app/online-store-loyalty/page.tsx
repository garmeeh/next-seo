import { OrganizationJsonLd } from "next-seo";

export default function OnlineStoreLoyaltyPage() {
  return (
    <div className="container mx-auto p-8">
      <OrganizationJsonLd
        type="OnlineStore"
        name="Premium Store"
        url="https://www.premiumstore.com"
        logo="https://www.premiumstore.com/logo.png"
        description="Premium retailer with comprehensive loyalty programs"
        sameAs={["https://twitter.com/premiumstore"]}
        address={{
          streetAddress: "123 Premium Ave",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94102",
          addressCountry: "US",
        }}
        hasMemberProgram={[
          {
            name: "Basic Rewards",
            description: "Our standard loyalty program for all customers",
            url: "https://www.premiumstore.com/basic-rewards",
            hasTiers: [
              {
                name: "Free Member",
                hasTierBenefit: "TierBenefitLoyaltyPoints",
                membershipPointsEarned: 1,
              },
              {
                name: "Plus Member",
                hasTierBenefit: ["TierBenefitLoyaltyPoints"],
                hasTierRequirement: {
                  price: 4.99,
                  priceCurrency: "USD",
                  billingDuration: 12,
                  billingIncrement: 1,
                  unitCode: "MON",
                },
                membershipPointsEarned: 3,
                url: "https://www.premiumstore.com/plus-member",
              },
            ],
          },
          {
            name: "VIP Elite Program",
            description: "Exclusive program for our most valued customers",
            url: "https://www.premiumstore.com/vip-elite",
            hasTiers: [
              {
                "@id": "#vip-silver",
                name: "Silver VIP",
                hasTierBenefit: [
                  "TierBenefitLoyaltyPoints",
                  "TierBenefitLoyaltyPrice",
                ],
                hasTierRequirement: {
                  value: 2500,
                  currency: "USD",
                },
                membershipPointsEarned: {
                  value: 10,
                  unitText: "points per dollar",
                },
                url: "https://www.premiumstore.com/vip-silver",
              },
              {
                "@id": "#vip-gold",
                name: "Gold VIP",
                hasTierBenefit: [
                  "https://schema.org/TierBenefitLoyaltyPoints",
                  "https://schema.org/TierBenefitLoyaltyPrice",
                ],
                hasTierRequirement: {
                  name: "Premium Store Platinum Card",
                },
                membershipPointsEarned: {
                  value: 20,
                  minValue: 20,
                  maxValue: 40,
                  unitText: "points per dollar (double on special events)",
                },
                url: "https://www.premiumstore.com/vip-gold",
              },
              {
                "@id": "#vip-diamond",
                name: "Diamond VIP",
                hasTierBenefit: [
                  "https://schema.org/TierBenefitLoyaltyPoints",
                  "https://schema.org/TierBenefitLoyaltyPrice",
                ],
                hasTierRequirement:
                  "By invitation only - must maintain $10,000+ annual spending and participate in community events",
                membershipPointsEarned: 50,
                url: "https://www.premiumstore.com/vip-diamond",
              },
            ],
          },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Premium Store - Loyalty Programs
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to Premium Store
          </h2>
          <p className="text-gray-700 mb-4">
            We offer multiple loyalty programs designed to reward our valued
            customers. Choose the program that best fits your shopping habits!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6">Our Loyalty Programs</h2>

          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">
              Basic Rewards
            </h3>
            <p className="text-gray-700 mb-4">
              Perfect for casual shoppers who want to earn points on every
              purchase.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold text-lg mb-2">🆓 Free Member</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ No membership fee</li>
                  <li>✓ Earn 1 point per dollar spent</li>
                  <li>✓ Birthday bonus points</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold text-lg mb-2">➕ Plus Member</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ $4.99/month subscription</li>
                  <li>✓ Earn 3 points per dollar spent</li>
                  <li>✓ Free shipping on all orders</li>
                  <li>✓ Early access to sales</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">
              VIP Elite Program
            </h3>
            <p className="text-gray-700 mb-4">
              Exclusive benefits for our most loyal customers with tiered
              rewards.
            </p>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold text-lg mb-2">🥈 Silver VIP</h4>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Requirement: $2,500+ annual spending
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ 10 points per dollar spent</li>
                  <li>✓ Member-only pricing</li>
                  <li>✓ Dedicated customer service line</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold text-lg mb-2">🥇 Gold VIP</h4>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Requirement: Premium Store Platinum Card holder
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ 20-40 points per dollar (double on special events)</li>
                  <li>✓ Exclusive member pricing</li>
                  <li>✓ Personal shopping assistant</li>
                  <li>✓ VIP event invitations</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded shadow">
                <h4 className="font-semibold text-lg mb-2">💎 Diamond VIP</h4>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Requirement: By invitation only
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ 50 points per dollar spent</li>
                  <li>✓ Best possible pricing</li>
                  <li>✓ White glove service</li>
                  <li>✓ Exclusive product launches</li>
                  <li>✓ Annual appreciation gifts</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2 italic">
                  Must maintain $10,000+ annual spending and participate in
                  community events
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">How Points Work</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Earning Points</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Shop in-store or online</li>
                <li>• Write product reviews</li>
                <li>• Refer friends</li>
                <li>• Special promotions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Redeeming Points</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 100 points = $1 off</li>
                <li>• Exclusive products</li>
                <li>• Gift cards</li>
                <li>• Charitable donations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Today!</h2>
          <p className="text-gray-700 mb-4">
            Start earning rewards with your next purchase.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Sign Up for Rewards
          </button>
        </section>
      </div>
    </div>
  );
}
