(this['webpackJsonppeer-transfer'] = this['webpackJsonppeer-transfer'] || []).push([
  [0],
  {
    135: function (e, n, t) {},
    149: function (e, n, t) {},
    151: function (e, n, t) {
      'use strict';
      t.r(n);
      var r = t(0),
        a = t.n(r),
        o = t(18),
        c = t.n(o),
        i = (t(135), t(9)),
        s = t(17),
        l = t(12),
        u = t(76);
      t(153), t(136), t(139);
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
        k = t(11),
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
        A = t(211),
        P = t.p + 'static/media/backgroundRipple.48d86bdf.svg',
        E = t(111),
        F = t(19),
        M = t(214),
        z = {
          iceServers: [{urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']}],
          iceCandidatePoolSize: 10,
        },
        L = 'transferRooms',
        _ = 'connections',
        B = 'calleeCandidates',
        N = 'callerCandidates',
        U = 'fileMetas',
        W = 'dataChannelTimeout',
        H = 'waitRemoteDesc',
        $ = 'publicID',
        J = 'appTheme',
        G = 'appAutoAccept',
        Y = 'appAutoDownload',
        X = 16777216,
        q = t(4),
        K = a.a.createContext({localID: '', publicID: '', setPublicID: function () {}}),
        Q = function (e) {
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
                t = new RTCPeerConnection(z);
              (n = t.createDataChannel('')),
                t.createOffer().then(function (e) {
                  var n;
                  return null === (n = t) || void 0 === n ? void 0 : n.setLocalDescription(e);
                });
              var r = sessionStorage.getItem($);
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
                D.auth()
                  .signInAnonymously()
                  .then(function () {
                    return i(Object(M.a)());
                  })
                  .catch(function () {
                    return F.b.error(
                      'Failed to connect to firebase, please check your internet connection and try again',
                    );
                  });
            }, []),
            Object(q.jsx)(K.Provider, {value: {localID: c, publicID: d, setPublicID: p}, children: n})
          );
        },
        V = t(15),
        Z = t.n(V),
        ee = t(21),
        ne = '768px',
        te = '1200px',
        re = {xs: 'max-width: '.concat('320px'), sm: 'max-width: '.concat(ne), lg: 'max-width: '.concat(te)},
        ae = k.b.div(
          d ||
            (d = Object(l.a)([
              '\n  .peerHolder {\n    border-radius: 50%;\n    width: 64px;\n    height: 64px;\n    position: absolute;\n    z-index: 1;\n    @media only screen and (',
              ') {\n      position: relative;\n      bottom: unset !important;\n      left: unset !important;\n      right: unset !important;\n      transform: unset !important;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 3em;\n    }\n  }\n  & .peerHolder:nth-child(1) {\n    bottom: 33%;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n  & .peerHolder:nth-child(2) {\n    bottom: 20%;\n    left: 30%;\n  }\n  & .peerHolder:nth-child(3) {\n    bottom: 20%;\n    right: 30%;\n  }\n  & .peerHolder:nth-child(4) {\n    bottom: 58%;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n  & .peerHolder:nth-child(5) {\n    bottom: 30%;\n    left: 20%;\n  }\n  & .peerHolder:nth-child(6) {\n    bottom: 30%;\n    right: 20%;\n  }\n  & .peerHolder:nth-child(7) {\n    bottom: 10%;\n    left: 15%;\n  }\n  & .peerHolder:nth-child(8) {\n    bottom: 10%;\n    right: 15%;\n  }\n  & .peerHolder:nth-child(9) {\n    bottom: 44%;\n    left: 35%;\n  }\n  & .peerHolder:nth-child(10) {\n    bottom: 44%;\n    right: 35%;\n  }\n',
            ])),
          re.sm,
        ),
        oe = t(155),
        ce = t(195),
        ie = k.b.div(
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
        se = k.b.div(b || (b = Object(l.a)(['\n  font-size: calc(8px + 1vmin);\n  min-width: max-content;\n']))),
        le = k.b.div(
          f ||
            (f = Object(l.a)([
              '\n  font-size: calc(10px + 0.6vmin) !important;\n  line-height: 1.5em;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n',
            ])),
        ),
        ue = k.b.div(
          h ||
            (h = Object(l.a)([
              '\n  margin-top: 16px;\n  margin-bottom: 16px;\n  max-height: 320px;\n  min-height: 60px;\n  overflow-y: auto;\n  overflow-x: hidden;\n',
            ])),
        ),
        de = k.b.div(j || (j = Object(l.a)(['\n  display: flex;\n  flex-direction: row-reverse;\n']))),
        pe = Object(k.b)(ce.a)(m || (m = Object(l.a)(['\n  margin-left: 8px !important;\n']))),
        be = k.b.div(O || (O = Object(l.a)(['']))),
        fe = k.b.a(
          g ||
            (g = Object(l.a)([
              '\n  min-width: max-content;\n  line-height: 1.5em;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  color: ',
              ';\n',
            ])),
          function (e) {
            return e.theme.secondary.light;
          },
        ),
        he = t(198),
        je = Object(he.a)(function (e) {
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
        me = function (e) {
          var n = e.enterType,
            t = e.anchorElement,
            r = e.isSelf,
            o = a.a.useState(null),
            c = Object(s.a)(o, 2),
            i = c[0],
            l = c[1],
            u = je();
          return Object(q.jsxs)(oe.a, {
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
              Object(q.jsx)('div', {className: u.arrow, ref: l}),
              Object(q.jsx)(ie, {
                children: Object(q.jsxs)(se, {
                  children: [
                    'drag' === n && 'Drop here to send files',
                    'mouse' === n && 'Click here to '.concat(r ? 'send to all' : 'send files'),
                  ],
                }),
              }),
            ],
          });
        },
        Oe = t(113),
        ge = Object(Oe.a)('#468266', 0.3),
        xe = Object(k.c)(
          x ||
            (x = Object(l.a)([
              '\n  0% {\n    box-shadow: \n      0 0 0 0 ',
              ', \n      0 0 0 0.5em ',
              ';\n  }\n  100% {\n    box-shadow:\n      0 0 0 0.5em ',
              ', \n      0 0 0 1.5em transparent;\n  }\n',
            ])),
          ge,
          ge,
          ge,
        ),
        we = Object(k.c)(
          w ||
            (w = Object(l.a)([
              '\n  0% {\n    box-shadow: \n      0 0 0 0 ',
              ', \n      0 0 0 1em ',
              ', \n      0 0 0 2em ',
              ';\n  }\n  100% {\n    box-shadow:\n      0 0 0 1em ',
              ', \n      0 0 0 2em ',
              ',\n      0 0 0 3.5em transparent;\n  }\n',
            ])),
          ge,
          ge,
          ge,
          ge,
          ge,
        ),
        ve = Object(k.b)(ce.a)(
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
        ye = Object(k.b)(ve)(y || (y = Object(l.a)(['\n  animation: ', ' 1s linear infinite;\n'])), xe),
        Ce = Object(k.b)(ve)(C || (C = Object(l.a)(['\n  animation: ', ' 0.7s linear infinite;\n'])), we),
        De = t(114),
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
            ? F.b.error('The maximum number of transfer files is set up to '.concat(5))
            : e.forEach(function (e) {
                var n = e.file,
                  t = e.errors;
                F.b.error(
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
            l = Object(De.a)({
              maxFiles: 5,
              maxSize: X,
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
          return Object(q.jsxs)(qe, {
            children: [
              Object(q.jsxs)(
                'div',
                Object(i.a)(
                  Object(i.a)({}, s()),
                  {},
                  {
                    children: [
                      Object(q.jsxs)(Ce, {
                        className: 'peerBtn',
                        ref: o,
                        onMouseEnter: u,
                        onMouseLeave: d,
                        onClick: function () {
                          return (document.getElementById('fileInput-self').value = '');
                        },
                        variant: 'contained',
                        children: [
                          Object(q.jsx)('span', {children: n.emoji}),
                          Object(q.jsx)('input', Object(i.a)({id: 'fileInput-self'}, l())),
                        ],
                      }),
                      Object(q.jsxs)(Ke, {children: ['You: ', n.platform, '-', n.browser]}),
                    ],
                  },
                ),
              ),
              Object(q.jsx)(me, {isSelf: !0, enterType: p, anchorElement: o.current}),
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
          return Object(q.jsxs)(q.Fragment, {
            children: [
              Object(q.jsx)(
                'div',
                Object(i.a)(
                  Object(i.a)({}, l()),
                  {},
                  {
                    children: Object(q.jsxs)(ye, {
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
                        Object(q.jsx)('input', Object(i.a)({id: 'fileInput-'.concat(r.id)}, u())),
                        Object(q.jsx)('span', {children: r.emoji}),
                      ],
                    }),
                  },
                ),
              ),
              Object(q.jsxs)(en, {children: [r.platform, '-', r.browser]}),
              b && Object(q.jsx)(me, {isSelf: !1, enterType: b, anchorElement: c.current}),
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
          return Object(q.jsxs)(tn, {
            children: [
              Object(q.jsx)(rn, {children: Object(q.jsx)('progress', {max: '100', value: e.progress})}),
              Object(q.jsx)(an, {children: ''.concat(e.progress, '%')}),
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
                  var e = window.localStorage.getItem(G),
                    n = window.localStorage.getItem(Y),
                    t = !('false' === n || !n);
                  a(!('false' === e || !e)), l(t);
                }, []),
                {
                  shouldAutoAccept: t,
                  shouldAutoDownload: i,
                  toggleAutoAccept: function () {
                    window.localStorage.setItem(G, (!t).toString()), a(!t);
                  },
                  toggleAutoDownload: function () {
                    window.localStorage.setItem(Y, (!i).toString()), l(!i);
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
                  var e = window.localStorage.getItem(J);
                  e ? a(e) : window.localStorage.setItem(J, 'dark');
                }, []),
                {
                  appTheme: t,
                  toggleLightDarkTheme: function () {
                    var e = 'dark' === t ? 'light' : 'dark';
                    window.localStorage.setItem(J, e), a(e);
                  },
                }
              );
            })(),
            u = l.appTheme,
            d = l.toggleLightDarkTheme;
          return Object(q.jsx)(cn.Provider, {
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
            g = je();
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
          return Object(q.jsxs)(oe.a, {
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
              Object(q.jsx)('div', {className: g.arrow, ref: f}),
              Object(q.jsx)(ie, {
                children:
                  'receive' === c
                    ? Object(q.jsxs)(q.Fragment, {
                        children: [
                          Object(q.jsx)(se, {
                            children: u ? 'Download Progress: ' : 'Downloadable file will show below',
                          }),
                          Object(q.jsxs)(ue, {
                            children: [
                              m &&
                                m.map(function (e, r) {
                                  return Object(q.jsx)(
                                    be,
                                    {
                                      children: Object(q.jsxs)(fe, {
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
                              0 !== r && Object(q.jsx)(on, {progress: r}),
                            ],
                          }),
                          Object(q.jsx)(de, {
                            children:
                              100 === r
                                ? Object(q.jsx)(pe, {
                                    variant: 'outlined',
                                    size: 'small',
                                    onClick: w,
                                    color: 'secondary',
                                    children: 'close',
                                  })
                                : Object(q.jsx)(pe, {
                                    variant: 'outlined',
                                    size: 'small',
                                    onClick: x,
                                    color: 'secondary',
                                    children: 'cancel',
                                  }),
                          }),
                        ],
                      })
                    : Object(q.jsxs)(q.Fragment, {
                        children: [
                          Object(q.jsx)(se, {children: 'Sending...'}),
                          Object(q.jsxs)(ue, {
                            children: [
                              Object(q.jsx)('div', {children: 'Waiting for file transfer to complete...'}),
                              Object(q.jsx)(on, {progress: r}),
                            ],
                          }),
                          Object(q.jsx)(de, {
                            children: Object(q.jsx)(pe, {
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
          return Object(q.jsx)(cn.Consumer, {
            children: function (n) {
              var t = n.shouldAutoDownload;
              return Object(q.jsx)(dn, Object(i.a)(Object(i.a)({}, e), {}, {shouldAutoDownload: t}));
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
            b = je();
          return Object(q.jsxs)(oe.a, {
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
              Object(q.jsx)('div', {className: b.arrow, ref: p}),
              Object(q.jsxs)(ie, {
                children: [
                  Object(q.jsxs)(se, {children: [o.emoji, ' from ', o.platform, ' ', o.browser, ' wants to send:']}),
                  Object(q.jsx)(ue, {
                    children:
                      null === r || void 0 === r
                        ? void 0
                        : r.map(function (e, n) {
                            return Object(q.jsxs)(
                              le,
                              {children: [e.name, ' (', bn(e.size), ')']},
                              ''.concat(o.id, '-meta-').concat(n),
                            );
                          }),
                  }),
                  Object(q.jsxs)(de, {
                    children: [
                      Object(q.jsx)(pe, {
                        variant: 'contained',
                        size: 'small',
                        onClick: function () {
                          i(), n();
                        },
                        color: 'secondary',
                        children: 'Accept',
                      }),
                      Object(q.jsx)(pe, {
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
            u = je();
          return (
            a.a.useEffect(
              function () {
                var e;
                return (
                  sessionStorage.setItem(H, '1'),
                  t &&
                    (e = setTimeout(function () {
                      sessionStorage.setItem(W, '1'), window.location.reload();
                    }, 3e3)),
                  function () {
                    clearTimeout(e), sessionStorage.removeItem(H);
                  }
                );
              },
              [t],
            ),
            Object(q.jsxs)(oe.a, {
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
                Object(q.jsx)('div', {className: u.arrow, ref: l}),
                Object(q.jsx)(ie, {
                  children: Object(q.jsx)(se, {
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
                var e = t.collection(L).doc(n).collection(_).doc(a.current),
                  r = 0,
                  c = 0,
                  u = 0,
                  b = 0,
                  f = [];
                function h(e) {
                  return j.apply(this, arguments);
                }
                function j() {
                  return (j = Object(ee.a)(
                    Z.a.mark(function n(t) {
                      var a, o, s, d, h, j, m, O;
                      return Z.a.wrap(function (n) {
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
                  return (O = Object(ee.a)(
                    Z.a.mark(function e() {
                      var n;
                      return Z.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              d.current &&
                                ((n = d.current.readyState),
                                console.log('Receive channel state is: '.concat(n)),
                                'open' === n && s({type: 'clear'}),
                                'closed' === n &&
                                  (r || F.b.warn('File transfer is cancelled'), (r = 0), (d.current = null)));
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
              var e = Object(ee.a)(
                Z.a.mark(function e(r) {
                  var i, s, l, u, d, p, f, h;
                  return Z.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (i = t.collection(L).doc(n)), (s = i.collection(_).doc(r)), (e.next = 4), s.get();
                        case 4:
                          if (!(l = e.sent).exists) {
                            e.next = 26;
                            break;
                          }
                          return (
                            (a.current = r),
                            (o.current = new RTCPeerConnection(z)),
                            b(),
                            (u = s.collection(B)),
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
                          (h = s.collection(N).onSnapshot(function (e) {
                            e.docChanges().forEach(
                              (function () {
                                var e = Object(ee.a)(
                                  Z.a.mark(function e(n) {
                                    var t;
                                    return Z.a.wrap(function (e) {
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
              Object(ee.a)(
                Z.a.mark(function e() {
                  var n, t, r, a, o, i, s, l, b, j;
                  return Z.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((b = function () {
                              F.b.success('File has been transferred'),
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
                                F.b.error('Failed to read file: '.concat(r[s].name));
                            }),
                            d.current.addEventListener('abort', function (e) {
                              console.log('File reading aborted:', e), F.b.warn('Abort file read: '.concat(r[s].name));
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
              var e = Object(ee.a)(
                Z.a.mark(function e(r) {
                  var u, d, p, f, h, j, O, g, x;
                  return Z.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (u = a.collection(L).doc(t)),
                            (d = u.collection(_)),
                            (p = d.doc()),
                            (f = {p2p: {offer: n, answer: r.id}}),
                            (h = p.collection(N)),
                            (c.current = new RTCPeerConnection(z)),
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
                              var e = Object(ee.a)(
                                Z.a.mark(function e(n) {
                                  var t, r;
                                  return Z.a.wrap(function (e) {
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
                            (x = p.collection(B).onSnapshot(function (e) {
                              e.docChanges().forEach(
                                (function () {
                                  var e = Object(ee.a)(
                                    Z.a.mark(function e(n) {
                                      var t;
                                      return Z.a.wrap(function (e) {
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
            M = P[1],
            z = Object(r.useMemo)(
              function () {
                return D.isOpen || S.isOpen || E.isOpen;
              },
              [D.isOpen, S.isOpen, E.isOpen],
            );
          Object(r.useEffect)(function () {
            var e = o
              .collection(L)
              .doc(a)
              .collection(_)
              .onSnapshot(
                (function () {
                  var e = Object(ee.a)(
                    Z.a.mark(function e(r) {
                      return Z.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              r.docChanges().forEach(
                                (function () {
                                  var e = Object(ee.a)(
                                    Z.a.mark(function e(r) {
                                      var a, o, c;
                                      return Z.a.wrap(function (e) {
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
                                                    (o || ie(a.fileMetas, r.doc.id))),
                                                'removed' === r.type &&
                                                  ((c = r.doc.id),
                                                  console.log('remove connection: '),
                                                  console.log(c, p.current),
                                                  c !== p.current ||
                                                    !a.p2p ||
                                                    (a.p2p.answer !== t && a.p2p.offer !== t) ||
                                                    ne(!0));
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
                ne(!1),
                te(),
                sessionStorage.getItem(H) && (F.b.warn('Peer connection dropped'), sessionStorage.removeItem(H));
            };
          }, []),
            Object(r.useEffect)(
              function () {
                u.current ? (u.current = !1) : (re(Object(Ze.a)(c)), l());
              },
              [u, c],
            );
          var W = Object(r.useCallback)(
              Object(ee.a)(
                Z.a.mark(function e() {
                  var n, t, r;
                  return Z.a.wrap(function (e) {
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
                            (t = o.collection(L).doc(a)),
                            (r = t.collection(_).doc(n)),
                            (e.next = 9),
                            r.collection(B).get()
                          );
                        case 9:
                          return (
                            e.sent.forEach(
                              (function () {
                                var e = Object(ee.a)(
                                  Z.a.mark(function e(n) {
                                    return Z.a.wrap(function (e) {
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
                            r.collection(N).get()
                          );
                        case 13:
                          return (
                            e.sent.forEach(
                              (function () {
                                var e = Object(ee.a)(
                                  Z.a.mark(function e(n) {
                                    return Z.a.wrap(function (e) {
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
            $ = xn({
              publicID: a,
              firestoreDbRef: o,
              connectionIdRef: p,
              peerConnectionRef: d,
              callerUnsubscriberRef: j,
              dispatchProgressPopperData: M,
              dispatchWaitResponsePopperData: k,
              handleDownloadFile: function (e, n) {
                if ('true' === window.localStorage.getItem(Y)) {
                  var t = document.createElement('a');
                  (t.href = URL.createObjectURL(e)),
                    (t.download = n),
                    document.body.appendChild(t),
                    t.click(),
                    window.URL.revokeObjectURL(t.href),
                    document.body.removeChild(t);
                } else
                  M({
                    type: 'set_downloadableFiles',
                    payload: {downloadableFile: {fileName: n, fileBlobUrl: URL.createObjectURL(e)}},
                  });
              },
              clearSignalService: W,
            }),
            J = $.receiveChannelRef,
            X = $.joinTransferChannel,
            K = wn({
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
              dispatchProgressPopperData: M,
              dispatchWaitResponsePopperData: k,
            }),
            Q = K.sendChannelRef,
            V = K.tryCreatePeerConnection,
            ne = Object(r.useCallback)(
              function (e) {
                k({type: 'clear'}),
                  Q.current &&
                    (Q.current.close(),
                    e && F.b.warn('File transfer is closed'),
                    console.log('Closed send data channel with label: '.concat(Q.current.label))),
                  J.current &&
                    (J.current.close(),
                    console.log('Closed receive data channel with label: '.concat(J.current.label))),
                  W();
              },
              [Q, J, W],
            ),
            te = Object(r.useCallback)(
              function () {
                d.current && (console.log('closing peers connection'), d.current.close(), (d.current = null));
              },
              [d],
            );
          function re(e) {
            return ae.apply(this, arguments);
          }
          function ae() {
            return (ae = Object(ee.a)(
              Z.a.mark(function e(t) {
                var r, c, i, s, l, u;
                return Z.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!(t.length > 0)) {
                          e.next = 13;
                          break;
                        }
                        return (h.current = t), (e.next = 4), V(n);
                      case 4:
                        return (
                          (r = p.current),
                          (c = o.collection(L).doc(a)),
                          (i = c.collection(_)),
                          (s = i.doc(r)),
                          (l = []),
                          t.forEach(function (e) {
                            l.push({name: e.name, size: e.size, type: e.type}), (f.current += e.size);
                          }),
                          (u = Object(Ve.a)({}, U, l)),
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
          var oe = function () {
              X(p.current), D.isOpen || k({type: 'set_open_with_desc'});
            },
            ce = function () {
              b.current && 1 === b.current.readyState && (console.log('Abort file read...'), b.current.abort()),
                S.isOpen && T({type: 'clear'}),
                ne(!1);
            },
            ie = (function () {
              var e = Object(ee.a)(
                Z.a.mark(function e(t, r) {
                  var a;
                  return Z.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          console.log('incoming file metas:', t),
                            console.log('got from:', n),
                            (p.current = r),
                            (a = window.localStorage.getItem(G)),
                            'true' === a ? oe() : T({type: 'set_file_metas', payload: {fileMetas: t}});
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
          return Object(q.jsxs)('div', {
            className: 'peerHolder',
            children: [
              Object(q.jsx)(nn, {
                shouldDisableActionBtn: z,
                handleFileInputChange: re,
                targetPeer: n,
                setAnchorElement: v,
              }),
              D.isOpen && Object(q.jsx)(gn, Object(i.a)(Object(i.a)({}, D), {}, {targetPeer: n, anchorElement: w})),
              E.isOpen &&
                Object(q.jsx)(
                  pn,
                  Object(i.a)(
                    Object(i.a)({}, E),
                    {},
                    {
                      onCancelFileTransfer: ce,
                      targetPeer: n,
                      setClose: function () {
                        return M({type: 'clear'});
                      },
                      anchorElement: w,
                    },
                  ),
                ),
              S.isOpen &&
                Object(q.jsx)(
                  jn,
                  Object(i.a)(
                    Object(i.a)({}, S),
                    {},
                    {
                      onAcceptFileTransfer: oe,
                      onCancelFileTransfer: ce,
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
        yn = t(157),
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
            return e.$shouldHide ? '0px' : '25%';
          },
          function (e) {
            return e.$shouldHide ? '0px' : 'auto';
          },
        ),
        Dn = Object(k.b)(ae)(
          Fe ||
            (Fe = Object(l.a)([
              '\n  position: relative;\n  height: 100%;\n  width: 100%;\n  z-index: 1;\n  overflow-y: auto;\n  padding-top: 1em;\n  padding-bottom: 100px;\n  @media only screen and (',
              ') {\n    padding-bottom: 0;\n    margin-bottom: 120px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n  }\n',
            ])),
          re.sm,
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
                    var e = Object(ee.a)(
                      Z.a.mark(function e(n) {
                        var t, r, a;
                        return Z.a.wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                for (a in ((t = n.val()), (r = []), t)) a !== o && r.push(t[a]);
                                r.length > 10
                                  ? (F.b.dismiss(), F.b.warn('The maximum concurrent peers is set to '.concat(10)))
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
          return Object(q.jsxs)(q.Fragment, {
            children: [
              Object(q.jsx)(yn.a, {
                in: m,
                children: Object(q.jsxs)(Cn, {
                  $shouldHide: !m,
                  children: [
                    'Open the same link to start transfer files',
                    Object(q.jsx)('br', {}),
                    Object(q.jsx)('span', {
                      children: 'swipe right or click drawer icons to see or toggle app settings',
                    }),
                  ],
                }),
              }),
              Object(q.jsx)(yn.a, {
                in: !m,
                children: Object(q.jsx)(Dn, {
                  children: l.map(function (e) {
                    return Object(q.jsx)(
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
                Object(q.jsx)(Qe, {
                  shouldDisableActionBtn: b.length > 0,
                  handleFileInputChange: function (e) {
                    0 === l.length ? (F.b.warn('There is no other peers in this room'), j()) : f(e);
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
        Sn = t(217),
        Tn = t(205),
        An = t(204),
        Pn = t(109),
        En = t.n(Pn),
        Fn = t(202),
        Mn = t(110),
        zn = t.n(Mn),
        Ln = t(215),
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
        Nn = Object(he.a)(function (e) {
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
        Un = t(201),
        Wn = t(200),
        Hn = t(199),
        $n = t(203),
        Jn = t(216),
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
              var e = Object(ee.a)(
                Z.a.mark(function e() {
                  return Z.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), navigator.clipboard.writeText(n);
                        case 2:
                          F.b.info('Room Id copied', {autoClose: 3e3});
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
          return Object(q.jsxs)(q.Fragment, {
            children: [
              Object(q.jsxs)(Un.a, {
                children: [
                  Object(q.jsx)(Fn.a, {
                    title: 'Auto Accept',
                    placement: 'right',
                    children: Object(q.jsxs)(Wn.a, {
                      button: !0,
                      onClick: c,
                      children: [
                        Object(q.jsx)(pt, {children: r ? Object(q.jsx)(rt.a, {}) : Object(q.jsx)(ot.a, {})}),
                        Object(q.jsx)($n.a, {primary: 'Auto Accept Request'}),
                        Object(q.jsx)(Jn.a, {checked: r, inputProps: {'aria-label': 'secondary checkbox'}}),
                      ],
                    }),
                  }),
                  Object(q.jsx)(Fn.a, {
                    title: 'Auto Download',
                    placement: 'right',
                    children: Object(q.jsxs)(Wn.a, {
                      button: !0,
                      onClick: i,
                      children: [
                        Object(q.jsx)(pt, {children: a ? Object(q.jsx)(Zn.a, {}) : Object(q.jsx)(nt.a, {})}),
                        Object(q.jsx)($n.a, {primary: 'Auto Download File'}),
                        Object(q.jsx)(Jn.a, {checked: a, inputProps: {'aria-label': 'secondary checkbox'}}),
                      ],
                    }),
                  }),
                ],
              }),
              Object(q.jsx)(Tn.a, {}),
              Object(q.jsxs)(Un.a, {
                children: [
                  Object(q.jsx)(Fn.a, {
                    title: 'Brightness Theme',
                    placement: 'right',
                    children: Object(q.jsxs)(Wn.a, {
                      button: !0,
                      onClick: s,
                      children: [
                        Object(q.jsx)(pt, {
                          children: 'light' === o ? Object(q.jsx)(it.a, {}) : Object(q.jsx)(lt.a, {}),
                        }),
                        Object(q.jsx)($n.a, {primary: 'Light / Dark Theme'}),
                      ],
                    }),
                  }),
                  Object(q.jsx)(Fn.a, {
                    title: 'Join Another Room',
                    placement: 'right',
                    children: Object(q.jsxs)(Wn.a, {
                      button: !0,
                      onClick: l,
                      children: [
                        Object(q.jsx)(pt, {children: Object(q.jsx)(Yn.a, {})}),
                        Object(q.jsx)($n.a, {primary: 'Join a room'}),
                      ],
                    }),
                  }),
                ],
              }),
              Object(q.jsx)(Tn.a, {}),
              Object(q.jsx)(Un.a, {
                children: Object(q.jsx)(Fn.a, {
                  title: 'Copy Room ID',
                  placement: 'right',
                  children: Object(q.jsxs)(bt, {
                    button: !0,
                    $isOpen: t,
                    onClick: d,
                    children: [
                      Object(q.jsxs)('div', {
                        children: [Object(q.jsx)('span', {children: 'Room ID:'}), Object(q.jsx)('div', {children: n})],
                      }),
                      Object(q.jsx)(pt, {children: Object(q.jsx)(dt.a, {})}),
                    ],
                  }),
                }),
              }),
              Object(q.jsxs)(ft, {
                children: [
                  Object(q.jsx)(Fn.a, {
                    title: 'About',
                    placement: 'right',
                    children: Object(q.jsxs)(Wn.a, {
                      button: !0,
                      onClick: u,
                      children: [
                        Object(q.jsx)(pt, {children: Object(q.jsx)(Qn.a, {})}),
                        Object(q.jsx)($n.a, {primary: 'About'}),
                      ],
                    }),
                  }),
                  Object(q.jsx)(Fn.a, {
                    title: 'Source Code',
                    placement: 'right',
                    children: Object(q.jsxs)(Wn.a, {
                      button: !0,
                      onClick: function () {
                        return window.open('https://github.com/haooowu/PeerTransfer');
                      },
                      children: [
                        Object(q.jsx)(pt, {children: Object(q.jsx)(qn.a, {})}),
                        Object(q.jsx)($n.a, {primary: 'Source'}),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          });
        },
        jt = function (e) {
          return Object(q.jsx)(K.Consumer, {
            children: function (n) {
              var t = n.publicID;
              return Object(q.jsx)(ht, Object(i.a)({publicID: t}, e));
            },
          });
        },
        mt = t(213),
        Ot = t(207),
        gt = t(206),
        xt = t(209),
        wt = t(210),
        vt = t(208),
        yt = Object(k.b)(gt.a)(_e || (_e = Object(l.a)(['\n  padding: 8px 16px !important;\n']))),
        Ct = new RegExp(/^[a-zA-Z0-9+/=]+$/),
        Dt = function (e) {
          var n = e.open,
            t = e.handleClose,
            r = a.a.useState(''),
            o = Object(s.a)(r, 2),
            c = o[0],
            i = o[1];
          return Object(q.jsxs)(Ot.a, {
            open: n,
            onClose: t,
            children: [
              Object(q.jsx)(vt.a, {children: 'Join or Create Room'}),
              Object(q.jsxs)(xt.a, {
                children: [
                  Object(q.jsx)(wt.a, {children: 'You can find current room ID by expand the side drawer'}),
                  Object(q.jsx)(mt.a, {
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
              Object(q.jsxs)(yt, {
                children: [
                  Object(q.jsx)(ce.a, {onClick: t, color: 'secondary', children: 'Cancel'}),
                  Object(q.jsx)(ce.a, {
                    onClick: function () {
                      !c.trim() || c.length < 1 || c.length > 30
                        ? F.b.error('Invalid room id format')
                        : (sessionStorage.setItem($, c), window.location.reload());
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
          return Object(q.jsx)(Ot.a, {
            open: n,
            onClose: t,
            children: Object(q.jsxs)(xt.a, {
              children: [
                Object(q.jsx)(kt, {children: 'About'}),
                Object(q.jsxs)(wt.a, {
                  children: [
                    'This App uses ',
                    Object(q.jsx)('strong', {children: 'WebRTC'}),
                    ' for secure end-to-end peer connection, together with free STUN server from Google, and Firebase for signalling service and peer presence management. Only the following data is used by Firebase for WebRTC signalling:',
                    Object(q.jsxs)('ul', {
                      children: [
                        Object(q.jsx)('li', {children: 'File metadata including file name, size and type'}),
                        Object(q.jsx)('li', {
                          children: 'ICE candidate descriptions, offers and answers that contain SDP information.',
                        }),
                        Object(q.jsx)('li', {
                          children:
                            'Your public IP address is also used and served as the default room ID (in base64 encoded format). ',
                        }),
                      ],
                    }),
                    'You can also join another network room by entering their ID, or create custom ones from your own.',
                  ],
                }),
                Object(q.jsx)(kt, {children: 'Get Started'}),
                Object(q.jsx)(wt.a, {
                  children:
                    'Peers in the same network or room ID should appear in the app with their device and browser info, start transfer file by drag and drop files or click their emoji to select files for transfer.',
                }),
                Object(q.jsx)(wt.a, {
                  children:
                    'You can swipe right or click the drawer menu icon to see the app settings and your current room ID.',
                }),
                Object(q.jsxs)(wt.a, {
                  children: [
                    'Maximum file size is set to ',
                    Object(q.jsx)('strong', {children: bn(X, 0)}),
                    ', with up to',
                    ' ',
                    Object(q.jsx)('strong', {children: 5}),
                    ' file peer transfer and up to ',
                    Object(q.jsx)('strong', {children: 10}),
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
          return Object(q.jsxs)(St, {
            variant: 'permanent',
            className: Object(In.a)(
              c.drawer,
              ((n = {}), Object(Ve.a)(n, c.drawerOpen, d), Object(Ve.a)(n, c.drawerClose, !d), n),
            ),
            classes: {
              paper: Object(In.a)(((t = {}), Object(Ve.a)(t, c.drawerOpen, d), Object(Ve.a)(t, c.drawerClose, !d), t)),
            },
            children: [
              Object(q.jsxs)('div', {
                className: c.titleBar,
                children: [
                  d && Object(q.jsx)('div', {className: c.titleText, children: 'PeerTransfer'}),
                  Object(q.jsx)(Fn.a, {
                    title: d ? 'Close Menu' : 'Open Menu',
                    placement: 'right',
                    children: Object(q.jsx)(It, {
                      disableRipple: !0,
                      onClick: function () {
                        return p(function (e) {
                          return !e;
                        });
                      },
                      children: d ? Object(q.jsx)(En.a, {}) : Object(q.jsx)(zn.a, {}),
                    }),
                  }),
                ],
              }),
              Object(q.jsx)(Tn.a, {}),
              Object(q.jsx)(
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
              Object(q.jsx)(Dt, {
                open: h,
                handleClose: function () {
                  return j(!1);
                },
              }),
              Object(q.jsx)(Rt, {
                open: g,
                handleClose: function () {
                  return x(!1);
                },
              }),
            ],
          });
        },
        At = function (e) {
          return Object(q.jsx)(cn.Consumer, {
            children: function (n) {
              return Object(q.jsx)(Tt, Object(i.a)(Object(i.a)({}, e), {}, {contextProps: n}));
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
              sessionStorage.getItem(W) &&
                (F.b.warn('Failed to create a stable data channel, please try again', {autoClose: !1}),
                sessionStorage.removeItem(W));
            }, []);
          var f = Object(E.a)({
            onDragEnd: function (e) {
              var n = Math.sign(e.movement[0]),
                t = Math.sign(e.movement[1]);
              Math.abs(e.movement[0]) > 6 && (-1 === n && b('left'), 1 === n && b('right')),
                0 === n && 0 === t && b(void 0);
            },
          });
          return Object(q.jsxs)(
            Mt,
            Object(i.a)(
              Object(i.a)({}, f()),
              {},
              {
                children: [
                  Object(q.jsx)(At, {gestureDirection: p}),
                  Object(q.jsx)(Rn, {selfIdentity: c, publicID: n, localID: t}),
                  Object(q.jsx)(Et, {}),
                ],
              },
            ),
          );
        },
        Lt = function () {
          return Object(q.jsx)(K.Consumer, {
            children: function (e) {
              var n = e.localID,
                t = e.publicID;
              return n && t
                ? Object(q.jsx)(zt, {localID: n, publicID: t})
                : Object(q.jsx)(Ft, {children: Object(q.jsx)(Pt, {color: 'secondary'})});
            },
          });
        },
        _t = t(115),
        Bt = ['className'],
        Nt = Object(k.b)(function (e) {
          var n = e.className,
            t = Object(_t.a)(e, Bt);
          return Object(q.jsx)('div', {className: n, children: Object(q.jsx)(F.a, Object(i.a)({}, t))});
        }).attrs({})(
          Ge ||
            (Ge = Object(l.a)([
              "\n  .Toastify__toast-container {\n    width: max-content;\n    max-width: 80vw;\n  }\n  .Toastify__toast-body {\n    font-family: 'Roboto', sans-serif;\n    white-space: pre-line;\n    min-width: 200px;\n  }\n",
            ])),
        ),
        Ut = t(212),
        Wt = t(112),
        Ht =
          (t(149),
          t(150),
          function (e) {
            var n = e.appTheme,
              t = Object(Wt.a)({
                palette: {
                  primary: {main: _n[n].primary.main, dark: _n[n].primary.dark},
                  secondary: {main: _n[n].secondary.main},
                },
              });
            return Object(q.jsx)(k.a, {
              theme: Object(i.a)(Object(i.a)({}, Bn), _n[n]),
              children: Object(q.jsxs)(Ut.a, {
                theme: t,
                children: [
                  Object(q.jsx)(Lt, {}),
                  Object(q.jsx)(Nt, {
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
          return Object(q.jsx)(Q, {
            children: Object(q.jsx)(sn, {
              children: Object(q.jsx)(cn.Consumer, {
                children: function (e) {
                  var n = e.appTheme;
                  return Object(q.jsx)(Ht, {appTheme: n});
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
            .then(t.bind(null, 218))
            .then(function (n) {
              var t = n.getCLS,
                r = n.getFID,
                a = n.getFCP,
                o = n.getLCP,
                c = n.getTTFB;
              t(e), r(e), a(e), o(e), c(e);
            });
      };
      c.a.render(Object(q.jsx)(a.a.StrictMode, {children: Object(q.jsx)($t, {})}), document.getElementById('root')),
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
  [[151, 1, 2]],
]);
//# sourceMappingURL=main.4b3b21ea.chunk.js.map
