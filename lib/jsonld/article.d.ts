import { FC } from 'react';
export interface ArticleJsonLdProps {
  keyOverride?: string;
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  datePublished: string;
  dateModified?: string;
  authorName: string | string[];
  description: string;
  publisherName: string;
  publisherLogo: string;
}
declare const ArticleJsonLd: FC<ArticleJsonLdProps>;
export default ArticleJsonLd;
