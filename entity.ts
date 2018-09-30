type speed = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export default class Entity {
  x: number;
  y: number;
  speed: speed;
  radius = 10;
  color: string;

  constructor(x: number, y: number, speed: speed, color: string) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
  }

}