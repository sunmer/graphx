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
  let player: Entity = new Entity(20, 20, 2, "#dddddd");
  let enemy: Entity = new Entity(50, 50, 3, "#d7ff07");
  let playerController: Controller = new Controller(player);

  let draw = (entity: Entity) => {
    context.beginPath();
    context.rect(entity.x, entity.y, entity.radius, entity.radius);
    context.fillStyle = entity.color;
    context.closePath();
    context.fill();
  }

  document.onkeydown = event => playerController.keydown(event);

  let updateEnemy = () => {
    if(enemy.x >= player.x) 
      enemy.x -= movementStep;
    
    if(enemy.x <= player.x)
      enemy.x += movementStep;  
    
    if(enemy.y <= player.y)
      enemy.y += movementStep;  
    
    if(enemy.y >= player.y)
      enemy.y -= movementStep;

    return enemy;
  }

  let updatePlayer = () => {
    if(canMoveUp(player) && playerController.isMoving.up)
      player.y -= movementStep;
    if(canMoveRight(player) && playerController.isMoving.right)
      player.x += movementStep;
    if(canMoveDown(player) && playerController.isMoving.down)
      player.y += movementStep;
    if(canMoveLeft(player) && playerController.isMoving.left)
      player.x -= movementStep;
  }

  let canMoveLeft = (entity: Entity) => entity.x > 0;
  let canMoveRight = (entity: Entity) => entity.x + entity.radius < canvas.width;
  let canMoveDown = (entity: Entity) => entity.y + entity.radius < canvas.height;
  let canMoveUp = (entity: Entity) => entity.y > 0;

  setInterval(() => {
    if(frame.index === frame.length)
      frame.index = 0;
    
    if(frame.index % enemy.speed === 0)
      updateEnemy();
    if(frame.index % player.speed === 0)
      updatePlayer();

    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(player);
    draw(enemy);

    frame.index++
  }, frame.rate);

}, false);