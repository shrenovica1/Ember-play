define('ember-quickstart/tests/integration/components/single-restaurant-popular-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('single-restaurant-popular', 'Integration | Component | single restaurant popular', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "VhLlzSfJ",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"single-restaurant-popular\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "muhyW/xV",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"single-restaurant-popular\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});