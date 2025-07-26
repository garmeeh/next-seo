import { JobPostingJsonLd } from "next-seo";

export default function JobPostingPage() {
  return (
    <div className="container mx-auto p-8">
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>We are looking for a passionate Software Engineer to design, develop and install software solutions.</p><p>The successful candidate will be able to build high-quality, innovative and fully performing software in compliance with coding standards and technical design.</p>"
        datePosted="2024-01-18"
        hiringOrganization="Tech Solutions Inc."
        jobLocation="San Francisco, CA"
        validThrough="2024-03-18T00:00"
        employmentType="FULL_TIME"
        baseSalary={{
          currency: "USD",
          value: {
            minValue: 90000,
            maxValue: 120000,
            unitText: "YEAR",
          },
        }}
      />

      <article className="prose lg:prose-xl">
        <h1>Software Engineer</h1>
        <div className="text-gray-600 mb-4">
          <p>Tech Solutions Inc. • San Francisco, CA</p>
          <p>Posted: January 18, 2024 • Expires: March 18, 2024</p>
          <p>$90,000 - $120,000 per year</p>
        </div>

        <h2>Job Description</h2>
        <p>
          We are looking for a passionate Software Engineer to design, develop
          and install software solutions. The successful candidate will be able
          to build high-quality, innovative and fully performing software in
          compliance with coding standards and technical design.
        </p>

        <h2>Responsibilities</h2>
        <ul>
          <li>Execute full software development life cycle (SDLC)</li>
          <li>
            Develop flowcharts, layouts and documentation to identify
            requirements and solutions
          </li>
          <li>Write well-designed, testable code</li>
          <li>Produce specifications and determine operational feasibility</li>
          <li>
            Integrate software components into a fully functional software
            system
          </li>
        </ul>

        <h2>Requirements</h2>
        <ul>
          <li>Proven experience as a Software Engineer or similar role</li>
          <li>
            Ability to develop software in Java, Ruby, C++ or other programming
            languages
          </li>
          <li>
            Excellent knowledge of relational databases, SQL and ORM
            technologies
          </li>
          <li>
            Experience developing web applications using at least one popular
            web framework
          </li>
          <li>BSc degree in Computer Science, Engineering or relevant field</li>
        </ul>

        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Apply Now
        </button>
      </article>
    </div>
  );
}
