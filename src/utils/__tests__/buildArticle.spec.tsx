import { formatAuthorName, buildAuthor } from '../buildArticle';
import { Author } from '../../types';

it('supports no or empty authors', () => {
  expect(buildAuthor(null)).toStrictEqual('');
  expect(buildAuthor(undefined)).toStrictEqual('');
  expect(buildAuthor([])).toStrictEqual([]);
});

it('format an author from a string', () => {
  expect(formatAuthorName('John Doe')).toHaveProperty('name', 'John Doe');
  expect(formatAuthorName('John Doe')).toHaveProperty('@type', 'Person');
});

it('build an author from an Author', () => {
  const author1: Author = {
    type: 'Person',
    name: 'John Doe',
    url: 'https://www.example.com/author/johndoe123',
  };
  const author2: Author = {
    type: 'Person',
    name: 'Jane Roe',
    url: 'https://www.example.com/author/janeroe123',
  };
  const author3: Author = {
    type: 'Organization',
    name: 'Acme',
    url: 'https://www.example.com/organization/acme123',
  };
  expect(buildAuthor(author1)).toHaveProperty('@type', 'Person');
  expect(buildAuthor(author2)).toHaveProperty('@type', 'Person');
  expect(buildAuthor(author3)).toHaveProperty('@type', 'Organization');
  expect(buildAuthor(author1)).toHaveProperty('name', 'John Doe');
  expect(buildAuthor(author2)).toHaveProperty('name', 'Jane Roe');
  expect(buildAuthor(author3)).toHaveProperty('name', 'Acme');
  expect(buildAuthor(author1)).toHaveProperty(
    'url',
    'https://www.example.com/author/johndoe123',
  );
  expect(buildAuthor(author2)).toHaveProperty(
    'url',
    'https://www.example.com/author/janeroe123',
  );
  expect(buildAuthor(author3)).toHaveProperty(
    'url',
    'https://www.example.com/organization/acme123',
  );
});
it('build an author from an array of Author', () => {
  const authors: Author[] = [
    {
      type: 'Person',
      name: 'John Doe',
      url: 'https://www.example.com/author/johndoe123',
    },
    {
      type: 'Person',
      name: 'Jane Roe',
      url: 'https://www.example.com/author/janeroe123',
    },
    {
      type: 'Organization',
      name: 'Acme',
      url: 'https://www.example.com/organization/acme123',
    },
  ];
  expect(buildAuthor(authors)).toStrictEqual([
    {
      '@type': 'Person',
      name: 'John Doe',
      url: 'https://www.example.com/author/johndoe123',
    },
    {
      '@type': 'Person',
      name: 'Jane Roe',
      url: 'https://www.example.com/author/janeroe123',
    },
    {
      '@type': 'Organization',
      name: 'Acme',
      url: 'https://www.example.com/organization/acme123',
    },
  ]);
});

it('build an author from a string or an array of string', () => {
  expect(buildAuthor('John Doe')).toStrictEqual({
    '@type': 'Person',
    name: 'John Doe',
  });
  expect(buildAuthor(['John Doe', 'Jane Roe'])).toStrictEqual([
    {
      '@type': 'Person',
      name: 'John Doe',
    },
    {
      '@type': 'Person',
      name: 'Jane Roe',
    },
  ]);
});
