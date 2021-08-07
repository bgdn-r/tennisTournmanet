const { Tournament } = require("./tournament");
const { validNumOfPlayers } = require("./config");

class Prelims extends Tournament {
  #counter = 0;
  prelimPlayers = [];
  finals = [];
  byePasser = [];
  winner = [];
  super(numOfPlayers, playersArr) {
    this.numOfPlayers = numOfPlayers;
    this.players = playersArr;
  }

  start() {
    //NOTE Sort the numbers so we can get the closest num of valid players
    validNumOfPlayers.sort((a, b) => b - a);

    //NOTE
    const validPlayers = validNumOfPlayers.find((num) => num < this.players.length);

    //NOTE Sort the players by ranking
    this.players.sort((a, b) => a.ranking - b.ranking);

    //NOTE Players for prelims
    this.prelimPlayers.push(...this.players.splice(validPlayers - 1));
    this.players.push(...this.prelimination());
    return this.players;
  }

  /////////////////////
  #getRound(arr) {
    this.#counter++;
    if (!arr.length) return;
    return `Prelimination round: ${this.#counter} \n`;
  }

  #declareWinner(player) {
    return `\nWinner: \n\n${"!!!".padStart(17, " ")} ${player.getFirstName()}. ${player.getLastName()} (${
      player.country
    }, ${player.ranking}) !!! Goes to tournament.`;
  }

  renderOutput(winners, losers, pairs) {
    console.log(`\n${this.#getRound(pairs)}`);
    for (let i = 0; i < winners.length; i++) {
      const winner = `${winners[i].getFirstName()}. ${winners[i].getLastName()}(${winners[i].country}, ${
        winners[i].ranking
      })`;
      const loser = `${losers[i].getFirstName()}. ${losers[i].getLastName()}(${losers[i].country}, ${
        losers[i].ranking
      })`;
      console.log(
        `${winner.padStart(25, " ")} [${winners[i].results}] ✅ ${winners[i].sets} - ${losers[i].sets} ❌ [${
          losers[i].results
        }] ${loser}`
      );
    }
  }
  /////////////////////

  prelimination() {
    // 4) if there is only 2 winners get one winner and return it
    if (this.prelimPlayers.length === 2) {
      this.finals.push(this.prelimPlayers);
      this.winner.push(this.getWinners(this.finals)[0]);
      console.log(this.#declareWinner(...this.winner));
      return this.winner;
    }
    if (this.prelimPlayers.length % 2 === 0) {
      // 1) generate matches
      const pairs = this.generatePair(this.prelimPlayers);
      // 2) get winners
      this.prelimPlayers = [];
      this.prelimPlayers.push(...this.getWinners(pairs));
      // 3) recurse
      return this.prelimination();
    } else {
      // 1) get player with highest ranking and store him as a byePasser
      this.byePasser = this.prelimPlayers.splice(0, 1);
      // 2) generatePairs for rest
      if (this.prelimPlayers.length === 2) {
        this.finals.push(this.prelimPlayers);
        const winner = this.getWinners(this.finals)[0];
        this.finals = [];
        this.finals.push([winner, ...this.byePasser]);
        this.winner.push(this.getWinners(this.finals)[0]);
        console.log(this.#declareWinner(...this.winner));
        return this.winner;
      } else {
        // 3) get winners
        const pairs = this.generatePair(this.prelimPlayers);
        this.prelimPlayers = [];
        this.prelimPlayers.push(this.getWinners(pairs));
      }
      // 4) if even number then recurse
      if (this.prelimPlayers.length % 2 === 0) {
        this.prelimination();
      } else {
        // 5) if odd number add byePasser and then recurse
        this.prelimPlayers[0].push(...this.byePasser);

        this.prelimPlayers = this.prelimPlayers.flat();
        return this.prelimination();
      }
    }
  }
}
module.exports = { Prelims };
