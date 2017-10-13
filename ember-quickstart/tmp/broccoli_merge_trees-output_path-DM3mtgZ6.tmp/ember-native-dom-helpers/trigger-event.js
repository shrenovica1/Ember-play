define('ember-native-dom-helpers/trigger-event', ['exports', 'ember-native-dom-helpers/-private/get-element-with-assert', 'ember-native-dom-helpers/fire-event', 'ember-test-helpers/wait'], function (exports, _getElementWithAssert, _fireEvent, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.triggerEvent = triggerEvent;
  var run = Ember.run;


  /*
    @method triggerEvent
    @param {String|HTMLElement} selector
    @param {String} type
    @param {Object} options
    @return {RSVP.Promise}
    @public
  */
  function triggerEvent(selector, type, options) {
    var el = (0, _getElementWithAssert.default)(selector);
    run(function () {
      return (0, _fireEvent.fireEvent)(el, type, options);
    });
    return (window.wait || _wait.default)();
  }
});