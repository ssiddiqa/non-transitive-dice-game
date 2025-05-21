const readline = require('readline');

class Game {
  constructor(dice) {
    this.dice = dice;
    try {
      this.tableGenerator = new (require('./TableGenerator'))();
    } catch (err) {
      throw new Error(`Failed to initialize TableGenerator: ${err.message}`);
    }
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async play() {
    try {
      console.log('Non-Transitive Dice Game');

      console.log("Let's determine who makes the first move.");
      const firstMoveGenerator = new (require('./FairRandomGenerator'))(2, this.rl);
      const firstMove = await firstMoveGenerator.generateFairNumber();
      if (firstMove === null) {
        console.log('Game exited.');
        this.rl.close();
        return;
      }
      const userFirst = firstMove === 0;
      console.log(userFirst ? 'You make the first move!' : 'I make the first move!');

      let firstDieIndex, secondDieIndex;
      if (userFirst) {
        firstDieIndex = await this.userSelectDie(-1);
        if (firstDieIndex === null) {
          console.log('Game exited.');
          this.rl.close();
          return;
        }
        secondDieIndex = this.computerSelectDie(firstDieIndex);
      } else {
        firstDieIndex = this.computerSelectDie(-1);
        secondDieIndex = await this.userSelectDie(firstDieIndex);
        if (secondDieIndex === null) {
          console.log('Game exited.');
          this.rl.close();
          return;
        }
      }


      const firstRoll = await this.rollDie(firstDieIndex, userFirst ? 'Your' : 'Computer');
      if (firstRoll === null) {
        console.log('Game exited.');
        this.rl.close();
        return;
      }
      console.log(`${userFirst ? 'Your' : 'Computer'} roll result is ${firstRoll}.`);

      const secondRoll = await this.rollDie(secondDieIndex, userFirst ? 'Computer' : 'Your');
      if (secondRoll === null) {
        console.log('Game exited.');
        this.rl.close();
        return;
      }
      console.log(`${userFirst ? 'Computer' : 'Your'} roll result is ${secondRoll}.`);

  
      if (firstRoll > secondRoll) {
        console.log(`${userFirst ? 'You' : 'Computer'} wins (${firstRoll} > ${secondRoll})!`);
      } else if (secondRoll > firstRoll) {
        console.log(`${userFirst ? 'Computer' : 'You'} wins (${secondRoll} > ${firstRoll})!`);
      } else {
        console.log(`It's a tie (${firstRoll} = ${secondRoll})!`);
      }
    } catch (err) {
      console.error(`Error in game: ${err.message}`);
    } finally {
      this.rl.close();
    }
  }

  async userSelectDie(excludeIndex) {
    return new Promise(resolve => {
      const prompt = () => {
        console.log('\nChoose your dice:');
        this.dice.forEach((die, i) => {
          if (i !== excludeIndex) {
            console.log(`${i} - ${die.toString()}`);
          }
        });
        console.log('X - exit');
        console.log('? - help');
        const validInputs = this.dice
          .map((_, i) => i.toString())
          .filter(i => parseInt(i) !== excludeIndex)
          .concat(['X', '?']);
        this.rl.question('Your selection: ', answer => {
          answer = answer.trim();
          if (!validInputs.includes(answer)) {
            console.log(`Invalid selection. Please enter one of: ${validInputs.join(', ')}.`);
            return prompt();
          }
          if (answer === 'X') {
            return resolve(null);
          }
          if (answer === '?') {
            try {
              console.log('Displaying probability table...');
              console.log(this.tableGenerator.generateProbabilityTable(this.dice));
            } catch (err) {
              console.error(`Error displaying probability table: ${err.message}`);
            }
            return prompt();
          }
          console.log(`You choose the ${this.dice[parseInt(answer)].toString()} dice.`);
          resolve(parseInt(answer));
        });
      };
      prompt();
    });
  }

  computerSelectDie(excludeIndex) {
    const available = this.dice.map((_, i) => i).filter(i => i !== excludeIndex);
    const secureRandom = new (require('./SecureRandom'))();
    const index = available[secureRandom.generateUniformInt(available.length)];
    console.log(`I choose the ${this.dice[index].toString()} dice.`);
    return index;
  }

  async rollDie(dieIndex, player) {
    console.log(`\nIt's time for ${player} roll.`);
    const die = this.dice[dieIndex];
    const generator = new (require('./FairRandomGenerator'))(die.getFaces().length, this.rl);
    const rollIndex = await generator.generateFairNumber();
    if (rollIndex === null) return null;
    return die.getFaces()[rollIndex];
  }
}

module.exports = Game;