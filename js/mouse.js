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
   x = e.layerX;
   y = e.layerY;
   
   console.log(x + " " + y);
   
   //is the mouse over the link?
  if(x>=backgroundImg.button["startButton"].x  && x <= (backgroundImg.button["startButton"].x + backgroundImg.canvasCtx.measureText(backgroundImg.button["startButton"].text).width) && y<=backgroundImg.button["startButton"].y && y>= (backgroundImg.button["startButton"].y-20)){
      document.body.style.cursor = "pointer";
      console.log("HERE");
  }
  else{
      document.body.style.cursor = "";
  }
  
}