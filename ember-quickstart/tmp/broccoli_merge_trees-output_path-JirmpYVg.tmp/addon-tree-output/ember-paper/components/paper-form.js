define('ember-paper/components/paper-form', ['exports', 'ember-paper/templates/components/paper-form', 'ember-paper/mixins/parent-mixin'], function (exports, _paperForm, _parentMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed;
  exports.default = Component.extend(_parentMixin.default, {
    layout: _paperForm.default,
    tagName: 'form',

    inputComponent: 'paper-input',
    submitButtonComponent: 'paper-button',
    selectComponent: 'paper-select',
    autocompleteComponent: 'paper-autocomplete',

    isValid: computed.not('isInvalid'),
    isInvalid: computed('childComponents.@each.isInvalid', function () {
      return this.get('childComponents').isAny('isInvalid');
    }),

    isTouched: computed('childComponents.@each.isTouched', function () {
      return this.get('childComponents').isAny('isTouched');
    }),

    isInvalidAndTouched: computed.and('isInvalid', 'isTouched'),

    submit: function submit() {
      this.send('onSubmit');
      return false;
    },


    actions: {
      onValidityChange: function onValidityChange() {
        if (this.get('lastIsValid') !== this.get('isValid') || this.get('lastIsTouched') !== this.get('isTouched')) {
          this.sendAction('onValidityChange', this.get('isValid'), this.get('isTouched'), this.get('isInvalidAndTouched'));
          this.set('lastIsValid', this.get('isValid'));
          this.set('lastIsTouched', this.get('isTouched'));
        }
      },
      onSubmit: function onSubmit() {
        if (this.get('isInvalid')) {
          this.get('childComponents').setEach('isTouched', true);
        } else {
          this.sendAction('onSubmit');
          this.get('childComponents').setEach('isTouched', false);
        }
      }
    }
  });
});