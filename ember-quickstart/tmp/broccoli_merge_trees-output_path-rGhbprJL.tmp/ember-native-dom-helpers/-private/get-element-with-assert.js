define('ember-native-dom-helpers/-private/get-element-with-assert', ['exports', 'ember-native-dom-helpers/-private/get-element'], function (exports, _getElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getElementWithAssert;


  /*
    @method getElementWithAssert
    @param {String|HTMLElement} selectorOrElement
    @param {HTMLElement} contextEl to query within, query from its contained DOM
    @return {Error|HTMLElement} element if found, or raises an error
    @private
  */
  function getElementWithAssert(selectorOrElement, contextEl) {
    var el = (0, _getElement.default)(selectorOrElement, contextEl);
    if (el) {
      return el;
    }
    throw new Error('Element ' + selectorOrElement + ' not found.');
  }
});