var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var trex,trex1,trex_collided;
var ground,ground1,iground;
var cloudsgroup,cloud,cloud1;
var obstaclegroup,ob1,ob2,ob3,ob4,ob5,ob6;
var gameover,gameover1;
var restart,restart1;
var score = 0;
function preload(){
  trex1 = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground1 = loadImage("ground2.png");
  cloud1 = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameover1 = loadImage("gameOver.png");
  restart1 = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png");
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,10,10);
trex.addAnimation("trex",trex1);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  ground = createSprite(200,180,400,10);
  ground.addImage("ground",ground1);
  iground = createSprite(200,190,400,10);
  iground.visible = false;
  gameover = createSprite(300,100);
  gameover.addImage("gameover",gameover1);
  restart = createSprite(300,150);
  restart.addImage("restart",restart1);
  gameover.visible = false;
  restart.visible = false;
  cloudsgroup = new Group();
  obstaclegroup = new Group();
}

function draw() {
  background("black");
   trex.collide(iground);
  text("SCORE:"+ score,500,50);
  if (gamestate === PLAY){
     ground.velocityX = -3;
    score = score + Math.round(getFrameRate()/60);
  if (ground.x<0){
    ground.x = ground.width / 2;
  }
  if (keyDown("space")){
    trex.velocityY = -13;
  }
  trex.velocityY = trex.velocityY+ 0.7;
  spawnClouds();
  spawnObstacles();
    if (obstaclegroup.isTouching(trex)){
      gamestate = END;
    }
  }
  if (gamestate === END){
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
  if(mousePressedOver(restart)){
   reset(); 
   }
  }
 
  drawSprites();
} 
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloud1);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
   cloudsgroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round( random(1,6));
    switch (rand){
      case 1:obstacle.addImage(ob1);
        break;
         case 2:obstacle.addImage(ob2);
        break;
         case 3:obstacle.addImage(ob3);
        break;
         case 4:obstacle.addImage(ob4);
        break;
         case 5:obstacle.addImage(ob5);
        break;
         case 6:obstacle.addImage(ob6);
        break;
        default:break;
    }
    obstaclegroup.add(obstacle);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.5;
    obstaclegroup.add(obstacle);
    obstacle.lifetime = 120;
  }
}
function reset(){
  gamestate = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclegroup.destroyEach();
  cloudsgroup.destroyEach();
  
  trex.addAnimation("trex",trex1);
  
  score = 0; 
}