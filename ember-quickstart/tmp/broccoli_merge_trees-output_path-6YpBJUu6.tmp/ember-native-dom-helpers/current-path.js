define('ember-native-dom-helpers/current-path', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.currentPath = currentPath;
  function currentPath() {
    var _window;

    if (!window.currentPath) {
      throw new Error('currentPath is only available during acceptance tests');
    }

    return (_window = window).currentPath.apply(_window, arguments);
  }
});