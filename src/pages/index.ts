/**
 * Next SEO - Pages Router Components
 *
 * For use with Next.js Pages Router only.
 * Import from 'next-seo/pages'
 */

// Export tag generation functions for direct use in Next.js <Head>
export { generateNextSeo, generateDefaultSeo } from "./core/buildTags";

// Export all types for TypeScript users
export type {
  NextSeoProps,
  DefaultSeoProps,
  OpenGraph,
  OpenGraphMedia,
  OpenGraphProfile,
  OpenGraphBook,
  OpenGraphArticle,
  OpenGraphVideo,
  OpenGraphVideoActors,
  Twitter,
  MobileAlternate,
  LanguageAlternate,
  LinkTag,
  MetaTag,
  BaseMetaTag,
  HTML5MetaTag,
  RDFaMetaTag,
  HTTPEquivMetaTag,
  AdditionalRobotsProps,
  ImagePrevSize,
} from "./types";
