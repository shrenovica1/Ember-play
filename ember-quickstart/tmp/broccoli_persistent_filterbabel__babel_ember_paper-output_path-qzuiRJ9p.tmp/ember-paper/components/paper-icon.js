define('ember-paper/components/paper-icon', ['exports', 'ember-paper/templates/components/paper-icon', 'ember-paper/mixins/color-mixin'], function (exports, _paperIcon, _colorMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      Str = Ember.String;


  /**
   * @class PaperIcon
   * @extends Ember.Component
   * @uses ColorMixin
   */
  var PaperIconComponent = Component.extend(_colorMixin.default, {
    layout: _paperIcon.default,
    tagName: 'md-icon',
    classNames: ['paper-icon', 'md-font', 'material-icons', 'md-default-theme'],
    classNameBindings: ['spinClass'],
    attributeBindings: ['aria-label', 'title', 'sizeStyle:style', 'iconClass:md-font-icon'],

    icon: '',
    spin: false,
    reverseSpin: false,

    iconClass: computed('icon', 'positionalIcon', function () {
      var icon = this.getWithDefault('positionalIcon', this.get('icon'));
      return icon;
    }),

    'aria-label': computed.reads('iconClass'),

    spinClass: computed('spin', 'reverseSpin', function () {
      if (this.get('spin')) {
        return 'md-spin';
      } else if (this.get('reverseSpin')) {
        return 'md-spin-reverse';
      }
    }),

    sizeStyle: computed('size', function () {
      var size = this.get('size');

      if (size) {
        return Str.htmlSafe('height: ' + size + 'px; min-height: ' + size + 'px; min-width: ' + size + 'px; font-size: ' + size + 'px; line-height: ' + size + 'px;');
      }
    })
  });

  PaperIconComponent.reopenClass({
    positionalParams: ['positionalIcon']
  });

  exports.default = PaperIconComponent;
});