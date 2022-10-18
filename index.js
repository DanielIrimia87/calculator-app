const display = document.querySelector('.calculator-display');
const keysButtons = document.querySelectorAll('.btnKeys');
const operatorsButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.all-clear-btn');
const equalButton = document.querySelector('.equal-btn');
const decimalButton = document.querySelector('.decimal-btn');

let displayValue = 0;
let firstValue = null;
let secondValue = null;
let operator = null;
let result = 0;
let waitingForSecondValue = false;

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
    }
};

const { add, subtract, multiply, divide} = calculator;

/**
 * If the displayValue is longer than 10 characters, slice it to 10 characters. If the displayValue is
 * Infinity, NaN, undefined, or null, change it to a string. Otherwise, leave it alone
 */
const updateDisplay = () => {
    if (displayValue.length > 10) {
        displayValue = displayValue.slice(0, 10);
    } else if (displayValue === 'Infinity') {
        displayValue = 'really?';
    } else if (displayValue === 'NaN') {
        displayValue = 'you broke it';
    } else if (displayValue === 'undefined') {
        displayValue = 'you broke it';
    } else if (displayValue === 'null') {
        displayValue = 'you broke it';
    } else {
        displayValue = displayValue;
    }
    display.value = displayValue;
    display.textContent = displayValue; 
};

/**
 * If the user is waiting for a second value, then set the displayValue to the value of the key that
 * was clicked. Otherwise, if the displayValue is 0, then set the displayValue to the value of the key
 * that was clicked. Otherwise, add the value of the key that was clicked to the displayValue
 * @param key - The event object that is passed to the function.
 */
const updateDisplayValue = (key) => {
    /* Destructuring the value property from the key.target object. */
    const { value } = key.target;
    if (waitingForSecondValue === true) {
        displayValue = value;
        waitingForSecondValue = false;
    } else {
        displayValue === 0 ? displayValue = value : displayValue += value;
    } 
    updateDisplay();
};

/**
 * It takes in an operator, and two numbers, and returns the result of the operation
 * @param operator - the operator to be used
 * @param num1 - The first number
 * @param num2 - the second number entered by the user
 * @returns The result of the operation.
 */
const operate = (operator, num1, num2) => {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '÷') {
        return divide(num1, num2);
    } else {
        return 'Error';
    }
}

/**
 * If the user has already entered an operator, and is waiting for the second value, then just update
 * the operator. Otherwise, if the user has not yet entered a value, then set the first value to the
 * current display value. Otherwise, if the user has already entered an operator and a first value,
 * then perform the operation and update the display. Finally, if the user has not yet entered an
 * operator, then set the first value to the current display value
 * @param key - the event object
 * @returns the result of the operation.
 */
const handleOperator = (key) => {
    const { value } = key.target;
    if (operator && waitingForSecondValue) {
        operator = value;
        return;
    } else if (firstValue === null) {
        firstValue = parseFloat(displayValue);
    } else if (operator) {
        const currentValue = parseFloat(displayValue);
        result = operate(operator, firstValue, currentValue);
        displayValue = String(result);
        updateDisplay();
        firstValue = result;
    } else {
        firstValue = parseFloat(displayValue);
    }
    waitingForSecondValue = true;
    operator = value;
};  

/**
 * If there is no first value or operator, return; otherwise, set the current value to the result of
 * the operation, update the display, set the first value to the result, set the operator to null, and
 * set waitingForSecondValue to true
 * @returns the result of the operation.
 */
const handleEqual = () => {
    /* Checking to see if the firstValue or the operator is null. If either of them are null,
    then it returns. */
    if (!firstValue || !operator) {
        return;
    }
    const currentValue = parseFloat(displayValue);
    result = operate(operator, firstValue, currentValue);
    displayValue = String(result);
    updateDisplay();
    firstValue = result;
    operator = null;
    waitingForSecondValue = true;
};

/**
 * The handleClear function sets all the variables to their default values.
 */
const handleClear = () => {
    displayValue = 0;
    firstValue = null;
    secondValue = null;
    operator = null;
    result = 0;
    waitingForSecondValue = false;
    updateDisplay();
};

/**
 * If the displayValue includes a decimal point, do nothing; otherwise, add a decimal point to the
 * displayValue and update the display
 * @returns the value of the displayValue variable.
 */
const handleDecimal = () => {
    if (displayValue.includes('.')) {
        return;
    }
    displayValue += '.';
    updateDisplay();
};

keysButtons.forEach((key) => {
    key.addEventListener('click', updateDisplayValue);
});

operatorsButtons.forEach((operator) => {
    operator.addEventListener('click', handleOperator);
});

equalButton.addEventListener('click', handleEqual);
clearButton.addEventListener('click', handleClear);
decimalButton.addEventListener('click', handleDecimal);





