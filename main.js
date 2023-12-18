import { Corner, Receiver } from "./classes.js";
import {
  statGen,
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
} from "./functions.js";

let nameData;
fetch("./names.json")
  .then((res) => res.json())
  .then((data) => {
    nameData = data;
  });

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
  set(target, prop, value) {
    target[prop] = value;
  },
};

const openProxy = new Proxy(wrOpen, openHandler);

const wrGen = (obj) => {
  obj.wrSpeed = statGen(60, 99);
  obj.wrAccel = statGen(60, 99);
  obj.routeR = statGen(60, 99);
  obj.wrCatch = statGen(60, 99);
};

const wrObj2 = structuredClone(wrObj);
const wrObj3 = structuredClone(wrObj);

let wrObjArr = [wrObj, wrObj2, wrObj3];

let wr1;
let wr2;
let slotWr;

let wrObjFiller = (objArr) => {
  objArr.forEach((obj) => {
    wrGen(obj);
  });

  if (wrObj3.routeR) {
    wr1 = new Receiver(wrObj);
    wr2 = new Receiver(wrObj2);
    slotWr = new Receiver(wrObj3);
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
};

const cbMaker = (cbObj) => {
  let obj = cbObj;
  obj.cbSpeed = statGen(60, 99);
  obj.cbAccel = statGen(60, 99);
  obj.cover = statGen(60, 99);
  obj.cbCatch = statGen(60, 99);

  const firstName = Object.values(
    nameData.cbFirstNames[(Math.random() * 10) | 0]
  );
  const lastName = Object.values(
    nameData.cbLastNames[(Math.random() * 10) | 0]
  );

  let display = document.createElement("div");
  display.id = "cbDisplay";

  document.body.appendChild(display);
  document.getElementById("cbDisplay").innerHTML = `
        <h1>CB Info</h1>
        <p> name: ${firstName} ${lastName}</p>
        <p> speed: ${obj.cbSpeed} </p>
        <p> accel: ${obj.cbAccel} </p>
        <p> cover: ${obj.cover} </p>
        <p> catching: ${obj.cbCatch} </p>
    `;
};

qbButton.addEventListener("click", function () {
  qbMaker(qbObj);
});

wrButton.addEventListener("click", function () {
  wrObjFiller(wrObjArr);

  console.log(wr1);

  if (wr1) {
    let speed = wr1.getSpeed();

    console.log(speed);
  }
});

cbButton.addEventListener("click", function () {
  cbMaker(cbObj);
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
