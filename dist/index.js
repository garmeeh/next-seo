'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductJsonLd = exports.CourseJsonLd = exports.BlogJsonLd = exports.ArticleJsonLd = undefined;

var _defaultSEO = require('./meta/defaultSEO');

var _defaultSEO2 = _interopRequireDefault(_defaultSEO);

var _article = require('./jsonld/article');

var _article2 = _interopRequireDefault(_article);

var _blog = require('./jsonld/blog');

var _blog2 = _interopRequireDefault(_blog);

var _course = require('./jsonld/course');

var _course2 = _interopRequireDefault(_course);

var _product = require('./jsonld/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _defaultSEO2.default;
exports.ArticleJsonLd = _article2.default;
exports.BlogJsonLd = _blog2.default;
exports.CourseJsonLd = _course2.default;
exports.ProductJsonLd = _product2.default;