(this['webpackJsonppeer-transfer'] = this['webpackJsonppeer-transfer'] || []).push([
  [0],
  {
    135: function (e, n, t) {},
    147: function (e, n, t) {},
    149: function (e, n, t) {
      'use strict';
      t.r(n);
      var r = t(0),
        a = t.n(r),
        o = t(17),
        c = t.n(o),
        i = (t(135), t(9)),
        s = t(16),
        l = t(11),
        u = t(76);
      t(151), t(136);
      u.a.initializeApp({
        apiKey: 'AIzaSyBeFSn6EPYfSzFt6BhqeM-33Vd96NdT33Q',
        authDomain: 'peertransfer-44201.firebaseapp.com',
        databaseURL: 'https://peertransfer-44201-default-rtdb.firebaseio.com',
        projectId: 'peertransfer-44201',
        storageBucket: 'peertransfer-44201.appspot.com',
        messagingSenderId: '640914820360',
        appId: '1:640914820360:web:51564296511922d704f0bd',
      });
      var d,
        p,
        b,
        f,
        h,
        j,
        m,
        O,
        g,
        x,
        w,
        v,
        y,
        C,
        D = u.a,
        k = t(10),
        R = [],
        I = function () {
          for (var e, n = 128512; n <= 128591; n += 1) R.push(String.fromCodePoint(n));
          var t = Math.floor(Math.random() * R.length);
          return (e = R[t]), R.splice(t, 1), e;
        },
        S = t(89),
        T = function () {
          var e = S.parse(window.navigator.userAgent);
          return {browser: e.browser.name, platform: e.platform.type};
        },
        A = t(209),
        P = t.p + 'static/media/backgroundRipple.48d86bdf.svg',
        E = t(111),
        F = t(212),
        M = {
          iceServers: [{urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']}],
          iceCandidatePoolSize: 10,
        },
        z = 'transferRooms',
        L = 'connections',
        _ = 'calleeCandidates',
        B = 'callerCandidates',
        N = 'fileMetas',
        U = 'dataChannelTimeout',
        W = 'waitRemoteDesc',
        H = 'publicID',
        $ = 'appTheme',
        J = 'appAutoAccept',
        G = 'appAutoDownload',
        Y = 16777216,
        X = t(4),
        q = a.a.createContext({localID: '', publicID: '', setPublicID: function () {}}),
        K = function (e) {
          var n = e.children,
            t = a.a.useState(''),
            o = Object(s.a)(t, 2),
            c = o[0],
            i = o[1],
            l = a.a.useState(''),
            u = Object(s.a)(l, 2),
            d = u[0],
            p = u[1];
          return (
            Object(r.useEffect)(function () {
              var e,
                n,
                t = new RTCPeerConnection(M);
              (n = t.createDataChannel('')),
                t.createOffer().then(function (e) {
                  var n;
                  return null === (n = t) || void 0 === n ? void 0 : n.setLocalDescription(e);
                });
              var r = sessionStorage.getItem(H);
              (t.onicecandidate = function (a) {
                var o;
                if (!a || !a.candidate || !a.candidate.candidate)
                  return n && n.close(), (n = null), null === (o = t) || void 0 === o || o.close(), void (t = null);
                var c = a.candidate.candidate.split(' ');
                if ('host' !== c[7]) {
                  if (r) return void p(r);
                  e || p(btoa(c[4])), (e = c[4]);
                }
              }),
                i(Object(F.a)());
            }, []),
            Object(X.jsx)(q.Provider, {value: {localID: c, publicID: d, setPublicID: p}, children: n})
          );
        },
        Q = t(14),
        V = t.n(Q),
        Z = t(20),
        ee = '768px',
        ne = '1200px',
        te = {xs: 'max-width: '.concat('320px'), sm: 'max-width: '.concat(ee), lg: 'max-width: '.concat(ne)},
        re = k.b.div(
          d ||
            (d = Object(l.a)([
              '\n  .peerHolder {\n    border-radius: 50%;\n    width: 64px;\n    height: 64px;\n    position: absolute;\n    z-index: 1;\n    @media only screen and (',
              ') {\n      position: relative;\n      bottom: unset !important;\n      left: unset !important;\n      right: unset !important;\n      transform: unset !important;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 3em;\n    }\n  }\n  & .peerHolder:nth-child(1) {\n    bottom: 33%;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n  & .peerHolder:nth-child(2) {\n    bottom: 20%;\n    left: 30%;\n  }\n  & .peerHolder:nth-child(3) {\n    bottom: 20%;\n    right: 30%;\n  }\n  & .peerHolder:nth-child(4) {\n    bottom: 58%;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n  & .peerHolder:nth-child(5) {\n    bottom: 30%;\n    left: 20%;\n  }\n  & .peerHolder:nth-child(6) {\n    bottom: 30%;\n    right: 20%;\n  }\n  & .peerHolder:nth-child(7) {\n    bottom: 10%;\n    left: 15%;\n  }\n  & .peerHolder:nth-child(8) {\n    bottom: 10%;\n    right: 15%;\n  }\n  & .peerHolder:nth-child(9) {\n    bottom: 44%;\n    left: 35%;\n  }\n  & .peerHolder:nth-child(10) {\n    bottom: 44%;\n    right: 35%;\n  }\n',
            ])),
          te.sm,
        ),
        ae = t(153),
        oe = t(193),
        ce = k.b.div(
          p ||
            (p = Object(l.a)([
              '\n  max-width: 400px;\n  min-width: 200px;\n  overflow: auto;\n  text-align: left;\n  padding: 14px;\n  user-select: none;\n  background-color: ',
              ';\n  color: ',
              ';\n  border-radius: 8px;\n',
            ])),
          function (e) {
            return e.theme.primary.dark;
          },
          function (e) {
            return e.theme.primary.contrastText;
          },
        ),
        ie = k.b.div(b || (b = Object(l.a)(['\n  font-size: calc(8px + 1vmin);\n  min-width: max-content;\n']))),
        se = k.b.div(
          f ||
            (f = Object(l.a)([
              '\n  font-size: calc(10px + 0.6vmin) !important;\n  line-height: 1.5em;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n',
            ])),
        ),
        le = k.b.div(
          h ||
            (h = Object(l.a)([
              '\n  margin-top: 16px;\n  margin-bottom: 16px;\n  max-height: 320px;\n  min-height: 60px;\n  overflow-y: auto;\n  overflow-x: hidden;\n',
            ])),
        ),
        ue = k.b.div(j || (j = Object(l.a)(['\n  display: flex;\n  flex-direction: row-reverse;\n']))),
        de = Object(k.b)(oe.a)(m || (m = Object(l.a)(['\n  margin-left: 8px !important;\n']))),
        pe = k.b.div(O || (O = Object(l.a)(['']))),
        be = k.b.a(
          g ||
            (g = Object(l.a)([
              '\n  min-width: max-content;\n  line-height: 1.5em;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  color: ',
              ';\n',
            ])),
          function (e) {
            return e.theme.secondary.light;
          },
        ),
        fe = t(196),
        he = Object(fe.a)(function (e) {
          return {
            popper: {
              zIndex: 99,
              '&[x-placement*="top"]': {top: '-8px !important'},
              '&[x-placement*="bottom"] $arrow': {
                top: 0,
                left: 0,
                marginTop: '-0.9em',
                width: '3em',
                height: '1em',
                '&::before': {
                  borderWidth: '0 1em 1em 1em',
                  borderColor: 'transparent transparent '.concat(e.palette.primary.dark, ' transparent'),
                },
              },
              '&[x-placement*="top"] $arrow': {
                bottom: 0,
                left: 0,
                marginBottom: '-0.9em',
                width: '3em',
                height: '1em',
                '&::before': {
                  borderWidth: '1em 1em 0 1em',
                  borderColor: ''.concat(e.palette.primary.dark, ' transparent transparent transparent'),
                },
              },
              '&[x-placement*="right"] $arrow': {
                left: 0,
                marginLeft: '-0.9em',
                height: '3em',
                width: '1em',
                '&::before': {
                  borderWidth: '1em 1em 1em 0',
                  borderColor: 'transparent '.concat(e.palette.primary.dark, ' transparent transparent'),
                },
              },
              '&[x-placement*="left"] $arrow': {
                right: 0,
                marginRight: '-0.9em',
                height: '3em',
                width: '1em',
                '&::before': {
                  borderWidth: '1em 0 1em 1em',
                  borderColor: 'transparent transparent transparent '.concat(e.palette.primary.dark),
                },
              },
            },
            arrow: {
              position: 'absolute',
              fontSize: 7,
              width: '3em',
              height: '3em',
              '&::before': {content: '""', margin: 'auto', display: 'block', width: 0, height: 0, borderStyle: 'solid'},
            },
          };
        }),
        je = function (e) {
          var n = e.enterType,
            t = e.anchorElement,
            r = e.isSelf,
            o = a.a.useState(null),
            c = Object(s.a)(o, 2),
            i = c[0],
            l = c[1],
            u = he();
          return Object(X.jsxs)(ae.a, {
            open: !!t && !!n,
            anchorEl: t,
            placement: 'top',
            className: u.popper,
            modifiers: {
              flip: {enabled: !0},
              preventOverflow: {enabled: !0, boundariesElement: 'scrollParent'},
              arrow: {element: i},
            },
            children: [
              Object(X.jsx)('div', {className: u.arrow, ref: l}),
              Object(X.jsx)(ce, {
                children: Object(X.jsxs)(ie, {
                  children: [
                    'drag' === n && 'Drop here to send files',
                    'mouse' === n && 'Click here to '.concat(r ? 'send to all' : 'send files'),
                  ],
                }),
              }),
            ],
          });
        },
        me = t(113),
        Oe = Object(me.a)('#468266', 0.3),
        ge = Object(k.c)(
          x ||
            (x = Object(l.a)([
              '\n  0% {\n    box-shadow: \n      0 0 0 0 ',
              ', \n      0 0 0 0.5em ',
              ';\n  }\n  100% {\n    box-shadow:\n      0 0 0 0.5em ',
              ', \n      0 0 0 1.5em transparent;\n  }\n',
            ])),
          Oe,
          Oe,
          Oe,
        ),
        xe = Object(k.c)(
          w ||
            (w = Object(l.a)([
              '\n  0% {\n    box-shadow: \n      0 0 0 0 ',
              ', \n      0 0 0 1em ',
              ', \n      0 0 0 2em ',
              ';\n  }\n  100% {\n    box-shadow:\n      0 0 0 1em ',
              ', \n      0 0 0 2em ',
              ',\n      0 0 0 3.5em transparent;\n  }\n',
            ])),
          Oe,
          Oe,
          Oe,
          Oe,
          Oe,
        ),
        we = Object(k.b)(oe.a)(
          v ||
            (v = Object(l.a)([
              '\n  background-color: ',
              ' !important;\n  color: ',
              ' !important;\n  &:hover {\n    background: ',
              ' !important;\n  }\n  border-radius: 50% !important;\n  height: 64px;\n  width: 64px;\n',
            ])),
          function (e) {
            return e.theme.secondary.main;
          },
          function (e) {
            return e.theme.secondary.contrastText;
          },
          function (e) {
            return e.theme.secondary.dark;
          },
        ),
        ve = Object(k.b)(we)(y || (y = Object(l.a)(['\n  animation: ', ' 1s linear infinite;\n'])), ge),
        ye = Object(k.b)(we)(C || (C = Object(l.a)(['\n  animation: ', ' 0.7s linear infinite;\n'])), xe),
        Ce = t(114),
        De = t(18),
        ke = function (e, n) {
          return e.length > n ? e.substring(0, n) + '...' : e;
        };
      var Re,
        Ie,
        Se,
        Te,
        Ae,
        Pe,
        Ee,
        Fe,
        Me,
        ze,
        Le,
        _e,
        Be,
        Ne,
        Ue,
        We,
        He,
        $e,
        Je,
        Ge,
        Ye = function (e) {
          e.length > 5
            ? De.b.error('The maximum number of transfer files is set up to '.concat(5))
            : e.forEach(function (e) {
                var n = e.file,
                  t = e.errors;
                De.b.error(
                  'Unable to transfer '.concat(ke(n.name, 9)).concat(
                    t.find(function (e) {
                      return 'file-too-large' === e.code;
                    })
                      ? '. The maximum size per file is set up to 16mb'
                      : '',
                  ),
                );
              });
        },
        Xe = function (e) {
          var n = e.shouldDisableActionBtn,
            t = e.handleFileInputChange,
            r = a.a.useState(null),
            o = Object(s.a)(r, 2),
            c = o[0],
            i = o[1],
            l = Object(Ce.a)({
              maxFiles: 5,
              maxSize: Y,
              disabled: n,
              onDragEnter: function () {
                return i('drag');
              },
              onDragLeave: function () {
                return i(null);
              },
              onDropAccepted: t,
              onDropRejected: Ye,
            }),
            u = l.getRootProps,
            d = l.getInputProps;
          return (
            a.a.useEffect(
              function () {
                n && i(null);
              },
              [n],
            ),
            {
              getRootProps: u,
              getInputProps: d,
              onMouseEnter: function () {
                return i('mouse');
              },
              onMouseLeave: function () {
                return i(null);
              },
              enterType: c,
            }
          );
        },
        qe = k.b.div(
          Re ||
            (Re = Object(l.a)([
              '\n  z-index: 1;\n  position: fixed;\n  bottom: 1em;\n  left: 50%;\n  transform: translateX(-50%);\n  padding-left: ',
              ';\n',
            ])),
          function (e) {
            return e.theme.drawerMinWidth;
          },
        ),
        Ke = k.b.div(
          Ie || (Ie = Object(l.a)(['\n  font-size: 14px;\n  color: ', ';\n  text-transform: capitalize;\n'])),
          function (e) {
            return e.theme.primary.contrastText;
          },
        ),
        Qe = function (e) {
          var n = e.selfIdentity,
            t = e.shouldDisableActionBtn,
            r = e.handleFileInputChange,
            o = a.a.useRef(null),
            c = Xe({shouldDisableActionBtn: t, handleFileInputChange: r}),
            s = c.getRootProps,
            l = c.getInputProps,
            u = c.onMouseEnter,
            d = c.onMouseLeave,
            p = c.enterType;
          return Object(X.jsxs)(qe, {
            children: [
              Object(X.jsxs)(
                'div',
                Object(i.a)(
                  Object(i.a)({}, s()),
                  {},
                  {
                    children: [
                      Object(X.jsxs)(ye, {
                        className: 'peerBtn',
                        ref: o,
                        onMouseEnter: u,
                        onMouseLeave: d,
                        onClick: function () {
                          return (document.getElementById('fileInput-self').value = '');
                        },
                        variant: 'contained',
                        children: [
                          Object(X.jsx)('span', {children: n.emoji}),
                          Object(X.jsx)('input', Object(i.a)({id: 'fileInput-self'}, l())),
                        ],
                      }),
                      Object(X.jsxs)(Ke, {children: ['You: ', n.platform, '-', n.browser]}),
                    ],
                  },
                ),
              ),
              Object(X.jsx)(je, {isSelf: !0, enterType: p, anchorElement: o.current}),
            ],
          });
        },
        Ve = t(41),
        Ze = t(56),
        en = k.b.div(
          Se ||
            (Se = Object(l.a)([
              '\n  position: relative;\n  font-size: 14px;\n  color: ',
              ';\n  text-transform: capitalize;\n  min-width: max-content;\n  left: 50%;\n  transform: translateX(-50%);\n',
            ])),
          function (e) {
            return e.theme.primary.contrastText;
          },
        ),
        nn = function (e) {
          var n = e.shouldDisableActionBtn,
            t = e.handleFileInputChange,
            r = e.targetPeer,
            o = e.setAnchorElement,
            c = a.a.useRef(null),
            s = Xe({shouldDisableActionBtn: n, handleFileInputChange: t}),
            l = s.getRootProps,
            u = s.getInputProps,
            d = s.onMouseEnter,
            p = s.onMouseLeave,
            b = s.enterType;
          a.a.useEffect(
            function () {
              c.current && o(c.current);
            },
            [c, o],
          );
          return Object(X.jsxs)(X.Fragment, {
            children: [
              Object(X.jsx)(
                'div',
                Object(i.a)(
                  Object(i.a)({}, l()),
                  {},
                  {
                    children: Object(X.jsxs)(ve, {
                      className: 'peerBtn',
                      ref: c,
                      disabled: n,
                      onMouseOver: d,
                      onMouseLeave: p,
                      onClick: function () {
                        return (document.getElementById('fileInput-'.concat(r.id)).value = '');
                      },
                      variant: 'contained',
                      children: [
                        Object(X.jsx)('input', Object(i.a)({id: 'fileInput-'.concat(r.id)}, u())),
                        Object(X.jsx)('span', {children: r.emoji}),
                      ],
                    }),
                  },
                ),
              ),
              Object(X.jsxs)(en, {children: [r.platform, '-', r.browser]}),
              b && Object(X.jsx)(je, {isSelf: !1, enterType: b, anchorElement: c.current}),
            ],
          });
        },
        tn = k.b.div(Te || (Te = Object(l.a)(['\n  display: flex;\n  align-items: center;\n  margin-top: 1em;\n']))),
        rn = k.b.div(
          Ae ||
            (Ae = Object(l.a)([
              '\n  width: 100%;\n  margin-right: 1em;\n  flex-grow: 1;\n  --progress-color: ',
              ';\n  progress {\n    width: 100%;\n    color: var(--progress-color);\n  }\n  progress[value] {\n    /* Reset the default progress */\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    border: none;\n    height: 12px;\n  }\n  progress[value]::-moz-progress-bar {\n    background-color: var(--progress-color);\n  }\n  progress::-webkit-progress-value {\n    border-radius: 4px;\n    background-color: var(--progress-color);\n  }\n  progress::-webkit-progress-bar {\n    border-radius: 4px;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;\n  }\n',
            ])),
          function (e) {
            return e.theme.secondary.light;
          },
        ),
        an = k.b.div(Pe || (Pe = Object(l.a)(['\n  width: 44px;\n  color: ', ';\n'])), function (e) {
          return e.theme.secondary.light;
        }),
        on = function (e) {
          return Object(X.jsxs)(tn, {
            children: [
              Object(X.jsx)(rn, {children: Object(X.jsx)('progress', {max: '100', value: e.progress})}),
              Object(X.jsx)(an, {children: ''.concat(e.progress, '%')}),
            ],
          });
        },
        cn = a.a.createContext({
          shouldAutoAccept: !1,
          shouldAutoDownload: !1,
          appTheme: 'dark',
          toggleAutoAccept: function () {},
          toggleAutoDownload: function () {},
          toggleLightDarkTheme: function () {},
        }),
        sn = function (e) {
          var n = e.children,
            t = (function () {
              var e = Object(r.useState)(!1),
                n = Object(s.a)(e, 2),
                t = n[0],
                a = n[1],
                o = Object(r.useState)(!1),
                c = Object(s.a)(o, 2),
                i = c[0],
                l = c[1];
              return (
                Object(r.useEffect)(function () {
                  var e = window.localStorage.getItem(J),
                    n = window.localStorage.getItem(G),
                    t = !('false' === n || !n);
                  a(!('false' === e || !e)), l(t);
                }, []),
                {
                  shouldAutoAccept: t,
                  shouldAutoDownload: i,
                  toggleAutoAccept: function () {
                    window.localStorage.setItem(J, (!t).toString()), a(!t);
                  },
                  toggleAutoDownload: function () {
                    window.localStorage.setItem(G, (!i).toString()), l(!i);
                  },
                }
              );
            })(),
            a = t.shouldAutoAccept,
            o = t.shouldAutoDownload,
            c = t.toggleAutoAccept,
            i = t.toggleAutoDownload,
            l = (function () {
              var e = Object(r.useState)('dark'),
                n = Object(s.a)(e, 2),
                t = n[0],
                a = n[1];
              return (
                Object(r.useEffect)(function () {
                  var e = window.localStorage.getItem($);
                  e ? a(e) : window.localStorage.setItem($, 'dark');
                }, []),
                {
                  appTheme: t,
                  toggleLightDarkTheme: function () {
                    var e = 'dark' === t ? 'light' : 'dark';
                    window.localStorage.setItem($, e), a(e);
                  },
                }
              );
            })(),
            u = l.appTheme,
            d = l.toggleLightDarkTheme;
          return Object(X.jsx)(cn.Provider, {
            value: {
              shouldAutoAccept: a,
              shouldAutoDownload: o,
              appTheme: u,
              toggleAutoAccept: c,
              toggleAutoDownload: i,
              toggleLightDarkTheme: d,
            },
            children: n,
          });
        },
        ln = {isOpen: !1, progressType: null, fileProgress: 0, downloadableFiles: []},
        un = function (e, n) {
          switch (n.type) {
            case 'clear':
              return Object(i.a)({}, ln);
            case 'set_received_progress':
              return Object(i.a)(
                Object(i.a)({}, e),
                {},
                {isOpen: !0, progressType: 'receive', fileProgress: n.payload.progress},
              );
            case 'set_sent_progress':
              return Object(i.a)(
                Object(i.a)({}, e),
                {},
                {isOpen: !0, progressType: 'send', fileProgress: n.payload.progress},
              );
            case 'set_downloadableFiles':
              return Object(i.a)(
                Object(i.a)({}, e),
                {},
                {downloadableFiles: [].concat(Object(Ze.a)(e.downloadableFiles), [n.payload.downloadableFile])},
              );
            default:
              return e;
          }
        },
        dn = function (e) {
          var n = e.targetPeer,
            t = e.setClose,
            r = e.fileProgress,
            o = e.downloadableFiles,
            c = e.progressType,
            i = e.anchorElement,
            l = e.onCancelFileTransfer,
            u = e.shouldAutoDownload,
            d = a.a.useState(null),
            p = Object(s.a)(d, 2),
            b = p[0],
            f = p[1],
            h = a.a.useState(null),
            j = Object(s.a)(h, 2),
            m = j[0],
            O = j[1],
            g = he();
          a.a.useEffect(
            function () {
              O(o);
            },
            [o],
          ),
            a.a.useEffect(
              function () {
                u && 100 === r && t();
              },
              [u, r],
            );
          var x = function () {
              l(), w();
            },
            w = function () {
              return t();
            };
          return Object(X.jsxs)(ae.a, {
            open: !!i,
            anchorEl: i,
            placement: 'top',
            className: g.popper,
            modifiers: {
              flip: {enabled: !0},
              preventOverflow: {enabled: !0, boundariesElement: 'scrollParent'},
              arrow: {element: b},
            },
            children: [
              Object(X.jsx)('div', {className: g.arrow, ref: f}),
              Object(X.jsx)(ce, {
                children:
                  'receive' === c
                    ? Object(X.jsxs)(X.Fragment, {
                        children: [
                          Object(X.jsx)(ie, {
                            children: u ? 'Download Progress: ' : 'Downloadable file will show below',
                          }),
                          Object(X.jsxs)(le, {
                            children: [
                              m &&
                                m.map(function (e, r) {
                                  return Object(X.jsx)(
                                    pe,
                                    {
                                      children: Object(X.jsxs)(be, {
                                        onClick: function () {
                                          return (function (e) {
                                            setTimeout(function () {
                                              return window.URL.revokeObjectURL(e.fileBlobUrl);
                                            }, 0);
                                            var n = m.filter(function (n) {
                                              return n.fileBlobUrl !== e.fileBlobUrl;
                                            });
                                            n.length > 0 ? O(n) : t();
                                          })(e);
                                        },
                                        download: e.fileName,
                                        href: e.fileBlobUrl,
                                        children: ['Download ', e.fileName],
                                      }),
                                    },
                                    ''.concat(n.id, '-download-').concat(r),
                                  );
                                }),
                              0 !== r && Object(X.jsx)(on, {progress: r}),
                            ],
                          }),
                          Object(X.jsx)(ue, {
                            children:
                              100 === r
                                ? Object(X.jsx)(de, {
                                    variant: 'outlined',
                                    size: 'small',
                                    onClick: w,
                                    color: 'secondary',
                                    children: 'close',
                                  })
                                : Object(X.jsx)(de, {
                                    variant: 'outlined',
                                    size: 'small',
                                    onClick: x,
                                    color: 'secondary',
                                    children: 'cancel',
                                  }),
                          }),
                        ],
                      })
                    : Object(X.jsxs)(X.Fragment, {
                        children: [
                          Object(X.jsx)(ie, {children: 'Sending...'}),
                          Object(X.jsxs)(le, {
                            children: [
                              Object(X.jsx)('div', {children: 'Waiting for file transfer to complete...'}),
                              Object(X.jsx)(on, {progress: r}),
                            ],
                          }),
                          Object(X.jsx)(ue, {
                            children: Object(X.jsx)(de, {
                              variant: 'outlined',
                              onClick: x,
                              color: 'secondary',
                              children: 'cancel',
                            }),
                          }),
                        ],
                      }),
              }),
            ],
          });
        },
        pn = function (e) {
          return Object(X.jsx)(cn.Consumer, {
            children: function (n) {
              var t = n.shouldAutoDownload;
              return Object(X.jsx)(dn, Object(i.a)(Object(i.a)({}, e), {}, {shouldAutoDownload: t}));
            },
          });
        },
        bn = function (e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
          if (0 === e) return '0 B';
          var t = Math.floor(Math.log(e) / Math.log(1024));
          return (e / Math.pow(1024, t)).toFixed(n) + ' ' + ['B', 'Kib', 'Mib', 'Gib', 'Tib'][t];
        },
        fn = {isOpen: !1, fileMetas: null},
        hn = function (e, n) {
          switch (n.type) {
            case 'clear':
              return Object(i.a)({}, fn);
            case 'set_file_metas':
              return {isOpen: !0, fileMetas: n.payload.fileMetas};
            default:
              return e;
          }
        },
        jn = function (e) {
          var n = e.setClose,
            t = e.anchorElement,
            r = e.fileMetas,
            o = e.targetPeer,
            c = e.onCancelFileTransfer,
            i = e.onAcceptFileTransfer,
            l = a.a.useState(null),
            u = Object(s.a)(l, 2),
            d = u[0],
            p = u[1],
            b = he();
          return Object(X.jsxs)(ae.a, {
            open: !!t,
            anchorEl: t,
            placement: 'top',
            className: b.popper,
            modifiers: {
              flip: {enabled: !0},
              preventOverflow: {enabled: !0, boundariesElement: 'scrollParent'},
              arrow: {element: d},
            },
            children: [
              Object(X.jsx)('div', {className: b.arrow, ref: p}),
              Object(X.jsxs)(ce, {
                children: [
                  Object(X.jsxs)(ie, {children: [o.emoji, ' from ', o.platform, ' ', o.browser, ' wants to send:']}),
                  Object(X.jsx)(le, {
                    children:
                      null === r || void 0 === r
                        ? void 0
                        : r.map(function (e, n) {
                            return Object(X.jsxs)(
                              se,
                              {children: [e.name, ' (', bn(e.size), ')']},
                              ''.concat(o.id, '-meta-').concat(n),
                            );
                          }),
                  }),
                  Object(X.jsxs)(ue, {
                    children: [
                      Object(X.jsx)(de, {
                        variant: 'contained',
                        size: 'small',
                        onClick: function () {
                          i(), n();
                        },
                        color: 'secondary',
                        children: 'Accept',
                      }),
                      Object(X.jsx)(de, {
                        variant: 'outlined',
                        size: 'small',
                        onClick: function () {
                          c(), n();
                        },
                        color: 'secondary',
                        children: 'Decline',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        mn = {isOpen: !1, gotRemoteDesc: !1},
        On = function (e, n) {
          switch (n.type) {
            case 'clear':
              return Object(i.a)({}, mn);
            case 'set_open_with_desc':
              return {isOpen: !0, gotRemoteDesc: !0};
            case 'set_open_without_desc':
              return {isOpen: !0, gotRemoteDesc: !1};
            case 'set_desc':
              return Object(i.a)(Object(i.a)({}, e), {}, {gotRemoteDesc: !0});
            default:
              return e;
          }
        },
        gn = function (e) {
          var n = e.targetPeer,
            t = e.gotRemoteDesc,
            r = e.anchorElement,
            o = a.a.useState(null),
            c = Object(s.a)(o, 2),
            i = c[0],
            l = c[1],
            u = he();
          return (
            a.a.useEffect(
              function () {
                var e;
                return (
                  sessionStorage.setItem(W, '1'),
                  t &&
                    (e = setTimeout(function () {
                      sessionStorage.setItem(U, '1'), window.location.reload();
                    }, 3e3)),
                  function () {
                    clearTimeout(e), sessionStorage.removeItem(W);
                  }
                );
              },
              [t],
            ),
            Object(X.jsxs)(ae.a, {
              open: !!r,
              anchorEl: r,
              placement: 'top',
              className: u.popper,
              modifiers: {
                flip: {enabled: !0},
                preventOverflow: {enabled: !0, boundariesElement: 'scrollParent'},
                arrow: {element: i},
              },
              children: [
                Object(X.jsx)('div', {className: u.arrow, ref: l}),
                Object(X.jsx)(ce, {
                  children: Object(X.jsx)(ie, {
                    children: t
                      ? 'Preparing data channel with '.concat(n.emoji, '...')
                      : 'Waiting for '.concat(n.emoji, "'s response..."),
                  }),
                }),
              ],
            })
          );
        },
        xn = function (e) {
          var n = e.publicID,
            t = e.firestoreDbRef,
            a = e.connectionIdRef,
            o = e.peerConnectionRef,
            c = e.callerUnsubscriberRef,
            i = e.dispatchProgressPopperData,
            s = e.dispatchWaitResponsePopperData,
            l = e.handleDownloadFile,
            u = e.clearSignalService,
            d = Object(r.useRef)(null),
            p = Object(r.useCallback)(
              function () {
                s({type: 'clear'}),
                  d.current &&
                    (d.current.close(),
                    console.log('Closed receive data channel with label: '.concat(d.current.label))),
                  u();
              },
              [d, s, u],
            ),
            b = Object(r.useCallback)(
              function () {
                o.current.ondatachannel = function (e) {
                  console.log('Receive Channel Callback'),
                    (d.current = e.channel),
                    (d.current.binaryType = 'arraybuffer'),
                    (d.current.onmessage = h),
                    (d.current.onopen = m),
                    (d.current.onclose = m);
                };
                var e = t.collection(z).doc(n).collection(L).doc(a.current),
                  r = 0,
                  c = 0,
                  u = 0,
                  b = 0,
                  f = [];
                function h(e) {
                  return j.apply(this, arguments);
                }
                function j() {
                  return (j = Object(Z.a)(
                    V.a.mark(function n(t) {
                      var a, o, s, d, h, j, m, O;
                      return V.a.wrap(function (n) {
                        for (;;)
                          switch ((n.prev = n.next)) {
                            case 0:
                              return (n.next = 2), e.get();
                            case 2:
                              if ((a = n.sent).data()) {
                                n.next = 5;
                                break;
                              }
                              return n.abrupt('return');
                            case 5:
                              console.log('Received Message '.concat(t.data.byteLength)),
                                console.log(t.data),
                                f.push(t.data),
                                (c += t.data.byteLength),
                                (b += t.data.byteLength),
                                (o = a.data().fileMetas),
                                (s = o.reduce(function (e, n) {
                                  return e + n.size;
                                }, 0)),
                                (d = o[u]),
                                (h = d.name),
                                (j = d.size),
                                (m = Math.round((c / s) * 100)),
                                i({type: 'set_received_progress', payload: {progress: m}}),
                                b === j && ((O = new Blob(f)), (f = []), (b = 0), (u += 1), l(O, h)),
                                c === s && ((r = 1), p());
                            case 17:
                            case 'end':
                              return n.stop();
                          }
                      }, n);
                    }),
                  )).apply(this, arguments);
                }
                function m() {
                  return O.apply(this, arguments);
                }
                function O() {
                  return (O = Object(Z.a)(
                    V.a.mark(function e() {
                      var n;
                      return V.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              d.current &&
                                ((n = d.current.readyState),
                                console.log('Receive channel state is: '.concat(n)),
                                'open' === n && s({type: 'clear'}),
                                'closed' === n &&
                                  (r || De.b.warn('File transfer is cancelled'), (r = 0), (d.current = null)));
                            case 1:
                            case 'end':
                              return e.stop();
                          }
                      }, e);
                    }),
                  )).apply(this, arguments);
                }
              },
              [a, t, o, d, n, i, s, l, p],
            );
          return {
            receiveChannelRef: d,
            joinTransferChannel: (function () {
              var e = Object(Z.a)(
                V.a.mark(function e(r) {
                  var i, s, l, u, d, p, f, h;
                  return V.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (i = t.collection(z).doc(n)), (s = i.collection(L).doc(r)), (e.next = 4), s.get();
                        case 4:
                          if (!(l = e.sent).exists) {
                            e.next = 26;
                            break;
                          }
                          return (
                            (a.current = r),
                            (o.current = new RTCPeerConnection(M)),
                            b(),
                            (u = s.collection(_)),
                            o.current.addEventListener('icecandidate', function (e) {
                              e.candidate ? u.add(e.candidate.toJSON()) : console.log('Got final candidate!');
                            }),
                            (d = l.data().offer),
                            console.log('Got offer:', d),
                            (e.next = 15),
                            o.current.setRemoteDescription(new RTCSessionDescription(d))
                          );
                        case 15:
                          return (e.next = 17), o.current.createAnswer();
                        case 17:
                          return (
                            (p = e.sent),
                            console.log('Created answer:', p),
                            (e.next = 21),
                            o.current.setLocalDescription(p)
                          );
                        case 21:
                          return (
                            (f = {answer: {type: p.type, sdp: p.sdp}, isAccepting: !0}), (e.next = 24), s.update(f)
                          );
                        case 24:
                          (h = s.collection(B).onSnapshot(function (e) {
                            e.docChanges().forEach(
                              (function () {
                                var e = Object(Z.a)(
                                  V.a.mark(function e(n) {
                                    var t;
                                    return V.a.wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            if ('added' !== n.type) {
                                              e.next = 6;
                                              break;
                                            }
                                            return (
                                              (t = n.doc.data()),
                                              console.log('Got new remote ICE candidate: '.concat(JSON.stringify(t))),
                                              console.log(o.current),
                                              (e.next = 6),
                                              o.current.addIceCandidate(new RTCIceCandidate(t))
                                            );
                                          case 6:
                                          case 'end':
                                            return e.stop();
                                        }
                                    }, e);
                                  }),
                                );
                                return function (n) {
                                  return e.apply(this, arguments);
                                };
                              })(),
                            );
                          })),
                            (c.current = h);
                        case 26:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function (n) {
                return e.apply(this, arguments);
              };
            })(),
          };
        },
        wn = function (e) {
          var n = e.localID,
            t = e.publicID,
            a = e.firestoreDbRef,
            o = e.connectionIdRef,
            c = e.peerConnectionRef,
            s = e.calleeUnsubscriberRef,
            l = e.descriptionUnsubscriberRef,
            u = e.totalFileSizeRef,
            d = e.sentFileReaderRef,
            p = e.acceptedFileListRef,
            b = e.dispatchWaitResponsePopperData,
            f = e.dispatchProgressPopperData,
            h = Object(r.useRef)(null),
            j = Object(r.useCallback)(
              Object(Z.a)(
                V.a.mark(function e() {
                  var n, t, r, a, o, i, s, l, b, j;
                  return V.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((b = function () {
                              De.b.success('File has been transferred'),
                                (i = 0),
                                (s = 0),
                                (l = 0),
                                f({type: 'clear'}),
                                (p.current = []);
                            }),
                            p.current && 0 !== p.current.length)
                          ) {
                            e.next = 3;
                            break;
                          }
                          return e.abrupt('return');
                        case 3:
                          console.log('Sending files:', p.current),
                            (r = Object(Ze.a)(p.current)),
                            (a =
                              null === (n = c.current) || void 0 === n || null === (t = n.sctp) || void 0 === t
                                ? void 0
                                : t.maxMessageSize),
                            console.log('maximum message size is: ', a),
                            (o = a || 16384),
                            (i = 0),
                            (s = 0),
                            (l = 0),
                            (d.current = new FileReader()),
                            d.current.addEventListener('error', function (e) {
                              console.error('Error reading file:', e),
                                De.b.error('Failed to read file: '.concat(r[s].name));
                            }),
                            d.current.addEventListener('abort', function (e) {
                              console.log('File reading aborted:', e), De.b.warn('Abort file read: '.concat(r[s].name));
                            }),
                            d.current.addEventListener('load', function (e) {
                              var n = e.target.result;
                              h.current.send(n), (l += n.byteLength), (i += n.byteLength);
                              var t = Math.round((l / u.current) * 100);
                              f({type: 'set_sent_progress', payload: {progress: t}}),
                                l < u.current
                                  ? (function e() {
                                      h.current.bufferedAmount + n.byteLength < 16777216 ? j(i) : setTimeout(e, 500);
                                    })()
                                  : (console.log('transfer done'), b());
                            }),
                            (j = function (e) {
                              var n;
                              if (e < r[s].size) {
                                var t = e + o;
                                t > r[s].size && (t = r[s].size), (n = r[s].slice(i, t));
                              } else {
                                if (((i = 0), !r[(s += 1)])) return void b();
                                n = r[s].slice(i, o);
                              }
                              d.current.readAsArrayBuffer(n);
                            })(0);
                        case 17:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              ),
              [h, u, d, p, c, f],
            ),
            m = Object(r.useCallback)(
              function () {
                function e() {
                  if (h.current) {
                    var e = h.current.readyState;
                    console.log('Send channel state is: '.concat(e)),
                      'open' === e && (j(), b({type: 'clear'})),
                      'closed' === e && (h.current = null);
                  }
                }
                (h.current = c.current.createDataChannel('sendDataChannel')),
                  console.log('Created send data channel: ', h.current),
                  (h.current.binaryType = 'arraybuffer'),
                  (h.current.onopen = e),
                  (h.current.onclose = e),
                  (h.current.onerror = function (e) {
                    if (h.current) return void console.error('Error in sendChannel:', e);
                    console.log('Error in sendChannel which is already closed:', e);
                  });
              },
              [c, h, j, b],
            );
          return {
            sendChannelRef: h,
            tryCreatePeerConnection: (function () {
              var e = Object(Z.a)(
                V.a.mark(function e(r) {
                  var u, d, p, f, h, j, O, g, x;
                  return V.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (u = a.collection(z).doc(t)),
                            (d = u.collection(L)),
                            (p = d.doc()),
                            (f = {p2p: {offer: n, answer: r.id}}),
                            (h = p.collection(B)),
                            (c.current = new RTCPeerConnection(M)),
                            (o.current = p.id),
                            m(),
                            c.current.addEventListener('icecandidate', function (e) {
                              e.candidate ? h.add(e.candidate.toJSON()) : console.log('Got final candidate!');
                            }),
                            (e.next = 11),
                            c.current.createOffer()
                          );
                        case 11:
                          return (j = e.sent), (e.next = 14), c.current.setLocalDescription(j);
                        case 14:
                          return (
                            console.log('Created offer:', j),
                            (O = {offer: {type: j.type, sdp: j.sdp}, isAccepting: !1}),
                            (e.next = 18),
                            p.set(Object(i.a)(Object(i.a)({}, O), f))
                          );
                        case 18:
                          (g = p.onSnapshot(
                            (function () {
                              var e = Object(Z.a)(
                                V.a.mark(function e(n) {
                                  var t, r;
                                  return V.a.wrap(function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          if ((t = n.data()) && t.answer) {
                                            e.next = 3;
                                            break;
                                          }
                                          return e.abrupt('return');
                                        case 3:
                                          if (!c.current || c.current.currentRemoteDescription) {
                                            e.next = 8;
                                            break;
                                          }
                                          return (
                                            (r = new RTCSessionDescription(t.answer)),
                                            (e.next = 7),
                                            c.current.setRemoteDescription(r)
                                          );
                                        case 7:
                                          b({type: 'set_desc'});
                                        case 8:
                                        case 'end':
                                          return e.stop();
                                      }
                                  }, e);
                                }),
                              );
                              return function (n) {
                                return e.apply(this, arguments);
                              };
                            })(),
                          )),
                            (l.current = g),
                            (x = p.collection(_).onSnapshot(function (e) {
                              e.docChanges().forEach(
                                (function () {
                                  var e = Object(Z.a)(
                                    V.a.mark(function e(n) {
                                      var t;
                                      return V.a.wrap(function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              if ('added' !== n.type) {
                                                e.next = 4;
                                                break;
                                              }
                                              return (
                                                (t = n.doc.data()),
                                                (e.next = 4),
                                                c.current.addIceCandidate(new RTCIceCandidate(t))
                                              );
                                            case 4:
                                            case 'end':
                                              return e.stop();
                                          }
                                      }, e);
                                    }),
                                  );
                                  return function (n) {
                                    return e.apply(this, arguments);
                                  };
                                })(),
                              );
                            })),
                            (s.current = x),
                            b({type: 'set_open_without_desc'});
                        case 23:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function (n) {
                return e.apply(this, arguments);
              };
            })(),
          };
        },
        vn = function (e) {
          var n = e.targetPeer,
            t = e.localID,
            a = e.publicID,
            o = e.firestoreDbRef,
            c = e.sendAllFiles,
            l = e.clearSentAllFiles,
            u = Object(r.useRef)(!0),
            d = Object(r.useRef)(null),
            p = Object(r.useRef)(null),
            b = Object(r.useRef)(null),
            f = Object(r.useRef)(0),
            h = Object(r.useRef)([]),
            j = Object(r.useRef)(),
            m = Object(r.useRef)(),
            O = Object(r.useRef)(),
            g = Object(r.useState)(null),
            x = Object(s.a)(g, 2),
            w = x[0],
            v = x[1],
            y = Object(r.useReducer)(On, mn),
            C = Object(s.a)(y, 2),
            D = C[0],
            k = C[1],
            R = Object(r.useReducer)(hn, fn),
            I = Object(s.a)(R, 2),
            S = I[0],
            T = I[1],
            A = Object(r.useReducer)(un, ln),
            P = Object(s.a)(A, 2),
            E = P[0],
            F = P[1],
            M = Object(r.useMemo)(
              function () {
                return D.isOpen || S.isOpen || E.isOpen;
              },
              [D.isOpen, S.isOpen, E.isOpen],
            );
          Object(r.useEffect)(function () {
            var e = o
              .collection(z)
              .doc(a)
              .collection(L)
              .onSnapshot(
                (function () {
                  var e = Object(Z.a)(
                    V.a.mark(function e(r) {
                      return V.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              r.docChanges().forEach(
                                (function () {
                                  var e = Object(Z.a)(
                                    V.a.mark(function e(r) {
                                      var a, o, c;
                                      return V.a.wrap(function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              (a = r.doc.data()),
                                                'modified' === r.type &&
                                                  ((o = a.isAccepting),
                                                  a.p2p &&
                                                    a.fileMetas &&
                                                    !a.answer &&
                                                    a.p2p.answer === t &&
                                                    a.p2p.offer === n.id &&
                                                    (o || ce(a.fileMetas, r.doc.id))),
                                                'removed' === r.type &&
                                                  ((c = r.doc.id),
                                                  console.log('remove connection: '),
                                                  console.log(c, p.current),
                                                  c !== p.current ||
                                                    !a.p2p ||
                                                    (a.p2p.answer !== t && a.p2p.offer !== t) ||
                                                    ee(!0));
                                            case 3:
                                            case 'end':
                                              return e.stop();
                                          }
                                      }, e);
                                    }),
                                  );
                                  return function (n) {
                                    return e.apply(this, arguments);
                                  };
                                })(),
                              );
                            case 1:
                            case 'end':
                              return e.stop();
                          }
                      }, e);
                    }),
                  );
                  return function (n) {
                    return e.apply(this, arguments);
                  };
                })(),
              );
            return function () {
              e(),
                ee(!1),
                ne(),
                sessionStorage.getItem(W) && (De.b.warn('Peer connection dropped'), sessionStorage.removeItem(W));
            };
          }, []),
            Object(r.useEffect)(
              function () {
                u.current ? (u.current = !1) : (te(Object(Ze.a)(c)), l());
              },
              [u, c],
            );
          var U = Object(r.useCallback)(
              Object(Z.a)(
                V.a.mark(function e() {
                  var n, t, r;
                  return V.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            (j.current && j.current(),
                            m.current && m.current(),
                            O.current && O.current(),
                            !(n = p.current))
                          ) {
                            e.next = 18;
                            break;
                          }
                          return (
                            (t = o.collection(z).doc(a)),
                            (r = t.collection(L).doc(n)),
                            (e.next = 9),
                            r.collection(_).get()
                          );
                        case 9:
                          return (
                            e.sent.forEach(
                              (function () {
                                var e = Object(Z.a)(
                                  V.a.mark(function e(n) {
                                    return V.a.wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (e.next = 2), n.ref.delete();
                                          case 2:
                                          case 'end':
                                            return e.stop();
                                        }
                                    }, e);
                                  }),
                                );
                                return function (n) {
                                  return e.apply(this, arguments);
                                };
                              })(),
                            ),
                            (e.next = 13),
                            r.collection(B).get()
                          );
                        case 13:
                          return (
                            e.sent.forEach(
                              (function () {
                                var e = Object(Z.a)(
                                  V.a.mark(function e(n) {
                                    return V.a.wrap(function (e) {
                                      for (;;)
                                        switch ((e.prev = e.next)) {
                                          case 0:
                                            return (e.next = 2), n.ref.delete();
                                          case 2:
                                          case 'end':
                                            return e.stop();
                                        }
                                    }, e);
                                  }),
                                );
                                return function (n) {
                                  return e.apply(this, arguments);
                                };
                              })(),
                            ),
                            (e.next = 17),
                            r.delete()
                          );
                        case 17:
                          p.current = null;
                        case 18:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              ),
              [o, p, j, m, O, a],
            ),
            H = xn({
              publicID: a,
              firestoreDbRef: o,
              connectionIdRef: p,
              peerConnectionRef: d,
              callerUnsubscriberRef: j,
              dispatchProgressPopperData: F,
              dispatchWaitResponsePopperData: k,
              handleDownloadFile: function (e, n) {
                if ('true' === window.localStorage.getItem(G)) {
                  var t = document.createElement('a');
                  (t.href = URL.createObjectURL(e)),
                    (t.download = n),
                    document.body.appendChild(t),
                    t.click(),
                    window.URL.revokeObjectURL(t.href),
                    document.body.removeChild(t);
                } else
                  F({
                    type: 'set_downloadableFiles',
                    payload: {downloadableFile: {fileName: n, fileBlobUrl: URL.createObjectURL(e)}},
                  });
              },
              clearSignalService: U,
            }),
            $ = H.receiveChannelRef,
            Y = H.joinTransferChannel,
            q = wn({
              localID: t,
              publicID: a,
              firestoreDbRef: o,
              connectionIdRef: p,
              peerConnectionRef: d,
              calleeUnsubscriberRef: m,
              descriptionUnsubscriberRef: O,
              totalFileSizeRef: f,
              sentFileReaderRef: b,
              acceptedFileListRef: h,
              dispatchProgressPopperData: F,
              dispatchWaitResponsePopperData: k,
            }),
            K = q.sendChannelRef,
            Q = q.tryCreatePeerConnection,
            ee = Object(r.useCallback)(
              function (e) {
                k({type: 'clear'}),
                  K.current &&
                    (K.current.close(),
                    e && De.b.warn('File transfer is closed'),
                    console.log('Closed send data channel with label: '.concat(K.current.label))),
                  $.current &&
                    ($.current.close(),
                    console.log('Closed receive data channel with label: '.concat($.current.label))),
                  U();
              },
              [K, $, U],
            ),
            ne = Object(r.useCallback)(
              function () {
                d.current && (console.log('closing peers connection'), d.current.close(), (d.current = null));
              },
              [d],
            );
          function te(e) {
            return re.apply(this, arguments);
          }
          function re() {
            return (re = Object(Z.a)(
              V.a.mark(function e(t) {
                var r, c, i, s, l, u;
                return V.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!(t.length > 0)) {
                          e.next = 13;
                          break;
                        }
                        return (h.current = t), (e.next = 4), Q(n);
                      case 4:
                        return (
                          (r = p.current),
                          (c = o.collection(z).doc(a)),
                          (i = c.collection(L)),
                          (s = i.doc(r)),
                          (l = []),
                          t.forEach(function (e) {
                            l.push({name: e.name, size: e.size, type: e.type}), (f.current += e.size);
                          }),
                          (u = Object(Ve.a)({}, N, l)),
                          (e.next = 13),
                          s.update(u)
                        );
                      case 13:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              }),
            )).apply(this, arguments);
          }
          var ae = function () {
              Y(p.current), D.isOpen || k({type: 'set_open_with_desc'});
            },
            oe = function () {
              b.current && 1 === b.current.readyState && (console.log('Abort file read...'), b.current.abort()),
                S.isOpen && T({type: 'clear'}),
                ee(!1);
            },
            ce = (function () {
              var e = Object(Z.a)(
                V.a.mark(function e(t, r) {
                  var a;
                  return V.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          console.log('incoming file metas:', t),
                            console.log('got from:', n),
                            (p.current = r),
                            (a = window.localStorage.getItem(J)),
                            'true' === a ? ae() : T({type: 'set_file_metas', payload: {fileMetas: t}});
                        case 6:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function (n, t) {
                return e.apply(this, arguments);
              };
            })();
          return Object(X.jsxs)('div', {
            className: 'peerHolder',
            children: [
              Object(X.jsx)(nn, {
                shouldDisableActionBtn: M,
                handleFileInputChange: te,
                targetPeer: n,
                setAnchorElement: v,
              }),
              D.isOpen && Object(X.jsx)(gn, Object(i.a)(Object(i.a)({}, D), {}, {targetPeer: n, anchorElement: w})),
              E.isOpen &&
                Object(X.jsx)(
                  pn,
                  Object(i.a)(
                    Object(i.a)({}, E),
                    {},
                    {
                      onCancelFileTransfer: oe,
                      targetPeer: n,
                      setClose: function () {
                        return F({type: 'clear'});
                      },
                      anchorElement: w,
                    },
                  ),
                ),
              S.isOpen &&
                Object(X.jsx)(
                  jn,
                  Object(i.a)(
                    Object(i.a)({}, S),
                    {},
                    {
                      onAcceptFileTransfer: ae,
                      onCancelFileTransfer: oe,
                      targetPeer: n,
                      setClose: function () {
                        return T({type: 'clear'});
                      },
                      anchorElement: w,
                    },
                  ),
                ),
            ],
          });
        },
        yn = t(155),
        Cn = k.b.p(
          Ee ||
            (Ee = Object(l.a)([
              '\n  color: ',
              ';\n  margin-top: ',
              ';\n  height: ',
              ';\n  span {\n    font-size: 12px;\n  }\n',
            ])),
          function (e) {
            return e.theme.primary.contrastText;
          },
          function (e) {
            return e.$shouldHide ? '0px' : '28%';
          },
          function (e) {
            return e.$shouldHide ? '0px' : 'auto';
          },
        ),
        Dn = Object(k.b)(re)(
          Fe ||
            (Fe = Object(l.a)([
              '\n  position: relative;\n  height: 100%;\n  width: 100%;\n  z-index: 1;\n  overflow-y: auto;\n  padding-top: 1em;\n  padding-bottom: 100px;\n  @media only screen and (',
              ') {\n    padding-bottom: 0;\n    margin-bottom: 120px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n  }\n',
            ])),
          te.sm,
        ),
        kn = function (e) {
          var n = e.selfIdentity,
            t = e.publicID,
            o = e.localID,
            c = Object(r.useState)([]),
            i = Object(s.a)(c, 2),
            l = i[0],
            u = i[1],
            d = Object(r.useState)([]),
            p = Object(s.a)(d, 2),
            b = p[0],
            f = p[1],
            h = a.a.useRef(D.firestore());
          function j() {
            b.length > 0 && f([]);
          }
          Object(r.useEffect)(
            function () {
              var e = D.database().ref(''.concat(t));
              return (
                e.on(
                  'value',
                  (function () {
                    var e = Object(Z.a)(
                      V.a.mark(function e(n) {
                        var t, r, a;
                        return V.a.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                for (a in ((t = n.val()), (r = []), t)) a !== o && r.push(t[a]);
                                r.length > 10
                                  ? (De.b.dismiss(), De.b.warn('The maximum concurrent peers is set to '.concat(10)))
                                  : u(r);
                              case 4:
                              case 'end':
                                return e.stop();
                            }
                        }, e);
                      }),
                    );
                    return function (n) {
                      return e.apply(this, arguments);
                    };
                  })(),
                ),
                function () {
                  e.off();
                }
              );
            },
            [t],
          );
          var m = 0 === l.length;
          return Object(X.jsxs)(X.Fragment, {
            children: [
              Object(X.jsx)(yn.a, {
                in: m,
                children: Object(X.jsxs)(Cn, {
                  $shouldHide: !m,
                  children: [
                    'Open the same link to start transfer files',
                    Object(X.jsx)('br', {}),
                    Object(X.jsx)('span', {
                      children: 'swipe right or click drawer icons to see or toggle app settings',
                    }),
                  ],
                }),
              }),
              Object(X.jsx)(yn.a, {
                in: !m,
                children: Object(X.jsx)(Dn, {
                  children: l.map(function (e) {
                    return Object(X.jsx)(
                      vn,
                      {
                        clearSentAllFiles: j,
                        sendAllFiles: b,
                        firestoreDbRef: h.current,
                        targetPeer: e,
                        publicID: t,
                        localID: o,
                      },
                      e.id,
                    );
                  }),
                }),
              }),
              n &&
                Object(X.jsx)(Qe, {
                  shouldDisableActionBtn: b.length > 0,
                  handleFileInputChange: function (e) {
                    0 === l.length ? (De.b.warn('There is no other peers in this room'), j()) : f(e);
                  },
                  publicID: t,
                  localID: o,
                  selfIdentity: n,
                }),
            ],
          });
        },
        Rn = Object(r.memo)(kn),
        In = t(6),
        Sn = t(215),
        Tn = t(203),
        An = t(202),
        Pn = t(109),
        En = t.n(Pn),
        Fn = t(200),
        Mn = t(110),
        zn = t.n(Mn),
        Ln = t(213),
        _n = {
          light: {
            primary: {main: '#f1f0ea', light: '#f3f3ee', dark: '#d7d7d3', contrastText: '#025855'},
            secondary: {main: '#cd5521', dark: '#8f3b17', light: '#d7774d', contrastText: '#fff'},
          },
          dark: {
            primary: {main: '#303846', light: '#595f6b', dark: '#212731', contrastText: '#fff'},
            secondary: {main: '#1565C0', dark: '#0e4686', light: '#4383cc', contrastText: '#fff'},
          },
        },
        Bn = Object(i.a)({drawerMinWidth: '55px'}, _n.dark),
        Nn = Object(fe.a)(function (e) {
          return Object(Ln.a)({
            hide: {display: 'none'},
            drawer: {flexShrink: 0, whiteSpace: 'nowrap'},
            drawerOpen: {
              width: 290,
              transition: e.transitions.create('width', {
                easing: e.transitions.easing.sharp,
                duration: e.transitions.duration.enteringScreen,
              }),
            },
            drawerClose: {
              width: Bn.drawerMinWidth,
              transition: e.transitions.create('width', {
                easing: e.transitions.easing.sharp,
                duration: e.transitions.duration.leavingScreen,
              }),
              overflow: 'hidden',
            },
            titleText: {fontSize: 22, position: 'absolute', left: 16},
            titleBar: {display: 'flex', alignItems: 'center', height: 60, justifyContent: 'flex-end'},
          });
        }),
        Un = t(199),
        Wn = t(198),
        Hn = t(197),
        $n = t(201),
        Jn = t(214),
        Gn = t(105),
        Yn = t.n(Gn),
        Xn = t(108),
        qn = t.n(Xn),
        Kn = t(107),
        Qn = t.n(Kn),
        Vn = t(101),
        Zn = t.n(Vn),
        et = t(102),
        nt = t.n(et),
        tt = t(99),
        rt = t.n(tt),
        at = t(100),
        ot = t.n(at),
        ct = t(103),
        it = t.n(ct),
        st = t(104),
        lt = t.n(st),
        ut = t(106),
        dt = t.n(ut),
        pt = Object(k.b)(Hn.a)(
          Me || (Me = Object(l.a)(['\n  margin-right: -16px;\n  color: ', ' !important;\n'])),
          function (e) {
            return e.theme.primary.contrastText;
          },
        ),
        bt = Object(k.b)(Wn.a)(
          ze ||
            (ze = Object(l.a)([
              '\n  justify-content: space-between !important;\n  line-height: 1.5em;\n  cursor: pointer;\n  padding: 0.5em 1em;\n  font-size: 14px;\n  text-align: left;\n  padding-bottom: 1em;\n  visibility: ',
              ';\n  span {\n    font-weight: 300;\n  }\n',
            ])),
          function (e) {
            return e.$isOpen ? 'visible' : 'hidden';
          },
        ),
        ft = Object(k.b)(Un.a)(Le || (Le = Object(l.a)(['\n  margin-top: auto !important;\n']))),
        ht = function (e) {
          var n = e.publicID,
            t = e.drawerOpen,
            r = e.shouldAutoAccept,
            a = e.shouldAutoDownload,
            o = e.appTheme,
            c = e.toggleAutoAccept,
            i = e.toggleAutoDownload,
            s = e.toggleLightDarkTheme,
            l = e.handleJoinRoomModalOpen,
            u = e.handleAboutModalOpen,
            d = (function () {
              var e = Object(Z.a)(
                V.a.mark(function e() {
                  return V.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), navigator.clipboard.writeText(n);
                        case 2:
                          De.b.info('Room Id copied', {autoClose: 3e3});
                        case 3:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function () {
                return e.apply(this, arguments);
              };
            })();
          return Object(X.jsxs)(X.Fragment, {
            children: [
              Object(X.jsxs)(Un.a, {
                children: [
                  Object(X.jsx)(Fn.a, {
                    title: 'Auto Accept',
                    placement: 'right',
                    children: Object(X.jsxs)(Wn.a, {
                      button: !0,
                      onClick: c,
                      children: [
                        Object(X.jsx)(pt, {children: r ? Object(X.jsx)(rt.a, {}) : Object(X.jsx)(ot.a, {})}),
                        Object(X.jsx)($n.a, {primary: 'Auto Accept Request'}),
                        Object(X.jsx)(Jn.a, {checked: r, inputProps: {'aria-label': 'secondary checkbox'}}),
                      ],
                    }),
                  }),
                  Object(X.jsx)(Fn.a, {
                    title: 'Auto Download',
                    placement: 'right',
                    children: Object(X.jsxs)(Wn.a, {
                      button: !0,
                      onClick: i,
                      children: [
                        Object(X.jsx)(pt, {children: a ? Object(X.jsx)(Zn.a, {}) : Object(X.jsx)(nt.a, {})}),
                        Object(X.jsx)($n.a, {primary: 'Auto Download File'}),
                        Object(X.jsx)(Jn.a, {checked: a, inputProps: {'aria-label': 'secondary checkbox'}}),
                      ],
                    }),
                  }),
                ],
              }),
              Object(X.jsx)(Tn.a, {}),
              Object(X.jsxs)(Un.a, {
                children: [
                  Object(X.jsx)(Fn.a, {
                    title: 'Brightness Theme',
                    placement: 'right',
                    children: Object(X.jsxs)(Wn.a, {
                      button: !0,
                      onClick: s,
                      children: [
                        Object(X.jsx)(pt, {
                          children: 'light' === o ? Object(X.jsx)(it.a, {}) : Object(X.jsx)(lt.a, {}),
                        }),
                        Object(X.jsx)($n.a, {primary: 'Light / Dark Theme'}),
                      ],
                    }),
                  }),
                  Object(X.jsx)(Fn.a, {
                    title: 'Join Another Room',
                    placement: 'right',
                    children: Object(X.jsxs)(Wn.a, {
                      button: !0,
                      onClick: l,
                      children: [
                        Object(X.jsx)(pt, {children: Object(X.jsx)(Yn.a, {})}),
                        Object(X.jsx)($n.a, {primary: 'Join a room'}),
                      ],
                    }),
                  }),
                ],
              }),
              Object(X.jsx)(Tn.a, {}),
              Object(X.jsx)(Un.a, {
                children: Object(X.jsx)(Fn.a, {
                  title: 'Copy Room ID',
                  placement: 'right',
                  children: Object(X.jsxs)(bt, {
                    button: !0,
                    $isOpen: t,
                    onClick: d,
                    children: [
                      Object(X.jsxs)('div', {
                        children: [Object(X.jsx)('span', {children: 'Room ID:'}), Object(X.jsx)('div', {children: n})],
                      }),
                      Object(X.jsx)(pt, {children: Object(X.jsx)(dt.a, {})}),
                    ],
                  }),
                }),
              }),
              Object(X.jsxs)(ft, {
                children: [
                  Object(X.jsx)(Fn.a, {
                    title: 'About',
                    placement: 'right',
                    children: Object(X.jsxs)(Wn.a, {
                      button: !0,
                      onClick: u,
                      children: [
                        Object(X.jsx)(pt, {children: Object(X.jsx)(Qn.a, {})}),
                        Object(X.jsx)($n.a, {primary: 'About'}),
                      ],
                    }),
                  }),
                  Object(X.jsx)(Fn.a, {
                    title: 'Source Code',
                    placement: 'right',
                    children: Object(X.jsxs)(Wn.a, {
                      button: !0,
                      onClick: function () {
                        return window.open('https://github.com/haooowu/PeerTransfer');
                      },
                      children: [
                        Object(X.jsx)(pt, {children: Object(X.jsx)(qn.a, {})}),
                        Object(X.jsx)($n.a, {primary: 'Source'}),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          });
        },
        jt = function (e) {
          return Object(X.jsx)(q.Consumer, {
            children: function (n) {
              var t = n.publicID;
              return Object(X.jsx)(ht, Object(i.a)({publicID: t}, e));
            },
          });
        },
        mt = t(211),
        Ot = t(205),
        gt = t(204),
        xt = t(207),
        wt = t(208),
        vt = t(206),
        yt = Object(k.b)(gt.a)(_e || (_e = Object(l.a)(['\n  padding: 8px 16px !important;\n']))),
        Ct = new RegExp(/^[a-zA-Z0-9+/=]+$/),
        Dt = function (e) {
          var n = e.open,
            t = e.handleClose,
            r = a.a.useState(''),
            o = Object(s.a)(r, 2),
            c = o[0],
            i = o[1];
          return Object(X.jsxs)(Ot.a, {
            open: n,
            onClose: t,
            children: [
              Object(X.jsx)(vt.a, {children: 'Join or Create Room'}),
              Object(X.jsxs)(xt.a, {
                children: [
                  Object(X.jsx)(wt.a, {children: 'You can find current room ID by expand the side drawer'}),
                  Object(X.jsx)(mt.a, {
                    onChange: function (e) {
                      var n = e.target.value;
                      (Ct.test(n) || '' === n) && i(n);
                    },
                    value: c,
                    autoFocus: !0,
                    color: 'secondary',
                    margin: 'dense',
                    label: 'Room ID',
                    type: 'text',
                    fullWidth: !0,
                  }),
                ],
              }),
              Object(X.jsxs)(yt, {
                children: [
                  Object(X.jsx)(oe.a, {onClick: t, color: 'secondary', children: 'Cancel'}),
                  Object(X.jsx)(oe.a, {
                    onClick: function () {
                      !c.trim() || c.length < 1 || c.length > 30
                        ? De.b.error('Invalid room id format')
                        : (sessionStorage.setItem(H, c), window.location.reload());
                    },
                    color: 'secondary',
                    children: 'Confirm',
                  }),
                ],
              }),
            ],
          });
        },
        kt = k.b.div(
          Be ||
            (Be = Object(l.a)([
              '\n  font-weight: bold;\n  font-size: 12px;\n  text-transform: uppercase;\n  margin-bottom: 1em;\n',
            ])),
        ),
        Rt = function (e) {
          var n = e.open,
            t = e.handleClose;
          return Object(X.jsx)(Ot.a, {
            open: n,
            onClose: t,
            children: Object(X.jsxs)(xt.a, {
              children: [
                Object(X.jsx)(kt, {children: 'About'}),
                Object(X.jsxs)(wt.a, {
                  children: [
                    'This App uses ',
                    Object(X.jsx)('strong', {children: 'WebRTC'}),
                    ' for secure end-to-end peer connection, together with free STUN server from Google, and Firebase for signalling service and peer presence management. Only the following data is used by Firebase for WebRTC signalling:',
                    Object(X.jsxs)('ul', {
                      children: [
                        Object(X.jsx)('li', {children: 'File metadata including file name, size and type'}),
                        Object(X.jsx)('li', {
                          children: 'ICE candidate descriptions, offers and answers that contain SDP information.',
                        }),
                        Object(X.jsx)('li', {
                          children:
                            'Your public IP address is also used and served as the default room ID (in base64 encoded format). ',
                        }),
                      ],
                    }),
                    'You can also join another network room by entering their ID, or create custom ones from your own.',
                  ],
                }),
                Object(X.jsx)(kt, {children: 'Get Started'}),
                Object(X.jsx)(wt.a, {
                  children:
                    'Peers in the same network or room ID should appear in the app with their device and browser info, start transfer file by drag and drop files or click their emoji to select files for transfer.',
                }),
                Object(X.jsx)(wt.a, {
                  children:
                    'You can swipe right or click the drawer menu icon to see the app settings and your current room ID.',
                }),
                Object(X.jsxs)(wt.a, {
                  children: [
                    'Maximum file size is set to ',
                    Object(X.jsx)('strong', {children: bn(Y, 0)}),
                    ', with up to',
                    ' ',
                    Object(X.jsx)('strong', {children: 5}),
                    ' file peer transfer and up to ',
                    Object(X.jsx)('strong', {children: 10}),
                    ' ',
                    'peers each room.',
                  ],
                }),
              ],
            }),
          });
        },
        It = Object(k.b)(An.a)(
          Ne || (Ne = Object(l.a)(['\n  width: ', ';\n  height: ', ';\n  color: ', ' !important;\n'])),
          function (e) {
            return e.theme.drawerMinWidth;
          },
          function (e) {
            return e.theme.drawerMinWidth;
          },
          function (e) {
            return e.theme.primary.contrastText;
          },
        ),
        St = Object(k.b)(Sn.a)(
          Ue ||
            (Ue = Object(l.a)([
              '\n  .MuiDrawer-paper {\n    background-color: ',
              ' !important;\n    color: ',
              ' !important;\n    overflow-x: hidden;\n  }\n',
            ])),
          function (e) {
            return e.theme.primary.light;
          },
          function (e) {
            return e.theme.primary.contrastText;
          },
        ),
        Tt = function (e) {
          var n,
            t,
            r = e.gestureDirection,
            o = e.contextProps,
            c = Nn(),
            l = a.a.useState(!1),
            u = Object(s.a)(l, 2),
            d = u[0],
            p = u[1],
            b = a.a.useState(!1),
            f = Object(s.a)(b, 2),
            h = f[0],
            j = f[1],
            m = a.a.useState(!1),
            O = Object(s.a)(m, 2),
            g = O[0],
            x = O[1];
          a.a.useEffect(
            function () {
              'left' === r && p(!1), 'right' === r && p(!0), r || p(!1);
            },
            [r],
          );
          return Object(X.jsxs)(St, {
            variant: 'permanent',
            className: Object(In.a)(
              c.drawer,
              ((n = {}), Object(Ve.a)(n, c.drawerOpen, d), Object(Ve.a)(n, c.drawerClose, !d), n),
            ),
            classes: {
              paper: Object(In.a)(((t = {}), Object(Ve.a)(t, c.drawerOpen, d), Object(Ve.a)(t, c.drawerClose, !d), t)),
            },
            children: [
              Object(X.jsxs)('div', {
                className: c.titleBar,
                children: [
                  d && Object(X.jsx)('div', {className: c.titleText, children: 'PeerTransfer'}),
                  Object(X.jsx)(Fn.a, {
                    title: d ? 'Close Menu' : 'Open Menu',
                    placement: 'right',
                    children: Object(X.jsx)(It, {
                      disableRipple: !0,
                      onClick: function () {
                        return p(function (e) {
                          return !e;
                        });
                      },
                      children: d ? Object(X.jsx)(En.a, {}) : Object(X.jsx)(zn.a, {}),
                    }),
                  }),
                ],
              }),
              Object(X.jsx)(Tn.a, {}),
              Object(X.jsx)(
                jt,
                Object(i.a)(
                  {
                    drawerOpen: d,
                    handleJoinRoomModalOpen: function () {
                      return j(!0);
                    },
                    handleAboutModalOpen: function () {
                      return x(!0);
                    },
                  },
                  o,
                ),
              ),
              Object(X.jsx)(Dt, {
                open: h,
                handleClose: function () {
                  return j(!1);
                },
              }),
              Object(X.jsx)(Rt, {
                open: g,
                handleClose: function () {
                  return x(!1);
                },
              }),
            ],
          });
        },
        At = function (e) {
          return Object(X.jsx)(cn.Consumer, {
            children: function (n) {
              return Object(X.jsx)(Tt, Object(i.a)(Object(i.a)({}, e), {}, {contextProps: n}));
            },
          });
        },
        Pt = Object(k.b)(A.a)(We || (We = Object(l.a)(['']))),
        Et = k.b.div(
          He ||
            (He = Object(l.a)([
              '\n  position: absolute;\n  bottom: 0;\n  background-image: url(',
              ');\n  background-repeat: no-repeat;\n  background-position: bottom;\n  background-size: cover;\n  width: 100%;\n  height: 100%;\n  max-height: 1600px;\n',
            ])),
          P,
        ),
        Ft = k.b.div(
          $e ||
            ($e = Object(l.a)([
              '\n  position: relative;\n  background-color: ',
              ';\n  height: 100%;\n  min-height: 100%;\n  max-width: 100vw;\n  overflow-x: hidden;\n  overflow-y: hidden;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n',
            ])),
          function (e) {
            return e.theme.primary.main;
          },
        ),
        Mt = Object(k.b)(Ft)(
          Je ||
            (Je = Object(l.a)([
              '\n  margin-left: ',
              ';\n  z-index: 10;\n  p,\n  button,\n  label {\n    z-index: 1;\n  }\n',
            ])),
          function (e) {
            return e.theme.drawerMinWidth;
          },
        ),
        zt = function (e) {
          var n = e.publicID,
            t = e.localID,
            a = Object(r.useState)(),
            o = Object(s.a)(a, 2),
            c = o[0],
            l = o[1],
            u = Object(r.useState)(),
            d = Object(s.a)(u, 2),
            p = d[0],
            b = d[1];
          Object(r.useEffect)(
            function () {
              !(function () {
                var e = D.database(),
                  r = Object(i.a)({id: t, emoji: ''.concat(I())}, T()),
                  a = e.ref(''.concat(n, '/').concat(t));
                a.set(r), a.onDisconnect().remove(), l(r);
              })();
            },
            [t, n],
          ),
            Object(r.useLayoutEffect)(function () {
              sessionStorage.getItem(U) &&
                (De.b.warn('Failed to create a stable data channel, please try again', {autoClose: !1}),
                sessionStorage.removeItem(U));
            }, []);
          var f = Object(E.a)({
            onDragEnd: function (e) {
              var n = Math.sign(e.movement[0]),
                t = Math.sign(e.movement[1]);
              Math.abs(e.movement[0]) > 6 && (-1 === n && b('left'), 1 === n && b('right')),
                0 === n && 0 === t && b(void 0);
            },
          });
          return Object(X.jsxs)(
            Mt,
            Object(i.a)(
              Object(i.a)({}, f()),
              {},
              {
                children: [
                  Object(X.jsx)(At, {gestureDirection: p}),
                  Object(X.jsx)(Rn, {selfIdentity: c, publicID: n, localID: t}),
                  Object(X.jsx)(Et, {}),
                ],
              },
            ),
          );
        },
        Lt = function () {
          return Object(X.jsx)(q.Consumer, {
            children: function (e) {
              var n = e.localID,
                t = e.publicID;
              return n && t
                ? Object(X.jsx)(zt, {localID: n, publicID: t})
                : Object(X.jsx)(Ft, {children: Object(X.jsx)(Pt, {color: 'secondary'})});
            },
          });
        },
        _t = t(115),
        Bt = ['className'],
        Nt = Object(k.b)(function (e) {
          var n = e.className,
            t = Object(_t.a)(e, Bt);
          return Object(X.jsx)('div', {className: n, children: Object(X.jsx)(De.a, Object(i.a)({}, t))});
        }).attrs({})(
          Ge ||
            (Ge = Object(l.a)([
              "\n  .Toastify__toast-container {\n    width: max-content;\n    max-width: 80vw;\n  }\n  .Toastify__toast-body {\n    font-family: 'Roboto', sans-serif;\n    white-space: pre-line;\n    min-width: 200px;\n  }\n",
            ])),
        ),
        Ut = t(210),
        Wt = t(112),
        Ht =
          (t(147),
          t(148),
          function (e) {
            var n = e.appTheme,
              t = Object(Wt.a)({
                palette: {
                  primary: {main: _n[n].primary.main, dark: _n[n].primary.dark},
                  secondary: {main: _n[n].secondary.main},
                },
              });
            return Object(X.jsx)(k.a, {
              theme: Object(i.a)(Object(i.a)({}, Bn), _n[n]),
              children: Object(X.jsxs)(Ut.a, {
                theme: t,
                children: [
                  Object(X.jsx)(Lt, {}),
                  Object(X.jsx)(Nt, {
                    position: 'top-right',
                    autoClose: 5e3,
                    pauseOnFocusLoss: !1,
                    newestOnTop: !1,
                    closeOnClick: !0,
                    hideProgressBar: !0,
                    rtl: !1,
                    draggable: !0,
                  }),
                ],
              }),
            });
          }),
        $t = function () {
          return Object(X.jsx)(K, {
            children: Object(X.jsx)(sn, {
              children: Object(X.jsx)(cn.Consumer, {
                children: function (e) {
                  var n = e.appTheme;
                  return Object(X.jsx)(Ht, {appTheme: n});
                },
              }),
            }),
          });
        };
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
      );
      var Jt = function (e) {
        e &&
          e instanceof Function &&
          t
            .e(3)
            .then(t.bind(null, 216))
            .then(function (n) {
              var t = n.getCLS,
                r = n.getFID,
                a = n.getFCP,
                o = n.getLCP,
                c = n.getTTFB;
              t(e), r(e), a(e), o(e), c(e);
            });
      };
      c.a.render(Object(X.jsx)(a.a.StrictMode, {children: Object(X.jsx)($t, {})}), document.getElementById('root')),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            }),
        Jt();
    },
  },
  [[149, 1, 2]],
]);
//# sourceMappingURL=main.f3700c76.chunk.js.map
