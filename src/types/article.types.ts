import type { ImageObject, Organization, Person, Author } from "./common.types";

export type Publisher =
  | string
  | Organization
  | Person
  | Omit<Organization, "@type">
  | Omit<Person, "@type">;

export interface ArticleBase {
  headline: string;
  url?: string;
  author?: Author | Author[];
  datePublished?: string;
  dateModified?: string;
  image?: string | ImageObject | (string | ImageObject)[];
  publisher?: Publisher;
  description?: string;
  isAccessibleForFree?: boolean;
  mainEntityOfPage?:
    | string
    | {
        "@type": "WebPage";
        "@id": string;
      };
}

export interface Article extends ArticleBase {
  "@type": "Article";
}

export interface NewsArticle extends ArticleBase {
  "@type": "NewsArticle";
}

export interface BlogPosting extends ArticleBase {
  "@type": "BlogPosting";
}

export interface Blog extends ArticleBase {
  "@type": "Blog";
}

export type ArticleJsonLdProps = (
  | Omit<Article, "@type">
  | Omit<NewsArticle, "@type">
  | Omit<BlogPosting, "@type">
  | Omit<Blog, "@type">
) & {
  type?: "Article" | "NewsArticle" | "BlogPosting" | "Blog";
  scriptId?: string;
  scriptKey?: string;
};
