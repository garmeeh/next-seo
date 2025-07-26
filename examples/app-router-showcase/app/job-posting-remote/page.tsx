import { JobPostingJsonLd } from "next-seo";

export default function RemoteJobPostingPage() {
  return (
    <div className="container mx-auto p-8">
      <JobPostingJsonLd
        title="Senior Frontend Developer"
        description="<p>Join our fully remote team to build amazing user experiences!</p><p>We're looking for an experienced Frontend Developer who is passionate about creating beautiful, performant web applications.</p><p>This is a 100% remote position open to candidates in the United States.</p>"
        datePosted="2024-01-18"
        validThrough="2024-02-28T00:00"
        hiringOrganization={{
          name: "Remote First Tech",
          sameAs: "https://www.remotefirsttech.com",
          logo: "https://www.remotefirsttech.com/logo.png",
        }}
        jobLocationType="TELECOMMUTE"
        applicantLocationRequirements={{
          name: "USA",
        }}
        url="https://careers.remotefirsttech.com/jobs/senior-frontend-dev"
        employmentType="FULL_TIME"
        identifier="RFT-2024-001"
        baseSalary={{
          currency: "USD",
          value: {
            value: 130000,
            unitText: "YEAR",
          },
        }}
        directApply={true}
        educationRequirements="bachelor degree"
        experienceRequirements={{
          monthsOfExperience: 60,
        }}
      />

      <article className="prose lg:prose-xl">
        <h1>Senior Frontend Developer</h1>
        <div className="text-gray-600 mb-4">
          <p>Remote First Tech • Remote (USA)</p>
          <p>Posted: January 18, 2024 • Expires: February 28, 2024</p>
          <p>$130,000 per year</p>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            🏠 100% Remote
          </span>
        </div>

        <h2>About the Role</h2>
        <p>
          Join our fully remote team to build amazing user experiences! We're
          looking for an experienced Frontend Developer who is passionate about
          creating beautiful, performant web applications.
        </p>
        <p>
          This is a 100% remote position open to candidates in the United
          States.
        </p>

        <h2>What You'll Do</h2>
        <ul>
          <li>Build and maintain complex React applications</li>
          <li>Collaborate with designers to implement pixel-perfect UIs</li>
          <li>Optimize applications for maximum speed and scalability</li>
          <li>
            Mentor junior developers and contribute to technical decisions
          </li>
          <li>Work closely with backend engineers to design APIs</li>
        </ul>

        <h2>What We're Looking For</h2>
        <ul>
          <li>5+ years of experience in frontend development</li>
          <li>Expert-level knowledge of React, TypeScript, and modern CSS</li>
          <li>Experience with state management (Redux, Zustand, etc.)</li>
          <li>Strong understanding of web performance optimization</li>
          <li>
            Bachelor's degree in Computer Science or equivalent experience
          </li>
          <li>Excellent communication skills for remote collaboration</li>
        </ul>

        <h2>Benefits</h2>
        <ul>
          <li>100% remote work from anywhere in the USA</li>
          <li>Flexible working hours</li>
          <li>Health, dental, and vision insurance</li>
          <li>$1,500 home office setup budget</li>
          <li>Annual learning & development budget</li>
          <li>Quarterly team retreats</li>
        </ul>

        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Apply Now
        </button>
      </article>
    </div>
  );
}
