// ===============================
//   SISTEMA DE TERMINAL
// ===============================

export const term = document.getElementById("terminal");
export const input = document.getElementById("inputLine");

export function print(text) {
  term.innerText += text + "\n";
  term.scrollTop = term.scrollHeight;
}