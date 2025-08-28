const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const calculateButton = document.getElementById("calc-btn");
const today = new Date();
const currentYear = today.getFullYear();

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
// const isPositive = (value) => (Number(value) > 0 ? true : "Must be in the past");
const inRange = (min, max, message) => (value) => {
    const number = Number(value);
    if (number >= min && number <= max) {
        return true;
    }
    return message;
};
const isNotFutureYear = (year) => (!dateFns.isFuture(year) ? true : "Must be in the past");

const validatorsMap = {
    day: [isNotEmpty, inRange(1, 31, "Must be a valid day")],
    month: [isNotEmpty, inRange(1, 12, "Must be a valid month")],
    year: [isNotEmpty, isNotFutureYear],
};

const showError = (input, message) => {
    const parentElement = input.closest("div");
    // parentElement.classList.toggle("")
    const smallElement = parentElement.querySelector("small");
    smallElement.textContent = message;
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
    showError(input, "");
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
        }
    }
    return isDayValid && isMonthValid && isYearValid;
};

calculateButton.addEventListener("click", () => {
    if (validateForm()) {
        console.log("Everything is OK");
    }
});
