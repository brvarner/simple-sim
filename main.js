import {
  battle,
  accelStart,
  accelBattle,
  coverRouteBattleCovered,
  offTheLineBattle,
  coverRouteBattleOpen,
  shortRoute,
  wrOpenRoll,
  wrCoveredRoll,
  throwToCatch,
} from "./functions/functions.js";
import { wrCreator, wrWinnerDec } from "./functions/wrFunctions.js";
import { cbCreator, cbWinnerDec } from "./functions/cbFunctions.js";
import { qbCreator } from "./functions/qbFunctions.js";

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
  wrCreator(wr1, wr2, slotWr);
});

cbButton.addEventListener("click", function () {
  cbCreator(cb1, cb2, slotCb);
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
