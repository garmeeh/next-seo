import React from 'react';
import { render, screen } from '@testing-library/react';

import ImageJsonLd, { ImageJsonLdProps } from '../image';
import { stringify } from '../../utils/toJson';

describe('Image JSON-LD', () => {
  it('renders as object with one image in array', () => {
    const props: ImageJsonLdProps = {
      images: [
        {
          contentUrl: 'https://example.com/image',
          creator: {
            '@type': 'Person',
            name: 'nameString',
          },
          creditText: 'creditTextString',
          copyrightNotice: 'copyrightNoticeString',
          license: 'https://example.com/license',
          acquireLicensePage: 'https://example.com/acquire-license',
        },
      ],
      scriptId: 'jsonld-image',
    };

    render(<ImageJsonLd {...props} />);

    const script = screen.getByTestId('jsonld-image');

    const expected = {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      contentUrl: 'https://example.com/image',
      creator: {
        '@type': 'Person',
        name: 'nameString',
      },
      creditText: 'creditTextString',
      copyrightNotice: 'copyrightNoticeString',
      license: 'https://example.com/license',
      acquireLicensePage: 'https://example.com/acquire-license',
    };

    expect(script.innerHTML).toEqual(stringify(expected));
  });

  it('renders as array with two images in array', () => {
    const props: ImageJsonLdProps = {
      images: [
        {
          contentUrl: 'https://example.com/image',
          creator: {
            '@type': 'Person',
            name: 'nameString',
          },
          creditText: 'creditTextString',
          copyrightNotice: 'copyrightNoticeString',
          license: 'https://example.com/license',
          acquireLicensePage: 'https://example.com/acquire-license',
        },
        {
          contentUrl: 'https://example.com/image2',
          creator: {
            '@type': 'Person',
            name: 'nameString2',
          },
          creditText: 'creditTextString2',
          copyrightNotice: 'copyrightNoticeString2',
          license: 'https://example.com/license2',
          acquireLicensePage: 'https://example.com/acquire-license2',
        },
      ],
      scriptId: 'jsonld-image',
    };

    render(<ImageJsonLd {...props} />);

    const script = screen.getByTestId('jsonld-image');

    const expected = [
      {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        contentUrl: 'https://example.com/image',
        creator: {
          '@type': 'Person',
          name: 'nameString',
        },
        creditText: 'creditTextString',
        copyrightNotice: 'copyrightNoticeString',
        license: 'https://example.com/license',
        acquireLicensePage: 'https://example.com/acquire-license',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        contentUrl: 'https://example.com/image2',
        creator: {
          '@type': 'Person',
          name: 'nameString2',
        },
        creditText: 'creditTextString2',
        copyrightNotice: 'copyrightNoticeString2',
        license: 'https://example.com/license2',
        acquireLicensePage: 'https://example.com/acquire-license2',
      },
    ];

    expect(script.innerHTML).toEqual(stringify(expected));
  });
});
