import { versionSchemas } from '@cypress/schema-tools';

const baseSalaryValue100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'value of baseSalary',
    properties: {
      '@type': {
        type: 'string',
        description: 'type of value',
      },
      value: {
        type: 'number',
        description: 'amount of baseSalary',
      },
      unitText: {
        type: 'string',
        description: 'the base salary',
      },
    },
  },
};

const baseSalary100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'Describe salary',
    properties: {
      '@type': {
        type: 'string',
        description: 'type of salary',
      },
      currency: {
        type: 'string',
        description: 'currency of the value',
      },
      value: {
        ...baseSalaryValue100.schema,
        see: baseSalaryValue100,
      },
    },
    required: true,
    additionalProperties: false,
    example: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: {
        '@type': 'QuantitativeValue',
        value: '40',
        unitText: 'HOUR',
      },
    },
  },
};

const hiringOrganization100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'the hiring organization',
    properties: {
      '@type': {
        type: 'string',
        description: 'type of the hiring organization',
      },
      name: {
        type: 'string',
        description: 'name of the organization',
      },
      sameAs: {
        type: 'string',
        description: 'url',
      },
      logo: {
        type: 'string',
        description: 'logo of the organization',
      },
    },
    required: true,
    additionalProperties: false,
    example: {
      '@type': 'Organization',
      name: 'maespirit',
      sameAs: 'http://www.maespirit.fr',
      logo: 'http://www.maespirit.fr/images/logo.png',
    },
  },
};

const jobLocationAddress100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'address of the job location',
    properties: {
      '@type': {
        type: 'string',
        description: 'type of address',
      },
      addressLocality: {
        type: 'string',
        description: 'address locality',
      },
      addressRegion: {
        type: 'string',
        description: 'region of the address',
      },
      postalCode: {
        type: 'string',
        description: 'postal code of the address',
      },
      streetAddress: {
        type: 'string',
        description: 'street address',
      },
      addressCountry: {
        type: 'string',
        description: 'country of the address',
      },
    },
  },
  required: true,
  additionalProperties: false,
  example: {
    '@type': 'PostalAddress',
    addressLocality: 'Detroit',
    streetAddress: '555 Clancy St',
    addressRegion: 'MI',
    postalCode: '48201',
    addressCountry: 'US',
  },
};

const jobLocation100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    description: 'location of the job',
    properties: {
      '@type': {
        type: 'string',
        description: 'type of the job location',
      },
      address: {
        ...jobLocationAddress100.schema,
        see: jobLocationAddress100,
      },
    },
  },
  required: true,
  additionalProperties: false,
  example: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '555 Clancy St',
      addressLocality: 'Detroit',
      addressRegion: 'MI',
      postalCode: '48201',
      addressCountry: 'US',
    },
  },
};

const applicantLocationRequirements100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    descrption: 'location requirements for applicants',
    properties: {
      '@type': {
        type: 'string',
        description: 'type of the location requirement',
      },
      name: {
        type: 'string',
        description: 'name of the location requirement',
      },
    },
    required: true,
    additionalProperties: false,
    example: {
      '@type': 'Country',
      name: 'FR',
    },
  },
};

const experienceRequirements100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    descrption: 'experience requirements for applicants',
    properties: {
      '@type': {
        type: 'string',
        description: 'type of experience requirement',
      },
      monthsOfExperience: {
        type: 'number',
        description: 'minimum number of months of experience required',
      },
    },
    required: false,
    additionalProperties: false,
    example: {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: '12',
    },
  },
};

const educationRequirements100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    descrption: 'education requirements for applicants',
    properties: {
      '@type': {
        type: 'string',
        description: 'type of education requirement',
      },
      credentialCategory: {
        type: 'string',
        description: 'minimum education level required',
      },
    },
    required: false,
    additionalProperties: false,
    example: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'high school',
    },
  },
};

const jobPosting100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Job Posting',
    description: 'An example schema describing JSON-LD for type: Job Posting',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'JSON-LD Type',
      },
      baseSalary: {
        ...baseSalary100.schema,
        see: baseSalary100,
      },
      datePosted: {
        type: 'string',
        description: 'posted date of the job offer',
      },
      description: {
        type: 'string',
        description: 'description of the job offer',
      },
      employmentType: {
        type: ['string', 'array'],
        description: 'employment type for the job',
      },
      hiringOrganization: {
        ...hiringOrganization100.schema,
        see: hiringOrganization100,
      },
      jobLocation: {
        ...jobLocation100.schema,
        see: jobLocation100,
      },
      applicantLocationRequirements: {
        ...applicantLocationRequirements100.schema,
        see: applicantLocationRequirements100,
      },
      jobLocationType: {
        type: 'string',
        description: 'type of job lcoation',
      },
      validThrough: {
        type: 'string',
        description: 'job valid untill',
      },
      title: {
        type: 'string',
        description: 'title of the job offer',
      },
      experienceRequirements: {
        ...experienceRequirements100.schema,
        see: experienceRequirements100,
      },
      educationRequirements: {
        ...educationRequirements100.schema,
        see: educationRequirements100,
      },
      experienceInPlaceOfEducation: {
        type: 'boolean',
        description: 'whether experience can be used in place of education',
        required: false,
      },
    },
    required: true,
    additionalProperties: false,
    example: {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',

      baseSalary: {
        ...baseSalary100.example,
        see: baseSalary100,
      },

      datePosted: '2020-06-12',
      description:
        '<p>Maespirit is looking for a software developer for ....</p>',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        ...hiringOrganization100.example,
        see: hiringOrganization100,
      },

      jobLocation: {
        ...jobLocation100.example,
        see: jobLocation100,
      },
      applicantLocationRequirements: {
        ...applicantLocationRequirements100.example,
        see: applicantLocationRequirements100,
      },
      jobLocationType: 'TELECOMMUTE',
      validThrough: '2020-12-12',
      title: 'Software developer',
      experienceRequirements: {
        ...experienceRequirements100.example,
        see: experienceRequirements100,
      },
      educationRequirements: {
        ...educationRequirements100.example,
        see: educationRequirements100,
      },
      experienceInPlaceOfEducation: true,
    },
  },
};

const jobPostingVersions = versionSchemas(jobPosting100);
export default jobPostingVersions;
