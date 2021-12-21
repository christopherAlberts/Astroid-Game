var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var Asteroids_Destroyed = 0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
    
  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
    
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
    score()
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(50,205,50);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
//    console.log(this.asteroids.locations.length)
    
//    spaceship-2-asteroid collisions
    for (let i = 0; i < this.asteroids.locations.length; i++){
        if (isInside(this.asteroids.locations[i] , this.asteroids.diams[i], this.spaceship.location, this.spaceship.size) == true){
        console.log("spaceship-2-asteroid collisions occured")
        this.gameOver() 
        }  
    }

//    asteroid-2-earth collisions
    for (let i = 0; i < this.asteroids.locations.length; i++){
        if (isInside(this.asteroids.locations[i] , this.asteroids.diams[i], this.earthLoc, this.earthSize.x) == true){
        console.log("asteroid-2-earth collisions occured")
        this.gameOver() 
        }  
    }

//    spaceship-2-earth
    if (isInside(this.spaceship.location , this.spaceship.size, this.earthLoc, this.earthSize.x) == true){
    console.log("spaceship-2-earth collisions occured")
    this.gameOver() 
    }  
    
    //spaceship-2-atmosphere
    if (isInside(this.spaceship.location , this.spaceship.size, this.atmosphereLoc, this.atmosphereSize.x) == true){
    console.log("spaceship-2-atmosphere")
    this.spaceship.setNearEarth()
    }  

    //bullet collisions
    for (let i = 0; i < this.spaceship.bulletSys.bullets.length; i++){ 
        
        for (let j = 0; j < this.asteroids.locations.length; j++){
            if (isInside(this.asteroids.locations[j] , this.asteroids.diams[j], this.spaceship.bulletSys.bullets[i] , this.spaceship.bulletSys.diam) == true)
            {
                console.log("bullet collisions collisions occured")
                this.add_score()
                this.asteroids.destroy(j)
            }  
        }
    
    }
//    

}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    
//    console.log("locA " + locA)
//    console.log("sizeA " + sizeA)
//    console.log("locB " + locB)
//    console.log("sizeB " + sizeB)
    
    const vector = locA.copy().sub(locB);
//    console.log("vector: " + vector)
    const overlap = vector.mag() - (sizeA/2 + sizeB/2);  
//    console.log("OVERLAPPING: " + overlap)
    
    if(overlap < 0 ){
        console.log("overlappig")
       return true
       }
    else{
        return false
    } 
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
    if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
    if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
    if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  console.log("GAME OVER!!!!!!!!!")
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

function score(){
    textSize(26);
    fill(color('white'));
    textAlign(LEFT);
    text('Asteroids Destroyed: ' + Asteroids_Destroyed, 100, 90);
}

function add_score(){
    console.log("SCORE!!!!!!!!!")
    Asteroids_Destroyed = Asteroids_Destroyed + 1

}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){  
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
