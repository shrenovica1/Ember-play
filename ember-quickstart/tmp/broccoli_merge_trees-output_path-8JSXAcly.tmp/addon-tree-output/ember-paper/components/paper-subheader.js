define('ember-paper/components/paper-subheader', ['exports', 'ember-paper/templates/components/paper-subheader'], function (exports, _paperSubheader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    layout: _paperSubheader.default,
    tagName: 'h2',
    classNames: ['md-subheader']
  });
});