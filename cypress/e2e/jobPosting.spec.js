import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Job Posting JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/jobPosting');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Job Posting', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/jobPosting');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'EUR',
          value: {
            '@type': 'QuantitativeValue',
            value: 40,
            unitText: 'HOUR',
          },
        },

        datePosted: '2020-01-06T03:37:40Z',
        description: 'Company is looking for a software developer....',
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: 'company name',
          sameAs: 'http://www.company-website-url.dev',
          logo: 'http://www.company-website-url.dev/images/logo.png',
        },

        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Paris',
            addressRegion: 'Ile-de-France',
            postalCode: '75001',
            streetAddress: '17 street address',
            addressCountry: 'France',
          },
        },
        applicantLocationRequirements: {
          '@type': 'Country',
          name: 'FR',
        },
        jobLocationType: 'TELECOMMUTE',
        validThrough: '2020-01-06',
        title: 'Job Title',
      });
    });
  });

  it('Second Job Posting (With Salary Range) Matches', () => {
    cy.visit('http://localhost:3000/jsonld/jobPosting');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[1].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',

        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'EUR',
          value: {
            '@type': 'QuantitativeValue',
            minValue: 40,
            maxValue: 75,
            unitText: 'HOUR',
          },
        },

        datePosted: '2020-01-06T03:37:40Z',
        description: 'Company is looking for another software developer....',
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: 'company name',
          sameAs: 'http://www.company-website-url.dev',
          logo: 'http://www.company-website-url.dev/images/logo.png',
        },

        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Paris',
            addressRegion: 'Ile-de-France',
            postalCode: '75001',
            streetAddress: '17 street address',
            addressCountry: 'France',
          },
        },
        applicantLocationRequirements: {
          '@type': 'Country',
          name: 'FR',
        },
        jobLocationType: 'TELECOMMUTE',
        validThrough: '2020-01-06',
        title: 'Job Title #2',
      });
    });
  });
});
