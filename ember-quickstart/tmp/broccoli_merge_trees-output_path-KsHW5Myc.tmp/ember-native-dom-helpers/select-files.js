define('ember-native-dom-helpers/select-files', ['exports', 'ember-native-dom-helpers/-private/get-element-with-assert', 'ember-native-dom-helpers/fire-event', 'ember-test-helpers/wait'], function (exports, _getElementWithAssert, _fireEvent, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectFiles = selectFiles;
  var run = Ember.run;
  var isArray = Ember.isArray;


  /*
    @method selectFiles
    @param {String|HTMLElement} selector
    @param {Array} flies
    @return {RSVP.Promise}
    @public
  */
  function selectFiles(selector) {
    var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var element = (0, _getElementWithAssert.default)(selector);

    (true && !(element.type === 'file') && Ember.assert('This is only used with file inputs.\n          Either change to a \'type="file"\' or use the \'triggerEvent\' helper.', element.type === 'file'));


    if (!isArray(files)) {
      files = [files];
    }

    (true && !(element.multiple || files.length <= 1) && Ember.assert('Can only handle multiple slection when an input is set to allow for multiple files.\n          Please add the property "multiple" to your file input.', element.multiple || files.length <= 1));


    run(function () {
      return (0, _fireEvent.fireEvent)(element, 'change', files);
    });
    return (window.wait || _wait.default)();
  }
});