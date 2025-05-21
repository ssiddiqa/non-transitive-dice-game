# Non-Transitive Dice Game

This is a Node.js console application implementing a non-transitive dice game with fair random generation, developed as part of a programming assignment. The game supports arbitrary dice configurations, fair random number generation using HMAC-SHA3-256, and a probability table for die comparisons.

## Features

- Accepts 3 or more dice via command-line arguments (e.g., `"2,2,4,4,9,9" "1,1,6,6,8,8" "3,3,5,5,7,7"`).
- Fair random generation using cryptographic keys and HMAC-SHA3-256.
- CLI menu for die selection with options for help (`?`) and exit (`X`).
- Displays an ASCII probability table showing win probabilities for each die pair.
- Robust input validation with clear error messages.
- Modular design with 7 classes (`Dice`, `DiceParser`, `ProbabilityCalculator`, `TableGenerator`, `SecureRandom`, `FairRandomGenerator`, `Game`).

## Prerequisites

- **Node.js**: Version 20.17.0 or later (tested with v20.17.0).
- **npm**: Included with Node.js for installing dependencies.
- **Git**: For cloning the repository.

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/non-transitive-dice-game.git
   cd non-transitive-dice-game

2. **Install Dependencies:**
   ```bash
   npm install js-sha3
