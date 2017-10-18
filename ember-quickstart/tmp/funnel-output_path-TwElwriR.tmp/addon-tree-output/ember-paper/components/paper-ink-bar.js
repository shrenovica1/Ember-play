define('ember-paper/components/paper-ink-bar', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed,
      Component = Ember.Component,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend({
    tagName: 'md-ink-bar',

    attributeBindings: ['style'],
    classNameBindings: ['movingRight:md-right:md-left'],

    style: computed('left', 'right', function () {
      return htmlSafe('left: ' + this.get('left') + 'px; right: ' + this.get('right') + 'px;');
    })
  });
});