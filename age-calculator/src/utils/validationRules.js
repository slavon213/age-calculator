import { isFuture } from "date-fns";

export const isNotEmpty = (value) => (value ? true : "This field is required");

export const isInRange = (min, max, message) => (value) => {
    const number = Number(value);
    if (number >= min && number <= max) {
        return true;
    }
    return message;
};

export const isNotFuture = (date) => (!isFuture(date) ? true : "Must be in the past");
