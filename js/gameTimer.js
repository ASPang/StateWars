/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: gameTimer.js
 * 
 * Description:
 * This files contains the function that keeps track of the gameplay time.
 * 
 */

var gameTimer;
var startClock;
var endGameFlag = true; //Game isn't running is true
var numGamePlay = 0;
var milSec = 1000;


function menuScreen() {
   backgroundImg.introScreen();
}

/*Start the game when the start button is clicked*/
function startTimer() { 
   var oneSec = 10;
   
   clearInterval(gameTimer);   
   startClock = new Date().getTime();
   
   endGameFlag = false;

//    /*Initiate game*/
    //initGame();
    setupCanvas();
    
   gameTimer = setInterval(function(){updateGame();}, oneSec);  
}


/*Update the game every few milseconds*/
function updateGame() {
    var i;  //Loop counter
    var curColour, curWidth;
    
    /*Clear the canvas*/
    backgroundImg.clearCanvas();
    
    /*Draw the background*/
    backgroundImg.redraw(backgroundImg.xPos, backgroundImg.yPos);
    
    /*Redraw Character path*/
    curColour = characterImgColour();
    curWidth = characterImgLineWidth(curColour);
    redrawPaths(character, pathC, curColour, curWidth);  //Redraw character path
    
    /*Redraw Enemy path*/
    curColour = "black";
    curWidth = characterImgLineWidth(curColour);
    redrawPaths(enemy[0], pathE, curColour, curWidth);  //Redraw enemy path
    
    /*Draw gameplay information
    backgroundImg.canvasCtx.fillStyle = "Black";
    backgroundImg.canvasCtx.font = "bold 16px Arial";
    backgroundImg.canvasCtx.fillText("Elapse Time: " + points, backgroundImg.canvas.width / 2 - 30, 16);*/
    
    /*Draw the character*/
    character.xPos += character.dx;
    character.yPos += character.dy;

    if (character.canvasWallCollision() != "null") {   //Returns the value which the character collides with the wall
      character.stopWallCollision();
      endGameFlag = true;
    }
    character.redraw(character.xPos, character.yPos);
        
    /*Update Enemy position*/
    //enemyPredictPath(enemy[0]);
    moveEnemies();
    enemyHitLine();
        
    /*Check if the image intersects with anything on the canvas*/
    //checkObstacles();
    //characterHit();
    //updatePath();
    //characterHitLine();
    //console.log("ing game timer " + character.xPos);
    hitLine(character, enemy[0], pathC, pathCCount, 1);
    hitLine(character, enemy[0], pathE, pathECount, 0);
    
    /*Determine if the game over flag as been set*/
    if (endGameFlag == true) { 
        clearInterval(gameTimer);
                
        /*Disable all enemies*/
        for (i = 0; i< enemy.length; i++) {                        
            enemy[i].dx = 0;
            enemy[i].dy = 0;
        }
        
        /*Clear all paths*/
        pathCCount = 0;
        pathC = [];
        pathECount = 0;
        pathE = [];
        lastKey = 37;
        
        /*Stop the character from moving*/
        character.dx = 0;
        character.dy = 0;
        
        /*Set up the option for user to start a new game*/
        screenDisplayed = "gameOver";
        backgroundImg.gameOverScreen();
        
    }
}

/*Update the enemy position on the screen by pixels*/
function moveEnemies() {
    var i;  //Loop Counter
    
    /*Modify every alien image*/
    for (i = 0; i< enemy.length; i++) {            
        /*Determine if enemy hit another path*/
        enemyPredictPath(enemy[i]);
        
        /*Determine if the enemy will hit a wall */
        enemyPredictWallColl(enemy[i]);
        
        console.log("enemy current movement.dir = " + enemy[i].dx + " " + enemy[i].dy);
        
        enemy[i].redraw(enemy[i].xPos + enemy[i].dx , enemy[i].yPos + enemy[i].dy);
        
        /*Determine if the alien is off screen
        if ((enemy[i].xPos) < 0) {
            enemy[i].dx = -enemy[i].dx;
        }
        else if ((enemy[i].xPos + enemy[i].width) > backgroundImg.canvas.width) {
            enemy[i].dx = -enemy[i].dx;
        }
        else if ((enemy[i].yPos + enemy[i].height) >= backgroundImg.canvas.height) {
            endGameFlag = true;
            enemy[i].dy = 0;
            enemy[i].dx = 0;
        }*/
        if (enemy[i].canvasWallCollision() != "null") {
          endGameFlag = true;
        }
    }
}

function moveAliens(speed) {
    var i;  //Loop counter
    
    /*Modify every alien image*/
    for (i = 0; i< aliens.length; i++) {            
        aliens[i].canvasCtx.globalAlpha = alienVisibility;    
        aliens[i].redraw(aliens[i].xPos - speed, aliens[i].yPos);
        
        /*Determine if the alien is off screen*/
        if ((aliens[i].xPos + aliens[i].width) < 0) {
            newAlien(aliens[i]);
        }        
        
        /*Modify the alien's visibility*/
        if (visible == true) {
            alienVisibility -= 0.001;
        }
        else if (visible == false) { 
            alienVisibility += 0.001;
        }
        
        if (alienVisibility >= 1.0) {
            alienVisibility = 1.0;
            visible = true;
        }
        else if (alienVisibility <= 0.0) {
            alienVisibility = 0.0;
            visible = false;
        }
        aliens[i].canvasCtx.globalAlpha = 1;  
    }
}

function addTime() {
    var countDownTime = 60;
    var sec30 = 30 * milSec; 
    
    /*Add 30 seconds of game play*/
    startClock += sec30;
    
    /*Calculate time lapse*/
    var timeRemaining = Math.round(countDownTime - (new Date().getTime() - startClock) / milSec);
    
    if (timeRemaining > 60) {
        startClock = new Date().getTime(); 
    }
}

function candyTime() {
    var powerRemaining = Math.round(powerUpEnd - (new Date().getTime() - powerUp) / milSec);
    
    if (powerRemaining > 0) {
        backgroundImg.canvasCtx.font = "bold 30px Arial";
        backgroundImg.canvasCtx.fillText("Power Up Activated", 150, 110);
    }
    
    return powerRemaining;
}

/*Fill area*/
function fillArea() {
    backgroundImg.grid[1] = "blue";
}

/*Convert Second to millisecond*/
function convertSecToMilSec(sec) {
    var milSec = 1000;
    
    return sec * milSec;
}

/*Convert millisecond to second*/
function convertMilSecToSec(milSec) {
    var sec = 1000;
    
    return milSec / sec;
}

/*Draw object paths*/
function redrawPaths() {
    var i = 0, numPaths;
    
    numPaths = path.length;
    for (i = 0; i < numPaths; i++) {
        path[i].drawLine();
    }
}

/*Draw Character path*/
function redrawPaths(character, path, curColour, curWidth) {
    var i = 0, numPaths;
    var pX1, pY1, pX2, pY2; //points
    /*var curColour = path.rbg;
    var curWidth = path.lineWidth;*/
    
    numPaths = path.length; //Get the number of paths
    
    if (numPaths > 0) {
       /*Draw all previous paths*/
       for (i = 0; i < numPaths - 1; i++) {
           pX1 = path[i].x;
           pY1 = path[i].y;
           
           pX2 = path[i+1].x;
           pY2 = path[i+1].y;
           
           backgroundImg.strokeStyle = path[i+1].rbg;   //Update the line background
           backgroundImg.lineWidth = path[i+1].width;
           backgroundImg.drawLine(pX1, pY1, pX2, pY2);
       }
       
       /*Draw the current path getting built*/
       pX1 = path[numPaths - 1].x;
       pY1 = path[numPaths - 1].y;

       pX2 = centPathX(character.xPos);
       pY2 = centPathY(character.yPos);
       
       backgroundImg.strokeStyle = curColour; //Update the line background
       backgroundImg.lineWidth = curWidth;
       backgroundImg.drawLine(pX1, pY1, pX2, pY2);
       
       /*Revert the colour back to the original colour*/
       backgroundImg.strokeStyle = "black";
    }
}


// function redrawCPaths222() {
    // var i = 0, numPaths;
    // var pX1, pY1, pX2, pY2; //points
    // var curColour = backgroundImg.strokeStyle;
    // var curWidth = backgroundImg.lineWidth;
    
    // numPaths = pathCCount; //pathC.length;
    // if (numPaths > 0) {
       // //console.log(pathCCount);   //TESTING!!!!!!!!!!
       // /*Draw all previous paths*/
       // for (i = 0; i < numPaths - 1; i++) {
           // pX1 = pathC[i].x;
           // pY1 = pathC[i].y;
           
           // pX2 = pathC[i+1].x;
           // pY2 = pathC[i+1].y;
           
           // backgroundImg.strokeStyle = pathC[i+1].rbg;   //Update the line background
           // backgroundImg.lineWidth = pathC[i+1].width;
           // backgroundImg.drawLine(pX1, pY1, pX2, pY2);
       // }
       
       // /*Draw the current path getting built*/
       // pX1 = pathC[numPaths - 1].x;
       // pY1 = pathC[numPaths - 1].y;

       // pX2 = centPathX(character.xPos);
       // pY2 = centPathY(character.yPos);
 
       // backgroundImg.strokeStyle = curColour; //Update the line background
       // backgroundImg.lineWidth = curWidth;
       // backgroundImg.drawLine(pX1, pY1, pX2, pY2);
       
       // /*Revert the colour back to the original colour*/
       // backgroundImg.strokeStyle = curColour;
    // }
// }

/*Clear the canvas of items*/
function clearBoard() {
    var i = 0;
    
    /*Remove all Enemies*/
    for (i = 0; i < enemy.length; i++) {
        enemy.pop();
    }
    
    /*Remove all projectiles*/
    for (i = 0; i < projectile.length; i++) {
        projectile.pop();
    }    
}

function updatePath() {
    backgroundImg.grid[0] = "";
    backgroundImg.addGrid();
}