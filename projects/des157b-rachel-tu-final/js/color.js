(function() {
    console.log("reading color.js");
    'use strict';

    var flag = 0;
    const paper = document.getElementById("paper");
    const circles = document.querySelectorAll(".circle");
    circles.forEach(circle => {
        circle.addEventListener("click", () => {
            if (paper.style.border != "none") { paper.style.border = "none"; }
            circles.forEach(c => {
                c.style.border = "none";
            });
            circle.style.border = "1px #472A2A solid";
            paper.style.backgroundColor = window.getComputedStyle(circle).backgroundColor;
            storeColor(window.getComputedStyle(circle).backgroundColor);
        });
    });

    document.querySelector("#goToWriting").addEventListener("click", (e) => {
        // e.preventDefault();
        if (flag == 0) {
            e.preventDefault();
            alert("Please select a color before moving on")
        }
    });

    function storeColor(color) {
        flag = 1;
        var colorName;
        switch (color) {
            case "rgb(240, 131, 131)":
                colorName = "red";
                break;
            case "rgb(177, 230, 254)":
                colorName = "blue";
                break;
            case "rgb(174, 183, 229)":
                colorName = "purple";
                break;
            case "rgb(255, 225, 135)":
                colorName = "yellow";
                break;
            case "rgb(255, 191, 237)":
                colorName = "pink";
                break;
            case "rgb(170, 219, 155)":
                colorName = "green";
                break;

            default:
                break;
        }

        localStorage.setItem("myJson", colorName); //save data
    }
})();