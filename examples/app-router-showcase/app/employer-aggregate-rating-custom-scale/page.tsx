import { EmployerAggregateRatingJsonLd } from "next-seo";

export default function EmployerAggregateRatingCustomScalePage() {
  return (
    <div className="container mx-auto p-8">
      <EmployerAggregateRatingJsonLd
        itemReviewed={{
          name: "Green Energy Corp",
          sameAs: "https://www.greenenergycorp.example.com",
        }}
        ratingValue="85%"
        reviewCount={432}
        bestRating={100}
        worstRating={0}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Green Energy Corp - Employee Satisfaction Score
        </h1>

        <section className="mb-8">
          <div className="bg-green-50 p-8 rounded-xl mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Employee Satisfaction Index
            </h2>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10b981"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.85)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">85%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">
                  Percentage-based satisfaction score
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Based on 432 employee reviews
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Scale: 0% (worst) to 100% (best)
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">
            About Our Rating System
          </h2>
          <p className="text-gray-700 mb-4">
            At Green Energy Corp, we use a percentage-based rating system where
            employees rate their overall satisfaction from 0% to 100%. This
            intuitive scale allows for more nuanced feedback compared to
            traditional star ratings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Rating Breakdown by Category
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Work-Life Balance</span>
                <span className="font-semibold">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: "88%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Compensation & Benefits</span>
                <span className="font-semibold">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Career Development</span>
                <span className="font-semibold">79%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: "79%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Company Culture</span>
                <span className="font-semibold">91%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: "91%" }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            What Makes Us Different
          </h2>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              Green Energy Corp is committed to sustainable practices not just
              in our products, but also in how we treat our employees. Our
              percentage-based rating system reflects our commitment to
              transparency and continuous improvement.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>100% renewable energy powered offices</li>
              <li>Flexible hybrid work arrangements</li>
              <li>Comprehensive sustainability training</li>
              <li>Employee equity participation program</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Be part of a company that's making a real difference in the fight
            against climate change while building a rewarding career.
          </p>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              View Careers
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
              Learn More About Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
