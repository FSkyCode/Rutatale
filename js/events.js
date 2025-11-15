import { print } from "./terminal.js";

// ===============================
//   JUEGO — EQUIVALENTE A PYTHON
// ===============================

class Player {
  constructor() {
    this.hp = 30;
    this.attack = 6;
    this.defense = 3;
  }
}

class Enemy {
  constructor(name, hp, atk) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
  }
}

function generar_enemigo() {
  const enemigos = [
    new Enemy("Slime", 8, 4),
    new Enemy("Goblin", 10, 5),
    new Enemy("Murciélago", 7, 3),
    new Enemy("Esqueleto", 12, 4)
  ];
  return enemigos[Math.floor(Math.random() * enemigos.length)];
}

function jefe_final() {
  return new Enemy("DRAGÓN FINAL", 30, 10);
}

// ===== REGISTROS DE RUTA =====
let kills = [];
let spared = [];

// ===== ESTADO DEL JUEGO =====
let player = new Player();
let distancia = 0;
let meta = 10;
let estado = "intro";
let enemigoActual = null;

// ===============================
//       SISTEMA DE COMBATE
// ===============================

function iniciarCombate(enemy) {
  enemigoActual = enemy;
  estado = "combate";

  print(`\n🔥 ¡Un ${enemy.name} aparece! HP enemigo: ${enemy.hp}\n`);
  mostrarOpcionesCombate();
}

function mostrarOpcionesCombate() {
  print(`Tu HP: ${player.hp} | HP de ${enemigoActual.name}: ${enemigoActual.hp}`);
  print("Elige tu acción:");
  print("[a] Atacar");
  print("[s] Defender");
  print("[d] Sanarse");
  print("[f] Hablar");
}

function procesarCombate(op) {
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

// ===============================
//       GAME OVER Y FINAL
// ===============================

function gameOver() {
  print("\n💀 Has sido derrotado… GAME OVER");
  estado = "fin";
}

function mostrarFinal() {
  print("\n📜 RESULTADO DE TU AVENTURA 📜\n");

  let total = kills.length + spared.length;

  print(`Enemigos encontrados: ${total}`);
  print(`Enemigos derrotados: ${kills.length}`);
  print(`Enemigos perdonados: ${spared.length}\n`);

  if (kills.length === total && total > 0) print("🔪 RUTA: GENOCIDA");
  else if (spared.length === total && total > 0) print("🌱 RUTA: PACIFISTA");
  else print("⚖ RUTA: NEUTRAL");

  if (kills.includes("Slime") && kills.includes("Esqueleto"))
    print("🏆 TÍTULO: Cazador de Huesos y Gelatina");

  if (spared.includes("Goblin"))
    print("✨ TÍTULO: Diplomático Goblin");

  print("\nGracias por jugar 💖");
}

// ===============================
//       LÓGICA PRINCIPAL
// ===============================

export function procesarEntrada(texto) {
  if (estado === "intro") {
    print("Rutatale VS 0.5");
    print("Presiona ENTER vacío para avanzar.\n");
    estado = "caminar";
    return;
  }

  if (estado === "caminar") {
    if (texto !== "") {
      print("Solo usa ESPACIO (enter vacío).");
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

  else if (estado === "combate") {
    procesarCombate(texto);
    if (estado === "fin") return;
  }

  else if (estado === "fin") {
    print("Reinicia la página para jugar de nuevo.");
  }

  if (distancia >= meta && estado === "caminar" && player.hp > 0) {
    print("\n🎉 ¡GANASTE EL JUEGO! ¡ERES UNA LEYENDA! 🎉");
    estado = "finalRuta";
  }

  if (estado === "finalRuta") {
    mostrarFinal();
    estado = "fin";
  }
}