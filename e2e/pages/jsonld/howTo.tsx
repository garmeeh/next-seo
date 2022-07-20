import React from 'react';
import { HowToJsonLd } from '../../..';

function HowTo() {
  return (
    <>
      <h1>HowTo</h1>
      <HowToJsonLd
        name="How to tile a kitchen backsplash"
        image="https://example.com/photos/1x1/photo.jpg"
        estimatedCost={{ currency: 'USD', value: '100' }}
        supply={['tiles', 'thin-set mortar', 'tile grout', 'grout sealer']}
        tool={['notched trowel', 'bucket', 'large sponge']}
        step={[
          {
            url: 'https://example.com/kitchen#step1',
            name: 'Prepare the surfaces',
            itemListElement: [
              {
                type: 'HowToTip',
                text: 'Turn off the power to the kitchen and then remove everything that is on the wall, such as outlet covers, switchplates, and any other item in the area that is to be tiled.',
              },
              {
                type: 'HowToDirection',
                text: 'Then clean the surface thoroughly to remove any grease or other debris and tape off the area.',
              },
            ],
            image: 'https://example.com/photos/1x1/photo-step1.jpg',
          },
        ]}
        totalTime="P2D"
      />
    </>
  );
}

export default HowTo;
