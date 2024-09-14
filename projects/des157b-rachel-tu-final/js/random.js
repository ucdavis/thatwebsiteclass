(function() {
    // console.log("reading gallery.js");
    'use strict';


    curate();
    // Ordered from Newest to Oldest 
    async function curate() {
        const Cranes = Parse.Object.extend('Cranes');
        const query = new Parse.Query(Cranes);
        try {
            const results = await query.find();

            const indices = getRandom(results.length - 1);

            for (let i = 0; i < 3; i++) {
                let speech1 = document.querySelector(`#bubble${i+1} p`);
                speech1.innerHTML = upperFirst(results[indices[i]].get('text')) + "<br />" + "- " + upperAll(results[indices[i]].get('name'));;
                let color = results[indices[i]].get('color')
                switch (i) {
                    case 0:
                        document.getElementById("crane1").src = `../images/cranes/${color}.png`;
                        break;
                    case 1:
                        document.getElementById("crane2").src = `../images/cranesFacingLeft/${color}.png`;
                        break;
                    case 2:
                        document.getElementById("crane3").src = `../images/cranesFacingRight/${color}.png`;
                        break;

                    default:
                        break;
                }
            }
            document.querySelectorAll(".bubbleItem p").forEach(element => {
                fitty(element, {
                    minSize: 18,
                    maxSize: 30,
                });
            });
        } catch (error) {
            console.error('Error while fetching Cranes', error);
        }
    }

    document.getElementById("curateBtn").addEventListener("click", () => {
        curate();
    })

    // get three random indices to access data 
    function getRandom(max) {
        let ret = [-1, -1, -1];
        for (let i = 0; i < 3; i++) {
            let temp = Math.floor(Math.random() * max);
            while (ret.includes(temp)) {
                temp = Math.floor(Math.random() * max);
            }
            ret[i] = temp
        }
        return ret;
    }

    function upperAll(name) {
        name = name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return name;
    }

    function upperFirst(wish) {
        return wish.charAt(0).toUpperCase() + wish.slice(1);
    }



    /**
     * fitty v2.3.6 - Snugly resizes text to fit its parent container
     * Copyright (c) 2022 Rik Schennink <rik@pqina.nl> (https://pqina.nl/)
     */

    ! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).fitty = t() }(this, (function() {
        "use strict";
        return function(e) {
            if (e) {
                var t = function(e) { return [].slice.call(e) },
                    n = 0,
                    i = 1,
                    r = 2,
                    o = 3,
                    l = [],
                    u = null,
                    a = "requestAnimationFrame" in e ? function() { e.cancelAnimationFrame(u), u = e.requestAnimationFrame((function() { return f(l.filter((function(e) { return e.dirty && e.active }))) })) } : function() {},
                    c = function(e) { return function() { l.forEach((function(t) { return t.dirty = e })), a() } },
                    f = function(e) {
                        e.filter((function(e) { return !e.styleComputed })).forEach((function(e) { e.styleComputed = m(e) })), e.filter(y).forEach(v);
                        var t = e.filter(p);
                        t.forEach(d), t.forEach((function(e) { v(e), s(e) })), t.forEach(S)
                    },
                    s = function(e) { return e.dirty = n },
                    d = function(e) { e.availableWidth = e.element.parentNode.clientWidth, e.currentWidth = e.element.scrollWidth, e.previousFontSize = e.currentFontSize, e.currentFontSize = Math.min(Math.max(e.minSize, e.availableWidth / e.currentWidth * e.previousFontSize), e.maxSize), e.whiteSpace = e.multiLine && e.currentFontSize === e.minSize ? "normal" : "nowrap" },
                    p = function(e) { return e.dirty !== r || e.dirty === r && e.element.parentNode.clientWidth !== e.availableWidth },
                    m = function(t) { var n = e.getComputedStyle(t.element, null); return t.currentFontSize = parseFloat(n.getPropertyValue("font-size")), t.display = n.getPropertyValue("display"), t.whiteSpace = n.getPropertyValue("white-space"), !0 },
                    y = function(e) { var t = !1; return !e.preStyleTestCompleted && (/inline-/.test(e.display) || (t = !0, e.display = "inline-block"), "nowrap" !== e.whiteSpace && (t = !0, e.whiteSpace = "nowrap"), e.preStyleTestCompleted = !0, t) },
                    v = function(e) { e.element.style.whiteSpace = e.whiteSpace, e.element.style.display = e.display, e.element.style.fontSize = e.currentFontSize + "px" },
                    S = function(e) { e.element.dispatchEvent(new CustomEvent("fit", { detail: { oldValue: e.previousFontSize, newValue: e.currentFontSize, scaleFactor: e.currentFontSize / e.previousFontSize } })) },
                    h = function(e, t) { return function() { e.dirty = t, e.active && a() } },
                    b = function(e) { return function() { l = l.filter((function(t) { return t.element !== e.element })), e.observeMutations && e.observer.disconnect(), e.element.style.whiteSpace = e.originalStyle.whiteSpace, e.element.style.display = e.originalStyle.display, e.element.style.fontSize = e.originalStyle.fontSize } },
                    w = function(e) { return function() { e.active || (e.active = !0, a()) } },
                    z = function(e) { return function() { return e.active = !1 } },
                    F = function(e) { e.observeMutations && (e.observer = new MutationObserver(h(e, i)), e.observer.observe(e.element, e.observeMutations)) },
                    g = { minSize: 16, maxSize: 512, multiLine: !0, observeMutations: "MutationObserver" in e && { subtree: !0, childList: !0, characterData: !0 } },
                    W = null,
                    E = function() { e.clearTimeout(W), W = e.setTimeout(c(r), C.observeWindowDelay) },
                    M = ["resize", "orientationchange"];
                return Object.defineProperty(C, "observeWindow", {
                    set: function(t) {
                        var n = "".concat(t ? "add" : "remove", "EventListener");
                        M.forEach((function(t) { e[n](t, E) }))
                    }
                }), C.observeWindow = !0, C.observeWindowDelay = 100, C.fitAll = c(o), C
            }

            function x(e, t) {
                var n = Object.assign({}, g, t),
                    i = e.map((function(e) { var t = Object.assign({}, n, { element: e, active: !0 }); return function(e) { e.originalStyle = { whiteSpace: e.element.style.whiteSpace, display: e.element.style.display, fontSize: e.element.style.fontSize }, F(e), e.newbie = !0, e.dirty = !0, l.push(e) }(t), { element: e, fit: h(t, o), unfreeze: w(t), freeze: z(t), unsubscribe: b(t) } }));
                return a(), i
            }

            function C(e) { var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; return "string" == typeof e ? x(t(document.querySelectorAll(e)), n) : x([e], n)[0] }
        }("undefined" == typeof window ? null : window)
    }));

})();