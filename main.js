import {
  wrWinnerDec,
  cbWinnerDec,
  battle,
  accelStart,
  accelBattle,
  coverRouteBattleCovered,
  offTheLineBattle,
  coverRouteBattleOpen,
  shortRoute,
  medRoute,
  deepRoute,
  wrOpenRoll,
  wrCoveredRoll,
  throwToCatch,
  wrObjFiller,
  cbObjFiller,
  qbObjFiller,
} from "./functions/functions.js";

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

let accelRes;
let speedRes;
let coverRes;
let catchRes;

let accelMarginOfV;
let speedMarginOfV;
let coverMarginOfV;
let catchMarginOfV;

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
  elusiveness,
};

const cbObj = {
  cbSpeed,
  cbAccel,
  cover,
  cbCatch,
  tackling,
};

// Vanilla JS Proxies allow for real time changes to be made in DOM.
// In React we'd probably just deploy this as a state.
let wrOpen = { value: false };

const openHandler = {
  set(target, prop, value) {
    target[prop] = value;
  },
};

const openProxy = new Proxy(wrOpen, openHandler);

let qb;

const wrObj2 = structuredClone(wrObj);
const wrObj3 = structuredClone(wrObj);

let wrObjArr = [wrObj, wrObj2, wrObj3];

let wr1;
let wr2;
let slotWr;

const cbObj2 = structuredClone(cbObj);
const cbObj3 = structuredClone(cbObj);

let cbObjArr = [cbObj, cbObj2, cbObj3];

let cb1;
let cb2;
let slotCb;

qbButton.addEventListener("click", function () {
  qbObjFiller(qbObj, qb);
});

wrButton.addEventListener("click", function () {
  wrObjFiller(wrObjArr, wr1, wr2, slotWr);
});

cbButton.addEventListener("click", function () {
  cbObjFiller(cbObjArr, cb1, cb2, slotCb);
});

shortRouteButton.addEventListener("click", function () {
  shortRoute(wrObj.wrAccel, cbObj.cbAccel);

  let display = document.createElement("div");
  display.id = "wrOpenDisplay";

  document.body.appendChild(display);
  // We have to update the innerHTML of this display every time the openProxy updates
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
    console.log({ accelMarginOfV });
    throwToCatch();
  });
});
