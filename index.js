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

  // NOTE Provera da li je aplikacija pozvana sa dodatnim argumentom (teniseri.csv u ovom slucaju) ili se unos vrsi manuelno
  if (process.argv.length < 3) {
    N = readlineSync.question("Unesite broj tenisera (N):");

    // NOTE Provera da li je unet broj tenisera 'N' validan
    if (N < 4 || N > 64) {
      console.error(`Unesite validan broj igraca: [4...64].`);
      return main();
    }

    for (let i = 0; i < N; i++) {
      const tempTennisPlayer = readlineSync.question(
        `Player: ${i + 1}. Unesite tenisera u obliku [ime],[prezime],[drzava],[ranking]:`
      );
      const tempTennisPlayerData = tempTennisPlayer.split(",");

      if (!inputValidation(tennisPlayers, tempTennisPlayer, tempTennisPlayerData)) {
        i--;
      } else storePlayers(tennisPlayers, tempTennisPlayerData);
    }
  } else {
    // NOTE Ako je 3 argumenta proslednjeno, citamo fajl ciji naziv je prosledjen kao dodatni argument pri pokretanju aplikacije
    try {
      const fileContents = fs.readFileSync(process.argv[2]).toString();
      const csvPlayerData = fileContents.trim().split("\n");

      csvPlayerData.forEach((tempTennisPlayer) => {
        const tempTennisPlayerData = tempTennisPlayer.split(",");

        if (!inputValidation(tennisPlayers, tempTennisPlayer, tempTennisPlayerData)) {
          console.error(`Neispravan format unosa: ${tempTennisPlayer}`);
        } else storePlayers(tennisPlayers, tempTennisPlayerData);
      });
      // NOTE 'N' u ovom slucaju definise broj tenisera u validnom formatu
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
