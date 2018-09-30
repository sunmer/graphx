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
  let player: Entity = new Entity(canvas, 20, 20, 6);
  let enemy: Entity = new Entity(canvas, 50, 50, 9);
  let playerController: Controller = new Controller(player);

  let draw = (x: number, y: number, color: string) => {
    context.beginPath();
    context.rect(x, y, 10, 10);
    context.fillStyle = color;
    context.lineWidth = 1;
    context.closePath();
    context.fill();
    context.stroke();
  }

  document.onkeydown = event => playerController.keydown(event);

  let moveEnemy = () => {
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

  let movePlayer = () => {
    if(playerController.isMoving.up)
      player.y -= movementStep;
    if(playerController.isMoving.right)
      player.x += movementStep;
    if(playerController.isMoving.down)
      player.y += movementStep;
    if(playerController.isMoving.left)
      player.x -= movementStep;
  }

  setInterval(() => {
    if(frame.index === frame.length)
      frame.index = 0;
    
    if(frame.index % enemy.speed === 0)
      moveEnemy();
    if(frame.index % player.speed === 0)
      movePlayer();
      
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(player.x, player.y, "#dddddd");
    draw(enemy.x, enemy.y, "#f7ff00");

    frame.index++
  }, frame.rate);

}, false);