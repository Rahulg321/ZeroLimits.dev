/// <reference lib="dom" />

import help from "./bin/help";
import about from "./bin/about";
import ls from "./bin/ls";

const history: string[] = [];
let currentPos = history.length - 1;

const input = document.querySelector("input")!;
const log = document.getElementById("log")!;

log.innerHTML += `${about()}\n`;
log.innerHTML += `Type "help" to see all available commands.\n`;

document.addEventListener("click", () => input.focus());

input.onkeyup = (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (currentPos >= 0) {
      input.value = history[currentPos];
      currentPos -= 1;
    }
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (currentPos < history.length - 1) {
      currentPos += 1;
      input.value = history[currentPos];
    } else {
      input.value = "";
    }
  }

  if (e.key === "Enter") {
    const cmd = input.value.toLowerCase().trim();
    history.push(cmd);
    currentPos = history.length - 1;

    if (cmd === "clear") {
      log.innerHTML = "";
      input.value = "";
      return;
    }

    let returnVal = `Not a valid command. Type "help" to see all available commands.\n`;

    if (cmd.startsWith("help")) returnVal = help(cmd.split(" ")[1]);
    if (cmd === "about") returnVal = about();
    if (cmd.startsWith("ls")) returnVal = ls(cmd.split(" ")[1]);
    if (cmd === "") returnVal = "";

    log.innerHTML += `> ${input.value}\n`;
    log.innerHTML += `${returnVal}\n`;

    scrollTo(0, document.body.scrollHeight);
    input.value = "";
  }
};
