import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('scientists');
  this.route('programmers');
  this.route('singup', { path: '/register' });
  this.route('singin', { path: '/signin' });
});

export default Router;
