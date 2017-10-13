define('ember-quickstart/tests/integration/components/popular-restaurants-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('popular-restaurants', 'Integration | Component | popular restaurants', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "mYtTqbmX",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"popular-restaurants\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "4nh2N/Op",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"popular-restaurants\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});