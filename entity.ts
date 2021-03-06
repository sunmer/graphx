export type speed = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type dimensions = { width: number, height: number };

export class Entity {
  x: number;
  y: number;
  speed: speed;
  dimensions: dimensions;
  color: string;
  
  constructor(x: number, y: number, dimensions: dimensions, speed: speed, color: string) {
    this.x = x;
    this.y = y;
    this.dimensions = dimensions;
    this.speed = speed;
    this.color = color;
  }

}