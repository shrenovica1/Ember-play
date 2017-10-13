define('ember-native-dom-helpers/fill-in', ['exports', 'ember-native-dom-helpers/-private/get-element-with-assert', 'ember-native-dom-helpers/focus', 'ember-native-dom-helpers/fire-event', 'ember-test-helpers/wait'], function (exports, _getElementWithAssert, _focus, _fireEvent, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fillIn = fillIn;
  var run = Ember.run;


  /*
    @method fillIn
    @param {String|HTMLElement} selector
    @param {String} text
    @return {RSVP.Promise}
    @public
  */
  function fillIn(selector, text) {
    var el = (0, _getElementWithAssert.default)(selector);
    run(function () {
      return (0, _focus.focus)(el);
    });
    run(function () {
      return el.value = text;
    });
    run(function () {
      return (0, _fireEvent.fireEvent)(el, 'input');
    });
    run(function () {
      return (0, _fireEvent.fireEvent)(el, 'change');
    });
    return (window.wait || _wait.default)();
  }
});