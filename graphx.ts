import Entity from "./entity";
import Controller from "./controller";

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
  let player: Entity = new Entity(20, 100, { width: 10, height: 10 }, 1, "#dddddd");
  let enemy: Entity = new Entity(canvasWidth / 2, canvasHeight / 2, { width: 10, height: 10 }, 2, "#c52323");
  let playerController: Controller = new Controller(player);
  let enemyController: Controller = new Controller(enemy);

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

  document.onkeydown = event => playerController.keydown(event.keyCode);

  let movePlayer = (controller: Controller) => {
    if(canMoveUp(controller.entity) && controller.entity.isMoving.up)
      controller.entity.y -= movementStep;
    if(canMoveRight(controller.entity) && controller.entity.isMoving.right)
      controller.entity.x += movementStep;
    if(canMoveDown(controller.entity) && controller.entity.isMoving.down)
      controller.entity.y += movementStep;
    if(canMoveLeft(controller.entity) && controller.entity.isMoving.left)
      controller.entity.x -= movementStep;
  }

  let moveEnemy = (controller: Controller) => {
    if(canMoveUp(controller.entity) && controller.entity.y > player.y)
      controller.entity.y -= movementStep;
    if(canMoveRight(controller.entity) && controller.entity.x < player.x)
      controller.entity.x += movementStep;
    if(canMoveDown(controller.entity) && controller.entity.y < player.y)
      controller.entity.y += movementStep;
    if(canMoveLeft(controller.entity) && controller.entity.x > player.x) 
      controller.entity.x -= movementStep;
  }

  let canMoveLeft = (entity: Entity) => entity.x > 0;
  let canMoveRight = (entity: Entity) => entity.x + entity.dimensions.width < canvasWidth;
  let canMoveDown = (entity: Entity) => entity.y + entity.dimensions.height < canvasHeight;
  let canMoveUp = (entity: Entity) => entity.y > 0;
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
    if(areColliding(player, [enemy]))
      clearInterval(gamePlay)

    if(frame.index === frame.length)
      frame.index = 0;
    
    if(frame.index % player.speed === 0)
      movePlayer(playerController);
    if(frame.index % enemy.speed === 0)
      moveEnemy(enemyController);
    
    contextGamePlay.clearRect(0, 0, canvasWidth, canvasHeight);
    drawEntity(player);
    drawEntity(enemy);
  
    frame.index++
  }, frame.rate);

}, false);