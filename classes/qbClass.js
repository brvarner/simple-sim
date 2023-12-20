import { statRoll, statRollWAdv, max } from "../functions/functions.js";
let nameData;
fetch("../names.json")
  .then((res) => res.json())
  .then((data) => {
    nameData = data;
  });

export default class QB {
  firstName = Object.values(nameData.qbFirstNames[(Math.random() * 10) | 0])[0];
  lastName = Object.values(nameData.qbLastNames[(Math.random() * 10) | 0])[0];

  constructor(skills) {
    this.name = `${this.firstName} ${this.lastName}`;
    this.speed = skills.speed;
    this.accel = skills.accel;
    this.armStr = skills.armStr;
    this.armAcc = skills.armAcc;
    this.decMak = skills.decMak;
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

  getArmAcc() {
    return this.armAcc;
  }

  getDecMak() {
    return this.decMak;
  }

  throwShort() {
    let acc = statRoll(this.armAcc, max);
    let str = statRoll(this.armStr, max);

    return { acc, str };
  }

  throwMed() {}

  throwDeep() {}

  scramble() {}
}
