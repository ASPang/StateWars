/* 
 * Coder: Angela Pang
 * 
 * Assignment: CIS4500 Week 3 - Shooting (Plant Invasion)
 * Date: 2015/01/14
 * Modified: 2015/02/02
 * 
 * Filename: intersection.js
 * 
 * Description:
 * This files contains the function that determine if any objects in 
 * the game touches.
 * 
 */
 
function checkObstacles() {
    var i = 0, numPro = 0;
    var w = 0, numPaths = 0;
    var e = 0, numEnemy = 0;
    
    numPro = projectile.length;
    numPaths = path.length;
    numEnemy = enemy.length;
    //console.log(i + " " + numPro);
    for (i = 0; i < numPro; i++) {
        //console.log(i + " " + numPro);
        /*Determine if the project collided with a wall*/
        for (w = 0; w < numPaths; w++) {
            projectile[i].obstaclebounce(path[w]);
        }
        
        /*Determine if the projectile collided with an enemy*/
        for (e = 0; e < numEnemy; e++) {
            enemyHit(enemy[e], projectile[i]);
        }
        
        var end = projectile[i].canvasWallCollision();
        
        /*Determine if the projectile hit a wall*/
        if (end == "null") {
            /*Draw projectile*/
            projectile[i].drawProjectile();
        }
        else if (end == "bottom") {
            projectile[i].dy *= -1;
            projectile[i].drawProjectile();
        }
        else if (i >= 0 && numPro > 0){
            /*Remove projectile from the array*/
            projectile.splice(i,1); //Remove one item from the ith position
            numPro -= 1;
            i--;
        }
        else if (i < 0 && numPro <= 0) {
            break;
        }
    }
}


function enemyHit(enemy, projectile) {
    touch = enemy.intersect(projectile);
        
    if (touch == true) {
        /*Generate new enemy in the game world*/
        points += 1;
        genNewEnemy(enemy);
        
        return true;
    }
    
    return false;
}

function characterHit() {
    var i = 0, numEnemies = 0;
    var touch;  //loop counter
    
    /*Determine if the projectile collided with the character*/
    numEnemies = enemy.length;
    
    for (i = 0; i < numEnemies; i++) {
        touch = character.intersect(enemy[i]);
    
        /*Determine if the enemy touched the character*/
        if (touch == true ) {
            endGameFlag = true; 
            enemy[i].dx = 0;
            enemy[i].dy = 0;
        } 
    }     
}

function checkIntersection2() {
    var i, touch;  //loop counter
    
    /*Go through all the enemies to see if they intersect*/
    for (i = 0; i< aliens.length; i++) {        
        touch = character.intersect(aliens[i]);
        
        if (touch == true && candyTime() <= 0) {
            endGameFlag = true; 
        }
        else if (touch == true && candyTime() > 0) {
            newAlien(aliens[i]);
            points += 1;
        }
    }
}

function foundCandy() {
    touch = character.intersect(candy);
        
    if (touch == true) {
        /*Generate new candy in the game world*/
        genNewCandy();
        points += 1;
        powerUp = new Date().getTime();
        
        /*Add playtime*/
        //addTime();
    }
    else if (candy.xPos < -50) {
        /*Generate new candy in the game world*/
        genNewCandy();
    }
}

/*Regenerate Alien*/
function newAlien(alien) {
    alien.xPos =  alien.canvas.width + genNumRange(100, 500); 
    alien.yPos = genNumRange(character.jumpHeight, alien.canvas.height-alien.height); 
}

/*Regenerate Candy*/
function genNewCandy() {
    candy.xPos = candy.canvas.width + genNumRange(200, 800); 
    candy.yPos = genNumRange(character.jumpHeight, candy.canvas.height-candy.height); 
}

/*Regenerate Enemy*/
function genNewEnemy(enemy) {
    enemy.yPos = enemy.canvas.height - genNumRange(200, 500); 
    enemy.xPos = genNumRange(25, enemy.canvas.width-enemy.width); 
}