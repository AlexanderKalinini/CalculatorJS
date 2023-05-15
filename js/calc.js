"use strict";
const screen = document.querySelector(".screen");
const calcButtons = document.querySelectorAll(".calc-button");
const calculator = document.querySelector(".wrapper");

function cancel() {
  screen.textContent = "0";
}

function deleteLast(str) {
  if (str.length === 1) {
    screen.textContent = "0";
    return;
  }
  screen.textContent = str.slice(0, -1);
}

function deleteAll() {
  screen.textContent = 0;
}

function sum(a, b) {
  return a + b;
}
function subtraction(a, b) {
  return a - b;
}
function division(a, b) {
  if (b === 0) return a + "÷" + b;
  return a / b;
}
function multiply(a, b) {
  return a * b;
}

function calculate(str) {
  const regExp = /([-×+÷])/;
  let arr = str.split(regExp);
  const numberFirst = +arr[0];
  if (arr[2] === "" || arr[2] === undefined) return numberFirst;

  const numberSecond = +arr[2];

  const sign = arr[1];
  console.log(arr);
  console.log("Second", numberSecond);

  if (sign === "+") {
    return sum(numberFirst, numberSecond);
  }
  if (sign === "-") {
    return subtraction(numberFirst, numberSecond);
  }
  if (sign === "÷") {
    return division(numberFirst, numberSecond);
  }
  if (sign === "×") {
    return multiply(numberFirst, numberSecond);
  }
  return numberFirst;
}

function addValueToScreen(str, button) {
  const regSign = /[-×+÷=]/;
  if (str === "0") {
    if (!regSign.test(button)) {
      return button;
    }
  }

  if (regSign.test(str) && regSign.test(button)) {
    return str;
  }

  return str + button;
}

calculator.addEventListener("click", (event) => {
  if (event.target.tagName != "BUTTON") return;
  const buttonValue = event.target.textContent;

  if (buttonValue === "C") {
    deleteAll();
    return;
  }
  if (buttonValue === "←") {
    deleteLast(screen.textContent);
    return;
  }
  if (buttonValue === "=") {
    screen.textContent = calculate(screen.textContent).toFixed(5);
    return;
  }

  screen.textContent = addValueToScreen(screen.textContent, buttonValue);
});
