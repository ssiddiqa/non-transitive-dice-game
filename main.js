const DiceParser = require('./DiceParser');
const Game = require('./Game');

try {
  const dice = DiceParser.parse(process.argv.slice(2));
  const game = new Game(dice);
  game.play().catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
} catch (err) {
  console.error(`Error: ${err.message}`);
  console.log('Usage: node main.js "face1,face2,...,faceN" "face1,face2,...,faceN" ... (at least 3 dice)');
  console.log('Example: node main.js "2,2,4,4,9,9" "6,8,1,1,8,6" "7,5,3,7,5,3"');
  process.exit(1);
}