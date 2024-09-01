import { render, screen } from '@testing-library/react';
import React from 'react';

import QAPageJsonLd, { QAPageJsonLdProps } from '../qaPage';

describe('QAPage JSON-LD', () => {
  it('renders author with given URL', () => {
    const props: QAPageJsonLdProps = {
      mainEntity: {
        '@type': 'Question',
        name: 'nameString',
        text: 'textString',
        author: {
          name: 'johndoe',
          url: 'https://example.com/author/johndoe',
        },
      },
      scriptId: 'jsonld-qa-page',
    };

    render(<QAPageJsonLd {...props} />);

    const script = screen.getByTestId('jsonld-qa-page');

    const expected = {
      '@context': 'https://schema.org',
      '@type': 'QAPage',
      mainEntity: {
        '@type': 'Question',
        name: 'nameString',
        text: 'textString',
        author: {
          '@type': 'Person',
          name: 'johndoe',
          url: 'https://example.com/author/johndoe',
        },
      },
    };

    expect(script.innerHTML).toEqual(JSON.stringify(expected));
  });

  it('renders author default JSON with name only', () => {
    const props: QAPageJsonLdProps = {
      mainEntity: {
        '@type': 'Question',
        name: 'nameString',
        text: 'textString',
        author: 'johndoe',
      },
      scriptId: 'jsonld-qa-page',
    };

    render(<QAPageJsonLd {...props} />);

    const script = screen.getByTestId('jsonld-qa-page');

    const expected = {
      '@context': 'https://schema.org',
      '@type': 'QAPage',
      mainEntity: {
        '@type': 'Question',
        name: 'nameString',
        text: 'textString',
        author: {
          '@type': 'Person',
          name: 'johndoe',
        },
      },
    };

    expect(script.innerHTML).toEqual(JSON.stringify(expected));
  });
});
