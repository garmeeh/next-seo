import React from 'react';

import { NextSeoProps } from '../types';
import { WithHead } from './withHead';

export const NextSeo = ({
  title,
  themeColor,
  noindex,
  nofollow,
  robotsProps,
  description,
  canonical,
  openGraph,
  facebook,
  twitter,
  additionalMetaTags,
  titleTemplate,
  defaultTitle,
  mobileAlternate,
  languageAlternates,
  additionalLinkTags,
}: NextSeoProps) => {
  return (
    <>
      <WithHead
        title={title}
        themeColor={themeColor}
        noindex={noindex}
        nofollow={nofollow}
        robotsProps={robotsProps}
        description={description}
        canonical={canonical}
        facebook={facebook}
        openGraph={openGraph}
        additionalMetaTags={additionalMetaTags}
        twitter={twitter}
        titleTemplate={titleTemplate}
        defaultTitle={defaultTitle}
        mobileAlternate={mobileAlternate}
        languageAlternates={languageAlternates}
        additionalLinkTags={additionalLinkTags}
      />
    </>
  );
};
