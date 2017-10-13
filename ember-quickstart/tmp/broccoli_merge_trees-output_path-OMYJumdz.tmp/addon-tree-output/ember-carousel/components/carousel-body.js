define('ember-carousel/components/carousel-body', ['exports', 'ember-component', 'ember-carousel/templates/components/carousel-body'], function (exports, _emberComponent, _emberCarouselTemplatesComponentsCarouselBody) {
  exports['default'] = _emberComponent['default'].extend({
    layout: _emberCarouselTemplatesComponentsCarouselBody['default'],
    classNames: ['carousel-body']
  });
});