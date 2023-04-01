import { ArticleAuthor } from 'src/types';
import { setAuthor } from '../setAuthor';

describe('setAuthor', () => {
  test('should return undefined if author is undefined', () => {
    expect(setAuthor(undefined)).toBeUndefined();
  });

  test('works correctly when ArticleAuthor is passed', () => {
    const author: ArticleAuthor = {
      name: 'Acme',
      type: 'Organization',
      url: '/acme',
    };

    const data = setAuthor(author);

    expect(data).toEqual({
      '@type': 'Organization',
      name: 'Acme',
      url: '/acme',
    });
  });

  test('works correctly when just ArticleAuthor name is passed', () => {
    const data = setAuthor({ name: 'John Doe' });

    expect(data).toEqual({
      '@type': 'Person',
      name: 'John Doe',
    });
  });

  test('works correctly when an array of ArticleAuthor is passed', () => {
    const author: ArticleAuthor[] = [
      {
        name: 'Acme',
        type: 'Organization',
        url: '/acme',
      },
      { name: 'John Doe' },
    ];

    const data = setAuthor(author);

    expect(data).toEqual([
      {
        '@type': 'Organization',
        name: 'Acme',
        url: '/acme',
      },
      { '@type': 'Person', name: 'John Doe' },
    ]);
  });

  test('works correctly when string is passed', () => {
    const data = setAuthor('John Doe');

    expect(data).toEqual({
      '@type': 'Person',
      name: 'John Doe',
    });
  });

  test('works correctly when an array string is passed', () => {
    const data = setAuthor(['John Doe', 'Foo Bar']);

    expect(data).toEqual([
      {
        '@type': 'Person',
        name: 'John Doe',
      },
      {
        '@type': 'Person',
        name: 'Foo Bar',
      },
    ]);
  });
});
