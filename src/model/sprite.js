const {id, MOVE} = require("../helper");
class Sprite {
  constructor( type, x, y) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.roamed= false;
  }

  changeType(newType){
    this.type = newType;
  }

  changePos(x, y){
    this.x = x;
    this.y = y;
  }

  move(world, step){
    switch(step){
      case MOVE.DOWN: 
        if(this.y === world.sizeY-1){
          this.y = 0;
          break;
        }
        this.y += 1; 
        break;

      case MOVE.UP:
        if(this.y === 0){
          this.y = world.sizeY - 1;
          break;
        }
        this.y -= 1;  
        break;

      case MOVE.LEFT: 
        if(this.x === 0){
          this.x = world.sizeX -1 ;
          break;
        }
        this.x -= 1; 
        break;

      case MOVE.RIGHT: 
        if(this.x === world.sizeX - 1){
          this.x = 0;
          break;
        }
        this.x += 1; 
        break;
      
      default: throw Exception("invalid input");
    }
    console.log(`moving to ${this.posToString()}`);
  }

  posToString(){
    return `(${this.x},${this.y})`;
  }
}

module.exports = Sprite;