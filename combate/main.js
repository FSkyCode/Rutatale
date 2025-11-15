const enemy = document.getElementById("enemy");
const cells = document.querySelectorAll(".cell");

let pos = 2; // posición inicial del monstruo

function drawEnemy() {
  cells.forEach(c => c.innerHTML = "");
  cells[pos - 1].innerHTML = "😈"; 
}

drawEnemy();

// EVENTOS DE BOTONES
document.getElementById("btnAttack").onclick = () => {
  console.log("Atacar...");
};

document.getElementById("btnDefend").onclick = () => {
  console.log("Defender...");
};

document.getElementById("btnHeal").onclick = () => {
  console.log("Sanar...");
};

document.getElementById("btnTalk").onclick = () => {
  console.log("Hablar...");
};

// Cambiar casilla del enemigo (pruebas)
setInterval(() => {
  pos = Math.floor(Math.random() * 3) + 1;
  drawEnemy();
}, 1500);