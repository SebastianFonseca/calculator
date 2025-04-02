export let add = (a, b) => +a + +b;
export let subtract = (a, b) => a - b;
export let multiply = (a, b) => a * b;
export let divide = (a, b) => {
  if (b === 0) return "Infinity!";
  return a / b;
};

export function operate(firstO, secondO, operat) {
  firstO = parseFloat(firstO);
  secondO = parseFloat(secondO);

  let result;

  switch (operat) {
    case "+":
      result = add(firstO, secondO);
      break;
    case "-":
      result = subtract(firstO, secondO);
      break;
    case "×":
      result = multiply(firstO, secondO);
      break;
    case "÷":
      result = divide(firstO, secondO);
      break;
    default:
      return "Invalid operation";
  }

  return parseFloat(result.toPrecision(6)); // Mantiene 6 cifras significativas
}
