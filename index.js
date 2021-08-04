const readlineSync = require("readline-sync");
const fs = require("fs");
const { validNumOfPlayers } = require("./config.js");
const { Tournament } = require("./tournament.js");
const { inputValidation } = require("./validation.js");
const { storePlayers } = require("./helpers.js");

const main = () => {
  let N = 0;
  const tennisPlayers = [];

  if (process.argv.length < 3) {
    N = readlineSync.question("Unesite broj tenisera (N):");

    if (!validNumOfPlayers.includes(+N)) {
      console.error(`Unesite validan broj igraca: ${validNumOfPlayers}.`);
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
      if (!validNumOfPlayers.includes(+N)) {
        console.error(`Ukupan broj validnih igraca u csv fajlu je: ${N}, a dozvoljeno je ${validNumOfPlayers} igraca.`);
        return;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  const tournament = new Tournament(N, tennisPlayers);
  tournament.start();
};

main();
