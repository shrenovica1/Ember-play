define('ember-paper/components/paper-grid-tile-footer', ['exports', 'ember-paper/templates/components/paper-grid-tile-footer'], function (exports, _paperGridTileFooter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    layout: _paperGridTileFooter.default,
    tagName: 'md-grid-tile-footer'
  });
});