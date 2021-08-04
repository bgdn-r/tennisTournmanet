const { randomNum, setResults } = require("./helpers.js");

class Tournament {
  #counter = 0;
  #finals = [];
  constructor(numOfPlayers, playersArr) {
    this.numOfPlayers = numOfPlayers;
    this.players = playersArr;
  }

  #getRound(arr) {
    this.#counter++;
    if (!arr.length) return;
    if (arr.length === 1) return `Round: ${this.#counter} / Finals: \n`;
    if (arr.length === 2) return `Round: ${this.#counter} / Semifinals: \n`;
    if (arr.length > 2) return `Round: ${this.#counter} \n`;
  }

  #renderOutput(winners, losers, pairs) {
    console.log(`\n${this.#getRound(pairs)}`);
    for (let i = 0; i < winners.length; i++) {
      const winner = `${winners[i].getFirstName()}. ${winners[i].getLastName()}(${winners[i].country}, ${
        winners[i].ranking
      })`;
      const loser = `${losers[i].getFirstName()}. ${losers[i].getLastName()}(${losers[i].country}, ${
        losers[i].ranking
      })`;
      console.log(
        `${winner.padStart(25, " ")} 🎾 [${winners[i].results}] ✅ ${winners[i].sets} - ${losers[i].sets} ❌ [${
          losers[i].results
        }] 🎾 ${loser}`
      );
    }
  }

  #getWinners(pairs) {
    setResults(pairs);
    const winners = [];
    const losers = [];
    pairs.forEach((pair) => {
      pair[0].sets > pair[1].sets ? winners.push(pair[0]) : winners.push(pair[1]);
    });
    pairs.forEach((pair) => {
      pair[0].sets < pair[1].sets ? losers.push(pair[0]) : losers.push(pair[1]);
    });

    this.#renderOutput(winners, losers, pairs);
    return winners;
  }

  #declareWinner(player) {
    return `\nWinner: \n\n${"!!!".padStart(17, " ")} 🎈🎉🏆🎉🎈 ${player.getFirstName()}. ${player.getLastName()} (${
      player.country
    }, ${player.ranking}) 🎈🎉🏆🎉🎈 !!!`;
  }

  #generatePair(arr) {
    const pair = [];
    while (arr.length > 0) {
      const randomPlayerOne = arr.splice(randomNum(arr.length - 1), 1)[0];
      const randomPlayerTwo = arr.splice(randomNum(arr.length - 1), 1)[0];
      pair.push([randomPlayerOne, randomPlayerTwo]);
    }
    return pair;
  }

  #matchUpRoundOne() {
    const pairs = [];
    const odds = this.players.filter((player) => player.ranking % 2 !== 0);
    const evens = this.players.filter((player) => player.ranking % 2 === 0);

    pairs.push(...this.#generatePair(odds));
    pairs.push(...this.#generatePair(evens));
    return pairs;
  }

  #matchUp(prevRoundWinners) {
    const pairs = [];
    pairs.push(...this.#generatePair(prevRoundWinners));
    return pairs;
  }

  start() {
    const pairs = this.#matchUpRoundOne();
    let winners = this.#getWinners(pairs);
    for (let i = 0; i < winners.length; i++) {
      winners = this.#getWinners(this.#matchUp(winners));
    }

    if (winners.length === 2) {
      this.#finals.push(winners);
      console.log(this.#declareWinner(this.#getWinners(this.#finals)[0]));
    }
    if (winners.length === 1) {
      console.log(this.#declareWinner(...winners));
    }
  }
}
module.exports = { Tournament };
