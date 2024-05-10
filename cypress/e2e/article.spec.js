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

  it('matches schema when type LiveBlogPosting', () => {
    cy.visit('http://localhost:3000/jsonld/liveBlogPosting');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('LiveBlogPosting', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props when type LiveBlogPosting', () => {
    cy.visit('http://localhost:3000/jsonld/liveBlogPosting');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'LiveBlogPosting',
        datePublished: '2023-11-03T11:00:00+02:00',
        description:
          'Follow the announcements made during the 2023 Next.js Conf.',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://example.com/liveblog',
        },
        headline: 'Next.js Conf live coverage',
        image: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        dateModified: '2023-11-03T19:00:00+02:00',
        author: {
          '@type': 'Person',
          name: 'Jane Blogs',
        },
        coverageStartTime: '2023-11-03T11:00:00+02:00',
        coverageEndTime: '2023-11-03T19:00:00+02:00',
        liveBlogUpdate: [
          {
            '@type': 'BlogPosting',
            headline: 'Next.js 14: No New APIs',
            articleBody: 'Lorem ipsum dolor sit amet …',
            datePublished: '2023-11-03T18:15:00+02:00',
          },
          {
            '@type': 'BlogPosting',
            headline: 'A faster, more personalized web.',
            articleBody: 'Lorem ipsum dolor sit amet …',
            datePublished: '2023-11-03T11:30:00+02:00',
          },
          {
            '@type': 'BlogPosting',
            headline: 'Conference will start soon',
            articleBody: 'In a few hours …',
            datePublished: '2023-11-03T11:00:00+02:00',
          },
        ],
      });
    });
  });
});
