class TableGenerator {
    constructor() {
      this.calc = require('./ProbabilityCalculator');
    }
  
    generateProbabilityTable(dice) {
      const n = dice.length;
      const probs = Array(n).fill().map(() => Array(n).fill(0));
  
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i !== j) {
            probs[i][j] = this.calc.calculateWinProbability(dice[i], dice[j]);
          }
        }
      }
  
      let table = '+-----+ ' + dice.map((_, i) => `Die ${i + 1} |`).join(' ') + '\n';
      table += '+-----+ ' + dice.map(() => '-------|').join(' ') + '\n';
  
      for (let i = 0; i < n; i++) {
        table += `| Die ${i + 1} | `;
        for (let j = 0; j < n; j++) {
          if (i === j) {
            table += ' N/A   | ';
          } else {
            table += `${probs[i][j].toFixed(3)} | `;
          }
        }
        table += '\n';
      }
  
      table += '+-----+ ' + dice.map(() => '-------|').join(' ') + '\n';
      return table;
    }
  }
  
  module.exports = TableGenerator;