import { EmployerAggregateRatingJsonLd } from "next-seo";

export default function EmployerAggregateRatingPage() {
  return (
    <div className="container mx-auto p-8">
      <EmployerAggregateRatingJsonLd
        itemReviewed="World's Best Coffee Shop"
        ratingValue={91}
        ratingCount={10561}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          World's Best Coffee Shop - Employer Ratings
        </h1>

        <section className="mb-8">
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Overall Rating</h2>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-blue-600">91</div>
              <div>
                <p className="text-gray-600">out of 100</p>
                <p className="text-sm text-gray-500">
                  Based on 10,561 employee ratings
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">About This Company</h2>
          <p className="text-gray-700 mb-4">
            World's Best Coffee Shop is known for its exceptional work culture
            and employee satisfaction. Our baristas and staff consistently rate
            us as one of the top employers in the food service industry.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            What Employees Are Saying
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="italic text-gray-700">
                "Amazing workplace culture with great benefits and growth
                opportunities!"
              </p>
              <p className="text-sm text-gray-500 mt-2">- Current Employee</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="italic text-gray-700">
                "Management truly cares about work-life balance and employee
                wellbeing."
              </p>
              <p className="text-sm text-gray-500 mt-2">- Former Employee</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Join Our Growing Team</h2>
          <p className="text-gray-700 mb-4">
            We're always looking for passionate individuals to join our team.
            Check out our current openings and become part of the World's Best
            Coffee Shop family!
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            View Open Positions
          </button>
        </section>
      </div>
    </div>
  );
}
