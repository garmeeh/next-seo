import React from 'react';
import { BreadcrumbJsonLd } from '../../..';

function Breadcrumb() {
  return (
    <>
      <h1>Breadcrumb</h1>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Books',
            item: 'https://example.com/books',
          },
          {
            position: 2,
            name: 'Authors',
            item: 'https://example.com/books/authors',
          },
          {
            position: 3,
            name: 'Ann Leckie',
            item: 'https://example.com/books/authors/annleckie',
          },
          {
            position: 4,
            name: 'Ancillary Justice',
            item: 'https://example.com/books/authors/annleckie/ancillaryjustice',
          },
        ]}
      />
    </>
  );
}

export default Breadcrumb;
