import { validationMap } from "../config/validationMap";

const validateField = (fieldName, value) => {
    const rules = validationMap[fieldName] || [];
    const errors = [];

    for (let rule of rules) {
        const result = rule(value);
        if (result !== true) {
            errors.push(result);
        }
    }
    return errors;
};
