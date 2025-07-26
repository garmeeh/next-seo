import { JobPostingJsonLd } from "next-seo";

export default function AdvancedJobPostingPage() {
  return (
    <div className="container mx-auto p-8">
      <JobPostingJsonLd
        title="Senior Product Manager"
        description="<p>Google is seeking an experienced Product Manager to lead our Cloud Platform initiatives.</p><p><strong>About the role:</strong></p><ul><li>Lead product strategy for Google Cloud Platform</li><li>Work with engineering teams across multiple locations</li><li>Define roadmap and deliver innovative solutions</li></ul><p><strong>Requirements:</strong></p><ul><li>7+ years of product management experience</li><li>Experience with cloud technologies</li><li>MBA or equivalent practical experience</li></ul>"
        datePosted="2024-01-18"
        validThrough="2024-04-18T23:59:59"
        hiringOrganization={{
          name: "Google",
          sameAs: "https://www.google.com",
          logo: {
            url: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            width: 272,
            height: 92,
          },
        }}
        jobLocation={[
          {
            address: {
              streetAddress: "1600 Amphitheatre Parkway",
              addressLocality: "Mountain View",
              addressRegion: "CA",
              postalCode: "94043",
              addressCountry: "US",
            },
          },
          {
            address: {
              streetAddress: "111 8th Avenue",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10011",
              addressCountry: "US",
            },
          },
        ]}
        jobLocationType="TELECOMMUTE"
        applicantLocationRequirements={[
          { name: "California, USA" },
          { name: "New York, USA" },
          { name: "Washington, USA" },
          { name: "Texas, USA" },
        ]}
        url="https://careers.google.com/jobs/senior-product-manager-cloud"
        employmentType={["FULL_TIME", "CONTRACTOR"]}
        identifier={{
          name: "Google",
          value: "GCP-PM-2024-001",
        }}
        baseSalary={{
          currency: "USD",
          value: {
            minValue: 180000,
            maxValue: 280000,
            unitText: "YEAR",
          },
        }}
        directApply={true}
        educationRequirements={[
          {
            credentialCategory: "bachelor degree",
          },
          {
            credentialCategory: "postgraduate degree",
          },
        ]}
        experienceRequirements={{
          monthsOfExperience: 84,
        }}
        experienceInPlaceOfEducation={true}
      />

      <article className="prose lg:prose-xl">
        <h1>Senior Product Manager - Cloud Platform</h1>
        <div className="text-gray-600 mb-4">
          <p>Google • Mountain View, CA / New York, NY / Remote</p>
          <p>Posted: January 18, 2024 • Expires: April 18, 2024</p>
          <p>$180,000 - $280,000 per year</p>
          <div className="flex gap-2 mt-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              Full-time
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
              Contract Available
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              Hybrid/Remote Options
            </span>
          </div>
        </div>

        <h2>About the Role</h2>
        <p>
          Google is seeking an experienced Product Manager to lead our Cloud
          Platform initiatives. This is a unique opportunity to shape the future
          of cloud computing at scale.
        </p>

        <h2>Responsibilities</h2>
        <ul>
          <li>Lead product strategy for Google Cloud Platform services</li>
          <li>Work with engineering teams across multiple locations</li>
          <li>Define roadmap and deliver innovative solutions</li>
          <li>Collaborate with Sales, Marketing, and Partner teams</li>
          <li>Analyze market trends and competitive landscape</li>
          <li>Drive product launches and go-to-market strategies</li>
        </ul>

        <h2>Minimum Qualifications</h2>
        <ul>
          <li>
            Bachelor's degree in Computer Science, Engineering, or related field
          </li>
          <li>7+ years of product management experience</li>
          <li>Experience with cloud technologies and enterprise software</li>
          <li>Track record of launching successful products</li>
        </ul>

        <h2>Preferred Qualifications</h2>
        <ul>
          <li>MBA or Master's degree in a technical field</li>
          <li>Experience with AI/ML products</li>
          <li>Previous experience at a major cloud provider</li>
          <li>
            Strong technical background with ability to engage with engineers
          </li>
        </ul>

        <h2>Location & Work Arrangement</h2>
        <p>
          This role offers flexibility with options to work from our offices in
          Mountain View or New York, or remotely from select states (CA, NY, WA,
          TX). We support a hybrid work model with 3 days in office for those
          near our locations.
        </p>

        <h2>Compensation & Benefits</h2>
        <ul>
          <li>Base salary range: $180,000 - $280,000</li>
          <li>Equity compensation</li>
          <li>Annual bonus potential</li>
          <li>Comprehensive health coverage</li>
          <li>401(k) matching</li>
          <li>Professional development budget</li>
        </ul>

        <div className="mt-8 flex gap-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Apply Now
          </button>
          <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50">
            Save Job
          </button>
        </div>
      </article>
    </div>
  );
}
