class DiceParser {
    static parse(args) {
      if (args.length < 3) {
        throw new Error('At least 3 dice are required.');
      }
  
      const dice = [];
      for (const arg of args) {
        try {
          const faces = arg.split(',').map(s => {
            const num = parseInt(s.trim());
            if (isNaN(num) || num <= 0) {
              throw new Error(`Invalid face value in "${arg}". Must be positive integers.`);
            }
            return num;
          });
          if (faces.length < 2) {
            throw new Error(`Each die must have at least 2 faces. Got: "${arg}".`);
          }
          dice.push(new (require('./Dice'))(faces));
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(`Error parsing "${arg}": ${err.message}`);
          }
          throw err;
        }
      }
      return dice;
    }
  }
  
  module.exports = DiceParser;