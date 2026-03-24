import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/contentstack/dist/web/contentstack.js
var require_contentstack = __commonJS({
  "node_modules/contentstack/dist/web/contentstack.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Contentstack = t() : e.Contentstack = t();
    }(self, () => (() => {
      "use strict";
      var e = { 971: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = { protocol: "https", host: "cdn.contentstack.io", port: 443, version: "v3", urls: { sync: "/stacks/sync", content_types: "/content_types/", entries: "/entries/", assets: "/assets/", environments: "/environments/" }, live_preview: { enable: false, host: "api.contentstack.io" } };
      }, 472: () => {
      }, 776: (e2, t2) => {
        var r, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        };
        function i(e3) {
          return { text: e3["#text"], itemUid: e3["data-sys-entry-uid"] || e3["data-sys-asset-uid"], itemType: e3.type, styleType: e3["sys-style-type"], attributes: e3, contentTypeUid: e3["data-sys-content-type-uid"] };
        }
        Object.defineProperty(t2, "__esModule", { value: true }), function(e3) {
          e3.BLOCK = "block", e3.INLINE = "inline", e3.LINK = "link", e3.DISPLAY = "display", e3.DOWNLOAD = "download";
        }(r || (r = {}));
        var o = r, s = function(e3, t3) {
          return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
            e4.__proto__ = t4;
          } || function(e4, t4) {
            for (var r2 in t4) Object.prototype.hasOwnProperty.call(t4, r2) && (e4[r2] = t4[r2]);
          }, s(e3, t3);
        };
        function u(e3, t3) {
          function r2() {
            this.constructor = e3;
          }
          s(e3, t3), e3.prototype = null === t3 ? Object.create(t3) : (r2.prototype = t3.prototype, new r2());
        }
        var a = function() {
          return a = Object.assign || function(e3) {
            for (var t3, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var i2 in t3 = arguments[r2]) Object.prototype.hasOwnProperty.call(t3, i2) && (e3[i2] = t3[i2]);
            return e3;
          }, a.apply(this, arguments);
        };
        function c(e3) {
          for (var t3 = {}, r2 = 0; r2 < e3.attributes.length; r2++) t3[e3.attributes.item(r2).name] = e3.attributes.item(r2).value;
          return e3.childNodes.forEach(function(e4) {
            var r3 = e4;
            t3 = a(a({}, t3), function(e5) {
              var t4 = {};
              return 3 === e5.nodeType ? t4["#text"] = e5.textContent : 1 === e5.nodeType && (t4[e5.nodeName.toLowerCase()] = c(e5)), t4;
            }(r3));
          }), t3;
        }
        var f, l = "documentfragmentcontainer";
        String.prototype.forEachEmbeddedItem = function(e3) {
          var t3 = "<".concat(l, ">").concat(this.toString(), "</").concat(l, ">"), r2 = new DOMParser().parseFromString(t3, "text/html");
          r2.querySelectorAll(".embedded-entry").forEach(function(t4) {
            e3(t4.outerHTML, i(c(t4)));
          }), r2.querySelectorAll(".embedded-asset").forEach(function(t4) {
            e3(t4.outerHTML, i(c(t4)));
          });
        };
        var h, y = ((f = {})[o.BLOCK] = function(e3) {
          return "<div><p>".concat(e3.title || e3.uid, "</p><p>Content type: <span>").concat(e3._content_type_uid || (e3.system ? e3.system.content_type_uid : ""), "</span></p></div>");
        }, f[o.INLINE] = function(e3) {
          return "<span>".concat(e3.title || e3.uid, "</span>");
        }, f[o.LINK] = function(e3, t3) {
          return '<a href="'.concat(e3.url, '">').concat(t3.text || e3.title || e3.uid || (e3.system ? e3.system.uid : ""), "</a>");
        }, f[o.DISPLAY] = function(e3, t3) {
          return '<img src="'.concat(e3.url, '" alt="').concat(t3.attributes.alt || e3.title || e3.filename || e3.uid || (e3.system ? e3.system.uid : ""), '" />');
        }, f[o.DOWNLOAD] = function(e3, t3) {
          return '<a href="'.concat(e3.url, '">').concat(t3.text || e3.title || e3.uid || (e3.system ? e3.system.content_type_uid : ""), "</a>");
        }, f);
        function d(e3, t3) {
          return "entry" === e3.itemType ? (r2 = e3.itemUid, n2 = e3.contentTypeUid, void 0 === (i2 = t3) && (i2 = []), i2.filter(function(e4) {
            if (e4.uid && e4.uid === r2 && e4._content_type_uid === n2 || e4.system && e4.system.uid === r2 && e4.system.content_type_uid === n2) return e4;
          })) : function(e4, t4) {
            return void 0 === t4 && (t4 = []), t4.filter(function(t5) {
              if (t5.uid && t5.uid === e4 || t5.system && t5.system.uid === e4) return t5;
            });
          }(e3.itemUid, t3);
          var r2, n2, i2;
        }
        function p(e3, t3) {
          if (e3 && void 0 !== e3 && t3 && void 0 !== t3 && void 0 !== t3._embedded_items) {
            var r2 = t3;
            return d(e3, Object.values(r2._embedded_items || []).reduce(function(e4, t4) {
              return e4.concat(t4);
            }, []));
          }
          return [];
        }
        function v(e3, t3, r2) {
          if (!e3 && void 0 === e3 || !t3 && void 0 === t3) return "";
          if (r2 && void 0 !== r2[t3.styleType]) {
            var n2 = r2[t3.styleType];
            if (void 0 !== t3.attributes["data-sys-content-type-uid"] && "function" != typeof n2 && void 0 !== n2[t3.attributes["data-sys-content-type-uid"]]) return n2[t3.attributes["data-sys-content-type-uid"]](e3, t3);
            if (void 0 !== t3.attributes["data-sys-content-type-uid"] && "function" != typeof n2 && void 0 !== n2.$default) return n2.$default(e3, t3);
            if (void 0 !== t3.contentTypeUid && "function" != typeof n2 && void 0 !== n2[t3.contentTypeUid]) return n2[t3.contentTypeUid](e3, t3);
            if (void 0 !== t3.contentTypeUid && "function" != typeof n2 && void 0 !== n2.$default) return n2.$default(e3, t3);
            if ("function" == typeof n2) return n2(e3, t3);
          }
          return (0, y[t3.styleType])(e3, t3);
        }
        function _(e3, t3, r2) {
          b(e3.split("."), t3, r2);
        }
        function b(e3, t3, r2) {
          if (e3) {
            var i2 = e3[0];
            if (1 === e3.length && t3[i2]) t3[i2] = r2(t3[i2]);
            else if (e3.length > 0 && t3[i2]) {
              var o2 = e3.slice(1);
              if (Array.isArray(t3[i2])) for (var s2 = 0, u2 = t3[i2]; s2 < u2.length; s2++) b(o2, u2[s2], r2);
              else "object" === n(t3[i2]) && b(o2, t3[i2], r2);
            }
          }
        }
        function m(e3, t3) {
          if (!e3 || void 0 === e3) return "";
          if ("string" == typeof e3) {
            var r2 = e3;
            return e3.forEachEmbeddedItem(function(e4, n3) {
              r2 = function(e5, t4, r3, n4) {
                var i2 = v(p(r3, n4.entry)[0], r3, n4.renderOption);
                return e5.replace(t4, i2);
              }(r2, e4, n3, t3);
            }), r2;
          }
          var n2 = [];
          return e3.forEach(function(e4) {
            n2.push(m(e4, t3));
          }), n2;
        }
        !function(e3) {
          e3.DOCUMENT = "doc", e3.PARAGRAPH = "p", e3.LINK = "a", e3.IMAGE = "img", e3.EMBED = "embed", e3.HEADING_1 = "h1", e3.HEADING_2 = "h2", e3.HEADING_3 = "h3", e3.HEADING_4 = "h4", e3.HEADING_5 = "h5", e3.HEADING_6 = "h6", e3.ORDER_LIST = "ol", e3.UNORDER_LIST = "ul", e3.LIST_ITEM = "li", e3.HR = "hr", e3.TABLE = "table", e3.TABLE_HEADER = "thead", e3.TABLE_BODY = "tbody", e3.TABLE_FOOTER = "tfoot", e3.TABLE_ROW = "tr", e3.TABLE_HEAD = "th", e3.TABLE_DATA = "td", e3.BLOCK_QUOTE = "blockquote", e3.CODE = "code", e3.TEXT = "text", e3.REFERENCE = "reference";
        }(h || (h = {}));
        var g, O = h;
        !function(e3) {
          e3.BOLD = "bold", e3.ITALIC = "italic", e3.UNDERLINE = "underline", e3.STRIKE_THROUGH = "strikethrough", e3.INLINE_CODE = "inlineCode", e3.SUBSCRIPT = "subscript", e3.SUPERSCRIPT = "superscript";
        }(g || (g = {}));
        var q, w = g, E = function() {
        }, T = function(e3) {
          function t3() {
            var t4 = e3.call(this) || this;
            return t4.type = O.DOCUMENT, t4;
          }
          return u(t3, e3), t3;
        }(E), A = function(e3) {
          function t3(t4) {
            var r2 = e3.call(this) || this;
            return r2.text = t4, r2;
          }
          return u(t3, e3), t3;
        }(E), P = ((q = {})[O.DOCUMENT] = function(e3) {
          return "";
        }, q[O.PARAGRAPH] = function(e3, t3) {
          return "<p>".concat(t3(e3.children), "</p>");
        }, q[O.LINK] = function(e3, t3) {
          return '<a href="'.concat(e3.attrs.href || e3.attrs.url, '">').concat(t3(e3.children), "</a>");
        }, q[O.IMAGE] = function(e3, t3) {
          return '<img src="'.concat(e3.attrs.src || e3.attrs.url, '" />').concat(t3(e3.children));
        }, q[O.EMBED] = function(e3, t3) {
          return '<iframe src="'.concat(e3.attrs.src || e3.attrs.url, '">').concat(t3(e3.children), "</iframe>");
        }, q[O.HEADING_1] = function(e3, t3) {
          return "<h1>".concat(t3(e3.children), "</h1>");
        }, q[O.HEADING_2] = function(e3, t3) {
          return "<h2>".concat(t3(e3.children), "</h2>");
        }, q[O.HEADING_3] = function(e3, t3) {
          return "<h3>".concat(t3(e3.children), "</h3>");
        }, q[O.HEADING_4] = function(e3, t3) {
          return "<h4>".concat(t3(e3.children), "</h4>");
        }, q[O.HEADING_5] = function(e3, t3) {
          return "<h5>".concat(t3(e3.children), "</h5>");
        }, q[O.HEADING_6] = function(e3, t3) {
          return "<h6>".concat(t3(e3.children), "</h6>");
        }, q[O.ORDER_LIST] = function(e3, t3) {
          return "<ol>".concat(t3(e3.children), "</ol>");
        }, q[O.UNORDER_LIST] = function(e3, t3) {
          return "<ul>".concat(t3(e3.children), "</ul>");
        }, q[O.LIST_ITEM] = function(e3, t3) {
          return "<li>".concat(t3(e3.children), "</li>");
        }, q[O.HR] = function(e3, t3) {
          return "<hr>";
        }, q[O.TABLE] = function(e3, t3) {
          return "<table>".concat(t3(e3.children), "</table>");
        }, q[O.TABLE_HEADER] = function(e3, t3) {
          return "<thead>".concat(t3(e3.children), "</thead>");
        }, q[O.TABLE_BODY] = function(e3, t3) {
          return "<tbody>".concat(t3(e3.children), "</tbody>");
        }, q[O.TABLE_FOOTER] = function(e3, t3) {
          return "<tfoot>".concat(t3(e3.children), "</tfoot>");
        }, q[O.TABLE_ROW] = function(e3, t3) {
          return "<tr>".concat(t3(e3.children), "</tr>");
        }, q[O.TABLE_HEAD] = function(e3, t3) {
          return "<th>".concat(t3(e3.children), "</th>");
        }, q[O.TABLE_DATA] = function(e3, t3) {
          return "<td>".concat(t3(e3.children), "</td>");
        }, q[O.BLOCK_QUOTE] = function(e3, t3) {
          return "<blockquote>".concat(t3(e3.children), "</blockquote>");
        }, q[O.CODE] = function(e3, t3) {
          return "<code>".concat(t3(e3.children), "</code>");
        }, q.reference = function(e3, t3) {
          return "";
        }, q.default = function(e3, t3) {
          return t3(e3.children);
        }, q[w.BOLD] = function(e3) {
          return "<strong>".concat(e3, "</strong>");
        }, q[w.ITALIC] = function(e3) {
          return "<em>".concat(e3, "</em>");
        }, q[w.UNDERLINE] = function(e3) {
          return "<u>".concat(e3, "</u>");
        }, q[w.STRIKE_THROUGH] = function(e3) {
          return "<strike>".concat(e3, "</strike>");
        }, q[w.INLINE_CODE] = function(e3) {
          return "<span>".concat(e3, "</span>");
        }, q[w.SUBSCRIPT] = function(e3) {
          return "<sub>".concat(e3, "</sub>");
        }, q[w.SUPERSCRIPT] = function(e3) {
          return "<sup>".concat(e3, "</sup>");
        }, q);
        function k(e3, t3) {
          for (var r2 = 0, n2 = e3; r2 < n2.length; r2++) t3(n2[r2]);
        }
        function S(e3, t3, r2) {
          if (!(e3 instanceof Array) && "doc" !== e3.type) return e3;
          if (e3 instanceof Array) {
            var n2 = [];
            return e3.forEach(function(e4) {
              n2.push(S(e4, t3, r2));
            }), n2;
          }
          var i2 = a(a({}, P), t3);
          return j(e3.children, i2, r2);
        }
        function j(e3, t3, r2) {
          return e3.map(function(e4) {
            return function(e5, t4, r3) {
              if (e5.type) {
                if ("reference" === e5.type) return function(e6, t5, r4) {
                  function n3(e7) {
                    return t5[e7.type](e7, void 0);
                  }
                  if (!r4 && void 0 !== t5[e6.type]) return n3(e6);
                  if (!r4) return "";
                  var i2, o2 = (i2 = e6.attrs, { text: (e6.children && e6.children.length > 0 ? e6.children[0] : {}).text, itemUid: i2["entry-uid"] || i2["asset-uid"], itemType: i2.type, styleType: i2["display-type"], attributes: i2, contentTypeUid: i2["content-type-uid"] }), s2 = r4(o2);
                  return s2 || void 0 === t5[e6.type] ? v(s2, o2, t5) : n3(e6);
                }(e5, t4, r3);
                var n2 = function(e6) {
                  return j(e6, t4, r3);
                };
                return void 0 !== t4[e5.type] ? t4[e5.type](e5, n2) : t4.default(e5, n2);
              }
              return function(e6, t5) {
                var r4 = e6.text;
                return e6.superscript && (r4 = t5[w.SUPERSCRIPT](r4)), e6.subscript && (r4 = t5[w.SUBSCRIPT](r4)), e6.inlineCode && (r4 = t5[w.INLINE_CODE](r4)), e6.strikethrough && (r4 = t5[w.STRIKE_THROUGH](r4)), e6.underline && (r4 = t5[w.UNDERLINE](r4)), e6.italic && (r4 = t5[w.ITALIC](r4)), e6.bold && (r4 = t5[w.BOLD](r4)), r4;
              }(e5, t4);
            }(e4, t3, r2);
          }).join("");
        }
        var D = { jsonToHTML: function e3(t3) {
          t3.entry instanceof Array ? k(t3.entry, function(r2) {
            e3({ entry: r2, paths: t3.paths, renderOption: t3.renderOption });
          }) : function(e4) {
            for (var t4 = 0, r2 = e4.paths; t4 < r2.length; t4++) _(r2[t4], e4.entry, function(t5) {
              if (t5 && t5.json) {
                var r3 = t5.embedded_itemsConnection ? t5.embedded_itemsConnection.edges : [], n2 = Object.values(r3 || []).reduce(function(e5, t6) {
                  return e5.concat(t6.node);
                }, []);
                return S(t5.json, e4.renderOption, function(e5) {
                  return d(e5, n2)[0];
                });
              }
              return t5;
            });
          }({ entry: t3.entry, paths: t3.paths, renderOption: t3.renderOption });
        } };
        function C(e3, t3, r2, i2) {
          var o2 = {};
          return Object.entries(e3).forEach(function(e4) {
            var s2 = e4[0], u2 = e4[1];
            "object" === (void 0 === u2 ? "undefined" : n(u2)) ? Array.isArray(u2) ? u2.forEach(function(e5, a2) {
              null != e5 && void 0 !== e5._content_type_uid && void 0 !== e5.uid ? u2[a2].$ = C(e5, "".concat(e5._content_type_uid, ".").concat(e5.uid, ".").concat(e5.locale || i2), r2, i2) : "object" === (void 0 === e5 ? "undefined" : n(e5)) ? e5.$ = C(e5, "".concat(t3, ".").concat(s2, ".").concat(a2), r2, i2) : o2[s2] = I("".concat(t3, ".").concat(s2), r2);
            }) : u2 && (u2.$ = C(u2, "".concat(t3, ".").concat(s2), r2, i2)) : o2[s2] = I("".concat(t3, ".").concat(s2), r2);
          }), o2;
        }
        function I(e3, t3) {
          return t3 ? { "data-cslp": e3 } : "data-cslp=".concat(e3);
        }
        t2.Document = T, t2.GQL = D, t2.MarkType = w, t2.Node = E, t2.NodeType = O, t2.StyleType = o, t2.TextNode = A, t2.addEditableTags = function(e3, t3, r2, n2) {
          void 0 === n2 && (n2 = "en-us"), e3 && (e3.$ = C(e3, "".concat(t3, ".").concat(e3.uid, ".").concat(n2), r2, n2));
        }, t2.attributeToString = function(e3) {
          var t3 = "", r2 = function(r3) {
            if (Object.prototype.hasOwnProperty.call(e3, r3)) {
              var i3 = e3[r3];
              if (i3 instanceof Array) {
                var o2 = "", s2 = true;
                i3.forEach(function(e4) {
                  s2 ? (o2 += "".concat(e4), s2 = false) : o2 += ", ".concat(e4);
                }), i3 = o2;
              } else if ("object" === (void 0 === i3 ? "undefined" : n(i3))) {
                var u2 = "";
                for (var a2 in i3) if (Object.prototype.hasOwnProperty.call(i3, a2)) {
                  var c2 = i3[a2];
                  u2 += "".concat(a2, ":").concat(c2, "; ");
                }
                i3 = u2;
              }
              t3 += " ".concat(r3, '="').concat(i3, '"');
            }
          };
          for (var i2 in e3) r2(i2);
          return t3;
        }, t2.jsonToHTML = function e3(t3) {
          t3.entry instanceof Array ? k(t3.entry, function(r2) {
            e3({ entry: r2, paths: t3.paths, renderOption: t3.renderOption });
          }) : function(e4) {
            for (var t4 = 0, r2 = e4.paths; t4 < r2.length; t4++) _(r2[t4], e4.entry, function(t5) {
              return S(t5, e4.renderOption, function(t6) {
                return p(t6, e4.entry)[0];
              });
            });
          }({ entry: t3.entry, paths: t3.paths, renderOption: t3.renderOption });
        }, t2.render = function(e3) {
          function t3(t4, r3) {
            _(t4, r3, function(t5) {
              return m(t5, { entry: r3, renderOption: e3.renderOption });
            });
          }
          function r2(r3) {
            e3.paths && 0 !== e3.paths.length ? e3.paths.forEach(function(e4) {
              t3(e4, r3);
            }) : Object.keys(a({}, r3._embedded_items)).forEach(function(e4) {
              t3(e4, r3);
            });
          }
          e3.entry instanceof Array ? e3.entry.forEach(function(e4) {
            r2(e4);
          }) : r2(e3.entry);
        }, t2.renderContent = m;
      }, 483: (e2, t2, r) => {
        var n, i, o, s = r(472), u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        };
        o = function() {
          function e3(e4) {
            return "function" == typeof e4;
          }
          var t3 = Array.isArray ? Array.isArray : function(e4) {
            return "[object Array]" === Object.prototype.toString.call(e4);
          }, r2 = 0, n2 = void 0, i2 = void 0, o2 = function(e4, t4) {
            d[r2] = e4, d[r2 + 1] = t4, 2 === (r2 += 2) && (i2 ? i2(p) : g());
          }, a = "undefined" != typeof window ? window : void 0, c = a || {}, f = c.MutationObserver || c.WebKitMutationObserver, l = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process), h = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;
          function y() {
            var e4 = setTimeout;
            return function() {
              return e4(p, 1);
            };
          }
          var d = new Array(1e3);
          function p() {
            for (var e4 = 0; e4 < r2; e4 += 2) (0, d[e4])(d[e4 + 1]), d[e4] = void 0, d[e4 + 1] = void 0;
            r2 = 0;
          }
          var v, _, b, m, g = void 0;
          function O(e4, t4) {
            var r3 = this, n3 = new this.constructor(E);
            void 0 === n3[w] && N(n3);
            var i3 = r3._state;
            if (i3) {
              var s2 = arguments[i3 - 1];
              o2(function() {
                return B(i3, n3, s2, r3._result);
              });
            } else I(r3, n3, e4, t4);
            return n3;
          }
          function q(e4) {
            if (e4 && "object" === (void 0 === e4 ? "undefined" : u(e4)) && e4.constructor === this) return e4;
            var t4 = new this(E);
            return S(t4, e4), t4;
          }
          l ? g = function() {
            return process.nextTick(p);
          } : f ? (_ = 0, b = new f(p), m = document.createTextNode(""), b.observe(m, { characterData: true }), g = function() {
            m.data = _ = ++_ % 2;
          }) : h ? ((v = new MessageChannel()).port1.onmessage = p, g = function() {
            return v.port2.postMessage(0);
          }) : g = void 0 === a ? function() {
            try {
              var e4 = Function("return this")().require("vertx");
              return void 0 !== (n2 = e4.runOnLoop || e4.runOnContext) ? function() {
                n2(p);
              } : y();
            } catch (e5) {
              return y();
            }
          }() : y();
          var w = Math.random().toString(36).substring(2);
          function E() {
          }
          var T = void 0, A = 1, P = 2;
          function k(t4, r3, n3) {
            r3.constructor === t4.constructor && n3 === O && r3.constructor.resolve === q ? function(e4, t5) {
              t5._state === A ? D(e4, t5._result) : t5._state === P ? C(e4, t5._result) : I(t5, void 0, function(t6) {
                return S(e4, t6);
              }, function(t6) {
                return C(e4, t6);
              });
            }(t4, r3) : void 0 === n3 ? D(t4, r3) : e3(n3) ? function(e4, t5, r4) {
              o2(function(e5) {
                var n4 = false, i3 = function(r5, i4, o3, s2) {
                  try {
                    r5.call(i4, function(r6) {
                      n4 || (n4 = true, t5 !== r6 ? S(e5, r6) : D(e5, r6));
                    }, function(t6) {
                      n4 || (n4 = true, C(e5, t6));
                    });
                  } catch (e6) {
                    return e6;
                  }
                }(r4, t5, 0, 0, e5._label);
                !n4 && i3 && (n4 = true, C(e5, i3));
              }, e4);
            }(t4, r3, n3) : D(t4, r3);
          }
          function S(e4, t4) {
            if (e4 === t4) C(e4, new TypeError("You cannot resolve a promise with itself"));
            else if (i3 = void 0 === (n3 = t4) ? "undefined" : u(n3), null === n3 || "object" !== i3 && "function" !== i3) D(e4, t4);
            else {
              var r3 = void 0;
              try {
                r3 = t4.then;
              } catch (t5) {
                return void C(e4, t5);
              }
              k(e4, t4, r3);
            }
            var n3, i3;
          }
          function j(e4) {
            e4._onerror && e4._onerror(e4._result), R(e4);
          }
          function D(e4, t4) {
            e4._state === T && (e4._result = t4, e4._state = A, 0 !== e4._subscribers.length && o2(R, e4));
          }
          function C(e4, t4) {
            e4._state === T && (e4._state = P, e4._result = t4, o2(j, e4));
          }
          function I(e4, t4, r3, n3) {
            var i3 = e4._subscribers, s2 = i3.length;
            e4._onerror = null, i3[s2] = t4, i3[s2 + A] = r3, i3[s2 + P] = n3, 0 === s2 && e4._state && o2(R, e4);
          }
          function R(e4) {
            var t4 = e4._subscribers, r3 = e4._state;
            if (0 !== t4.length) {
              for (var n3 = void 0, i3 = void 0, o3 = e4._result, s2 = 0; s2 < t4.length; s2 += 3) n3 = t4[s2], i3 = t4[s2 + r3], n3 ? B(r3, n3, i3, o3) : i3(o3);
              e4._subscribers.length = 0;
            }
          }
          function B(t4, r3, n3, i3) {
            var o3 = e3(n3), s2 = void 0, u2 = void 0, a2 = true;
            if (o3) {
              try {
                s2 = n3(i3);
              } catch (e4) {
                a2 = false, u2 = e4;
              }
              if (r3 === s2) return void C(r3, new TypeError("A promises callback cannot return that same promise."));
            } else s2 = i3;
            r3._state !== T || (o3 && a2 ? S(r3, s2) : false === a2 ? C(r3, u2) : t4 === A ? D(r3, s2) : t4 === P && C(r3, s2));
          }
          var H = 0;
          function N(e4) {
            e4[w] = H++, e4._state = void 0, e4._result = void 0, e4._subscribers = [];
          }
          var x = function() {
            function e4(e5, r3) {
              this._instanceConstructor = e5, this.promise = new e5(E), this.promise[w] || N(this.promise), t3(r3) ? (this.length = r3.length, this._remaining = r3.length, this._result = new Array(this.length), 0 === this.length ? D(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(r3), 0 === this._remaining && D(this.promise, this._result))) : C(this.promise, new Error("Array Methods must be provided an Array"));
            }
            return e4.prototype._enumerate = function(e5) {
              for (var t4 = 0; this._state === T && t4 < e5.length; t4++) this._eachEntry(e5[t4], t4);
            }, e4.prototype._eachEntry = function(e5, t4) {
              var r3 = this._instanceConstructor, n3 = r3.resolve;
              if (n3 === q) {
                var i3 = void 0, o3 = void 0, s2 = false;
                try {
                  i3 = e5.then;
                } catch (e6) {
                  s2 = true, o3 = e6;
                }
                if (i3 === O && e5._state !== T) this._settledAt(e5._state, t4, e5._result);
                else if ("function" != typeof i3) this._remaining--, this._result[t4] = e5;
                else if (r3 === L) {
                  var u2 = new r3(E);
                  s2 ? C(u2, o3) : k(u2, e5, i3), this._willSettleAt(u2, t4);
                } else this._willSettleAt(new r3(function(t5) {
                  return t5(e5);
                }), t4);
              } else this._willSettleAt(n3(e5), t4);
            }, e4.prototype._settledAt = function(e5, t4, r3) {
              var n3 = this.promise;
              n3._state === T && (this._remaining--, e5 === P ? C(n3, r3) : this._result[t4] = r3), 0 === this._remaining && D(n3, this._result);
            }, e4.prototype._willSettleAt = function(e5, t4) {
              var r3 = this;
              I(e5, void 0, function(e6) {
                return r3._settledAt(A, t4, e6);
              }, function(e6) {
                return r3._settledAt(P, t4, e6);
              });
            }, e4;
          }(), L = function() {
            function t4(e4) {
              this[w] = H++, this._result = this._state = void 0, this._subscribers = [], E !== e4 && ("function" != typeof e4 && function() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
              }(), this instanceof t4 ? function(e5, t5) {
                try {
                  t5(function(t6) {
                    S(e5, t6);
                  }, function(t6) {
                    C(e5, t6);
                  });
                } catch (t6) {
                  C(e5, t6);
                }
              }(this, e4) : function() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
              }());
            }
            return t4.prototype.catch = function(e4) {
              return this.then(null, e4);
            }, t4.prototype.finally = function(t5) {
              var r3 = this, n3 = r3.constructor;
              return e3(t5) ? r3.then(function(e4) {
                return n3.resolve(t5()).then(function() {
                  return e4;
                });
              }, function(e4) {
                return n3.resolve(t5()).then(function() {
                  throw e4;
                });
              }) : r3.then(t5, t5);
            }, t4;
          }();
          return L.prototype.then = O, L.all = function(e4) {
            return new x(this, e4).promise;
          }, L.race = function(e4) {
            var r3 = this;
            return t3(e4) ? new r3(function(t4, n3) {
              for (var i3 = e4.length, o3 = 0; o3 < i3; o3++) r3.resolve(e4[o3]).then(t4, n3);
            }) : new r3(function(e5, t4) {
              return t4(new TypeError("You must pass an array to race."));
            });
          }, L.resolve = q, L.reject = function(e4) {
            var t4 = new this(E);
            return C(t4, e4), t4;
          }, L._setScheduler = function(e4) {
            i2 = e4;
          }, L._setAsap = function(e4) {
            o2 = e4;
          }, L._asap = o2, L.polyfill = function() {
            var e4 = void 0;
            if (void 0 !== s) e4 = s;
            else if ("undefined" != typeof self) e4 = self;
            else try {
              e4 = Function("return this")();
            } catch (e5) {
              throw new Error("polyfill failed because global object is unavailable in this environment");
            }
            var t4 = e4.Promise;
            if (t4) {
              var r3 = null;
              try {
                r3 = Object.prototype.toString.call(t4.resolve());
              } catch (e5) {
              }
              if ("[object Promise]" === r3 && !t4.cast) return;
            }
            e4.Promise = L;
          }, L.Promise = L, L;
        }, "object" === u(t2) ? e2.exports = o() : void 0 === (i = "function" == typeof (n = o) ? n.call(t2, r, t2, e2) : n) || (e2.exports = i);
      }, 51: (e2, t2, r) => {
        r(395), e2.exports = self.fetch.bind(self);
      }, 395: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        };
        t2.Headers = f, t2.Request = _, t2.Response = m, t2.fetch = q;
        var n = "undefined" != typeof globalThis && globalThis || "undefined" != typeof self && self || void 0 !== n && n, i = { searchParams: "URLSearchParams" in n, iterable: "Symbol" in n && "iterator" in Symbol, blob: "FileReader" in n && "Blob" in n && function() {
          try {
            return new Blob(), true;
          } catch (e3) {
            return false;
          }
        }(), formData: "FormData" in n, arrayBuffer: "ArrayBuffer" in n };
        if (i.arrayBuffer) var o = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"], s = ArrayBuffer.isView || function(e3) {
          return e3 && o.indexOf(Object.prototype.toString.call(e3)) > -1;
        };
        function u(e3) {
          if ("string" != typeof e3 && (e3 = String(e3)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e3) || "" === e3) throw new TypeError('Invalid character in header field name: "' + e3 + '"');
          return e3.toLowerCase();
        }
        function a(e3) {
          return "string" != typeof e3 && (e3 = String(e3)), e3;
        }
        function c(e3) {
          var t3 = { next: function() {
            var t4 = e3.shift();
            return { done: void 0 === t4, value: t4 };
          } };
          return i.iterable && (t3[Symbol.iterator] = function() {
            return t3;
          }), t3;
        }
        function f(e3) {
          this.map = {}, e3 instanceof f ? e3.forEach(function(e4, t3) {
            this.append(t3, e4);
          }, this) : Array.isArray(e3) ? e3.forEach(function(e4) {
            this.append(e4[0], e4[1]);
          }, this) : e3 && Object.getOwnPropertyNames(e3).forEach(function(t3) {
            this.append(t3, e3[t3]);
          }, this);
        }
        function l(e3) {
          if (e3.bodyUsed) return Promise.reject(new TypeError("Already read"));
          e3.bodyUsed = true;
        }
        function h(e3) {
          return new Promise(function(t3, r2) {
            e3.onload = function() {
              t3(e3.result);
            }, e3.onerror = function() {
              r2(e3.error);
            };
          });
        }
        function y(e3) {
          var t3 = new FileReader(), r2 = h(t3);
          return t3.readAsArrayBuffer(e3), r2;
        }
        function d(e3) {
          if (e3.slice) return e3.slice(0);
          var t3 = new Uint8Array(e3.byteLength);
          return t3.set(new Uint8Array(e3)), t3.buffer;
        }
        function p() {
          return this.bodyUsed = false, this._initBody = function(e3) {
            var t3;
            this.bodyUsed = this.bodyUsed, this._bodyInit = e3, e3 ? "string" == typeof e3 ? this._bodyText = e3 : i.blob && Blob.prototype.isPrototypeOf(e3) ? this._bodyBlob = e3 : i.formData && FormData.prototype.isPrototypeOf(e3) ? this._bodyFormData = e3 : i.searchParams && URLSearchParams.prototype.isPrototypeOf(e3) ? this._bodyText = e3.toString() : i.arrayBuffer && i.blob && (t3 = e3) && DataView.prototype.isPrototypeOf(t3) ? (this._bodyArrayBuffer = d(e3.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : i.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e3) || s(e3)) ? this._bodyArrayBuffer = d(e3) : this._bodyText = e3 = Object.prototype.toString.call(e3) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e3 ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : i.searchParams && URLSearchParams.prototype.isPrototypeOf(e3) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
          }, i.blob && (this.blob = function() {
            var e3 = l(this);
            if (e3) return e3;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }, this.arrayBuffer = function() {
            return this._bodyArrayBuffer ? l(this) || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer)) : this.blob().then(y);
          }), this.text = function() {
            var e3, t3, r2, n2 = l(this);
            if (n2) return n2;
            if (this._bodyBlob) return e3 = this._bodyBlob, r2 = h(t3 = new FileReader()), t3.readAsText(e3), r2;
            if (this._bodyArrayBuffer) return Promise.resolve(function(e4) {
              for (var t4 = new Uint8Array(e4), r3 = new Array(t4.length), n3 = 0; n3 < t4.length; n3++) r3[n3] = String.fromCharCode(t4[n3]);
              return r3.join("");
            }(this._bodyArrayBuffer));
            if (this._bodyFormData) throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }, i.formData && (this.formData = function() {
            return this.text().then(b);
          }), this.json = function() {
            return this.text().then(JSON.parse);
          }, this;
        }
        f.prototype.append = function(e3, t3) {
          e3 = u(e3), t3 = a(t3);
          var r2 = this.map[e3];
          this.map[e3] = r2 ? r2 + ", " + t3 : t3;
        }, f.prototype.delete = function(e3) {
          delete this.map[u(e3)];
        }, f.prototype.get = function(e3) {
          return e3 = u(e3), this.has(e3) ? this.map[e3] : null;
        }, f.prototype.has = function(e3) {
          return this.map.hasOwnProperty(u(e3));
        }, f.prototype.set = function(e3, t3) {
          this.map[u(e3)] = a(t3);
        }, f.prototype.forEach = function(e3, t3) {
          for (var r2 in this.map) this.map.hasOwnProperty(r2) && e3.call(t3, this.map[r2], r2, this);
        }, f.prototype.keys = function() {
          var e3 = [];
          return this.forEach(function(t3, r2) {
            e3.push(r2);
          }), c(e3);
        }, f.prototype.values = function() {
          var e3 = [];
          return this.forEach(function(t3) {
            e3.push(t3);
          }), c(e3);
        }, f.prototype.entries = function() {
          var e3 = [];
          return this.forEach(function(t3, r2) {
            e3.push([r2, t3]);
          }), c(e3);
        }, i.iterable && (f.prototype[Symbol.iterator] = f.prototype.entries);
        var v = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function _(e3, t3) {
          if (!(this instanceof _)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          var r2, n2, i2 = (t3 = t3 || {}).body;
          if (e3 instanceof _) {
            if (e3.bodyUsed) throw new TypeError("Already read");
            this.url = e3.url, this.credentials = e3.credentials, t3.headers || (this.headers = new f(e3.headers)), this.method = e3.method, this.mode = e3.mode, this.signal = e3.signal, i2 || null == e3._bodyInit || (i2 = e3._bodyInit, e3.bodyUsed = true);
          } else this.url = String(e3);
          if (this.credentials = t3.credentials || this.credentials || "same-origin", !t3.headers && this.headers || (this.headers = new f(t3.headers)), this.method = (n2 = (r2 = t3.method || this.method || "GET").toUpperCase(), v.indexOf(n2) > -1 ? n2 : r2), this.mode = t3.mode || this.mode || null, this.signal = t3.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i2) throw new TypeError("Body not allowed for GET or HEAD requests");
          if (this._initBody(i2), !("GET" !== this.method && "HEAD" !== this.method || "no-store" !== t3.cache && "no-cache" !== t3.cache)) {
            var o2 = /([?&])_=[^&]*/;
            o2.test(this.url) ? this.url = this.url.replace(o2, "$1_=" + (/* @__PURE__ */ new Date()).getTime()) : this.url += (/\?/.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
        function b(e3) {
          var t3 = new FormData();
          return e3.trim().split("&").forEach(function(e4) {
            if (e4) {
              var r2 = e4.split("="), n2 = r2.shift().replace(/\+/g, " "), i2 = r2.join("=").replace(/\+/g, " ");
              t3.append(decodeURIComponent(n2), decodeURIComponent(i2));
            }
          }), t3;
        }
        function m(e3, t3) {
          if (!(this instanceof m)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          t3 || (t3 = {}), this.type = "default", this.status = void 0 === t3.status ? 200 : t3.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = void 0 === t3.statusText ? "" : "" + t3.statusText, this.headers = new f(t3.headers), this.url = t3.url || "", this._initBody(e3);
        }
        _.prototype.clone = function() {
          return new _(this, { body: this._bodyInit });
        }, p.call(_.prototype), p.call(m.prototype), m.prototype.clone = function() {
          return new m(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new f(this.headers), url: this.url });
        }, m.error = function() {
          var e3 = new m(null, { status: 0, statusText: "" });
          return e3.type = "error", e3;
        };
        var g = [301, 302, 303, 307, 308];
        m.redirect = function(e3, t3) {
          if (-1 === g.indexOf(t3)) throw new RangeError("Invalid status code");
          return new m(null, { status: t3, headers: { location: e3 } });
        };
        var O = t2.DOMException = n.DOMException;
        try {
          new O();
        } catch (e3) {
          t2.DOMException = O = function(e4, t3) {
            this.message = e4, this.name = t3;
            var r2 = Error(e4);
            this.stack = r2.stack;
          }, O.prototype = Object.create(Error.prototype), O.prototype.constructor = O;
        }
        function q(e3, t3) {
          return new Promise(function(o2, s2) {
            var u2 = new _(e3, t3);
            if (u2.signal && u2.signal.aborted) return s2(new O("Aborted", "AbortError"));
            var c2 = new XMLHttpRequest();
            function l2() {
              c2.abort();
            }
            c2.onload = function() {
              var e4, t4, r2 = { status: c2.status, statusText: c2.statusText, headers: (e4 = c2.getAllResponseHeaders() || "", t4 = new f(), e4.replace(/\r?\n[\t ]+/g, " ").split("\r").map(function(e5) {
                return 0 === e5.indexOf("\n") ? e5.substr(1, e5.length) : e5;
              }).forEach(function(e5) {
                var r3 = e5.split(":"), n3 = r3.shift().trim();
                if (n3) {
                  var i2 = r3.join(":").trim();
                  t4.append(n3, i2);
                }
              }), t4) };
              r2.url = "responseURL" in c2 ? c2.responseURL : r2.headers.get("X-Request-URL");
              var n2 = "response" in c2 ? c2.response : c2.responseText;
              setTimeout(function() {
                o2(new m(n2, r2));
              }, 0);
            }, c2.onerror = function() {
              setTimeout(function() {
                s2(new TypeError("Network request failed"));
              }, 0);
            }, c2.ontimeout = function() {
              setTimeout(function() {
                s2(new TypeError("Network request failed"));
              }, 0);
            }, c2.onabort = function() {
              setTimeout(function() {
                s2(new O("Aborted", "AbortError"));
              }, 0);
            }, c2.open(u2.method, function(e4) {
              try {
                return "" === e4 && n.location.href ? n.location.href : e4;
              } catch (t4) {
                return e4;
              }
            }(u2.url), true), "include" === u2.credentials ? c2.withCredentials = true : "omit" === u2.credentials && (c2.withCredentials = false), "responseType" in c2 && (i.blob ? c2.responseType = "blob" : i.arrayBuffer && u2.headers.get("Content-Type") && -1 !== u2.headers.get("Content-Type").indexOf("application/octet-stream") && (c2.responseType = "arraybuffer")), !t3 || "object" !== r(t3.headers) || t3.headers instanceof f ? u2.headers.forEach(function(e4, t4) {
              c2.setRequestHeader(t4, e4);
            }) : Object.getOwnPropertyNames(t3.headers).forEach(function(e4) {
              c2.setRequestHeader(e4, a(t3.headers[e4]));
            }), u2.signal && (u2.signal.addEventListener("abort", l2), c2.onreadystatechange = function() {
              4 === c2.readyState && u2.signal.removeEventListener("abort", l2);
            }), c2.send(void 0 === u2._bodyInit ? null : u2._bodyInit);
          });
        }
        q.polyfill = true, n.fetch || (n.fetch = q, n.Headers = f, n.Request = _, n.Response = m);
      }, 900: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n, i = (n = r(128)) && n.__esModule ? n : { default: n }, o = { providers: function(e3) {
          if (e3) return i.default;
          console.error("Kindly provide valid provider.");
        }, policies: { IGNORE_CACHE: -1, ONLY_NETWORK: 0, CACHE_ELSE_NETWORK: 1, NETWORK_ELSE_CACHE: 2, CACHE_THEN_NETWORK: 3 } };
        t2.default = o;
      }, 128: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n = function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t3[r2] = e3[r2]);
          return t3.default = e3, t3;
        }(r(821)), i = {};
        function o(e3, t3) {
          !t3 && e3 && e3.length && e3.push("");
          var r2 = void 0, i2 = n.getKeys(), o2 = n.getStorage();
          if (e3 && e3.length) {
            r2 = e3.join(".");
            for (var s = 0, u = i2.length; s < u; s++) i2[s] && 0 === i2[s].indexOf(r2) && delete o2[i2[s]];
          } else for (var a = 0, c = i2.length; a < c; a++) delete o2[i2[a]];
        }
        i.get = function(e3, t3) {
          try {
            t3(null, n.get(e3));
          } catch (e4) {
            t3(e4);
          }
        }, i.set = function(e3, t3, r2) {
          try {
            e3 && t3 && n.set(e3, t3), r2();
          } catch (e4) {
            r2(e4);
          }
        }, i.clearByContentType = function() {
          try {
            if (2 === arguments.length || 3 === arguments.length) {
              var e3 = Array.prototype.slice.call(arguments), t3 = e3.splice(-1, 1).pop(), r2 = [];
              r2.push.apply(r2, e3), o(r2), t3();
            }
          } catch (e4) {
            callback(e4);
          }
        }, i.clearByQuery = function(e3, t3) {
          try {
            for (var r2 = n.getKeys(), i2 = n.getStorage(), o2 = 0, s = r2.length; o2 < s; o2++) r2[o2] && ~r2[o2].indexOf(e3) && delete i2[r2[o2]];
            t3();
          } catch (e4) {
            t3(e4);
          }
        }, i.clearAll = function(e3) {
          try {
            o(), e3();
          } catch (t3) {
            e3(t3);
          }
        }, t2.default = i;
      }, 821: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        };
        t2.get = function(e3) {
          var t3 = o.default.getItem(e3);
          try {
            t3 = JSON.parse(t3);
          } catch (e4) {
            return t3;
          }
          return t3 || null;
        }, t2.set = function(e3, t3) {
          try {
            "object" === (void 0 === t3 ? "undefined" : n(t3)) ? o.default.setItem(e3, JSON.stringify(t3)) : o.default.setItem(e3, t3);
          } catch (e4) {
          }
        }, t2.getStorage = function() {
          return o.default || null;
        }, t2.getKeys = function() {
          return o.default ? Object.keys(o.default) : [];
        };
        var i, o = (i = r(769)) && i.__esModule ? i : { default: i };
      }, 32: (e2, t2, r) => {
        var n = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var r2 = 0; r2 < t3.length; r2++) {
              var n2 = t3[r2];
              n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e4, n2.key, n2);
            }
          }
          return function(t3, r2, n2) {
            return r2 && e3(t3.prototype, r2), n2 && e3(t3, n2), t3;
          };
        }(), i = u(r(533)), o = u(r(900)), s = u(r(764));
        function u(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        var a = function() {
          function e3() {
            !function(e4, t3) {
              if (!(e4 instanceof t3)) throw new TypeError("Cannot call a class as a function");
            }(this, e3), this.CachePolicy = o.default.policies, this.Region = s.default, this.Utils = r(776);
          }
          return n(e3, [{ key: "Stack", value: function() {
            for (var e4 = arguments.length, t3 = Array(e4), r2 = 0; r2 < e4; r2++) t3[r2] = arguments[r2];
            return new (Function.prototype.bind.apply(i.default, [null].concat(t3)))();
          } }]), e3;
        }();
        e2.exports = new a();
      }, 764: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = { EU: "eu", US: "us", AZURE_NA: "azure-na", AZURE_EU: "azure-eu" };
      }, 777: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        };
        t2.default = function(e3, t3) {
          var r2 = e3.requestParams;
          return new Promise(function(i2, o2) {
            var s2 = void 0;
            return r2.headers["Content-Type"] = "application/json; charset=UTF-8", r2.headers["X-User-Agent"] = "contentstack-web/" + u, r2.body && "object" === n(r2.body) && (delete r2.body._method, "object" === n(r2.body.query) && 0 === Object.keys(r2.body.query).length && delete r2.body.query, s2 = function e4(t4, r3) {
              var i3 = [];
              if ("object" === (void 0 === t4 ? "undefined" : n(t4)) && void 0 !== t4.length) for (var o3 = 0, s3 = t4.length; o3 < s3; o3++) i3.push(r3 + "[]=" + t4[o3]);
              else for (var u2 in t4) {
                var a2 = r3 ? r3 + "[" + u2 + "]" : u2, c = t4[u2];
                i3.push(null !== c && "object" === (void 0 === c ? "undefined" : n(c)) && "query" !== u2 ? e4(c, a2) : a2 + "=" + encodeURIComponent("query" !== u2 ? c : JSON.stringify(c)));
              }
              return i3.join("&");
            }(r2.body)), a(e3, s2, t3, i2, o2, t3.retryDelay, t3.retryLimit);
          });
        };
        var i, o = function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t3[r2] = e3[r2]);
          return t3.default = e3, t3;
        }(r(540)), s = (i = r(589)) && i.__esModule ? i : { default: i }, u = "3.17.0";
        function a(e3, t3, r2, n2, i2) {
          var u2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 300, c = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 5, f = e3.requestParams, l = f.url + "?" + t3, h = f.headers, y = o.mergeDeep({ method: "GET", headers: h, timeout: 3e4 }, r2);
          r2.debug && r2.logHandler("info", { url: l, option: y });
          var d = { url: l, option: y }, p = e3.plugins;
          if (p && void 0 !== p) for (var v = 0; v < p.length; v++) "function" == typeof p[v].onRequest && (d = p[v].onRequest(e3, d));
          (0, s.default)(d.url, d.option).then(function(o2) {
            r2.debug && r2.logHandler("info", o2);
            var s2 = o2.json();
            if (o2.ok && 200 === o2.status) s2.then(function(t4) {
              for (var r3 = 0; r3 < p.length && "function" == typeof p[r3].onResponse; r3++) t4 = p[r3].onResponse(e3, d, o2, t4);
              n2(t4);
            });
            else {
              var f2 = o2.status, l2 = o2.statusText;
              s2.then(function(s3) {
                var h2 = { error_message: s3.error_message, error_code: s3.error_code, errors: s3.errors, status: f2, statusText: l2 };
                r2.retryCondition && r2.retryCondition(o2) ? function(o3) {
                  if (0 === c) r2.debug && r2.logHandler("error", o3), i2(o3);
                  else {
                    var s4 = u2;
                    c -= 1;
                    var f3 = r2.retryLimit - c;
                    r2.retryDelayOptions && (r2.retryDelayOptions.base ? s4 = r2.retryDelayOptions.base * f3 : r2.retryDelayOptions.customBackoff && (s4 = r2.retryDelayOptions.customBackoff(f3, o3))), function(e4) {
                      return new Promise(function(t4) {
                        setTimeout(t4, e4);
                      });
                    }(s4).then(function() {
                      return a(e3, t3, r2, n2, i2, u2, c);
                    }).catch(function() {
                      return a(e3, t3, r2, n2, i2, u2, c);
                    });
                  }
                }(h2) : (r2.debug && r2.logHandler("error", h2), i2(h2));
              }).catch(function() {
                r2.debug && r2.logHandler("error", { status: f2, statusText: l2 }), i2({ status: f2, statusText: l2 });
              });
            }
          }).catch(function(e4) {
            r2.debug && r2.logHandler("error", e4), i2(e4);
          });
        }
      }, 540: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n = function(e3, t3) {
          if (Array.isArray(e3)) return e3;
          if (Symbol.iterator in Object(e3)) return function(e4, t4) {
            var r2 = [], n2 = true, i2 = false, o2 = void 0;
            try {
              for (var s2, u2 = e4[Symbol.iterator](); !(n2 = (s2 = u2.next()).done) && (r2.push(s2.value), !t4 || r2.length !== t4); n2 = true) ;
            } catch (e5) {
              i2 = true, o2 = e5;
            } finally {
              try {
                !n2 && u2.return && u2.return();
              } finally {
                if (i2) throw o2;
              }
            }
            return r2;
          }(e3, t3);
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        };
        t2.transform = function(e3) {
          return function() {
            switch (this._query[e3] = this._query[e3] || {}, arguments.length) {
              case 1:
                if (Array.isArray(arguments[0]) || "string" == typeof arguments[0]) {
                  var t3 = this._query[e3].BASE || [];
                  return t3 = t3.concat(arguments[0]), this._query[e3].BASE = t3, this;
                }
                console.error("Kindly provide valid parameters");
                break;
              case 2:
                if ("string" == typeof arguments[0] && (Array.isArray(arguments[1]) || "string" == typeof arguments[1])) {
                  var r2 = this._query[e3][arguments[0]] || [];
                  return r2 = r2.concat(arguments[1]), this._query[e3][arguments[0]] = r2, this;
                }
                console.error("Kindly provide valid parameters");
                break;
              default:
                console.error("Kindly provide valid parameters");
            }
          };
        }, t2._type = function(e3) {
          var t3 = void 0 === e3 ? "undefined" : i(e3);
          return "object" === t3 && Array.isArray(e3) && (t3 = "array"), t3;
        }, t2.mergeDeep = function(e3, t3) {
          var r2 = this;
          return function e4(t4, n2) {
            for (var i2 in n2) "object" == r2._type(n2[i2]) && r2._type(t4[i2]) == r2._type(n2[i2]) ? e4(t4[i2], n2[i2]) : "array" == r2._type(n2[i2]) && r2._type(t4[i2]) == r2._type(n2[i2]) ? t4[i2] = t4[i2].concat(n2[i2]) : t4[i2] = n2[i2];
          }(e3, t3), e3;
        }, t2.merge = a, t2.isBrowser = function() {
          return "undefined" != typeof window && "object" === ("undefined" == typeof process ? "undefined" : i(process)) && "browser" === process.title;
        }, t2.parseQueryFromParams = c, t2.getHash = f, t2.generateHash = l, t2.resultWrapper = h, t2.spreadResult = y, t2.sendRequest = function(e3, t3) {
          var r2 = e3.environment_uid;
          r2 ? e3._query.environment_uid = r2 : (e3._query || (e3._query = {}), e3._query.environment = e3.environment);
          var n2 = e3, s2 = void 0 !== n2.queryCachePolicy ? n2.queryCachePolicy : n2.cachePolicy, u2 = void 0 !== n2.tojson && n2.tojson, l2 = !!(n2.entry_uid || n2.singleEntry || n2.asset_uid), p = f(c(n2, l2, u2));
          if (e3 && e3.requestParams && e3.requestParams.body && e3.requestParams.body.query) {
            var v = JSON.parse(JSON.stringify(e3.requestParams.body.query));
            "object" !== (void 0 === v ? "undefined" : i(v)) && (v = JSON.parse(v)), delete e3.requestParams.body.query, e3.requestParams.body = a(e3.requestParams.body, v), e3.live_preview && true === e3.live_preview.enable && e3.live_preview.live_preview && "init" !== e3.live_preview.live_preview && (e3.live_preview.content_type_uid === e3.content_type_uid ? (e3.requestParams.body = a(e3.requestParams.body, { live_preview: e3.live_preview.live_preview || "init" }), s2 = 2, e3.requestParams.body.environment && delete e3.requestParams.body.environment, e3.requestParams.headers.access_token && delete e3.requestParams.headers.access_token, e3.requestParams.headers.authorization = e3.live_preview.management_token) : e3.live_preview.live_preview && (s2 = 1));
          }
          var _ = function() {
            return function(e4, t4) {
              return new Promise(function(r3, n3) {
                try {
                  e4 && n3(e4), u2 || (t4 = h(t4)), r3(y(t4));
                } catch (e5) {
                  n3(e5);
                }
              });
            };
          }, b = function(r3, i2, a2) {
            r3 && (0, o.default)(e3, t3).then((function(t4) {
              try {
                n2.entry_uid = n2.asset_uid = n2.tojson = n2.queryCachePolicy = void 0;
                var r4 = {}, o2 = {};
                if (e3.singleEntry) if (e3.singleEntry = false, t4.schema && (r4.schema = t4.schema), t4.content_type && (r4.content_type = t4.content_type, delete r4.schema), t4.entries && t4.entries.length) r4.entry = t4.entries[0];
                else {
                  if (!t4.assets || !t4.assets.length) return 2 === s2 && null !== n2.provider ? void n2.provider.get(p, _()) : a2({ error_code: 141, error_message: "The requested entry doesn't exist." });
                  r4.assets = t4.assets[0];
                }
                else t4.items ? o2 = { items: t4.items, pagination_token: t4.pagination_token, sync_token: t4.sync_token, total_count: t4.total_count } : r4 = t4;
                return -1 !== s2 && null !== n2.provider ? (n2.provider.set(p, r4, function(e4) {
                  try {
                    return e4 && a2(e4), u2 || (r4 = h(r4)), i2(y(r4));
                  } catch (e5) {
                    return a2(e5);
                  }
                }), i2(y(r4))) : Object.keys(o2).length ? i2(o2) : (u2 || (r4 = h(r4)), i2(y(r4)));
              } catch (e4) {
                return a2({ message: e4.message });
              }
            }).bind(n2)).catch(function(e4) {
              if (2 !== s2 || null === n2.provider) return a2(e4);
              n2.provider.get(p, _());
            });
          };
          switch (s2) {
            case 1:
              return new Promise(async function(r3, i2) {
                null !== n2.provider ? await n2.provider.get(p, async function(n3, o2) {
                  try {
                    if (n3 || !o2) b(true, r3, i2);
                    else {
                      try {
                        if (e3._query && Array.isArray(e3._query.include) && e3._query.include.length > 0) {
                          var s3 = (a2 = e3._query.include, c2 = {}, a2.forEach(function(e4) {
                            !function(e5) {
                              var t4 = (e5 = e5.replace(/[\[]/gm, ".").replace(/[\]]/gm, "")).split("."), r4 = t4.pop();
                              t4.reduce(function(e6, t5) {
                                return e6[t5] = e6[t5] || {};
                              }, c2)[r4] = {};
                            }(e4);
                          }), c2);
                          l2 ? await d(s3, o2.entry, e3, t3) : await Promise.all(o2.entries.map(async function(r4) {
                            await d(s3, r4, e3, t3);
                          }));
                        }
                      } catch (e4) {
                      }
                      try {
                        return u2 || (o2 = h(o2)), r3(y(o2));
                      } catch (e4) {
                        return i2(e4);
                      }
                    }
                  } catch (e4) {
                    return i2(e4);
                  }
                  var a2, c2;
                }) : b(true, r3, i2);
              });
            case 2:
            case 0:
            case void 0:
            case -1:
              return new Promise(function(e4, t4) {
                b(true, e4, t4);
              });
          }
          if (3 === s2) return new Promise(function(e4, t4) {
            null !== n2.provider && n2.provider.get(p, function(r3, n3) {
              try {
                r3 || !n3 ? t4(r3) : (u2 || (n3 = h(n3)), e4(y(n3)));
              } catch (e5) {
                t4(e5);
              }
            });
          }).then(function() {
            return new Promise(function(e4, t4) {
              b(true, e4, t4);
            });
          }).catch(function(e4) {
            return new Promise(function(e5, t4) {
              b(true, e5, t4);
            });
          });
        };
        var o = u(r(777)), s = u(r(324));
        function u(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        function a(e3, t3) {
          if (e3 && t3) for (var r2 in t3) e3[r2] = t3[r2];
          return e3;
        }
        function c(e3, t3, r2) {
          if (e3 && e3.requestParams) {
            var n2 = a({}, e3.requestParams.body && e3.requestParams.body.query || {});
            return n2.environment_uid && (delete n2.environment_uid, n2.environment = e3.environment), n2.environment = e3.environment, { content_type_uid: e3.content_type_uid, locale: n2.locale || "en-us", query: n2, entry_uid: e3.entry_uid, asset_uid: e3.asset_uid, single: t3 || "false", toJSON: r2 || "false", api_key: e3.requestParams.headers ? e3.requestParams.headers.api_key : "" };
          }
        }
        function f(e3) {
          try {
            var t3 = l(JSON.stringify(e3)), r2 = [];
            return r2.push(e3.content_type_uid), r2.push(e3.locale), e3.entry_uid && r2.push(e3.entry_uid), e3.asset_uid && r2.push(e3.asset_uid), r2.push(t3), r2.join(".");
          } catch (e4) {
          }
        }
        function l(e3) {
          var t3, r2 = 0, n2 = void 0;
          if (0 === e3.length) return r2;
          for (n2 = 0, t3 = e3.length; n2 < t3; n2++) r2 = (r2 << 5) - r2 + e3.charCodeAt(n2), r2 |= 0;
          return r2 < -1 ? -1 * r2 : r2;
        }
        function h(e3) {
          if (e3 && void 0 !== e3.entries) if (e3.entries && e3.entries.length) for (var t3 = 0, r2 = e3.entries.length; t3 < r2; t3++) e3.entries[t3] = (0, s.default)(e3.entries[t3]);
          else e3.entries = [];
          else if (e3 && e3.assets && void 0 !== e3.assets) if (e3.assets && e3.assets.length) for (var n2 = 0, i2 = e3.assets.length; n2 < i2; n2++) e3.assets[n2] = (0, s.default)(e3.assets[n2]);
          else e3.assets = [];
          else e3 && void 0 !== e3.entry ? e3.entry = (0, s.default)(e3.entry) : e3 && void 0 !== e3.asset ? e3.asset = (0, s.default)(e3.asset) : e3 && void 0 !== e3.items && (e3.items = (0, s.default)(e3.items).toJSON());
          return e3;
        }
        function y(e3) {
          var t3 = [];
          return e3 && Object.keys(e3).length && (void 0 !== e3.entries && (t3.push(e3.entries), e3.content_type && (t3.schema = e3.content_type)), void 0 !== e3.assets && t3.push(e3.assets), void 0 === e3.content_type && void 0 === e3.schema || t3.push(e3.content_type || e3.schema), void 0 !== e3.count && t3.push(e3.count), void 0 !== e3.entry && (t3 = e3.entry, e3.schema && (t3.schema = e3.schema), e3.content_type && (t3.content_type = e3.content_type)), void 0 !== e3.asset && (t3 = e3.asset), void 0 !== e3.items && t3.push(e3)), t3;
        }
        async function d(e3, t3, r2, i2, s2) {
          var u2 = r2.live_preview, a2 = r2.requestParams, c2 = u2.content_type_uid, f2 = u2.management_token;
          await async function e4(t4, s3, l2) {
            if (void 0 !== s3) if (Array.isArray(s3)) await Promise.all(s3.map(function(r3, n2) {
              return e4(t4, r3, function(e5) {
                s3[n2] = e5;
              });
            }));
            else if (s3._content_type_uid === c2) try {
              r2.requestParams = JSON.parse(JSON.stringify(a2));
              var h2 = function(e5) {
                var t5 = [];
                return function e6(r3, i3) {
                  0 === Object.keys(r3).length ? t5.push(i3.substring(1)) : Object.entries(r3).forEach(function(t6) {
                    var r4 = n(t6, 2), o2 = r4[0];
                    e6(r4[1], [i3, o2].join("."));
                  });
                }(e5, ""), t5.filter(function(e6) {
                  return "" !== e6;
                });
              }(t4);
              r2.requestParams.body.include = h2, r2.requestParams.body.live_preview = u2.live_preview, r2.requestParams.body.content_type_uid = c2;
              var y2 = u2.host.match(/^((http[s]?):(\/\/)?)?(.+)$/), d2 = (y2[1] || "https://") + y2[4], p = s3.uid, v = d2 + "/v3/content_types/" + s3._content_type_uid + "/entries/" + p;
              r2.requestParams.url = v, r2.requestParams.method = "GET", delete r2.requestParams.headers.access_token, r2.requestParams.headers.authorization = f2;
              var _ = await (0, o.default)(r2, i2);
              _.entry._content_type_uid = c2, _.entry.uid = p, l2(_.entry);
            } catch (e5) {
              console.log("errror", e5);
            }
            else await Promise.all(Object.entries(t4).map(async function(t5) {
              var r3 = n(t5, 2), i3 = r3[0], o2 = r3[1];
              await e4(o2, s3[i3], function() {
              });
            }));
          }(e3, t3, function() {
          });
        }
        Promise.prototype.spread || (Promise.prototype.spread = function(e3, t3) {
          return t3 = t3 || function(e4) {
          }, this.then(function(t4) {
            return e3.apply(e3, t4);
          }).catch(function(e4) {
            t3(e4);
          });
        });
      }, 173: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var r2 = 0; r2 < t3.length; r2++) {
              var n2 = t3[r2];
              n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e4, n2.key, n2);
            }
          }
          return function(t3, r2, n2) {
            return r2 && e3(t3.prototype, r2), n2 && e3(t3, n2), t3;
          };
        }(), i = function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t3[r2] = e3[r2]);
          return t3.default = e3, t3;
        }(r(540)), o = function() {
          function e3() {
            return function(e4, t3) {
              if (!(e4 instanceof t3)) throw new TypeError("Cannot call a class as a function");
            }(this, e3), this._query = {}, this.only = i.transform("only"), this;
          }
          return n(e3, [{ key: "toJSON", value: function() {
            return this.tojson = true, this;
          } }, { key: "addParam", value: function(e4, t3) {
            if (e4 && "string" == typeof e4 && t3 && "string" == typeof t3) return this._query[e4] = t3, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide a valid parameters.");
          } }, { key: "includeFallback", value: function() {
            return this._query.include_fallback = true, this;
          } }, { key: "includeMetadata", value: function() {
            return this._query.include_metadata = true, this;
          } }, { key: "fetch", value: function(e4) {
            if (this.asset_uid) {
              this.requestParams = { method: "POST", headers: this.headers, url: this.config.protocol + "://" + this.config.host + ":" + this.config.port + "/" + this.config.version + this.config.urls.assets + this.asset_uid, body: { _method: "GET", query: this._query } };
              var t3 = i.mergeDeep(this.fetchOptions, e4);
              return i.sendRequest(i.mergeDeep({}, this), t3);
            }
            e4.debug && e4.logHandler("error", "Kindly provide an asset uid. e.g. .Assets('asset_uid')");
          } }]), e3;
        }();
        t2.default = o;
      }, 304: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        }, i = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var r2 = 0; r2 < t3.length; r2++) {
              var n2 = t3[r2];
              n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e4, n2.key, n2);
            }
          }
          return function(t3, r2, n2) {
            return r2 && e3(t3.prototype, r2), n2 && e3(t3, n2), t3;
          };
        }(), o = function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t3[r2] = e3[r2]);
          return t3.default = e3, t3;
        }(r(540)), s = function() {
          function e3() {
            return function(e4, t3) {
              if (!(e4 instanceof t3)) throw new TypeError("Cannot call a class as a function");
            }(this, e3), this._query = {}, this.only = o.transform("only"), this.except = o.transform("except"), this;
          }
          return i(e3, [{ key: "setCacheProvider", value: function(e4) {
            return e4 && "object" === (void 0 === e4 ? "undefined" : n(e4)) && (this.provider = e4), this;
          } }, { key: "setCachePolicy", value: function(e4) {
            return "number" == typeof e4 && e4 >= -1 && e4 < 4 ? this._query ? this.queryCachePolicy = e4 : this.cachePolicy = e4 : this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide the valid policy"), this;
          } }, { key: "includeReference", value: function() {
            for (var e4 = arguments.length, t3 = Array(e4), r2 = 0; r2 < e4; r2++) t3[r2] = arguments[r2];
            if (Array.isArray(t3) || "string" == typeof t3) {
              if (arguments.length) for (var n2 = 0; n2 < arguments.length; n2++) this._query.include = this._query.include || [], this._query.include = this._query.include.concat(arguments[n2]);
              return this;
            }
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Argument should be a String or an Array.");
          } }, { key: "language", value: function(e4) {
            if (e4 && "string" == typeof e4) return this._query.locale = e4, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Argument should be a String.");
          } }, { key: "addQuery", value: function(e4, t3) {
            if (e4 && t3 && "string" == typeof e4) return this._query[e4] = t3, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "First argument should be a String.");
          } }, { key: "includeEmbeddedItems", value: function() {
            return this._query.include_embedded_items = ["BASE"], this;
          } }, { key: "includeSchema", value: function() {
            return this._query.include_schema = true, this;
          } }, { key: "includeReferenceContentTypeUID", value: function() {
            return this._query.include_reference_content_type_uid = true, this;
          } }, { key: "includeFallback", value: function() {
            return this._query.include_fallback = true, this;
          } }, { key: "includeBranch", value: function() {
            return this._query.include_branch = true, this;
          } }, { key: "includeMetadata", value: function() {
            return this._query.include_metadata = true, this;
          } }, { key: "includeContentType", value: function() {
            return this._query.include_content_type = true, this;
          } }, { key: "includeOwner", value: function() {
            return this._query.include_owner = true, this;
          } }, { key: "toJSON", value: function() {
            return this.tojson = true, this;
          } }, { key: "addParam", value: function(e4, t3) {
            if (e4 && t3 && "string" == typeof e4 && "string" == typeof t3) return this._query[e4] = t3, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          } }, { key: "fetch", value: function(e4) {
            var t3 = this.config.host + ":" + this.config.port;
            if (this.live_preview && true === this.live_preview.enable && this.live_preview.content_type_uid === this.content_type_uid && (t3 = this.live_preview.host), this.entry_uid) {
              this.requestParams = { method: "POST", headers: this.headers, url: this.config.protocol + "://" + t3 + "/" + this.config.version + this.config.urls.content_types + this.content_type_uid + this.config.urls.entries + this.entry_uid, body: { _method: "GET", query: this._query } };
              var r2 = o.mergeDeep(this.fetchOptions, e4);
              return o.sendRequest(o.mergeDeep({}, this), r2);
            }
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide an entry uid. e.g. .Entry('asset_uid')");
          } }]), e3;
        }();
        t2.default = s;
      }, 566: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n, i = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var r2 = 0; r2 < t3.length; r2++) {
              var n2 = t3[r2];
              n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e4, n2.key, n2);
            }
          }
          return function(t3, r2, n2) {
            return r2 && e3(t3.prototype, r2), n2 && e3(t3, n2), t3;
          };
        }(), o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        }, s = function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t3[r2] = e3[r2]);
          return t3.default = e3, t3;
        }(r(540)), u = (n = r(304)) && n.__esModule ? n : { default: n }, a = function(e3) {
          return function(t3, r2) {
            if (t3 && r2 && "string" == typeof t3 && void 0 !== r2) return this._query.query[t3] = this._query.query.file_size || {}, this._query.query[t3][e3] = r2, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          };
        }, c = function(e3) {
          var t3 = e3 ? "$in" : "$nin";
          return function(e4, r2) {
            if (e4 && r2 && "string" == typeof e4 && Array.isArray(r2)) return this._query.query[e4] = this._query.query[e4] || {}, this._query.query[e4][t3] = this._query.query[e4][t3] || [], this._query.query[e4][t3] = this._query.query[e4][t3].concat(r2), this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          };
        }, f = function(e3) {
          return function(t3) {
            if (t3 && "string" == typeof t3) return this._query.query[t3] = this._query.query[t3] || {}, this._query.query[t3].$exists = e3, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          };
        }, l = function(e3) {
          return function() {
            for (var t3 = [], r2 = 0, n2 = arguments.length; r2 < n2; r2++) arguments[r2] instanceof d && arguments[r2]._query.query ? t3.push(arguments[r2]._query.query) : "object" === o(arguments[r2]) && t3.push(arguments[r2]);
            return this._query.query[e3] ? this._query.query[e3] = this._query.query[e3].concat(t3) : this._query.query[e3] = t3, this;
          };
        }, h = function(e3) {
          return function(t3) {
            if (t3 && "string" == typeof t3) return this._query[e3] = t3, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Argument should be a string.");
          };
        }, y = function(e3) {
          return function(t3) {
            if ("number" == typeof t3) return this._query[e3] = t3, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Argument should be a number.");
          };
        }, d = function(e3) {
          function t3() {
            !function(e5, t4) {
              if (!(e5 instanceof t4)) throw new TypeError("Cannot call a class as a function");
            }(this, t3);
            var e4 = function(e5, t4) {
              if (!e5) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t4 || "object" != typeof t4 && "function" != typeof t4 ? e5 : t4;
            }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).call(this));
            return e4._query = e4._query || {}, e4._query.query = e4._query.query || {}, e4.lessThan = a("$lt"), e4.lessThanOrEqualTo = a("$lte"), e4.greaterThan = a("$gt"), e4.greaterThanOrEqualTo = a("$gte"), e4.notEqualTo = a("$ne"), e4.containedIn = c(true), e4.notContainedIn = c(false), e4.exists = f(true), e4.notExists = f(false), e4.ascending = h("asc"), e4.descending = h("desc"), e4.beforeUid = h("before_uid"), e4.afterUid = h("after_uid"), e4.skip = y("skip"), e4.limit = y("limit"), e4.or = l("$or"), e4.and = l("$and"), e4;
          }
          return function(e4, t4) {
            if ("function" != typeof t4 && null !== t4) throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
            e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
          }(t3, e3), i(t3, [{ key: "equalTo", value: function(e4, t4) {
            if (e4 && "string" == typeof e4) return this._query.query[e4] = t4, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          } }, { key: "where", value: function(e4, t4) {
            if (e4 && "string" == typeof e4) return this._query.query[e4] = t4, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          } }, { key: "count", value: function() {
            var e4 = this.config.protocol + "://" + this.config.host + ":" + this.config.port + "/" + this.config.version, t4 = this.type && "asset" === this.type ? e4 + this.config.urls.assets : e4 + this.config.urls.content_types + this.content_type_uid + this.config.urls.entries;
            return this._query.count = true, this.requestParams = { method: "POST", headers: this.headers, url: t4, body: { _method: "GET", query: this._query } }, this;
          } }, { key: "query", value: function(e4) {
            if ("object" === (void 0 === e4 ? "undefined" : o(e4))) return this._query.query = s.mergeDeep(this._query.query, e4), this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters");
          } }, { key: "referenceIn", value: function(e4, r2) {
            var n2 = {};
            return r2 instanceof t3 && r2._query.query ? n2.$in_query = r2._query.query : "object" === (void 0 === r2 ? "undefined" : o(r2)) && (n2.$in_query = r2), this._query.query[e4] ? this._query.query[e4] = this._query.query[e4].concat(n2) : this._query.query[e4] = n2, this;
          } }, { key: "referenceNotIn", value: function(e4, r2) {
            var n2 = {};
            return r2 instanceof t3 && r2._query.query ? n2.$nin_query = r2._query.query : "object" === (void 0 === r2 ? "undefined" : o(r2)) && (n2.$nin_query = r2), this._query.query[e4] ? this._query.query[e4] = this._query.query[e4].concat(n2) : this._query.query[e4] = n2, this;
          } }, { key: "tags", value: function(e4) {
            if (Array.isArray(e4)) return this._query.tags = e4, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters");
          } }, { key: "includeReferenceContentTypeUID", value: function() {
            return this._query.include_reference_content_type_uid = true, this;
          } }, { key: "includeCount", value: function() {
            return this._query.include_count = true, this;
          } }, { key: "addParam", value: function(e4, t4) {
            if (e4 && t4 && "string" == typeof e4 && "string" == typeof t4) return this._query[e4] = t4, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          } }, { key: "getQuery", value: function() {
            return this._query.query || {};
          } }, { key: "regex", value: function(e4, t4, r2) {
            if (e4 && t4 && "string" == typeof e4 && "string" == typeof t4) return this._query.query[e4] = { $regex: t4 }, r2 && (this._query.query[e4].$options = r2), this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          } }, { key: "search", value: function(e4) {
            if (e4 && "string" == typeof e4) return this._query.typeahead = e4, this;
            this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters.");
          } }, { key: "find", value: function(e4) {
            var t4 = this.config.host + ":" + this.config.port;
            this.type && "asset" !== this.type && this.live_preview && true === this.live_preview.enable && this.live_preview.content_type_uid === this.content_type_uid && (t4 = this.live_preview.host);
            var r2 = this.config.protocol + "://" + t4 + "/" + this.config.version, n2 = this.type && "asset" === this.type ? r2 + this.config.urls.assets : r2 + this.config.urls.content_types + this.content_type_uid + this.config.urls.entries;
            this.requestParams = { method: "POST", headers: this.headers, url: n2, body: { _method: "GET", query: this._query } };
            var i2 = s.mergeDeep(this.fetchOptions, e4);
            return s.sendRequest(s.mergeDeep({}, this), i2);
          } }, { key: "findOne", value: function() {
            var e4 = this.config.protocol + "://" + this.config.host + ":" + this.config.port + "/" + this.config.version;
            this.type && "asset" !== this.type && this.live_preview && true === this.live_preview.enable && this.live_preview.content_type_uid === this.content_type_uid && (e4 = this.config.protocol + "://" + this.live_preview.host + "/" + this.config.version);
            var t4 = this.type && "asset" === this.type ? e4 + this.config.urls.assets : e4 + this.config.urls.content_types + this.content_type_uid + this.config.urls.entries;
            this.singleEntry = true, this._query.limit = 1, this.requestParams = { method: "POST", headers: this.headers, url: t4, body: { _method: "GET", query: this._query } };
            var r2 = s.mergeDeep({}, this.fetchOptions);
            return s.sendRequest(s.mergeDeep({}, this), r2);
          } }]), t3;
        }(u.default);
        t2.default = d;
      }, 324: (e2, t2, r) => {
        var n = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var r2 = 0; r2 < t3.length; r2++) {
              var n2 = t3[r2];
              n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e4, n2.key, n2);
            }
          }
          return function(t3, r2, n2) {
            return r2 && e3(t3.prototype, r2), n2 && e3(t3, n2), t3;
          };
        }(), i = function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t3[r2] = e3[r2]);
          return t3.default = e3, t3;
        }(r(540)), o = function() {
          function e3(t3) {
            return function(e4, t4) {
              if (!(e4 instanceof t4)) throw new TypeError("Cannot call a class as a function");
            }(this, e3), t3 && (this.object = function() {
              return t3;
            }), this;
          }
          return n(e3, [{ key: "toJSON", value: function() {
            return this.object() ? i.mergeDeep(JSON.parse(JSON.stringify({})), this.object()) : null;
          } }, { key: "get", value: function(e4) {
            if (this.object() && e4) return e4.split(".").reduce(function(e5, t3) {
              return e5[t3];
            }, this.object());
          } }, { key: "getDownloadUrl", value: function(e4) {
            if (this.object()) {
              var t3 = this.object().url ? this.object().url : null;
              return t3 ? t3 + "?disposition=" + (e4 && "string" == typeof e4 ? e4 : "attachment") : null;
            }
          } }]), e3;
        }();
        e2.exports = function(e3) {
          return new o(e3);
        };
      }, 533: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        }, i = /* @__PURE__ */ function() {
          function e3(e4, t3) {
            for (var r2 = 0; r2 < t3.length; r2++) {
              var n2 = t3[r2];
              n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e4, n2.key, n2);
            }
          }
          return function(t3, r2, n2) {
            return r2 && e3(t3.prototype, r2), n2 && e3(t3, n2), t3;
          };
        }(), o = h(r(971)), s = function(e3) {
          if (e3 && e3.__esModule) return e3;
          var t3 = {};
          if (null != e3) for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t3[r2] = e3[r2]);
          return t3.default = e3, t3;
        }(r(540)), u = h(r(304)), a = h(r(173)), c = h(r(566)), f = h(r(777)), l = h(r(900));
        function h(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        var y = [408, 429], d = function() {
          function e3() {
            var t3 = this;
            !function(e4, t4) {
              if (!(e4 instanceof t4)) throw new TypeError("Cannot call a class as a function");
            }(this, e3), this.fetchOptions = { retryLimit: 5, retryCondition: function(e4) {
              return !!y.includes(e4.status);
            }, debug: false, logHandler: function(e4, t4) {
              "error" === e4 && t4 ? console.error("[error] " + t4) : "warning" === e4 && t4 ? console.warn("[warning] " + t4) : "info" === e4 && t4 && console.info("[info] " + t4);
            } }, this.config = s.mergeDeep({}, o.default), this.plugins = [];
            for (var r2 = arguments.length, i2 = Array(r2), u2 = 0; u2 < r2; u2++) i2[u2] = arguments[u2];
            switch (i2[0].region && void 0 !== i2[0].region && "us" !== i2[0].region && (this.config.host = i2[0].region + "-cdn.contentstack.com"), i2[0].fetchOptions && void 0 !== i2[0].fetchOptions && (this.fetchOptions = s.mergeDeep(this.fetchOptions, i2[0].fetchOptions)), i2[0].plugins && void 0 !== i2[0].plugins && i2[0].plugins.forEach(function(e4) {
              t3.plugins.push(e4);
            }), this.cachePolicy = l.default.policies.IGNORE_CACHE, this.provider = l.default.providers("localstorage"), i2.length) {
              case 1:
                if ("object" === n(i2[0]) && "string" == typeof i2[0].api_key && "string" == typeof i2[0].delivery_token && "string" == typeof i2[0].environment) return this.headers = { api_key: i2[0].api_key, access_token: i2[0].delivery_token }, "object" == n(i2[0].live_preview) && (this.live_preview = s.mergeDeep(this.config.live_preview, i2[0].live_preview)), "string" == typeof i2[0].branch && void 0 !== i2[0].branch && (this.headers.branch = i2[0].branch), this.environment = i2[0].environment, this;
                this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid object parameters. The specified API Key, Delivery Token, or Environment Name is invalid.");
              case 3:
                if (this.fetchOptions.debug && this.fetchOptions.logHandler("warning", "WARNING! Obsolete function called. Function 'Contentstack.Stack(api_key, delivery_token, environment)' has been deprecated, please use 'Contentstack.Stack({api_key, delivery_token, environment, region, branch, fetchOptions})' function instead!"), "string" == typeof i2[0] && "string" == typeof i2[1] && "string" == typeof i2[2]) return this.headers = { api_key: i2[0], access_token: i2[1] }, this.environment = i2[2], this;
                this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid string parameters.");
              case 4:
                return this.fetchOptions.debug && this.fetchOptions.logHandler("warning", "WARNING! Obsolete function called. Function 'Contentstack.Stack(api_key, delivery_token, environment)' has been deprecated, please use 'Contentstack.Stack({api_key, delivery_token, environment, region, branch, fetchOptions})' function instead!"), "string" == typeof i2[0] && "string" == typeof i2[1] && "string" == typeof i2[2] ? (this.headers = { api_key: i2[0], access_token: i2[1] }, this.environment = i2[2]) : this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid string parameters."), i2[3] && ("string" == typeof i2[3] && void 0 !== i2[3] && "us" !== i2[3] ? this.config.host = i2[3] + "-cdn.contentstack.com" : "object" === n(i2[3]) && (this.fetchOptions = s.mergeDeep(this.fetchOptions, i2[3]))), this;
              case 5:
                return this.fetchOptions.debug && this.fetchOptions.logHandler("warning", "WARNING! Obsolete function called. Function 'Contentstack.Stack(api_key, delivery_token, environment)' has been deprecated, please use 'Contentstack.Stack({api_key, delivery_token, environment, region, branch, fetchOptions})' function instead!"), "string" == typeof i2[0] && "string" == typeof i2[1] && "string" == typeof i2[2] ? (this.headers = { api_key: i2[0], access_token: i2[1] }, this.environment = i2[2]) : this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid string parameters."), i2[3] && ("string" == typeof i2[3] && void 0 !== i2[3] && "us" !== i2[3] ? this.config.host = i2[3] + "-cdn.contentstack.com" : "object" === n(i2[3]) && (this.fetchOptions = s.mergeDeep(this.fetchOptions, i2[3]))), i2[4] && "object" === n(i2[4]) && (this.fetchOptions = s.mergeDeep(this.fetchOptions, i2[4])), this;
              default:
                this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide valid parameters to initialize the Contentstack javascript-SDK Stack.");
            }
          }
          return i(e3, [{ key: "setPort", value: function(e4) {
            return "number" == typeof e4 && (this.config.port = e4), this;
          } }, { key: "setProtocol", value: function(e4) {
            return "string" == typeof e4 && ~["https", "http"].indexOf(e4) && (this.config.protocol = e4), this;
          } }, { key: "setHost", value: function(e4) {
            return "string" == typeof e4 && e4 && (this.config.host = e4), this;
          } }, { key: "setCachePolicy", value: function(e4) {
            return "number" == typeof e4 && e4 >= -1 && e4 < 4 ? this._query ? this.queryCachePolicy = e4 : this.cachePolicy = e4 : this.fetchOptions.debug && this.fetchOptions.logHandler("error", "Kindly provide the valid policy"), this;
          } }, { key: "livePreviewQuery", value: function(e4) {
            this.live_preview && (this.live_preview.live_preview = e4.live_preview || "init", this.live_preview.content_type_uid = e4.content_type_uid, this.live_preview.entry_uid = e4.entry_uid);
          } }, { key: "setCacheProvider", value: function(e4) {
            return e4 && "object" === (void 0 === e4 ? "undefined" : n(e4)) && (this.provider = e4), this;
          } }, { key: "clearByQuery", value: function() {
            if (this.provider && "function" == typeof this.provider.clearByQuery) return this.provider.clearByQuery.apply(this.provider, arguments);
          } }, { key: "clearByContentType", value: function() {
            if (this.provider && "function" == typeof this.provider.clearByContentType) return this.provider.clearByContentType.apply(this.provider, arguments);
          } }, { key: "clearAll", value: function() {
            if (this.provider && "function" == typeof this.provider.clearAll) return this.provider.clearAll.apply(this.provider, arguments);
          } }, { key: "getCacheProvider", value: function() {
            return this.provider;
          } }, { key: "ContentType", value: function(e4) {
            return e4 && "string" == typeof e4 && (this.content_type_uid = e4, this.type = "contentType"), this;
          } }, { key: "Entry", value: function(e4) {
            var t3 = new u.default();
            return e4 && "string" == typeof e4 && (t3.entry_uid = e4), s.merge(t3, this);
          } }, { key: "fetch", value: function(e4) {
            this.requestParams = { method: "POST", headers: this.headers, plugins: this.plugins, url: this.config.protocol + "://" + this.config.host + ":" + this.config.port + "/" + this.config.version + this.config.urls.content_types + this.content_type_uid, body: { _method: "GET", environment: this.environment } };
            var t3 = s.mergeDeep(this.fetchOptions, e4);
            return (0, f.default)(this, t3);
          } }, { key: "Assets", value: function(e4) {
            if (this.type = "asset", e4 && "string" == typeof e4) {
              var t3 = new a.default();
              return t3.asset_uid = e4, s.merge(t3, this);
            }
            return this;
          } }, { key: "Query", value: function() {
            var e4 = new c.default();
            return s.merge(e4, this);
          } }, { key: "getLastActivities", value: function() {
            return this.requestParams = { method: "POST", headers: this.headers, url: this.config.protocol + "://" + this.config.host + ":" + this.config.port + "/" + this.config.version + this.config.urls.content_types, body: { _method: "GET", only_last_activity: true, environment: this.environment } }, (0, f.default)(this, this.fetchOptions);
          } }, { key: "getContentTypes", value: function() {
            var e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (this.requestParams = { method: "POST", headers: this.headers, url: this.config.protocol + "://" + this.config.host + ":" + this.config.port + "/" + this.config.version + this.config.urls.content_types, body: { _method: "GET", environment: this.environment } }, e4) for (var t3 in e4) this.requestParams.body[t3] = e4[t3];
            return (0, f.default)(this, this.fetchOptions);
          } }, { key: "sync", value: function(e4, t3) {
            this._query = {}, this._query = s.mergeDeep(this._query, e4), this.requestParams = { method: "POST", headers: this.headers, url: this.config.protocol + "://" + this.config.host + ":" + this.config.port + "/" + this.config.version + this.config.urls.sync, body: { _method: "GET", query: this._query } };
            var r2 = s.mergeDeep(this.fetchOptions, t3);
            return s.sendRequest(s.mergeDeep({}, this), r2);
          } }, { key: "imageTransform", value: function(e4, t3) {
            if (e4 && "string" == typeof e4 && "object" === (void 0 === t3 ? "undefined" : n(t3)) && void 0 === t3.length) {
              var r2 = [];
              for (var i2 in t3) r2.push(i2 + "=" + t3[i2]);
              e4 += e4.indexOf("?") <= -1 ? "?" + r2.join("&") : "&" + r2.join("&");
            }
            return e4;
          } }]), e3;
        }();
        t2.default = d;
      }, 589: (e2, t2, r) => {
        Object.defineProperty(t2, "__esModule", { value: true });
        var n = o(r(483)), i = o(r(51));
        function o(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        }
        n.default.polyfill(), t2.default = i.default;
      }, 769: (e2, t2) => {
        Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function() {
          try {
            return window.localStorage;
          } catch (e3) {
            return null;
          }
        }();
      } }, t = {};
      return function r(n) {
        var i = t[n];
        if (void 0 !== i) return i.exports;
        var o = t[n] = { exports: {} };
        return e[n](o, o.exports, r), o.exports;
      }(32);
    })());
  }
});
export default require_contentstack();
/*! Bundled license information:

contentstack/dist/web/contentstack.js:
  (*! For license information please see contentstack.js.LICENSE.txt *)
*/
//# sourceMappingURL=contentstack.js.map
