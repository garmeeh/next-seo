import { Author, isAuthor } from '../types';

export const formatAuthorName = (authorName: string | string[]) =>
  Array.isArray(authorName)
    ? authorName.map(name => ({ '@type': 'Person', name: name }))
    : { '@type': 'Person', name: authorName };

export const buildAuthor = (
  author: Author | Author[] | string | string[] | undefined | null,
) => {
  if (author === undefined || author === null) {
    return '';
  }
  return Array.isArray(author)
    ? author.map(author =>
        isAuthor(author)
          ? formatSingleAuthor(author)
          : formatAuthorName(author),
      )
    : isAuthor(author)
    ? formatSingleAuthor(author)
    : formatAuthorName(author);
};

export const formatAuthors = (author: Author[]) =>
  author.map(formatSingleAuthor);

export const formatSingleAuthor = (author: Author) => {
  return {
    '@type': author.type,
    name: author.name,
    url: author.url,
  };
};
