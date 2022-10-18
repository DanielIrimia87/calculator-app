/* Assignment (Calculator) */
// 1. Create a calculator object that has the following methods:
// a. add
// b. subtract
// c. multiply
// d. divide

const calculator = {

    add: (num1, num2) => {
        return num1 + num2;
    },
    subtract: (num1, num2) => {
        return num1 - num2;
    },
    multiply: (num1, num2) => {
        return num1 * num2;
    },
    divide: (num1, num2) => {
        return num1 / num2;
    },
}

const { add, subtract, multiply, divide } = calculator;

// 2. Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

const operate = (operator, num1, num2) => {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    } else if (operator === ',') {
        return decimal(num1, num2);
    } else {
        return 'Invalid operator';
    }
}

/* 3. Create the functions that populate the display when you click the number buttons... you
should be storing the ‘display value’ in a variable somewhere for use in the next step. */

const display = document.querySelector('.calculator-display');
const keysButtons = document.querySelectorAll('.btnKeys');
const operatorsButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.all-clear-btn');
const equalButton = document.querySelector('.equal-btn');
const decimalButton = document.querySelector('.decimal-btn');

let displayValue = 0;
let firstValue = '';
let secondValue = '';
let operator = '';
let result = '';

keysButtons.forEach(button => {
    button.addEventListener('click', () => {
        displayValue += button.textContent;
        display.textContent = displayValue;
    })
});

operatorsButtons.forEach(button => {
    button.addEventListener('click', () => {
        firstValue = displayValue;
        operator = button.textContent;
        displayValue = '';
    })
});   

equalButton.addEventListener('click', () => {
    secondValue = displayValue;
    displayValue = operate(operator, parseFloat(firstValue), parseFloat(secondValue));
    display.textContent = displayValue;
});

clearButton.addEventListener('click', () => {
    displayValue = '';
    firstValue = '';
    secondValue = '';
    operator = '';
    display.textContent = displayValue;
});

decimalButton.addEventListener('click', () => {
    displayValue += decimalButton.textContent;
    display.textContent = displayValue;
});

/* 4. Create the function that populates the display when you click the operator buttons. */
// Optional: Add keyboard support
/* window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) {
        displayValue += e.key;
        display.textContent = displayValue;
    } else if (e.key === ',') {
        displayValue += e.key;
        display.textContent = displayValue;
    } else if (e.key === 'Backspace') {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
    } else if (e.key === 'Enter') {
        secondValue = displayValue;
        displayValue = operate(operator, Number(firstValue), Number(secondValue));
        display.textContent = displayValue;
    } else if (e.key === 'Escape') {
        displayValue = '';
        firstValue = '';
        secondValue = '';
        operator = '';
        display.textContent = displayValue;
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        firstValue = displayValue;
        operator = e.key;
        displayValue = '';
    } else {
        return;
    }
}); */





