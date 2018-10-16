import {dimensions, speed, Entity } from "./entity";

export default class Player extends Entity {

  isShooting: boolean;

  constructor(x: number, y: number, dimensions: dimensions, speed: speed, color: string) {
    super(x, y, dimensions, speed, color);
    this.isShooting = false;
  }

}