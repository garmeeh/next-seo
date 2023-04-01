import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('NewsArticle JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/newsarticle');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('NewsArticle', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/newsarticle');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
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
        description: 'This is a mighty good description of this news article.',
        articleBody: 'This is article body of news article',
        isAccessibleForFree: true,
      });
    });
  });
});
