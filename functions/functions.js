import { Receiver, Corner, QB } from "../classes/index.js";

export const max = Math.floor(100);

export function statGen(min, maxArg) {
  min = Math.ceil(min);
  maxArg = Math.floor(maxArg);
  return Math.floor(Math.random() * (maxArg - min + 1)) + min;
}

export function statRoll(stat) {
  return Math.floor(Math.random() * (max - stat + 1)) + stat;
}

export function statRollWAdv(stat, adv) {
  stat += adv;
  return Math.floor(Math.random() * (max - stat + 1)) + stat;
}
export function wrWinnerDec(marginOfV) {
  if (marginOfV >= 10) {
    return { "WR CRIT!": marginOfV };
  } else {
    return { "WR Win! Margin of Victory": marginOfV };
  }
}

export function cbWinnerDec(marginOfV) {
  if (marginOfV >= 10) {
    return { "CB CRIT!": marginOfV };
  } else {
    return { "CB Win! Margin of Victory": marginOfV };
  }
}

export function battle(wrStat, cbStat, marginOfV, adv, openValue) {
  let max = Math.floor(100);
  let wrMin = Math.ceil(wrStat);
  let cbMin = Math.ceil(cbStat);

  let advHolder = Object.keys(adv)[0];
  let advAmount = Object.values(adv)[0];

  // Working on making the "adv" argument optional
  if (advHolder.includes("WR")) {
    wrMin += advAmount;
  } else if (advHolder.includes("CB")) {
    cbMin += advAmount;
  }
  let cbRes = Math.floor(Math.random() * (max - cbMin + 1)) + cbMin;

  if (wrRes > cbRes) {
    openValue = true;
    marginOfV = wrRes - cbRes;
    openDisplayUpdate();
    return wrWinnerDec(marginOfV);
  } else if (cbRes > wrRes) {
    marginOfV = cbRes - wrRes;
    openDisplayUpdate();
    return cbWinnerDec(marginOfV);
  } else {
    console.log("Push");
    return { "No Winner": 0 };
  }
}

export function accelStart(wr, cb, marginOfV, openValue) {
  let max = Math.floor(100);
  let wrMin = Math.ceil(wrAccel);
  let cbMin = Math.ceil(cbAccel);

  let wrRes = Math.floor(Math.random() * (max - wrMin + 1)) + wrMin;
  let cbRes = Math.floor(Math.random() * (max - cbMin + 1)) + cbMin;

  if (wrRes > cbRes) {
    openValue = true;
    marginOfV = wrRes - cbRes;
    return wrWinnerDec(marginOfV);
  } else if (cbRes > wrRes) {
    marginOfV = cbRes - wrRes;
    return cbWinnerDec(marginOfV);
  } else {
    console.log("Push");
    return { "No Winner": 0 };
  }
}

export function accelBattle(wrAccel, cbAccel, accelMarginOfV, openValue) {
  accelRes = accelStart(wrAccel, cbAccel, accelMarginOfV, openValue);
  accelMarginOfV = Object.values(accelRes)[0];
}

export function speedBattle(
  wrSpeed,
  cbSpeed,
  speedMarginOfV,
  accelRes,
  openValue
) {
  speedRes = battle(wrSpeed, cbSpeed, speedMarginOfV, accelRes, openValue);
  speedMarginOfV = Object.values(speedRes)[0];
}

export function coverRouteBattleCovered(wrCatch, cbCatch, accelMarginOfV) {
  let wrHand = accelMarginOfV;

  let wrCatchTarget = Math.floor(Math.random() * (max - wrCatch + 1)) + wrCatch;
  let cbCatchTarget = Math.floor(Math.random() * (max - cbCatch + 1)) + cbCatch;

  let wrCatchCheck =
    Math.floor(Math.random() * (max - wrCatch + 1)) + wrCatch - wrHand;
  console.log({ wrCatchCheck });
  let cbCatchCheck = Math.floor(Math.random() * (max - cbCatch + 1)) + cbCatch;

  console.log({ wrCatchCheck, wrCatchTarget });
  console.log({ cbCatchCheck, cbCatchTarget });

  if (wrCatchCheck >= cbCatchCheck) {
    alert("GET MOSSED ON!");
  } else if (cbCatchCheck < cbCatchTarget) {
    alert("Nice PBU");
  } else if (cbCatchCheck >= cbCatchTarget) {
    alert("PICK!");
  }
}

export function offTheLineBattle() {
  accelBattle();
  if (Object.values(accelRes)[0] < 10) {
    // We'd do a speedBattle then have the wrOpen variable update
    // after half a second
    setTimeout(() => {
      speedBattle();
    }, 500);
  }
}

// Ideally, each play will have 2WR - 5WR sets. In your first season, unless you start balling out, you won't have playcalling ability.
// We'll separate the

export function shortRoute() {
  offTheLineBattle();
}

export function medRoute() {
  // Here we take the best two out of three results to determine if a WR is open or not.
  // The battles will go like this: one accel battle off the line. one speed battle after that,
  // then the cover v route running battle. Next battle is speed again, then cover v route running.
  // Last battle is accel, then speed then cover v route running
}

export function deepRoute() {
  // Here we take the best three out of five results to determine if a WR is open or not.
  //   These battles go in the same basic order as the medRoute battles, with a repeat of battles two and three.
}

// Need to separate coverage battles from catch battles
export function coverRouteBattleOpen() {
  let cbHand = accelMarginOfV;

  let wrCatchTarget = Math.floor(Math.random() * (max - wrCatch + 1)) + wrCatch;
  let cbCatchTarget = Math.floor(Math.random() * (max - cbCatch + 1)) + cbCatch;

  let wrCatchCheck = Math.floor(Math.random() * (max - wrCatch + 1)) + wrCatch;
  let cbCatchCheck =
    Math.floor(Math.random() * (max - cbCatch + 1)) + cbCatch - cbHand;
  console.log({ wrCatchCheck, wrCatchTarget });
  console.log({ cbCatchCheck, cbCatchTarget });

  if (cbCatchCheck >= wrCatchCheck) {
    alert("PBU");
  } else if (wrCatchCheck < wrCatchTarget) {
    alert("Damn, butterfingers!");
  } else if (wrCatchCheck >= wrCatchTarget) {
    alert("Ball Caught!");
  }
}

export function wrOpenRoll(armStr, armAcc) {
  let throwStrMin = armStr;
  let throwAccMin = armAcc;

  let throwTargetStr =
    Math.floor(Math.random() * (max - throwStrMin + 1)) + throwStrMin;
  let throwTargetAcc =
    Math.floor(Math.random() * (max - throwAccMin + 1)) + throwAccMin;

  let strCheck =
    Math.floor(Math.random() * (max - throwStrMin + 1)) + throwStrMin;
  let accCheck =
    Math.floor(Math.random() * (max - throwAccMin + 1)) + throwAccMin;

  if (strCheck >= throwTargetStr) {
    console.log("str good!");
    if (accCheck >= throwTargetAcc) {
      console.log("acc good!");
      // If the arm str and acc are good, there's no QB penalty in the catch battle
      // the losing CB gets a penalty to their catch check. They can still get a PBU
      coverRouteBattleOpen();
    } else {
      console.log("Wild Throw");
    }
  } else {
    console.log("Underthrown");
  }
}

export function wrCoveredRoll() {
  let throwStrMin = qbObj.armStr;
  let throwAccMin = qbObj.armAcc;

  let throwTargetStr =
    Math.floor(Math.random() * (max - throwStrMin + 1)) + throwStrMin;
  let throwTargetAcc =
    Math.floor(Math.random() * (max - throwAccMin + 1)) + throwAccMin;

  let strCheck =
    Math.floor(Math.random() * (max - throwStrMin + 1)) + throwStrMin;
  let accCheck =
    Math.floor(Math.random() * (max - throwAccMin + 1)) + throwAccMin;

  if (strCheck >= throwTargetStr) {
    console.log("str good!");
    if (accCheck >= throwTargetAcc) {
      console.log("acc good!");
      coverRouteBattleCovered();
    } else {
      console.log("Wild Throw");
    }
  } else {
    console.log("Underthrown");
  }
}

export function throwToCatch(openValue) {
  if (openValue === true) {
    wrOpenRoll();
  } else if (openValue === false) {
    wrCoveredRoll();
  }
}

export function wrGen(obj) {
  obj.wrSpeed = statGen(60, 99);
  obj.wrAccel = statGen(60, 99);
  obj.routeR = statGen(60, 99);
  obj.wrCatch = statGen(60, 99);
  obj.elusiveness = statGen(60, 99);
}

export function cbGen(obj) {
  obj.cbSpeed = statGen(60, 99);
  obj.cbAccel = statGen(60, 99);
  obj.cover = statGen(60, 99);
  obj.cbCatch = statGen(60, 99);
  obj.tackling = statGen(60, 99);
}

export function qbGen(obj) {
  obj.speed = statGen(60, 99);
  obj.accel = statGen(60, 99);
  obj.armStr = statGen(60, 99);
  obj.armAcc = statGen(60, 99);
  obj.decMak = statGen(60, 99);
}

export function qbObjFiller(obj, qb) {
  qbGen(obj);

  qb = new QB(obj);

  let display = document.createElement("div");
  display.id = "qbDisplay";

  document.body.appendChild(display);
  document.getElementById("qbDisplay").innerHTML = `
        <h1>QB Info</h1>
        <p> name: ${qb.name} </p>
        <p> speed: ${qb.speed} </p>
        <p> accel: ${qb.accel} </p>
        <p> arm strength: ${qb.armStr} </p>
        <p> arm accuracy: ${qb.armAcc} </p>
        <p> decision making: ${qb.decMak} </p>
    `;
}

export function wrObjFiller(objArr, wr1, wr2, slotWr) {
  objArr.forEach((obj) => {
    wrGen(obj);
  });

  if (objArr[2].routeR) {
    wr1 = new Receiver(objArr[0]);
    wr2 = new Receiver(objArr[1]);
    slotWr = new Receiver(objArr[2]);
  }

  let display = document.createElement("div");
  display.id = "wrDisplay";

  document.body.appendChild(display);
  document.getElementById("wrDisplay").innerHTML = `
        <h1>WR1 Info</h1>
        <p> name: ${wr1.name} </p>
        <p> speed: ${wr1.wrSpeed} </p>
        <p> accel: ${wr1.wrAccel} </p>
        <p> route running: ${wr1.routeR} </p>
        <p> catching: ${wr1.wrCatch} </p>
        <h1>WR2 Info</h1>
        <p> name: ${wr2.name} </p>
        <p> speed: ${wr2.wrSpeed} </p>
        <p> accel: ${wr2.wrAccel} </p>
        <p> route running: ${wr2.routeR} </p>
        <p> catching: ${wr2.wrCatch} </p>
        <h1>Slot WR Info</h1>
        <p> name: ${slotWr.name} </p>
        <p> speed: ${slotWr.wrSpeed} </p>
        <p> accel: ${slotWr.wrAccel} </p>
        <p> route running: ${slotWr.routeR} </p>
        <p> catching: ${slotWr.wrCatch} </p>
    `;
}

export function cbObjFiller(objArr, cb1, cb2, slotCb) {
  objArr.forEach((obj) => {
    cbGen(obj);
  });

  if (objArr[2].cover) {
    cb1 = new Corner(objArr[0]);
    cb2 = new Corner(objArr[1]);
    slotCb = new Corner(objArr[2]);
  }

  let display = document.createElement("div");
  display.id = "cbDisplay";

  document.body.appendChild(display);
  document.getElementById("cbDisplay").innerHTML = `
        <h1>CB1 Info</h1>
        <p> name: ${cb1.name} </p>
        <p> speed: ${cb1.cbSpeed} </p>
        <p> accel: ${cb1.cbAccel} </p>
        <p> route running: ${cb1.cover} </p>
        <p> catching: ${cb1.cbCatch} </p>
        <h1>CB2 Info</h1>
        <p> name: ${cb2.name} </p>
        <p> speed: ${cb2.cbSpeed} </p>
        <p> accel: ${cb2.cbAccel} </p>
        <p> route running: ${cb2.cover} </p>
        <p> catching: ${cb2.cbCatch} </p>
        <h1>Slot CB Info</h1>
        <p> name: ${slotCb.name} </p>
        <p> speed: ${slotCb.cbSpeed} </p>
        <p> accel: ${slotCb.cbAccel} </p>
        <p> route running: ${slotCb.cover} </p>
        <p> catching: ${slotCb.cbCatch} </p>
    `;
}
