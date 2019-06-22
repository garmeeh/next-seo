import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const buildBaseSalary = baseSalary => `
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

const JobPostingJsonLd = ({
  baseSalary,
  datePosted,
  description,
  educationRequirements,
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
    ${
      educationRequirements
        ? `"educationRequirements": "${educationRequirements}",`
        : ''
    }
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
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-jobPosting"
      />
    </Head>
  );
};

JobPostingJsonLd.defaultProps = {
  baseSalary: null,
  educationRequirements: null,
  employmentType: null,
  jobLocationType: null,
  validThrough: null,
  applicantLocationRequirements: null,
};

JobPostingJsonLd.propTypes = {
  baseSalary: PropTypes.shape({
    currency: PropTypes.string,
    value: PropTypes.number,
    unitText: PropTypes.string,
  }),
  datePosted: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  educationRequirements: PropTypes.string,
  employmentType: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  hiringOrganization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sameAs: PropTypes.string.isRequired,
  }).isRequired,
  jobLocation: PropTypes.shape({
    streetAddress: PropTypes.string.isRequired,
    addressLocality: PropTypes.string.isRequired,
    addressRegion: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    addressCountry: PropTypes.string.isRequired,
  }).isRequired,
  jobLocationType: PropTypes.string,
  title: PropTypes.string.isRequired,
  validThrough: PropTypes.string,
  applicantLocationRequirements: PropTypes.string,
};

export default JobPostingJsonLd;
