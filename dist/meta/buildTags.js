"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  templateTitle: null,
  openGraph: {
    defaultImageHeight: null,
    defaultImageWidth: null
  }
};

var buildTags = function buildTags(config) {
  var tagsToRender = [];

  if (config.titleTemplate) {
    defaults.templateTitle = config.titleTemplate;
  }

  if (config.title) {
    var updatedTitle = config.title;
    if (defaults.templateTitle) {
      updatedTitle = defaults.templateTitle.replace(/%s/g, function () {
        return updatedTitle;
      });
    }
    tagsToRender.push(_react2.default.createElement(
      "title",
      { key: "title" },
      updatedTitle
    ));
  }

  if (!config.noindex) {
    tagsToRender.push(_react2.default.createElement("meta", { key: "robots", name: "robots", content: "index,follow" }));
    tagsToRender.push(_react2.default.createElement("meta", { key: "googlebot", name: "googlebot", content: "index,follow" }));
  } else {
    tagsToRender.push(_react2.default.createElement("meta", { key: "robots", name: "robots", content: "noindex,nofollow" }));
    tagsToRender.push(_react2.default.createElement("meta", { key: "googlebot", name: "googlebot", content: "noindex,nofollow" }));
  }

  if (config.description) {
    tagsToRender.push(_react2.default.createElement("meta", { key: "description", name: "description", content: config.description }));
  }

  if (config.hasOwnProperty('twitter')) {
    if (config.twitter.cardType) {
      tagsToRender.push(_react2.default.createElement("meta", { key: "twitter:card", name: "twitter:card", content: config.twitter.cardType }));
    }

    if (config.twitter.site) {
      tagsToRender.push(_react2.default.createElement("meta", { key: "twitter:site", name: "twitter:site", content: config.twitter.site }));
    }

    if (config.twitter.handle) {
      tagsToRender.push(_react2.default.createElement("meta", { key: "twitter:creator", name: "twitter:creator", content: config.twitter.handle }));
    }
  }

  if (config.hasOwnProperty('openGraph')) {
    if (config.openGraph.url) {
      tagsToRender.push(_react2.default.createElement("meta", { key: "og:url", property: "og:url", content: config.openGraph.url }));
    }

    if (config.openGraph.type) {
      tagsToRender.push(_react2.default.createElement("meta", { key: "og:type", property: "og:type", content: config.openGraph.type }));
    }

    if (config.openGraph.title) {
      tagsToRender.push(_react2.default.createElement("meta", { key: "og:title", property: "og:title", content: config.openGraph.title }));
    }

    if (config.openGraph.description) {
      tagsToRender.push(_react2.default.createElement("meta", {
        key: "og:description",
        property: "og:description",
        content: config.openGraph.description
      }));
    }

    if (config.openGraph.images && config.openGraph.images.length) {
      config.openGraph.images.forEach(function (image, index) {
        tagsToRender.push(_react2.default.createElement("meta", { key: "og:image:0" + index, property: "og:image", content: image.url }));

        if (image.alt) {
          tagsToRender.push(_react2.default.createElement("meta", { key: "og:image:alt0" + index, property: "og:image:alt", content: image.alt }));
        }

        if (image.width) {
          tagsToRender.push(_react2.default.createElement("meta", {
            key: "og:image:width0" + index,
            property: "og:image:width",
            content: image.width
          }));
        } else if (defaults.openGraph.defaultImageWidth || config.openGraph.defaultImageWidth) {
          if (config.openGraph.defaultImageWidth) {
            defaults.openGraph.defaultImageWidth = config.openGraph.defaultImageWidth;
          }
          tagsToRender.push(_react2.default.createElement("meta", {
            key: "og:image:width0" + index,
            property: "og:image:width",
            content: defaults.openGraph.defaultImageWidth
          }));
        }

        if (image.height) {
          tagsToRender.push(_react2.default.createElement("meta", {
            key: "og:image:height" + index,
            property: "og:image:height",
            content: image.height
          }));
        } else if (defaults.openGraph.defaultImageHeight || config.openGraph.defaultImageHeight) {
          if (config.openGraph.defaultImageHeight) {
            defaults.openGraph.defaultImageHeight = config.openGraph.defaultImageHeight;
          }
          tagsToRender.push(_react2.default.createElement("meta", {
            key: "og:image:height" + index,
            property: "og:image:height",
            content: defaults.openGraph.defaultImageHeight
          }));
        }
      });
    }

    if (config.openGraph.locale) {
      tagsToRender.push(_react2.default.createElement("meta", { key: "og:locale", property: "og:locale", content: config.openGraph.locale }));
    }

    if (config.openGraph.site_name) {
      tagsToRender.push(_react2.default.createElement("meta", { key: "og:site_name", property: "og:site_name", content: config.openGraph.site_name }));
    }
  }

  if (config.canonical) {
    tagsToRender.push(_react2.default.createElement("link", { rel: "canonical", href: config.canonical, key: "canonical" }));
  }

  return tagsToRender;
};

exports.default = buildTags;