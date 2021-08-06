class Prelims {
  #numOfPrelimPlayers;
  constructor(numOfPlayers, playersArr, validNum) {
    this.N = numOfPlayers;
    this.playersArr = playersArr;
    // NOTE Sort from bigger to lower
    this.validNumsArr = validNum.sort((a, b) => b - a);
  }

  getPlayersForPrelims() {
    const closestLowerNum = this.validNumsArr.find((num) => num < this.N);
    this.#numOfPrelimPlayers = this.N - (closestLowerNum - 1);
    console.log(closestLowerNum);
    console.log(this.#numOfPrelimPlayers);
  }

  logger() {
    this.getPlayersForPrelims();
    console.log(this.validNumsArr);
  }
}
module.exports = { Prelims };
