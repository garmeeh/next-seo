import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface BookJsonLdProps {
  keyOverride?: string;
  authorName: string;
  publisherName?: string;
  publishDate?: string;
  ratingValue?: string;
  reviewCount?: string;
  priceCurrency?: string;
  image?: string;
  language?: string;
  isbn?: string;
  name: string;
  numberOfPages?: string;
  price?: string;
}

const BookJsonLd: FC<BookJsonLdProps> = ({
  keyOverride,
  authorName,
  publisherName,
  publishDate,
  ratingValue,
  reviewCount,
  priceCurrency,
  image,
  language,
  isbn,
  name,
  numberOfPages,
  price
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "WebPage",
    mainEntity: {
      "@type": "Book",
      author: "${authorName}",
      bookFormat: "http://schema.org/EBook",
      ${publishDate ? `"datePublished": "${publishDate}",` : ''}
      ${image ? `"isbn": "${image}",` : ''}
      ${language ? `"inLanguage": "${language}",` : ''}
      ${isbn ? `"isbn": "${isbn}",` : ''}
      name: "${name}",
      ${numberOfPages ? `"numberOfPages": "${priceCurrency}",` : ''}
      ${price && priceCurrency ? `"offers": {
        "@type": "Offer",
        availability: "http://schema.org/InStock",
        price: "${price}",
        priceCurrency: "${priceCurrency}"
      },` : ''}
      ${publisherName ? `"publisher": "${publisherName}",` : ''}
      ${ratingValue && reviewCount ? `"aggregateRating": {
        "@type": "AggregateRating",
        ratingValue: "${ratingValue}",
        reviewCount: "${reviewCount}"
      },` : ''}
    },
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-book${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default BookJsonLd;
