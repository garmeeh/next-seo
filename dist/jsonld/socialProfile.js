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

var SocialProfileJsonLd = function SocialProfileJsonLd(_ref) {
  var type = _ref.type,
      name = _ref.name,
      url = _ref.url,
      _ref$sameAs = _ref.sameAs,
      sameAs = _ref$sameAs === undefined ? [] : _ref$sameAs;

  var jslonld = '{\n    "@context": "http://schema.org",\n    "@type": "' + type + '",\n    "name": "' + name + '",\n    "url": "' + url + '",\n    "sameAs": [\n      ' + sameAs.map(function (socialUrl) {
    return '"' + socialUrl + '"';
  }) + '\n     ]\n  }';

  return _react2.default.createElement(
    _head2.default,
    null,
    _react2.default.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: (0, _markup2.default)(jslonld),
      key: 'jsonld-social'
    })
  );
};

SocialProfileJsonLd.propTypes = {
  type: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  url: _propTypes2.default.string.isRequired,
  sameAs: _propTypes2.default.array.isRequired
};

exports.default = SocialProfileJsonLd;