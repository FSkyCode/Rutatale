// board.js
// Exporta la clase Board para crear un tablero 3-casillas y mover enemigos.
// API principal:
//  const board = new Board(containerElement);
//  board.spawnEnemy({id:'e1', label:'SL'}); // crea enemigo en casilla central (index 1)
//  board.moveEnemyTo('e1', 0) // mueve enemigo a casilla 1 (0-based)
//  board.on('move', (evt) => {...})

export class Board {
  constructor(container, opts = {}) {
    this.container = container;
    this.slots = [];
    this.enemies = new Map(); // id -> {el, slot}
    this.eventListeners = {};
    this._createBoard();
  }

  _createBoard(){
    // crea 3 casillas
    for (let i=0;i<3;i++){
      const sq = document.createElement('div');
      sq.className = 'square';
      sq.dataset.index = i;

      const slot = document.createElement('div');
      slot.className = 'enemy-slot';
      sq.appendChild(slot);

      // click para mover cualquier enemigo seleccionado a esta casilla
      sq.addEventListener('click', () => {
        this._emit('slotClick', { index: i });
      });

      this.container.appendChild(sq);
      this.slots.push(slot);
    }
  }

  // crear enemigo visual, lo coloca en la casilla 1 (central) por defecto
  spawnEnemy({ id = cryptoRandomId(), label = 'E' } = {}) {
    if (this.enemies.has(id)) return this.enemies.get(id);
    const el = document.createElement('div');
    el.className = 'enemy';
    el.textContent = label;

    // click en enemigo dispara evento
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this._emit('enemyClick', { id, label });
    });

    // colocarlo por defecto en la casilla central (1)
    const slotIndex = 1;
    this.slots[slotIndex].appendChild(el);
    this.enemies.set(id, { el, slot: slotIndex });
    return { id, el, slot: slotIndex };
  }

  moveEnemyTo(id, targetIndex) {
    const entry = this.enemies.get(id);
    if (!entry) return false;
    if (targetIndex < 0 || targetIndex >= this.slots.length) return false;

    // efecto visual corto
    entry.el.classList.add('leap');
    setTimeout(()=> entry.el.classList.remove('leap'), 180);

    // mover en DOM
    this.slots[targetIndex].appendChild(entry.el);
    entry.slot = targetIndex;
    this._emit('move', { id, to: targetIndex });
    return true;
  }

  getEnemySlot(id){
    const e = this.enemies.get(id);
    return e ? e.slot : null;
  }

  on(eventName, fn){
    if (!this.eventListeners[eventName]) this.eventListeners[eventName] = [];
    this.eventListeners[eventName].push(fn);
  }

  _emit(name, data){
    const arr = this.eventListeners[name] || [];
    for (const f of arr) f(data);
  }
}

// ayuda: id aleatorio simple
function cryptoRandomId(){
  return 'id_' + Math.random().toString(36).slice(2,9);
}