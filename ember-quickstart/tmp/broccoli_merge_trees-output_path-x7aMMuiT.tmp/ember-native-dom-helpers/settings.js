define('ember-native-dom-helpers/settings', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var TestSupportSettings = function () {
    function TestSupportSettings() {
      var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { rootElement: '#ember-testing' };

      _classCallCheck(this, TestSupportSettings);

      this._rootElement = init.rootElement;
    }

    /*
      Setting for Ember app root element, default is #ember-testing
       @public rootElement
      @type String
    */


    _createClass(TestSupportSettings, [{
      key: 'rootElement',
      get: function get() {
        return this._rootElement;
      },
      set: function set(value) {
        this._rootElement = value;
      }
    }]);

    return TestSupportSettings;
  }();

  var settings = new TestSupportSettings();

  exports.default = settings;
});