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

export function throwButtonAppear(openValue) {
  let display = document.createElement("div");
  display.id = "wrOpenDisplay";

  document.body.appendChild(display);
  // We have to update the innerHTML of this display every time the openProxy updates
  document.getElementById("wrOpenDisplay").innerHTML = `
        <h1>WR Open?</h1>
        <p> ${openValue} </p>
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
}
