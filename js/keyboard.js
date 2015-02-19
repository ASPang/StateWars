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
    if (endGameFlag == true || lastKey == e.keyCode) { 
      return false; //TESTING!!!! - DISABLED DURING DEVELOPMENT
    }
    
    //console.log("last key " + lastKey + " keycode " + (e.keyCode));
    
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
        updateCPath();
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
    updateCPath();
    
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
    updateCPath();
    
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
    updateCPath();
    
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

/*Save the new turning point of the path*/
function updateCPath() {
    var oriX = character.oldPosX;
    var oriY = character.oldPosY;
    var newX, newY;
   
    newX = centPathX(oriX);
    newY = centPathY(oriY);
    
    /*pathC[pathCCount] = {
      x: newX,
      y: newY,
      rbg: "blue"
    };*/
    
    if (lastKey == 38 || lastKey == 40) { //up
       pathC[pathCCount] = {
            x: character.oldPosX + Math.floor(character.width/2), //character.oldPosX + Math.floor(character.width/2),
            y: character.oldPosY  + Math.floor(character.width/2), //character.oldPosY,// + Math.floor(character.height/2),
            rbg: "blue"
       };
    }
    else if (lastKey == 40) { //down
      pathC[pathCCount] = {
            x: character.oldPosX + Math.floor(character.width/2), //character.oldPosX + Math.floor(character.width/2),
            y: character.oldPosY + Math.floor(character.width/2), //character.oldPosY,// + Math.floor(character.height/2),
            rbg: "blue"
       };
    }
    else if (lastKey == 37 || lastKey == 39) {
      pathC[pathCCount] = {
            x: character.oldPosX + Math.floor(character.height/2), //character.oldPosX,
            y: character.oldPosY + Math.floor(character.height/2), //character.oldPosY + Math.floor(character.width/2),
            rbg: "blue"
       };
    }
    
    /*
    if (lastKey == 38 || lastKey == 40) {
       pathC[pathCCount] = {
            x: character.oldPosX - Math.floor(character.width/2), //character.oldPosX + Math.floor(character.width/2),
            y: character.oldPosY, //character.oldPosY,// + Math.floor(character.height/2),
            rbg: "blue"
       };
    }
    else if (lastKey == 37 || lastKey == 39) {
      pathC[pathCCount] = {
            x: character.oldPosX, //character.oldPosX,
            y: character.oldPosY - Math.floor(character.height/2), //character.oldPosY + Math.floor(character.width/2),
            rbg: "blue"
       };
    }
    */
      
    pathCCount++;
    console.log(character.oldPosX + " " + character.oldPosY);
}

/*Return updated x value so the path is centered to the character*/
function centPathX(x) {
    
   /*Determine if the character is moving vertically*/
   if (lastKey == 38 || lastKey == 40) {
      //console.log("Ver");
      x = x + Math.floor(character.width/2);
      /*pathC[pathCCount] = {
         x: character.oldPosX + Math.floor(character.width/2),
         y: character.oldPosY,
         rbg: "blue"
      };*/
   }
   
   return x;
}

/*Return updated y value so the path is centered to the character*/
function centPathY(y) {
   /*Determine if the character is moving horizontally*/
   if (lastKey == 37 || lastKey == 39) {
      //console.log("Hor");
      y = y + Math.floor(character.height/2);
      /*
      pathC[pathCCount] = {
         x: character.oldPosX,
         y: character.oldPosY + Math.floor(character.height/2),
         rbg: "blue"
      };*/
   }  
   
   return y;
}