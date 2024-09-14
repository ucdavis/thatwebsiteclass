(function() {
    console.log("reading writing.js");
    'use strict';

    const text = document.getElementById("text")
    const name = document.getElementById("name")
    const target = document.getElementById("target");
    const form = document.getElementById("writingHeart");
    const foldingPg = document.getElementById("folding");
    const writingPg = document.getElementById("writing");
    const color = getColor();

    getCrane(color);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (text.value.length > 100) {
            alert("Sorry, your message is over the max length. Please shorten it to under 100 characters.")
            return false;
        } else {
            addEntry();
        }
    })

    async function addEntry() {
        const newCrane = new Parse.Object('Cranes');
        newCrane.set("color", color);
        newCrane.set("name", name.value);
        newCrane.set("text", text.value);

        try {
            const result = await newCrane.save();
            resetFormFields();
            writingPg.className = "pgHidden";
            foldingPg.className = "pgShowing";
            setTimeout(() => {
                document.getElementById("magicBtns").style.opacity = "1";
            }, 6000);

        } catch (error) {
            console.error('Error while creating Cranes: ', error);
        }
    }

    function resetFormFields() {
        text.value = "";
        name.value = "";
    }

    function getCrane(color) {
        let img = `../images/loading/${color}.gif`;
        target.src = img;
    }

    function getColor() {
        if (localStorage.getItem("myJson") !== null) {
            var passedJson = localStorage.getItem("myJson"); //get saved data anytime
            return passedJson;
        }
    }

    // For menu on "Folding Your Crane" page
    const nav = document.querySelector("#folding nav div");
    document.getElementById("foldingMenu").addEventListener("click", (e) => {
        e.preventDefault();
        if (nav.className == "hidden") {
            nav.className = "showing";
        } else {
            nav.className = "hidden";
        }
    });
})();