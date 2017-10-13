define('ember-paper/components/paper-select', ['exports', 'ember-paper/templates/components/paper-select', 'ember-power-select/components/power-select', 'ember-paper/mixins/validation-mixin', 'ember-paper/mixins/child-mixin', 'ember-paper/mixins/focusable-mixin'], function (exports, _paperSelect, _powerSelect, _validationMixin, _childMixin, _focusableMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed;


  function concatWithProperty(strings, property) {
    if (property) {
      strings.push(property);
    }
    return strings.join(' ');
  }

  /**
   * @class PaperSelect
   * @extends PaperInput
   */
  exports.default = _powerSelect.default.extend(_validationMixin.default, _childMixin.default, _focusableMixin.default, {
    layout: _paperSelect.default,
    tagName: 'md-input-container',
    onchange: computed.alias('onChange'),
    optionsComponent: 'paper-select-options',
    triggerComponent: 'paper-select-trigger',
    beforeOptionsComponent: 'paper-select-search',
    classNameBindings: ['isInvalidAndTouched:md-input-invalid', 'selected:md-input-has-value', 'focusedAndSelected:md-input-focused'],
    searchEnabled: false,
    validationProperty: 'selected',
    isTouched: false,
    isInvalidAndTouched: computed.and('isInvalid', 'isTouched'),
    attributeBindings: ['parentTabindex:tabindex'],
    shouldShowLabel: computed.and('label', 'selected'),
    focusedAndSelected: computed.and('focused', 'selected'),

    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      this.notifyValidityChange();
    },


    concatenatedTriggerClasses: computed('triggerClass', 'publicAPI.isActive', function () {
      var classes = ['ember-power-select-trigger'];
      if (this.get('isInvalid')) {
        classes.push('ng-invalid');
      }
      if (this.get('isTouched')) {
        classes.push('ng-dirty');
      }
      if (this.get('publicAPI.isActive')) {
        classes.push('ember-power-select-trigger--active');
      }
      return concatWithProperty(classes, this.get('triggerClass'));
    }),
    actions: {
      onClose: function onClose() {
        this._super.apply(this, arguments);
        this.set('isTouched', true);
        this.notifyValidityChange();
      },
      onOpen: function onOpen() {
        this._super.apply(this, arguments);
        this.notifyValidityChange();
      }
    }
  });
});