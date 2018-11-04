import Player from "./player";
import { Entity } from "./entity";

export const canvasWidth = 400;
export const canvasHeight = 400;

export let areColliding = (entity1: Entity, entity2: Entity) =>
  !(entity1.x > (entity2.x + entity2.dimensions.width) ||
    (entity1.x + entity1.dimensions.width) < entity2.x || 
    entity1.y > (entity2.y + entity2.dimensions.height) ||
    (entity1.y + entity1.dimensions.height) <  entity2.y)

export let gameState = {
  player: new Player(canvasWidth / 2, canvasHeight - 50, { width: 10, height: 10 }, 1, "#dddddd"),
  enemies: [] as Entity[],
  level: 1,
  timeElapsed: 1
}