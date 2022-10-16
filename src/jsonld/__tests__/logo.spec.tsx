import React from 'react';
import { render, screen } from '@testing-library/react';

import LogoJsonLd, { LogoJsonLdProps } from '../logo';
import { stringify } from '../../utils/toJson';

describe('Logo JSON-LD', () => {
  it('renders with all props', () => {
    const props: LogoJsonLdProps = {
      logo: 'https://example.com/logo.png',
      url: 'https://example.com',
      scriptId: 'jsonld-logo',
    };

    render(<LogoJsonLd {...props} />);

    const script = screen.getByTestId('jsonld-logo');

    const expected = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      logo: 'https://example.com/logo.png',
      url: 'https://example.com',
    };

    expect(script.innerHTML).toEqual(stringify(expected));
  });
});
