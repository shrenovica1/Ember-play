define('ember-paper/mixins/validation-mixin', ['exports', 'ember-paper/validators/required', 'ember-paper/validators/min', 'ember-paper/validators/max', 'ember-paper/validators/minlength', 'ember-paper/validators/maxlength'], function (exports, _required, _min, _max, _minlength, _maxlength) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var Mixin = Ember.Mixin,
      computed = Ember.computed,
      A = Ember.A,
      assert = Ember.assert,
      isArray = Ember.isArray,
      Logger = Ember.Logger,
      get = Ember.get,
      loc = Ember.String.loc,
      isBlank = Ember.isBlank;


  /**
   * In order to make validation generic it is required that components using the validation mixin
   * specify what property the validation logic should be based on.
   *
   * @public
   *
   * @return computed property that depends on the supplied property name
   */
  function buildComputedValidationMessages(property) {
    var validations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var customValidations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var validationParams = validations.map(function (v) {
      return get(v, 'param');
    }).filter(function (v) {
      return !isBlank(v);
    });
    var customValidationParams = customValidations.map(function (v) {
      return get(v, 'param');
    }).filter(function (v) {
      return !isBlank(v);
    });

    return computed.apply(undefined, [property, 'errors.[]', 'customValidations.[]'].concat(_toConsumableArray(validationParams), _toConsumableArray(customValidationParams), [function () {
      var _this = this;

      var validations = A();
      var messages = A();

      // built-in validations
      validations.pushObjects(this.validations());

      // custom validations
      var customValidations = this.get('customValidations');
      assert('`customValidations` must be an array', isArray(customValidations));
      validations.pushObjects(customValidations);

      // execute validations
      var currentValue = this.get(property);
      validations.forEach(function (validation) {
        assert('validation must include an `validate(value)` function', validation && validation.validate && typeof validation.validate === 'function');
        try {
          var valParam = get(validation, 'param');
          var paramValue = valParam ? _this.get(valParam) : undefined;
          if (!validation.validate(currentValue, paramValue)) {
            var message = _this.get('errorMessages.' + valParam) || get(validation, 'message');
            messages.pushObject({
              message: loc(message.string || message, paramValue, currentValue)
            });
          }
        } catch (error) {
          Logger.error('Exception with validation: ', validation, error);
        }
      });

      // error messages array
      var errors = this.get('errors') || [];
      assert('`errors` must be an array', isArray(errors));
      messages.pushObjects(errors.map(function (e) {
        return get(e, 'message') ? e : { message: e };
      }));

      return messages;
    }]));
  }

  /**
   * @class ValidationMixin
   * @extends Ember.Mixin
   */
  exports.default = Mixin.create({
    validationErrorMessages: null,
    lastIsInvalid: undefined,
    validationProperty: null, // property that validation should be based on

    init: function init() {
      this._super.apply(this, arguments);
      assert('validationProperty must be set', this.get('validationProperty'));
      if (!this.get('validationErrorMessages')) {
        var computedValidationMessages = buildComputedValidationMessages(this.get('validationProperty'), this.validations(), this.get('customValidations'));
        this.set('validationErrorMessages', computedValidationMessages);
      }
    },


    hasErrorMessages: computed.bool('validationErrorMessages.length'),

    /**
     * The result of isInvalid is appropriate for controlling the display of
     * validation error messages. It also may be used to distinguish whether
     * the input would be considered valid after it is touched.
     *
     * @public
     *
     * @return {boolean} Whether the input is or would be invalid.
     *    false: input is valid (touched or not), or is no longer rendered
     *    true: input has been touched and is invalid.
     */
    isInvalid: computed.reads('hasErrorMessages'),
    isValid: computed.not('isInvalid'),

    /**
     * Return the built-in validations.
     *
     * May be overridden to provide additional built-in validations. Be sure to
     * call this._super() to retrieve the standard validations.
     *
     * @public
     */
    validations: function validations() {
      return [_required.default, _min.default, _max.default, _minlength.default, _maxlength.default];
    },
    notifyValidityChange: function notifyValidityChange() {
      var isValid = this.get('isValid');
      var lastIsValid = this.get('lastIsValid');
      var isTouched = this.get('isTouched');
      var lastIsTouched = this.get('lastIsTouched');
      if (lastIsValid !== isValid || lastIsTouched !== isTouched) {
        this.sendAction('onValidityChange', isValid);
        this.set('lastIsValid', isValid);
        this.set('lastIsTouched', isTouched);
      }
    },

    customValidations: [],
    errors: []
  });
});