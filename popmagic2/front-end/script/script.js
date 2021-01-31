"use strict";

/*********************************************************************
***
*Original Author: Luke Chulack                         
*Date Created: 01/22/2021                                     
*Version: 2.0                                           
*Date Last Modified: 01/29/2021                               
*Modified by: Luke Chulack        
*Modification log:  

    version 1.0 - 01/22/2021 - contact page. 
    version 2.0 - 01/29/2021 - code for contact modal, email register, faq. 
***
******************************************************************** */

const $ = (selector) => document.querySelector(selector);



// sign up form 
const sign_up = ()  => {

    const name_of_email_owner = $("#email_address_name");
    const name_email_adrress = $("#email_address_news");
    let error = 0;


    if(name_of_email_owner.value ==  "")
    {
        error += 1;
        name_of_email_owner.nextElementSibling.textContent = "*";

    }

    if(name_email_adrress.value ==  "")
    {
        error += 1;
        name_email_adrress.nextElementSibling.textContent = "*";
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
    const terms = $("#terms");
    const comments= $("#comments");

    if (email.value=="") {
        error += 1;
        email.nextElementSibling.textContent = "*";
    } 
    if (phone.value=="") {
        error += 1;
        phone.nextElementSibling.textContent = "*";

    }
    if (country.value=="") {
        error += 1;
        country.nextElementSibling.textContent = "*";

    }
    if (terms.checked==false) {
        error += 1;
        terms.nextElementSibling.textContent = "*";

    }
    if (comments.value=="") {
        error += 1;
        comments.nextElementSibling.textContent = "*";

    }

    if(error==0) {

        $("#contact_form").submit();


    } else {


    }
   
}



// reset contact form 
const reset_form = () => {
    $("#contact_form").reset();
 };


 // faq
 const faq_toggle = evt => {
    const aElement = evt.currentTarget;               
    const divElement = aElement.parentNode.nextElementSibling;    

    if (aElement.parentNode.hasAttribute(("class")) == true) {
      aElement.parentNode.removeAttribute(("class"))
    } else {
      aElement.parentNode.className = "minus";
    }

    if (divElement.hasAttribute(("class")) == true) {
      divElement.removeAttribute(("class"))
    } else {
      divElement.className = "open";
    }


    evt.preventDefault();   
};





  // event listener 
document.addEventListener("DOMContentLoaded", () => { 

    //Listener for register form for contact
    $("#register").addEventListener("click", send);

    //Listener for reset form for contact
    $("#reset_form").addEventListener("click", reset_form);
  
    // Listener for email list
    $("#sign_up").addEventListener("click", sign_up);

    // code for faqs
    const AElements = faq.querySelectorAll("#faq h2 a");

    for (let aElement of AElements) {
        aElement.addEventListener("click", faq_toggle);
    }

});
