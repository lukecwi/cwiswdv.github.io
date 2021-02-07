"use strict";


document.addEventListener("DOMContentLoaded", () => {

    const squares = document.querySelectorAll(".grid div");
    const score  = document.querySelector("#result");
    let width = 15;
    let current_shooter_index = 202;
    let current_invader_index = 0;
    let alien_invaders_taken_down = [];
    let result = 0;
    let direction = 1;
    let invader_id;
    let kill_shooter = 0;
    let kill_bullet = 0;
    let shooter_id;

    const alien_invaders = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ];

    // invaders
    alien_invaders.forEach( i => squares[current_invader_index + i].classList.add("invader") );

    //ship

    squares[current_shooter_index].classList.add("shooter");


    //keys

     const move_shooter = (e) => {

        if(kill_shooter == 1) {
            document.removeEventListener("keydown", move_shooter);
    
        } else {

        squares[current_shooter_index].classList.remove("shooter");
        switch(e.keyCode) {
            case 37:
                if(current_shooter_index % width != 0) current_shooter_index -=1;
                break;
            case 39:
                if(current_shooter_index % width < width -1) current_shooter_index +=1;
                break;
        
        }
        squares[current_shooter_index].classList.add("shooter");

    }
      
    };
    document.addEventListener("keydown", move_shooter);
    

// move aliens

const move_aliens = () => {

    const left_edge = alien_invaders[0] % width == 0;
    const right_edge = alien_invaders[alien_invaders.length -1] % width == width -1;

    if((left_edge && direction == -1) || (right_edge && direction == 1)) {
        direction = width;
    } else if (direction == width) {

        if (left_edge) {
             direction = 1;
        } else  { 
            direction = -1;
        }
    }
    
    for(let i = 0; i <= alien_invaders.length -1; i++) {
        squares[alien_invaders[i]].classList.remove("invader");

    }

    for(let i = 0; i <= alien_invaders.length -1; i++) {
        alien_invaders[i] += direction;

    }

    for(let i = 0; i <= alien_invaders.length -1; i++) {
        if(!alien_invaders_taken_down.includes(i)) {
        squares[alien_invaders[i]].classList.add("invader");
        }
    }


    //game over
    if (squares[current_shooter_index].classList.contains("invader", "shooter")) {
        kill_bullet = 1;
        kill_shooter = 1;
        document.querySelector("#container h3").textContent = "Game Over";
        document.querySelector("#container h3").classList.add("red");
        squares[current_shooter_index].classList.add("boom");
        clearInterval(invader_id);
    }   

  for(let i = 0; i <= alien_invaders.length -1; i++) {
    if(alien_invaders[i] > (squares.length - (width-1))) {
        kill_bullet = 1;
        kill_shooter = 1;
        document.querySelector("#container h3").textContent = "Game Over";
        document.querySelector("#container h3").classList.add("red");
        clearInterval(invader_id);

    }
  }


  //hit sides
  if((current_shooter_index % width == width -1 && direction == 1) || (current_shooter_index % width == 0 && direction == -1)) {
    kill_bullet = 1;
    kill_shooter = 1;
    document.querySelector("#container h3").textContent = "Game Over";
    document.querySelector("#container h3").classList.add("red");
    clearInterval(invader_id);
    squares[current_shooter_index].classList.add("boom");

  }  

  //game win
  if(alien_invaders_taken_down.length == alien_invaders.length) {
    kill_bullet = 1;
    kill_shooter = 1;

    document.querySelector("#container h3").textContent = "You Win!";
    document.querySelector("#container h3").classList.add("green");
    clearInterval(invader_id);
  }



};
invader_id =setInterval(move_aliens, 500)

//shoot 

const shoot = (e) => {
    let bullet_id;
    let current_bullet_index = current_shooter_index;
    
    // move bullet
    const move_bullet = () => {

        if(kill_bullet == 1) {
            document.removeEventListener("keyup", shoot);
        
        
        } 
        squares[current_bullet_index].classList.remove("bullet");
        current_bullet_index -= width;
        squares[current_bullet_index].classList.add("bullet");
        if(squares[current_bullet_index].classList.contains("invader")) {        
            squares[current_bullet_index].classList.remove("bullet");
            squares[current_bullet_index].classList.remove("invader");
            squares[current_bullet_index].classList.add("boom");

            setTimeout(() => squares[current_bullet_index].classList.remove("boom"), 250);
            clearInterval(bullet_id);

            const alien_taken_down = alien_invaders.indexOf(current_bullet_index);
            alien_invaders_taken_down.push(alien_taken_down);
            result++;
            score.textContent = result;
            
            
        }
        if(current_bullet_index < width) {
            clearInterval(bullet_id);
            setTimeout(() => squares[current_bullet_index].classList.remove("bullet"), 100);

        }
   
      

    };

    switch(e.keyCode) {

        case 32:
          bullet_id = setInterval(move_bullet, 100);
          break;
      
    }
    
};


document.addEventListener("keyup", shoot)

});