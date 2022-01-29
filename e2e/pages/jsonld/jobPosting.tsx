import React from 'react';
import { JobPostingJsonLd } from '../../..';

function JobPosting() {
  return (
    <>
      <h1>Dataset</h1>
      <JobPostingJsonLd
        datePosted="2020-01-06T03:37:40Z"
        description="Company is looking for a software developer...."
        hiringOrganization={{
          name: 'company name',
          sameAs: 'http://www.company-website-url.dev',
          logo: 'http://www.company-website-url.dev/images/logo.png',
        }}
        jobLocation={{
          streetAddress: '17 street address',
          addressLocality: 'Paris',
          addressRegion: 'Ile-de-France',
          postalCode: '75001',
          addressCountry: 'France',
        }}
        title="Job Title"
        baseSalary={{
          currency: 'EUR',
          value: 40,
          unitText: 'HOUR',
        }}
        employmentType="FULL_TIME"
        jobLocationType="TELECOMMUTE"
        validThrough="2020-01-06"
        applicantLocationRequirements="FR"
      />

      <JobPostingJsonLd
        datePosted="2020-01-06T03:37:40Z"
        description="Company is looking for another software developer...."
        hiringOrganization={{
          name: 'company name',
          sameAs: 'http://www.company-website-url.dev',
          logo: 'http://www.company-website-url.dev/images/logo.png',
        }}
        jobLocation={{
          streetAddress: '17 street address',
          addressLocality: 'Paris',
          addressRegion: 'Ile-de-France',
          postalCode: '75001',
          addressCountry: 'France',
        }}
        title="Job Title #2"
        baseSalary={{
          currency: 'EUR',
          value: [40, 75],
          unitText: 'HOUR',
        }}
        employmentType="FULL_TIME"
        jobLocationType="TELECOMMUTE"
        validThrough="2020-01-06"
        applicantLocationRequirements="FR"
        keyOverride="second-job-posting-with-salary-range"
      />
    </>
  );
}

export default JobPosting;
