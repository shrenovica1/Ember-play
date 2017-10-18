define('ember-paper/components/paper-autocomplete', ['exports', 'ember-power-select/components/power-select', 'ember-paper/templates/components/paper-autocomplete', 'ember-paper/mixins/validation-mixin', 'ember-paper/mixins/child-mixin', 'ember-power-select/utils/group-utils', 'ember-paper/utils/calculate-ac-position'], function (exports, _powerSelect, _paperAutocomplete, _validationMixin, _childMixin, _groupUtils, _calculateAcPosition) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var assert = Ember.assert,
      computed = Ember.computed,
      inject = Ember.inject,
      isNone = Ember.isNone,
      defineProperty = Ember.defineProperty;
  exports.default = _powerSelect.default.extend(_validationMixin.default, _childMixin.default, {
    layout: _paperAutocomplete.default,
    calculatePosition: _calculateAcPosition.default,

    util: inject.service(),
    constants: inject.service(),
    triggerComponent: 'paper-autocomplete-trigger',
    contentComponent: 'paper-autocomplete-content',
    optionsComponent: 'paper-autocomplete-options',
    triggerWrapperComponent: 'paper-autocomplete-trigger-container',

    concatenatedDropdownClasses: ['md-autocomplete-suggestions-container md-virtual-repeat-container'],

    extra: computed('labelPath', 'label', function () {
      return this.getProperties('label', 'labelPath');
    }),
    onfocus: computed.alias('onFocus'),
    onblur: computed.alias('onBlur'),
    onchange: null,
    oninput: null,
    validationProperty: computed('onSearchTextChange', 'onSelectionChange', function () {
      if (this.get('onSearchTextChange')) {
        return 'searchText';
      } else {
        return 'selected';
      }
    }),
    searchText: '',
    _onChangeNop: function _onChangeNop() {},


    // Don't automatically highlight any option
    defaultHighlighted: null,

    init: function init() {
      this._initComponent();
      this._super.apply(this, arguments);
    },


    // Init autocomplete component
    _initComponent: function _initComponent() {
      var _getProperties = this.getProperties('onSearchTextChange', 'onSelectionChange'),
          onSearchTextChange = _getProperties.onSearchTextChange,
          onSelectionChange = _getProperties.onSelectionChange;

      var hasTextChange = onSearchTextChange && typeof onSearchTextChange === 'function';
      var hasSelectionChange = onSelectionChange && typeof onSelectionChange === 'function';

      assert('{{paper-autocomplete}} requires at least one of the `onSelectionChange` or `onSearchTextChange` functions to be provided.', hasTextChange || hasSelectionChange);

      var aliasOnChangeDepKey = hasSelectionChange ? 'onSelectionChange' : '_onChangeNop';
      defineProperty(this, 'oninput', computed.alias('onSearchTextChange'));
      defineProperty(this, 'onchange', computed.alias(aliasOnChangeDepKey));
    },


    // Choose highlighted item on key tab
    _handleKeyTab: function _handleKeyTab(e) {
      var publicAPI = this.get('publicAPI');
      if (publicAPI.isOpen && !isNone(publicAPI.highlighted)) {
        publicAPI.actions.choose(publicAPI.highlighted, e);
      }
      // e-p-s will close
      this._super.apply(this, arguments);
    },


    actions: {
      onTriggerMouseDown: function onTriggerMouseDown() {
        return false;
      },
      onFocus: function onFocus(event) {
        this.send('activate');
        var publicAPI = this.get('publicAPI');

        if (isNone(publicAPI.selected)) {
          publicAPI.actions.open(event);
        }

        var action = this.get('onfocus');
        if (action) {
          action(publicAPI, event);
        }
      },
      onBlur: function onBlur(event) {
        this.send('deactivate');
        var action = this.get('onblur');

        if (action) {
          action(this.get('publicAPI'), event);
        }

        this.notifyValidityChange();
      },
      onInput: function onInput(event) {
        var publicAPI = this.get('publicAPI');

        if (!publicAPI.isOpen && event.type !== 'change') {
          publicAPI.actions.open(event);
        }

        this.notifyValidityChange();
        return this._super.apply(this, arguments);
      },
      onCreate: function onCreate(text) {
        if (this.get('onCreate')) {
          this.get('onCreate')(text);
        }
        this.get('publicAPI').actions.close();
      },
      scrollTo: function scrollTo(option) {
        if (!document || !option) {
          return;
        }
        var publicAPI = this.get('publicAPI');
        var optionsList = document.getElementById('ember-power-select-options-' + publicAPI.uniqueId);

        if (!optionsList) {
          return;
        }

        var index = (0, _groupUtils.indexOfOption)(publicAPI.results, option);
        if (index === -1) {
          return;
        }
        // Update the scroll index
        this.updateState({ scrollIndex: index });
      }
    }
  });
});