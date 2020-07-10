const { SpriteType } = require("../helper")

class GameWorld {
    constructor(size){
        this.sizeX = size;
        this.sizeY = size;
        this.objects = [];
        this.score = 0;
    }

    addSprite(sprite){
        if(sprite.x >= this.sizeX
            && sprite.x < 0  
            && sprite.y >= this.sizeY
            && sprite.y < 0)
        {
            throw new Exception("Input exceeds the limit!")
        }
        this.objects.push(sprite);
    }
    
    roam(zombie, moves) {
        console.log(`start roaming at ${zombie.posToString()}`);
        const aliveCreatures = this.objects.filter(creature => creature.type !== SpriteType.ZOMBIE);
        while(moves.length!==0){
            zombie.move(this, moves.pop());
            let hits = aliveCreatures.filter(creature => (creature.x === zombie.x && creature.y === zombie.y));
            if(hits.length === 0){
                continue;
            }

            hits.forEach(hit => {
                if(hit.type !== SpriteType.ZOMBIE){
                    hit.changeType(SpriteType.ZOMBIE)
                    this.score += 1;
                    console.log(`*** new zombie : ${hit.posToString()} ***`)
                }
            });
        }
        zombie.roamed = true;
    }

    updateTheWorld(firstZombie, moves){
        const movesArray = Array.from(moves).reverse();
        console.log("Start");
        let no =1;
        while(true) {
            console.log(`------------------------ zombie : ${no++} ------------------------`)
            const newZombies = this.objects.filter(object => object.type === SpriteType.ZOMBIE && !object.roamed);
            if(newZombies.length === 0){
                break;
            }
            
            this.roam(newZombies[0], [...movesArray]);
        }
    }

    findZombies() {
        return this.objects.filter(o => o.type === SpriteType.ZOMBIE);
    }

    zombiesPosToString() {
        const zombies = this.findZombies();
        const START_STRING = '';
        if(zombies.length>0){
            return zombies.reduce((pre, next) => pre + (pre === START_STRING? "": " ") + next.posToString(), START_STRING);
        }
    }

}

module.exports = GameWorld;