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
      <Link href="/updated-title-template">
        <a>Updated Title Template</a>
      </Link>
    </li>
  </ul>
);

export default Links;
