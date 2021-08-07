const { Player } = require("./player.js");

const randomNum = function (n) {
  return Math.floor(Math.random() * n);
};

//NOTE Create results for players
const createResults = function () {
  const result0 = [randomNum(8), randomNum(8), randomNum(8)];
  const result1 = [];
  let counter0 = 0;
  let counter1 = 0;

  result0.forEach((result) => {
    if (result === 5) result1.push(7);
    if (result === 6) result1.push(randomNum(5));
    if (result === 7) result1.push(5);
    if (result <= 4) result1.push(6);
  });

  for (let i = 0; i < result0.length; i++) {
    result0[i] >= result1[i] ? counter0++ : counter1++;
  }

  //NOTE returns an array with match winner
  //NOTE and 2 arrays with set winnings
  return [
    [counter0, counter1],
    [result0, result1],
  ];
};

//NOTE Creates and sets results to player obj
const setResults = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const results = createResults();
    arr[i][0].sets = results[0][0];
    arr[i][0].results = results[1][0];
    arr[i][1].sets = results[0][1];
    arr[i][1].results = results[1][1];
  }
  return arr;
};

// NOTE Store valid players into array
const storePlayers = function (tennisPlayers, tempTennisPlayer) {
  const tempTennisPlayerData = tempTennisPlayer.split(",");
  tennisPlayers.push(
    new Player(
      tempTennisPlayerData[0],
      tempTennisPlayerData[1],
      tempTennisPlayerData[2],
      parseInt(tempTennisPlayerData[3], 10)
    )
  );
};

module.exports = { setResults, randomNum, storePlayers };
