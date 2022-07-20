import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('HowTo JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/howTo');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('HowTo', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/howTo');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      console.log(jsonLD);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to tile a kitchen backsplash',
        image: {
          '@type': 'ImageObject',
          url: 'https://example.com/photos/1x1/photo.jpg',
        },
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '100',
        },
        supply: [
          {
            '@type': 'HowToSupply',
            name: 'tiles',
          },
          {
            '@type': 'HowToSupply',
            name: 'thin-set mortar',
          },
          {
            '@type': 'HowToSupply',
            name: 'tile grout',
          },
          {
            '@type': 'HowToSupply',
            name: 'grout sealer',
          },
        ],
        tool: [
          {
            '@type': 'HowToTool',
            name: 'notched trowel',
          },
          {
            '@type': 'HowToTool',
            name: 'bucket',
          },
          {
            '@type': 'HowToTool',
            name: 'large sponge',
          },
        ],
        step: [
          {
            '@type': 'HowToStep',
            url: 'https://example.com/kitchen#step1',
            name: 'Prepare the surfaces',
            itemListElement: [
              {
                '@type': 'HowToTip',
                text: 'Turn off the power to the kitchen and then remove everything that is on the wall, such as outlet covers, switchplates, and any other item in the area that is to be tiled.',
              },
              {
                '@type': 'HowToDirection',
                text: 'Then clean the surface thoroughly to remove any grease or other debris and tape off the area.',
              },
            ],
            image: {
              '@type': 'ImageObject',
              url: 'https://example.com/photos/1x1/photo-step1.jpg',
            },
          },
        ],
        totalTime: 'P2D',
      });
    });
  });
});
