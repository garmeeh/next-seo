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

var BlogJsonLd = function BlogJsonLd(_ref) {
  var url = _ref.url,
      title = _ref.title,
      _ref$images = _ref.images,
      images = _ref$images === undefined ? [] : _ref$images,
      datePublished = _ref.datePublished,
      _ref$dateModified = _ref.dateModified,
      dateModified = _ref$dateModified === undefined ? null : _ref$dateModified,
      authorName = _ref.authorName,
      description = _ref.description;

  var jslonld = '{\n    "@context": "http://schema.org",\n    "@type": "Blog",\n    "mainEntityOfPage": {\n      "@type": "WebPage",\n      "@id": "' + url + '"\n    },\n    "headline": "' + title + '",\n    "image": [\n      ' + images.map(function (image) {
    return '"' + image + '"';
  }) + '\n     ],\n    "datePublished": "' + datePublished + '",\n    "dateModified": "' + (dateModified || datePublished) + '",\n    "author": {\n      "@type": "Person",\n      "name": "' + authorName + '"\n    },\n    "description": "' + description + '"\n  }';

  return _react2.default.createElement(
    _head2.default,
    null,
    _react2.default.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: (0, _markup2.default)(jslonld),
      key: 'jsonld-blog'
    })
  );
};

BlogJsonLd.defaultProps = {
  dateModified: null
};

BlogJsonLd.propTypes = {
  url: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string.isRequired,
  images: _propTypes2.default.array.isRequired,
  datePublished: _propTypes2.default.string.isRequired,
  dateModified: _propTypes2.default.string,
  authorName: _propTypes2.default.string.isRequired,
  description: _propTypes2.default.string.isRequired
};

exports.default = BlogJsonLd;