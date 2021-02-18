"use strict";

/*********************************************************************
***
*Original Author: Luke Chulack                         
*Date Created: 01/22/2021                                     
*Version: 4.0                                           
*Date Last Modified: 02/19/2021                               
*Modified by: Luke Chulack        
*Modification log:  

    version 1.0 - 01/22/2021 - contact page. 
    version 2.0 - 01/29/2021 - code for contact modal, email register, faq. 
    version 3.0 - 02/05/2021 - rebuilt things with jquery, added slideshow code, new faqs code.
    version 4.0 - 02/19/2021 -  added regular expressions for validation, added click sound for cart/ added to cart
***
******************************************************************** */



$(document).ready(() => {

    // sign up form 
    const sign_up = ()  => {

        const name_of_email_owner = $("#email_address_name");
        const name_email_adrress = $("#email_address_news");
        const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;

        let error = 0;


        if((name_of_email_owner.val()).trim() ==  "")
        {
            error += 1;
            name_of_email_owner.next().text("*");

        }

        if((name_email_adrress.val()).trim() ==  "" || !emailPattern.test((name_email_adrress.val()).trim()))
        {
            error += 1;
            name_email_adrress.next().text("*");
        }

        if(error == 0) {
            $("#email_form").submit();
        }

    }


    // constact send
    const send = () => {

        let error = 0;

        const email = $("#email_address");
        const phone = $("#phone");
        const country = $("#country");
        const comments= $("#comments");

        const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;



        if ((email.val()).trim()=="" || !emailPattern.test((email.val()).trim())) {
            error += 1;
            email.next().text("*");
        } 
        if ((phone.val()).trim()=="" || !phonePattern.test((phone.val()).trim())) {
            error += 1;
            phone.next().text("*");

        }
        if (country.val()=="") {
            error += 1;
            country.next().text("*");

        }
    
        if ((comments.val()).trim()=="") {
            error += 1;
            comments.next().text("*");
        }

        if(error==0) {

            $("#contact_form").submit();


        } else {


        }
    
    }



    // reset contact form 
    const reset_form = () => {
        $("#contact_form").trigger("reset");
        $("#contact_form span").text("");
    };



    //about slide show
    const show_on = () => {
        let next_slide = $("#slides img:first-child");

        if (next_slide.next().length == 0) {
            next_slide = $("#slides img:first-child");
        }
        else {
            next_slide = next_slide.next();
        }
        const next_slide_source = next_slide.attr("src");
        $("#a_slide").attr("src", next_slide_source).fadeIn(2000);                    
        


    }


    // event listener 
    $( document ).ready(() => { 

        //Listener for register form for contact
        $("#register").click( send);

        //Listener for reset form for contact
        $("#reset_form").click( reset_form);
    
        // Listener for email list
        $("#sign_up").click(sign_up);



        // slide show code

        let images = [];
        const a_image = new Image();

        $("#slides img").each((index, img) =>
        {    
            const image = new Image();
            image.src = $(img).attr("src");
            image.title = $(img).attr("alt");
            images[index] = image;

        });

        a_image.src = $("#a_slide").attr("src");
        a_image.title = $("a_slide").attr("alt");
        images[3] = a_image;


        let count = 0;
        setInterval(() =>  {

            $("#a_slide").fadeOut(1000,
                () => {
                    count++;
                    count = (count) % images.length;
                    const next_image = images[count];
                    $("#a_slide").attr("src", next_image.src).fadeIn(1000);                
                });    

        }, 5000);



    // faq
    $("#accordion").accordion({ 
        event: "click",
        heightStyle: "content",
        collapsible: true,
        active: false
    })

        });

        // cart maker

        let click_sound = new Audio("front-end/media/audio/sounds/click3.wav");

        $(".buy_button").click((evt) => {

            let the_id_name = evt.currentTarget.id;
            click_sound.play();
            $(`#${the_id_name}`).text('Added');
            $(`#${the_id_name}`).prepend('<i class="fa fa-shopping-cart"></i> ');
            $("#cart_num").text(parseInt($("#cart_num").text()) + 1);
            let cart_storage = localStorage.E14storage || ""; 
            localStorage.cart_storage = cart_storage.concat(cart_storage, "\n");
            localStorage.setItem("added_cart", the_id_name);

        });

    });




