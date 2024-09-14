(function() {
    // console.log("reading gallery.js");
    'use strict';

    // Ordered from Newest to Oldest 
    (async() => {
        const Cranes = Parse.Object.extend('Cranes');
        const query = new Parse.Query(Cranes);
        try {
            const results = await query.find();
            let totalCranes = results.length - 1;
            for (let i = totalCranes; i >= 0; i--) {
                // Access the Parse Object attributes using the .GET method
                const color = results[i].get('color')
                let img = `../images/cranes/${color}.png`;

                const name = results[i].get('name')

                // create new item element
                var fragment = document.createDocumentFragment();
                var elem = getItemElement(img);
                const wish = document.createElement("p");
                wish.innerHTML = upperFirst(results[i].get('text')) + "<br />" + "- " + upperAll(results[i].get('name'));
                //wish.textcontent
                elem.appendChild(wish);
                fragment.appendChild(elem);
                // append elements to container
                grid.appendChild(fragment);
                // add and lay out newly appended elements
                msnry.appended(elem);

            }
            const divs = document.querySelectorAll(".grid-item");
            const imgs = document.querySelectorAll(".grid-item img");
            const wishes = document.querySelectorAll(".grid-item p");
            for (let i = totalCranes; i >= 0; i--) {
                let tempSrc = imgs[i].src;
                divs[i].addEventListener("mouseover", (e) => {
                    e.preventDefault();
                    imgs[i].src = "../images/paper.png";
                    imgs[i].style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.25)"
                    wishes[i].style.zIndex = "1";
                    wishes[i].style.opacity = "1";

                })
                divs[i].addEventListener("mouseout", (e) => {
                    e.preventDefault();
                    imgs[i].style.boxShadow = "none";
                    imgs[i].src = tempSrc;
                    wishes[i].style.zIndex = "-1";
                    wishes[i].style.opacity = "0";
                })
            }
            document.querySelectorAll(".grid-item p").forEach(element => {
                fitty(element, {
                    minSize: 19,
                    maxSize: 35,
                });
            });

        } catch (error) {
            console.error('Error while fetching Cranes', error);
        }
    })();
    var grid = document.querySelector('.grid');
    var msnry = new Masonry(grid, {
        columnWidth: 200,
        itemSelector: '.grid-item',
        fitWidth: true
    });

    // create <img class=".grid-item">
    function getItemElement(img) {
        var elem = document.createElement('div');
        const craneImg = document.createElement("img");
        craneImg.src = img;
        elem.appendChild(craneImg);
        elem.className = 'grid-item';

        return elem;
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


// Newest to Oldest 
// async function retrieveData() {
//     const Cranes = Parse.Object.extend('Cranes');
//     const query = new Parse.Query(Cranes);
//     try {
//         const results = await query.find();
//         // if (totalCranes == 0) {
//         let totalCranes = results.length - 1;
//         //     // console.log(totalCranes);
//         // }
//         for (let i = totalCranes; i >= 0; i--) {

//             // Access the Parse Object attributes using the .GET method
//             const color = results[i].get('color')
//             let img = `../images/cranes/${color}.png`;

//             const text = results[i].get('text')
//             const name = results[i].get('name')
//                 // console.log(color);
//                 // console.log(text);
//                 // console.log(name);
//                 // grid.innerHTML += `<div class="grid-item"><img src=${img}></div>`

//             // create new item elements
//             var elems = [];
//             var fragment = document.createDocumentFragment();
//             var elem = getItemElement(img);
//             fragment.appendChild(elem);
//             elems.push(elem);
//             // append elements to container
//             grid.appendChild(fragment);
//             // add and lay out newly appended elements
//             msnry.appended(elems);


//         }
//     } catch (error) {
//         console.error('Error while fetching Cranes', error);
//     }
// };


// Oldest to Newest
// async function retrieveData() {
//     const Cranes = Parse.Object.extend('Cranes');
//     const query = new Parse.Query(Cranes);

//     try {
//         const results = await query.find();
//         for (const object of results) {

//             // Access the Parse Object attributes using the .GET method
//             const color = object.get('color')
//             let img = `../images/cranes/${color}.png`;

//             const text = object.get('text')
//             const name = object.get('name')

//             // create new item elements
//             var elems = [];
//             var fragment = document.createDocumentFragment();
//             var elem = getItemElement(img);
//             fragment.appendChild(elem);
//             elems.push(elem);
//             // append elements to container
//             grid.appendChild(fragment);
//             // add and lay out newly appended elements
//             msnry.appended(elems);


//         }
//     } catch (error) {
//         console.error('Error while fetching Cranes', error);
//     }
// };