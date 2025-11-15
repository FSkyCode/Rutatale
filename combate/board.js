class Fighter {
    constructor(data) {
        this.name = data.name;
        this.hp = data.hp;
        this.maxHp = data.maxHp;
        this.casilla = data.casilla;
    }

    moveTo(pos) {
        this.casilla = pos;
    }
}

export { Fighter };