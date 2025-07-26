import { test, expect } from "@playwright/test";

test.describe("JobPostingJsonLd", () => {
  test("renders basic JobPosting structured data", async ({ page }) => {
    await page.goto("/job-posting");

    // Find the JSON-LD script tag
    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic JobPosting properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("JobPosting");
    expect(jsonData.title).toBe("Software Engineer");
    expect(jsonData.description).toContain(
      "We are looking for a passionate Software Engineer",
    );
    expect(jsonData.datePosted).toBe("2024-01-18");
    expect(jsonData.validThrough).toBe("2024-03-18T00:00");

    // Verify hiring organization
    expect(jsonData.hiringOrganization).toEqual({
      "@type": "Organization",
      name: "Tech Solutions Inc.",
    });

    // Verify job location
    expect(jsonData.jobLocation).toEqual({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Francisco, CA",
      },
    });

    // Verify employment type
    expect(jsonData.employmentType).toBe("FULL_TIME");

    // Verify salary
    expect(jsonData.baseSalary).toEqual({
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: 90000,
        maxValue: 120000,
        unitText: "YEAR",
      },
    });
  });

  test("renders remote JobPosting with applicant location requirements", async ({
    page,
  }) => {
    await page.goto("/job-posting-remote");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify remote job properties
    expect(jsonData["@type"]).toBe("JobPosting");
    expect(jsonData.title).toBe("Senior Frontend Developer");
    expect(jsonData.jobLocationType).toBe("TELECOMMUTE");

    // Verify applicant location requirements
    expect(jsonData.applicantLocationRequirements).toEqual({
      "@type": "Country",
      name: "USA",
    });

    // Verify hiring organization with full details
    expect(jsonData.hiringOrganization).toEqual({
      "@type": "Organization",
      name: "Remote First Tech",
      sameAs: "https://www.remotefirsttech.com",
      logo: "https://www.remotefirsttech.com/logo.png",
    });

    // Verify other properties
    expect(jsonData.url).toBe(
      "https://careers.remotefirsttech.com/jobs/senior-frontend-dev",
    );
    expect(jsonData.identifier).toEqual({
      "@type": "PropertyValue",
      value: "RFT-2024-001",
    });
    expect(jsonData.directApply).toBe(true);

    // Verify education and experience
    expect(jsonData.educationRequirements).toBe("bachelor degree");
    expect(jsonData.experienceRequirements).toEqual({
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: 60,
    });
  });

  test("renders advanced JobPosting with multiple locations and all features", async ({
    page,
  }) => {
    await page.goto("/job-posting-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify advanced properties
    expect(jsonData["@type"]).toBe("JobPosting");
    expect(jsonData.title).toBe("Senior Product Manager");

    // Verify multiple job locations
    expect(jsonData.jobLocation).toHaveLength(2);
    expect(jsonData.jobLocation[0]).toEqual({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1600 Amphitheatre Parkway",
        addressLocality: "Mountain View",
        addressRegion: "CA",
        postalCode: "94043",
        addressCountry: "US",
      },
    });
    expect(jsonData.jobLocation[1]).toEqual({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "111 8th Avenue",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10011",
        addressCountry: "US",
      },
    });

    // Verify hybrid/remote setup
    expect(jsonData.jobLocationType).toBe("TELECOMMUTE");
    expect(jsonData.applicantLocationRequirements).toHaveLength(4);
    expect(jsonData.applicantLocationRequirements[0]).toEqual({
      "@type": "State",
      name: "California, USA",
    });
    expect(jsonData.applicantLocationRequirements[3]).toEqual({
      "@type": "State",
      name: "Texas, USA",
    });

    // Verify multiple employment types
    expect(jsonData.employmentType).toEqual(["FULL_TIME", "CONTRACTOR"]);

    // Verify identifier object
    expect(jsonData.identifier).toEqual({
      "@type": "PropertyValue",
      name: "Google",
      value: "GCP-PM-2024-001",
    });

    // Verify hiring organization with logo object
    expect(jsonData.hiringOrganization).toEqual({
      "@type": "Organization",
      name: "Google",
      sameAs: "https://www.google.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        width: 272,
        height: 92,
      },
    });

    // Verify salary range
    expect(jsonData.baseSalary).toEqual({
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: 180000,
        maxValue: 280000,
        unitText: "YEAR",
      },
    });

    // Verify education requirements array
    expect(jsonData.educationRequirements).toHaveLength(2);
    expect(jsonData.educationRequirements[0]).toEqual({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "bachelor degree",
    });
    expect(jsonData.educationRequirements[1]).toEqual({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "postgraduate degree",
    });

    // Verify experience requirements
    expect(jsonData.experienceRequirements).toEqual({
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: 84,
    });

    // Verify experience can replace education
    expect(jsonData.experienceInPlaceOfEducation).toBe(true);

    // Verify URL and dates
    expect(jsonData.url).toBe(
      "https://careers.google.com/jobs/senior-product-manager-cloud",
    );
    expect(jsonData.datePosted).toBe("2024-01-18");
    expect(jsonData.validThrough).toBe("2024-04-18T23:59:59");
    expect(jsonData.directApply).toBe(true);
  });

  test("correctly identifies State vs Country in applicant location requirements", async ({
    page,
  }) => {
    await page.goto("/job-posting-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify state detection based on format
    const locations = jsonData.applicantLocationRequirements;

    // Should detect states (contains comma and state name)
    expect(locations[0]["@type"]).toBe("State");
    expect(locations[0].name).toBe("California, USA");

    expect(locations[1]["@type"]).toBe("State");
    expect(locations[1].name).toBe("New York, USA");

    // Also check remote job with country
    await page.goto("/job-posting-remote");
    const remoteJsonLd = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const remoteData = JSON.parse(remoteJsonLd!);

    // Should detect country (no comma, just country name)
    expect(remoteData.applicantLocationRequirements["@type"]).toBe("Country");
    expect(remoteData.applicantLocationRequirements.name).toBe("USA");
  });

  test("verifies HTML content is properly structured in description", async ({
    page,
  }) => {
    await page.goto("/job-posting-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify HTML tags are preserved in description
    expect(jsonData.description).toContain("<p>");
    expect(jsonData.description).toContain("<strong>");
    expect(jsonData.description).toContain("<ul>");
    expect(jsonData.description).toContain("<li>");
    expect(jsonData.description).toContain(
      "7+ years of product management experience",
    );
  });
});
