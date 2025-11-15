import { print } from "./terminal.js";
import { player, enemigoActual, kills, spared } from "./game_state.js";
import { gameOver } from "./events.js";
import { mostrarOpcionesCombate } from "./events.js";

export function iniciarCombate(enemy) {
  enemigoActual = enemy;
  estado = "combate";

  print(`\n🔥 ¡Un ${enemy.name} aparece! HP enemigo: ${enemy.hp}\n`);
  mostrarOpcionesCombate();
}

export function procesarCombate(op) {
  const enemy = enemigoActual;

  if (op === "a" || op === "A") {
    let daño = Math.floor(Math.random() * 5) + (player.attack - 2);
    enemy.hp -= daño;
    print(`➡ Atacas e infliges ${daño} de daño.`);
  }

  // ... resto del combate igual ...
}