type speed = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export default class Entity {
  x: number;
  y: number;
  speed: speed; 
  isMoving: { up: boolean, down: boolean, left: boolean, right: boolean }

  constructor(x: number, y: number, speed: speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isMoving = { up: false, down: false, left: false, right: false };
  }
}