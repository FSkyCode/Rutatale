document.getElementById("start").addEventListener("click", () => {

    // Datos del jugador
    const player = {
        name: "Juan",
        hp: 20,
        maxHp: 20,
        casilla: 1
    };

    // Datos del enemigo
    const enemy = {
        name: "Slime",
        hp: 15,
        maxHp: 15,
        casilla: 1
    };

    // Enviar datos a combate/index.html
    localStorage.setItem("battle_player", JSON.stringify(player));
    localStorage.setItem("battle_enemy", JSON.stringify(enemy));

    window.location.href = "combate/index.html";
});