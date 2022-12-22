var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var Invisibleground
var cloud
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var PLAY = 1
var END = 0
var gamestate = PLAY
var obstaclesGroup
var cloudsGroup
var score
var jumpsound, chekpointsound, diesound




function preload()
{
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudimg = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png")
    obstacle2 = loadImage("obstacle2.png")
    obstacle3 = loadImage("obstacle3.png")
    obstacle4 = loadImage("obstacle4.png")
    obstacle5 = loadImage("obstacle5.png")
    obstacle6 = loadImage("obstacle6.png")
    gameoverimg = loadImage("gameOver.png")
    restartimg = loadImage("restart.png")
    jumpsound = loadSound("jump.mp3")
    diesound = loadSound("die.mp3")
    chekpointsound = loadSound("checkPoint.mp3")

}

function setup()
{
    createCanvas(600, 200);
    //console.log("hello"+ Math.round(random(1,10)));

    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided)
    trex.scale = 0.5;
    //trex.debug = true
    trex.setCollider("circle", 0, 0, 40,);

    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    Invisibleground = createSprite(50, 180, 20, 2)
    Invisibleground.visible = false

    //create obstacle and cloud groups.
    obstaclesGroup = createGroup();
    cloudsGroup = createGroup();

    score = 0

    gameover = createSprite(300, 100);
    gameover.addImage(gameoverimg);
    restart = createSprite(300, 140);
    restart.addImage(restartimg);
    gameover.scale = 0.5;
    restart.scale = 0.5;
    gameover.visible = false;
    restart.visible = false;

}

function spawnClouds()
{
    if(frameCount%60 == 0){
    
        cloud = createSprite(600, 100, 40, 10);
    
        cloud.velocityX = -3; 
    
        cloud.addImage(cloudimg);
    
        cloud.scale = 0.1;
    
        cloud.y = Math.round(random(10,80));
    
        cloud.depth = trex.depth;
    
        trex.depth = trex.depth + 1;

        cloud.lifetime = 205;

        cloudsGroup.add(cloud);
    }
    
}

function spawnObstacle()
{
    if (frameCount%60 == 0){

        var obstacle = createSprite(600, 165, 10, 40);
        obstacle.scale = 0.5;
        obstacle.velocityX = -6;
        var rand = Math.round(random(1,6));
        switch(rand){
            case 1: obstacle.addImage(obstacle1)
            break;
            case 2: obstacle.addImage(obstacle2)
            break;
            case 3: obstacle.addImage(obstacle3)
            break;
            case 4: obstacle.addImage(obstacle4)
            break;
            case 5: obstacle.addImage(obstacle5)
            break;
            case 6: obstacle.addImage(obstacle6)
            break;
            deafault:break;

        }
        console.log(rand)
        obstacle.lifetime = 205;
        obstaclesGroup.add(obstacle);
        //obstacle.debug = true
    }
}

function draw()
{
    background(180);

    console.log(frameCount);
    
    text("Score: " + score,500, 50);
    

    if(gamestate == PLAY)
    {

        score = score+Math.round(frameCount/100)

        //jump when the space button is pressed
        if (keyDown("space") && trex.y > 150)
        {
            trex.velocityY = -10;
            jumpsound.play();
        }
        
        trex.velocityY = trex.velocityY + 0.8
        
        
        if (ground.x < 0)
        {
            ground.x = ground.width / 2;
        }

        spawnClouds();
        spawnObstacle();

        if(obstaclesGroup.isTouching(trex))
        {
            gamestate = END
            diesound.play();
        }

        if(score % 100 == 0)
        {
            chekpointsound.play();
        }
        
    }
    else if(gamestate == END)
    {
        ground.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        trex.velocityY = 0;
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        trex.changeAnimation("collided", trex_collided);
    }
    
    trex.collide(Invisibleground);
    drawSprites();

    

}

//lifetime decreases as framecount increases
//as soon as lifetime becomes 0 obstacles desapear
//what lifetime could we set in gamestate end so that in every frame the lifetime keeps moving farther away from 0
//obstaclesGroup.setLifetimeEach(-1)