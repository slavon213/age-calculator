const formCalculator = document.forms[0];
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const calculateButton = document.getElementById("calc-btn");

const yearsDisplay = document.getElementById("show-years");
const monthsDisplay = document.getElementById("show-months");
const daysDisplay = document.getElementById("show-days");

const today = new Date();
const currentYear = today.getFullYear();

formCalculator.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        main();
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
const isNotFuture = (date) => (!dateFns.isFuture(date) ? true : "Must be in the past");

const validatorsMap = {
    day: [isNotEmpty, inRange(1, 31, "Must be a valid day")],
    month: [isNotEmpty, inRange(1, 12, "Must be a valid month")],
    year: [isNotEmpty, isNotFuture],
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

const getDataFromInputs = () => {
    const day = Number(dayInput.value);
    const month = Number(monthInput.value);
    const year = Number(yearInput.value);
    const date = new Date(year, month - 1, day);
    return {
        day: day,
        month: month,
        year: year,
        date: date,
    };
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

const isNotFutureFullDate = (date) => {
    const result = isNotFuture(date);
    if (result !== true) {
        showError(dayInput, result);
        return false;
    }
    return true;
};

const validateForm = () => {
    const isDayValid = validateField(dayInput, "day");
    const isMonthValid = validateField(monthInput, "month");
    const isYearValid = validateField(yearInput, "year");
    let isNotFutureDate = false;

    if (isDayValid && isMonthValid && isYearValid) {
        const { day, month, year, date } = getDataFromInputs();
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            showError(dayInput, "Must be a valid date");
            showError(monthInput, "");
            showError(yearInput, "");
        }
        isNotFutureDate = isNotFutureFullDate(date);
    }
    return isDayValid && isMonthValid && isYearValid && isNotFutureDate;
};

calculateButton.addEventListener("click", () => {
    main();
});

const showResult = (years, months, days) => {
    yearsDisplay.textContent = years ? years : "--";
    monthsDisplay.textContent = months ? months : "--";
    daysDisplay.textContent = days ? days : "--";
};

const clearResult = () => {
    yearsDisplay.textContent = "--";
    monthsDisplay.textContent = "--";
    daysDisplay.textContent = "--";
};

const main = () => {
    clearResult();
    if (validateForm()) {
        const { date } = getDataFromInputs();
        const result = dateFns.intervalToDuration({ start: date, end: today });
        showResult(result.years, result.months, result.days);
    }
};

addClass(yearInput, "invalid");
