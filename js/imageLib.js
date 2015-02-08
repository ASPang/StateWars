/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: imageLib.js
 * 
 * Description:
 * This files contains the class and function that manipulates 
 * and draws on the HTML canvas.
 * 
 */
 
imageLib.prototype.constructor = imageLib;

function imageLib(canvasName, width, height, xPos, yPos) {    
    this.canvasName = canvasName;
    this.canvas = document.getElementById(this.canvasName);
    this.canvasCtx = this.canvas.getContext("2d"); 
    this.width = width;
    this.height = height;
    this.xPos = xPos;
    this.yPos = yPos;
    this.oldPosX = xPos;
    this.oldPosY = yPos;
    
    /*Original Start and End Position*/
    this.startX = xPos;
    this.startY = yPos;
    this.endX = null;
    this.endY = null;
    this.slopeX = 0;
    this.slopeY = 0;
       
    this.image = "";
    this.repeatHor = false;
    this.repeatVer = false;
    this.loopHor = false;
    this.loopVer = false;
    
    this.spaceBuffer = 0;
    
    this.visible = true;
    
    /*Drawing a line*/
    this.lineWidth = 10;
    this.strokeStyle = "black";
    
    /*Drawing a circle*/
    this.radius = 5;
    
    /*Colour*/
    this.fillStyle = "#0000ff"; 
    
    /*Canvas grid*/
    this.gird = [];
};

imageLib.prototype.addImg = function(image) {
    this.image = image; 
    this.canvasCtx.drawImage(image, this.xPos, this.yPos, this.width, this.height);
    
    /*Determine if the image needs to be repeated*/
    this.backgroundRepeat();
};

/*Clear entire canvas*/
imageLib.prototype.clearCanvas = function() {
    this.canvasCtx.clearRect(0, 0,  this.canvas.width, this.canvas.height);
};

/*Canvas Width*/
imageLib.prototype.canvasWidth = function() {
    return this.canvas.width;
};

/*Canvas Height*/
imageLib.prototype.canvasHeight = function() {
    return this.canvas.height;
};

imageLib.prototype.clearCanvas = function() {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

imageLib.prototype.redraw = function(newPosX, newPosY) {
    /*Redraw new image*/
    this.canvasCtx.drawImage(this.image, newPosX, newPosY,  this.width, this.height);
    
    /*Update related image information*/
    this.xPos = newPosX;
    this.yPos = newPosY;
    this.oldPosX = newPosX;
    this.oldPosY = newPosY;
    
    /*Determine if the image needs to be repeated*/
    this.backgroundRepeat();
};

imageLib.prototype.backgroundRepeat = function() {
    //console.log(this.canvas.width);
    var newPosX = this.xPos + this.width;
    var newPosY = this.yPos + this.width;
    var repeat = 0;
    
    if(this.repeatHor == true) {
        /*Repeat image from current position to the right*/
        while (newPosX < this.canvas.width) {
            this.canvasCtx.drawImage(this.image, newPosX, this.yPos,  this.width, this.height);
            newPosX = newPosX + this.width;
            repeat++;
        }
        
        /*Repeat image from current position to the left*/
        var newPosX = this.xPos - this.width;
        while (newPosX > (this.width * (-1))) {
            this.canvasCtx.drawImage(this.image, newPosX, this.yPos,  this.width, this.height);
            newPosX = newPosX - this.width;
            repeat++;
        }
        
        /*loop the image*/
        if (this.xPos >= this.canvas.width) {
            this.xPos = 0;
        }
        else if (this.xPos <= 0) {
            this.xPos = this.canvas.width;
        }
    }
};

imageLib.prototype.drawLine = function() {  
    this.canvasCtx.beginPath();
    this.canvasCtx.lineWidth= this.lineWidth;
    this.canvasCtx.strokeStyle= this.strokeStyle; //Setting path colour
    
    /*Draw out the path*/
    this.canvasCtx.moveTo(this.startX,this.startY);
    this.canvasCtx.lineTo(this.endX,this.endY);
    this.canvasCtx.stroke(); 
};

imageLib.prototype.drawProjectile = function() {
    var radius = this.radius;
    
    this.canvasCtx.beginPath();
    this.canvasCtx.fillStyle= this.fillStyle;
    this.canvasCtx.arc(this.xPos,this.yPos,radius,0,Math.PI*2,true);
    this.canvasCtx.closePath();
    this.canvasCtx.fill();    
    
    this.xPos += this.dx;
    this.yPos += this.dy;
    
    this.width = radius;
    this.height = radius;
};

imageLib.prototype.intersect =  function(image) { 
    var x1 = image.xPos;
    var x2 = image.xPos + image.width;
    var y1 = image.yPos;
    var y2 = image.yPos + image.height;

    if ((x2 >= this.xPos) && (x1 <= (this.xPos + this.width)) && (y2 >= this.yPos) && (y1 <= (this.yPos + this.height))){
        return true;
    }
    
    return false;
};


imageLib.prototype.canvasGrid = function(col, row) {
    var pos = 0;
    var numSq = col * row + 1;
     
    for (pos = 0; pos < numSq; pos++) {
        this.grid[pos] = 0;
    }
};

imageLib.prototype.canvasGrid = function(squSize) {
    var pos = 0;
    var numSq = squSize + 1;
     
    for (pos = 0; pos < numSq; pos++) {
        this.grid[pos] = 0;
    }
};