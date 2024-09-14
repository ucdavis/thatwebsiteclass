(function(){
    'use strict';

    Parse.initialize("fLAKAxA5Ae9HtP4gwEXSV2zo3lq3ihVafgKjAdKR","i3cxdfhXpn5XtdC0GKcQ4IfyY7fR2wMVXvnx1lUn"); 
    Parse.serverURL = 'https://parseapi.back4app.com/';

        // Script for home and index page
     new kursor({
        type: 2,
        // removeDefaultCursor: true,
        color: "#ffffff"
    });
    const info = document.getElementById('info');
    const overlayInfo = document.getElementById('overlay_info');
    const infoInside = document.getElementById('inside');
    const inside = document.getElementById("inside");
    const close = document.querySelector('#overlay_info button');
    const add = document.getElementById('add');
    const form = document.getElementById('form');
    const submitForm = document.getElementById('actualform');
    const view = document.getElementById('view');
    const texta = document.getElementById('story');
    const area = document.getElementById('area');
    const subs = document.getElementById('subs');
    const backform = document.getElementById('formback');
    // const submit = document.querySelector('');
    const inputs = document.querySelectorAll('#actualform textarea:not([type=submit])');
    const inputList = document.querySelector('#container');
    const body = document.querySelector('body');

    body.style.overflowY = "scroll";

    

    async function displayInput(){
        const input = Parse.Object.extend('Input');
        const query = new Parse.Query(input);
        try{     
            const result = await query.descending('createdAt').find();
            // console.log(result);
            result.forEach( function( eachInput ){
                const id = eachInput.id;
                const text = eachInput.get('text');

                const theListItem = document.createElement("div");
                theListItem.setAttribute("id", `r-${id}`);
                theListItem.innerHTML = `<blockquote class="blockq">${text}</blockquote>`;

                inputList.append(theListItem);
            } );
        } catch (error){
            console.log('Error while fetching Inputs', error)
        }
    }

    displayInput();


    view.addEventListener('click',function(event){
        event.preventDefault();
        form.style.left = '-20000px';
        area.style.height = "0";
        area.style.opacity = "0";
        texta.style.height = "0px";
        texta.style.width = "0px";
        subs.style.opacity = "1";

    })
    
    subs.addEventListener('click',function(event){
        event.preventDefault();
        area.style.height = "200px";
        area.style.opacity = "1";
        texta.style.height = "150px";
        texta.style.width = "400px";
        subs.style.opacity = "0";

    })

    add.addEventListener('click',function(event){
        event.preventDefault();
        form.style.left = '0px';
        subs.style.opacity = "1";
    })

    backform.addEventListener('click',function(event){
        event.preventDefault();
        form.style.left = '-20000px';
        area.style.height = "0";
        area.style.opacity = "0";
        texta.style.height = "0px";
        texta.style.width = "0px";
        subs.style.opacity = "1";

    })

    submitForm.addEventListener('submit',function(event){
        event.preventDefault();
        console.log('done');
        form.style.left = '-20000px';
        area.style.height = "0";
        area.style.opacity = "0";
        texta.style.height = "0px";
        texta.style.width = "0px";
        subs.style.opacity = "1";
        addInput();
    
        document.querySelector("#form form").reset();    
    });

    async function addInput(){
        const newInput = {};

        for(let i=0; i<inputs.length; i++){
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newInput[key] = value;
            console.log(key);
        }
        if(newInput.story != ""){
            const newInputData = new Parse.Object('Input');
            newInputData.set('text', newInput.story);                
            alert('Thank you for your entry :)');

            try{
                const result = await newInputData.save();
                console.log(result);
                resetFormFields();
                form.style.left = '-20000px';
                inputList.innerHTML = '';
                displayInput();

            }catch(error){
                console.error("error while creating input", error);
            }
        } else {
            form.style.left = '-20000px';
        }
    }
   
    //helper functions
    function resetFormFields(){
        document.getElementById('story').value = "";
    }
   //more info:  
    info.addEventListener('click',function(event){
        event.preventDefault();
        
        overlayInfo.style.opacity = "1";	 
        overlayInfo.style.width = "99vw";
        infoInside.style.width = "60vw";
        overlayInfo.style.zIndex = "1";
        inside.style.width = "60vw";
        inside.style.padding = "100px";
   
    })
 
    close.addEventListener('click', function(event){
        event.preventDefault();
        overlayInfo.style.opacity = "0";
        overlayInfo.style.width = "0vw";
        overlayInfo.style.zIndex = "0";
        infoInside.style.width = "0vw";
        inside.style.width = "0vw";
        inside.style.padding = "0";

    })

    let scrollPos = 1;
    const up = document.querySelector('#up');

    up.addEventListener("click", function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if(  document.body.scrollTop < 1){
            up.style.opacity = "0";

        }
    })
    window.addEventListener('scroll', function(){
        up.style.opacity = "1";
    })

    

    // function checkPos(){
    //     let windowY = window.screenY;
    //     if(windowY < scrollPos){
    //         up.style.opacity = "0";
    //     } else{
    //         up.style.opacity = "1";
    //     }   
    //     scrollPos = windowY;

    //     console.log(windowY);
    // }

    // window.addEventListener('scroll',checkPos);

})();

