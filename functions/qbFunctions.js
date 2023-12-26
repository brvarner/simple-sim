import { pocketPasser, dualThreat, balancedQB } from "../classes/index.js";

export function qbCreator(qb) {
  const qbTypeArray = [pocketPasser, dualThreat, balancedQB];
  let randomizer = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  let qbType = qbTypeArray[randomizer];
  qb = new qbType();

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
