import { BehaviorSubject } from "rxjs";

/**
 * @desc FormValidator class representing a form validator.
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

	/**
	 * params getter
	 * @return {any} params
	 */
	get params() {
		return this.params$.getValue();
	}

	/**
	 * params setter
	 * @param {any} params
	 */
	set params(params) {
		if (params) {
			const current = this.params;
			const differs = Object.keys(params).reduce((flag, key) => {
				return flag || !current || current[key] !== params[key];
			}, false);
			if (differs) {
				// if (JSON.stringify(params) !== JSON.stringify(this.params)) {
				this.params$.next(params);
			}
		}
	}

	/**
	 * Create a FormValidator.
	 * @abstract
	 */
	constructor(validator, params) {
		this.validator = validator.bind(this);
		this.params$ = new BehaviorSubject(params);
	}

	/**
	 * validate a value
	 * @param {any} value - the value to validate
	 * @return {null|FormValidationError}
	 */
	validate(value) {
		return this.validator(value);
	}

}
