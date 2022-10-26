import React from 'react';
import { ImageJsonLd } from '../../..';

function ImageArray() {
  return (
    <>
      <h1>Image Array</h1>
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
          {
            contentUrl: 'http://www.example.com/images/image2.png',
            creator: {
              '@type': 'Organisation',
              name: 'John Doe',
            },
            creditText: 'John Doe',
            copyrightNotice: '© John Doe',
            license: 'http://www.example.com/license2',
            acquireLicensePage: 'http://www.example.com/acquire-license2',
          },
        ]}
      />
    </>
  );
}

export default ImageArray;
