import { print } from "./terminal.js";

export function procesarEntrada(texto) {
  if (texto === "") return;

  print("> " + texto); // Eco del usuario

  // Respuestas simples
  switch (texto.toLowerCase()) {
    case "hola":
      print("Sistema: ¡Hola viajero!");
      break;

    case "ayuda":
      print("Comandos disponibles: hola, ayuda, clear");
      break;

    case "clear":
      document.getElementById("terminal").innerText = "";
      break;

    default:
      print("Comando desconocido: " + texto);
  }
}