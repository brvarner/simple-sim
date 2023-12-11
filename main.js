const qbButton = document.getElementById("qbButton");
const wrButton = document.getElementById("wrButton");
const cbButton = document.getElementById("cbButton");
const shortRouteButton = document.getElementById("shortRoute");

let speed = 0;
let accel = 0;
let armStr = 0;
let armAcc = 0;
let decMak = 0;

let wrSpeed = 0;
let wrAccel = 0;
let routeR = 0;
let wrCatch = 0;

let cbSpeed = 0;
let cbAccel = 0;
let cover = 0;
let cbCatch = 0;

const qbObj = {
  speed,
  accel,
  armStr,
  armAcc,
  decMak,
};

const wrObj = {
  wrSpeed,
  wrAccel,
  routeR,
  wrCatch,
};

const cbObj = {
  cbSpeed,
  cbAccel,
  cover,
  cbCatch,
};

// Vanilla JS Proxies allow for real time changes to be made in DOM?
// In React we'd probably just deploy this as a state.
let wrOpen = { value: false };

const openHandler = {
  set(obj, prop) {
    if (prop === true) {
      return Reflect.set(...arguments);
    }
  },
};

const openProxy = new Proxy(wrOpen, openHandler);

let accelMarginOfV;
let speedMarginOfV;
let coverMarginOfV;
let catchMarginOfV;

const statGen = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const qbMaker = (qbObj) => {
  let obj = qbObj;
  obj.speed = statGen(60, 99);
  obj.accel = statGen(60, 99);
  obj.armStr = statGen(60, 99);
  obj.armAcc = statGen(60, 99);
  obj.decMak = statGen(60, 99);

  let display = document.createElement("div");
  display.id = "qbDisplay";

  document.body.appendChild(display);
  document.getElementById("qbDisplay").innerHTML = `
        <h1>QB Info</h1>
        <p> speed: ${qbObj.speed} </p>
        <p> accel: ${qbObj.accel} </p>
        <p> arm strength: ${qbObj.armStr} </p>
        <p> arm accuracy: ${qbObj.armAcc} </p>
        <p> decision making: ${qbObj.decMak} </p>
    `;
};

const wrMaker = (wrObj) => {
  let obj = wrObj;
  obj.wrSpeed = statGen(60, 99);
  obj.wrAccel = statGen(60, 99);
  obj.routeR = statGen(60, 99);
  obj.wrCatch = statGen(60, 99);

  let display = document.createElement("div");
  display.id = "wrDisplay";

  document.body.appendChild(display);
  document.getElementById("wrDisplay").innerHTML = `
        <h1>WR Info</h1>
        <p> speed: ${obj.wrSpeed} </p>
        <p> accel: ${obj.wrAccel} </p>
        <p> route running: ${obj.routeR} </p>
        <p> catching: ${obj.wrCatch} </p>
    `;
};

const cbMaker = (cbObj) => {
  let obj = cbObj;
  obj.cbSpeed = statGen(60, 99);
  obj.cbAccel = statGen(60, 99);
  obj.cover = statGen(60, 99);
  obj.cbCatch = statGen(60, 99);

  let display = document.createElement("div");
  display.id = "cbDisplay";

  document.body.appendChild(display);
  document.getElementById("cbDisplay").innerHTML = `
        <h1>CB Info</h1>
        <p> speed: ${obj.cbSpeed} </p>
        <p> accel: ${obj.cbAccel} </p>
        <p> cover: ${obj.cover} </p>
        <p> catching: ${obj.cbCatch} </p>
    `;
};

const wrWinnerDec = (marginOfV) => {
  if (marginOfV >= 10) {
    return { "WR CRIT!": marginOfV };
  } else {
    return { "WR Win! Margin of Victory": marginOfV };
  }
};

const cbWinnerDec = (marginOfV) => {
  if (marginOfV >= 10) {
    return { "CB CRIT!": marginOfV };
  } else {
    return { "CB Win! Margin of Victory": marginOfV };
  }
};

const battle = (obj1Stat, obj2Stat, marginOfV, adv) => {
  let max = Math.floor(100);
  let wrMin = Math.ceil(obj1Stat);
  let cbMin = Math.ceil(obj2Stat);

  let advHolder = Object.keys(adv)[0];
  let advAmount = Object.values(adv)[0];

  console.log({ advHolder, advAmount });

  // Working on making the "adv" argument optional
  if (advHolder.includes("WR")) {
    wrMin += advAmount;
  } else if (advHolder.includes("CB")) {
    cbMin += advAmount;
  }

  let wrRes = Math.floor(Math.random() * (max - wrMin + 1)) + wrMin;
  let cbRes = Math.floor(Math.random() * (max - cbMin + 1)) + cbMin;

  if (wrRes > cbRes) {
    openProxy.value = true;
    marginOfV = wrRes - cbRes;
    return wrWinnerDec(marginOfV);
  } else if (cbRes > wrRes) {
    marginOfV = cbRes - wrRes;
    return cbWinnerDec(marginOfV);
  } else {
    console.log("Push");
    return { "No Winner": 0 };
  }
};

const accelStart = (obj1Stat, obj2Stat, marginOfV) => {
  let max = Math.floor(100);
  let wrMin = Math.ceil(obj1Stat);
  let cbMin = Math.ceil(obj2Stat);

  let wrRes = Math.floor(Math.random() * (max - wrMin + 1)) + wrMin;
  let cbRes = Math.floor(Math.random() * (max - cbMin + 1)) + cbMin;

  if (wrRes > cbRes) {
    openProxy.value = true;
    marginOfV = wrRes - cbRes;
    return wrWinnerDec(marginOfV);
  } else if (cbRes > wrRes) {
    marginOfV = cbRes - wrRes;
    return cbWinnerDec(marginOfV);
  } else {
    console.log("Push");
    return { "No Winner": 0 };
  }
};

let accelRes;
let speedRes;
let coverRes;
let catchRes;

let accelBattle = () => {
  accelRes = accelStart(wrObj.wrAccel, cbObj.cbAccel, accelMarginOfV);
  console.log({ accelRes });
  console.log(openProxy.value);
  accelMarginOfV = Object.values(accelRes)[0];
};

let speedBattle = () => {
  console.log({ accelRes });
  speedRes = battle(wrObj.wrSpeed, cbObj.cbSpeed, speedMarginOfV, accelRes);
  console.log({ speedRes });
  console.log(openProxy.value);
  speedMarginOfV = Object.values(speedRes)[0];
};

const shortRoute = () => {
  accelBattle();
  if (Object.values(accelRes)[0] < 10) {
    // We'd do a speedBattle then have the wrOpen variable update
    // after half a second
    setTimeout(() => {
      speedBattle();
    }, 1000);
    console.log(speedRes);
  }
};

qbButton.addEventListener("click", function () {
  qbMaker(qbObj);
});

wrButton.addEventListener("click", function () {
  wrMaker(wrObj);
});

cbButton.addEventListener("click", function () {
  cbMaker(cbObj);
});

shortRouteButton.addEventListener("click", function () {
  let cbCatch = cbObj.cbCatch;
  let wrCatch = wrObj.wrCatch;

  shortRoute(wrObj.wrAccel, cbObj.cbAccel);

  let display = document.createElement("div");
  display.id = "wrOpenDisplay";

  document.body.appendChild(display);
  document.getElementById("wrOpenDisplay").innerHTML = `
        <h1>WR Open?</h1>
        <p> ${openProxy.value} </p>
    `;

  let button = document.createElement("button");
  button.id = "throwButton";

  document.body.appendChild(button);
  document.getElementById("throwButton").innerHTML = `
    Throw
    `;

  let throwButton = document.getElementById("throwButton");

  throwButton.addEventListener("click", function () {
    let max = 100;
    console.log({ accelMarginOfV });
    if (openProxy.value === true) {
      // This is the handicap that the CB has in this contest, as they've lost the accel battle
      let cbHand = accelMarginOfV;
      console.log({ cbHand });

      let throwStrMin = qbObj.armStr;
      let throwAccMin = qbObj.armAcc;

      let wrCatch = wrObj.wrCatch;
      let cbCatch = cbObj.cbCatch;

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
          let wrCatchTarget =
            Math.floor(Math.random() * (max - wrCatch + 1)) + wrCatch;
          let cbCatchTarget =
            Math.floor(Math.random() * (max - cbCatch + 1)) + cbCatch;

          let wrCatchCheck =
            Math.floor(Math.random() * (max - wrCatch + 1)) + wrCatch;
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
        } else {
          console.log("Wild Throw");
        }
      } else {
        console.log("Underthrown");
      }
    } else if (openProxy.value === false) {
      // This is the handicap that the CB has in this contest, as they've lost the accel battle
      let wrHand = accelMarginOfV;

      let throwStrMin = qbObj.armStr;
      let throwAccMin = qbObj.armAcc;

      let wrCatch = wrObj.wrCatch;
      let cbCatch = cbObj.cbCatch;

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
          console.log({ wrHand });
          // If the arm str and acc are good, there's no QB penalty in the catch battle
          // the losing CB gets a penalty to their catch check. They can still get a PBU
          let wrCatchTarget =
            Math.floor(Math.random() * (max - wrCatch + 1)) + wrCatch;
          let cbCatchTarget =
            Math.floor(Math.random() * (max - cbCatch + 1)) + cbCatch;

          let wrCatchCheck =
            Math.floor(Math.random() * (max - wrCatch + 1)) + wrCatch - wrHand;
          console.log({ wrCatchCheck });
          let cbCatchCheck =
            Math.floor(Math.random() * (max - cbCatch + 1)) + cbCatch;

          console.log({ wrCatchCheck, wrCatchTarget });
          console.log({ cbCatchCheck, cbCatchTarget });

          if (wrCatchCheck >= cbCatchCheck) {
            alert("GET MOSSED ON!");
          } else if (cbCatchCheck < cbCatchTarget) {
            alert("Nice PBU");
          } else if (cbCatchCheck >= cbCatchTarget) {
            alert("PICK!");
          }
        } else {
          console.log("Wild Throw");
        }
      } else {
        console.log("Underthrown");
      }
    }
  });
});
