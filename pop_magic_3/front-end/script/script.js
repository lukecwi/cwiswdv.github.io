"use strict";

/*********************************************************************
***
*Original Author: Luke Chulack                         
*Date Created: 01/22/2021                                     
*Version: 3.0                                           
*Date Last Modified: 02/05/2021                               
*Modified by: Luke Chulack        
*Modification log:  

    version 1.0 - 01/22/2021 - contact page. 
    version 2.0 - 01/29/2021 - code for contact modal, email register, faq. 
    version 3.0 - 02/05/2021 - rebuilt things with jquery, added slideshow code, new faqs code.

***
******************************************************************** */




// sign up form 
const sign_up = ()  => {

    const name_of_email_owner = $("#email_address_name");
    const name_email_adrress = $("#email_address_news");
    let error = 0;


    if(name_of_email_owner.val() ==  "")
    {
        error += 1;
        name_of_email_owner.next().text("*");

    }

    if(name_email_adrress.val() ==  "")
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

    if (email.val()=="") {
        error += 1;
        email.next().text("*");
    } 
    if (phone.val()=="") {
        error += 1;
        phone.next().text("*");

    }
    if (country.val()=="") {
        error += 1;
        country.next().text("*");

    }
   
    if (comments.val()=="") {
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




