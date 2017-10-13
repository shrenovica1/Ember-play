define('ember-carousel/components/carousel-arrow', ['exports', 'ember-component', 'ember-carousel/templates/components/carousel-arrow', 'ember-computed', 'ember-metal/get'], function (exports, _emberComponent, _emberCarouselTemplatesComponentsCarouselArrow, _emberComputed, _emberMetalGet) {

  var carouselArrowClassMap = {
    left: 'carousel-left-arrow',
    right: 'carousel-right-arrow'
  };

  var carouselSlideActionMap = {
    left: 'slideLeft',
    right: 'slideRight'
  };

  exports['default'] = _emberComponent['default'].extend({
    classNamesBindings: ['carousel-arrow-class'],
    layout: _emberCarouselTemplatesComponentsCarouselArrow['default'],

    'carousel-arrow-class': (0, _emberComputed['default'])('direction', function () {
      return carouselArrowClassMap[(0, _emberMetalGet['default'])(this, 'direction')];
    }),

    click: function click() {
      var method = carouselSlideActionMap[(0, _emberMetalGet['default'])(this, 'direction')];
      this.nearestWithProperty('isCarouselParentContainer')[method]();
    }
  });
});