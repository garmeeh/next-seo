'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _head = require('next/head');

var _head2 = _interopRequireDefault(_head);

var _markup = require('../utils/markup');

var _markup2 = _interopRequireDefault(_markup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildImages = function buildImages(images) {
  return images.length ? '"image": [' + images.map(function (image) {
    return '"' + image + '"';
  }) + '],' : '';
};

var buildBrand = function buildBrand(brand) {
  return '\n  "brand": {\n      "@type": "Thing",\n      "name": "' + brand + '"\n    },\n';
};

var buildReviewRating = function buildReviewRating(rating) {
  return rating ? '"reviewRating": {\n          "@type": "Rating",\n          ' + (rating.bestRating ? '"bestRating": "' + rating.bestRating + '",' : '') + '\n          ' + (rating.worstRating ? '"worstRating": "' + rating.worstRating + '",' : '') + '\n          "ratingValue": "' + rating.ratingValue + '"\n        },' : '';
};

var buildReviews = function buildReviews(reviews) {
  return '\n"review": [\n  ' + reviews.map(function (review) {
    return '{\n      "@type": "Review",\n      ' + (review.datePublished ? '"datePublished": "' + review.datePublished + '",' : '') + '\n      ' + (review.reviewBody ? '"reviewBody": "' + review.reviewBody + '",' : '') + '\n      ' + (review.name ? '"name": "' + review.name + '",' : '') + '\n      ' + buildReviewRating(review.reviewRating) + '\n      "author": "' + review.author + '"\n  }';
  }) + '],';
};

var buildAggregateRating = function buildAggregateRating(aggregateRating) {
  return '\n  "aggregateRating": {\n      "@type": "AggregateRating",\n      "ratingValue": "' + aggregateRating.ratingValue + '",\n      "reviewCount": "' + aggregateRating.reviewCount + '"\n    },\n';
};

// TODO: Docs for offers itemCondition & availability
// TODO: Seller type, make dynamic
var buildOffers = function buildOffers(offers) {
  return '\n  "offers": {\n    "@type": "Offer",\n    "priceCurrency": "' + offers.priceCurrency + '",\n    ' + (offers.priceValidUntil ? '"priceValidUntil": "' + offers.priceValidUntil + '",' : '') + '\n    ' + (offers.itemCondition ? '"itemCondition": "' + offers.itemCondition + '",' : '') + '\n    ' + (offers.availability ? '"availability": "' + offers.availability + '",' : '') + '\n    ' + (offers.seller ? '\n      "seller": {\n      "@type": "Organization",\n      "name": "' + offers.seller.name + '"\n    },\n    ' : '') + '\n    "price": "' + offers.price + '"\n  },\n';
};

var ProductJsonLd = function ProductJsonLd(_ref) {
  var productName = _ref.productName,
      _ref$images = _ref.images,
      images = _ref$images === undefined ? [] : _ref$images,
      description = _ref.description,
      sku = _ref.sku,
      gtin8 = _ref.gtin8,
      gtin13 = _ref.gtin13,
      gtin14 = _ref.gtin14,
      mpn = _ref.mpn,
      brand = _ref.brand,
      _ref$reviews = _ref.reviews,
      reviews = _ref$reviews === undefined ? [] : _ref$reviews,
      aggregateRating = _ref.aggregateRating,
      offers = _ref.offers;

  var jslonld = '{\n    "@context": "http://schema.org/",\n    "@type": "Product",\n    ' + buildImages(images) + '\n    ' + (description ? '"description": "' + description + '",' : '') + '\n    ' + (mpn ? '"mpn": "' + mpn + '",' : '') + '\n    ' + (sku ? '"sku": "' + sku + '",' : '') + '\n    ' + (gtin8 ? '"gtin8": "' + gtin8 + '",' : '') + '\n    ' + (gtin13 ? '"gtin13": "' + gtin13 + '",' : '') + '\n    ' + (gtin14 ? '"gtin14": "' + gtin14 + '",' : '') + '\n    ' + (brand ? buildBrand(brand) : '') + '\n    ' + (reviews.length ? buildReviews(reviews) : '') + '\n    ' + (aggregateRating ? buildAggregateRating(aggregateRating) : '') + '\n    ' + (offers ? buildOffers(offers) : '') + '\n    "name": "' + productName + '"\n  }';

  return _react2.default.createElement(
    _head2.default,
    null,
    _react2.default.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: (0, _markup2.default)(jslonld),
      key: 'jsonld-product'
    })
  );
};

ProductJsonLd.defaultProps = {
  images: [],
  description: null,
  brand: null,
  reviews: [],
  aggregateRating: null,
  offers: null,
  sku: null,
  gtin8: null,
  gtin13: null,
  gtin14: null,
  mpn: null
};

ProductJsonLd.propTypes = {
  productName: _propTypes2.default.string.isRequired,
  images: _propTypes2.default.arrayOf(_propTypes2.default.string),
  description: _propTypes2.default.string,
  brand: _propTypes2.default.string,
  reviews: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    author: _propTypes2.default.string.isRequired,
    datePublished: _propTypes2.default.string,
    reviewBody: _propTypes2.default.string,
    name: _propTypes2.default.string,
    reviewRating: _propTypes2.default.shape({
      bestRating: _propTypes2.default.string,
      ratingValue: _propTypes2.default.string.isRequired,
      worstRating: _propTypes2.default.string
    })
  })),
  aggregateRating: _propTypes2.default.shape({
    ratingValue: _propTypes2.default.string.isRequired,
    reviewCount: _propTypes2.default.string.isRequired
  }),
  offers: _propTypes2.default.shape({
    price: _propTypes2.default.string.isRequired,
    priceCurrency: _propTypes2.default.string.isRequired,
    priceValidUntil: _propTypes2.default.string,
    itemCondition: _propTypes2.default.string,
    availability: _propTypes2.default.string,
    seller: _propTypes2.default.shape({
      name: _propTypes2.default.string.isRequired
    })
  }),
  sku: _propTypes2.default.string,
  gtin8: _propTypes2.default.string,
  gtin13: _propTypes2.default.string,
  gtin14: _propTypes2.default.string,
  mpn: _propTypes2.default.string
};

exports.default = ProductJsonLd;