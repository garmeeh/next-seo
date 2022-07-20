import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';

export interface HiringOrganization {
  name: string;
  sameAs: string;
  logo?: string;
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
  value: number | [number, number];
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

export interface JobPostingJsonLdProps extends JsonLdProps {
  keyOverride?: string;
  datePosted: string;
  description: string;
  hiringOrganization: HiringOrganization;
  title: string;
  validThrough: string;
  applicantLocationRequirements?: string;
  baseSalary?: MonetaryAmount;
  employmentType?: EmploymentType | EmploymentType[];
  jobLocation?: Place;
  jobLocationType?: string;
}

function JobPostingJsonLd({
  type = 'JobPosting',
  keyOverride,
  baseSalary,
  hiringOrganization,
  applicantLocationRequirements,
  jobLocation,
  ...rest
}: JobPostingJsonLdProps) {
  function setBaseSalary(baseSalary?: MonetaryAmount) {
    if (baseSalary) {
      return {
        '@type': 'MonetaryAmount',
        currency: baseSalary.currency,
        value: {
          '@type': 'QuantitativeValue',
          unitText: baseSalary.unitText,
          ...(Array.isArray(baseSalary.value)
            ? {
                minValue: baseSalary.value[0],
                maxValue: baseSalary.value[1],
              }
            : { value: baseSalary.value }),
        },
      };
    }

    return undefined;
  }

  function setHiringOrganization(org: HiringOrganization) {
    return {
      '@type': 'Organization',
      name: org.name,
      sameAs: org.sameAs,
      logo: org.logo,
    };
  }

  function setJobLocation(location?: Place) {
    if (location) {
      return {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressCountry: location.addressCountry,
          addressLocality: location.addressLocality,
          addressRegion: location.addressRegion,
          postalCode: location.postalCode,
          streetAddress: location.streetAddress,
        },
      };
    }

    return undefined;
  }

  function setApplicantLocationRequirements(requirements?: string) {
    if (requirements) {
      return {
        '@type': 'Country',
        name: requirements,
      };
    }
    return undefined;
  }

  const data = {
    ...rest,
    baseSalary: setBaseSalary(baseSalary),
    hiringOrganization: setHiringOrganization(hiringOrganization),
    jobLocation: setJobLocation(jobLocation),
    applicantLocationRequirements: setApplicantLocationRequirements(
      applicantLocationRequirements,
    ),
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="JobPosting"
    />
  );
}

export default JobPostingJsonLd;
