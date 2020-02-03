import React from 'react';
import Link from 'next/link';

const Links = () => (
  <ul>
    <li>
      <Link href="/">
        <a>Default SEO</a>
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
  </ul>
);

export default Links;
