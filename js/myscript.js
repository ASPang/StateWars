/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: myscripts.js
 * 
 * Description:
 * This files contains the function that deals with starting the game and
 * updating the game windows.
 * 
 */

/*Start the game once the page has been loaded*/
 $(function ()  {     
    initGame();
});

/*Initialize the game*/
function initGame() {
    /*Preload images*/
     preloadGameImages();
     
    /*Display the board*/
    setupCanvas();
    
    startTimer();   ///TEST!!!!!!!!!!!!!!!
}

/*Initialize the canvas*/
function setupCanvas() {
     /*Setting up the canvas*/
    c = document.getElementById("gameCanvas");
    ctx = c.getContext("2d");
}

function preloadGameImages() {   
    gameImage = new preloadImages()
    
    /*Add image that needs to be preloaded*/
    for (i = 0; i < imgSrc.length; i++) {
        gameImage.setImageAry(imgSrc[i]);
    }
}


function setupCanvas() {
    var gameCanvas = "gameCanvas";
    var height = 50;
    var width = 50;
    backgroundImg = new imageLib(gameCanvas, width, height, 0, 0);
    
    /*Add background image to canvas*/
    backgroundImg.addImg(gameImage.loadedImg["background"]);
    
    /*Initate grid*/
    //backgroundImg.canvasGrid(backgroundImg.canvas.width, backgroundImg.canvas.height);
    backgroundImg.canvasGrid(25);   //Square size
    backgroundImg.gridSqHeight = 25;
    backgroundImg.gridSqWidth = 25;
    
    /*Draw the character on the screen*/
    setupCharacter(gameCanvas);
    //addEnemy(gameCanvas);
    
    /*Drawing out paths in the game*/
    //setupObstacles();
}


function setupObstacles() {
    path[0] = new imageLib(backgroundImg.canvasName, 0, 0, 0, 0);
    path[0].endX = 0,
    path[0].endY = 0;
    path[0].slopeX = 16/13;
    path[0].slopeY = 3410/13;
    path[0].drawLine();

    path[1] = new imageLib(backgroundImg.canvasName, 0, 0, 0, 0);
    path[1].endX = 0; 
    path[1].endY = 0;
    path[1].slopeX = -16/13;
    path[1].slopeY = 3410/13;
    path[1].drawLine();
}

/*Set up the character*/
function setupCharacter(gameCanvas) {
    /*Size of character*/
    var height = 15;
    var width = 15;
    var cord = [], x, y, gridPos;
    
    /*Add the character to the canvas*/
    character = new physics(gameCanvas, width, height, 275, 210);
    backgroundImg.strokeStyle = "red";
    character.addImg(gameImage.loadedImg["Fire"]);
    
    /*pathC[0] = {
      x: 275,
      y: 210,
      rbg: "blue" 
    };
    
    pathCCount++;*/
    
    /*Set up the move number based on the character's size*/
    //move = character.height/2;
    move = 1;
    
    //console.log(pathC[0].x);
    /*Place the character to array position in the array
    cord = backgroundImg.aryNumToXYCord(0);
    
    x = backgroundImg.getGridXPos(cord[0]);
    y = backgroundImg.getGridYPos(cord[1]);
    console.log(x + " "  + y);
    //backgroundImg.xyCordToAryNum();
    backgroundImg.grid[100] = "0";
    
    character = new physics(gameCanvas, width, height, x, y);
    character.addImg(gameImage.loadedImg["character"]);*/
}

function addEnemy(gameCanvas) {
    /*Size of plants*/
    var height = 40;
    var width = 20;
    
    enemy[0] = new physics(gameCanvas, width, height, 50, 100);
    enemy[0].addImg(gameImage.loadedImg["plant"]);
    enemy[0].dx = 1;
    enemy[0].dy = -0.2;
    
    enemy[1] = new physics(gameCanvas, width, height, 50, -100);
    enemy[1].addImg(gameImage.loadedImg["plant"]);
    enemy[1].dx = 1;
    enemy[1].dy = -0.2;
    
    enemy[2] = new physics(gameCanvas, width, height, 100, 30);
    enemy[2].addImg(gameImage.loadedImg["plant"]);
    enemy[2].dx = 1;
    enemy[2].dy = -0.2;
    
    enemy[3] = new physics(gameCanvas, width, height, 550, 200);
    enemy[3].addImg(gameImage.loadedImg["plant"]);
    enemy[3].dx = 1;
    enemy[3].dy = -0.2;
    
    enemy[4] = new physics(gameCanvas, width, height, 50, -300);
    enemy[4].addImg(gameImage.loadedImg["plant"]);
    enemy[4].dx = 1.5;
    enemy[4].dy = -1;
}

function addAliens(gameCanvas) {
    /*Size of aliens*/
    var alienHeight = 50;
    var alienWidth = 50;
    
    /*Add aliens to the canvas*/
    aliens[0] = new physics(gameCanvas, alienWidth, alienHeight, 275, 200);
    aliens[0].addImg(gameImage.loadedImg["alien1"]);
    
    
    aliens[1] = new physics(gameCanvas, alienWidth, alienHeight, 550, 200);
    aliens[1].addImg(gameImage.loadedImg["alien1"]);
    
    aliens[2] = new physics(gameCanvas, alienWidth, alienHeight, 50, 100);
    aliens[2].addImg(gameImage.loadedImg["alien1"]);
    
    aliens[3] = new physics(gameCanvas, alienWidth, alienHeight, 100, 150);
    aliens[3].addImg(gameImage.loadedImg["alien1"]);
}

function addCandy(gameCanvas) {
    /*Size of candy*/
    var width = 50;
    var height = 50;
    
    /*Add aliens to the canvas*/
    candy = new physics(gameCanvas, width, height, 400, 350);
    candy.addImg(gameImage.loadedImg["candy"]);
}





