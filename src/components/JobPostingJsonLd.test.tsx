import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import JobPostingJsonLd from "./JobPostingJsonLd";

describe("JobPostingJsonLd", () => {
  it("renders basic JobPosting with minimal props", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>We are looking for a software engineer to join our team.</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: "Software Engineer",
      description:
        "<p>We are looking for a software engineer to join our team.</p>",
      datePosted: "2024-01-18",
      hiringOrganization: {
        "@type": "Organization",
        name: "Google",
      },
    });
  });

  it("handles hiringOrganization as an object", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization={{
          name: "Google",
          sameAs: "https://www.google.com",
          logo: "https://www.google.com/logo.png",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hiringOrganization).toEqual({
      "@type": "Organization",
      name: "Google",
      sameAs: "https://www.google.com",
      logo: "https://www.google.com/logo.png",
    });
  });

  it("handles string jobLocation", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        jobLocation="Mountain View, CA"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.jobLocation).toEqual({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mountain View, CA",
      },
    });
  });

  it("handles object jobLocation with address", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        jobLocation={{
          address: {
            streetAddress: "1600 Amphitheatre Pkwy",
            addressLocality: "Mountain View",
            addressRegion: "CA",
            postalCode: "94043",
            addressCountry: "US",
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.jobLocation).toEqual({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1600 Amphitheatre Pkwy",
        addressLocality: "Mountain View",
        addressRegion: "CA",
        postalCode: "94043",
        addressCountry: "US",
      },
    });
  });

  it("handles multiple job locations", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        jobLocation={["Mountain View, CA", "New York, NY"]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.jobLocation).toEqual([
      {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mountain View, CA",
        },
      },
      {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: "New York, NY",
        },
      },
    ]);
  });

  it("handles remote job with jobLocationType", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Remote position!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        jobLocationType="TELECOMMUTE"
        applicantLocationRequirements={{ name: "USA" }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.jobLocationType).toBe("TELECOMMUTE");
    expect(jsonData.applicantLocationRequirements).toEqual({
      "@type": "Country",
      name: "USA",
    });
  });

  it("handles state applicant location requirements", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        applicantLocationRequirements={[
          { name: "Michigan, USA" },
          { name: "Texas, USA" },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.applicantLocationRequirements).toEqual([
      {
        "@type": "State",
        name: "Michigan, USA",
      },
      {
        "@type": "State",
        name: "Texas, USA",
      },
    ]);
  });

  it("handles baseSalary with value", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        baseSalary={{
          currency: "USD",
          value: {
            value: 40.0,
            unitText: "HOUR",
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.baseSalary).toEqual({
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        value: 40.0,
        unitText: "HOUR",
      },
    });
  });

  it("handles baseSalary with range", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        baseSalary={{
          currency: "USD",
          value: {
            minValue: 40.0,
            maxValue: 50.0,
            unitText: "HOUR",
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.baseSalary).toEqual({
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: 40.0,
        maxValue: 50.0,
        unitText: "HOUR",
      },
    });
  });

  it("handles employmentType as single value", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        employmentType="FULL_TIME"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.employmentType).toBe("FULL_TIME");
  });

  it("handles employmentType as array", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        employmentType={["FULL_TIME", "CONTRACTOR"]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.employmentType).toEqual(["FULL_TIME", "CONTRACTOR"]);
  });

  it("handles identifier as string", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        identifier="1234567"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.identifier).toEqual({
      "@type": "PropertyValue",
      value: "1234567",
    });
  });

  it("handles identifier as object", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        identifier={{
          name: "Google",
          value: "1234567",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.identifier).toEqual({
      "@type": "PropertyValue",
      name: "Google",
      value: "1234567",
    });
  });

  it("handles educationRequirements as string", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        educationRequirements="bachelor degree"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.educationRequirements).toBe("bachelor degree");
  });

  it("handles educationRequirements as object", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        educationRequirements={{
          credentialCategory: "bachelor degree",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.educationRequirements).toEqual({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "bachelor degree",
    });
  });

  it("handles multiple educationRequirements", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        educationRequirements={[
          { credentialCategory: "bachelor degree" },
          { credentialCategory: "postgraduate degree" },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.educationRequirements).toEqual([
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "bachelor degree",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "postgraduate degree",
      },
    ]);
  });

  it("handles experienceRequirements as string", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        experienceRequirements="3+ years of experience"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.experienceRequirements).toBe("3+ years of experience");
  });

  it("handles experienceRequirements as object", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        experienceRequirements={{
          monthsOfExperience: 36,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.experienceRequirements).toEqual({
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: 36,
    });
  });

  it("handles boolean directApply as false", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        directApply={false}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.directApply).toBe(false);
  });

  it("handles experienceInPlaceOfEducation", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        educationRequirements={{ credentialCategory: "bachelor degree" }}
        experienceRequirements={{ monthsOfExperience: 36 }}
        experienceInPlaceOfEducation={true}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.experienceInPlaceOfEducation).toBe(true);
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization={{
          name: "Google",
          sameAs: "https://www.google.com",
          logo: "https://www.google.com/logo.png",
        }}
        jobLocation={{
          address: {
            streetAddress: "1600 Amphitheatre Pkwy",
            addressLocality: "Mountain View",
            addressRegion: "CA",
            postalCode: "94043",
            addressCountry: "US",
          },
        }}
        url="https://careers.google.com/jobs/123"
        validThrough="2024-03-18T00:00"
        employmentType="CONTRACTOR"
        identifier={{
          name: "Google",
          value: "1234567",
        }}
        baseSalary={{
          currency: "USD",
          value: {
            value: 40.0,
            unitText: "HOUR",
          },
        }}
        directApply={true}
        educationRequirements={{
          credentialCategory: "bachelor degree",
        }}
        experienceRequirements={{
          monthsOfExperience: 36,
        }}
        experienceInPlaceOfEducation={true}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: "Software Engineer",
      description: "<p>Join our team!</p>",
      datePosted: "2024-01-18",
      hiringOrganization: {
        "@type": "Organization",
        name: "Google",
        sameAs: "https://www.google.com",
        logo: "https://www.google.com/logo.png",
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1600 Amphitheatre Pkwy",
          addressLocality: "Mountain View",
          addressRegion: "CA",
          postalCode: "94043",
          addressCountry: "US",
        },
      },
      url: "https://careers.google.com/jobs/123",
      validThrough: "2024-03-18T00:00",
      employmentType: "CONTRACTOR",
      identifier: {
        "@type": "PropertyValue",
        name: "Google",
        value: "1234567",
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          value: 40.0,
          unitText: "HOUR",
        },
      },
      directApply: true,
      educationRequirements: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "bachelor degree",
      },
      experienceRequirements: {
        "@type": "OccupationalExperienceRequirements",
        monthsOfExperience: 36,
      },
      experienceInPlaceOfEducation: true,
    });
  });

  it("uses custom scriptId and scriptKey", () => {
    const { container } = render(
      <JobPostingJsonLd
        scriptId="custom-id"
        scriptKey="custom-key"
        title="Software Engineer"
        description="<p>Join our team!</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
      />,
    );

    const script = container.querySelector('script[id="custom-id"]');
    expect(script).toBeTruthy();
  });
});
