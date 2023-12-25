import { statGen } from "./functions.js";
import { Receiver } from "../classes/index.js";

export function wrCreator(wr1, wr2, slotWr) {
  wr1 = new Receiver();
  wr2 = new Receiver();
  slotWr = new Receiver();

  let display = document.createElement("div");
  display.id = "wrDisplay";

  document.body.appendChild(display);
  document.getElementById("wrDisplay").innerHTML = `
          <h1>WR1 Info</h1>
          <p> name: ${wr1.name} </p>
          <p> speed: ${wr1.wrSpeed} </p>
          <p> accel: ${wr1.wrAccel} </p>
          <p> route running: short: ${wr1.shortRoute} medium: ${wr1.medRoute} deep: ${wr1.deepRoute} </p>
          <p> catching: ${wr1.wrCatch} </p>
          <p> elusiveness: ${wr1.elusiveness} </p>
          <h1>WR2 Info</h1>
          <p> name: ${wr2.name} </p>
          <p> speed: ${wr2.wrSpeed} </p>
          <p> accel: ${wr2.wrAccel} </p>
          <p> route running: short: ${wr2.shortRoute} medium: ${wr2.medRoute} deep: ${wr2.deepRoute} </p>
          <p> catching: ${wr2.wrCatch} </p>
          <p> elusiveness: ${wr2.elusiveness} </p>
          <h1>Slot WR Info</h1>
          <p> name: ${slotWr.name} </p>
          <p> speed: ${slotWr.wrSpeed} </p>
          <p> accel: ${slotWr.wrAccel} </p>
          <p> route running: short: ${slotWr.shortRoute} medium: ${slotWr.medRoute} deep: ${slotWr.deepRoute} </p>
          <p> catching: ${slotWr.wrCatch} </p>
          <p> elusiveness: ${slotWr.elusiveness} </p>
      `;
}

export function wrWinnerDec(marginOfV) {
  if (marginOfV >= 10) {
    return { "WR CRIT!": marginOfV };
  } else {
    return { "WR Win! Margin of Victory": marginOfV };
  }
}
