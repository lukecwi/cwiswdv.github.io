"use strict";

/*********************************************************************
***
*Original Author: Luke Chulack                         
*Date Created: 02/26/2021                                     
*Version: 1.0                                           
*Date Last Modified: 02/26/2021                               
*Modified by: Luke Chulack        
*Modification log:  
    version 1.0 - 02/26/2021  - added the needed code for fullpage and built the hamburger menu following the outline hamburger menu of w3school. setup basic verification for form. 
***
******************************************************************** */


const $ = (e) => document.querySelector(e);


document.addEventListener("DOMContentLoaded", () => {



    // fullpage code
    new fullpage("#fullPage", {
        autoScrolling:true,
        navigation: true,
        anchors: ['home', 'about', 'work'],
        navigationTooltips: ["Home", "About", "My Work"]
    })



    // hamburger menu

    $("#menu").addEventListener("click", ()=>{

            $("#myNav").style.width = "100%";
            $("#home-div").classList.toggle("remove");

    });

    $(".closebtn").addEventListener("click", ()=>{

        $("#myNav").style.width = "0%";
        $("#home-div").classList.toggle("remove");

    });

    $("#about_btn_menu").addEventListener("click", ()=>{

        $("#myNav").style.width = "0%";
        $("#home-div").classList.toggle("remove");

    });

    // contact page



    $("#contact_1").addEventListener("click", ()=>{

            $("#contact_menu").style.width = "100%";
            $("#home-div").classList.toggle("remove");

    });

    $("#contact_2").addEventListener("click", ()=>{
        $("#myNav").style.width = "0%";
        $("#contact_menu").style.width = "100%";


    });



    $(".closebtn_contact").addEventListener("click", ()=>{

        $("#contact_menu").style.width = "0%";
        $("#home-div").classList.toggle("remove");

    });



    // form verification
    $("#send_form").addEventListener("click", ()=>{

        const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;

        let error = 0;



        if($("#name").value.trim() ==  "") {
            error += 1;
        }

    
    if($("#email").value.trim() ==  ""  || !emailPattern.test(email.value.trim()) )
    {
        error += 1;
    }

    if($("#msg").value.trim() ==  "")
    {
        error += 1;
    }

    if(error == 0) {
        alert("Form submited")
        $("#form_main").submit();
    }

});
    
});

