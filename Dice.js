class Dice {
    constructor(faces) {
      this.faces = faces;
    }
  
    getFaces() {
      return this.faces;
    }
  
    toString() {
      return `[${this.faces.join(', ')}]`;
    }
  }
  
  module.exports = Dice;