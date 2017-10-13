define('ember-paper/components/paper-progress-linear', ['exports', 'ember-paper/templates/components/paper-progress-linear', 'ember-paper/mixins/color-mixin'], function (exports, _paperProgressLinear, _colorMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var inject = Ember.inject,
      computed = Ember.computed,
      Component = Ember.Component,
      isPresent = Ember.isPresent,
      htmlSafe = Ember.String.htmlSafe;


  function makeTransform(value) {
    var scale = value / 100;
    var translateX = (value - 100) / 2;
    return 'translateX(' + translateX.toString() + '%) scale(' + scale.toString() + ', 1)';
  }

  var MODE_DETERMINATE = 'determinate';
  var MODE_INDETERMINATE = 'indeterminate';
  var MODE_BUFFER = 'buffer';
  var MODE_QUERY = 'query';

  /**
   * @class PaperProgressLinear
   * @extends Ember.Component
   * @uses ColorMixin
   */
  exports.default = Component.extend(_colorMixin.default, {
    layout: _paperProgressLinear.default,
    tagName: 'md-progress-linear',

    attributeBindings: ['mode:md-mode', 'bufferValue:md-buffer-value'],
    classNames: ['md-default-theme'],

    constants: inject.service(),

    mode: computed('value', function () {
      var value = this.get('value');
      var bufferValue = this.get('bufferValue');

      if (isPresent(value)) {
        if (isPresent(bufferValue)) {
          return MODE_BUFFER;
        } else {
          return MODE_DETERMINATE;
        }
      } else {
        return MODE_INDETERMINATE;
      }
    }),

    queryModeClass: computed('mode', function () {
      var mode = this.get('mode');
      if ([MODE_QUERY, MODE_BUFFER, MODE_DETERMINATE, MODE_INDETERMINATE].includes(mode)) {
        return 'md-mode-' + mode;
      } else {
        return '';
      }
    }),

    bar1Style: computed('clampedBufferValue', function () {
      return htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + makeTransform(this.get('clampedBufferValue')));
    }),

    bar2Style: computed('clampedValue', 'mode', function () {
      if (this.get('mode') === MODE_QUERY) {
        return htmlSafe('');
      }

      return htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + makeTransform(this.get('clampedValue')));
    }),

    clampedValue: computed('value', function () {
      var value = this.get('value');
      return Math.max(0, Math.min(value || 0, 100));
    }),

    clampedBufferValue: computed('bufferValue', function () {
      var value = this.get('bufferValue');
      return Math.max(0, Math.min(value || 0, 100));
    })

  });
});