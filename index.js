const readlineSync = require("readline-sync");
const fs = require("fs");
const { validNumOfPlayers } = require("./config.js");
const { Tournament } = require("./tournament.js");
const { inputValidation } = require("./validation.js");
const { storePlayers } = require("./helpers.js");

const { Prelims } = require("./prelims.js");
const main = () => {
  let N = 0;
  const tennisPlayers = [];

  if (process.argv.length < 3) {
    N = readlineSync.question("Unesite broj tenisera (N):");

<<<<<<< HEAD
    // NOTE Provera da li je unet broj tenisera 'N' validan
    if (N < 4 || N > 64) {
      console.error(`Unesite validan broj igraca: [4...64].`);
=======
    if (!validNumOfPlayers.includes(+N)) {
      console.error(`Unesite validan broj igraca: ${validNumOfPlayers}.`);
>>>>>>> main
      return main();
    }

    for (let i = 0; i < N; i++) {
      const tempTennisPlayer = readlineSync.question(
        `Player: ${i + 1}. Unesite tenisera u obliku [ime],[prezime],[drzava],[ranking]:`
      );

      if (!inputValidation(tennisPlayers, tempTennisPlayer)) {
        i--;
      } else storePlayers(tennisPlayers, tempTennisPlayer);
    }
  } else {
    try {
      const fileContents = fs.readFileSync(process.argv[2]).toString();
      const csvPlayerData = fileContents.trim().split("\n");

      csvPlayerData.forEach((tempTennisPlayer) => {
        if (!inputValidation(tennisPlayers, tempTennisPlayer)) {
          console.error(`Neispravan format unosa: ${tempTennisPlayer}`);
        } else storePlayers(tennisPlayers, tempTennisPlayer);
      });
      N = tennisPlayers.length;
      if (N < 4 || N > 64) {
        console.error(`Unesite validan broj igraca: [4...64].`);
        return main();
      }
      //NOTE ako unet validan broj ne spada u brojeve koji su u validNumArray-u pokrecu se preliminarne runde
      if (!validNumOfPlayers.includes(+N)) {
        const prelims = new Prelims(N, tennisPlayers, validNumOfPlayers);

        const tournament = new Tournament(N, prelims.start());
        return tournament.start();
      } else {
        const tournament = new Tournament(N, tennisPlayers);
        return tournament.start();
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  //NOTE ako unet validan broj ne spada u brojeve koji su u validNumArray-u pokrecu se preliminarne runde
  if (!validNumOfPlayers.includes(+N)) {
    const prelims = new Prelims(N, tennisPlayers, validNumOfPlayers);

    const tournament = new Tournament(N, prelims.start());
    return tournament.start();
  } else {
    const tournament = new Tournament(N, tennisPlayers);
    return tournament.start();
  }
};

main();
