import { statRoll, statRollWAdv, statGen } from "../functions/functions.js";

let nameData;
fetch("../names.json")
  .then((res) => res.json())
  .then((data) => {
    nameData = data;
  });

class QB {
  firstName = Object.values(nameData.qbFirstNames[(Math.random() * 10) | 0])[0];
  lastName = Object.values(nameData.qbLastNames[(Math.random() * 10) | 0])[0];

  speed = statGen(60, 99);
  accel = statGen(60, 99);
  armStr = statGen(60, 99);
  shortAcc = statGen(60, 99);
  medAcc = statGen(60, 99);
  deepAcc = statGen(60, 99);
  decMak = statGen(60, 99);

  //   QBs need short, medium, and deep throw accuracies
  constructor() {
    this.name = `${this.firstName} ${this.lastName}`;
    this.speed = this.speed;
    this.accel = this.accel;
    this.armStr = this.armStr;
    this.shortAcc = this.shortAcc;
    this.medAcc = this.medAcc;
    this.deepAcc = this.deepAcc;
    this.decMak = this.decMak;
  }

  getSpeed() {
    return this.speed;
  }

  getAccel() {
    return this.accel;
  }

  getArmStr() {
    return this.armStr;
  }

  getShortAcc() {
    return this.shortAcc;
  }

  getMedAcc() {
    return this.medAcc;
  }

  getDeepAcc() {
    return this.deepAcc;
  }

  getDecMak() {
    return this.decMak;
  }

  throwShort() {
    let acc = statRoll(this.shortAcc);
    let str = statRoll(this.armStr);

    return { acc, str };
  }

  throwMed() {
    let acc = statRoll(this.medAcc);
    let str = statRoll(this.armStr);

    return { acc, str };
  }

  throwDeep() {
    let acc = statRoll(this.deepAcc);
    let str = statRoll(this.armStr);

    return { acc, str };
  }

  scramble() {}
}

// We'll extend this with classes for different archetypes
export class pocketPasser extends QB {
  constructor() {
    super();
    this.accel = this.accel - 15;
    this.speed = this.speed - 15;
    this.shortAcc = this.shortAcc + 10;
    this.medAcc = this.medAcc + 10;
    this.deepAcc = this.deepAcc + 10;
  }
}

export class dualThreat extends QB {
  constructor() {
    super();
    this.accel = this.accel + 15;
    this.speed = this.speed + 15;
    this.shortAcc = this.shortAcc - 10;
    this.medAcc = this.medAcc - 10;
    this.deepAcc = this.deepAcc - 10;
  }
}

export class balancedQB extends QB {
  constructor() {
    super();
    this.accel = this.accel + 5;
    this.speed = this.speed + 5;
    this.shortAcc = this.shortAcc + 5;
    this.medAcc = this.medAcc + 5;
    this.deepAcc = this.deepAcc + 5;
  }
}
