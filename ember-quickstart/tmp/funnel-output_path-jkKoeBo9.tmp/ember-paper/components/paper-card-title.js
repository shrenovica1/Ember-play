/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-title';

const { Component } = Ember;

/**
 * @class PaperCardTitle
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-title'
});
