const canvasWidth = 200;
const canvasHeight = 200;

interface Entity {
  x: number;
  y: number;
  speed: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  movement?: {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = <HTMLCanvasElement> document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const context = canvas.getContext("2d");
  const frame = { rate: 10, index: 0, length: 9 }
  const movementStep = 1;
  let player: Entity = { 
    x: 20, 
    y: 20, 
    speed: 6, 
    movement: { 
      up: false, 
      down: false, 
      left: false, 
      right: false 
    } 
  };
  let enemy: Entity = { 
    x: 80, 
    y: 80, 
    speed: 9
  };
  let radius = 5;

  let draw = (x, y, color) => {
    context.beginPath();
    context.rect(x, y, 10, 10);
    context.fillStyle = color;
    context.lineWidth = 1;
    context.closePath();
    context.fill();
    context.stroke();
  }

  document.onkeydown = event => {
    player.movement.up = false;
    player.movement.down = false;
    player.movement.left = false;
    player.movement.right = false;

    switch(event.keyCode) {
      case 65:
        console.log("a");
        break;
      case 40:
        if(!canMoveDown(player.y))
          return;
        player.movement.up = false;
        player.movement.down = true;
        break;
      case 39:
        if(!canMoveRight(player.x))
          return;
        player.movement.left = false;
        player.movement.right = true;
        break;
      case 38:
        if(!canMoveUp(player.y))
          return;
        player.movement.down = false;
        player.movement.up = true;
        break;
      case 37:
        if(!canMoveLeft(player.x)) 
          return;
        player.movement.right = false;
        player.movement.left = true;
        break;
    }
  }

  let canMoveLeft = x => x - radius > 0;
  let canMoveRight = x => x + radius < canvas.width;
  let canMoveDown = y => y + radius < canvas.height;
  let canMoveUp = y => y - radius > 0;

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
    if(player.movement.up)
      player.y -= movementStep;
    if(player.movement.right)
      player.x += movementStep;
    if(player.movement.down)
      player.y += movementStep;
    if(player.movement.left)
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