import React from 'react';
import { render, screen } from '@testing-library/react';

import DatasetJsonLd, { DatasetJsonLdProps } from '../dataset';
import { stringify } from '../../utils/toJson';

describe('Dataset JSON-LD', () => {
  it('renders with all props', () => {
    const props: DatasetJsonLdProps = {
      description: 'A description',
      name: 'A name',
      scriptId: 'jsonld-dataset',
    };

    render(<DatasetJsonLd {...props} />);

    const script = screen.getByTestId('jsonld-dataset');

    const expected = {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      description: 'A description',
      name: 'A name',
    };

    expect(script.innerHTML).toEqual(stringify(expected));
  });
});
