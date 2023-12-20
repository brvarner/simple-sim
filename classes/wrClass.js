import { statRoll, statRollWAdv } from "../functions/functions.js";

let nameData;
fetch("../names.json")
  .then((res) => res.json())
  .then((data) => {
    nameData = data;
  });

export default class Receiver {
  firstName = Object.values(nameData.wrFirstNames[(Math.random() * 10) | 0])[0];
  lastName = Object.values(nameData.wrLastNames[(Math.random() * 10) | 0])[0];

  constructor(skills) {
    this.name = `${this.firstName} ${this.lastName}`;
    this.wrSpeed = skills.wrSpeed;
    this.wrAccel = skills.wrAccel;
    this.routeR = skills.routeR;
    this.wrCatch = skills.wrCatch;
    this.elusiveness = skills.elusiveness;
  }

  getSpeed() {
    return this.wrSpeed;
  }

  getAccel() {
    return this.wrAccel;
  }

  getRouteR() {
    return this.routeR;
  }

  getCatch() {
    return this.wrCatch;
  }

  runShortRoute() {
    let accRes = statRoll(this.wrAccel);
    let speedRes = statRoll(this.wrSpeed);
    let routeRes = statRoll(this.routeR);

    return { accRes, speedRes, routeRes };
  }

  runMediumRoute() {}

  runDeepRoute() {}

  catch() {
    let catchTarget = statRoll(this.wrCatch);
    let catchCheck = statRoll(this.wrCatch);

    if (catchCheck >= catchTarget) {
      return true;
    } else {
      return false;
    }
  }
}
