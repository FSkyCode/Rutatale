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

  else if (op === "s" || op === "S") {
    let daño = Math.max(1, enemy.atk - player.defense * 2);
    player.hp -= daño;
    print("🛡 Te defiendes.");
    print(`El enemigo te golpea causando ${daño}.`);
    if (player.hp <= 0) return gameOver();
    return mostrarOpcionesCombate();
  }

  else if (op === "d" || op === "D") {
    print("✨ Te sanas.");
    player.hp += 15;
    print(`Tu HP ahora es ${player.hp}.`);
    player.hp -= enemy.atk;
    print(`💥 El ${enemy.name} te golpea causando ${enemy.atk}.`);
    if (player.hp <= 0) return gameOver();
    return mostrarOpcionesCombate();
  }

  else if (op === "f" || op === "F") {
    if (Math.random() < 0.35) {
      print(`💬 Hablas con ${enemy.name}… ¡y huye!`);
      spared.push(enemy.name);
      estado = "caminar";
      return;
    } else {
      print(`${enemy.name} no te entiende y te ataca.`);
    }
  }

  // ataque enemigo
  if (enemy.hp > 0) {
    player.hp -= enemy.atk;
    print(`💥 El ${enemy.name} te golpea causando ${enemy.atk} de daño.`);
  }

  if (player.hp <= 0) return gameOver();

  if (enemy.hp <= 0) {
    print(`\n✔ Derrotaste a ${enemy.name}!\n`);
    kills.push(enemy.name);
    estado = "caminar";
  } else {
    mostrarOpcionesCombate();
  }
}