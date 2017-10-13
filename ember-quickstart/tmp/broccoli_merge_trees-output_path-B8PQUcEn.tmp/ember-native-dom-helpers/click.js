define('ember-native-dom-helpers/click', ['exports', 'ember-native-dom-helpers/-private/get-element-with-assert', 'ember-native-dom-helpers/fire-event', 'ember-native-dom-helpers/focus', 'ember-test-helpers/wait'], function (exports, _getElementWithAssert, _fireEvent, _focus, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.clickEventSequence = clickEventSequence;
  exports.click = click;
  var run = Ember.run;


  /*
    @method clickEventSequence
    @private
  */
  function clickEventSequence(el, options) {
    run(function () {
      return (0, _fireEvent.fireEvent)(el, 'mousedown', options);
    });
    (0, _focus.focus)(el);
    run(function () {
      return (0, _fireEvent.fireEvent)(el, 'mouseup', options);
    });
    run(function () {
      return (0, _fireEvent.fireEvent)(el, 'click', options);
    });
  }

  /*
    @method click
    @param {String|HTMLElement} selector
    @param {HTMLElement} context
    @param {Object} options
    @return {RSVP.Promise}
    @public
  */
  function click(selector, context, options) {
    var element = void 0;
    if (context instanceof HTMLElement) {
      element = (0, _getElementWithAssert.default)(selector, context);
    } else {
      options = context || {};
      element = (0, _getElementWithAssert.default)(selector);
    }
    clickEventSequence(element, options);
    return (window.wait || _wait.default)();
  }
});