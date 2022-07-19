import { ArticleAuthor } from '../../types';

/**
 * Include name and url
 * @param author
 * @returns
 */
function includeNameAndUrl(author: ArticleAuthor): boolean {
  return typeof author === 'object' && !!(author.name && author.url);
}

export function setAuthor(
  author?: string | string[] | ArticleAuthor | ArticleAuthor[],
) {
  if (Array.isArray(author)) {
    if (typeof author[0] === 'string') {
      return author.map(name => ({
        '@type': 'Person',
        name: name,
      }));
    } else if (includeNameAndUrl(author[0])) {
      return (author as ArticleAuthor[]).map(item => ({
        '@type': 'Person',
        name: item.name,
        url: item.url,
      }));
    }
  } else if (author) {
    if (typeof author === 'string') {
      return {
        '@type': 'Person',
        name: author,
      };
    } else if (includeNameAndUrl(author)) {
      return {
        '@type': 'Person',
        name: author.name,
        url: author.url,
      };
    }
  }

  return undefined;
}
