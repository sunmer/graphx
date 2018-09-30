type speed = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export default class Entity {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  speed: speed;
  radius = 10;

  constructor(canvas: HTMLCanvasElement, x: number, y: number, speed: speed) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  canMoveLeft = () => this.x - this.radius > 0;
  canMoveRight = () => this.x + this.radius < this.canvas.width;
  canMoveDown = () => this.y + this.radius < this.canvas.height;
  canMoveUp = () => this.y - this.radius > 0;

}