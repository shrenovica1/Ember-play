define('ember-paper/components/paper-dialog-inner', ['exports', 'ember-paper/mixins/translate3d-mixin'], function (exports, _translate3dMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      run = Ember.run;
  exports.default = Component.extend(_translate3dMixin.default, {
    tagName: 'md-dialog',
    classNames: ['md-default-theme'],
    classNameBindings: ['contentOverflow:md-content-overflow', 'fullscreen:md-dialog-fullscreen'],

    onTranslateFromEnd: function onTranslateFromEnd() {
      if (this.get('focusOnOpen')) {
        var toFocus = this.$('[autofocus]').last();
        if (toFocus.length === 0) {
          toFocus = this.$('md-dialog-actions button').last();
        }
        toFocus.focus();
      }
    },
    onTranslateToEnd: function onTranslateToEnd($origin) {
      if ($origin) {
        $origin.focus();
      }
    },
    imagesLoaded: function imagesLoaded() {
      var content = this.element.querySelector('md-dialog-content');
      this.set('contentOverflow', content.scrollHeight > content.clientHeight);
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      // content overflow might change depending on load of images inside dialog.
      var images = this.$().find('img');
      images.on('load.' + this.elementId, run.bind(this, this.imagesLoaded));
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      var images = this.$().find('img');
      images.off('load.' + this.elementId);
    }
  });
});