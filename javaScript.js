//import oepration.js module aritmetical operations
import { operate } from "./operations.js";
// Select DOM elements
let body = document.getElementsByTagName("body")[0];
let screenText = document.getElementById("screenText");
let keyBoard = document.getElementById("keyboard");
let deleteButton = document.getElementById("delete");
let bigScreenTotal = document.getElementById("total");
let historyScreen = document.getElementById("history");
let operators = ["+", "-", "×", "÷"];
let first,
  second,
  oper,
  result = null;

// Prevent default behavior on double-click, mousedown and mouseover
body.addEventListener("dblclick", (event) => {
  event.preventDefault();
  event.stopPropagation();
});

document.addEventListener("mousedown", (event) => {
  event.preventDefault();
});

document.addEventListener("mousemove", (event) => {
  event.preventDefault();
});

document.getElementById("keyboard").addEventListener("dragstart", (event) => {
  event.preventDefault();
});

document.getElementById("calculator").addEventListener("mousedown", (event) => {
  event.preventDefault();
});

document.querySelectorAll(".row > div").forEach((button) => {
  button.addEventListener("mousedown", (event) => {
    event.preventDefault(); // Evita la selección y posibles cambios no deseados
  });

  button.addEventListener("mousemove", (event) => {
    event.preventDefault(); // Evita que el texto se arrastre al mover el cursor
  });

  button.addEventListener("dragstart", (event) => {
    event.preventDefault(); // Bloquea el arrastre de elementos
  });
});

function updateScreen() {
  if (screenText.innerText.trim() !== "") {
    screenText.scrollLeft = screenText.scrollWidth;
    historyScreen.scrollLeft = historyScreen.scrollWidth;
  }
}

// Event to write on screen when clicking keyboard
keyBoard.addEventListener("click", writeOnScreen);

function writeOnScreen(event) {
  if (!event.target.id || event.target.id === "keyboard") return;

  let char = event.target.innerText;
  let currentText = screenText.innerText;

  if (currentText === "0" || currentText === "CLEAR") screenText.innerText = "";

  switch (char) {
    case ".":
      let parts = currentText.split(/[\+\-\×\÷]/);
      if (parts[parts.length - 1].includes(".")) break;
      screenText.innerText += char;
      updateScreen();
      break;

    case "CLEAR":
      screenText.innerText = "";
      historyScreen.innerHTML = "";
      bigScreenTotal.innerText = "";
      first = second = oper = result = null;
      break;

    case "+":
    case "-":
    case "×":
    case "÷":
      if (currentText === "") break;

      // Reemplazar operador si el usuario lo cambia
      if (operators.includes(currentText)) {
        screenText.innerText = char;
        oper = char;
        break;
      }

      // Si ya hay un operador y un segundo número, calcular antes de seguir
      if (first && oper && second === null) {
        second = currentText;
        result = operate(first, second, oper);
        bigScreenTotal.innerText = result;
        historyScreen.innerHTML += `
        <p class="history-entry">
          <span class="history-left">${first} ${oper} ${second}</span>
          <span class="history-right">= ${result}</span>
        </p>`;
        first = result;
        second = null;
        oper = char;
        screenText.innerText = char;
        updateScreen();
        break;
      }

      // Si aún no hay operador, asignarlo
      first = currentText;
      oper = char;
      screenText.innerText = char;
      break;

    case "=":
      if (!oper || !first || operators.includes(currentText)) break;

      second = currentText;
      if (first && oper && second) {
        result = operate(first, second, oper);
        historyScreen.innerHTML += `
        <p class="history-entry">
          <span class="history-left">${first} ${oper} ${second}</span>
          <span class="history-right">= ${result}</span>
        </p>`;
        screenText.innerText = result;
        bigScreenTotal.innerText = result;
        updateScreen();
        first = result;
        second = null;
        oper = null;
      }
      break;

    default:
      if (operators.includes(currentText)) screenText.innerText = "";
      screenText.innerText += char;
      updateScreen();
      break;
  }

  event.preventDefault();
}

// Delete characters when holding down the button
let intervalId = null;
deleteButton.addEventListener("mousedown", () => {
  deleteButton.classList.add("clicked");

  intervalId = setInterval(() => {
    if (screenText.innerText === "CLEAR") screenText.innerText = "";
    if (screenText.innerText.length > 0) {
      screenText.innerText = screenText.innerText.slice(0, -1);
    } else {
      stopDeleting();
      clearInterval(intervalId);
    }
  }, 100);
});

// Stop deleting when releasing or leaving the button
deleteButton.addEventListener("mouseup", stopDeleting);
deleteButton.addEventListener("mouseleave", stopDeleting);

function stopDeleting() {
  clearInterval(intervalId);
  deleteButton.classList.remove("clicked");
}
