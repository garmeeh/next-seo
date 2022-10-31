import React from 'react';
import { ArticleJsonLd } from '../../../..';

const Article = () => (
  <>
    <h1>Article</h1>
    <p>Inspect page for output.</p>
    <ArticleJsonLd
      useAppDir={true}
      url="https://example.com/article"
      title="Article headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName={[
        {
          name: 'Jane Blogs',
          url: 'https://example.com',
        },
        {
          name: 'Mary Stone',
          url: 'https://example.com',
        },
      ]}
      publisherName="Kali Skye"
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description="This is a mighty good description of this article."
      isAccessibleForFree={true}
    />
  </>
);

export default Article;
