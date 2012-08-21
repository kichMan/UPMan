/**
* DOMHelper
* Handmade library, imitating jQuery
*/
/*jslint bitwise: true */
/*global unescape, us */

"use strict";
var us = us || {};

(function (window) {
    var self = this,
        /* Variables of global objects */
        document = window.document,
        navigator = window.navigator,
        location = window.location,

        /* Variables of properties of global objects */
        hasOwn = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,

        /* Caller helper*/
        $hlp = function (selector, context) {
            return Object.create($hlp.prototype, _init(selector, context));
        },

        /* Private properties and methods */
        _init = function (selector, context) {
            var elem = [],
                i = 0,
                tmp = {
                    context: {
                        value: null
                    },
                    length: {
                        value: 0
                    }
                };

            if (!selector) {
                return tmp;
            }

            if (selector.nodeType) {
                return {
                    context: {
                        value: selector
                    },
                    0: {
                        value: selector
                    },
                    length: {
                        value: 1
                    }
                };
            }

            if (selector === "body" && document.body) {
                return {
                    context: {
                        value: document
                    },
                    0: {
                        value: document.body
                    },
                    length: {
                        value: 1
                    }
                };
            }

            if (typeof selector === "string") {
                context = !context || !context.nodeType ? document : context;
                elem = context.querySelectorAll(selector);

                for (i; i < elem.length; i++) {
                    tmp[i] = {};
                    tmp[i].value = elem[i];
                }

                tmp.context.value = context;
                tmp.length.value = elem.length;

                return tmp;
            }
            /**
             * @todo to appropriate $context possibility as the instance of us.DOMHelper
             */

            return tmp;
        },

        _listReady = [],
        _bindReady = function () {
            if (_listReady.length) {
                return;
            }

            var DOMContentLoaded = function () {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                _moveReady();
            };

            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
            window.addEventListener("load", _moveReady, false);

        },
        _moveReady = function (fn) {
            var i = 0;
            if ($hlp.isReady) {
                return;
            }

            $hlp.isReady = true;
            _listReady.forEach(function (e) {
                e.call(document);
            });
        },

        _mergeWExpr = function (arr) {
            return new RegExp('\\b(' + arr.join('|') + ')\\b', 'g');
        };

    $hlp.prototype = {
        constructor: $hlp,
        extend: function () {},
        ready: function (fn) {
            _bindReady(fn);
            _listReady.push(fn);
            return this;
        },
        each: function (fn) {
            var self = this,
                i = 0;
            for (i; i < self.length; i++) {
                fn.call(self[i], i, self[i]);
            }
            return self;
        },
        eq: function (i) {
            return $hlp(this[i]);
        },
        /** @todo With attributes */
        /** @todo With data */
        /* With class */
        hasClass: function (s) {
            var self = this,
                expr = new RegExp('\\b' + s + '\\b'),
                bool = false;

            self.each(function () {
                if (this.className.match(expr)) {
                    bool = true;
                }
            });
            return bool;
        },
        addClass: function (s) {
            var self = this;
            if (typeof s === "string") {
                self.each(function () {
                    var expr = _mergeWExpr(this.className.split(' '));
                    this.className += s.replace(expr, '').replace('  ', ' ').trim();
                });
            }
            return self;
        },
        removeClass: function (s) {
            var self = this,
                expr = _mergeWExpr(s.split(' '));

            if (typeof s === "string") {
                self.each(function () {
                    this.className = this.className.replace(expr, '').replace('  ', ' ').trim();
                });
            }
            return self;
        },

        /* Set behavior of an array */
        push: push,
        sort: [].sort,
        splice: [].splice

    };

    $hlp.extend = function (first, second) {
        var prop;
        for (prop in second) {
            if (second.hasOwnProperty(prop)) {
                first[prop] = second[prop];
            }
        }
        return first;
    };

    $hlp.extend($hlp, {
        isReady: false
    });

    self.DOMHelper = $hlp;
}.bind(us))(window);

/*
//Test
var $ = us.DOMHelper;
$(document).ready(function(){
	var test = $('body');
	alert(test.eq(0))
});
*/