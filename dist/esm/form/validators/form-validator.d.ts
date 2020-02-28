import { BehaviorSubject } from "rxjs";
export interface IFormValidationError {
    [key: string]: any;
}
/**
 * FormValidator class representing a form validator.
 * @example
 * export function EqualValidator(equal) {
 * 	return new FormValidator(function(value) {
 * 		const equal = this.params.equal;
 * 		if (!value || !equal) {
 * 			return null;
 * 		}
 * 		return value !== equal ? { equal: { equal: equal, actual: value } } : null;
 * 	}, { equal });
 * }
 */
export default class FormValidator {
    validator: (value: any, params?: any) => null | IFormValidationError;
    params$: BehaviorSubject<any>;
    get params(): any;
    set params(params: any);
    /**
     * Create a FormValidator.
     */
    constructor(validator: (value: any, params?: any) => any, params?: any);
    /**
     * validate a value
     * @param value the value to validate
     */
    validate(value: any): any;
}
