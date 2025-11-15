import { input } from "./terminal.js";
import { procesarEntrada } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      const texto = input.value.trim();
      procesarEntrada(texto);
      input.value = "";
    }
  });

  input.focus();
});