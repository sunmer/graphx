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
  let timeElapsed = 0;
  let player: Entity = new Entity(20, 20, 1, "#dddddd");
  let enemy: Entity = new Entity(50, 50, 9, "#c52323");
  let playerController: Controller = new Controller(player);
  let enemyController: Controller = new Controller(enemy);

  let drawEntity = (entity: Entity) => {
    contextGamePlay.beginPath();
    contextGamePlay.rect(entity.x, entity.y, entity.radius, entity.radius);
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
    if(controller.entity.x > player.x) 
      controller.entity.x -= movementStep;
    if(controller.entity.x < player.x)
      controller.entity.x += movementStep;  
    if(controller.entity.y < player.y)
      controller.entity.y += movementStep;
    if(controller.entity.y > player.y)
      controller.entity.y -= movementStep;
  }

  let canMoveLeft = (entity: Entity) => entity.x > 0;
  let canMoveRight = (entity: Entity) => entity.x + entity.radius < canvasWidth;
  let canMoveDown = (entity: Entity) => entity.y + entity.radius < canvasHeight;
  let canMoveUp = (entity: Entity) => entity.y > 0;

  let gamePlay = setInterval(() => {
    if(frame.index === frame.length)
      frame.index = 0;
    
    if(frame.index % enemy.speed === 0)
      moveEnemy(enemyController);
    if(frame.index % player.speed === 0)
      movePlayer(playerController);

    contextGamePlay.clearRect(0, 0, canvasWidth, canvasHeight);
    drawEntity(player);
    drawEntity(enemy);

    frame.index++
  }, frame.rate);
  
  let timer = setInterval(() => {
    contextTimer.clearRect(0, 0, canvasWidth, canvasHeight);
    drawText(timeElapsed.toString());
    timeElapsed++;
  }, 1000)

}, false);