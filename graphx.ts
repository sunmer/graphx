import Player from "./player";
import { Entity } from "./entity";


const canvasWidth = 200;
const canvasHeight = 200;

document.addEventListener("DOMContentLoaded", () => {
  const canvasGamePlay = <HTMLCanvasElement> document.getElementById("canvasGamePlay");
  canvasGamePlay.width = canvasWidth;
  canvasGamePlay.height = canvasHeight;

  const canvasTimer = <HTMLCanvasElement> document.getElementById("canvasTimer");
  canvasTimer.width = canvasWidth;
  canvasTimer.height = canvasHeight;

  const contextGamePlay = canvasGamePlay.getContext("2d");
  const contextTimer = canvasTimer.getContext("2d");
  const movementStep = 1;
  let timeElapsed = 1;
  let player: Player = new Player(20, 100, { width: 10, height: 10 }, 1, "#dddddd");
  let enemies: Array<Entity> = [];

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

  let drawText = (text: string) => {
    contextTimer.font = "30px Arial";
    contextTimer.fillStyle = "#444";
    contextTimer.textAlign = "center";
    contextTimer.fillText(text, canvasTimer.width / 2, 50);
  }

  let spawEnemy = () => {
    enemies.push(new Entity(
      canvasWidth / 2, 
      canvasHeight / 2, 
      { width: 10, height: 10 }, 
      4, 
      "#c52323")
    );
  }

  document.onkeydown = event => {
    player.isShooting = false;
  
    switch(event.keyCode) {
      case 32:
        player.bullets.push(new Entity(
          player.x, 
          player.y, 
          { width: 4, height: 4 }, 
          2, 
          "#000000"
        ));
        break;
      case 40:
        player.resetMoves();
        player.isMoving.down = true;
        break;
      case 39:
        player.resetMoves();
        player.isMoving.right = true;
        break;
      case 38:
        player.resetMoves();
        player.isMoving.up = true;
        break;
      case 37:
        player.resetMoves();
        player.isMoving.left = true;
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
    if(canMoveUp(enemy) && enemy.y > player.y)
      enemy.y -= movementStep;
    if(canMoveRight(enemy) && enemy.x < player.x)
      enemy.x += movementStep;
    if(canMoveDown(enemy) && enemy.y < player.y)
      enemy.y += movementStep;
    if(canMoveLeft(enemy) && enemy.x > player.x) 
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
  let areColliding = (entity1: Entity, entity2: Entity) =>
    !(entity1.x > (entity2.x + entity2.dimensions.width) ||
      (entity1.x + entity1.dimensions.width) < entity2.x || 
      entity1.y > (entity2.y + entity2.dimensions.height) ||
      (entity1.y + entity1.dimensions.height) <  entity2.y)

  let timer = setInterval(() => {
    timeElapsed++;
    contextTimer.clearRect(0, 0, canvasWidth, canvasHeight);
    drawText(timeElapsed.toString());
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
      if(index % player.speed === 0)
        movePlayer(player);

      enemies.map(enemy => {
        if(index % enemy.speed === 0)
          moveEnemy(enemy);  
      });

      moveBullets(player);

      enemies.map((enemy, i) => {
        if(areColliding(player, enemy)) {
          gameOver = true;
        }
        player.bullets.map(bullet => {
          if(areColliding(enemy, bullet)) {
            enemies.splice(i, 1);
            spawEnemy();
          }
        })
      })
    }

    contextGamePlay.clearRect(0, 0, canvasWidth, canvasHeight);
    drawEntity(player);
    enemies.map(enemy => drawEntity(enemy))
    player.bullets.map(bullet => drawEntity(bullet))
    last = now;

    if(gameOver)
      clearInterval(timer);
    else 
      requestAnimationFrame(gamePlay);
  }

  requestAnimationFrame(gamePlay);

  // Init
  (() => {
    drawText(timeElapsed.toString());
    spawEnemy();
  })();

}, false);