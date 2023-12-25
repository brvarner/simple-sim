import { statRoll, statRollWAdv, statGen } from "../functions/functions.js";

let nameData;
fetch("../names.json")
  .then((res) => res.json())
  .then((data) => {
    nameData = data;
  });

export default class Corner {
  firstName = Object.values(nameData.cbFirstNames[(Math.random() * 10) | 0])[0];
  lastName = Object.values(nameData.cbLastNames[(Math.random() * 10) | 0])[0];

  cbSpeed = statGen(60, 99);
  cbAccel = statGen(60, 99);
  cover = statGen(60, 99);
  cbCatch = statGen(60, 99);
  tackling = statGen(60, 99);

  constructor() {
    this.name = `${this.firstName} ${this.lastName}`;
    this.cbSpeed = this.cbSpeed;
    this.cbAccel = this.cbAccel;
    this.cover = this.cover;
    this.cbCatch = this.cbCatch;
    this.tackling = this.tackling;
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

  coverShortRoute() {
    let accRes = statRoll(this.cbAccel);
    let speedRes = statRoll(this.cbSpeed);
    let coverRes = statRoll(this.cover);

    return { accRes, speedRes, coverRes };
  }

  //   The longer a corner has to cover, the more their disadvantage grows
  coverMedRoute() {}

  coverDeepRoute() {}

  catch() {
    let catchTarget = statRoll(this.cbCatch);
    let catchCheck = statRoll(this.cbCatch);

    if (catchCheck >= catchTarget) {
      return true;
    } else {
      return false;
    }
  }
}

// We'll extend this with classes for different archetypes
