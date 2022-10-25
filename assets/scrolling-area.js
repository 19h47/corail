/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/scrolling-area@3.0.2/dist/main.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function (t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ScrollingArea = e() : t.ScrollingArea = e() }(window, function () {
	return function (t) { var e = {}; function n(i) { if (e[i]) return e[i].exports; var o = e[i] = { i: i, l: !1, exports: {} }; return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports } return n.m = t, n.c = e, n.d = function (t, e, i) { n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i }) }, n.r = function (t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, n.t = function (t, e) { if (1 & e && (t = n(t)), 8 & e) return t; if (4 & e && "object" == typeof t && t && t.__esModule) return t; var i = Object.create(null); if (n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var o in t) n.d(i, o, function (e) { return t[e] }.bind(null, o)); return i }, n.n = function (t) { var e = t && t.__esModule ? function () { return t.default } : function () { return t }; return n.d(e, "a", e), e }, n.o = function (t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, n.p = "", n(n.s = 5) }([function (t, e, n) { var i = n(6), o = n(7), r = n(8); t.exports = function (t, e) { return i(t) || o(t, e) || r() } }, function (t, e) { t.exports = function (t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } }, function (t, e) { function n(t, e) { for (var n = 0; n < e.length; n++) { var i = e[n]; i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } } t.exports = function (t, e, i) { return e && n(t.prototype, e), i && n(t, i), t } }, function (t, e, n) { (function (e) { for (var i = n(10), o = "undefined" == typeof window ? e : window, r = ["moz", "webkit"], s = "AnimationFrame", a = o["request" + s], l = o["cancel" + s] || o["cancelRequest" + s], h = 0; !a && h < r.length; h++)a = o[r[h] + "Request" + s], l = o[r[h] + "Cancel" + s] || o[r[h] + "CancelRequest" + s]; if (!a || !l) { var u = 0, c = 0, f = []; a = function (t) { if (0 === f.length) { var e = i(), n = Math.max(0, 1e3 / 60 - (e - u)); u = n + e, setTimeout(function () { var t = f.slice(0); f.length = 0; for (var e = 0; e < t.length; e++)if (!t[e].cancelled) try { t[e].callback(u) } catch (t) { setTimeout(function () { throw t }, 0) } }, Math.round(n)) } return f.push({ handle: ++c, callback: t, cancelled: !1 }), c }, l = function (t) { for (var e = 0; e < f.length; e++)f[e].handle === t && (f[e].cancelled = !0) } } t.exports = function (t) { return a.call(o, t) }, t.exports.cancel = function () { l.apply(o, arguments) }, t.exports.polyfill = function (t) { t || (t = o), t.requestAnimationFrame = a, t.cancelAnimationFrame = l } }).call(this, n(9)) }, function (t, e, n) { "use strict"; var i = n(12), o = n(13), r = n(14).Lethargy, s = n(15), a = (n(16), n(17)), l = "virtualscroll"; t.exports = d; var h = 37, u = 38, c = 39, f = 40, p = 32; function d(t) { a(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"), this.el = window, t && t.el && (this.el = t.el, delete t.el), this.options = i({ mouseMultiplier: 1, touchMultiplier: 2, firefoxMultiplier: 15, keyStep: 120, preventTouch: !1, unpreventTouchClass: "vs-touchmove-allowed", limitInertia: !1 }, t), this.options.limitInertia && (this._lethargy = new r), this._emitter = new o, this._event = { y: 0, x: 0, deltaX: 0, deltaY: 0 }, this.touchStartX = null, this.touchStartY = null, this.bodyTouchAction = null, void 0 !== this.options.passive && (this.listenerOptions = { passive: this.options.passive }) } d.prototype._notify = function (t) { var e = this._event; e.x += e.deltaX, e.y += e.deltaY, this._emitter.emit(l, { x: e.x, y: e.y, deltaX: e.deltaX, deltaY: e.deltaY, originalEvent: t }) }, d.prototype._onWheel = function (t) { var e = this.options; if (!this._lethargy || !1 !== this._lethargy.check(t)) { var n = this._event; n.deltaX = t.wheelDeltaX || -1 * t.deltaX, n.deltaY = t.wheelDeltaY || -1 * t.deltaY, s.isFirefox && 1 == t.deltaMode && (n.deltaX *= e.firefoxMultiplier, n.deltaY *= e.firefoxMultiplier), n.deltaX *= e.mouseMultiplier, n.deltaY *= e.mouseMultiplier, this._notify(t) } }, d.prototype._onMouseWheel = function (t) { if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) { var e = this._event; e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, this._notify(t) } }, d.prototype._onTouchStart = function (t) { var e = t.targetTouches ? t.targetTouches[0] : t; this.touchStartX = e.pageX, this.touchStartY = e.pageY }, d.prototype._onTouchMove = function (t) { var e = this.options; e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault(); var n = this._event, i = t.targetTouches ? t.targetTouches[0] : t; n.deltaX = (i.pageX - this.touchStartX) * e.touchMultiplier, n.deltaY = (i.pageY - this.touchStartY) * e.touchMultiplier, this.touchStartX = i.pageX, this.touchStartY = i.pageY, this._notify(t) }, d.prototype._onKeyDown = function (t) { var e = this._event; e.deltaX = e.deltaY = 0; var n = window.innerHeight - 40; switch (t.keyCode) { case h: case u: e.deltaY = this.options.keyStep; break; case c: case f: e.deltaY = -this.options.keyStep; break; case p && t.shiftKey: e.deltaY = n; break; case p: e.deltaY = -n; break; default: return }this._notify(t) }, d.prototype._bind = function () { s.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions), s.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), s.hasTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), s.hasPointer && s.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.el.addEventListener("MSPointerDown", this._onTouchStart, !0), this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)), s.hasKeyDown && document.addEventListener("keydown", this._onKeyDown) }, d.prototype._unbind = function () { s.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel), s.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel), s.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)), s.hasPointer && s.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)), s.hasKeyDown && document.removeEventListener("keydown", this._onKeyDown) }, d.prototype.on = function (t, e) { this._emitter.on(l, t, e); var n = this._emitter.e; n && n[l] && 1 === n[l].length && this._bind() }, d.prototype.off = function (t, e) { this._emitter.off(l, t, e); var n = this._emitter.e; (!n[l] || n[l].length <= 0) && this._unbind() }, d.prototype.reset = function () { var t = this._event; t.x = 0, t.y = 0 }, d.prototype.destroy = function () { this._emitter.off(), this._unbind() } }, function (t, e, n) { "use strict"; n.r(e), n.d(e, "default", function () { return p }); var i = n(0), o = n.n(i), r = n(1), s = n.n(r), a = n(2), l = n.n(a), h = n(3), u = n.n(h), c = n(4), f = n.n(c), p = function () { function t(e, n) { s()(this, t), this.on = { scroll: this.scroll.bind(this), resize: this.resize.bind(this), update: this.update.bind(this) }, this.$el = e; var i = o()(this.$el.children, 1); this.$child = i[0], this.options = Object.assign({ container: n.container || this.$el }, n), this.vars = { bottom: 0, spring: .1, target: 0, value: 0 }, this.vs = new f.a, this.raf = u.a } return l()(t, [{ key: "init", value: function () { return this.initElements(), this.on.resize(), !(Math.round(this.width - this.containerWidth) < 0) && this.initEvents() } }, { key: "initEvents", value: function () { this.vs.on(this.on.scroll), this.raf(this.on.update), window.addEventListener("resize", this.on.resize) } }, { key: "initElements", value: function () { this.$child.style.setProperty("display", "inline-block"), this.$child.style.setProperty("white-space", "nowrap") } }, { key: "scroll", value: function () { var t = (window.pageYOffset + this.windowArea - this.top) / this.windowArea * 100; this.vars.target = Math.max(0, Math.min(t, 100)) } }, { key: "resize", value: function () { var t = this.$child.getBoundingClientRect(); this.width = t.width, this.height = t.height, this.top = t.top + window.pageYOffset - this.$child.clientTop, this.containerWidth = this.options.container.clientWidth, this.windowArea = window.innerHeight - this.height } }, { key: "update", value: function () { this.vars.value += (this.vars.target - this.vars.value) * this.vars.spring; var t = Math.round(this.vars.value * Math.abs(this.width - this.containerWidth) / 100); return this.$child.style.transform = "translate3d(".concat(-1 * t, "px, 0, 0)"), this.raf(this.on.update) } }]), t }() }, function (t, e) { t.exports = function (t) { if (Array.isArray(t)) return t } }, function (t, e) { t.exports = function (t, e) { var n = [], i = !0, o = !1, r = void 0; try { for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (n.push(s.value), !e || n.length !== e); i = !0); } catch (t) { o = !0, r = t } finally { try { i || null == a.return || a.return() } finally { if (o) throw r } } return n } }, function (t, e) { t.exports = function () { throw new TypeError("Invalid attempt to destructure non-iterable instance") } }, function (t, e) { var n; n = function () { return this }(); try { n = n || new Function("return this")() } catch (t) { "object" == typeof window && (n = window) } t.exports = n }, function (t, e, n) { (function (e) { (function () { var n, i, o, r, s, a; "undefined" != typeof performance && null !== performance && performance.now ? t.exports = function () { return performance.now() } : null != e && e.hrtime ? (t.exports = function () { return (n() - s) / 1e6 }, i = e.hrtime, r = (n = function () { var t; return 1e9 * (t = i())[0] + t[1] })(), a = 1e9 * e.uptime(), s = r - a) : Date.now ? (t.exports = function () { return Date.now() - o }, o = Date.now()) : (t.exports = function () { return (new Date).getTime() - o }, o = (new Date).getTime()) }).call(this) }).call(this, n(11)) }, function (t, e) { var n, i, o = t.exports = {}; function r() { throw new Error("setTimeout has not been defined") } function s() { throw new Error("clearTimeout has not been defined") } function a(t) { if (n === setTimeout) return setTimeout(t, 0); if ((n === r || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0); try { return n(t, 0) } catch (e) { try { return n.call(null, t, 0) } catch (e) { return n.call(this, t, 0) } } } !function () { try { n = "function" == typeof setTimeout ? setTimeout : r } catch (t) { n = r } try { i = "function" == typeof clearTimeout ? clearTimeout : s } catch (t) { i = s } }(); var l, h = [], u = !1, c = -1; function f() { u && l && (u = !1, l.length ? h = l.concat(h) : c = -1, h.length && p()) } function p() { if (!u) { var t = a(f); u = !0; for (var e = h.length; e;) { for (l = h, h = []; ++c < e;)l && l[c].run(); c = -1, e = h.length } l = null, u = !1, function (t) { if (i === clearTimeout) return clearTimeout(t); if ((i === s || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t); try { i(t) } catch (e) { try { return i.call(null, t) } catch (e) { return i.call(this, t) } } }(t) } } function d(t, e) { this.fun = t, this.array = e } function v() { } o.nextTick = function (t) { var e = new Array(arguments.length - 1); if (arguments.length > 1) for (var n = 1; n < arguments.length; n++)e[n - 1] = arguments[n]; h.push(new d(t, e)), 1 !== h.length || u || a(p) }, d.prototype.run = function () { this.fun.apply(null, this.array) }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = v, o.addListener = v, o.once = v, o.off = v, o.removeListener = v, o.removeAllListeners = v, o.emit = v, o.prependListener = v, o.prependOnceListener = v, o.listeners = function (t) { return [] }, o.binding = function (t) { throw new Error("process.binding is not supported") }, o.cwd = function () { return "/" }, o.chdir = function (t) { throw new Error("process.chdir is not supported") }, o.umask = function () { return 0 } }, function (t, e, n) {
		"use strict";
 /*
 object-assign
 (c) Sindre Sorhus
 @license MIT
 */var i = Object.getOwnPropertySymbols, o = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable; t.exports = function () { try { if (!Object.assign) return !1; var t = new String("abc"); if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1; for (var e = {}, n = 0; n < 10; n++)e["_" + String.fromCharCode(n)] = n; if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) { return e[t] }).join("")) return !1; var i = {}; return "abcdefghijklmnopqrst".split("").forEach(function (t) { i[t] = t }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("") } catch (t) { return !1 } }() ? Object.assign : function (t, e) { for (var n, s, a = function (t) { if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined"); return Object(t) }(t), l = 1; l < arguments.length; l++) { for (var h in n = Object(arguments[l])) o.call(n, h) && (a[h] = n[h]); if (i) { s = i(n); for (var u = 0; u < s.length; u++)r.call(n, s[u]) && (a[s[u]] = n[s[u]]) } } return a }
	}, function (t, e) { function n() { } n.prototype = { on: function (t, e, n) { var i = this.e || (this.e = {}); return (i[t] || (i[t] = [])).push({ fn: e, ctx: n }), this }, once: function (t, e, n) { var i = this; function o() { i.off(t, o), e.apply(n, arguments) } return o._ = e, this.on(t, o, n) }, emit: function (t) { for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), i = 0, o = n.length; i < o; i++)n[i].fn.apply(n[i].ctx, e); return this }, off: function (t, e) { var n = this.e || (this.e = {}), i = n[t], o = []; if (i && e) for (var r = 0, s = i.length; r < s; r++)i[r].fn !== e && i[r].fn._ !== e && o.push(i[r]); return o.length ? n[t] = o : delete n[t], this } }, t.exports = n }, function (t, e, n) { (function () { (null !== e ? e : this).Lethargy = function () { function t(t, e, n, i) { this.stability = null != t ? Math.abs(t) : 8, this.sensitivity = null != e ? 1 + Math.abs(e) : 100, this.tolerance = null != n ? 1 + Math.abs(n) : 1.1, this.delay = null != i ? i : 150, this.lastUpDeltas = function () { var t, e, n; for (n = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)n.push(null); return n }.call(this), this.lastDownDeltas = function () { var t, e, n; for (n = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)n.push(null); return n }.call(this), this.deltasTimestamp = function () { var t, e, n; for (n = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)n.push(null); return n }.call(this) } return t.prototype.check = function (t) { var e; return null != (t = t.originalEvent || t).wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), e > 0 ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1)) }, t.prototype.isInertia = function (t) { var e, n, i, o, r, s, a; return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (i = e.slice(0, this.stability), n = e.slice(this.stability, 2 * this.stability), a = i.reduce(function (t, e) { return t + e }), r = n.reduce(function (t, e) { return t + e }), s = a / i.length, o = r / n.length, Math.abs(s) < Math.abs(o * this.tolerance) && this.sensitivity < Math.abs(o) && t) }, t.prototype.showLastUpDeltas = function () { return this.lastUpDeltas }, t.prototype.showLastDownDeltas = function () { return this.lastDownDeltas }, t }() }).call(this) }, function (t, e, n) { "use strict"; t.exports = { hasWheelEvent: "onwheel" in document, hasMouseWheelEvent: "onmousewheel" in document, hasTouch: "ontouchstart" in document, hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1, hasPointer: !!window.navigator.msPointerEnabled, hasKeyDown: "onkeydown" in document, isFirefox: navigator.userAgent.indexOf("Firefox") > -1 } }, function (t, e, n) { "use strict"; t.exports = function (t) { return JSON.parse(JSON.stringify(t)) } }, function (t, e, n) { "use strict"; var i = Object.prototype.toString, o = Object.prototype.hasOwnProperty; function r(t, e) { return function () { return t.apply(e, arguments) } } t.exports = function (t) { if (!t) return console.warn("bindAll requires at least one argument."); var e = Array.prototype.slice.call(arguments, 1); if (0 === e.length) for (var n in t) o.call(t, n) && "function" == typeof t[n] && "[object Function]" == i.call(t[n]) && e.push(n); for (var s = 0; s < e.length; s++) { var a = e[s]; t[a] = r(t[a], t) } } }])
});