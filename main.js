import { input } from "./terminal.js";
import { procesarEntrada } from "./events.js";

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const texto = input.value.trim();
    procesarEntrada(texto);
    input.value = "";
  }
});

input.focus();