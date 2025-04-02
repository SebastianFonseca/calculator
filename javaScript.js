//import oepration.js module aritmetical operations
import { operate } from "./operations.js";
// Select DOM elements
let body = document.getElementsByTagName("body")[0];
let screenText = document.getElementById("screenText");
let keyBoard = document.getElementById("keyboard");
let deleteButton = document.getElementById("delete");
let clear = document.getElementById("clear");
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

document.getElementById("calculator").addEventListener("dragstart", (event) => {
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
  screenText.scrollLeft = screenText.scrollWidth; // Mueve el scroll al final del texto
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
      if (currentText.includes(".")) break;
      if (currentText === "0") {
        screenText.innerText = "0.";
      } else {
        screenText.innerText += char;
        updateScreen();
      }
      break;

    case "CLEAR":
      screenText.innerText = "";
      first = second = oper = result = null;
      break;

    case "+":
    case "-":
    case "×":
    case "÷":
      if (currentText == "") break;
      if (operators.includes(currentText)) {
        oper = char;
        screenText.innerText = char;
      }
      if (first && oper && second == null) {
        second = currentText;
        result = operate(first, second, oper);
        first = result;
        second = null;
        oper = char;
        screenText.innerText = char;
        updateScreen();

        break;
      } else {
        first = currentText;
        screenText.innerText = char;
        updateScreen();

        oper = char;
        break;
      }

    case "=":
      if (operators.includes(currentText)) break;
      second = currentText;
      if (oper && first && second) {
        result = operate(first, second, oper);
        screenText.innerText = result;
        updateScreen();

        first = result;
        second = null;
        oper = null;
      }

      break;

    default:
      if (operators.includes(currentText)) {
        screenText.innerText = "";
      }
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

// case "=":
//       if (screenText === "") break;
//       if (!oper) break;
//       second = screenText.innerText;
//       result = first = screenText.innerText = operate(first, second, oper);
//       second = null;
//       break;

//     default:
//       if (["+", "-", "×", "÷"].includes(currentText)) screenText.innerText = "";
//       screenText.innerText += char;
//       first = screenText.innerText;
//       updateScreen();
//       break;
//   }
