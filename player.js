class Player {
  constructor(firstName, lastName, country, ranking) {
    (this.firstName = firstName.toLowerCase()),
      (this.lastName = lastName.toLowerCase()),
      (this.country = country.toUpperCase()),
      (this.ranking = +ranking);
  }

  // NOTE Ime igraca u formatu za output
  getFirstName() {
    return this.firstName[0].toUpperCase();
  }

  // NOTE Prezime igraca u formatu za output
  letme() {
    console.log("yey");
  }
  getLastName() {
    return this.lastName[0].toUpperCase() + this.lastName.slice(1).toLowerCase();
  }
}

module.exports = { Player };
