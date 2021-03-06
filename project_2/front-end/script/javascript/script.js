"use strict";
/*********************************************************************
***
*Original Author: Luke Chulack                         
*Date Created: 03/05/2021                                     
*Version: 1.0                                           
*Date Last Modified: 03/05/2021                               
*Modified by: Luke Chulack        
*Modification log:  

    version 1.0 - 03/05/2021 - used and edited cart JavaScript I made from before, validation for MDB UI kit. note: will add in life price change next version. 
     
***
******************************************************************** */

$(document).ready( () => {


    // submit 

    const to_submit = () => {

        alert("Your message has been sent");

    }

    // validation

    const to_validation = () => {
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');
      
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach((form) => {
          form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }; 

    // cart code



    // load card
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

    const get_price = (buy_button_name, total_set_num) => {

        let buy_button_value = localStorage.getItem(buy_button_name);
        if (buy_button_value != null) {

            if (buy_button_name == "buy_button_1") {

                $(`#${total_set_num}`).text(`$${buy_button_value*6}`);

            } else if (buy_button_name == "buy_button_2") {

                $(`#${total_set_num}`).text(`$${buy_button_value*5}`);
                
            } else if (buy_button_name == "buy_button_3") {

                $(`#${total_set_num}`).text(`$${buy_button_value*4}`);
                
            } else {
                
            }
            let amount_cart =  parseInt($(`#${total_set_num}`).text().slice(1));
           

            $(`#total_cart`).text(`$${amount_cart+parseInt($(`#total_cart`).text().slice(1))}`);


        } else {

            $(`#${total_set_num}`).text("$0");

        }




    }


    const get_price_live = (buy_button_name, total_set_num) => {

        let buy_button_value = localStorage.getItem(buy_button_name);
        if ($(`#${buy_button_name}`).val() != "add") {


            /*
            if (buy_button_name == "buy_button_1") {

                $(`#${total_set_num}`).text(`$${buy_button_value*6}`);
    
            } else if (buy_button_name == "buy_button_2") {
    
                $(`#${total_set_num}`).text(`$${buy_button_value*5}`);
                
            } else if (buy_button_name == "buy_button_3") {
    
                $(`#${total_set_num}`).text(`$${buy_button_value*4}`);
                
            } else {
                
            }
            let amount_cart =  $(`#${total_set_num}`).text().slice(1);
            */

        } else {

           // $(`#${total_set_num}`).text("$0");


        }
 




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

        $("#cart_num").text(total_items);
        $("#shop_cart_num").text(total_items);
        get_price("buy_button_1", "total_set_2");
        get_price("buy_button_2", "total_set_4");
        get_price("buy_button_3", "total_set_6");


     }

     


    // add or remove from cart 

    $(".buy_button").click((evt) => {

        let the_id_evt= evt.currentTarget.id;
        let the_value_evt = evt.currentTarget.value;
        let the_num_value = evt.currentTarget.nextElementSibling.firstChild.nextElementSibling;


        if (the_value_evt != "remove") {
            $(`#${the_id_evt}`).text('remove');
            $(`#${the_id_evt}`).prepend('<i class="fa fa-shopping-cart"></i> ');
            let the_value_evt = evt.currentTarget.value = "remove";

            $("#cart_num").text(parseInt($("#cart_num").text()) + parseInt(the_num_value.innerText));
            $("#shop_cart_num").text(parseInt($("#shop_cart_num").text()) + parseInt(the_num_value.innerText));
            get_price_live("buy_button_1", "total_set_2");
            get_price_live("buy_button_2", "total_set_4");
            get_price_live("buy_button_3", "total_set_6");

            localStorage.setItem(`${evt.currentTarget.id}`, the_num_value.innerText);


        } else {

            $(`#${the_id_evt}`).text('Add to Card');
            $(`#${the_id_evt}`).prepend('<i class="fa fa-shopping-cart"></i> ');

            if (parseInt($("#cart_num").text()) != 0) {

                $("#cart_num").text(parseInt($("#cart_num").text()) - parseInt(the_num_value.innerText));

            }

            if (parseInt($("#shop_cart_num").text()) != 0) {

                $("#shop_cart_num").text(parseInt($("#shop_cart_num").text()) - parseInt(the_num_value.innerText));
                get_price_live("buy_button_1", "total_set_2");
                get_price_live("buy_button_2", "total_set_4");
                get_price_live("buy_button_3", "total_set_6");

            }

            localStorage.removeItem(`${evt.currentTarget.id}`, the_num_value.innerText);
            the_num_value.innerText = 0;

            let the_value_evt = evt.currentTarget.value = "add";
          
        } 


    });

    // arrows 
    $(".right").click((evt) => {

        let num_value = evt.currentTarget.previousElementSibling;
        num_value.innerText = parseInt(num_value.innerText) + 1;

    });

    $(".left").click((evt) => {

       let num_value = evt.currentTarget.nextElementSibling;
       if (parseInt(num_value.innerText) != 0) {

            num_value.innerText = parseInt(num_value.innerText) - 1;
       }

    });
    



    load_cart();
    to_validation();
});