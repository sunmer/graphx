import Entity from "./entity";

export default class Controller {

  entity: Entity;
  isMoving: { up: boolean, down: boolean, left: boolean, right: boolean };

  constructor(entity: Entity) {
    this.entity = entity;
    this.isMoving = { up: false, down: false, left: false, right: false };
  }

  keydown = (event: KeyboardEvent) => {
    this.resetMoves();

    switch(event.keyCode) {
      case 65:
        console.log("a");
        break;
      case 40:
        this.isMoving.down = true;
        break;
      case 39:
        this.isMoving.right = true;
        break;
      case 38:
        this.isMoving.up = true;
        break;
      case 37:
        this.isMoving.left = true;
        break;
    }
  }

  resetMoves = () => {
    this.isMoving = { up: false, down: false, left: false, right: false };
  }

}