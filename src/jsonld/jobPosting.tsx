import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import minifyJsonLd from '../utils/minifyJsonLd';

export interface HiringOrganization {
  name: string;
  sameAs: string;
}

export interface Place {
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
  addressCountry: string;
}

export interface MonetaryAmount {
  currency: string;
  value: number;
  unitText: UnitTextType;
}

export type UnitTextType = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export type EmploymentType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACTOR'
  | 'TEMPORARY'
  | 'INTERN'
  | 'VOLUNTEER'
  | 'PER_DIEM'
  | 'OTHER';

export interface JobPostingJsonLdProps {
  datePosted: string;
  description: string;
  hiringOrganization: HiringOrganization;
  jobLocation: Place;
  title: string;
  validThrough: string;
  applicantLocationRequirements?: string;
  baseSalary?: MonetaryAmount;
  employmentType?: EmploymentType | EmploymentType[];
  jobLocationType?: string;
}

const buildBaseSalary = (baseSalary: MonetaryAmount) => `
  "baseSalary": {
    "@type": "MonetaryAmount",
    ${baseSalary.currency ? `"currency": "${baseSalary.currency}",` : ''}
    "value": {
      "@type": "QuantitativeValue",
      ${baseSalary.value ? `"value": "${baseSalary.value}",` : ''}
      ${baseSalary.unitText ? `"unitText": "${baseSalary.unitText}"` : ''}
    }
  },
`;

const JobPostingJsonLd: FC<JobPostingJsonLdProps> = ({
  baseSalary,
  datePosted,
  description,
  employmentType,
  hiringOrganization,
  jobLocation,
  applicantLocationRequirements,
  jobLocationType,
  title,
  validThrough,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "JobPosting",
    ${baseSalary ? buildBaseSalary(baseSalary) : ''}
    "datePosted": "${datePosted}",
    "description": "${description}",
    ${employmentType ? `"employmentType": "${employmentType}",` : ''}
    "hiringOrganization" : {
      "@type" : "Organization",
      "name" : "${hiringOrganization.name}",
      "sameAs" : "${hiringOrganization.sameAs}"
    },

    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${jobLocation.addressLocality}",
        "addressRegion": "${jobLocation.addressRegion}",
        "postalCode" : "${jobLocation.postalCode}",
        "streetAddress" : "${jobLocation.streetAddress}",
        "addressCountry" : "${jobLocation.addressCountry}"
      }
    },
    ${
      applicantLocationRequirements
        ? ` "applicantLocationRequirements": {
        "@type": "Country",
        "name": "${applicantLocationRequirements}"
    },`
        : ''
    }
    ${jobLocationType ? `"jobLocationType": "${jobLocationType}",` : ''}
    ${validThrough ? `"validThrough": "${validThrough}",` : ''}
    "title": "${title}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(minifyJsonLd(jslonld))}
        key="jsonld-jobPosting"
      />
    </Head>
  );
};

export default JobPostingJsonLd;
