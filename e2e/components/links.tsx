import React from 'react';
import Link from 'next/link';

const Links = () => (
  <>
    <ul>
      <li>
        <Link href="/">Default SEO</Link>
      </li>
      <li>
        <Link href="/robots">All Robots props</Link>
      </li>
      <li>
        <Link href="/article">Article SEO</Link>
      </li>
      <li>
        <Link href="/book">Book SEO</Link>
      </li>
      <li>
        <Link href="/profile">Profile SEO</Link>
      </li>
      <li>
        <Link href="/overridden">Overridden Seo</Link>
      </li>
      <li>
        <Link href="/jsonld">All JSON-LD</Link>
      </li>
      <li>
        <Link href="/carousel-jsonld/default">Carousel Default JSON-LD</Link>
      </li>
      <li>
        <Link href="/carousel-jsonld/course">Carousel Course JSON-LD</Link>
      </li>
      <li>
        <Link href="/carousel-jsonld/movie">Carousel Movie JSON-LD</Link>
      </li>
      <li>
        <Link href="/carousel-jsonld/recipe">Carousel Recipe JSON-LD</Link>
      </li>
      <li>
        <Link href="/product-jsonld/aggregateOffer">
          Product JSON-LD AggregateOffer
        </Link>
      </li>
      <li>
        <Link href="/product-jsonld/offers">Product JSON-LD Offers</Link>
      </li>
      <li>
        <Link href="/product-jsonld/aggregateOfferAndOffers">
          Product JSON-LD AggregateOffer and Offers
        </Link>
      </li>
    </ul>
    <h3> Dangerously </h3>
    <ul>
      <li>
        <Link href="/dangerously/noindex">Dangerously AllPagesToNoIndex</Link>
      </li>
      <li>
        <Link href="/dangerously/nofollow">Dangerously AllPagesToNoFollow</Link>
      </li>
      <li>
        <Link href="/dangerously/nofollow-and-noindex">
          Dangerously AllPagesToNoFollow and AllPagesToNoIndex
        </Link>
      </li>
    </ul>
  </>
);

export default Links;
