import Entity from "./entity";

export default class Controller {

  entity: Entity;
  isMoving: { up: boolean, down: boolean, left: boolean, right: boolean };

  constructor(entity: Entity) {
    this.entity = entity;
    this.isMoving = { up: false, down: false, left: false, right: false };
  }

  keydown = (event: KeyboardEvent) => {
    switch(event.keyCode) {
      case 65:
        console.log("a");
        break;
      case 40:
        if(!this.entity.canMoveDown())
          return;
        this.btnDown();
        break;
      case 39:
        if(!this.entity.canMoveRight())
          return;
        this.btnRight();
        break;
      case 38:
        if(!this.entity.canMoveUp())
          return;
        this.btnUp();
        break;
      case 37:
        if(!this.entity.canMoveLeft()) 
          return;
        this.btnLeft();
        break;
    }
  }

  btnUp = () => { 
    this.resetMoves();
    this.isMoving.up = true;
  };
  btnDown = () => {
    this.resetMoves();
    this.isMoving.down = true;
  }
  btnLeft = () => { 
    this.resetMoves();
    this.isMoving.left = true;
  }
  btnRight = () => { 
    this.resetMoves();
    this.isMoving.right = true;
  }

  resetMoves = () => {
    this.isMoving = { up: false, down: false, left: false, right: false };
  }

}