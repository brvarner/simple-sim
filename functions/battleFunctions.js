export function battle(wrStat, cbStat, marginOfV, adv, openValue) {
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

export function accelStart(wrAccel, cbAccel, marginOfV, openValue) {
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

// Ideally, each play will have 2WR - 5WR sets. In your first season, unless you start balling out, you won't have playcalling ability.
// We'll separate the

export function shortRoute(wrAccel, cbAccel) {
  offTheLineBattle(wrAccel, cbAccel);
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

  let throwCheck = qb.throwShort();

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
