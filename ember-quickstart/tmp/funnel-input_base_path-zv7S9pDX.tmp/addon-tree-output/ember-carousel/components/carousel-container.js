define('ember-carousel/components/carousel-container', ['exports', 'ember-component', 'ember-carousel/templates/components/carousel-container', 'ember-computed', 'ember-runloop', 'ember-array/utils', 'ember-metal/get', 'ember-metal/set'], function (exports, _emberComponent, _emberCarouselTemplatesComponentsCarouselContainer, _emberComputed, _emberRunloop, _emberArrayUtils, _emberMetalGet, _emberMetalSet) {
  exports['default'] = _emberComponent['default'].extend({
    classNames: ['carousel-container'],

    layout: _emberCarouselTemplatesComponentsCarouselContainer['default'],
    transitionInterval: 500,
    isCarouselParentContainer: true,
    carouselItems: null,
    totalCarouselItems: (0, _emberComputed.reads)('carouselItems.length'),

    init: function init() {
      this._super.apply(this, arguments);
      (0, _emberMetalSet['default'])(this, 'carouselItems', (0, _emberArrayUtils.A)());
    },

    activeCarouselItem: (0, _emberComputed['default'])('carouselItems.length', 'carouselItems.@each.isActive', function () {
      return (0, _emberMetalGet['default'])(this, 'carouselItems').findBy('isActive');
    }),

    registerCarouselItem: function registerCarouselItem(carouselItem) {
      (0, _emberMetalGet['default'])(this, 'carouselItems').pushObject(carouselItem);
    },

    slide: function slide(newActiveIndex, direction) {
      var carouselItems = (0, _emberMetalGet['default'])(this, 'carouselItems');
      var activeCarouselItem = (0, _emberMetalGet['default'])(this, 'activeCarouselItem');
      var newActiveCarouselItem = carouselItems[newActiveIndex];
      var transitionInterval = (0, _emberMetalGet['default'])(this, 'transitionInterval');
      var transitionOffset = 50;

      (0, _emberRunloop['default'])(function () {
        (0, _emberMetalSet['default'])(activeCarouselItem, 'from', direction);
        (0, _emberMetalSet['default'])(newActiveCarouselItem, 'from', direction);
      });

      (0, _emberRunloop.later)(function () {
        (0, _emberMetalSet['default'])(activeCarouselItem, 'slidingOut', true);
        (0, _emberMetalSet['default'])(newActiveCarouselItem, 'slidingIn', true);
      }, transitionOffset);

      (0, _emberRunloop.later)(function () {
        activeCarouselItem.setProperties({
          slidingOut: false,
          from: null,
          isActive: false
        });

        newActiveCarouselItem.setProperties({
          slidingIn: false,
          from: null,
          isActive: true
        });
      }, transitionInterval + transitionOffset);
    },

    slideRight: function slideRight() {
      var direction = 'right';
      var activeIndex = (0, _emberMetalGet['default'])(this, 'activeCarouselItem.index');
      var newActiveIndex = activeIndex - 1;

      if (activeIndex === 0) {
        newActiveIndex = (0, _emberMetalGet['default'])(this, 'totalCarouselItems') - 1;
      }

      if ((0, _emberMetalGet['default'])(this, 'onSlide')) {
        this.sendAction('onSlide', {
          index: newActiveIndex,
          previousIndex: activeIndex,
          direction: direction
        });
      }

      this.slide(newActiveIndex, direction);
    },

    slideLeft: function slideLeft() {
      var direction = 'left';
      var activeIndex = (0, _emberMetalGet['default'])(this, 'activeCarouselItem.index');
      var newActiveIndex = activeIndex + 1;

      if (activeIndex === (0, _emberMetalGet['default'])(this, 'totalCarouselItems') - 1) {
        newActiveIndex = 0;
      }

      if ((0, _emberMetalGet['default'])(this, 'onSlide')) {
        this.sendAction('onSlide', {
          index: newActiveIndex,
          previousIndex: activeIndex,
          direction: direction
        });
      }

      this.slide(newActiveIndex, direction);
    }
  });
});