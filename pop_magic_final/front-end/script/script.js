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
    version 4.0 - 02/19/2021 -  added regular expressions for validation, added click sound for cart/ added to cart. made cart.
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



        /*
    // faq
    $("#accordion").accordion({ 
        event: "click",
        heightStyle: "content",
        collapsible: true,
        active: false
    })
*/
        });


        // cart maker


        const set_button = (buy_button_name, display_num_name) => {
 
            let buy_button_value = localStorage.getItem(buy_button_name);
            if (buy_button_value != null ) {

                $(`#${buy_button_name}`).text('remove');
                $(`#${buy_button_name}`).prepend('<i class="fa fa-shopping-cart"></i> ');
                $(`#${buy_button_name}`).val("remove");
                $(`#${display_num_name}`).text(parseInt(buy_button_value));

                return (parseInt(buy_button_value));

            }
          
            
            return 0;
        }
       
        const load_cart = () => {


           let total_items = 0;
           let random_int = 0;

           //button 1
           random_int =  set_button("buy_button_1", "display_num_1");
           total_items = total_items + random_int;

           //button 2
           random_int =  set_button("buy_button_2", "display_num_2");
           total_items = total_items + random_int;

            //button 3
           random_int = set_button("buy_button_3", "display_num_3");
           total_items = total_items + random_int;

           //button 4
           random_int =  set_button("buy_button_4", "display_num_4");
           total_items = total_items + random_int;

           //button 5
           random_int =  set_button("buy_button_5", "display_num_5");
           total_items = total_items + random_int;

           //button 6
           random_int =  set_button("buy_button_6", "display_num_6");
           total_items = total_items + random_int;

           $("#cart_num").text(total_items);

        }

        let click_sound = new Audio("front-end/media/audio/sounds/click3.wav");


        // add/remove button 
        $(".buy_button").click((evt) => {

            let the_id_evt= evt.currentTarget.id;
            let the_value_evt = evt.currentTarget.value;
            let the_num_value = evt.currentTarget.nextElementSibling.firstChild.nextElementSibling;
            click_sound.play();


            if (the_value_evt != "remove") {
                $(`#${the_id_evt}`).text('remove');
                $(`#${the_id_evt}`).prepend('<i class="fa fa-shopping-cart"></i> ');
                let the_value_evt = evt.currentTarget.value = "remove";

                $("#cart_num").text(parseInt($("#cart_num").text()) + parseInt(the_num_value.innerText));
                localStorage.setItem(`${evt.currentTarget.id}`, the_num_value.innerText);


            } else {

                $(`#${the_id_evt}`).text('add');
                $(`#${the_id_evt}`).prepend('<i class="fa fa-shopping-cart"></i> ');

                if (parseInt($("#cart_num").text()) != 0) {

                    $("#cart_num").text(parseInt($("#cart_num").text()) - parseInt(the_num_value.innerText));

                }
                localStorage.removeItem(`${evt.currentTarget.id}`, the_num_value.innerText);
                the_num_value.innerText = 0;

                let the_value_evt = evt.currentTarget.value = "add";
              
            }


        });


        // number set  
        $(".right").click((evt) => {
            click_sound.play();

            let num_value = evt.currentTarget.previousElementSibling;
            num_value.innerText = parseInt(num_value.innerText) + 1;

        });

        $(".left").click((evt) => {

           let num_value = evt.currentTarget.nextElementSibling;
           if (parseInt(num_value.innerText) != 0) {
                click_sound.play();

                num_value.innerText = parseInt(num_value.innerText) - 1;
           }

        });



        load_cart();
    });

