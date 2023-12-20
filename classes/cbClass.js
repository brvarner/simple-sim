let nameData;
fetch("../names.json")
  .then((res) => res.json())
  .then((data) => {
    nameData = data;
  });

export default class Corner {
  firstName = Object.values(nameData.cbFirstNames[(Math.random() * 10) | 0])[0];
  lastName = Object.values(nameData.cbLastNames[(Math.random() * 10) | 0])[0];

  constructor(skills) {
    this.name = `${this.firstName} ${this.lastName}`;
    this.cbSpeed = skills.cbSpeed;
    this.cbAccel = skills.cbAccel;
    this.cover = skills.cover;
    this.cbCatch = skills.cbCatch;
    this.tackling = skills.tackling;
  }

  getSpeed() {
    return this.cbSpeed;
  }

  getAccel() {
    return this.cbAccel;
  }

  getCoverage() {
    return this.cover;
  }

  getCatch() {
    return this.cbCatch;
  }

  coverShortRoute() {}

  coverMedRoute() {}

  coverDeepRoute() {}

  catch() {
    let catchTarget = statRoll(this.catch);
    let catchCheck = statRoll(this.catch);

    if (catchCheck >= catchTarget) {
      return true;
    } else {
      return false;
    }
  }
}
