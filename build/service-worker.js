!(function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var a = (t[n] = {i: n, l: !1, exports: {}});
    return e[n].call(a.exports, a, a.exports, r), (a.l = !0), a.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n});
    }),
    (r.r = function (e) {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}),
        Object.defineProperty(e, '__esModule', {value: !0});
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' === typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if ((r.r(n), Object.defineProperty(n, 'default', {enumerable: !0, value: e}), 2 & t && 'string' != typeof e))
        for (var a in e)
          r.d(
            n,
            a,
            function (t) {
              return e[t];
            }.bind(null, a),
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = '/PeerTransfer/'),
    r((r.s = 7));
})([
  function (e, t, r) {
    e.exports = r(6);
  },
  function (e, t, r) {
    'use strict';
    try {
      self['workbox:core:5.1.4'] && _();
    } catch (n) {}
  },
  function (e, t, r) {
    'use strict';
    try {
      self['workbox:precaching:5.1.4'] && _();
    } catch (n) {}
  },
  function (e, t, r) {
    'use strict';
    try {
      self['workbox:routing:5.1.4'] && _();
    } catch (n) {}
  },
  function (e, t, r) {
    'use strict';
    try {
      self['workbox:strategies:5.1.4'] && _();
    } catch (n) {}
  },
  function (e, t, r) {
    'use strict';
    try {
      self['workbox:expiration:5.1.4'] && _();
    } catch (n) {}
  },
  function (e, t, r) {
    var n = (function (e) {
      'use strict';
      var t,
        r = Object.prototype,
        n = r.hasOwnProperty,
        a = 'function' === typeof Symbol ? Symbol : {},
        i = a.iterator || '@@iterator',
        c = a.asyncIterator || '@@asyncIterator',
        u = a.toStringTag || '@@toStringTag';
      function o(e, t, r) {
        return Object.defineProperty(e, t, {value: r, enumerable: !0, configurable: !0, writable: !0}), e[t];
      }
      try {
        o({}, '');
      } catch (U) {
        o = function (e, t, r) {
          return (e[t] = r);
        };
      }
      function s(e, t, r, n) {
        var a = t && t.prototype instanceof y ? t : y,
          i = Object.create(a.prototype),
          c = new T(n || []);
        return (
          (i._invoke = (function (e, t, r) {
            var n = h;
            return function (a, i) {
              if (n === p) throw new Error('Generator is already running');
              if (n === v) {
                if ('throw' === a) throw i;
                return S();
              }
              for (r.method = a, r.arg = i; ; ) {
                var c = r.delegate;
                if (c) {
                  var u = E(c, r);
                  if (u) {
                    if (u === d) continue;
                    return u;
                  }
                }
                if ('next' === r.method) r.sent = r._sent = r.arg;
                else if ('throw' === r.method) {
                  if (n === h) throw ((n = v), r.arg);
                  r.dispatchException(r.arg);
                } else 'return' === r.method && r.abrupt('return', r.arg);
                n = p;
                var o = f(e, t, r);
                if ('normal' === o.type) {
                  if (((n = r.done ? v : l), o.arg === d)) continue;
                  return {value: o.arg, done: r.done};
                }
                'throw' === o.type && ((n = v), (r.method = 'throw'), (r.arg = o.arg));
              }
            };
          })(e, r, c)),
          i
        );
      }
      function f(e, t, r) {
        try {
          return {type: 'normal', arg: e.call(t, r)};
        } catch (U) {
          return {type: 'throw', arg: U};
        }
      }
      e.wrap = s;
      var h = 'suspendedStart',
        l = 'suspendedYield',
        p = 'executing',
        v = 'completed',
        d = {};
      function y() {}
      function m() {}
      function g() {}
      var x = {};
      x[i] = function () {
        return this;
      };
      var w = Object.getPrototypeOf,
        b = w && w(w(O([])));
      b && b !== r && n.call(b, i) && (x = b);
      var k = (g.prototype = y.prototype = Object.create(x));
      function _(e) {
        ['next', 'throw', 'return'].forEach(function (t) {
          o(e, t, function (e) {
            return this._invoke(t, e);
          });
        });
      }
      function R(e, t) {
        function r(a, i, c, u) {
          var o = f(e[a], e, i);
          if ('throw' !== o.type) {
            var s = o.arg,
              h = s.value;
            return h && 'object' === typeof h && n.call(h, '__await')
              ? t.resolve(h.__await).then(
                  function (e) {
                    r('next', e, c, u);
                  },
                  function (e) {
                    r('throw', e, c, u);
                  },
                )
              : t.resolve(h).then(
                  function (e) {
                    (s.value = e), c(s);
                  },
                  function (e) {
                    return r('throw', e, c, u);
                  },
                );
          }
          u(o.arg);
        }
        var a;
        this._invoke = function (e, n) {
          function i() {
            return new t(function (t, a) {
              r(e, n, t, a);
            });
          }
          return (a = a ? a.then(i, i) : i());
        };
      }
      function E(e, r) {
        var n = e.iterator[r.method];
        if (n === t) {
          if (((r.delegate = null), 'throw' === r.method)) {
            if (e.iterator.return && ((r.method = 'return'), (r.arg = t), E(e, r), 'throw' === r.method)) return d;
            (r.method = 'throw'), (r.arg = new TypeError("The iterator does not provide a 'throw' method"));
          }
          return d;
        }
        var a = f(n, e.iterator, r.arg);
        if ('throw' === a.type) return (r.method = 'throw'), (r.arg = a.arg), (r.delegate = null), d;
        var i = a.arg;
        return i
          ? i.done
            ? ((r[e.resultName] = i.value),
              (r.next = e.nextLoc),
              'return' !== r.method && ((r.method = 'next'), (r.arg = t)),
              (r.delegate = null),
              d)
            : i
          : ((r.method = 'throw'), (r.arg = new TypeError('iterator result is not an object')), (r.delegate = null), d);
      }
      function L(e) {
        var t = {tryLoc: e[0]};
        1 in e && (t.catchLoc = e[1]), 2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])), this.tryEntries.push(t);
      }
      function q(e) {
        var t = e.completion || {};
        (t.type = 'normal'), delete t.arg, (e.completion = t);
      }
      function T(e) {
        (this.tryEntries = [{tryLoc: 'root'}]), e.forEach(L, this), this.reset(!0);
      }
      function O(e) {
        if (e) {
          var r = e[i];
          if (r) return r.call(e);
          if ('function' === typeof e.next) return e;
          if (!isNaN(e.length)) {
            var a = -1,
              c = function r() {
                for (; ++a < e.length; ) if (n.call(e, a)) return (r.value = e[a]), (r.done = !1), r;
                return (r.value = t), (r.done = !0), r;
              };
            return (c.next = c);
          }
        }
        return {next: S};
      }
      function S() {
        return {value: t, done: !0};
      }
      return (
        (m.prototype = k.constructor = g),
        (g.constructor = m),
        (m.displayName = o(g, u, 'GeneratorFunction')),
        (e.isGeneratorFunction = function (e) {
          var t = 'function' === typeof e && e.constructor;
          return !!t && (t === m || 'GeneratorFunction' === (t.displayName || t.name));
        }),
        (e.mark = function (e) {
          return (
            Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : ((e.__proto__ = g), o(e, u, 'GeneratorFunction')),
            (e.prototype = Object.create(k)),
            e
          );
        }),
        (e.awrap = function (e) {
          return {__await: e};
        }),
        _(R.prototype),
        (R.prototype[c] = function () {
          return this;
        }),
        (e.AsyncIterator = R),
        (e.async = function (t, r, n, a, i) {
          void 0 === i && (i = Promise);
          var c = new R(s(t, r, n, a), i);
          return e.isGeneratorFunction(r)
            ? c
            : c.next().then(function (e) {
                return e.done ? e.value : c.next();
              });
        }),
        _(k),
        o(k, u, 'Generator'),
        (k[i] = function () {
          return this;
        }),
        (k.toString = function () {
          return '[object Generator]';
        }),
        (e.keys = function (e) {
          var t = [];
          for (var r in e) t.push(r);
          return (
            t.reverse(),
            function r() {
              for (; t.length; ) {
                var n = t.pop();
                if (n in e) return (r.value = n), (r.done = !1), r;
              }
              return (r.done = !0), r;
            }
          );
        }),
        (e.values = O),
        (T.prototype = {
          constructor: T,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = t),
              this.tryEntries.forEach(q),
              !e)
            )
              for (var r in this) 't' === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ('throw' === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var r = this;
            function a(n, a) {
              return (u.type = 'throw'), (u.arg = e), (r.next = n), a && ((r.method = 'next'), (r.arg = t)), !!a;
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var c = this.tryEntries[i],
                u = c.completion;
              if ('root' === c.tryLoc) return a('end');
              if (c.tryLoc <= this.prev) {
                var o = n.call(c, 'catchLoc'),
                  s = n.call(c, 'finallyLoc');
                if (o && s) {
                  if (this.prev < c.catchLoc) return a(c.catchLoc, !0);
                  if (this.prev < c.finallyLoc) return a(c.finallyLoc);
                } else if (o) {
                  if (this.prev < c.catchLoc) return a(c.catchLoc, !0);
                } else {
                  if (!s) throw new Error('try statement without catch or finally');
                  if (this.prev < c.finallyLoc) return a(c.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var a = this.tryEntries[r];
              if (a.tryLoc <= this.prev && n.call(a, 'finallyLoc') && this.prev < a.finallyLoc) {
                var i = a;
                break;
              }
            }
            i && ('break' === e || 'continue' === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
            var c = i ? i.completion : {};
            return (
              (c.type = e), (c.arg = t), i ? ((this.method = 'next'), (this.next = i.finallyLoc), d) : this.complete(c)
            );
          },
          complete: function (e, t) {
            if ('throw' === e.type) throw e.arg;
            return (
              'break' === e.type || 'continue' === e.type
                ? (this.next = e.arg)
                : 'return' === e.type
                ? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
                : 'normal' === e.type && t && (this.next = t),
              d
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), q(r), d;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.tryLoc === e) {
                var n = r.completion;
                if ('throw' === n.type) {
                  var a = n.arg;
                  q(r);
                }
                return a;
              }
            }
            throw new Error('illegal catch attempt');
          },
          delegateYield: function (e, r, n) {
            return (
              (this.delegate = {iterator: O(e), resultName: r, nextLoc: n}), 'next' === this.method && (this.arg = t), d
            );
          },
        }),
        e
      );
    })(e.exports);
    try {
      regeneratorRuntime = n;
    } catch (a) {
      Function('r', 'regeneratorRuntime = r')(n);
    }
  },
  function (e, t, r) {
    'use strict';
    function n(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    function a(e, t) {
      if (e) {
        if ('string' === typeof e) return n(e, t);
        var r = Object.prototype.toString.call(e).slice(8, -1);
        return (
          'Object' === r && e.constructor && (r = e.constructor.name),
          'Map' === r || 'Set' === r
            ? Array.from(e)
            : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            ? n(e, t)
            : void 0
        );
      }
    }
    function i(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return n(e);
        })(e) ||
        (function (e) {
          if ('undefined' !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
        })(e) ||
        a(e) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        })()
      );
    }
    r.r(t);
    r(1);
    function c(e, t) {
      var r;
      if ('undefined' === typeof Symbol || null == e[Symbol.iterator]) {
        if (Array.isArray(e) || (r = a(e)) || (t && e && 'number' === typeof e.length)) {
          r && (e = r);
          var n = 0,
            i = function () {};
          return {
            s: i,
            n: function () {
              return n >= e.length ? {done: !0} : {done: !1, value: e[n++]};
            },
            e: function (e) {
              throw e;
            },
            f: i,
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      }
      var c,
        u = !0,
        o = !1;
      return {
        s: function () {
          r = e[Symbol.iterator]();
        },
        n: function () {
          var e = r.next();
          return (u = e.done), e;
        },
        e: function (e) {
          (o = !0), (c = e);
        },
        f: function () {
          try {
            u || null == r.return || r.return();
          } finally {
            if (o) throw c;
          }
        },
      };
    }
    function u(e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
    }
    function o(e, t) {
      return (o =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function s(e, t) {
      if ('function' !== typeof t && null !== t)
        throw new TypeError('Super expression must either be null or a function');
      (e.prototype = Object.create(t && t.prototype, {constructor: {value: e, writable: !0, configurable: !0}})),
        t && o(e, t);
    }
    function f(e) {
      return (f = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function h() {
      if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ('function' === typeof Proxy) return !0;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }
    function l(e) {
      return (l =
        'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e && 'function' === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function p(e, t) {
      return !t || ('object' !== l(t) && 'function' !== typeof t)
        ? (function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          })(e)
        : t;
    }
    function v(e) {
      var t = h();
      return function () {
        var r,
          n = f(e);
        if (t) {
          var a = f(this).constructor;
          r = Reflect.construct(n, arguments, a);
        } else r = n.apply(this, arguments);
        return p(this, r);
      };
    }
    function d(e, t, r) {
      return (d = h()
        ? Reflect.construct
        : function (e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var a = new (Function.bind.apply(e, n))();
            return r && o(a, r.prototype), a;
          }).apply(null, arguments);
    }
    function y(e) {
      var t = 'function' === typeof Map ? new Map() : void 0;
      return (y = function (e) {
        if (null === e || ((r = e), -1 === Function.toString.call(r).indexOf('[native code]'))) return e;
        var r;
        if ('function' !== typeof e) throw new TypeError('Super expression must either be null or a function');
        if ('undefined' !== typeof t) {
          if (t.has(e)) return t.get(e);
          t.set(e, n);
        }
        function n() {
          return d(e, arguments, f(this).constructor);
        }
        return (
          (n.prototype = Object.create(e.prototype, {
            constructor: {value: n, enumerable: !1, writable: !0, configurable: !0},
          })),
          o(n, e)
        );
      })(e);
    }
    var m = function (e) {
        for (var t = e, r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          n[a - 1] = arguments[a];
        return n.length > 0 && (t += ' :: '.concat(JSON.stringify(n))), t;
      },
      g = (function (e) {
        s(r, e);
        var t = v(r);
        function r(e, n) {
          var a;
          u(this, r);
          var i = m(e, n);
          return ((a = t.call(this, i)).name = e), (a.details = n), a;
        }
        return r;
      })(y(Error)),
      x = new Set();
    function w(e) {
      x.add(e);
    }
    var b = {
        googleAnalytics: 'googleAnalytics',
        precache: 'precache-v2',
        prefix: 'workbox',
        runtime: 'runtime',
        suffix: 'undefined' !== typeof registration ? registration.scope : '',
      },
      k = function (e) {
        return [b.prefix, e, b.suffix]
          .filter(function (e) {
            return e && e.length > 0;
          })
          .join('-');
      },
      _ = function (e) {
        return e || k(b.precache);
      },
      R = function (e) {
        return e || k(b.runtime);
      },
      E = r(0),
      L = r.n(E);
    function q(e, t, r, n, a, i, c) {
      try {
        var u = e[i](c),
          o = u.value;
      } catch (s) {
        return void r(s);
      }
      u.done ? t(o) : Promise.resolve(o).then(n, a);
    }
    function T(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, a) {
          var i = e.apply(t, r);
          function c(e) {
            q(i, n, a, c, u, 'next', e);
          }
          function u(e) {
            q(i, n, a, c, u, 'throw', e);
          }
          c(void 0);
        });
      };
    }
    function O() {
      return S.apply(this, arguments);
    }
    function S() {
      return (S = T(
        L.a.mark(function e() {
          var t, r, n;
          return L.a.wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    0, (t = c(x)), (e.prev = 2), t.s();
                  case 4:
                    if ((r = t.n()).done) {
                      e.next = 11;
                      break;
                    }
                    return (n = r.value), (e.next = 8), n();
                  case 8:
                    0;
                  case 9:
                    e.next = 4;
                    break;
                  case 11:
                    e.next = 16;
                    break;
                  case 13:
                    (e.prev = 13), (e.t0 = e.catch(2)), t.e(e.t0);
                  case 16:
                    return (e.prev = 16), t.f(), e.finish(16);
                  case 19:
                    0;
                  case 20:
                  case 'end':
                    return e.stop();
                }
            },
            e,
            null,
            [[2, 13, 16, 19]],
          );
        }),
      )).apply(this, arguments);
    }
    var U,
      N = function (e) {
        return new URL(String(e), location.href).href.replace(new RegExp('^'.concat(location.origin)), '');
      },
      j = function (e, t) {
        return e.filter(function (e) {
          return t in e;
        });
      },
      A = (function () {
        var e = T(
          L.a.mark(function e(t) {
            var r, n, a, i, u, o, s, f;
            return L.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (r = t.request),
                        (n = t.mode),
                        (a = t.plugins),
                        (i = j(void 0 === a ? [] : a, 'cacheKeyWillBeUsed')),
                        (u = r),
                        (o = c(i)),
                        (e.prev = 4),
                        o.s();
                    case 6:
                      if ((s = o.n()).done) {
                        e.next = 15;
                        break;
                      }
                      return (f = s.value), (e.next = 10), f.cacheKeyWillBeUsed.call(f, {mode: n, request: u});
                    case 10:
                      'string' === typeof (u = e.sent) && (u = new Request(u));
                    case 13:
                      e.next = 6;
                      break;
                    case 15:
                      e.next = 20;
                      break;
                    case 17:
                      (e.prev = 17), (e.t0 = e.catch(4)), o.e(e.t0);
                    case 20:
                      return (e.prev = 20), o.f(), e.finish(20);
                    case 23:
                      return e.abrupt('return', u);
                    case 24:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              null,
              [[4, 17, 20, 23]],
            );
          }),
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      M = (function () {
        var e = T(
          L.a.mark(function e(t) {
            var r, n, a, i, u, o, s, f, h, l;
            return L.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (r = t.request),
                        (n = t.response),
                        (a = t.event),
                        (i = t.plugins),
                        (u = n),
                        (o = !1),
                        (s = c(void 0 === i ? [] : i)),
                        (e.prev = 4),
                        s.s();
                    case 6:
                      if ((f = s.n()).done) {
                        e.next = 19;
                        break;
                      }
                      if (!('cacheWillUpdate' in (h = f.value))) {
                        e.next = 17;
                        break;
                      }
                      return (
                        (o = !0), (l = h.cacheWillUpdate), (e.next = 13), l.call(h, {request: r, response: u, event: a})
                      );
                    case 13:
                      if ((u = e.sent)) {
                        e.next = 17;
                        break;
                      }
                      return e.abrupt('break', 19);
                    case 17:
                      e.next = 6;
                      break;
                    case 19:
                      e.next = 24;
                      break;
                    case 21:
                      (e.prev = 21), (e.t0 = e.catch(4)), s.e(e.t0);
                    case 24:
                      return (e.prev = 24), s.f(), e.finish(24);
                    case 27:
                      return o || (u = u && 200 === u.status ? u : void 0), e.abrupt('return', u || null);
                    case 29:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              null,
              [[4, 21, 24, 27]],
            );
          }),
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      P = (function () {
        var e = T(
          L.a.mark(function e(t) {
            var r, n, a, i, u, o, s, f, h, l, p, v, d;
            return L.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.cacheName),
                        (n = t.request),
                        (a = t.event),
                        (i = t.matchOptions),
                        (u = t.plugins),
                        (o = void 0 === u ? [] : u),
                        (e.next = 3),
                        self.caches.open(r)
                      );
                    case 3:
                      return (s = e.sent), (e.next = 6), A({plugins: o, request: n, mode: 'read'});
                    case 6:
                      return (f = e.sent), (e.next = 9), s.match(f, i);
                    case 9:
                      (h = e.sent), (l = c(o)), (e.prev = 12), l.s();
                    case 14:
                      if ((p = l.n()).done) {
                        e.next = 24;
                        break;
                      }
                      if (!('cachedResponseWillBeUsed' in (v = p.value))) {
                        e.next = 22;
                        break;
                      }
                      return (
                        (d = v.cachedResponseWillBeUsed),
                        (e.next = 20),
                        d.call(v, {cacheName: r, event: a, matchOptions: i, cachedResponse: h, request: f})
                      );
                    case 20:
                      h = e.sent;
                    case 22:
                      e.next = 14;
                      break;
                    case 24:
                      e.next = 29;
                      break;
                    case 26:
                      (e.prev = 26), (e.t0 = e.catch(12)), l.e(e.t0);
                    case 29:
                      return (e.prev = 29), l.f(), e.finish(29);
                    case 32:
                      return e.abrupt('return', h);
                    case 33:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              null,
              [[12, 26, 29, 32]],
            );
          }),
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      C = {
        put: (function () {
          var e = T(
            L.a.mark(function e(t) {
              var r, n, a, i, u, o, s, f, h, l, p, v, d, y, m;
              return L.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (r = t.cacheName),
                          (n = t.request),
                          (a = t.response),
                          (i = t.event),
                          (u = t.plugins),
                          (o = void 0 === u ? [] : u),
                          (s = t.matchOptions),
                          (e.next = 4);
                        break;
                      case 4:
                        return (e.next = 6), A({plugins: o, request: n, mode: 'write'});
                      case 6:
                        if (((f = e.sent), a)) {
                          e.next = 10;
                          break;
                        }
                        throw new g('cache-put-with-no-response', {url: N(f.url)});
                      case 10:
                        return (e.next = 12), M({event: i, plugins: o, response: a, request: f});
                      case 12:
                        if ((h = e.sent)) {
                          e.next = 16;
                          break;
                        }
                        return e.abrupt('return');
                      case 16:
                        return (e.next = 18), self.caches.open(r);
                      case 18:
                        if (((l = e.sent), !((p = j(o, 'cacheDidUpdate')).length > 0))) {
                          e.next = 26;
                          break;
                        }
                        return (e.next = 23), P({cacheName: r, matchOptions: s, request: f});
                      case 23:
                        (e.t0 = e.sent), (e.next = 27);
                        break;
                      case 26:
                        e.t0 = null;
                      case 27:
                        return (v = e.t0), (e.prev = 29), (e.next = 32), l.put(f, h);
                      case 32:
                        e.next = 40;
                        break;
                      case 34:
                        if (((e.prev = 34), (e.t1 = e.catch(29)), 'QuotaExceededError' !== e.t1.name)) {
                          e.next = 39;
                          break;
                        }
                        return (e.next = 39), O();
                      case 39:
                        throw e.t1;
                      case 40:
                        (d = c(p)), (e.prev = 41), d.s();
                      case 43:
                        if ((y = d.n()).done) {
                          e.next = 49;
                          break;
                        }
                        return (
                          (m = y.value),
                          (e.next = 47),
                          m.cacheDidUpdate.call(m, {cacheName: r, event: i, oldResponse: v, newResponse: h, request: f})
                        );
                      case 47:
                        e.next = 43;
                        break;
                      case 49:
                        e.next = 54;
                        break;
                      case 51:
                        (e.prev = 51), (e.t2 = e.catch(41)), d.e(e.t2);
                      case 54:
                        return (e.prev = 54), d.f(), e.finish(54);
                      case 57:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [
                  [29, 34],
                  [41, 51, 54, 57],
                ],
              );
            }),
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        match: P,
      };
    function K() {
      if (void 0 === U) {
        var e = new Response('');
        if ('body' in e)
          try {
            new Response(e.body), (U = !0);
          } catch (t) {
            U = !1;
          }
        U = !1;
      }
      return U;
    }
    function I(e) {
      e.then(function () {});
    }
    function D(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ('undefined' !== typeof Symbol && Symbol.iterator in Object(e)) {
            var r = [],
              n = !0,
              a = !1,
              i = void 0;
            try {
              for (
                var c, u = e[Symbol.iterator]();
                !(n = (c = u.next()).done) && (r.push(c.value), !t || r.length !== t);
                n = !0
              );
            } catch (o) {
              (a = !0), (i = o);
            } finally {
              try {
                n || null == u.return || u.return();
              } finally {
                if (a) throw i;
              }
            }
            return r;
          }
        })(e, t) ||
        a(e, t) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        })()
      );
    }
    function W(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          'value' in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    function F(e, t, r) {
      return t && W(e.prototype, t), r && W(e, r), e;
    }
    var H = (function () {
      function e(t, r) {
        var n = this,
          a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i = a.onupgradeneeded,
          c = a.onversionchange;
        u(this, e),
          (this._db = null),
          (this._name = t),
          (this._version = r),
          (this._onupgradeneeded = i),
          (this._onversionchange =
            c ||
            function () {
              return n.close();
            });
      }
      return (
        F(e, [
          {
            key: 'db',
            get: function () {
              return this._db;
            },
          },
          {
            key: 'open',
            value: (function () {
              var e = T(
                L.a.mark(function e() {
                  var t = this;
                  return L.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this._db) {
                              e.next = 2;
                              break;
                            }
                            return e.abrupt('return');
                          case 2:
                            return (
                              (e.next = 4),
                              new Promise(function (e, r) {
                                var n = !1;
                                setTimeout(function () {
                                  (n = !0), r(new Error('The open request was blocked and timed out'));
                                }, t.OPEN_TIMEOUT);
                                var a = indexedDB.open(t._name, t._version);
                                (a.onerror = function () {
                                  return r(a.error);
                                }),
                                  (a.onupgradeneeded = function (e) {
                                    n
                                      ? (a.transaction.abort(), a.result.close())
                                      : 'function' === typeof t._onupgradeneeded && t._onupgradeneeded(e);
                                  }),
                                  (a.onsuccess = function () {
                                    var r = a.result;
                                    n ? r.close() : ((r.onversionchange = t._onversionchange.bind(t)), e(r));
                                  });
                              })
                            );
                          case 4:
                            return (this._db = e.sent), e.abrupt('return', this);
                          case 6:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function () {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: 'getKey',
            value: (function () {
              var e = T(
                L.a.mark(function e(t, r) {
                  return L.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), this.getAllKeys(t, r, 1);
                          case 2:
                            return e.abrupt('return', e.sent[0]);
                          case 3:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function (t, r) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: 'getAll',
            value: (function () {
              var e = T(
                L.a.mark(function e(t, r, n) {
                  return L.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), this.getAllMatching(t, {query: r, count: n});
                          case 2:
                            return e.abrupt('return', e.sent);
                          case 3:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function (t, r, n) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: 'getAllKeys',
            value: (function () {
              var e = T(
                L.a.mark(function e(t, r, n) {
                  var a;
                  return L.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), this.getAllMatching(t, {query: r, count: n, includeKeys: !0});
                          case 2:
                            return (
                              (a = e.sent),
                              e.abrupt(
                                'return',
                                a.map(function (e) {
                                  return e.key;
                                }),
                              )
                            );
                          case 4:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function (t, r, n) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: 'getAllMatching',
            value: (function () {
              var e = T(
                L.a.mark(function e(t) {
                  var r,
                    n,
                    a,
                    i,
                    c,
                    u,
                    o,
                    s,
                    f,
                    h = arguments;
                  return L.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (r = h.length > 1 && void 0 !== h[1] ? h[1] : {}),
                              (n = r.index),
                              (a = r.query),
                              (i = void 0 === a ? null : a),
                              (c = r.direction),
                              (u = void 0 === c ? 'next' : c),
                              (o = r.count),
                              (s = r.includeKeys),
                              (f = void 0 !== s && s),
                              (e.next = 3),
                              this.transaction([t], 'readonly', function (e, r) {
                                var a = e.objectStore(t),
                                  c = n ? a.index(n) : a,
                                  s = [],
                                  h = c.openCursor(i, u);
                                h.onsuccess = function () {
                                  var e = h.result;
                                  e ? (s.push(f ? e : e.value), o && s.length >= o ? r(s) : e.continue()) : r(s);
                                };
                              })
                            );
                          case 3:
                            return e.abrupt('return', e.sent);
                          case 4:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: 'transaction',
            value: (function () {
              var e = T(
                L.a.mark(function e(t, r, n) {
                  var a = this;
                  return L.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), this.open();
                          case 2:
                            return (
                              (e.next = 4),
                              new Promise(function (e, i) {
                                var c = a._db.transaction(t, r);
                                (c.onabort = function () {
                                  return i(c.error);
                                }),
                                  (c.oncomplete = function () {
                                    return e();
                                  }),
                                  n(c, function (t) {
                                    return e(t);
                                  });
                              })
                            );
                          case 4:
                            return e.abrupt('return', e.sent);
                          case 5:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function (t, r, n) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: '_call',
            value: (function () {
              var e = T(
                L.a.mark(function e(t, r, n) {
                  var a,
                    i,
                    c,
                    u,
                    o = arguments;
                  return L.a.wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            for (a = o.length, i = new Array(a > 3 ? a - 3 : 0), c = 3; c < a; c++) i[c - 3] = o[c];
                            return (
                              (u = function (e, n) {
                                var a = e.objectStore(r),
                                  c = a[t].apply(a, i);
                                c.onsuccess = function () {
                                  return n(c.result);
                                };
                              }),
                              (e.next = 4),
                              this.transaction([r], n, u)
                            );
                          case 4:
                            return e.abrupt('return', e.sent);
                          case 5:
                          case 'end':
                            return e.stop();
                        }
                    },
                    e,
                    this,
                  );
                }),
              );
              return function (t, r, n) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: 'close',
            value: function () {
              this._db && (this._db.close(), (this._db = null));
            },
          },
        ]),
        e
      );
    })();
    H.prototype.OPEN_TIMEOUT = 2e3;
    for (
      var B = function () {
          var e,
            t = D(Q[G], 2),
            r = t[0],
            n = c(t[1]);
          try {
            var a = function () {
              var t = e.value;
              (t in IDBObjectStore.prototype) &&
                (H.prototype[t] = (function () {
                  var e = T(
                    L.a.mark(function e(n) {
                      var a,
                        i,
                        c,
                        u = arguments;
                      return L.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                for (a = u.length, i = new Array(a > 1 ? a - 1 : 0), c = 1; c < a; c++) i[c - 1] = u[c];
                                return (e.next = 3), this._call.apply(this, [t, n, r].concat(i));
                              case 3:
                                return e.abrupt('return', e.sent);
                              case 4:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                      );
                    }),
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })());
            };
            for (n.s(); !(e = n.n()).done; ) a();
          } catch (i) {
            n.e(i);
          } finally {
            n.f();
          }
        },
        G = 0,
        Q = Object.entries({
          readonly: ['get', 'count', 'getKey', 'getAll', 'getAllKeys'],
          readwrite: ['add', 'put', 'clear', 'delete'],
        });
      G < Q.length;
      G++
    )
      B();
    var Y = (function () {
        var e = T(
          L.a.mark(function e(t) {
            return L.a.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2),
                      new Promise(function (e, r) {
                        var n = indexedDB.deleteDatabase(t);
                        (n.onerror = function () {
                          r(n.error);
                        }),
                          (n.onblocked = function () {
                            r(new Error('Delete blocked'));
                          }),
                          (n.onsuccess = function () {
                            e();
                          });
                      })
                    );
                  case 2:
                  case 'end':
                    return e.stop();
                }
            }, e);
          }),
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      $ = {
        fetch: (function () {
          var e = T(
            L.a.mark(function e(t) {
              var r, n, a, i, u, o, s, f, h, l, p, v, d, y, m, x, w, b, k, _, R;
              return L.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ((r = t.request),
                          (n = t.fetchOptions),
                          (a = t.event),
                          (i = t.plugins),
                          (u = void 0 === i ? [] : i),
                          'string' === typeof r && (r = new Request(r)),
                          !(a instanceof FetchEvent && a.preloadResponse))
                        ) {
                          e.next = 9;
                          break;
                        }
                        return (e.next = 5), a.preloadResponse;
                      case 5:
                        if (!(o = e.sent)) {
                          e.next = 9;
                          break;
                        }
                        return e.abrupt('return', o);
                      case 9:
                        0,
                          (s = j(u, 'fetchDidFail')),
                          (f = s.length > 0 ? r.clone() : null),
                          (e.prev = 12),
                          (h = c(u)),
                          (e.prev = 14),
                          h.s();
                      case 16:
                        if ((l = h.n()).done) {
                          e.next = 27;
                          break;
                        }
                        if (!('requestWillFetch' in (p = l.value))) {
                          e.next = 25;
                          break;
                        }
                        return (
                          (v = p.requestWillFetch), (d = r.clone()), (e.next = 23), v.call(p, {request: d, event: a})
                        );
                      case 23:
                        r = e.sent;
                      case 25:
                        e.next = 16;
                        break;
                      case 27:
                        e.next = 32;
                        break;
                      case 29:
                        (e.prev = 29), (e.t0 = e.catch(14)), h.e(e.t0);
                      case 32:
                        return (e.prev = 32), h.f(), e.finish(32);
                      case 35:
                        e.next = 40;
                        break;
                      case 37:
                        throw (
                          ((e.prev = 37),
                          (e.t1 = e.catch(12)),
                          new g('plugin-error-request-will-fetch', {thrownError: e.t1}))
                        );
                      case 40:
                        if (((y = r.clone()), (e.prev = 41), 'navigate' !== r.mode)) {
                          e.next = 48;
                          break;
                        }
                        return (e.next = 45), fetch(r);
                      case 45:
                        (m = e.sent), (e.next = 51);
                        break;
                      case 48:
                        return (e.next = 50), fetch(r, n);
                      case 50:
                        m = e.sent;
                      case 51:
                        0, (x = c(u)), (e.prev = 53), x.s();
                      case 55:
                        if ((w = x.n()).done) {
                          e.next = 64;
                          break;
                        }
                        if (!('fetchDidSucceed' in (b = w.value))) {
                          e.next = 62;
                          break;
                        }
                        return (e.next = 60), b.fetchDidSucceed.call(b, {event: a, request: y, response: m});
                      case 60:
                        m = e.sent;
                      case 62:
                        e.next = 55;
                        break;
                      case 64:
                        e.next = 69;
                        break;
                      case 66:
                        (e.prev = 66), (e.t2 = e.catch(53)), x.e(e.t2);
                      case 69:
                        return (e.prev = 69), x.f(), e.finish(69);
                      case 72:
                        return e.abrupt('return', m);
                      case 75:
                        (e.prev = 75), (e.t3 = e.catch(41)), (k = c(s)), (e.prev = 79), k.s();
                      case 81:
                        if ((_ = k.n()).done) {
                          e.next = 87;
                          break;
                        }
                        return (
                          (R = _.value),
                          (e.next = 85),
                          R.fetchDidFail.call(R, {
                            error: e.t3,
                            event: a,
                            originalRequest: f.clone(),
                            request: y.clone(),
                          })
                        );
                      case 85:
                        e.next = 81;
                        break;
                      case 87:
                        e.next = 92;
                        break;
                      case 89:
                        (e.prev = 89), (e.t4 = e.catch(79)), k.e(e.t4);
                      case 92:
                        return (e.prev = 92), k.f(), e.finish(92);
                      case 95:
                        throw e.t3;
                      case 96:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [
                  [12, 37],
                  [14, 29, 32, 35],
                  [41, 75],
                  [53, 66, 69, 72],
                  [79, 89, 92, 95],
                ],
              );
            }),
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
      };
    function J(e, t) {
      return V.apply(this, arguments);
    }
    function V() {
      return (V = T(
        L.a.mark(function e(t, r) {
          var n, a, i, c;
          return L.a.wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (
                    ((n = t.clone()),
                    (a = {headers: new Headers(n.headers), status: n.status, statusText: n.statusText}),
                    (i = r ? r(a) : a),
                    !K())
                  ) {
                    e.next = 7;
                    break;
                  }
                  (e.t0 = n.body), (e.next = 10);
                  break;
                case 7:
                  return (e.next = 9), n.blob();
                case 9:
                  e.t0 = e.sent;
                case 10:
                  return (c = e.t0), e.abrupt('return', new Response(c, i));
                case 12:
                case 'end':
                  return e.stop();
              }
          }, e);
        }),
      )).apply(this, arguments);
    }
    r(5);
    var z = 'cache-entries',
      X = function (e) {
        var t = new URL(e, location.href);
        return (t.hash = ''), t.href;
      },
      Z = (function () {
        function e(t) {
          var r = this;
          u(this, e),
            (this._cacheName = t),
            (this._db = new H('workbox-expiration', 1, {
              onupgradeneeded: function (e) {
                return r._handleUpgrade(e);
              },
            }));
        }
        return (
          F(e, [
            {
              key: '_handleUpgrade',
              value: function (e) {
                var t = e.target.result.createObjectStore(z, {keyPath: 'id'});
                t.createIndex('cacheName', 'cacheName', {unique: !1}),
                  t.createIndex('timestamp', 'timestamp', {unique: !1}),
                  Y(this._cacheName);
              },
            },
            {
              key: 'setTimestamp',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t, r) {
                    var n;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (t = X(t)),
                                (n = {url: t, timestamp: r, cacheName: this._cacheName, id: this._getId(t)}),
                                (e.next = 4),
                                this._db.put(z, n)
                              );
                            case 4:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function (t, r) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'getTimestamp',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t) {
                    var r;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this._db.get(z, this._getId(t));
                            case 2:
                              return (r = e.sent), e.abrupt('return', r.timestamp);
                            case 4:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'expireEntries',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t, r) {
                    var n,
                      a,
                      i,
                      u,
                      o,
                      s = this;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                this._db.transaction(z, 'readwrite', function (e, n) {
                                  var a = e.objectStore(z).index('timestamp').openCursor(null, 'prev'),
                                    i = [],
                                    c = 0;
                                  a.onsuccess = function () {
                                    var e = a.result;
                                    if (e) {
                                      var u = e.value;
                                      u.cacheName === s._cacheName &&
                                        ((t && u.timestamp < t) || (r && c >= r) ? i.push(e.value) : c++),
                                        e.continue();
                                    } else n(i);
                                  };
                                })
                              );
                            case 2:
                              (n = e.sent), (a = []), (i = c(n)), (e.prev = 5), i.s();
                            case 7:
                              if ((u = i.n()).done) {
                                e.next = 14;
                                break;
                              }
                              return (o = u.value), (e.next = 11), this._db.delete(z, o.id);
                            case 11:
                              a.push(o.url);
                            case 12:
                              e.next = 7;
                              break;
                            case 14:
                              e.next = 19;
                              break;
                            case 16:
                              (e.prev = 16), (e.t0 = e.catch(5)), i.e(e.t0);
                            case 19:
                              return (e.prev = 19), i.f(), e.finish(19);
                            case 22:
                              return e.abrupt('return', a);
                            case 23:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[5, 16, 19, 22]],
                    );
                  }),
                );
                return function (t, r) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: '_getId',
              value: function (e) {
                return this._cacheName + '|' + X(e);
              },
            },
          ]),
          e
        );
      })(),
      ee = (function () {
        function e(t) {
          var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          u(this, e),
            (this._isRunning = !1),
            (this._rerunRequested = !1),
            (this._maxEntries = r.maxEntries),
            (this._maxAgeSeconds = r.maxAgeSeconds),
            (this._cacheName = t),
            (this._timestampModel = new Z(t));
        }
        return (
          F(e, [
            {
              key: 'expireEntries',
              value: (function () {
                var e = T(
                  L.a.mark(function e() {
                    var t, r, n, a, i, u;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (!this._isRunning) {
                                e.next = 3;
                                break;
                              }
                              return (this._rerunRequested = !0), e.abrupt('return');
                            case 3:
                              return (
                                (this._isRunning = !0),
                                (t = this._maxAgeSeconds ? Date.now() - 1e3 * this._maxAgeSeconds : 0),
                                (e.next = 7),
                                this._timestampModel.expireEntries(t, this._maxEntries)
                              );
                            case 7:
                              return (r = e.sent), (e.next = 10), self.caches.open(this._cacheName);
                            case 10:
                              (n = e.sent), (a = c(r)), (e.prev = 12), a.s();
                            case 14:
                              if ((i = a.n()).done) {
                                e.next = 20;
                                break;
                              }
                              return (u = i.value), (e.next = 18), n.delete(u);
                            case 18:
                              e.next = 14;
                              break;
                            case 20:
                              e.next = 25;
                              break;
                            case 22:
                              (e.prev = 22), (e.t0 = e.catch(12)), a.e(e.t0);
                            case 25:
                              return (e.prev = 25), a.f(), e.finish(25);
                            case 28:
                              0,
                                (this._isRunning = !1),
                                this._rerunRequested && ((this._rerunRequested = !1), I(this.expireEntries()));
                            case 31:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[12, 22, 25, 28]],
                    );
                  }),
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'updateTimestamp',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t) {
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 3), this._timestampModel.setTimestamp(t, Date.now());
                            case 3:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'isURLExpired',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t) {
                    var r, n;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (this._maxAgeSeconds) {
                                e.next = 6;
                                break;
                              }
                              e.next = 3;
                              break;
                            case 3:
                              return e.abrupt('return', !1);
                            case 6:
                              return (e.next = 8), this._timestampModel.getTimestamp(t);
                            case 8:
                              return (
                                (r = e.sent), (n = Date.now() - 1e3 * this._maxAgeSeconds), e.abrupt('return', r < n)
                              );
                            case 11:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'delete',
              value: (function () {
                var e = T(
                  L.a.mark(function e() {
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (this._rerunRequested = !1), (e.next = 3), this._timestampModel.expireEntries(1 / 0)
                              );
                            case 3:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
          ]),
          e
        );
      })(),
      te = (function () {
        function e() {
          var t = this,
            r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          u(this, e),
            (this.cachedResponseWillBeUsed = (function () {
              var e = T(
                L.a.mark(function e(r) {
                  var n, a, i, c, u, o, s;
                  return L.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (((n = r.event), (a = r.request), (i = r.cacheName), (c = r.cachedResponse))) {
                            e.next = 3;
                            break;
                          }
                          return e.abrupt('return', null);
                        case 3:
                          if (
                            ((u = t._isResponseDateFresh(c)),
                            I((o = t._getCacheExpiration(i)).expireEntries()),
                            (s = o.updateTimestamp(a.url)),
                            n)
                          )
                            try {
                              n.waitUntil(s);
                            } catch (f) {
                              0;
                            }
                          return e.abrupt('return', u ? c : null);
                        case 9:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })()),
            (this.cacheDidUpdate = (function () {
              var e = T(
                L.a.mark(function e(r) {
                  var n, a, i;
                  return L.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (n = r.cacheName),
                            (a = r.request),
                            (i = t._getCacheExpiration(n)),
                            (e.next = 5),
                            i.updateTimestamp(a.url)
                          );
                        case 5:
                          return (e.next = 7), i.expireEntries();
                        case 7:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })()),
            (this._config = r),
            (this._maxAgeSeconds = r.maxAgeSeconds),
            (this._cacheExpirations = new Map()),
            r.purgeOnQuotaError &&
              w(function () {
                return t.deleteCacheAndMetadata();
              });
        }
        return (
          F(e, [
            {
              key: '_getCacheExpiration',
              value: function (e) {
                if (e === R()) throw new g('expire-custom-caches-only');
                var t = this._cacheExpirations.get(e);
                return t || ((t = new ee(e, this._config)), this._cacheExpirations.set(e, t)), t;
              },
            },
            {
              key: '_isResponseDateFresh',
              value: function (e) {
                if (!this._maxAgeSeconds) return !0;
                var t = this._getDateHeaderTimestamp(e);
                return null === t || t >= Date.now() - 1e3 * this._maxAgeSeconds;
              },
            },
            {
              key: '_getDateHeaderTimestamp',
              value: function (e) {
                if (!e.headers.has('date')) return null;
                var t = e.headers.get('date'),
                  r = new Date(t).getTime();
                return isNaN(r) ? null : r;
              },
            },
            {
              key: 'deleteCacheAndMetadata',
              value: (function () {
                var e = T(
                  L.a.mark(function e() {
                    var t, r, n, a, i;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              (t = c(this._cacheExpirations)), (e.prev = 1), t.s();
                            case 3:
                              if ((r = t.n()).done) {
                                e.next = 11;
                                break;
                              }
                              return (n = D(r.value, 2)), (a = n[0]), (i = n[1]), (e.next = 7), self.caches.delete(a);
                            case 7:
                              return (e.next = 9), i.delete();
                            case 9:
                              e.next = 3;
                              break;
                            case 11:
                              e.next = 16;
                              break;
                            case 13:
                              (e.prev = 13), (e.t0 = e.catch(1)), t.e(e.t0);
                            case 16:
                              return (e.prev = 16), t.f(), e.finish(16);
                            case 19:
                              this._cacheExpirations = new Map();
                            case 20:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[1, 13, 16, 19]],
                    );
                  }),
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
          ]),
          e
        );
      })(),
      re = (r(2), []),
      ne = function () {
        return re;
      };
    function ae(e) {
      if (!e) throw new g('add-to-cache-list-unexpected-type', {entry: e});
      if ('string' === typeof e) {
        var t = new URL(e, location.href);
        return {cacheKey: t.href, url: t.href};
      }
      var r = e.revision,
        n = e.url;
      if (!n) throw new g('add-to-cache-list-unexpected-type', {entry: e});
      if (!r) {
        var a = new URL(n, location.href);
        return {cacheKey: a.href, url: a.href};
      }
      var i = new URL(n, location.href),
        c = new URL(n, location.href);
      return i.searchParams.set('__WB_REVISION__', r), {cacheKey: i.href, url: c.href};
    }
    var ie,
      ce = (function () {
        function e(t) {
          u(this, e),
            (this._cacheName = _(t)),
            (this._urlsToCacheKeys = new Map()),
            (this._urlsToCacheModes = new Map()),
            (this._cacheKeysToIntegrities = new Map());
        }
        return (
          F(e, [
            {
              key: 'addToCacheList',
              value: function (e) {
                var t,
                  r = [],
                  n = c(e);
                try {
                  for (n.s(); !(t = n.n()).done; ) {
                    var a = t.value;
                    'string' === typeof a ? r.push(a) : a && void 0 === a.revision && r.push(a.url);
                    var i = ae(a),
                      u = i.cacheKey,
                      o = i.url,
                      s = 'string' !== typeof a && a.revision ? 'reload' : 'default';
                    if (this._urlsToCacheKeys.has(o) && this._urlsToCacheKeys.get(o) !== u)
                      throw new g('add-to-cache-list-conflicting-entries', {
                        firstEntry: this._urlsToCacheKeys.get(o),
                        secondEntry: u,
                      });
                    if ('string' !== typeof a && a.integrity) {
                      if (this._cacheKeysToIntegrities.has(u) && this._cacheKeysToIntegrities.get(u) !== a.integrity)
                        throw new g('add-to-cache-list-conflicting-integrities', {url: o});
                      this._cacheKeysToIntegrities.set(u, a.integrity);
                    }
                    if ((this._urlsToCacheKeys.set(o, u), this._urlsToCacheModes.set(o, s), r.length > 0)) {
                      var f =
                        'Workbox is precaching URLs without revision ' +
                        'info: '.concat(r.join(', '), '\nThis is generally NOT safe. ') +
                        'Learn more at https://bit.ly/wb-precache';
                      console.warn(f);
                    }
                  }
                } catch (h) {
                  n.e(h);
                } finally {
                  n.f();
                }
              },
            },
            {
              key: 'install',
              value: (function () {
                var e = T(
                  L.a.mark(function e() {
                    var t,
                      r,
                      n,
                      a,
                      i,
                      u,
                      o,
                      s,
                      f,
                      h,
                      l,
                      p,
                      v,
                      d,
                      y,
                      m = this,
                      g = arguments;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (t = g.length > 0 && void 0 !== g[0] ? g[0] : {}),
                                (r = t.event),
                                (n = t.plugins),
                                (a = []),
                                (i = []),
                                (e.next = 6),
                                self.caches.open(this._cacheName)
                              );
                            case 6:
                              return (u = e.sent), (e.next = 9), u.keys();
                            case 9:
                              (o = e.sent),
                                (s = new Set(
                                  o.map(function (e) {
                                    return e.url;
                                  }),
                                )),
                                (f = c(this._urlsToCacheKeys));
                              try {
                                for (f.s(); !(h = f.n()).done; )
                                  (l = D(h.value, 2)),
                                    (p = l[0]),
                                    (v = l[1]),
                                    s.has(v) ? i.push(p) : a.push({cacheKey: v, url: p});
                              } catch (x) {
                                f.e(x);
                              } finally {
                                f.f();
                              }
                              return (
                                (d = a.map(function (e) {
                                  var t = e.cacheKey,
                                    a = e.url,
                                    i = m._cacheKeysToIntegrities.get(t),
                                    c = m._urlsToCacheModes.get(a);
                                  return m._addURLToCache({
                                    cacheKey: t,
                                    cacheMode: c,
                                    event: r,
                                    integrity: i,
                                    plugins: n,
                                    url: a,
                                  });
                                })),
                                (e.next = 16),
                                Promise.all(d)
                              );
                            case 16:
                              return (
                                (y = a.map(function (e) {
                                  return e.url;
                                })),
                                e.abrupt('return', {updatedURLs: y, notUpdatedURLs: i})
                              );
                            case 19:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'activate',
              value: (function () {
                var e = T(
                  L.a.mark(function e() {
                    var t, r, n, a, i, u, o;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), self.caches.open(this._cacheName);
                            case 2:
                              return (t = e.sent), (e.next = 5), t.keys();
                            case 5:
                              (r = e.sent),
                                (n = new Set(this._urlsToCacheKeys.values())),
                                (a = []),
                                (i = c(r)),
                                (e.prev = 9),
                                i.s();
                            case 11:
                              if ((u = i.n()).done) {
                                e.next = 19;
                                break;
                              }
                              if (((o = u.value), n.has(o.url))) {
                                e.next = 17;
                                break;
                              }
                              return (e.next = 16), t.delete(o);
                            case 16:
                              a.push(o.url);
                            case 17:
                              e.next = 11;
                              break;
                            case 19:
                              e.next = 24;
                              break;
                            case 21:
                              (e.prev = 21), (e.t0 = e.catch(9)), i.e(e.t0);
                            case 24:
                              return (e.prev = 24), i.f(), e.finish(24);
                            case 27:
                              return e.abrupt('return', {deletedURLs: a});
                            case 29:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[9, 21, 24, 27]],
                    );
                  }),
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: '_addURLToCache',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t) {
                    var r, n, a, i, u, o, s, f, h, l, p, v;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (r = t.cacheKey),
                                (n = t.url),
                                (a = t.cacheMode),
                                (i = t.event),
                                (u = t.plugins),
                                (o = t.integrity),
                                (s = new Request(n, {integrity: o, cache: a, credentials: 'same-origin'})),
                                (e.next = 4),
                                $.fetch({event: i, plugins: u, request: s})
                              );
                            case 4:
                              (f = e.sent), (l = c(u || []));
                              try {
                                for (l.s(); !(p = l.n()).done; ) 'cacheWillUpdate' in (v = p.value) && (h = v);
                              } catch (d) {
                                l.e(d);
                              } finally {
                                l.f();
                              }
                              if (!h) {
                                e.next = 13;
                                break;
                              }
                              return (e.next = 10), h.cacheWillUpdate({event: i, request: s, response: f});
                            case 10:
                              (e.t0 = e.sent), (e.next = 14);
                              break;
                            case 13:
                              e.t0 = f.status < 400;
                            case 14:
                              if (e.t0) {
                                e.next = 17;
                                break;
                              }
                              throw new g('bad-precaching-response', {url: n, status: f.status});
                            case 17:
                              if (!f.redirected) {
                                e.next = 21;
                                break;
                              }
                              return (e.next = 20), J(f);
                            case 20:
                              f = e.sent;
                            case 21:
                              return (
                                (e.next = 23),
                                C.put({
                                  event: i,
                                  plugins: u,
                                  response: f,
                                  request: r === n ? s : new Request(r),
                                  cacheName: this._cacheName,
                                  matchOptions: {ignoreSearch: !0},
                                })
                              );
                            case 23:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'getURLsToCacheKeys',
              value: function () {
                return this._urlsToCacheKeys;
              },
            },
            {
              key: 'getCachedURLs',
              value: function () {
                return i(this._urlsToCacheKeys.keys());
              },
            },
            {
              key: 'getCacheKeyForURL',
              value: function (e) {
                var t = new URL(e, location.href);
                return this._urlsToCacheKeys.get(t.href);
              },
            },
            {
              key: 'matchPrecache',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t) {
                    var r, n, a;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (((r = t instanceof Request ? t.url : t), !(n = this.getCacheKeyForURL(r)))) {
                                e.next = 7;
                                break;
                              }
                              return (e.next = 5), self.caches.open(this._cacheName);
                            case 5:
                              return (a = e.sent), e.abrupt('return', a.match(n));
                            case 7:
                              return e.abrupt('return', void 0);
                            case 8:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'createHandler',
              value: function () {
                var e = this,
                  t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return (function () {
                  var r = T(
                    L.a.mark(function r(n) {
                      var a, i;
                      return L.a.wrap(
                        function (r) {
                          for (;;)
                            switch ((r.prev = r.next)) {
                              case 0:
                                return (a = n.request), (r.prev = 1), (r.next = 4), e.matchPrecache(a);
                              case 4:
                                if (!(i = r.sent)) {
                                  r.next = 7;
                                  break;
                                }
                                return r.abrupt('return', i);
                              case 7:
                                throw new g('missing-precache-entry', {
                                  cacheName: e._cacheName,
                                  url: a instanceof Request ? a.url : a,
                                });
                              case 10:
                                if (((r.prev = 10), (r.t0 = r.catch(1)), !t)) {
                                  r.next = 15;
                                  break;
                                }
                                return r.abrupt('return', fetch(a));
                              case 15:
                                throw r.t0;
                              case 16:
                              case 'end':
                                return r.stop();
                            }
                        },
                        r,
                        null,
                        [[1, 10]],
                      );
                    }),
                  );
                  return function (e) {
                    return r.apply(this, arguments);
                  };
                })();
              },
            },
            {
              key: 'createHandlerBoundToURL',
              value: function (e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                  r = this.getCacheKeyForURL(e);
                if (!r) throw new g('non-precached-url', {url: e});
                var n = this.createHandler(t),
                  a = new Request(e);
                return function () {
                  return n({request: a});
                };
              },
            },
          ]),
          e
        );
      })(),
      ue = function () {
        return ie || (ie = new ce()), ie;
      };
    function oe(e) {
      for (
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          r = function () {
            var r = a[n];
            t.some(function (e) {
              return e.test(r);
            }) && e.searchParams.delete(r);
          },
          n = 0,
          a = i(e.searchParams.keys());
        n < a.length;
        n++
      )
        r();
      return e;
    }
    var se = L.a.mark(fe);
    function fe(e) {
      var t,
        r,
        n,
        a,
        i,
        u,
        o,
        s,
        f,
        h,
        l,
        p,
        v,
        d = arguments;
      return L.a.wrap(
        function (y) {
          for (;;)
            switch ((y.prev = y.next)) {
              case 0:
                return (
                  (t = d.length > 1 && void 0 !== d[1] ? d[1] : {}),
                  (r = t.ignoreURLParametersMatching),
                  (n = t.directoryIndex),
                  (a = t.cleanURLs),
                  (i = t.urlManipulation),
                  ((u = new URL(e, location.href)).hash = ''),
                  (y.next = 5),
                  u.href
                );
              case 5:
                return (o = oe(u, r)), (y.next = 8), o.href;
              case 8:
                if (!n || !o.pathname.endsWith('/')) {
                  y.next = 13;
                  break;
                }
                return ((s = new URL(o.href)).pathname += n), (y.next = 13), s.href;
              case 13:
                if (!a) {
                  y.next = 18;
                  break;
                }
                return ((f = new URL(o.href)).pathname += '.html'), (y.next = 18), f.href;
              case 18:
                if (!i) {
                  y.next = 37;
                  break;
                }
                (h = i({url: u})), (l = c(h)), (y.prev = 21), l.s();
              case 23:
                if ((p = l.n()).done) {
                  y.next = 29;
                  break;
                }
                return (v = p.value), (y.next = 27), v.href;
              case 27:
                y.next = 23;
                break;
              case 29:
                y.next = 34;
                break;
              case 31:
                (y.prev = 31), (y.t0 = y.catch(21)), l.e(y.t0);
              case 34:
                return (y.prev = 34), l.f(), y.finish(34);
              case 37:
              case 'end':
                return y.stop();
            }
        },
        se,
        null,
        [[21, 31, 34, 37]],
      );
    }
    var he = function (e, t) {
        var r,
          n = ue().getURLsToCacheKeys(),
          a = c(fe(e, t));
        try {
          for (a.s(); !(r = a.n()).done; ) {
            var i = r.value,
              u = n.get(i);
            if (u) return u;
          }
        } catch (o) {
          a.e(o);
        } finally {
          a.f();
        }
      },
      le = !1;
    function pe(e) {
      le ||
        (!(function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.ignoreURLParametersMatching,
            r = void 0 === t ? [/^utm_/] : t,
            n = e.directoryIndex,
            a = void 0 === n ? 'index.html' : n,
            i = e.cleanURLs,
            c = void 0 === i || i,
            u = e.urlManipulation,
            o = _();
          self.addEventListener('fetch', function (e) {
            var t = he(e.request.url, {
              cleanURLs: c,
              directoryIndex: a,
              ignoreURLParametersMatching: r,
              urlManipulation: u,
            });
            if (t) {
              var n = self.caches
                .open(o)
                .then(function (e) {
                  return e.match(t);
                })
                .then(function (e) {
                  return e || fetch(t);
                });
              e.respondWith(n);
            }
          });
        })(e),
        (le = !0));
    }
    var ve = function (e) {
        var t = ue(),
          r = ne();
        e.waitUntil(
          t.install({event: e, plugins: r}).catch(function (e) {
            throw e;
          }),
        );
      },
      de = function (e) {
        var t = ue();
        e.waitUntil(t.activate());
      };
    r(3);
    var ye,
      me = function (e) {
        return e && 'object' === typeof e ? e : {handle: e};
      },
      ge = function e(t, r) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'GET';
        u(this, e), (this.handler = me(r)), (this.match = t), (this.method = n);
      },
      xe = (function (e) {
        s(r, e);
        var t = v(r);
        function r(e, n, a) {
          u(this, r);
          return t.call(
            this,
            function (t) {
              var r = t.url,
                n = e.exec(r.href);
              if (n && (r.origin === location.origin || 0 === n.index)) return n.slice(1);
            },
            n,
            a,
          );
        }
        return r;
      })(ge),
      we = (function () {
        function e() {
          u(this, e), (this._routes = new Map());
        }
        return (
          F(e, [
            {
              key: 'routes',
              get: function () {
                return this._routes;
              },
            },
            {
              key: 'addFetchListener',
              value: function () {
                var e = this;
                self.addEventListener('fetch', function (t) {
                  var r = t.request,
                    n = e.handleRequest({request: r, event: t});
                  n && t.respondWith(n);
                });
              },
            },
            {
              key: 'addCacheListener',
              value: function () {
                var e = this;
                self.addEventListener('message', function (t) {
                  if (t.data && 'CACHE_URLS' === t.data.type) {
                    var r = t.data.payload;
                    0;
                    var n = Promise.all(
                      r.urlsToCache.map(function (t) {
                        'string' === typeof t && (t = [t]);
                        var r = d(Request, i(t));
                        return e.handleRequest({request: r});
                      }),
                    );
                    t.waitUntil(n),
                      t.ports &&
                        t.ports[0] &&
                        n.then(function () {
                          return t.ports[0].postMessage(!0);
                        });
                  }
                });
              },
            },
            {
              key: 'handleRequest',
              value: function (e) {
                var t = this,
                  r = e.request,
                  n = e.event;
                var a = new URL(r.url, location.href);
                if (a.protocol.startsWith('http')) {
                  var i = this.findMatchingRoute({url: a, request: r, event: n}),
                    c = i.params,
                    u = i.route,
                    o = u && u.handler;
                  if ((!o && this._defaultHandler && (o = this._defaultHandler), o)) {
                    var s;
                    0;
                    try {
                      s = o.handle({url: a, request: r, event: n, params: c});
                    } catch (f) {
                      s = Promise.reject(f);
                    }
                    return (
                      s instanceof Promise &&
                        this._catchHandler &&
                        (s = s.catch(function (e) {
                          return t._catchHandler.handle({url: a, request: r, event: n});
                        })),
                      s
                    );
                  }
                }
              },
            },
            {
              key: 'findMatchingRoute',
              value: function (e) {
                var t = e.url,
                  r = e.request,
                  n = e.event;
                var a,
                  i = c(this._routes.get(r.method) || []);
                try {
                  for (i.s(); !(a = i.n()).done; ) {
                    var u = a.value,
                      o = void 0,
                      s = u.match({url: t, request: r, event: n});
                    if (s)
                      return (
                        (o = s),
                        ((Array.isArray(s) && 0 === s.length) ||
                          (s.constructor === Object && 0 === Object.keys(s).length) ||
                          'boolean' === typeof s) &&
                          (o = void 0),
                        {route: u, params: o}
                      );
                  }
                } catch (f) {
                  i.e(f);
                } finally {
                  i.f();
                }
                return {};
              },
            },
            {
              key: 'setDefaultHandler',
              value: function (e) {
                this._defaultHandler = me(e);
              },
            },
            {
              key: 'setCatchHandler',
              value: function (e) {
                this._catchHandler = me(e);
              },
            },
            {
              key: 'registerRoute',
              value: function (e) {
                this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e);
              },
            },
            {
              key: 'unregisterRoute',
              value: function (e) {
                if (!this._routes.has(e.method))
                  throw new g('unregister-route-but-not-found-with-method', {method: e.method});
                var t = this._routes.get(e.method).indexOf(e);
                if (!(t > -1)) throw new g('unregister-route-route-not-registered');
                this._routes.get(e.method).splice(t, 1);
              },
            },
          ]),
          e
        );
      })(),
      be = function () {
        return ye || ((ye = new we()).addFetchListener(), ye.addCacheListener()), ye;
      };
    function ke(e, t, r) {
      var n;
      if ('string' === typeof e) {
        var a = new URL(e, location.href);
        n = new ge(
          function (e) {
            return e.url.href === a.href;
          },
          t,
          r,
        );
      } else if (e instanceof RegExp) n = new xe(e, t, r);
      else if ('function' === typeof e) n = new ge(e, t, r);
      else {
        if (!(e instanceof ge))
          throw new g('unsupported-route-type', {
            moduleName: 'workbox-routing',
            funcName: 'registerRoute',
            paramName: 'capture',
          });
        n = e;
      }
      return be().registerRoute(n), n;
    }
    r(4);
    var _e,
      Re = {
        cacheWillUpdate: (function () {
          var e = T(
            L.a.mark(function e(t) {
              var r;
              return L.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (200 !== (r = t.response).status && 0 !== r.status) {
                        e.next = 3;
                        break;
                      }
                      return e.abrupt('return', r);
                    case 3:
                      return e.abrupt('return', null);
                    case 4:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            }),
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
      },
      Ee = (function () {
        function e() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((u(this, e), (this._cacheName = R(t.cacheName)), (this._plugins = t.plugins || []), t.plugins)) {
            var r = t.plugins.some(function (e) {
              return !!e.cacheWillUpdate;
            });
            this._plugins = r ? t.plugins : [Re].concat(i(t.plugins));
          } else this._plugins = [Re];
          (this._fetchOptions = t.fetchOptions), (this._matchOptions = t.matchOptions);
        }
        return (
          F(e, [
            {
              key: 'handle',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t) {
                    var r, n, a, i, c;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (r = t.event),
                                (n = t.request),
                                [],
                                'string' === typeof n && (n = new Request(n)),
                                (a = this._getFromNetwork({request: n, event: r})),
                                (e.next = 7),
                                C.match({
                                  cacheName: this._cacheName,
                                  request: n,
                                  event: r,
                                  matchOptions: this._matchOptions,
                                  plugins: this._plugins,
                                })
                              );
                            case 7:
                              if (!(i = e.sent)) {
                                e.next = 13;
                                break;
                              }
                              if (r)
                                try {
                                  r.waitUntil(a);
                                } catch (c) {
                                  0;
                                }
                              e.next = 23;
                              break;
                            case 13:
                              return (e.prev = 14), (e.next = 17), a;
                            case 17:
                              (i = e.sent), (e.next = 23);
                              break;
                            case 20:
                              (e.prev = 20), (e.t0 = e.catch(14)), (c = e.t0);
                            case 23:
                              if (i) {
                                e.next = 26;
                                break;
                              }
                              throw new g('no-response', {url: n.url, error: c});
                            case 26:
                              return e.abrupt('return', i);
                            case 27:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[14, 20]],
                    );
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: '_getFromNetwork',
              value: (function () {
                var e = T(
                  L.a.mark(function e(t) {
                    var r, n, a, i;
                    return L.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (r = t.request),
                                (n = t.event),
                                (e.next = 3),
                                $.fetch({
                                  request: r,
                                  event: n,
                                  fetchOptions: this._fetchOptions,
                                  plugins: this._plugins,
                                })
                              );
                            case 3:
                              if (
                                ((a = e.sent),
                                (i = C.put({
                                  cacheName: this._cacheName,
                                  request: r,
                                  response: a.clone(),
                                  event: n,
                                  plugins: this._plugins,
                                })),
                                n)
                              )
                                try {
                                  n.waitUntil(i);
                                } catch (c) {
                                  0;
                                }
                              return e.abrupt('return', a);
                            case 7:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
          ]),
          e
        );
      })();
    self.addEventListener('activate', function () {
      return self.clients.claim();
    }),
      (function (e) {
        ue().addToCacheList(e),
          e.length > 0 && (self.addEventListener('install', ve), self.addEventListener('activate', de));
      })([
        {revision: '57d6b5a0d0dea0575dfcea7c84493479', url: '/PeerTransfer/index.html'},
        {revision: null, url: '/PeerTransfer/static/css/2.97503911.chunk.css'},
        {revision: null, url: '/PeerTransfer/static/css/main.7234b26f.chunk.css'},
        {revision: null, url: '/PeerTransfer/static/js/2.c1ba0ade.chunk.js'},
        {revision: null, url: '/PeerTransfer/static/js/3.f07a2dce.chunk.js'},
        {revision: null, url: '/PeerTransfer/static/js/main.4b3b21ea.chunk.js'},
        {revision: null, url: '/PeerTransfer/static/js/runtime-main.2c1097f4.js'},
        {revision: null, url: '/PeerTransfer/static/media/backgroundRipple.48d86bdf.svg'},
      ]),
      pe(_e);
    var Le,
      qe = new RegExp('/[^/?]+\\.[^/]+$');
    ke(function (e) {
      var t = e.request,
        r = e.url;
      return 'navigate' === t.mode && !r.pathname.startsWith('/_') && !r.pathname.match(qe);
    }, ((Le = '/PeerTransfer/index.html'), ue().createHandlerBoundToURL(Le))),
      ke(function (e) {
        var t = e.url;
        return t.origin === self.location.origin && t.pathname.endsWith('.png');
      }, new Ee({cacheName: 'images', plugins: [new te({maxEntries: 50})]})),
      self.addEventListener('message', function (e) {
        e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
      });
  },
]);
//# sourceMappingURL=service-worker.js.map
