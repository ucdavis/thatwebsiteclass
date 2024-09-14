(function() {
    console.log("reading index.js");
    'use strict';
    const nav = document.querySelector("#title nav");

    document.getElementById("landing-menu").addEventListener("click", (e) => {
        e.preventDefault();
        if (nav.className == "hidden") {
            nav.className = "showing";
        } else {
            nav.className = "hidden";
        }
    });

    // const galleryBtn = document.querySelector("#welcome button:first-of-type");
    // const galleryBtnTxt = document.querySelector("#welcome a:first-of-type");
    // const galleryBtnImg = document.querySelector("#welcome img:first-of-type");
    // galleryBtn.addEventListener("mouseover", (e) => {
    //     e.preventDefault();
    //     changeColor(galleryBtnTxt);
    // });

    // function changeColor(text, img) {
    //     text.style.color = "#FFFAF2";
    //     img.style.color = "#FFFAF2";
    // }

})();