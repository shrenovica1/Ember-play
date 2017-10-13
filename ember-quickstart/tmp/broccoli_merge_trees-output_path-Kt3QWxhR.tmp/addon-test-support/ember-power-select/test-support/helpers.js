define('ember-power-select/test-support/helpers', ['exports', 'ember-test-helpers/wait', 'ember-native-dom-helpers'], function (exports, _wait, _emberNativeDomHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = undefined;
  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;

  exports.default = function () {
    registerAsyncHelper('selectChoose', function (_, cssPathOrTrigger, valueOrSelector, optionIndex) {
      return selectChoose(cssPathOrTrigger, valueOrSelector, optionIndex);
    });

    registerAsyncHelper('selectSearch', function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(app, cssPathOrTrigger, value) {
        var trigger, triggerPath, contentId, isMultipleSelect, content, dropdownIsClosed, isDefaultSingleSelect, inputIsInTrigger;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                trigger = void 0;

                if (!(cssPathOrTrigger instanceof HTMLElement)) {
                  _context2.next = 5;
                  break;
                }

                trigger = cssPathOrTrigger;
                _context2.next = 10;
                break;

              case 5:
                triggerPath = cssPathOrTrigger + ' .ember-power-select-trigger';

                trigger = (0, _emberNativeDomHelpers.find)(triggerPath);
                if (!trigger) {
                  triggerPath = cssPathOrTrigger;
                  trigger = (0, _emberNativeDomHelpers.find)(triggerPath);
                }

                if (trigger) {
                  _context2.next = 10;
                  break;
                }

                throw new Error('You called "selectSearch(\'' + cssPathOrTrigger + '\', \'' + value + '\')" but no select was found using selector "' + cssPathOrTrigger + '"');

              case 10:

                if (trigger.scrollIntoView) {
                  trigger.scrollIntoView();
                }

                contentId = '' + trigger.attributes['aria-owns'].value;
                isMultipleSelect = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-trigger-multiple-input', trigger);
                content = (0, _emberNativeDomHelpers.find)('#' + contentId);
                dropdownIsClosed = !content || content.classList.contains('ember-basic-dropdown-content-placeholder');

                if (!dropdownIsClosed) {
                  _context2.next = 20;
                  break;
                }

                _context2.next = 18;
                return (0, _emberNativeDomHelpers.click)(trigger);

              case 18:
                _context2.next = 20;
                return (0, _wait.default)();

              case 20:
                isDefaultSingleSelect = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-search-input');

                if (!isMultipleSelect) {
                  _context2.next = 26;
                  break;
                }

                _context2.next = 24;
                return (0, _emberNativeDomHelpers.fillIn)((0, _emberNativeDomHelpers.find)('.ember-power-select-trigger-multiple-input', trigger), value);

              case 24:
                _context2.next = 39;
                break;

              case 26:
                if (!isDefaultSingleSelect) {
                  _context2.next = 31;
                  break;
                }

                _context2.next = 29;
                return (0, _emberNativeDomHelpers.fillIn)('.ember-power-select-search-input', value);

              case 29:
                _context2.next = 39;
                break;

              case 31:
                // It's probably a customized version
                inputIsInTrigger = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-trigger input[type=search]', trigger);

                if (!inputIsInTrigger) {
                  _context2.next = 37;
                  break;
                }

                _context2.next = 35;
                return (0, _emberNativeDomHelpers.fillIn)((0, _emberNativeDomHelpers.find)('input[type=search]', trigger), value);

              case 35:
                _context2.next = 39;
                break;

              case 37:
                _context2.next = 39;
                return (0, _emberNativeDomHelpers.fillIn)('#' + contentId + ' .ember-power-select-search-input[type=search]', 'input');

              case 39:
                return _context2.abrupt('return', (0, _wait.default)());

              case 40:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
      };
    }());

    registerAsyncHelper('removeMultipleOption', function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(app, cssPath, value) {
        var elem, items, item;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                elem = void 0;
                items = (0, _emberNativeDomHelpers.findAll)(cssPath + ' .ember-power-select-multiple-options > li');
                item = items.find(function (el) {
                  return el.textContent.indexOf(value) > -1;
                });

                if (item) {
                  elem = (0, _emberNativeDomHelpers.find)('.ember-power-select-multiple-remove-btn', item);
                }
                _context3.prev = 4;
                _context3.next = 7;
                return (0, _emberNativeDomHelpers.click)(elem);

              case 7:
                return _context3.abrupt('return', (0, _wait.default)());

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](4);

                console.warn('css path to remove btn not found');
                throw _context3.t0;

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 10]]);
      }));

      return function (_x8, _x9, _x10) {
        return _ref3.apply(this, arguments);
      };
    }());

    registerAsyncHelper('clearSelected', function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(app, cssPath) {
        var elem;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                elem = (0, _emberNativeDomHelpers.find)(cssPath + ' .ember-power-select-clear-btn');
                _context4.prev = 1;
                _context4.next = 4;
                return (0, _emberNativeDomHelpers.click)(elem);

              case 4:
                return _context4.abrupt('return', (0, _wait.default)());

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](1);

                console.warn('css path to clear btn not found');
                throw _context4.t0;

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 7]]);
      }));

      return function (_x11, _x12) {
        return _ref4.apply(this, arguments);
      };
    }());
  };

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var registerAsyncHelper = Ember.Test.registerAsyncHelper;


  /**
   * @private
   * @param {String} selector CSS3 selector of the elements to check the content
   * @param {String} text Substring that the selected element must contain
   * @returns HTMLElement The first element that maches the given selector and contains the
   *                      given text
   */
  function findContains(selector, text) {
    return (0, _emberNativeDomHelpers.findAll)(selector).filter(function (e) {
      return e.textContent.trim().indexOf(text) > -1;
    })[0];
  }

  function nativeMouseDown(selectorOrDomElement, options) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'mousedown', options);
  }

  function nativeMouseUp(selectorOrDomElement, options) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'mouseup', options);
  }

  function triggerKeydown(domElement, k) {
    (0, _emberNativeDomHelpers.keyEvent)(domElement, 'keydown', k);
  }

  function typeInSearch(scopeOrText, text) {
    var scope = '';

    if (typeof text === 'undefined') {
      text = scopeOrText;
    } else {
      scope = scopeOrText;
    }

    var selectors = ['.ember-power-select-search-input', '.ember-power-select-search input', '.ember-power-select-trigger-multiple-input', 'input[type="search"]'].map(function (selector) {
      return scope + ' ' + selector;
    }).join(', ');

    return (0, _emberNativeDomHelpers.fillIn)(selectors, text);
  }

  function clickTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-power-select-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    return (0, _emberNativeDomHelpers.click)(selector, options);
  }

  function nativeTouch(selectorOrDomElement) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'touchstart');
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'touchend');
  }

  function touchTrigger() {
    nativeTouch('.ember-power-select-trigger');
  }

  var selectChoose = exports.selectChoose = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cssPathOrTrigger, valueOrSelector, optionIndex) {
      var trigger, target, contentId, content, options, potentialTargets, matchEq, index, option, filteredTargets;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              trigger = void 0, target = void 0;

              if (!(cssPathOrTrigger instanceof HTMLElement)) {
                _context.next = 5;
                break;
              }

              if (cssPathOrTrigger.classList.contains('ember-power-select-trigger')) {
                trigger = cssPathOrTrigger;
              } else {
                trigger = (0, _emberNativeDomHelpers.find)('.ember-power-select-trigger', cssPathOrTrigger);
              }
              _context.next = 9;
              break;

            case 5:
              trigger = (0, _emberNativeDomHelpers.find)(cssPathOrTrigger + ' .ember-power-select-trigger');

              if (!trigger) {
                trigger = (0, _emberNativeDomHelpers.find)(cssPathOrTrigger);
              }

              if (trigger) {
                _context.next = 9;
                break;
              }

              throw new Error('You called "selectChoose(\'' + cssPathOrTrigger + '\', \'' + valueOrSelector + '\')" but no select was found using selector "' + cssPathOrTrigger + '"');

            case 9:

              if (trigger.scrollIntoView) {
                trigger.scrollIntoView();
              }

              contentId = '' + trigger.attributes['aria-owns'].value;
              content = (0, _emberNativeDomHelpers.find)('#' + contentId);
              // If the dropdown is closed, open it

              if (!(!content || content.classList.contains('ember-basic-dropdown-content-placeholder'))) {
                _context.next = 17;
                break;
              }

              _context.next = 15;
              return (0, _emberNativeDomHelpers.click)(trigger);

            case 15:
              _context.next = 17;
              return (0, _wait.default)();

            case 17:

              // Select the option with the given text
              options = (0, _emberNativeDomHelpers.findAll)('#' + contentId + ' .ember-power-select-option');
              potentialTargets = options.filter(function (opt) {
                return opt.textContent.indexOf(valueOrSelector) > -1;
              });

              if (potentialTargets.length === 0) {
                // If treating the value as text doesn't gave use any result, let's try if it's a css selector
                matchEq = valueOrSelector.slice(-6).match(/:eq\((\d+)\)/);

                if (matchEq) {
                  index = parseInt(matchEq[1], 10);
                  option = (0, _emberNativeDomHelpers.findAll)('#' + contentId + ' ' + valueOrSelector.slice(0, -6))[index];
                  (true && !(true) && Ember.deprecate('Passing selectors with the `:eq()` pseudoselector is deprecated. If you want to select the nth option, pass a number as a third argument. E.g `selectChoose(".language-select", ".ember-power-select-option", 3)`', true, {
                    id: 'select-choose-no-eq-pseudoselector',
                    until: '1.8.0'
                  }));

                  if (option) {
                    potentialTargets = [option];
                  }
                } else {
                  potentialTargets = (0, _emberNativeDomHelpers.findAll)('#' + contentId + ' ' + valueOrSelector);
                }
              }
              if (potentialTargets.length > 1) {
                filteredTargets = [].slice.apply(potentialTargets).filter(function (t) {
                  return t.textContent.trim() === valueOrSelector;
                });

                if (optionIndex === undefined) {
                  target = filteredTargets[0] || potentialTargets[0];
                } else {
                  target = filteredTargets[optionIndex] || potentialTargets[optionIndex];
                }
              } else {
                target = potentialTargets[0];
              }

              if (target) {
                _context.next = 23;
                break;
              }

              throw new Error('You called "selectChoose(\'' + cssPathOrTrigger + '\', \'' + valueOrSelector + '\')" but "' + valueOrSelector + '" didn\'t match any option');

            case 23:
              _context.next = 25;
              return (0, _emberNativeDomHelpers.click)(target);

            case 25:
              return _context.abrupt('return', (0, _wait.default)());

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function selectChoose(_x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
});