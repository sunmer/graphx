const canvasWidth = 200;
const canvasHeight = 200;

document.addEventListener("DOMContentLoaded", function() {
  const canvas = <HTMLCanvasElement> document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const context = canvas.getContext("2d");

  let player = { x: 20, y: 20 };
  let enemy = { x: 80, y: 80 };
  let radius = 5;
  let movementStep = 2;

  let drawCircle = (x, y, color) => {
    context.beginPath();
    context.arc(x, y, radius, 0,2 * Math.PI);
    context.fillStyle = color;
    context.lineWidth = 1;
    context.closePath();
    context.fill();
    context.stroke();
  }

  let update = (enemy, player) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(enemy.x, enemy.y, "#f7ff00");
    drawCircle(player.x, player.y, "#ddd");
  }

  document.onkeydown = event => {
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

  let moveEnemy = (enemy) => {
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

  setInterval(() => {
    enemy = moveEnemy(enemy);
    update(enemy, player);
  }, 50);

}, false);