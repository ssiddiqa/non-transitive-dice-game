class ProbabilityCalculator {
    static calculateWinProbability(die1, die2) {
      const faces1 = die1.getFaces();
      const faces2 = die2.getFaces();
      let winCount = 0;
      let total = faces1.length * faces2.length;
  
      for (const f1 of faces1) {
        for (const f2 of faces2) {
          if (f1 > f2) winCount++;
        }
      }
  
      return winCount / total;
    }
  }
  
  module.exports = ProbabilityCalculator;