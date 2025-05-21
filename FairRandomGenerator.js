class FairRandomGenerator {
    constructor(range, rl) {
      this.range = range;
      this.secureRandom = new (require('./SecureRandom'))();
      this.rl = rl;
    }
  
    async generateFairNumber() {
      const key = this.secureRandom.generateKey();
      const computerNumber = this.secureRandom.generateUniformInt(this.range);
      const hmac = this.secureRandom.computeHMAC(key, computerNumber);
  
      console.log(`I selected a random value in the range 0..${this.range - 1} (HMAC=${hmac}).`);
      console.log(`Add your number modulo ${this.range}.`);
  
      const userNumber = await this.promptUser();
      if (userNumber === null) {
        return null;
      }
  
      const result = (computerNumber + userNumber) % this.range;
      console.log(`My number is ${computerNumber} (KEY=${key.toString('hex').toUpperCase()}).`);
      console.log(`The fair number generation result is ${computerNumber} + ${userNumber} = ${result} (mod ${this.range}).`);
  
      return result;
    }
  
    async promptUser() {
      const validInputs = Array.from({ length: this.range }, (_, i) => i.toString()).concat(['X', '?']);
      return new Promise(resolve => {
        const prompt = () => {
          console.log(validInputs.map(v => `${v} - ${v === 'X' ? 'exit' : v === '?' ? 'help' : v}`).join('\n'));
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
              console.log('Help: Enter a number to contribute to the fair random generation.');
              return prompt();
            }
            resolve(parseInt(answer));
          });
        };
        prompt();
      });
    }
  }
  
  module.exports = FairRandomGenerator;