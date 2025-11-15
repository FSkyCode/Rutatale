import { print } from "./terminal.js";
import { state } from "./game_state.js";
import { iniciarCombate, procesarCombate } from "./combat.js";
import { generar_enemigo, jefe_final } from "./game_state.js";

export function procesarEntrada(texto) {
  if (state.estado === "intro") {
    print("Rutatale for zfSkyCode");
    print("Presiona ENTER vacío para avanzar.\n");
    state.estado = "caminar";
    return;
  }

  if (state.estado === "caminar") {
    if (texto !== "") {
      print("Solo usa ENTER vacío.");
      return;
    }

    state.distancia++;
    print(`➡ Avanzaste. Progreso: ${state.distancia}/${state.meta}`);

    if (Math.random() < 0.45) {
      iniciarCombate(generar_enemigo());
      return;
    }

    if (state.distancia >= state.meta) {
      print("🔥 ¡HAS LLEGADO AL JEFE FINAL! 🔥");
      iniciarCombate(jefe_final());
    }
  }

  if (state.estado === "combate") {
    procesarCombate(texto);
  }
}