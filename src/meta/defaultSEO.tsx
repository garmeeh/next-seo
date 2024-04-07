import React from 'react';

import { DefaultSeoProps } from '../types';
import { WithHead } from './withHead';

export const DefaultSeo = ({
  title,
  titleTemplate,
  defaultTitle,
  themeColor,
  dangerouslySetAllPagesToNoIndex = false,
  dangerouslySetAllPagesToNoFollow = false,
  dangerouslySetAllPagesToNoRobots = false,
  description,
  canonical,
  facebook,
  openGraph,
  additionalMetaTags,
  twitter,
  defaultOpenGraphImageWidth,
  defaultOpenGraphImageHeight,
  defaultOpenGraphVideoWidth,
  defaultOpenGraphVideoHeight,
  mobileAlternate,
  languageAlternates,
  additionalLinkTags,
  robotsProps,
}: DefaultSeoProps) => {
  return (
    <WithHead
      title={title}
      titleTemplate={titleTemplate}
      defaultTitle={defaultTitle}
      themeColor={themeColor}
      dangerouslySetAllPagesToNoIndex={dangerouslySetAllPagesToNoIndex}
      dangerouslySetAllPagesToNoFollow={dangerouslySetAllPagesToNoFollow}
      dangerouslySetAllPagesToNoRobots={dangerouslySetAllPagesToNoRobots}
      description={description}
      canonical={canonical}
      facebook={facebook}
      openGraph={openGraph}
      additionalMetaTags={additionalMetaTags}
      twitter={twitter}
      defaultOpenGraphImageWidth={defaultOpenGraphImageWidth}
      defaultOpenGraphImageHeight={defaultOpenGraphImageHeight}
      defaultOpenGraphVideoWidth={defaultOpenGraphVideoWidth}
      defaultOpenGraphVideoHeight={defaultOpenGraphVideoHeight}
      mobileAlternate={mobileAlternate}
      languageAlternates={languageAlternates}
      additionalLinkTags={additionalLinkTags}
      robotsProps={robotsProps}
    />
  );
};
