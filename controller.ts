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
        this.btnDown();
        break;
      case 39:
        this.btnRight();
        break;
      case 38:
        this.btnUp();
        break;
      case 37:
        this.btnLeft();
        break;
    }
  }

  btnUp = () => {
    this.isMoving.up = true;
  };
  btnDown = () => {
    this.isMoving.down = true;
  }
  btnLeft = () => {
    this.isMoving.left = true;
  }
  btnRight = () => {
    this.isMoving.right = true;
  }

  resetMoves = () => {
    this.isMoving = { up: false, down: false, left: false, right: false };
  }

}