define('ember-basic-dropdown/test-support/helpers', ['exports', 'ember-native-dom-helpers', 'ember-test-helpers/wait'], function (exports, _emberNativeDomHelpers, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nativeTap = nativeTap;
  exports.clickTrigger = clickTrigger;
  exports.tapTrigger = tapTrigger;
  exports.fireKeydown = fireKeydown;

  exports.default = function () {
    registerAsyncHelper('clickDropdown', function (app, cssPath) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      clickTrigger(cssPath, options);
    });

    registerAsyncHelper('tapDropdown', function (app, cssPath) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      tapTrigger(cssPath, options);
    });
  };

  var registerAsyncHelper = Ember.Test.registerAsyncHelper;
  var run = Ember.run;
  var merge = Ember.merge;
  function nativeTap(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var touchStartEvent = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchStartEvent[key] = options[key];
    });
    run(function () {
      return document.querySelector(selector).dispatchEvent(touchStartEvent);
    });
    var touchEndEvent = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchEndEvent[key] = options[key];
    });
    run(function () {
      return document.querySelector(selector).dispatchEvent(touchEndEvent);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      var element = document.querySelector(scope);
      if (element.classList.contains('ember-basic-dropdown-trigger')) {
        selector = scope;
      } else {
        selector = scope + ' ' + selector;
      }
    }
    (0, _emberNativeDomHelpers.click)(selector, options);
    return (0, _wait.default)();
  }

  function tapTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    nativeTap(selector, options);
  }

  function fireKeydown(selector, k) {
    var oEvent = document.createEvent('Events');
    oEvent.initEvent('keydown', true, true);
    merge(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    run(function () {
      return document.querySelector(selector).dispatchEvent(oEvent);
    });
  }

  // acceptance helpers
});