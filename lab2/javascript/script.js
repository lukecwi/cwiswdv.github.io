"use strict";



$(document).ready(() => {


    const send = () => {


    }



    $("#submit").click(() => {

        if ($("#name").val() == "") {

            $("#name").next().text("*");
        }

        if ($("#email").val() == "") {

            $("#email").next().text("*");

        }

    });

});