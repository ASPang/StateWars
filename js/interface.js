
/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 4 - Element Race
 * Date: 2015/02/08
 * Modified: 2015/02/14
 * 
 * Filename: interface.js
 * 
 * Description:
 * This files contains the function that displays different screens of the game.
 * 
 */

 imageLib.prototype.introScreen = function() {
    /*Clear the screen*/
    this.clearCanvas();
    
    /*Add the background*/
    this.canvasCtx.drawImage(this.introImg.image, this.introImg.x, this.introImg.y, this.introImg.width, this.introImg.height);
    
    /*Display the title*/
    //this.canvasCtx.drawImage(this.introTitle.image, this.introTitle.x, this.introTitle.y, this.introImg.width, this.introImg.height);
    this.showTitle();
    
    /*Display buttons*/
    this.showStartButton();    
    //this.showInstructButton();
    
 };
 
 /*Set up the intro menu background*/
 imageLib.prototype.introBackground = function(image, x, y, width, height, repeat) {
   /*Determine if repeat is null*/
   if (repeat == "null" || repeat == null) {
      repeat = "no";
   }
   
   /*Save information about the background image*/
   this.introImg = {
      image: image,
      x: x, 
      y: y,
      width: width,
      height: height,
      repeat: repeat
   }
 }
 
 /*Set up the Logo*/
  imageLib.prototype.setTitle = function(image, x, y, width, height) {  
  console.log("HERE");
   /*Save information about the background image*/
   this.introTitle = {
      image: image,
      x: x, 
      y: y,
      width: width,
      height: height,
      repeat: repeat
   }
 }
 
  /*Draw the start button on the canvas*/
 imageLib.prototype.showTitle = function() {
   var oldStyle = this.canvasCtx.font;
   var newStyle = this.introTitle.font;
   
   this.canvasCtx.font = newStyle;
   this.canvasCtx.fillText(this.introTitle.text, this.introTitle.x, this.introTitle.y);
   
   /*Reset canvas font to default*/
   this.canvasCtx.font = oldStyle;
 };
 
 /*Set up the title*/
  imageLib.prototype.setTitle = function(text, xPos, yPos, style) {  
  console.log("HERE2");
   /*Save information about the background image*/
   this.introTitle = {
      text: text,
      x: xPos, 
      y: yPos,
      font: style
   }
 }
 
 
 /*Set up the start game button*/
 /*
  * NOTE: need to add defense programming in case any of the parameter is null then it should be the default option
  */
 imageLib.prototype.setStartButton = function(text, xPos, yPos, style) {
   var numButtons = this.button.length;
   
   /*Determine the width and height of the button*/
   
   /*Save the button properties*/   
   this.button["startButton"] = {
      text: text,
      x: xPos,
      y: yPos,
      font: style
   }
   
   /*Store the text for the start button*/
   this.startBText = text;
   
   /*Save the text location on the screen*/
   this.startBPosX = xPos;
   this.startBPoxY = yPos;
   
   /*Save the style*/
   this.startBStyle = style;
 };
 
 /*Draw the start button on the canvas*/
 imageLib.prototype.showStartButton = function() {
   var oldStyle = this.canvasCtx.font;
   var newStyle = this.button["startButton"].font;
   
   this.canvasCtx.font = newStyle;
   this.canvasCtx.fillText(this.button["startButton"].text, this.button["startButton"].x, this.button["startButton"].y);
   
   /*Reset canvas font to default*/
   this.canvasCtx.font = oldStyle;
   
   /*var oldStyle = this.canvasCtx.font;
   var newStyle = this.startBStyle;
   
   this.canvasCtx.font = newStyle;
   this.canvasCtx.fillText(this.startBText, tihs.startBPosX, tihs.startBPosY);*/
 };
 
 /*Set up the instructions button*/
 /*
  * NOTE: need to add defense programming in case any of the parameter is null then it should be the default option
  */
 imageLib.prototype.setInstructButton = function(text, xPos, yPos, style) {
   var numButtons = this.button.length;
   
   /*Save the button properties*/   
   this.button["startButton"] = {
      text: text,
      x: xPos,
      y: yPos,
      font: style
   }
 };
 
 
 imageLib.prototype.gameOverScreen = function() {
 };
 
 imageLib.prototype.instructionScreen = function() {
 };
 
 imageLib.prototype.creditScreen = function() {
 };
 
 imageLib.prototype.settingScreen = function() {
 };
 