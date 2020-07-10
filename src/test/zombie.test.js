const Sprite = require("../model/sprite");
const GameWorld = require("../model/game-world");
const { SpriteType } = require("../helper")
describe("Zombie", () => {
    let zombie, gameWorld, poorCreature, size, x, y;

    beforeEach(() => {
        size = 10;
        x =5;
        y =5;
        gameWorld = new GameWorld(size);
        zombie = new Sprite(SpriteType.ZOMBIE, x, y);
        poorCreature = new Sprite(SpriteType.ALIVE, x, y)
        gameWorld.addSprite(zombie);
        gameWorld.addSprite(poorCreature);
      });

    it("moves zombie to left", () => {
        zombie.move(gameWorld, 'l');
        console.log(zombie);
        expect(zombie.x).toEqual(x-1);
    });

    it("moves zombie to right", () => {
        zombie.move(gameWorld, 'r');
        expect(zombie.x).toEqual(x+1);
    });

    it("moves zombie down", () => {
        zombie.move(gameWorld, 'd');
        expect(zombie.y).toEqual(y+1);
    });

    it("moves zombie up", () => {
        zombie.move(gameWorld, 'u');
        expect(zombie.y).toEqual(y-1);
    });
    
    it("moves zombie over the edge", () => {
        zombie.changePos(0,4);
        console.log(zombie);
        zombie.move(gameWorld, 'l');
        expect(zombie.x).toEqual(gameWorld.sizeX-1);
        zombie.changePos(3,9);
        zombie.move(gameWorld, 'd');
        expect(zombie.y).toEqual(0);
    });

    it("zombie bites and changes alive creature", () => {
        zombie.changePos(0,0);
        poorCreature.changePos(0,1);
        gameWorld.updateTheWorld(zombie, "d");
        expect(gameWorld.findZombies().length).toEqual(2);
    });

});