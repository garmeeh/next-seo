'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactTestingLibrary = require('react-testing-library');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _buildTags = require('../buildTags');

var _buildTags2 = _interopRequireDefault(_buildTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEO = {
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
    images: [{
      url: 'https://www.test.ie/image-01.jpg',
      width: 800,
      height: 600,
      alt: 'Alt text right here'
    }, { url: 'https://www.test.ie/image-02.jpg' }, { url: 'https://www.test.ie/image-03.jpg' }, { url: 'https://www.test.ie/image-04.jpg' }],
    site_name: 'SiteName'
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image'
  }
};

it('renders correctly', function () {
  var tags = (0, _buildTags2.default)(SEO);

  var _render = (0, _reactTestingLibrary.render)(tags),
      container = _render.container;

  expect(container).toMatchSnapshot();
});

/* eslint no-magic-numbers: 0 */
it('returns full array for default seo object', function () {
  var tags = (0, _buildTags2.default)(SEO);

  var _render2 = (0, _reactTestingLibrary.render)(tags),
      container = _render2.container;

  var title = (0, _reactTestingLibrary.getByText)(container, function (content, element) {
    return element.tagName.toLowerCase() === 'title' && content.startsWith('' + SEO.title);
  });
  var index = container.querySelectorAll('meta[content="index,follow"]');
  var description = container.querySelectorAll('meta[content="' + SEO.description + '"]');
  var descriptionTag = container.querySelectorAll('meta[name="description"]');
  var twitterCard = container.querySelectorAll('meta[content="summary_large_image"]');
  var twitterCardTag = container.querySelectorAll('meta[name="twitter:card"]');
  var twitterHandle = container.querySelectorAll('meta[content="' + SEO.twitter.handle + '"]');
  var twitterHandleTag = container.querySelectorAll('meta[name="twitter:creator"]');
  var twitterSite = container.querySelectorAll('meta[content="' + SEO.twitter.site + '"]');
  var twitterSiteTag = container.querySelectorAll('meta[name="twitter:site"]');
  var ogUrl = container.querySelectorAll('meta[content="' + SEO.openGraph.url + '"]');
  var ogUrlTag = container.querySelectorAll('meta[property="og:url"]');
  var ogType = container.querySelectorAll('meta[content="' + SEO.openGraph.type + '"]');
  var ogTypeTag = container.querySelectorAll('meta[property="og:type"]');
  var ogTitle = container.querySelectorAll('meta[content="' + SEO.openGraph.title + '"]');
  var ogTitleTag = container.querySelectorAll('meta[property="og:title"]');
  var ogDescription = container.querySelectorAll('meta[content="' + SEO.openGraph.description + '"]');
  var ogDescriptionTag = container.querySelectorAll('meta[property="og:description"]');
  var ogImage00 = container.querySelectorAll('meta[content="' + SEO.openGraph.images[0].url + '"]');
  var ogImageTag00 = tags.filter(function (item) {
    return item.key === 'og:image:01';
  });
  var ogImage01 = container.querySelectorAll('meta[content="' + SEO.openGraph.images[1].url + '"]');
  var ogImageTag01 = tags.filter(function (item) {
    return item.key === 'og:image:01';
  });
  var ogImage02 = container.querySelectorAll('meta[content="' + SEO.openGraph.images[2].url + '"]');
  var ogImageTag02 = tags.filter(function (item) {
    return item.key === 'og:image:02';
  });
  var ogImage03 = container.querySelectorAll('meta[content="' + SEO.openGraph.images[3].url + '"]');
  var ogImageTag03 = tags.filter(function (item) {
    return item.key === 'og:image:03';
  });
  var ogDefaultImageWidthHeight = container.querySelectorAll('meta[content="' + SEO.openGraph.defaultImageHeight + '"]');
  var ogSetImageHeight = container.querySelectorAll('meta[content="' + SEO.openGraph.images[0].height + '"]');
  var ogSetImageWidth = container.querySelectorAll('meta[content="' + SEO.openGraph.images[0].width + '"]');
  var ogSetImageAlt = container.querySelectorAll('meta[content="' + SEO.openGraph.images[0].alt + '"]');
  var ogLocale = container.querySelectorAll('meta[content="' + SEO.openGraph.locale + '"]');
  var ogLocaleTag = tags.filter(function (item) {
    return item.key === 'og:locale';
  });
  var canonicalTag = tags.filter(function (item) {
    return item.key === 'canonical';
  });

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
  expect(canonicalTag[0].props.href).toBe('' + SEO.canonical);
  expect(Array.from(canonicalTag).length).toBe(1);
});

it('correctly sets noindex, nofollow', function () {
  var overrideProps = _extends({}, SEO, {
    noindex: true
  });
  var tags = (0, _buildTags2.default)(overrideProps);

  var _render3 = (0, _reactTestingLibrary.render)(tags),
      container = _render3.container;

  var index = container.querySelectorAll('meta[content="index,follow"]');
  var noindex = container.querySelectorAll('meta[content="noindex,nofollow"]');

  expect(Array.from(index).length).toBe(0);
  expect(Array.from(noindex).length).toBe(2);
});