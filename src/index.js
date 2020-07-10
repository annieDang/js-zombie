#!/usr/bin/env node

const inquirer = require('inquirer');
const GameWorld = require("./model/game-world");
const Sprite = require("./model/sprite");
const { SpriteType, validatePosition, getX, getY } = require("./helper")
console.log('Welcome to the Zombie Game');

const questions = [
 {
    type: 'input',
    name: 'size',
    message: 'What is the size of the world (grid nxn, default 10)?',
    default: 4,
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number
  },
  {
    type: 'input',
    name: 'initialPosition',
    message: 'Initial position of the zombie (x,y) ',
    default: '(2,1)',
    validate: function(value) {
      if(validatePosition(value)){
        return true;
      }
      return 'Please enter a valid position';
    }
  },
  {
    type: 'input',
    name: 'peoplePos',
    message: 'List position of poor creatures',
    default: "(0,1) (1,2) (3,1)",
    validate: function(value) {
      const listPositions = value.split(" ");
      if(listPositions.length === 0){
        return "LOL! There are normal human being in the world. Input again!";
      }
      const wrongInput = listPositions.find(pos => !validatePosition(value));
      if(!wrongInput){
        return true;
      }
      return 'Please enter valid positions';
    }
  },
  {
    type: 'input',
    name: 'moves',
    message: 'List of moves zombie will make ',
    default: 'dluurr',
    validate: function(value) {
      return true;
    }
  }
];

inquirer.prompt(questions).then(answers => {

  const gameWorld = new GameWorld(answers.size);
  
  const zombie = new Sprite(SpriteType.ZOMBIE, getX(answers.initialPosition), getY(answers.initialPosition));
  gameWorld.addSprite(zombie);

  const aliveCreaturesPos =  answers.peoplePos.split(" ");
  for(let i =0; i< aliveCreaturesPos.length; i++){
    gameWorld.addSprite(new Sprite(SpriteType.ALIVE, getX(aliveCreaturesPos[i]), getY(aliveCreaturesPos[i])));
  }

  gameWorld.updateTheWorld(zombie, answers.moves);

  console.log('\Zombie has been roaming!!!');
  console.log(`zombies score ${gameWorld.score}`)
  console.log(`zombies position ${JSON.stringify(gameWorld.zombiesPosToString())}`)
});