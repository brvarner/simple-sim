let nameData;
fetch("./names.json")
  .then((res) => res.json())
  .then((data) => {
    nameData = data;
  });

export class Receiver {
  firstName = Object.values(nameData.wrFirstNames[(Math.random() * 10) | 0])[0];
  lastName = Object.values(nameData.wrLastNames[(Math.random() * 10) | 0])[0];

  constructor(skills) {
    this.name = `${this.firstName} ${this.lastName}`;
    this.wrSpeed = skills.wrSpeed;
    this.wrAccel = skills.wrAccel;
    this.routeR = skills.routeR;
    this.wrCatch = skills.wrCatch;
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

  runShortRoute() {}

  runMediumRoute() {}

  runDeepRoute() {}

  catch() {}
}

export class Corner {
  firstName = Object.values(nameData.cbFirstNames[(Math.random() * 10) | 0])[0];
  lastName = Object.values(nameData.cbLastNames[(Math.random() * 10) | 0])[0];

  constructor(skills) {
    this.name = `${this.firstName} ${this.lastName}`;
    this.cbSpeed = skills.cbSpeed;
    this.cbAccel = skills.cbAccel;
    this.cover = skills.cover;
    this.cbCatch = skills.cbCatch;
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

  catch() {}
}
