import React from 'react';
import { ImageJsonLd } from '../../..';

function Image() {
  return (
    <>
      <h1>Image</h1>
      <ImageJsonLd
        images={[
          {
            contentUrl: 'http://www.example.com/images/image.png',
            creator: {
              '@type': 'Person',
              name: 'Jane Doe',
            },
            creditText: 'Jane Doe',
            copyrightNotice: '© Jane Doe',
            license: 'http://www.example.com/license',
            acquireLicensePage: 'http://www.example.com/acquire-license',
          },
        ]}
      />
    </>
  );
}

export default Image;
