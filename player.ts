import { dimensions, speed, Entity } from "./entity";

export default class Player extends Entity {

  isShooting: boolean;
  bullets: Entity[];
  isMoving: { up: boolean, down: boolean, left: boolean, right: boolean };

  constructor(x: number, y: number, dimensions: dimensions, speed: speed, color: string) {
    super(x, y, dimensions, speed, color);
    this.isShooting = false;
    this.bullets = [];
    this.isMoving = { up: false, down: false, left: false, right: false };
  }

  resetMoves() {
    this.isMoving = { up: false, down: false, left: false, right: false };
  }

}