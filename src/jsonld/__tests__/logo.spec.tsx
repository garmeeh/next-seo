import React from 'react';
import { render, screen } from '@testing-library/react';

import LogoJsonLd from '../logo';
import { stringify } from '../../utils/toJson';

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <LogoJsonLd
        logo="https://example.com/logo.png"
        url="https://example.com"
        scriptId="jsonld-logo"
      />,
    );

    const script = screen.getByTestId('jsonld-logo');
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      logo: 'https://example.com/logo.png',
      url: 'https://example.com',
    };

    expect(script.innerHTML).toEqual(stringify(data));
  });
});
