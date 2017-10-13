define('ember-native-dom-helpers/key-event', ['exports', 'ember-native-dom-helpers/trigger-event'], function (exports, _triggerEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.keyEvent = keyEvent;
  var merge = Ember.merge;


  /**
   * @public
   * @param selector
   * @param type
   * @param keyCode
   * @param modifiers
   * @return {*}
   */
  function keyEvent(selector, type, keyCode) {
    var modifiers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { ctrlKey: false, altKey: false, shiftKey: false, metaKey: false };

    return (0, _triggerEvent.triggerEvent)(selector, type, merge({ keyCode: keyCode, which: keyCode, key: keyCode }, modifiers));
  }
});