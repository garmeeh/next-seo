import React from "react";
import type { DefaultSeoProps } from "../types";
import { WithHead } from "./WithHead";

/**
 * DefaultSeo component for setting global SEO defaults in Next.js Pages Router
 *
 * @example
 * ```tsx
 * // pages/_app.tsx
 * import { DefaultSeo } from 'next-seo/pages';
 *
 * export default function MyApp({ Component, pageProps }) {
 *   return (
 *     <>
 *       <DefaultSeo
 *         titleTemplate="MySite | %s"
 *         defaultTitle="MySite"
 *         description="Default site description"
 *         openGraph={{
 *           type: 'website',
 *           locale: 'en_US',
 *           url: 'https://example.com/',
 *           siteName: 'MySite',
 *         }}
 *         twitter={{
 *           handle: '@handle',
 *           site: '@site',
 *           cardType: 'summary_large_image',
 *         }}
 *       />
 *       <Component {...pageProps} />
 *     </>
 *   );
 * }
 * ```
 */
export const DefaultSeo: React.FC<DefaultSeoProps> = ({
  title,
  titleTemplate,
  defaultTitle,
  themeColor,
  dangerouslySetAllPagesToNoIndex = false,
  dangerouslySetAllPagesToNoFollow = false,
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
  norobots,
}) => {
  return (
    <WithHead
      title={title}
      titleTemplate={titleTemplate}
      defaultTitle={defaultTitle}
      themeColor={themeColor}
      dangerouslySetAllPagesToNoIndex={dangerouslySetAllPagesToNoIndex}
      dangerouslySetAllPagesToNoFollow={dangerouslySetAllPagesToNoFollow}
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
      norobots={norobots}
    />
  );
};
