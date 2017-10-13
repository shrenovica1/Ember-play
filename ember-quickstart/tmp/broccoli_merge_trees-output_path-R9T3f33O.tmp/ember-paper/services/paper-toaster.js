define('ember-paper/services/paper-toaster', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed,
      assign = Ember.assign,
      run = Ember.run,
      A = Ember.A,
      Service = Ember.Service,
      tryInvoke = Ember.tryInvoke,
      EObject = Ember.Object;


  var DEFAULT_PROPS = {
    duration: 3000,
    position: 'bottom left'
  };

  exports.default = Service.extend({
    queue: A(),

    activeToast: computed.reads('queue.firstObject'),

    show: function show(text, options) {
      var t = EObject.create(assign({ text: text, show: true }, this.buildOptions(options)));
      this.get('queue').pushObject(t);
      return t;
    },
    showComponent: function showComponent(componentName, options) {
      var t = EObject.create(assign({ componentName: componentName, show: true }, this.buildOptions(options)));
      this.get('queue').pushObject(t);
      return t;
    },
    cancelToast: function cancelToast(toast) {
      var _this = this;

      toast.set('show', false);

      if (this.get('activeToast') === toast) {
        run.later(function () {
          tryInvoke(toast, 'onClose');
          _this.get('queue').removeObject(toast);
        }, 400);
      } else {
        tryInvoke(toast, 'onClose');
        this.get('queue').removeObject(toast);
      }
    },
    buildOptions: function buildOptions(options) {
      return assign({}, DEFAULT_PROPS, options);
    }
  });
});