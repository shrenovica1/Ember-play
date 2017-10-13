define('ember-native-dom-helpers/-private/get-element', ['exports', 'ember-native-dom-helpers/settings'], function (exports, _settings) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getElement;


  /*
    @method getElement
    @param {String|HTMLElement} selectorOrElement
    @param {HTMLElement} contextEl to query within, query from its contained DOM
    @return HTMLElement
    @private
  */
  function getElement(selectorOrElement, contextEl) {
    if (selectorOrElement instanceof Window || selectorOrElement instanceof Document || selectorOrElement instanceof HTMLElement || selectorOrElement instanceof SVGElement) {
      return selectorOrElement;
    }
    var result = void 0;
    if (contextEl instanceof HTMLElement) {
      result = contextEl.querySelector(selectorOrElement);
    } else {
      result = document.querySelector(_settings.default.rootElement + ' ' + selectorOrElement);
    }
    return result;
  }
});