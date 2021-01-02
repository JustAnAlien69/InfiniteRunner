var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player,player_running;
var obstacle, obstacleImage;
var obstacleGroup
var ground;
var background,backgroundImg;

function preload(){
  backgroundImg = loadImage("EndlessRunnerBackground.jpg");
  
   player_running= loadImage("EndlessRunnerCharacter.gif")
  obstacleImage = loadImage("Obsticle.png");
 
}


function setup() {
 createCanvas(800,600);
  
  background = createSprite(0,0,1000,1000);
  background.addImage(backgroundImg);
  background.velocityX = -4;
  background.x = background.width/2;
  background.scale = 4;

  ground = createSprite(400,450,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  console.log(ground.x);

  player = createSprite(50,160,20,50);
  player.addImage(player_running);
  player.scale = 0.5;

  obstaclesGroup = createGroup();
}


function draw() {
//background(255);
  
  if (gameState === PLAY){  
    
    if(keyDown("space")&& player.y>=161){
    player.velocityY = -12;
  }

  spawnObstacles();
    
  player.velocityY = player.velocityY + 0.8; 
  
  player.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(background.x<100){
        background.x=background.width/2;
    }
    if(obstaclesGroup.isTouching(player)){
      gameState = END;
    }
  }
  
  else if(gameState === END){
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    background.velocityX = 0;
    obstaclesGroup.setLifetimeEach(-1);
    stroke("white");
    textSize(30);
    fill("white");
    text("Game Over",100,300);
  }
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 300 === 0){
   var obstacle = createSprite(600,425,10,40);
    obstacle.addImage(obstacleImage);
   obstacle.velocityX = -4;
    obstacle.scale = 0.05;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}