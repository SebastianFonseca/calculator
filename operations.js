// operations.js
export let add = (a, b) => a + b;
export let subtract = (a, b) => a - b;
export let multiply = (a, b) => a * b;
export let divide = (a, b) => {
  if (b === 0) return "Not dividing by 0.";
  return a / b;
};

export function operate(firstO, secondO, operat) {
  switch (operat) {
    case "+":
      return add(firstO, secondO);
    case "-":
      return subtract(firstO, secondO);
    case "*":
      return multiply(firstO, secondO);
    case "/":
      return divide(firstO, secondO);
    default:
      return "Invalid operation";
  }
}
