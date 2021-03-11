import { FC } from 'react';
export interface NewsArticleJsonLdProps {
  keyOverride?: string;
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  section: string;
  keywords: string;
  dateCreated: string;
  datePublished: string;
  dateModified?: string;
  authorName: string | string[];
  description: string;
  body: string;
  publisherName: string;
  publisherLogo: string;
}
declare const NewsArticleJsonLd: FC<NewsArticleJsonLdProps>;
export default NewsArticleJsonLd;
