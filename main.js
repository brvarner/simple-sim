import {
  statGen,
  statRoll,
  statRollWAdv,
  throwButtonAppear,
  battle,
  accelStart,
  accelBattle,
  speedBattle,
  coverRouteBattleCovered,
  shortRoute,
  medRoute,
  deepRoute,
  coverRouteBattleOpen,
  wrOpenRoll,
  wrCoveredRoll,
  throwToCatch,
  qbCreator,
  cbCreator,
  cbWinnerDec,
  wrCreator,
  wrWinnerDec,
} from "./functions/index.js";
import {
  wrOne,
  wrTwo,
  slotReceiver,
  pocketPasser,
  dualThreat,
  balancedQB,
  cbOne,
  cbTwo,
  slotCorner,
} from "./classes/index.js";

const qbButton = document.getElementById("qbButton");
const wrButton = document.getElementById("wrButton");
const cbButton = document.getElementById("cbButton");
const shortRouteButton = document.getElementById("shortRoute");

let accelRes;
let speedRes;
let coverRes;
let catchRes;

let accelMarginOfV;
let speedMarginOfV;
let coverMarginOfV;
let catchMarginOfV;

// Vanilla JS Proxies allow for real time changes to be made in DOM.
// In React we'd probably just deploy this as a state.
let wrOpen = { value: false };

const openHandler = {
  set(target, prop, value) {
    target[prop] = value;
  },
};

const openProxy = new Proxy(wrOpen, openHandler);
const openProxy2 = new Proxy(wrOpen, openHandler);
const slotOpenProxy = new Proxy(wrOpen, openHandler);

let qb;

let wr1;
let wr2;
let slotWr;

let cb1;
let cb2;
let slotCb;

qbButton.addEventListener("click", function () {
  qbCreator(qb);
});

wrButton.addEventListener("click", function () {
  wr1 = new wrOne();
  wr2 = new wrTwo();
  slotWr = new slotReceiver();
  wrCreator(wr1, wr2, slotWr);
});

cbButton.addEventListener("click", function () {
  cb1 = new cbOne();
  cb2 = new cbTwo();
  slotCb = new slotCorner();
  cbCreator(cb1, cb2, slotCb);
});

shortRouteButton.addEventListener("click", function () {
  let wrAccel = wr1.getAccel();
  let cbAccel = cb1.getAccel();
  let wrSpeed = wr1.getSpeed();
  let cbSpeed = cb1.getSpeed();
  let openValue = openProxy.value;
  let routeRes = shortRoute(
    wrAccel,
    wrSpeed,
    cbAccel,
    cbSpeed,
    accelRes,
    speedRes,
    accelMarginOfV,
    speedMarginOfV,
    openValue
  );
  accelRes = routeRes.accelRes;
  speedRes = routeRes.speedRes;
  console.log({ accelRes, speedRes });
  throwButtonAppear(openValue);
});
