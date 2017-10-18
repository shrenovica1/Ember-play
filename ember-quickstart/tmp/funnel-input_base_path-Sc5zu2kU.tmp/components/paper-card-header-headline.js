/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperCardHeaderHeadline
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['md-headline']
});
