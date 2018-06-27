'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next/head');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultSeo = function (_Component) {
  _inherits(DefaultSeo, _Component);

  function DefaultSeo(props) {
    _classCallCheck(this, DefaultSeo);

    var _this = _possibleConstructorReturn(this, (DefaultSeo.__proto__ || Object.getPrototypeOf(DefaultSeo)).call(this, props));

    if (!props.config) {
      throw new Error('[next-seo] You must supply an SEO configuration');
    }
    return _this;
  }

  _createClass(DefaultSeo, [{
    key: 'buildTags',
    value: function buildTags(config) {
      var tagsToRender = [];

      if (config.title) {
        tagsToRender.push(_react2.default.createElement(
          'title',
          { key: 'title' },
          config.title
        ));
      }

      if (!config.noindex) {
        tagsToRender.push(_react2.default.createElement('meta', { key: 'robots', name: 'robots', content: 'index,follow' }));
        tagsToRender.push(_react2.default.createElement('meta', { key: 'googlebot', name: 'googlebot', content: 'index,follow' }));
      } else {
        tagsToRender.push(_react2.default.createElement('meta', { key: 'robots', name: 'robots', content: 'noindex,nofollow' }));
        tagsToRender.push(_react2.default.createElement('meta', { key: 'googlebot', name: 'googlebot', content: 'noindex,nofollow' }));
      }

      if (config.description) {
        tagsToRender.push(_react2.default.createElement('meta', {
          key: 'description',
          name: 'description',
          content: config.description
        }));
      }

      if (config.hasOwnProperty('twitter')) {
        if (config.twitter.cardType) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'twitter:card',
            name: 'twitter:card',
            content: config.twitter.cardType
          }));
        }

        if (config.twitter.handle) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'twitter:site',
            name: 'twitter:site',
            content: config.twitter.handle
          }));
        }
      }

      if (config.hasOwnProperty('openGraph')) {
        if (config.openGraph.url) {
          tagsToRender.push(_react2.default.createElement('meta', { key: 'og:url', property: 'og:url', content: config.openGraph.url }));
        }

        if (config.openGraph.type) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'og:type',
            property: 'og:type',
            content: config.openGraph.type
          }));
        }

        if (config.openGraph.title) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'og:title',
            property: 'og:title',
            content: config.openGraph.title
          }));
        }

        if (config.openGraph.description) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'og:description',
            property: 'og:description',
            content: config.openGraph.description
          }));
        }

        if (config.openGraph.image) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'og:image',
            property: 'og:image',
            content: config.openGraph.image
          }));
        }

        if (config.openGraph.imageWidth) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'og:image:width',
            property: 'og:image:width',
            content: config.openGraph.imageWidth
          }));
        }

        if (config.openGraph.imageHeight) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'og:image:height',
            property: 'og:image:height',
            content: config.openGraph.imageHeight
          }));
        }

        if (config.openGraph.locale) {
          tagsToRender.push(_react2.default.createElement('meta', {
            key: 'og:locale',
            property: 'og:locale',
            content: config.openGraph.locale
          }));
        }
      }

      if (config.canonical) {
        tagsToRender.push(_react2.default.createElement('link', { rel: 'canonical', href: config.url, key: 'canonical' }));
      }

      return tagsToRender;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _head2.default,
        null,
        this.buildTags(this.props.config)
      );
    }
  }]);

  return DefaultSeo;
}(_react.Component);

exports.default = DefaultSeo;