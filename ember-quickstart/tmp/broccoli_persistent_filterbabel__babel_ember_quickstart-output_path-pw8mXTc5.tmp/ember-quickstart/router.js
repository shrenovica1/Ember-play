define('ember-quickstart/router', ['ember-quickstart/config/environment'], function (_environment) {
  'use strict';

  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('scientists');
    this.route('programmers');
    this.route('singup');
    this.route('singin');
    this.route('home');
    this.route('popular-restaurants');
  });
});