import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

const expectedJSONResults = 14;

const articleLdJsonIndex = 0;
const breadcrumbLdJsonIndex = 1;
const blogLdJsonIndex = 2;
const courseLdJsonIndex = 3;
const localBusinessLdJsonIndex = 4;
const logoLdJsonIndex = 5;
const productLdJsonIndex = 6;
const socialProfileLdJsonIndex = 7;
const corporateContactIndex = 8;
const newsarticleLdJsonIndex = 9;
const faqPageLdJsonIndex = 10;
const jobPostingLdJsonIndex = 11;
const eventLdJsonIndex = 12;
const datasetLdJsonIndex = 13;

describe('Validates JSON-LD For:', () => {
  it('Article', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[articleLdJsonIndex].innerHTML);
        assertSchema(schemas)('Article', '1.0.0')(jsonLD);
      });
  });

  it('Article Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[articleLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://example.com/article',
          },
          headline: 'Article headline',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          datePublished: '2015-02-05T08:00:00+08:00',
          dateModified: '2015-02-05T09:00:00+08:00',
          author: {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Gary Meehan',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.example.com/photos/logo.jpg',
            },
          },
          description: 'This is a mighty good description of this article.',
        });
      });
  });

  it('Breadcrumb', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[breadcrumbLdJsonIndex].innerHTML);
        assertSchema(schemas)('Breadcrumb', '1.0.0')(jsonLD);
      });
  });

  it('Breadcrumb Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[breadcrumbLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': 'https://example.com/books',
                name: 'Books',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': 'https://example.com/books/authors',
                name: 'Authors',
              },
            },
            {
              '@type': 'ListItem',
              position: 3,
              item: {
                '@id': 'https://example.com/books/authors/annleckie',
                name: 'Ann Leckie',
              },
            },
            {
              '@type': 'ListItem',
              position: 4,
              item: {
                '@id':
                  'https://example.com/books/authors/annleckie/ancillaryjustice',
                name: 'Ancillary Justice',
              },
            },
          ],
        });
      });
  });

  it('Blog', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[blogLdJsonIndex].innerHTML);
        assertSchema(schemas)('Blog', '1.0.0')(jsonLD);
      });
  });

  it('Blog Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[blogLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Blog',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://example.com/blog',
          },
          headline: 'Blog headline',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          datePublished: '2015-02-05T08:00:00+08:00',
          dateModified: '2015-02-05T09:00:00+08:00',
          author: {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          description: 'This is a mighty good description of this blog.',
        });
      });
  });

  it('Course', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[courseLdJsonIndex].innerHTML);
        assertSchema(schemas)('Course', '1.0.0')(jsonLD);
      });
  });

  it('Course Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[courseLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Course',
          name: 'Course Name',
          description: 'Course description goes right here',
          provider: {
            '@type': 'Organization',
            name: 'Course Provider',
            sameAs: 'https//www.example.com/provider',
          },
        });
      });
  });

  it('Local Business', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[localBusinessLdJsonIndex].innerHTML);
        assertSchema(schemas)('Local Business', '1.1.0')(jsonLD);
      });
  });

  it('Local Business Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[localBusinessLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Store',
          '@id': 'http://davesdeptstore.example.com',
          name: "Dave's Department Store",
          description: "Dave's latest department store in San Jose, now open",
          url:
            'http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427',
          telephone: '+14088717984',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1600 Saratoga Ave',
            addressLocality: 'San Jose',
            addressRegion: 'CA',
            postalCode: '95129',
            addressCountry: 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '37.293058',
            longitude: '-121.988331',
          },
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          sameAs: ['https://thisbusiness.com', 'https://alsothisbusiness.com'],
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              opens: '08:00',
              closes: '23:59',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
              ],
              validFrom: '2019-12-23',
              validThrough: '2020-04-02',
            },
            {
              '@type': 'OpeningHoursSpecification',
              opens: '14:00',
              closes: '20:00',
              dayOfWeek: 'Sunday',
              validFrom: '2019-12-23',
              validThrough: '2020-04-02',
            },
          ],
        });
      });
  });

  it('Logo', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[logoLdJsonIndex].innerHTML);
        assertSchema(schemas)('Logo', '1.0.0')(jsonLD);
      });
  });

  it('Logo Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[logoLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Organization',
          url: 'http://www.your-site.com',
          logo: 'http://www.your-site.com/images/logo.jpg',
        });
      });
  });

  it('Product', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[productLdJsonIndex].innerHTML);
        assertSchema(schemas)('Product', '1.0.0')(jsonLD);
      });
  });

  it('Product Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[productLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org/',
          '@type': 'Product',
          name: 'Executive Anvil',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          description:
            "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
          mpn: '925872',
          brand: {
            '@type': 'Thing',
            name: 'ACME',
          },
          review: [
            {
              '@type': 'Review',
              author: {
                '@type': 'Person',
                name: 'Jim',
              },
              publisher: {
                '@type': 'Organization',
                name: 'TwoVit',
              },
              datePublished: '2017-01-06T03:37:40Z',
              reviewBody:
                'This is my favorite product yet! Thanks Nate for the example products and reviews.',
              name: 'So awesome!!!',
              reviewRating: {
                '@type': 'Rating',
                bestRating: '5',
                ratingValue: '5',
                worstRating: '1',
              },
            },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.4',
            reviewCount: '89',
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: '119.99',
            priceValidUntil: '2020-11-05',
            itemCondition: 'http://schema.org/UsedCondition',
            availability: 'http://schema.org/InStock',
            url: 'https://www.example.com/executive-anvil',
            seller: {
              '@type': 'Organization',
              name: 'Executive Objects',
            },
          },
        });
      });
  });

  it('Social Profile', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[socialProfileLdJsonIndex].innerHTML);
        assertSchema(schemas)('Social Profile', '1.0.0')(jsonLD);
      });
  });

  it('Social Profile Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[socialProfileLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Person',
          name: 'your name',
          url: 'http://www.your-site.com',
          sameAs: [
            'http://www.facebook.com/your-profile',
            'http://instagram.com/yourProfile',
            'http://www.linkedin.com/in/yourprofile',
            'http://plus.google.com/your_profile',
          ],
        });
      });
  });

  it('CorporateContact', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[corporateContactIndex].innerHTML);
        assertSchema(schemas)('Corporate Contact', '1.0.0')(jsonLD);
      });
  });

  it('Corporate Contact Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[corporateContactIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          url: 'http://www.your-company-site.com',
          logo: 'http://www.example.com/logo.png',
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+1-401-555-1212',
              contactType: 'customer service',
              areaServed: 'US',
              availableLanguage: ['English', 'Spanish', 'French'],
            },
            {
              '@type': 'ContactPoint',
              telephone: '+1-877-746-0909',
              contactType: 'customer service',
              contactOption: 'TollFree',
              availableLanguage: 'English',
            },
            {
              '@type': 'ContactPoint',
              telephone: '+1-877-453-1304',
              contactType: 'technical support',
              contactOption: 'TollFree',
              areaServed: ['US', 'CA'],
              availableLanguage: ['English', 'French'],
            },
          ],
        });
      });
  });

  it('NewsArticle', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[newsarticleLdJsonIndex].innerHTML);
        assertSchema(schemas)('NewsArticle', '1.0.0')(jsonLD);
      });
  });

  it('NewsArticle Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[newsarticleLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'NewsArticle',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://example.com/newsarticle',
          },
          headline: 'News Article headline',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          articleSection: 'politics',
          keywords: 'prayuth, taksin, thai',
          dateCreated: '2015-02-05T08:00:00+08:00',
          datePublished: '2015-02-05T08:00:00+08:00',
          dateModified: '2015-02-05T09:00:00+08:00',
          author: {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Gary Meehan',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.example.com/photos/logo.jpg',
            },
          },
          description:
            'This is a mighty good description of this news article.',
          articleBody: 'This is article body of news article',
        });
      });
  });

  it('FAQ Page', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[faqPageLdJsonIndex].innerHTML);
        assertSchema(schemas)('FAQPage', '1.0.0')(jsonLD);
      });
  });

  it('FAQ Page Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[faqPageLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org/',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How long is the delivery time?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '3-5 business days.',
              },
            },
            {
              '@type': 'Question',
              name: 'Where can I find information about product recalls?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Read more on under information.',
              },
            },
          ],
        });
      });
  });

  it('Job Posting', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[jobPostingLdJsonIndex].innerHTML);
        assertSchema(schemas)('Job Posting', '1.0.0')(jsonLD);
      });
  });

  it('Job Posting Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[jobPostingLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'JobPosting',

          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: {
              '@type': 'QuantitativeValue',
              value: '40',
              unitText: 'HOUR',
            },
          },

          datePosted: '2020-01-06T03:37:40Z',
          description: 'Company is looking for a software developer....',
          employmentType: 'FULL_TIME',
          hiringOrganization: {
            '@type': 'Organization',
            name: 'company name',
            sameAs: 'www.company-website-url.dev',
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

  it('Event', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[eventLdJsonIndex].innerHTML);
        assertSchema(schemas)('Event', '1.0.0')(jsonLD);
      });
  });

  it('Event Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[eventLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Event',
          name: 'My Event',
          startDate: '2020-01-23T00:00:00.000Z',
          endDate: '2020-01-24T00:00:00.000Z',
          url: 'https://example.com/my-event',
          location: {
            '@type': 'Place',
            name: 'My Place',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '1600 Saratoga Ave',
              addressLocality: 'San Jose',
              addressRegion: 'CA',
              postalCode: '95129',
              addressCountry: 'US',
            },
            sameAs: 'https://example.com/my-place',
          },
          image: ['https://example.com/photos/photo.jpg'],
          description: 'My event @ my place',
        });
      });
  });

  it('Dataset', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[datasetLdJsonIndex].innerHTML);
        assertSchema(schemas)('Dataset', '1.0.0')(jsonLD);
      });
  });

  it('Dataset Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[datasetLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'http://schema.org',
          '@type': 'Dataset',
          description:
            'The description needs to be at least 50 characters long',
          name: 'name of the dataset',
          license: 'https//www.example.com',
        });
      });
  });
});
