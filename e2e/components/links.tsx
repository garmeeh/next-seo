import React from 'react';
import Link from 'next/link';

const Links = () => (
  <>
    <ul>
      <li>
        <Link href="/">
          <a>Default SEO</a>
        </Link>
      </li>
      <li>
        <Link href="/robots">
          <a>All Robots props</a>
        </Link>
      </li>
      <li>
        <Link href="/article">
          <a>Article SEO</a>
        </Link>
      </li>
      <li>
        <Link href="/book">
          <a>Book SEO</a>
        </Link>
      </li>
      <li>
        <Link href="/profile">
          <a>Profile SEO</a>
        </Link>
      </li>
      <li>
        <Link href="/overridden">
          <a>Overridden Seo</a>
        </Link>
      </li>
      <li>
        <Link href="/jsonld">
          <a>All JSON-LD</a>
        </Link>
      </li>
      <li>
        <Link href="/carousel-jsonld/default">
          <a>Carousel Default JSON-LD</a>
        </Link>
      </li>
      <li>
        <Link href="/carousel-jsonld/course">
          <a>Carousel Course JSON-LD</a>
        </Link>
      </li>
      <li>
        <Link href="/carousel-jsonld/movie">
          <a>Carousel Movie JSON-LD</a>
        </Link>
      </li>
      <li>
        <Link href="/carousel-jsonld/recipe">
          <a>Carousel Recipe JSON-LD</a>
        </Link>
      </li>
      <li>
        <Link href="/product-jsonld/aggregateOffer">
          <a>Product JSON-LD AggregateOffer</a>
        </Link>
      </li>
      <li>
        <Link href="/product-jsonld/offers">
          <a>Product JSON-LD Offers</a>
        </Link>
      </li>
      <li>
        <Link href="/product-jsonld/aggregateOfferAndOffers">
          <a>Product JSON-LD AggregateOffer and Offers</a>
        </Link>
      </li>
    </ul>
    <h3> Dangerously </h3>
    <ul>
      <li>
        <Link href="/dangerously/noindex">
          <a>Dangerously AllPagesToNoIndex</a>
        </Link>
      </li>
      <li>
        <Link href="/dangerously/nofollow">
          <a>Dangerously AllPagesToNoFollow</a>
        </Link>
      </li>
      <li>
        <Link href="/dangerously/nofollow-and-noindex">
          <a>Dangerously AllPagesToNoFollow and AllPagesToNoIndex</a>
        </Link>
      </li>
    </ul>
  </>
);

export default Links;
