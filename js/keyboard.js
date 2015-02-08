/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: keyboard.js
 * 
 * Description:
 * This files contains the function that determines the appropriate action for 
 * the key that was pressed. 
 * 
 */

/*Initiate Keyboard listener even handler*/
window.addEventListener("keydown", keyDownEvent, false);
//window.addEventListener("keypress", keyDownEvent, false);

/*Keyboard event handler*/
function keyDownEvent(e) {
    var left = -1,
            right = 1,
            up = -brdCol,
            down = brdCol;
    var avl;    //Non-empty space
    var noBlock;    //Empty Space
    
    //e.preventDefault();   //TESTING!!!! - DISABLED DURING DEVELOPMENT
    
    /*Determine if the game over flag as been set*/
    if (endGameFlag == true || lastKey == e.keycode) { 
      return false; //TESTING!!!! - DISABLED DURING DEVELOPMENT
    }
    
    console.log("last key " + lastKey + " keycode " + e.keycode);
    
    /*Determine which key is pressed*/
    switch (e.keyCode) {
        case 32:
            // Space key pressed            
            spaceBarKeyEvent();
            
            break;
        case 37:
            // left key pressed
            lastKey = e.keyCode;
            
            leftArrowKeyEvent();
            
            break;
        case 38:
            // up key pressed
            lastKey = e.keyCode;
            upArrowKeyEvent();
            break;
        case 39:
            // right key pressed
            lastKey = e.keyCode;
            //console.log("right key pressed");
            
            rightArrowKeyEvent();
            
            break;
        case 40:
            // down key pressed
            lastKey = e.keyCode;
            downArrowKeyEvent();
            
            break;
        case 68:
            // D key pressed
            
            break;
        case 70:
            // F key pressed
            
            break;
    }
}

var move = 10;
var dir = 4;

function upArrowKeyEvent() {   
    /*Enable character to jump*/
    if ((character.yPos + character.height) >= character.canvas.height) {
        character.jumping = true; 
    }
    else {
        /*Move character image*/
        character.redraw(character.xPos, character.yPos  - move);
        character.stopWallCollision();
        
        /*Saving character direction*/
        character.dx = 0;
        character.dy = -dir;
    }

    /*Update the game window*/
    updateGame();
}

function downArrowKeyEvent() {
    /*Move character image*/
    character.redraw(character.xPos, character.yPos  + move);
    character.stopWallCollision();
    
    /*Saving character direction*/
    character.dx = 0;
    character.dy = dir;
    
    /*Update the game window*/
    updateGame();
}

function rightArrowKeyEvent() {
    /*Move character image*/
    character.redraw(character.xPos + move, character.yPos);
    character.stopWallCollision();
    
    /*Saving character direction*/
    character.dx = dir;
    character.dy = 0;
    
    /*Update the game window*/
    updateGame();
}


function leftArrowKeyEvent() {
    /*Move character image*/
    character.redraw(character.xPos - move, character.yPos);
    character.stopWallCollision();
    
    /*Saving character direction*/
    character.dx = -dir;
    character.dy = 0;
    
    /*Update the game window*/
    updateGame();
}


function spaceBarKeyEvent() {
    /*Draw the projectile*/
    var newProj = new physics(backgroundImg.canvasName, 10, 10, character.xPos+25, 275);
    newProj.dx = -2;
    newProj.dy = 2;
    newProj.floor = backgroundImg.canvas.height;
    
    projectile.push(newProj);
    updateGame();
}