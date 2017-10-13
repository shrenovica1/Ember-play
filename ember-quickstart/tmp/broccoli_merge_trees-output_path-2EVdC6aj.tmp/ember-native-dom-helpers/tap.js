define('ember-native-dom-helpers/tap', ['exports', 'ember-native-dom-helpers/-private/get-element-with-assert', 'ember-native-dom-helpers/fire-event', 'ember-native-dom-helpers/click', 'ember-test-helpers/wait'], function (exports, _getElementWithAssert, _fireEvent, _click, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.tap = tap;
  var run = Ember.run;


  /*
    @method tap
    @param {String|HTMLElement} selector
    @param {Object} options
    @return {RSVP.Promise}
    @public
  */
  function tap(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var el = (0, _getElementWithAssert.default)(selector);
    var touchstartEv = void 0,
        touchendEv = void 0;
    run(function () {
      return touchstartEv = (0, _fireEvent.fireEvent)(el, 'touchstart', options);
    });
    run(function () {
      return touchendEv = (0, _fireEvent.fireEvent)(el, 'touchend', options);
    });
    if (!touchstartEv.defaultPrevented && !touchendEv.defaultPrevented) {
      (0, _click.clickEventSequence)(el);
    }
    return (window.wait || _wait.default)();
  }
});