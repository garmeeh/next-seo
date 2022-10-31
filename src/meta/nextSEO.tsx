import React from 'react';
import buildTags from './buildTags';

import { NextSeoProps } from '../types';
import { WithHead } from './withHead';

export const NextSeo = ({
  title,
  themeColor,
  noindex = false,
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
  useAppDir = false,
}: NextSeoProps) => {
  return (
    <>
      {useAppDir ? (
        buildTags({
          title,
          themeColor,
          noindex,
          nofollow,
          robotsProps,
          description,
          canonical,
          facebook,
          openGraph,
          additionalMetaTags,
          twitter,
          titleTemplate,
          defaultTitle,
          mobileAlternate,
          languageAlternates,
          additionalLinkTags,
        })
      ) : (
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
      )}
    </>
  );
};
