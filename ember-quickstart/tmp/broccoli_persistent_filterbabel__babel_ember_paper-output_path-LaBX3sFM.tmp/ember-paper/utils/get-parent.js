define('ember-paper/utils/get-parent', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getParent;
  var get = Ember.get,
      ViewUtils = Ember.ViewUtils;


  // taken from https://github.com/kaliber5/ember-bootstrap/blob/master/addon/utils/get-parent.js
  function getParent(view) {
    if (get(view, 'tagName') === '') {
      // Beware: use of private API! :(
      if (ViewUtils && ViewUtils.getViewBounds) {
        return ViewUtils.getViewBounds(view).parentElement;
      } else {
        return view._renderNode.contextualElement;
      }
    } else {
      return get(view, 'element').parentNode;
    }
  }
});