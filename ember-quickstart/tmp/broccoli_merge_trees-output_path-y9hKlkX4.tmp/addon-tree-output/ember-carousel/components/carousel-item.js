define('ember-carousel/components/carousel-item', ['exports', 'ember-component', 'ember-carousel/templates/components/carousel-item', 'ember-computed', 'ember-metal/get', 'ember-metal/set'], function (exports, _emberComponent, _emberCarouselTemplatesComponentsCarouselItem, _emberComputed, _emberMetalGet, _emberMetalSet) {
  exports['default'] = _emberComponent['default'].extend({
    classNameBindings: [':carousel-item', 'isActive:active', 'slidingIn:slide-in', 'slidingOut:slide-out', 'from'],

    layout: _emberCarouselTemplatesComponentsCarouselItem['default'],
    index: 0,
    _carouselContainer: null,

    didInsertElement: function didInsertElement() {
      var carouselContainer = this.nearestWithProperty('isCarouselParentContainer');

      (0, _emberMetalSet['default'])(this, '_carouselContainer', carouselContainer);
      carouselContainer.registerCarouselItem(this);
      (0, _emberMetalSet['default'])(this, 'index', (0, _emberMetalGet['default'])(carouselContainer, 'totalCarouselItems') - 1);
    },

    isActive: (0, _emberComputed['default'])('_carouselContainer.carouselItems.[]', function () {
      return this === (0, _emberMetalGet['default'])(this, '_carouselContainer.carouselItems.firstObject');
    })
  });
});