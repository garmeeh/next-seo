import React from 'react';
import Link from 'next/link';

const allJsonLDPages = [
  'article',
  'blog',
  'brand',
  'breadcrumb',
  'collectionPage',
  'corporateContact',
  'course',
  'dataset',
  'even',
  'faq',
  'howTo',
  'jobPosting',
  'localBusiness',
  'logo',
  'newsarticle',
  'organization',
  'product',
  'profilePage',
  'qaPage',
  'recipe',
  'siteLinksSearchBox',
  'social',
  'softwareApp',
  'video',
  'videoGame',
  'webPage',
  'webPage2',
];

const Home = () => (
  <>
    <h1>All JSON-LD Pages</h1>
    {allJsonLDPages.map(page => (
      <li key={page}>
        <Link href={`/jsonld/${page}`}>
          <a>{page}</a>
        </Link>
      </li>
    ))}
  </>
);

export default Home;
