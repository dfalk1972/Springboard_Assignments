/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord;
      if (i === this.words.length - 1) {
        nextWord = null;
      } else {
        nextWord = this.words[i + 1];
      }
      if (!(word in chains)) {
        chains[word] = [];
      }
      chains[word].push(nextWord);
    }
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    function randomChoice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    let keys = Object.keys(this.chains);
    let currentWord = randomChoice(keys);
    let output = [currentWord];

    while (output.length < numWords) {
      let possibleNextWords = this.chains[currentWord];
      let nextWord = randomChoice(possibleNextWords);
      if (nextWord === null) {
        break;
      }
      output.push(nextWord);
      currentWord = nextWord;
    }

    return output.join(" ");
  }
}

module.exports = MarkovMachine;
