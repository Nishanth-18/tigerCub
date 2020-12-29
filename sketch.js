var jungle, jungleImage;
var tiger, tigerImage;
var hunter, hunterImage;
var rock, rockImage;
var Obstaclegroup;
var gameState = "play";
var score


function preload() {

  jungleImage = loadImage("Jungle.jpeg");
  tigerImage = loadImage("Cub.gif");
  hunterImage = loadImage("Hunter.gif");
  rockImage = loadImage("Rock.png");
}

function setup() {
  createCanvas(600, 400);

  jungle = createSprite(300, 200, 10, 10);
  jungle.addImage(jungleImage);
  jungle.velocityX = 2;

  tiger = createSprite(100, 350, 20, 20);
  tiger.addImage(tigerImage);
  tiger.scale = 0.07
  tiger.x = 200;

  hunter = createSprite(100, 348, 10, 10);
  hunter.addImage(hunterImage);
  hunter.scale = 0.30
  hunter.x = 80;

  score = 0;

  edges = createEdgeSprites();
  Obstaclegroup = new Group();

}

function draw() {
  background("black");
  fill("white");
  text("Score: " + score, 10, 20);

  camera . position . y = tiger.position.y
  {
    if (gameState === "play") {
      // MAKING THE SCORE INCREASE
      score = score + Math.round(getFrameRate() / 60);

      // MAKING THE JUNGLR INFINITE 
      if (jungle.x > 400) {
        jungle.x = 300;
      }

      // GIVING CONTROLS FOR THE TIGER
      if (keyDown("space")) {
        tiger.velocityY = -10;
      }

      // GIVING GRAVITY FOR THE TIGER
      tiger.velocityY = tiger.velocityY + 0.5;

    // MAKING THE HUNTER JUMP AUTOMATICALLY WHEN IT NEARS THE ROCK
      if (hunter.isTouching(Obstaclegroup)) {
        hunter.velocityY = -10;
      }

      //GIVING GRAVITY FOR THE HUNTER
      hunter.velocityY = hunter.velocityY + 0.5;

      // MAKING TIGER AND HUNTER STAND ON THE GROUND
      tiger.collide(edges[3]);
      hunter.collide(edges[3]);

      spawnObstacles();
      drawSprites();
    }

    // MAKING THE TIGER DESTROY WHEN IT TOUCHES THE ROCK
    if (tiger.isTouching(Obstaclegroup)) {
      tiger.destroy();
      gameState = "end";
    }

    // MAKING THE TIGER DESTROY WHEN VALUE OF Y IS SMALLER THAN 150
    if (tiger.y < 150) {
      tiger.destroy();
      gameState = "end";
    }

    // MAKING THE GAME OVER TEXT VISIBLE
    if (gameState === "end") {
      fill("yellow")
      text("GAME OVER!!", 250, 200);
    }

  }
}


function spawnObstacles() {
  if (frameCount % 200 === 0) {
    rock = createSprite(600, 370, 10, 10);
    rock.velocityX = -2;
    rock.addImage(rockImage);
    rock.scale = 0.04;

    Obstaclegroup.add(rock);
  }
}

