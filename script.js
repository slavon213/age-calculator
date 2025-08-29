const formCalculator = document.forms[0];
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const calculateButton = document.getElementById("calc-btn");
const today = new Date();
const currentYear = today.getFullYear();

formCalculator.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        validateForm();
    }
});

function integerInput(value) {
    value = value.replace(/[^\d]+/g, "");
    return value;
}

[dayInput, monthInput].forEach((element) => {
    element.addEventListener("input", function () {
        this.value = integerInput(this.value).substring(0, 2);
    });
});

yearInput.addEventListener("input", function () {
    this.value = integerInput(this.value).substring(0, 4);
});

const isNotEmpty = (value) => (value ? true : "This field is required");
const inRange = (min, max, message) => (value) => {
    const number = Number(value);
    if (number >= min && number <= max) {
        return true;
    }
    return message;
};
const isNotFutureYear = (year) => (Number(year) <= Number(currentYear)) ? true : "Must be in the past";

const validatorsMap = {
    day: [isNotEmpty, inRange(1, 31, "Must be a valid day")],
    month: [isNotEmpty, inRange(1, 12, "Must be a valid month")],
    year: [isNotEmpty, isNotFutureYear],
};

const addClass = (field, className) => {
    field.classList.add(className);
};

const removeClass = (field, className) => {
    field.classList.remove(className);
};
const showError = (input, message) => {
    const parentElement = input.closest("div");
    addClass(parentElement, "invalid");
    const smallElement = parentElement.querySelector("small");
    smallElement.textContent = message;
};

const clearError = (input) => {
    const parentElement = input.closest("div");
    removeClass(parentElement, "invalid");
    const smallElement = parentElement.querySelector("small");
    smallElement.textContent = "";
};

const validateField = (input, fieldName) => {
    const value = input.value;
    const rules = validatorsMap[fieldName];
    for (let rule of rules) {
        const result = rule(value);
        if (result !== true) {
            showError(input, result);
            return false;
        }
    }
    clearError(input);
    return true;
};

const validateForm = () => {
    const isDayValid = validateField(dayInput, "day");
    const isMonthValid = validateField(monthInput, "month");
    const isYearValid = validateField(yearInput, "year");

    if (isDayValid && isMonthValid && isYearValid) {
        const day = Number(dayInput.value);
        const month = Number(monthInput.value);
        const year = Number(yearInput.value);

        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            showError(dayInput, "Must be a valid date");
            showError(monthInput, "");
            showError(yearInput, "");
        }
    }
    return isDayValid && isMonthValid && isYearValid;
};

calculateButton.addEventListener("click", () => {
    if (validateForm()) {
        console.log("Everything is OK");
    }
});

addClass(yearInput, "invalid");
