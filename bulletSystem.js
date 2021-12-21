class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }

  fire(x, y){
    this.bullets.push(createVector(x,y));
  }

  //draws all bullets
  draw(){
    fill(255,255,51);
    for (var i=0; i<this.bullets.length; i++){
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  //updates the location of all bullets   
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){

    if (this.bullets.length > 0) {
//        console.log(this.bullets)
        for (let i = 0; i < this.bullets.length; i++){     
            if (this.bullets[i].x <= 0 || this.bullets[i].y <= 0 ){
                this.bullets.splice(i,1)
//                 console.log(this.bullets)
//                console.log("removing bullet: ")
//                console.log(this.bullets)
            }
            
        }
            
            
 
    }
  


    }
}
