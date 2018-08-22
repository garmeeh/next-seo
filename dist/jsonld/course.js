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

var CourseJsonLd = function CourseJsonLd(_ref) {
  var courseName = _ref.courseName,
      description = _ref.description,
      providerName = _ref.providerName,
      providerUrl = _ref.providerUrl;

  var jslonld = '{\n    "@context": "http://schema.org",\n    "@type": "Course",\n    "name": "' + courseName + '",\n    "description": "' + description + '",\n    "provider": {\n      "@type": "Organization",\n      "name": "' + providerName + '"' + (providerUrl ? ',\n      "sameAs": "' + providerUrl + '"' : '') + '\n    }\n  }';

  return _react2.default.createElement(
    _head2.default,
    null,
    _react2.default.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: (0, _markup2.default)(jslonld),
      key: 'jsonld-course'
    })
  );
};

CourseJsonLd.defaultProps = {
  providerUrl: null
};

CourseJsonLd.propTypes = {
  courseName: _propTypes2.default.string.isRequired,
  providerName: _propTypes2.default.string.isRequired,
  providerUrl: _propTypes2.default.string,
  description: _propTypes2.default.string.isRequired
};

exports.default = CourseJsonLd;