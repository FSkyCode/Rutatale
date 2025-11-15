import { print } from "./terminal.js";
import {
  estado, distancia, meta,
  player, enemigoActual,
  kills, spared
} from "./game_state.js";

import { iniciarCombate, procesarCombate } from "./combat.js";
import { generar_enemigo, jefe_final } from "./game_state.js";

export function procesarEntrada(texto) {
  if (estado === "intro") {
    print("Rutatale for zfSkyCode");
    print("Presiona ENTER vacío para avanzar.\n");
    estado = "caminar";
    return;
  }

  if (estado === "caminar") {
    if (texto !== "") {
      print("Solo usa ENTER vacío.");
      return;
    }

    distancia++;
    print(`➡ Avanzaste. Progreso: ${distancia}/${meta}`);

    if (Math.random() < 0.45) {
      iniciarCombate(generar_enemigo());
      return;
    }

    if (distancia >= meta) {
      print("🔥 ¡HAS LLEGADO AL JEFE FINAL! 🔥");
      iniciarCombate(jefe_final());
    }
  }

  if (estado === "combate") {
    procesarCombate(texto);
  }
}