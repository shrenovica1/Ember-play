define('ember-paper/components/paper-speed-dial-actions-action', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      htmlSafe = Ember.String.htmlSafe;


  function getElementIndex(node) {
    var index = 0;
    while (node = node.previousElementSibling) {
      index++;
    }

    return index;
  }

  exports.default = Component.extend({
    classNames: ['md-fab-action-item'],
    attributeBindings: ['style'],

    style: computed('elementDidRender', 'speedDial.animation', 'speedDial.open', 'speedDial.direction', function () {
      if (!this.get('elementDidRender')) {
        return;
      }

      var animation = this.get('speedDial.animation');
      var open = this.get('speedDial.open');
      if (animation === 'fling') {
        if (!open) {
          return this.flingClosed();
        }
      } else if (animation === 'scale') {
        return this.scaleClosed();
      }
    }),

    didRender: function didRender() {
      this._super.apply(this, arguments);
      this.set('elementDidRender', true);
    },
    scaleClosed: function scaleClosed() {
      var items = this.get('speedDial.element').querySelectorAll('.md-fab-action-item');
      var open = this.get('speedDial.open');
      var index = getElementIndex(this.element);
      var delay = 65;
      var offsetDelay = index * delay;
      var startZIndex = 0;

      var opacity = open ? 1 : 0;
      var transform = open ? 'scale(1)' : 'scale(0)';
      var transitionDelay = (open ? offsetDelay : items.length - offsetDelay) + 'ms';

      // Make the items closest to the trigger have the highest z-index
      var zIndex = items.length - index + startZIndex;

      return htmlSafe('opacity: ' + opacity + '; transform: ' + transform + '; transition-delay: ' + transitionDelay + '; z-index: ' + zIndex + ';');
    },
    flingClosed: function flingClosed() {
      var triggerElement = this.get('speedDial.element').querySelector('md-fab-trigger');
      var direction = this.get('speedDial.direction');
      var index = getElementIndex(this.element);

      // Make sure to account for differences in the dimensions of the trigger verses the items
      // so that we can properly center everything; this helps hide the el's shadows behind
      // the trigger.
      var triggerItemHeightOffset = (triggerElement.clientHeight - this.element.clientHeight) / 2;
      var triggerItemWidthOffset = (triggerElement.clientWidth - this.element.clientWidth) / 2;

      var newPosition = void 0,
          axis = void 0;

      switch (direction) {
        case 'up':
          newPosition = this.element.scrollHeight * (index + 1) + triggerItemHeightOffset;
          axis = 'Y';
          break;
        case 'down':
          newPosition = -(this.element.scrollHeight * (index + 1) + triggerItemHeightOffset);
          axis = 'Y';
          break;
        case 'left':
          newPosition = this.element.scrollWidth * (index + 1) + triggerItemWidthOffset;
          axis = 'X';
          break;
        case 'right':
          newPosition = -(this.element.scrollWidth * (index + 1) + triggerItemWidthOffset);
          axis = 'X';
          break;
      }

      return htmlSafe('transform: translate' + axis + '(' + newPosition + 'px)');
    }
  });
});