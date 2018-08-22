'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _head = require('next/head');

var _head2 = _interopRequireDefault(_head);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _buildTags = require('./buildTags');

var _buildTags2 = _interopRequireDefault(_buildTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultSeo = function (_React$Component) {
  _inherits(DefaultSeo, _React$Component);

  function DefaultSeo(props) {
    _classCallCheck(this, DefaultSeo);

    var _this = _possibleConstructorReturn(this, (DefaultSeo.__proto__ || Object.getPrototypeOf(DefaultSeo)).call(this, props));

    if (!props.config) {
      throw new Error('[next-seo] You must supply an SEO configuration');
    }
    return _this;
  }

  _createClass(DefaultSeo, [{
    key: 'render',
    value: function render() {
      var config = this.props.config;

      return _react2.default.createElement(
        _head2.default,
        null,
        (0, _buildTags2.default)(config)
      );
    }
  }]);

  return DefaultSeo;
}(_react2.default.Component);

DefaultSeo.propTypes = {
  config: _propTypes2.default.object.isRequired
};

exports.default = DefaultSeo;