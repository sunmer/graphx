import Player from "./player";
import { Entity } from "./entity";
import { gameState, areColliding, canvasWidth, canvasHeight } from "./gamestate";

document.addEventListener("DOMContentLoaded", () => {
  
  const canvasGamePlay = <HTMLCanvasElement> document.getElementById("canvasGamePlay");
  canvasGamePlay.width = canvasWidth;
  canvasGamePlay.height = canvasHeight;

  const canvasTimer = <HTMLCanvasElement> document.getElementById("canvasTimer");
  canvasTimer.width = canvasWidth;
  canvasTimer.height = canvasHeight;

  const contextGamePlay = canvasGamePlay.getContext("2d");
  const contextGameStats = canvasTimer.getContext("2d");
  const movementStep = 1;

  let drawEntity = (entity: Entity) => {
    contextGamePlay.beginPath();
    contextGamePlay.rect(
      entity.x, 
      entity.y, 
      entity.dimensions.width, 
      entity.dimensions.width
    );
    contextGamePlay.fillStyle = entity.color;
    contextGamePlay.closePath();
    contextGamePlay.fill();
  }

  let drawTimer = (text: string) => {
    contextGameStats.font = "30px Arial";
    contextGameStats.fillStyle = "#ffffff";
    contextGameStats.textAlign = "center";
    contextGameStats.fillText(text, canvasTimer.width / 2, 50);
  }

  let drawLevel = (text: string) => {
    contextGameStats.font = "14px Arial";
    contextGameStats.fillStyle = "#ffffff";
    contextGameStats.textAlign = "left";
    contextGameStats.fillText("Level: " + text, 10, 20);
  }

  let spawEnemy = () => {
    gameState.enemies.push(new Entity(
      Math.round(Math.random() * canvasWidth),
      20, 
      { width: 10, height: 10 }, 
      1, 
      "#c52323")
    );
  }

  document.onkeydown = event => {
    gameState.player.isShooting = false;
  
    switch(event.keyCode) {
      case 32:
        gameState.player.bullets.push(new Entity(
          gameState.player.x, 
          gameState.player.y, 
          { width: 4, height: 4 }, 
          2, 
          gameState.player.bulletColor
        ));
        break;
      case 40:
        gameState.player.resetMoves();
        gameState.player.isMoving.down = true;
        break;
      case 39:
        gameState.player.resetMoves();
        gameState.player.isMoving.right = true;
        break;
      case 38:
        gameState.player.resetMoves();
        gameState.player.isMoving.up = true;
        break;
      case 37:
        gameState.player.resetMoves();
        gameState.player.isMoving.left = true;
        break;
    }
  }

  let movePlayer = (player: Player) => {
    if(canMoveUp(player) && player.isMoving.up)
      player.y -= movementStep;
    if(canMoveRight(player) && player.isMoving.right)
      player.x += movementStep;
    if(canMoveDown(player) && player.isMoving.down)
      player.y += movementStep;
    if(canMoveLeft(player) && player.isMoving.left)
      player.x -= movementStep;
    for(let i = 0; i < player.bullets.length; i++) {
      if(hasExitedCanvas(player.bullets[i]))
        player.bullets.splice(i, 1);
    }
  }

  let moveEnemy = (enemy: Entity) => {
    if(canMoveUp(enemy) && enemy.y > gameState.player.y)
      enemy.y -= movementStep;
    if(canMoveRight(enemy) && enemy.x < gameState.player.x)
      enemy.x += movementStep;
    if(canMoveDown(enemy) && enemy.y < gameState.player.y)
      enemy.y += movementStep;
    if(canMoveLeft(enemy) && enemy.x > gameState.player.x) 
      enemy.x -= movementStep;
  }

  let moveBullets = (player: Player) => {
    for(let i = 0; i < player.bullets.length; i++) {
      player.bullets[i].y -=1;
    }
  }

  let canMoveLeft = (entity: Entity) => entity.x > 0;
  let canMoveRight = (entity: Entity) => entity.x + entity.dimensions.width < canvasWidth;
  let canMoveDown = (entity: Entity) => entity.y + entity.dimensions.height < canvasHeight;
  let canMoveUp = (entity: Entity) => entity.y > 0;
  let hasExitedCanvas = (entity: Entity) => entity.x < 0 || entity.x > canvasWidth || entity.y < 0 || entity.y > canvasHeight;
  
  let gameStats = setInterval(() => {
    gameState.timeElapsed++;
    contextGameStats.clearRect(0, 0, canvasWidth, canvasHeight);
    drawTimer(gameState.timeElapsed.toString());
    drawLevel(gameState.level.toString());
  }, 1000);

  let duration = 0;
  let last = window.performance.now();
  let step = 1/60;

  let gamePlay = function() {
    let gameOver = false;
    let now = window.performance.now();
    duration = duration + Math.min(1, (now - last) / 1000);
    while(duration > step) {
      let index = Math.round(now / 10) % 10;
      
      duration = duration - step;
      if(index % gameState.player.speed === 0)
        movePlayer(gameState.player);

      gameState.enemies.map(enemy => {
        if(index % enemy.speed === 0)
          moveEnemy(enemy);  
      });

      moveBullets(gameState.player);

      gameState.enemies.map((enemy, enemyIndex) => {
        if(areColliding(gameState.player, enemy))
          gameOver = true;
        
        gameState.player.bullets.map((bullet, bulletIndex) => {
          if(areColliding(enemy, bullet)) {
            gameState.enemies.splice(enemyIndex, 1);
            gameState.player.bullets.splice(bulletIndex, 1);
            gameState.level++;
            spawEnemy();
          }
        })
      })
    }

    contextGamePlay.clearRect(0, 0, canvasWidth, canvasHeight);
    drawEntity(gameState.player);
    gameState.enemies.map(enemy => drawEntity(enemy))
    gameState.player.bullets.map(bullet => drawEntity(bullet))
    last = now;

    if(gameOver)
      clearInterval(gameStats);
    else 
      requestAnimationFrame(gamePlay);
  }

  requestAnimationFrame(gamePlay);

  // Init
  (() => {
    drawTimer(gameState.timeElapsed.toString());
    drawLevel(gameState.level.toString());
    spawEnemy();
  })();

}, false);