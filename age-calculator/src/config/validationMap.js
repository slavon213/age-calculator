import { isNotEmpty, isInRange, isNotFuture } from "../utils/validationRules";


export const validationMap = {
    day: [isNotEmpty, isInRange(1, 31, "Must be a valid day")],
    month: [isNotEmpty, inRange(1, 12, "Must be a valid month")],
    year: [isNotEmpty, isNotFuture],
};
