import Player from "./player";
import Enemy from "./player";
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
  const frame = { rate: 10, index: 0, length: 9 }
  const movementStep = 1;
  let timeElapsed = 1;
  let player: Player = new Player(20, 100, { width: 10, height: 10 }, 1, "#dddddd");
  let enemy: Enemy = new Enemy(canvasWidth / 2, canvasHeight / 2, { width: 10, height: 10 }, 2, "#c52323");

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

  let animatePlayer = (player: Player) => {
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

  let animateEnemy = (enemy: Enemy) => {
    if(canMoveUp(enemy) && enemy.y > player.y)
      enemy.y -= movementStep;
    if(canMoveRight(enemy) && enemy.x < player.x)
      enemy.x += movementStep;
    if(canMoveDown(enemy) && enemy.y < player.y)
      enemy.y += movementStep;
    if(canMoveLeft(enemy) && enemy.x > player.x) 
      enemy.x -= movementStep;
  }

  let animateBullets = (player: Player) => {
    for(let i = 0; i < player.bullets.length; i++) {
      player.bullets[i].y -=1;
    }
  }

  let canMoveLeft = (entity: Entity) => entity.x > 0;
  let canMoveRight = (entity: Entity) => entity.x + entity.dimensions.width < canvasWidth;
  let canMoveDown = (entity: Entity) => entity.y + entity.dimensions.height < canvasHeight;
  let canMoveUp = (entity: Entity) => entity.y > 0;
  let hasExitedCanvas = (entity: Entity) => entity.x < 0 || entity.x > canvasWidth || entity.y < 0 || entity.y > canvasHeight;
  let areColliding = (entity: Entity, entities: Entity[]) => {
    for(let i = 0; i < entities.length; i++) {
      if(entity.x > (entities[i].x + entities[i].dimensions.width) || 
        (entity.x + entity.dimensions.width) < entities[i].x || 
        entity.y > (entities[i].y + entities[i].dimensions.height) ||
        (entity.y + entity.dimensions.height) <  entities[i].y) {
          return false;
        }
    }
    return true;
  }

  let timer = setInterval(() => {
    timeElapsed++;
    contextTimer.clearRect(0, 0, canvasWidth, canvasHeight);
    drawText(timeElapsed.toString());
  }, 1000);

  drawText(timeElapsed.toString());

  let gamePlay = setInterval(() => {
    if(areColliding(player, [enemy])) {
      clearInterval(gamePlay);
      clearInterval(timer);
    } else {
      if(frame.index === frame.length)
        frame.index = 0;
    
      if(frame.index % player.speed === 0)
        animatePlayer(player);
      if(frame.index % enemy.speed === 0)
        animateEnemy(enemy);

      animateBullets(player);
      
      contextGamePlay.clearRect(0, 0, canvasWidth, canvasHeight);
      drawEntity(player);
      drawEntity(enemy);
      for(let i = 0; i < player.bullets.length; i++)
        drawEntity(player.bullets[i]);
      
      frame.index++
    }
  }, frame.rate);

}, false);