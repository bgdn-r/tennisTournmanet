class Prelims {
  constructor(numOfPlayers, playersArr, validNum) {
    this.numOfPlayers = numOfPlayers;
    this.playersArr = playersArr;
    // NOTE Sort from bigger to lower
    this.validNumsArr = validNum.sort((a, b) => b - a);
  }

  getPlayersForPrelims() {
    const closestLowerNum = this.validNumsArr.find((num) => num < N);
    const numOfPrelimPlayers = N - (closestLowerNum - 1);
  }

  logger() {
    console.log(this.validNumsArr);
  }
}
module.exports = { Prelims };
