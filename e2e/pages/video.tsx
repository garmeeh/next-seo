import React from 'react';
import { NextSeo } from '../..';
import Links from '../components/links';

const Video = () => (
  <>
    <NextSeo
      title="Video Page Title"
      description="Description of video page"
      openGraph={{
        title: 'Open Graph Video Title',
        description: 'Description of open graph video',
        url: 'https://www.example.com/videos/video-title',
        type: 'video.movie',
        video: {
          // Multiple Open Graph authors is only available in version `7.0.2-canary.35`+ of next
          actors: [
            {
              profile: 'https://www.example.com/actors/@firstnameA-lastnameA',
              role: 'Protagonist',
            },
            {
              profile: 'https://www.example.com/actors/@firstnameB-lastnameB',
              role: 'Antagonist',
            },
          ],
          // Multiple Open Graph authors is only available in version `7.0.2-canary.35`+ of next
          directors: [
            'https://www.example.com/directors/@firstnameA-lastnameA',
            'https://www.example.com/directors/@firstnameB-lastnameB',
          ],
          // Multiple Open Graph authors is only available in version `7.0.2-canary.35`+ of next
          writers: [
            'https://www.example.com/writers/@firstnameA-lastnameA',
            'https://www.example.com/writers/@firstnameB-lastnameB',
          ],
          duration: 680000,
          releaseDate: '2022-12-21T22:04:11Z',
          // Multiple Open Graph tags is only available in version `7.0.2-canary.35`+ of next
          tags: ['Tag A', 'Tag B', 'Tag C'],
        },
        // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next
        images: [
          {
            url: 'https://www.test.ie/og-image-video-title-01.jpg',
            width: 850,
            height: 650,
            alt: 'Og Image Alt Video Title A',
          },
          {
            url: 'https://www.test.ie/og-image-video-title-02.jpg',
            width: 950,
            height: 850,
            alt: 'Og Image Alt Video Title B',
          },
          {
            url: 'https://www.test.ie/og-image-video-title-03.jpg',
            width: 600,
            height: 400,
            alt: 'Og Image Alt Video Title C',
          },
          {
            url: 'https://www.test.ie/og-image-video-title-04.jpg',
            width: 400,
            height: 400,
            alt: 'Og Image Alt Video Title D',
          },
        ],
        site_name: 'SiteName',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    <h1>Video Page SEO</h1>
    <Links />
  </>
);

export default Video;
