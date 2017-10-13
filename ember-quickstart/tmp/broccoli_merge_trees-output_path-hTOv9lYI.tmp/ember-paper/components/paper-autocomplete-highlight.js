define('ember-paper/components/paper-autocomplete-highlight', ['exports', 'ember-paper/templates/components/paper-autocomplete-highlight'], function (exports, _paperAutocompleteHighlight) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend({
    layout: _paperAutocompleteHighlight.default,
    tagName: 'span',
    flags: '',

    highlight: computed('searchText', 'label', 'flags', function () {
      var text = '' + this.get('label');
      var flags = this.get('flags');
      var regex = this.getRegExp(this.get('searchText'), flags);

      var html = text.replace(regex, '<span class="highlight">$&</span>');
      return htmlSafe(html);
    }),

    sanitize: function sanitize(term) {
      if (!term) {
        return term;
      }
      return term.replace(/[\\^$*+?.()|{}[\]]/g, '\\$&');
    },
    getRegExp: function getRegExp(text, flags) {
      var str = '';
      if (flags.indexOf('^') >= 1) {
        str += '^';
      }
      str += text;
      if (flags.indexOf('$') >= 1) {
        str += '$';
      }
      return new RegExp(this.sanitize(str), flags.replace(/[$^]/g, ''));
    }
  });
});