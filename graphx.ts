const canvasWidth = 200;
const canvasHeight = 200;

document.addEventListener("DOMContentLoaded", function() {
  const canvas = <HTMLCanvasElement> document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const context = canvas.getContext("2d");

  let player = { x: 20, y: 20 };
  let enemy = { x: 40, y: 40 };
  let radius = 5;
  let movementStep = 2;

  function drawCircle(x, y, color) {
    context.beginPath();
    context.arc(x, y, radius, 0,2 * Math.PI);
    context.fillStyle = color;
    context.lineWidth = 1;
    context.closePath();
    context.fill();
    context.stroke();
  }

  let drawEnemy = (x, y) => drawCircle(x, y, "#f7ff00");
  let drawPlayer = (x, y) => drawCircle(x, y, "#ddd");

  document.onkeydown = function(event) {
    switch(event.keyCode) {
      case 65:
        console.log("a");
        break;
      case 40:
        if(!canMoveDown(player.y))
          return;
        player.y += movementStep;
        break;
      case 39:
        if(!canMoveRight(player.x))
          return;
        player.x += movementStep;
        break;
      case 38:
        if(!canMoveUp(player.y))
          return;
        player.y -= movementStep;
        break;
      case 37:
        if(!canMoveLeft(player.x)) 
          return;
        player.x -= movementStep;
        break;
    }
  }

  let canMoveLeft = x => x - radius > 0;
  let canMoveRight = x => x + radius < canvas.width;
  let canMoveDown = y => y + radius < canvas.height;
  let canMoveUp = y => y - radius > 0;

  let moveEnemy = () => {
    let movement = Math.random();
    if(movement <= .25) {
      if(!canMoveDown(enemy.x))
        return;
      enemy.x += movementStep;
    } 
    if(movement > .25 && movement <= .5) {
      if(!canMoveRight(enemy.x))
        return;
      enemy.x += movementStep;
    } 
    if(movement > .5 && movement <= .75) {
      if(!canMoveUp(enemy.x))
        return;
      enemy.x -= movementStep;
    } 
    if(movement > .75) {
      if(!canMoveLeft(enemy.x))
        return;
      enemy.x -= movementStep;
    }
  }

  setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(player.x, player.y);
    moveEnemy();
    drawEnemy(enemy.x, enemy.x);
  }, 50);

}, false);