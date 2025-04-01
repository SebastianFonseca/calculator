//import oepration.js module aritmetical operations
import { divide, operate } from "./operations.js";
// Select DOM elements
let body = document.getElementsByTagName("body")[0];
let screenText = document.getElementById("screenText");
let keyBoard = document.getElementById("keyboard");
let deleteButton = document.getElementById("delete");
let clear = document.getElementById("clear");

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

// Event to write on screen when clicking the keyboard
keyBoard.addEventListener("click", writeOnScreen);
function writeOnScreen(event) {
  if (!event.target.id || event.target.id === "keyboard") return; // Prevents adding the whole div content

  if (screenText.innerText === "0" || screenText.innerText === "CLEAR") {
    screenText.innerText = "";
  }
  screenText.innerText += event.target.innerText;
  event.preventDefault();
}

// Delete characters when holding down the button
let intervalId = null;

deleteButton.addEventListener("mousedown", () => {
  deleteButton.classList.add("clicked");

  intervalId = setInterval(() => {
    if (screenText.innerText.length > 0) {
      screenText.innerText = screenText.innerText.slice(0, -1);
    } else {
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

// Clear screen when clicking the clear button
clear.addEventListener("click", () => {
  screenText.innerText = " ";
});
