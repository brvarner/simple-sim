import { statRoll, statRollWAdv, statGen } from "../functions/functions.js";

let nameData;
fetch("../names.json")
  .then((res) => res.json())
  .then((data) => {
    nameData = data;
  });

export default class Receiver {
  firstName = Object.values(nameData.wrFirstNames[(Math.random() * 10) | 0])[0];
  lastName = Object.values(nameData.wrLastNames[(Math.random() * 10) | 0])[0];

  wrSpeed = statGen(60, 99);
  wrAccel = statGen(60, 99);
  shortRoute = statGen(60, 99);
  medRoute = statGen(60, 99);
  deepRoute = statGen(60, 99);
  wrCatch = statGen(60, 99);
  elusiveness = statGen(60, 99);

  //   Receivers need short, medium, and deep route running skills
  constructor() {
    this.name = `${this.firstName} ${this.lastName}`;
    this.wrSpeed = this.wrSpeed;
    this.wrAccel = this.wrAccel;
    this.shortRoute = this.shortRoute;
    this.medRoute = this.medRoute;
    this.deepRoute = this.deepRoute;
    this.wrCatch = this.wrCatch;
    this.elusiveness = this.elusiveness;
  }

  getSpeed() {
    return this.wrSpeed;
  }

  getAccel() {
    return this.wrAccel;
  }

  getShortRoute() {
    return this.shortRoute;
  }

  getMedRoute() {
    return this.medRoute;
  }

  getDeepRoute() {
    return this.deepRoute;
  }

  getCatch() {
    return this.wrCatch;
  }

  runShortRoute() {
    let accRes = statRoll(this.wrAccel);
    let speedRes = statRoll(this.wrSpeed);
    let routeRes = statRoll(this.shortRoute);

    return { accRes, speedRes, routeRes };
  }

  runMediumRoute() {
    let accRes = statRoll(this.wrAccel);
    let speedRes = statRoll(this.wrSpeed);
    let routeRes = statRoll(this.medRoute);

    return { accRes, speedRes, routeRes };
  }

  runDeepRoute() {
    let accRes = statRoll(this.wrAccel);
    let speedRes = statRoll(this.wrSpeed);
    let routeRes = statRoll(this.deepRoute);

    return { accRes, speedRes, routeRes };
  }

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

// We'll extend this with classes for different archetypes
