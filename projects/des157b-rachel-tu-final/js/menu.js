(function() {
    console.log("reading menu.js");
    'use strict';

    const nav = document.querySelector("nav div");
    const menu = document.querySelector(".menu");
    menu.addEventListener("click", (e) => {
        e.preventDefault();
        if (nav.className == "hidden") {
            menu.src = "../images/x.png"
            nav.className = "showing";

            console.log("huh")
        } else {
            nav.className = "hidden";
            menu.src = "../images/menu.png"
        }
    });
})();