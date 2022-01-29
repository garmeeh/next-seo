import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('FAQPage JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/faq');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('FAQPage', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/faq');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
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
});
