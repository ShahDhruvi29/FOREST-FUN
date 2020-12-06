var PLAY =1;
var END =0;
var gameState= PLAY;
var gameOver,restart;
var gameOverImage,restartImage;
var monkey,Monkey_running;
var obstacle,obstaclesGroup,obstacleImage;
var banana,bananaGroup,bananaImage;
var backImage;
var SurvivalTime = 0;
var ground;
var jungle;
var score = 0;

function preload() {
backImage=loadImage("jungle.jpg") 
gameOverImage =loadImage("gameOver.png")
restartImage=loadImage("restart.png")
Monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png",  "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png", "Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png")
  
obstacleImage=loadImage("stone.png")
  
bananaImage=loadImage("banana.png")
}

function setup() {
  createCanvas(800, 400);
  
   jungle=createSprite(0,0,400,1600)
   jungle.addImage("jungle.jpg",backImage)
   jungle.x=jungle.width/2
   jungle.scale=1.5
   jungle.velocityX=-4
      monkey = createSprite(100,340,20,50);
     monkey.addAnimation("running",Monkey_running)
    monkey.scale= 0.1
  gameOver=createSprite(300,100,10,10)
  gameOver.addImage("gameOver.png",gameOverImage)
  gameOver.scale=1.5
  restart=createSprite(300,140,10,10)
  restart.addImage("restart.png",restartImage)
  restart.scale=1.0
     ground = createSprite(400,350,800,10)
     ground.x = ground.width /2;
     ground.visible=false;
     bananaGroup = new Group();
     obstaclesGroup = new Group();
     
     SurvivalTime = 0;
     jungle.visible=true;
  drawSprites();
}

function draw() {
  background(220)
    
if(gameState===PLAY){

  gameOver.visible=false;
  restart.visible=false;
    if (jungle.x<100) {
    jungle.x=jungle.width/2
    }
    if (keyDown("space")&&monkey.y<=340) {
    monkey.velocityY=-12
    }
     monkey.velocityY=monkey.velocityY+1.5
     spawnFruits()
     spawnObstacles()
      monkey.collide(ground) 
     if (bananaGroup.isTouching(monkey)) { 
      switch(banana){
        case 10: monkey.scale=0.12;
        break;
        case 20: monkey.scale=0.14;
        break;
        case 30: monkey.scale=0.16;
        break;
        case 40: monkey.scale=0.18;
        break;
            default: break;
        }
      }
     if (obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.1;
       gameState=END;
         }  
    }
else if (gameState===END){
   
  jungle.velocityX=0;
   ground.velocityX=0;
   bananaGroup.setVelocityXEach(0);
   obstaclesGroup.setVelocityXEach(0);
   monkey.velocityY=0;
   obstaclesGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
 gameOver.visible=true;
  restart.visible=true;
  SurvivalTime.visible=false;
   if(mousePressedOver(restart)) {
   reset();
    
  }
 }
  
   drawSprites();
   stroke("white")
        textSize(20)
        fill("white")
        SurvivalTime=Math.ceil(frameCount/frameRate())
        text("SURVIVAL-TIME:"+SurvivalTime,100,50)

} 
 
  function reset(){

  gameState = PLAY;
  
gameOver.visible=false;
 restart.visible=false;
    
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  }
  

function spawnFruits() {
  if (frameCount%80===0) {
  var banana = createSprite(800,200,10,10);
  banana.addAnimation("Banana.png",bananaImage)
  banana.scale=0.05;
  banana.y=Math.round(random(120,200))
  banana.velocityX=-4
  banana.lifetime=200
  bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount%300===0) {
  var obstacle = createSprite(800,340,10,10);
  obstacle.addAnimation("Stone.png",obstacleImage)
  obstacle.scale=0.15
  obstacle.velocityX=-5
  obstacle.lifetime=160
  obstaclesGroup.add(obstacle);
  }
}