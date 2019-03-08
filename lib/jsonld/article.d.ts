/// <reference types="react" />
declare const ArticleJsonLd: (
  {
    url,
    title,
    images,
    datePublished,
    dateModified,
    authorName,
    description,
    publisherName,
    publisherLogo,
  }: {
    url: any;
    title: any;
    images?: any[];
    datePublished: any;
    dateModified?: any;
    authorName: any;
    description: any;
    publisherName: any;
    publisherLogo: any;
  },
) => JSX.Element;
export default ArticleJsonLd;
