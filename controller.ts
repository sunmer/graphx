import Entity from "./entity";

export default class Controller {

  entity: Entity;

  constructor(entity: Entity) {
    this.entity = entity;
  }

  keydown = (keyCode: number) => {
    this.resetMoves();

    switch(keyCode) {
      case 65:
        console.log("a");
        break;
      case 40:
        this.entity.isMoving.down = true;
        break;
      case 39:
        this.entity.isMoving.right = true;
        break;
      case 38:
        this.entity.isMoving.up = true;
        break;
      case 37:
        this.entity.isMoving.left = true;
        break;
    }
  }

  resetMoves = () => {
    this.entity.isMoving = { up: false, down: false, left: false, right: false };
  }

}