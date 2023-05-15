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

function calculate(str) {
  const regExp = /[0-9]+|[-×+÷]/g;
  let arr = str.match(regExp);
  let number = +arr[0];
  for (let str of arr) {
		let nextNum =arr[arr.indexOf(str) + 1] 
    if (!nextNum) break;
    if (str === "+") {
      number += +nextNum;
    }
    if (str === "-") {
      number -= +nextNum;
    }
    if (str === "÷") {
      number /= +nextNum;
    }
    if (str === "×") {
      number *= +nextNum;
    }
  }
  return number;
}


calculator.addEventListener("click", (event) => {
  if (event.target.tagName != "BUTTON") return;
  const button = event.target.textContent;
  const regSign = /[-×+÷=]$/;

  if (button === "C") {
    screen.textContent = "0";
    return;
  }
  if (button === "←") {
    deleteLast(screen.textContent);
    return;
  }
  if (button === "=") {
    screen.textContent = calculate(screen.textContent);
    return;
  }

  if (screen.textContent === "0") {
    if (regSign.test(button)) return;
    screen.textContent = button;
    return;
  }

  if (regSign.test(screen.textContent) && regSign.test(button)) {
    return;
  }

  if (/÷$/.test(screen.textContent) && /0/.test(button)) {
    return;
  }
  screen.textContent += button;
});
