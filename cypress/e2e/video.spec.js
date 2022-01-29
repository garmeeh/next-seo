import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Video JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/video');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Video', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/video');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);

      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Cat video',
        duration: 'P10M',
        uploadDate: '2019-07-19',
        thumbnailUrl: ['http://www.example.com/cat.jpg'],
        description: 'Watch this cat jump over a fence!',
        contentUrl: 'http://www.example.com/cat_video_full.mp4',
        regionsAllowed: 'US',
        hasPart: [
          {
            '@type': 'Clip',
            name: 'Cat jumps',
            startOffset: 30,
            endOffset: 45,
            url: 'http://www.example.com/example?t=30',
          },
          {
            '@type': 'Clip',
            name: 'Cat misses the fence',
            startOffset: 111,
            endOffset: 150,
            url: 'http://www.example.com/example?t=111',
          },
        ],
        publication: [
          {
            '@type': 'BroadcastEvent',
            isLiveBroadcast: true,
            startDate: '2018-10-27T14:00:00+00:00',
            endDate: '2018-10-27T14:37:14+00:00',
          },
        ],
      });
    });
  });
});
