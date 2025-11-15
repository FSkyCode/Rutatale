// models.js
export class Player {
  constructor(progress = 0) {
    this.progress = progress;
    this.maxHP = 20 + Math.floor(progress / 10) * 10;
    this.hp = this.maxHP;
    this.attack = 6;
    this.defense = 2;
    this.position = 2; // 1..3
    this.RP = 3; // puntos de movimiento por batalla
    this.armor = "normal";
  }

  moveTo(target) {
    const cost = Math.abs(this.position - target); // 1 or 2
    if (cost <= this.RP) {
      this.RP -= cost;
      this.position = target;
      return { ok: true, cost };
    }
    return { ok: false, cost };
  }

  heal(amount) {
    this.hp = Math.min(this.maxHP, this.hp + amount);
  }
}

export class Enemy {
  constructor(opts = {}) {
    this.name = opts.name || "Enemigo";
    this.maxHP = opts.maxHP || 16;
    this.hp = this.maxHP;
    this.atk = opts.atk || 4;
    this.aiType = opts.aiType || "agudo"; // influye en movimientos
    this.position = opts.position || 1;
    this.RP = opts.RP || 3; // puntos para mover si aplica
    this.dialogueState = opts.dialogueState || "neutral"; // permite hablar
    this.canTalk = true;
  }
}