import Head from 'next/head';
import React, { FC } from 'react';

import { Video } from '../types';
import buildVideo from '../utils/buildVideo';
import markup from '../utils/markup';

export interface VideoJsonLdProps extends Video {
  keyOverride?: string;
}

const VideoJsonLd: FC<VideoJsonLdProps> = ({
  keyOverride,
  name,
  description,
  thumbnailUrls,
  uploadDate,
  contentUrl,
  duration,
  embedUrl,
  expires,
  hasPart,
  watchCount,
  publication,
  regionsAllowed,
}) => {
  const jslonld = buildVideo(
    {
      name,
      description,
      thumbnailUrls,
      uploadDate,
      contentUrl,
      duration,
      embedUrl,
      expires,
      hasPart,
      watchCount,
      publication,
      regionsAllowed,
    },
    true,
  );

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-video${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default VideoJsonLd;
