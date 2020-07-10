
exports.SpriteType = {
    ZOMBIE: "z",
    ALIVE: "a"
}

exports.MOVE = {
    UP: 'u',
    DOWN: 'd',
    RIGHT: 'r',
    LEFT: 'l'
}
  
exports.validatePosition = (input) => {
    return /\(\d+,\d+\)/.test(input);
  };

exports.getX = (position) => {
  return parseInt(position.match(/\d+/g)[0]);
}
  
exports.getY = (position) => {
  return parseInt(position.match(/\d+/g)[1]);
}