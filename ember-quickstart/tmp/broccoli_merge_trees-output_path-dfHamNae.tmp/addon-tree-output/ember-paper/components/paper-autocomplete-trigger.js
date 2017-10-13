define('ember-paper/components/paper-autocomplete-trigger', ['exports', 'ember-paper/templates/components/paper-autocomplete-trigger'], function (exports, _paperAutocompleteTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      isPresent = Ember.isPresent,
      isBlank = Ember.isBlank,
      run = Ember.run,
      get = Ember.get,
      computed = Ember.computed;
  exports.default = Component.extend({
    layout: _paperAutocompleteTrigger.default,
    tagName: 'md-autocomplete-wrap',
    classNames: ['md-show-clear-button'],
    classNameBindings: ['noLabel:md-whiteframe-z1', 'select.isOpen:md-menu-showing'],

    noLabel: computed.not('extra.label'),
    _innerText: computed.oneWay('searchText'),

    text: computed('selected', 'searchText', '_innerText', {
      get: function get() {
        var _getProperties = this.getProperties('selected', 'searchText', '_innerText'),
            selected = _getProperties.selected,
            searchText = _getProperties.searchText,
            _innerText = _getProperties._innerText;

        if (selected) {
          return this.getSelectedAsText();
        }
        return searchText ? searchText : _innerText;
      },
      set: function set(_, v) {
        var _getProperties2 = this.getProperties('selected', 'searchText'),
            selected = _getProperties2.selected,
            searchText = _getProperties2.searchText;

        this.set('_innerText', v);

        // searchText should always win
        if (!selected && isPresent(searchText)) {
          return searchText;
        }

        return v;
      }
    }),

    // Lifecycle hooks
    didUpdateAttrs: function didUpdateAttrs() {
      this._super.apply(this, arguments);
      /*
       * We need to update the input field with value of the selected option whenever we're closing
       * the select box. But we also close the select box when we're loading search results and when
       * we remove input text -- so protect against this
       */
      var oldSelect = this.get('_oldSelect');
      var oldLastSearchedText = this.get('_lastSearchedText');
      var oldLoading = this.get('_loading');

      var select = this.get('select');
      var loading = this.get('loading');
      var searchText = this.get('searchText');
      var lastSearchedText = this.get('lastSearchedText');

      if (oldSelect && oldSelect.isOpen && !select.isOpen && !loading && searchText) {
        this.set('text', this.getSelectedAsText());
      }

      if (lastSearchedText !== oldLastSearchedText) {
        if (isBlank(lastSearchedText)) {
          run.schedule('actions', null, select.actions.close, null, true);
        } else {
          run.schedule('actions', null, select.actions.open);
        }
      } else if (!isBlank(lastSearchedText) && get(this, 'options.length') === 0 && this.get('loading')) {
        run.schedule('actions', null, select.actions.close, null, true);
      } else if (oldLoading && !loading && this.get('options.length') > 0) {
        run.schedule('actions', null, select.actions.open);
      }

      this.setProperties({
        _oldSelect: select,
        _lastSearchedText: lastSearchedText,
        _loading: loading
      });
    },


    // Actions
    actions: {
      stopPropagation: function stopPropagation(e) {
        e.stopPropagation();
      },
      clear: function clear(e) {
        e.stopPropagation();
        this.set('text', '');
        if (this.get('onClear')) {
          this.get('onClear')();
        } else {
          this.get('select').actions.select(null);
          this.get('onInput')({ target: { value: '' } });
        }
        this.get('onFocus')(e);
        this.$('input').focus();
      },
      handleKeydown: function handleKeydown(e) {
        var isLetter = e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32; // Keys 0-9, a-z or SPACE
        var isSpecialKeyWhileClosed = !isLetter && !this.get('select.isOpen') && [13, 27, 38, 40].indexOf(e.keyCode) > -1;
        if (isLetter || isSpecialKeyWhileClosed) {
          e.stopPropagation();
        }
      },
      handleInputLocal: function handleInputLocal(e) {
        // If something is already selected when the user types, it should clear selection
        if (this.get('selected')) {
          this.get('select').actions.select(null);
        }
        this.get('onInput')(e.target ? e : { target: { value: e } });
        this.set('text', e.target ? e.target.value : e);
      }
    },
    // Methods
    getSelectedAsText: function getSelectedAsText() {
      var labelPath = this.get('extra.labelPath');
      if (labelPath) {
        return this.get('selected.' + labelPath);
      } else {
        return this.get('selected');
      }
    }
  });
});