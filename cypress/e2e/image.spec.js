import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Image JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/image');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Image Metadata', '1.0.0')(jsonLD);
    });
  });

  it('array matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/imageArray');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Image Metadata', '1.0.0')(jsonLD[0]);
      assertSchema(schemas)('Image Metadata', '1.0.0')(jsonLD[1]);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/image');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        contentUrl: 'http://www.example.com/images/image.png',
        creator: {
          '@type': 'Person',
          name: 'Jane Doe',
        },
        creditText: 'Jane Doe',
        copyrightNotice: '© Jane Doe',
        license: 'http://www.example.com/license',
        acquireLicensePage: 'http://www.example.com/acquire-license',
      });
    });
  });
});
