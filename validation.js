const { playerFormatLength } = require("./config.js");

// NOTE Provera da li unos sadrzi 4 stavke (ime,prezime,zemlju,rang)
const validateArrLength = function (str) {
  if (str.split(",").length !== playerFormatLength) {
    console.error(`Neispravan format unosa.`);
    return false;
  }
  return true;
};

// NOTE Provera da li prva 3 unosa (ime,prezime,zemlja) sadrze samo slova
const validateString = function (str) {
  const arr = str.split(",");
  for (let i = 0; i < arr.length - 1; i++) {
    if (!/^[a-z]+$/i.test(arr[i])) {
      console.error(`Imena igraca i nazivi zemalja ne smeju sadrzati brojeve i simbole. ${arr[i]}`);
      return false;
    }
  }
  return true;
};

// NOTE Provera da li je rang (unos 4) pozitivan ceo broj
const validateIfRankIsInt = function (rank) {
  if (!Number.isInteger(+rank) || +rank <= 0) {
    console.error(`Rang mora da bude ceo pozitivan broj.`);
    return false;
  }
  return true;
};

// NOTE Provera da li je rank koji je unet u 'tennisPlayers' niz vec postoji
const validateIfRankIsUnique = function (arr, playerData) {
  if (arr?.some((player) => player.ranking == playerData?.[3])) {
    console.error(`Teniseri ne mogu da dele isti rang.`);
    return false;
  }
  return true;
};

// NOTE Provera da li je unos zemlje u 'alpha-3' formatu
const validateCountryFormat = function (arr) {
  if (!arr[2]) return false;
  if (arr[2].length !== 3 && arr[2].length !== 2) {
    console.error(`Unesite skraceni naziv zemlje u alpha-3 formatu. Primer: 'USA'.`);
    return false;
  }
  return true;
};
const inputValidation = function (tennisPlayers, tempTennisPlayer, tempTennisPlayerData) {
  if (
    !validateArrLength(tempTennisPlayer) ||
    !validateString(tempTennisPlayer) ||
    !validateIfRankIsInt(tempTennisPlayerData[3]) ||
    !validateIfRankIsUnique(tennisPlayers, tempTennisPlayerData) ||
    !validateCountryFormat(tempTennisPlayerData)
  ) {
    return false;
  } else return true;
};

module.exports = { inputValidation };
