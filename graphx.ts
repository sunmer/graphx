import Entity from "./entity";
import Controller from "./controller";

const canvasWidth = 200;
const canvasHeight = 200;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = <HTMLCanvasElement> document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const context = canvas.getContext("2d");
  const frame = { rate: 10, index: 0, length: 9 }
  const movementStep = 1;
  let player: Entity = new Entity(20, 20, 1, "#dddddd");
  let enemy: Entity = new Entity(50, 50, 4, "#c52323");
  let playerController: Controller = new Controller(player);
  let enemyController: Controller = new Controller(enemy);

  let draw = (entity: Entity) => {
    context.beginPath();
    context.rect(entity.x, entity.y, entity.radius, entity.radius);
    context.fillStyle = entity.color;
    context.closePath();
    context.fill();
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
  let canMoveRight = (entity: Entity) => entity.x + entity.radius < canvas.width;
  let canMoveDown = (entity: Entity) => entity.y + entity.radius < canvas.height;
  let canMoveUp = (entity: Entity) => entity.y > 0;

  setInterval(() => {
    if(frame.index === frame.length)
      frame.index = 0;
    
    if(frame.index % enemy.speed === 0)
      moveEnemy(enemyController);
    if(frame.index % player.speed === 0)
      movePlayer(playerController);

    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(player);
    draw(enemy);

    frame.index++
  }, frame.rate);

}, false);