define('ember-paper/components/paper-autocomplete-content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content', 'ember-paper/templates/components/paper-autocomplete-content'], function (exports, _content, _paperAutocompleteContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _content.default.extend({
    layout: _paperAutocompleteContent.default
  });
});