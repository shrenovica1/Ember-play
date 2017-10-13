define('ember-paper/components/paper-toast-inner', ['exports', 'ember-paper/templates/components/paper-toast-inner', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _paperToastInner, _transitionMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      run = Ember.run,
      computed = Ember.computed,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend(_transitionMixin.default, {
    layout: _paperToastInner.default,
    tagName: 'md-toast',
    transitionName: 'ng',

    dragging: false,

    x: 0,

    attributeBindings: ['style'],

    classNameBindings: ['left:md-left:md-right', 'top:md-top:md-bottom', 'capsule:md-capsule', 'dragging:md-dragging'],

    style: computed('x', function () {
      return htmlSafe('transform:translate(' + this.get('x') + 'px, 0)');
    }),

    setValueFromEvent: function setValueFromEvent(event) {
      this.set('x', event);
    },
    _setupHammer: function _setupHammer() {
      // Enable dragging the slider
      var containerManager = new Hammer.Manager(this.element, {
        dragLockToAxis: true,
        dragBlockHorizontal: true
      });
      var swipe = new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL, threshold: 10 });
      var pan = new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 10 });
      containerManager.add(swipe);
      containerManager.add(pan);
      containerManager.on('panstart', run.bind(this, this.dragStart)).on('panmove', run.bind(this, this.drag)).on('panend', run.bind(this, this.dragEnd)).on('swiperight swipeleft', run.bind(this, this.dragEnd));
      this._hammer = containerManager;
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      if (this.get('swipeToClose')) {
        this._setupHammer();
      }
    },
    didUpdateAttrs: function didUpdateAttrs() {
      this._super.apply(this, arguments);

      if (this.get('swipeToClose') && !this._hammer) {
        // if it is enabled and we didn't init hammer yet
        this._setupHammer();
      } else if (!this.get('swipeToClose') && this._hammer) {
        // if it is disabled and we did init hammer already
        this._teardownHammer();
      }
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (this._hammer) {
        this._teardownHammer();
      }
    },
    _teardownHammer: function _teardownHammer() {
      this._hammer.destroy();
      delete this._hammer;
    },
    dragStart: function dragStart(event) {
      if (!this.get('swipeToClose')) {
        return;
      }

      this.set('active', true);
      this.set('dragging', true);
      this.element.focus();

      this.setValueFromEvent(event.center.x);
    },
    drag: function drag(event) {
      if (!this.get('swipeToClose') || !this.get('dragging')) {
        return;
      }

      this.setValueFromEvent(event.deltaX);
    },
    dragEnd: function dragEnd() {
      if (!this.get('swipeToClose')) {
        return;
      }

      this.setProperties({
        active: false,
        dragging: false
      });
      this.sendAction('onClose');
    }
  });
});