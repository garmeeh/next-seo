import React from 'react';
import { ArticleJsonLd } from '../../..';

function LiveBlogPosting() {
  return (
    <>
      <h1>LiveBlogPosting</h1>
      <ArticleJsonLd
        type="LiveBlogPosting"
        url="https://example.com/liveblog"
        title="Next.js Conf live coverage"
        images={[
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ]}
        datePublished="2023-11-03T11:00:00+02:00"
        dateModified="2023-11-03T19:00:00+02:00"
        authorName="Jane Blogs"
        description="Follow the announcements made during the 2023 Next.js Conf."
        coverageStartTime="2023-11-03T11:00:00+02:00"
        coverageEndTime="2023-11-03T19:00:00+02:00"
        liveBlogUpdate={[
          // From newer to older updates of type BlogPosting
          {
            '@type': 'BlogPosting',
            headline: 'Next.js 14: No New APIs',
            articleBody: 'Lorem ipsum dolor sit amet …',
            datePublished: '2023-11-03T18:15:00+02:00',
          },
          {
            '@type': 'BlogPosting',
            headline: 'A faster, more personalized web.',
            articleBody: 'Lorem ipsum dolor sit amet …',
            datePublished: '2023-11-03T11:30:00+02:00',
          },
          {
            '@type': 'BlogPosting',
            headline: 'Conference will start soon',
            articleBody: 'In a few hours …',
            datePublished: '2023-11-03T11:00:00+02:00',
          },
        ]}
      />
    </>
  );
}

export default LiveBlogPosting;
