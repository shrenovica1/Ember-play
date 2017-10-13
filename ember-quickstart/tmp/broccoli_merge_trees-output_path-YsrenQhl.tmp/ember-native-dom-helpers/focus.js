define('ember-native-dom-helpers/focus', ['exports', 'ember-native-dom-helpers/-private/get-element-with-assert', 'ember-native-dom-helpers/-private/is-focusable', 'ember-native-dom-helpers/fire-event', 'ember-test-helpers/wait'], function (exports, _getElementWithAssert, _isFocusable, _fireEvent, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.focus = focus;
  var run = Ember.run;


  /*
    @method focus
    @param {String|HTMLElement} selector
    @return {RSVP.Promise}
    @public
  */
  function focus(selector) {
    if (!selector) {
      return;
    }

    var el = (0, _getElementWithAssert.default)(selector);

    if ((0, _isFocusable.default)(el)) {
      run(null, function () {
        var browserIsNotFocused = document.hasFocus && !document.hasFocus();

        // Firefox does not trigger the `focusin` event if the window
        // does not have focus. If the document does not have focus then
        // fire `focusin` event as well.
        if (browserIsNotFocused) {
          (0, _fireEvent.fireEvent)(el, 'focusin', {
            bubbles: false
          });
        }

        // makes `document.activeElement` be `el`. If the browser is focused, it also fires a focus event
        el.focus();

        // if the browser is not focused the previous `el.focus()` didn't fire an event, so we simulate it
        if (browserIsNotFocused) {
          (0, _fireEvent.fireEvent)(el, 'focus', {
            bubbles: false
          });
        }
      });
    }

    return (window.wait || _wait.default)();
  }
});