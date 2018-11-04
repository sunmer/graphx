import { gameState, canvasWidth, canvasHeight } from "./gamestate";

document.addEventListener("DOMContentLoaded", () => {
  let canvasStarField = <HTMLCanvasElement> document.getElementById("canvasStarField");
  canvasStarField.width = canvasWidth;
  canvasStarField.height = canvasHeight;

  let ctx = canvasStarField.getContext("2d"),
    fl = 300,
    count = 500,
    points: any = [],
    startSpeed = 0,
    bounds: any,
    vp: any;

  function rand( min: number, max: number ) {
    return Math.random() * ( max - min ) + min;
  }

  function resetPoint( p: any, init: object ) {
    p.z = init ? rand( 0, bounds.z.max ) : bounds.z.max;
    p.x = rand( bounds.x.min, bounds.x.max ) / ( fl / ( fl + p.z ) );
    p.y = rand( bounds.y.min, bounds.y.max ) / ( fl / ( fl + p.z ) );
    p.ox = p.x;
    p.oy = p.y;
    p.oz = p.z;
    p.vx = 0;
    p.vy = 0;
    p.vz = rand( -1, -10 ) + startSpeed;
    p.ax = 0;
    p.ay = 0;
    p.az = 0;
    p.s = 0;
    p.sx = 0;
    p.sy = 0;
    p.os = p.s;
    p.osx = p.sx;
    p.osy = p.sy;
    p.hue = rand( 120, 200 );
    p.lightness = rand( 70, 100 );
    p.alpha = 0;
    return p;
  }

  function create() {
    vp = {
      x: canvasWidth / 2,
      y: canvasHeight / 2
    };
    bounds = {
      x: { min: -vp.x, max: canvasWidth - vp.x },
      y: { min: -vp.y, max: canvasHeight - vp.y },
      z: { min: -fl, max: 1000 }
    };
  }

  let level = gameState.level;

  function update() {
    if(gameState.player.isMoving.left && vp.x !< canvasWidth)
      vp.x += .5;
    if(gameState.player.isMoving.right && vp.x !> 0)
      vp.x -= .5;
    if(gameState.player.isMoving.up && vp.y !< canvasHeight)
      vp.y += .5;
    if(gameState.player.isMoving.down && vp.y !> canvasHeight)
      vp.y -= .5;

    if(level < gameState.level) {
      if( startSpeed > -30 ) {
        startSpeed -= 0.1;
      } else {
        startSpeed = -30;
      }
      if( startSpeed < 0 ) {
        startSpeed += 1;
      } else {
        startSpeed = 0;
        level = gameState.level;
      }
    }

    bounds = {
      x: { min: -vp.x, max: canvasWidth - vp.x },
      y: { min: -vp.y, max: canvasHeight - vp.y },
      z: { min: -fl, max: 1000 }
    };  
    
    if( points.length < count ) {
      points.push( resetPoint( {}, undefined ) );
    }
    let i = points.length;
    while(i--) {
      let p = points[ i ];
      p.vx += p.ax;
      p.vy += p.ay;
      p.vz += p.az;
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      if(level < gameState.level) {
        p.az = -0.5;
      }
      if(p.sx - p.sr > bounds.x.max ||
         p.sy - p.sr > bounds.y.max ||
         p.z > bounds.z.max ||
         p.sx + p.sr < bounds.x.min ||
         p.sy + p.sr < bounds.y.min ||
         p.z < bounds.z.min) {
          resetPoint( p, undefined);
         }
      
      p.ox = p.x;
      p.oy = p.y;
      p.oz = p.z;
      p.os = p.s;
      p.osx = p.sx;
      p.osy = p.sy;
    }
  }

  function render() {
    ctx.save();
    ctx.translate( vp.x, vp.y );
    ctx.clearRect( -vp.x, -vp.y, canvasWidth, canvasHeight );
    let i = points.length;
    while(i--) {
      let p = points[ i ];    
      p.s = fl / ( fl + p.z );
      p.sx = p.x * p.s;
      p.sy = p.y * p.s;
      p.alpha = ( bounds.z.max - p.z ) / ( bounds.z.max / 2 );
      ctx.beginPath();
      ctx.moveTo( p.sx, p.sy );
      ctx.lineTo( p.osx, p.osy );
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'hsla(' + p.hue + ', 100%, ' + p.lightness + '%, ' + p.alpha + ')';
      ctx.stroke();
    }
    ctx.restore();
  }

  function loop() {
    requestAnimationFrame( loop );
    update();
    render();
  }

  create();
  loop();
});