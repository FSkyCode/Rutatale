export class Player {
  constructor() {
    this.hp = 30;
    this.attack = 6;
    this.defense = 3;
  }
}

export class Enemy {
  constructor(name, hp, atk) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
  }
}

export function generar_enemigo() {
  const enemigos = [
    new Enemy("Slime", 8, 4),
    new Enemy("Goblin", 10, 5),
    new Enemy("Murciélago", 7, 3),
    new Enemy("Esqueleto", 12, 4)
  ];
  return enemigos[Math.floor(Math.random() * enemigos.length)];
}

export function jefe_final() {
  return new Enemy("DRAGÓN FINAL", 30, 10);
}

// === ESTADOS GLOBALES ===
export const state = {
  player: new Player(),
  enemigoActual: null,
  distancia: 0,
  meta: 10,
  estado: "intro",
  kills: [],
  spared: []
};