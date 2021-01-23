"use strict";

// By Luke Chulack


// event handler page 143 and https://www.w3schools.com/js/js_htmldom_eventlistener.asp
document.getElementById("contact").addEventListener("click", contact);

// Contact function, page 135 
function contact() {

    

    // user's name, email, and a message prompted  here    
  
     
    let name = prompt("Please Enter your Name");
 

    let email = prompt("Please Enter your Email");

    let msg = prompt("Please Enter your Message");

        
        
    // response to user depending on input.
    
     if (name !=  "" && email != "") {
         
       alert("Thank you " + name + ". We will being reponding to you ASAP.");

    } else {
        
       alert("You either did not enter your name, email, or neither. ");
        
    }

}

