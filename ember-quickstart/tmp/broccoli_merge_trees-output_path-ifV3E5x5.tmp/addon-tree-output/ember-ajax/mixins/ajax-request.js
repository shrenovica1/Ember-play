define('ember-ajax/mixins/ajax-request', ['exports', 'ember-ajax/errors', 'ember-ajax/utils/ajax', 'ember-ajax/-private/utils/parse-response-headers', 'ember-ajax/-private/utils/get-header', 'ember-ajax/-private/utils/url-helpers', 'ember-ajax/-private/utils/is-string', 'ember-ajax/-private/promise'], function (exports, _errors, _ajax, _parseResponseHeaders, _getHeader, _urlHelpers, _isString, _promise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var A = Ember.A,
      EmberError = Ember.Error,
      Logger = Ember.Logger,
      Mixin = Ember.Mixin,
      Test = Ember.Test,
      get = Ember.get,
      isEmpty = Ember.isEmpty,
      merge = Ember.merge,
      run = Ember.run,
      runInDebug = Ember.runInDebug,
      testing = Ember.testing,
      warn = Ember.warn;

  var JSONContentType = /^application\/(?:vnd\.api\+)?json/i;

  function isJSONContentType(header) {
    if (!(0, _isString.default)(header)) {
      return false;
    }
    return !!header.match(JSONContentType);
  }

  function isJSONStringifyable(method, _ref) {
    var contentType = _ref.contentType,
        data = _ref.data,
        headers = _ref.headers;

    if (method === 'GET') {
      return false;
    }

    if (!isJSONContentType(contentType) && !isJSONContentType((0, _getHeader.default)(headers, 'Content-Type'))) {
      return false;
    }

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
      return false;
    }

    return true;
  }

  function startsWithSlash(string) {
    return string.charAt(0) === '/';
  }

  function endsWithSlash(string) {
    return string.charAt(string.length - 1) === '/';
  }

  function removeLeadingSlash(string) {
    return string.substring(1);
  }

  function stripSlashes(path) {
    // make sure path starts with `/`
    if (startsWithSlash(path)) {
      path = removeLeadingSlash(path);
    }

    // remove end `/`
    if (endsWithSlash(path)) {
      path = path.slice(0, -1);
    }
    return path;
  }

  var pendingRequestCount = 0;
  if (testing) {
    Test.registerWaiter(function () {
      return pendingRequestCount === 0;
    });
  }

  /**
   * AjaxRequest Mixin
   *
   * @public
   * @mixin
   */
  exports.default = Mixin.create({

    /**
     * The default value for the request `contentType`
     *
     * For now, defaults to the same value that jQuery would assign.  In the
     * future, the default value will be for JSON requests.
     * @property {string} contentType
     * @public
     * @default
     */
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

    /**
     * Headers to include on the request
     *
     * Some APIs require HTTP headers, e.g. to provide an API key. Arbitrary
     * headers can be set as key/value pairs on the `RESTAdapter`'s `headers`
     * object and Ember Data will send them along with each ajax request.
     *
     * ```javascript
     * // app/services/ajax.js
     * import AjaxService from 'ember-ajax/services/ajax';
     *
     * export default AjaxService.extend({
     *   headers: {
     *     'API_KEY': 'secret key',
     *     'ANOTHER_HEADER': 'Some header value'
     *   }
     * });
     * ```
     *
     * `headers` can also be used as a computed property to support dynamic
     * headers.
     *
     * ```javascript
     * // app/services/ajax.js
     * import Ember from 'ember';
     * import AjaxService from 'ember-ajax/services/ajax';
     *
     * const {
     *   computed,
     *   get,
     *   inject: { service }
     * } = Ember;
     *
     * export default AjaxService.extend({
     *   session: service(),
     *   headers: computed('session.authToken', function() {
     *     return {
     *       'API_KEY': get(this, 'session.authToken'),
     *       'ANOTHER_HEADER': 'Some header value'
     *     };
     *   })
     * });
     * ```
     *
     * In some cases, your dynamic headers may require data from some object
     * outside of Ember's observer system (for example `document.cookie`). You
     * can use the `volatile` function to set the property into a non-cached mode
     * causing the headers to be recomputed with every request.
     *
     * ```javascript
     * // app/services/ajax.js
     * import Ember from 'ember';
     * import AjaxService from 'ember-ajax/services/ajax';
     *
     * const {
     *   computed,
     *   get,
     *   inject: { service }
     * } = Ember;
     *
     * export default AjaxService.extend({
     *   session: service(),
     *   headers: computed('session.authToken', function() {
     *     return {
     *       'API_KEY': get(document.cookie.match(/apiKey\=([^;]*)/), '1'),
     *       'ANOTHER_HEADER': 'Some header value'
     *     };
     *   }).volatile()
     * });
     * ```
     *
     * @property {Object} headers
     * @public
     * @default
     */
    headers: {},

    /**
     * Make an AJAX request, ignoring the raw XHR object and dealing only with
     * the response
     *
     * @method request
     * @public
     * @param {string} url The url to make a request to
     * @param {Object} options The options for the request
     * @return {Promise} The result of the request
     */
    request: function request(url, options) {
      var hash = this.options(url, options);
      var internalPromise = this._makeRequest(hash);

      var ajaxPromise = new _promise.default(function (resolve, reject) {
        internalPromise.then(function (_ref2) {
          var response = _ref2.response;

          resolve(response);
        }).catch(function (_ref3) {
          var response = _ref3.response;

          reject(response);
        });
      }, 'ember-ajax: ' + hash.type + ' ' + hash.url + ' response');

      ajaxPromise.xhr = internalPromise.xhr;

      return ajaxPromise;
    },


    /**
     * Make an AJAX request, returning the raw XHR object along with the response
     *
     * @method raw
     * @public
     * @param {string} url The url to make a request to
     * @param {Object} options The options for the request
     * @return {Promise} The result of the request
     */
    raw: function raw(url, options) {
      var hash = this.options(url, options);
      return this._makeRequest(hash);
    },


    /**
     * Shared method to actually make an AJAX request
     *
     * @method _makeRequest
     * @private
     * @param {Object} hash The options for the request
     * @param {string} hash.url The URL to make the request to
     * @return {Promise} The result of the request
     */
    _makeRequest: function _makeRequest(hash) {
      var _this = this;

      var method = hash.method || hash.type || 'GET';
      var requestData = { method: method, type: method, url: hash.url };

      if (isJSONStringifyable(method, hash)) {
        hash.data = JSON.stringify(hash.data);
      }

      pendingRequestCount = pendingRequestCount + 1;

      var jqXHR = (0, _ajax.default)(hash);

      var promise = new _promise.default(function (resolve, reject) {
        jqXHR.done(function (payload, textStatus, jqXHR) {
          var response = _this.handleResponse(jqXHR.status, (0, _parseResponseHeaders.default)(jqXHR.getAllResponseHeaders()), payload, requestData);

          if ((0, _errors.isAjaxError)(response)) {
            run.join(null, reject, { payload: payload, textStatus: textStatus, jqXHR: jqXHR, response: response });
          } else {
            run.join(null, resolve, { payload: payload, textStatus: textStatus, jqXHR: jqXHR, response: response });
          }
        }).fail(function (jqXHR, textStatus, errorThrown) {
          runInDebug(function () {
            var message = 'The server returned an empty string for ' + requestData.type + ' ' + requestData.url + ', which cannot be parsed into a valid JSON. Return either null or {}.';
            var validJSONString = !(textStatus === 'parsererror' && jqXHR.responseText === '');

            warn(message, validJSONString, {
              id: 'ds.adapter.returned-empty-string-as-JSON'
            });
          });

          var payload = _this.parseErrorResponse(jqXHR.responseText) || errorThrown;
          var response = void 0;

          if (errorThrown instanceof Error) {
            response = errorThrown;
          } else if (textStatus === 'timeout') {
            response = new _errors.TimeoutError();
          } else if (textStatus === 'abort') {
            response = new _errors.AbortError();
          } else {
            response = _this.handleResponse(jqXHR.status, (0, _parseResponseHeaders.default)(jqXHR.getAllResponseHeaders()), payload, requestData);
          }

          run.join(null, reject, { payload: payload, textStatus: textStatus, jqXHR: jqXHR, errorThrown: errorThrown, response: response });
        }).always(function () {
          pendingRequestCount = pendingRequestCount - 1;
        });
      }, 'ember-ajax: ' + hash.type + ' ' + hash.url);

      promise.xhr = jqXHR;

      return promise;
    },


    /**
     * calls `request()` but forces `options.type` to `POST`
     *
     * @method post
     * @public
     * @param {string} url The url to make a request to
     * @param {Object} options The options for the request
     * @return {Promise} The result of the request
     */
    post: function post(url, options) {
      return this.request(url, this._addTypeToOptionsFor(options, 'POST'));
    },


    /**
     * calls `request()` but forces `options.type` to `PUT`
     *
     * @method put
     * @public
     * @param {string} url The url to make a request to
     * @param {Object} options The options for the request
     * @return {Promise} The result of the request
     */
    put: function put(url, options) {
      return this.request(url, this._addTypeToOptionsFor(options, 'PUT'));
    },


    /**
     * calls `request()` but forces `options.type` to `PATCH`
     *
     * @method patch
     * @public
     * @param {string} url The url to make a request to
     * @param {Object} options The options for the request
     * @return {Promise} The result of the request
     */
    patch: function patch(url, options) {
      return this.request(url, this._addTypeToOptionsFor(options, 'PATCH'));
    },


    /**
     * calls `request()` but forces `options.type` to `DELETE`
     *
     * @method del
     * @public
     * @param {string} url The url to make a request to
     * @param {Object} options The options for the request
     * @return {Promise} The result of the request
     */
    del: function del(url, options) {
      return this.request(url, this._addTypeToOptionsFor(options, 'DELETE'));
    },


    /**
     * calls `request()` but forces `options.type` to `DELETE`
     *
     * Alias for `del()`
     *
     * @method delete
     * @public
     * @param {string} url The url to make a request to
     * @param {Object} options The options for the request
     * @return {Promise} The result of the request
     */
    delete: function _delete() {
      return this.del.apply(this, arguments);
    },


    /**
     * Wrap the `.get` method so that we issue a warning if
     *
     * Since `.get` is both an AJAX pattern _and_ an Ember pattern, we want to try
     * to warn users when they try using `.get` to make a request
     *
     * @method get
     * @public
     */
    get: function get(url) {
      if (arguments.length > 1 || url.indexOf('/') !== -1) {
        throw new EmberError('It seems you tried to use `.get` to make a request! Use the `.request` method instead.');
      }
      return this._super.apply(this, arguments);
    },


    /**
     * Manipulates the options hash to include the HTTP method on the type key
     *
     * @method _addTypeToOptionsFor
     * @private
     * @param {Object} options The original request options
     * @param {string} method The method to enforce
     * @return {Object} The new options, with the method set
     */
    _addTypeToOptionsFor: function _addTypeToOptionsFor(options, method) {
      options = options || {};
      options.type = method;
      return options;
    },


    /**
     * Get the full "headers" hash, combining the service-defined headers with
     * the ones provided for the request
     *
     * @method _getFullHeadersHash
     * @private
     * @param {Object} headers
     * @return {Object}
     */
    _getFullHeadersHash: function _getFullHeadersHash(headers) {
      var classHeaders = get(this, 'headers');
      var _headers = merge({}, classHeaders);
      return merge(_headers, headers);
    },


    /**
     * @method options
     * @private
     * @param {string} url
     * @param {Object} options
     * @return {Object}
     */
    options: function options(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = merge({}, options);
      options.url = this._buildURL(url, options);
      options.type = options.type || 'GET';
      options.dataType = options.dataType || 'json';
      options.contentType = isEmpty(options.contentType) ? get(this, 'contentType') : options.contentType;

      if (this._shouldSendHeaders(options)) {
        options.headers = this._getFullHeadersHash(options.headers);
      } else {
        options.headers = options.headers || {};
      }

      return options;
    },


    /**
     * Build a URL for a request
     *
     * If the provided `url` is deemed to be a complete URL, it will be returned
     * directly.  If it is not complete, then the segment provided will be combined
     * with the `host` and `namespace` options of the request class to create the
     * full URL.
     *
     * @private
     * @param {string} url the url, or url segment, to request
     * @param {Object} [options={}] the options for the request being made
     * @param {string} [options.host] the host to use for this request
     * @returns {string} the URL to make a request to
     */
    _buildURL: function _buildURL(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if ((0, _urlHelpers.isFullURL)(url)) {
        return url;
      }

      var urlParts = [];

      var host = options.host || get(this, 'host');
      if (host) {
        host = stripSlashes(host);
      }
      urlParts.push(host);

      var namespace = options.namespace || get(this, 'namespace');
      if (namespace) {
        namespace = stripSlashes(namespace);
        urlParts.push(namespace);
      }

      // If the URL has already been constructed (presumably, by Ember Data), then we should just leave it alone
      var hasNamespaceRegex = new RegExp('^(/)?' + namespace);
      if (hasNamespaceRegex.test(url)) {
        return url;
      }

      // *Only* remove a leading slash -- we need to maintain a trailing slash for
      // APIs that differentiate between it being and not being present
      if (startsWithSlash(url)) {
        url = removeLeadingSlash(url);
      }
      urlParts.push(url);

      return urlParts.join('/');
    },


    /**
     * Takes an ajax response, and returns the json payload or an error.
     *
     * By default this hook just returns the json payload passed to it.
     * You might want to override it in two cases:
     *
     * 1. Your API might return useful results in the response headers.
     *    Response headers are passed in as the second argument.
     *
     * 2. Your API might return errors as successful responses with status code
     *    200 and an Errors text or object.
     *
     * @method handleResponse
     * @private
     * @param  {Number} status
     * @param  {Object} headers
     * @param  {Object} payload
     * @param  {Object} requestData the original request information
     * @return {Object | AjaxError} response
     */
    handleResponse: function handleResponse(status, headers, payload, requestData) {
      var error = void 0;

      if (this.isSuccess(status, headers, payload)) {
        return payload;
      }

      // Allow overriding of error payload
      payload = this.normalizeErrorResponse(status, headers, payload);

      if (this.isUnauthorizedError(status, headers, payload)) {
        error = new _errors.UnauthorizedError(payload);
      } else if (this.isForbiddenError(status, headers, payload)) {
        error = new _errors.ForbiddenError(payload);
      } else if (this.isInvalidError(status, headers, payload)) {
        error = new _errors.InvalidError(payload);
      } else if (this.isBadRequestError(status, headers, payload)) {
        error = new _errors.BadRequestError(payload);
      } else if (this.isNotFoundError(status, headers, payload)) {
        error = new _errors.NotFoundError(payload);
      } else if (this.isAbortError(status, headers, payload)) {
        error = new _errors.AbortError(payload);
      } else if (this.isConflictError(status, headers, payload)) {
        error = new _errors.ConflictError(payload);
      } else if (this.isServerError(status, headers, payload)) {
        error = new _errors.ServerError(payload);
      } else {
        var detailedMessage = this.generateDetailedMessage(status, headers, payload, requestData);

        error = new _errors.AjaxError(payload, detailedMessage);
      }

      return error;
    },


    /**
     * Match the host to a provided array of strings or regexes that can match to a host
     *
     * @method matchHosts
     * @private
     * @param {string} host the host you are sending too
     * @param {RegExp | string} matcher a string or regex that you can match the host to.
     * @returns {Boolean} if the host passed the matcher
     */
    _matchHosts: function _matchHosts(host, matcher) {
      if (matcher.constructor === RegExp) {
        return matcher.test(host);
      } else if (typeof matcher === 'string') {
        return matcher === host;
      } else {
        Logger.warn('trustedHosts only handles strings or regexes.', matcher, 'is neither.');
        return false;
      }
    },


    /**
     * Determine whether the headers should be added for this request
     *
     * This hook is used to help prevent sending headers to every host, regardless
     * of the destination, since this could be a security issue if authentication
     * tokens are accidentally leaked to third parties.
     *
     * To avoid that problem, subclasses should utilize the `headers` computed
     * property to prevent authentication from being sent to third parties, or
     * implement this hook for more fine-grain control over when headers are sent.
     *
     * By default, the headers are sent if the host of the request matches the
     * `host` property designated on the class.
     *
     * @method _shouldSendHeaders
     * @private
     * @property {Object} hash request options hash
     * @returns {Boolean} whether or not headers should be sent
     */
    _shouldSendHeaders: function _shouldSendHeaders(_ref4) {
      var _this2 = this;

      var url = _ref4.url,
          host = _ref4.host;

      url = url || '';
      host = host || get(this, 'host') || '';

      var trustedHosts = get(this, 'trustedHosts') || A();

      var _parseURL = (0, _urlHelpers.parseURL)(url),
          hostname = _parseURL.hostname;

      // Add headers on relative URLs


      if (!(0, _urlHelpers.isFullURL)(url)) {
        return true;
      } else if (trustedHosts.find(function (matcher) {
        return _this2._matchHosts(hostname, matcher);
      })) {
        return true;
      }

      // Add headers on matching host
      return (0, _urlHelpers.haveSameHost)(url, host);
    },


    /**
     * Generates a detailed ("friendly") error message, with plenty
     * of information for debugging (good luck!)
     *
     * @method generateDetailedMessage
     * @private
     * @param  {Number} status
     * @param  {Object} headers
     * @param  {Object} payload
     * @param  {Object} requestData the original request information
     * @return {Object} request information
     */
    generateDetailedMessage: function generateDetailedMessage(status, headers, payload, requestData) {
      var shortenedPayload = void 0;
      var payloadContentType = (0, _getHeader.default)(headers, 'Content-Type') || 'Empty Content-Type';

      if (payloadContentType.toLowerCase() === 'text/html' && payload.length > 250) {
        shortenedPayload = '[Omitted Lengthy HTML]';
      } else {
        shortenedPayload = JSON.stringify(payload);
      }

      var requestDescription = requestData.type + ' ' + requestData.url;
      var payloadDescription = 'Payload (' + payloadContentType + ')';

      return ['Ember AJAX Request ' + requestDescription + ' returned a ' + status, payloadDescription, shortenedPayload].join('\n');
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a an authorized error.
     *
     * @method isUnauthorizedError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isUnauthorizedError: function isUnauthorizedError(status) {
      return (0, _errors.isUnauthorizedError)(status);
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a forbidden error.
     *
     * @method isForbiddenError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isForbiddenError: function isForbiddenError(status) {
      return (0, _errors.isForbiddenError)(status);
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a an invalid error.
     *
     * @method isInvalidError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isInvalidError: function isInvalidError(status) {
      return (0, _errors.isInvalidError)(status);
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a bad request error.
     *
     * @method isBadRequestError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isBadRequestError: function isBadRequestError(status) {
      return (0, _errors.isBadRequestError)(status);
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a "not found" error.
     *
     * @method isNotFoundError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isNotFoundError: function isNotFoundError(status) {
      return (0, _errors.isNotFoundError)(status);
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is an "abort" error.
     *
     * @method isAbortError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isAbortError: function isAbortError(status) {
      return (0, _errors.isAbortError)(status);
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a "conflict" error.
     *
     * @method isConflictError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isConflictError: function isConflictError(status) {
      return (0, _errors.isConflictError)(status);
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a server error.
     *
     * @method isServerError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isServerError: function isServerError(status) {
      return (0, _errors.isServerError)(status);
    },


    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a success.
     *
     * @method isSuccess
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isSuccess: function isSuccess(status) {
      return (0, _errors.isSuccess)(status);
    },


    /**
     * @method parseErrorResponse
     * @private
     * @param {string} responseText
     * @return {Object}
     */
    parseErrorResponse: function parseErrorResponse(responseText) {
      try {
        return JSON.parse(responseText);
      } catch (e) {
        return responseText;
      }
    },


    /**
     * Can be overwritten to allow re-formatting of error messages
     *
     * @method normalizeErrorResponse
     * @private
     * @param  {Number} status
     * @param  {Object} headers
     * @param  {Object} payload
     * @return {*} error response
     */
    normalizeErrorResponse: function normalizeErrorResponse(status, headers, payload) {
      return payload;
    }
  });
});