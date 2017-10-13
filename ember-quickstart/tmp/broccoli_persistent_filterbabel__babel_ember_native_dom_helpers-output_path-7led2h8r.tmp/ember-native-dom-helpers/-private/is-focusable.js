define('ember-native-dom-helpers/-private/is-focusable', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFocusable;
  function isFocusable(el) {
    var focusableTags = ['INPUT', 'BUTTON', 'LINK', 'SELECT', 'A', 'TEXTAREA'];
    var tagName = el.tagName,
        type = el.type;


    if (type === 'hidden') {
      return false;
    }

    return focusableTags.indexOf(tagName) > -1 || el.contentEditable;
  }
});