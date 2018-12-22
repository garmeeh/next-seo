import { getByText, render } from 'react-testing-library';
import React from 'react';

import buildTags from '../buildTags';

const SEO = {
  title: 'This is a test title.',
  description: 'This is a test description.',
  canonical: 'https://www.canonical.ie',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie',
    title: 'Open graph title',
    description: 'This is testing og:description.',
    defaultImageWidth: 1200,
    defaultImageHeight: 1200,
    images: [
      {
        url: 'https://www.test.ie/image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Alt text right here',
      },
      { url: 'https://www.test.ie/image-02.jpg' },
      { url: 'https://www.test.ie/image-03.jpg' },
      { url: 'https://www.test.ie/image-04.jpg' },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

it('renders correctly', () => {
  const tags = buildTags(SEO);
  const { container } = render(tags);
  expect(container).toMatchSnapshot();
});

/* eslint no-magic-numbers: 0 */
it('returns full array for default seo object', () => {
  const tags = buildTags(SEO);
  const { container } = render(tags);

  const title = getByText(
    container,
    (content, element) =>
      element.tagName.toLowerCase() === 'title' &&
      content.startsWith(`${SEO.title}`),
  );
  const index = container.querySelectorAll('meta[content="index,follow"]');
  const description = container.querySelectorAll(
    `meta[content="${SEO.description}"]`,
  );
  const descriptionTag = container.querySelectorAll('meta[name="description"]');
  const twitterCard = container.querySelectorAll(
    'meta[content="summary_large_image"]',
  );
  const twitterCardTag = container.querySelectorAll(
    'meta[name="twitter:card"]',
  );
  const twitterHandle = container.querySelectorAll(
    `meta[content="${SEO.twitter.handle}"]`,
  );
  const twitterHandleTag = container.querySelectorAll(
    'meta[name="twitter:creator"]',
  );
  const twitterSite = container.querySelectorAll(
    `meta[content="${SEO.twitter.site}"]`,
  );
  const twitterSiteTag = container.querySelectorAll(
    'meta[name="twitter:site"]',
  );
  const ogUrl = container.querySelectorAll(
    `meta[content="${SEO.openGraph.url}"]`,
  );
  const ogUrlTag = container.querySelectorAll('meta[property="og:url"]');
  const ogType = container.querySelectorAll(
    `meta[content="${SEO.openGraph.type}"]`,
  );
  const ogTypeTag = container.querySelectorAll('meta[property="og:type"]');
  const ogTitle = container.querySelectorAll(
    `meta[content="${SEO.openGraph.title}"]`,
  );
  const ogTitleTag = container.querySelectorAll('meta[property="og:title"]');
  const ogDescription = container.querySelectorAll(
    `meta[content="${SEO.openGraph.description}"]`,
  );
  const ogDescriptionTag = container.querySelectorAll(
    'meta[property="og:description"]',
  );
  const ogImage00 = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].url}"]`,
  );
  const ogImageTag00 = tags.filter(item => item.key === 'og:image:01');
  const ogImage01 = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[1].url}"]`,
  );
  const ogImageTag01 = tags.filter(item => item.key === 'og:image:01');
  const ogImage02 = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[2].url}"]`,
  );
  const ogImageTag02 = tags.filter(item => item.key === 'og:image:02');
  const ogImage03 = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[3].url}"]`,
  );
  const ogImageTag03 = tags.filter(item => item.key === 'og:image:03');
  const ogDefaultImageWidthHeight = container.querySelectorAll(
    `meta[content="${SEO.openGraph.defaultImageHeight}"]`,
  );
  const ogSetImageHeight = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].height}"]`,
  );
  const ogSetImageWidth = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].width}"]`,
  );
  const ogSetImageAlt = container.querySelectorAll(
    `meta[content="${SEO.openGraph.images[0].alt}"]`,
  );
  const ogLocale = container.querySelectorAll(
    `meta[content="${SEO.openGraph.locale}"]`,
  );
  const ogLocaleTag = tags.filter(item => item.key === 'og:locale');
  const ogSiteName = container.querySelectorAll(
    `meta[content="${SEO.openGraph.site_name}"]`,
  );
  const ogSiteNameTag = tags.filter(item => item.key === 'og:site_name');
  const canonicalTag = tags.filter(item => item.key === 'canonical');

  expect(title).toBeDefined();
  expect(Array.from(index).length).toBe(2);
  expect(Array.from(description).length).toBe(1);
  expect(Array.from(descriptionTag).length).toBe(1);
  expect(Array.from(twitterCard).length).toBe(1);
  expect(Array.from(twitterCardTag).length).toBe(1);
  expect(Array.from(twitterHandle).length).toBe(1);
  expect(Array.from(twitterHandleTag).length).toBe(1);
  expect(Array.from(twitterSite).length).toBe(1);
  expect(Array.from(twitterSiteTag).length).toBe(1);
  expect(Array.from(ogUrl).length).toBe(1);
  expect(Array.from(ogUrlTag).length).toBe(1);
  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogTitle).length).toBe(1);
  expect(Array.from(ogTitleTag).length).toBe(1);
  expect(Array.from(ogDescription).length).toBe(1);
  expect(Array.from(ogDescriptionTag).length).toBe(1);
  expect(Array.from(ogImage00).length).toBe(1);
  expect(Array.from(ogImageTag00).length).toBe(1);
  expect(Array.from(ogImage01).length).toBe(1);
  expect(Array.from(ogImageTag01).length).toBe(1);
  expect(Array.from(ogImage02).length).toBe(1);
  expect(Array.from(ogImageTag02).length).toBe(1);
  expect(Array.from(ogImage03).length).toBe(1);
  expect(Array.from(ogImageTag03).length).toBe(1);
  expect(Array.from(ogDefaultImageWidthHeight).length).toBe(6);
  expect(Array.from(ogSetImageHeight).length).toBe(1);
  expect(Array.from(ogSetImageWidth).length).toBe(1);
  expect(Array.from(ogSetImageAlt).length).toBe(1);
  expect(Array.from(ogLocale).length).toBe(1);
  expect(Array.from(ogLocaleTag).length).toBe(1);
  expect(Array.from(ogSiteName).length).toBe(1);
  expect(Array.from(ogSiteNameTag).length).toBe(1);
  expect(canonicalTag[0].props.href).toBe(`${SEO.canonical}`);
  expect(Array.from(canonicalTag).length).toBe(1);
});

it('correctly sets noindex, nofollow', () => {
  const overrideProps = {
    ...SEO,
    noindex: true,
  };
  const tags = buildTags(overrideProps);
  const { container } = render(tags);
  const index = container.querySelectorAll('meta[content="index,follow"]');
  const noindex = container.querySelectorAll(
    'meta[content="noindex,nofollow"]',
  );

  expect(Array.from(index).length).toBe(0);
  expect(Array.from(noindex).length).toBe(2);
});

it('displays title with titleTemplate integrated', () => {
  const template = 'Next SEO';
  const overrideProps = {
    ...SEO,
    titleTemplate: `${template} | %s`,
  };
  const tags = buildTags(overrideProps);
  const { container } = render(tags);
  const title = getByText(
    container,
    (content, element) =>
      element.tagName.toLowerCase() === 'title' && content.startsWith(template),
  );
  expect(title.innerHTML).toMatch(`${template} | ${SEO.title}`);
});

const ArticleSEO = {
  title: 'Article Page Title',
  description: 'Description of article page',
  openGraph: {
    title: 'Open Graph Article Title',
    description: 'Description of open graph article',
    url: 'https://www.example.com/articles/article-title',
    type: 'article',
    article: {
      publishedTime: '2017-06-21T23:04:13Z',
      modifiedTime: '2018-01-21T18:04:43Z',
      expirationTime: '2022-12-21T22:04:11Z',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
      section: 'Section II',
      tags: ['Tag A', 'Tag B'],
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-article-title-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt Article Title A',
      },
      {
        url: 'https://www.test.ie/og-image-article-title-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt Article Title B',
      },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

it('Article SEO renders correctly', () => {
  const tags = buildTags(ArticleSEO);
  const { container } = render(tags);
  expect(container).toMatchSnapshot();
});

it('Check article og type meta', () => {
  const tags = buildTags(ArticleSEO);
  const { container } = render(tags);

  const ogType = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.type}"]`,
  );
  const ogTypeTag = container.querySelectorAll('meta[property="og:type"]');
  const ogArticlePublishedTime = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.publishedTime}"]`,
  );
  const ogArticlePublishedTimeTag = container.querySelectorAll(
    'meta[property="article:published_time"]',
  );
  const ogArticleModifiedTime = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.modifiedTime}"]`,
  );
  const ogArticleModifiedTimeTag = container.querySelectorAll(
    'meta[property="article:modified_time"]',
  );
  const ogArticleExpirationTime = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.expirationTime}"]`,
  );
  const ogArticleExpirationTimeTag = container.querySelectorAll(
    'meta[property="article:expiration_time"]',
  );
  const ogArticleAuthor00 = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.authors[0]}"]`,
  );
  const ogArticleAuthorTag00 = tags.filter(
    item => item.key === 'article:author:00',
  );
  const ogArticleAuthor01 = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.authors[1]}"]`,
  );
  const ogArticleAuthorTag01 = tags.filter(
    item => item.key === 'article:author:01',
  );
  const ogArticleSection = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.section}"]`,
  );
  const ogArticleSectionTag = container.querySelectorAll(
    'meta[property="article:section"]',
  );
  const ogArticleTags00 = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.tags[0]}"]`,
  );
  const ogArticleTagsTag00 = tags.filter(item => item.key === 'article:tag:00');
  const ogArticleTags01 = container.querySelectorAll(
    `meta[content="${ArticleSEO.openGraph.article.tags[1]}"]`,
  );
  const ogArticleTagsTag01 = tags.filter(item => item.key === 'article:tag:01');

  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogArticlePublishedTime).length).toBe(1);
  expect(Array.from(ogArticlePublishedTimeTag).length).toBe(1);
  expect(Array.from(ogArticleModifiedTime).length).toBe(1);
  expect(Array.from(ogArticleModifiedTimeTag).length).toBe(1);
  expect(Array.from(ogArticleExpirationTime).length).toBe(1);
  expect(Array.from(ogArticleExpirationTimeTag).length).toBe(1);
  expect(Array.from(ogArticleAuthor00).length).toBe(1);
  expect(Array.from(ogArticleAuthorTag00).length).toBe(1);
  expect(Array.from(ogArticleAuthor01).length).toBe(1);
  expect(Array.from(ogArticleAuthorTag01).length).toBe(1);
  expect(Array.from(ogArticleSection).length).toBe(1);
  expect(Array.from(ogArticleSectionTag).length).toBe(1);
  expect(Array.from(ogArticleTags00).length).toBe(1);
  expect(Array.from(ogArticleTagsTag00).length).toBe(1);
  expect(Array.from(ogArticleTags01).length).toBe(1);
  expect(Array.from(ogArticleTagsTag01).length).toBe(1);
});

const BookSEO = {
  title: 'Book Page Title',
  description: 'Description of book page',
  openGraph: {
    title: 'Open Graph Book Title',
    description: 'Description of open graph book',
    url: 'https://www.example.com/books/book-title',
    type: 'book',
    book: {
      releaseDate: '2018-09-17T11:08:13Z',
      isbn: '978-3-16-148410-0',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
      tags: ['Tag A', 'Tag B'],
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-book-title-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt Book Title A',
      },
      {
        url: 'https://www.test.ie/og-image-book-title-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt Book Title B',
      },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

it('Book SEO renders correctly', () => {
  const tags = buildTags(BookSEO);
  const { container } = render(tags);
  expect(container).toMatchSnapshot();
});

it('Check book og type meta', () => {
  const tags = buildTags(BookSEO);
  const { container } = render(tags);

  const ogType = container.querySelectorAll(
    `meta[content="${BookSEO.openGraph.type}"]`,
  );
  const ogTypeTag = container.querySelectorAll('meta[property="og:type"]');
  const ogBookReleaseDate = container.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.releaseDate}"]`,
  );
  const ogBookReleaseDateTag = container.querySelectorAll(
    'meta[property="book:release_date"]',
  );
  const ogBookAuthor00 = container.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.authors[0]}"]`,
  );
  const ogBookAuthorTag00 = tags.filter(item => item.key === 'book:author:00');
  const ogBookAuthor01 = container.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.authors[1]}"]`,
  );
  const ogBookAuthorTag01 = tags.filter(item => item.key === 'book:author:01');
  const ogBookIsbn = container.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.isbn}"]`,
  );
  const ogBookIsbnTag = container.querySelectorAll(
    'meta[property="book:isbn"]',
  );
  const ogBookTags00 = container.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.tags[0]}"]`,
  );
  const ogBookTagsTag00 = tags.filter(item => item.key === 'book:tag:00');
  const ogBookTags01 = container.querySelectorAll(
    `meta[content="${BookSEO.openGraph.book.tags[1]}"]`,
  );
  const ogBookTagsTag01 = tags.filter(item => item.key === 'book:tag:01');

  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogBookReleaseDate).length).toBe(1);
  expect(Array.from(ogBookReleaseDateTag).length).toBe(1);
  expect(Array.from(ogBookAuthor00).length).toBe(1);
  expect(Array.from(ogBookAuthorTag00).length).toBe(1);
  expect(Array.from(ogBookAuthor01).length).toBe(1);
  expect(Array.from(ogBookAuthorTag01).length).toBe(1);
  expect(Array.from(ogBookIsbn).length).toBe(1);
  expect(Array.from(ogBookIsbnTag).length).toBe(1);
  expect(Array.from(ogBookTags00).length).toBe(1);
  expect(Array.from(ogBookTagsTag00).length).toBe(1);
  expect(Array.from(ogBookTags01).length).toBe(1);
  expect(Array.from(ogBookTagsTag01).length).toBe(1);
});

const ProfileSEO = {
  title: 'Profile Page Title',
  description: 'Description of profile page',
  openGraph: {
    title: 'Open Graph Profile Title',
    description: 'Description of open graph profile',
    url: 'https://www.example.com/@firstlast123',
    type: 'profile',
    profile: {
      firstName: 'First',
      lastName: 'Last',
      username: 'firstlast123',
      gender: 'male',
    },
    images: [
      {
        url: 'https://www.test.ie/og-image-firstlast123-01.jpg',
        width: 850,
        height: 650,
        alt: 'Og Image Alt firstlast123 A',
      },
      {
        url: 'https://www.test.ie/og-image-firstlast123-02.jpg',
        width: 950,
        height: 850,
        alt: 'Og Image Alt firstlast123 B',
      },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

it('Profile SEO renders correctly', () => {
  const tags = buildTags(ProfileSEO);
  const { container } = render(tags);
  expect(container).toMatchSnapshot();
});

it('Check profile og type meta', () => {
  const tags = buildTags(ProfileSEO);
  const { container } = render(tags);

  const ogType = container.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.type}"]`,
  );
  const ogTypeTag = container.querySelectorAll('meta[property="og:type"]');
  const ogProfileFirstName = container.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.profile.firstName}"]`,
  );
  const ogProfileFirstNameTag = container.querySelectorAll(
    'meta[property="profile:first_name"]',
  );
  const ogProfileLastName = container.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.profile.lastName}"]`,
  );
  const ogProfileLastNameTag = container.querySelectorAll(
    'meta[property="profile:last_name"]',
  );
  const ogProfileUsername = container.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.profile.username}"]`,
  );
  const ogProfileUsernameTag = container.querySelectorAll(
    'meta[property="profile:username"]',
  );
  const ogProfileGender = container.querySelectorAll(
    `meta[content="${ProfileSEO.openGraph.profile.gender}"]`,
  );
  const ogProfileGenderTag = container.querySelectorAll(
    'meta[property="profile:gender"]',
  );

  expect(Array.from(ogType).length).toBe(1);
  expect(Array.from(ogTypeTag).length).toBe(1);
  expect(Array.from(ogProfileFirstName).length).toBe(1);
  expect(Array.from(ogProfileFirstNameTag).length).toBe(1);
  expect(Array.from(ogProfileLastName).length).toBe(1);
  expect(Array.from(ogProfileLastNameTag).length).toBe(1);
  expect(Array.from(ogProfileUsername).length).toBe(1);
  expect(Array.from(ogProfileUsernameTag).length).toBe(1);
  expect(Array.from(ogProfileGender).length).toBe(1);
  expect(Array.from(ogProfileGenderTag).length).toBe(1);
});
