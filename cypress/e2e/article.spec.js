import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Article JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/article');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Article', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props(old)', () => {
    cy.visit('http://localhost:3000/jsonld/articleOld');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
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

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/article');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
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
            url: 'https://example.com',
          },
          {
            '@type': 'Person',
            name: 'Mary Stone',
            url: 'https://example.com',
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
        isAccessibleForFree: true,
      });
    });
  });

  it('matches schema when type BlogPosting', () => {
    cy.visit('http://localhost:3000/jsonld/blog');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('BlogPosting', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props when type BlogPosting', () => {
    cy.visit('http://localhost:3000/jsonld/blog');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
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
});
