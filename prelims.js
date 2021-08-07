const { Tournament } = require("./tournament");
const { randomNum, setResults } = require("./helpers.js");
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

  getPlayers() {
    //NOTE Sort the numbers so we can get the closest num of valid players
    validNumOfPlayers.sort((a, b) => b - a);

    //NOTE
    const validPlayers = validNumOfPlayers.find((num) => num < this.players.length);

    //NOTE Sort the players by ranking
    this.players.sort((a, b) => a.ranking - b.ranking);

    //NOTE Players for prelims
    this.prelimPlayers.push(...this.players.splice(validPlayers - 1));
    // console.log(this.players.push(...this.funkcija()));
    this.players.push(...this.funkcija());
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

  funkcija() {
    // 4) ako ima samo dva pobednika izvuci jednog i vratiti ga
    if (this.prelimPlayers.length === 2) {
      this.finals.push(this.prelimPlayers);
      this.winner.push(this.getWinners(this.finals)[0]);
      console.log(this.#declareWinner(...this.winner));
      return this.winner;
    }
    if (this.prelimPlayers.length % 2 === 0) {
      // 1) napraviti meceve od po 2
      const pairs = this.generatePair(this.prelimPlayers);
      // 2) izvuci pobednike
      this.prelimPlayers = [];
      this.prelimPlayers.push(...this.getWinners(pairs));
      // 3) pozvati funkciju ponovo sa pobednicima
      return this.funkcija();
    } else {
      // 1) izvuci igraca sa najvecim rankom = byePasser
      this.byePasser = this.prelimPlayers.splice(0, 1);
      // 2) upariti preostale igrace u meceve
      if (this.prelimPlayers.length === 2) {
        this.finals.push(this.prelimPlayers);
        const winner = this.getWinners(this.finals)[0];
        this.finals = [];
        this.finals.push([winner, ...this.byePasser]);
        this.winner.push(this.getWinners(this.finals)[0]);
        console.log(this.#declareWinner(...this.winner));
        return this.winner;
      } else {
        // 3) izvuci pobednike
        const pairs = this.generatePair(this.prelimPlayers);
        this.prelimPlayers = [];
        this.prelimPlayers.push(this.getWinners(pairs));
      }
      // 4) ako je paran broj pobednika pozvati funkciju ponovo
      if (this.prelimPlayers.length % 2 === 0) {
        this.funkcija();
      } else {
        // 5) ako je ne paran broj pobednika ubaciti byePassera i pozvati funkciju ponovo
        this.prelimPlayers[0].push(...this.byePasser);

        this.prelimPlayers = this.prelimPlayers.flat();
        return this.funkcija();
      }
    }
  }
}
module.exports = { Prelims };
