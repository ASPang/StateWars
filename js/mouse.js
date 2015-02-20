/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 4 - Element Race
 * Date: 2015/02/08
 * Modified: 2015/02/14
 * 
 * Filename: mouse.js
 * 
 * Description:
 * This files contains the function that displays different screens of the game.
 * 
 */

/*Mouse Listeners*/
//window.addEventListener("mousemove", on_mousemove, false);   //Modify text when mouse is hovered over
//window.addEventListener("click", mouseClick, false);


function mouseClick(e) {
   mouseLoc(e);
}
 
/*Determine the current location of the mouse*/
function mouseLoc(e) {
   var x, y;   //Mouse coordinates
   var bX, bY, bHeight, bWidth;  //variable 
   
   /*Get the mouse coordinate*/
   x = e.layerX;
   y = e.layerY;
   
   /*Update values to be relative to the canvas*/
   x -= backgroundImg.canvas.offsetLeft;
   y -= backgroundImg.canvas.offsetTop;
  
  
  /*var oldStyle = backgroundImg.canvasCtx.font;  //Save the default setting
   var newStyle;  //New setting
   
   backgroundImg.canvasCtx.font = newStyle;
   
   
   
   var stringT = "Start";
   console.log(x + " " + y + " " +  backgroundImg.canvasCtx.measureText(stringT).width);  //TESTING!!!!!!!!!!!
  */
  
  /*Determine a button is selected*/
  //newStyle = backgroundImg.button["startButton"].font; //Button style
  bX = backgroundImg.button["startButton"].x;
  bY = backgroundImg.button["startButton"].y;
  //bWidth = backgroundImg.canvasCtx.measureText(backgroundImg.button["startButton"].text).width;
  bWidth = backgroundImg.button["startButton"].width;
  bHeight = backgroundImg.button["startButton"].height;
  
  console.log(x + " " + y + " " + bX + " " + bY);  //TESTING!!!!!!!!!!!
  
  if(x >= bX  && x <= (bX + bWidth) && y <= bY && y >= (bY-bHeight)){
      document.body.style.cursor = "pointer";
      console.log("HERE");
      backgroundImg.canvasCtx.fillStyle = "red";
      backgroundImg.showStartButton(); 
  }
  else{
      document.body.style.cursor = "";
      backgroundImg.canvasCtx.fillStyle = "Black";
      backgroundImg.showStartButton(); 
  }
  
  /*Reset canvas font to default*/
   backgroundImg.canvasCtx.font = backgroundImg.fontDefault;
}