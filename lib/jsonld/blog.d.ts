/// <reference types="react" />
declare const BlogJsonLd: (
  {
    url,
    title,
    images,
    datePublished,
    dateModified,
    authorName,
    description,
  }: {
    url: any;
    title: any;
    images?: any[];
    datePublished: any;
    dateModified?: any;
    authorName: any;
    description: any;
  },
) => JSX.Element;
export default BlogJsonLd;
