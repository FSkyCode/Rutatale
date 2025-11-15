import { input, print } from "./terminal.js";
import { procesarEntrada } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const texto = input.value.trim();
      print("> " + texto);
      procesarEntrada(texto);
      input.value = "";
    }
  });

  input.focus();
});