import { ArticleAuthor } from '../../types';

/**
 * Include name and url
 * @param author
 * @returns
 */
function includeNameAndUrl(author: ArticleAuthor): boolean {
  return typeof author === 'object' && !!(author.name && author.url);
}

/**
 * Generate author information
 * @param author
 * @returns
 */
function generateAuthorInfo(author: string | ArticleAuthor) {
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

  return;
}

export function setAuthor(
  author?: string | string[] | ArticleAuthor | ArticleAuthor[],
) {
  if (Array.isArray(author)) {
    return author.map(item => generateAuthorInfo(item)).filter(item => !!item);
  } else if (author) {
    return generateAuthorInfo(author);
  }

  return;
}
