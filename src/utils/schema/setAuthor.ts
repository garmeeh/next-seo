import { ArticleAuthor } from '../../types';

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
  } else if (!!author.name) {
    return {
      '@type': author?.type ?? 'Person',
      name: author.name,
      url: author?.url,
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
