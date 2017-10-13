define('ember-paper/utils/promise-proxies', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.promiseObject = promiseObject;
  exports.promiseArray = promiseArray;
  var Promise = Ember.RSVP.Promise,
      ArrayProxy = Ember.ArrayProxy,
      ObjectProxy = Ember.ObjectProxy,
      PromiseProxyMixin = Ember.PromiseProxyMixin;


  // See http://emberjs.com/api/data/classes/DS.PromiseArray.html
  var PromiseArray = exports.PromiseArray = ArrayProxy.extend(PromiseProxyMixin);
  // See http://emberjs.com/api/data/classes/DS.PromiseObject.html
  var PromiseObject = exports.PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

  function promiseObject(promise, label) {
    return PromiseObject.create({
      promise: Promise.resolve(promise, label)
    });
  }

  function promiseArray(promise, label) {
    return PromiseArray.create({
      promise: Promise.resolve(promise, label)
    });
  }
});