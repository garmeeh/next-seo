import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

const expectedJSONResults = 18;

const articleLdJsonIndex = 0;
const breadcrumbLdJsonIndex = 1;
const blogLdJsonIndex = 2;
const courseLdJsonIndex = 3;
const localBusinessLdJsonIndex = 4;
const logoLdJsonIndex = 5;
const logoLdSecondJsonIndex = 6;
const productLdJsonIndex = 7;
const socialProfileLdJsonIndex = 8;
const corporateContactIndex = 9;
const newsarticleLdJsonIndex = 10;
const faqPageLdJsonIndex = 11;
const jobPostingLdJsonIndex = 12;
const eventLdJsonIndex = 13;
const datasetLdJsonIndex = 14;
const recipeLdJsonIndex = 15;
const siteLinksSearchBoxLdJsonIndex = 16;
const qaPageLdJsonIndex = 17;

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
          '@context': 'https://schema.org',
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
          author: [
            {
              '@type': 'Person',
              name: 'Jane Blogs',
            },
            {
              '@type': 'Person',
              name: 'Mary Stone',
            },
          ],
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
          '@context': 'https://schema.org',
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
          '@context': 'https://schema.org',
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
          '@context': 'https://schema.org',
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
          '@context': 'https://schema.org',
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

  it('Second Logo', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[logoLdSecondJsonIndex].innerHTML);
        assertSchema(schemas)('Logo', '1.0.0')(jsonLD);
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
          '@context': 'https://schema.org/',
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
          offers: [
            {
              '@type': 'Offer',
              price: '119.99',
              priceCurrency: 'USD',
              priceValidUntil: '2020-11-05',
              itemCondition: 'https://schema.org/UsedCondition',
              availability: 'https://schema.org/InStock',
              url: 'https://www.example.com/executive-anvil',
              seller: {
                '@type': 'Organization',
                name: 'Executive Objects',
              },
            },
            {
              '@type': 'Offer',
              price: '139.99',
              priceCurrency: 'CAD',
              priceValidUntil: '2020-09-05',
              itemCondition: 'https://schema.org/UsedCondition',
              availability: 'https://schema.org/InStock',
              url: 'https://www.example.ca/executive-anvil',
              seller: {
                '@type': 'Organization',
                name: 'Executive Objects',
              },
            },
          ],
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
          '@context': 'https://schema.org',
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
          '@context': 'https://schema.org',
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
          '@context': 'https://schema.org/',
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
          '@context': 'https://schema.org',
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
          '@context': 'https://schema.org',
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
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          description:
            'The description needs to be at least 50 characters long',
          name: 'name of the dataset',
          license: 'https//www.example.com',
        });
      });
  });

  it('Recipe', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[recipeLdJsonIndex].innerHTML);
        assertSchema(schemas)('Recipe', '1.0.0')(jsonLD);
      });
  });

  it('Recipe Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[recipeLdJsonIndex].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org/',
          '@type': 'Recipe',
          name: 'Party Coffee Cake',
          image: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          author: [
            {
              '@type': 'Person',
              name: 'Jane Blogs',
            },
            {
              '@type': 'Person',
              name: 'Mary Stone',
            },
          ],
          datePublished: '2018-03-10',
          description: 'This coffee cake is awesome and perfect for parties.',
          prepTime: 'PT20M',
          cookTime: 'PT30M',
          totalTime: 'PT50M',
          keywords: 'cake for a party, coffee',
          recipeYield: '10',
          recipeCategory: 'Dessert',
          recipeCuisine: 'American',
          nutrition: {
            '@type': 'NutritionInformation',
            calories: '270 calories',
          },
          recipeIngredient: [
            '2 cups of flour',
            '3/4 cup white sugar',
            '2 teaspoons baking powder',
            '1/2 teaspoon salt',
            '1/2 cup butter',
            '2 eggs',
            '3/4 cup milk',
          ],
          recipeInstructions: [
            {
              '@type': 'HowToStep',
              name: 'Preheat',
              text:
                'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
              url: 'https://example.com/party-coffee-cake#step1',
              image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
            },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            ratingCount: '18',
          },
          video: {
            '@type': 'VideoObject',
            name: 'How to make a Party Coffee Cake',
            description: 'This is how you make a Party Coffee Cake.',
            thumbnailUrl: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            contentUrl: 'http://www.example.com/video123.mp4',
            embedUrl: 'http://www.example.com/videoplayer?video=123',
            uploadDate: '2018-02-05T08:00:00+08:00',
            duration: 'PT1M33S',
            interactionStatistic: {
              '@type': 'InteractionCounter',
              interactionType: { '@type': 'https://schema.org/WatchAction' },
              userInteractionCount: 2347,
            },
            expires: '2019-02-05T08:00:00+08:00',
          },
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });

  it('Sitelinks Search Box', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(
          tags[siteLinksSearchBoxLdJsonIndex].innerHTML,
        );
        assertSchema(schemas)('Sitelinks Search Box', '1.0.0')(jsonLD);
      });
  });

  it('Sitelinks Search Box Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(
          tags[siteLinksSearchBoxLdJsonIndex].innerHTML,
        );
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: 'https://example.com',
          potentialAction: [
            {
              '@type': 'SearchAction',
              target: 'https://query.example.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
            {
              '@type': 'SearchAction',
              target:
                'android-app://com.example/https/query.example.com/search/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          ],
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });
  
  it('Q&A Page', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[qaPageLdJsonIndex].innerHTML);
        assertSchema(schemas)('Q&A Page', '1.0.0')(jsonLD);
      });
  });

  it('Q&A Page Matches', () => {
    cy.visit('http://localhost:3000/jsonld');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', expectedJSONResults)
      .then(tags => {
        const jsonLD = JSON.parse(tags[qaPageLdJsonIndex].innerHTML);
        expect(jsonLD).to.deep.equal({
          '@context': 'https://schema.org',
          '@type': 'QAPage',
          mainEntity: {
            '@type': 'Question',
            name: 'How many ounces are there in a pound?',
            text:
              'I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?',
            answerCount: 3,
            upvoteCount: 26,
            dateCreated: '2016-07-23T21:11Z',
            author: {
              '@type': 'Person',
              name: 'New Baking User',
            },
            acceptedAnswer: {
              '@type': 'Answer',
              text: '1 pound (lb) is equal to 16 ounces (oz).',
              dateCreated: '2016-11-02T21:11Z',
              upvoteCount: 1337,
              url: 'https://example.com/question1#acceptedAnswer',
              author: {
                '@type': 'Person',
                name: 'SomeUser',
              },
            },
            suggestedAnswer: [
              {
                '@type': 'Answer',
                text:
                  'Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.',
                dateCreated: '2016-11-02T21:11Z',
                upvoteCount: 42,
                url: 'https://example.com/question1#suggestedAnswer1',
                author: {
                  '@type': 'Person',
                  name: 'AnotherUser',
                },
              },
              {
                '@type': 'Answer',
                text:
                  "I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.",
                dateCreated: '2016-11-06T21:11Z',
                upvoteCount: 0,
                url: 'https://example.com/question1#suggestedAnswer2',
                author: {
                  '@type': 'Person',
                  name: 'ConfusedUser',
                },
              },
            ],
          },
        });
      });
  });

  it('Carousel Default Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/default');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: '1',
              url: 'http://example.com/peanut-butter-cookies.html',
            },
            {
              '@type': 'ListItem',
              position: '2',
              url: 'http://example.com/triple-chocolate-chunk.html',
            },
          ],
        };
        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });

  it('Carousel Course Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/course');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: '1',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Course',
                url: 'http://example.com/course-1.html',
                name: 'Course 1',
                description: 'Course 1 Description',
                provider: {
                  '@type': 'Organization',
                  name: 'Course Provider',
                },
              },
            },
            {
              '@type': 'ListItem',
              position: '2',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Course',
                url: 'http://example.com/course-2.html',
                name: 'Course 2',
                description: 'Course 2 Description',
                provider: {
                  '@type': 'Organization',
                  name: 'Course Provider',
                },
              },
            },
          ],
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });

  it('Carousel Movie Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/movie');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: '1',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Movie',
                name: 'Movie 1',
                url: 'http://example.com/movie-1.html',
                image:
                  'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
                director: { '@type': 'Person', name: 'John Doe' },
                review: {
                  '@type': 'Review',
                  author: { '@type': 'Person', name: 'Ronan Farrow' },
                  reviewBody:
                    'Heartbreaking, inpsiring, moving. Bradley Cooper is a triple threat.',
                  reviewRating: { '@type': 'Rating', ratingValue: '5' },
                },
              },
            },
            {
              '@type': 'ListItem',
              position: '2',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Movie',
                name: 'Movie 2',
                url: 'http://example.com/movie-1.html',
                image:
                  'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
                director: { '@type': 'Person', name: 'Mary Doe' },
                review: {
                  '@type': 'Review',
                  author: { '@type': 'Person', name: 'Ronan Farrow' },
                  reviewBody:
                    'Heartbreaking, inpsiring, moving. Rowan Atkinson is a triple threat.',
                  reviewRating: { '@type': 'Rating', ratingValue: '5' },
                },
              },
            },
          ],
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });

  it('Carousel Recipe Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/recipe');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: '1',
              item: {
                '@context': 'https://schema.org/',
                '@type': 'Recipe',
                name: 'Party Coffee Cake',
                url: 'http://example.com/recipe-1.html',
                description:
                  'This coffee cake is awesome and perfect for parties.',
                datePublished: '2018-03-10',
                author: { '@type': 'Person', name: 'Mary Stone' },
                image: [
                  'https://example.com/photos/1x1/photo.jpg',
                  'https://example.com/photos/4x3/photo.jpg',
                  'https://example.com/photos/16x9/photo.jpg',
                ],
                prepTime: 'PT20M',
                cookTime: 'PT30M',
                totalTime: 'PT50M',
                keywords: 'cake for a party, coffee',
                recipeYield: '10',
                recipeCategory: 'Dessert',
                recipeCuisine: 'American',
                nutrition: {
                  '@type': 'NutritionInformation',
                  calories: '270 calories',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '5',
                  ratingCount: '18',
                },
                video: {
                  '@type': 'VideoObject',
                  name: 'How to make a Party Coffee Cake',
                  thumbnailUrl: [
                    'https://example.com/photos/1x1/photo.jpg',
                    'https://example.com/photos/4x3/photo.jpg',
                    'https://example.com/photos/16x9/photo.jpg',
                  ],
                  description: 'This is how you make a Party Coffee Cake.',
                  contentUrl: 'http://www.example.com/video123.mp4',
                  uploadDate: '2018-02-05T08:00:00+08:00',
                  duration: 'PT1M33S',
                  embedUrl: 'http://www.example.com/videoplayer?video=123',
                  expires: '2019-02-05T08:00:00+08:00',
                },
                recipeIngredient: [
                  '2 cups of flour',
                  '3/4 cup white sugar',
                  '2 teaspoons baking powder',
                  '1/2 teaspoon salt',
                  '1/2 cup butter',
                  '2 eggs',
                  '3/4 cup milk',
                ],
                recipeInstructions: [
                  {
                    '@type': 'HowToStep',
                    name: 'Preheat',
                    text:
                      'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
                    url: 'https://example.com/party-coffee-cake#step1',
                    image:
                      'https://example.com/photos/party-coffee-cake/step1.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Mix dry ingredients',
                    text:
                      'In a large bowl, combine flour, sugar, baking powder, and salt.',
                    url: 'https://example.com/party-coffee-cake#step2',
                    image:
                      'https://example.com/photos/party-coffee-cake/step2.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Spread into pan',
                    text: 'Spread into the prepared pan.',
                    url: 'https://example.com/party-coffee-cake#step4',
                    image:
                      'https://example.com/photos/party-coffee-cake/step4.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Bake',
                    text: 'Bake for 30 to 35 minutes, or until firm.',
                    url: 'https://example.com/party-coffee-cake#step5',
                    image:
                      'https://example.com/photos/party-coffee-cake/step5.jpg',
                  },
                ],
              },
            },
            {
              '@type': 'ListItem',
              position: '2',
              item: {
                '@context': 'https://schema.org/',
                '@type': 'Recipe',
                name: 'Party Coffee Cake 2',
                url: 'http://example.com/recipe-2.html',
                description:
                  'This coffee cake is awesome and perfect for parties.',
                datePublished: '2018-03-10',
                author: { '@type': 'Person', name: 'Mary Stone 2' },
                image: [
                  'https://example.com/photos/1x1/photo.jpg',
                  'https://example.com/photos/4x3/photo.jpg',
                  'https://example.com/photos/16x9/photo.jpg',
                ],
                prepTime: 'PT20M',
                cookTime: 'PT30M',
                totalTime: 'PT50M',
                keywords: 'cake for a party, coffee',
                recipeYield: '10',
                recipeCategory: 'Dessert',
                recipeCuisine: 'American',
                nutrition: {
                  '@type': 'NutritionInformation',
                  calories: '270 calories',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '5',
                  ratingCount: '18',
                },
                video: {
                  '@type': 'VideoObject',
                  name: 'How to make a Party Coffee Cake',
                  thumbnailUrl: [
                    'https://example.com/photos/1x1/photo.jpg',
                    'https://example.com/photos/4x3/photo.jpg',
                    'https://example.com/photos/16x9/photo.jpg',
                  ],
                  description: 'This is how you make a Party Coffee Cake.',
                  contentUrl: 'http://www.example.com/video123.mp4',
                  uploadDate: '2018-02-05T08:00:00+08:00',
                  duration: 'PT1M33S',
                  embedUrl: 'http://www.example.com/videoplayer?video=123',
                  expires: '2019-02-05T08:00:00+08:00',
                },
                recipeIngredient: [
                  '2 cups of flour',
                  '3/4 cup white sugar',
                  '2 teaspoons baking powder',
                  '1/2 teaspoon salt',
                  '1/2 cup butter',
                  '2 eggs',
                  '3/4 cup milk',
                ],
                recipeInstructions: [
                  {
                    '@type': 'HowToStep',
                    name: 'Preheat',
                    text:
                      'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
                    url: 'https://example.com/party-coffee-cake#step1',
                    image:
                      'https://example.com/photos/party-coffee-cake/step1.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Mix dry ingredients',
                    text:
                      'In a large bowl, combine flour, sugar, baking powder, and salt.',
                    url: 'https://example.com/party-coffee-cake#step2',
                    image:
                      'https://example.com/photos/party-coffee-cake/step2.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Spread into pan',
                    text: 'Spread into the prepared pan.',
                    url: 'https://example.com/party-coffee-cake#step4',
                    image:
                      'https://example.com/photos/party-coffee-cake/step4.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Bake',
                    text: 'Bake for 30 to 35 minutes, or until firm.',
                    url: 'https://example.com/party-coffee-cake#step5',
                    image:
                      'https://example.com/photos/party-coffee-cake/step5.jpg',
                  },
                ],
              },
            },
          ],
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });
});
