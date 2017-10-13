define('ember-paper/components/paper-radio-group', ['exports', 'ember-paper/templates/components/paper-radio-group', 'ember-paper/mixins/focusable-mixin', 'ember-composability-tools'], function (exports, _paperRadioGroup, _focusableMixin, _emberComposabilityTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      inject = Ember.inject,
      assert = Ember.assert;
  exports.default = Component.extend(_focusableMixin.default, _emberComposabilityTools.ParentMixin, {
    layout: _paperRadioGroup.default,
    tagName: 'md-radio-group',
    tabindex: 0,

    /* FocusableMixin Overrides */
    focusOnlyOnKey: true,

    radioComponent: 'paper-radio',

    constants: inject.service(),

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      assert('{{paper-radio-group}} requires an `onChange` action or null for no action', this.get('onChange') !== undefined);
    },


    enabledChildRadios: computed.filterBy('childComponents', 'disabled', false),
    childValues: computed.mapBy('enabledChildRadios', 'value'),

    keyDown: function keyDown(ev) {

      switch (ev.which) {
        case this.get('constants.KEYCODE.LEFT_ARROW'):
        case this.get('constants.KEYCODE.UP_ARROW'):
          ev.preventDefault();
          this.select(-1);
          break;
        case this.get('constants.KEYCODE.RIGHT_ARROW'):
        case this.get('constants.KEYCODE.DOWN_ARROW'):
          ev.preventDefault();
          this.select(1);
          break;
      }
    },
    select: function select(increment) {
      var groupValue = this.get('groupValue');
      var index = 0;

      if (groupValue) {
        index = this.get('childValues').indexOf(groupValue);
        index += increment;
        var length = this.get('childValues.length');
        index = (index % length + length) % length;
      }

      var childRadio = this.get('enabledChildRadios').objectAt(index);
      childRadio.set('focused', true);
      this.sendAction('onChange', childRadio.get('value'));
    },


    actions: {
      onChange: function onChange(value) {
        this.sendAction('onChange', value);
      }
    }
  });
});