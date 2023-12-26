import { statGen } from "./functions.js";
import { cbOne, cbTwo, slotCorner } from "../classes/index.js";

export function cbCreator(cb1, cb2, slotCb) {
  cb1 = new cbOne();
  cb2 = new cbTwo();
  slotCb = new slotCorner();

  let display = document.createElement("div");
  display.id = "cbDisplay";

  document.body.appendChild(display);
  document.getElementById("cbDisplay").innerHTML = `
          <h1>CB1 Info</h1>
          <p> name: ${cb1.name} </p>
          <p> speed: ${cb1.cbSpeed} </p>
          <p> accel: ${cb1.cbAccel} </p>
          <p> coverage: ${cb1.cover} </p>
          <p> catching: ${cb1.cbCatch} </p>
          <p> tackling: ${cb1.tackling} </p>
          <h1>CB2 Info</h1>
          <p> name: ${cb2.name} </p>
          <p> speed: ${cb2.cbSpeed} </p>
          <p> accel: ${cb2.cbAccel} </p>
          <p> coverage: ${cb2.cover} </p>
          <p> catching: ${cb2.cbCatch} </p>
          <p> tackling: ${cb2.tackling} </p>
          <h1>Slot CB Info</h1>
          <p> name: ${slotCb.name} </p>
          <p> speed: ${slotCb.cbSpeed} </p>
          <p> accel: ${slotCb.cbAccel} </p>
          <p> coverage: ${slotCb.cover} </p>
          <p> catching: ${slotCb.cbCatch} </p>
          <p> tackling: ${slotCb.tackling} </p>
      `;
}

export function cbWinnerDec(marginOfV) {
  if (marginOfV >= 10) {
    return { "CB CRIT!": marginOfV };
  } else {
    return { "CB Win! Margin of Victory": marginOfV };
  }
}
