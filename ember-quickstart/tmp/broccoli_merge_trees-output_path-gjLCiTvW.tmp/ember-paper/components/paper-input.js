define('ember-paper/components/paper-input', ['exports', 'ember-paper/templates/components/paper-input', 'ember-paper/mixins/focusable-mixin', 'ember-paper/mixins/color-mixin', 'ember-paper/mixins/child-mixin', 'ember-paper/mixins/validation-mixin'], function (exports, _paperInput, _focusableMixin, _colorMixin, _childMixin, _validationMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      $ = Ember.$,
      computed = Ember.computed,
      isEmpty = Ember.isEmpty,
      run = Ember.run,
      assert = Ember.assert;
  exports.default = Component.extend(_focusableMixin.default, _colorMixin.default, _childMixin.default, _validationMixin.default, {
    layout: _paperInput.default,
    tagName: 'md-input-container',
    classNames: ['md-default-theme'],
    classNameBindings: ['hasValue:md-input-has-value', 'isInvalidAndTouched:md-input-invalid', 'hasLeftIcon:md-icon-left', 'hasRightIcon:md-icon-right', 'focused:md-input-focused', 'block:md-block'],
    type: 'text',
    autofocus: false,
    tabindex: null,
    hideAllMessages: false,
    isTouched: false,

    iconComponent: 'paper-icon',

    // override validation mixin `isInvalid` to account for the native input validity
    isInvalid: computed.or('hasErrorMessages', 'isNativeInvalid'),

    hasValue: computed('value', 'isNativeInvalid', function () {
      var value = this.get('value');
      var isNativeInvalid = this.get('isNativeInvalid');
      return !isEmpty(value) || isNativeInvalid;
    }),

    inputElementId: computed('elementId', function () {
      return 'input-' + this.get('elementId');
    }),

    renderCharCount: computed('value', function () {
      var currentLength = this.get('value') ? this.get('value').length : 0;
      return currentLength + '/' + this.get('maxlength');
    }),

    hasLeftIcon: computed.bool('icon'),
    hasRightIcon: computed.bool('iconRight'),
    isInvalidAndTouched: computed.and('isInvalid', 'isTouched'),

    validationProperty: 'value', // property that validations should be run on

    // Lifecycle hooks
    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      assert('{{paper-input}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);
      this.notifyValidityChange();
    },
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      if (this.get('textarea')) {
        $(window).on('resize.' + this.elementId, run.bind(this, this.growTextarea));
      }
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);
      // setValue below ensures that the input value is the same as this.value
      this.setValue(this.get('value'));
      this.growTextarea();
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (this.get('textarea')) {
        $(window).off('resize.' + this.elementId);
      }
    },
    growTextarea: function growTextarea() {
      if (this.get('textarea')) {
        var inputElement = this.$('input, textarea');
        inputElement.addClass('md-no-flex').attr('rows', 1);

        var minRows = this.get('passThru.rows');
        var height = this.getHeight(inputElement);
        if (minRows) {
          if (!this.lineHeight) {
            inputElement.get(0).style.minHeight = 0;
            this.lineHeight = inputElement.get(0).clientHeight;
            inputElement.get(0).style.minHeight = null;
          }
          if (this.lineHeight) {
            height = Math.max(height, this.lineHeight * minRows);
          }
          var proposedHeight = Math.round(height / this.lineHeight);
          var maxRows = this.get('passThru.maxRows') || Number.MAX_VALUE;
          var rowsToSet = Math.min(proposedHeight, maxRows);
          inputElement.css('height', this.lineHeight * rowsToSet + 'px').attr('rows', rowsToSet).toggleClass('md-textarea-scrollable', proposedHeight >= maxRows);
        } else {
          inputElement.css('height', 'auto');
          inputElement.get(0).scrollTop = 0;
          var _height = this.getHeight(inputElement);
          if (_height) {
            inputElement.css('height', _height + 'px');
          }
        }

        inputElement.removeClass('md-no-flex');
      }
    },
    getHeight: function getHeight(inputElement) {
      var _inputElement$get = inputElement.get(0),
          offsetHeight = _inputElement$get.offsetHeight;

      var line = inputElement.get(0).scrollHeight - offsetHeight;
      return offsetHeight + (line > 0 ? line : 0);
    },
    setValue: function setValue(value) {
      if (this.$('input, textarea').val() !== value) {
        this.$('input, textarea').val(value);
      }
    },


    actions: {
      handleInput: function handleInput(e) {
        var _this = this;

        this.sendAction('onChange', e.target.value);
        // setValue below ensures that the input value is the same as this.value
        run.next(function () {
          if (_this.isDestroyed) {
            return;
          }
          _this.setValue(_this.get('value'));
        });
        this.growTextarea();
        var inputElement = this.$('input').get(0);
        this.set('isNativeInvalid', inputElement && inputElement.validity && inputElement.validity.badInput);
        this.notifyValidityChange();
      },
      handleBlur: function handleBlur(e) {
        this.sendAction('onBlur', e);
        this.set('isTouched', true);
        this.notifyValidityChange();
      }
    }
  });
});