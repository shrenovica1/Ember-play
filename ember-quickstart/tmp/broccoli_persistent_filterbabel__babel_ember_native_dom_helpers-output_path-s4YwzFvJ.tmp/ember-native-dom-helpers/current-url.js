define('ember-native-dom-helpers/current-url', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.currentURL = currentURL;
  function currentURL() {
    var _window;

    if (!window.currentURL) {
      throw new Error('currentURL is only available during acceptance tests');
    }

    return (_window = window).currentURL.apply(_window, arguments);
  }
});