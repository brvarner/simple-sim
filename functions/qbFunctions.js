import { QB } from "../classes/index.js";

export function qbCreator(qb) {
  qb = new QB();

  let display = document.createElement("div");
  display.id = "qbDisplay";

  document.body.appendChild(display);
  document.getElementById("qbDisplay").innerHTML = `
          <h1>QB Info</h1>
          <p> name: ${qb.name} </p>
          <p> speed: ${qb.speed} </p>
          <p> accel: ${qb.accel} </p>
          <p> arm strength: ${qb.armStr} </p>
          <p> arm accuracy: short: ${qb.shortAcc}, medium: ${qb.medAcc}, deep: ${qb.deepAcc} </p>
          <p> decision making: ${qb.decMak} </p>
      `;
}
