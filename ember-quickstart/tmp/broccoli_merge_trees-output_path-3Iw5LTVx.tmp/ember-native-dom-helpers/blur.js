define('ember-native-dom-helpers/blur', ['exports', 'ember-native-dom-helpers/-private/get-element-with-assert', 'ember-native-dom-helpers/-private/is-focusable', 'ember-native-dom-helpers/fire-event', 'ember-test-helpers/wait'], function (exports, _getElementWithAssert, _isFocusable, _fireEvent, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.blur = blur;
  var run = Ember.run;


  /*
    @method blur
    @param {String|HTMLElement} selector
    @return {RSVP.Promise}
    @public
  */
  function blur(selector) {
    if (!selector) {
      return;
    }

    var el = (0, _getElementWithAssert.default)(selector);

    if ((0, _isFocusable.default)(el)) {
      run(null, function () {
        var browserIsNotFocused = document.hasFocus && !document.hasFocus();

        // makes `document.activeElement` be `body`.
        // If the browser is focused, it also fires a blur event
        el.blur();

        // Chrome/Firefox does not trigger the `blur` event if the window
        // does not have focus. If the document does not have focus then
        // fire `blur` event via native event.
        if (browserIsNotFocused) {
          (0, _fireEvent.fireEvent)(el, 'blur', { bubbles: false });
        }
      });
    }

    return (window.wait || _wait.default)();
  }
});