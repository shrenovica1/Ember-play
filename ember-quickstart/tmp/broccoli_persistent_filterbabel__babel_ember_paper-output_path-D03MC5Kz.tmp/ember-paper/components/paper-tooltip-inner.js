define('ember-paper/components/paper-tooltip-inner', ['exports', 'ember-paper/templates/components/paper-tooltip-inner', 'ember-css-transitions/mixins/transition-mixin', 'ember-paper/utils/calculate-tooltip-position'], function (exports, _paperTooltipInner, _transitionMixin, _calculateTooltipPosition) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      run = Ember.run,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend(_transitionMixin.default, {
    layout: _paperTooltipInner.default,
    tagName: 'md-tooltip',
    attributeBindings: ['style'],
    classNames: ['md-tooltip', 'md-panel'],
    classNameBindings: ['positionClass'],
    transitionClassNameBindings: ['show:md-show', 'hide:md-hide'],
    show: computed.bool('style'),

    positionClass: computed('position', function () {
      return 'md-origin-' + this.get('position');
    }),

    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      run.schedule('afterRender', function () {
        if (!_this.isDestroyed) {
          var anchorElement = _this.get('anchorElement');
          var pos = (0, _calculateTooltipPosition.default)(_this.element, anchorElement, _this.get('position'));
          _this.set('style', htmlSafe('top: ' + pos.top + 'px; left: ' + pos.left + 'px'));
          _this.set('hide', true);
          (0, _transitionMixin.nextTick)().then(_transitionMixin.nextTick).then(_transitionMixin.nextTick).then(_transitionMixin.nextTick).then(function () {
            if (!_this.isDestroyed) {
              _this.set('hide', false);
            }
          });
        }
      });
    }
  });
});