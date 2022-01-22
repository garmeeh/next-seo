export function setAuthor(authorName?: string | string[]) {
  if (Array.isArray(authorName)) {
    return authorName.map(author => ({ '@type': 'Person', name: author }));
  } else if (authorName) {
    return { '@type': 'Person', name: authorName };
  }

  return undefined;
}
