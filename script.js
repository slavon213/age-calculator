const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const calculateButton = document.getElementById("calc-btn");
const today = new Date();
const currentDay = today.getDay()



function integerInput(value) {
    value = value.replace(/[^\d]+/g, "");
    return value;
}

[dayInput, monthInput].forEach((element) => {
    element.addEventListener("input", function () {
        this.value = integerInput(this.value).substring(0,2);
    });
});

yearInput.addEventListener("input", function(){
    this.value = integerInput(this.value).substring(0, 4);
})

