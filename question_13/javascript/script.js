"use strict";

$(document).ready(() => {

    $("#add_task").click(() => {

        let task_to_add = $("#input_task").val();
        if (task_to_add == "") {
            $("#error_display").text("Takes must have text");
        } else { 
             $("#error_display").text("");
             let the_task = "";
             if(localStorage.getItem("tasks") == null) { 
                 the_task = task_to_add;
             } else {
                 the_task = localStorage.getItem("tasks") + "\n" + task_to_add;

             }
             localStorage.setItem("tasks", the_task);
             $("#display_tasks").val(localStorage.getItem("tasks"));

        }

    });

    $("#clear_task").click(() => {
        localStorage.removeItem("tasks");
        $("#display_tasks").val("");
        $("#input_task").val("");

    });

    $("#display_tasks").val(localStorage.getItem("tasks"));


});